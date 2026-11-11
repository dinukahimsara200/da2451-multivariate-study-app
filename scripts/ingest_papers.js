/**
 * DA2451 Multivariate Methods in Business — Historical Past Papers Ingestion Pipeline (Task 3)
 * Follows PPs/DA2451_Past_Papers_HTML_Integration_Guide.md (§3–§7)
 *
 * Responsibilities:
 *  1. Verify SHA-256 prefixes of all 10 read-only files in PPs/ (never modifies source files).
 *  2. Apply the 3 logged exact-match build-time patches on 21_batch_january_2024_answers.md.
 *  3. Implement the exact Unicode-placeholder (\u27E6 / \u27E7) + fixVline + stripBq rendering pipeline.
 *  4. Verify all §7.4 file-level invariants (59 fences, 26 tables, 6,203 math expressions, 0 KaTeX errors, 0 stray $/**).
 *  5. Parse master questions (past_papers_multivariate_questions_only.md) and all 9 *_answers.md files,
 *     verifying 100% question-to-answer, part-to-answer, sub-part-to-answer, and MCQ-to-answer pairings.
 *  6. Generate APP_DEV/AUDIT_MAPPINGS.md with the complete verification audit.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const MarkdownIt = require('markdown-it');
const katex = require('katex');
const hljs = require('highlight.js');

const REPO_ROOT    = path.resolve(__dirname, '..');
const PPS_DIR = path.join(REPO_ROOT, 'content', 'papers');
const AUDIT_FILE = path.join(REPO_ROOT, 'docs', 'AUDIT_MAPPINGS.md');

/* ---------- 1. Authoritative File Manifest & Expected Invariants (§1 & §7.4) ---------- */
const SOURCE_FILES = [
  {
    file: 'past_papers_multivariate_questions_only.md',
    sha16: '889f4a794a02841d',
    role: 'master',
    inv: { h: [6, 10, 37, 0, 0], fence: 16, tbl: 4, math: 392 }
  },
  {
    file: '19_batch_july_2022_answers.md',
    sha16: '7cf5a40ff27c1cd1',
    role: 'answers',
    paperId: 'b19-final-2022-07',
    inv: { h: [5, 26, 59, 42, 5], fence: 0, tbl: 5, math: 1223 }
  },
  {
    file: '20_batch_august_2023_answers.md',
    sha16: '08cd525cc08a8368',
    role: 'answers',
    paperId: 'b20-final-2023-08',
    inv: { h: [7, 37, 61, 3, 0], fence: 10, tbl: 3, math: 809 }
  },
  {
    file: '21_batch_2023_in_class_answers.md',
    sha16: 'f118b3c58fa9bcb5',
    role: 'answers',
    paperId: 'b21-inclass-2023',
    inv: { h: [4, 15, 29, 9, 0], fence: 4, tbl: 2, math: 438 }
  },
  {
    file: '21_batch_january_2024_answers.md',
    sha16: '6c244f41cf8ec81a',
    role: 'answers',
    paperId: 'b21-final-2024-01',
    inv: { h: [7, 30, 53, 3, 0], fence: 9, tbl: 3, math: 710 }
  },
  {
    file: '22_batch_december_2024_answers.md',
    sha16: '179c980f191755b8',
    role: 'answers',
    paperId: 'b22-final-2024-12',
    inv: { h: [5, 42, 57, 6, 0], fence: 4, tbl: 1, math: 568 }
  },
  {
    file: '23_batch_2025_quiz_1_answers.md',
    sha16: 'e2a66ec00642d8ee',
    role: 'answers',
    paperId: 'b23-quiz1-2025',
    inv: { h: [4, 17, 27, 5, 0], fence: 1, tbl: 1, math: 348 }
  },
  {
    file: '23_batch_2025_quiz_2_answers.md',
    sha16: '4cfd45c4bc548d30',
    role: 'answers',
    paperId: 'b23-quiz2-2025',
    inv: { h: [4, 14, 33, 8, 0], fence: 3, tbl: 3, math: 619 }
  },
  {
    file: '23_batch_2025_quiz_3_answers.md',
    sha16: '485b471bba93dc9b',
    role: 'answers',
    paperId: 'b23-quiz3-2025',
    inv: { h: [3, 11, 27, 8, 0], fence: 4, tbl: 0, math: 443 }
  },
  {
    file: '23_batch_october_2025_answers.md',
    sha16: 'ad045d2e5005c2a2',
    role: 'answers',
    paperId: 'b23-final-2025-10',
    inv: { h: [6, 48, 54, 15, 0], fence: 8, tbl: 4, math: 653 }
  }
];

/* ---------- 2. Paper Metadata & Topic Cross-Links (§2 & §6.7) ---------- */
const PAPERS_META = [
  {
    id: 'b19-final-2022-07',
    batch: 19,
    type: 'Final',
    chipClass: '',
    course: 'DA3420',
    dateLabel: 'July 2022',
    sortKey: '2022-07',
    duration: '3 Hours',
    mode: 'Open book (+30 min scan/upload)',
    weight: '60%',
    totalMarks: 100,
    composition: '4 essay questions',
    masterH2: 'Final Examination (July 2022)',
    answerFile: '19_batch_july_2022_answers.md',
    title: 'Final Examination (July 2022)',
    expectedCounts: { mcqs: 0, questions: 4, parts: 22, masterSubs: 17, ansSubs: 17 }
  },
  {
    id: 'b20-final-2023-08',
    batch: 20,
    type: 'Final',
    chipClass: '',
    course: 'DA3420',
    dateLabel: 'August 2023',
    sortKey: '2023-08',
    duration: '3 Hours',
    mode: 'Closed book',
    weight: '50%',
    totalMarks: 100,
    composition: '10 MCQs (20m) + 4 essays (80m)',
    masterH2: 'Final Examination (August 2023)',
    answerFile: '20_batch_august_2023_answers.md',
    title: 'Final Examination (August 2023)',
    expectedCounts: { mcqs: 10, questions: 4, parts: 22, masterSubs: 8, ansSubs: 14 }
  },
  {
    id: 'b21-inclass-2023',
    batch: 21,
    type: 'In-class',
    chipClass: 'chip--dashed',
    course: 'DA2451',
    dateLabel: 'Semester 4, 2023',
    sortKey: '2023-10',
    duration: '1 hour 30 minutes',
    mode: 'Closed book',
    weight: '—',
    totalMarks: 50,
    composition: '3 essay questions',
    masterH2: 'In-Class Examination (Semester 4, 2023)',
    answerFile: '21_batch_2023_in_class_answers.md',
    title: 'In-Class Examination (Semester 4, 2023)',
    expectedCounts: { mcqs: 0, questions: 3, parts: 12, masterSubs: 7, ansSubs: 7 }
  },
  {
    id: 'b21-final-2024-01',
    batch: 21,
    type: 'Final',
    chipClass: '',
    course: 'DA2451',
    dateLabel: 'January 2024',
    sortKey: '2024-01',
    duration: '3 Hours',
    mode: 'Closed book',
    weight: '50%',
    totalMarks: 100,
    composition: '5 essay questions + 1 shared context',
    masterH2: 'Final Examination (January 2024)',
    answerFile: '21_batch_january_2024_answers.md',
    title: 'Final Examination (January 2024)',
    expectedCounts: { mcqs: 0, questions: 5, parts: 26, masterSubs: 13, ansSubs: 16 }
  },
  {
    id: 'b22-final-2024-12',
    batch: 22,
    type: 'Final',
    chipClass: '',
    course: 'DA2451',
    dateLabel: 'December 2024',
    sortKey: '2024-12',
    duration: '3 Hours',
    mode: 'Closed book',
    weight: '50%',
    totalMarks: 100,
    composition: '25 MCQs (50m) + 2 essays (50m)',
    masterH2: 'Final Examination (December 2024)',
    answerFile: '22_batch_december_2024_answers.md',
    title: 'Final Examination (December 2024)',
    expectedCounts: { mcqs: 25, questions: 2, parts: 13, masterSubs: 8, ansSubs: 11 }
  },
  {
    id: 'b23-quiz1-2025',
    batch: 23,
    type: 'Quiz',
    chipClass: 'chip--pill',
    course: 'DA2451',
    dateLabel: 'Semester 4, 2025',
    sortKey: '2025-04',
    duration: '45 minutes',
    mode: 'Open-book assignment',
    weight: '—',
    totalMarks: 45,
    composition: '3 structured questions',
    masterH2: 'In-Class Quiz 1 (Semester 4, 2025)',
    answerFile: '23_batch_2025_quiz_1_answers.md',
    title: 'In-Class Quiz 1 (Semester 4, 2025)',
    expectedCounts: { mcqs: 0, questions: 3, parts: 13, masterSubs: 0, ansSubs: 0 }
  },
  {
    id: 'b23-quiz2-2025',
    batch: 23,
    type: 'Quiz',
    chipClass: 'chip--pill',
    course: 'DA2451',
    dateLabel: 'Semester 4, 2025',
    sortKey: '2025-06',
    duration: '45 minutes',
    mode: 'Open-book assignment',
    weight: '—',
    totalMarks: 45,
    composition: '3 structured questions',
    masterH2: 'In-Class Quiz 2 (Semester 4, 2025)',
    answerFile: '23_batch_2025_quiz_2_answers.md',
    title: 'In-Class Quiz 2 (Semester 4, 2025)',
    expectedCounts: { mcqs: 0, questions: 3, parts: 10, masterSubs: 8, ansSubs: 8 }
  },
  {
    id: 'b23-quiz3-2025',
    batch: 23,
    type: 'Quiz',
    chipClass: 'chip--pill',
    course: 'DA2451',
    dateLabel: 'Semester 4, 2025',
    sortKey: '2025-08',
    duration: '45 minutes',
    mode: 'Open-book assignment',
    weight: '—',
    totalMarks: 40,
    composition: '2 structured questions',
    masterH2: 'In-Class Quiz 3 (Semester 4, 2025)',
    answerFile: '23_batch_2025_quiz_3_answers.md',
    title: 'In-Class Quiz 3 (Semester 4, 2025)',
    expectedCounts: { mcqs: 0, questions: 2, parts: 8, masterSubs: 8, ansSubs: 11 }
  },
  {
    id: 'b23-final-2025-10',
    batch: 23,
    type: 'Final',
    chipClass: '',
    course: 'DA2451',
    dateLabel: 'October 2025',
    sortKey: '2025-10',
    duration: '2 Hours & 30 Minutes',
    mode: 'Closed book',
    weight: '50%',
    totalMarks: 100,
    composition: '30 MCQs (60m) + 3 essays (40m)',
    masterH2: 'Final Examination (October 2025)',
    answerFile: '23_batch_october_2025_answers.md',
    title: 'Final Examination (October 2025)',
    expectedCounts: { mcqs: 30, questions: 3, parts: 10, masterSubs: 4, ansSubs: 4 }
  }
];

