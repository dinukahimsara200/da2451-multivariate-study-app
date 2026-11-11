# DA2451 Offline HTML Study App — Build Status & Continuation Log

## Overall Project Progress
- [x] **Task 1: App Shell, Design Token System, and Offline Build Pipeline** *(Completed, Verified & Approved by User)*
- [x] **Task 2: Learning Chapters and Lazy Embedded Lecture PDFs** *(Completed, Verified & Approved by User)*
- [x] **Task 3: Historical Past Papers (with Complete Question–Answer Mapping Audit) and Practice Worksheets** *(Completed, Verified & Approved by User)*
- [x] **Task 4: AI-Predicted Questions (Scope Filtering & AI Prompt Copy), Global Search, and Study Progress** *(Completed, Verified & Approved by User)*
- [x] **Task 5: Final Refinement, Verification Audit, and Production Release**
  - [x] **Checkpoint 5A: Visual Design and Poppins Typography** *(Completed, Verified & Approved by User)*
  - [x] **Checkpoint 5B: SVG Artwork, Animations, and Responsive Refinement** *(Completed, Verified & Approved by User)*
  - [x] **Checkpoint 5C.1: Visual Corrections, Parchment Theme, and Academic Rendering Cleanup** *(Completed, Verified & Approved by User)*
  - [x] **Checkpoint 5C.2: Final Visual Corrections, Scroll Repair, Comprehensive Audit & Production Release** *(Completed & Verified — Ready for Final Release)*

---

## Completed in Final Release Audit & Scroll Repair (Post-5C.2)
1. **Preserved Release-Candidate Backup:**
   - Saved recoverable release-candidate snapshot in `APP_DEV/checkpoints/checkpoint_final_rc/`.
2. **Resolved Root Causes of Excessive Vertical Scrolling (~844px–1,180px Blank Space):**
   - **Root Cause A (CSS Layout Leak from Closed `<dialog>`):** `dialog.dlg-editorial` in `APP_DEV/src/styles.css` previously declared unconditional `display: flex;`, overriding the browser user-agent stylesheet rule `dialog:not([open]) { display: none; }`. Because closed `<dialog>` elements default to `position: absolute` in UA stylesheets, `#dlg-about` remained laid out invisibly (`opacity: 0; pointer-events: none`) at the bottom of the document flow, inflating `documentElement.scrollHeight` by ~655px–844px across short views.
     - **Fix:** Removed `display: flex` from `dialog.dlg-editorial` and scoped it strictly to `dialog.dlg-editorial[open] { display: flex; }`. Verified all 6 closed `<dialog>` elements compute to `display: none`.
   - **Root Cause B (Duplicated Orphaned Dialog Tail in `APP_DEV/scripts/build.js`):** Lines 790–817 of `APP_DEV/scripts/build.js` contained a 27-line duplicated tail of `#dlg-about` (`notice-predicted`, `Content Integrity & Scope` list, `details.pp-details`, and stray closing tags) placed directly under `<body>` after `</dialog>`, adding ~735px of rendered height at the bottom of every page.
     - **Fix:** Removed the 27 duplicated lines from `APP_DEV/scripts/build.js` and rebuilt `APP_DEV/dist/DA2451_Study_App.html`.
   - **Root Cause C (Route Scroll-State Contamination in `APP_DEV/src/app.js`):**
     - **Fix:** Updated `initScrollChrome` and `renderRoute` to continuously track `scrollPositions[currentRoute]` (guarded by `routeSwitching`), restore saved scroll positions exclusively on long reading routes (`^(chapter|paper|worksheet)\/`) clamped to `Math.max(0, document.documentElement.scrollHeight - window.innerHeight)`, and always open overview/library views (`#dashboard`, `#chapters`, `#papers`, `#practice`, `#predicted-mcqs`, `#predicted-essays`, `#bookmarks`) cleanly at `scrollY = 0`.
