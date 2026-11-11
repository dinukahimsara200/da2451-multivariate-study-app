# DA2451 Multivariate Methods in Business
## Master Plan for the Offline HTML Study App

**Document status:** Final consolidated development specification (9 November 2026; revise only when requirements change)  
**Prepared for:** Claude or Google Antigravity as the final development environment  
**Creator credit:** Made by Dinuka Himsara  
**Target deliverable:** One polished, self-contained, completely offline `.html` file  
**Exam:** Wednesday, 18 November 2026, 9:00 AM–12:00 PM, Sri Lanka Standard Time (UTC+05:30)

---

## 1. The Mission

Build a beautiful, fast, exceptionally usable study companion for **DA2451 – Multivariate Methods in Business**, using the prepared lecture teaching chapters, historical past papers with answers, practice worksheets with teaching explanations, and original AI-predicted questions.

The app must be **a single standalone HTML file** that students can open locally in a modern browser without a server, login, CDN, internet connection, or installation. Prioritize speed, accuracy of rendered educational content, intuitive navigation, responsive layouts, and an understated premium visual experience.

**Design authority:** The latest revised `Design skills for html app study.md` is the primary visual/design reference. Follow it thoughtfully rather than creating a generic dashboard. Use generous negative space, excellent typography and clear hierarchy. Favor restrained motion and clear functionality over decoration. The implementation agent has freedom to make sensible UX decisions within the requirements below.

**Hard content exclusion:** Do **not** create learning sections, practice libraries, or dedicated navigation for **Principal Components Regression (PCR), Regression Diagnostics, or Linear Discriminant Analysis (LDA)**. If those topics occur in predicted-question files, omit those particular questions from the displayed prediction collection and record the omissions in a development audit. Do not silently edit the original source files. Incidental references in otherwise relevant source material need not be rewritten.

---

## 2. Critical Developer Workflow: Guide First, Not Manual File-by-File Reading

**Do not spend the beginning of the project reading every teaching `.md` document individually.** The specialized HTML integration guides were prepared precisely to avoid that expensive, repetitive discovery process.

1. **At initial planning**, read only this Master Plan, `Design skills for html app study.md`, and the available integration guides for relevant sections. Read the file tree or inventory to identify the source files; do not manually inspect all their full contents up front.
2. **At the start of each section's implementation**, consult its integration guide for documented structure, mappings, math syntax, rendering hazards and recommended parsing rules. Do not reread unrelated guides unnecessarily.
3. **During actual content integration**, programmatically ingest **all relevant original Markdown files** for that section so their complete content is embedded in the app. The integration guides are implementation instructions, **not substitutes for the source content**.
4. Prefer one reusable preprocessing/import pipeline over individually hand-copying or manually rewriting documents. Read source contents in bulk through scripts/tools, parse them deterministically, and generate a single HTML bundle.
5. Inspect individual source passages only when an automated check, guide, or rendering test identifies an ambiguity. Never invent missing content or silently discard source text.
6. Where a guide does not yet exist, build a narrowly scoped automatic inspector for that section rather than blocking the entire project or exhaustively reading unrelated material.

**Important distinction:** The development agent should not have to *manually review* every Markdown file at the planning stage; the **final application must still include the full original content** of every in-scope source document. Do not rely on guide summaries as actual chapter or answer content.

### Available reference documents

| Reference | Purpose | Status |
|---|---|---|
| `Design skills for html app study.md` | Primary aesthetic and design principles | Available at project root |
| `Lecs/.MDs/DA2451_Lecture_HTML_Integration_Guide.md` | Lecture structure, order, mathematics and content ingestion | Available |
| `Lecs/.PDFs/DA2451_Lecture_PDF_HTML_Integration_Guide.md` | Original PDF inventory, mapping, offline viewer and performance | Available |
| `PQs/DA2451_Practice_Questions_HTML_Integration_Guide.md` | Worksheet question/answer structure and rendering | Available |
| `PPs/DA2451_Past_Papers_HTML_Integration_Guide.md` | Historical paper question-to-answer mapping | Expected in completed project package; verify on disk |
| `Predictions/DA2451_Predicted_Questions_HTML_Integration_Guide.md` | Four-file predicted-question mappings, IDs, two-section display and AI prompt copying | Expected in completed project package; verify on disk |

---

## 3. Content Inventory and Required Order

Folder names below are relative to the current project root, `HTML APP content/`. Lecture Markdown files are stored in `Lecs/.MDs/` and original PDFs in `Lecs/.PDFs/`. The guides are developer references and **must not be displayed as learning chapters**.

### A. Learning Chapters (11 teaching files)

Present these in this exact study sequence, not raw filename order:

| Position | Title | Source file |
|---:|---|---|
| 1 | Introduction to Multivariate Analysis | `Lecs/.MDs/DA2451_Lec01_Introduction_Teaching.md` |
| 2 | Review of Matrix Algebra | `Lecs/.MDs/DA2451_Lec02_Matrix_Algebra_Teaching.md` |
| 3 | Principal Component Analysis | `Lecs/.MDs/DA2451_Lec03_PCA_Teaching.md` |
| 4 | PCA in R: Supplementary Methods | `Lecs/.MDs/DA2451_PCA_R_Methods_Teaching.md` |
| 5 | Factor Analysis | `Lecs/.MDs/DA2451_Lec05_Factor_Analysis_Teaching.md` |
| 6 | Factor Analysis: Additional Remarks | `Lecs/.MDs/DA2451_Lec05_Extra_Factor_Analysis_Teaching.md` |
| 7 | Multivariate Normal Distribution | `Lecs/.MDs/DA2451_Lec06_Multivariate_Normal_Teaching.md` |
| 8 | Inferences About a Mean Vector | `Lecs/.MDs/DA2451_Lec07_Mean_Vector_Inference_Teaching.md` |
| 9 | Comparisons of Several Multivariate Means | `Lecs/.MDs/DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md` |
| 10 | Multivariate Multiple Linear Regression | `Lecs/.MDs/DA2451_Lec09_MMLR_Teaching.md` |
| 11 | Multivariate Linear Models in R: Supplementary Reference | `Lecs/.MDs/DA2451_Multivariate_Linear_Models_R_Teaching.md` |

Distinguish supplementary readings visually without removing them from this sequence. Provide chapter table of contents, previous/next navigation, reading progress, bookmarks and resume position. Preserve all source explanations, formulas, R code and tables.

**Original PDFs:** The project tree now contains **11 original lecture/reference PDFs** in `Lecs/.PDFs/`, including `Multivariate-Linear-Models.pdf`. Use `Lecs/.PDFs/DA2451_Lecture_PDF_HTML_Integration_Guide.md` for the authoritative one-to-one chapter/PDF mappings. Include the actual PDF bytes inside the final standalone HTML only when they are supplied to the developer; verify filenames and avoid inventing assets. PDF viewing must be lazy/on demand and tested for bundle size, browser limitations and performance. No `Lec4.pdf` is expected.

### B. Historical Past Papers (one questions master + nine answer files)

Question source:
- `PPs/past_papers_multivariate_questions_only.md`

Answer sources, in chronological/course-specific sequence:
1. `PPs/19_batch_july_2022_answers.md`
2. `PPs/20_batch_august_2023_answers.md`
3. `PPs/21_batch_2023_in_class_answers.md`
4. `PPs/21_batch_january_2024_answers.md`
5. `PPs/22_batch_december_2024_answers.md`
6. `PPs/23_batch_2025_quiz_1_answers.md`
7. `PPs/23_batch_2025_quiz_2_answers.md`
8. `PPs/23_batch_2025_quiz_3_answers.md`
9. `PPs/23_batch_october_2025_answers.md`

The questions and answers are stored separately. Use the Past Papers integration guide to construct **verified stable paper/question/subquestion IDs** and correct pairings. Preserve paper type distinctions (final, in-class, quiz). Never align by question number alone if it is ambiguous. Flag unmatched items honestly. Show questions first and let users reveal/hide individual worked answers.

### C. Practice Questions (five combined question-and-answer teaching files)

1. `PQs/DA2451_PQ01_Complete_Teaching.md`
2. `PQs/DA2451_PQ02_Complete_Teaching.md`
3. `PQs/DA2451_PQ03_Complete_Teaching.md`
4. `PQs/DA2451_PQ04_Complete_Teaching.md`
5. `PQs/DA2451_PQ05_Complete_Teaching.md`

Each Markdown file contains questions together with beginner-friendly answers and explanations. Follow the PQ integration guide to avoid splitting an explanation away from its question. Some dataset-dependent source responses may be conditional; do not fabricate calculations or claim source answers are complete when they are not.

### D. Predicted Questions (AI-generated, **questions only**, four unchanged source files)

The prediction library uses **four independent source Markdown files, not two consolidated files**:

1. `Predictions/DA2451_ChatGPT_Predicted_MCQs.md`
2. `Predictions/DA2451_ChatGPT_Predicted_Essays.md`
3. The Gemini-generated **MCQ** Markdown file in `Predictions/` (use its actual supplied filename; do not guess or rename it).
4. The Gemini-generated **essay** Markdown file in `Predictions/` (use its actual supplied filename; do not guess or rename it).

