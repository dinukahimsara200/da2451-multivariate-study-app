/**
 * DA2451 — Predicted Questions ingestion (Task 4)
 * Follows Predictions/DA2451_Predicted_Questions_HTML_Integration_Guide.md.
 *
 *  - Reads the four ORIGINAL prediction files READ-ONLY (never written) and verifies SHA-256.
 *  - Parses the four authoring dialects (ChatGPT/Gemini x MCQ/Essay) into one data model.
 *  - Verifies every §12 build checklist item on the FULL 110-question set.
 *  - Applies the hard scope exclusion (PCR, Regression Diagnostics, LDA) AFTER parsing and
 *    records every exclusion in APP_DEV/EXCLUSION_LOG.md. Excluded text is never embedded.
 *  - Contains NO answers, keys, explanations or grading of any kind (guide §5).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MarkdownIt = require('markdown-it');
const katex = require('katex');

const REPO_ROOT = path.resolve(__dirname, '..');
const PRED_DIR = path.join(REPO_ROOT, 'content', 'predictions');
const EXCLUSION_LOG = path.join(REPO_ROOT, 'docs', 'EXCLUSION_LOG.md');

const O = '\u27E6';
const C = '\u27E7';

/* ---------- 1. Source inventory (Guide §1) ---------- */
const SOURCE_FILES = [
  { key: 'C-MCQ', file: 'DA2451_ChatGPT_Predicted_MCQs.md', generator: 'chatgpt', kind: 'mcq', sha16: '8d2a4ebf3d8307b4', count: 40, h2: 10, inv: { math: 136, disp: 2, inl: 134, fences: 0, tables: 0 } },
  { key: 'C-ESS', file: 'DA2451_ChatGPT_Predicted_Essays.md', generator: 'chatgpt', kind: 'essay', sha16: 'ff7c7395bc447b30', count: 15, h2: 4, inv: { math: 168, disp: 23, inl: 145, fences: 2, tables: 4 } },
  { key: 'G-MCQ', file: 'da2451_predicted_multiple_choice_questions.md', generator: 'gemini', kind: 'mcq', sha16: '11b4d83a6184b2a6', count: 40, h2: 8, inv: { math: 377, disp: 0, inl: 377, fences: 0, tables: 0 } },
  { key: 'G-ESS', file: 'da2451_predicted_essay_questions.md', generator: 'gemini', kind: 'essay', sha16: 'c3b66596d1a8e7f1', count: 15, h2: 15, inv: { math: 352, disp: 15, inl: 337, fences: 8, tables: 1 } }
];

const GENERATOR_NAME = { chatgpt: 'ChatGPT', gemini: 'Gemini' };

