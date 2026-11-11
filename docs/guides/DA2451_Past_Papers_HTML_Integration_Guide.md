# DA2451 Past Papers HTML Integration Guide

**Audience:** the Claude instance that builds the offline single-file Study App (Past Papers section).
**Inputs you will have:** this guide + the 10 original `.md` files (unmodified).
**Companion document:** `DA2451_Lecture_HTML_Integration_Guide.md` (lecture chapters). Where the two differ (math delimiters, placeholder characters), this guide is authoritative for past papers (§5).
**Scope:** technical integration only. Nothing here rewrites, summarizes, or fact-checks questions or answers.

---

## 0. Verdict and the rules that matter most

**Verdict: the 10 files are ready for HTML integration, with 3 small logged source patches and 1 build-time math transform.** The question-answer structure maps cleanly: for all 9 papers the question numbers, part letters and MCQ numbers in the master file match the answer file exactly, and part marks sum to the stated question totals and paper totals. No blocker was found. Every issue found has a tested fix (§5).

The rules, in priority order:

1. **Map by structure, never by text or heading slug.** Use stable structural IDs (`b21-final-2024-01/q3/g`, §4.1). Heading texts repeat heavily ("Step-by-Step Calculation" ×12 in one file, "Question 1" ×9 in the master) and 82 slugs are shared across files.
2. **Math here is `$…$` and `$$…$$` only.** `\[…\]` appears 11 times in 2 files and is **never display math** (it is escaped literal brackets in prose). Do **not** reuse the lecture guide's four-dialect extractor unchanged (§5, I-4).
3. **Protect before parsing** (fences → inline code → math → Markdown), and use **punctuation-class placeholders** (`⟦12⟧`, not Private-Use characters). With Private-Use placeholders, bold next to math (`$X_2$**, given that**`) failed to parse as bold in 6 of 10 files (up to 130 stray `**` per file). With `⟦…⟧` there were zero (§5, I-6).
4. **Apply exactly 3 logged exact-match patches** (all in `21_batch_january_2024_answers.md`) and **one build-time transform** (`\vline` → `array` column rules; 8 blocks). Never edit the `.md` files on disk (§5, I-1 to I-3).
5. **Keep the paper order from the manifest (§1), not from filenames.** Alphabetical order happens to coincide here, but do not rely on it.
6. **Answer keys for MCQs are structured, not single letters.** 6 MCQs have a primary letter plus "also accepted", select-all, or no letter at all (§4.5). Always render the original key blockquote verbatim.
7. **Never drop or merge content.** The master's question stems and the answer files' own "Reference Setup" restatements both stay; shared-context blocks attach to several questions (§4.4).
8. **Verify against the acceptance tables (§7.4).** If counts differ, content was lost or mangled.

---

## 1. Examination organization, chronology and manifest

### 1.1 What the files say

Paper identity comes from the master file's `## ` headings and from each answer file's H1 line, which follows the grammar `# <batch> Batch | <exam type> | <date label> | <course code>` (e.g. `# 21 Batch | In-Class Examination | Semester 4, 2023 | DA2451`). All metadata below is read from those lines and from each paper's header/instructions block; **nothing is inferred beyond that.**

| # | Paper ID (proposed) | Source titles | Type | Course / term as printed | Duration / marks / mode as printed | Composition |
|---|---|---|---|---|---|---|
| 1 | `b19-final-2022-07` | "Final Examination (July 2022)" | Final | DA3420, Semester V | 3 Hours (+30 min to scan/submit); 100; open book; 60% of course assessment | 4 essay questions × 25 |
| 2 | `b20-final-2023-08` | "Final Examination (August 2023)" | Final | DA3420, Semester V | 3 Hours; 100; closed book; 50% | 10 MCQ (20) + 4 essay × 20 (80) |
| 3 | `b21-inclass-2023` | "In-Class Examination (Semester 4, 2023)" | In-class exam | DA2451 | 1 h 30 min; 50; closed book | 3 questions (15 / 20 / 15) |
| 4 | `b21-final-2024-01` | "Final Examination (January 2024)" | Final | DA2451, Semester IV | 3 Hours; "all questions carry equal marks" (5 × 20 = 100); closed book; 50% | 5 questions |
| 5 | `b22-final-2024-12` | "Final Examination (December 2024)" | Final | DA2451, Semester IV | 3 Hours; 100; closed book; 50% | 25 MCQ (50) + 2 essay × 25 |
| 6 | `b23-quiz1-2025` | "In-Class Quiz 1 (Semester 4, 2025)" | Quiz | DA2451 | 45 minutes; 45; open-book assignment | 3 questions (10 / 10 / 25) |
| 7 | `b23-quiz2-2025` | "In-Class Quiz 2 (Semester 4, 2025)" | Quiz | DA2451 | 45 minutes; 45; open-book assignment | 3 questions (20 / 15 / 10) |
| 8 | `b23-quiz3-2025` | "In-Class Quiz 3 (Semester 4, 2025)" | Quiz | DA2451 | 45 minutes; 40; open-book assignment | 2 questions (20 / 20) |
| 9 | `b23-final-2025-10` | "Final Examination (October 2025)" | Final | DA2451, Semester IV | 2 Hours & 30 Minutes; 100; closed book; 50% | 30 MCQ (60) + 3 essay (10 / 10 / 20) |