**Confirmed decision: DO NOT consolidate, merge, rewrite, delete or replace these four original source files.** Do not require separate final combined MCQ/essay Markdown files. The app's *presentation layer* should organize content from the four unchanged files into just **two main views**:

- **Predicted MCQs:** ChatGPT-generated and Gemini-generated MCQs together.
- **Predicted Essays:** ChatGPT-generated and Gemini-generated essay questions together.

Provide a simple **All / ChatGPT / Gemini** source filter within each view, with accurate per-question source attribution. Preserve each source's original question numbering and complete question content, including options, subparts and numerical data. Generate persistent unique **internal IDs** with a source prefix and original question identifier so that matching numbering across models does not collide. Follow `Predictions/DA2451_Predicted_Questions_HTML_Integration_Guide.md` after verifying it is present. At planning time, rely on that guide and the folder tree; at implementation time, import the four complete source files. If any of the four files is missing from the developer's package, list the missing input and build from the supplied subset without falsely claiming all four were included.

**Strict rules:** Predicted questions must be clearly separated from historical exam papers; they are unofficial, speculative AI-generated practice, not guaranteed exam questions. They contain **no verified answer keys or solutions**: do not invent answers, reveal correctness, claim automatic grading, or silently create answers. Students should use the **Copy AI Prompt** button to request their own independently checked explanations. Filter out prediction items dedicated to PCR, Regression Diagnostics or LDA without altering the original Markdown files; record excluded items in the development audit. Similar questions from different models may be identified for review but **must not be silently deduplicated**.
---

## 4. Approved User Experience and Functionalities

### 4.1 Dashboard and Navigation

- A visually excellent but **fast-loading** dashboard on app opening.
- Prominent live examination countdown and clear exam date/time.
- Quick-access cards for **Learning Chapters**, **Past Papers**, **Practice Questions**, and **Predicted Questions**.
- Recent reading position, simple completed-item progress, bookmarks and quick resume.
- Fast, predictable sidebar and breadcrumbs, with chapter/question tables of contents.
- Global search across indexed, in-scope educational content. Search should be client-side and fully offline, with useful section/paper filters and highlighted matches if performance allows.
- Deep links to chapters and questions using URL fragments, where compatible with `file://`.
- **Open in New Tab** on appropriate chapter/question/PDF links where feasible. Use a direct click and a same-file hash URL to open the same self-contained app at the selected content; do not require hosted routes or an external server. Fall back gracefully to same-tab navigation if blocked. Avoid excessive duplicate-tab memory usage.

### 4.2 Reading Experience

- Beautiful Markdown prose, structured headings, tables, math, and R code.
- Accurate inline/display LaTeX, matrices and multiline calculations using a locally bundled renderer.
- Syntax-highlighted R code, with **Copy Code** buttons.
- Copy buttons for formulas or question text where genuinely useful.
- Accessible, responsive tables and horizontal handling of very wide equations.
- Long-document navigation, previous/next controls and sensible collapsing of *navigation*, without hiding original content irretrievably.
- Comfortable reading width, clean contrast and nonintrusive reading-progress feedback.
- **Embedded original lecture/reference PDFs are required for all 11 chapters** when the corresponding PDF files are supplied, with lazy viewer initialization and offline open/save fallbacks. Do not treat PDF embedding as an optional feature.

### 4.3 Past Papers

- Browse by batch, year and paper type.
- One question at a time or logical grouped reading, whichever works best with actual source structure.
- **Reveal/Hide Answer** on each question; answers start hidden in practice contexts.
- Preserve complete worked answers and subquestions.
- **Copy AI Prompt** must include the **complete current question AND its correctly matched, complete source-provided answer/explanation**, even when the answer remains hidden in the interface. The copied prompt must identify the answer as a supplied reference to verify and explain, not as an unquestionably correct solution. A separate **Copy Question** action, if offered, may omit the answer.
- Mark complete, bookmark and return to last opened question.
- Timed practice is optional, only if lightweight and reliable; no invented score or examiner marking rubric.

### 4.4 Practice Questions

- Five worksheets in source order, with topic labels.
- Clear separation between original question, detailed worked answer and supplementary teaching notes where source structure supports it.
- **Reveal/Hide Solution** per question.
- **Copy AI Prompt** must include the **complete selected PQ question AND all relevant source-provided solution/teaching explanation content**, even when the solution is hidden on screen. If the worksheet answer is partial, conditional or dataset-dependent, preserve that limitation in the copied prompt. Separate **Copy Question** and **Copy R Code** actions may copy only their labeled content.
- Bookmarks and simple completed-question tracking.

### 4.5 Predicted MCQs and Essays

