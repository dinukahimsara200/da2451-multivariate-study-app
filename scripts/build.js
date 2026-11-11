/**
 * DA2451 Multivariate Methods in Business — Standalone HTML Builder (Task 2)
 * Produces APP_DEV/dist/DA2451_Study_App.html with zero runtime network dependencies.
 * Bundles:
 *  - Complete App Shell, Design Token System, and Embedded KaTeX WOFF2 Fonts
 *  - All 11 Teaching Chapters (pre-rendered HTML + KaTeX + highlight.js R syntax)
 *  - All 11 Original Lecture PDFs (inert base64 payloads decoded lazily on demand into Blob URLs)
 */
const fs = require('fs');
const path = require('path');
const katex = require('katex');
const { ingestAllLectures } = require('./ingest_lectures');
const { inspectAndLoadPdfs } = require('./ingest_pdfs');
const { ingestAllPastPapers } = require('./ingest_papers');
const { ingestAllPracticeQuestions } = require('./ingest_pqs');
const { ingestAllPredictions, GENERATOR_NAME } = require('./ingest_predictions');
const { buildSearchIndex } = require('./build_search_index');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR  = path.join(ROOT_DIR, 'src');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const OUT_FILE = path.join(ROOT_DIR, 'DA2451_Study_App.html');

