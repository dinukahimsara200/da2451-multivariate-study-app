# DA2451 Practice Questions: HTML Integration Guide

**Audience:** the Claude instance that builds the offline single-file Study App.
**Inputs you will have:** this guide + the five original `DA2451_PQ0N_Complete_Teaching.md` files (unmodified).
**Scope:** Practice Questions section only. Nothing here rewrites, summarizes, or fact-checks the worksheets. Companion to `DA2451_Lecture_HTML_Integration_Guide.md`; where this guide differs from it, this guide wins for these five files.

---

## 0. Verdict and the rules that matter most

**Verdict: all five files convert reliably, but not with a naive Markdown run.** Fences are balanced, every table is well-formed, and all 4,000 math expressions (710 + 804 + 1176 + 612 + 697 = 3,999 after patching; see §6.7) render with **0 KaTeX errors and 0 strict warnings**, provided the four problems below are handled.

Rules, in priority order:

1. **Protect before parsing**: fenced code → inline code → display math (`$$`) → inline math (`$`). Placeholders go through markdown-it; restore afterwards (reference script, §6.2).
2. **Only `$…$` and `$$…$$` are real delimiters in these files.** Do **not** extract `\(…\)` / `\[…\]` (the lecture guide does). They occur only as `\\[4pt]`-style row spacing inside `$$` blocks (PQ02 ×13, PQ04 ×1) and `\\(` at PQ03 line 1565. Extracting them is unnecessary and risks false matches.
3. **Strip blockquote prefixes inside math bodies** (`^[ \t]*>[ \t]?` per line). PQ03 has 10 display equations inside blockquotes; without this, KaTeX raises **no error** and silently draws a literal `>` glyph (§4, P-2).
4. **Apply the 7 logged PQ01 source patches** (§4, P-1): unescaped currency `$` in prose. Exact-match, must match exactly once, never edit the `.md` on disk.
5. **Do not trust heading levels** to find question or sub-question boundaries; they differ per file and within files (§5).
6. **Generate your own stable IDs** (`PQ03-Q05-b2`), not slug IDs: headings like "Original question" and "Lecturer-provided solution" repeat dozens of times (§5.4).
7. **Wrap long inline math** (PQ04 line 524 overflows a 390 px viewport; §4, P-4) and put every table, display equation and code block in its own horizontal scroll container.
8. **Embed content as JSON built by script**, never as pasted text or JS template literals. Verify with the invariants in §6.8.

---

## 1. Worksheet order and manifest

Order is fixed by this manifest, not by filename or modification date.

| Pos | Nav title | File | Source topic (from file header) |
|---|---|---|---|
| 01 | Practice Worksheet 1: Introduction to Multivariate Analysis | `DA2451_PQ01_Complete_Teaching.md` | Introduction to Multivariate Analysis |
| 02 | Practice Worksheet 2: Sample Geometry and Random Sampling | `DA2451_PQ02_Complete_Teaching.md` | Sample Geometry and Random Sampling |
| 03 | Practice Worksheet 3: Multivariate Normal Distribution, Part I | `DA2451_PQ03_Complete_Teaching.md` | Multivariate Normal Distribution, Part I |
| 04 | Practice Worksheet 4: Multivariate Normal Distribution, Part II | `DA2451_PQ04_Complete_Teaching.md` | Multivariate Normal Distribution, Part II |
| 05 | Practice Worksheet 5: Inference About Mean Vectors and Comparisons of Multivariate Means | `DA2451_PQ05_Complete_Teaching.md` | Inferences about a mean vector; comparisons of several multivariate means |

Source H1 titles differ in style ("Practice Worksheet 01", "…2", "…3": numbering is not zero-padded consistently, and PQ01/PQ02/PQ03 have a two-line H1 banner). Show source headings unaltered inside the content; use the nav titles above for navigation only.

Suggested lecture links (topic-based judgement, **not verified against lecture text**): PQ01 → Lecture ch01 (+ch02 for matrices); PQ02 → ch01/ch02; PQ03, PQ04 → ch07 Multivariate Normal; PQ05 → ch08 Mean Vector Inference and ch09 MANOVA. Treat as a editable mapping table.

Source integrity (SHA-256, first 16 hex; compute full hashes in the build):

| File | sha256 (first 16) |
|---|---|
| PQ01 | `8e17ebd0f8062eaa` |
| PQ02 | `9976be053671b38f` |
| PQ03 | `5f98b98d4f66e368` |
| PQ04 | `4990b542d4332e41` |
| PQ05 | `de184791f30c6482` |

If a hash differs, re-check every patch target and count below before trusting this guide.

---

## 2. How this was inspected (and what was not)

All five files (14,227 lines, ~617 KB) were scanned programmatically in full. Tools: Python 3, Node 22, **markdown-it 14.2.0, KaTeX 0.16.47, highlight.js 11.12.0** (the lecture guide used KaTeX 0.16.22; pin whichever you vendor and re-run the checks), headless **Chromium 153** via Playwright.

Done: fence balance; heading outline (fence-aware); delimiter and layout inventory of every math expression; KaTeX render of all expressions with `throwOnError:true` and a strict-mode callback; table well-formedness; byte-level character scan; strict-vs-loose inline `$` pairing comparison; naive-vs-protected markdown-it comparison; highlight.js on all 86 R blocks; a full protect→parse→restore build of all five files; rendering of all five in Chromium at 390 px and 1280 px (overflow, error and glyph checks).

**Not done:** MathJax (not installed, no network, so no MathJax claim is made); Firefox, Safari, Edge, Brave (no visual check in any); `file://` behaviour in browsers other than the headless Chromium used; no R code executed; no academic fact-check; no comparison with the original PDFs. Chromium timings were measured on pre-rendered HTML only.

---

## 3. Formatting conventions actually used

### 3.1 Corpus profile (after the §4 patches)

| File | Lines | KB | H1 / H2 / H3 / H4 | Fences (r + text) | Tables | Math display / inline (total) | Blockquotes | `<hr>` |
|---|---|---|---|---|---|---|---|---|
| PQ01 | 2123 | 99 | 11 / 54 / 63 / 6 | 16 (16+0) | 22 | 124 / 586 (710) | 6 | 0 |
| PQ02 | 3199 | 119 | 9 / 65 / 109 / 0 | 13 (12+1) | 19 | 211 / 593 (804) | 0 | 0 |
| PQ03 | 3513 | 133 | 15 / 87 / 163 / 0 | 12 (12+0) | 10 | 251 / 925 (1176) | 11 | 14 |
| PQ04 | 2355 | 112 | 13 / 63 / 55 / 0 | 30 (30+0) | 14 | 88 / 524 (612) | 3 | 13 |
| PQ05 | 3039 | 153 | 13 / 64 / 94 / 0 | 19 (16+3) | 29 | 143 / 554 (697) | 7 | 13 |

