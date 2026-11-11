# DA2451 Lecture PDFs: Offline HTML Integration Guide

**Project:** DA2451 Multivariate Methods in Business, offline single-file Study App  
**Intended developer:** Claude, during the lecture/PDF implementation task  
**Document role:** Technical integration reference for `Lecs/.PDFs/`, not a teaching chapter and not a replacement for `DA2451_Master_Plan.md`.

> **Evidence and scope:** This guide is based on the project folder tree supplied by the project owner on 8 November 2026 and the existing Master Plan. The PDF contents and byte sizes were **not** directly inspected when this guide was authored. The project owner subsequently confirmed adding `Multivariate-Linear-Models.pdf` to `Lecs/.PDFs/`. Claude must inspect filesystem metadata and validate actual source files during the build. Never claim PDF inspection, internal bookmarks, page counts, or content unless independently confirmed.

## 1. Document responsibilities and reading order

Use the following hierarchy to prevent duplicated instructions and wasted context:

1. **`DA2451_Master_Plan.md`**: overall goals, product behavior, constraints, priorities, five-task delivery process, performance and acceptance requirements.
2. **`Design skills for html app study.md`**: aesthetics, visual language, typography, spacing, interactions and animation guidance.
3. **`Lecs/.MDs/DA2451_Lecture_HTML_Integration_Guide.md`**: lecture Markdown ingestion, reading order, formulas, diagrams, and content rendering.
4. **This guide**: only PDF inventory, lecture–PDF associations, packaging, PDF viewer, offline reliability, performance and testing.
5. **Actual `.md` and `.pdf` sources**: ingest *programmatically* when implementing the associated part. Do not read every source document manually into the AI conversation upfront.

In a conflict, user-approved requirements in the Master Plan take priority. Flag conflicts or changed paths explicitly rather than inventing a new policy.

## 2. Actual current folder arrangement

The project owner provided this root location:

```text
D:\Documents\BA Materials\SEM 04\Multivariate Methods\HTML APP content\
├── DA2451_Master_Plan.md
├── Design skills for html app study.md
└── Lecs\
    ├── .MDs\
    │   ├── DA2451_Lecture_HTML_Integration_Guide.md
    │   └── [11 lecture and supplementary teaching Markdown files]
    └── .PDFs\
        ├── Lec1.pdf
        ├── Lec2.pdf
        ├── Lec3.pdf
        ├── Lec5.pdf
        ├── Lec5Extra.pdf
        ├── Lec6.pdf
        ├── Lec7.pdf
        ├── Lec8.pdf
        ├── Lec9.pdf
        ├── Multivariate-Linear-Models.pdf
        └── PCA-R-2013.pdf
```

**Important:** The Master Plan was drafted when files used a different root and a flatter `Lecs/` layout. When executing it, resolve file paths against **this newer, actual folder structure**. Update path references in the Master Plan or build manifest as needed, but do not alter product requirements simply because paths changed.

A directory named `.PDFs` is a **literal folder name**, not a filename extension or a hidden-files rule. Likewise, `.MDs` is a literal folder name. Windows file paths can contain spaces; quote them in shell commands.

## 3. Exact PDF-to-teaching-chapter inventory

The study order comes from the Master Plan, not from alphabetical sorting. Resolve relative paths from `HTML APP content/`.

| Chapter | Teaching source (`Lecs/.MDs/`) | Original PDF (`Lecs/.PDFs/`) | Source state |
|---:|---|---|---|
| 1 | `DA2451_Lec01_Introduction_Teaching.md` | `Lec1.pdf` | Listed |
| 2 | `DA2451_Lec02_Matrix_Algebra_Teaching.md` | `Lec2.pdf` | Listed |
| 3 | `DA2451_Lec03_PCA_Teaching.md` | `Lec3.pdf` | Listed |
| 4 | `DA2451_PCA_R_Methods_Teaching.md` | `PCA-R-2013.pdf` | Listed; supplementary reference |
| 5 | `DA2451_Lec05_Factor_Analysis_Teaching.md` | `Lec5.pdf` | Listed |
| 6 | `DA2451_Lec05_Extra_Factor_Analysis_Teaching.md` | `Lec5Extra.pdf` | Listed; supplementary lecture note |
| 7 | `DA2451_Lec06_Multivariate_Normal_Teaching.md` | `Lec6.pdf` | Listed |
| 8 | `DA2451_Lec07_Mean_Vector_Inference_Teaching.md` | `Lec7.pdf` | Listed |
| 9 | `DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md` | `Lec8.pdf` | Listed |
| 10 | `DA2451_Lec09_MMLR_Teaching.md` | `Lec9.pdf` | Listed |
| 11 | `DA2451_Multivariate_Linear_Models_R_Teaching.md` | `Multivariate-Linear-Models.pdf` | Added by project owner; verify at build |

**Do not invent a `Lec4.pdf`**, infer that a missing filename belongs to the syllabus, or substitute a similarly named PDF. **PCR, Regression Diagnostics and LDA are explicitly excluded** from this application and must not be added through PDF discovery.

### Newly added source verification

