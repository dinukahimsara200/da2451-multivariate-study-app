# DA2451 Lecture HTML Integration Guide

**Audience:** the Claude instance that builds the offline single-file Study App.
**Inputs you will have:** this guide + the 11 original `.md` files (unmodified).
**Scope:** Learning Chapters content integration only. Nothing here rewrites, summarizes, or fact-checks the chapters.

---

## 0. Verdict and the rules that matter most

**Verdict: all 11 files can be converted reliably.** Fences are balanced, tables are well-formed, and every one of the 6,898 math expressions parses with zero errors in both KaTeX and MathJax. The files are *not* safe to feed to a Markdown parser naively: they use **three different math-delimiter dialects** and contain content that a Markdown parser silently corrupts (§4).

The rules, in priority order:

1. **Protect before parsing.** Pull out fenced code → inline code → math *before* Markdown parsing; put opaque placeholders in the text; restore afterwards (reference script, §6.2). A naive `markdown-it` run was demonstrated (including on the real lines cited in I-3) to turn `\\` into `\`, `\[`/`\(` into `[`/`(`, and bare `=` lines inside display math into `<h1>` headings.
2. **Support all math dialects in every file:** `$$…$$`, `\[…\]`, `\(…\)`, `$…$`. Do not assume one dialect per file; do not assume one layout of `$$` (§3.2).
3. **Use markdown-it 14 + KaTeX 0.16.22, pre-rendered at build time** into per-chapter HTML. Fail the build on any KaTeX error.
4. **Apply exactly one source patch** (§4, I-1: an unclosed `$` in file 08, line 2265), as a logged, exact-match, build-time replacement. Never edit the `.md` files on disk.
5. **Do not trust heading levels or filenames.** Heading hierarchy differs per file (§5.1). The reading order comes from the manifest below, not from sorting filenames.
6. **Namespace every heading ID per chapter** (`ch04--…`) and rewrite the 56 in-document `#anchor` links accordingly; slug collisions exist across and within files.
7. **Embed content as JSON strings built by script, never as hand-pasted text or JS template literals.** The sources contain thousands of backticks and two `${`.
8. **Verify against the invariants table (§6.9).** If your counts differ, something was dropped or mangled.

---

## 1. Reading order and manifest

Order is fixed by the manifest; **do not sort by filename** (note the two `Lec05` files and that there is no `Lec04` file in this set; do not infer anything from that).

| Pos | Nav title (use exactly) | File | Kind | Source H1/title text (do not alter) |
|---|---|---|---|---|
| 01 | Introduction to Multivariate Analysis | `DA2451_Lec01_Introduction_Teaching.md` | core | "Lecture 01: Introduction to Multivariate Analysis" (2nd H1; 1st H1 is a course banner) |
| 02 | Review of Matrix Algebra | `DA2451_Lec02_Matrix_Algebra_Teaching.md` | core | "DA2451 Lecture 02: Matrix Algebra, Explained from the Beginning" |
| 03 | Principal Component Analysis (PCA) | `DA2451_Lec03_PCA_Teaching.md` | core | "Principal Component Analysis: From First Principles to Statistical Practice" |
| 04 | PCA in R: Supplementary Methods | `DA2451_PCA_R_Methods_Teaching.md` | **supplementary** | "DA2451: Principal Component Analysis in R" |
| 05 | Factor Analysis (EFA) | `DA2451_Lec05_Factor_Analysis_Teaching.md` | core | "DA2451 \| Lecture 05: Factor Analysis" |
| 06 | Factor Analysis: Additional Remarks | `DA2451_Lec05_Extra_Factor_Analysis_Teaching.md` | **supplementary** | H1 banner + H2 "Lecture 05 Extra: Factor Analysis, Explained from First Principles" |
| 07 | Multivariate Normal Distribution | `DA2451_Lec06_Multivariate_Normal_Teaching.md` | core | "DA2451: Multivariate Normal Distribution" |
| 08 | Inference About a Mean Vector | `DA2451_Lec07_Mean_Vector_Inference_Teaching.md` | core | "Inferences About a Mean Vector" |
| 09 | Comparisons of Several Multivariate Means (MANOVA) | `DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md` | core | "Comparisons of Several Multivariate Means" |
| 10 | Multivariate Multiple Linear Regression (MMLR) | `DA2451_Lec09_MMLR_Teaching.md` | core | "DA2451 Lecture 09: Multivariate Multiple Linear Regression" |
| 11 | Multivariate Linear Models in R: Supplementary Reference | `DA2451_Multivariate_Linear_Models_R_Teaching.md` | **supplementary** | "Multivariate Linear Models in R" |

**Labeling caution:** the app position (01–11) differs from the source's own "Lecture NN" wording (e.g. position 07 is source `Lec06`; position 10's H1 says "Lecture 09"). Label app positions as **"Reading 01–11"** (or "Chapter 01–11" in the nav only) and never rewrite source headings. Use the nav titles above for the sidebar/cards; show the source H1 inside the chapter as it is.

Suggested manifest (embed as JSON; `sha256` values are in §6.9):

~~~json
[
 {"pos":"01","id":"ch01","file":"DA2451_Lec01_Introduction_Teaching.md","title":"Introduction to Multivariate Analysis","kind":"core"},
 {"pos":"02","id":"ch02","file":"DA2451_Lec02_Matrix_Algebra_Teaching.md","title":"Review of Matrix Algebra","kind":"core"},
 {"pos":"03","id":"ch03","file":"DA2451_Lec03_PCA_Teaching.md","title":"Principal Component Analysis (PCA)","kind":"core"},
 {"pos":"04","id":"ch04","file":"DA2451_PCA_R_Methods_Teaching.md","title":"PCA in R: Supplementary Methods","kind":"supplementary"},
 {"pos":"05","id":"ch05","file":"DA2451_Lec05_Factor_Analysis_Teaching.md","title":"Factor Analysis (EFA)","kind":"core"},
 {"pos":"06","id":"ch06","file":"DA2451_Lec05_Extra_Factor_Analysis_Teaching.md","title":"Factor Analysis: Additional Remarks","kind":"supplementary"},
 {"pos":"07","id":"ch07","file":"DA2451_Lec06_Multivariate_Normal_Teaching.md","title":"Multivariate Normal Distribution","kind":"core"},
 {"pos":"08","id":"ch08","file":"DA2451_Lec07_Mean_Vector_Inference_Teaching.md","title":"Inference About a Mean Vector","kind":"core"},
 {"pos":"09","id":"ch09","file":"DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md","title":"Comparisons of Several Multivariate Means (MANOVA)","kind":"core"},
 {"pos":"10","id":"ch10","file":"DA2451_Lec09_MMLR_Teaching.md","title":"Multivariate Multiple Linear Regression (MMLR)","kind":"core"},
 {"pos":"11","id":"ch11","file":"DA2451_Multivariate_Linear_Models_R_Teaching.md","title":"Multivariate Linear Models in R: Supplementary Reference","kind":"supplementary"}
]
~~~

Supplementary chapters (04, 06, 11) stay in their numbered positions in the one continuous list; distinguish them only visually (badge such as "Supplementary", subtle accent in the sidebar and chapter header). Do not move them into a separate section.

---

## 2. How this was inspected (and what was not)

All 11 files were scanned programmatically in full (31,615 lines, 1.50 MB), not sampled. Tools: Python 3.12 scripts; Node 22; **markdown-it 14.1.0, KaTeX 0.16.22, MathJax-full 3.2.2 (all TeX packages, SVG output), highlight.js 11.11.1**.

Executed tests: (a) fence balance and language inventory; (b) heading outline and slug collision analysis; (c) extraction of all 6,898 math expressions and rendering each with KaTeX (`throwOnError:true`, strict-mode callback; I confirmed the callback does fire on an intentionally bad input) and with MathJax; (d) table well-formedness (cell counts per row, with math/code protected); (e) byte-level scan for CR, tabs, BOM, NBSP, zero-width and U+2028/2029 characters; (f) a complete protect→parse→restore conversion of all 11 files with block-level counts compared to the source; (g) highlight.js on all 326 R blocks; (h) the reference script in §6.2 was run on all 11 files.

**Not done:** no real browser was available, so there was **no visual check in Chrome, Brave, Edge, Firefox or Safari** and no timing of in-browser rendering. All render/size numbers are from Node. No R code was executed. Content accuracy was not audited.

---

## 3. Formatting conventions actually used

### 3.1 Corpus profile

Counts come from the source files (headings and fences outside code; math after extraction). `R`/`txt` are the `r` / `text` fenced blocks (the only two languages used). "Display/Inline" count math expressions.

| Pos | H1 | H2 | H3 | H4 | R | txt | Tables | Display | Inline | Math total | Lines | KB |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 01 | 22 | 140 | 93 | 0 | 28 | 1 | 26 | 173 | 419 | 592 | 3541 | 163 |
| 02 | 9 | 27 | 167 | 0 | 27 | 5 | 13 | 285 | 804 | 1089 | 3816 | 136 |
| 03 | 6 | 28 | 218 | 0 | 53 | 13 | 32 | 196 | 751 | 947 | 3588 | 175 |
| 04 | 11 | 42 | 103 | 0 | 52 | 0 | 21 | 43 | 208 | 251 | 2178 | 122 |
| 05 | 7 | 28 | 186 | 0 | 39 | 10 | 41 | 72 | 299 | 371 | 2974 | 172 |
| 06 | 16 | 65 | 30 | 1 | 15 | 0 | 13 | 73 | 149 | 222 | 1614 | 85 |
| 07 | 11 | 64 | 81 | 0 | 14 | 0 | 15 | 163 | 660 | 823 | 2446 | 130 |
| 08 | 6 | 23 | 141 | 0 | 7 | 4 | 18 | 190 | 728 | 918 (919 after patch I-1) | 2560 | 108 |
| 09 | 8 | 47 | 102 | 0 | 18 | 4 | 35 | 208 | 495 | 703 | 3545 | 153 |
| 10 | 7 | 48 | 123 | 0 | 32 | 3 | 41 | 142 | 343 | 485 | 3133 | 142 |
| 11 | 5 | 24 | 130 | 0 | 41 | 2 | 30 | 58 | 439 | 497 | 2220 | 147 |
| **Σ** | 108 | 536 | 1374 | 1 | 326 | 42 | 285 | 1603 | 5295 | 6898 | 31615 | 1533 |

(Inline for 08 is 728 raw, 729 after the patch; total headings = 2,019; fenced blocks = 368.)

### 3.2 Math dialects: every file differs

| Pos | Display delimiter | Inline delimiter | Notes |
|---|---|---|---|
| 01 | `$$` | `$` | 152 blocks with `$$` alone on its line, 21 one-liners |
| 02 | `\[ … \]` | `\( … \)` | `\[` always alone on its line; matrix-heavy (322 `bmatrix`) |
| 03 | `$$` | `$` | **four layouts mixed**: `$$` alone; `$$…$$` one line; `$$content⏎…⏎content$$`; `$$content⏎…⏎$$` |
| 04 | `$$` | `$` | three of those layouts |
| 05 | `\[ … \]` | **`$`** | **only file mixing `\[` display with `$` inline** |
| 06 | `\[ … \]` | `\( … \)` | |
| 07 | `$$` | `$` | no standalone `$$` lines at all: one-liners (103) and open/close-with-content (60) |
| 08 | `$$` | `$` | contains `\$` (escaped dollar) inside math, 3 uses |
| 09 | `\[ … \]` | `\( … \)` | |
| 10 | `\[ … \]` | `\( … \)` | |
| 11 | `$$` | `$` | |

Environments used (all supported by KaTeX): `bmatrix` 769, `aligned` 119, `pmatrix` 12 (file 06 only), `smallmatrix` 7 (file 07 only), `cases` 6, `array` 4 (files 02, 07 ×2, 10; some with column rules like `c|ccc`), `gathered` 1 (file 06). Frequent commands: `\mathbf` (2,771), `\boxed` (522), `\boldsymbol`, `\widehat`, `\operatorname`, `\mathsf`, `\underbrace` (87), `\xrightarrow`, `\overset`/`\underset`/`\stackrel`, `\color` (4), `\tfrac`, `\dfrac`, `\binom`, `\hline` (3), `\big`/`\bigl`/`\bigr`, `\lVert`/`\rVert`. **No** `\newcommand`/`\def`, `\tag`, `\label`, `\eqref`, `equation` environments, or non-ASCII characters inside any math. Therefore: no custom macros and no equation numbering are needed. Longest expression: 650 characters (file 06, line 1546); no inline expression exceeds 160 characters; no blank lines inside any math span; no inline math spans multiple lines.

### 3.3 Everything else

- **Headings:** ATX only (`#`…`####`). Hierarchy is **inconsistent between files** (§5.1). 80 headings contain inline math; 76 contain inline code. Several heading texts embed literal bracket tags such as `[SOURCE, p. 1]`, `[TEACHING EXTENSION]`, `[CORRECTION, pp. 8, 15–16]`, `[Lecture p. 6]` (files 04 and 10). These are plain text (no link-reference definitions exist), so they render as literal text; leave them in place.
- **Code:** 326 `r` blocks (3,205 lines, longest line 93 chars) and 42 `text` blocks (R console output and ASCII diagrams). All 368 fences are closed. Only file 02 has non-ASCII in code (`─ ● └ ┘ ×` in `text` blocks). Inline code spans contain `$` in ~175 places (R accessors such as `pc$rotation`).
- **Tables:** 285 GFM pipe tables, all well-formed; cells frequently contain inline math or inline code. Max width 16 columns (file 05). Many use alignment colons (`---:`), which markdown-it emits as `style="text-align:…"`.
- **Lists/other:** bullets and numbered lists; nested lists only in file 05 (25 lines, 2-space indent); 40 blockquotes (callouts, mostly near the top of each file; none contain math or fences); 172 `---` rules; two-trailing-space hard line breaks in front matter (so keep `breaks:false`).
- **Links:** 56 internal `[text](#anchor)` links (file 01: 20 in "Contents and learning route"; 03: 5 in one "Reading roadmap" paragraph; 05: 31 in a nested "Contents" list) and 17 external autolinks `<https://…>` (01: 2, 04: 9, 05: 5, 07: 1). **No** images, footnotes, reference-style links, raw HTML, task lists, setext headings, or indented code blocks.
- **Characters:** UTF-8, LF line endings, no BOM, no tabs, no NBSP or zero-width characters (verified at byte level). Prose non-ASCII is limited to `– “ ” § → × · − ° ≈ …`; Greek letters appear only inside LaTeX.

---

## 4. Rendering readiness: confirmed issues and hazards

Everything below was reproduced, not assumed.

**I-1. Unclosed `$` (genuine source defect) — file 08, line 2265.**
`…average transaction value is $\$42.50. Identify the population…` has an opening `$` that never closes (the author evidently meant `$\$42.50$.`). Effect: visible text becomes `$$42.50`, and a non-line-bounded `$…$` matcher could pair this `$` with a later one and swallow prose. **Action:** apply this exact build-time replacement (assert it matches exactly once; log it):
`is $\$42.50. Identify the population` → `is $\$42.50$. Identify the population`.
After the patch the file converts with 919 math spans and no stray dollars. This is the only source defect found.

**I-2. `|` inside table cells (confirmed breakage in an unprotected GFM parser).**
GFM splits cells on every unescaped `|`, even inside `$…$` or backticks. Affected rows: file 07 lines **208, 392, 2332, 2338, 2435, 2436** (`$|\Sigma|$`, `N_{|I|}`, `$|z|>3$`, …) and file 11 line **648** (`` `| Species` `` in a code span). Unprotected, markdown-it produced the wrong cell count. With math and code protected first (the §6.2 pipeline) all seven rows render with the correct number of cells. **Do not "fix" by editing the source.**

**I-3. Math is destroyed by Markdown parsing.**
`\\`→`\`, `\[`/`\(`→`[`/`(`, `\{`→`{`, `_`/`*` become emphasis, and lines inside display math that begin with `+`, `-`, `=` become list items or **setext headings**. Concretely: a bare `=` line inside display math (file 01 line 2339, file 06 line 263, file 10 lines 413 and 477) makes the preceding line an `<h1>`; file 02 line 269 starts a math line with `+`. **Action:** extract math first (all four dialects).

**I-4. `$` inside code.**
~175 inline code spans and many R fences contain `$` (`evs$values`, `data$V4`, `` `$` `` in a table). A math extractor that runs before code protection pairs them up. **Action:** order is fenced code → inline code → display math → inline math.

**I-5. Heading-ID collisions.**
One duplicate slug within a file (file 04: "The important arguments", twice) and three slugs shared across files (`da2451-multivariate-methods-in-business`, `23-variance-measures-spread`, `contents`). All 11 chapters live in one HTML document. **Action:** GitHub-style slug from the *raw heading source* (this is what the 56 source anchors were written against: all 56 resolve), de-duplicate with `-1`, `-2`, then prefix `chNN--`.

**I-6. Math and code inside headings → TOC.**
80 headings contain math (e.g. file 08's H1 "PART III. HOTELLING'S $T^2$ IN DETAIL"). By position: 01→20, 02→12, 03→8, 04→2, 05→2, 06→2, 07→4, 08→20, 09→8, 10→1, 11→1. The TOC must render the heading's *inline HTML* (with KaTeX), not its raw text, and the slug must be computed from raw source text (not rendered text) so source anchors keep resolving.

**I-7. Heading hierarchy is not uniform** (title at H1/H2/H3, group level at H1 in all files but chapters at H1 in files 01 and 06). See §5.1.

**I-8. Embedding hazards.**
The sources contain ~7,100 backticks, `${` (file 01, ×2), and `-->` (files 02, 05). They contain no `</script`, `<!--`, `<script`, U+2028 or U+2029. A JS template literal would break; **use `JSON.stringify` and escape `<` as `\u003c`** (and U+2028/2029) when placing JSON in a `<script type="application/json">`.

**I-9. Box-drawing glyphs in code (file 02 `text` blocks).**
Needs a monospace stack with glyph coverage and `white-space:pre`; backslashes in these blocks (`\--`) are literal and must stay untouched (raw fence content is never unescaped by the pipeline).

**Checked and found clean:** fence balance; table structure; link-anchor resolution; character encoding; math validity (KaTeX: 0 errors and 0 strict-mode warnings over 6,898 expressions; MathJax: 0 errors); inline-`$` mis-pairing (no inline body is padded with spaces, over-long, or prose-like); no raw HTML; no stray `*`, `_`, `\(`, `\[`, `$$` left in rendered prose after the §6.2 pipeline (only I-1 before its patch).

### 4.1 Parser and renderer recommendation

| Concern | Recommendation |
|---|---|
| Markdown | **markdown-it 14.1.x**, `{html:false, linkify:false, typographer:false, breaks:false}`. `html:false` because the source has no HTML and literal `<` in prose must stay escaped; `typographer:false` because the sources already contain curly quotes and typographer would silently change `--`, `...`, `(c)`; `linkify:false` because the source uses explicit autolinks. Tables are enabled by default. |
| Math | **KaTeX 0.16.22** (≥14 days old; pin exactly). Options: `throwOnError:true` (build fails on any error), `strict:'warn'` in the build (expected: zero warnings), `trust:false`, `output:'htmlAndMathml'` (accessibility, copy/paste; use `'html'` to save ~2.8 MB if size matters). No `macros` needed. |
| Why not MathJax | It also parses all 6,898 expressions, so it is a valid fallback, but KaTeX is synchronous, faster, and ships as a script + CSS + woff2 fonts. MathJax's self-contained `tex-svg` bundle would work offline too but is heavier and slower for ~7k expressions. Not needed. |
| Code highlighting | Optional. **highlight.js 11.11.1 core + `r` language only**, run at build time (all 326 R blocks highlighted, 0 failures). Do not highlight `text` blocks. If unavailable, plain `<pre><code>` is acceptable. |

### 4.2 Browser/offline notes (principles, not tested here)

- Everything must be inline: no `fetch()` of sibling files (blocked on `file://` in Chromium), no CDN, no external fonts/CSS/scripts.
- **Fonts:** embed KaTeX's CSS with the 20 `.woff2` files as base64 data URIs (254 KB → ~340 KB) and delete the `.woff`/`.ttf` fallbacks (all five target browsers support woff2). Keep KaTeX's CSS unmodified apart from the font `src`. Set `.katex{color:inherit}` so dark mode works.
- Put `<meta charset="utf-8">` first in `<head>` (no HTTP header exists on `file://`) and `<html lang="en">`.
- **Avoid in the browser:** regex lookbehind (`(?<!…)`) breaks parsing of the *entire script* in Safari < 16.4. The §6.2 script uses it at build time in Node only. If you instead render at runtime, replace `(?<!\\)\$` with `(^|[^\\])\$` and re-insert the captured prefix. Treat `content-visibility`, `:has()` and `IntersectionObserver`-driven behavior as progressive enhancement with a working fallback.
- `localStorage`/`sessionStorage` (for reading progress) can throw on `file://` or in private mode (notably Safari): wrap every access in `try/catch`. If the page is also delivered as a hosted artifact, use only plain `#name` hash fragments (see §6.4).
- Browsers will not behave identically; test the final file at least in one Chromium browser, Firefox, and Safari if available, and say what was and was not tested.

---

## 5. File-by-file integration notes

### 5.1 Structure map: derive TOC roles from this, not from heading level alone

Group-heading rule that works for all 11 files: **a level-1 heading whose text matches** `/^(part\s+[ivx]+\b|chapter\s+\d+\.|\d+\.\s|appendix\s+[a-z]\b)/i`. Every H1 before the first group heading is title/banner (file 01 has two, file 06 has one). Everything before the first group heading is **front matter**: render it as an unnumbered "Overview" block at the top of the chapter (it contains the source's metadata lines, "how to read" callout, and for several files a contents list).

| Pos | Title heading | Front matter ends before line | TOC L1 (group) | TOC L2 | TOC L3 |
|---|---|---|---|---|---|
| 01 | H1 @1 banner "DA2451 Multivariate Methods in Business" + H1 @3 title | 54 | H1 "Chapter N. …" ×20 | H2 (140) | H3 (93) |
| 02 | H1 @1 | 13 | H1 "Part I–VIII …" ×8 | H2 numbered chapters (27) | H3 (167) |
| 03 | H1 @1 | 20 (H2 "How to use this book" @8) | H1 "Part I–V …" ×5 | H2 numbered chapters (27) | H3 (218) |
| 04 | H1 @1, H2 tagline @2, H3 "How to navigate" @11 | 22 | H1 "Part I–X …" ×10 | H2 numbered sections 1–41 | H3 (103, less the front one) |
| 05 | H1 @1, H2 tagline @2; H2 "How to study this book" @14, "Contents" @26 | 62 | H1 "Part I–VI …" ×6 | H2 numbered 1–25 | H3 (186) |
| 06 | **H1 @1 banner, H2 @2 is the real title** | 12 | **H1 numbered chapters "1."–"15."** ×15 | H2 "2.1 …" etc. (64) | H3 (30) + one **H4** @957 (treat as L4) |
| 07 | H1 @1, H2 tagline @3; H2 "A map of the original ten pages" @15 | 34 | H1 "Part I–X …" ×10 | H2 numbered 1–62 | H3 (81) |
| 08 | H1 @1, H2 tagline @3; H2 "Contents" @13 | 52 | H1 "PART I–V …" ×5 (uppercase) | H2 chapters | H3 (141) |
| 09 | H1 @1, H2 tagline @3; H3 "Your route through the subject" @11 | 26 | H1 "Part I–VI …" ×6 **+ "Appendix A …"** | H2 | H3 (102) |
| 10 | H1 @1, H2 tagline @3; H3 @12 and @25 (front matter) | 38 | H1 "Part I–VI …" ×6 | H2 | H3 (123) |
| 11 | H1 @1, **H3 tagline @3 (skips H2)**; H2 "Map of all 30 source pages" @11 | 43 | H1 "PART I–IV …" ×4 (uppercase) | H2 | H3 (130, incl. the tagline) |

Implement the TOC from the converted heading list (`toc[]` in the reference script) using these roles; do not hard-code line numbers (they are for orientation only). Because files 03 and others carry 100–218 H3s, **collapse L3 by default** and expand the section containing the current scroll position. Keep the in-text contents lists (files 01, 03, 05, 08 etc.) rendered exactly as written; their anchors are rewritten to `#chNN--…`.

### 5.2 Per-file notes (only what is specific to each file)

**01 Introduction** (`Lec01`). `$$`/`$`. Two H1 title lines (banner + title); 20 "Chapter N." H1 groups; a 20-link "Contents and learning route" list near the top; "Chapter 20. Source coverage and careful-reading notes" at the end contains 2 external autolinks (lines 3518–3519; need internet, see §6.7). 14 `aligned`, 28 `bmatrix`. 20 headings contain inline math. 174 table rows; bold-lead labels like `**Answer.**` throughout (optional styling hook).

**02 Matrix Algebra** (`Lec02`). Most delimiter-hostile file: 285 `\[…\]` blocks (each opener alone on its line) containing lines such as ` +\begin{bmatrix}…` and `\\[2pt]`, plus 804 `\(…\)`. One of three files with `array` environments (line 1550, `{lll}`; the others are 07 and 10), and 2 `cases`. Five `text` blocks, including a 32-line ASCII concept map at line 3777 with `-->`, `\--` and box-drawing glyphs (I-9). 12 headings contain math. Parts are H1, numbered chapters H2, 167 H3 sections.

**03 PCA** (`Lec03`). All four `$$` layouts occur (I-3 relevant: layouts where `$$` shares a line with content). 51 inline-code spans contain `$` (I-4); 13 headings contain code. The "Reading roadmap" paragraph at line 12 has 5 anchors to Part headings separated by `·`. 66 fences (13 `text`), 40 `**Q#**` practice questions. Largest H3 count (218): collapse in TOC.

**04 PCA in R (supplementary)** (`PCA_R_Methods`). Parts I–X are H1, sections 1–41 are H2 with literal source tags in the heading text (`[SOURCE, p. 1]`, `[TEACHING EXTENSION]`, `[CORRECTION, …]`); keep them in headings and TOC (a small badge via regex on the *rendered* heading is optional, never remove the text). Duplicate heading "The important arguments" (I-5). Heaviest code content: 52 R blocks, 646 code lines, 133 table rows containing code spans, 84 spans with `$`. Only 251 math expressions. 9 external autolinks in "§40 References and current documentation" (need internet). The front matter states that no R interpreter was available when the file was authored; leave that sentence as is.

**05 Factor Analysis (EFA)** (`Lec05`). **Mixed dialect**: `\[…\]` display with `$…$` inline. 41 tables, the widest with 16 columns (around line 2870): wrap every table in a horizontally scrollable container (§6.5). Only file with nested lists (25 lines) and a nested, 31-link "Contents" list (anchors point at Part and numbered-section headings; all resolve). 5 external autolinks near line 2918. 10 `text` blocks (console output).

**06 Factor Analysis: Additional Remarks (supplementary)** (`Lec05_Extra`). **Title is H2 @2; chapters are H1** (numbered `1.`–`15.`), subsections H2 (`2.1 …`), unnumbered H3, one H4 (line 957, "A numerical illustration"). Chapter 15 ("Source coverage and accuracy audit") contains H2s "Boundaries between source and teaching additions" and "Final conceptual check". `\(…\)`/`\[…\]`, `pmatrix` (12) and `gathered` (1) occur only here. Two headings contain `\(n\)`-style inline math (e.g. "2.1 What do \(n\), \(p\), and \(m\) mean?"). Contains no tables with code. Banner H1 text equals file 01's banner; do not de-duplicate it.

**07 Multivariate Normal** (`Lec06`). `$$`/`$`, **no standalone `$$` lines** (all display math is one-liners or open/close-with-content). **Six table rows with `|` inside math** (I-2). `smallmatrix` ×7 (`\left[\begin{smallmatrix}…\end{smallmatrix}\right]`), `array` with column rules (lines 821, 894). One bare autolink alone on a line (546; a Wolfram demonstration URL, needs internet). Parts I–X (H1), 62 numbered H2 sections. Bold `**Source link**` labels (23) tie sections to lecture pages.

**08 Inference About a Mean Vector** (`Lec07`). `$$`/`$`. **Contains the only source defect (I-1, line 2265).** Three legitimate `\$` escapes inside math (lines 508, 2265, 2267). 20 headings contain math (`$T^2$`, `$F_{a,b;1-\alpha}$`…): the TOC must render math (I-6). The front-matter "Essential convention" blockquote contains inline math. `PART I–V` headings are uppercase. 4 `text` blocks (R output). The "Contents" list (line 13) is plain text, not links.

**09 MANOVA** (`Lec08`). `\[…\]`/`\(…\)`. Parts I–VI plus **"Appendix A. Exact source-coverage audit, page by page"** as an H1 group; keep it in the TOC after Part VI. 35 tables, 131 `bmatrix`. Bold labels `**[Lecture: pp. …, §N]**` and `**[Teaching extension]**`. 8 headings contain math. 4 `text` blocks.

**10 MMLR** (`Lec09`). `\[…\]`/`\(…\)`. **Two bare `=` lines inside display math (lines 413, 477)** trigger the setext hazard (I-3). `array` with a column rule at line 1398. Front matter has two H3 headings ("The central question", "A map of the learning journey") before Part I. Headings carry `[Lecture p. N]` tags; 14 headings contain code. In-text reference "**Lecture 09**" differs from app position 10 (§1).

**11 Multivariate Linear Models in R (supplementary)** (`Multivariate_Linear_Models_R`). `$$`/`$`. **Table row at line 648 contains a code span that starts with a pipe** (`` `| Species` ``; I-2). Tagline is an **H3 at line 3**; front matter then has H2 "Map of all 30 source pages". Parts I–IV are uppercase H1. Bold labels `**SOURCE (p. N)**` / `**TEACHING EXPANSION**` appear about 60 times combined (optional styling hook). The front matter says a locally installed LaTeX renderer must be enabled for the app: this is source text; leave it unchanged.

---

## 6. Instructions for the app-building Claude

### 6.1 Recommended architecture

**Build-time conversion with Node, runtime display only.** The browser never parses Markdown or LaTeX.

1. A build script reads the 11 files from disk in manifest order and runs the §6.2 pipeline per chapter → `{html, toc, stats}`.
2. The final single HTML file contains: inline CSS (app + KaTeX CSS with base64 woff2 + code theme), the manifest and per-chapter TOC JSON, and the per-chapter HTML as JSON strings in `<script type="application/json" id="chNN">` blocks (escape `<` → `\u003c`, U+2028/2029). The only runtime JS is routing, TOC, lazy injection, and UI. KaTeX's JS is **not** needed in the final file.
3. **Measured sizes (Node):** source Markdown 1.50 MB; pre-rendered chapter HTML 14.4 MB with `htmlAndMathml` (11.6 MB with `html` only). Gzipped these are 1.27 / 1.00 MB, so the single file will be ~15 MB (or ~12 MB). If that is too large for the target, the alternative is to embed the Markdown (≈1.5 MB) + inline markdown-it and KaTeX JS and render in the browser (≈2.5 MB file); this needs the lookbehind fix in §4.2 and has more cross-browser risk. Prefer pre-rendering unless size is a hard constraint.
4. **Lazy injection.** The largest chapter (02) is 2.5 MB of HTML / ~48k DOM spans; the largest H1 group is 669 KB. Inject one chapter at a time, and within it the **first group immediately and remaining groups progressively** (e.g. when scrolled near, or in idle chunks). Keep an `id → group` map so a TOC click or deep link can force-render the target group before scrolling. Do not inject all 11 chapters at once.
5. Never type chapter content into the build script or the output by hand. Always read it from the files at build time.

### 6.2 Reference build pipeline (this exact script was run against all 11 files)

Result of running it: all 11 chapters converted; `toc` length equals the source heading count in each file (255, 203, 252, 156, 221, 112, 156, 170, 157, 178, 159); heading IDs unique within and across chapters; all 56 anchors resolve; every table wrapped; zero leftover placeholders; zero KaTeX errors; one patch applied. Adapt it, but keep the order of operations.

~~~~js
// Reference build pipeline (Node >= 18). Executed against all 11 files.
const fs=require('fs'),MarkdownIt=require('markdown-it'),katex=require('katex');
const SRC=process.argv[2]||'/mnt/user-data/uploads/';
const CHAPTERS=[
 ['01','DA2451_Lec01_Introduction_Teaching.md'],['02','DA2451_Lec02_Matrix_Algebra_Teaching.md'],['03','DA2451_Lec03_PCA_Teaching.md'],
 ['04','DA2451_PCA_R_Methods_Teaching.md'],['05','DA2451_Lec05_Factor_Analysis_Teaching.md'],['06','DA2451_Lec05_Extra_Factor_Analysis_Teaching.md'],
 ['07','DA2451_Lec06_Multivariate_Normal_Teaching.md'],['08','DA2451_Lec07_Mean_Vector_Inference_Teaching.md'],
 ['09','DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md'],['10','DA2451_Lec09_MMLR_Teaching.md'],['11','DA2451_Multivariate_Linear_Models_R_Teaching.md']];
// Logged, exact-match build-time patches (source files on disk stay untouched)
const PATCHES={'DA2451_Lec07_Mean_Vector_Inference_Teaching.md':[
  ['is $\\$42.50. Identify the population','is $\\$42.50$. Identify the population']]};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const slug=h=>h.replace(/`/g,'').replace(/\*+/g,'').toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').trim().replace(/\s/g,'-');
const L='\uE000',R='\uE001',PH=new RegExp(L+'(\\d+)'+R,'g');
function build(nn,file){
  let src=fs.readFileSync(SRC+file,'utf8').replace(/\r\n?/g,'\n');
  for(const [a,b] of (PATCHES[file]||[])){const n=src.split(a).length-1;if(n!==1)throw new Error('patch miss '+file);src=src.replace(a,b);console.log('  patch applied:',file);}
  const store=[];const put=(o)=>(store.push(o),L+(store.length-1)+R);
  const lines=src.split('\n'),out=[];
  for(let i=0;i<lines.length;){const m=lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*$/);
    if(m){const close=new RegExp('^\\s*'+m[2][0]+'{'+m[2].length+',}\\s*$');let j=i+1;const body=[];while(j<lines.length&&!close.test(lines[j]))body.push(lines[j++]);
      if(j>=lines.length)throw new Error('unclosed fence at '+(i+1));out.push(put({k:'fence',v:body.join('\n'),lang:m[3]||'text',raw:lines.slice(i,j+1).join('\n')}));i=j+1;}
    else out.push(lines[i++]);}
  src=out.join('\n');
  src=src.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g,(m,t,b)=>put({k:'code',v:b.replace(/^ (.*) $/,'$1'),raw:m}));
  const M=d=>(m,b)=>put({k:'math',v:b,disp:d,raw:m});
  src=src.replace(/\$\$([\s\S]+?)\$\$/g,M(true)).replace(/\\\[([\s\S]+?)\\\]/g,M(true)).replace(/\\\(([\s\S]+?)\\\)/g,M(false)).replace(/(?<!\\)\$((?:\\[\s\S]|[^$\\\n])+?)\$/g,M(false));
  const md=new MarkdownIt({html:false,linkify:false,typographer:false});
  const restore=(h)=>h.replace(PH,(_,n)=>{const s=store[+n];
    if(s.k==='fence')return `<pre class="code" data-lang="${esc(s.lang)}"><code class="language-${esc(s.lang)}">${esc(s.v)}</code></pre>`;
    if(s.k==='code')return `<code>${esc(s.v)}</code>`;
    return katex.renderToString(s.v,{displayMode:s.disp,throwOnError:true,strict:'warn',trust:false,output:'htmlAndMathml'});});
  const rawText=(t)=>t.replace(PH,(_,n)=>store[+n].raw);
  const toc=[],seen={};
  md.core.ruler.push('ids',st=>{const T=st.tokens;for(let i=0;i<T.length;i++){
    if(T[i].type==='heading_open'){const inl=T[i+1];let s=slug(rawText(inl.content))||'section';const c=seen[s]=(seen[s]??-1)+1;if(c)s+='-'+c;
      const id=`ch${nn}--${s}`;T[i].attrSet('id',id);toc.push({level:+T[i].tag[1],id,html:md.renderer.renderInline(inl.children,md.options,{}),anchor:s});}
    if(T[i].type==='table_open'){T[i].attrSet('class','md-table');}
    if(T[i].type==='inline'){for(const c of T[i].children||[]){if(c.type==='link_open'){const h=c.attrGet('href')||'';
      if(h.startsWith('#'))c.attrSet('href','#ch'+nn+'--'+h.slice(1));else if(/^https?:/.test(h)){c.attrSet('target','_blank');c.attrSet('rel','noopener noreferrer');c.attrSet('class','external');}}}}}});
  const defTable=md.renderer.rules.table_open;
  md.renderer.rules.table_open=(t,i,o,e,s)=>'<div class="table-wrap">'+md.renderer.renderToken(t,i,o);
  md.renderer.rules.table_close=(t,i,o)=>'</table></div>';
  let html=md.render(src);
  html=restore(html);toc.forEach(t=>t.html=restore(t.html));
  return {html,toc,fences:store.filter(s=>s.k==='fence').length,math:store.filter(s=>s.k==='math').length,left:(html.match(PH)||[]).length};
}
module.exports={build,CHAPTERS};
if(require.main===module){
  const all=new Set();let bad=0;
  for(const [nn,f] of CHAPTERS){
    const r=build(nn,f);
    const ids=[...r.html.matchAll(/ id="(ch\d\d--[^"]+)"/g)].map(m=>m[1]);
    const hrefs=[...r.html.matchAll(/href="#(ch\d\d--[^"]+)"/g)].map(m=>m[1]);
    const unresolved=hrefs.filter(h=>!ids.includes(h));
    const dup=ids.filter((x,i)=>ids.indexOf(x)!==i); ids.forEach(i=>{if(all.has(i))bad++;all.add(i)});
    const tablesOpen=(r.html.match(/<table/g)||[]).length,wraps=(r.html.match(/class="table-wrap"/g)||[]).length;
    console.log(nn,f.slice(0,36).padEnd(38),'toc',r.toc.length,'ids',ids.length,'dupIds',dup.length,'anchors',hrefs.length,'unresolved',unresolved.length,'| math',r.math,'fences',r.fences,'tables',tablesOpen,'wrapped',wraps,'| leftovers',r.left);
  }
  console.log('cross-file duplicate ids:',bad);
}
~~~~

Notes on the script:
- Placeholders are Private Use characters (`U+E000…U+E001`); they survive markdown-it in headings, table cells, list items, links and emphasis (verified: no stray `*`/`_`/delimiters in the output of any file).
- `rawText()` restores the original source text of each placeholder so slugs match the author's anchors (e.g. `` `foo()` `` and `$T^2$` inside headings).
- The script uses regex lookbehind; that is fine in Node. See §4.2 before reusing it in a browser.
- Not yet in the script (add them): highlight.js for `r` blocks (§4.1); a `wide` class on tables with ≥ 8 columns; splitting the HTML into groups at each top-level `<h1 ` for lazy injection; optional heading-tag demotion (shift `h1`→`h2`… so the app shell owns the single page `<h1>`; IDs are unaffected).

### 6.3 Preserving the source without silent changes

- The only content change is the single logged patch for I-1. Print every applied patch in the build log; the build must fail if a patch matches ≠ 1 time.
- Do not "tidy" curly quotes, dashes, `§`, arrows, spacing, or the bracket tags in headings; keep the bold labels (`**Answer.**`, `**Solution.**`…), "How to read this book" callouts, source-audit chapters, and all `---` rules.
- Do not strip the front matter, metadata lines, contents lists or the references/coverage-audit chapters at the end of each file.
- Do not reflow, merge or split paragraphs; do not convert tables to lists or code to images.
- Preserve R code **character-for-character** (it is emitted via HTML-escaping only). Provide a copy button if desired, copying the original text.
- Expose a small "Content integrity" panel (e.g. in an About dialog) listing each chapter's source filename, sha256 and the patch log. This makes silent drift detectable.

### 6.4 Navigation, TOC, routing

- **Sidebar** (collapsible on mobile): the 11 chapters in manifest order with position number, nav title and a "Supplementary" badge for 04/06/11. Expanding a chapter shows its TOC (L1 groups open, L2 visible for the active group, L3 collapsed until needed).
- **TOC entries use `toc[].html`** (rendered inline HTML including KaTeX), not plain text (I-6).
- **Heading IDs** are `chNN--<slug>`. For routing, use **only a plain hash that equals an element id** (`#ch08--part-iii-hotellings-t2-in-detail`, `#ch08` for a chapter top). The chapter is derived from the `chNN` prefix; ensure that chapter and group are rendered, then scroll. This works offline and also if the page is later hosted where only plain `#name` hashes are allowed.
- **In-text anchor links** were rewritten to `#chNN--…` at build time; intercept clicks so they go through the same router (force-render the target group first).
- **Scrolling:** `html{scroll-behavior:smooth}` optional; use `scroll-margin-top` equal to the sticky header height on all headings. Provide previous/next-chapter links following the manifest order, a "back to top" control, and (optional) remembered reading position per chapter with guarded storage.
- Provide an in-chapter "On this page" TOC that highlights the current section while scrolling (IntersectionObserver is fine; fall back to a scroll listener).
- Do not number or relabel headings in the UI beyond the chapter position; the source already contains its own numbering ("Chapter 3.", "Part II.", "12.").

### 6.5 CSS requirements for math, tables and code

~~~css
.chapter{max-width:min(100%,56rem)}
.chapter p,.chapter li{overflow-wrap:break-word}
.chapter .katex{color:inherit}
.chapter .katex-display{overflow-x:auto;overflow-y:hidden;max-width:100%;padding:.2em 0}
.table-wrap{overflow-x:auto;margin:1rem 0;-webkit-overflow-scrolling:touch}
.table-wrap table{border-collapse:collapse;min-width:100%}
.table-wrap th,.table-wrap td{padding:.4rem .6rem;border:1px solid var(--rule);vertical-align:top;min-width:4.5rem}
.table-wrap th{background:var(--surface-2);text-align:left}
pre.code{overflow-x:auto;white-space:pre;tab-size:4;padding:.8rem 1rem;border-radius:.5rem;
  font:0.875rem/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,"DejaVu Sans Mono","Liberation Mono",monospace}
code{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"DejaVu Sans Mono",monospace;font-size:.92em}
blockquote{border-left:4px solid var(--accent);margin:1rem 0;padding:.25rem 1rem}
hr{border:0;border-top:1px solid var(--rule);margin:2rem 0}
@media (max-width:640px){.table-wrap th,.table-wrap td{font-size:.85rem}}
~~~

- Define color tokens for light and dark (`prefers-color-scheme`) and test that math, code, tables, blockquotes and TOC read well in both. KaTeX text must inherit the surrounding color.
- Apply word-breaking to prose only (never to `.katex`, `pre` or tables). Inline KaTeX does not wrap; the longest inline expression is 160 characters, so on narrow screens let the page element scroll or the equation overflow inside its paragraph rather than clipping it.
- Keep code at least 14 px on mobile and allow horizontal scroll; do not wrap R code.
- Add a print stylesheet that hides navigation and avoids breaking inside `pre`, tables and display math.
- Callout styling hooks (optional, text unchanged): first blockquote(s) of each file; paragraphs starting `**Answer…**`, `**Solution…**`, `**Teaching extension…**`, `**TEACHING EXPANSION…**`, `**SOURCE (…)**`, `**[Lecture…]**`, `**Source link**`. Style with CSS/JS classes only; never remove the labels.

### 6.6 Performance with long documents

- Largest chapters by pre-rendered HTML: 02 (2.55 MB), 09 (1.74), 03 (1.72), 07 (1.63), 01 (1.46). Use group-level lazy injection (§6.1) and remove the previous chapter's DOM when navigating away (the JSON stays in memory).
- Parse each chapter's JSON only when first opened; cache the resulting group strings.
- Build the TOC DOM lazily for the open chapter. A chapter has 112–255 headings; that is cheap.
- In Node the whole pipeline (parse + 6,898 KaTeX renders) took ~2.7 s; in-browser timings were **not** measured. Because rendering is done at build time, browser cost is only HTML parsing and layout.

### 6.7 External links (offline)

17 external `<https://…>` autolinks exist (01 ×2, 04 ×9, 05 ×5, 07 ×1). They are source content: keep them as links with `target="_blank" rel="noopener noreferrer"` (the reference script does this) and style them as external (they will not work offline). Do not fetch anything at runtime.

### 6.8 Accessibility and polish

- Keep KaTeX's MathML (`htmlAndMathml`) unless size forces `html`; keep visible focus states; make the sidebar keyboard- and screen-reader-navigable; mark the active chapter with `aria-current`.
- Language is English; set `lang="en"`.
- Mobile: sidebar becomes a drawer; tables and equations scroll horizontally inside their own containers; the page body must never scroll sideways.

### 6.9 Acceptance tests (assert in the build; print a table)

Per chapter, the converted output must match the source-derived counts below; **any difference means content was lost or mangled**.

| Pos | Headings (H1/H2/H3/H4) | `<pre>` blocks (R+text) | `<table>` | Math: display / inline (total) | `<p>` | `<li>` | `<blockquote>` | `<hr>` | `<a>` |
|---|---|---|---|---|---|---|---|---|---|
| 01 | 22/140/93/0 | 29 (28+1) | 26 | 173 / 419 (592) | 850 | 263 | 2 | 23 | 22 |
| 02 | 9/27/167/0 | 32 (27+5) | 13 | 285 / 804 (1089) | 880 | 108 | 2 | 13 | 0 |
| 03 | 6/28/218/0 | 66 (53+13) | 32 | 196 / 751 (947) | 930 | 146 | 6 | 28 | 5 |
| 04 | 11/42/103/0 | 52 (52+0) | 21 | 43 / 208 (251) | 378 | 94 | 3 | 11 | 9 |
| 05 | 7/28/186/0 | 49 (39+10) | 41 | 72 / 299 (371) | 593 | 226 | 4 | 9 | 36 |
| 06 | 16/65/30/1 | 15 (15+0) | 13 | 73 / 149 (222) | 357 | 72 | 1 | 15 | 0 |
| 07 | 11/64/81/0 | 14 (14+0) | 15 | 163 / 660 (823) | 672 | 106 | 2 | 11 | 1 |
| 08 | 6/23/141/0 | 11 (7+4) | 18 | 190 / 729 (919)\* | 734 | 149 | 9 | 22 | 0 |
| 09 | 8/47/102/0 | 22 (18+4) | 35 | 208 / 495 (703) | 838 | 129 | 4 | 8 | 0 |
| 10 | 7/48/123/0 | 35 (32+3) | 41 | 142 / 343 (485) | 619 | 175 | 4 | 8 | 0 |
| 11 | 5/24/130/0 | 43 (41+2) | 30 | 58 / 439 (497) | 421 | 82 | 3 | 24 | 0 |

\* with patch I-1. `<p>`, `<li>`, `<blockquote>`, `<hr>`, `<a>` counts come from the same markdown-it configuration as §4.1 and the §6.2 pipeline; they are a regression check for "no paragraph lost", not a claim about the source's intended structure. (`<a>` = internal anchors + external autolinks.) Also assert: number of heading IDs = number of headings; no duplicate IDs across all chapters; every `href="#chNN--…"` resolves; zero leftover private-use placeholders; zero KaTeX errors; zero occurrences of `\(`, `\[`, `$$` in prose of the output.

Source integrity (SHA-256 of the files this guide was written against; abbreviated to 16 hex chars; compute the full hash in the build and compare):

| Pos | File | sha256 (first 16 hex) |
|---|---|---|
| 01 | `DA2451_Lec01_Introduction_Teaching.md` | `c7691a2fd6a28e09` |
| 02 | `DA2451_Lec02_Matrix_Algebra_Teaching.md` | `1031dd27e6793ab2` |
| 03 | `DA2451_Lec03_PCA_Teaching.md` | `ecf336906ddf0bde` |
| 04 | `DA2451_PCA_R_Methods_Teaching.md` | `6b8e35ba7a4f1908` |
| 05 | `DA2451_Lec05_Factor_Analysis_Teaching.md` | `5afb5de48c26ce0e` |
| 06 | `DA2451_Lec05_Extra_Factor_Analysis_Teaching.md` | `26c79b56982a7516` |
| 07 | `DA2451_Lec06_Multivariate_Normal_Teaching.md` | `5a61d12e48b6b1f3` |
| 08 | `DA2451_Lec07_Mean_Vector_Inference_Teaching.md` | `cea4098d01d593d3` |
| 09 | `DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md` | `561145b1395e3efe` |
| 10 | `DA2451_Lec09_MMLR_Teaching.md` | `c5e9f0680b15df17` |
| 11 | `DA2451_Multivariate_Linear_Models_R_Teaching.md` | `82c776277ab274b0` |

If a hash differs, the files changed after this guide was written: re-check the I-1 patch target and the counts above before trusting them.

---

## 7. Residual risks and things not verified

- No visual or timing checks in real browsers (Chrome, Brave, Edge, Firefox, Safari). Test the final file; do not claim cross-browser verification unless you ran it.
- Rendering equivalence between KaTeX and MathJax output was not compared; both only confirmed that every expression parses.
- The reference script's heading-tag demotion, table `wide` class, highlight.js integration and group splitting were not implemented there (only highlight.js was separately tested on the R blocks).
- Code in the chapters was not executed; content accuracy was not assessed.
- Count tables describe these exact files. They are a regression harness, not a statement about what the course covers.