/* ---------- 2. Hard scope exclusions (Master Plan §1; each decided from the question text + source topic) ---------- */
const EXCLUDED = {
  'C-MCQ-014': ['PCR', 'Source topic "Principal Components Regression"; stem is about which components a PCR model retains.'],
  'C-MCQ-015': ['PCR', 'Source topic "Principal Components Regression"; compares OLS with PCR using all p components.'],
  'C-MCQ-016': ['Regression Diagnostics', 'Source topic "Regression Diagnostics"; leverage versus residual size of an observation.'],
  'C-MCQ-017': ['Regression Diagnostics', 'Source topic "Regression Diagnostics"; residual-versus-fitted plot with increasing spread.'],
  'C-MCQ-018': ['Regression Diagnostics', 'Source topic "Regression Diagnostics"; normal Q-Q plot of regression residuals.'],
  'C-MCQ-023': ['LDA', 'Source topic "Linear Discriminant Analysis"; two-group LDA decision rule.'],
  'C-MCQ-024': ['LDA', 'Source topic "Linear Discriminant Analysis"; classifier test-set error assessment inside the LDA topic.'],
  'C-MCQ-025': ['LDA', 'Source topic "Linear Discriminant Analysis"; effect of prior probabilities in two-group LDA.'],
  'C-MCQ-026': ['LDA', 'Source topic "Linear Discriminant Analysis"; LDA test-set accuracy and data leakage.'],
  'G-MCQ-018': ['PCR', 'Source topic "PCR & Regression Diagnostics"; OLS versus PCR retaining all 5 components.'],
  'G-MCQ-019': ['PCR', 'Source topic "PCR & Regression Diagnostics"; coefficients implied by a 2-component PCR model.'],
  'G-MCQ-020': ['PCR', 'Source topic "PCR & Regression Diagnostics"; discarding the last principal component in PCR.'],
  'G-MCQ-021': ['PCR', 'Source topic "PCR & Regression Diagnostics"; evaluating a PCR model on train/test sets.'],
  'G-MCQ-022': ['Regression Diagnostics', 'Source topic "PCR & Regression Diagnostics"; standardized residual and leverage of one observation.'],
  'G-MCQ-023': ['Regression Diagnostics', 'Source topic "PCR & Regression Diagnostics"; residual-versus-fitted megaphone pattern.'],
  'G-MCQ-033': ['LDA', 'Source topic "Linear Discriminant Analysis (LDA) & Classification"; LDA with g = 4 groups.'],
  'G-MCQ-034': ['LDA', 'Source topic "Linear Discriminant Analysis (LDA) & Classification"; two-group LDA decision boundary.'],
  'G-MCQ-035': ['LDA', 'Source topic "Linear Discriminant Analysis (LDA) & Classification"; LDA "Proportion of trace" output.'],
  'G-MCQ-036': ['LDA', 'Source topic "Linear Discriminant Analysis (LDA) & Classification"; apparent error rate of an LDA model.'],
  'C-ESS-004': ['PCR', 'Title "PCR, Validation and Interpretable Predictions"; every part concerns principal components regression.'],
  'C-ESS-005': ['Regression Diagnostics', 'Title "Auditing Regression Diagnostics Rather Than Deleting Cases"; Cook\'s distance and influence.'],
  'C-ESS-007': ['LDA', 'Title "LDA Priors, Business Losses and a Test Confusion Matrix"; every part concerns LDA.'],
  'G-ESS-006': ['PCR', 'Source topic "Principal Components Regression (PCR) & Model Evaluation".'],
  'G-ESS-007': ['Regression Diagnostics', 'Source topic "Regression Diagnostics & Influential Observations".'],
  'G-ESS-013': ['LDA', 'Source topic "Linear Discriminant Analysis (LDA) - Classification & Confusion Matrix".']
};
const OUT_OF_SCOPE_TERMS = /\bPCR\b|principal components? regression|regression diagnostics?|leverage|cook'?s? distance|studentized|discriminant analysis|\bLDA\b|\blda\(\)|confusion matrix/i;

