/**
 * DA2451 Multivariate Methods in Business — Practice Questions Ingestion Pipeline (Task 3)
 * Follows PQs/DA2451_Practice_Questions_HTML_Integration_Guide.md (§3–§6)
 *
 * Responsibilities:
 *  1. Verify SHA-256 prefixes of all 5 read-only source files in PQs/ (PQ01–PQ05).
 *  2. Apply the 7 logged exact-match build-time patches on DA2451_PQ01_Complete_Teaching.md.
 *  3. Run the exact §6.2 reference pipeline and verify 100% of §6.8 acceptance tests:
 *     - H1/H2/H3/H4 counts, <pre> (r+text), <table> (94 total), Math disp/inline/total (3,999 total),
 *       <p>, <li>, <blockquote>, <hr>, <a>, <br>, inline <code>.
 *     - Unique heading IDs (`pqNN--<slug>`), all 40 internal `#pqNN--...` links resolved,
 *       0 KaTeX errors, 0 line-leading `>` inside display math, 0 stray `$$` or `\(`.
 *  4. Segment each worksheet into its top-level H1 reading/question units (28 worksheet questions total +
 *     PQ04 Q2(a)–Q2(d) sub-question cards), separating the visible Original Question from the
 *     explicitly toggleable Teaching Solution (`hidden` boolean attribute) and registering
 *     complete AI Prompt records (`question + complete teaching solution`) for every unit.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MarkdownIt = require('markdown-it');
const katex = require('katex');
const hljs = require('highlight.js');

const REPO_ROOT    = path.resolve(__dirname, '..');
const PQS_DIR = path.join(REPO_ROOT, 'content', 'practice');

/* ---------- 1. Authoritative Worksheet Manifest & §6.8 Invariants ---------- */
const PQ_FILES = [
  {
    id: 'pq01',
    code: 'PQ01',
    pos: '01',
    file: 'DA2451_PQ01_Complete_Teaching.md',
    sha16: '8e17ebd0f8062eaa',
    title: 'Practice Worksheet 1',
    topic: 'Introduction to Multivariate Analysis',
    chapters: ['ch01'],
    questionCount: 5,
    inv: {
      h: [11, 54, 63, 6],
      pre: 16, rPre: 16, txtPre: 0,
      tbl: 22,
      disp: 124, inl: 586, math: 710,
      p: 430, li: 119, bq: 6, hr: 0, a: 9, br: 3, code: 135
    }
  },
  {
    id: 'pq02',
    code: 'PQ02',
    pos: '02',
    file: 'DA2451_PQ02_Complete_Teaching.md',
    sha16: '9976be053671b38f',
    title: 'Practice Worksheet 2',
    topic: 'Sample Geometry and Random Sampling',
    chapters: ['ch01', 'ch02'],
    questionCount: 4,
    inv: {
      h: [9, 65, 109, 0],
      pre: 13, rPre: 12, txtPre: 1,
      tbl: 19,
      disp: 211, inl: 593, math: 804,
      p: 628, li: 114, bq: 0, hr: 0, a: 7, br: 18, code: 139
    }
  },
  {
    id: 'pq03',
    code: 'PQ03',
    pos: '03',
    file: 'DA2451_PQ03_Complete_Teaching.md',
    sha16: '5f98b98d4f66e368',
    title: 'Practice Worksheet 3',
    topic: 'Multivariate Normal Distribution, Part I',
    chapters: ['ch07', 'ch02'],
    questionCount: 11,
    inv: {
      h: [15, 87, 163, 0],
      pre: 12, rPre: 12, txtPre: 0,
      tbl: 10,
      disp: 251, inl: 925, math: 1176,
      p: 738, li: 181, bq: 11, hr: 14, a: 0, br: 16, code: 44
    }
  },
  {
    id: 'pq04',
    code: 'PQ04',
    pos: '04',
    file: 'DA2451_PQ04_Complete_Teaching.md',
    sha16: '4990b542d4332e41',
    title: 'Practice Worksheet 4',
    topic: 'Multivariate Normal Distribution, Part II (Normality, Box–Cox & Outliers)',
    chapters: ['ch07'],
    questionCount: 2,
    inv: {
      h: [13, 63, 55, 0],
      pre: 30, rPre: 30, txtPre: 0,
      tbl: 14,
      disp: 88, inl: 524, math: 612,
      p: 444, li: 151, bq: 3, hr: 13, a: 12, br: 12, code: 166
    }
  },
  {
    id: 'pq05',
    code: 'PQ05',
    pos: '05',
    file: 'DA2451_PQ05_Complete_Teaching.md',
    sha16: 'de184791f30c6482',
    title: 'Practice Worksheet 5',
    topic: 'Inferences About a Mean Vector & Comparisons of Several Multivariate Means',
    chapters: ['ch08', 'ch09'],
    questionCount: 6,
    inv: {
      h: [13, 64, 94, 0],
      pre: 19, rPre: 16, txtPre: 3,
      tbl: 29,
      disp: 143, inl: 554, math: 697,
      p: 571, li: 92, bq: 7, hr: 13, a: 12, br: 10, code: 196
    }
  }
];

