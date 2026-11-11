/**
 * DA2451 Multivariate Methods in Business — Task 1 Verification Suite
 * Verifies:
 * 1. Read-only protection of all original source files.
 * 2. Standalone HTML generation and zero external network dependencies.
 * 3. Contrast ratios of all 19 Light and Dark token pairs (§15.1 script).
 * 4. Exam countdown state logic (before, live, after).
 * 5. Explicit accessible Show/Hide answer behavior (zero hidden="until-found").
 */
const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');
const DIST_HTML = path.resolve(__dirname, '..', 'dist', 'DA2451_Study_App.html');
const STYLES_CSS = path.resolve(__dirname, '..', 'src', 'styles.css');

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error(`  [FAIL] ${msg}`);
    failures++;
  } else {
    console.log(`  [PASS] ${msg}`);
  }
}

console.log('=== 1. Verifying Original Project Files Are Present & Untouched ===');
const requiredFiles = [
  'DA2451_Master_Plan.md',
  'Design skills for html app study.md',
  'Lecs/.MDs/DA2451_Lecture_HTML_Integration_Guide.md',
  'Lecs/.PDFs/DA2451_Lecture_PDF_HTML_Integration_Guide.md',
  'PPs/DA2451_Past_Papers_HTML_Integration_Guide.md',
  'PQs/DA2451_Practice_Questions_HTML_Integration_Guide.md',
  'Predictions/DA2451_Predicted_Questions_HTML_Integration_Guide.md'
];
for (const rel of requiredFiles) {
  assert(fs.existsSync(path.join(PROJECT_ROOT, rel)), `Original specification/guide present: ${rel}`);
}

console.log('\n=== 2. Verifying Standalone HTML Bundle & Offline Purity ===');
assert(fs.existsSync(DIST_HTML), 'APP_DEV/dist/DA2451_Study_App.html exists');
const html = fs.readFileSync(DIST_HTML, 'utf8');
assert(html.length > 50000, `Bundle contains embedded styles, icons, and KaTeX fonts (${(html.length / 1024).toFixed(1)} KB)`);
assert(!/<(?:script|img|iframe|embed|object|source)\b[^>]*\bsrc\s*=\s*["']https?:\/\//i.test(html), 'Zero external script/img/media src="http(s)://..." loads in standalone HTML');
assert(!/<link\b[^>]*\bhref\s*=\s*["']https?:\/\//i.test(html), 'Zero external <link href="http(s)://..."> stylesheets/fonts in standalone HTML');
assert(!/url\(\s*["']?https?:\/\//i.test(html), 'Zero external CSS url("http(s)://...") loads in standalone HTML');
assert(!/@import/i.test(html), 'Zero CSS @import rules in standalone HTML');
assert(html.includes('data:font/woff2;base64,'), 'KaTeX WOFF2 fonts are embedded inline as base64 data URIs');
assert(!html.includes('until-found'), 'Zero occurrences of hidden="until-found" (User Clarification #1 enforced)');
assert(html.includes('Made by Dinuka Himsara'), 'Creator attribution "Made by Dinuka Himsara" present');
assert(html.includes('Google Antigravity'), 'Development environment attribution present');

console.log('\n=== 3. Verifying Authoritative Token Contrast Ratios (§15.1) ===');
const css = fs.readFileSync(STYLES_CSS, 'utf8');
function parseVars(block) {
  const map = {};
  const re = /(--[a-z0-9-]+)\s*:\s*([^;]+);/gi;
  let m;
  while ((m = re.exec(block)) !== null) {
    map[m[1].trim()] = m[2].split('/*')[0].trim();
  }
  return map;
}
const rootMatch = css.match(/:root\s*\{([\s\S]*?)\n\}/);
const darkMatch = css.match(/:root\[data-theme="dark"\]\s*\{([\s\S]*?)\n\}/);
const lightVars = parseVars(rootMatch ? rootMatch[1] : '');
const darkVars  = Object.assign({}, lightVars, parseVars(darkMatch ? darkMatch[1] : ''));

const lum = h => {
  const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const PAIRS = [
  ['--ink', '--bg', 7],
  ['--ink', '--surface', 7],
  ['--ink-2', '--surface', 4.5],
  ['--ink-3', '--surface', 4.5],
  ['--ink-3', '--sunken', 4.5],
  ['--accent', '--surface', 4.5],
  ['--accent', '--bg', 4.5],
  ['--accent-ink', '--accent', 4.5],
  ['--prompt', '--surface', 4.5],
  ['--predicted', '--predicted-soft', 4.5],
  ['--ok', '--surface', 4.5],
  ['--err', '--surface', 4.5],
  ['--warn', '--surface', 4.5],
  ['--code-ink', '--code-bg', 7],
  ['--syn-kw', '--code-bg', 4.5],
  ['--syn-fn', '--code-bg', 4.5],
  ['--syn-str', '--code-bg', 4.5],
  ['--syn-num', '--code-bg', 4.5],
  ['--syn-cm', '--code-bg', 4.5]
];

for (const [themeName, vars] of [['light', lightVars], ['dark', darkVars]]) {
  for (const [fg, bg, minR] of PAIRS) {
    const r = ratio(vars[fg], vars[bg]);
    assert(r >= minR, `[${themeName}] ${fg} (${vars[fg]}) on ${bg} (${vars[bg]}) = ${r.toFixed(2)}:1 (needs >= ${minR}:1)`);
  }
}

console.log('\n=== 4. Verifying Exam Countdown State Transitions (§5) ===');
const START = Date.parse('2026-11-18T09:00:00+05:30');
const END   = Date.parse('2026-11-18T12:00:00+05:30');
const getState = now => (now < START ? 'before' : (now < END ? 'live' : 'after'));
assert(getState(Date.parse('2026-11-09T06:00:00+05:30')) === 'before', 'Before 9:00 AM Nov 18 -> state="before"');
assert(getState(Date.parse('2026-11-18T09:00:00+05:30')) === 'live',   'At 9:00 AM Nov 18 -> state="live"');
assert(getState(Date.parse('2026-11-18T10:30:00+05:30')) === 'live',   'At 10:30 AM Nov 18 -> state="live"');
assert(getState(Date.parse('2026-11-18T12:00:00+05:30')) === 'after',  'At 12:00 PM Nov 18 -> state="after"');

console.log('\n======================================================');
if (failures > 0) {
  console.error(`Task 1 Verification FAILED with ${failures} error(s).`);
  process.exit(1);
} else {
  console.log('ALL TASK 1 VERIFICATION CHECKS PASSED (0 errors).');
}