/* ---------- 3. Markdown renderer (protect code -> inline code -> $$ -> $) ---------- */
function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderMd(rawMd, opts = {}) {
  const { generator = 'chatgpt', inline = false } = opts;
  let src = String(rawMd).replace(/\r\n?/g, '\n');
  const store = [];
  const put = o => { store.push(o); return O + (store.length - 1) + C; };
  const stats = { disp: 0, inl: 0, math: 0, fences: 0, tables: 0, codeSpans: 0, katexWarnings: [] };

  // 1. fenced blocks (never highlighted; untagged == text)
  const lines = src.split('\n');
  const out = [];
  for (let i = 0; i < lines.length;) {
    const m = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*$/);
    if (m) {
      const close = new RegExp('^\\s*' + m[2][0] + '{' + m[2].length + ',}\\s*$');
      let j = i + 1;
      const body = [];
      while (j < lines.length && !close.test(lines[j])) body.push(lines[j++]);
      if (j >= lines.length) throw new Error('Unclosed fence at line ' + (i + 1));
      stats.fences++;
      out.push(m[1] + put({ k: 'fence', v: body.join('\n') }));
      i = j + 1;
    } else out.push(lines[i++]);
  }
  src = out.join('\n');

  // 2. inline code BEFORE math (Gemini has pca_out$x inside code spans)
  src = src.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g, (m, t, b) => {
    stats.codeSpans++;
    return put({ k: 'code', v: b.replace(/^ (.*) $/, '$1') });
  });

  // 3. display then inline math
  src = src
    .replace(/\$\$([\s\S]+?)\$\$/g, (m, b) => put({ k: 'math', v: b, disp: true }))
    .replace(/(?<![\\$])\$((?:\\[\s\S]|[^$\\\n])+?)\$/g, (m, b) => put({ k: 'math', v: b, disp: false }));

  // 4. markdown
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false, breaks: false });
  md.renderer.rules.table_open = (t, i, o) => '<div class="table-wrap">' + md.renderer.renderToken(t, i, o);
  md.renderer.rules.table_close = () => '</table></div>';
  let html = inline ? md.renderInline(src) : md.render(src);
  stats.tables = (html.match(/<table>/g) || []).length;

  const katexOpts = disp => ({
    displayMode: disp,
    throwOnError: true,
    output: 'html',
    strict: (code, msg) => { stats.katexWarnings.push(code + ': ' + msg); return 'ignore'; }
  });

  const fenceLabel = generator === 'chatgpt' ? 'Supplied output (hypothetical data)' : 'Supplied output / data';
  const PH = new RegExp(O + '(\\d+)' + C, 'g');

  // standalone display-math paragraphs become blocks (avoid <div> inside <p>)
  html = html.replace(new RegExp('<p>\\s*' + O + '(\\d+)' + C + '\\s*</p>', 'g'), (full, n) => {
    const s = store[+n];
    if (!s || s.k !== 'math' || !s.disp) return full;
    stats.disp++;
    return `<div class="math-block" tabindex="0" role="region" aria-label="Equation">${katex.renderToString(s.v.trim(), katexOpts(true))}</div>`;
  });

  html = html.replace(PH, (_, n) => {
    const s = store[+n];
    if (s.k === 'fence') {
      return `<div class="code-card code-card--output"><div class="code-head"><span>${fenceLabel}</span></div><pre tabindex="0" aria-label="${fenceLabel}"><code>${escapeHtml(s.v)}</code></pre></div>`;
    }
    if (s.k === 'code') {
      if (/^\[\d+\s*marks?\]$/.test(s.v)) return `<span class="marks">${escapeHtml(s.v)}</span>`;
      return '<code>' + escapeHtml(s.v) + '</code>';
    }
    const tex = s.v.trim();
    const rendered = katex.renderToString(tex, katexOpts(!!s.disp));
    if (s.disp) {
      stats.disp++;
      return `<div class="math-block" tabindex="0" role="region" aria-label="Equation">${rendered}</div>`;
    }
    stats.inl++;
    return tex.length > 36 ? `<span class="m-scroll">${rendered}</span>` : rendered;
  });

  // ChatGPT bold marks -> muted badge (text unchanged)
  html = html.replace(/<strong>(\[\d+\s*marks?\])<\/strong>/g, '<span class="marks">$1</span>');
  stats.math = stats.disp + stats.inl;
  return { html, stats };
}

function renderInlineHtml(md, generator) {
  return renderMd(md, { generator, inline: true }).html;
}

/* ---------- 4. Parsing helpers ---------- */
function trimBlock(lines) {
  let s = 0;
  let e = lines.length;
  while (s < e && lines[s].trim() === '') s++;
  while (e > s && (lines[e - 1].trim() === '' || /^---\s*$/.test(lines[e - 1].trim()))) e--;
  return lines.slice(s, e);
}

function scanHeadings(lines) {
  // returns [{line, level, text}] for ## and ### outside fences
  const heads = [];
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const f = lines[i].match(/^\s*(`{3,}|~{3,})/);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      continue;
    }
    if (fence) continue;
    const m = lines[i].match(/^(##|###)\s+(.*)$/);
    if (m) heads.push({ line: i, level: m[1].length, text: m[2] });
  }
  return heads;
}

function outsideFenceIndices(lines, predicate) {
  const idx = [];
  let fence = null;
  for (let i = 0; i < lines.length; i++) {
    const f = lines[i].match(/^\s*(`{3,}|~{3,})/);
    if (f) {
      if (!fence) fence = f[1][0];
      else if (f[1][0] === fence) fence = null;
      continue;
    }
    if (!fence && predicate(lines[i])) idx.push(i);
  }
  return idx;
}