/* ---------- 2. Logged Exact-Match Patches on PQ01 (§4 P-1 & §6.2) ---------- */
const PQ01_PATCHES = [
  {
    id: 'PQ-P-1a',
    desc: 'DA2451_PQ01_Complete_Teaching.md L37: Escape currency $42',
    oldStr: 'sales of $42 and a book count of $4$',
    newStr: 'sales of \\$42 and a book count of $4$'
  },
  {
    id: 'PQ-P-1b',
    desc: 'DA2451_PQ01_Complete_Teaching.md L107: Escape three currency $50 tokens',
    oldStr: 'average $50 each. Two receipts are above $50 and two are below $50.',
    newStr: 'average \\$50 each. Two receipts are above \\$50 and two are below \\$50.'
  },
  {
    id: 'PQ-P-1c',
    desc: 'DA2451_PQ01_Complete_Teaching.md L198: Escape currency $1',
    oldStr: '“a $1 increase causes',
    newStr: '“a \\$1 increase causes'
  },
  {
    id: 'PQ-P-1d',
    desc: 'DA2451_PQ01_Complete_Teaching.md L514: Escape currency $18,950 and $18.95',
    oldStr: 'means **$18,950**, not $18.95. The data',
    newStr: 'means **\\$18,950**, not \\$18.95. The data'
  },
  {
    id: 'PQ-P-1e',
    desc: 'DA2451_PQ01_Complete_Teaching.md L520: Escape currency $1,000 in table header',
    oldStr: '| Price in $1,000 ($X_2$) |',
    newStr: '| Price in \\$1,000 ($X_2$) |'
  },
  {
    id: 'PQ-P-1f',
    desc: 'DA2451_PQ01_Complete_Teaching.md L609: Escape currency $12,481',
    oldStr: 'is **$12,481**.',
    newStr: 'is **\\$12,481**.'
  },
  {
    id: 'PQ-P-1g',
    desc: 'DA2451_PQ01_Complete_Teaching.md L663: Close inline math $30.8544$',
    oldStr: 'as $30.8544 thousand dollars**',
    newStr: 'as $30.8544$ thousand dollars**'
  }
];

function applyPq01Patches(src, patchLog = []) {
  let out = src;
  for (const p of PQ01_PATCHES) {
    const count = out.split(p.oldStr).length - 1;
    if (count !== 1) {
      throw new Error(`Patch ${p.id} match count=${count} (expected 1) on DA2451_PQ01_Complete_Teaching.md`);
    }
    out = out.split(p.oldStr).join(p.newStr);
    patchLog.push(p);
  }
  return out;
}