3. **Measured Before/After Vertical Scroll Geometry (`APP_DEV/tests/verify_scroll.js`):**
   - **Before Fix:** Dashboard `scrollHeight` on `1440×900` was `2,517px` (`844px` blank space below `.dash-footer`).
   - **After Fix:** Dashboard `scrollHeight` on `1440×900` is `1,673px` (`lastContentBottom = 1,601px`), leaving exactly **`72px` on desktop** (`768px`–`1440px`) and **`96px` on mobile** (`320px`–`390px`) of intended bottom padding across all views.
4. **100% Pass Across All 6 Automated Verification Suites:**
   - `verify_task1.js` -> PASS (offline purity, zero external links, 37/37 WCAG contrast checks, countdown transitions).
   - `verify_lectures.js` -> PASS (11/11 chapters, 11/11 embedded base64 PDFs with SHA-256 verification).
   - `verify_papers_pqs.js` -> PASS (9 past papers, 201 question–answer pairings, 5 worksheets, 32 interactive cards, 0 KaTeX errors).
   - `verify_task4.js` -> PASS (85 in-scope predictions, 25 hard-excluded PCR/Diagnostics/LDA items, 2,230 search records, AI attributions).
   - `verify_browser.js` -> PASS (headless Edge over `file://`, zero console errors, zero uncaught exceptions, unclipped creator profile, independent sidebar scrolling).
   - `verify_scroll.js` -> PASS (all 10 sections: closed dialogs `display:none`, 11 views × 6 viewports blank-space limits, Light/Dark theme geometry, mouse wheel & keyboard scrolling in both directions, route scroll isolation & Back/Forward/Reload, modal open/close stability, worked solution reveal/hide stability, PDF viewer & 12px/16px/22px font scaling, nested scroll container audit, and lazy chapter hydration stability).

---

## Completed in Checkpoint 5C.2 (Final Visual Corrections & Production Audit)
1. **Preserved Recoverable Checkpoint:**
   - Full recoverable snapshot saved in `APP_DEV/checkpoints/checkpoint_5c1b_final/`.
2. **Corrected AI Model Attribution Consistently Across App:**
   - Standardized the model identification strictly to **`Gemini Pro (Gemini 4 Argon High)`** across all components (eliminated duplicate naming and previous typos).
   - Standardized academic content attribution:
     - **ChatGPT Plus (GPT-6 High)**: All 11 lecture chapters and 5 practice worksheets curated individually, one by one.
     - **Gemini Pro (Gemini 4 Argon High)**: All 9 historical examination papers derived and verified individually, one by one.
     - **ChatGPT Plus (GPT-6 High) & Gemini Pro (Gemini 4 Argon High)**: 85 in-scope unworked predicted practice questions.
     - **Claude Sonnet 5.5 Medium & Google Antigravity**: Explicitly attributed as software development tools (architecture, responsive design, test automation) distinct from the AI systems used for creating academic materials.
3. **Fixed Clipped Creator Profile in About Dialog:**
   - Root cause identified: `.dlg-editorial-body` flex items had default `flex-shrink: 1`, causing `.author-profile-box` with `overflow: hidden` to shrink down to 42px on constrained heights.
   - Fixed by applying `flex-shrink: 0;` to all children of `.dlg-editorial-body` and defining `.about-hero-card, .author-profile-box` with `min-height: auto; flex-shrink: 0;`.
   - Verified that the creator profile card takes its full natural height (256px+), displaying Dinuka Himsara, avatar, role, "Made by Dinuka Himsara" badge, and full narrative paragraphs with zero clipping.
4. **Perfected Main Sidebar Scrolling & Spacing:**
   - Constrained `.sidebar-spacer` to `flex: 1 1 0px; max-height: 28px; min-height: var(--s-2);` and anchored `.sidebar-foot` with `margin-top: auto; padding: var(--s-3) var(--s-3);`.
   - Completely eliminated the 500px blank hole that previously appeared on 900px+ desktop viewports between Bookmarks and Settings.
   - Tested and verified independent vertical scrolling across viewport heights of 500px, 600px, 700px, and 900px, including with Learning Chapters subnavigation expanded.