function parseOne(spec) {
  const full = path.join(PRED_DIR, spec.file);
  const buf = fs.readFileSync(full); // read-only
  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  if (sha256.slice(0, 16) !== spec.sha16) {
    throw new Error(`SHA-256 mismatch for ${spec.file}: expected ${spec.sha16}, got ${sha256.slice(0, 16)}`);
  }
  const text = buf.toString('utf8').replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  const heads = scanHeadings(lines);
  const h2s = heads.filter(h => h.level === 2);
  const idRe = /^([CG]-(?:MCQ|ESS)-\d{3})(.*)$/;
  const qHeads = heads.filter(h => h.level === 3 && idRe.test(h.text));
  if (h2s.length !== spec.h2) throw new Error(`${spec.file}: expected ${spec.h2} topic headings, found ${h2s.length}`);
  if (qHeads.length !== spec.count) throw new Error(`${spec.file}: expected ${spec.count} question headings, found ${qHeads.length}`);
  if (heads.filter(h => h.level === 3).length !== spec.count) throw new Error(`${spec.file}: unexpected non-question H3 heading`);

  const firstH2 = h2s[0].line;
  const headerLines = lines.slice(0, firstH2);
  const headerMd = trimBlock(headerLines).join('\n');
  let fileInstructions = null;
  for (const l of headerLines) {
    const m = l.match(/^\*\*Instructions:\*\*\s*(.*?)\s*$/);
    if (m) fileInstructions = m[1];
  }
  if (spec.generator === 'chatgpt' && !fileInstructions) throw new Error(`${spec.file}: ChatGPT instructions paragraph not found`);

  const topics = h2s.map((h, i) => {
    let index = i + 1;
    let tm;
    if ((tm = h.text.match(/^Topic\s+(\d+)/))) index = +tm[1];
    else if ((tm = h.text.match(/^Section\s+([IV]+)/))) index = ['I', 'II', 'III', 'IV'].indexOf(tm[1]) + 1;
    const id = spec.key === 'C-ESS' ? `C-ESS-s${tm ? tm[1] : index}` : `${spec.key}-t${index}`;
    return { id, raw: h.text, index, line: h.line };
  });

  const questions = [];
  for (let qi = 0; qi < qHeads.length; qi++) {
    const h = qHeads[qi];
    const m = h.text.match(idRe);
    const id = m[1];
    const nextLine = (heads.find(x => x.line > h.line) || { line: lines.length }).line;
    const blockLines = trimBlock(lines.slice(h.line + 1, nextLine));
    const topic = [...topics].reverse().find(t => t.line < h.line);
    const seq = parseInt(id.slice(-3), 10);
    if (seq !== qi + 1) throw new Error(`${spec.file}: non-sequential ID ${id} at position ${qi + 1}`);
    if (!id.startsWith(spec.key)) throw new Error(`${spec.file}: unexpected ID prefix ${id}`);
    const q = {
      id,
      kind: spec.kind,
      generator: spec.generator,
      sourceFile: spec.file,
      sourceSha256: sha256,
      sourceLine: h.line + 1,
      seq,
      sourceTopic: topic.raw,
      sourceTopicIndex: topic.index,
      topicId: topic.id,
      title: null,
      totalMarks: null,
      sourceMd: blockLines.join('\n'),
      fileInstructions: spec.generator === 'chatgpt' ? fileInstructions : null
    };
    if (blockLines.some(l => /^##\s/.test(l))) throw new Error(`${id}: block contains a ## heading`);
    if (spec.kind === 'mcq') parseMcq(q, blockLines, spec);
    else parseEssay(q, blockLines, spec, m[2]);
    questions.push(q);
  }

  return { spec, sha256, headerMd, fileInstructions, topics, questions, text };
}

function parseMcq(q, blockLines, spec) {
  const optRe = spec.generator === 'chatgpt' ? /^- \*\*([A-D])\.\*\* (.+)$/ : /^\* ([A-D])\. (.+)$/;
  const firstOpt = blockLines.findIndex(l => optRe.test(l));
  if (firstOpt < 0) throw new Error(`${q.id}: no options found`);
  const stemLines = blockLines.slice(0, firstOpt);
  while (stemLines.length && stemLines[stemLines.length - 1].trim() === '') stemLines.pop();
  q.stemMd = stemLines.join('\n').trim();
  if (!q.stemMd) throw new Error(`${q.id}: empty stem`);
  q.options = [];
  for (let i = firstOpt; i < blockLines.length; i++) {
    const l = blockLines[i];
    if (l.trim() === '' && false) continue;
    const m = l.match(optRe);
    if (!m) throw new Error(`${q.id}: unexpected line between/after options: "${l.slice(0, 60)}"`);
    q.options.push({ letter: m[1], md: m[2] });
  }
  if (q.options.length !== 4 || q.options.map(o => o.letter).join('') !== 'ABCD') {
    throw new Error(`${q.id}: expected exactly options A-D in order, got ${q.options.map(o => o.letter).join('')}`);
  }
}

function lastMarks(text) {
  const m = text.trimEnd().match(/(?:\*\*\[(\d+)\s*marks?\]\*\*|`\[(\d+)\s*marks?\]`)\s*$/);
  return m ? parseInt(m[1] || m[2], 10) : null;
}

function parseEssay(q, blockLines, spec, headingRest) {
  if (spec.generator === 'chatgpt') {
    const hm = headingRest.match(/^\s+\S+\s+(.*?)\s+\((\d+)\s+marks\)\s*$/);
    if (!hm) throw new Error(`${q.id}: heading title/marks not parsed from "${headingRest}"`);
    q.title = hm[1];
    q.totalMarks = parseInt(hm[2], 10);
    q.headingRest = headingRest.trim();
  }
  let lines = blockLines.slice();
  if (spec.generator === 'gemini') {
    const ti = outsideFenceIndices(lines, l => /^`\[Total marks for [CG]-ESS-\d{3}\s*=\s*\d+\]`\s*$/.test(l));
    if (ti.length !== 1) throw new Error(`${q.id}: expected exactly one Total marks line, found ${ti.length}`);
    const tm = lines[ti[0]].match(/Total marks for ([CG]-ESS-\d{3})\s*=\s*(\d+)/);
    if (tm[1] !== q.id) throw new Error(`${q.id}: Total marks line names ${tm[1]}`);
    q.totalMarks = parseInt(tm[2], 10);
    lines = lines.filter((_, i) => i !== ti[0]);
    lines = trimBlock(lines);
  }
  const partIdx = outsideFenceIndices(lines, l => /^\*\*\(([a-h])\)/.test(l));
  if (!partIdx.length) throw new Error(`${q.id}: no lettered parts found`);
  q.scenarioMd = lines.slice(0, partIdx[0]).join('\n').trim();
  q.parts = [];
  for (let pi = 0; pi < partIdx.length; pi++) {
    const seg = trimBlock(lines.slice(partIdx[pi], pi + 1 < partIdx.length ? partIdx[pi + 1] : lines.length));
    const label = seg[0].match(/^\*\*\(([a-h])\)/)[1];
    const expected = String.fromCharCode(97 + pi);
    if (label !== expected) throw new Error(`${q.id}: part letter ${label} out of order (expected ${expected})`);
    const subIdx = outsideFenceIndices(seg, l => /^\* \*\*\(([ivx]+)\)\*\*/.test(l));
    const head = seg.slice(0, subIdx.length ? subIdx[0] : seg.length);
    const subparts = subIdx.map((si, k) => {
      const sl = seg.slice(si, k + 1 < subIdx.length ? subIdx[k + 1] : seg.length);
      const lab = sl[0].match(/^\* \*\*\(([ivx]+)\)\*\*/)[1];
      const txt = sl.join('\n');
      return { label: lab, md: txt, marks: lastMarks(txt) };
    });
    // The marks tag ends the part's FIRST paragraph (a part may be followed by supplied data/tables
    // that belong to the next part, e.g. C-ESS-007); fall back to the end of the part.
    const firstBlank = head.findIndex(l => l.trim() === '');
    const firstPara = (firstBlank < 0 ? head : head.slice(0, firstBlank)).join('\n');
    let ownMarks = lastMarks(firstPara);
    if (ownMarks === null) ownMarks = subIdx.length ? lastMarks(head.join('\n')) : lastMarks(seg.join('\n'));
    const subSum = subparts.reduce((a, s) => a + (s.marks || 0), 0);
    const trailingMaterial = !subIdx.length && firstBlank >= 0 && lastMarks(seg.join('\n')) === null;
    q.parts.push({
      label,
      trailingMaterial,
      md: seg.join('\n'),
      marks: ownMarks !== null ? ownMarks : (subparts.length ? subSum : null),
      subparts
    });
  }
  q.partLabels = q.parts.map(p => {
    if (!p.subparts.length) return `(${p.label})`;
    const first = p.subparts[0].label;
    const last = p.subparts[p.subparts.length - 1].label;
    return `(${p.label})(${first})\u2013(${last})`.replace(/\((\w+)\)\u2013\((\w+)\)$/, (m, a, b) => `(${a})\u2013(${b})`);
  }).join(', ');
  q.partCount = q.parts.length;
}

/* ---------- 5. Public: ingest all, verify, filter, render ---------- */
function ingestAllPredictions(options = {}) {
  const { writeLog = true } = options;
  const parsed = SOURCE_FILES.map(parseOne);
  const fileStats = [];
  const all = [];

  // Whole-file invariants on the ORIGINAL full files (guide §7.1, §12)
  for (const p of parsed) {
    const { stats } = renderMd(p.text, { generator: p.spec.generator });
    const inv = p.spec.inv;
    const ok = stats.math === inv.math && stats.disp === inv.disp && stats.inl === inv.inl &&
      stats.fences === inv.fences && stats.tables === inv.tables && stats.katexWarnings.length === 0;
    if (!ok) {
      throw new Error(`Invariant mismatch in ${p.spec.file}: got ${JSON.stringify({ ...stats, katexWarnings: stats.katexWarnings.length })} expected ${JSON.stringify(inv)}`);
    }
    fileStats.push({ file: p.spec.file, sha256: p.sha256, sha16: p.spec.sha16, generator: p.spec.generator, kind: p.spec.kind, questions: p.questions.length, math: stats.math, disp: stats.disp, inl: stats.inl, fences: stats.fences, tables: stats.tables, codeSpans: stats.codeSpans });
    all.push(...p.questions);
  }

  // §12 essay checks: marks arithmetic
  const marksIssues = [];
  for (const q of all.filter(x => x.kind === 'essay')) {
    const sum = q.parts.reduce((a, p) => a + (p.marks || 0), 0);
    if (sum !== q.totalMarks || q.parts.some(p => p.marks === null)) {
      marksIssues.push(`${q.id}: declared ${q.totalMarks}, parts sum ${sum}, part marks ${q.parts.map(p => p.marks).join('/')}`);
    }
  }
  if (marksIssues.length) throw new Error('Essay marks reconciliation failed:\n  ' + marksIssues.join('\n  '));

  const ids = new Set(all.map(q => q.id));
  if (all.length !== 110 || ids.size !== 110) throw new Error(`Expected 110 unique question IDs, got ${all.length}/${ids.size}`);
  for (const id of Object.keys(EXCLUDED)) if (!ids.has(id)) throw new Error(`Exclusion references unknown ID ${id}`);

  // Scope filter
  const excluded = all.filter(q => EXCLUDED[q.id]);
  const kept = all.filter(q => !EXCLUDED[q.id]);

  // Render kept questions
  const keptTopicIds = new Set(kept.map(q => q.topicId));
  const topics = [];
  const mathTally = { disp: 0, inl: 0 };
  for (const p of parsed) {
    for (const t of p.topics) {
      if (!keptTopicIds.has(t.id)) continue;
      topics.push({
        id: t.id,
        generator: p.spec.generator,
        kind: p.spec.kind,
        index: t.index,
        raw: t.raw,
        html: renderInlineHtml(t.raw, p.spec.generator),
        qids: kept.filter(q => q.topicId === t.id).map(q => q.id)
      });
    }
  }

  const topicById = {};
  for (const t of topics) topicById[t.id] = t;

  const questions = kept.map(q => {
    const g = q.generator;
    const tObj = topicById[q.topicId] || { id: q.topicId, raw: q.sourceTopic, html: renderInlineHtml(q.sourceTopic, g) };
    const rec = {
      id: q.id,
      kind: q.kind,
      generator: g,
      generatorLabel: g === 'chatgpt' ? 'ChatGPT' : 'Gemini',
      generatorSub: g === 'chatgpt' ? 'ChatGPT Plus · GPT-6 High' : 'Gemini Pro · Gemini 4 Argon High',
      sourceFile: q.sourceFile,
      seq: q.seq,
      topicId: q.topicId,
      sourceTopic: q.sourceTopic,
      topic: {
        slug: q.topicId,
        raw: q.sourceTopic,
        html: tObj.html
      },
      title: q.title,
      titleHtml: q.title ? renderInlineHtml(q.title, g) : null,
      totalMarks: q.totalMarks,
      sourceMd: q.sourceMd,
      fileInstructions: q.fileInstructions
    };
    if (q.kind === 'mcq') {
      rec.stemHtml = renderMd(q.stemMd, { generator: g }).html;
      rec.options = q.options.map(o => ({
        letter: o.letter,
        label: o.letter,
        html: renderMd(o.md, { generator: g }).html.replace(/^<p>([\s\S]*?)<\/p>\s*$/, '$1')
      }));
    } else {
      rec.scenarioHtml = q.scenarioMd ? renderMd(q.scenarioMd, { generator: g }).html : '';
      rec.parts = q.parts.map(p => ({
        label: p.label,
        marks: p.marks,
        html: renderMd(p.md, { generator: g }).html,
        subparts: p.subparts.map(s => ({ label: s.label, marks: s.marks }))
      }));
      rec.partLabels = q.partLabels;
      rec.partCount = q.partCount;
    }
    return rec;
  });

  const fileHeaders = parsed.map(p => ({
    file: p.spec.file,
    generator: p.spec.generator,
    kind: p.spec.kind,
    html: renderMd(p.headerMd, { generator: p.spec.generator }).html,
    fileInstructions: p.fileInstructions
  }));
  const fileInstructions = {};
  const fileInstructionsHtml = {};
  for (const p of parsed) {
    if (p.fileInstructions) {
      fileInstructions[p.spec.key] = p.fileInstructions;
      fileInstructionsHtml[p.spec.key] = renderMd(p.fileInstructions, { generator: p.spec.generator, inline: true }).html;
    }
  }

  const counts = {
    total: all.length,
    kept: kept.length,
    excluded: excluded.length,
    keptMcq: kept.filter(q => q.kind === 'mcq').length,
    keptEssay: kept.filter(q => q.kind === 'essay').length,
    perSource: {}
  };
  for (const key of ['C-MCQ', 'C-ESS', 'G-MCQ', 'G-ESS']) {
    counts.perSource[key] = { total: all.filter(q => q.id.startsWith(key)).length, kept: kept.filter(q => q.id.startsWith(key)).length };
  }

  const mcqs = questions.filter(q => q.kind === 'mcq');
  const essays = questions.filter(q => q.kind === 'essay');
  const data = { counts, fileStats: fileStats.map(f => ({ file: f.file, sha16: f.sha16 })), fileHeaders, fileInstructions, fileInstructionsHtml, topics, questions, mcqs, essays };

  // Retained questions that merely mention out-of-scope terms (transparency)
  const mentions = kept
    .map(q => ({ id: q.id, terms: [...new Set((q.sourceMd.match(new RegExp(OUT_OF_SCOPE_TERMS.source, 'gi')) || []).map(t => t.toLowerCase()))] }))
    .filter(x => x.terms.length);
  // Manual review note: terms are implied, not named, so the regex cannot see them.
  mentions.push({ id: 'G-ESS-015', terms: ['(implied, not named) Investigation 2 is a PCR-type regression; Investigation 3 asks for MANOVA plus a classification technique; Investigations 1 and 4 are in scope'] });

  const result = { data, all, kept, excluded, fileStats, mentions, counts };
  if (writeLog) writeExclusionLog(result);
  return result;
}

function writeExclusionLog({ all, excluded, kept, fileStats, mentions, counts }) {
  const L = [];
  L.push('# DA2451 Predicted Questions — Scope Exclusion Log (Task 4)');
  L.push('');
  L.push('Generated automatically by `APP_DEV/scripts/ingest_predictions.js`. The four source files in `Predictions/` are read-only inputs and were **not modified**; each was verified by SHA-256 below.');
  L.push('');
  L.push('**Rule applied (Master Plan §1, §Task 4):** predicted questions *dedicated* to Principal Components Regression (PCR), Regression Diagnostics, or Linear Discriminant Analysis (LDA) are omitted from the displayed collection and from the embedded data/search index. Questions that only *mention* those terms in passing are retained and listed in section 4 for your review.');
  L.push('');
  L.push('## 1. Source integrity');
  L.push('');
  L.push('| Source file | Generator | Type | SHA-256 (full) | Questions | Math (disp/inl) | Fences | Tables |');
  L.push('|---|---|---|---|---:|---:|---:|---:|');
  for (const f of fileStats) L.push(`| \`${f.file}\` | ${GENERATOR_NAME[f.generator]} | ${f.kind.toUpperCase()} | \`${f.sha256}\` | ${f.questions} | ${f.disp}/${f.inl} | ${f.fences} | ${f.tables} |`);
  L.push('');
  L.push('## 2. Counts');
  L.push('');
  L.push('| Source | Parsed | Excluded | Displayed |');
  L.push('|---|---:|---:|---:|');
  for (const [k, v] of Object.entries(counts.perSource)) L.push(`| ${k} | ${v.total} | ${v.total - v.kept} | ${v.kept} |`);
  L.push(`| **All** | **${counts.total}** | **${counts.excluded}** | **${counts.kept}** (${counts.keptMcq} MCQs + ${counts.keptEssay} essays) |`);
  L.push('');
  L.push(`## 3. Excluded questions (${excluded.length})`);
  L.push('');
  L.push('| ID | Out-of-scope topic | Source file : line | Source topic (verbatim) | Reason |');
  L.push('|---|---|---|---|---|');
  for (const q of excluded) {
    const [cat, why] = EXCLUDED[q.id];
    L.push(`| \`${q.id}\` | ${cat} | \`${q.sourceFile}\`:${q.sourceLine} | ${q.sourceTopic.replace(/\|/g, '\\|')}${q.title ? ' — ' + q.title : ''} | ${why} |`);
  }
  L.push('');
  L.push(`## 4. Retained questions that mention an out-of-scope term (${mentions.length}) — flagged for your review, NOT excluded`);
  L.push('');
  L.push('These are *not* dedicated to PCR / Regression Diagnostics / LDA (they belong to other topics and only mention a term, e.g. as one option or one sub-issue). They were kept to avoid over-removing in-scope content. Tell me if you want any of them removed.');
  L.push('');
  L.push('| ID | Terms found |');
  L.push('|---|---|');
  for (const m of mentions) L.push(`| \`${m.id}\` | ${m.terms.join(', ')} |`);
  L.push('');
  fs.writeFileSync(EXCLUSION_LOG, L.join('\n'), 'utf8');
}

module.exports = { SOURCE_FILES, EXCLUDED, renderMd, ingestAllPredictions, GENERATOR_NAME };