const esc = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const slug = h =>
  String(h)
    .replace(/`/g, '')
    .replace(/\*+/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}_\s-]/gu, '')
    .trim()
    .replace(/\s/g, '-');

const L = '\uE000';
const R = '\uE001';
const PH = new RegExp(L + '(\\d+)' + R, 'g');

/* ---------- 3. Reference Build Pipeline (§6.2) & §6.8 Invariant Verifier ---------- */
function runReferencePqBuild(spec, options = {}) {
  const { katexOutput = 'html', decorateBlocks = false, patchLog = [] } = options;
  const fullPath = path.join(PQS_DIR, spec.file);
  const rawBuf = fs.readFileSync(fullPath);
  const sha16 = crypto.createHash('sha256').update(rawBuf).digest('hex').slice(0, 16);
  if (sha16 !== spec.sha16) {
    throw new Error(`SHA-256 mismatch on ${spec.file}: expected ${spec.sha16}, got ${sha16}`);
  }

  let src = rawBuf.toString('utf8').replace(/\r\n?/g, '\n');
  if (spec.code === 'PQ01') {
    src = applyPq01Patches(src, patchLog);
  }

  const store = [];
  const put = o => {
    store.push(o);
    return L + (store.length - 1) + R;
  };

  // 1. Fenced code blocks
  const lines = src.split('\n');
  const out = [];
  for (let i = 0; i < lines.length; ) {
    const m = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*$/);
    if (m) {
      const close = new RegExp('^\\s*' + m[2][0] + '{' + m[2].length + ',}\\s*$');
      let j = i + 1;
      const b = [];
      while (j < lines.length && !close.test(lines[j])) b.push(lines[j++]);
      if (j >= lines.length) throw new Error('Unclosed fence at line ' + (i + 1) + ' in ' + spec.file);
      out.push(put({ k: 'fence', v: b.join('\n'), lang: (m[3] || 'text').trim() }));
      i = j + 1;
    } else {
      out.push(lines[i++]);
    }
  }
  src = out.join('\n');

  // 2. Inline code, 3. Display math, 4. Inline math (skip \$)
  src = src.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g, (m, t, b) =>
    put({ k: 'code', v: b.replace(/^ (.*) $/, '$1'), raw: m })
  );
  const dq = x => x.replace(/^[ \t]*>[ \t]?/gm, ''); // P-2: strip blockquote prefixes inside math
  const M = d => (m, b) => put({ k: 'math', v: dq(b), disp: d, raw: m });
  src = src
    .replace(/\$\$([\s\S]+?)\$\$/g, M(true))
    .replace(/(?<!\\)\$((?:\\[\s\S]|[^$\\\n])+?)\$/g, M(false));

  const md = new MarkdownIt({ html: false, linkify: false, typographer: false, breaks: false });

  const restore = h =>
    h.replace(PH, (_, n) => {
      const s = store[+n];
      if (s.k === 'fence') {
        const lang = (s.lang || 'text').toLowerCase();
        const isR = lang === 'r';
        const hi = isR && hljs.getLanguage('r')
          ? hljs.highlight(s.v, { language: 'r', ignoreIllegals: true }).value
          : esc(s.v);
        if (!decorateBlocks) {
          return `<pre class="code" data-lang="${esc(s.lang)}"><code>${esc(s.v)}</code></pre>`;
        }
        const badgeLabel = isR ? 'R Code' : 'Dataset / Output';
        return `<div class="code-card ${isR ? 'code-card--r' : 'code-card--out'}">
          <div class="code-bar">
            <span class="code-lang">${badgeLabel}</span>
            <button type="button" class="btn btn-ghost code-copy-btn" style="min-height:26px;padding:0 8px;font-size:var(--fs-xs)" data-action="copy-code" aria-label="Copy ${badgeLabel}">
              <svg class="ic ic-a" width="14" height="14" aria-hidden="true"><use href="#i-copy"/></svg>
              <svg class="ic ic-b" width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>
              <span class="btn-label">Copy</span>
            </button>
          </div>
          <pre class="code" data-lang="${esc(s.lang)}"><code class="hljs language-${isR ? 'r' : 'plaintext'}">${hi}</code></pre>
        </div>`;
      }
      if (s.k === 'code') return `<code>${esc(s.v)}</code>`;
      const rendered = katex.renderToString(s.v, {
        displayMode: s.disp,
        throwOnError: true,
        strict: 'warn',
        trust: false,
        output: katexOutput
      });
      if (!decorateBlocks) return rendered;
      if (s.disp) {
        return `<span class="math-display-wrap" data-tex="${esc(s.v.trim())}">${rendered}</span>`;
      }
      // P-4: wrap long inline math (>50 chars) in .m-scroll so 390px viewports never overflow
      if (s.v.length > 50) {
        return `<span class="m-scroll math-inline">${rendered}</span>`;
      }
      return `<span class="math-inline">${rendered}</span>`;
    });

  const rawText = t => t.replace(PH, (_, n) => store[+n].raw);
  const toc = [];
  const seen = {};
  const pre = spec.code.toLowerCase();

  md.core.ruler.push('ids', st => {
    for (const t of st.tokens) {
      if (t.type === 'heading_open') {
        const inl = st.tokens[st.tokens.indexOf(t) + 1];
        let s = slug(rawText(inl.content)) || 'section';
        const c = (seen[s] = (seen[s] ?? -1) + 1);
        if (c) s += '-' + c;
        const hid = `${pre}--${s}`;
        t.attrSet('id', hid);
        toc.push({
          level: +t.tag[1],
          id: hid,
          html: md.renderer.renderInline(inl.children, md.options, {}),
          text: rawText(inl.content)
        });
      }
      if (t.type === 'inline') {
        for (const c of t.children || []) {
          if (c.type === 'link_open') {
            const h = c.attrGet('href') || '';
            if (h.startsWith('#')) {
              c.attrSet('href', '#' + pre + '--' + h.slice(1));
            }
          }
        }
      }
    }
  });

  md.renderer.rules.table_open = (t, i, o) =>
    `<div class="${decorateBlocks ? 'table-scroll' : 'table-wrap'}">` + md.renderer.renderToken(t, i, o);
  md.renderer.rules.table_close = () => '</table></div>';

  const html = restore(md.render(src));
  toc.forEach(t => {
    t.html = restore(t.html);
  });

  return { html, toc, store, sha16, patchedSrc: src };
}

function verifyAllPqInvariants(katexOutput = 'html') {
  const results = [];
  const patchLog = [];
  const allHeadingIds = new Set();

  for (const spec of PQ_FILES) {
    const { html, toc, store, sha16 } = runReferencePqBuild(spec, {
      katexOutput,
      decorateBlocks: false,
      patchLog
    });

    const h = [1, 2, 3, 4].map(lv => toc.filter(t => t.level === lv).length);
    const fences = store.filter(s => s.k === 'fence');
    const rPre = fences.filter(s => s.lang === 'r').length;
    const txtPre = fences.filter(s => s.lang !== 'r').length;
    const preCount = (html.match(/<pre class="code"/g) || []).length;
    const tblCount = (html.match(/<table>/g) || []).length;
    const dispMath = store.filter(s => s.k === 'math' && s.disp);
    const inlMath = store.filter(s => s.k === 'math' && !s.disp);
    const pCount = (html.match(/<p>/g) || []).length;
    const liCount = (html.match(/<li>/g) || []).length;
    const bqCount = (html.match(/<blockquote>/g) || []).length;
    const hrCount = (html.match(/<hr>/g) || []).length;
    const aCount = (html.match(/<a /g) || []).length;
    const brCount = (html.match(/<br>/g) || []).length;
    const codeCount = store.filter(s => s.k === 'code').length;
    const leftoverPlaceholders = (html.match(PH) || []).length;
    const katexErrors = (html.match(/katex-error/g) || []).length;
    const bqInDispMath = dispMath.filter(m => /^[ \t]*>/m.test(m.v)).length;

    // Verify heading ID uniqueness and internal anchor resolution
    const localIds = new Set();
    for (const t of toc) {
      if (localIds.has(t.id) || allHeadingIds.has(t.id)) {
        throw new Error(`Duplicate heading ID ${t.id} in ${spec.file}`);
      }
      localIds.add(t.id);
      allHeadingIds.add(t.id);
    }

    const internalLinks = [...html.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
    for (const targetId of internalLinks) {
      if (!localIds.has(targetId)) {
        throw new Error(`Unresolved internal anchor #${targetId} in ${spec.file}`);
      }
    }

    const exp = spec.inv;
    const ok =
      h.join('/') === exp.h.join('/') &&
      preCount === exp.pre &&
      rPre === exp.rPre &&
      txtPre === exp.txtPre &&
      tblCount === exp.tbl &&
      dispMath.length === exp.disp &&
      inlMath.length === exp.inl &&
      dispMath.length + inlMath.length === exp.math &&
      pCount === exp.p &&
      liCount === exp.li &&
      bqCount === exp.bq &&
      hrCount === exp.hr &&
      aCount === exp.a &&
      brCount === exp.br &&
      codeCount === exp.code &&
      leftoverPlaceholders === 0 &&
      katexErrors === 0 &&
      bqInDispMath === 0;

    if (!ok) {
      throw new Error(
        `PQ Invariant mismatch in ${spec.file}: actual=${JSON.stringify({
          h, preCount, rPre, txtPre, tblCount, disp: dispMath.length, inl: inlMath.length,
          pCount, liCount, bqCount, hrCount, aCount, brCount, codeCount,
          leftoverPlaceholders, katexErrors, bqInDispMath
        })} vs expected=${JSON.stringify(exp)}`
      );
    }

    results.push({
      id: spec.id,
      code: spec.code,
      file: spec.file,
      sha16,
      stats: {
        h,
        pre: preCount,
        rPre,
        txtPre,
        tbl: tblCount,
        disp: dispMath.length,
        inl: inlMath.length,
        math: dispMath.length + inlMath.length,
        p: pCount,
        li: liCount,
        bq: bqCount,
        hr: hrCount,
        a: aCount,
        br: brCount,
        code: codeCount,
        resolvedAnchors: internalLinks.length
      }
    });
  }

  return { results, patchLog };
}

