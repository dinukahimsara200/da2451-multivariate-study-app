# DA2451 Study App — Final Production Release Summary & Audit Report

**Release Date:** November 2026  
**Deliverable File:** `APP_DEV/dist/DA2451_Study_App.html`  
**Bundle Size:** `55.88 MB` (`58,598,539 bytes`)  
**Runtime Architecture:** 100% Offline Standalone Single-File HTML (`file://` compatible, zero external runtime dependencies)  
**Creator & Lead System Architect:** **Dinuka Himsara** (Faculty of Business Analytics)  
**Release Recommendation:** **GO (Approved for Production Distribution)**

---

## 1. Root Cause Analysis of the Excessive Vertical Scrolling Bug

During manual review in Brave, scrolling down on the **Dashboard** and other views revealed ~844px–1,180px of empty blank space after the final visible content, and switching from a long view (such as a learning chapter) back to the Dashboard could leave the user stranded in an empty lower scroll region.

A live DOM and computed-style inspection in headless Chromium (`APP_DEV/tests/verify_scroll.js`) identified **three compounding root causes**:

### Root Cause A — Unconditional `display: flex` on Closed `<dialog>` Elements (`APP_DEV/src/styles.css`)
- **Mechanism:** `dialog.dlg-editorial` declared `display: flex;` without an `[open]` attribute selector, accompanied by `dialog:not([open]) { pointer-events: none; opacity: 0; }`.
- **Impact:** In browser user-agent stylesheets, closed `<dialog>` elements rely on `dialog:not([open]) { display: none; }` to remove them from layout flow, and default to `position: absolute` when displayed. Overriding `display: none` with `display: flex` forced `#dlg-about` (height ~1,496px) to remain laid out invisibly (`opacity: 0`) at its static position at the bottom of `<body>`, inflating `document.documentElement.scrollHeight` by **~655px–844px** below every short view.

### Root Cause B — Duplicated Orphaned Dialog Tail Outside `</dialog>` (`APP_DEV/scripts/build.js`)
- **Mechanism:** Lines 790–817 in `APP_DEV/scripts/build.js` contained a 27-line duplicated tail of `#dlg-about` (`notice-predicted`, `Content Integrity & Scope` list, `details.pp-details`, and stray `</div></div></dialog>` tags) placed directly under `<body>` after `#dlg-about` had already closed.
- **Impact:** Added **~735px** of stray rendered block height directly at the bottom of `<body>` below `.app`.

### Root Cause C — Unclamped Route Scroll Restoration (`APP_DEV/src/app.js`)
- **Mechanism:** `scrollPositions` was only updated inside `renderRoute()` right as `hashchange` fired (after `currentRoute` or layout heights had already begun changing), and overview/library routes could inherit or restore stale scroll offsets from previously visited views without clamping to the destination view's actual scrollable range.
- **Impact:** Navigating from a deep scroll offset in a long chapter (`scrollY = 9,000px`) back to `#dashboard` or `#papers` could leave the viewport scrolled past the shorter view's content.

### Additional Polish Fix — `ViewTransition` Promise Rejection Guard (`APP_DEV/src/app.js`)
- **Mechanism:** Rapid consecutive theme switches (e.g., clicking a theme tile and immediately clicking Continue) caused Chromium's `document.startViewTransition()` `.ready` / `.finished` promises to reject with `AbortError: Transition was skipped`.
- **Fix:** Attached `.catch(() => {})` guards to `vt.ready` and `vt.finished` in `applyTheme()`.

---

## 2. Code-Level Fixes Implemented

1. **`APP_DEV/src/styles.css` (Lines 2128–2145):**
   - Removed unconditional `display: flex;` from `dialog.dlg-editorial`.
   - Added `dialog.dlg-editorial[open] { display: flex; }`, ensuring all closed `<dialog>` elements compute to `display: none` and occupy zero layout space.
2. **`APP_DEV/scripts/build.js` (Lines 789–790):**
   - Removed the 27-line duplicated `#dlg-about` tail markup outside `</dialog>`.
