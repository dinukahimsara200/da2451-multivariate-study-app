# DA2451 Predicted Questions: HTML Integration Guide

**Audience:** the Claude instance that builds the offline single-file DA2451 Study App.
**Inputs you will have:** this guide + the four original prediction files (unmodified).
**Scope:** the *Predicted Questions* section only (80 MCQs + 30 essays). Question-only revision material: **no answers, no grading**.
**Companion to:** `DA2451_Practice_Questions_HTML_Integration_Guide.md` (referred to below as the *Practice Guide*) and `DA2451_Lecture_HTML_Integration_Guide.md`. Generic Markdown/KaTeX/offline requirements are **not repeated** here; this guide records only what is different or new for these four files.

---

## 0. Verdict and the rules that matter most

**Verdict: the four files are clean and easy to convert.** All fences are balanced, all 110 question IDs are present, sequential and unique, every MCQ has exactly four single-line options (A–D), every essay's part marks add up to its declared total, and all 1,033 math expressions render with **0 KaTeX errors and 0 strict warnings**. There are **no source patches required** (unlike PQ01 in the Practice Guide). The difficulty is not rendering; it is (a) parsing four *different* authoring dialects into one data model, (b) keeping the section strictly answer-free, and (c) generating faithful AI prompts.

Rules, in priority order:

1. **No answers, ever.** Nothing in the data model, DOM, CSS classes, ARIA text or storage may represent "correct", "wrong", "score" or "answer key". Selecting an MCQ option must look and sound neutral (§5).
2. **Use the source IDs verbatim** (`C-MCQ-001`, `G-ESS-015`, …). They are globally unique and already encode generator and type (§3).
3. **Keep each question's raw Markdown block** (`sourceMd`) alongside any parsed structure. Rendering uses the parse; **Copy AI Prompt uses `sourceMd`** so the prompt is character-faithful (§6).
4. **Parse four dialects, not one** (§2.3). Option syntax, mark notation, titles, topic schemes and disclaimer placement all differ.
5. **Protect-then-parse, exactly as in the Practice Guide** (code → `$$` → `$`), with one new reason: Gemini MCQs put `$` inside inline code (`pca_out$x`) (§7.2).
6. **Never delete, merge, renumber, rewrite or "correct" a question.** Overlap between the two generators is topical, not duplication (§9).
7. **Show the unofficial-content notice once, prominently**, then keep per-question markers small (§8).
8. **Everything works offline**: clipboard copy needs a fallback chain (§6.5).

---

## 1. Verified source inventory

All figures below were computed from the actual files. Encoding for all four: UTF-8, LF line endings, no BOM, no tabs, no raw HTML, no images, no footnotes, no reference-style links, no external URLs.

| # | Filename (exact case) | Generator (see §1.1) | Type | Questions | ID range | Lines | Bytes | sha256 (first 16) |
|---|---|---|---|---|---|---|---|---|
| 1 | `DA2451_ChatGPT_Predicted_MCQs.md` | ChatGPT | MCQ | 40 | `C-MCQ-001`…`C-MCQ-040` | 358 | 19,386 | `8d2a4ebf3d8307b4` |
| 2 | `DA2451_ChatGPT_Predicted_Essays.md` | ChatGPT | Essay | 15 | `C-ESS-001`…`C-ESS-015` | 469 | 27,659 | `ff7c7395bc447b30` |
| 3 | `da2451_predicted_multiple_choice_questions.md` | Gemini | MCQ | 40 | `G-MCQ-001`…`G-MCQ-040` | 316 | 25,105 | `11b4d83a6184b2a6` |
| 4 | `da2451_predicted_essay_questions.md` | Gemini | Essay | 15 | `G-ESS-001`…`G-ESS-015` | 669 | 40,705 | `c3b66596d1a8e7f1` |

Totals: **110 questions** (80 MCQ, 30 essay), ~113 KB of Markdown. Compute full SHA-256 in the build and fail on mismatch.

### 1.1 Provenance: how generator attribution is known

No file contains the words "ChatGPT" or "Gemini" in its text. Attribution comes from two things that agree: the **ID prefix** (`C-` / `G-`) and the user's description of the four files. Files 3 and 4 have lowercase, generator-less filenames, so **do not infer the generator from the filename**; derive it from the ID prefix and store it as an explicit field (`generator: "chatgpt" | "gemini"`). Mapping used throughout this guide: `C-` = ChatGPT, `G-` = Gemini.

### 1.2 Heading structure

| File | H1 | H2 | H3 | Notes |
|---|---|---|---|---|
| ChatGPT MCQs | 1 (file title, line 5) | 10 (`Topic N – …`) | 40 (bare ID) | disclaimer is a 3-line blockquote **before** the H1 |
| ChatGPT Essays | 1 (file title, line 5) | 4 (`Section I–IV – …`) | 15 (`ID – Title (N marks)`) | same blockquote disclaimer |
| Gemini MCQs | 1 (**the disclaimer itself**, line 1) | 8 (`Topic N: …`) | 40 (bare ID) | 8 `---` rules between topics |
| Gemini Essays | 1 (**the disclaimer itself**, line 1) | 15 (`Topic N: …`) | 15 (bare ID) | 15 `---` rules (one right after the disclaimer, then one between consecutive topics; none after the last question) |

Consequences: the Gemini H1 is **not a title**; do not use it as the file title, and do not let a generic "H1 = document title" rule treat the disclaimer as a worksheet name. ChatGPT H1 is a real title but carries no ID.

---

## 2. Authoring dialects and parsing rules

### 2.1 Question boundaries (all four files)

A question block is: **from its `### <ID>` heading line to the line before the next `### ` or `## ` heading (or EOF)**, then **trim trailing blank lines and trailing `---` rules**. IDs match `^### ([CG]-(?:MCQ|ESS)-\d{3})`. Two traps:

- The last question under each topic is followed by `## Topic …` (all files) and, in Gemini files, by a `---` line. A parser that ends a block only at the next `###` will wrongly append the next topic heading to the last question of every topic (this affects every topic transition: 9 in ChatGPT MCQs, 7 in Gemini MCQs, 3 in ChatGPT essays, 14 in Gemini essays).
- Essay blocks contain `$$` display math, tables and fences; **do not split on blank lines**, and ignore `###`/`##` look-alikes inside fences (none exist, but guard anyway).

### 2.2 MCQ dialects