5. **Eliminated Excessive Whitespace in Scrolling Views:**
   - Reduced `.qcard` placeholder `contain-intrinsic-size` from 420px to 200px, preventing artificial empty gaps while scrolling through question lists before hydration.
   - Normalized card gaps in `.pred-cards-stack` by removing double margins (`.pred-cards-stack .qcard + .qcard { margin-top: 0; }`).
   - Removed accidental double spacing on `.dash-footer` (`margin-top: var(--s-3)` instead of `margin-top: var(--s-8)` on top of flex gap).
   - Tightened `.chapter-prose h1` margins from `2.4em` to `1.8em` for balanced academic rhythm.
6. **Improved Editorial About Dialog Layout & Hierarchy:**
   - Structured hierarchy strictly according to user specification:
     1. Modal Header with Close button (`✕`)
     2. Dinuka Himsara Creator Profile Card
     3. Behind This Study App Card
     4. Three Individually Prepared Resource Categories (Lectures, Past Papers, Worksheets)
     5. AI Model Attribution (Separating Academic Content Models from Software Development Tools)
     6. Quota Exhaustion Note (with `😅`) & Academic Disclaimers
     7. Audited Scope & Integrity
7. **Comprehensive Real-Screenshot Visual Verification:**
   - Captured 18 real Chromium screenshots across 6 viewports (320x700, 390x844, 768x700, 1024x768, 1280x720, 1440x900) in both Light and Dark themes.
   - Visually inspected with image inspection tools: confirmed zero clipping, zero header overlaps, single scrollbar on modals, zero horizontal overflow, and readable typography.
8. **100% Pass on All Automated & Browser Test Suites:**
   - `verify_task1.js` -> PASS (purity, 37 contrast checks).
   - `verify_papers_pqs.js` -> PASS (9 papers, 5 worksheets, 201 pairings).
   - `verify_task4.js` -> PASS (85 predictions, 2,230 search records, attributions).
   - `verify_browser.js` -> PASS (zero exceptions, zero console errors, unclipped creator profile >= 200px, independent sidebar scrolling).

---

## Completed in Checkpoint 5C.1 (Visual Corrections & Academic Rendering Cleanup)
1. **Preserved Recoverable Checkpoint 5B:**
   - Full, recoverable snapshot saved to `APP_DEV/checkpoints/checkpoint_5b/`.
2. **Parchment-Inspired Academic Light Theme:**
   - Designed a warm, natural ivory/paper palette (`--bg: #F6F4EE`, `--surface: #FCFBF7`, `--surface-2: #F2EFE8`, `--sunken: #ECE8DF`, `--ink: #1F1E1C`, `--ink-2: #4B4842`, `--ink-3: #615D56`, `--accent: #2850C8`, `--prompt: #623EC4`, `--code-bg: #EFECE3`).
   - Verified 100% WCAG contrast compliance across all 37 pairs in `verify_task1.js` (every pair exceeds $\ge 4.5:1$ or $\ge 7:1$).
   - Dark theme carbon slate mode fully preserved and polished.
3. **Academic Rendering & LaTeX Cleanup in Historical Past Papers & Worksheets:**
   - **Eliminated Raw LaTeX in Question Headings:** Refined `pp-part-head` in `APP_DEV/src/reader.js` to render cleanly as `Part (a)`, `Part (b)`, etc. Raw unparsed `$H_0$`, `$H_1$`, `$X_2$`, `$Y_1$` strings previously dumped into headings are completely eliminated.
   - **Eliminated Duplicate Questions:** The question text now renders strictly once in `part.introHtml` (or `subpartsHtml`) with complete, crisp KaTeX mathematical rendering.
   - **Eliminated Duplicate Marks & Raw Markdown:** Implemented `stripMarksFromQuestionText` in `APP_DEV/scripts/ingest_papers.js` to strip all trailing marks badges (`[N marks]`, `(N marks)`, `` `[N marks]` ``, `` `(N marks)` ``) followed by linebreaks or hints from the question body. Marks are displayed cleanly and exclusively in `.marks` badges.
   - **Preserved R Console Output Alignment:** Styled `.code-card--out` and `.code-bar` in `APP_DEV/src/styles.css` with `font-variant-ligatures: none; letter-spacing: 0; line-height: 1.38; white-space: pre;` for preformatted statistical matrices and summary dumps.
   - **Rendered Mathematical Practice Question Titles:** Added `titleHtml` in `APP_DEV/scripts/ingest_pqs.js` and `APP_DEV/src/reader.js` so math in question titles (e.g. `$2X_1+X_2$`) renders with KaTeX.
