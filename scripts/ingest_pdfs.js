/**
 * DA2451 Multivariate Methods in Business — Original Lecture PDFs Ingestion & Validation (Task 2)
 * Follows Lecs/.PDFs/DA2451_Lecture_PDF_HTML_Integration_Guide.md.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { CHAPTER_MANIFEST } = require('./ingest_lectures');

const REPO_ROOT    = path.resolve(__dirname, '..');
const LECS_PDF_DIR = path.join(REPO_ROOT, 'content', 'lectures', 'pdfs');

function inspectAndLoadPdfs() {
  const pdfManifest = [];
  const pdfPayloads = {}; // chapterId -> base64 string

  for (const ch of CHAPTER_MANIFEST) {
    const pdfPath = path.join(LECS_PDF_DIR, ch.pdf);
    const exists = fs.existsSync(pdfPath);
    if (!exists) {
      pdfManifest.push({
        chapterId: ch.id,
        pos: ch.pos,
        title: ch.title,
        pdfFile: ch.pdf,
        available: false,
        bytes: 0,
        sha256: null,
        validHeader: false
      });
      continue;
    }

    const buf = fs.readFileSync(pdfPath);
    const header = buf.slice(0, 5).toString('ascii');
    const validHeader = header === '%PDF-';
    const sha256 = crypto.createHash('sha256').update(buf).digest('hex');

    // Count approximate PDF pages via /Type /Page\b (excluding /Pages)
    const latin = buf.toString('latin1');
    const pageMatches = latin.match(/\/Type\s*\/Page\b(?!s)/g);
    const approxPages = pageMatches ? pageMatches.length : null;

    pdfManifest.push({
      chapterId: ch.id,
      pos: ch.pos,
      title: ch.title,
      pdfFile: ch.pdf,
      available: validHeader && buf.length > 0,
      bytes: buf.length,
      sizeKb: +(buf.length / 1024).toFixed(1),
      sha256,
      sha16: sha256.slice(0, 16),
      validHeader,
      approxPages
    });

    if (validHeader && buf.length > 0) {
      pdfPayloads[ch.id] = buf.toString('base64');
    }
  }

  return { pdfManifest, pdfPayloads };
}

module.exports = { inspectAndLoadPdfs };

if (require.main === module) {
  const { pdfManifest, pdfPayloads } = inspectAndLoadPdfs();
  let totalRaw = 0;
  let totalB64 = 0;
  console.log('=== Original Lecture PDFs Inventory ===');
  for (const p of pdfManifest) {
    totalRaw += p.bytes;
    totalB64 += (pdfPayloads[p.chapterId] || '').length;
    console.log(
      `  [${p.pos}] ${p.chapterId} -> ${p.pdfFile.padEnd(32)} | valid:${p.available} | ${String(p.sizeKb).padStart(7)} KB | sha16:${p.sha16} | ~pages:${p.approxPages ?? '?'}`
    );
  }
  console.log(`Total Raw PDF Size: ${(totalRaw / 1024 / 1024).toFixed(2)} MB | Base64 Size: ${(totalB64 / 1024 / 1024).toFixed(2)} MB`);
}