| | ChatGPT MCQs | Gemini MCQs |
|---|---|---|
| Heading | `### C-MCQ-001` | `### G-MCQ-001` |
| Option line | `- **A.** text` | `* A. text` |
| Option regex | `^- \*\*([A-D])\.\*\* (.+)$` | `^\* ([A-D])\. (.+)$` |
| Stem | between heading and first option | same |
| Options per question | exactly 4 (A, B, C, D, in order) in 40/40 | exactly 4 in 40/40 |
| Blank line before options | yes (stem, blank, list) | **no** (list directly follows the stem line) |
| Option continuation lines | none | none |
| Display math in stem | C-MCQ-028 (5 stem lines), C-MCQ-032 (4 lines) | none (0 `$$` in the file) |
| Multi-line stem | the two above | G-MCQ-019 (3 lines; single newlines inside one paragraph) |
| Inline code | none | 16 spans, in G-MCQ-016, 021, 035, 036 (stems *and options*) |
| Longest block | 701 chars (C-MCQ-040) | 983 chars (G-MCQ-003) |

Parsing guidance:

- Parse options **by line pattern**, not by letting a Markdown list renderer decide, because the two lists use different markers and Gemini's has no blank line before it. Store `{letter, md}` per option, where `md` is the text after the marker, **unmodified**.
- Validate: exactly four options, letters A–D in order, no text between options. 80/80 pass. If a future file violates this, fail the build rather than guess.
- Stem = everything from the line after the heading up to (not including) the first option line, with surrounding blank lines trimmed. Keep internal newlines (needed for `$$` and for the prompt).
- **Options never refer to other options** (searched for "all/none of the above" and "A and B"-style references; none found), so showing options in source order or re-ordering them would both be safe; **recommended: keep source order** and never shuffle, because the prompt and the user's memory of the question rely on letters.
- Options are short; many are pure math (`$4\times4$`) or inline matrices (Gemini has 14 inline `bmatrix` in stems/options). Render them as inline math inside an option row; let long options wrap (`overflow-wrap:anywhere` on the text, scroll container on `.katex` wider than the row; see Practice Guide P-4).

### 2.3 Essay dialects

| | ChatGPT Essays | Gemini Essays |
|---|---|---|
| Heading | `### C-ESS-001 – Title (20 marks)` | `### G-ESS-001` (**no title, no marks in heading**) |
| Total marks | in heading: `(20 marks)` | in a closing line: `` `[Total marks for G-ESS-001 = 20]` `` (inline code) |
| Part label | paragraph starting `**(a)** …` | paragraph starting `**(a)** …` (and G-ESS-015: `**(a) Investigation 1:** …`) |
| Part marks | trailing `**[5 marks]**` (bold) | trailing `` `[5 marks]` `` (inline code) |
| Sub-parts | none | roman bullets: `* **(i)** … \`[2 marks]\`` under a lettered part |
| Parts per question | 5 (13 essays), 4 (C-ESS-014), 6 (C-ESS-015) | 3–6; see §2.5 |
| Scenario text before part (a) | yes | yes (often with `*` bullets defining variables) |
| Marks per question | 20 or 25 | 16, 18 or 20 |
| Tables | 4 essays (§2.6) | 1 essay (G-ESS-012) |
| Fences | 2 (`text` tag) | 8 (**no language tag**) |

Parsing guidance:

- **Part detection:** a line matching `^\*\*\(([a-h])\)` at column 0 (outside fences) starts a lettered part; it ends at the next lettered part, at the Gemini `Total marks` line, or at block end. Lines such as `(i)` roman sub-parts are **inside** their lettered part: `^\* \*\*\((i{1,3}|iv|v)\)\*\*`. Do not treat `(i)` as the letter "i" (no essay has a part (i)).
- Everything before the first lettered part is the **scenario** (data, tables, fences, display math, variable bullets). It belongs to the question as a whole and must be shown above all parts and included in the prompt.
- Display math (`$$ … $$`) can sit **inside a part** (ChatGPT, e.g. C-ESS-013 part (b)) or in the scenario; it does not terminate a part.
- Keep marks text visible exactly as written; parse numbers only for badges and for the checks in §11. **Do not recompute or "fix" marks.**
- The ID string appears **inside** every Gemini essay body (the `Total marks for G-ESS-0NN` line). A full-text search for an ID therefore matches that question's own total line; harmless, but do not treat it as a cross-reference (there are **no cross-question references** in any file; see §2.7).

### 2.4 Separators and trailing material

- ChatGPT files: no `---` rules; the block simply ends at the next heading.
- Gemini MCQs: a `---` precedes each `## Topic` (8 total, the first right after the disclaimer). Gemini essays: 15 `---` rules, each *after* a question's total line and before the next topic. Strip them from question blocks (they are separators, not content).
- Gemini files have **no trailing newline** at EOF; ChatGPT files do. Parse robustly.
- Front matter lines 6–7 of both ChatGPT files end with two spaces (hard breaks); use `breaks:false` so they render as `<br>` only there.

### 2.5 Per-essay inventory (verified)

Marks check: declared total = sum of per-part marks in **all 30** essays (checked arithmetically from the text; this says nothing about academic soundness).

**ChatGPT essays** (`## Section` → questions; title and marks from heading)

| ID | Title | Marks | Parts | Special content |
|---|---|---|---|---|
| C-ESS-001 | Designing and Interpreting a Multivariate Retail Audit | 20 | a–e | 5-store table (header+5 rows), 1 display eq |
| C-ESS-002 | Centering as a Geometric Matrix Operation | 20 | a–e | 2 display eq |
| C-ESS-003 | PCA Reconstruction and an Unusual Observation | 20 | a–e | 2 display eq |
| C-ESS-004 | PCR, Validation and Interpretable Predictions | 20 | a–e | table (header+3 rows), 2 display eq |
| C-ESS-005 | Auditing Regression Diagnostics Rather Than Deleting Cases | 20 | a–e | `text` fence (11 lines, widest 76) with *hypothetical* diagnostics |
| C-ESS-006 | Reproducing Relationships from a Common-Factor Model | 20 | a–e | 1 display eq |
| C-ESS-007 | LDA Priors, Business Losses and a Test Confusion Matrix | 25 | a–e | table (2 data rows), 2 display eq |
| C-ESS-008 | Correlation-Sensitive Anomaly Screening | 20 | a–e | 2 display eq |
| C-ESS-009 | Reconciling Marginal and Joint Normality Evidence | 20 | a–e | table (7 data rows; inline math in cells) |
| C-ESS-010 | A Mean-Vector Test and a Simultaneous Business Contrast | 25 | a–e | 4 display eq |
| C-ESS-011 | Why Pairing Changes Multivariate Inference | 25 | a–e | 3 display eq |
| C-ESS-012 | MANOVA Beyond an Overall Rejection | 20 | a–e | 2 display eq |
| C-ESS-013 | Joint Predictor Inference in Multivariate Regression | 25 | a–e | `text` fence (3 lines), 2 display eq |
| C-ESS-014 | Selecting and Sequencing Methods for a Business Study | 20 | a–d | prose only |
| C-ESS-015 | Statistical Quality Control of a Multivariate Report | 25 | a–f | prose only |