- Two main views, **Predicted MCQs** and **Predicted Essays**, each combining its ChatGPT and Gemini source files **at display/build time without modifying the originals**. Provide **All / ChatGPT / Gemini** filters and optional topic browsing when supported by source metadata.
- Prominent **unofficial AI-generated practice** disclaimer at entry and clearly associated with the content.
- MCQs display options and may permit a student's selection for private practice, **but must not indicate correct/incorrect answers or calculate grades without verified keys**.
- Essays display complete question/subparts with any supplied data, not solutions.
- Every prediction has a **Copy AI Prompt** action, containing the complete real question and a very-simple-teaching instruction. Make it explicit that users should paste prompts into their own AI assistant for an explanation or worked answer.
- Allow bookmark/completed tracking without confusing this with academic correctness.

### 4.6 AI Copy-Prompt Experience: Source-Aware, Answer-Inclusive Where Available

**This is a major app feature, not an afterthought.** Copy prompts **offline**. Do not depend on AI APIs, paid subscriptions, authentication, network connectivity or externally hosted integrations. The copy action must use the exact question and answer records currently selected in the app, **not a generic placeholder or whichever answer happens to appear nearby in the Markdown**.

**One predictable main button label:** **Copy AI Prompt**. Its contents depend on the material type:

| Content type | What the button MUST copy | What it must NOT do |
|---|---|---|
| **Historical past-paper question** | Course/paper metadata; complete specific question including all relevant subparts, numerical data, tables, code and notation; the **verified corresponding source-provided answer and its worked explanation**; detailed beginner-teaching instructions. | Do not omit the source answer just because it is hidden in the UI; do not attach an answer from a different paper/question; do not claim the source solution is unquestionably correct. |
| **Practice-question worksheet** | Worksheet/question metadata; complete selected question; its **corresponding original source answer and all relevant teaching/worked-solution details**, including any R code, caveats or conditional remarks; detailed beginner-teaching instructions. | Do not silently discard parts of the teaching answer; do not make up a missing calculation or dataset-dependent result. |
| **AI-predicted MCQ** | Source/model label, complete question stem, **every option**, data and notation; instructions to independently determine the best answer and thoroughly explain why all options are right or wrong. | **Never include a fabricated answer key, solved answer, or grading claim.** |
| **AI-predicted essay** | Source/model label, complete question and all subparts/data; instructions to solve and explain from zero, showing intermediate calculations and interpretations. | **Never invent a source answer or suggest the question is official.** |
| **Lecture formula/R demonstration** (optional) | The exact selected example/formula/code and enough original surrounding context to explain it, with a tailored beginner-friendly request. | Do not invent an official worked solution. |

**Required answer handling:** When a past-paper or PQ answer is correctly mapped and present, **include that source answer automatically, whether or not the user has clicked Reveal Answer**. The UI's answer visibility is independent of clipboard content. This is intentional, as the student wants their chosen AI to start from the supplied worked answer and explain it more thoroughly. Make this discoverable with a small helper label/tooltip such as **“Copies question + existing solution for AI explanation”**. Users who want a question without a spoiler should use a distinctly labeled **Copy Question** control, where available. Do not show or expand the hidden answer merely because the copy button is clicked.

**If an answer is missing, ambiguous or unverified against its question:** do not guess a pairing. Copy the exact question, explicitly state **“No reliably matched source answer was available for this item”**, and ask the external AI to solve independently while marking uncertainty. Mark the mapping problem in the build audit. The app should not silently present an answerless prompt as though it contained a verified match.

**Suggested past-paper/PQ prompt structure** (populate from actual records, preserving mathematical notation and code):

```text
You are an exceptionally patient DA2451 Multivariate Methods in Business tutor.
Teach this question from absolute zero. Here is the COMPLETE ORIGINAL QUESTION:
[original question, data, tables, options/subparts as applicable]

HERE IS THE SOURCE-PROVIDED ANSWER / TEACHING SOLUTION:
[complete correctly matched answer and relevant explanations; or explicit absence note]

Use the source-provided solution as a REFERENCE, not guaranteed truth. First check the method, arithmetic, assumptions, interpretations and any R code; identify and explain errors or incomplete steps rather than blindly agreeing. Then teach the problem from prerequisites, define every symbol, justify each formula, show all substitutions and intermediate calculations, explain the source's reasoning, and interpret the result in simple English. Where needed, provide and explain relevant reproducible R code. Clearly distinguish the original source answer from any independent correction. Do not invent missing values or unseen datasets.
```

**Suggested predicted-question prompt structure:**