Encoding: UTF-8, LF, no BOM, no tabs, no NBSP or zero-width characters. PQ02 is pure ASCII; the others contain only `“ ” –` (PQ05 also one `’` and one `…`). No non-ASCII inside any R or text fence. No raw HTML, images, footnotes, reference links or external URLs. Thematic breaks: PQ03 uses `***`, PQ04/PQ05 use `---`, PQ01/PQ02 none.

### 3.2 Math dialects

All five files use **`$…$` inline and `$$…$$` display only**. Display layouts differ:

| File | `$$` layouts |
|---|---|
| PQ01 | 31 alone-on-line, 61 one-liners, 32 with content on the first and last lines |
| PQ02 | all 211 with `$$` alone on its own lines |
| PQ03 | 241 alone-on-line; 10 are blockquote blocks whose closing `$$` follows content |
| PQ04 | all 88 alone-on-line |
| PQ05 | 64 alone-on-line, 63 one-liners, 16 with content on first and last lines |

A single regex `\$\$([\s\S]+?)\$\$` handles every layout. No blank lines inside any math span, no inline math spanning lines, **no `\$` escapes anywhere** (which is why the PQ01 currency problem exists).

Environments: `bmatrix` (62/116/183/18/65 for PQ01…PQ05), `aligned` (37/57/35/1/13), `matrix` (PQ02 ×2, PQ05 ×3), `smallmatrix` (PQ02 ×3), `gathered` (PQ01 ×1, line 691), `cases` (PQ04 ×1, line 1000), `array` with column rule `cc|c` plus `\hline` (PQ03 line 1837), `vmatrix` (PQ03 line 2238). All render in KaTeX. Notable commands: `\boxed` (~270 uses; PQ01 79, PQ02 102, PQ03 93, PQ04 20, PQ05 55), `\mathbf`, `\boldsymbol`, `\mathsf` (PQ05 `\mathsf T`), `\operatorname`, `\left|…\right|`, `\lVert`, `\underbrace`, `\overset`, `\Bigg`, `\displaystyle` (inside PQ05 table cells), `\vdots`/`\ddots`, `\iint`, `\hspace{76mm}` (PQ03 line 594, a fixed-width spacer: it scrolls inside the display container on narrow screens, which is fine). No `\newcommand`, `\def`, `\tag`, `\label`, `\eqref`, `\color`, or non-ASCII characters inside math. **No custom macros or equation numbering are needed.** Longest display expression 584 characters (PQ02); longest inline 91 characters (PQ02); up to 16 lines in one display block.

### 3.3 Everything else

