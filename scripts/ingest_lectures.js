/**
 * DA2451 Multivariate Methods in Business — Lecture Markdown Ingestion & Verification (Task 2)
 * Follows Lecs/.MDs/DA2451_Lecture_HTML_Integration_Guide.md (§1–§6) and Design Skill (§4, §8).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MarkdownIt = require('markdown-it');
const katex = require('katex');
const hljs = require('highlight.js/lib/core');
hljs.registerLanguage('r', require('highlight.js/lib/languages/r'));

const REPO_ROOT    = path.resolve(__dirname, '..');
const LECS_MD_DIR  = path.join(REPO_ROOT, 'content', 'lectures', 'markdown');

const CHAPTER_MANIFEST = [
  { pos: '01', id: 'ch01', file: 'DA2451_Lec01_Introduction_Teaching.md', pdf: 'Lec1.pdf', title: 'Introduction to Multivariate Analysis', kind: 'core', expectedSha16: 'c7691a2fd6a28e09' },
  { pos: '02', id: 'ch02', file: 'DA2451_Lec02_Matrix_Algebra_Teaching.md', pdf: 'Lec2.pdf', title: 'Review of Matrix Algebra', kind: 'core', expectedSha16: '1031dd27e6793ab2' },
  { pos: '03', id: 'ch03', file: 'DA2451_Lec03_PCA_Teaching.md', pdf: 'Lec3.pdf', title: 'Principal Component Analysis', kind: 'core', expectedSha16: 'ecf336906ddf0bde' },
  { pos: '04', id: 'ch04', file: 'DA2451_PCA_R_Methods_Teaching.md', pdf: 'PCA-R-2013.pdf', title: 'PCA in R: Supplementary Methods', kind: 'supplementary', expectedSha16: '6b8e35ba7a4f1908' },
  { pos: '05', id: 'ch05', file: 'DA2451_Lec05_Factor_Analysis_Teaching.md', pdf: 'Lec5.pdf', title: 'Factor Analysis', kind: 'core', expectedSha16: '5afb5de48c26ce0e' },
  { pos: '06', id: 'ch06', file: 'DA2451_Lec05_Extra_Factor_Analysis_Teaching.md', pdf: 'Lec5Extra.pdf', title: 'Factor Analysis: Additional Remarks', kind: 'supplementary', expectedSha16: '26c79b56982a7516' },
  { pos: '07', id: 'ch07', file: 'DA2451_Lec06_Multivariate_Normal_Teaching.md', pdf: 'Lec6.pdf', title: 'Multivariate Normal Distribution', kind: 'core', expectedSha16: '5a61d12e48b6b1f3' },
  { pos: '08', id: 'ch08', file: 'DA2451_Lec07_Mean_Vector_Inference_Teaching.md', pdf: 'Lec7.pdf', title: 'Inferences About a Mean Vector', kind: 'core', expectedSha16: 'cea4098d01d593d3' },
  { pos: '09', id: 'ch09', file: 'DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md', pdf: 'Lec8.pdf', title: 'Comparisons of Several Multivariate Means', kind: 'core', expectedSha16: '561145b1395e3efe' },
  { pos: '10', id: 'ch10', file: 'DA2451_Lec09_MMLR_Teaching.md', pdf: 'Lec9.pdf', title: 'Multivariate Multiple Linear Regression', kind: 'core', expectedSha16: 'c5e9f0680b15df17' },
  { pos: '11', id: 'ch11', file: 'DA2451_Multivariate_Linear_Models_R_Teaching.md', pdf: 'Multivariate-Linear-Models.pdf', title: 'Multivariate Linear Models in R: Supplementary Reference', kind: 'supplementary', expectedSha16: '82c776277ab274b0' }
];

// Logged, exact-match build-time patches (source files on disk remain completely untouched)
const PATCHES = {
  'DA2451_Lec07_Mean_Vector_Inference_Teaching.md': [
    {
      id: 'LEC-I-1',
      desc: 'Close unclosed inline $ on $42.50 at line 2265',
      oldStr: 'is $\\$42.50. Identify the population',
      newStr: 'is $\\$42.50$. Identify the population'
    }
  ]
};

const esc = s => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const slug = h => h
  .replace(/`/g, '')
  .replace(/\*+/g, '')
  .toLowerCase()
  .replace(/[^\p{L}\p{N}_\s-]/gu, '')
  .trim()
  .replace(/\s+/g, '-');

const L = '\uE000';
const R = '\uE001';
const PH = new RegExp(L + '(\\d+)' + R, 'g');

// Group heading regex from Lecture Integration Guide §5.1
const GROUP_H1_RE = /^(part\s+[ivx]+\b|chapter\s+\d+\.|\d+\.\s|appendix\s+[a-z]\b)/i;

function styleSourceTagsInHeading(htmlStr) {
  // Wrap trailing literal bracket tags like [SOURCE, p. 1], [TEACHING EXTENSION], [CORRECTION, ...]
  return htmlStr.replace(/(\[(?:SOURCE|TEACHING|CORRECTION|Lecture)[^\]]*\])\s*$/i, (match, tag) => {
    const isCorr = /^\[CORRECTION/i.test(tag);
    return `<span class="src-tag${isCorr ? ' src-tag--correction' : ''}">${tag}</span>`;
  });
}

function ingestChapter(chMeta, options = {}) {
  const katexOutput = options.katexOutput || 'html';
  const filePath = path.join(LECS_MD_DIR, chMeta.file);
  const rawBuf = fs.readFileSync(filePath);
  const sha256 = crypto.createHash('sha256').update(rawBuf).digest('hex');
  const sha16 = sha256.slice(0, 16);

  let src = rawBuf.toString('utf8').replace(/\r\n?/g, '\n');
  const appliedPatches = [];

  for (const p of (PATCHES[chMeta.file] || [])) {
    const occurrences = src.split(p.oldStr).length - 1;
    if (occurrences !== 1) {
      throw new Error(`Patch ${p.id} in ${chMeta.file} matched ${occurrences} times (expected 1)`);
    }
    src = src.replace(p.oldStr, p.newStr);
    appliedPatches.push({ id: p.id, file: chMeta.file, desc: p.desc });
  }

  const store = [];
  const put = obj => {
    store.push(obj);
    return L + (store.length - 1) + R;
  };

  // 1. Protect fenced code blocks (r and text)
  const lines = src.split('\n');
  const out = [];
  for (let i = 0; i < lines.length;) {
    const m = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*$/);
    if (m) {
      const close = new RegExp('^\\s*' + m[2][0] + '{' + m[2].length + ',}\\s*$');
      let j = i + 1;
      const body = [];
      while (j < lines.length && !close.test(lines[j])) {
        body.push(lines[j++]);
      }
      if (j >= lines.length) {
        throw new Error(`Unclosed fence in ${chMeta.file} at line ${i + 1}`);
      }
      out.push(put({
        k: 'fence',
        v: body.join('\n'),
        lang: (m[3] || 'text').toLowerCase(),
        raw: lines.slice(i, j + 1).join('\n')
      }));
      i = j + 1;
    } else {
      out.push(lines[i++]);
    }
  }
  src = out.join('\n');

  // 2. Protect inline code spans
  src = src.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g, (m, t, b) =>
    put({ k: 'code', v: b.replace(/^ (.*) $/, '$1'), raw: m })
  );

  // 3. Protect all 4 math dialects: $$...$$, \[...\], \(...\), $...$
  const M = disp => (m, b) => put({ k: 'math', v: b, disp, raw: m });
  src = src
    .replace(/\$\$([\s\S]+?)\$\$/g, M(true))
    .replace(/\\\[([\s\S]+?)\\\]/g, M(true))
    .replace(/\\\(([\s\S]+?)\\\)/g, M(false))
    .replace(/(?<!\\)\$((?:\\[\s\S]|[^$\\\n])+?)\$/g, M(false));

  // 4. Parse Markdown with markdown-it
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false, breaks: false });
  const rawText = t => t.replace(PH, (_, n) => store[+n].raw);

  const toc = [];
  const seen = {};
  const nn = chMeta.pos;

  md.core.ruler.push('ids_and_links', st => {
    const T = st.tokens;
    for (let i = 0; i < T.length; i++) {
      if (T[i].type === 'heading_open') {
        const inl = T[i + 1];
        const rawHeading = rawText(inl.content);
        let s = slug(rawHeading) || 'section';
        const c = (seen[s] = (seen[s] ?? -1) + 1);
        if (c) s += '-' + c;
        const id = `ch${nn}--${s}`;
        T[i].attrSet('id', id);
        toc.push({
          level: +T[i].tag[1],
          id,
          raw: rawHeading,
          html: md.renderer.renderInline(inl.children, md.options, {}),
          anchor: s
        });
      }
      if (T[i].type === 'blockquote_open') {
        T[i].attrSet('class', 'callout');
      }
      if (T[i].type === 'paragraph_open' || T[i].type === 'list_item_open') {
        // Check if inline token inside contains math placeholder
        const nextTok = T[i + 1];
        if (nextTok && nextTok.type === 'inline' && PH.test(nextTok.content)) {
          PH.lastIndex = 0;
          let hasInlineMath = false;
          nextTok.content.replace(PH, (_, idx) => {
            if (store[+idx] && store[+idx].k === 'math' && !store[+idx].disp) hasInlineMath = true;
          });
          if (hasInlineMath) T[i].attrJoin('class', 'has-math');
        }
      }
      if (T[i].type === 'table_open') {
        // Count columns in first row
        let cols = 0;
        for (let k = i + 1; k < T.length && T[k].type !== 'tr_close'; k++) {
          if (T[k].type === 'th_open' || T[k].type === 'td_open') cols++;
        }
        T[i].attrSet('class', cols >= 8 ? 'md-table md-table--wide' : 'md-table');
        T[i].meta = { wide: cols >= 8, cols };
      }
      if (T[i].type === 'inline') {
        for (const c of T[i].children || []) {
          if (c.type === 'link_open') {
            const h = c.attrGet('href') || '';
            if (h.startsWith('#')) {
              c.attrSet('href', `#ch${nn}--${h.slice(1)}`);
            } else if (/^https?:/.test(h)) {
              c.attrSet('target', '_blank');
              c.attrSet('rel', 'noopener noreferrer');
              c.attrSet('class', 'external');
            }
          }
        }
      }
    }
  });

  md.renderer.rules.table_open = (tokens, idx, opts) => {
    const wide = tokens[idx].meta && tokens[idx].meta.wide;
    return `<div class="table-wrap${wide ? ' table-wrap--wide' : ''}" tabindex="0" role="region" aria-label="Statistical table">` + md.renderer.renderToken(tokens, idx, opts);
  };
  md.renderer.rules.table_close = () => '</table></div>';

  const restore = (h, inHeading = false) =>
    h.replace(PH, (_, n) => {
      const s = store[+n];
      if (s.k === 'fence') {
        const isR = s.lang === 'r';
        const highlighted = isR
          ? hljs.highlight(s.v, { language: 'r', ignoreIllegals: true }).value
          : esc(s.v);
        const label = isR ? 'R' : 'Output';
        return `<div class="code-card${isR ? '' : ' code-card--output'}"><div class="code-head"><span>${label}</span><button type="button" class="btn btn-ghost code-copy-btn" data-action="copy-code" aria-label="Copy ${label}">Copy</button></div><pre class="code" data-lang="${esc(s.lang)}"><code class="language-${esc(s.lang)}">${highlighted}</code></pre></div>`;
      }
      if (s.k === 'code') {
        return `<code>${esc(s.v)}</code>`;
      }
      const renderedMath = katex.renderToString(s.v, {
        displayMode: s.disp,
        throwOnError: true,
        strict: 'warn',
        trust: false,
        output: katexOutput
      });
      if (s.disp && !inHeading) {
        return `<div class="math-block" data-tex="${esc(s.v.trim())}">${renderedMath}<button type="button" class="btn btn-ghost copy-tex" data-action="copy-tex" title="Copy TeX" aria-label="Copy TeX">Copy TeX</button></div>`;
      }
      return renderedMath;
    });

  let rawHtml = md.render(src);
  let fullHtml = restore(rawHtml, false);

  // Style source tags in headings inside fullHtml
  fullHtml = fullHtml.replace(/<(h[1-4])\b([^>]*)>([\s\S]*?)<\/\1>/g, (m, tag, attrs, inner) => {
    return `<${tag}${attrs}>${styleSourceTagsInHeading(inner)}</${tag}>`;
  });

  // Restore inline math/code in TOC entries and assign structural roles (§5.1)
  let seenFirstGroup = false;
  toc.forEach((t, idx) => {
    t.html = restore(t.html, true);
    if (t.level === 1 && GROUP_H1_RE.test(t.raw.trim())) {
      seenFirstGroup = true;
      t.role = 'group'; // L1 group
    } else if (!seenFirstGroup) {
      t.role = 'front';
    } else if (t.level === 2) {
      t.role = 'l2';
    } else {
      t.role = 'l3';
    }
  });

  // Compute verification invariant counts on fullHtml
  const h1Count = (fullHtml.match(/<h1\b/g) || []).length;
  const h2Count = (fullHtml.match(/<h2\b/g) || []).length;
  const h3Count = (fullHtml.match(/<h3\b/g) || []).length;
  const h4Count = (fullHtml.match(/<h4\b/g) || []).length;
  const preCount = (fullHtml.match(/<pre\b/g) || []).length;
  const rFenceCount = store.filter(s => s.k === 'fence' && s.lang === 'r').length;
  const txtFenceCount = store.filter(s => s.k === 'fence' && s.lang !== 'r').length;
  const tableCount = (fullHtml.match(/<table\b/g) || []).length;
  const dispMathCount = store.filter(s => s.k === 'math' && s.disp).length;
  const inlMathCount  = store.filter(s => s.k === 'math' && !s.disp).length;
  const pCount = (fullHtml.match(/<p\b/g) || []).length;
  const liCount = (fullHtml.match(/<li\b/g) || []).length;
  const bqCount = (fullHtml.match(/<blockquote\b/g) || []).length;
  const hrCount = (fullHtml.match(/<hr\b/g) || []).length;
  const aCount = (fullHtml.match(/<a\b/g) || []).length;
  const leftovers = (fullHtml.match(PH) || []).length;

  const ids = [...fullHtml.matchAll(/ id="(ch\d\d--[^"]+)"/g)].map(m => m[1]);
  const hrefs = [...fullHtml.matchAll(/href="#(ch\d\d--[^"]+)"/g)].map(m => m[1]);
  const unresolvedAnchors = hrefs.filter(h => !ids.includes(h));

  // Split fullHtml into lazy-loadable chunks at major heading boundaries (group H1s or every ~25KB)
  // so that opening any chapter is instant and scrolling or jumping to an anchor hydrates on demand.
  const chunks = [];
  const anchorToChunk = {};
  const parts = fullHtml.split(/(?=<h[12]\b)/);
  let currentChunk = '';
  for (const part of parts) {
    if (currentChunk.length > 32000 && (part.startsWith('<h1') || currentChunk.length > 55000)) {
      chunks.push(currentChunk);
      currentChunk = part;
    } else {
      currentChunk += part;
    }
  }
  if (currentChunk) chunks.push(currentChunk);

  chunks.forEach((chunkHtml, cIdx) => {
    for (const m of chunkHtml.matchAll(/ id="(ch\d\d--[^"]+)"/g)) {
      anchorToChunk[m[1]] = cIdx;
    }
  });

  // Also associate each toc item with its chunk index
  toc.forEach(t => {
    t.chunk = anchorToChunk[t.id] ?? 0;
  });

  return {
    meta: {
      pos: chMeta.pos,
      id: chMeta.id,
      file: chMeta.file,
      pdf: chMeta.pdf,
      title: chMeta.title,
      kind: chMeta.kind,
      sha256,
      sha16,
      shaMatch: sha16 === chMeta.expectedSha16
    },
    toc,
    chunks,
    anchorToChunk,
    patches: appliedPatches,
    stats: {
      h1: h1Count,
      h2: h2Count,
      h3: h3Count,
      h4: h4Count,
      headingsTotal: h1Count + h2Count + h3Count + h4Count,
      pre: preCount,
      rFences: rFenceCount,
      txtFences: txtFenceCount,
      tables: tableCount,
      mathDisplay: dispMathCount,
      mathInline: inlMathCount,
      mathTotal: dispMathCount + inlMathCount,
      p: pCount,
      li: liCount,
      blockquote: bqCount,
      hr: hrCount,
      a: aCount,
      leftovers,
      idsCount: ids.length,
      unresolvedAnchors: unresolvedAnchors.length,
      htmlBytes: Buffer.byteLength(fullHtml, 'utf8'),
      chunksCount: chunks.length
    }
  };
}

function ingestAllLectures(options = {}) {
  const results = [];
  for (const chMeta of CHAPTER_MANIFEST) {
    results.push(ingestChapter(chMeta, options));
  }
  return results;
}

module.exports = { CHAPTER_MANIFEST, PATCHES, ingestChapter, ingestAllLectures };

if (require.main === module) {
  const t0 = Date.now();
  const results = ingestAllLectures({ katexOutput: 'html' });
  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
  console.log(`Ingested all ${results.length} chapters in ${elapsed}s:`);
  let totalHtmlBytes = 0;
  for (const r of results) {
    totalHtmlBytes += r.stats.htmlBytes;
    console.log(
      `  [${r.meta.pos}] ${r.meta.file.padEnd(47)} | H:${r.stats.h1}/${r.stats.h2}/${r.stats.h3}/${r.stats.h4} | Pre:${r.stats.pre}(${r.stats.rFences}+${r.stats.txtFences}) | Tbl:${r.stats.tables} | Math:${r.stats.mathDisplay}+${r.stats.mathInline}=${r.stats.mathTotal} | Chunks:${r.stats.chunksCount} | ${(r.stats.htmlBytes / 1024).toFixed(0)} KB`
    );
  }
  console.log(`Total pre-rendered HTML size: ${(totalHtmlBytes / 1024 / 1024).toFixed(2)} MB`);
}