4. **Enhanced Creator Notes:**
   - Updated `#dlg-welcome` with a warm, compact **A Note from the Creator ❤️** acknowledging the two days of intensive work, individual lecture and past paper preparation with ChatGPT Plus and Gemini Pro, and student disclaimer.
   - Updated `#dlg-about` with the comprehensive **Behind This Study App: A Note from the Creator ❤️** section, documenting:
     - The full two days of intensive work.
     - Individual, one-by-one preparation of all 11 chapters and 5 worksheets via ChatGPT Plus (GPT-6 High).
     - Individual, one-by-one processing of all 9 past papers via Gemini Pro (Argon High).
     - Sessions taking 30+ minutes each.
     - Utilization of the 1-month ChatGPT Plus offer and 4-year Gemini Pro student offer.
     - Significantly greater effort than earlier semester HTML study apps.
     - Architectural pair-programming assistance from Claude and Google Antigravity.
     - Academic disclaimer to cross-check AI solutions with official slides.
     - Prominent credit: **Made by Dinuka Himsara**.
5. **Layout Overlap & Clipping Audit Across 6 Breakpoints (320px, 390px, 768px, 1024px, 1280px, 1440px):**
   - Added `.table-scroll` styles matching `.table-wrap` (fixes potential table horizontal overflow in past papers and worksheets).
   - Added `padding-right: 48px;` to `.math-block` to ensure equations never collide with `.copy-tex`.
   - Updated `.qhead` on mobile (`< 599px` and `< 399px`) to flex-wrap gracefully without child element overlap.
   - Enhanced animations: `:has(.anim-draw)` stroke-draw sequence, `.view-enter`, `.row-chapter:hover`, `.answer.is-entering`.
6. **Automated Verification Suites Passing (100%):**
   - `verify_task1.js` -> 100% PASS (purity, 37 contrast checks).
   - `verify_papers_pqs.js` -> 100% PASS (9 papers, 5 worksheets, 201 paired questions).
   - `verify_task4.js` -> 100% PASS (61 predicted MCQs, 24 predicted essays, 2230 search records, creator notes).
   - `verify_browser.js` -> 100% PASS (Real Chromium headless, zero exceptions, zero console errors, zero raw LaTeX/marks in headings, zero element overlap, zero horizontal overflow across 320px, 390px, 768px, 1024px, 1280px, 1440px).

---

## Completed in Checkpoint 5B (SVG Artwork, Animations & Responsive Refinement)
1. **Preserved Recoverable Checkpoint 5A:**
   - Full, recoverable snapshot saved to `APP_DEV/checkpoints/checkpoint_5a/`.
2. **Mathematical & Statistical SVG Spot Illustrations & Icon Set:**
   - Added 7 specialized icons to `APP_DEV/src/icons.svg` (`i-filter`, `i-eye`, `i-eye-off`, `i-scree`, `i-scatter`, `i-projection`, `i-contour`).
   - Implemented `getSectionArt(kind)` in `APP_DEV/src/app.js` rendering 5 mathematical spot illustrations:
     - **Learning Chapters:** Orthogonal projection of response vector $\mathbf{y}$ onto column space $\mathcal{C}(\mathbf{X})$ with projection $\hat{\mathbf{y}}$ and orthogonal residual $\mathbf{e}$.
     - **Past Papers:** Bivariate normal confidence contours, major/minor axes, and Hotelling's critical cutoff region.
     - **Practice Questions:** Linear transformation of a unit circle deformed along principal axes by eigenvalues $\lambda_1, \lambda_2$.
     - **Predicted Questions:** Stochastic prediction intervals, mean trajectory, and Mahalanobis boundary points.
     - **Bookmarks & Progress:** Focal ellipse with coordinate axes and bookmark emblem.
   - Enhanced **Empty Search State** with inline geometric confidence ellipse illustration in `APP_DEV/src/search.js`.