- **Headings:** ATX only. Heading text contains inline math in 17/26/35/4/14 headings (PQ01…PQ05) and inline code in 0/2/0/2/1. The TOC must render heading **inline HTML** (with KaTeX), and slugs must be computed from raw source text. PQ01 has six H4s (inside Q1(b) steps, e.g. "Squared deviation sum for …").
- **Heading level skips (H1→H3, no H2):** PQ01 line 2064, PQ04 line 2202, PQ05 line 2668. The TOC must tolerate this.
- **Code:** 86 R fences (PQ01 16, PQ02 12, PQ03 12, PQ04 30, PQ05 16; 2,124 lines in total) and 4 `text` fences (PQ02 line 330, an ASCII scatter plot; PQ05 lines 2696, 2791, 2847, which are the 87/48/56-row raw datasets). Widest code line 79 characters; longest R block 222 lines (PQ04 master script). `$` appears in inline code and fences (`data$V4` style: PQ02 3, PQ03 1, PQ04 7, PQ05 18 spans or blocks), so code must be protected **before** math.
- **Tables:** 94 GFM pipe tables, max 12 columns (PQ01), 11 (PQ05); two are 22 and 25 rows (PQ05 lines 55 and 439). Alignment colons are used. **Tables inside blockquotes:** PQ01 (13 rows) and PQ05 (27 rows); markdown-it renders them correctly after the prefix is handled.
- **Blockquotes** are used for original question text (all files except PQ02) and a few callouts; they contain display math (PQ03, PQ01), tables (PQ01, PQ05) and `\vdots` rows.
- **Hard line breaks:** two trailing spaces appear 3/18/16/12/10 times (front-matter metadata lines and `> **Question N**  ` lines). Use `breaks:false` so these become `<br>` and nothing else does.
- **Links:** only internal `[text](#anchor)` links in the Contents lists (PQ01 9, PQ02 7, PQ04 12, PQ05 12; PQ03's Contents is a plain numbered list). All 40 resolve with GitHub-style slugs from the raw heading text.
- **Source phrases that refer to the authoring session** ("uploaded", "supplied in this conversation", `.DAT` file names; PQ04 ×4, PQ05 ×16). They are source text: leave unchanged. The datasets they refer to are embedded in the documents (PQ04 §Q2.0 table; PQ05 Appendix A and the Q3 table).

---

## 4. Confirmed problems (all reproduced)

**P-1. Unescaped currency `$` in prose: PQ01 only (lines 318, 350, 450, 520, 530, 614, 663).** A `$` followed by a number is paired with the next `$`, which turns prose into math. Chromium rendering of line 318 without the patch: "sales of **42andabookcountof4,soitsrowis(42,4).Thenextreceiptis(52,5)$**"; line 350 loses its spaces in the same way. PQ02–PQ05 have no such lines (a strict-vs-loose pairing comparison and odd-`$`-per-line scan found none). Apply these exact replacements in the build (each `old` must occur exactly once; log them):

| Line | old | new |
|---|---|---|
| 318 | `sales of $42 and a book count of $4$` | `sales of \$42 and a book count of $4$` |
| 350 | `average $50 each. Two receipts are above $50 and two are below $50.` | `average \$50 each. Two receipts are above \$50 and two are below \$50.` |
| 450 | `“a $1 increase causes` | `“a \$1 increase causes` |
| 520 | `means **$18,950**, not $18.95. The data` | `means **\$18,950**, not \$18.95. The data` |
| 530 | `\| Price in $1,000 ($X_2$) \|` | `\| Price in \$1,000 ($X_2$) \|` |
| 614 | `is **$12,481**.` | `is **\$12,481**.` |
| 663 | `as $30.8544 thousand dollars**` | `as $30.8544$ thousand dollars**` |

Notes: line 663 is the one judgement call: the unterminated `$30.8544` parallels `$30.8544$` earlier in the sentence, so the closing `$` is added (rendered text "30.8544 thousand dollars", no dollar sign). If you prefer a currency reading, use `\$30.8544`. Line 614 has a single `$` and is harmless on its own (it renders as written) but is escaped for safety. A bare `\$` is handled by markdown-it as an escaped dollar; the inline-math regex must skip it (`(?<!\\)\$`, or `(^|[^\\])\$` in browsers; §4.1).

**P-2. Math inside blockquotes keeps its `> ` prefixes: PQ03 lines 848, 1037, 1226, 1232, 1237, 1461, 1745, 1975, 2138, 2145.** The extracted body contains lines such as `> \boldsymbol\mu=…`. KaTeX parses `>` as a relation symbol, so there is **no error**: in Chromium, all 10 blockquote equations showed a visible `>`. After stripping `^[ \t]*>[ \t]?` from each line of every math body, 0 remain. Apply the strip to all math bodies (it is a no-op elsewhere; PQ01's two blockquote `$$` lines are single-line).

**P-3. `|` inside table cells: PQ02 lines 105, 3014, 3015, 3018, 3020, 3161; PQ05 lines 70, 2682** (`$|\mathbf{S}|$`, `$|A|$`, `$|W|$`). GFM splits on every unescaped `|`, even inside `$…$`. A naive markdown-it parse of the real row text produced the cells `["2(a)","Generalized sample variance","$","\\mathbf{S}"]`, which splits the math and silently drops the last cell ("Source-provided, independently verified"). The protect-first pipeline renders all 8 rows with the right cell count. Do not edit the source.

**P-4. Mobile overflow: PQ04 line 524 (Question 1 original data list).** The inline equation `$-0.6,\ 3.1,\ 25.3,…,\ 26.0$` renders 487 px wide, so at a 390 px viewport the **page** gets a horizontal scrollbar. It was the only page-level overflow across all five files (every other wide item was inside a scrollable table, display or code container). Fix generically: give blocks that contain an over-wide inline `.katex` their own `overflow-x:auto` (post-process at build time or on first display), or wrap any inline math wider than ~20 em in `<span class="m-scroll">` (`display:inline-block;max-width:100%;overflow-x:auto;vertical-align:bottom`). Do not add `word-break` to math.

**P-5 (hazard, not an error): any naive Markdown pass corrupts math.** Every file would lose `\\` line breaks and mangle `_`/`*` in subscripts. Lines inside display math that start with `=`, `+`, `-` occur (PQ01 1, PQ02 33, PQ03 65, PQ04 14, PQ05 34 counted by first character), but none forms a setext underline, bullet or numbered list, and a naive markdown-it run produced **no phantom headings** in any file. Do not rely on that: protecting math first is still required.

**Checked and clean:** fence balance (all 100 fences closed, all ``` `r` `` or `text`); table row widths; internal anchors; encoding; KaTeX over all expressions; highlight.js over 86 R blocks (0 failures); duplicate IDs (none after your own ID scheme or after slug de-duplication with a per-worksheet prefix).

### 4.1 Parser and renderer recommendation

| Concern | Recommendation |
|---|---|
| Markdown | **markdown-it 14.x** with `{html:false, linkify:false, typographer:false, breaks:false}`. |
| Math | **KaTeX** (pinned, ≥14 days old), `throwOnError:true` (fail the build), `strict:'warn'` (expect zero warnings after the patches), `trust:false`, `output:'htmlAndMathml'` (or `'html'` to save size), no `macros`. All environments above are supported. |
| MathJax | Not tested here. KaTeX covers every construct observed, is synchronous and ships as CSS + woff2. Use MathJax only if KaTeX is ruled out. |
| Code | highlight.js core + `r` only, at build time; never highlight `text` fences. Plain `<pre><code>` is an acceptable fallback. HTML-escape only; keep R code character-for-character. |
| Browser regex | Lookbehind `(?<!\\)` is fine in Node at build time. If you render in the browser, use `(^|[^\\])\$` and re-insert the prefix (Safari < 16.4 rejects lookbehind and breaks the whole script). |

### 4.2 Offline and environment notes

- No `fetch()` of sibling files, no CDN, no web fonts. Embed KaTeX CSS with its `.woff2` fonts as base64 data URIs; drop `.woff`/`.ttf`. Set `.katex{color:inherit}` for dark mode.
- `<meta charset="utf-8">` first in `<head>`; `<html lang="en">`.
- Reading progress, bookmarks and solution-reveal state: use `localStorage` inside `try/catch` (it can throw on `file://` or in private mode) and keep an in-memory fallback.
- Escape `<` as `\u003c` (and U+2028/2029) when embedding JSON in `<script type="application/json">`. The sources contain thousands of backticks and `$`; never use template literals.
- Do not assume `file://` behaves identically across browsers. Say exactly which browsers you tested.

---

## 5. Question-and-answer structure

### 5.1 Principles

- **Questions and answers share one document.** Each worksheet question is an **H1 section** containing: a metadata paragraph, the **original question**, then teaching, solution and R material.
- **A question's extent = from its H1 to the next H1 that is *not* a continuation** (see PQ04 below). Foundations, reference, R-script and checklist H1s are **not questions** (§5.3).
- **The original question text is the contiguous quoted block (or plain block in PQ02) directly under the "Original question…" H2.** It is **not** the whole H2 section: in PQ05 Q1, the H2 "Original question" is followed directly by an H3 "1(a). What is the question really asking?", which means a heading-nesting parser puts the entire 1(a) solution "inside" the original question. Use the blockquote line range instead.
- Between the original block and the first teaching heading there may be a plain paragraph that belongs with the original question as a **note** (PQ04: `**Source-answer status:** …`; PQ03 Q5: `**Original-numbering note:** …`; PQ01 and PQ02: `**Source:** … / **Solution status:** …` just under the H1). Keep these attached to the question card; do not drop or reorder them.
- **Never split a sub-question's explanation from its solution.** A sub-question runs from its heading to the next sub-question heading (same family) or the next H1. Everything in between, including `Lecturer-provided solution`, `Guided reasoning`, `Step n`, `Optional R verification`, `Common mistakes`, `Final answer` blocks and `\boxed{}` results, stays in that unit.
- Provenance labels (§5.5) are **content**. Keep them visible; style them with CSS only.

### 5.2 Question map (line numbers are orientation only; detect by heading text)

Detection rule for question H1s: `^Question\s+\d+` (PQ04 also matches `Question 2(a)`–`2(d)` as continuations of Question 2).

**PQ01** (`Question N (H|R|R/H): title`)

| ID | H1 line | Original question (blockquote lines) | Sub-question headings (all H2) |
|---|---|---|---|
| PQ01-Q01 | 292–497 | 298–308 | Part (a) 316, (b) 342, (c) 452 |
| PQ01-Q02 | 498–765 | 504–516 | (a) 524, (b) 582, (c) 588, (d) 712 |
| PQ01-Q03 | 766–938 | 772–780 | none (the question has no lettered parts; teaching under "Method 1/2", "Why is there a cross-product term?", …) |
| PQ01-Q04 | 939–1344 | 945–957 | (a) 976, (b) 994, (c) 1100, (d) 1284 |
| PQ01-Q05 | 1345–1933 | 1351–1364 | (a) 1395, (b) 1610, (c) 1695, (d) 1844 |

Non-question H1s: Foundations 26–291, Common misconceptions 1934–1983, One-piece R script 1984–2073, Self-check exercises and final answer checklist 2074–2123; front matter 1–25 (two title H1s + "Table of contents").

**PQ02** (`Question N (H|R|R/H): title`; original question is **plain text**, not a blockquote)

| ID | H1 line | Original question | Sub-question headings (H2) |
|---|---|---|---|
| PQ02-Q01 | 253–950 | H2 at 258; `**Question 1 (H)**` + `$$` data matrix + `**(a)**…**(d)**` through line ~278 | `1(a).` 290, `1(b).` 389, `1(c).` 506, `1(d).` 615 |
| PQ02-Q02 | 951–1446 | H2 at 956; to 972 | `2(a).` 1043, `2(b).` 1090, `2(c).` 1193 (plus the verify/derivation/R/mistakes/"all final answers" H2s at 1244, 1282, 1364, 1425, 1435; these belong to Q02 as unlettered sections) |
| PQ02-Q03 | 1447–2131 | H2 at 1452 | `3(a).` 1488, **`3(a), continued: Verify …` 1716 (same sub-question, not a new one)**, `3(b).` 1814 |
| PQ02-Q04 | 2132–2677 | H2 at 2137 (no lettered parts) | none; Steps 1–6 |

Non-question H1s: Part 0 foundations 29–252, **Part 5 (2678–3003)** and Part 6 (3004–3199). Part 5 contains **supplementary practice exercises** (5.4–5.7, labelled "Supplementary exercise, not in the original PDF") and "5.8 Conceptual questions with immediate answers": preserve them but do **not** treat them as worksheet questions or merge them into PQ02-Q01…Q04.

**PQ03** (`Question N. title`)

| ID | H1 line | Original (blockquote lines) | Sub-question headings (H2, `Question N(x).`) |
|---|---|---|---|
| PQ03-Q01 | 518–838 | 524–529 | 1(a) 582, 1(b) 712 |
| PQ03-Q02 | 839–1027 | 845–854 | none; contains H2 **"Essential source discrepancy…" at 940** (keep, it is teaching content) |
| PQ03-Q03 | 1028–1216 | 1034–1045 | 3(a) 1053, 3(b) 1148 |
| PQ03-Q04 | 1217–1451 | 1223–1239 | 4(a) 1247, 4(b) 1368 |
| PQ03-Q05 | 1452–1735 | 1458–1471 | 5(a) 1483, **5(b) "first occurrence" 1632, 5(b) "second occurrence (5(c) in this guide)" 1681** |
| PQ03-Q06 | 1736–1965 | 1742–1761 | 6(a)–(e): 1791, 1803, 1815, 1851, 1877 |
| PQ03-Q07 | 1966–2128 | 1972–1991 | 7(a)–(e): 2008, 2018, 2030, 2040, 2060 |
| PQ03-Q08 | 2129–2429 | 2135–2156 | 8(a) 2167, 8(b) 2278, 8(c) 2335 |
| PQ03-Q09 | 2430–2666 | 2436–2445 | 9(a) 2457, 9(b) 2503, 9(c) 2563 |
| PQ03-Q10 | 2667–2943 | 2673–2682 | 10(a) 2695, 10(b) 2733, 10(c) 2751, 10(d) 2811 |
| PQ03-Q11 | 2944–3128 | 2950–2957 | 11(a) 2965, 11(b) 3021 |

**Ambiguity (Q05):** the original question lists two parts both labelled **(b)** (the PDF's own error, preserved in the file). Use IDs `PQ03-Q05-a`, `PQ03-Q05-b1`, `PQ03-Q05-b2`, and optionally display the file's own alias "5(c)" for `b2`. Do not relabel the original question text.
Non-question H1s: Part 0 foundations 40–517, Part 12 revision reference 3129–3513 (H2s 12.1–12.8 and "Final study advice"; Q&A formula maps and an "audit"; keep intact).

**PQ04** (`Question N.` / `Question 2(x).`)

| ID | H1 line | Original (blockquote lines) | Notes |
|---|---|---|---|
| PQ04-Q01 | 518–739 | H2 "Original Question 1 (verbatim numerical content and tasks, page 1)" 520; quote 522–530 | Sub-questions are **H2**: `Question 1(a).` 591, `Question 1(b).` 664 |
| PQ04-Q02 | 740–847 | H2 "Original Question 2 (page 1)" 742; quote 744–752 | wrapper section: also holds "Q2.0. The real data…" 25-row table (756). Parts (a)–(d) are **not** here |
| PQ04-Q02-a | 848–973 | (in Q02's original) | **H1** `Question 2(a). …`, sub-headings `Q2(a)-1 … -5` (H2) |
| *Module D* | 974–1166 | n/a | **H1 "Module D. Power transformations…" sits between 2(a) and 2(b)**; it is teaching material, not a question |
| PQ04-Q02-b | 1167–1334 | | **H1**, H2s `Q2(b)-1 … -5` |
| PQ04-Q02-c | 1335–1490 | | **H1**, H2s `Q2(c)-1 … -5` |
| PQ04-Q02-d | 1491–1970 | | **H1**, H2s `Q2(d)-1 … -9` |

Treat Q02 as a **parent** whose original text (lines 744–752) lists (a)–(d) and whose four part sections are the sibling H1s above. A "Question 2" view should show the original once, then parts a–d in order; Module D should be reachable from the parts that cite it ("explained before Questions 2(b) and 2(c)") and remain a standalone reading unit.
Non-question H1s: front matter 1–38; Module A 39–252, Module B 253–414, Module C 415–517 (before Q1); "Complete runnable R script" 1971–2224; "Exam reasoning, pitfalls and self-checks" 2225–2355 (E1–E6).

**PQ05** (`Question N – title`)

| ID | H1 line | Original | Sub-question headings |
|---|---|---|---|
| PQ05-Q01 | 524–817 | H2 528; quote 530–546 (includes a table with `\vdots` row) | **`1(a). What is the question really asking?` is an H3 (548)**, Steps 1–8 are H3s; **`Question 1(b).` is an H2 (721)** |
| PQ05-Q02 | 818–1113 | H2 822; quote 824–839 | `Question 2(a)` 841, `2(b)` 949, `2(c)` 1005 (H2) |
| PQ05-Q03 | 1114–1365 | H2 1118, **one-line quote at 1120**; separate H2 "Original external Table 6.1: Effluent data (supplied)" 1122 (plain table, not quoted) | no lettered parts; Steps 1–4, then "Complete reproducible base-R code" |
| PQ05-Q04 | 1366–1767 | H2 1370; quote 1372–1390 | `Question 4(a)` 1404, `4(b)` 1560 |
| PQ05-Q05 | 1768–2116 | H2 1772; quote 1774–1776 | no lettered parts; Steps 1–7 |
| PQ05-Q06 | 2117–2465 | H2 2121; quote 2123–2137 (matrices in a table) | `Question 6(a)` 2170, `6(b)` 2210, `6(c)` 2384, optional verification 2418 |

Q03 original = quote **plus** the "Original external Table 6.1" section: show them together.
Non-question H1s: front matter 1–40; Part I foundations 41–430; Part II "How to work in R" 431–523; Part III master R script 2466–2687; Appendix A datasets 2688–2916 (A1–A5); Appendix B 2917–2986; Appendix C source and completion audit 2987–3039.

### 5.3 What is *not* a new question

Do not create a question for: H1s titled Foundations / Part 0 / Part I / Part II / Module A–D / Part 5 / Part 6 / Part 12 / Part III / Appendix A–C / "Complete runnable R script" / "One-piece R verification script" / "Common misconceptions" / "Exam reasoning…" / "Self-check exercises…" / front matter. Exercises inside them (PQ02 5.4–5.7, PQ01 and PQ04 self-checks, PQ05 B5, PQ03 12.x) are **supplementary examples**; they stay where they are and are shown as part of that reading unit.

### 5.4 IDs

Use deterministic IDs derived from the manifest, not slugs:

- Worksheet `PQ01`…`PQ05`; question `PQ03-Q05`; sub-question `PQ03-Q05-a` (`-b1`, `-b2` for the duplicate); PQ04 parts `PQ04-Q02-a…d`; reading units `PQ02-P0` (Part 0), `PQ04-MA…MD`, `PQ05-APP-A…C`, `PQ01-R-SCRIPT`, etc.
- Keep the slug-based heading ids too (`pq03--question-5a-find-the-distribution-…`), prefixed by worksheet, **only** so the 40 source `#anchor` links resolve. Slugs from raw heading text collide: "Original question…" is identical 4–11 times per file (PQ03 has 35 headings with a repeated slug), so the `-1`, `-2` suffixes depend on document order; never use those for bookmarks or progress.
- For the hash router use a plain `#name` only (e.g. `#PQ03-Q05-b2`), because hosted artifacts allow only plain hash names.

### 5.5 Provenance labels (keep them, they carry meaning)

Do not remove or merge. They are consistent enough to use as optional CSS/JS hooks:

- PQ01: `**Source:**`, `**Why this arrangement?**`, "source-provided answer" phrasing, `### Question N: mistakes to avoid` (×5), `### R verification…`.
- PQ02: `**Source location:**`, `**Solution status:**`, `**Question N (H|R)**`, `**Answer.**`, `**Independently completed answer**`, `**Supplementary illustration/exercise, not in the original PDF**`, `## Common mistakes in Question N`, `## Question N: all final answers together` / `concise final answer`.
- PQ03: `**Source location:**`, `### Lecturer-provided solution` (×20 H3), `**Guided reasoning**`, `### Optional R verification` (×6), `### Common mistakes in Question N` (×9), `**Source discrepancy**` content (Q02 H2 at 940).
- PQ04: `**Source-answer status:**`, `**Answer.**`, "independent computation" labelling, `Q2(a)-n` step headings, E4/E5 self-checks.
- PQ05: `**Source:**`, "Source-supplied worked answer: none", `**Independently calculated conclusion**`, `**Uploaded file**`, `### Final answer for Question 1(b)`, Appendix C audit.

Heading text containing `Lecturer-provided solution` marks the printed worked answer; headings containing `Guided`, `Optional R verification`, `Common mistakes`, `Independent…` mark added teaching. A "reveal solution" feature can safely hide from the first `Lecturer-provided solution` / `Q#(x)-1` teaching heading onward **inside a sub-question unit** while keeping the original question and its note visible, but hidden content must still be in the DOM/JSON, searchable, and printable (never delete it).

---

## 6. Instructions for the app-building Claude

### 6.1 Architecture

Build-time conversion in Node; the browser only displays pre-rendered HTML. Per worksheet, produce `{html, toc, units}`:

1. Run the §6.2 pipeline on each file.
2. Split the rendered HTML at top-level `<h1 ` boundaries into **groups**, then derive **question units** from §5.2 by heading text (regex `^Question\s+\d+`), using the manifest rather than line numbers.
3. Embed one JSON string per worksheet in `<script type="application/json">`; parse on first open; inject one group at a time, first group immediately, others lazily; keep an `id → group` map so a TOC click, bookmark or deep link force-renders its target first.
4. Measured (Node/Chromium, `html`-only KaTeX output): pre-rendered HTML 1.28 / 1.61 / 2.06 / 0.69 / 1.06 MB for PQ01…PQ05 (≈6.7 MB total; with MathML about 20% larger than `html`, not measured here). Loading a whole worksheet at once in headless Chromium took 0.23–0.77 s with 16k–52k DOM nodes, so it is workable but lazy per-group injection is still recommended on phones.
5. Never type content into the build script. Read the files at build time and fail on any mismatch with §6.8.

### 6.2 Reference build pipeline (the logic below was executed on all five files)

Result: 0 KaTeX errors, 0 leftover placeholders, 0 duplicate heading ids, all 40 anchors resolved, all 94 tables wrapped, 7 patches applied.

~~~js
const fs=require('fs'),MarkdownIt=require('markdown-it'),katex=require('katex');
const SRC=process.argv[2]||'/mnt/user-data/uploads/';
const FILES=[['PQ01','DA2451_PQ01_Complete_Teaching.md'],['PQ02','DA2451_PQ02_Complete_Teaching.md'],['PQ03','DA2451_PQ03_Complete_Teaching.md'],['PQ04','DA2451_PQ04_Complete_Teaching.md'],['PQ05','DA2451_PQ05_Complete_Teaching.md']];
// Exact-match, logged build-time patches (disk files untouched). Each must match exactly once.
const PATCHES={'DA2451_PQ01_Complete_Teaching.md':[
 ['sales of $42 and a book count of $4$','sales of \\$42 and a book count of $4$'],
 ['average $50 each. Two receipts are above $50 and two are below $50.','average \\$50 each. Two receipts are above \\$50 and two are below \\$50.'],
 ['“a $1 increase causes','“a \\$1 increase causes'],
 ['means **$18,950**, not $18.95. The data','means **\\$18,950**, not \\$18.95. The data'],
 ['| Price in $1,000 ($X_2$) |','| Price in \\$1,000 ($X_2$) |'],
 ['is **$12,481**.','is **\\$12,481**.'],
 ['as $30.8544 thousand dollars**','as $30.8544$ thousand dollars**']]};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const slug=h=>h.replace(/`/g,'').replace(/\*+/g,'').toLowerCase().replace(/[^\p{L}\p{N}_\s-]/gu,'').trim().replace(/\s/g,'-');
const L='\uE000',R='\uE001',PH=new RegExp(L+'(\\d+)'+R,'g');
function build(id,file){
  let src=fs.readFileSync(SRC+file,'utf8').replace(/\r\n?/g,'\n');
  for(const [a,b] of (PATCHES[file]||[])){ if(src.split(a).length-1!==1) throw new Error('patch miss: '+a); src=src.replace(a,b); console.log('patch applied',file); }
  const store=[]; const put=o=>(store.push(o),L+(store.length-1)+R);
  // 1. fenced code
  const lines=src.split('\n'),out=[];
  for(let i=0;i<lines.length;){const m=lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*$/);
    if(m){const close=new RegExp('^\\s*'+m[2][0]+'{'+m[2].length+',}\\s*$');let j=i+1;const b=[];
      while(j<lines.length&&!close.test(lines[j]))b.push(lines[j++]);
      if(j>=lines.length)throw new Error('unclosed fence at '+(i+1));
      out.push(put({k:'fence',v:b.join('\n'),lang:m[3]||'text'}));i=j+1;} else out.push(lines[i++]);}
  src=out.join('\n');
  // 2. inline code  3. display math  4. inline math (skip \$) ; NO \( \) or \[ \] extraction for these files
  src=src.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g,(m,t,b)=>put({k:'code',v:b.replace(/^ (.*) $/,'$1'),raw:m}));
  const dq=x=>x.replace(/^[ \t]*>[ \t]?/gm,'');            // strip blockquote prefixes inside math (PQ03 !)
  const M=d=>(m,b)=>put({k:'math',v:dq(b),disp:d,raw:m});
  src=src.replace(/\$\$([\s\S]+?)\$\$/g,M(true)).replace(/(?<!\\)\$((?:\\[\s\S]|[^$\\\n])+?)\$/g,M(false));
  const md=new MarkdownIt({html:false,linkify:false,typographer:false,breaks:false});
  const restore=h=>h.replace(PH,(_,n)=>{const s=store[+n];
    if(s.k==='fence')return `<pre class="code" data-lang="${esc(s.lang)}"><code>${esc(s.v)}</code></pre>`; // optionally highlight 'r' here
    if(s.k==='code')return `<code>${esc(s.v)}</code>`;
    return katex.renderToString(s.v,{displayMode:s.disp,throwOnError:true,strict:'warn',trust:false,output:'htmlAndMathml'});});
  const rawText=t=>t.replace(PH,(_,n)=>store[+n].raw);       // slugs from RAW source so the author's #anchors resolve
  const toc=[],seen={},pre=id.toLowerCase();
  md.core.ruler.push('ids',st=>{for(const t of st.tokens){
    if(t.type==='heading_open'){const inl=st.tokens[st.tokens.indexOf(t)+1];let s=slug(rawText(inl.content))||'section';
      const c=seen[s]=(seen[s]??-1)+1; if(c)s+='-'+c; const hid=`${pre}--${s}`; t.attrSet('id',hid);
      toc.push({level:+t.tag[1],id:hid,html:md.renderer.renderInline(inl.children,md.options,{}),text:rawText(inl.content)});}
    if(t.type==='inline')for(const c of t.children||[])if(c.type==='link_open'){const h=c.attrGet('href')||'';if(h.startsWith('#'))c.attrSet('href','#'+pre+'--'+h.slice(1));}}});
  md.renderer.rules.table_open=(t,i,o)=>'<div class="table-wrap">'+md.renderer.renderToken(t,i,o);
  md.renderer.rules.table_close=()=>'</table></div>';
  const html=restore(md.render(src)); toc.forEach(t=>t.html=restore(t.html));
  return {html,toc,store};
}
~~~

Not in the script (add): heading-tag demotion if the shell owns the page `<h1>`; highlight.js for `r` fences; a `wide` class for tables with ≥ 8 columns; group splitting; unit/question segmentation (§6.1 step 2); your own IDs (§5.4); a copy button for R code that copies the **original** text. The segmentation and ID assignment were designed from the verified heading map in §5.2 but were **not** executed as code; assert them with the checks in §6.8.

### 6.3 Preserving the educational content

- The only content changes are the 7 logged PQ01 patches and the removal of the `> ` prefix from math bodies (no visible text changes). Fail the build if a patch matches ≠ 1 time.
- Do not tidy curly quotes, dashes, "**H**/**R**/**R/H**" tags in question headings, `[…]` tags, bold labels, `---`/`***` rules, front matter, contents lists, "source discrepancy" sections, audits, appendices or datasets.
- Do not reflow, merge or split paragraphs; do not convert tables to lists or code to images; do not summarise "Common mistakes" or "Final answer" blocks to save space.
- The `\boxed{}` results stay inside their math; do not extract them as "answers" in place of the surrounding explanation.
- Provide an About / "Content integrity" panel listing file name, sha256 and the patch log.

### 6.4 Navigation and features (suggestions only)

All of the following are optional; design freely, but the source structure makes them cheap:

- **Worksheet picker → question list → sub-question tabs.** Use §5.2 for the tree. PQ04 needs a parent question (Q02) with four sibling part sections and a linked Module D; PQ05 Q01 needs rule-based splitting (1(a) is an H3).
- **Show original question first, solution on demand** (§5.5 reveal rule). Always expose the original question note paragraph.
- **Per-sub-question progress / bookmark** keyed by the §5.4 IDs, stored with guarded `localStorage`.
- **Search by topic:** index heading text (raw, with math as TeX), question titles and the "Source / Topic" front-matter lines. Titles with math (e.g. PQ03-Q02 `Distribution of $2X_1+X_2$…`) should show rendered math in results.
- **Link to lecture chapters** with the editable mapping in §1.
- In-text anchors (`#pq01--question-1-h-bookstore-receipts`) must be intercepted so the target group is rendered before scrolling.
- TOC entries must use `toc[].html` (rendered inline math/code), not raw text; collapse H3s by default.
- External network: none needed; no external links exist.

### 6.5 CSS requirements

~~~css
.chapter{max-width:min(100%,56rem)}
.chapter p,.chapter li{overflow-wrap:break-word}
.chapter .katex{color:inherit}
.chapter .katex-display{overflow-x:auto;overflow-y:hidden;max-width:100%;padding:.2em 0}
.m-scroll{display:inline-block;max-width:100%;overflow-x:auto;vertical-align:bottom}   /* P-4 */
.table-wrap{overflow-x:auto;margin:1rem 0;-webkit-overflow-scrolling:touch}
.table-wrap table{border-collapse:collapse;min-width:100%}
.table-wrap th,.table-wrap td{padding:.4rem .6rem;border:1px solid var(--rule);vertical-align:top}
pre.code{overflow-x:auto;white-space:pre;tab-size:4;padding:.8rem 1rem;border-radius:.5rem;font:.875rem/1.5 ui-monospace,SFMono-Regular,Menlo,Consolas,"DejaVu Sans Mono",monospace}
blockquote{border-left:4px solid var(--accent);margin:1rem 0;padding:.25rem 1rem}
hr{border:0;border-top:1px solid var(--rule);margin:2rem 0}
~~~

Observed on a 390 px viewport (Chromium): 21–47 display equations per worksheet scroll horizontally inside their container (widest 878 px), 6–15 tables and 11–24 code blocks scroll horizontally; page-level overflow occurred only for P-4. Keep code ≥ 14 px, do not wrap R code, do not word-break math. Blockquote content (original questions) contains tables and display math: ensure `blockquote` does not clip (`overflow:visible`) and that its inner `.table-wrap`/`.katex-display` still scroll. Define light and dark tokens and make sure KaTeX, code, tables and blockquotes inherit them. Add a print stylesheet that avoids breaking inside `pre`, tables and display math, and prints any revealed or hidden solutions deliberately.

### 6.6 Performance

- Parse each worksheet's JSON only on first open; render group-by-group; remove the previous worksheet's DOM on leaving it.
- PQ03 is the heaviest (2.06 MB HTML, ~52k nodes, 1,176 expressions); PQ02 next (1.61 MB). Do not inject both at once.
- Rendering is at build time, so browser cost is HTML parse and layout only. No in-browser timing beyond the Chromium load figures in §6.1 was done.

### 6.7 Math rendering notes

- Preserve LaTeX exactly: store the raw TeX for each span (also useful for copy-on-click and search). Never transform backslashes, never "simplify" expressions, never round numbers.
- `\\` in matrices and `aligned` is fine once math is extracted before Markdown; `\\[4pt]` row spacing is KaTeX-valid.
- Currency vs math: only PQ01 had the problem, fixed by P-1. Add a build assertion that no rendered paragraph/cell text contains an unescaped `$` unless it came from a `\$`.
- Multiline calculations: `aligned` (206 blocks across the five files) and `gathered`/`cases` render as display blocks; they need no special handling beyond the scroll container.
- Tables with math: math inside cells is fine; cells with `|` need protection first (P-3). In PQ05, `\displaystyle` inside table-cell math increases cell height: no action needed.
- Accessibility: keep MathML output if size allows (`htmlAndMathml`).
- Expression totals for the invariants: **PQ01 710, PQ02 804, PQ03 1176, PQ04 612, PQ05 697 = 3,999** (the earlier summary figure of "4,000" was the pre-patch ballpark; use the table).

### 6.8 Acceptance tests (assert in the build; any difference means content was lost or mangled)

Counts from the exact pipeline in §6.2 (patches applied, `breaks:false`):

| File | H1/H2/H3/H4 | `<pre>` (r+text) | `<table>` | Math disp / inline (total) | `<p>` | `<li>` | `<blockquote>` | `<hr>` | `<a>` | `<br>` | inline `<code>` |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PQ01 | 11/54/63/6 | 16 (16+0) | 22 | 124 / 586 (710) | 430 | 119 | 6 | 0 | 9 | 3 | 135 |
| PQ02 | 9/65/109/0 | 13 (12+1) | 19 | 211 / 593 (804) | 628 | 114 | 0 | 0 | 7 | 18 | 139 |
| PQ03 | 15/87/163/0 | 12 (12+0) | 10 | 251 / 925 (1176) | 738 | 181 | 11 | 14 | 0 | 16 | 44 |
| PQ04 | 13/63/55/0 | 30 (30+0) | 14 | 88 / 524 (612) | 444 | 151 | 3 | 13 | 12 | 12 | 166 |
| PQ05 | 13/64/94/0 | 19 (16+3) | 29 | 143 / 554 (697) | 571 | 92 | 7 | 13 | 12 | 10 | 196 |

Also assert: heading ids unique across all five worksheets (prefix `pqNN--`); every `href="#pqNN--…"` resolves; zero leftover private-use placeholders; zero KaTeX errors; **no KaTeX display whose TeX source contains a line-leading `>`**; no `$$` or stray `\(` in rendered prose; no table row with fewer cells than its header; your question-unit extents cover each H1 section exactly once (a question's units partition the file with no gap or overlap: front matter + foundations + questions + reference sections).

Question-level checks: PQ01 5 questions (parts 3/4/4/4/none for Q3 pattern: Q1 a–c, Q2 a–d, Q3 none, Q4 a–d, Q5 a–d); PQ02 4 (Q1 a–d, Q2 a–c, Q3 a–b, Q4 none); PQ03 11 (Q1 a–b, Q2 none, Q3 a–b, Q4 a–b, Q5 a, b1, b2, Q6 a–e, Q7 a–e, Q8 a–c, Q9 a–c, Q10 a–d, Q11 a–b); PQ04 2 (Q1 a–b, Q2 a–d); PQ05 6 (Q1 a–b, Q2 a–c, Q3 none, Q4 a–b, Q5 none, Q6 a–c). The "original question" parts counted from the quoted block match these (PQ03 Q05 lists a, b, b).

---

## 7. File-by-file integration map

**PQ01 – Introduction to Multivariate Analysis (99 KB).**
Structure: two title H1s + metadata + "Table of contents" (9 internal links); H1 "Foundations: starting from zero" (11 H2s, an "R quick start"); five question H1s with blockquoted originals; closing H1s for misconceptions, a one-piece R script and self-checks. Math: `$`/`$$`, 62 `bmatrix`, 37 `aligned`, one `gathered` (line 691), long `\boxed{…}` answers; 6 H4 sub-steps. Special: 16 R fences (longest 73 lines), 22 tables (several in blockquotes, up to 12 columns), 3 hard breaks. **Problems:** P-1 (7 currency lines). **Precautions:** apply patches; keep the "source-substitution clarification" paragraph under Q1(b) (it explains a source numerical issue; do not trim); Q3 has no lettered parts. Heading skip H1→H3 at 2064.

**PQ02 – Sample Geometry and Random Sampling (119 KB).**
Structure: H1 banner + H1 title; "How to use this book" with 7 navigation links (to Part 0, Q1–Q4, Part 5, Part 6); Part 0 foundations (0.1–0.9); Q1–Q4 H1s; Part 5 consolidated R + supplementary exercises; Part 6 formula sheet and final checklist. **Original questions are plain text** (no blockquote), introduced by the H2 "Original question (faithfully reproduced)" and a bold `**Question N (H)**` line. Math: `$$` always on its own lines, 116 `bmatrix`, 57 `aligned`, `matrix`, 3 `smallmatrix` inside table cells (lines 3016–3018), 13 `\\[4pt]` spacing tokens, longest display 584 chars. Special: pure ASCII, one `text` fence (ASCII scatter plot, line 330), 12 R fences up to 103 lines; many `|…|` determinants. **Problems:** P-3 (6 table rows: 105, 3014, 3015, 3018, 3020, 3161). **Precautions:** `3(a), continued` is the same sub-question; Part 5 exercises are supplementary; line 3018 holds a long `\left[\begin{smallmatrix}…` expression in a table cell (it renders; allow the table to scroll).

**PQ03 – Multivariate Normal Distribution, Part I (133 KB).**
Structure: H1 banner + title; a provenance legend (Original question / Lecturer-provided solution / Guided derivation / Source discrepancy / Supplementary); plain numbered "Contents"; Part 0 foundations (478 lines); Q1–Q11 H1s, each with a blockquoted original, H3 `Lecturer-provided solution` blocks, `Optional R verification`; Part 12 revision reference. Math: heaviest (1,176 expressions, 183 `bmatrix`, `\boldsymbol`, `\operatorname{…}`, `\overset`, `\Bigg`, `\hspace{76mm}` line 594, `array` `cc|c` with `\hline` line 1837, `vmatrix` line 2238, `\iint` line 89). 149 blockquote lines; `***` thematic breaks. **Problems:** P-2 (10 equations inside blockquotes). **Precautions:** strip the blockquote prefix; Q05 has duplicate "(b)"; Q02 contains the "Essential source discrepancy" section (the printed covariance matrix cannot be valid; content must be kept); the original-numbering note at Q05 must stay with the original; line 594's 76 mm spacer scrolls on phones (acceptable).

**PQ04 – Multivariate Normal Distribution, Part II (112 KB).**
Structure: H1 title; provenance conventions; 12-link "Navigation" list; Modules A–C foundations; Q1; Q2 (original + 25-row data table); then H1s for Q2(a), Module D, Q2(b), Q2(c), Q2(d); "Complete runnable R script"; "Exam reasoning, pitfalls and self-checks". Math: 88 display, 524 inline; `\lambda`-heavy Box–Cox formulas, one `cases` (line 1000, with `\\[7pt]`), 18 `bmatrix`. Code: 30 R fences (longest 222 lines), dense with `$` accessors in code spans (7). **Problems:** P-4 (line 524). **Precautions:** Q2's parts are H1 siblings with Module D between 2(a) and 2(b); the "Source-answer status" paragraph under each original must stay; the text says results were independently computed (leave as is).

**PQ05 – Inference About Mean Vectors and Comparisons of Multivariate Means (153 KB).**
Structure: H1 title; "Read this first" provenance notes; 12-link Contents; Part I foundations (incl. symbol table with `$|A|$`), Part II "How to work in R", Q1–Q6 H1s (Q1 sub-parts H3/H2 mix; Q3 includes an external-table H2; Q5 and Q3 no lettered parts), Part III master R script (≈190 lines), Appendix A (87/48/56-row datasets as `text` fences, plus the 11-row effluent table), B, C. Math: `\boldsymbol`, `\mathsf T` (255 `\boldsymbol`), Wilks `\Lambda^*`, `matrix`/`bmatrix`, `\displaystyle` inside table cells, `\vdots` table rows (the Q1 data excerpt). 27 blockquote table rows; 29 tables up to 11 columns. **Problems:** P-3 (lines 70, 2682). **Precautions:** keep "Original external Table 6.1" with Q3; Q1(a) is an H3 inside the original-question H2's line range (use the blockquote extent); heavy source references to uploaded `.DAT` files are source text; the `text` fences are datasets (monospace, no wrapping, horizontal scroll).

---

## 8. Residual risks and things not verified

- No visual check in Firefox, Safari, Edge or Brave; Chromium (headless 153) only, at 390 px and 1280 px, on pages built from this guide's pipeline with KaTeX's CSS loaded from disk (not base64-inlined).
- MathJax was not tested; KaTeX/MathJax rendering equivalence was not compared.
- Question segmentation, ID assignment and any reveal/bookmark logic described here are derived from verified headings and line ranges but were not run as code.
- The PQ01 line 663 patch is an inference about author intent (§4, P-1).
- Line numbers are for orientation; use heading text and the invariants in §6.8.
- No R code was executed; no mathematical or statistical accuracy was audited; no comparison with the original PDFs was done.