Sections: I = C-ESS-001–004; II = 005–007; III = 008–011; IV = 012–015.

**Gemini essays** (`## Topic N` ↔ `G-ESS-00N`, one essay per topic)

| ID | Topic heading (abridged) | Marks | Parts | Special content |
|---|---|---|---|---|
| G-ESS-001 | Sample Geometry, Matrix Algebra & Distance Metrics | 20 | a–d | 3-var bullets, 1 display eq (4×3 data matrix) |
| G-ESS-002 | Multivariate Normal Distribution & Partitioned Vectors | 20 | a–c | (a) has roman (i)–(iii); 1 display eq |
| G-ESS-003 | Multivariate Normality Diagnostics, Outliers & Transformations | 16 | a–d | fence (22 lines, **widest 101 chars**) |
| G-ESS-004 | PCA: Covariance vs. Correlation | 20 | a–d | prose + inline math |
| G-ESS-005 | PCA: R Output & Index Construction | 20 | a–d | fence (11 lines); roman ×3 |
| G-ESS-006 | PCR & Model Evaluation | 20 | a–e | fence (29 lines) |
| G-ESS-007 | Regression Diagnostics & Influential Observations | 16 | a–d | fence (11 lines); roman ×2 |
| G-ESS-008 | FA: Principal Component Extraction & Matrix Reproduction | 20 | a–d | 5 display eq; roman ×2 |
| G-ESS-009 | EFA vs. CFA & R Output Interpretation | 20 | a–e | fence (24 lines) |
| G-ESS-010 | One-Sample & Paired Hotelling's $T^2$ | 18 | a–d | 3 display eq; **math in topic heading** |
| G-ESS-011 | Two-Sample Hotelling's $T^2$, Assumptions & Profile Analysis | 20 | a–c | fence (6 lines); roman ×3; 3 display eq; **math in topic heading** |
| G-ESS-012 | One-Way MANOVA & Multivariate Test Statistics | 20 | a–f | table (header+3 rows; cells hold inline `bmatrix` and `$?$` placeholders for unknown values); 2 display eq |
| G-ESS-013 | LDA: Classification & Confusion Matrix | 20 | a–e | fence (29 lines); roman ×2 |
| G-ESS-014 | MMLR | 20 | a–e | fence (**55 lines**); roman ×2 |
| G-ESS-015 | Integrated Multivariate Method Selection & Analytical Design | 20 | a–d (`**(a) Investigation 1:** …`) | 4 investigations + bullet instructions; 4×5 marks |

(Fence "lines" are body lines; Gemini fences are 8 untagged blocks in 003, 005, 006, 007, 009, 011, 013, 014.)

### 2.6 Tables and fences

- **Tables (30 rows total):** ChatGPT C-ESS-001 (7 rows), 004 (5), 007 (4), 009 (9); Gemini G-ESS-012 (5). Alignment colons (`:--|--:`) are used. **Table cells contain inline math** (ChatGPT essay header row at line 16 and test-result rows at lines 261–263; Gemini essay matrix cells at lines 462–464). A scan of every table row found **no `|` characters inside math or code**, so the Practice Guide P-3 hazard does not occur in these files; still extract math before the table parser (cheap insurance, and cells contain `&` and `\\` from `bmatrix`). G-ESS-012's table deliberately contains unknown entries written as `$?$` / `? & ?` matrices: these are part of the question and must be shown and prompted exactly as written. Wrap each table in a horizontal-scroll container.
- **Fences:** 2 in ChatGPT essays (`text`), 8 in Gemini essays (no tag). Treat **untagged as `text`: never syntax-highlight them as R**, though they look like R console output/summary tables. They contain **no `$`**, no non-ASCII characters; widest line 101 characters. They are *supplied question data* and **must go into the AI prompt verbatim** (§6).

### 2.7 Cross-references and shared data

None. Searched for "question N", "same data", "previous/earlier question" and ID mentions: the only ID mentions are each Gemini essay's own total line. Words like "above"/"below" (ChatGPT 4×, Gemini 7×) refer to material inside the same block. **Every question is self-contained**, so each can be copied, bookmarked and prompted in isolation. The ChatGPT essay file does say "All information needed for numerical work is supplied below" and labels some numerical output *hypothetical* (7 mentions); preserve those words.

### 2.8 File-level instruction blocks (matter for prompts)

| File | Block | Text (summary of what it adds) |
|---|---|---|
| ChatGPT MCQs | `**Part A:** 40 original multiple-choice questions` + `**Instructions:**` | "Choose the single best answer… Unless otherwise specified, matrices have real entries and sample standard deviations are positive." |
| ChatGPT Essays | `**Part B:** 15 original structured essay questions` + `**Instructions:**` | "Answer every subpart… Show relevant mathematical steps… state assumptions… All information needed for numerical work is supplied below. Numerical outputs labeled *hypothetical*… Marks indicate relative depth." |
| Gemini MCQs / Essays | none beyond the disclaimer | |

The two ChatGPT instruction paragraphs change how questions should be read (e.g. the real-entries/positive-SD assumption). **Store them as `fileInstructions` (verbatim) and inject them into the AI prompt for every question of that file** (§6.3). Also show them once at the top of the corresponding section view. Gemini questions get no such text; do not invent one.

---

## 3. Data model and stable IDs

Use the source IDs. Do not invent new numbering and do not renumber after any filtering.

~~~jsonc
{
  "id": "C-MCQ-017",                  // verbatim from source heading; primary key everywhere
  "kind": "mcq" | "essay",
  "generator": "chatgpt" | "gemini",  // from ID prefix (C-/G-)
  "sourceFile": "DA2451_ChatGPT_Predicted_MCQs.md",
  "sourceSha256": "…",                // full hash of that file
  "sourceLine": 164,                  // heading line (orientation only)
  "seq": 17,                          // numeric part of the ID
  "sourceTopic": "Topic 4 – Principal Components Regression",   // heading text, unmodified
  "sourceTopicIndex": 4,
  "title": "…",                       // ChatGPT essays only (from heading); else null
  "totalMarks": 20,                   // essays only; parsed, never recomputed
  "sourceMd": "…",                    // trimmed block WITHOUT the ### heading line (stem/options/parts/tables/fences verbatim)
  "stemMd": "…",                      // MCQ only
  "options": [{"letter":"A","md":"…"}, …],           // MCQ only, source order
  "scenarioMd": "…",                  // essay: text before part (a)
  "parts": [{"label":"a","md":"…","marks":5,"subparts":[{"label":"i","md":"…","marks":2}]}],
  "fileInstructions": "…",            // ChatGPT files only (verbatim), else null
  "family": "pca"                     // optional app-level tag (§4.3), separate from sourceTopic
}
~~~