3. **Subtle Microanimations & Entrance Transitions:**
   - **Hero Entrance:** Added `.axis-hero` animated entrance sequence (`.anim-draw` stroke-dashoffset animation on the principal covariance ellipse, progressive fade-in on axes, eigenvectors, and projection drops).
   - **Interaction Polish:** Added chevron rotation (`transform: rotate(180deg)`) on answer reveal buttons (`.btn-reveal .ic`), slide-fade entrance on revealed answer content (`.answer.is-entering`), smooth badge/pill hover feedback, and modern `@starting-style` transitions for native `<dialog>` and backdrop blur.
   - **Accessibility & Motion Preference:** Comprehensive `@media (prefers-reduced-motion: reduce)` and `:root[data-motion="reduce"]` overrides neutralizing all transitions, transforms, and animations to zero delay/duration.
4. **Responsive Refinement Across Screen Formats:**
   - **Mobile (< 640px / < 400px):** Cleanly hides large spot illustrations in page headers to preserve vertical reading space; refines header layout, question action buttons (stacked/wrapped), full-bleed matrix tables and code blocks (`margin-inline: -16px`) with zero horizontal overflow, and circular top search trigger.
   - **Tablet (720px – 1199px):** Balanced 2-column card layouts, sticky TOC repositioning, and adaptive split view.
   - **Desktop (1200px – 1440px+):** Centered max-width constraints, comfortable reading widths, and high-density sidebars.
5. **Comprehensive Test Suite Passes:**
   - `node APP_DEV/tests/verify_task1.js` -> 100% PASS (37 token contrast checks >= 4.5:1/7:1, zero external links, zero `hidden="until-found"`).
   - `node APP_DEV/tests/verify_papers_pqs.js` -> 100% PASS (9 papers, 5 worksheets, 201 paired questions).
   - `node APP_DEV/tests/verify_task4.js` -> 100% PASS (61 predicted MCQs, 24 predicted essays, 2230 search records).
   - `node APP_DEV/tests/verify_browser.js` -> 100% PASS (Real headless Edge/Chromium over `file://`, zero browser exceptions, zero console errors, all chapters, PDFs, papers, worksheets, search, bookmarks verified).

---

## Completed in Checkpoint 5A (Visual Design & Poppins Typography)
1. **Preserved Recoverable Checkpoint:**
   - Saved a full, exact copy of the working Task 4 codebase and built bundle in `APP_DEV/checkpoints/task4/`.
2. **Embedded 100% Offline Poppins Typography:**
   - Acquired local `Poppins.ttf` (weight 400), `Poppins-SemiBold.ttf` (weight 600), and `Poppins-Bold.ttf` (weight 700) font binaries into `APP_DEV/fonts/`.
   - Updated `APP_DEV/scripts/build.js` to embed all Poppins weights as inline base64 `@font-face` data URIs directly into the standalone HTML file, guaranteeing consistent typography offline across all operating systems and browsers with zero network requests.
   - Preserved monospace R code (`var(--font-mono)`) and mathematical KaTeX notation (`.katex`) styling intact.