/* ---------- 3. Authoritative MCQ Key Table (§4.5) ---------- */
const MCQ_KEYS = {
  'b20-final-2023-08': {
    1:  { primary: ['c'], alsoAccepted: [] },
    2:  { primary: ['b'], alsoAccepted: [] },
    3:  { primary: ['d'], alsoAccepted: [] },
    4:  { primary: ['d'], alsoAccepted: [] },
    5:  { primary: ['a'], alsoAccepted: [] },
    6:  { primary: ['c'], alsoAccepted: [] },
    7:  { primary: ['d'], alsoAccepted: [] },
    8:  { primary: ['d'], alsoAccepted: [] },
    9:  { primary: ['d'], alsoAccepted: [] },
    10: { primary: ['d'], alsoAccepted: [] }
  },
  'b22-final-2024-12': {
    1:  { primary: ['c'], alsoAccepted: [] },
    2:  { primary: ['b'], alsoAccepted: [] },
    3:  { primary: ['a'], alsoAccepted: [] },
    4:  { primary: ['c'], alsoAccepted: [] },
    5:  { primary: ['a'], alsoAccepted: [] },
    6:  { primary: ['a'], alsoAccepted: ['b'] },
    7:  { primary: ['a'], alsoAccepted: [] },
    8:  { primary: ['a'], alsoAccepted: [] },
    9:  { primary: ['c'], alsoAccepted: ['b'] },
    10: { primary: ['a'], alsoAccepted: [] },
    11: { primary: ['b'], alsoAccepted: [] },
    12: { primary: ['b'], alsoAccepted: [] },
    13: { primary: ['b'], alsoAccepted: [] },
    14: { primary: ['b'], alsoAccepted: [] },
    15: { primary: ['b'], alsoAccepted: [] },
    16: { primary: ['d'], alsoAccepted: [] },
    17: { primary: ['b'], alsoAccepted: [] },
    18: { primary: ['c'], alsoAccepted: [] },
    19: { primary: ['b', 'c'], alsoAccepted: [], selectAll: true },
    20: { primary: ['b'], alsoAccepted: [] },
    21: { primary: ['b'], alsoAccepted: [] },
    22: { primary: ['b'], alsoAccepted: [] },
    23: { primary: [],    alsoAccepted: [], noLetter: true, note: 'Exam printing typo: MMLR / MANCOVA omitted from options (a)-(d)' },
    24: { primary: ['a'], alsoAccepted: [] },
    25: { primary: ['c'], alsoAccepted: ['d'] }
  },
  'b23-final-2025-10': {
    1:  { primary: ['b'], alsoAccepted: ['d'] },
    2:  { primary: ['b'], alsoAccepted: [] },
    3:  { primary: ['c'], alsoAccepted: [] },
    4:  { primary: ['c'], alsoAccepted: [] },
    5:  { primary: ['b'], alsoAccepted: [] },
    6:  { primary: ['d'], alsoAccepted: [] },
    7:  { primary: ['a'], alsoAccepted: [] },
    8:  { primary: ['c'], alsoAccepted: [] },
    9:  { primary: ['a'], alsoAccepted: [] },
    10: { primary: ['a'], alsoAccepted: [] },
    11: { primary: ['c'], alsoAccepted: [] },
    12: { primary: ['b'], alsoAccepted: [] },
    13: { primary: ['a'], alsoAccepted: [] },
    14: { primary: ['b'], alsoAccepted: [] },
    15: { primary: ['d'], alsoAccepted: [] },
    16: { primary: ['c'], alsoAccepted: [] },
    17: { primary: ['b'], alsoAccepted: [] },
    18: { primary: ['b'], alsoAccepted: [] },
    19: { primary: ['c'], alsoAccepted: [] },
    20: { primary: ['c'], alsoAccepted: [] },
    21: { primary: ['c'], alsoAccepted: [] },
    22: { primary: ['c'], alsoAccepted: [] },
    23: { primary: ['c'], alsoAccepted: [] },
    24: { primary: ['a'], alsoAccepted: [] },
    25: { primary: ['a'], alsoAccepted: [] },
    26: { primary: ['d'], alsoAccepted: [] },
    27: { primary: ['c'], alsoAccepted: [] },
    28: { primary: ['d'], alsoAccepted: [] },
    29: { primary: ['a'], alsoAccepted: [] },
    30: { primary: ['b'], alsoAccepted: [] }
  }
};