3. **`APP_DEV/src/app.js` (Lines 130–134, 534–536, 1586–1593, 1800–1837):**
   - Added `routeSwitching` guard and continuous scroll position tracking inside the passive `requestAnimationFrame` scroll listener (`if (!routeSwitching) scrollPositions[currentRoute] = y;`).
   - Scoped scroll position restoration strictly to long reading views (`const isReadingRoute = /^(chapter|paper|worksheet)\//.test(rawHash);`), clamped to `Math.max(0, document.documentElement.scrollHeight - window.innerHeight)`.
   - Configured overview and library routes (`#dashboard`, `#chapters`, `#papers`, `#practice`, `#predicted-mcqs`, `#predicted-essays`, `#bookmarks`) to always open cleanly at the top (`scrollY = 0`).
   - Added `.catch(() => {})` handlers on `document.startViewTransition()` promises.

---

## 3. Before vs. After Scroll Geometry Measurements

| Viewport / View | Before Fix (`scrollHeight` / Blank Space Below Content) | After Fix (`scrollHeight` / Blank Space Below Content) | Status |
|---|---|---|---|
| **Dashboard (`1440×900` Light)** | `2,517px` (`844px` blank void below `.dash-footer`) | `1,673px` (`72px` intended bottom padding) | **FIXED** |
| **Dashboard (`1440×900` Dark)** | `2,517px` (`844px` blank void below `.dash-footer`) | `1,673px` (`72px` intended bottom padding) | **FIXED** |
| **Dashboard (`390×844` Mobile)** | `3,190px` (`~980px` blank void below `.dash-footer`) | `2,248px` (`96px` intended bottom padding) | **FIXED** |
| **Chapters Library (`1440×900`)** | `2,012px` (`844px` blank void) | `1,168px` (`72px` intended bottom padding) | **FIXED** |
| **Past Papers Library (`1440×900`)** | `1,890px` (`844px` blank void) | `1,046px` (`96px` intended bottom padding) | **FIXED** |
| **Predicted MCQs (`1440×900`)** | Excess tail below final card | `72px` desktop / `96px` mobile bottom padding | **FIXED** |
| **Predicted Essays (`1440×900`)** | Excess tail below final card | `72px` desktop / `96px` mobile bottom padding | **FIXED** |
| **Chapter 3 → Dashboard Route Switch** | Could retain invalid deep scroll offset | Opens cleanly at `scrollY = 0`; returning to Chapter 3 restores `scrollY = 9,000px` | **FIXED** |

---

## 4. Verified Academic Content Inventory & Source Integrity

All original source files (`Lecs/.MDs/`, `Lecs/.PDFs/`, `PPs/`, `PQs/`, `Predictions/`, `DA2451_Master_Plan.md`, `Design skills for html app study.md`) remain **100% untouched** and verified against their SHA-256 hashes:

| Content Category | Count | Verification Details |
|---|---:|---|
| **Learning Chapters** | **11** | 8 core lectures (`Lec01`–`Lec03`, `Lec05`–`Lec09`) + 3 supplementary chapters (`PCA-R`, `Lec05Extra`, `Multivariate-Linear-Models-R`). 100% pre-rendered KaTeX + highlighted R code + expandable TOC. |
| **Embedded Original Lecture PDFs** | **11** | All 11 PDFs (`Lec1.pdf` through `Multivariate-Linear-Models.pdf`) embedded as lazy base64 payloads (`#pdf-b64-ch01`..`#pdf-b64-ch11`), verified byte-for-byte via SHA-256 and decoded on demand into `Blob` URLs. |
| **Historical Past Papers** | **9** | Batches 19–23 (Finals, In-Class, Quizzes 1–3). **201/201** question-to-answer pairings audited (`APP_DEV/AUDIT_MAPPINGS.md`), `6,203` math expressions, `59` code fences, `26` tables, `0` KaTeX errors. |
| **Practice Question Worksheets** | **5** | `PQ01`–`PQ05` (`32` interactive question cards, `3,999` math expressions, `90` code fences, `94` tables, `40/40` internal anchors resolved). |
| **AI-Predicted Questions (In-Scope)** | **85** | **61 MCQs** (`31` ChatGPT + `30` Gemini) and **24 Essays** (`12` ChatGPT + `12` Gemini). **25** out-of-scope PCR / Regression Diagnostics / LDA items hard-excluded and logged in `APP_DEV/EXCLUSION_LOG.md`. Zero invented answer keys; 100% equipped with **Copy AI Prompt**. |
| **Offline Full-Text Search Index** | **2,230** | `2,019` chapter sections, `94` past paper items, `32` worksheet items, `61` predicted MCQs, `24` predicted essays (`1.71 MB` pre-indexed JSON; hidden answers never leaked in snippets). |

