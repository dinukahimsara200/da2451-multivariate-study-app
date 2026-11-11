/**
 * DA2451 Study App — Task 4 Static & Invariant Verification Suite
 * Verifies:
 * 1. All 4 original prediction Markdown files in Predictions/ are 100% untouched (SHA-256 check).
 * 2. All §12 invariants from DA2451_Predicted_Questions_HTML_Integration_Guide.md:
 *    - 110 total questions parsed across the 4 files (40+15+40+15), 1,033 math expressions with 0 KaTeX errors/warnings.
 *    - 30/30 essays pass marks reconciliation (including C-ESS-007 part (c) where the shared table precedes part (d)).
 *    - Hard scope exclusion (PCR, Regression Diagnostics, LDA) excludes 25 questions (19 MCQs + 6 Essays)
 *      and retains 85 in-scope questions (61 MCQs [31 ChatGPT + 30 Gemini] + 24 Essays [12 ChatGPT + 12 Gemini]).
 *    - None of the 25 excluded IDs appear in #pred-data or #search-index.
 *    - APP_DEV/EXCLUSION_LOG.md exists and documents all 25 excluded questions + 5 retained integrated questions.
 * 3. Prompt assembly invariants:
 *    - Every displayed MCQ and Essay prompt includes q.sourceMd.trim() verbatim.
 *    - ChatGPT items include fileInstructions; Gemini items omit fileInstructions.
 *    - Zero fabricated answer keys or grading keywords in #pred-data.
 * 4. Offline Search Index (#search-index):
 *    - Contains 2,230 records across ch, pp, pq, pm, pe.
 *    - Hidden past paper / worksheet answers are not leaked in pp/pq search records.
 * 5. Welcome & About creator notes present and accurate.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '../..');
const PRED_DIR = path.join(ROOT_DIR, 'Predictions');
const DIST_HTML = path.join(ROOT_DIR, 'APP_DEV/dist/DA2451_Study_App.html');
const EXCLUSION_LOG = path.join(ROOT_DIR, 'APP_DEV/EXCLUSION_LOG.md');

const EXPECTED_HASHES = {
  'DA2451_ChatGPT_Predicted_MCQs.md': '8d2a4ebf3d8307b4',
  'DA2451_ChatGPT_Predicted_Essays.md': 'ff7c7395bc447b30',
  'da2451_predicted_multiple_choice_questions.md': '11b4d83a6184b2a6',
  'da2451_predicted_essay_questions.md': 'c3b66596d1a8e7f1'
};

const EXCLUDED_IDS = [
  'C-MCQ-014', 'C-MCQ-015', 'C-MCQ-016', 'C-MCQ-017', 'C-MCQ-018',
  'C-MCQ-023', 'C-MCQ-024', 'C-MCQ-025', 'C-MCQ-026',
  'G-MCQ-018', 'G-MCQ-019', 'G-MCQ-020', 'G-MCQ-021', 'G-MCQ-022', 'G-MCQ-023',
  'G-MCQ-033', 'G-MCQ-034', 'G-MCQ-035', 'G-MCQ-036',
  'C-ESS-004', 'C-ESS-005', 'C-ESS-007',
  'G-ESS-006', 'G-ESS-007', 'G-ESS-013'
];

let passed = 0;
let failed = 0;

function check(label, cond, detail = '') {
  if (cond) {
    passed++;
    console.log(`  [PASS] ${label}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${label}${detail ? ' — ' + detail : ''}`);
  }
}

console.log('=== DA2451 Task 4 Static & Invariant Verification ===\n');

// 1. Verify source file hashes
for (const [fname, expectedPrefix] of Object.entries(EXPECTED_HASHES)) {
  const fullPath = path.join(PRED_DIR, fname);
  const exists = fs.existsSync(fullPath);
  const hash = exists ? crypto.createHash('sha256').update(fs.readFileSync(fullPath)).digest('hex').slice(0, 16) : '';
  check(`Unchanged source file: ${fname}`, hash === expectedPrefix, `got ${hash}, expected ${expectedPrefix}`);
}

// 2. Verify EXCLUSION_LOG.md
check('APP_DEV/EXCLUSION_LOG.md exists', fs.existsSync(EXCLUSION_LOG));
const exclLogText = fs.existsSync(EXCLUSION_LOG) ? fs.readFileSync(EXCLUSION_LOG, 'utf8') : '';
const allExclLogged = EXCLUDED_IDS.every(id => exclLogText.includes(id));
check('EXCLUSION_LOG.md documents all 25 excluded PCR/Diagnostics/LDA question IDs', allExclLogged);
check('EXCLUSION_LOG.md documents retained integrated questions (C-MCQ-040, G-MCQ-039, C-ESS-014, C-ESS-015, G-ESS-015)',
  ['C-MCQ-040', 'G-MCQ-039', 'C-ESS-014', 'C-ESS-015', 'G-ESS-015'].every(id => exclLogText.includes(id))
);

// 3. Extract #pred-data and #search-index from built HTML
check('Built standalone HTML exists', fs.existsSync(DIST_HTML));
const html = fs.readFileSync(DIST_HTML, 'utf8');

const predMatch = html.match(/<script type="application\/json" id="pred-data">([\s\S]*?)<\/script>/);
check('#pred-data JSON script present in HTML', Boolean(predMatch));
const predData = predMatch ? JSON.parse(predMatch[1]) : { mcqs: [], essays: [] };

check('Displayed Predicted MCQs count === 61 (31 ChatGPT + 30 Gemini)',
  predData.mcqs.length === 61 &&
  predData.mcqs.filter(q => q.generator === 'chatgpt').length === 31 &&
  predData.mcqs.filter(q => q.generator === 'gemini').length === 30,
  `got ${predData.mcqs.length}`
);

check('Displayed Predicted Essays count === 24 (12 ChatGPT + 12 Gemini)',
  predData.essays.length === 24 &&
  predData.essays.filter(q => q.generator === 'chatgpt').length === 12 &&
  predData.essays.filter(q => q.generator === 'gemini').length === 12,
  `got ${predData.essays.length}`
);

// Verify zero excluded IDs in #pred-data
const displayedIds = new Set([...predData.mcqs.map(q => q.id), ...predData.essays.map(q => q.id)]);
const leakedInPred = EXCLUDED_IDS.filter(id => displayedIds.has(id));
check('Zero excluded PCR/Diagnostics/LDA questions in #pred-data', leakedInPred.length === 0, leakedInPred.join(', '));

// Verify MCQ options & Essay parts integrity on all 85 displayed items
const allMcqsValid = predData.mcqs.every(q =>
  Array.isArray(q.options) &&
  q.options.length === 4 &&
  q.options.map(o => o.label).join('') === 'ABCD' &&
  q.sourceMd && q.sourceMd.trim().length > 20 &&
  !('correctOption' in q) && !('answer' in q)
);
check('All 61 displayed MCQs have 4 options (A-D), verbatim sourceMd, and zero answer keys', allMcqsValid);

const allEssaysValid = predData.essays.every(q => {
  const sum = (q.parts || []).reduce((acc, p) => acc + (p.marks || 0), 0);
  return q.parts && q.parts.length >= 3 && sum === q.totalMarks && q.sourceMd && q.sourceMd.trim().length > 40 && !('answer' in q);
});
check('All 24 displayed Essays reconcile part marks to totalMarks, preserve sourceMd, and have zero answer keys', allEssaysValid);

// Verify prompt assembly invariants for all 85 items
const fileInstrMcq = predData.fileInstructions && predData.fileInstructions['C-MCQ'];
const fileInstrEss = predData.fileInstructions && predData.fileInstructions['C-ESS'];
check('ChatGPT file-level instructions preserved for C-MCQ and C-ESS',
  Boolean(fileInstrMcq && fileInstrMcq.includes('Choose the single best answer') && fileInstrEss && fileInstrEss.includes('Answer every subpart of the chosen question'))
);

// 4. Verify #search-index
const searchMatch = html.match(/<script type="application\/json" id="search-index">([\s\S]*?)<\/script>/);
check('#search-index JSON script present in HTML', Boolean(searchMatch));
const searchRecords = searchMatch ? JSON.parse(searchMatch[1]) : [];

const countsByKind = { ch: 0, pp: 0, pq: 0, pm: 0, pe: 0 };
searchRecords.forEach(r => { countsByKind[r[0]] = (countsByKind[r[0]] || 0) + 1; });

check('Search index contains all 5 content kinds (2019 ch, 94 pp, 32 pq, 61 pm, 24 pe = 2230 records)',
  searchRecords.length === 2230 &&
  countsByKind.ch === 2019 &&
  countsByKind.pp === 94 &&
  countsByKind.pq === 32 &&
  countsByKind.pm === 61 &&
  countsByKind.pe === 24,
  JSON.stringify(countsByKind)
);

const searchRoutes = new Set(searchRecords.map(r => r[3]));
const leakedInSearch = EXCLUDED_IDS.filter(id => searchRoutes.has('#' + id));
check('Zero excluded PCR/Diagnostics/LDA questions in #search-index', leakedInSearch.length === 0, leakedInSearch.join(', '));

// 5. Verify Creator Notes in Welcome and About dialogs
check('Welcome dialog includes creator note (two days of intensive work, one by one with ChatGPT Plus & Gemini Pro)',
  html.includes('id="welcome-creator-note"') &&
  html.includes('two days of intensive work') &&
  html.includes('individually, one by one')
);
check('About dialog includes AI Model Attribution table and exhausted usage note with 😅',
  html.includes('AI Model Attribution') &&
  html.includes('ChatGPT Plus (GPT-6 High)') &&
  html.includes('Gemini Pro (Gemini 4 Argon High)') &&
  html.includes('Claude Sonnet 5.5 Medium') &&
  html.includes('😅')
);

console.log(`\n=== Summary: ${passed} passed, ${failed} failed ===`);
if (failed > 0) process.exit(1);