/* ---------- 4. Topic-to-Lecture Chapter Mapping (§6.7) ---------- */
const QUESTION_TOPICS = {
  'b19-final-2022-07/q1': { topic: 'MVN: Independence, Conditional, Linear Combinations, Partitioned Σ, Sampling', chapters: ['ch07', 'ch02'] },
  'b19-final-2022-07/q2': { topic: 'PCA from Σ and R (2×2 by hand), Variable–PC Correlations', chapters: ['ch03', 'ch02'] },
  'b19-final-2022-07/q3': { topic: 'Factor Analysis (Principal Component Method, m=2 vs m=1, Communalities)', chapters: ['ch05', 'ch06'] },
  'b19-final-2022-07/q4': { topic: 'One-Way MANOVA (Wilks Λ*) & Two-Sample Profile Analysis', chapters: ['ch09'] },

  'b20-final-2023-08/q1': { topic: 'MVN: Linear Combinations, Marginals, Independence, Sampling', chapters: ['ch07'] },
  'b20-final-2023-08/q2': { topic: 'PCA in R (prcomp on Salespeople Data)', chapters: ['ch03', 'ch04'] },
  'b20-final-2023-08/q3': { topic: 'Factor Analysis in R (ML + Varimax on U.S. Health Data)', chapters: ['ch05', 'ch06'] },
  'b20-final-2023-08/q4': { topic: 'MMLR in R (3 Responses × 5 Predictors, Nested Model Wilks Test)', chapters: ['ch10', 'ch11'] },

  'b21-inclass-2023/q1':  { topic: 'MVN Sampling Distributions & Linear Combinations / Independence', chapters: ['ch07', 'ch08'] },
  'b21-inclass-2023/q2':  { topic: 'PCA on Standardized Women’s Track Records', chapters: ['ch03', 'ch04'] },
  'b21-inclass-2023/q3':  { topic: 'Factor Analysis (ML) on Salespeople Data', chapters: ['ch05', 'ch06'] },

  'b21-final-2024-01/q1': { topic: 'MVN: Joint Linear Combinations, Marginals, Independence, Sampling', chapters: ['ch07'] },
  'b21-final-2024-01/q2': { topic: 'Two-Sample Hotelling T², Mardia MVN Test (mult.norm), Box’s M (boxM)', chapters: ['ch08', 'ch09'] },
  'b21-final-2024-01/q3': { topic: 'PCA & Biplot Interpretation on Food-Texture Data', chapters: ['ch03', 'ch04'] },
  'b21-final-2024-01/q4': { topic: 'Factor Analysis (EFA vs CFA, Rotation, Loadings > 0.6) on Food-Texture Data', chapters: ['ch05', 'ch06'] },
  'b21-final-2024-01/q5': { topic: 'MMLR in R (LA Air Pollution: Type II MANOVA & Nested Model Test)', chapters: ['ch10', 'ch11'] },

  'b22-final-2024-12/q1': { topic: 'MVN: Linear Combinations, Constant Shifts, Joint Distribution, Independence', chapters: ['ch07'] },
  'b22-final-2024-12/q2': { topic: 'MMLR in R (NYSE Stock Prices: R², Type II MANOVA, Nested Model Test)', chapters: ['ch10', 'ch11'] },

  'b23-quiz1-2025/q1':    { topic: 'Sample Standard Deviations & Sample Correlation Matrix R = D⁻¹/² S D⁻¹/²', chapters: ['ch01', 'ch02'] },
  'b23-quiz1-2025/q2':    { topic: 'Euclidean Distance vs Mahalanobis Distance (Diagonal S)', chapters: ['ch01', 'ch07'] },
  'b23-quiz1-2025/q3':    { topic: 'PCA from eigen(R): Proportions, Retention, Uncorrelatedness Proof', chapters: ['ch03', 'ch02'] },

  'b23-quiz2-2025/q1':    { topic: 'MVN: Marginals, Joint Distribution of Linear Combinations, Independence, Sampling', chapters: ['ch07'] },
  'b23-quiz2-2025/q2':    { topic: 'Factor Analysis (ML) on Salespeople Data', chapters: ['ch05', 'ch06'] },
  'b23-quiz2-2025/q3':    { topic: 'One-Sample Hotelling T² & Mardia Normality Test', chapters: ['ch08', 'ch07'] },

  'b23-quiz3-2025/q1':    { topic: 'Two-Sample Hotelling T², Mardia Normality, Box’s M', chapters: ['ch09', 'ch08'] },
  'b23-quiz3-2025/q2':    { topic: 'MMLR in R (NYSE Stock Prices)', chapters: ['ch10', 'ch11'] },

  'b23-final-2025-10/q1': { topic: 'Paired Multivariate Comparisons (One-Sample Hotelling T² on Differences & Mardia Test)', chapters: ['ch08', 'ch09'] },
  'b23-final-2025-10/q2': { topic: 'One-Way MANOVA Table Completion & Wilks Λ Test', chapters: ['ch09'] },
  'b23-final-2025-10/q3': { topic: 'Linear Discriminant Analysis (MASS::lda) — Historical Paper Topic', chapters: [], outsideCurrentLectures: true }
};

/* ---------- 5. Logged Build-Time Patches & Transforms (§5.2, §5.3, §7.1) ---------- */
const PATCHES_21_JAN_2024 = [
  {
    id: 'PP-I-1',
    desc: '21_batch_january_2024_answers.md L76: Remove escaped \\$$, double backslashes, and extra > inside blockquote display math',
    oldStr: "> \\$$ > AX \\\\sim N_q(A\\\\mu, , A\\\\Sigma A') > $$",
    newStr: "> $$AX \\sim N_q(A\\mu, \\, A\\Sigma A')$$"
  },
  {
    id: 'PP-I-2',
    desc: '21_batch_january_2024_answers.md L454-456: Wrap inner prose in \\text{...} inside display math',
    oldStr: '   $$\n   Gasoline trucks, $i=1$\n   $$',
    newStr: '   $$\n   \\text{Gasoline trucks, } i=1\n   $$'
  },
  {
    id: 'PP-I-3',
    desc: '21_batch_january_2024_answers.md L462-464: Wrap inner prose in \\text{...} inside display math',
    oldStr: '   $$\n   Diesel trucks, $i=2$\n   $$',
    newStr: '   $$\n   \\text{Diesel trucks, } i=2\n   $$'
  }
];

function applyJan2024Patches(src, patchLog = []) {
  let out = src;
  for (const p of PATCHES_21_JAN_2024) {
    if (!out.includes(p.oldStr)) {
      throw new Error(`Patch ${p.id} target not found in 21_batch_january_2024_answers.md`);
    }
    out = out.split(p.oldStr).join(p.newStr);
    patchLog.push(p);
  }
  return out;
}

function fixVline(b) {
  return b.replace(/\\begin\{(bmatrix|pmatrix)\}([\s\S]*?)\\end\{\1\}/g, (m, env, inner) => {
    if (!/\\vline/.test(inner)) return m;
    const rows = inner.split(/\\\\(?![a-zA-Z])/).map(r => r.trim());
    const parsed = rows.map(r => {
      let hl = '';
      while (/^\\hline\s*/.test(r)) {
        hl += '\\hline ';
        r = r.replace(/^\\hline\s*/, '');
      }
      return { hl, cells: r.split(/(?<!\\)&/).map(c => c.trim()) };
    });
    const ref = parsed.find(r => r.cells.includes('\\vline'));
    if (!ref) return m;
    let spec = '';
    ref.cells.forEach(c => {
      spec += c === '\\vline' ? '|' : 'c';
    });
    const out = parsed.map(r => r.hl + r.cells.filter(c => c !== '\\vline').join(' & '));
    const [l, rr] = env === 'bmatrix' ? ['\\left[', '\\right]'] : ['\\left(', '\\right)'];
    return `${l}\\begin{array}{${spec}} ${out.join(' \\\\ ')} \\end{array}${rr}`;
  });
}

const O = '\u27E6'; // ⟦
const C = '\u27E7'; // ⟧

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Reference Markdown + Math + Code Renderer (§7.1 of Past Papers Integration Guide)
 */