---

## 5. AI Model Attribution & Creator Credit Audit

Verified across the **First-Launch Welcome Sheet (`#dlg-welcome`)**, **About This App (`#dlg-about`)**, **Dashboard Footer**, and **Sidebar Footer**:
- **Creator Credit:** Prominently displays **Made by Dinuka Himsara** (`Curator & Lead System Architect · Faculty of Business Analytics`) with an unclipped profile card (`height = 256.1px` on desktop, `340px+` on mobile).
- **Academic Content Generation Models:**
  - **ChatGPT Plus (GPT-6 High)** — 11 Learning Chapters, 5 Practice Worksheets (`PQ01`–`PQ05`), and ChatGPT Predicted Questions, prepared individually one by one.
  - **Gemini Pro (Gemini 4 Argon High)** — 9 Historical Examination Papers (Batches 19–23) and Gemini Predicted Questions, derived and verified individually one by one (zero `Agron` typos, zero duplicated model strings).
- **Software Engineering & Architecture Tools:**
  - **Claude Sonnet 5.5 Medium** & **Google Antigravity** (agentic development environment) — clearly distinguished from the academic content generation models, including the transparent multi-model quota handover note (`😅`).

---

## 6. Automated & Real-Browser Verification Summary

All 6 verification suites passed with **0 errors and 0 failures**:

1. **`node APP_DEV/tests/verify_task1.js` — PASS**
   - Offline purity (zero external `http(s)://` scripts, stylesheets, images, fonts, or `@import` rules; zero `hidden="until-found"`).
   - 37/37 Light (parchment) and Dark (carbon slate) token contrast ratios pass WCAG AA/AAA thresholds ($\ge 4.5:1$ UI/secondary, $\ge 7:1$ body prose).
   - Exam countdown state transitions (`before` → `live` → `after` for November 18, 2026, 9:00 AM–12:00 PM SLST) verified.
2. **`node APP_DEV/tests/verify_lectures.js` — PASS**
   - All 11 teaching chapters and all 11 embedded base64 PDFs verified (exact byte lengths and SHA-256 digests).
3. **`node APP_DEV/tests/verify_papers_pqs.js` — PASS**
   - All 9 past papers (201 pairings, 230 prompt records), 5 worksheets (32 interactive cards), and `AUDIT_MAPPINGS.md` verified.
4. **`node APP_DEV/tests/verify_task4.js` — PASS**
   - All 4 prediction source files untouched, 85 in-scope items and 25 exclusions verified, 2,230 search records verified, creator notes and model attributions verified.
5. **`node APP_DEV/tests/verify_browser.js` — PASS**
   - Full end-to-end headless Edge/Chromium run over `file://`: all 11 chapters + 11 PDFs opened/closed, all 9 past papers + 5 worksheets rendered with zero raw LaTeX/Markdown in headings, zero horizontal overflow and zero bounding-box collisions across `320px`, `390px`, `768px`, `1024px`, `1280px`, and `1440px`, custom favicon, `12px–22px` font-size slider persistence, unclipped creator profile (`256.1px`), independent sidebar scrolling, and `0` console errors / `0` uncaught exceptions.
6. **`node APP_DEV/tests/verify_scroll.js` — PASS**
   - All 10 vertical-scroll regression sections (`S1`–`S10`) passed: closed `<dialog>` elements `display: none`, zero stray `<body>` children, `72px` desktop / `96px` mobile bottom padding across 11 views × 6 viewports, Light/Dark theme switch geometry, mouse wheel and `Home`/`End` keyboard scrolling in both directions, route scroll isolation across `#chapter/ch03` ↔ `#dashboard` ↔ `#papers` + Back/Forward/Reload, all 4 modal dialogs open/close with zero height/scroll drift, worked solution reveal/hide height & scroll restoration (`22,920px → 24,744px → 22,920px`), PDF viewer & `12px`/`16px`/`22px` font scaling, nested scroll container audit, lazy chapter hydration stability, and `0` uncaught exceptions.

---

## 7. Final Release Decision

**STATUS: GO — PRODUCTION RELEASE APPROVED**

Distribute the single standalone file:
`APP_DEV/dist/DA2451_Study_App.html` (`55.88 MB`)