Derived IDs (ASCII letters, digits, hyphens only, so they are valid plain `#name` hash fragments in the single-file app):

| Thing | Pattern | Example |
|---|---|---|
| Question | source ID | `C-MCQ-017`, `G-ESS-002` |
| MCQ option | `<id>-<letter>` | `C-MCQ-017-B` |
| Essay part | `<id>-<letter>` | `C-ESS-005-b` |
| Essay sub-part | `<id>-<letter>-<roman>` | `G-ESS-002-a-ii` |
| Source topic group | `<generator>-<kind>-t<n>` | `G-MCQ-t6` (ChatGPT essay sections: `C-ESS-s<I..IV>` → `C-ESS-sII`) |

IDs are collision-free with the Practice Guide's `PQ0N-…` scheme and the lecture IDs. Use them as keys for bookmarks, progress and search results. **Never use array index or slug as a key**: the Gemini essay heading has no title to slug, and topic text contains math.

### 3.1 Source topic maps (verified)

**ChatGPT MCQs (10 topics, 40 Q):** T1 Multivariate Data, Measurement and Study Design 001–004 · T2 Matrix Algebra and Sample Geometry 005–009 · T3 Principal Component Analysis 010–013 · T4 Principal Components Regression 014–015 · T5 Regression Diagnostics 016–018 · T6 Factor Analysis 019–022 · T7 Linear Discriminant Analysis 023–026 · T8 Multivariate Normality and Diagnostics 027–030 · T9 Multivariate Inference and MANOVA 031–036 · T10 Multivariate Multiple Linear Regression 037–040.