function renderPastPaperMarkdown(rawMarkdown, options = {}) {
  const { applyPatches = false, katexOutput = 'html', decorateBlocks = true } = options;
  let src = String(rawMarkdown).replace(/\r\n?/g, '\n');
  if (applyPatches) {
    src = applyJan2024Patches(src);
  }

  const store = [];
  const put = o => {
    store.push(o);
    return O + (store.length - 1) + C;
  };

  let rFenceCount = 0;
  let txtFenceCount = 0;
  let vlineTransformCount = 0;

  // 1. Protect fenced code blocks (dedent list-indented fences per §7.1)
  const lines = src.split('\n');
  const outLines = [];
  for (let i = 0; i < lines.length; ) {
    const m = lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*$/);
    if (m) {
      const ind = m[1].length;
      const close = new RegExp('^\\s*' + m[2][0] + '{' + m[2].length + ',}\\s*$');
      let j = i + 1;
      const body = [];
      while (j < lines.length && !close.test(lines[j])) {
        body.push(lines[j++].replace(new RegExp('^ {0,' + ind + '}'), ''));
      }
      if (j >= lines.length) throw new Error('Unclosed fence at line ' + (i + 1));
      const cleanLang = (m[3] || '').trim().toLowerCase();
      if (cleanLang === 'r') rFenceCount++;
      else txtFenceCount++;
      outLines.push(m[1] + put({ k: 'fence', v: body.join('\n'), lang: cleanLang || 'text' }));
      i = j + 1;
    } else {
      outLines.push(lines[i++]);
    }
  }
  src = outLines.join('\n');

  // 2. Protect inline code
  src = src.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g, (m, t, b) =>
    put({ k: 'code', v: b.replace(/^ (.*) $/, '$1') })
  );

  // 3. Protect display math $$...$$ and inline math $...$ (skipping escaped \$)
  const stripBq = (m, b) => {
    const body = b.split('\n').map((l, i) => (i === 0 ? l : l.replace(/^[ \t]*>[ \t]?/, ''))).join('\n');
    return put({ k: 'math', v: body, disp: true });
  };
  src = src
    .replace(/\$\$([\s\S]+?)\$\$/g, stripBq)
    .replace(/(?<![\\$])\$((?:\\[\s\S]|[^$\\\n])+?)\$/g, (m, b) => put({ k: 'math', v: b, disp: false }));

  // 4. Render Markdown
  const md = new MarkdownIt({ html: false, linkify: false, typographer: false });
  const tocLevels = [];
  md.core.ruler.push('toc', st => {
    for (let i = 0; i < st.tokens.length; i++) {
      if (st.tokens[i].type === 'heading_open') tocLevels.push(+st.tokens[i].tag[1]);
    }
  });
  if (decorateBlocks) {
    md.renderer.rules.table_open = (t, i, o) => '<div class="table-scroll">' + md.renderer.renderToken(t, i, o);
    md.renderer.rules.table_close = () => '</table></div>';
  }
  let html = md.render(src);

  // 5. Restore placeholders
  let dispCount = 0;
  let inlCount = 0;
  const PH = new RegExp(O + '(\\d+)' + C, 'g');

  // First upgrade standalone display-math paragraphs when decorateBlocks is enabled
  if (decorateBlocks) {
    html = html.replace(new RegExp('<p>\\s*' + O + '(\\d+)' + C + '\\s*<\\/p>', 'g'), (full, n) => {
      const s = store[+n];
      if (!s || s.k !== 'math' || !s.disp) return full;
      dispCount++;
      if (s.v.includes('\\vline')) vlineTransformCount++;
      const tex = fixVline(s.v.trim());
      const rendered = katex.renderToString(tex, {
        displayMode: true,
        throwOnError: true,
        strict: 'ignore',
        output: katexOutput
      });
      return `<div class="math-block" tabindex="0" role="region" aria-label="Equation" data-tex="${escapeHtml(tex)}">
        ${rendered}
        <button type="button" class="btn btn-ghost copy-tex" style="min-height:26px;font-size:var(--fs-xs)" data-action="copy-tex" title="Copy TeX" aria-label="Copy TeX">
          <svg class="ic ic-a" width="13" height="13" aria-hidden="true"><use href="#i-copy"/></svg>
          <svg class="ic ic-b" width="13" height="13" aria-hidden="true"><use href="#i-check"/></svg>
          <span class="btn-label">Copy TeX</span>
        </button>
      </div>`;
    });
  }

  html = html.replace(PH, (_, n) => {
    const s = store[+n];
    if (s.k === 'fence') {
      const isR = s.lang === 'r';
      const hi = isR && hljs.getLanguage('r')
        ? hljs.highlight(s.v, { language: 'r', ignoreIllegals: true }).value
        : escapeHtml(s.v);
      if (!decorateBlocks) {
        return '<pre class="code"><code>' + hi + '</code></pre>';
      }
      const badgeLabel = isR ? 'R Code' : 'R / Console Output';
      return `<div class="code-card ${isR ? 'code-card--r' : 'code-card--out'}">
        <div class="code-bar">
          <span class="code-lang">${badgeLabel}</span>
          <button type="button" class="btn btn-ghost code-copy-btn" style="min-height:26px;padding:0 8px;font-size:var(--fs-xs)" data-action="copy-code" aria-label="Copy ${badgeLabel}">
            <svg class="ic ic-a" width="14" height="14" aria-hidden="true"><use href="#i-copy"/></svg>
            <svg class="ic ic-b" width="14" height="14" aria-hidden="true"><use href="#i-check"/></svg>
            <span class="btn-label">Copy</span>
          </button>
        </div>
        <pre><code class="hljs language-${isR ? 'r' : 'plaintext'}">${hi}</code></pre>
      </div>`;
    }
    if (s.k === 'code') {
      return '<code>' + escapeHtml(s.v) + '</code>';
    }
    if (s.disp) dispCount++;
    else inlCount++;
    if (s.v.includes('\\vline')) vlineTransformCount++;
    const tex = fixVline(s.v.trim());
    const rendered = katex.renderToString(tex, {
      displayMode: s.disp,
      throwOnError: true,
      strict: 'ignore',
      output: katexOutput
    });
    if (!decorateBlocks) return rendered;
    return s.disp
      ? `<div class="math-block" tabindex="0" role="region" aria-label="Equation" data-tex="${escapeHtml(tex)}">${rendered}</div>`
      : `<span class="math-inline">${rendered}</span>`;
  });

  const hCounts = [1, 2, 3, 4, 5].map(lv => tocLevels.filter(x => x === lv).length);

  return {
    html,
    stats: {
      h: hCounts,
      h1: hCounts[0],
      h2: hCounts[1],
      h3: hCounts[2],
      h4: hCounts[3],
      h5: hCounts[4],
      fence: rFenceCount + txtFenceCount,
      rFence: rFenceCount,
      txtFence: txtFenceCount,
      tbl: (html.match(/<table>/g) || []).length,
      disp: dispCount,
      inl: inlCount,
      math: dispCount + inlCount,
      vlineTransforms: vlineTransformCount
    }
  };
}