```text
You are an exceptionally patient DA2451 Multivariate Methods in Business tutor.
This is an UNOFFICIAL AI-generated practice prediction with NO PROVIDED ANSWER KEY.
Here is the COMPLETE QUESTION:
[full original prediction, all MCQ choices or all essay subparts, data and notation]

Teach every prerequisite from zero; solve independently step by step, check calculations and assumptions, explain every formula and symbol, and interpret the conclusion in simple English. For an MCQ, choose the best-supported option and explain the alternatives. For essays, cover every subpart. Include annotated R code where genuinely useful. Do not invent missing data; flag uncertainty. Your response is an independently generated explanation, not an official marking scheme.
```

**Source fidelity and user experience:**
- Build each copied prompt directly from the same **stable paper + question/subquestion ID** that drives the app view and answer-reveal mapping. Avoid matching by ordinal position, substring alone or file proximity.
- Include **all content necessary** to understand the selected question and its answer, without accidentally appending answers from neighboring questions. Preserve Unicode, statistical symbols, LaTeX, matrices, text-based tables, and R code in clipboard-compatible plain text. Preserve Markdown fences where helpful.
- Where a PDF/figure or data attachment is referenced but cannot be represented as copied text, include the *accurate original reference* and an honest note that the student may need to attach the image, PDF page or dataset manually. Do not falsely claim that copying text also attaches non-text files.
- Do not silently trim long questions or solutions to meet clipboard-size targets; use a safe fallback with a clear message if a browser blocks copying.
- Show successful copy feedback, and offer a **manual-select/copy fallback** for restrictive `file://` browser contexts. The button should not open or contact an online AI service.
- **Test at least one question from every historical paper and every PQ worksheet**, including a source answer that is hidden on screen, plus representative MCQ/essay predictions. Assert copied question and corresponding answer IDs match; predictions must contain no source answer.

### 4.7 Themes, Progress and Settings

- First-launch **Light or Dark** selection, plus easy theme toggle later (system mode optional).
- Persist only simple personal data: theme, completed items, bookmarks, last reading position and perhaps minimal preferences.
- Use local browser storage where available, with a graceful fallback where `file://` storage is restricted. Do not promise cross-device synchronization.
- No login, backend, account system or cloud storage.
- Keep user-facing settings simple; no elaborate analytics or mandatory study timers.
- Optional JSON export/import of study state if simple enough to deliver reliably, but do not compromise core loading speed.

### 4.8 Motion, Accessibility and Performance

- Subtle transitions and micro-interactions only, no heavy animations, large decorative assets, or laggy effects.
- Respect `prefers-reduced-motion`; support keyboard navigation, accessible focus indicators and adequate contrast.
- Render or hydrate lengthy chapter/question bodies only when needed, or preprocess to efficient sections. Avoid parsing the entire content library synchronously on dashboard load.
- Build a compact search index; load search logic only when used if sensible.
- Bundle libraries/fonts/assets locally and minimize total bundle size.
- Test on desktop and mobile widths and provide graceful degradation for PDF viewers/clipboard/storage.

---

## 5. Exam Countdown: Exact Rules

**Start:** `2026-11-18T09:00:00+05:30`  
**Finish:** `2026-11-18T12:00:00+05:30`  
**Display label:** DA2451 Final Examination • 18 November 2026 • 9:00 AM–12:00 PM • Sri Lanka time

- **Before 9:00 AM:** show days, hours, minutes, seconds remaining until exam start.
- **Between 9:00 AM and 12:00 PM:** replace countdown with a tasteful **Exam in progress** state, optionally showing time until finish.
- **After noon:** show **Exam completed** or an equivalent neutral completed state; the study app itself must continue working.
- Use the absolute ISO timestamps above, not a browser-local 9:00 AM assumption. The display must remain correct for students opening the app in different time zones.

---

## 6. Creator Credit, AI Assistance and Provenance

**Primary creator attribution, shown consistently:** **Made by Dinuka Himsara.** This is an independent student-created educational resource, not an official University of Moratuwa application.

The user-supplied AI-assistance naming for the project's preparation is:

- **ChatGPT Plus — GPT-6 High**
- **Gemini Pro — Agron High**
- **Claude — Sonnet 5.5 Medium**
- **Google Antigravity — development environment, only if it is actually used to implement or test the app**

**Do not conflate models with development environments.** Antigravity is an AI-assisted IDE/agentic coding environment, not a fourth named foundation model. It may offer selectable models depending on account, region, current product availability, and quotas. **Do not claim a specific model ran in Antigravity without verifying the actual session configuration.** Conversely, simply considering Antigravity is not evidence it contributed. If Antigravity is used, credit it as a development tool; optionally name the actual models used if confirmed. If the final build is completed entirely in Claude, omit an Antigravity-used claim.

Recommended *About this app* copy (adjust the Antigravity sentence to match reality at release):