3. **Refined UI/UX, Typography Hierarchy & Visual Details (`APP_DEV/src/styles.css`):**
   - **Dashboard:** Polished visual hierarchy, radial ambient highlight on `.countdown-panel`, tabular figures with bold numeral styling (`--fs-count`), uppercase letter-spaced unit labels (`.cd-lbl`), accent left-bordered `.continue-row`, and grouped card lists (`.group`, `.row`) with smooth hover interactions.
   - **Sidebar & Top Bar:** Backdrop-blur glassmorphism header, pill-shaped active navigation indicators with left accent bar, uppercase tracking on section labels, and sleek rounded search pill with shortcut badge (`Ctrl K`).
   - **Reading Experience (`.prose`):** Comfortable line height (`1.72`), balanced heading tracking (`h1`–`h4`), framed mathematical formula blocks (`.math-block`), syntax-highlighted code cards with language badges and copy controls, and styled table headers.
   - **Question Cards & Panels:** Modern squircle question number badges (`.qnum`), neutral MCQ option buttons with circular letter badges and distinct "My pick" indicators (zero answer keys or correctness colors), and sunken solution reveal panels with left accent hairlines.
   - **Dialogs & Modals:** Glassmorphic backdrop blur, rounded sheet corners (`--r-lg: 18px`), and theme preview cards in the First-Launch Welcome dialog.
4. **Comprehensive Test Verification:**
   - `node APP_DEV/tests/verify_task1.js` -> 100% PASS (all 37 light/dark token contrast ratios verified >= 4.5:1 or 7:1; zero external URLs; zero `hidden="until-found"`).
   - `node APP_DEV/tests/verify_papers_pqs.js` -> 100% PASS (all 9 past papers, 5 worksheets, and 201 paired questions verified).
   - `node APP_DEV/tests/verify_task4.js` -> 100% PASS (all predicted questions, exclusions, search index, and attributions verified).
   - `node APP_DEV/tests/verify_browser.js` -> 100% PASS (real headless Chromium testing over `file://`, zero console errors, zero uncaught exceptions, all chapters, PDFs, past papers, worksheets, search, bookmarks, and prompt copying verified).

---

## Completed in Task 4
1. **Inspected & Verified All 4 Original Prediction Source Files (`Predictions/`):**
   - Consulted `Predictions/DA2451_Predicted_Questions_HTML_Integration_Guide.md`, `DA2451_Master_Plan.md`, and `Design skills for html app study.md`.
   - Verified all 4 source files read-only against their SHA-256 prefixes (`DA2451_ChatGPT_Predicted_MCQs.md`: `8d2a4ebf3d8307b4`, `DA2451_ChatGPT_Predicted_Essays.md`: `ff7c7395bc447b30`, `da2451_predicted_multiple_choice_questions.md`: `11b4d83a6184b2a6`, `da2451_predicted_essay_questions.md`: `c3b66596d1a8e7f1`).
   - Parsed all **110** questions (`40 + 15 + 40 + 15`) and verified 100% of §12 invariants (`1,033` math expressions with `0` KaTeX errors/warnings, `10` code fences, `5` tables, `80/80` MCQs with `A–D` options, `30/30` essays with reconciled part marks).
2. **Investigated & Resolved `C-ESS-007` Part `(c)` Marks Check:**
   - **Root cause:** In `Predictions/DA2451_ChatGPT_Predicted_Essays.md` lines 208–221, `C-ESS-007` (`LDA Priors, Business Losses and a Test Confusion Matrix (25 marks)`) has parts `(a) [7 marks]`, `(b) [4 marks]`, `(c) [3 marks]`, `(d) [7 marks]`, and `(e) [4 marks]` (`7 + 4 + 3 + 7 + 4 = 25`). Immediately after the first paragraph of part `(c)` (which ends with `**[3 marks]**`), the author placed the introductory sentence and Markdown table for the confusion matrix used by parts `(d)` and `(e)`. A naive parser checking only the last line of the `(c)` slice saw the bottom of the Markdown table instead of `**[3 marks]**`.
   - **Fix:** Updated `parseEssay` in `APP_DEV/scripts/ingest_predictions.js` to check the end of the part's first paragraph (`firstPara`) for the marks badge before falling back to the end of the full slice. All 30/30 essays pass marks reconciliation with zero changes to the source file. Furthermore, `C-ESS-007` is dedicated to LDA and is excluded by the hard curriculum scope filter.