Notes that matter for the UI:
- **Course code changes** from DA3420 (batches 19, 20; "Semester V") to DA2451 (batches 21–23; "Semester IV / Semester 4"). The master title is "(DA3420 / DA2451)". Show the code per paper; do not normalize.
- **Only finals have month-year dates.** In-class papers and quizzes carry only "Semester 4, 2023/2025"; **no day-level dates exist anywhere**. Do not display or sort by invented dates.
- Quiz marks are labeled in parentheses (`(3 marks)`) in Quiz 1 only; everywhere else marks are in square brackets (`[3 marks]`).
- Quiz 1 has **no per-question totals in the master**; the answer file supplies them (10, 10, 25; matches the header's 45).
- Paper header blocks differ: finals have the university/faculty banner and an "INSTRUCTIONS TO CANDIDATES" list; in-class papers and quizzes have only a 3-line header. Keep each verbatim (they are source content).
- The master file's own table of contents groups papers under 5 "batches" (19, 20, 21, 22, 23). Batch 21 holds 2 papers; batch 23 holds 4.

### 1.2 Recommended navigation order

Use **source order** (it is also chronological as far as the source supports): batch 19 → 20 → 21 (in-class 2023, then final Jan 2024) → 22 → 23 (Quiz 1, Quiz 2, Quiz 3, then final Oct 2025). The in-class/quiz-before-final order inside batches 21 and 23 follows the master's order and the year labels; the files give no finer evidence. Offer filters by exam type (Final / In-class exam / Quiz), batch, year and course code, and optionally a "newest first" toggle; default to source order.

### 1.3 Manifest (embed as JSON)

~~~json
[
 {"id":"b19-final-2022-07","batch":19,"type":"final","course":"DA3420","dateLabel":"July 2022","answerFile":"19_batch_july_2022_answers.md","masterH2":"Final Examination (July 2022)","totalMarks":100},
 {"id":"b20-final-2023-08","batch":20,"type":"final","course":"DA3420","dateLabel":"August 2023","answerFile":"20_batch_august_2023_answers.md","masterH2":"Final Examination (August 2023)","totalMarks":100},
 {"id":"b21-inclass-2023","batch":21,"type":"inclass","course":"DA2451","dateLabel":"Semester 4, 2023","answerFile":"21_batch_2023_in_class_answers.md","masterH2":"In-Class Examination (Semester 4, 2023)","totalMarks":50},
 {"id":"b21-final-2024-01","batch":21,"type":"final","course":"DA2451","dateLabel":"January 2024","answerFile":"21_batch_january_2024_answers.md","masterH2":"Final Examination (January 2024)","totalMarks":100},
 {"id":"b22-final-2024-12","batch":22,"type":"final","course":"DA2451","dateLabel":"December 2024","answerFile":"22_batch_december_2024_answers.md","masterH2":"Final Examination (December 2024)","totalMarks":100},
 {"id":"b23-quiz1-2025","batch":23,"type":"quiz","course":"DA2451","dateLabel":"Semester 4, 2025","answerFile":"23_batch_2025_quiz_1_answers.md","masterH2":"In-Class Quiz 1 (Semester 4, 2025)","totalMarks":45},
 {"id":"b23-quiz2-2025","batch":23,"type":"quiz","course":"DA2451","dateLabel":"Semester 4, 2025","answerFile":"23_batch_2025_quiz_2_answers.md","masterH2":"In-Class Quiz 2 (Semester 4, 2025)","totalMarks":45},
 {"id":"b23-quiz3-2025","batch":23,"type":"quiz","course":"DA2451","dateLabel":"Semester 4, 2025","answerFile":"23_batch_2025_quiz_3_answers.md","masterH2":"In-Class Quiz 3 (Semester 4, 2025)","totalMarks":40},
 {"id":"b23-final-2025-10","batch":23,"type":"final","course":"DA2451","dateLabel":"October 2025","answerFile":"23_batch_october_2025_answers.md","masterH2":"Final Examination (October 2025)","totalMarks":100}
]
~~~

The master file is a single file holding all papers. Locate each paper by its `## ` heading (the table of contents at the top of the master is a plain list, not links; ignore it for navigation and keep it as front matter). Do not split by line number; use the heading text in `masterH2`.

---

## 2. How this was inspected (and what was not)

All 10 files were scanned in full (10,756 lines, 563 KB / 576,208 bytes). Tools: Python 3.12 scripts, Node 22, **markdown-it 14.1.0, KaTeX 0.16.22, MathJax-full 3.2.2** (all TeX packages, SVG output).

Executed tests: (a) heading outlines and a structural parser for the master and all 9 answer files (questions, parts, sub-parts, marks, MCQs, answer keys); (b) a field-by-field diff between master and answers; (c) mark-sum checks per question and per paper; (d) extraction of all 6,203 math expressions and rendering each with KaTeX (`throwOnError:true`, strict callback) and MathJax; (e) fence, table and byte-level checks (CR, tabs, BOM, NBSP, zero-width); (f) a complete protect → parse → restore run of all 10 files with the patches and transform below, checking tables, math, fences and stray markers; (g) Unicode inventory.

**Not done:** no real browser was available, so **no visual check in any browser** and no in-browser timing. No R was run. The original PDFs were not consulted and content accuracy was not audited. Topic-to-lecture links (§6.7) rest on the answer files' own headings plus keyword presence in the lecture files, not on an academic review.

---

## 3. Corpus profile

Counts are from the source files; headings/fences are outside code; math is after extraction (`$`/`$$` only).

| File | Lines | KB | H1/H2/H3/H4/H5 | Fences | Tables | Math: total (display) | Role |
|---|---|---|---|---|---|---|---|
| `past_papers_multivariate_questions_only.md` | 1,661 | 78 | 6/10/37/0/0 | 16 | 4 | 392 (20) | Master: all 9 papers, questions only |
| `19_batch_july_2022_answers.md` | 1,692 | 81 | 5/26/59/42/5 | 0 | 5 | 1,223 (153) | Answers, paper 1 |
| `20_batch_august_2023_answers.md` | 1,181 | 66 | 7/37/61/3/0 | 10 | 3 | 809 (55) | Answers, paper 2 |
| `21_batch_2023_in_class_answers.md` | 656 | 32 | 4/15/29/9/0 | 4 | 2 | 438 (33) | Answers, paper 3 |
| `21_batch_january_2024_answers.md` | 1,160 | 57 | 7/30/53/3/0 | 9 | 3 | 710 (46) after patches | Answers, paper 4 |
| `22_batch_december_2024_answers.md` | 1,104 | 60 | 5/42/57/6/0 | 4 | 1 | 568 (37) | Answers, paper 5 |
| `23_batch_2025_quiz_1_answers.md` | 590 | 24 | 4/17/27/5/0 | 1 | 1 | 348 (49) | Answers, paper 6 |
| `23_batch_2025_quiz_2_answers.md` | 783 | 45 | 4/14/33/8/0 | 3 | 3 | 619 (39) | Answers, paper 7 |
| `23_batch_2025_quiz_3_answers.md` | 666 | 36 | 3/11/27/8/0 | 4 | 0 | 443 (20) | Answers, paper 8 |
| `23_batch_october_2025_answers.md` | 1,263 | 83 | 6/48/54/15/0 | 8 | 4 | 653 (38) | Answers, paper 9 |
| **Σ** | 10,756 | 563 | | 59 | 26 | 6,203 | |

Heading counts are outside code fences and match the markdown-it run. Math totals use `$`/`$$` extraction only (Jan 2024 counted after the §5 patches).

**Formatting conventions found**
- **Encoding:** UTF-8, LF, no BOM, no tabs, no NBSP or zero-width characters. **None of the answer files ends with a trailing newline**; the master also lacks one (harmless; do not concatenate files without inserting a newline).
- **Prose non-ASCII:** only `’` (280), `—` (107), `–` (11) and **one stray Devanagari word "तीन"** (§5, I-9). No Greek letters outside math, no emoji.
- **Math:** only `bmatrix` (379), `pmatrix` (198), `cases` (1); commands are standard (`\text`, `\mu`, `\Sigma`, `\frac`, `\bar`, `\tilde`, `\hat`, `\sqrt`, `\left/\right`, `\hline`, …) plus `\vline` (25 uses, unsupported by KaTeX). No non-ASCII inside math; no `\newcommand`, `\tag`, `\label`.
- **Code fences:** 59, all **unlabeled except one** (`r`, Oct 2025 answers line 774). They hold R console output and **ASCII diagrams** (scree plots, factor-structure sketches), longest line 94 characters. Some fences are **indented inside list items** (Aug 2023 answers lines 536–558).
- **Tables:** 26 GFM tables, max 8 columns, all well-formed; 5 are nested inside list items. Many cells contain inline math.
- **Lists/other:** heavily nested bullet and numbered lists (up to 109 nested-list lines per file); ~586 indented `$$` delimiter lines (display math inside list items); blockquotes carry the MCQ answer keys and "key rule" callouts; `---` rules in 6 of the 9 answer files; no raw HTML, links, images, footnotes or task lists.
- **Master emphasis style:** question text is mostly **bold with math interleaved** (`**(a) Find the distribution of** $X_2$**.** `[2 marks]``); sub-parts are bullets (`* **(i)** …`); marks are inline code spans.

---

## 4. Question–answer mapping

### 4.1 Stable ID scheme

All IDs are structural. `{paper}` is the manifest ID from §1.3.

| Item | ID | Example |
|---|---|---|
| Paper | `{paper}` | `b22-final-2024-12` |
| Essay question | `{paper}/q{N}` | `b21-final-2024-01/q3` |
| Part | `{paper}/q{N}/{letter}` | `b21-final-2024-01/q3/g` |
| Sub-part | `{paper}/q{N}/{letter}/{roman}` | `b19-final-2022-07/q1/a/iv` |
| MCQ | `{paper}/mcq{N}` | `b23-final-2025-10/mcq21` |
| Shared context | `{paper}/ctx/{name}` | `b21-final-2024-01/ctx/q3-q4` |
| MCQ group intro | `{paper}/mcqgrp/{first}-{last}` | `b22-final-2024-12/mcqgrp/22-25` |

Quiz 1 labels its questions `Question (1)`; normalize to `q1`. Normalize Roman numerals to lowercase. Never derive an ID from heading text or from position in a list.

### 4.2 Master file grammar (questions)

Inside a paper (after its `## ` heading, outside fences):

| Element | Pattern |
|---|---|
| Essay question | `### Question N` or `### Question (N)` (Quiz 1) |
| Part | paragraph starting `**(x)` (x = a–z) |
| Sub-part | bullet starting `* **(i)**` (roman) |
| MCQ | paragraph starting `**N. ` then options `* (a)`…`* (d)` |
| Marks | `[N mark(s)]` or `(N marks)` (Quiz 1), **anywhere in the part's block** (sometimes on a following continuation line: July 2022 Q1(e)(ii), Jan 2024 Q3(g)) |
| Question total | `` `[Total marks for Question N = T]` `` at the end of the question (absent in Quiz 1) |
| Sections | `### Multiple Choice Questions` / `### Essay Questions` (with marks in the heading); `### Context for Question 3 and Question 4` (Jan 2024) |

Quirks: part marks must be searched across the whole part block, not only the first line (a first-line-only parser misses 3 marks); an unlabeled italic paragraph plus an **italic bullet list of abbreviations** appears before Dec 2024 MCQ 22 and Oct 2025 MCQ 21; those bullets are *not* options.

### 4.3 Answer file grammar

| Element | Pattern |
|---|---|
| Paper header | H1 `# <batch> Batch \| <type> \| <date> \| <course>`; H2 subtitle "Multivariate Methods in Business — Master Beginner Teaching Guide & Complete Worked Solutions" (same in all files) |
| Essay question | H1 `# Question N \`[Total: T Marks]\`` or `# Question (N)` (Quiz 1) |
| Question-level blocks | H2 `Reference Setup from the Question`, H2/H3 `Beginner's Foundation …` / `Beginner's Concept Guide …` (before the first part) |
| Part | H2 `## Part (x): <restated text> \`[m marks]\`` (or `(m marks)`) |
| Sub-part | H3 `### (x)(i) …` or `### Sub-question (x)(i): …` |
| Step headings | H3/H4 (July 2022 also H5) `Step N`, `Step-by-Step Calculation`, `Final Answer for Part (x)`, `Beginner's …` |
| MCQ | H2 `## MCQ N`, then `**Question Reference:**` (italic restatement of the question and options), explanation H3s, and the key `> **Correct Answer for MCQ N:** …` |
| Section containers | H1 `# PART I: MULTIPLE CHOICE QUESTIONS \`[Total: …]\``, H1 `# PART II: ESSAY QUESTIONS \`[Total: …]\`` (Aug 2023, Dec 2024, Oct 2025) |
| Non-question blocks | `# Context for Question 3 and Question 4: The Food-Texture Dataset` (H1, Jan 2024); `## Guide to Research Technique Selection Questions (MCQs 22 – 25)` (Dec 2024); `## Beginner's Master Cheat-Sheet … (MCQs 21 – 30)` (Oct 2025) |

**Slicing rule for answers:** a question block runs from `# Question N` to the next `# Question`, `# PART`, `# Context …` or end of file; a part block runs from `## Part (x)` to the next `## Part`, `# Question`, etc.; a sub-part block runs from its `###` to the next heading of equal or higher level. Trailing `---` rules inside a block are part of it. Anything before the first part (setup, foundation) belongs to the **question**, not to part (a).

### 4.4 Mapping results (checked, not assumed)

For all 9 papers: question numbers, part letters and MCQ numbers are **identical** in master and answers; every part and sub-part marks value that exists on both sides matches; all part marks sum to the question totals, and totals plus MCQ marks equal the paper totals (100, 100, 50, 100, 100, 45, 45, 40, 100).

| Paper | Master Qs | Master parts / subs | MCQs | Answer Qs | Answer parts / subs |
|---|---|---|---|---|---|
| `b19-final-2022-07` | 4 | 22 / 17 | 0 | 4 | 22 / 17 |
| `b20-final-2023-08` | 4 | 22 / 8 | 10 | 4 | 22 / **14** |
| `b21-inclass-2023` | 3 | 12 / 7 | 0 | 3 | 12 / 7 |
| `b21-final-2024-01` | 5 | 26 / 13 | 0 | 5 | 26 / **16** |
| `b22-final-2024-12` | 2 | 13 / 8 | 25 | 2 | 13 / **11** |
| `b23-quiz1-2025` | 3 | 13 / 0 | 0 | 3 | 13 / 0 |
| `b23-quiz2-2025` | 3 | 10 / 8 | 0 | 3 | 10 / 8 |
| `b23-quiz3-2025` | 2 | 8 / 8 | 0 | 2 | 8 / **11** |
| `b23-final-2025-10` | 3 | 10 / 4 | 30 | 3 | 10 / 4 |

**Documented exceptions (the only places the two sides are not 1:1):**

- **E1 – "Repeat" parts get sub-parts only in the answers (15 sub-parts).** Master: one part, e.g. `**(c) Repeat (a) using only the third response** … [5 marks]`; answers: `### (c)(i)`, `(c)(ii)`, `(c)(iii)` with marks 1/2/2 that sum to the part total. Affected: Aug 2023 Q4(b) and Q4(c) (+6), Jan 2024 Q5(c) (+3), Dec 2024 Q2(c) (+3), Quiz 3 Q2(c) (+3). **Rule:** map the answer part to the master part; create the sub-part IDs from the answer side and flag them `derivedFrom: "answer"`. The master text "Repeat (a)/(b)" refers to the sibling part's sub-questions; show that sibling's sub-parts next to it as context only (do not duplicate its text into the repeat part).
- **E2 – missing marks in the master.** July 2022 Q3(c) has no marks in the master; the answer heading says 2 and the part sum requires 2. Use the answer value and flag `marksSource: "answer"`. Quiz 1 question totals (10/10/25) also come from the answer file.
- **E3 – shared context.** Jan 2024 `Context for Question 3 and Question 4` (master `###` before Q3; answers H1 before Q3) applies to Q3 **and** Q4. Model it as `b21-final-2024-01/ctx/q3-q4`, referenced by both questions; render it above Q3 and give Q4 a "Context" link/expander; never duplicate or drop it. It contains R output/tables and a textual description of a biplot (the master states the figure as text; no image exists).
- **E4 – MCQ group intros.** Dec 2024 MCQs 22–25 and Oct 2025 MCQs 21–30 share an italic instruction, an abbreviation list, and (in the answers) a guide/cheat-sheet H2. Model as `mcqgrp` items attached to those MCQs; do not render the abbreviation bullets as options.
- **E5 – section containers differ.** Master uses H3 section headings; answers use H1 `PART I/II` headings. Treat them as presentation containers, not mapping keys; the paper's section marks come from the heading text (e.g. `[20 Marks: 2 marks each]`).
- **E6 – restatements.** Answer files restate the question in `## Part (x): …` headings, `Reference Setup from the Question`, and `Question Reference` (MCQs). The **master is the authoritative question text**; the restatements are part of the answer and must also be kept. Do not use the answer's restatement as the question statement, and do not dedupe.
- **E7 – MCQ answer keys** (§4.5).
- **E8 – no master content without an answer or vice versa** was found: every master question/part/MCQ has an answer block. If a future file breaks this, show "No worked solution in source" instead of inventing one.

### 4.5 MCQ answer keys

Each MCQ has exactly one key line `> **Correct Answer for MCQ N:** …` (Aug 2023: 10; Dec 2024: 25; Oct 2025: 30; no duplicates, none missing, every letter exists in the master's options). The key is **not always a single letter**. Parse into:

~~~json
{"primary":["c"],"alsoAccepted":[],"selectAll":false,"noLetter":false,"raw":"<original blockquote text>"}
~~~

| Paper / MCQ | Situation | How to represent |
|---|---|---|
| Dec 2024 / 6 | `(a)` with "(or (b) …)" | primary `a`, alsoAccepted `b` |
| Dec 2024 / 9 | `(c)` with "(b) is also a valid …" | primary `c`, alsoAccepted `b` |
| Dec 2024 / 19 | master says "(Select all that apply)"; key is `(b)` **AND** `(c)` | `selectAll:true`, primary `b`,`c` |
| Dec 2024 / 23 | **no letter**: the printed options (a)–(d) are a duplicate of Q22/24/25's (CA, CFA, EFA, PCA); the key text is "MMLR … / MANCOVA" and explains the printing typo | `noLetter:true`; show raw; do **not** assign a letter; the master options are reproduced as printed |
| Dec 2024 / 25 | `(c)` with "(d) PCA is also closely related" | primary `c`, alsoAccepted `d` |
| Oct 2025 / 1 | `(b)` with "(d) is also mathematically true" | primary `b`, alsoAccepted `d` |

Always render the original key blockquote verbatim; derive `primary` etc. only for UI affordances (e.g. highlighting an option, self-test mode). In self-test mode, accept `alsoAccepted` letters as "also valid" rather than wrong, and treat `noLetter` as non-gradable.

---

## 5. Rendering readiness: confirmed issues, fixes, and non-issues

All of the following were reproduced by running the files, not assumed. After the fixes the full pipeline in §7.1 converted all 10 files with **0 KaTeX errors, 0 leftover placeholders, 0 stray `$`/`**`**, all 26 tables with consistent cell counts.

**I-1. Garbled display math inside a blockquote — `21_batch_january_2024_answers.md` line 76.**
Source line: `> \$$ > AX \\sim N_q(A\\mu, , A\\Sigma A') > $$`. It was meant to be the display `AX ∼ N_q(Aμ, AΣA')` in the key-rule callout (compare the same callout in the Aug 2023 and Quiz 2 answers). As written, an extractor treats it as `$$` math whose body contains `>` characters, `\\` (line breaks) and `, ,`; KaTeX only warns (`newLineInDisplayMode`) and renders a broken formula. **Patch (exact match, once):**
`> \$$ > AX \\sim N_q(A\\mu, , A\\Sigma A') > $$` → `> $$AX \sim N_q(A\mu, \, A\Sigma A')$$`

**I-2. Prose wrapped in display math — same file, lines 453–455 and 459–461.**
```
   $$
   Gasoline trucks, $i=1$
   $$
```
(and the same with `Diesel trucks, $i=2$`) puts text and a nested `$…$` inside `$$…$$`; KaTeX fails with *"Can't use function '$' in math mode"* (2 errors). **Patch (exact match, each once):** replace the body `Gasoline trucks, $i=1$` by `\text{Gasoline trucks, } i=1` and `Diesel trucks, $i=2$` by `\text{Diesel trucks, } i=2` (keep the `$$` lines and the 3-space indentation). The wording and display layout are preserved.

**I-3. `\vline` is unsupported by KaTeX — 8 display/inline blocks (25 uses).**
Locations: July 2022 answers lines 182, 455; Aug 2023 answers 395, 473 (inline); In-class 2023 answers 224; Jan 2024 answers 190, 273; Dec 2024 answers 771. They partition matrices as `\begin{bmatrix} a & b & \vline & c … \end{bmatrix}` (a vertical-rule column inside a matrix). KaTeX throws *"Undefined control sequence: \vline"*; **MathJax accepts it**. `\hline` inside `bmatrix` already works in KaTeX. **Fix (tested: 8/8 blocks then render):** a build-time transform that, for any `bmatrix`/`pmatrix` containing a `\vline` cell, removes those cells and emits `\left[\begin{array}{cc|c} … \end{array}\right]` (or `\left( … \right)` for `pmatrix`), preserving `\hline` rows. The reference script in §7.1 includes it (`fixVline`). It must assert that the transformed block still renders; do not hand-edit the source.

**I-4. `\[ … \]` is literal text here, not display math (Dec 2024 answers lines 139, 275, 305, 388, 517; Oct 2025 answers 258, 260 — 11 pairs).**
They are escaped brackets in prose and MCQ keys (`\[Johnson & Wichern\]`, `\[sampling adequacy\]`, `\[d\]`). Treating them as display math (as the lecture guide's extractor does) produces a KaTeX error (`&`) and corrupts the text. **Rule for this section:** extract only `$$…$$` and `$…$`; leave `\[`/`\]` to the Markdown parser, which correctly turns them into `[` and `]`. No `\(`…`\)` exists in these files.

**I-5. Display math inside blockquotes and list items.**
(a) Two blockquoted display blocks (Aug 2023 answers 308–310, Quiz 2 answers 132–134) carry a `> ` prefix on each continuation line; if left in the body KaTeX renders a visible `>` before the formula. **Strip `^[ \t]*>[ \t]?` from every continuation line of a display-math body.** (b) ~586 `$$` delimiter lines are indented (display math inside list items): the indentation inside the body is harmless to KaTeX; extraction must not require `$$` at column 0. (c) Fences nested in list items are indented by 3 spaces: dedent the body lines by the fence's indent (Aug 2023 answers 536–558).

**I-6. Placeholder characters decide whether bold works next to math.**
Master and answer text is full of `$X_2$**, given that**`, `$\bar X$**.**`, and `**(a)** $X$`. In CommonMark a `**` run after a character that is not punctuation and before punctuation can only *close* emphasis. `$` is punctuation, so the original text parses as bold; a Private-Use placeholder (U+E000/E001, as used in the lecture reference script) is not punctuation, so bold broke in **6 of 10 files (master 130, Jan 2024 52, Dec 2024 20, Quiz 1 54, Quiz 2 12, Quiz 3 70 stray markers)**. **Use `⟦` + index + `⟧` (U+27E6/27E7, both Unicode punctuation)**: 0 stray markers afterwards. The source contains neither character. (Recommendation for the lecture pipeline too: the lecture files showed 0 stray markers with U+E000/E001, but `⟦⟧` is strictly safer and costs nothing.)

**I-7. Headings are not usable as IDs.**
Within-file duplicates: "Step-by-Step Calculation" ×12 (July 2022), "Beginner's Concept Explained from Scratch" ×22 (Dec 2024) and ×10 (Aug 2023), "Reference Setup from the Question" ×5, "Question 1" ×9 (master). 82 heading slugs occur in more than one file. 62/26/10/30/31/11/18/17/10 headings contain inline math (answers, in file order) and many contain code spans (names of R functions). **Use structural IDs (§4.1) for papers/questions/parts/sub-parts/MCQs; for in-answer steps use `{itemId}#s{n}` (n = ordinal within the block).** Render heading inline math in TOCs/breadcrumbs (KaTeX), but never slug it.

**I-8. JavaScript `String.replace` and `$$`.**
If you apply patches with `src.replace(old, new)` and `new` contains `$$`, JS silently collapses `$$` to `$` (this broke the I-2 patch during testing). Apply patches with `split(old).join(new)` or a replacer function, assert exactly one match, and log each patch.

**I-9. One stray Hindi word — `20_batch_august_2023_answers.md` line 1181:** "…optimal texture across all **तीन** dimensions…" ("three"). It is source content; keep it verbatim (do not silently delete or translate). Add a Devanagari-capable font to the fallback stack (e.g. `"Noto Sans Devanagari", "Nirmala UI", "Kohinoor Devanagari", sans-serif`) so it does not render as tofu offline, and mention it in the build log as a source anomaly for the course owner.

**I-10. Unlabeled fences are R console output or ASCII diagrams, not R code.**
Of 59 fences only one is labeled (`r`, Oct 2025 answers 774; a 1-line `mu = c(0, 0, 0)`). Render unlabeled fences as preformatted text (`white-space:pre`, horizontal scroll, monospace with box/arrow-safe fallbacks); do not syntax-highlight them and do not guess a language. ASCII diagrams (scree plots, factor-structure sketches in Aug 2023 answers 621, 848 and others) rely on exact spacing and ≤ 94-character lines. Optionally highlight the single `r` block, or leave it plain.

**I-11. Tables.**
26 tables, none malformed; no `|` appears inside math or inline code within any table row (an apparent hit in a quick scan was a pairing artifact of `$a$ | $b$` across cell boundaries; the real pipeline renders every table row with the header's column count). Still protect math/code before parsing (the lecture files do contain such rows). Five tables sit inside list items (indented); markdown-it renders them correctly. Wrap tables in a horizontally scrollable container.

**Checked and found clean:** fence balance (59/59 closed); CR/tab/BOM/NBSP/zero-width (none); raw HTML, links, images, footnotes (none); KaTeX/MathJax validity of all other math (see counts above); mark consistency; question/part/MCQ ID agreement.

### 5.1 Tooling recommendation

- **Markdown:** markdown-it 14.1.x, `{html:false, linkify:false, typographer:false, breaks:false}` (same rationale as the lecture guide; the master's bold/italic hard-break style needs `breaks:false`).
- **Math:** KaTeX 0.16.22 pre-rendered at build time, `throwOnError:true`, `trust:false`, `output:'htmlAndMathml'`, `strict:'warn'` during the build (expect zero warnings once I-1 is patched; before it, 3 `newLineInDisplayMode` warnings came from line 76). Embed KaTeX CSS with base64 `woff2` fonts; share this asset with the lecture section (one copy per file).
- **Offline/browser notes:** same constraints as the lecture guide §4.2 (all assets inline; `<meta charset="utf-8">` first; no `fetch()` of local files; regex lookbehind only in the Node build, never in browser code; wrap storage in `try/catch`). Browsers will not behave identically; test the final file in at least one Chromium browser, Firefox and Safari if available and report what was actually tested.

---

## 6. Recommended reading experience (technical content-integration guidance)

The final UI/UX is your decision; the content model below makes each capability straightforward.

### 6.1 Content model

Build one JSON structure per paper at build time:

~~~text
paper { id, meta (from §1), header (master header block HTML), sections[] }
section { kind: "mcq" | "essay", title, marks, items[] }
item (question)   { id, number, stemHtml (from master), marks, total, context[]: ctxIds, parts[] }
part              { id, letter, stemHtml, marks, marksSource, subs[] }
sub               { id, roman, stemHtml, marks, derivedFrom?: "answer" }
item (mcq)        { id, number, stemHtml, options[{letter,html}], group?: groupId, key{...§4.5} }
answer (per item/part/sub) { id, questionLevelBlocks[] (setup/foundation), html, headingsForToc[] }
ctx / mcqgrp      { id, html (master), answerHtml? (answer file), appliesTo[] }
~~~

Keep **master text and answer text in separate fields**: the master HTML is the "question view"; the answer HTML is the "worked solution view". Build both from the same pipeline so counts can be verified.

### 6.2 Browsing and navigation

- Left/top navigation: papers in §1.2 order → (section) → questions → parts/sub-parts; breadcrumbs from IDs. MCQ papers (Aug 2023, Dec 2024, Oct 2025) need an MCQ number strip (1–10, 1–25, 1–30) and an essay strip.
- Part-level deep links: if the page may be hosted where only plain `#name` hashes pass, do not put `/` in the hash; use `#b21-final-2024-01--q3--g` (replace `/` by `--` for the DOM id and hash; keep `/` in data).
- Previous/next question and previous/next part buttons follow the manifest order. A question's "Context" and "Setup" blocks should be reachable from any of its parts.
- Marks and totals in each header come from the source (E2 applies).

### 6.3 Questions vs answers; reveal/hide

- Default view = original question only (master text). A "Show solution" control per **part/sub-part** (and "Show all for this question" / "Show full paper solutions").
- A part's answer block contains: restated heading, `Beginner's …` explanation, steps, and `Final Answer …`. Do not hide anything permanently; if you add a "final answer only" convenience, detect it by heading (`^Final (Answer|Conclusion)`, `Complete Exam Answer`) and also expose the full block one click away.
- Question-level answer blocks (`Reference Setup`, `Beginner's Foundation`) belong to the question's solution area, shown once before the parts.
- For E1 sub-parts (answer-only), the question view shows the master part; the solution view shows the derived sub-parts.
- Long worked solutions: allow collapsing H3/H4 groups (`Step 1…n`) and a sticky mini-TOC; keep everything in the DOM or lazily injected per question, never summarized.
- Print/export-friendly CSS: avoid page breaks inside matrices, ASCII diagrams and tables.

### 6.4 Math, tables and diagrams display

- Display math: `.katex-display{overflow-x:auto}`; matrices inside tables may need a smaller font. `array` column rules from I-3 render as thin vertical lines.
- Wide tables (≤ 8 columns here) in a scroll wrapper; keep header row visible if sticky headers are used.
- ASCII diagrams: preformatted block, no wrapping, `tab-size:4`, a monospace stack with fallbacks; do not reflow.
- No images exist in these files; the Jan 2024 biplot is described in text and must stay as text.

### 6.5 Search and filtering

Index at the **item level** (paper, question, part, sub-part, MCQ), separately for question text and answer text, with fields: `paperId, batch, type, year/dateLabel, course, section, number, letter, marks, hasR(output), hasTable, hasDiagram, topicTags`. Index rendered text plus the TeX source of math (so queries like `Sigma` or `\bar` match). Useful facets: exam type, batch, MCQ/essay, marks range, topic tag, "has R output", "has worked steps". Search results link to the item's structural ID and open it in the question view (and the answer view when the match is in the answer).

### 6.6 Preserving content

- No silent edits: only the 3 logged patches and the `\vline` transform change anything (record both in the build log).
- Keep every paper header, instruction block, mark label, R output, ASCII diagram and callout.
- Keep restatements (E6) and shared contexts (E3, E4) once, linked from every question that uses them.
- Add a small "Content integrity" panel: file name, sha256 (§7.4) and the patch/transform log.

### 6.7 Linking questions to lecture topics (only where reliable)

Use the lecture app's chapter IDs from the lecture guide manifest (`ch01`–`ch11`; link at chapter level; section-level links only if the lecture build exposes the same `chNN--slug` IDs). The mapping below is **question-level** and derived from each answer file's own headings (e.g. "What is Principal Component Analysis (PCA)?", "One-Way MANOVA", "Hotelling's T²") and checked by keyword presence in the lecture files. It is a navigation aid, not an academic claim. **Do not auto-link individual MCQs by keyword without review** (no per-MCQ topic labels exist in the files); link MCQs only at paper-section level or after a manual pass.

| Topic (as named in the answer file) | Questions | Lecture chapters |
|---|---|---|
| Multivariate normal: linear combinations, marginals, independence, conditional, partitions | b19 Q1(a–e); b20 Q1; b21-inclass Q1(b); b21 Jan Q1; b22 Q1; b23-quiz2 Q1 | `ch07` |
| Sampling distributions of x̄, S, (x̄−μ)′… (Wishart, χ², approximate F/T²) | b19 Q1(f); b20 Q1(e); b21-inclass Q1(a); b21 Jan Q1(e); b23-quiz2 Q1(e) | `ch07`, `ch08` |
| Sample S → correlation R; Euclidean vs Mahalanobis distance | b23-quiz1 Q1, Q2 | `ch01`, `ch02` (Mahalanobis/matrix notation appears in both) |
| PCA (covariance/correlation, scree, loadings, biplot) | b19 Q2; b20 Q2; b21-inclass Q2; b21 Jan Q3; b23-quiz1 Q3 | `ch03` (R details: `ch04`) |
| Factor analysis (PC solution, loadings, communalities, rotation, EFA vs CFA) | b19 Q3; b20 Q3; b21-inclass Q3; b21 Jan Q4; b23-quiz2 Q2 | `ch05` (extras: `ch06`) |
| One-sample Hotelling T², Mardia normality test | b23-quiz2 Q3 | `ch08` (Mardia also in `ch07`) |
| Two-sample Hotelling T², assumptions, Box's M | b21 Jan Q2; b23-quiz3 Q1 | `ch09` |
| One-way MANOVA, Wilks' lambda | b19 Q4(a); b23 Oct Q2 | `ch09` |
| Paired comparisons + Hotelling T² | b23 Oct Q1 | `ch08`, `ch09` |
| Linear discriminant analysis | b23 Oct Q3 | `ch09` |
| Multivariate multiple linear regression (Type II MANOVA, nested-model test, prediction) | b20 Q4; b21 Jan Q5; b22 Q2; b23-quiz3 Q2 | `ch10` (R details: `ch11`) |
| **Profile analysis of two independent groups (parallel/coincident profiles)** | b19 Q4(b) | **no matching lecture chapter found** (the terms "parallel profile" and "coincident" do not occur in any of the 11 lecture files; do not link) |

---

## 7. Instructions for the app-building Claude

### 7.1 Reference pipeline (this script was run against all 10 files)

Behavior verified: all 10 files converted; 0 KaTeX errors; 0 leftover placeholders; 0 stray `$`/`**`; tables 4/5/3/2/3/1/1/3/0/4 (26) with consistent cells; fences 16/0/10/4/9/4/1/3/4/8 (59); math 392/1223/809/438/710/568/348/619/443/653 (6,203). It applies the three patches (I-1, I-2), the `\vline` transform (I-3), blockquote-marker stripping (I-5), indented-fence dedent, and `⟦⟧` placeholders (I-6), and treats `\[`/`\]` as literal text (I-4). It does **not** split into papers/questions/parts: do that on the converted token stream or on the source lines using §4.2/§4.3 (the parsers used for the mapping checks matched all counts in §4.4).

~~~~js
const fs=require('fs'),MarkdownIt=require('markdown-it'),katex=require('katex');
const D='/mnt/user-data/uploads/';
const FILES=['past_papers_multivariate_questions_only.md','19_batch_july_2022_answers.md','20_batch_august_2023_answers.md','21_batch_2023_in_class_answers.md','21_batch_january_2024_answers.md','22_batch_december_2024_answers.md','23_batch_2025_quiz_1_answers.md','23_batch_2025_quiz_2_answers.md','23_batch_2025_quiz_3_answers.md','23_batch_october_2025_answers.md'];
const PATCHES={'21_batch_january_2024_answers.md':[
 ["> \\$$ > AX \\\\sim N_q(A\\\\mu, , A\\\\Sigma A') > $$","> $$AX \\sim N_q(A\\mu, \\, A\\Sigma A')$$"],
 ["   $$\n   Gasoline trucks, $i=1$\n   $$","   $$\n   \\text{Gasoline trucks, } i=1\n   $$"],
 ["   $$\n   Diesel trucks, $i=2$\n   $$","   $$\n   \\text{Diesel trucks, } i=2\n   $$"]]};
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const L='\u27E6',R='\u27E7',PH=new RegExp(L+'(\\d+)'+R,'g');
function fixVline(b){return b.replace(/\\begin\{(bmatrix|pmatrix)\}([\s\S]*?)\\end\{\1\}/g,(m,env,inner)=>{
  if(!/\\vline/.test(inner))return m;
  const rows=inner.split(/\\\\(?![a-zA-Z])/).map(r=>r.trim());
  const parsed=rows.map(r=>{let hl='';while(/^\\hline\s*/.test(r)){hl+='\\hline ';r=r.replace(/^\\hline\s*/,'');}return{hl,cells:r.split(/(?<!\\)&/).map(c=>c.trim())};});
  const ref=parsed.find(r=>r.cells.includes('\\vline'));
  let spec='';ref.cells.forEach(c=>{spec+=c==='\\vline'?'|':'c';});
  const out=parsed.map(r=>r.hl+r.cells.filter(c=>c!=='\\vline').join(' & '));
  const [l,rr]=env==='bmatrix'?['\\left[','\\right]']:['\\left(','\\right)'];
  return `${l}\\begin{array}{${spec}} ${out.join(' \\\\ ')} \\end{array}${rr}`;});}
function build(file,opts={}){
  let src=fs.readFileSync(D+file,'utf8').replace(/\r\n?/g,'\n');const log=[];
  for(const [a,b] of (PATCHES[file]||[])){const n=src.split(a).length-1;if(n!==1)throw new Error('patch miss '+file+' '+a.slice(0,30)+' n='+n);src=src.split(a).join(b);log.push('patch');}
  const store=[];const put=o=>(store.push(o),L+(store.length-1)+R);
  const lines=src.split('\n'),out=[];
  for(let i=0;i<lines.length;){const m=lines[i].match(/^(\s*)(`{3,}|~{3,})\s*([^\s`]*)\s*$/);
    if(m){const ind=m[1].length;const close=new RegExp('^\\s*'+m[2][0]+'{'+m[2].length+',}\\s*$');let j=i+1;const body=[];
      while(j<lines.length&&!close.test(lines[j]))body.push(lines[j++].replace(new RegExp('^ {0,'+ind+'}'),''));
      if(j>=lines.length)throw new Error('unclosed fence '+(i+1));
      out.push(m[1]+put({k:'fence',v:body.join('\n'),lang:m[3]||'text'}));i=j+1;}else out.push(lines[i++]);}
  src=out.join('\n');
  src=src.replace(/(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/g,(m,t,b)=>put({k:'code',v:b.replace(/^ (.*) $/,'$1')}));
  const stripBq=(m,b)=>{ // remove blockquote markers on continuation lines of display math
    const body=b.split('\n').map((l,i)=>i===0?l:l.replace(/^[ \t]*>[ \t]?/,'')).join('\n');return put({k:'math',v:body,disp:true});};
  src=src.replace(/\$\$([\s\S]+?)\$\$/g,stripBq).replace(/(?<![\\$])\$((?:\\[\s\S]|[^$\\\n])+?)\$/g,(m,b)=>put({k:'math',v:b,disp:false}));
  const md=new MarkdownIt({html:false,linkify:false,typographer:false});
  const toc=[];
  md.core.ruler.push('toc',st=>{for(let i=0;i<st.tokens.length;i++)if(st.tokens[i].type==='heading_open')toc.push(+st.tokens[i].tag[1]);});
  md.renderer.rules.table_open=(t,i,o)=>'<div class="table-wrap">'+md.renderer.renderToken(t,i,o);md.renderer.rules.table_close=()=>'</table></div>';
  let html=md.render(src);let errs=[],nm=0;
  html=html.replace(PH,(_,n)=>{const s=store[+n];
    if(s.k==='fence')return '<pre class="code"><code>'+esc(s.v)+'</code></pre>';
    if(s.k==='code')return '<code>'+esc(s.v)+'</code>';
    nm++;let body=fixVline(s.v);try{return katex.renderToString(body,{displayMode:s.disp,throwOnError:true,strict:'ignore'});}catch(e){errs.push(e.message.slice(0,90));return '<span class=err>'+esc(s.v)+'</span>';}});
  return {html,errs,nm,toc,fences:store.filter(s=>s.k==='fence').length,left:(html.match(PH)||[]).length,store};
}
module.exports={build,FILES};
if(require.main===module){
  for(const f of FILES){
    const r=build(f);const h=[1,2,3,4,5,6].map(n=>r.toc.filter(x=>x===n).length);
    const tables=(r.html.match(/<table>/g)||[]).length;
    // cells per row consistency
    let badrows=0;for(const t of r.html.matchAll(/<table>([\s\S]*?)<\/table>/g)){const rows=[...t[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(m=>(m[1].match(/<t[dh][ >]/g)||[]).length);if(new Set(rows).size>1)badrows++;}
    const stripped=r.html.replace(/<span class="katex[\s\S]*?<\/span><\/span><\/span>/g,'').replace(/<pre[\s\S]*?<\/pre>/g,'').replace(/<code>[\s\S]*?<\/code>/g,'').replace(/<[^>]+>/g,' ');
    const stray=(stripped.match(/\$|\*\*|\\\(|(^|\s)_\w/g)||[]).length;
    console.log(f.slice(0,40).padEnd(42),'h',h.join('/'),'fences',r.fences,'tables',tables,'inconsistent tables',badrows,'math',r.nm,'errs',r.errs.length,'leftover',r.left,'stray',stray,r.errs[0]||'');
  }
}
~~~~

### 7.2 Splitting into items

- **Master:** locate each paper by its `## ` heading text (`masterH2`), then split at `### Question …`, `### Multiple Choice Questions`, `### Essay Questions`, `### Context …`. Within a question, detect parts/sub-parts on the *parsed* output (a paragraph whose first inline is a bold `(x)` / a list item starting with bold `(i)`) so that math/placeholder handling stays consistent. MCQs: bold-led paragraph beginning `N. ` followed by the option list; attach any italic instruction paragraph and abbreviation list that precede MCQ 22 (Dec 2024) / 21 (Oct 2025) to the group intro (E4), not to a question.
- **Answers:** split by §4.3's slicing rule. Parse marks from headings; parse MCQ keys from the key blockquote.
- After splitting, **assert** the §7.4 counts and that the concatenation of all blocks of a file covers every source line (no gaps, no duplicates) except the patched lines.

### 7.3 Do / don't

Do: convert at build time; keep both patch logs; assert counts; use structural IDs; keep master and answers separate; render raw MCQ keys; keep the ASCII diagrams and R output verbatim.
Don't: slug headings for IDs; apply `\[…\]` as math; use Private-Use placeholders; drop "Reference Setup" or context blocks; invent dates, letters, marks or solutions; pick an MCQ letter for Dec 2024 MCQ 23; highlight unlabeled fences as R; concatenate files without a newline.

### 7.4 Acceptance tests

Per file, after conversion the following must hold (all values measured with the §7.1 pipeline).

| File | Headings H1/H2/H3/H4/H5 | Fences | Tables | Math (display) | Questions / MCQs | Parts / subs (source side) |
|---|---|---|---|---|---|---|
| master | 6/10/37/0/0 | 16 | 4 | 392 (20) | 4,4,3,5,2,3,3,2,3 essay / 10, 25, 30 MCQ | 22+22+12+26+13+13+10+8+10 = 136 / 17+8+7+13+8+0+8+8+4 = 73 |
| July 2022 ans | 5/26/59/42/5 | 0 | 5 | 1,223 | 4 / 0 | 22 / 17 |
| Aug 2023 ans | 7/37/61/3/0 | 10 | 3 | 809 | 4 / 10 | 22 / 14 |
| In-class 2023 ans | 4/15/29/9/0 | 4 | 2 | 438 | 3 / 0 | 12 / 7 |
| Jan 2024 ans | 7/30/53/3/0 | 9 | 3 | 710 | 5 / 0 | 26 / 16 |
| Dec 2024 ans | 5/42/57/6/0 | 4 | 1 | 568 | 2 / 25 | 13 / 11 |
| Quiz 1 ans | 4/17/27/5/0 | 1 | 1 | 348 | 3 / 0 | 13 / 0 |
| Quiz 2 ans | 4/14/33/8/0 | 3 | 3 | 619 | 3 / 0 | 10 / 8 |
| Quiz 3 ans | 3/11/27/8/0 | 4 | 0 | 443 | 2 / 0 | 8 / 11 |
| Oct 2025 ans | 6/48/54/15/0 | 8 | 4 | 653 | 3 / 30 | 10 / 4 |

Also assert: marks per question sum to the stated totals and totals plus MCQs equal 100/100/50/100/100/45/45/40/100; every MCQ has exactly one key; every master question/part/MCQ has an answer block (E1 adds the 15 derived sub-parts, E2 the July 2022 Q3(c) mark); no duplicate IDs; no KaTeX errors; no `\[`/`\(` delimiters left in output prose other than rendered literal brackets; the three patches each matched exactly once.

Source integrity (SHA-256 of the files this guide was written against; first 16 hex chars; compute the full hash in the build and compare):

| File | sha256 (first 16 hex) | Bytes |
|---|---|---|
| `past_papers_multivariate_questions_only.md` | `889f4a794a02841d` | 79,675 |
| `19_batch_july_2022_answers.md` | `7cf5a40ff27c1cd1` | 83,126 |
| `20_batch_august_2023_answers.md` | `08cd525cc08a8368` | 67,861 |
| `21_batch_2023_in_class_answers.md` | `f118b3c58fa9bcb5` | 32,705 |
| `21_batch_january_2024_answers.md` | `6c244f41cf8ec81a` | 58,395 |
| `22_batch_december_2024_answers.md` | `179c980f191755b8` | 61,023 |
| `23_batch_2025_quiz_1_answers.md` | `e2a66ec00642d8ee` | 25,016 |
| `23_batch_2025_quiz_2_answers.md` | `4cfd45c4bc548d30` | 46,488 |
| `23_batch_2025_quiz_3_answers.md` | `485b471bba93dc9b` | 36,858 |
| `23_batch_october_2025_answers.md` | `ad045d2e5005c2a2` | 85,061 |

If a hash differs, the files changed after this guide was written; re-check the patch targets (I-1, I-2) and counts before trusting this guide.

---

## 8. File-by-file integration map

**`past_papers_multivariate_questions_only.md` (master).** Role: all questions for all 9 papers, 1,661 lines. H1 per batch (`# 1. 19 BATCH (JULY 2022)` … `# 5. 23 BATCH (2025 / OCTOBER 2025)`), H2 per paper, H3 per question/section; leading front matter (title, "Questions Only" H2, plain-list table of contents). Math `$`/`$$` only (392 expressions), bold-with-math emphasis (I-6), 16 unlabeled fences (R output), 4 tables. Mapping: authoritative question text; marks inline; Quiz 1 lacks totals; July 2022 Q3(c) lacks marks; Jan 2024 contains the Q3/Q4 context block; Dec 2024 / Oct 2025 contain MCQ group intros. Issues: none requiring a patch; needs I-5/I-6 handling.

**`19_batch_july_2022_answers.md`.** Final, DA3420. 4 questions × 25; **no fences, no MCQs**; deepest heading nesting (H4 ×42, H5 ×5 in the MANOVA/profile-analysis steps); 1,223 math expressions incl. 2 `\vline` blocks (lines 182, 455); 5 tables (1 indented); Q4(b) profile analysis has no lecture match. Mapping: Q1(e)(ii) mark is 4; Q3(c) mark 2 (E2). Issues: I-3.

**`20_batch_august_2023_answers.md`.** Final, DA3420. 10 MCQs (H2 `MCQ N`, key blockquote) + 4 essays (H1 `PART I`/`PART II` containers). 10 unlabeled fences including 2 ASCII diagrams (scree plot line 621, factor structure line 848) and R output; nested indented fences (lines 536–558); blockquoted display math (line 308); Q4(b)/(c) with answer-only sub-parts (E1); stray Hindi word (line 1181). Issues: I-3 (lines 395, 473 — one is inline), I-5, I-9, I-10.

**`21_batch_2023_in_class_answers.md`.** In-class exam, DA2451, 50 marks. 3 questions (15/20/15); Q3(c) factor-structure sketch in a fence; table with math cells (lines 622–628); 1 `\vline` block (line 224). Issues: I-3.

**`21_batch_january_2024_answers.md`.** Final, DA2451. 5 questions × 20; **the file with 3 patches**; shared context H1 (line 507) for Q3/Q4 (E3); biplot described in text (master) and read in the answers; Q5(c) answer-only sub-parts (E1); 2 `\vline` blocks (190, 273). No `---` rules. Issues: I-1, I-2, I-3, I-7.

**`22_batch_december_2024_answers.md`.** Final, DA2451. 25 MCQs (H2 `MCQ N`; group guide H2 before MCQ 22) + 2 essay questions (25 each). 5 literal `\[…\]` lines (I-4); 5 MCQs with multi-letter or no-letter keys (§4.5); Q2(c) answer-only sub-parts (E1); `\vline` at line 771; the key for MCQ 23 explains an exam printing typo. Issues: I-3, I-4.

**`23_batch_2025_quiz_1_answers.md`.** Quiz 1, 45 marks. `Question (N)` heading style and `(N marks)` marks style; questions S→R, distances, PCA from `eigen(R)` output; 1 fence (R output), 1 table. Master has no question totals: take 10/10/25 from this file. No `---`. Issues: none beyond I-6.

**`23_batch_2025_quiz_2_answers.md`.** Quiz 2, 45 marks (20/15/10). MVN (blockquoted display math line 132), factor analysis (R output table, sketch in a fence), one-sample Hotelling T² and Mardia (table with math and code cells lines 583–589). Issues: I-5.

**`23_batch_2025_quiz_3_answers.md`.** Quiz 3, 40 marks (20/20). Two-sample Hotelling T² with Box's M and Mardia tests; MMLR; **no tables**; Q2(c) answer-only sub-parts (E1). No `---`. Issues: none beyond I-6.

**`23_batch_october_2025_answers.md`.** Final, DA2451. 30 MCQs (group cheat-sheet H2 before MCQ 21) + 3 essays (10/10/20: paired Hotelling T², MANOVA table, LDA output). 2 literal `\[…\]` lines (258, 260); one 1-line `r` fence (line 774); MCQ 1 has a primary + "also true" key. Issues: I-4.

---

## 9. Residual risks and things not verified

- No visual or timing check in any browser; the CSS and layout advice is untested.
- KaTeX vs MathJax output equivalence was not compared; MathJax accepts everything in these files (including `\vline`) and KaTeX accepts everything after the fixes.
- The lecture-linking table is topic-level and keyword-checked; it has not been reviewed academically.
- The mapping assumes the file set as supplied; if a paper is added, re-run the diff and acceptance tests.
- Source anomalies kept as-is and reported: the stray Hindi word (I-9), the Dec 2024 printed-options typo (MCQ 23), and the three malformed spans patched in the build (I-1, I-2).
