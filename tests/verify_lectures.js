/**
 * DA2451 Multivariate Methods in Business — Task 2 Verification Suite
 * Verifies:
 * 1. Exact SHA-256 integrity of all 11 original lecture Markdown files.
 * 2. Exact numerical content invariants for all 11 chapters against
 *    Lecs/.MDs/DA2451_Lecture_HTML_Integration_Guide.md (§6.9).
 * 3. Global uniqueness of all heading IDs, 100% anchor resolution, and zero placeholders.
 * 4. Presence and valid JSON parsing of all 11 <script type="application/json" id="ch-data-chNN">
 *    blocks inside APP_DEV/dist/DA2451_Study_App.html.
 * 5. Exact byte-for-byte SHA-256 round-trip verification of all 11 embedded base64 PDFs
 *    inside APP_DEV/dist/DA2451_Study_App.html against Lecs/.PDFs/*.pdf.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { ingestAllLectures } = require('../scripts/ingest_lectures');
const { inspectAndLoadPdfs } = require('../scripts/ingest_pdfs');

const DIST_HTML = path.resolve(__dirname, '..', 'dist', 'DA2451_Study_App.html');

// Authoritative verification targets from Lecs/.MDs/DA2451_Lecture_HTML_Integration_Guide.md (§6.9)
const EXPECTED = {
  '01': { h: [22, 140, 93, 0], pre: [29, 28, 1], tbl: 26, math: [173, 419, 592],  p: 850, li: 263, bq: 2, hr: 23, a: 22, sha16: 'c7691a2fd6a28e09' },
  '02': { h: [9,  27, 167, 0], pre: [32, 27, 5], tbl: 13, math: [285, 804, 1089], p: 880, li: 108, bq: 2, hr: 13, a: 0,  sha16: '1031dd27e6793ab2' },
  '03': { h: [6,  28, 218, 0], pre: [66, 53, 13], tbl: 32, math: [196, 751, 947], p: 930, li: 146, bq: 6, hr: 28, a: 5,  sha16: 'ecf336906ddf0bde' },
  '04': { h: [11, 42, 103, 0], pre: [52, 52, 0], tbl: 21, math: [43,  208, 251],  p: 378, li: 94,  bq: 3, hr: 11, a: 9,  sha16: '6b8e35ba7a4f1908' },
  '05': { h: [7,  28, 186, 0], pre: [49, 39, 10], tbl: 41, math: [72, 299, 371],  p: 593, li: 226, bq: 4, hr: 9,  a: 36, sha16: '5afb5de48c26ce0e' },
  '06': { h: [16, 65,  30, 1], pre: [15, 15, 0], tbl: 13, math: [73,  149, 222],  p: 357, li: 72,  bq: 1, hr: 15, a: 0,  sha16: '26c79b56982a7516' },
  '07': { h: [11, 64,  81, 0], pre: [14, 14, 0], tbl: 15, math: [163, 660, 823],  p: 672, li: 106, bq: 2, hr: 11, a: 1,  sha16: '5a61d12e48b6b1f3' },
  '08': { h: [6,  23, 141, 0], pre: [11, 7,  4], tbl: 18, math: [190, 729, 919],  p: 734, li: 149, bq: 9, hr: 22, a: 0,  sha16: 'cea4098d01d593d3' },
  '09': { h: [8,  47, 102, 0], pre: [22, 18, 4], tbl: 35, math: [208, 495, 703],  p: 838, li: 129, bq: 4, hr: 8,  a: 0,  sha16: '561145b1395e3efe' },
  '10': { h: [7,  48, 123, 0], pre: [35, 32, 3], tbl: 41, math: [142, 343, 485],  p: 619, li: 175, bq: 4, hr: 8,  a: 0,  sha16: 'c5e9f0680b15df17' },
  '11': { h: [5,  24, 130, 0], pre: [43, 41, 2], tbl: 30, math: [58,  439, 497],  p: 421, li: 82,  bq: 3, hr: 24, a: 0,  sha16: '82c776277ab274b0' }
};

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error(`  [FAIL] ${msg}`);
    failures++;
  } else {
    console.log(`  [PASS] ${msg}`);
  }
}

console.log('=== 1. Verifying Lecture Markdown Ingestion & §6.9 Invariant Table ===');
const chapters = ingestAllLectures({ katexOutput: 'html' });
assert(chapters.length === 11, 'All 11 teaching chapters ingested in study order');

const allIds = new Set();
let duplicateIds = 0;
const appliedPatches = [];

console.log('\nPos | Headings (H1/H2/H3/H4) | <pre> (R+txt) | <table> | Math (disp/inl/tot) | <p> | <li> | <blockquote> | <hr> | <a> | SHA-16');
console.log('----|------------------------|---------------|---------|---------------------|-----|------|--------------|------|-----|----------------');

for (const ch of chapters) {
  const pos = ch.meta.pos;
  const exp = EXPECTED[pos];
  const s = ch.stats;

  for (const p of ch.patches) appliedPatches.push(p);

  for (const t of ch.toc) {
    if (allIds.has(t.id)) duplicateIds++;
    allIds.add(t.id);
  }

  console.log(
    `${pos}  | ${`${s.h1}/${s.h2}/${s.h3}/${s.h4}`.padEnd(22)} | ${`${s.pre} (${s.rFences}+${s.txtFences})`.padEnd(13)} | ${String(s.tables).padEnd(7)} | ${`${s.mathDisplay}/${s.mathInline} (${s.mathTotal})`.padEnd(19)} | ${String(s.p).padEnd(3)} | ${String(s.li).padEnd(4)} | ${String(s.blockquote).padEnd(12)} | ${String(s.hr).padEnd(4)} | ${String(s.a).padEnd(3)} | ${ch.meta.sha16}`
  );

  assert(ch.meta.sha16 === exp.sha16, `[Ch ${pos}] SHA-256 prefix matches (${ch.meta.sha16})`);
  assert(
    s.h1 === exp.h[0] && s.h2 === exp.h[1] && s.h3 === exp.h[2] && s.h4 === exp.h[3],
    `[Ch ${pos}] Headings match ${exp.h.join('/')} (got ${s.h1}/${s.h2}/${s.h3}/${s.h4})`
  );
  assert(
    s.pre === exp.pre[0] && s.rFences === exp.pre[1] && s.txtFences === exp.pre[2],
    `[Ch ${pos}] <pre> blocks match ${exp.pre[0]} (${exp.pre[1]}+${exp.pre[2]})`
  );
  assert(s.tables === exp.tbl, `[Ch ${pos}] <table> count matches ${exp.tbl}`);
  assert(
    s.mathDisplay === exp.math[0] && s.mathInline === exp.math[1] && s.mathTotal === exp.math[2],
    `[Ch ${pos}] Math count matches ${exp.math[0]}/${exp.math[1]} (${exp.math[2]})`
  );
  assert(s.p === exp.p, `[Ch ${pos}] <p> count matches ${exp.p}`);
  assert(s.li === exp.li, `[Ch ${pos}] <li> count matches ${exp.li}`);
  assert(s.blockquote === exp.bq, `[Ch ${pos}] <blockquote> count matches ${exp.bq}`);
  assert(s.hr === exp.hr, `[Ch ${pos}] <hr> count matches ${exp.hr}`);
  assert(s.a === exp.a, `[Ch ${pos}] <a> count matches ${exp.a}`);
  assert(s.idsCount === s.headingsTotal, `[Ch ${pos}] Heading ID count (${s.idsCount}) equals total headings (${s.headingsTotal})`);
  assert(s.unresolvedAnchors === 0, `[Ch ${pos}] Zero unresolved #ch${pos}--... anchor links`);
  assert(s.leftovers === 0, `[Ch ${pos}] Zero leftover private-use placeholders`);
}

assert(duplicateIds === 0, `Zero duplicate heading IDs across all 11 chapters (${allIds.size} unique IDs)`);
assert(appliedPatches.length === 1 && appliedPatches[0].id === 'LEC-I-1', 'Single logged build-time patch LEC-I-1 applied');

console.log('\n=== 2. Verifying Embedded Chapter & PDF Payloads Inside Standalone HTML ===');
assert(fs.existsSync(DIST_HTML), 'Standalone HTML file exists at APP_DEV/dist/DA2451_Study_App.html');
const html = fs.readFileSync(DIST_HTML, 'utf8');
const { pdfManifest } = inspectAndLoadPdfs();

for (const ch of chapters) {
  const id = ch.meta.id;
  const chRe = new RegExp(`<script type="application/json" id="ch-data-${id}">([\\s\\S]*?)<\\/script>`);
  const m = html.match(chRe);
  assert(Boolean(m), `[Bundle] Contains <script type="application/json" id="ch-data-${id}">`);
  if (m) {
    let parsed = null;
    try {
      parsed = JSON.parse(m[1]);
    } catch (e) {
      assert(false, `[Bundle] Valid JSON in #ch-data-${id}: ${e.message}`);
    }
    if (parsed) {
      assert(
        parsed.toc.length === ch.stats.headingsTotal && parsed.chunks.length === ch.stats.chunksCount,
        `[Bundle] #ch-data-${id} JSON parsed cleanly (${parsed.toc.length} TOC headings, ${parsed.chunks.length} lazy chunks)`
      );
    }
  }
}

for (const pdf of pdfManifest) {
  const id = pdf.chapterId;
  const pdfRe = new RegExp(`<script type="text/plain" id="pdf-b64-${id}">([\\s\\S]*?)<\\/script>`);
  const m = html.match(pdfRe);
  assert(Boolean(m), `[Bundle PDF] Contains <script type="text/plain" id="pdf-b64-${id}"> for ${pdf.pdfFile}`);
  if (m) {
    const decoded = Buffer.from(m[1].trim(), 'base64');
    const sha256 = crypto.createHash('sha256').update(decoded).digest('hex');
    const sig = decoded.slice(0, 5).toString('ascii');
    assert(sig === '%PDF-', `[Bundle PDF] ${pdf.pdfFile} starts with valid %PDF- signature`);
    assert(decoded.length === pdf.bytes, `[Bundle PDF] ${pdf.pdfFile} decoded byte length matches disk (${decoded.length} bytes)`);
    assert(sha256 === pdf.sha256, `[Bundle PDF] ${pdf.pdfFile} decoded SHA-256 matches original file (${pdf.sha16})`);
  }
}

console.log('\n======================================================');
if (failures > 0) {
  console.error(`Task 2 Verification FAILED with ${failures} error(s).`);
  process.exit(1);
} else {
  console.log('ALL TASK 2 LECTURE & PDF VERIFICATION CHECKS PASSED (0 errors).');
}