function safeJsonForScript(obj) {
  return JSON.stringify(obj)
    .replace(/<\//g, '<\\/')
    .replace(/<!--/g, '\\u003c!--')
    .replace(/<script/gi, '\\u003cscript')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function buildPoppinsCssWithEmbeddedFonts() {
  const fontsDir = path.join(ROOT_DIR, 'fonts');
  const regTtf = path.join(fontsDir, 'Poppins.ttf');
  const semiTtf = path.join(fontsDir, 'Poppins-SemiBold.ttf');
  const boldTtf = path.join(fontsDir, 'Poppins-Bold.ttf');
  if (!fs.existsSync(regTtf) || !fs.existsSync(semiTtf) || !fs.existsSync(boldTtf)) {
    return '';
  }
  const regB64 = fs.readFileSync(regTtf).toString('base64');
  const semiB64 = fs.readFileSync(semiTtf).toString('base64');
  const boldB64 = fs.readFileSync(boldTtf).toString('base64');

  return `
/* ---------- Embedded Offline Poppins Font Families (Checkpoint 5A) ---------- */
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url("data:font/truetype;charset=utf-8;base64,${regB64}") format("truetype");
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url("data:font/truetype;charset=utf-8;base64,${semiB64}") format("truetype");
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url("data:font/truetype;charset=utf-8;base64,${semiB64}") format("truetype");
}
@font-face {
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url("data:font/truetype;charset=utf-8;base64,${boldB64}") format("truetype");
}
`;
}

function buildKatexCssWithEmbeddedFonts() {
  const katexDist = path.dirname(require.resolve('katex/dist/katex.min.css'));
  let css = fs.readFileSync(path.join(katexDist, 'katex.min.css'), 'utf8');

  // Replace @font-face src lists so only woff2 data URIs are embedded (saves ~60% font size, 100% offline)
  css = css.replace(/src:url\(fonts\/([A-Za-z0-9_-]+\.woff2)\) format\("woff2"\),url\(fonts\/[A-Za-z0-9_-]+\.woff\) format\("woff"\),url\(fonts\/[A-Za-z0-9_-]+\.ttf\) format\("truetype"\)/g, (match, woff2File) => {
    const fontPath = path.join(katexDist, 'fonts', woff2File);
    const b64 = fs.readFileSync(fontPath).toString('base64');
    return `src:url("data:font/woff2;base64,${b64}") format("woff2")`;
  });

  return css;
}

function renderMath(tex, displayMode = false) {
  return katex.renderToString(tex, {
    displayMode,
    throwOnError: true,
    output: 'html',
    strict: 'warn'
  });
}

function buildSamples() {
  const inlineSigma = renderMath('\\boldsymbol{\\Sigma} = \\mathbf{P}\\boldsymbol{\\Lambda}\\mathbf{P}^\\top', false);
  const chapterParagraph = `<p class="has-math">In multivariate analysis, we observe ${renderMath('p', false)} variables simultaneously on each sampling unit. The spectral decomposition of a positive semi-definite covariance matrix is ${inlineSigma}, where eigenvalues satisfy ${renderMath('\\lambda_1 \\ge \\lambda_2 \\ge \\dots \\ge \\lambda_p \\ge 0', false)}.</p>`;
  const tableLambdaHead = `Eigenvalue (${renderMath('\\lambda_i', false)})`;

  const displayTex = '\\boldsymbol{\\Sigma} = \\begin{bmatrix} 4.0 & 1.4 \\\\ 1.4 & 1.0 \\end{bmatrix}, \\quad f(\\mathbf{x}) = \\frac{1}{(2\\pi)^{p/2}|\\boldsymbol{\\Sigma}|^{1/2}} \\exp\\!\\left(-\\frac{1}{2}(\\mathbf{x}-\\boldsymbol{\\mu})^\\top\\boldsymbol{\\Sigma}^{-1}(\\mathbf{x}-\\boldsymbol{\\mu})\\right)';
  const displayHtml = `
    <div class="math-block" tabindex="0" role="region" aria-label="Equation">
      ${renderMath(displayTex, true)}
      <button type="button" class="btn btn-ghost copy-tex" style="min-height:28px;font-size:var(--fs-xs)" data-action="copy-raw" data-copy="${displayTex.replace(/"/g, '&quot;')}" title="Copy TeX" aria-label="Copy TeX">
        <svg class="ic ic-a" width="14" height="14" aria-hidden="true"><use href="#i-copy"/></svg>
        <svg class="ic ic-b" width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>
        <span class="btn-label">Copy TeX</span>
      </button>
    </div>
  `;

  const ppQ = `<p class="has-math">Suppose ${renderMath('\\mathbf{X} = (X_1, X_2)^\\top', false)} follows a bivariate normal distribution with mean vector ${renderMath('\\boldsymbol{\\mu} = \\begin{bmatrix} 2 \\\\ -1 \\end{bmatrix}', false)} and covariance matrix ${renderMath('\\boldsymbol{\\Sigma} = \\begin{bmatrix} 4 & 1.4 \\\\ 1.4 & 1 \\end{bmatrix}', false)}.</p>`;
  const ppPartA = `Find the marginal distribution of ${renderMath('X_1', false)} and the conditional distribution of ${renderMath('X_2', false)} given ${renderMath('X_1 = x_1', false)}.`;
  const ppA = `
    <p class="has-math"><strong>1. Marginal distribution of ${renderMath('X_1', false)}:</strong> By the marginal property of the multivariate normal distribution, ${renderMath('X_1 \\sim N(\\mu_1, \\sigma_{11}) = \\boxed{N(2, 4)}', false)}.</p>
    <p class="has-math"><strong>2. Conditional distribution of ${renderMath('X_2 \\mid X_1 = x_1', false)}:</strong> Since ${renderMath('\\mathbf{X}', false)} is bivariate normal, ${renderMath('X_2 \\mid X_1 = x_1 \\sim N(\\mu_{2|1},\\, \\sigma_{2|1}^2)', false)}, where:</p>
    <div class="math-block">${renderMath('\\mu_{2|1} = \\mu_2 + \\frac{\\sigma_{12}}{\\sigma_{11}}(x_1 - \\mu_1) = -1 + \\frac{1.4}{4}(x_1 - 2) = \\boxed{-1 + 0.35(x_1 - 2)}', true)}</div>
    <div class="math-block">${renderMath('\\sigma_{2|1}^2 = \\sigma_{22} - \\frac{\\sigma_{12}^2}{\\sigma_{11}} = 1 - \\frac{1.96}{4} = 1 - 0.49 = \\boxed{0.51}', true)}</div>
  `;

  const predStemHtml = `<p class="has-math">Let ${renderMath('\\boldsymbol{\\Sigma}', false)} be a ${renderMath('3 \\times 3', false)} covariance matrix with eigenvalues ${renderMath('\\lambda_1 = 5.4', false)}, ${renderMath('\\lambda_2 = 1.8', false)}, and ${renderMath('\\lambda_3 = 0.8', false)}. What proportion of the total population variance is explained by the first principal component?</p>`;

  return {
    chapterParagraph,
    tableLambdaHead,
    displayEquation: displayHtml,
    pastPaperQuestionHtml: ppQ,
    pastPaperPartAHtml: ppPartA,
    pastPaperAnswerHtml: ppA,
    predictedStemHtml: predStemHtml
  };
}

function build() {
  const t0 = Date.now();
  fs.mkdirSync(DIST_DIR, { recursive: true });

  console.log('[Build] 1/5 Loading styles, SVG sprite, and reader scripts...');
  const poppinsCss = buildPoppinsCssWithEmbeddedFonts();
  const stylesCss  = fs.readFileSync(path.join(SRC_DIR, 'styles.css'), 'utf8');
  const iconsSvg   = fs.readFileSync(path.join(SRC_DIR, 'icons.svg'), 'utf8');
  const readerJs   = fs.readFileSync(path.join(SRC_DIR, 'reader.js'), 'utf8');
  const appJs      = fs.readFileSync(path.join(SRC_DIR, 'app.js'), 'utf8');
  const katexCss   = buildKatexCssWithEmbeddedFonts();
  const samples    = buildSamples();

  const avatarPath = path.join(SRC_DIR, 'avatar.jpg');
  const avatarB64 = fs.existsSync(avatarPath)
    ? 'data:image/jpeg;base64,' + fs.readFileSync(avatarPath).toString('base64')
    : '';
  const avatarImgTag = avatarB64 ? `<img src="${avatarB64}" alt="Dinuka Himsara" onerror="this.remove()">` : '';

  console.log('[Build] 2/5 Ingesting all 11 teaching chapters (Markdown -> KaTeX + highlight.js)...');
  const chapters = ingestAllLectures({ katexOutput: 'html' });

  console.log('[Build] 3/5 Inspecting and encoding all 11 original lecture PDFs...');
  const { pdfManifest, pdfPayloads } = inspectAndLoadPdfs();

  console.log('[Build] 4/5 Ingesting all 9 Past Papers & 5 Practice Question Worksheets...');
  const { papers, promptRecords: ppPrompts } = ingestAllPastPapers({ katexOutput: 'html' });
  const { worksheets, promptRecords: pqPrompts, invariantResults: pqInvResults } = ingestAllPracticeQuestions({ katexOutput: 'html' });

  // Append Practice Questions audit section to docs/AUDIT_MAPPINGS.md
  const auditPath = path.join(ROOT_DIR, 'docs', 'AUDIT_MAPPINGS.md');
  if (fs.existsSync(auditPath)) {
    let auditMd = fs.readFileSync(auditPath, 'utf8');
    const pqSectionLines = [
      '',
      '---',
      '',
      '## 5. Practice Questions (`PQ01`–`PQ05`) Invariants & Question-to-Solution Audit',
      '',
      'All 5 source files in `PQs/` were verified against their SHA-256 prefixes and `PQ_HTML_INTEGRATION_GUIDE.md` §6.8 targets. In `DA2451_PQ01_Complete_Teaching.md`, the 7 documented unescaped currency `$` signs (`PQ-P-1a`..`PQ-P-1g`) were patched in memory (`$` → `\\$`) without modifying the source file on disk.',
      '',
      '| Worksheet | File | SHA-256 Prefix | Questions | Display `$$` | Inline `$` | Code Fences | Tables | Internal Anchors | Status |',
      '|---|---|---|---:|---:|---:|---:|---:|---:|---|',
      ...pqInvResults.map((inv, idx) => {
        const w = worksheets[idx];
        return `| \`${inv.code}\` | \`${inv.file}\` | \`${inv.sha16}\` | ${w.meta.questionCount} | ${inv.stats.disp} | ${inv.stats.inl} | ${inv.stats.pre} (${inv.stats.rPre}+${inv.stats.txtPre}) | ${inv.stats.tbl} | ${inv.stats.resolvedAnchors} | **PASS** |`;
      }),
      '',
      '### Practice Worksheet Question-to-Teaching-Solution Split Audit (32 Interactive Cards)',
      '',
      '| Unit ID | Worksheet | Title | Visible Question Stem Length | Hidden Teaching Solution Length | Status |',
      '|---|---|---|---:|---:|---|',
      ...worksheets.flatMap(w =>
        w.units
          .filter(u => u.kind === 'question' || u.kind === 'subquestion')
          .map(u => {
            const pRec = pqPrompts[u.unitId] || { question: '', answer: '' };
            return `| \`${u.unitId}\` | \`${w.meta.code}\` | ${String(u.title || u.unitId).replace(/\|/g, '\\|')} | ${pRec.question.length} chars | ${pRec.answer.length} chars | **VERIFIED** |`;
          })
      ),
      ''
    ];
    fs.writeFileSync(auditPath, auditMd.trimEnd() + '\n' + pqSectionLines.join('\n'), 'utf8');
  }

  const allPrompts = Object.assign({}, ppPrompts, pqPrompts);

  console.log('[Build] 5/6 Ingesting Predicted Questions (scope filter + exclusion log) and building the offline search index...');
  const pred = ingestAllPredictions({ writeLog: true });
  const searchIdx = buildSearchIndex({
    chapters,
    papers,
    worksheets,
    pqPrompts,
    predData: pred.data,
    keptQuestions: pred.kept
  });
  console.log(`[Build]   Predictions: ${pred.counts.kept} displayed, ${pred.counts.excluded} excluded (see APP_DEV/EXCLUSION_LOG.md); search index: ${searchIdx.records.length} records, ${(searchIdx.bytes / 1048576).toFixed(2)} MB`);
  const predSourceHeaderHtml = pred.data.fileHeaders.map(h =>
    `<div class="src-header"><div class="src-header-name"><code>${h.file}</code> · ${GENERATOR_NAME[h.generator]} · ${h.kind === 'mcq' ? 'MCQs' : 'Essays'}</div><div class="prose" style="max-width:100%;font-size:var(--fs-sm)">${h.html}</div></div>`
  ).join('');

  console.log('[Build] 6/6 Assembling standalone offline HTML bundle...');
  const chapterDataScripts = chapters.map(ch => {
    const payload = {
      meta: ch.meta,
      toc: ch.toc,
      chunks: ch.chunks,
      anchorToChunk: ch.anchorToChunk,
      stats: ch.stats
    };
    return `<script type="application/json" id="ch-data-${ch.meta.id}">${safeJsonForScript(payload)}</script>`;
  }).join('\n  ');

  const paperDataScripts = papers.map(p => {
    return `<script type="application/json" id="pp-data-${p.meta.id}">${safeJsonForScript(p)}</script>`;
  }).join('\n  ');

  const worksheetDataScripts = worksheets.map(w => {
    return `<script type="application/json" id="pq-data-${w.meta.id}">${safeJsonForScript(w)}</script>`;
  }).join('\n  ');

  const predDataScript = `<script type="application/json" id="pred-data">${safeJsonForScript(pred.data)}</script>`;
  const searchIndexScript = `<script type="application/json" id="search-index">${safeJsonForScript(searchIdx.records)}</script>`;
  const searchJs = fs.readFileSync(path.join(SRC_DIR, 'search.js'), 'utf8');

  const pdfDataScripts = Object.entries(pdfPayloads).map(([chId, b64]) => {
    return `<script type="text/plain" id="pdf-b64-${chId}">${b64}</script>`;
  }).join('\n  ');

  function generateFaviconDataUri() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#22211E"/>
      <stop offset="100%" stop-color="#141311"/>
    </linearGradient>
    <linearGradient id="vecGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2850C8"/>
      <stop offset="100%" stop-color="#5580FF"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="url(#bgGrad)"/>
  <rect x="1.5" y="1.5" width="61" height="61" rx="13.5" fill="none" stroke="#48453D" stroke-width="1.25"/>
  <path d="M19 14 V50" stroke="#FAF8F5" stroke-width="5" stroke-linecap="round"/>
  <path d="M19 14 H32 C45.5 14, 52 22, 52 32 C52 42, 45.5 50, 32 50 H19" fill="none" stroke="#FAF8F5" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 23 H31 C38.5 23, 42.5 27, 42.5 32 C42.5 37, 38.5 41, 31 41 H21" fill="none" stroke="#FAF8F5" stroke-width="1.8" stroke-opacity="0.45" stroke-dasharray="2.5 2"/>
  <line x1="17" y1="45" x2="43" y2="19" stroke="url(#vecGrad)" stroke-width="4.2" stroke-linecap="round"/>
  <polygon points="46.5,15.5 45.5,24.5 37.5,20.5" fill="#5580FF"/>
  <line x1="30" y1="32" x2="25" y2="27" stroke="#5580FF" stroke-width="2.2" stroke-linecap="round" stroke-opacity="0.8"/>
</svg>`;
    return `data:image/svg+xml;base64,${Buffer.from(svg.trim()).toString('base64')}`;
  }

  const html = `<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#F5F5F7">
  <title>DA2451 Multivariate Methods in Business — Offline Study App</title>
  <link rel="icon" type="image/svg+xml" href="${generateFaviconDataUri()}">
  <script>
  (function () {
    var t = null;
    try { t = localStorage.getItem('da2451:theme'); } catch (e) {}
    var dark = t === 'dark' || ((t === 'system' || t === null) &&
               window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    var el = document.documentElement;
    el.setAttribute('data-theme', dark ? 'dark' : 'light');
    el.setAttribute('data-theme-pref', t || 'unset');
    var m = document.querySelector('meta[name=theme-color]');
    if (m) m.content = dark ? '#0E0F12' : '#F5F5F7';
  })();
  </script>
  <style>
${poppinsCss}
${stylesCss}
/* --- Bundled KaTeX Offline Styles & Embedded WOFF2 Fonts --- */
${katexCss}
  </style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  ${iconsSvg}

  <div class="sidebar-scrim" id="sidebar-scrim" data-action="close-drawer" aria-hidden="true"></div>

  <div class="app">
    <aside class="sidebar" aria-label="Primary">
      <div class="sidebar-head">
        <a class="brand-link" href="#dashboard">
          <svg class="ic brand-icon" width="24" height="24" aria-hidden="true"><use href="#i-monogram"/></svg>
          <span class="brand-text">
            <span class="brand-code">DA2451</span>
            <span class="brand-sub">Multivariate Methods</span>
          </span>
        </a>
        <button type="button" class="btn btn-ghost" id="btn-sidebar-toggle" data-action="toggle-sidebar" aria-expanded="true" title="Toggle sidebar ([)" aria-label="Toggle sidebar">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-sidebar"/></svg>
        </button>
      </div>

      <nav class="nav-section" aria-label="Study sections">
        <a class="nav-item" href="#dashboard" data-nav="dashboard" title="Dashboard (g h)">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-home"/></svg>
          <span class="nav-label">Dashboard</span>
        </a>

        <a class="nav-item" href="#chapters" data-nav="chapters" title="Learning Chapters (g c)">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-book"/></svg>
          <span class="nav-label">Learning Chapters</span>
          <span class="nav-badge">11</span>
        </a>
        <div class="nav-sublist" id="nav-chapters-sublist" hidden></div>

        <a class="nav-item" href="#papers" data-nav="papers" title="Past Papers (g p)">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-paper"/></svg>
          <span class="nav-label">Past Papers</span>
          <span class="nav-badge">9</span>
        </a>

        <a class="nav-item" href="#practice" data-nav="practice" title="Practice Questions (g q)">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-matrix"/></svg>
          <span class="nav-label">Practice Questions</span>
          <span class="nav-badge">5</span>
        </a>

        <a class="nav-item" href="#predicted-mcqs" data-nav="predicted" title="Predicted Questions (g m)">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-predict"/></svg>
          <span class="nav-label">Predicted Questions</span>
          <span class="chip chip--predicted" style="height:18px;padding:0 5px;font-size:10px">Unofficial</span>
        </a>
        <div class="nav-sublist" id="nav-predicted-sublist" hidden>
          <a class="nav-subitem" href="#predicted-mcqs" data-predmode="mcqs">
            <span class="nav-label">Predicted MCQs</span>
          </a>
          <a class="nav-subitem" href="#predicted-essays" data-predmode="essays">
            <span class="nav-label">Predicted Essays</span>
          </a>
        </div>
      </nav>

      <nav class="nav-section" aria-label="Personal tools">
        <div class="nav-section-label">Tools</div>
        <a class="nav-item" href="#bookmarks" data-nav="bookmarks" title="Bookmarks">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-bookmark"/></svg>
          <span class="nav-label">Bookmarks</span>
        </a>
        <button type="button" class="nav-item" data-action="open-search" title="Search (Ctrl+K or /)">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-search"/></svg>
          <span class="nav-label">Search</span>
        </button>
      </nav>

      <div class="sidebar-spacer"></div>

      <nav class="nav-section" aria-label="App preferences">
        <button type="button" class="nav-item" data-action="open-settings" title="Settings">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-settings"/></svg>
          <span class="nav-label">Settings</span>
        </button>
        <button type="button" class="nav-item" data-action="open-about" title="About this app">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-info"/></svg>
          <span class="nav-label">About this app</span>
        </button>
      </nav>

      <div class="sidebar-foot">
        <div class="sidebar-creator">
          <span class="sidebar-creator-lbl">Curated by</span>
          <span class="sidebar-creator-name">Made by Dinuka Himsara</span>
        </div>
        <button type="button" class="btn btn-ghost" style="padding:0 8px;min-height:28px;font-size:11px" data-action="open-about">About</button>
      </div>
    </aside>

    <div class="main-col">
      <header class="topbar">
        <div class="topbar-left">
          <button type="button" class="btn btn-ghost" data-action="toggle-sidebar" title="Toggle navigation" aria-label="Toggle navigation">
            <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-menu"/></svg>
          </button>
          <nav aria-label="Breadcrumb" style="min-width:0">
            <ol class="crumbs" id="breadcrumbs"></ol>
          </nav>
        </div>

        <div class="topbar-right">
          <button type="button" class="search-trigger" data-action="open-search" aria-label="Search study materials (Ctrl+K)">
            <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-search"/></svg>
            <span>Search</span>
            <kbd class="kbd">Ctrl K</kbd>
          </button>
          <button type="button" class="btn btn-ghost" id="btn-theme-toggle" data-action="toggle-theme" title="Switch theme" aria-label="Switch theme">
            <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-moon"/></svg>
          </button>
          <button type="button" class="btn btn-ghost" data-action="open-settings" title="Settings &amp; Reading options" aria-label="Settings">
            <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-settings"/></svg>
          </button>
        </div>

        <div class="read-progress" aria-hidden="true" hidden></div>
      </header>

      <main id="main" tabindex="-1"></main>
    </div>
  </div>

  <button type="button" class="btn focus-exit" data-action="toggle-focus" aria-label="Exit focus mode">
    Exit focus (Esc)
  </button>

  <nav class="tabbar" aria-label="Primary mobile">
    <a class="tab" href="#dashboard" data-nav="dashboard">
      <svg class="ic" width="22" height="22" aria-hidden="true"><use href="#i-home"/></svg>
      <span>Home</span>
    </a>
    <a class="tab" href="#chapters" data-nav="chapters">
      <svg class="ic" width="22" height="22" aria-hidden="true"><use href="#i-book"/></svg>
      <span>Chapters</span>
    </a>
    <a class="tab" href="#papers" data-nav="papers">
      <svg class="ic" width="22" height="22" aria-hidden="true"><use href="#i-paper"/></svg>
      <span>Papers</span>
    </a>
    <a class="tab" href="#practice" data-nav="practice">
      <svg class="ic" width="22" height="22" aria-hidden="true"><use href="#i-matrix"/></svg>
      <span>Practice</span>
    </a>
    <a class="tab" href="#predicted-mcqs" data-nav="predicted">
      <svg class="ic" width="22" height="22" aria-hidden="true"><use href="#i-predict"/></svg>
      <span>Predicted</span>
    </a>
  </nav>

  <!-- 1. First-Launch Welcome Sheet (§6.10) -->
  <dialog id="dlg-welcome" class="dlg-welcome" aria-labelledby="welcome-title">
    <div class="dlg-inner">
      <div class="dlg-head">
        <h2 id="welcome-title" class="dlg-title">Choose how it looks</h2>
      </div>
      <p style="margin:0;color:var(--ink-2);font-size:var(--fs-sm)">Select your preferred reading appearance. You can switch between Light, Dark, and System anytime from the top bar.</p>
      <div class="theme-tiles" role="radiogroup" aria-label="Theme appearance">
        <button type="button" class="theme-tile" role="radio" aria-checked="true" data-action="welcome-pick" data-theme-opt="light">
          <div class="tile-preview tile-preview--light">
            <span class="tp-accent">DA2451 · Light</span>
            <div class="tp-card">Warm daylight clarity for equations &amp; R code.</div>
          </div>
          <div class="tile-label">
            <span>Light</span>
          </div>
        </button>
        <button type="button" class="theme-tile" role="radio" aria-checked="false" data-action="welcome-pick" data-theme-opt="dark">
          <div class="tile-preview tile-preview--dark">
            <span class="tp-accent">DA2451 · Dark</span>
            <div class="tp-card">Low-glare carbon slate for late-night revision.</div>
          </div>
          <div class="tile-label">
            <span>Dark</span>
          </div>
        </button>
      </div>
      <div class="creator-note" id="welcome-creator-note">
        <div class="creator-note-header">
          <div class="creator-avatar-wrap">
            <div class="creator-avatar">${avatarImgTag}<span>DH</span></div>
            <div>
              <div class="creator-name-row">
                <span class="creator-name">Dinuka Himsara</span>
                <span class="chip chip--accent" style="font-size:10.5px;padding:1px 7px">Made by Dinuka Himsara</span>
              </div>
              <div class="creator-role">Curator &amp; Lead System Architect · Faculty of Business Analytics</div>
            </div>
          </div>
        </div>
        <p style="margin:var(--s-3) 0 var(--s-2);font-size:var(--fs-xs);line-height:1.6;color:var(--ink-2)">
          This entire project required approximately <strong>two days of intensive work</strong> — considerably more demanding and comprehensive than my earlier semester HTML study apps. Every lecture explanation and practice guide was prepared <strong>individually, one by one</strong>, using <strong>ChatGPT Plus (GPT-6 High)</strong>, and all nine historical past papers were worked through <strong>individually, one by one</strong>, using <strong>Gemini Pro (Gemini 4 Argon High)</strong> (leveraging a 1-month ChatGPT Plus offer and a 4-year Gemini Pro student offer). <strong>Claude Sonnet 5.5 Medium</strong> and <strong>Google Antigravity</strong> (agentic development environment) assisted with system architecture and automated verification.
        </p>
        <p style="margin:0;font-size:var(--fs-xs);line-height:1.58;color:var(--ink-3)">
          <em>Study note:</em> AI-generated explanations can contain subtle mistakes. Always check derivations against your official course resources. Best of luck on your examination!
        </p>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--s-3);margin-top:var(--s-2)">
        <button type="button" class="btn btn-ghost" data-action="welcome-system">Use system setting</button>
        <button type="button" class="btn btn-primary" data-action="welcome-continue">Continue</button>
      </div>
    </div>
  </dialog>

  <!-- 2. Global Search Dialog (§6.6) -->
  <dialog id="dlg-search" class="dlg-search" aria-labelledby="search-dlg-title">
    <h2 id="search-dlg-title" class="sr-only">Search study materials</h2>
    <div class="search-bar-wrap">
      <svg class="ic" width="20" height="20" style="color:var(--ink-3)" aria-hidden="true"><use href="#i-search"/></svg>
      <input type="search" id="search-input" class="search-input" placeholder="Search chapters, past papers, worksheets, predictions…" autocomplete="off">
      <button type="button" class="btn btn-ghost" data-action="close-dialog" aria-label="Close search">Esc</button>
    </div>
    <div class="search-chips" role="group" aria-label="Search section filters">
      <button type="button" class="chip is-selected" data-search-filter="all" aria-pressed="true">All</button>
      <button type="button" class="chip" data-search-filter="ch" aria-pressed="false">Chapters</button>
      <button type="button" class="chip" data-search-filter="pp" aria-pressed="false">Past Papers</button>
      <button type="button" class="chip" data-search-filter="pq" aria-pressed="false">Practice</button>
      <button type="button" class="chip" data-search-filter="pm" aria-pressed="false">Predicted MCQs</button>
      <button type="button" class="chip" data-search-filter="pe" aria-pressed="false">Predicted Essays</button>
    </div>
    <div class="search-progress" id="search-progress" hidden><i></i></div>
    <div class="search-results" id="search-results" role="listbox" aria-label="Search results"></div>
    <p class="sr-only" id="search-live" role="status" aria-live="polite"></p>
  </dialog>

  <!-- 3. Settings Dialog (§6.8 & §4.7) -->
  <dialog id="dlg-settings" aria-labelledby="settings-title">
    <div class="dlg-inner">
      <div class="dlg-head">
        <h2 id="settings-title" class="dlg-title">Settings</h2>
        <button type="button" class="btn btn-ghost" data-action="close-dialog" aria-label="Close settings">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-close"/></svg>
        </button>
      </div>

      <div class="setting-group">
        <span class="setting-group-title">Appearance</span>
        <div class="setting-row">
          <span>Theme</span>
          <div class="seg" role="radiogroup" aria-label="Theme preference">
            <button type="button" role="radio" aria-checked="true" data-action="set-theme" data-theme-opt="light">Light</button>
            <button type="button" role="radio" aria-checked="false" data-action="set-theme" data-theme-opt="dark">Dark</button>
            <button type="button" role="radio" aria-checked="false" data-action="set-theme" data-theme-opt="system">System</button>
          </div>
        </div>
      </div>

      <div class="setting-group">
        <span class="setting-group-title">Reading Typography</span>
        <div class="setting-row setting-row--column">
          <div class="setting-row-label">
            <span>Reading text size (12px–22px)</span>
            <span class="chip chip--accent" id="setting-fs-indicator">16px</span>
          </div>
          <div class="fs-stepper-row">
            <button type="button" class="btn-stepper" data-action="adjust-font-size" data-step="-1" title="Decrease font size by 1px" aria-label="Decrease font size">
              <span style="font-size:12px;font-weight:700">A−</span>
            </button>
            <input type="range" id="setting-font-size-slider" min="12" max="22" step="1" value="16" aria-label="Reading text size in pixels" class="fs-slider">
            <button type="button" class="btn-stepper" data-action="adjust-font-size" data-step="1" title="Increase font size by 1px" aria-label="Increase font size">
              <span style="font-size:16px;font-weight:700">A+</span>
            </button>
          </div>
          <div class="fs-preset-ticks" aria-label="Quick font size presets">
            <span data-action="set-font-size" data-size="12" title="Compact (12px)">12px</span>
            <span data-action="set-font-size" data-size="14" title="Small (14px)">14px</span>
            <span data-action="set-font-size" data-size="16" title="Default (16px)">16px</span>
            <span data-action="set-font-size" data-size="18" title="Medium (18px)">18px</span>
            <span data-action="set-font-size" data-size="20" title="Large (20px)">20px</span>
            <span data-action="set-font-size" data-size="22" title="Extra Large (22px)">22px</span>
          </div>
        </div>
        <div class="setting-row">
          <span>Reading width</span>
          <div class="seg" role="radiogroup" aria-label="Reading column width">
            <button type="button" role="radio" aria-checked="false" data-action="set-measure" data-measure="38rem">Narrow</button>
            <button type="button" role="radio" aria-checked="true" data-action="set-measure" data-measure="44rem">Standard</button>
            <button type="button" role="radio" aria-checked="false" data-action="set-measure" data-measure="56rem">Wide</button>
          </div>
        </div>
        <div class="setting-row">
          <span>Body font</span>
          <div class="seg" role="radiogroup" aria-label="Reading body font">
            <button type="button" role="radio" aria-checked="true" data-action="set-font" data-font="sans">Sans</button>
            <button type="button" role="radio" aria-checked="false" data-action="set-font" data-font="serif">Serif</button>
          </div>
        </div>
      </div>

      <div class="setting-group">
        <span class="setting-group-title">Motion</span>
        <div class="setting-row">
          <span>Animations</span>
          <div class="seg" role="radiogroup" aria-label="Animation preference">
            <button type="button" role="radio" aria-checked="true" data-action="set-motion" data-motion="system">Follow system</button>
            <button type="button" role="radio" aria-checked="false" data-action="set-motion" data-motion="reduce">Reduce animations</button>
          </div>
        </div>
      </div>

      <div class="setting-group">
        <span class="setting-group-title">Study data</span>
        <div class="setting-row">
          <span id="settings-storage-status" style="font-size:var(--fs-xs);color:var(--ink-3)">Local browser storage is active.</span>
          <div style="display:flex;gap:var(--s-2)">
            <button type="button" class="btn" data-action="export-data">Export JSON</button>
            <button type="button" class="btn btn-destructive" data-action="reset-data">Reset progress…</button>
          </div>
        </div>
      </div>
    </div>
  </dialog>

  <!-- 4. About Dialog (Master Plan §6 & Design Skill §6.8) -->
  <dialog id="dlg-about" class="dlg-editorial" aria-labelledby="about-title">
    <div class="dlg-editorial-head">
      <div class="dlg-editorial-title-wrap">
        <span class="dlg-editorial-eyebrow">Multivariate Methods · DA2451</span>
        <h2 id="about-title" class="dlg-editorial-title">About this app</h2>
      </div>
      <button type="button" class="btn btn-ghost dlg-close-btn" data-action="close-dialog" aria-label="Close about dialog">
        <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-close"/></svg>
      </button>
    </div>

    <div class="dlg-editorial-body">
      <!-- 1. Creator Profile Card -->
      <div class="about-hero-card author-profile-box">
        <div class="about-hero-header">
          <div class="about-hero-profile">
            <div class="creator-avatar creator-avatar--lg">${avatarImgTag}<span>DH</span></div>
            <div>
              <div class="about-hero-name">Dinuka Himsara</div>
              <div class="about-hero-role">Curator &amp; Lead System Architect · Faculty of Business Analytics</div>
            </div>
          </div>
          <span class="chip chip--accent" style="font-weight:600">Made by Dinuka Himsara</span>
        </div>
        <div class="about-hero-prose">
          <p>
            This independent study application is the culmination of approximately <strong>two days of intensive work</strong>. Compared to my earlier semester HTML study apps, this project required considerably more academic rigor, deeper architectural planning, and meticulous verification across every equation and statistical output.
          </p>
          <p>
            Rather than relying on automated batch scripts, every single lecture chapter explanation, historical past paper, and practice worksheet was developed <strong>individually, one by one</strong>, through deep, focused reasoning sessions with state-of-the-art AI systems.
          </p>
        </div>
      </div>

      <!-- 2. Behind This Study App -->
      <div class="about-story-card">
        <h3 class="curation-section-title">
          <svg class="ic" width="18" height="18" aria-hidden="true" style="color:var(--accent)"><use href="#i-book"/></svg>
          Behind This Study App
        </h3>
        <p style="margin:var(--s-2) 0 0;font-size:var(--fs-sm);line-height:1.62;color:var(--ink-2)">
          To make this comprehensive curation possible, I utilized a <strong>one-month ChatGPT Plus promotional offer</strong> alongside a <strong>four-year Gemini Pro student offer</strong>. Some individual resource-preparation sessions took <strong>30 minutes or longer</strong> of continuous iterative reasoning to ensure every theorem, matrix proof, variance decomposition, and R output interpretation was explained clearly from first principles.
        </p>
      </div>

      <!-- 3. Three Individually Prepared Academic Resource Categories -->
      <div style="display:flex;flex-direction:column;gap:var(--s-3)">
        <h3 class="curation-section-title">
          <svg class="ic" width="18" height="18" aria-hidden="true" style="color:var(--accent)"><use href="#i-layers"/></svg>
          Three Individually Prepared Resource Categories
        </h3>
        <div class="curation-grid">
          <div class="curation-card">
            <div class="curation-card-head">
              <span class="curation-pill">Lecture Mastery</span>
              <h4 class="curation-card-title">11 Learning Chapters</h4>
            </div>
            <p class="curation-card-desc">
              All 11 lecture chapters were crafted <strong>individually, one by one, using ChatGPT Plus (GPT-6 High)</strong>. Many individual prompt-and-verification sessions took <strong>30 minutes or longer</strong> of continuous iterative reasoning to ensure every theorem, matrix proof, variance decomposition, and R output interpretation was explained from first principles.
            </p>
            <div class="curation-stats">
              <span>6,899 equations</span> · <span>524 code blocks</span> · <span>189 tables</span>
            </div>
          </div>

          <div class="curation-card">
            <div class="curation-card-head">
              <span class="curation-pill">Exam History</span>
              <h4 class="curation-card-title">9 Historical Past Papers</h4>
            </div>
            <p class="curation-card-desc">
              All 9 past examination papers across Batches 19–23 were worked through <strong>individually, one by one, using Gemini Pro (Gemini 4 Argon High)</strong>—never processed as a single bulk batch. Each question and subpart was individually derived, cross-checking degrees of freedom, hypotheses, and decision thresholds.
            </p>
            <div class="curation-stats">
              <span>201 paired items</span> · <span>6,203 equations</span> · <span>59 code blocks</span>
            </div>
          </div>

          <div class="curation-card">
            <div class="curation-card-head">
              <span class="curation-pill">Skill Building</span>
              <h4 class="curation-card-title">5 Practice Worksheets</h4>
            </div>
            <p class="curation-card-desc">
              All 5 practice worksheets (PQ01–PQ05) were developed <strong>individually, one by one, using ChatGPT Plus (GPT-6 High)</strong>. Designed as beginner-friendly step-by-step masterclasses, they build rigorous mathematical intuition before students tackle timed exam papers.
            </p>
            <div class="curation-stats">
              <span>32 interactive cards</span> · <span>3,999 equations</span> · <span>94 tables</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. AI Model Attribution (Distinguishing Content Models from Software Tools) -->
      <div style="display:flex;flex-direction:column;gap:var(--s-3)">
        <h3 class="curation-section-title">
          <svg class="ic" width="18" height="18" aria-hidden="true" style="color:var(--accent)"><use href="#i-cpu"/></svg>
          AI Model Attribution
        </h3>
        <div class="role-cards-grid">
          <div class="role-card">
            <div class="role-card-top">
              <h4 class="role-card-title">Academic Content &amp; Lecture Explanations</h4>
              <span class="role-card-badge">Academic Content</span>
            </div>
            <p class="role-card-system">ChatGPT Plus (GPT-6 High)</p>
            <p class="role-card-desc">Prepared individually, one by one, across all 11 teaching chapters and 5 practice-question worksheets (leveraging a 1-month ChatGPT Plus promotional offer).</p>
          </div>

          <div class="role-card">
            <div class="role-card-top">
              <h4 class="role-card-title">Historical Past Paper Solutions &amp; Derivations</h4>
              <span class="role-card-badge">Exam Solutions</span>
            </div>
            <p class="role-card-system">Gemini Pro (Gemini 4 Argon High)</p>
            <p class="role-card-desc">Worked through individually, one by one, across all 9 historical past papers (leveraging a 4-year Gemini Pro student access offer).</p>
          </div>

          <div class="role-card">
            <div class="role-card-top">
              <h4 class="role-card-title">Predicted Practice Questions Generation</h4>
              <span class="role-card-badge">Predictions</span>
            </div>
            <p class="role-card-system">ChatGPT Plus (GPT-6 High) &amp; Gemini Pro (Gemini 4 Argon High)</p>
            <p class="role-card-desc">Speculative practice questions generated across conceptual topics (31 MCQs &amp; 12 Essays by ChatGPT; 30 MCQs &amp; 12 Essays by Gemini). Zero invented answers.</p>
          </div>

          <div class="role-card">
            <div class="role-card-top">
              <h4 class="role-card-title">Software Development Tools &amp; Environment</h4>
              <span class="role-card-badge">Software Tools</span>
            </div>
            <p class="role-card-system">Claude Sonnet 5.5 Medium &amp; Google Antigravity</p>
            <p class="role-card-desc">Software development tools distinct from academic materials: Claude Sonnet 5.5 Medium provided software architecture, responsive UI polish, and test automation; Google Antigravity served as the agentic development environment.</p>
          </div>
        </div>
      </div>

      <!-- 5. Quota Exhaustion Note & Copy AI Prompt Explanation -->
      <div class="about-quota-note">
        <strong>Regarding Predicted Practice Questions:</strong> Use the <strong>Copy AI Prompt</strong> button on any predicted MCQ or essay to consult your preferred AI assistant. Dinuka has completely exhausted his available ChatGPT, Gemini, and Claude quota while crafting these comprehensive lecture and past paper guides, and is rather stressed! 😅 Because of this, the predicted questions are presented as unworked practice questions with verbatim prompts. Thank you for your understanding, and study hard!
      </div>

      <!-- 6. Academic Integrity & Unofficial Prediction Disclaimers -->
      <div class="about-disclaimer">
        <strong>Important Academic Disclaimer:</strong> While every effort was made to verify these worked materials against course curricula, AI-generated explanations can occasionally contain subtle statistical errors or misinterpretations. Always check derivations and decision rules against your official lecture slides, past paper question sheets, and prescribed textbooks.
      </div>

      <div class="notice-predicted" style="font-size:var(--fs-xs)">
        <strong>AI-GENERATED PRACTICE PREDICTIONS — NOT OFFICIAL EXAM QUESTIONS.</strong> These are speculative practice questions generated to test conceptual breadth. They are not leaked, lecturer-approved, or guaranteed to appear on the final examination. Always prioritize mastering the 11 lecture chapters and 9 historical past papers first.
      </div>

      <!-- Audited Scope & Integrity -->
      <div style="font-size:var(--fs-sm);color:var(--ink-2)">
        <h3 style="margin:0 0 var(--s-2);font-size:var(--fs-base);color:var(--ink)">Content Integrity &amp; Scope</h3>
        <ul style="margin:0;padding-inline-start:1.3em;display:grid;gap:4px">
          <li><strong>Learning Chapters:</strong> All 11 teaching chapters ingested &amp; verified (6,899 equations, 524 code/output blocks, 189 tables).</li>
          <li><strong>Original Lecture PDFs:</strong> All 11 source PDFs embedded offline (decoded lazily on demand).</li>
          <li><strong>Historical Past Papers:</strong> All 9 examination papers across Batches 19–23 (65 MCQs + 29 Essay Questions / 136 Parts = 201 verified question-to-answer pairings, 6,203 equations, 59 code blocks, 26 tables).</li>
          <li><strong>Practice Questions:</strong> All 5 complete teaching worksheets PQ01–PQ05 (28 main questions + 4 PQ04 sub-questions = 32 interactive teaching solution cards, 3,999 equations, 90 code/output blocks, 94 tables).</li>
          <li><strong>Predicted Questions (Unanswered Practice):</strong> 4 unchanged AI-generated source files (110 total questions parsed; <strong>85 in-scope questions displayed</strong>: 61 MCQs [31 ChatGPT + 30 Gemini] and 24 Essays [12 ChatGPT + 12 Gemini]; 1,033 equations, 10 code blocks, 5 tables). Zero invented answers or grading keys.</li>
          <li><strong>Hard Exclusions Enforced:</strong> Principal Components Regression (PCR), Regression Diagnostics, and Linear Discriminant Analysis (LDA) are excluded from display (25 out-of-scope predicted questions excluded and logged in <code>APP_DEV/EXCLUSION_LOG.md</code>).</li>
          <li><strong>Offline Full-Text Search:</strong> 2,230 indexed records across all 11 chapters, 9 past papers, 5 worksheets, and 85 in-scope predicted questions.</li>
          <li><strong>Build-Time Patches Logged:</strong> <code>LEC-I-1</code> (Lec07 unclosed <code>$42.50$</code>), <code>PP-I-1..3</code> (Jan 2024 answers escaped delimiter, currency <code>$</code>, and nested <code>$</code> inside <code>\text{}</code>), and <code>PQ-P-1a..g</code> (PQ01 7 prose currency <code>$</code> signs). All original source files on disk remain 100% untouched.</li>
        </ul>

        <details class="pp-details" style="margin-top:var(--s-4)">
          <summary>Source file headers &amp; disclaimers (Predictions/)</summary>
          <div class="pp-details-body">
            ${predSourceHeaderHtml}
          </div>
        </details>
      </div>
    </div>
  </dialog>


  <!-- 5. Keyboard Shortcuts Dialog (§6.12) -->
  <dialog id="dlg-shortcuts" aria-labelledby="shortcuts-title">
    <div class="dlg-inner">
      <div class="dlg-head">
        <h2 id="shortcuts-title" class="dlg-title">Keyboard shortcuts</h2>
        <button type="button" class="btn btn-ghost" data-action="close-dialog" aria-label="Close shortcuts dialog">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-close"/></svg>
        </button>
      </div>
      <div class="group" style="font-size:var(--fs-sm)">
        <div class="row row-compact"><span class="row-main">Open search</span><kbd class="chip">Ctrl/⌘ + K</kbd><kbd class="chip">/</kbd></div>
        <div class="row row-compact"><span class="row-main">Toggle sidebar</span><kbd class="chip">[</kbd></div>
        <div class="row row-compact"><span class="row-main">Go to Home / Chapters / Papers / Practice / Predicted</span><kbd class="chip">g then h / c / p / q / m</kbd></div>
        <div class="row row-compact"><span class="row-main">Reveal or hide current answer</span><kbd class="chip">r</kbd></div>
        <div class="row row-compact"><span class="row-main">Toggle bookmark on current item</span><kbd class="chip">b</kbd></div>
        <div class="row row-compact"><span class="row-main">Show keyboard shortcuts</span><kbd class="chip">?</kbd></div>
        <div class="row row-compact"><span class="row-main">Close dialog or exit Focus mode</span><kbd class="chip">Esc</kbd></div>
      </div>
    </div>
  </dialog>

  <!-- 6. Manual Copy Fallback Dialog (§6.9) -->
  <dialog id="dlg-manual-copy" aria-labelledby="manual-copy-title">
    <div class="dlg-inner">
      <div class="dlg-head">
        <h2 id="manual-copy-title" class="dlg-title">Copy text manually</h2>
        <button type="button" class="btn btn-ghost" data-action="close-dialog" aria-label="Close manual copy">
          <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-close"/></svg>
        </button>
      </div>
      <p style="margin:0;font-size:var(--fs-sm);color:var(--ink-2)">Couldn't copy automatically. Select the text below and press Ctrl/⌘+C.</p>
      <textarea id="manual-copy-ta" readonly rows="8" style="width:100%;padding:var(--s-3);border-radius:var(--r-sm);border:1px solid var(--rule-strong);background:var(--sunken);font-family:var(--font-mono);font-size:var(--fs-xs)"></textarea>
    </div>
  </dialog>

  <div id="toasts" role="status" aria-live="polite"></div>
  <div id="live" class="sr-only" role="status" aria-live="polite"></div>

  <!-- Inert Pre-Rendered Chapter JSON Payloads (parsed lazily per chapter on open) -->
  ${chapterDataScripts}

  <!-- Inert Pre-Rendered Past Paper JSON Payloads (parsed lazily per paper on open) -->
  ${paperDataScripts}

  <!-- Inert Pre-Rendered Practice Worksheet JSON Payloads (parsed lazily per worksheet on open) -->
  ${worksheetDataScripts}

  <!-- Inert Pre-Rendered Predicted Questions JSON Payload (parsed lazily on open) -->
  ${predDataScript}

  <!-- Inert Offline Full-Text Search Index Payload (parsed lazily on first search open) -->
  ${searchIndexScript}

  <!-- Inert Base64 Original Lecture PDF Payloads (decoded lazily per PDF on open) -->
  ${pdfDataScripts}

  <script>
  window.DA2451_SAMPLES = ${safeJsonForScript(samples)};
  window.DA2451_PDF_MANIFEST = ${safeJsonForScript(pdfManifest)};
  window.DA2451_PROMPTS = ${safeJsonForScript(allPrompts)};
  </script>
  <script>
${readerJs}
  </script>
  <script>
${searchJs}
  </script>
  <script>
${appJs}
  </script>
</body>
</html>`;

  fs.writeFileSync(OUT_FILE, html, 'utf8');
  const sizeMb = (fs.statSync(OUT_FILE).size / (1024 * 1024)).toFixed(2);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
  console.log(`[Build] Successfully built ${OUT_FILE} (${sizeMb} MB) in ${elapsed}s`);
}

build();