**Gemini MCQs (8 topics, 40 Q):** T1 Introduction to Multivariate Analysis, Sample Geometry & Matrix Algebra 001–006 · T2 Multivariate Normal Distribution & Normality Diagnostics 007–012 · T3 Principal Component Analysis (PCA) 013–017 · T4 Principal Components Regression (PCR) & Regression Diagnostics 018–023 · T5 Exploratory & Confirmatory Factor Analysis (FA) 024–028 · T6 Inference on Multivariate Data (Hotelling's $T^2$, MANOVA, Profile Analysis) 029–032 · T7 Linear Discriminant Analysis (LDA) & Classification 033–036 · T8 Multivariate Multiple Linear Regression (MMLR) & Method Selection 037–040.

**ChatGPT essays:** 4 sections only (§2.5); no per-question topic in the source.
**Gemini essays:** 15 topics, one per essay (§2.5).

---

## 4. Navigation, filtering and topics

### 4.1 Sections

Two separate top-level views: **Predicted MCQs** (80) and **Predicted Essays** (30). Inside each, a **source filter** (All / ChatGPT / Gemini), defaulting to All. Show generator as a **text label plus shape/icon** ("ChatGPT", "Gemini"), not colour alone. Order within All: ChatGPT block first then Gemini (file order), or interleave by topic family; do **not** renumber.

### 4.2 Source topics are not comparable across files

Four different topic schemes (10 / 4 / 8 / 15 groups) cover overlapping content with different boundaries (e.g. Gemini folds regression diagnostics into the PCR topic; ChatGPT separates them; ChatGPT has a "Measurement and Study Design" topic Gemini lacks; Gemini has "EFA/CFA" where ChatGPT says "Factor Analysis"). Therefore:

- **Always show the source topic exactly as written** (render its inline math, e.g. Hotelling's $T^2$) on each question.
- Offer a "Browse by source" grouping (faithful to each file) in addition to any cross-file filter.
- Do **not** silently merge or rename source topics.

### 4.3 Optional cross-file topic *family* filter (app-assigned metadata)

The user asked for filtering "when supported by source metadata". The only source metadata are the topic headings (and ChatGPT-essay titles/sections). If a combined filter is wanted, use a small, editable, clearly separate `family` field, assigned **from the heading text only**:

| Family | ChatGPT MCQ topics | Gemini MCQ topics | Gemini essay topics |
|---|---|---|---|
| Data, matrices & sample geometry | T1, T2 | T1 | 1 |
| Multivariate normal & diagnostics | T8 | T2 | 2, 3 |
| PCA | T3 | T3 | 4, 5 |
| PCR & regression diagnostics | T4, T5 | T4 | 6, 7 |
| Factor analysis | T6 | T5 | 8, 9 |
| Hotelling's T², MANOVA & inference | T9 | T6 | 10, 11, 12 |
| Discriminant analysis | T7 | T7 | 13 |
| Multivariate regression & method selection | T10 | T8 | 14, 15 |

ChatGPT essays have no per-question topic; a title-based family assignment is possible (001–002 data/matrices; 003 PCA; 004 PCR; 005 regression diagnostics; 006 factor analysis; 007 LDA; 008–009 normality/diagnostics; 010–012 inference/MANOVA; 013 multivariate regression; 014 method selection; 015 ambiguous: "Statistical Quality Control of a Multivariate Report", decide or leave as "Integrated/other"). **Mark these as app-assigned and unverified; they are navigation aids, not source facts.** Lecture-chapter links can hang off `family` using the lecture guide's chapter manifest. Do not claim these map to examinable weighting.

### 4.4 Search

Index per question: ID, generator, source topic (raw text), essay title, `sourceMd` (raw, math as TeX), and part/option text. Search must find math-free keywords ("Wilks", "Hotelling", "Mahalanobis") and ID fragments ("MCQ-017", "G-ESS"). Show results with rendered math or plain-text snippets; link by question ID.

### 4.5 Navigation, bookmarks, progress

- **Question navigator:** a compact grid/list of IDs (previous/next, jump by ID, keyboard shortcuts), filterable by generator/topic/status/bookmark. Hash route `#C-MCQ-017`, `#G-ESS-002-a` (plain names only).
- **Bookmarks** keyed by question ID; **status** per question is *user-set study state*, not correctness: `not started / attempted / reviewed with AI / revisit`. Optionally an MCQ "my pick" (§5). Store in `localStorage` inside `try/catch` with an in-memory fallback (works on `file://` in some browsers only; say so in the UI if storage is unavailable).
- **Progress** = counts of statuses ("23 of 80 MCQs attempted"). **Never** show percentages-correct, streaks of correct answers, or leaderboards.
- Offer export/import of progress as plain JSON text (copy/paste) only if wanted; it must contain IDs and states only.

---

## 5. No-answers and no-grading requirements

The Predicted section is **question-only**. The source files contain no answer keys, solutions, explanations, rationale, tick marks or "correct answer" markers (searched; the only hits for "solution" are the factor-analysis phrases "two-factor EFA solution" (ChatGPT MCQ file, line 183) and "m-factor solution" (Gemini MCQ file, line 203), both inside question text). Therefore:

1. **Do not add** `correct`, `answer`, `isCorrect`, `explanation`, `score` fields or functions anywhere in data or code.
2. **MCQ interaction is a neutral "my pick".** Allow the student to mark an option as *their own working choice*. Visual treatment: same highlight for any option, no green/red, no check or cross icons, no "Submit", "Check", "Correct", "Wrong", no animation implying a verdict. Suggested label: "My pick (not checked)". Provide a clear/reset control. Screen-reader text must say "selected as my pick", never "correct".
3. **No score, grade, percentage or summary of right/wrong**, including in progress widgets, export or search.
4. **No "reveal answer" button.** If a button area is needed, the primary action is **Copy AI Prompt** (§6), with a one-line hint: "Ask your AI assistant for the full worked solution."
5. **Essays:** no answer boxes that imply marking; an optional free-text "My notes" field (stored locally) is fine, clearly labelled as personal notes.
6. **Do not state or imply** that any option is likely correct, that the questions were verified, or that the marks are examiner-approved.
7. Selecting a "my pick" must never change the AI prompt by default (do not bias the AI). If you add an opt-in checkbox "Include my pick in the prompt", default **off**, and word it as "My tentative choice, please check my reasoning".

---

## 6. Copy AI Prompt (required on all 110 questions)

### 6.1 Requirements

- A **Copy AI Prompt** button on **every** MCQ and essay card (110 buttons; assert in tests). Same label everywhere; accessible name includes the ID ("Copy AI Prompt for C-MCQ-017").
- The prompt is assembled **at click time from stored raw data**, fully **offline**: no network, no API, no account, no `fetch`.
- The prompt must contain the **actual question, all four options (MCQ) or the scenario and every part/sub-part (essay), any table, fenced data, display equations, and the statistical notation exactly as written** (raw Markdown + LaTeX, *not* rendered HTML).
- Preserve fidelity: the question text inside the prompt must be the **verbatim `sourceMd`** (plus the heading line information as metadata). Test with `prompt.includes(sourceMd)` for all 110.
- Include provenance and caveats so the receiving AI treats it correctly: unofficial AI-generated, unverified, no answer key, may contain errors.

### 6.2 MCQ template

Replace `{{…}}` fields; keep the wording. Everything between `<question>` tags is the verbatim question. Use plain text (no HTML).

~~~text
I am a university student studying DA2451 Multivariate Methods in Business. Please act as a patient, expert tutor in multivariate statistics. I may be starting from absolute zero.

IMPORTANT CONTEXT
- The question below is an unofficial practice question generated by an AI ({{generatorName}}). It is NOT an official exam question, has NOT been checked by a lecturer or any person, and comes WITHOUT an official answer key.
- It may contain mistakes, ambiguities, unusual assumptions or missing information. If you find any, say so clearly instead of silently fixing or inventing things.
{{#fileInstructions}}- Instructions that came with this question set: {{fileInstructions}}
{{/fileInstructions}}
QUESTION ID: {{id}}
SOURCE TOPIC: {{sourceTopic}}
QUESTION TYPE: Multiple choice (single best answer)

<question>
{{sourceMd}}
</question>

WHAT I NEED FROM YOU
1. Explain what the question is asking in simple language, starting from absolute zero. Do not assume I remember any prior material.
2. Teach every statistical and mathematical foundation needed to answer it (definitions, intuition, why it matters), building up step by step.
3. Work through the question step by step. Explain every formula and every symbol, state the assumptions being used, and show each calculation clearly (do not skip arithmetic).
4. Where it helps, show how the same result can be produced in R (short, commented code), and explain what the output means.
5. Identify the best answer among the options and explain why it is the best. Then explain why EACH of the other options is incorrect or less suitable.
6. Interpret the final result in plain, understandable language, including what it means for a business decision where relevant.
7. Be honest about uncertainty. If the question is ambiguous, if more than one option is defensible, if no option is correct, if the numbers do not work out, or if information is missing, say so and explain your reasoning rather than inventing facts or forcing an answer.
8. Format your answer with clear headings, LaTeX for mathematics, and a short "what to remember" summary at the end.
~~~

### 6.3 Essay template

~~~text
I am a university student studying DA2451 Multivariate Methods in Business. Please act as a patient, expert tutor in multivariate statistics. I may be starting from absolute zero.

IMPORTANT CONTEXT
- The question below is an unofficial practice essay question generated by an AI ({{generatorName}}). It is NOT an official exam question, has NOT been checked by a lecturer or any person, and comes WITHOUT a model answer or marking scheme.
- It may contain mistakes, ambiguities, unusual assumptions or missing information. If you find any, say so clearly instead of silently fixing or inventing things. Marks shown (if any) only indicate relative depth.
{{#fileInstructions}}- Instructions that came with this question set: {{fileInstructions}}
{{/fileInstructions}}
QUESTION ID: {{id}}{{#title}}
TITLE: {{title}}{{/title}}
SOURCE TOPIC: {{sourceTopic}}
QUESTION TYPE: Structured essay with {{partCount}} part(s){{#totalMarks}}, total {{totalMarks}} marks{{/totalMarks}}

<question>
{{sourceMd}}
</question>

WHAT I NEED FROM YOU
1. Explain the whole scenario and what is being asked in simple language, starting from absolute zero.
2. Teach all the statistical and mathematical foundations needed, step by step, before using them.
3. Solve EVERY part and sub-part in order, labelled exactly as in the question ({{partLabels}}). Show every step, explain every formula, symbol, assumption and calculation, and use the data given in the question.
4. Demonstrate the relevant R code where appropriate (short, commented), and explain how to read the output.
5. For each part, interpret the result in understandable language and in the business context of the question. For discussion parts, give a structured exam-style answer and say what a good answer should contain.
6. Respect the supplied numbers, tables and output exactly. Do not replace them with different data. If something is inconsistent, ambiguous or missing, point it out and state your assumption explicitly instead of inventing information.
7. Be honest about uncertainty and about anything you cannot determine from the information given.
8. Format your answer with clear headings per part, LaTeX for mathematics, and a short summary of the key ideas and common mistakes at the end.
~~~

### 6.4 Assembly rules

- `generatorName`: "ChatGPT" or "Gemini" (from `generator`).
- `sourceMd`: the trimmed block **without** the `###` heading line (the ID and title are given separately). For ChatGPT essays the heading's `(20 marks)` is carried by `totalMarks`; if you prefer the heading to be inside `<question>`, include the full heading line verbatim; either is fine as long as it is consistent and tested.
- If `sourceMd` contains a run of backticks that could break your delimiter, the `<question>`/`</question>` tags are chosen *because* they do not conflict with fences; do **not** wrap the question in a Markdown fence.
- Use `\n` newlines; no trailing spaces added; no HTML entities; do not convert LaTeX to Unicode; do not "tidy" numbers.
- `partLabels`: e.g. `(a), (b), (c), (d), (e)`; for Gemini roman sub-parts: `(a)(i)–(iii), (b), (c)`.
- Omit the `{{#fileInstructions}}` line for Gemini questions.
- Optional MCQ add-on (opt-in only, default off): "My tentative choice is {{letter}}; please check my reasoning." (§5, item 7)
- Do **not** add a hint, a guess or any answer to the prompt.

### 6.5 Offline copy mechanics

`navigator.clipboard.writeText` needs a secure context and permission, and `file://` handling differs by browser (**not tested here**). Use a fallback chain and tell the student what happened:

1. `navigator.clipboard.writeText(prompt)` if `window.isSecureContext && navigator.clipboard`.
2. Else hidden `<textarea>` + `document.execCommand('copy')` (select, copy, remove).
3. Else open a modal with the prompt in a read-only `<textarea>`, auto-selected, with the instruction "Select all and copy (Ctrl/Cmd+C)".

Show a polite live-region confirmation ("Prompt copied. Paste it into your AI assistant."), not just a colour change. Prompts are short enough for any clipboard (source average ≈ 1.8 KB per ChatGPT essay and 2.7 KB per Gemini essay block, plus ~1.8 KB of template). Do not open external AI sites or links automatically (offline requirement, and the student chooses their own assistant).

---

## 7. Rendering specifics (deltas from the Practice Guide)

Reuse the Practice Guide's pipeline and CSS (protect code → `$$` → `$`; markdown-it with `html:false`; KaTeX pinned; scroll containers for tables/display math/code). Differences for these files:

### 7.1 Math inventory (all KaTeX-tested)

| File | Expressions | Display | Inline | Environments | Notable commands |
|---|---|---|---|---|---|
| ChatGPT MCQs | 136 | 2 | 134 | `bmatrix` ×1 | `\mathsf` ×24 (e.g. `X^{\mathsf T}`), `\times`, `\operatorname`, `\mid` |
| ChatGPT Essays | 168 | 23 | 145 | `bmatrix` ×21, `array` ×1 (with `\hline`) | `\mathsf`, `\qquad`, `\widehat`, `\varepsilon`, `\Lambda`, `\Psi`, `\log`, `\mathrm`, `\text` |
| Gemini MCQs | 377 | 0 | 377 | `bmatrix` ×14 (inline) | `\hat`, `\mu`, `\lambda`, `\text`, `\arccos`, `\ln`, `\circ`, `\psi` |
| Gemini Essays | 352 | 15 | 337 | `bmatrix` ×26 | `\text` (32), `\bar`, `\tilde`, `\tau`, `\chi`, `\dots`, `\ge` |

Rendered with KaTeX 0.16.47, `throwOnError:true`, strict callback: **0 errors, 0 warnings, 0 stray `$`, 0 `\$`**. No `\(…\)`/`\[…\]` delimiters, no custom macros, no non-ASCII inside math. (Not run: a full browser render; only Node-side KaTeX.) Notation to preserve exactly: `\mathsf T` for transpose in ChatGPT files vs prime `'` in Gemini files (both appear; do **not** unify them: unifying would be a content rewrite and the prompt must keep the original).

Equation sizes: **Gemini MCQ options are inline math**, including inline `bmatrix` (e.g. G-MCQ-003). On narrow screens these can exceed the row: give each option text `min-width:0; overflow-wrap:anywhere` and let `.katex` scroll horizontally inside the option if needed (cf. Practice Guide P-4: an unwrappable inline equation can create page-level horizontal scroll).

### 7.2 `$` inside inline code (Gemini MCQs)

`pca_out$x`, `pca_out$rotation`, `pca_out$scores`, `pca_out$loadings`, `pca_out$sdev`, `pca_out$center` appear in **G-MCQ-016** (stem and all four options); other code spans are in G-MCQ-021, 035, 036 (`prcomp()`, `lda()`, `LD1`, `Proportion of trace: LD1 = 0.912, LD2 = 0.088`). The protect-first pipeline handles this **only if inline code is extracted before inline math**. A reordered pipeline would pair the `$` signs in `pca_out$scores … pca_out$loadings` into bogus math. Render them as `<code>`, and keep them raw (with `$`) in the prompt.

### 7.3 Marks and labels in inline code (Gemini Essays)

144 inline-code spans, of which 71 are `` `[N marks]` `` and 15 are `` `[Total marks for G-ESS-0NN = N]` ``; the rest are `PC1`, `WH_1`, `LD1`-style identifiers. Render mark spans as a muted **marks badge** (still containing the same text), not as monospace code that looks like R. Keep the exact characters. ChatGPT marks are `**[5 marks]**` bold text.

### 7.4 Tables

Five tables (30 rows including header and separator rows). Header alignment markers are present; cells contain inline math (including inline `bmatrix` in G-ESS-012): extract math **before** the table parser. Wrap in `.table-wrap` (scroll). ChatGPT essay line 16 is the C-ESS-001 header row (math in header cells).

### 7.5 Fences

Render as `<pre>` with `white-space:pre; overflow-x:auto`, monospace, no highlighting, with an accessible label "Supplied output (hypothetical data)" **only for ChatGPT's** (which says *hypothetical* in the question text); for Gemini's untagged fences use neutral "Supplied output/data". Do not wrap long lines (alignment is meaningful); copy button optional.

### 7.6 Headings containing math

`## Topic 6: … (Hotelling's $T^2$, MANOVA, Profile Analysis)` (Gemini MCQ), `## Topic 10: One-Sample & Paired Hotelling's $T^2$ Inference` and `## Topic 11: Two-Sample Hotelling's $T^2$, …` (Gemini essays). Render topic labels as inline HTML (KaTeX) in navigation, filters, breadcrumbs and search results; store the raw heading as the key.

### 7.7 Soft line breaks

Gemini MCQ stems and essay scenarios contain single newlines inside paragraphs (e.g. G-MCQ-019). With `breaks:false` they render as spaces, which matches standard Markdown meaning. Do not turn them into `<br>`.

---

## 8. Notices, creator note and attribution

### 8.1 Required notice (recommended wording and placement)

Show **once**, at the top of the Predicted Questions landing/section header (collapsible; remembered per device with guarded `localStorage`; always re-openable via a small "About these questions" link). Do not repeat it as a paragraph on every card.

> **Unofficial practice predictions.** These questions are unofficial, AI-generated practice predictions. They are not actual examination questions, lecturer-approved materials, leaked questions, or guaranteed predictions. Use them to practise unfamiliar problems, not to guess the exam.

Creator note (use **verbatim**, directly under or beside the notice, once):

> Dinuka Himsara has exhausted his available ChatGPT, Gemini, and Claude usage while preparing these study resources and is now thoroughly stressed! 😅 For detailed solutions to predicted questions, please use the Copy AI Prompt button and ask your own preferred AI assistant.

Additional, lightweight touches (no extra paragraphs):

- A small chip on every card: "Unofficial · AI-generated" (text, with accessible name), linking to the notice.
- One short line near the Copy AI Prompt button: "No answers are included: the prompt asks your AI assistant to teach and solve it."
- Make sure the 😅 emoji renders (UTF-8 `<meta charset>`; system emoji font is fine).
- Show the **source files' own disclaimer** only in an expandable "Source file header" under About (it says the material is original, not copied from past exams, and not lecturer-endorsed). Do **not** present its claim "not copied from past examinations" as verified.

### 8.2 AI attribution (two distinct things)

Show a small credits panel (About / footer) that separates **question generation** from **resource and app preparation**. Reproduce the tool names exactly as the creator supplied them (spelling "Agron" included; confirm with the creator):

| Role | Tool | Applies to |
|---|---|---|
| Predicted-question generation | **ChatGPT Plus, GPT-6 High** | the 55 questions with `C-` IDs (40 MCQ + 15 essay) |
| Predicted-question generation | **Gemini Pro, Agron High** | the 55 questions with `G-` IDs (40 MCQ + 15 essay) |
| Preparation of the wider study resources and app development | **Claude Sonnet 5.5 Medium** | the app and other study materials; **not** the source of any predicted question |

Rules: per-question badges say only **ChatGPT** or **Gemini** (never "Claude"); the credits panel states that no predicted question here was generated by Claude; the Claude acknowledgement belongs with the broader app/resource credits shared with the other sections, not on question cards.

---

## 9. Duplicates and cross-generator overlap

Method (verified, with limits): for the 1,600 ChatGPT×Gemini MCQ pairs and 225 essay pairs, compared word sets (words > 3 characters, math removed) with Jaccard similarity; also checked exact-body equality; also within-file maxima.

- **Exact duplicates: 0.** No two question bodies are identical, within or across files.
- **Closest cross-generator pairs (Jaccard ≤ 0.35):** `C-MCQ-035` ↔ `G-MCQ-031` (both: one-way MANOVA, Wilks' lambda from diagonal SSCP matrices; different numbers and wording), `C-MCQ-032` ↔ `G-MCQ-029` (both: one-sample Hotelling T² → exact F; different n, p, T²). Also flagged by similarity but **not reviewed manually**: `C-MCQ-021`/`G-MCQ-026`, `C-MCQ-019`/`G-MCQ-025`, `C-MCQ-020`/`G-MCQ-024`, `C-MCQ-008`/`G-MCQ-006`, `C-MCQ-023`/`G-MCQ-034`.
- **Essays:** highest cross-generator similarity is below 0.20 (lower than the MCQ maxima); the two generators wrote on the same topics with different scenarios, data and parts. Within-file maximum similarity: ChatGPT MCQ 0.22, ChatGPT essays 0.20, Gemini MCQ 0.25, Gemini essays 0.19.
- **Limits:** math was stripped, so questions that differ only in wording but share the same numbers/matrices could be under-detected. This is a screening, not a proof; it says nothing about correctness.

**Conclusion: these are topic overlaps, not duplicates. Do not deduplicate.** The same concept tested twice (different numbers) is useful revision.

If the creator later wants dedup or "related questions":
1. Never edit, drop or renumber source questions; keep all four files and every ID.
2. Add a **sidecar** `relations.json` such as `{"C-MCQ-035":{"related":["G-MCQ-031"],"kind":"same-concept"}}`, rendered as a "Related question" link, hidden from lists only if the user switches on "hide near-duplicates".
3. The decision rule must be a documented, human-reviewed list, not an automatic similarity threshold.

---

## 10. Source inconsistencies that affect integration

| # | Inconsistency | Effect | Handling |
|---|---|---|---|
| 1 | Gemini H1 is the disclaimer; ChatGPT H1 is the file title and the disclaimer is a blockquote before it | "H1 = title" logic breaks; blockquote could be rendered as part of a question | Parse by explicit line patterns; keep disclaimer as file header, not a question |
| 2 | Option syntax differs (`- **A.**` vs `* A.`), and Gemini has no blank line before options | one Markdown list renderer will style them differently or merge with the stem | Parse options to structured data (§2.2) |
| 3 | Marks notation: bold `**[5 marks]**` vs code `` `[5 marks]` ``; total in heading vs closing code line | inconsistent badges | Normalise **display** only; keep source text in `sourceMd` |
| 4 | ChatGPT essays have titles, Gemini essays none | cards/search differ | `title` nullable; use `sourceTopic` + ID for Gemini |
| 5 | Topic schemes differ (10 / 4 / 8 / 15) | no common filter in the source | §4.2–4.3 |
| 6 | Gemini mark totals vary (16, 18, 20); ChatGPT 20/25 | not comparable; "marks indicate relative depth" only for ChatGPT | show per question, do not aggregate |
| 7 | Transpose notation: `\mathsf T` (ChatGPT) vs `'` (Gemini) | looks inconsistent to students | preserve; optionally add a one-line notation note in About |
| 8 | Separators `---` in Gemini only | stray rules or block bleed | strip at block boundaries (§2.4) |
| 9 | Gemini files lack trailing newline; lowercase filenames; no generator in filename | parser/attribution pitfalls | §1.1, §2.4 |
| 10 | Only ChatGPT files carry `Part A/Part B` and an instruction paragraph | prompt context differs | `fileInstructions` field (§2.8) |
| 11 | `G-ESS-015` uses `**(a) Investigation 1:**` (label includes words) | strict `**(a)**` regex misses closing `**` position | regex `^\*\*\(([a-h])\)` only |
| 12 | Untagged (Gemini) vs `text`-tagged (ChatGPT) fences | highlighting temptation | never highlight (§7.5) |
| 13 | ChatGPT essays say "All information needed… is supplied below" but some numbers are "hypothetical" | wording must be preserved | do not rewrite |

None of these is an error that must be patched; all are handled in the parser.

---

## 11. Implementation recommendations

- **Build-time processing (Node):** read the four files, verify SHA-256, parse into the §3 model, pre-render HTML per question with the Practice Guide's pipeline, embed one JSON blob (`<script type="application/json">`, escape `<`, U+2028/9). Total source is only ~113 KB, so pre-rendered HTML will be small (not measured here); no virtualisation is needed. Render lazily per question card or per topic group; keep first paint fast by rendering only the visible section. Do **not** build prompts at build time; assemble on click (small, always fresh, no 110× duplication of text in the file) from `sourceMd` + metadata.
- **Do not store both rendered HTML and raw Markdown twice unnecessarily**: HTML for display, `sourceMd` for prompt/search.
- **Accessibility:** MCQ options as a `role="radiogroup"` with `aria-label` = question ID; each option a `role="radio"`; keyboard (arrow keys, Space); visible focus ring; announce "selected as my pick". Essays: heading hierarchy (section → question → parts as an ordered structure); marks badges with text "5 marks". Buttons are real `<button>`s with descriptive names. Colour never the sole signal (generator, status, bookmark all have text/icons). Respect `prefers-reduced-motion`; contrast AA in light and dark.
- **Responsive:** one-column cards on mobile; tables/fences/display math in own scroll containers; sticky bottom action row (Copy AI Prompt, bookmark, status) on mobile; question navigator as a bottom sheet.
- **Offline:** no `fetch`, no CDN, KaTeX CSS and woff2 fonts inlined (Practice Guide §4.2). No analytics. `localStorage` guarded.
- **Edge cases to handle:** (1) hash targeting a question not yet rendered, render it first; (2) filtering that yields zero results, show a clear empty state with reset; (3) an MCQ selected "my pick" then filter hides it, keep state; (4) very long inline matrices in options, scroll within option; (5) Copy fallback paths (§6.5); (6) a user with storage disabled; (7) printing: show all four options, hide buttons, keep the unofficial chip; (8) the creator note must render emoji correctly; (9) IDs in the search box in lower case (`c-mcq-017`), normalise case for matching only.
- **Preserve:** every question, option, part, sub-part, table, fence, equation and marks annotation, verbatim.

---

## 12. Validation checklist (assert in the build; fail on any mismatch)

**Source integrity**
- [ ] SHA-256 of each file equals the recorded value (first 16 hex in §1).
- [ ] 110 question IDs: `C-MCQ-001..040`, `C-ESS-001..015`, `G-MCQ-001..040`, `G-ESS-001..015`, each exactly once, sequential, no gaps; heading counts H3 = 40 / 15 / 40 / 15.
- [ ] Topic groups: ChatGPT MCQ 10 (§3.1 ranges), ChatGPT essays 4 sections, Gemini MCQ 8, Gemini essays 15.
- [ ] No question block contains a `## ` heading or a trailing `---` after trimming.

**MCQ**
- [ ] 80/80 have exactly four options A–D in order; no extra lines between options; ChatGPT regex used on `C-`, Gemini regex on `G-`.
- [ ] Stems: C-MCQ-028 and C-MCQ-032 contain `$$` display; G-MCQ-019 has a 3-line stem; all stems non-empty.
- [ ] No data field or DOM node containing `correct`, `answer`, `score`, `grade` (grep the built output; allow only the words inside question text).

**Essay**
- [ ] 30 essays; part counts: ChatGPT 5 ×13, 4 ×1 (014), 6 ×1 (015); Gemini per §2.5 (a–d: 001, 003, 004, 005, 007, 008, 010, 015; a–c: 002, 011; a–e: 006, 009, 013, 014; a–f: 012).
- [ ] Gemini roman sub-parts: G-ESS-002 (a) i–iii; 005 ×3; 007 ×2; 008 ×2; 011 ×3; 013 ×2; 014 ×2.
- [ ] Declared marks equal the sum of part marks for all 30 (ChatGPT 20 or 25; Gemini 16/18/20 as listed).
- [ ] Tables: 5 (C-ESS-001, 004, 007, 009; G-ESS-012), 30 rows, every row has the header's cell count.
- [ ] Fences: 2 (C-ESS-005, 013) + 8 (G-ESS-003, 005, 006, 007, 009, 011, 013, 014); contents byte-identical to source; not highlighted.

**Math**
- [ ] 1,033 expressions: 136 / 168 / 377 / 352 (ChatGPT MCQ / ChatGPT essay / Gemini MCQ / Gemini essay); display 2 / 23 / 0 / 15; 0 KaTeX errors, 0 warnings.
- [ ] No leftover placeholders; no `$` visible in prose; `pca_out$x`-style code spans intact in G-MCQ-016.
- [ ] No rendered display math starts with a stray `>` (Practice Guide P-2; no blockquote math here, but assert).

**Prompts**
- [ ] 110 Copy AI Prompt buttons present, one per question ID.
- [ ] For all 110: `buildPrompt(q).includes(q.sourceMd.trim())`; MCQ prompts contain all four option lines; essay prompts contain every part label (and sub-part labels) and any fence/table text from the scenario.
- [ ] ChatGPT-file prompts include `fileInstructions`; Gemini prompts do not.
- [ ] Prompts contain no answers/hints and make no network request (no `fetch`/XHR in code path).
- [ ] Clipboard fallback chain works when `navigator.clipboard` is unavailable (simulate).

**UX/notice**
- [ ] Notice shown once per section view, creator note verbatim (including 😅), per-card "Unofficial · AI-generated" chip present, no repeated paragraphs.
- [ ] Credits: ChatGPT Plus GPT-6 High and Gemini Pro Agron High attributed to question generation; Claude Sonnet 5.5 Medium acknowledged for resources/app only; no question card says "Claude".
- [ ] MCQ "my pick" uses identical styling for all options and neutral wording; no score or correctness anywhere.
- [ ] Original source files untouched; no question removed, renumbered or reworded.

---

## 13. What was and was not verified

**Verified by scripts on the actual files:** encodings and line endings; heading structure; ID sequences and uniqueness; option structure of all 80 MCQs; part/sub-part structure, marks arithmetic, tables and fences of all 30 essays; math delimiter inventory and KaTeX 0.16.47 rendering of all 1,033 expressions (Node, strict callback); absence of answer-key markers; self-contained questions (no cross-references); word-set similarity screening between generators.

**Not verified / not done:** rendering in any browser (no HTML was built from these four files); markdown-it output for these files specifically (same pipeline as the Practice Guide, whose behaviour was tested there); clipboard behaviour on `file://` in any browser; MathJax; academic correctness, answerability or difficulty of any question; whether Gemini's/ChatGPT's questions match any real exam; the exact model names (reproduced as supplied); the manual review of similarity pairs other than the two named in §9.

*No answers, solutions, explanations or new questions were created for this guide, and none of the four source files were modified.*