> **Made by Dinuka Himsara.** This independent student study resource was prepared with AI assistance from **ChatGPT Plus (GPT-6 High)**, **Gemini Pro (Agron High)**, and **Claude (Sonnet 5.5 Medium)**. [If actually used: **Google Antigravity was also used as a development and testing environment.**] It is not a university-endorsed app.
>
> **For AI-predicted questions:** Use **Copy AI Prompt** and ask your preferred AI assistant for a step-by-step explanation. Dinuka has exhausted his available ChatGPT, Gemini, and Claude usage while preparing these study materials and is rather stressed! 😅 The predictions therefore come without verified worked answers. Thanks for understanding.

A model's exact publicly marketed name or subscription label might differ from the label used in the creator's records; preserve the creator's preferred credit, but do **not** present unverified product/version availability as a technical fact or an app requirement.

**Source provenance is separate from development attribution:** historical papers remain historical papers; PQs remain practice worksheets; predicted questions retain per-question **ChatGPT / Gemini** source labels. Neither Claude nor Antigravity should be described as the author of the original predictions merely because they integrated those files.

Prominently and accurately disclose:

> **AI-GENERATED PRACTICE PREDICTIONS — NOT OFFICIAL EXAM QUESTIONS.** These are speculative original practice questions. They are not leaked, lecturer-approved, or guaranteed to appear on the final examination. Do not treat generated external AI answers as verified without checking them.

Keep notices personable and nonintrusive rather than repeated on every screen. The original historical papers and practice worksheets must never be mislabeled as AI predictions.

---

## 7. Technical Delivery and Content Fidelity

### One HTML file, zero runtime network dependencies

- Final artifact should be one `.html` file with all **required** JS/CSS, content, math assets and search data embedded.
- No CDN fonts, external scripts, remote images, service workers requiring HTTP, backend, remote API or mandatory internet access.
- Be careful with `file://` restrictions: test offline navigation, clipboard fallback, storage and PDF rendering in modern browsers.
- Prefer generating the final HTML through a repeatable local build script/process; deliver the HTML as the student-facing artifact. Developer tooling may involve additional temporary files, but users should need only the final HTML.
- Use sanitization / trusted content handling and safe string embedding. Source Markdown and mathematical text must not break embedded scripts or HTML.

### PDF requirement and size tradeoff

If original PDFs are provided, include them in the standalone HTML, opening the viewer only on demand. Native browser PDF support and `blob:`/`file://` behavior vary: test realistic browser combinations and provide a useful fallback (e.g., save/open embedded PDF). Avoid eagerly decoding all base64 PDF bytes at startup. If the embedded files make the HTML impractically large or slow, document the measured problem and request a deliberate tradeoff rather than violating the single-file promise silently.

### Integrity requirements

- **Never summarize or truncate educational source content** to meet a build-size target.
- Preserve formulas, problem data, matrices, tables, R code, worked explanations, and source ordering.
- Do not manufacture missing official answers, dates, dataset values, exam rules or statistical calculations.
- Document ambiguous or unmapped questions instead of silently assigning answers.
- Avoid duplicate paper questions generated by accidentally importing both a master question and an answer-file restatement as independent questions.
- Use stable IDs so bookmarks/progress stay compatible across app rebuilds where possible.
- Preserve the source files unchanged; transformations belong in the build pipeline or display layer.
- Maintain an explicit **question-to-answer mapping audit** for all nine papers and five PQs. Preserve original question, subpart and solution boundaries; document any unpaired, incomplete, or contradictory source answers.
- Avoid treating source answers as independently verified just because they are present. When prompting external AI, explicitly request validation before detailed explanation.

---

## 7A. Development Environment and Safe Local Workflow

**The build environment is a choice, not a change to the product specification.** The project can be completed with **Claude web chat / coding tools**, **Google Antigravity**, or a handoff between them. The final output, offline behavior, content fidelity, design authority and five-task acceptance criteria are identical regardless of tool.

### Option A — Claude development

- Supply the Master Plan, revised Design Skill, folder tree and relevant guides; provide actual source files to the build environment when the relevant task requires them.
- Claude should plan a maximum of five tasks, then deliver/check each stage. An initial limited prototype is acceptable, but it must not be mistaken for the complete final app.
- If Claude cannot directly manipulate the local folder or run tests, request downloadable build artifacts, scripts, clear placement instructions and an honest record of untested behavior. Never claim local browser testing that did not occur.

### Option B — Google Antigravity local workspace