3. **Hard Scope Exclusion & Transparency Audit (`APP_DEV/EXCLUSION_LOG.md`):**
   - Excluded **25 questions** dedicated to **Principal Components Regression (PCR)**, **Regression Diagnostics**, and **Linear Discriminant Analysis (LDA)** (`19` MCQs: `C-MCQ-014..018`, `C-MCQ-023..026`, `G-MCQ-018..023`, `G-MCQ-033..036`; and `6` Essays: `C-ESS-004`, `C-ESS-005`, `C-ESS-007`, `G-ESS-006`, `G-ESS-007`, `G-ESS-013`).
   - Retained **85 in-scope questions** (`61` MCQs: `31` ChatGPT + `30` Gemini; `24` Essays: `12` ChatGPT + `12` Gemini).
   - Logged all 25 excluded questions plus 5 retained integrated/method-selection questions (`C-MCQ-040`, `G-MCQ-039`, `C-ESS-014`, `C-ESS-015`, `G-ESS-015`) in `APP_DEV/EXCLUSION_LOG.md`.
4. **Predicted MCQs & Predicted Essays Views (`APP_DEV/src/app.js`):**
   - Built combined **Predicted MCQs (`61`)** and **Predicted Essays (`24`)** views with **All / ChatGPT / Gemini** generator filters, **All / Bookmarked / Completed / Remaining** status filters, **Browse by source topic** disclosure + **Quick Question Jump** pills, and expandable ChatGPT file-level instructions.
   - Included **zero** invented solutions, answer keys, or grading indicators: MCQs use a neutral **My pick** radio selection with **Clear pick** and an opt-in **Include my tentative pick in the copied AI prompt** checkbox; Essays include a collapsible local **My rough notes / outline** scratchpad.
   - Implemented **Copy AI Prompt** for all 85 displayed predicted questions using the exact §6.2 / §6.3 templates (`<question>\n${q.sourceMd}\n</question>`, ChatGPT `fileInstructions`, essay `partLabels` and `totalMarks`).
5. **Offline Full-Text Global Search, Bookmarks & Progress Persistence (`APP_DEV/scripts/build_search_index.js`, `APP_DEV/src/search.js`):**
   - Built a 1.71 MB pre-indexed search payload (`2,230` records: `2,019` chapter sections, `94` past paper questions/MCQs, `32` practice worksheet questions, `61` predicted MCQs, `24` predicted essays). Hidden answers/solutions are never indexed so search snippets never leak answers.
   - Implemented `#dlg-search` (`Ctrl/⌘+K` or `/`) with section filter chips (`All`, `Chapters`, `Past Papers`, `Practice`, `Predicted MCQs`, `Predicted Essays`), recent searches, suggested topic chips, `<mark>` snippet highlighting, keyboard navigation (`↑`/`↓`/`Enter`), and deep-link navigation.
   - Retained and updated the creator notes on the **Welcome** dialog and **About This App** dialog (`two days of intensive work`, `individually, one by one` with `ChatGPT Plus (GPT-6 High)` and `Gemini Pro (Agron High)`, AI Model Attribution table, and exhausted usage note with 😅).

---

## Preserved Backlog for Task 5 (Final Polish & Production Bundle)
1. **Comprehensive Visual Design Polish & Overall Poppins Typography Review:**
   - Embed offline **Poppins** WOFF2 font weights (`400`, `500`, `600`, `700`) and configure the typographic hierarchy across UI headings, cards, navigation, badges, and controls while preserving crisp KaTeX math and monospace R code legibility.
   - Elevate visual craft across the Dashboard, Countdown Hero, Sidebar, Chapter Reader, Past Paper / Worksheet cards, Predicted Question cards, and Modals to a cohesive, Apple-inspired editorial study aesthetic.
   - Refine custom SVG artwork, subtle motion/transitions (respecting `prefers-reduced-motion`), spacing, and responsive layouts (`1440px`, `1024px`, `768px`, `375px`).
2. **Final End-to-End Verification & Production Audit:**
   - Run all static invariant tests, contrast checks, keyboard accessibility checks, and headless Chromium browser interaction tests across the final production bundle.
