/**
 * DA2451 — Offline full-text search index builder (Task 4)
 * Produces compact plain-text records [kind, title, context, route, body] for:
 *   ch = Learning Chapters (one record per heading section; full teaching text)
 *   pp = Past Papers       (question text only: MCQs and essay questions, never worked answers)
 *   pq = Practice          (question text only, never teaching solutions)
 *   pm / pe = Predicted MCQs / Essays (in-scope questions only; excluded items are never indexed)
 * Answers/solutions are intentionally NOT indexed so search snippets cannot reveal hidden answers.
 */
const fs = require('fs');
const path = require('path');

const LECS_MD_DIR = path.resolve(__dirname, '..', 'content', 'lectures', 'markdown');

function mdToPlain(md) {
  return String(md)
    .replace(/\r\n?/g, '\n')
    .replace(/^\s*(`{3,}|~{3,}).*$/gm, ' ')
    .replace(/\\\\/g, ' ')
    .replace(/\\(?:begin|end)\{[a-z*]+\}/gi, ' ')
    .replace(/\\(?:mathbf|mathrm|mathsf|mathit|mathcal|mathbb|text|operatorname|boldsymbol|bm|hat|bar|tilde|widehat|vec|left|right|frac|cdot|times|quad|qquad|dots|ldots|cdots|big|Big|bigg|displaystyle)(?![A-Za-z])/g, ' ')
    .replace(/\\([A-Za-z]+)/g, '$1')
    .replace(/\\(.)/g, '$1')
    .replace(/[{}^_]/g, '')
    .replace(/[$|*`#>~&\[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(s) {
  return String(s).replace(/\[(?:SOURCE|TEACHING|CORRECTION|Lecture)[^\]]*\]/gi, '').replace(/[`*]/g, '').replace(/\s+/g, ' ').trim();
}

function chapterRecords(chapters) {
  const recs = [];
  for (const ch of chapters) {
    const raw = fs.readFileSync(path.join(LECS_MD_DIR, ch.meta.file), 'utf8').replace(/\r\n?/g, '\n').split('\n');
    const heads = [];
    let fence = null;
    for (let i = 0; i < raw.length; i++) {
      const f = raw[i].match(/^\s*(`{3,}|~{3,})/);
      if (f) {
        if (!fence) fence = f[1][0];
        else if (f[1][0] === fence) fence = null;
        continue;
      }
      if (fence) continue;
      const m = raw[i].match(/^(#{1,4})\s+(.+)$/);
      if (m) heads.push(i);
    }
    if (heads.length !== ch.toc.length) {
      throw new Error(`Search index: ${ch.meta.file} has ${heads.length} markdown headings but ${ch.toc.length} TOC entries`);
    }
    const context = `Chapter ${Number(ch.meta.pos)} \u00B7 ${ch.meta.title}`;
    for (let k = 0; k < heads.length; k++) {
      const end = k + 1 < heads.length ? heads[k + 1] : raw.length;
      const body = mdToPlain(raw.slice(heads[k] + 1, end).join('\n'));
      recs.push(['ch', stripTags(ch.toc[k].raw), context, '#' + ch.toc[k].id, body]);
    }
  }
  return recs;
}

function paperRecords(papers) {
  const recs = [];
  for (const p of papers) {
    const m = p.meta;
    const context = `${m.title} \u00B7 Batch ${m.batch}`;
    for (const q of p.mcqs) {
      recs.push(['pp', `MCQ ${q.num}`, context, `#paper/${m.id}/pp-mcq-${q.num}`, mdToPlain(q.fullQuestionMd)]);
    }
    for (const q of p.questions) {
      recs.push(['pp', `Question ${q.num} \u00B7 ${q.topic || 'Essay question'}`, context, `#paper/${m.id}/pp-q-${q.num}`, mdToPlain(q.fullQuestionMd)]);
    }
  }
  return recs;
}

function worksheetRecords(worksheets, pqPrompts) {
  const recs = [];
  for (const w of worksheets) {
    const context = `${w.meta.title} \u00B7 ${w.meta.topic}`;
    for (const u of w.units) {
      if (u.kind !== 'question' && u.kind !== 'subquestion') continue;
      const pr = pqPrompts[u.unitId];
      if (!pr) throw new Error('Search index: missing prompt record for ' + u.unitId);
      recs.push(['pq', mdToPlain(u.title || u.unitId), context, '#' + u.unitId, mdToPlain(pr.question)]);
    }
  }
  return recs;
}

function predictedRecords(predData, keptQuestions) {
  const byId = {};
  for (const q of keptQuestions) byId[q.id] = q;
  const recs = [];
  for (const q of predData.questions) {
    const src = byId[q.id];
    const gen = q.generator === 'chatgpt' ? 'ChatGPT' : 'Gemini';
    const title = q.title ? `${q.id} \u2013 ${q.title}` : `${q.id} \u00B7 ${mdToPlain(q.sourceTopic)}`;
    const context = `Predicted ${q.kind === 'mcq' ? 'MCQ' : 'Essay'} \u00B7 ${gen} \u00B7 Unofficial`;
    recs.push([q.kind === 'mcq' ? 'pm' : 'pe', title, context, '#' + q.id, mdToPlain(src.sourceMd)]);
  }
  return recs;
}

function buildSearchIndex({ chapters, papers, worksheets, pqPrompts, predData, keptQuestions }) {
  const parts = {
    ch: chapterRecords(chapters),
    pp: paperRecords(papers),
    pq: worksheetRecords(worksheets, pqPrompts),
    pm: [],
    pe: []
  };
  const pred = predictedRecords(predData, keptQuestions);
  parts.pm = pred.filter(r => r[0] === 'pm');
  parts.pe = pred.filter(r => r[0] === 'pe');
  const records = [].concat(parts.ch, parts.pp, parts.pq, parts.pm, parts.pe);
  const counts = Object.fromEntries(Object.entries(parts).map(([k, v]) => [k, v.length]));
  const bytes = Buffer.byteLength(JSON.stringify(records), 'utf8');
  return { records, counts, bytes };
}

module.exports = { mdToPlain, buildSearchIndex };