/* ---------- 4. Segment Worksheet into Reading & Question Units ---------- */
function splitRawMarkdownIntoH1Blocks(rawMd) {
  const lines = rawMd.split('\n');
  const h1Indices = [];
  let inFence = false;
  let fenceChar = '';
  let fenceLen = 0;

  for (let i = 0; i < lines.length; i++) {
    const fm = lines[i].match(/^\s*(`{3,}|~{3,})/);
    if (fm) {
      const ch = fm[1][0];
      const len = fm[1].length;
      if (!inFence) {
        inFence = true;
        fenceChar = ch;
        fenceLen = len;
      } else if (ch === fenceChar && len >= fenceLen && /^\s*(`{3,}|~{3,})\s*$/.test(lines[i])) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;
    if (/^#\s+/.test(lines[i])) {
      h1Indices.push({ title: lines[i].replace(/^#\s+/, '').trim(), lineIdx: i });
    }
  }

  return { lines, h1Indices };
}

function splitQuestionRawMarkdown(qLines, pqCode, qTitle) {
  // Find where the Original Question ends and the Teaching Solution begins
  // In all 28 questions, the first H2 is `## Original question...` (and in PQ05 Q3, followed by `## Original external Table 6.1...`).
  // In PQ04 Q2 (`# Question 2. Wisconsin snow-removal data`), `## Original Question 2 (page 1)` is followed by `## Q2.0. The real data...`.
  // In PQ04 Q2(a)..Q2(d), the H1 is `# Question 2(a)...` and the first H2 is `## Q2(a)-1...`.
  let inFence = false;
  let fenceChar = '';
  let fenceLen = 0;
  const headings = [];

  for (let i = 1; i < qLines.length; i++) {
    const fm = qLines[i].match(/^\s*(`{3,}|~{3,})/);
    if (fm) {
      const ch = fm[1][0];
      const len = fm[1].length;
      if (!inFence) {
        inFence = true;
        fenceChar = ch;
        fenceLen = len;
      } else if (ch === fenceChar && len >= fenceLen && /^\s*(`{3,}|~{3,})\s*$/.test(qLines[i])) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;
    const hm = qLines[i].match(/^(#{2,3})\s+(.+)$/);
    if (hm) {
      headings.push({ level: hm[1].length, text: hm[2].trim(), lineIdx: i });
    }
  }

  // Case A: PQ04 Q2(a)..Q2(d) sibling part H1s
  if (pqCode === 'PQ04' && /^Question\s+2\([a-d]\)/i.test(qTitle)) {
    const firstH2 = headings.find(h => h.level === 2);
    const splitIdx = firstH2 ? firstH2.lineIdx : 1;
    return {
      questionMd: qLines.slice(0, splitIdx).join('\n').trim(),
      solutionMd: qLines.slice(splitIdx).join('\n').trim()
    };
  }

  // Case B: Standard question with `## Original question...`
  let solStartLine = -1;
  for (let hi = 0; hi < headings.length; hi++) {
    const h = headings[hi];
    if (/^Original/i.test(h.text)) {
      continue;
    }
    // In PQ04 Q2 parent section, keep `## Q2.0. The real data...` in the solution/data drawer or visible?
    // Keeping Q2.0 in the solution drawer lets the student see the concise Original Question 2 first and expand the 25-row data table on demand!
    solStartLine = h.lineIdx;
    break;
  }

  if (solStartLine < 0) {
    return {
      questionMd: qLines.join('\n').trim(),
      solutionMd: ''
    };
  }

  return {
    questionMd: qLines.slice(0, solStartLine).join('\n').trim(),
    solutionMd: qLines.slice(solStartLine).join('\n').trim()
  };
}

function ingestAllPracticeQuestions(options = {}) {
  const { katexOutput = 'html' } = options;

  // Step 1: Verify all §6.8 whole-file invariants first
  const { results: invariantResults, patchLog } = verifyAllPqInvariants(katexOutput);

  const worksheets = [];
  const promptRecords = {};

  for (const spec of PQ_FILES) {
    const fullPath = path.join(PQS_DIR, spec.file);
    let rawMd = fs.readFileSync(fullPath, 'utf8').replace(/\r\n?/g, '\n');
    if (spec.code === 'PQ01') {
      rawMd = applyPq01Patches(rawMd);
    }

    // Run decorated build to get exact heading IDs (`pqNN--...`) and TOC
    const { html: fullDecoratedHtml, toc } = runReferencePqBuild(spec, {
      katexOutput,
      decorateBlocks: true
    });

    // Split rawMd at H1 boundaries for clean AI prompt extraction
    const { lines: rawLines, h1Indices } = splitRawMarkdownIntoH1Blocks(rawMd);
    const rawH1Sections = h1Indices.map((h1, idx) => {
      const endLine = idx + 1 < h1Indices.length ? h1Indices[idx + 1].lineIdx : rawLines.length;
      return {
        title: h1.title,
        lines: rawLines.slice(h1.lineIdx, endLine)
      };
    });

    // Split fullDecoratedHtml at `<h1 id="pqNN--...">` boundaries so 100% of heading IDs & internal links match the whole-file build!
    const h1Regex = /(?=<h1 id="pq\d{2}--[^"]+">)/g;
    const htmlGroups = fullDecoratedHtml.split(h1Regex).filter(g => g.trim() !== '');

    if (htmlGroups.length !== rawH1Sections.length) {
      throw new Error(`H1 group count mismatch in ${spec.file}: htmlGroups=${htmlGroups.length} vs rawH1=${rawH1Sections.length}`);
    }

    const units = [];
    const anchorToUnit = {};
    let qCounter = 0;
    let pq04Q2ParentQuestionMd = '';

    for (let i = 0; i < htmlGroups.length; i++) {
      const groupHtml = htmlGroups[i];
      const rawSec = rawH1Sections[i];
      const h1Title = rawSec.title;

      // Map all `id="pqNN--..."` inside this group to unit index `i`
      for (const m of groupHtml.matchAll(/\bid="(pq\d{2}--[^"]+)"/g)) {
        anchorToUnit[m[1]] = i;
      }

      // Determine whether this H1 is a Worksheet Question (`^Question\s+\d+`)
      const qMatch = h1Title.match(/^Question\s+(\d+)(?:\(([a-d])\))?/i);
      // Note: In PQ01 lines 1989–2043, those `# Question 1: bookstore receipts` lines were inside an R code fence,
      // which our fence-aware H1 splitter already ignored!
      if (qMatch) {
        const qNum = parseInt(qMatch[1], 10);
        const subLetter = qMatch[2] ? qMatch[2].toLowerCase() : null;

        let unitId;
        let isSubQuestionCard = false;
        if (spec.code === 'PQ04' && subLetter) {
          unitId = `${spec.code}-Q0${qNum}-${subLetter}`;
          isSubQuestionCard = true;
        } else {
          qCounter++;
          unitId = `${spec.code}-Q${String(qNum).padStart(2, '0')}`;
        }
        anchorToUnit[unitId] = i;

        const { questionMd, solutionMd } = splitQuestionRawMarkdown(rawSec.lines, spec.code, h1Title);
        if (spec.code === 'PQ04' && qNum === 2 && !subLetter) {
          pq04Q2ParentQuestionMd = questionMd;
        }

        // Split groupHtml at the first solution heading (`<h2` or `<h3` that is NOT `Original`)
        let questionHtml = groupHtml;
        let solutionHtml = '';

        const headingMatches = [...groupHtml.matchAll(/<h([23])\s+id="(pq\d{2}--[^"]+)">([\s\S]*?)<\/h\1>/g)];
        let splitCharIdx = -1;
        for (const hm of headingMatches) {
          const plainHeading = hm[3].replace(/<[^>]+>/g, '').trim();
          if (/^Original/i.test(plainHeading)) continue;
          splitCharIdx = hm.index;
          break;
        }

        if (splitCharIdx >= 0) {
          questionHtml = groupHtml.slice(0, splitCharIdx);
          solutionHtml = groupHtml.slice(splitCharIdx);
        }

        // For PQ04 Q2(a)-(d) sibling cards, include the specific part prompt from Q2's original question
        let subPromptContextHtml = '';
        let promptQuestionMd = questionMd;
        if (isSubQuestionCard && pq04Q2ParentQuestionMd) {
          promptQuestionMd = `${pq04Q2ParentQuestionMd}\n\nFocus on Part (${subLetter}): ${h1Title}`;
          const partLineMatch = pq04Q2ParentQuestionMd.match(new RegExp(`>\\s*\\*\\*\\(${subLetter}\\)\\*\\*[^\\n]+`, 'i'));
          if (partLineMatch) {
            const partLineClean = partLineMatch[0].replace(/^>\s*/, '');
            subPromptContextHtml = `<blockquote class="pq-part-quote"><p>${esc(partLineClean)}</p></blockquote>`;
          }
        }

        const metaLabel = `${spec.title} (${spec.code}) · ${h1Title}`;
        promptRecords[unitId] = {
          type: 'pq',
          meta: metaLabel,
          question: promptQuestionMd,
          answer: solutionMd || 'Complete teaching explanation provided in worksheet.'
        };

        const h1Match = groupHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const titleHtml = h1Match ? h1Match[1].trim() : h1Title;

        units.push({
          idx: i,
          kind: isSubQuestionCard ? 'subquestion' : 'question',
          unitId,
          qNum,
          subLetter,
          title: h1Title,
          titleHtml,
          questionHtml: questionHtml + subPromptContextHtml,
          solutionHtml,
          rawQuestionMd: promptQuestionMd
        });
      } else {
        const unitId = `${spec.code}-U${String(i + 1).padStart(2, '0')}`;
        const h1Match = groupHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
        const titleHtml = h1Match ? h1Match[1].trim() : h1Title;
        units.push({
          idx: i,
          kind: 'reading',
          unitId,
          title: h1Title,
          titleHtml,
          html: groupHtml
        });
      }
    }

    // If PQ04, also enrich PQ04-Q02 parent prompt record so its answer includes 2(a)..2(d) solutions
    if (spec.code === 'PQ04' && promptRecords['PQ04-Q02']) {
      const subParts = ['a', 'b', 'c', 'd']
        .map(l => promptRecords[`PQ04-Q02-${l}`])
        .filter(Boolean)
        .map(r => r.answer);
      promptRecords['PQ04-Q02'].answer = [promptRecords['PQ04-Q02'].answer].concat(subParts).filter(Boolean).join('\n\n');
    }

    if (qCounter !== spec.questionCount) {
      throw new Error(`Worksheet question count mismatch in ${spec.file}: got ${qCounter}, expected ${spec.questionCount}`);
    }

    worksheets.push({
      meta: {
        id: spec.id,
        code: spec.code,
        pos: spec.pos,
        file: spec.file,
        sha16: spec.sha16,
        title: spec.title,
        topic: spec.topic,
        chapters: spec.chapters,
        questionCount: spec.questionCount
      },
      toc,
      units,
      anchorToUnit
    });
  }

  return {
    worksheets,
    promptRecords,
    invariantResults,
    patchLog
  };
}

module.exports = {
  PQ_FILES,
  PQ01_PATCHES,
  runReferencePqBuild,
  verifyAllPqInvariants,
  ingestAllPracticeQuestions
};