- Open the local **`HTML APP content`** folder as a project. The AI agent can inspect project files and work in a separate development directory, but user approval must be required before destructive shell commands or modifying originals.
- Use **`APP_DEV/`** for generated source code, build scripts, tests, intermediate outputs and distribution artifacts. The original Markdown and PDFs under `Lecs/`, `PPs/`, `PQs/` and `Predictions/` plus the two root specifications are **read-only project inputs**.
- Suggested structure: `APP_DEV/src/`, `APP_DEV/scripts/`, `APP_DEV/tests/`, `APP_DEV/dist/`. This structure is an implementation suggestion, not a requirement to scatter final delivery across multiple files.
- Keep all development intermediate files separate; a single bundled `APP_DEV/dist/DA2451_Study_App.html` is the student-facing release. Do not require a dev server for the release. A temporary local dev server for automated development testing is permitted, **but final acceptance must be tested by double-clicking the file via `file://` without the server**.
- In Antigravity, use an agent with an actual available model selected in its interface. Subscription level alone does not guarantee unlimited usage or a specific model name. Prefer efficient scoped tasks, concise change requests and controlled context ingestion. Pause safely when quota is reached; preserve files and progress before switching model or environment.
- Never allow the agent to install packages or run unknown commands without review. Do not upload private or proprietary materials to unrelated services. Keep backups before large changes.

### Shared rules for both environments

1. **Do not rebuild from scratch** when moving between tools or hitting quotas. Preserve source code, stage status, test results and documented decisions in `APP_DEV/`.
2. In **Task 1**, require a five-task breakdown and reviewable architecture plan before broad changes. Proceed sequentially, validating and recording completion of each task.
3. Use integration guides to locate structure, then import **complete real source content programmatically** at the correct stage. Do not tokenize source content into prompts manually or rewrite originals to fit a UI.
4. Keep a compact `APP_DEV/BUILD_STATUS.md` with completed tasks, known defects, test outcomes, source file counts and exact continuation instructions. This is a developer handoff artifact, **not** a second Master Plan.
5. If testing uses a hosted preview, also repeat final smoke tests in the actual `.html` opened by `file://`. Desktop and mobile-size checking must cover PDF fallback, clipboard, hash navigation, persistence and math rendering.
6. Avoid tool-specific runtime APIs in the final HTML. **No Gemini, Claude, ChatGPT or Antigravity service is needed for students to open the study app.** AI assistance uses copy-to-clipboard prompts only.
7. Keep the build **reproducible**. A documented local build step must produce the same final one-file release from the original input folders without manual question copying.

## 8. Development: No More Than Five Sequential Tasks

**The selected development agent (Claude or Antigravity) must first define at most five major tasks, then implement them one by one in order.** Each task should have specific deliverables and acceptance checks. Do not spin off an open-ended task list or prematurely ingest all source documents. Keep the experience usable at each checkpoint and avoid repeatedly rebuilding successful pieces.

### Task 1 — Foundation, Design and Fast Dashboard

Read this plan, the design skill, and the available integration guides. Inspect filenames only for the broad inventory. Establish app shell, theme selection, dashboard, precise exam countdown, navigation architecture, stable route IDs, and a clear content-import contract. Produce a fast representative prototype with placeholders or a minimal safe sample. **Do not manually read every content file yet.**

**Checkpoint:** premium responsive shell, accurate countdown, theme switching, route/new-tab behavior, no runtime network dependency.

### Task 2 — Learning Chapters and PDFs

Consult the **Lecture Markdown and PDF integration guides**; programmatically import the **11 lecture teaching Markdown sources**, in the correct order. Implement reliable Markdown, math and R rendering; chapter navigation, reading progress and lazy embedded PDFs using the 11 original files when supplied. Use on-demand rendering.

**Checkpoint:** all 11 chapters accessible; no missing or corrupted sections; representative long formulas, tables and R code render correctly; PDF view works or is honestly unavailable.

### Task 3 — Historical Past Papers and Practice Worksheets

Consult the **Past Papers guide**, plus the **Practice Questions guide**. Programmatically ingest the ten past-paper MD sources and five PQ teaching sources. Map actual historical questions to their nine answer files, implement individual reveal/hide, per-question navigation, **source-answer-inclusive Copy AI Prompt buttons (including when the answer is hidden), distinct from optional question-only copy**, bookmarks and completion state. Flag any unmatched or ambiguous answers instead of guessing.

**Checkpoint:** paper count and worksheet count correct; answer pairings validated; original questions remain faithful; long solutions, tables, math and R blocks render without clipping or accidental loss. **For each paper and worksheet, test copied prompts include both the exact selected question and its matched source solution, even while the displayed solution is hidden.**

### Task 4 — Predictions, Search and Personal Study Tools

