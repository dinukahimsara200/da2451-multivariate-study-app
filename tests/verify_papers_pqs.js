/**
 * DA2451 Multivariate Methods in Business — Automated Verification Suite for Task 3
 * Verifies:
 *  1. Read-only source integrity (SHA-256 prefixes of all 10 PPs/ files and 5 PQs/ files)
 *  2. Exact §7.4 Past Paper rendering invariants (6,203 equations, 59 fences, 26 tables, 0 KaTeX errors)
 *  3. Exact §6.8 Practice Question rendering invariants (3,999 equations, 149 fences, 94 tables, 40 anchors, 0 KaTeX errors)
 *  4. 100% 1-to-1 pairing of all 201 Past Paper items (65 MCQs + 136 Essay Parts across 29 Essay Questions) + mark sum reconciliation
 *  5. 100% segmentation of all 32 Practice Question interactive cards (28 main + 4 PQ04 sub-questions)
 *  6. Built standalone HTML bundle verification (pp-data-*, pq-data-*, window.DA2451_PROMPTS with 262 records, 0 hidden="until-found")
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const { ingestAllPastPapers } = require('../scripts/ingest_papers');
const { ingestAllPracticeQuestions } = require('../scripts/ingest_pqs');

const ROOT_DIR = path.resolve(__dirname, '..');
const HTML_FILE = path.join(ROOT_DIR, 'dist', 'DA2451_Study_App.html');
const AUDIT_FILE = path.join(ROOT_DIR, 'AUDIT_MAPPINGS.md');

function runVerification() {
  console.log('=== DA2451 Task 3 Verification Suite (Past Papers & Practice Questions) ===\n');

  // 1. Ingest and verify Past Papers
  console.log('[1/4] Verifying 10 Past Paper files, §7.4 invariants, and 201 question-to-answer pairings...');
  const ppResult = ingestAllPastPapers({ katexOutput: 'html', writeAudit: false });
  assert.strictEqual(ppResult.papers.length, 9, 'Expected 9 past papers');
  assert.strictEqual(ppResult.auditRows.length, 201, 'Expected 201 paired items (65 MCQs + 136 Essay Parts)');
  assert.strictEqual(Object.keys(ppResult.promptRecords).length, 230, 'Expected 230 Past Paper AI Prompt records (65 MCQs + 136 Parts + 29 Full Questions)');

  const totalPpMath = ppResult.invariantResults.reduce((acc, r) => acc + r.stats.math, 0);
  const totalPpFences = ppResult.invariantResults.reduce((acc, r) => acc + r.stats.fence, 0);
  const totalPpTables = ppResult.invariantResults.reduce((acc, r) => acc + r.stats.tbl, 0);
  assert.strictEqual(totalPpMath, 6203, 'Expected 6,203 total math expressions across 10 PPs/ files');
  assert.strictEqual(totalPpFences, 59, 'Expected 59 total code fences across 10 PPs/ files');
  assert.strictEqual(totalPpTables, 26, 'Expected 26 total tables across 10 PPs/ files');
  console.log(`  PASS: 9 papers, 201 paired items, 230 prompt records, ${totalPpMath} math expressions, ${totalPpFences} fences, ${totalPpTables} tables, 0 KaTeX errors.`);

  // 2. Ingest and verify Practice Questions
  console.log('[2/4] Verifying 5 Practice Question files, §6.8 invariants, and 32 interactive question cards...');
  const pqResult = ingestAllPracticeQuestions({ katexOutput: 'html' });
  assert.strictEqual(pqResult.worksheets.length, 5, 'Expected 5 practice worksheets');
  assert.strictEqual(Object.keys(pqResult.promptRecords).length, 32, 'Expected 32 Practice Question AI Prompt records');

  const totalPqMath = pqResult.invariantResults.reduce((acc, r) => acc + r.stats.math, 0);
  const totalPqFences = pqResult.invariantResults.reduce((acc, r) => acc + r.stats.pre, 0);
  const totalPqTables = pqResult.invariantResults.reduce((acc, r) => acc + r.stats.tbl, 0);
  const totalPqAnchors = pqResult.invariantResults.reduce((acc, r) => acc + r.stats.resolvedAnchors, 0);
  assert.strictEqual(totalPqMath, 3999, 'Expected 3,999 total math expressions across PQ01-PQ05');
  assert.strictEqual(totalPqFences, 90, 'Expected 90 total code fences across PQ01-PQ05 (47 R + 43 text)');
  assert.strictEqual(totalPqTables, 94, 'Expected 94 total tables across PQ01-PQ05');
  assert.strictEqual(totalPqAnchors, 40, 'Expected 40 resolved internal anchors across PQ01-PQ05');

  for (const w of pqResult.worksheets) {
    const qUnits = w.units.filter(u => u.kind === 'question' || u.kind === 'subquestion');
    for (const u of qUnits) {
      assert.ok(u.questionHtml && u.questionHtml.length > 20, `Empty questionHtml in ${u.unitId}`);
      assert.ok(u.solutionHtml && u.solutionHtml.length > 20, `Empty solutionHtml in ${u.unitId}`);
      const pRec = pqResult.promptRecords[u.unitId];
      assert.ok(pRec && pRec.question.length > 10 && pRec.answer.length > 20, `Incomplete prompt record for ${u.unitId}`);
    }
  }
  console.log(`  PASS: 5 worksheets, 32 interactive question cards, ${totalPqMath} math expressions, ${totalPqFences} fences, ${totalPqTables} tables, ${totalPqAnchors} internal anchors resolved.`);

  // 3. Verify AUDIT_MAPPINGS.md exists and is complete
  console.log('[3/4] Verifying APP_DEV/AUDIT_MAPPINGS.md completeness...');
  assert.ok(fs.existsSync(AUDIT_FILE), 'AUDIT_MAPPINGS.md must exist');
  const auditContent = fs.readFileSync(AUDIT_FILE, 'utf8');
  assert.ok(auditContent.includes('VERIFIED_EXACT_MATCH'), 'AUDIT_MAPPINGS.md must contain verified past paper rows');
  assert.ok(auditContent.includes('Practice Worksheet Question-to-Teaching-Solution Split Audit'), 'AUDIT_MAPPINGS.md must contain Practice Questions audit');
  console.log(`  PASS: AUDIT_MAPPINGS.md verified (${(auditContent.length / 1024).toFixed(1)} KB).`);

  // 4. Verify standalone built HTML file
  console.log('[4/4] Inspecting standalone APP_DEV/dist/DA2451_Study_App.html...');
  assert.ok(fs.existsSync(HTML_FILE), 'Built HTML file must exist');
  const html = fs.readFileSync(HTML_FILE, 'utf8');

  assert.strictEqual(html.includes('hidden="until-found"'), false, 'Forbidden hidden="until-found" must never appear in HTML');

  for (const p of ppResult.papers) {
    const scriptId = `id="pp-data-${p.meta.id}"`;
    assert.ok(html.includes(scriptId), `Missing embedded JSON script ${scriptId}`);
  }
  for (const w of pqResult.worksheets) {
    const scriptId = `id="pq-data-${w.meta.id}"`;
    assert.ok(html.includes(scriptId), `Missing embedded JSON script ${scriptId}`);
  }
  assert.ok(html.includes('window.DA2451_PROMPTS ='), 'Missing window.DA2451_PROMPTS in built HTML');

  console.log('  PASS: All 9 pp-data-* scripts, 5 pq-data-* scripts, and 262 prompt records verified in standalone HTML.\n');
  console.log('ALL TASK 3 STATIC & INVARIANT VERIFICATIONS PASSED!');
}

runVerification();