The project owner confirmed that `Multivariate-Linear-Models.pdf` has now been placed in `Lecs/.PDFs/`. It is the original source for chapter 11, **Multivariate Linear Models in R**, and must be included in the same offline PDF integration workflow as the other ten documents.

- Confirm the exact filename, file readability, byte count and PDF signature during the build.
- Map the PDF only to `DA2451_Multivariate_Linear_Models_R_Teaching.md`.
- Enable **View Original PDF**, **Open PDF in New Tab**, and **Save Original PDF** for chapter 11 when the file passes validation.
- If any PDF cannot be found or decoded in the actual build environment, report that specific failure without silently replacing it or dropping the chapter.

## 4. Product experience: PDF controls

Each chapter with a matching PDF should provide:

- **View Original PDF**: opens a PDF viewer within the study app; the teaching chapter remains the main reading view.
- **Back to Teaching Chapter**: reliably returns to the same chapter and preferably maintains the last reading position.
- **Open PDF in New Tab**: offer when the browser supports it; use an embedded, temporary `blob:` URL rather than a machine-specific `D:\...` path. New-tab opening may be blocked by the browser; provide in-app viewing as a fallback.
- **Save Original PDF**: allows saving the embedded PDF from the standalone HTML, especially useful where the browser does not provide its own PDF renderer.
- **Source label**: visibly distinguish the lecturer/source PDF from the expanded AI-assisted teaching chapter, without implying that the latter is part of the original PDF.

The PDF control belongs to its matching lecture only. Do not place all PDFs in a giant always-loaded dashboard grid unless that choice is separately approved.

### Viewer interaction recommendations

1. Open a focused, accessible overlay, side panel or reader view consistent with the approved design skill.
2. Provide a clear close/back control, keyboard-accessible controls and visible filename/title.
3. Prefer native PDF rendering using a `Blob` and a temporary object URL in an `<iframe>` or `<object>` where supported. Do not rely on remote PDF services, external viewers, or CDNs.
4. Provide a **Download/Save PDF** fallback when native preview is unavailable or blank. Clearly report when a preview cannot be displayed; do not misrepresent failure as a missing source.
5. Preserve chapter navigation and reader progress when opening/closing the PDF. PDF pages need not be synchronized to Markdown section headings unless a validated page mapping exists.
6. A new tab must be opened directly from the user's click, where feasible, to reduce popup blocking. Treat object-URL lifetime carefully; do not revoke it before the new tab has loaded.
7. Do not advertise text search within the PDF, reliable page linking or annotation support unless implemented and verified in the actual target browsers.

## 5. Packaging in the one-file offline application

The final **student-facing deliverable is one self-contained HTML file**. It must work without the source directory after it has been copied to another machine.

Recommended *build-time* approach:

1. Load all eleven PDF files from `Lecs/.PDFs/` as binary files and validate their PDF signatures and basic readability.
2. Construct a **single authoritative manifest**: stable chapter ID, display title, teaching Markdown path, PDF path (or `null`), PDF byte count, optional checksum and MIME type.
3. During the local build, embed each validated PDF's bytes into the final HTML, e.g. encoded/base64 data blocks or another appropriately escaped static representation. Keep the data inert until requested.
4. **Do not eagerly base64-decode every PDF or instantiate every iframe at startup.** On a chapter's first PDF open, decode only that PDF, create a `Blob` with `application/pdf`, and present its object URL. Cache intelligently only if memory measurements justify it.
5. On closing, clean up unused browser resources when safe; preserve URLs while a separate tab or open viewer still needs them. Avoid leaks from repeated open/close actions.
6. Ensure no reference to `file:///D:/...`, a relative filesystem path, HTTP(S), remote fonts, network CDNs, or external PDF assets is needed at runtime.
7. Keep teaching Markdown, search data and PDF data separate in the build's internal data structures. PDF bytes should not be indexed into global text search and should not be accidentally converted into visible page text.

**Size caveat:** Base64 adds roughly one third to the original PDF byte total, and the browser may hold multiple temporary copies during decoding. Measure the resulting HTML file size and cold-start time. If size or RAM becomes impractical, report actual measurements and propose a user-approved alternative; **never silently remove PDFs or violate the one-file/offline requirement**.

### Suggested manifest shape (illustrative; not a statement of existing files)

```json
{
  "chapterId": "lec-03-pca",
  "title": "Principal Component Analysis",
  "markdownPath": "Lecs/.MDs/DA2451_Lec03_PCA_Teaching.md",
  "pdfPath": "Lecs/.PDFs/Lec3.pdf",
  "pdfAvailable": true,
  "isSupplement": false
}
```

For chapter 11, use `pdfPath: "Lecs/.PDFs/Multivariate-Linear-Models.pdf"` and `pdfAvailable: true` after confirming the file is present and valid. All chapter IDs must remain stable across rebuilds.

## 6. Performance rules

PDF embedding is likely to dominate file size. The following are required, not optional polish:

- Render the opening dashboard immediately without decoding PDFs or mounting PDF iframes.
- Load PDF bytes into memory only when a matching chapter's **View Original PDF** control is activated.
- Use a lightweight loading indication for PDF viewer activation, but avoid elaborate entrance animations.
- Do not preload all PDFs simply because the user opens the Lectures section.
- Do not construct all 11 Markdown chapter DOM trees at startup; use the Master's lazy chapter-rendering strategy.
- Avoid expensive whole-document string manipulation or PDF decoding in frequent rendering loops.
- Handle binary encoding robustly for PDF files with non-ASCII bytes; avoid Unicode string corruption or double encoding.
- Use subtle, reduced-motion-friendly animation only; the original PDF must remain readable and scrollable.
- The offline viewer must not pause or interfere with exam countdown updates, copy-prompt actions or bookmarks.

At minimum, measure: output HTML byte size, initial load latency, time until dashboard is usable, first PDF open latency, repeat PDF open latency, and browser memory during repeated PDF viewing. Use real measured values, not invented benchmarks.

## 7. Integrity and provenance

- Preserve the original PDF **byte-for-byte** in the embedded payload where possible; do not rewrite, downsample or OCR PDFs unless independently authorized.
- Respect the exact mapping table. Never substitute an approximate source by topic name alone.
- Never label an expanded teaching explanation as verbatim lecturer content.
- Do not add invented page numbers, extracted figures, publisher claims, authored dates or source summaries.
- If a PDF is corrupt, encrypted, unreadable, too large or unexpectedly different from its filename, flag this in the build audit and select an honest fallback.
- PDF-specific handling does **not** change mathematical, citation, code or Markdown-integrity rules defined by the lecture integration guide.

## 8. Build-time validation, not an AI reading marathon

Claude should **not** consume every page of every PDF manually as chat context. Instead:

1. Obtain a machine-generated inventory of filenames, exact paths, sizes and checksums.
2. Check each file exists, is nonempty, begins with a plausible PDF header, and can be opened by a local PDF parser or native viewer.
3. Optionally count pages automatically for source auditing, but do not treat this as academic verification.
4. Generate the chapter-to-PDF manifest from the table in section 3.
5. Build the HTML PDF payloads using local tooling, without copying PDF text into prompts.
6. Manually inspect **representative pages or only problematic PDFs** to investigate rendering issues. The PDF embedding task does not require transcribing their contents.
7. Run real browser tests and record outcomes. If any source cannot be packaged, state which one and why.

This guide intentionally does **not** request a new teaching book, PDF transcription, content summary or duplicate lecture integration guide.

## 9. Offline and browser acceptance tests

Test the final HTML as a literal `file://` document, ideally in Chromium-based Brave/Chrome and Firefox, with the internet disconnected.

- [ ] Opening the HTML shows the dashboard promptly without PDF decoding.
- [ ] All eleven inventoried PDF-to-chapter associations are exactly correct.
- [ ] Each matching chapter offers **View Original PDF**.
- [ ] Chapter 11 offers its full Markdown content and the matching `Multivariate-Linear-Models.pdf` viewer and download controls.
- [ ] Every included PDF renders in the in-app viewer, or a clear save/open fallback appears.
- [ ] **Open in New Tab** works where supported, or a graceful fallback is shown.
- [ ] **Save Original PDF** yields a valid PDF matching the source bytes (checksum comparison recommended).
- [ ] Closing and reopening the viewer does not break the PDF or teaching chapter.
- [ ] Switching between PDFs does not display the previous chapter's document.
- [ ] PDF viewer remains usable on narrow/mobile-sized viewports, with a download fallback if browser-native embedding fails.
- [ ] Keyboard operation and focus handling work; users can escape the viewer.
- [ ] No network requests are required for PDF rendering.
- [ ] File works after being moved away from the source folders to a different local directory.
- [ ] Repeated PDF viewing does not cause unchecked memory growth or freeze the countdown.
- [ ] The HTML size and cold-start performance are measured and recorded in the final build report.

## 10. Precise handoff to Claude

**When to read this guide:** At the beginning of **Task 2: Learning Chapters and PDFs**, after reviewing the Master Plan and the relevant lecture Markdown integration guide. It may also be used again during Task 5 testing.

**When not to read it:** It is unnecessary while implementing past papers, practice worksheets, predictions, or the initial dashboard alone, unless architecture decisions would make PDF embedding impossible.

**Expected Task 2 deliverables:**

1. A verified 11-chapter manifest with **11 explicitly mapped PDFs**, including `Multivariate-Linear-Models.pdf`.
2. The lecture Markdown reader, connected to the appropriate source PDF controls.
3. Embedded PDF bytes in the final single-file HTML (for PDFs actually supplied), decoded on demand.
4. In-app PDF viewer, new-tab option where viable, and save/open fallback.
5. A concise audit of present/missing PDFs, tested browser behavior, measured output size and performance.

**Do not regenerate or rewrite** the 11 teaching Markdown files, the Design Skill, or the Master Plan during Task 2. Source content is input, not an output to be re-authored.

---

*Prepared for the DA2451 offline Study App; PDF inventory grounded in the project owner's supplied `tree /F /A` output plus the subsequent confirmation of the eleventh PDF. This guide provides integration instructions, not proof of PDF content verification.*