Consult the Predictions integration guide. Import the **four original prediction Markdown files unchanged** through a configurable adapter, retaining separate source identity, original numbering, and unique internal IDs. Present them in **two combined app views** (MCQs / Essays), each with an **All / ChatGPT / Gemini** filter. **Do not require, generate or substitute consolidated Markdown files.** Exclude out-of-scope PCR/Regression Diagnostics/LDA prediction items from display without editing sources. Add AI prompt copying, global offline search, bookmarks, completed flags, last position, local persistence and user-facing attribution/disclaimers.

**Checkpoint:** all four available prediction source files represented in the correct two combined app views; working source filters and collision-free IDs; predictions clearly identified as unofficial; no fake answer key/grading; copied prompts contain complete question data; full-text search finds known content; saved state recovers where browser storage supports it.

### Task 5 — Integration Audit, Optimization and Release

Validate source-to-app integrity, complete navigation, math rendering, long-document responsiveness, PDF loading, local storage fallbacks, clipboard behavior, new-tab deep links, accessibility and mobile layout. Remove unused dependencies and performance bottlenecks. Deliver the final **single HTML file** and a short implementation/limitations summary. Test with network disabled; do not claim unsupported cross-browser verification.

**Checkpoint:** all available in-scope source content included; no internet dependency; no major console/rendering errors; fast initial screen; correct countdown and app behavior after exam; all missing inputs and unresolved mapping problems disclosed.

**Workflow rule:** Verify the expected completed guide files and all 11 PDFs against the current folder tree. Ask the user only for genuinely indispensable missing inputs. Otherwise proceed using the available files, clearly track limitations, and do not stall unrelated tasks.

---

## 9. Acceptance Checklist

- [ ] One self-contained HTML file; fully functional without internet or hosting.
- [ ] Design follows supplied skill; light/dark themes; restrained animation; responsive mobile/desktop layout.
- [ ] Dashboard loads quickly and displays the fixed-timezone exam countdown correctly.
- [ ] Exactly 11 in-scope lecture teaching chapters in their specified order.
- [ ] Eleven original lecture/reference PDFs mapped to their chapters and **embedded when supplied**; viewers initialize on demand; offline open/save fallbacks tested; absent files identified honestly.
- [ ] Nine historical paper answer sources correctly aligned with the questions master, including quizzes/in-class papers.
- [ ] All five complete PQ teaching documents available with per-question reveal/hide.
- [ ] Four original prediction Markdown files preserved unchanged; two combined app views (MCQs/Essays), with All/ChatGPT/Gemini filters, original numbering/source attribution and collision-free IDs.
- [ ] Predicted MCQs and essays distinct from genuine historical materials; clear unofficial disclaimer.
- [ ] No dedicated PCR, Regression Diagnostics or LDA content included.
- [ ] All question-only predictions remain answerless unless later explicitly supplied verified keys.
- [ ] **Copy AI Prompt** for past papers and PQs automatically includes the **selected complete original question + its correctly matched full source-provided answer/teaching solution**, even if the visible answer is hidden; instructs the external AI to **check, then explain**, not blindly trust the answer.
- [ ] **Copy AI Prompt** for predicted MCQs/essays includes the complete question, options/subparts and **no fabricated answer**; asks the external AI to solve independently.
- [ ] Every clipboard prompt is verified against stable IDs; missing/ambiguous answers are honestly identified rather than incorrectly paired; **Copy Question** (if present) remains question-only.
- [ ] Copy controls work offline, show copy-success feedback and offer a manual-copy fallback when clipboard permission is blocked.
- [ ] Math, tables, R code and full teaching explanations preserved.
- [ ] Search, bookmarks, completed marks, recent/last-reading location functional where supported.
- [ ] Appropriate content can open in a new tab with same-tab fallback.
- [ ] Creator credit and user-requested AI-assistance note present.
- [ ] Tested for offline use, file integrity and performance; all limitations disclosed.
- [ ] Development followed **at most five** sequential, verified tasks.
- [ ] `APP_DEV/` (if used) contains reproducible build steps, stage handoff notes and no modifications to original input files.
- [ ] Final About panel credits **Antigravity only if actually used**, distinguishes the coding environment from named AI models, and keeps per-question ChatGPT/Gemini provenance intact.

---

## 10. Final Direction to the Development Agent (Claude or Antigravity)

**Begin by understanding this Master Plan, the latest design skill, current folder tree, and the relevant integration guides. Do not manually read every project Markdown file before building.** Form a maximum-five-task execution sequence, get review of the task breakdown, then implement in that order. During the relevant task, use the original source Markdown files as the authoritative content, processing them efficiently and preserving them in full. Treat the guides as accelerators, not replacements. Deliver a fast, refined, accessible, mathematically faithful and genuinely offline DA2451 study app that students can open simply by double-clicking a single HTML file. The choice of Claude or Antigravity must not change this deliverable.