/* ---------- 6. Verify Whole-File Invariants (§7.4) ---------- */
function verifyAllPastPaperFileInvariants(katexOutput = 'html') {
  const results = [];
  const patchLog = [];

  for (const spec of SOURCE_FILES) {
    const fullPath = path.join(PPS_DIR, spec.file);
    const rawBuf = fs.readFileSync(fullPath);
    const sha16 = crypto.createHash('sha256').update(rawBuf).digest('hex').slice(0, 16);
    if (sha16 !== spec.sha16) {
      throw new Error(`SHA-256 mismatch on ${spec.file}: expected ${spec.sha16}, got ${sha16}`);
    }

    const rawText = rawBuf.toString('utf8');
    const isJan2024 = spec.file === '21_batch_january_2024_answers.md';
    const patchedText = isJan2024 ? applyJan2024Patches(rawText.replace(/\r\n?/g, '\n'), patchLog) : rawText.replace(/\r\n?/g, '\n');

    const { html, stats } = renderPastPaperMarkdown(patchedText, {
      applyPatches: false,
      katexOutput,
      decorateBlocks: false
    });

    // Strip KaTeX spans, <pre>, and <code> per §7.1 line 402
    const stripped = html
      .replace(/<span class="katex[\s\S]*?<\/span><\/span><\/span>/g, '')
      .replace(/<pre[\s\S]*?<\/pre>/g, '')
      .replace(/<code>[\s\S]*?<\/code>/g, '')
      .replace(/<[^>]+>/g, ' ');

    const strayDollar = (stripped.match(/\$/g) || []).length;
    const strayBold = (stripped.match(/\*\*/g) || []).length;
    const katexErrors = (html.match(/katex-error/g) || []).length;

    const exp = spec.inv;
    const ok =
      stats.h.join('/') === exp.h.join('/') &&
      stats.fence === exp.fence &&
      stats.tbl === exp.tbl &&
      stats.math === exp.math &&
      strayDollar === 0 &&
      strayBold === 0 &&
      katexErrors === 0;

    if (!ok) {
      throw new Error(
        `Invariant mismatch in ${spec.file}: actual=${JSON.stringify({ stats, strayDollar, strayBold, katexErrors })} vs expected=${JSON.stringify(exp)}`
      );
    }

    results.push({
      file: spec.file,
      sha16,
      stats,
      strayDollar,
      strayBold,
      katexErrors
    });
  }

  return { results, patchLog };
}

/* ---------- 7. Parse Master Questions File (past_papers_multivariate_questions_only.md) ---------- */
function extractMarksFromText(text) {
  const m = String(text).match(/`?\[(\d+)\s*marks?\]`?|`?\((?:(\d+)\s*marks?)\)`?/i);
  if (!m) return null;
  return parseInt(m[1] || m[2], 10);
}

function stripMarksFromQuestionText(text) {
  return String(text)
    .replace(/\s*(?:`\[\d+\s*marks?\]`|\[\d+\s*marks?\]|`\(\d+\s*marks?\)`|\(\d+\s*marks?\))\s*(?=\r?\n|$)/gi, '')
    .trim();
}

function parseMasterQuestions(masterRaw, katexOutput = 'html') {
  const src = masterRaw.replace(/\r\n/g, '\n');
  const lines = src.split('\n');

  // Locate each paper's ## heading
  const paperStarts = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^##\s+(.+)$/);
    if (m) {
      const title = m[1].trim();
      const meta = PAPERS_META.find(p => p.masterH2 === title);
      if (meta) {
        paperStarts.push({ meta, startLine: i });
      }
    }
  }

  if (paperStarts.length !== 9) {
    throw new Error(`Expected 9 paper H2 sections in master file, found ${paperStarts.length}`);
  }

  const parsedPapers = {};

  for (let pIdx = 0; pIdx < paperStarts.length; pIdx++) {
    const { meta, startLine } = paperStarts[pIdx];
    let endLine = pIdx + 1 < paperStarts.length ? paperStarts[pIdx + 1].startLine : lines.length;
    // Trim trailing `# N. XX BATCH ...` and `---` separators belonging to the next batch banner
    while (endLine > startLine && (/^#\s+\d+\.\s+\d+\s+BATCH/i.test(lines[endLine - 1]) || /^---\s*$/.test(lines[endLine - 1]) || lines[endLine - 1].trim() === '')) {
      endLine--;
    }

    const paperLines = lines.slice(startLine + 1, endLine);

    // Find all ### headings inside this paper
    const h3Indices = [];
    for (let i = 0; i < paperLines.length; i++) {
      const m = paperLines[i].match(/^###\s+(.+)$/);
      if (m) h3Indices.push({ title: m[1].trim(), idx: i });
    }

    const firstH3Idx = h3Indices.length > 0 ? h3Indices[0].idx : paperLines.length;
    const headerMd = paperLines.slice(0, firstH3Idx).join('\n').trim();
    const headerHtml = headerMd ? renderPastPaperMarkdown(headerMd, { katexOutput }).html : '';

    const mcqs = [];
    let mcqGroupIntro = null;
    let sharedContext = null;
    const questions = [];

    for (let hIdx = 0; hIdx < h3Indices.length; hIdx++) {
      const h3 = h3Indices[hIdx];
      const nextIdx = hIdx + 1 < h3Indices.length ? h3Indices[hIdx + 1].idx : paperLines.length;
      const sectionLines = paperLines.slice(h3.idx + 1, nextIdx);

      if (/^Multiple Choice Questions/i.test(h3.title)) {
        // Parse MCQs (1..N) and optional group intro
        const qStarts = [];
        for (let i = 0; i < sectionLines.length; i++) {
          const qm = sectionLines[i].match(/^\*\*(\d+)\.\s+(.*)$/);
          if (qm) qStarts.push({ num: parseInt(qm[1], 10), lineIdx: i });
        }

        for (let qk = 0; qk < qStarts.length; qk++) {
          const cur = qStarts[qk];
          const lim = qk + 1 < qStarts.length ? qStarts[qk + 1].lineIdx : sectionLines.length;
          const blockLines = sectionLines.slice(cur.lineIdx, lim);

          // Check if the tail of this MCQ block contains the italic group intro for subsequent MCQs
          let groupIntroStart = -1;
          for (let bi = 0; bi < blockLines.length; bi++) {
            if (/^\*For each of the following research questions/i.test(blockLines[bi].trim())) {
              groupIntroStart = bi;
              break;
            }
          }

          let mcqLines = blockLines;
          if (groupIntroStart >= 0) {
            const introMd = blockLines.slice(groupIntroStart).join('\n').trim();
            mcqLines = blockLines.slice(0, groupIntroStart);
            const targetStartNum = qk + 1 < qStarts.length ? qStarts[qk + 1].num : cur.num + 1;
            const targetEndNum = qStarts[qStarts.length - 1].num;
            mcqGroupIntro = {
              id: `${meta.id}/mcqgrp/${targetStartNum}-${targetEndNum}`,
              fromMcq: targetStartNum,
              toMcq: targetEndNum,
              md: introMd,
              html: renderPastPaperMarkdown(introMd, { katexOutput }).html
            };
          }

          // Separate stem lines from option lines `* (a) ...`
          const optIndices = [];
          for (let bi = 0; bi < mcqLines.length; bi++) {
            const om = mcqLines[bi].match(/^\*\s+\(([a-d])\)\s+(.*)$/);
            if (om) optIndices.push({ letter: om[1], lineIdx: bi, firstLine: om[2] });
          }

          const firstOptLine = optIndices.length > 0 ? optIndices[0].lineIdx : mcqLines.length;
          // Remove leading `**N. ` from first line of stem while preserving bold balance
          const rawStemLines = mcqLines.slice(0, firstOptLine);
          if (rawStemLines.length > 0) {
            rawStemLines[0] = rawStemLines[0].replace(/^\*\*\d+\.\s+/, '**');
            // If the first line no longer has a closing `**` (e.g. `**1. Let** $X$...`), balance it:
            const boldCount = (rawStemLines[0].match(/\*\*/g) || []).length;
            if (boldCount % 2 === 1) {
              rawStemLines[0] = rawStemLines[0].replace(/^\*\*/, '');
            }
          }
          const stemMd = rawStemLines.join('\n').trim();
          const stemHtml = renderPastPaperMarkdown(stemMd, { katexOutput }).html;

          const options = [];
          let trailingNoteMd = '';
          for (let oi = 0; oi < optIndices.length; oi++) {
            const oCur = optIndices[oi];
            const oLim = oi + 1 < optIndices.length ? optIndices[oi + 1].lineIdx : mcqLines.length;
            const oLines = [oCur.firstLine].concat(mcqLines.slice(oCur.lineIdx + 1, oLim));
            // Check if there is a trailing `*Note that* ...` line on option (d)
            const filteredOLines = [];
            for (const ol of oLines) {
              if (/^\s*\*Note that\*/i.test(ol)) {
                trailingNoteMd += (trailingNoteMd ? '\n' : '') + ol.trim();
              } else if (ol.trim() !== '') {
                filteredOLines.push(ol.trim());
              }
            }
            const optMd = filteredOLines.join(' ');
            // Render inline markdown/math for option
            const optHtml = renderPastPaperMarkdown(optMd, { katexOutput }).html.replace(/^<p>([\s\S]*?)<\/p>\s*$/, '$1');
            options.push({
              letter: oCur.letter,
              md: optMd,
              html: optHtml
            });
          }

          const trailingNoteHtml = trailingNoteMd
            ? renderPastPaperMarkdown(trailingNoteMd, { katexOutput }).html
            : '';

          mcqs.push({
            id: `${meta.id}/mcq/${cur.num}`,
            num: cur.num,
            marks: 2,
            stemMd,
            stemHtml,
            options,
            trailingNoteMd,
            trailingNoteHtml,
            fullQuestionMd: mcqLines.join('\n').trim()
          });
        }
      } else if (/^Context for Question/i.test(h3.title)) {
        const ctxMd = sectionLines.join('\n').trim();
        sharedContext = {
          id: `${meta.id}/ctx/q3-q4`,
          title: h3.title,
          appliesTo: [3, 4],
          md: ctxMd,
          html: renderPastPaperMarkdown(ctxMd, { katexOutput }).html
        };
      } else if (/^Question\s+\(?(\d+)\)?/i.test(h3.title)) {
        const qm = h3.title.match(/^Question\s+\(?(\d+)\)?/i);
        const qNum = parseInt(qm[1], 10);

        // Extract `[Total marks for Question N = M]` line if present
        let totalMarks = null;
        const cleanSectionLines = [];
        for (const sl of sectionLines) {
          const tm = sl.match(/`\[Total marks for Question\s+\d+\s*=\s*(\d+)\]`/i);
          if (tm) {
            totalMarks = parseInt(tm[1], 10);
          } else {
            cleanSectionLines.push(sl);
          }
        }

        // Find all main parts `**(a)`..`**(z)`
        const partStarts = [];
        for (let i = 0; i < cleanSectionLines.length; i++) {
          const pm = cleanSectionLines[i].match(/^\*\*\(([a-z])\)\s*(.*)$/);
          if (pm) {
            partStarts.push({ letter: pm[1], lineIdx: i });
          }
        }

        const firstPartLine = partStarts.length > 0 ? partStarts[0].lineIdx : cleanSectionLines.length;
        const stemMd = cleanSectionLines.slice(0, firstPartLine).join('\n').trim();
        const stemHtml = stemMd ? renderPastPaperMarkdown(stemMd, { katexOutput }).html : '';

        const parts = [];
        for (let pi = 0; pi < partStarts.length; pi++) {
          const pCur = partStarts[pi];
          const pLim = pi + 1 < partStarts.length ? partStarts[pi + 1].lineIdx : cleanSectionLines.length;
          const pLines = cleanSectionLines.slice(pCur.lineIdx, pLim);

          // Strip leading `**(a) ` from first line while keeping bold balanced
          const pLinesCopy = pLines.slice();
          pLinesCopy[0] = pLinesCopy[0].replace(/^\*\*\([a-z]\)\s*/, '**');
          if (((pLinesCopy[0].match(/\*\*/g) || []).length % 2) === 1) {
            pLinesCopy[0] = pLinesCopy[0].replace(/^\*\*/, '');
          }

          // Check for sub-parts `* **(i)**`..`* **(vi)**`
          const subStarts = [];
          for (let si = 0; si < pLinesCopy.length; si++) {
            const sm = pLinesCopy[si].match(/^\*\s+\*\*\(([ivx]+)\)\*\*\s*(.*)$/);
            if (sm) subStarts.push({ roman: sm[1], lineIdx: si });
          }

          const firstSubLine = subStarts.length > 0 ? subStarts[0].lineIdx : pLinesCopy.length;
          const partIntroRaw = pLinesCopy.slice(0, firstSubLine).join('\n').trim();
          const partMarks = subStarts.length === 0 ? extractMarksFromText(partIntroRaw) : null;
          // Strip trailing `[N marks]` or `(N marks)` badge from display markdown so we don't duplicate the marks pill
          const partIntroDisplayMd = stripMarksFromQuestionText(partIntroRaw);
          const partIntroHtml = partIntroDisplayMd
            ? renderPastPaperMarkdown(partIntroDisplayMd, { katexOutput }).html
            : '';

          const subParts = [];
          for (let si = 0; si < subStarts.length; si++) {
            const sCur = subStarts[si];
            const sLim = si + 1 < subStarts.length ? subStarts[si + 1].lineIdx : pLinesCopy.length;
            const sLines = pLinesCopy.slice(sCur.lineIdx, sLim);
            // Dedent continuation lines of bullet item
            sLines[0] = sLines[0].replace(/^\*\s+\*\*\([ivx]+\)\*\*\s*/, '');
            const dedentedSLines = sLines.map((l, idx) => (idx === 0 ? l : l.replace(/^  /, '')));
            const subRawMd = dedentedSLines.join('\n').trim();
            const subMarks = extractMarksFromText(subRawMd);
            const subDisplayMd = stripMarksFromQuestionText(subRawMd);
            const subHtml = renderPastPaperMarkdown(subDisplayMd, { katexOutput }).html;

            subParts.push({
              id: `${meta.id}/q${qNum}/${pCur.letter}/${sCur.roman}`,
              roman: sCur.roman,
              marks: subMarks,
              rawMd: subRawMd,
              html: subHtml
            });
          }

          const computedPartMarks = partMarks !== null
            ? partMarks
            : subParts.reduce((acc, sp) => acc + (sp.marks || 0), 0);

          parts.push({
            id: `${meta.id}/q${qNum}/${pCur.letter}`,
            letter: pCur.letter,
            marks: computedPartMarks,
            hasMasterMarks: partMarks !== null || subParts.some(s => s.marks !== null),
            rawMd: pLines.join('\n').trim(),
            introHtml: partIntroHtml,
            subParts
          });
        }

        const topicInfo = QUESTION_TOPICS[`${meta.id}/q${qNum}`] || { topic: 'Multivariate Analysis', chapters: [] };

        questions.push({
          id: `${meta.id}/q${qNum}`,
          num: qNum,
          totalMarks,
          stemMd,
          stemHtml,
          parts,
          fullQuestionMd: cleanSectionLines.join('\n').trim(),
          topic: topicInfo.topic,
          chapters: topicInfo.chapters,
          outsideCurrentLectures: Boolean(topicInfo.outsideCurrentLectures),
          usesSharedContext: meta.id === 'b21-final-2024-01' && (qNum === 3 || qNum === 4)
        });
      }
    }

    parsedPapers[meta.id] = {
      meta,
      headerMd,
      headerHtml,
      mcqGroupIntro,
      sharedContext,
      mcqs,
      questions
    };
  }

  return parsedPapers;
}

/* ---------- 8. Parse Answer File & Pair Every Item 1-to-1 ---------- */
function stripDuplicateMcqQuestionRef(mcqBodyLines) {
  // Strip `**Question Reference:** ...` and italic option bullets `* *(a)...*` at top of MCQ answer block
  let i = 0;
  while (i < mcqBodyLines.length && mcqBodyLines[i].trim() === '') i++;
  if (i < mcqBodyLines.length && /^\*\*Question Reference:\*\*/i.test(mcqBodyLines[i].trim())) {
    i++;
    while (i < mcqBodyLines.length) {
      const t = mcqBodyLines[i].trim();
      if (t === '' || /^\*\s+\*\([a-d]\)/i.test(t) || /^\*\([a-d]\)/i.test(t) || /^\*\(Note that/i.test(t)) {
        i++;
      } else {
        break;
      }
    }
  }
  // Also strip trailing `---` separator lines
  let end = mcqBodyLines.length;
  while (end > i && (/^---\s*$/.test(mcqBodyLines[end - 1].trim()) || mcqBodyLines[end - 1].trim() === '')) {
    end--;
  }
  return mcqBodyLines.slice(i, end).join('\n').trim();
}

function parseAnswerFile(paperMeta, katexOutput = 'html') {
  const fullPath = path.join(PPS_DIR, paperMeta.answerFile);
  let src = fs.readFileSync(fullPath, 'utf8').replace(/\r\n/g, '\n');
  if (paperMeta.answerFile === '21_batch_january_2024_answers.md') {
    src = applyJan2024Patches(src);
  }
  const lines = src.split('\n');

  const mcqAnswers = {};
  let mcqGroupGuide = null;
  let sharedContextAnswer = null;
  const questionAnswers = {};

  // 1. Parse MCQ sections (`## MCQ N` and group guide H2)
  const h2Starts = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^(#{1,2})\s+(.+)$/);
    if (m) h2Starts.push({ hashes: m[1], title: m[2].trim(), lineIdx: i });
  }

  for (let idx = 0; idx < h2Starts.length; idx++) {
    const cur = h2Starts[idx];
    const lim = idx + 1 < h2Starts.length ? h2Starts[idx + 1].lineIdx : lines.length;

    if (cur.hashes === '##' && /^MCQ\s+(\d+)$/i.test(cur.title)) {
      const mcqNum = parseInt(cur.title.match(/^MCQ\s+(\d+)$/i)[1], 10);
      const blockLines = lines.slice(cur.lineIdx + 1, lim);
      const cleanedMd = stripDuplicateMcqQuestionRef(blockLines);
      const keyLineMatch = cleanedMd.match(/^>\s*\*\*Correct Answer[^\n]+/m);
      const keyLineMd = keyLineMatch ? keyLineMatch[0].replace(/^>\s*/, '').trim() : '';
      const keyLineHtml = keyLineMd
        ? renderPastPaperMarkdown(keyLineMd, { katexOutput }).html.replace(/^<p>([\s\S]*?)<\/p>\s*$/, '$1')
        : '';

      const keySpec = (MCQ_KEYS[paperMeta.id] && MCQ_KEYS[paperMeta.id][mcqNum]) || null;
      if (!keySpec) {
        throw new Error(`Missing authoritative MCQ key spec for ${paperMeta.id} MCQ ${mcqNum}`);
      }

      mcqAnswers[mcqNum] = {
        num: mcqNum,
        key: keySpec,
        keyLineMd,
        keyLineHtml,
        rawMd: cleanedMd,
        html: renderPastPaperMarkdown(cleanedMd, { katexOutput }).html
      };
    } else if (cur.hashes === '##' && /(?:Guide to Research Technique|Master Cheat-Sheet for Research Technique)/i.test(cur.title)) {
      let end = lim;
      while (end > cur.lineIdx + 1 && (/^---\s*$/.test(lines[end - 1].trim()) || lines[end - 1].trim() === '')) end--;
      const guideMd = `### ${cur.title}\n\n` + lines.slice(cur.lineIdx + 1, end).join('\n').trim();
      mcqGroupGuide = {
        title: cur.title,
        md: guideMd,
        html: renderPastPaperMarkdown(guideMd, { katexOutput }).html
      };
    } else if (cur.hashes === '#' && /^Context for Question 3 and Question 4/i.test(cur.title)) {
      let end = lim;
      while (end > cur.lineIdx + 1 && (/^---\s*$/.test(lines[end - 1].trim()) || lines[end - 1].trim() === '')) end--;
      const ctxAnsMd = lines.slice(cur.lineIdx + 1, end).join('\n').trim();
      sharedContextAnswer = {
        title: cur.title,
        md: ctxAnsMd,
        html: renderPastPaperMarkdown(ctxAnsMd, { katexOutput }).html
      };
    }
  }

  // 2. Parse Essay Questions (`# Question N` or `# Question (N)`)
  const qH1Starts = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^#\s+Question\s+\(?(\d+)\)?(.*)$/i);
    if (m) {
      qH1Starts.push({
        num: parseInt(m[1], 10),
        rest: m[2] || '',
        lineIdx: i
      });
    }
  }

  for (let qi = 0; qi < qH1Starts.length; qi++) {
    const qCur = qH1Starts[qi];
    const qLim = qi + 1 < qH1Starts.length ? qH1Starts[qi + 1].lineIdx : lines.length;
    const qLines = lines.slice(qCur.lineIdx + 1, qLim);

    const ansTotalMatch = qCur.rest.match(/Total:\s*(\d+)\s*Marks/i);
    const ansTotalMarks = ansTotalMatch ? parseInt(ansTotalMatch[1], 10) : null;

    // Find all `## Part (a)`..`## Part (z)` inside this question
    const partH2Starts = [];
    for (let i = 0; i < qLines.length; i++) {
      const pm = qLines[i].match(/^##\s+Part\s+\(([a-z])\):?\s*(.*)$/i);
      if (pm) {
        partH2Starts.push({
          letter: pm[1].toLowerCase(),
          headingRest: pm[2].trim(),
          lineIdx: i
        });
      }
    }

    // Extract question-level foundation (`### Beginner’s Foundation...` or `## Beginner’s Concept Guide...`) before first `## Part (a)`
    const prePartLines = qLines.slice(0, partH2Starts.length > 0 ? partH2Starts[0].lineIdx : qLines.length);
    let foundationStart = -1;
    for (let i = 0; i < prePartLines.length; i++) {
      if (/^#{2,3}\s+Beginner/i.test(prePartLines[i])) {
        foundationStart = i;
        break;
      }
    }
    let foundationMd = '';
    if (foundationStart >= 0) {
      let fEnd = prePartLines.length;
      while (fEnd > foundationStart && (/^---\s*$/.test(prePartLines[fEnd - 1].trim()) || prePartLines[fEnd - 1].trim() === '')) {
        fEnd--;
      }
      foundationMd = prePartLines.slice(foundationStart, fEnd).join('\n').trim();
    }
    const foundationHtml = foundationMd ? renderPastPaperMarkdown(foundationMd, { katexOutput }).html : '';

    const partAnswers = {};
    for (let pi = 0; pi < partH2Starts.length; pi++) {
      const pCur = partH2Starts[pi];
      let pEnd = pi + 1 < partH2Starts.length ? partH2Starts[pi + 1].lineIdx : qLines.length;
      while (pEnd > pCur.lineIdx + 1 && (/^---\s*$/.test(qLines[pEnd - 1].trim()) || qLines[pEnd - 1].trim() === '')) {
        pEnd--;
      }

      const pBodyLines = qLines.slice(pCur.lineIdx + 1, pEnd);
      const pRawMd = pBodyLines.join('\n').trim();
      const ansPartMarks = extractMarksFromText(pCur.headingRest);

      // Also parse sub-part headings `### (a)(i)` or `### Sub-question (a)(i)` inside this part
      const subH3Starts = [];
      for (let si = 0; si < pBodyLines.length; si++) {
        const sm = pBodyLines[si].match(/^###\s+(?:Sub-question\s+)?\(([a-z])\)\(([ivx]+)\):?\s*(.*)$/i);
        if (sm) {
          subH3Starts.push({
            partLetter: sm[1].toLowerCase(),
            roman: sm[2].toLowerCase(),
            headingRest: sm[3].trim(),
            lineIdx: si
          });
        }
      }

      const subAnswers = {};
      let partIntroAnswerMd = '';
      if (subH3Starts.length > 0) {
        partIntroAnswerMd = pBodyLines.slice(0, subH3Starts[0].lineIdx).join('\n').trim();
        for (let si = 0; si < subH3Starts.length; si++) {
          const sCur = subH3Starts[si];
          let sEnd = si + 1 < subH3Starts.length ? subH3Starts[si + 1].lineIdx : pBodyLines.length;
          while (sEnd > sCur.lineIdx + 1 && (/^---\s*$/.test(pBodyLines[sEnd - 1].trim()) || pBodyLines[sEnd - 1].trim() === '')) {
            sEnd--;
          }
          const subBodyMd = pBodyLines.slice(sCur.lineIdx + 1, sEnd).join('\n').trim();
          const subMarks = extractMarksFromText(sCur.headingRest);
          subAnswers[sCur.roman] = {
            roman: sCur.roman,
            heading: sCur.headingRest,
            marks: subMarks,
            rawMd: subBodyMd,
            html: renderPastPaperMarkdown(subBodyMd, { katexOutput }).html
          };
        }
      }

      partAnswers[pCur.letter] = {
        letter: pCur.letter,
        heading: pCur.headingRest,
        marks: ansPartMarks,
        rawMd: pRawMd,
        html: renderPastPaperMarkdown(pRawMd, { katexOutput }).html,
        partIntroHtml: partIntroAnswerMd ? renderPastPaperMarkdown(partIntroAnswerMd, { katexOutput }).html : '',
        subAnswers
      };
    }

    questionAnswers[qCur.num] = {
      num: qCur.num,
      totalMarks: ansTotalMarks,
      foundationMd,
      foundationHtml,
      partAnswers,
      fullAnswerMd: [foundationMd].concat(Object.values(partAnswers).map(pa => `## Part (${pa.letter}): ${pa.heading}\n\n${pa.rawMd}`)).filter(Boolean).join('\n\n')
    };
  }

  return {
    mcqAnswers,
    mcqGroupGuide,
    sharedContextAnswer,
    questionAnswers
  };
}

/* ---------- 9. Ingest All 9 Past Papers & Verify 100% Mapping ---------- */
function ingestAllPastPapers(options = {}) {
  const { katexOutput = 'html', writeAudit = true } = options;

  // Step 1: Verify all 10 source file SHA-256 prefixes and §7.4 rendering invariants
  const { results: invariantResults, patchLog } = verifyAllPastPaperFileInvariants(katexOutput);

  // Step 2: Parse master questions
  const masterRaw = fs.readFileSync(path.join(PPS_DIR, 'past_papers_multivariate_questions_only.md'), 'utf8');
  const masterPapers = parseMasterQuestions(masterRaw, katexOutput);

  const papers = [];
  const auditRows = [];
  const promptRecords = {}; // qid -> { type: 'paper', meta, question, answer }

  for (const meta of PAPERS_META) {
    const mPaper = masterPapers[meta.id];
    if (!mPaper) throw new Error(`Missing parsed master paper for ${meta.id}`);

    const aPaper = parseAnswerFile(meta, katexOutput);

    // Attach shared context teaching notes if present
    if (mPaper.sharedContext && aPaper.sharedContextAnswer) {
      mPaper.sharedContext.answerHtml = aPaper.sharedContextAnswer.html;
      mPaper.sharedContext.answerMd = aPaper.sharedContextAnswer.md;
    }

    // Attach MCQ group teaching guide if present
    if (mPaper.mcqGroupIntro && aPaper.mcqGroupGuide) {
      mPaper.mcqGroupIntro.guideHtml = aPaper.mcqGroupGuide.html;
      mPaper.mcqGroupIntro.guideMd = aPaper.mcqGroupGuide.md;
    }

    // Verify and pair every MCQ
    const masterMcqCount = mPaper.mcqs.length;
    const ansMcqCount = Object.keys(aPaper.mcqAnswers).length;
    if (masterMcqCount !== meta.expectedCounts.mcqs || ansMcqCount !== meta.expectedCounts.mcqs) {
      throw new Error(`MCQ count mismatch in ${meta.id}: master=${masterMcqCount}, ans=${ansMcqCount}, expected=${meta.expectedCounts.mcqs}`);
    }

    for (const mcq of mPaper.mcqs) {
      const ans = aPaper.mcqAnswers[mcq.num];
      if (!ans) {
        throw new Error(`Unmatched MCQ in ${meta.id}: MCQ ${mcq.num} has no corresponding answer`);
      }
      mcq.answer = ans;

      const metaLabel = `${meta.title} · Batch ${meta.batch} · ${meta.course} · MCQ ${mcq.num} [2 marks]`;
      promptRecords[mcq.id] = {
        type: 'paper',
        meta: metaLabel,
        question: mcq.fullQuestionMd,
        answer: ans.rawMd
      };

      auditRows.push({
        paperId: meta.id,
        itemType: 'MCQ',
        itemId: mcq.id,
        masterRef: `MCQ ${mcq.num}`,
        answerRef: `${meta.answerFile} :: ## MCQ ${mcq.num}`,
        marks: 2,
        status: 'VERIFIED_EXACT_MATCH',
        notes: ans.key.noLetter
          ? 'E7: Exam option printing typo documented (MMLR/MANCOVA)'
          : (ans.key.selectAll ? 'E7: Select-all-that-apply ((b) AND (c))' : (ans.key.alsoAccepted.length ? `E7: Primary (${ans.key.primary.join(',')}), also accepted (${ans.key.alsoAccepted.join(',')})` : `Key (${ans.key.primary.join(',')})`))
      });
    }

    // Verify and pair every Essay Question, Part, and Sub-part
    const masterQCount = mPaper.questions.length;
    const ansQCount = Object.keys(aPaper.questionAnswers).length;
    if (masterQCount !== meta.expectedCounts.questions || ansQCount !== meta.expectedCounts.questions) {
      throw new Error(`Essay question count mismatch in ${meta.id}: master=${masterQCount}, ans=${ansQCount}, expected=${meta.expectedCounts.questions}`);
    }

    let totalPartsCount = 0;
    let totalMasterSubsCount = 0;
    let totalAnsSubsCount = 0;

    for (const q of mPaper.questions) {
      const qAns = aPaper.questionAnswers[q.num];
      if (!qAns) {
        throw new Error(`Unmatched Essay Question in ${meta.id}: Question ${q.num} has no answer block`);
      }

      // E2: Quiz 1 question total marks come from answer file (10, 10, 25)
      let markNote = '';
      if (q.totalMarks === null && qAns.totalMarks !== null) {
        q.totalMarks = qAns.totalMarks;
        markNote = `E2: Question total [${q.totalMarks} marks] supplied from answer file`;
      }

      q.foundationHtml = qAns.foundationHtml;
      q.foundationMd = qAns.foundationMd;

      const masterPartLetters = q.parts.map(p => p.letter);
      const ansPartLetters = Object.keys(qAns.partAnswers);
      if (masterPartLetters.join(',') !== ansPartLetters.join(',')) {
        throw new Error(`Part letter mismatch in ${meta.id} Q${q.num}: master=[${masterPartLetters}] vs ans=[${ansPartLetters}]`);
      }

      for (const part of q.parts) {
        totalPartsCount++;
        const pAns = qAns.partAnswers[part.letter];
        if (!pAns) {
          throw new Error(`Unmatched Part in ${meta.id} Q${q.num}(${part.letter})`);
        }

        let partExceptionNotes = [];
        // E2: July 2022 Q3(c) has no `[2 marks]` in master; supplied from answer heading
        if (!part.hasMasterMarks && pAns.marks !== null) {
          part.marks = pAns.marks;
          partExceptionNotes.push(`E2: [${pAns.marks} marks] supplied from answer heading`);
        }

        const masterSubRomans = part.subParts.map(s => s.roman);
        const ansSubRomans = Object.keys(pAns.subAnswers);
        totalMasterSubsCount += masterSubRomans.length;
        totalAnsSubsCount += ansSubRomans.length;

        if (masterSubRomans.length > 0) {
          if (masterSubRomans.join(',') !== ansSubRomans.join(',')) {
            throw new Error(`Sub-part mismatch in ${meta.id} Q${q.num}(${part.letter}): master=[${masterSubRomans}] vs ans=[${ansSubRomans}]`);
          }
          for (const sp of part.subParts) {
            sp.answer = pAns.subAnswers[sp.roman];
          }
        } else if (ansSubRomans.length > 0) {
          // E1: Master part is "Repeat (a)/(b)..." without explicit bullets, while answer file expands (i)-(iii)
          part.derivedSubAnswers = Object.values(pAns.subAnswers);
          partExceptionNotes.push(`E1: Answer expands ${ansSubRomans.length} derived sub-parts (${ansSubRomans.map(r => `(${r})`).join(', ')})`);
        }

        part.answer = pAns;

        // Register per-part AI Prompt record (includes question stem + shared context if any + part text + matched part answer)
        const ctxPrefix = q.usesSharedContext && mPaper.sharedContext ? `${mPaper.sharedContext.md}\n\n` : '';
        const qStemPrefix = q.stemMd ? `${q.stemMd}\n\n` : '';
        const partMetaLabel = `${meta.title} · Batch ${meta.batch} · ${meta.course} · Question ${q.num}(${part.letter}) [${part.marks} marks]`;
        promptRecords[part.id] = {
          type: 'paper',
          meta: partMetaLabel,
          question: `${ctxPrefix}${qStemPrefix}${part.rawMd}`.trim(),
          answer: pAns.rawMd
        };

        auditRows.push({
          paperId: meta.id,
          itemType: 'Essay Part',
          itemId: part.id,
          masterRef: `Q${q.num}(${part.letter})` + (masterSubRomans.length ? ` [${masterSubRomans.map(r => `(${r})`).join(',')}]` : ''),
          answerRef: `${meta.answerFile} :: # Question ${q.num} -> ## Part (${part.letter})`,
          marks: part.marks,
          status: 'VERIFIED_EXACT_MATCH',
          notes: [markNote].concat(partExceptionNotes).filter(Boolean).join('; ') || '1-to-1 match'
        });
      }

      // Verify question part marks sum to question totalMarks
      const sumPartMarks = q.parts.reduce((acc, p) => acc + (p.marks || 0), 0);
      if (sumPartMarks !== q.totalMarks) {
        throw new Error(`Mark sum mismatch in ${meta.id} Q${q.num}: parts sum to ${sumPartMarks}, expected ${q.totalMarks}`);
      }

      // Register whole-question AI Prompt record
      const ctxPrefix = q.usesSharedContext && mPaper.sharedContext ? `${mPaper.sharedContext.md}\n\n` : '';
      const qMetaLabel = `${meta.title} · Batch ${meta.batch} · ${meta.course} · Question ${q.num} [Total: ${q.totalMarks} marks]`;
      promptRecords[q.id] = {
        type: 'paper',
        meta: qMetaLabel,
        question: `${ctxPrefix}${q.fullQuestionMd}`.trim(),
        answer: qAns.fullAnswerMd
      };
    }

    if (
      totalPartsCount !== meta.expectedCounts.parts ||
      totalMasterSubsCount !== meta.expectedCounts.masterSubs ||
      totalAnsSubsCount !== meta.expectedCounts.ansSubs
    ) {
      throw new Error(
        `Part/Sub-part count mismatch in ${meta.id}: got parts=${totalPartsCount}, masterSubs=${totalMasterSubsCount}, ansSubs=${totalAnsSubsCount}; expected=${JSON.stringify(meta.expectedCounts)}`
      );
    }

    // Verify paper total marks = MCQ marks + Essay marks
    const paperMcqMarks = mPaper.mcqs.length * 2;
    const paperEssayMarks = mPaper.questions.reduce((acc, q) => acc + (q.totalMarks || 0), 0);
    if (paperMcqMarks + paperEssayMarks !== meta.totalMarks) {
      throw new Error(`Paper total marks mismatch in ${meta.id}: ${paperMcqMarks} + ${paperEssayMarks} != ${meta.totalMarks}`);
    }

    papers.push(mPaper);
  }

  if (writeAudit) {
    writeAuditMappingsReport(invariantResults, patchLog, papers, auditRows);
  }

  return {
    papers,
    promptRecords,
    invariantResults,
    patchLog,
    auditRows
  };
}

function writeAuditMappingsReport(invariantResults, patchLog, papers, auditRows) {
  const lines = [
    '# DA2451 Historical Past Papers & Practice Questions — Complete Mapping & Invariant Audit',
    '',
    `Generated automatically by \`APP_DEV/scripts/ingest_papers.js\`.`,
    '',
    '## 1. Source File Integrity & Whole-File Invariant Verification (§7.4)',
    '',
    'All 10 source files in `PPs/` were verified read-only against their SHA-256 prefixes and exact structural/KaTeX invariants:',
    '',
    '| File | SHA-256 (16) | Headings (H1/H2/H3/H4/H5) | Fences (R+txt) | Tables | Math (disp/inl/total) | KaTeX Errors | Stray `$`/`**` |',
    '|---|---:|---:|---:|---:|---:|---:|---:|'
  ];

  for (const r of invariantResults) {
    const s = r.stats;
    lines.push(
      `| \`${r.file}\` | \`${r.sha16}\` | \`${s.h.join('/')}\` | \`${s.fence} (${s.rFence}+${s.txtFence})\` | \`${s.tbl}\` | \`${s.disp}/${s.inl}/${s.math}\` | \`${r.katexErrors}\` | \`${r.strayDollar}/${r.strayBold}\` |`
    );
  }

  lines.push(
    '',
    '## 2. Logged Build-Time Patches (Source Files Untouched on Disk)',
    ''
  );
  for (const p of patchLog) {
    lines.push(`- **\`${p.id}\`**: ${p.desc}`);
  }

  lines.push(
    '',
    '## 3. Paper-Level Question & Marks Reconciliation Summary',
    '',
    '| Paper ID | Title | MCQs | Essay Qs | Essay Parts | Master Subs | Answer Subs | Total Marks | Status |',
    '|---|---|---:|---:|---:|---:|---:|---:|---|'
  );

  for (const p of papers) {
    const m = p.meta;
    lines.push(
      `| \`${m.id}\` | ${m.title} | ${m.expectedCounts.mcqs} | ${m.expectedCounts.questions} | ${m.expectedCounts.parts} | ${m.expectedCounts.masterSubs} | ${m.expectedCounts.ansSubs} | ${m.totalMarks} | **100% VERIFIED** |`
    );
  }

  lines.push(
    '',
    '## 4. Complete Item-by-Item Question-to-Answer Mapping Table (65 MCQs + 136 Essay Parts = 201 Paired Units)',
    '',
    '| Paper ID | Type | Item ID | Master Question Ref | Matched Answer Block | Marks | Status | Notes |',
    '|---|---|---|---|---|---:|---|---|'
  );

  for (const row of auditRows) {
    lines.push(
      `| \`${row.paperId}\` | ${row.itemType} | \`${row.itemId}\` | ${row.masterRef} | \`${row.answerRef}\` | ${row.marks} | ${row.status} | ${row.notes} |`
    );
  }

  fs.writeFileSync(AUDIT_FILE, lines.join('\n') + '\n', 'utf8');
}

module.exports = {
  SOURCE_FILES,
  PAPERS_META,
  MCQ_KEYS,
  QUESTION_TOPICS,
  renderPastPaperMarkdown,
  verifyAllPastPaperFileInvariants,
  ingestAllPastPapers
};
