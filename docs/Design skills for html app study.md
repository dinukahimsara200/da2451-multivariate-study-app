# Design skills for html app study

**DA2451 – Multivariate Methods in Business · University of Moratuwa · Semester 4**
**Authoritative visual, interaction and motion specification for the single-file offline study app**

| | |
|---|---|
| Audience | Claude, the final application developer |
| Companion documents | `DA2451_Master_Plan.md` (what the app does) and the five `*_HTML_Integration_Guide.md` files (how each content type behaves) |
| This document answers | How the app **looks, feels, moves and responds** |
| This document does not contain | Content inventories, source-file mappings, parsing rules, build pipeline, development tasks. Those live in the Master Plan and guides and are referenced, never repeated |
| Rewrite note | This replaces the earlier, broader version. Pipeline, audit scripts, architecture and delivery-report material from that version were removed because the Master Plan and integration guides now own them |

---

## Contents

1. Authority, conflicts and how to use this file
2. Design identity and principles
3. Design tokens (CSS) and theme mechanics
4. Typography, mathematics, code and tables
5. Iconography and the SVG system
6. Application shell and navigation
7. Dashboard
8. Lecture reading experience
9. Question and answer interfaces (including the Copy AI Prompt system)
10. Motion system
11. Interaction standards
12. Performance-first design rules
13. Accessibility and responsiveness
14. Implementation recipes
15. Visual QA checklist, anti-patterns and trade-off rules

---

## 1. Authority, conflicts and how to use this file

### 1.1 Order of authority

1. **Master Plan** decides functionality, content scope, offline constraints and workflow.
2. **Integration guides** decide how each content type is structured and which rendering hazards exist.
3. **This file** decides appearance, interaction feel and motion.
4. If this file ever demands something the Master Plan forbids (a network request, an eager PDF decode, an invented answer), **the Master Plan wins** and the design adapts.

### 1.2 Conflicts found between the supplied documents, and how they are resolved

| # | Conflict | Resolution used in this design |
|---|---|---|
| C1 | The Predicted guide counts 110 questions (80 MCQ, 30 essay) and keeps PCR / regression-diagnostics / LDA items; the Master Plan excludes those items from display. | Master Plan wins for what is shown. **Never hard-code counts in the UI or in copy.** Every number (filters, progress, headers) is computed from the data actually displayed. |
| C2 | The Master Plan lists the Past Papers guide as "Pending"; it has been supplied. | Treat it as available. Design for its nine papers, three paper types (final, in-class, quiz), mixed MCQ + essay papers and the DA3420 → DA2451 course-code change. |
| C3 | The Master Plan's creator note has no emoji; the Predicted guide's verbatim creator note contains one (😅). | Use the creator's exact wording wherever it is supplied. That one emoji, **inside that verbatim sentence only**, is the sole permitted emoji in the product. No emoji as icons, bullets or decoration. |
| C4 | The earlier design skill proposed per-question statuses such as "confident / unsure" and a command palette. The Master Plan asks for **completed** flags, **bookmarks**, last position and global search. | Ship exactly: bookmark, completed, last position, global search. Optional neutral "revisit" is not required and must not be added if it complicates the card. Search is a dialog (Ctrl/⌘+K or `/`), not a command palette. |
| C5 | The Lecture PDF guide says the viewer should be "consistent with the approved design skill" but offers no visuals. | Section 8.9 defines the PDF viewer chrome. |
| C6 | The earlier skill suggested embedding subsetted web fonts. The Master Plan prioritises speed and bundle size. | Default is a **system font stack with no embedded text fonts**. Only KaTeX's own math fonts are embedded (required by the lecture guide). An embedded font is an opt-in decision, see 4.1. |
| C7 | Section names: Master Plan uses "Learning Chapters", "Past Papers", "Practice Questions", "Predicted Questions" (split into **Predicted MCQs** and **Predicted Essays**). | Use these exact names in navigation, headings and breadcrumbs. Do not invent playful alternates. |

### 1.3 Using this file

- Treat sections 3, 4 and 14 as copy-paste starting points; treat the rest as rules.
- Anything marked **Must** is a requirement. **Should** is strong default. **May** is optional polish that is dropped first if it costs speed.
- Values labelled "approximate" (contrast ratios, pixel sizes) are design targets. Verify them with the QA script in 15.1 before release.
- You may adjust a token value to fix a measured contrast, readability or performance problem. You may not add new hues, new radii, new shadow styles or new animation curves without a written reason in the build notes.

---

## 2. Design identity and principles

### 2.1 Thesis

> **A quiet, well-lit study room for difficult mathematics.** Precise like a journal, calm like a native Apple app, and never louder than the content it carries.

The app is used for long revision sessions on laptops and phones, often late, often under exam stress. It must reduce effort. Beauty here is *clarity, rhythm and restraint*; the product should feel carefully made, not decorated.

### 2.2 Signature idea: the Axis

Multivariate analysis is about structure in many-dimensional data. One idea carries the identity, and it is **real geometry, not decoration**:

> A covariance ellipse with its two principal axes.

It appears in exactly four places, always with correct geometry:

1. The **monogram** in the sidebar header (ellipse + two axes, 24 px).
2. The **dashboard countdown** backdrop (a large, faint, true ellipse with PC1/PC2 axes; section 5.4).
3. **Empty states** (a dashed ellipse: "nothing here yet, structure to come").
4. The **Predicted Questions** icon (dashed ellipse = tentative, speculative).

Do not scatter it anywhere else. Restraint is what makes it memorable. Everything around it is quiet.

### 2.3 Aesthetic in one paragraph

Apple-inspired minimalism: system typography, cool near-neutral surfaces, hairline borders instead of heavy shadows, generous but disciplined whitespace, one confident blue accent, and grouped-list patterns (as in iOS Settings) instead of grids of identical cards. Mathematical elegance comes from *numerals, notation and geometry* (tabular figures, well-set equations, the Axis), never from pseudo-data charts.

### 2.4 Principles (ranked)

1. **Academic readability first.** If something looks beautiful but slows reading, solving or finding, remove it.
2. **Fast and responsive.** First paint feels instant; interactions respond within one frame; no decorative work at startup.
3. **One system.** Same tokens, same states, same card anatomy for lectures, papers, worksheets and predictions.
4. **Content is the hero.** Chrome recedes. Equations, tables and R code get the best space.
5. **Honest signalling.** Official material, practice material and AI predictions are always distinguishable. Nothing implies correctness that does not exist.
6. **Motion explains.** Animation answers an action or shows what changed. It never entertains.
7. **Accessible by construction.** Contrast, focus, targets, reduced motion and semantics are part of each component, not a later pass.

### 2.5 What to avoid (specific to this product)

Generic dashboard look; gradient or glow heroes; glassmorphism and backdrop blur; identical icon-title-sentence card grids; stacked drop shadows; neon or acid accents; warm-cream-plus-terracotta "AI editorial" palette; all-caps tracked eyebrow labels above every heading; middle-dot meta strings on every element; emoji as icons; decorative charts with invented numbers; mascots and stock illustration; confetti or celebratory animation; streaks, scores, percent-correct or leaderboards.

---

## 3. Design tokens (CSS) and theme mechanics

### 3.1 Colour philosophy

- Two themes designed independently, not inverted. Dark is not "light with filters".
- Neutrals are **cool, slightly blue-tinted** (Apple-adjacent but original). No pure `#fff` page, no pure `#000` page, no pure-white text on dark.
- **One accent (Axis Blue)** for links, focus, current location, primary actions and selection.
- Two *meaning-bearing* tones that are reserved and never reused for anything else:
  - **Prompt violet**: only the Copy AI Prompt feature (and its "Explain this solution" sibling).
  - **Predicted amber**: only unofficial AI-predicted material and its notices.
- Semantic green / red / amber are for system feedback only (copy success, errors, warnings). **Green and red never appear on MCQ options or answers.**
- Meaning is never colour alone; always add text, a shape or an icon.

### 3.2 Core tokens

Paste into the single `<style>` block. All components consume tokens only; no hard-coded colours inside components.

```css
:root {
  color-scheme: light dark;

  /* ---------- Colour: light ---------- */
  --bg:            #F5F5F7;   /* app canvas */
  --surface:       #FFFFFF;   /* cards, reading sheet */
  --surface-2:     #FAFAFC;   /* nested surfaces, table headers */
  --sunken:        #EDEEF2;   /* code, answer panels, inputs */
  --ink:           #1D1D1F;   /* primary text */
  --ink-2:         #4B4C52;   /* secondary text */
  --ink-3:         #6A6B72;   /* captions, meta (>= 4.5:1 on --surface) */
  --rule:          rgba(29, 29, 31, .10);
  --rule-strong:   rgba(29, 29, 31, .20);

  --accent:        #2F55D4;   /* Axis Blue */
  --accent-ink:    #FFFFFF;   /* text on filled accent */
  --accent-soft:   rgba(47, 85, 212, .09);
  --accent-line:   rgba(47, 85, 212, .35);
  --focus:         #2F55D4;

  --prompt:        #6A46D0;   /* Prompt violet: AI-prompt actions only */
  --prompt-soft:   rgba(106, 70, 208, .09);
  --prompt-line:   rgba(106, 70, 208, .32);

  --predicted:      #8A5A00;  /* Predicted amber text */
  --predicted-soft: #FFF5DC;
  --predicted-line: rgba(138, 90, 0, .40);

  --ok:   #1B7A45;  --ok-soft:   rgba(27, 122, 69, .10);
  --warn: #8A5A00;  --warn-soft: rgba(138, 90, 0, .10);
  --err:  #B3261E;  --err-soft:  rgba(179, 38, 30, .09);

  --mark:          rgba(255, 214, 10, .38);  /* search highlight */
  --scrim:         rgba(14, 15, 18, .38);
  --code-bg:       #F1F2F6;
  --code-ink:      #24252B;

  /* R syntax (light) */
  --syn-kw: #7A3EB8; --syn-fn: #1F5FBF; --syn-str: #1F7A4A;
  --syn-num: #B25A00; --syn-cm: #6A6B72; --syn-op: #4B4C52;

  /* ---------- Typography ---------- */
  --font-ui: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI Variable Text",
             "Segoe UI", system-ui, Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  --font-display: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI Variable Display",
             "Segoe UI", system-ui, Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-serif: "Iowan Old Style", "Charter", "Source Serif 4", "Palatino Linotype", Palatino,
             Georgia, "Noto Serif", serif;
  --font-mono: ui-monospace, "SF Mono", "Cascadia Mono", Menlo, Consolas,
             "DejaVu Sans Mono", "Liberation Mono", monospace;
  --font-read: var(--font-ui);              /* switched to --font-serif by Reading settings */

  --fs-xs:   .75rem;     /* 12  chips, captions */
  --fs-sm:   .8125rem;   /* 13  meta, table dense */
  --fs-base: .9375rem;   /* 15  UI text */
  --fs-md:   1.0625rem;  /* 17  question text, small headings */
  --fs-lg:   1.25rem;    /* 20  card titles */
  --fs-xl:   1.625rem;   /* 26  page titles (mobile) */
  --fs-2xl:  clamp(1.75rem, 1.35rem + 1.6vw, 2.5rem);     /* chapter / page titles */
  --fs-3xl:  clamp(2.25rem, 1.5rem + 3vw, 3.75rem);       /* dashboard title */
  --fs-count: clamp(2.5rem, 1.6rem + 4.4vw, 4.75rem);     /* countdown numerals */
  --fs-read: clamp(1.0625rem, 1rem + .25vw, 1.1875rem);   /* 17 to 19, scaled by user size step */
  --read-scale: 1;                                         /* 0.9 / 1 / 1.1 / 1.2 / 1.3 */
  --lh-tight: 1.15;  --lh-ui: 1.45;  --lh-read: 1.68;  --lh-math: 1.9;

  /* ---------- Space (4 px base; every gap comes from this list) ---------- */
  --s-1: 4px;  --s-2: 8px;  --s-3: 12px; --s-4: 16px; --s-5: 20px; --s-6: 24px;
  --s-7: 32px; --s-8: 40px; --s-9: 56px; --s-10: 72px; --s-11: 96px;

  /* ---------- Radius: different roles, different radii ---------- */
  --r-xs: 6px;      /* chips, kbd, inline code */
  --r-sm: 10px;     /* buttons, inputs, list rows */
  --r-md: 14px;     /* cards, code blocks, answer panels */
  --r-lg: 20px;     /* dialogs, sheets, countdown panel */
  --r-pill: 999px;  /* segmented controls, status pills, toasts */

  /* ---------- Elevation: borders first, shadows only for overlays ---------- */
  --shadow-1: 0 1px 2px rgba(16, 17, 20, .05);
  --shadow-pop: 0 14px 34px -10px rgba(16, 17, 20, .22), 0 2px 8px rgba(16, 17, 20, .07);
  --shadow-sheet: 0 28px 70px -18px rgba(16, 17, 20, .35), 0 4px 14px rgba(16, 17, 20, .08);

  /* ---------- Motion ---------- */
  --ease-out: cubic-bezier(.2, .8, .2, 1);        /* entrances, reveals */
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);      /* repositioning */
  --ease-soft-spring: cubic-bezier(.34, 1.35, .5, 1); /* bookmark only */
  --t-press: 80ms;  --t-fast: 140ms;  --t-base: 200ms;  --t-slow: 280ms;  --t-sheet: 320ms;

  /* ---------- Layout ---------- */
  --topbar-h: 56px;
  --sidebar-w: 280px;
  --rail-w: 72px;
  --toc-w: 264px;
  --measure: 44rem;               /* reading column; Narrow 38rem, Standard 44rem, Wide 56rem */
  --page-max: 1200px;
  --tabbar-h: 56px;
  --safe-b: env(safe-area-inset-bottom, 0px);
  --safe-t: env(safe-area-inset-top, 0px);

  /* ---------- Layers ---------- */
  --z-sticky: 20; --z-nav: 30; --z-popover: 60; --z-dialog: 80; --z-toast: 100;
}

/* ---------- Dark (designed, not inverted) ---------- */
:root[data-theme="dark"] {
  --bg:            #0E0F12;
  --surface:       #16181C;
  --surface-2:     #1B1D22;
  --sunken:        #202228;
  --ink:           #ECECEF;
  --ink-2:         #B7B9C1;
  --ink-3:         #9094A0;
  --rule:          rgba(236, 236, 239, .11);
  --rule-strong:   rgba(236, 236, 239, .22);

  --accent:        #8FA4FF;
  --accent-ink:    #0E1230;
  --accent-soft:   rgba(143, 164, 255, .12);
  --accent-line:   rgba(143, 164, 255, .40);
  --focus:         #9DB0FF;

  --prompt:        #BBA6FF;
  --prompt-soft:   rgba(187, 166, 255, .12);
  --prompt-line:   rgba(187, 166, 255, .38);

  --predicted:      #F1C56D;
  --predicted-soft: #2A2314;
  --predicted-line: rgba(241, 197, 109, .42);

  --ok:   #5CCF8C;  --ok-soft:   rgba(92, 207, 140, .13);
  --warn: #F1C56D;  --warn-soft: rgba(241, 197, 109, .13);
  --err:  #FF8F86;  --err-soft:  rgba(255, 143, 134, .13);

  --mark:    rgba(255, 214, 10, .28);
  --scrim:   rgba(0, 0, 0, .55);
  --code-bg: #1B1D23;  --code-ink: #E4E5EA;

  --syn-kw: #C7A2FF; --syn-fn: #8FB8FF; --syn-str: #7BD9A0;
  --syn-num: #F2B26B; --syn-cm: #8E92A0; --syn-op: #B7B9C1;

  --shadow-1: 0 1px 2px rgba(0, 0, 0, .4);
  --shadow-pop: 0 16px 38px -10px rgba(0, 0, 0, .65), 0 2px 8px rgba(0, 0, 0, .4);
  --shadow-sheet: 0 32px 80px -18px rgba(0, 0, 0, .75), 0 4px 14px rgba(0, 0, 0, .45);
}

/* "System" theme: resolve before paint with the boot script; this is the no-JS fallback */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) { /* repeat the dark block here only if you need no-JS dark; otherwise omit */ }
}
```

**Contrast targets** (approximate; verify with 15.1): body text ≥ 10:1 light and ≥ 12:1 dark; `--ink-3` ≥ 4.5:1 on its surface in both themes; accent text on `--surface` ≥ 4.5:1; focus ring ≥ 3:1 against both the element and its surroundings; UI boundaries that carry meaning ≥ 3:1.

### 3.3 Theme mechanics

**Boot script (first thing in `<head>`, before the stylesheet, inline, tiny).** It prevents any flash:

```html
<script>
(function () {
  var t = null;
  try { t = localStorage.getItem('da2451:theme'); } catch (e) {}   // 'light' | 'dark' | 'system' | null
  var dark = t === 'dark' || ((t === 'system' || t === null) &&
             window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
  var el = document.documentElement;
  el.setAttribute('data-theme', dark ? 'dark' : 'light');
  el.setAttribute('data-theme-pref', t || 'unset');                 // 'unset' triggers the welcome sheet
  var m = document.querySelector('meta[name=theme-color]');
  if (m) m.content = dark ? '#0E0F12' : '#F5F5F7';
})();
</script>
```

Rules:

- Theme switching is **one attribute change**; every colour flows from custom properties. No per-element JS.
- If preference is `system`, listen to `matchMedia('(prefers-color-scheme: dark)')` and update live.
- Update `<meta name="theme-color">` and `color-scheme` so mobile browser chrome, scrollbars and form controls follow.
- Theme change animation: see 10.3 #9 (a single, cheap viewport crossfade via the View Transitions API where supported, otherwise an instant swap; never a whole-tree colour transition).
- Both themes must be reviewed with real long passages, equations, tables, code and PDFs before release.

### 3.4 Focus, selection and interaction states

Defined once; every interactive element inherits.

| State | Treatment |
|---|---|
| Default | Token colours, no shadow unless an overlay |
| Hover (pointer only, `@media (hover:hover)`) | Background shifts one step (`--sunken` or `--accent-soft`); never a size change |
| Focus-visible | `outline: 2px solid var(--focus); outline-offset: 2px;` (rounded to match the element). Never remove outlines |
| Active / pressed | `transform: scale(.98)` for ≤ 80 ms; background one step deeper |
| Selected | `--accent-soft` fill + `--accent-line` border + text/shape cue (check, "Selected", filled letter badge) |
| Disabled | 45% opacity, `cursor: not-allowed`, `aria-disabled`; keep text legible; never the only way to learn *why* |
| Busy | Label changes ("Preparing…"), `aria-busy="true"`, no spinner under 300 ms |

```css
::selection { background: var(--accent-soft); color: inherit; }
:root[data-theme="dark"] ::selection { background: rgba(143,164,255,.28); }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; border-radius: inherit; }
@media (forced-colors: active) { :focus-visible { outline-color: Highlight; } }
@media (prefers-contrast: more) { :root { --rule: var(--rule-strong); --ink-3: var(--ink-2); } }
```

### 3.5 Surfaces, borders and separators

- Page canvas `--bg`; primary surfaces `--surface` with a `1px solid var(--rule)` border. **No shadow on cards or rows.**
- Grouped lists (iOS-style): one rounded `--surface` container (`--r-md`), rows separated by inset hairlines (`border-top: 1px solid var(--rule)` with `margin-inline-start: var(--s-4)` via pseudo-element).
- Shadows: `--shadow-pop` for menus and popovers, `--shadow-sheet` for dialogs, `--shadow-1` for the sticky topbar once the page has scrolled. Nothing else.
- Translucency and blur are **not used**. The sticky topbar is opaque `--bg` with a bottom hairline that appears on scroll.

---

## 4. Typography, mathematics, code and tables

### 4.1 Font decision

| Role | Choice | Why |
|---|---|---|
| UI and default reading | System sans stack (`--font-ui`) | Instant, zero bytes, native Apple feel on macOS/iOS, Segoe UI Variable on Windows |
| Optional reading face | System serif stack (`--font-serif`), user toggle "Serif" | Some students prefer serif for long math; costs nothing |
| Code | System monospace stack (`--font-mono`) | Must cover box-drawing glyphs (`─ ● └ ┘`) used in some code blocks; Menlo, Consolas, SF Mono, Cascadia do |
| Mathematics | KaTeX fonts (embedded as the lecture guide requires, woff2 only) | Required for faithful math |

Embedding an extra text font is **off by default**. If, after measurement, system-font variance across the audience's devices is judged unacceptable, a single subsetted variable woff2 (target ≤ 70 KB, Latin + Greek + math punctuation) may be added; this requires an explicit note and size measurement.

### 4.2 Scale and roles

| Role | Size | Weight | Line height | Tracking | Notes |
|---|---|---|---|---|---|
| Dashboard title | `--fs-3xl` | 650 | 1.08 | −0.022em | `--font-display` |
| Countdown numerals | `--fs-count` | 600 | 1 | −0.02em | `tabular-nums` |
| Page / chapter title | `--fs-2xl` | 650 | 1.12 | −0.018em | `text-wrap: balance` |
| Reading h2 | 1.5rem × scale | 650 | 1.2 | −0.012em | more space above than below |
| Reading h3 | 1.25rem × scale | 620 | 1.28 | −0.008em | |
| Reading h4 | 1.0625rem × scale | 620 | 1.35 | 0 | |
| Reading body | `--fs-read` × scale | 400 | `--lh-read` | 0 | measure 62–72 characters |
| Question text | `--fs-md` | 400 | 1.6 | 0 | slightly larger than UI |
| UI text | `--fs-base` | 400/500 | `--lh-ui` | 0 | |
| Meta / caption | `--fs-sm` | 400 | 1.4 | 0 | `--ink-3` |
| Chips | `--fs-xs` | 560 | 1 | 0.005em | sentence case, never all caps |

Variable-weight values (650, 620, 560) fall back to the nearest available weight in static system fonts; that is acceptable. Use only weights 400, 500/560, 650.

### 4.3 Prose rules

```css
html { font-size: 100%; -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
body { font-family: var(--font-ui); font-size: var(--fs-base); line-height: var(--lh-ui);
       color: var(--ink); background: var(--bg); font-kerning: normal;
       -webkit-font-smoothing: antialiased; text-rendering: optimizeSpeed; }
.prose { font-family: var(--font-read);
         font-size: calc(var(--fs-read) * var(--read-scale)); line-height: var(--lh-read);
         max-width: var(--measure); hyphens: manual; overflow-wrap: break-word; }
.prose > * + * { margin-block-start: 1.05em; }
.prose h2 { margin-block: 2.1em .6em; } .prose h3 { margin-block: 1.7em .5em; }
.prose h2, .prose h3, .page-title { text-wrap: balance; }
.prose p, .prose li { text-wrap: pretty; }
.prose ul, .prose ol { padding-inline-start: 1.4em; } .prose li + li { margin-block-start: .35em; }
.prose a { color: var(--accent); text-decoration: underline; text-underline-offset: .18em;
           text-decoration-thickness: from-font; }
.prose hr { border: 0; border-top: 1px solid var(--rule); margin-block: 2.2em; }
.tabular, table, .countdown { font-variant-numeric: tabular-nums lining-nums; }
```

Notes: `text-rendering: optimizeSpeed` on body (not `optimizeLegibility`) because the corpus is ~1.5 MB of text; apply `optimizeLegibility` only to headings. No justified text. No italics for long runs. Paragraph spacing, not indentation. Source heading text is never altered (guide rule); bracket tags in headings such as `[SOURCE, p. 1]` are styled, see 8.7.

### 4.4 Mathematics (KaTeX-rendered, build-time)

| Concern | Rule |
|---|---|
| Colour | `.katex { color: inherit; }` so dark mode works. Verify thin strokes (fraction bars, radicals) stay visible in dark |
| Size | Inline `.katex { font-size: 1.04em; }` (KaTeX default 1.21em looks too large next to system sans); display `1.12em` |
| Line height | Paragraphs containing inline math use `--lh-math`: the build adds a `has-math` class to such paragraphs and CSS uses `.prose p.has-math { line-height: var(--lh-math); }` (no `:has()` over a large DOM) |
| Display equations | Block wrapper `.math-block`: `overflow-x:auto; max-width:100%; padding-block: .6em; margin-block: 1em;` with `tabindex="0"`, `role="region"`, `aria-label="Equation, scrollable"` **only when it actually overflows** (set by a one-time `ResizeObserver`-free check on first reveal) |
| Overflow cue | Subtle edge fade using mask or pseudo-element gradients on the overflowing side; no scrollbar styling beyond `scrollbar-width: thin` |
| Never | Never shrink math below legible size on phones; never replace equations with images; never edit source TeX to fit |
| `\boxed` results | Final answers (`\boxed`) get breathing room: `.katex .boxed { padding: .2em .45em; }` and a 1.5 px border in `--ink`; they remain recognisably "the answer" |
| Matrices | Matrix-heavy lines keep `--lh-math`; matrices inside table cells may use `font-size: .92em` |
| Copy | Equation hover/focus reveals **Copy TeX** (ghost icon button, 32 px, top-right of the block); source TeX stays in `data-tex` |
| Numbers | Tabular lining numerals in all numeric tables and result rows |

```css
.katex { color: inherit; font-size: 1.04em; }
.katex-display { margin: 0; overflow-x: auto; overflow-y: hidden; padding: .2em 0; }
.math-block { position: relative; border-radius: var(--r-sm); }
.math-block .copy-tex { position: absolute; inset: 4px 4px auto auto; opacity: 0; }
.math-block:hover .copy-tex, .math-block:focus-within .copy-tex { opacity: 1; }
@media (hover: none) { .math-block .copy-tex { opacity: .85; } }   /* always visible on touch */
```

### 4.5 Code (R)

- Build-time highlighting; only `r` fences get colour. `text` fences (R console output, ASCII diagrams, datasets) are **not** highlighted and are visually distinct: no syntax colours, a lighter left rule and a small label "Output".
- Block: `background: var(--code-bg); border: 1px solid var(--rule); border-radius: var(--r-md);` font `0.9em` of body, line-height 1.55, `white-space: pre`, `overflow-x: auto`, `tab-size: 4`. Never wrap silently.
- Header strip (32 px): language label ("R" or "Output") left, **Copy** right. The strip is always visible (not hover-only), so touch users find it.
- Long code (> 28 lines): show first 18 lines with a "Show all N lines" toggle only if it does not hide content from find-in-page (use `hidden="until-found"` on the remainder). Otherwise show everything.
- Inline code: `background: var(--sunken); border-radius: var(--r-xs); padding: .08em .35em; font-size: .9em;`.
- ASCII diagrams and box-drawing blocks: `font-variant-ligatures: none; line-height: 1.35;` monospace stack only.

### 4.6 Tables

- Wrapper `.table-wrap { overflow-x: auto; border: 1px solid var(--rule); border-radius: var(--r-md); }` with `tabindex="0"`, `role="region"`, `aria-label` from caption or "Table, scrollable".
- Header row `--surface-2`, semibold, bottom rule `--rule-strong`; **no zebra by default**; row hairlines only. Numeric columns right-aligned with tabular numerals; alignment from the source is preserved.
- Cell padding `10px 14px`; font `--fs-sm`; min cell width 56 px; sticky first column only for tables wider than 8 columns (≤ 16 exist), with a right-edge hairline.
- Math inside cells inherits the same pipeline; matrices in cells `0.92em`.
- Very wide tables on phones scroll horizontally inside the wrapper; the page body must never scroll sideways. Verify at 320 px.

### 4.7 Reading settings (small, well-defaulted)

Exposed in one popover ("Aa" button in the lecture header and settings): **Text size** (5 steps by `--read-scale`), **Reading width** (Narrow / Standard / Wide via `--measure`), **Body font** (Sans / Serif via `--font-read`). Defaults are already good. Persist with guarded storage. Changes apply live with no animation beyond a 140 ms opacity settle.


---

## 5. Iconography and the SVG system

### 5.1 Rules

| Property | Standard |
|---|---|
| Source | Hand-authored inline SVG in **one hidden sprite** (`<symbol>` + `<use href="#i-name">`). No icon fonts, packages, CDNs, remote images |
| Grid | 24 × 24 viewBox; live area 20 × 20 (2 px padding) |
| Stroke | `stroke="currentColor"`, **1.75 px** at 24 px, `fill="none"`, `stroke-linecap="round"`, `stroke-linejoin="round"`. Same on every icon |
| Corners | Rounded joins; interior corner radius ~1.5 px where a corner is drawn |
| Sizes | 16 (inline with text), 20 (buttons), 24 (navigation), 32+ only inside illustrations |
| Alignment | Icon centre on the text x-height centre; icon + label gap `--s-2` |
| Colour | Inherits text colour; accent only when the control is active; `--prompt` only for prompt actions |
| Accessibility | Decorative: `aria-hidden="true" focusable="false"`. Icon-only buttons: accessible name on the **button** (`aria-label`), tooltip text identical |
| Theme | Colours via tokens only; no per-theme SVG copies |
| Motion | Only the animations in section 10; never infinite loops except the PDF-preparing axis (10.3 #16) |

### 5.2 Sprite (starter set; extend in the same style)

```html
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <style>.i{fill:none;stroke:currentColor;stroke-width:1.75;stroke-linecap:round;stroke-linejoin:round}</style>
  </defs>
  <symbol id="i-book" viewBox="0 0 24 24"><path class="i" d="M4 5.5c3-1 6-.5 8 1.2 2-1.7 5-2.2 8-1.2v13c-3-1-6-.5-8 1.2-2-1.7-5-2.2-8-1.2z M12 6.7v13"/></symbol>
  <symbol id="i-paper" viewBox="0 0 24 24"><path class="i" d="M7 3.5h7l4 4v13H7z M14 3.5v4h4 M9.5 12h5 M9.5 15.5h5"/></symbol>
  <symbol id="i-matrix" viewBox="0 0 24 24"><path class="i" d="M8 4H5.5v16H8 M16 4h2.5v16H16"/><circle class="i" cx="10.5" cy="9.5" r=".6"/><circle class="i" cx="13.5" cy="9.5" r=".6"/><circle class="i" cx="10.5" cy="14.5" r=".6"/><circle class="i" cx="13.5" cy="14.5" r=".6"/></symbol>
  <symbol id="i-predict" viewBox="0 0 24 24"><ellipse class="i" cx="12" cy="12" rx="8.5" ry="4.3" transform="rotate(-35 12 12)" stroke-dasharray="2.4 2.6"/><circle class="i" cx="12" cy="12" r=".7"/></symbol>
  <symbol id="i-prompt" viewBox="0 0 24 24"><path class="i" d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-7.5L7 19.5v-3H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z M8.5 9.5l2.5 2.5-2.5 2.5 M13 14.5h3"/></symbol>
  <symbol id="i-copy" viewBox="0 0 24 24"><rect class="i" x="9" y="9" width="11" height="11" rx="2"/><path class="i" d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path class="i" d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
  <symbol id="i-bookmark" viewBox="0 0 24 24"><path class="i" d="M7 4h10a1 1 0 0 1 1 1v15l-6-4.5L6 20V5a1 1 0 0 1 1-1z"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle class="i" cx="11" cy="11" r="6.5"/><path class="i" d="M16 16l4.5 4.5"/></symbol>
  <symbol id="i-chev" viewBox="0 0 24 24"><path class="i" d="M9 6l6 6-6 6"/></symbol>
  <symbol id="i-external" viewBox="0 0 24 24"><path class="i" d="M14 4h6v6 M20 4l-9 9 M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/></symbol>
  <symbol id="i-sun" viewBox="0 0 24 24"><circle class="i" cx="12" cy="12" r="4"/><path class="i" d="M12 3v2 M12 19v2 M3 12h2 M19 12h2 M5.6 5.6l1.4 1.4 M17 17l1.4 1.4 M18.4 5.6L17 7 M7 17l-1.4 1.4"/></symbol>
  <symbol id="i-moon" viewBox="0 0 24 24"><path class="i" d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></symbol>
  <symbol id="i-menu" viewBox="0 0 24 24"><path class="i" d="M4 7h16 M4 12h16 M4 17h16"/></symbol>
  <symbol id="i-close" viewBox="0 0 24 24"><path class="i" d="M6 6l12 12 M18 6L6 18"/></symbol>
  <symbol id="i-pdf" viewBox="0 0 24 24"><path class="i" d="M7 3.5h7l4 4v13H7z M14 3.5v4h4"/><path class="i" d="M10 17.5v-4h1.4a1.2 1.2 0 0 1 0 2.4H10"/></symbol>
  <symbol id="i-aa" viewBox="0 0 24 24"><path class="i" d="M3.5 18l5-12 5 12 M5.4 13.5h6.2 M15 18l3.2-7.5L21.5 18 M16.2 15.5h4"/></symbol>
</svg>
```

Usage: `<svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-copy"/></svg>`. Section glyphs map: Learning Chapters → `i-book`; Past Papers → `i-paper`; Practice Questions → `i-matrix`; Predicted Questions → `i-predict` (dashed = tentative).

### 5.3 Visual vocabulary for illustrations

Illustrations are **structural, monochrome-plus-accent, and thin-lined** (1–1.5 px at drawn size). They use real constructs only: covariance ellipses, principal axes, projections, right-angle markers, matrix brackets, vector arrows, scree-style declining bars (only when the real values exist). Never draw random scatter or fake charts to "look statistical". Where a figure is schematic (like the hero ellipse), its caption or `<desc>` says so.

### 5.4 Hero illustration: the covariance ellipse with principal axes (complete, geometrically exact)

Concept: a bivariate distribution with unit variances and correlation ρ = 0.7. The covariance matrix has eigenvalues λ₁ = 1 + ρ = 1.7 and λ₂ = 1 − ρ = 0.3, and principal axes at 45°. The contour of Mahalanobis distance 1 is an ellipse with semi-axes √λ₁ and √λ₂. At a drawing scale of 80 px per unit: rx = 80·√1.7 ≈ 104, ry = 80·√0.3 ≈ 44. The marked point is projected perpendicularly onto PC1 (right-angle marker). Everything sits in one group rotated −45°, so the geometry is exact.

```html
<svg class="axis-hero" viewBox="0 0 320 220" role="img" aria-labelledby="axt axd">
  <title id="axt">Covariance ellipse with principal axes</title>
  <desc id="axd">Schematic for correlation 0.7 and unit variances: eigenvalues 1.7 and 0.3,
    axes at 45 degrees, one point projected perpendicularly onto the first principal axis.</desc>
  <!-- original variable axes -->
  <g class="ax-orig"><path d="M20 110H300 M160 18V202"/></g>
  <g transform="translate(160 110) rotate(-45)">
    <ellipse class="ax-ellipse" rx="104" ry="44" pathLength="1"/>
    <path class="ax-pc" d="M-128 0H128 M0 -64V64"/>
    <path class="ax-drop" d="M60 28V0"/>
    <path class="ax-right" d="M54 0V6H60"/>
    <circle class="ax-pt" cx="60" cy="28" r="3.2"/>
    <circle class="ax-foot" cx="60" cy="0" r="2.4"/>
    <text class="ax-label" transform="translate(134 0) rotate(45)" y="4">PC1</text>
    <text class="ax-label" transform="translate(0 -70) rotate(45)" text-anchor="end" x="-2" y="4">PC2</text>
  </g>
</svg>
```

```css
.axis-hero { width: 100%; height: auto; color: var(--ink-3); }
.ax-orig path   { stroke: var(--rule-strong); stroke-width: 1; fill: none; stroke-dasharray: 2 4; }
.ax-ellipse     { fill: var(--accent-soft); stroke: var(--accent); stroke-width: 1.5; }
.ax-pc          { stroke: var(--ink-3); stroke-width: 1; fill: none; }
.ax-drop        { stroke: var(--accent); stroke-width: 1; stroke-dasharray: 3 3; }
.ax-right       { stroke: var(--accent); stroke-width: 1; fill: none; }
.ax-pt          { fill: var(--accent); }  .ax-foot { fill: var(--surface); stroke: var(--accent); stroke-width: 1.2; }
.ax-label       { font: 500 11px var(--font-ui); fill: var(--ink-3); }
/* Placement on the dashboard: aria-hidden duplicate, opacity .9 on light, 1 on dark; never behind small text */
```

Usage rules: place at the right of the countdown panel, ~280 px wide on desktop, hidden below 600 px (the countdown numerals are the priority), `aria-hidden="true"` and no `<title>` when used as backdrop; keep `role="img"` + title only when it is the informative figure (for example on an About page).

### 5.5 Empty-state illustration (dashed ellipse)

```html
<svg class="empty-art" viewBox="0 0 120 72" aria-hidden="true">
  <g transform="translate(60 36) rotate(-30)">
    <ellipse rx="42" ry="19" fill="none" stroke="currentColor" stroke-width="1.25" stroke-dasharray="3 4"/>
    <path d="M-50 0H50 M0 -26V26" stroke="currentColor" stroke-width="1" opacity=".45"/>
    <circle r="2.2" fill="currentColor"/>
  </g>
</svg>
```
`.empty-art { width: 120px; color: var(--ink-3); }`. Used for: no bookmarks, no recent items, no search results, no completed items. One illustration, reused; copy changes per case (section 6.9).

### 5.6 Progress ring (chapter and item completion)

```html
<svg class="ring" width="20" height="20" viewBox="0 0 20 20" role="img" aria-label="Marked complete">
  <circle cx="10" cy="10" r="8" class="ring-track"/>
  <circle cx="10" cy="10" r="8" class="ring-fill" pathLength="100" stroke-dasharray="100 100" transform="rotate(-90 10 10)"/>
  <path class="ring-check" d="M6.4 10.3l2.5 2.5 4.7-5"/>
</svg>
```
```css
.ring-track { fill: none; stroke: var(--rule-strong); stroke-width: 1.75; }
.ring-fill  { fill: none; stroke: var(--accent); stroke-width: 1.75; stroke-linecap: round;
              stroke-dashoffset: 100; transition: stroke-dashoffset var(--t-base) var(--ease-out); }
.ring-check { fill: none; stroke: var(--accent); stroke-width: 1.75; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transition: opacity var(--t-fast); }
.is-complete .ring-fill { stroke-dashoffset: 0; } .is-complete .ring-check { opacity: 1; }
```
Rings represent only **marked complete** (binary) or, for chapters, **reading position** (never "percent understood"). Partial arc = scroll position; full ring + check = student-marked complete.

### 5.7 Section and file glyphs

| Where | Glyph |
|---|---|
| Learning Chapters / Past Papers / Practice / Predicted | `i-book`, `i-paper`, `i-matrix`, `i-predict` in 24 px, accent when active |
| Supplementary chapter badge | Text badge "Supplementary" with a **dashed** 1 px border (shape cue, not colour) |
| Original PDF | `i-pdf` + label "Original PDF" |
| Bookmark | `i-bookmark`; filled (`fill: currentColor`) when set |
| Source generator (ChatGPT / Gemini) | Text label is primary; optional neutral geometric glyph (circle vs diamond) in `--ink-3`. **Never use vendor logos** |

---

## 6. Application shell and navigation

### 6.1 Structure

```
Desktop ≥ 1200 px                         Tablet 720–1199 px                 Phone < 720 px
┌─────────┬───────────────────────────┐   ┌──┬────────────────────────┐     ┌──────────────────────┐
│ Sidebar │ Topbar (breadcrumb, ⌘K)   │   │R │ Topbar                 │     │ Topbar (title, search, theme) │
│  280    ├───────────────┬───────────┤   │a │                        │     ├──────────────────────┤
│         │ Reading column│ TOC 264   │   │i │  Reading column        │     │  Content             │
│         │  44rem        │ (lectures)│   │l │  (TOC → sheet)         │     │                      │
│         │               │           │   │72│                        │     ├──────────────────────┤
└─────────┴───────────────┴───────────┘   └──┴────────────────────────┘     │ Tab bar (5 items)    │
                                                                            └──────────────────────┘
```

- App frame is a CSS grid: `grid-template-columns: var(--sidebar-w) minmax(0, 1fr)`; `min-width: 0` on the main track prevents equation overflow from widening the page.
- The **page is the scroller** (document scroll), not an inner `overflow:auto` pane, so browser find, scroll restoration, mobile address-bar collapse and `scroll-padding-top` anchors behave naturally. Only the sidebar and TOC scroll internally (`position: sticky; top: var(--topbar-h); height: calc(100dvh - var(--topbar-h))`).
- `scroll-padding-top: calc(var(--topbar-h) + var(--s-4))` on `html` so anchor jumps clear the topbar.

### 6.2 Sidebar (desktop and tablet)

- Width 280 px (≥ 1200), collapsed rail 72 px (720–1199 by default, or by user toggle at ≥ 1200).
- Header: Axis monogram (24 px) + "DA2451" in semibold, "Multivariate Methods" in `--ink-3`. No logo block, no slogan.
- Primary items (4 + Dashboard): Dashboard, Learning Chapters, Past Papers, Practice Questions, Predicted Questions (expands to Predicted MCQs, Predicted Essays). Bookmarks and Search sit below, then Settings and About at the bottom.
- Item: 40 px tall, `--r-sm`, 20 px icon + label; current item has `--accent-soft` fill, `--accent` icon and text, and a 3 px inset accent bar on the leading edge (shape cue as well as colour). Hover: `--sunken`.
- Expandable groups (Learning Chapters shows the 11 chapters when the section is current): chapter rows are 36 px, number in tabular numerals in a 24 px column, title truncated with a `title` tooltip; supplementary chapters carry a dashed-outline "Suppl." chip. Completed chapters show the small ring check at the trailing edge.
- Footer: quiet "Made by Dinuka Himsara" line (`--fs-xs`, `--ink-3`) plus "About this app" link.
- Collapsing: icons only, tooltips on hover/focus (label + keyboard hint), group expansion shown as a flyout popover. Toggle button at the sidebar header, `aria-expanded`, shortcut `[`.
- Predicted Questions item always shows the dashed-ellipse glyph and, in expanded state, a tiny text "Unofficial" chip in `--predicted` so the section's nature is clear before opening it.

### 6.3 Topbar

- Height 56 px, opaque `--bg`; hairline appears and `--shadow-1` fades in once `scrollY > 8`.
- Left: sidebar toggle (tablet/phone: menu button), **breadcrumb** (6.5).
- Right: **Search** field-button ("Search", with ⌘K / Ctrl K hint on desktop, 44 px icon button on phone), **theme toggle** (sun/moon icon button, 44 px target), **Settings** (gear/aa as needed). Items in the chapter/question views add contextual actions (Open in new tab, Bookmark, Mark complete) **inside the content header**, not in the topbar, to keep the topbar constant.
- A 2 px reading-progress bar (lecture views only) sits on the topbar's bottom edge; see 10.3 #12.

### 6.4 Mobile navigation

- **Bottom tab bar**, 56 px + safe area: Home, Chapters, Papers, Practice, Predicted. Search and theme live in the topbar; Settings and About are inside a "More" sheet from the topbar menu.
- Tab: 24 px icon over a 11–12 px label (always visible; icon-only is not accepted), `min-height: 48px`, current tab accent.
- The bar hides on scroll-down in long reading views and returns on scroll-up (transform only, 200 ms); it is always visible in selection screens. It must never cover the last line of content (`padding-bottom` on main = `--tabbar-h + safe area`).
- Chapter outline on phones: a "Contents" button in the chapter header opens a **bottom sheet** (80 dvh max), focus-trapped, swipe/Esc/scrim to close.

### 6.5 Breadcrumbs and section headers

- Pattern: `DA2451 › Past Papers › Final · January 2024 › Question 3`. Separators are chevron icons, not slashes; the last segment is plain text with `aria-current="page"`.
- Narrow screens: show a back chevron + the parent label and the current title; the full trail is in a popover on tap.
- Long segment titles truncate with an ellipsis; the full text is in `title`.
- Section header (page top inside content): title (`--fs-2xl`), a one-line descriptor in `--ink-2`, and an actions row. No hero banner, no illustrations on inner pages.
- Source labels (e.g. "Original lecture PDF" vs "Teaching chapter") are always text, placed in the header meta line.

### 6.6 Search interface

- Opened by Ctrl/⌘+K or `/`, topbar button or tab-bar icon. Implemented as a `<dialog>`: width `min(680px, 100vw - 24px)`, `--r-lg`, `--shadow-sheet`, top-anchored at 12 vh on desktop, full-height sheet on phones.
- Input 56 px, 17 px text (≥ 16 px to prevent iOS zoom), leading `i-search`, trailing "Esc" key hint on desktop.
- Filter chips under the input (single-select, horizontally scrollable): All · Chapters · Past Papers · Practice · Predicted MCQs · Predicted Essays. Selected chip has check + accent fill.
- Results grouped by collection with a subtle group heading; each result: title (rendered inline math), context line (paper/worksheet/chapter and section), 2-line snippet with `<mark>` highlights (`background: var(--mark); color: inherit; border-radius: 3px`). Predicted results carry the **Unofficial** chip.
- Keyboard: ↑/↓ move, Enter opens, **Ctrl/⌘+Enter opens in a new tab**, Esc closes and returns focus to the trigger. Active result gets `--accent-soft` + 2 px leading bar.
- States: *Preparing search* (first use only; the index loads lazily; show a thin indeterminate bar and the text "Preparing search…" if > 250 ms), *Empty query* (recent searches, local only, plus 3 example terms), *No results* (empty-state art + "No matches for 'x'. Try a shorter term, a symbol name such as Sigma, or another section."), *Result count* announced via a polite live region ("12 results").
- Never show a spinner for fast searches; debounce 90 ms; render at most 40 results with "Show more".

### 6.7 Dialogs, sheets, popovers, tooltips, toasts

| Element | Spec |
|---|---|
| Dialog (`<dialog>` + `showModal()`) | Max-width 560 px, `--r-lg`, `--shadow-sheet`, padding `--s-6`, scrim `--scrim` (no blur), focus moves to first control, `Esc` closes, focus returns to trigger, `overscroll-behavior: contain` |
| Bottom sheet (phones) | Same component, anchored bottom, `--r-lg` top corners, grabber 36 × 4 px, max 85 dvh, safe-area padding |
| Popover | Non-modal, `--shadow-pop`, `--r-md`, 8 px offset, closes on Esc/outside click/focus leaving; used for Reading settings, clipboard fallback, "What is Copy AI Prompt?" |
| Tooltip | Text only, 12 px, `--r-xs`, 500 ms hover delay (instant on keyboard focus), never the only place critical information lives, also exposed through `aria-label` or `aria-describedby`; no tooltips on touch |
| Toast | Bottom-centre (above tab bar on phones), pill, 14 px text, max-width 360 px, max two stacked, 2.4 s auto-dismiss (4 s with an action), `role="status"`; never for errors that need action (use inline messages or a dialog) |
| Confirmation | Only for destructive, irreversible actions (reset all progress, import that overwrites). Never for bookmark, complete, copy or navigation |

### 6.8 Settings and About

- **Settings** is a dialog (sheet on phones) with four grouped lists: *Appearance* (Light / Dark / System segmented control with live mini previews), *Reading* (text size, width, body font, the same controls as the reading popover), *Motion* ("Follow system" / "Reduce animations" toggle), *Study data* (Export / Import JSON if shipped; "Reset progress…" with confirmation; storage status line).
- **About this app** is a quiet panel: creator credit, AI-assistance note and the unofficial-material statement using the exact wording from the Master Plan §6 and the Predicted guide §8 (see 9.8), library and font licences, build identifier, and a compact "Content integrity" list (file names, counts, patch log) as the guides require. Plain, informational, no marketing tone.

### 6.9 Empty, loading and error states

| State | Treatment | Copy example |
|---|---|---|
| No bookmarks | Empty art + one line + one action | "No bookmarks yet. Tap the bookmark icon on any chapter or question to keep it here." |
| No recent items | Quiet line, no art | "Nothing opened yet. Start with Chapter 1." (button) |
| No search results | Empty art + suggestion | See 6.6 |
| Lazy chapter loading | Skeleton: title bar + 6 text lines (`--sunken`, no shimmer; a single 1.2 s opacity pulse 0.55 ↔ 1 only if load > 400 ms) | none |
| PDF preparing | Frame with axis loader (10.3 #16) and "Preparing PDF…" | "Preparing PDF…" |
| PDF unavailable | Inline panel, `--warn-soft` | "This browser can't preview the PDF here. Save the original PDF instead." + Save PDF button |
| Clipboard blocked | Popover with selected textarea | "Couldn't copy automatically. Select the text below and press Ctrl/⌘+C." |
| Storage unavailable | Non-blocking, dismissible banner, once per session | "Progress can't be saved in this browser mode. It will be kept until you close this tab." |
| Math failed to render (should never happen) | Show the raw TeX in a `--err-soft` monospace chip | none |
| Exam completed | Neutral state, see 7.3 | "Exam completed" |

Errors never apologise, never blame, state what happened and what the person can do. Use sentence case and the same verb on button and result ("Copy" → "Copied").

### 6.10 First launch and initial load

- **Initial load.** No splash screen, logo animation or progress bar. The HTML ships with the app frame (sidebar, topbar, dashboard skeleton) and critical CSS inline so the first paint is the real shell. Dashboard content hydrates immediately from a tiny data slice. Heavy content (chapters, search index, PDFs) is never touched at startup.
- **Welcome sheet** (only when `data-theme-pref="unset"`): centred dialog, 480 px. Title "Choose how it looks". Two large preview tiles, **Light** and **Dark**, each a miniature of the dashboard shell with a sample line and one equation in its own theme (static HTML/CSS, not images). Radio semantics, arrow-key selectable, `Continue` primary button, and a text button "Use system setting". `Esc` applies System and closes. Selecting a tile previews instantly (theme swaps behind the sheet). If storage is unavailable the choice applies for the session and the sheet may reappear next launch, once.
- No tour, no onboarding carousel, no feature pop-ups.

### 6.11 New-tab actions

- A small `i-external` ghost icon button (32 px, 44 px on touch) sits at the trailing edge of chapter rows, paper/worksheet rows, question headers and the PDF button group, labelled "Open in new tab" (tooltip + `aria-label`).
- Also supported: Ctrl/⌘-click and middle-click on any navigation row (they are real `<a href="#…">` elements so the browser handles it). If a popup is blocked, fall back to same-tab navigation silently; do not show an error.
- Never open a tab automatically.

### 6.12 Keyboard navigation (global)

| Key | Action |
|---|---|
| Ctrl/⌘+K, `/` | Open search |
| `[` | Toggle sidebar |
| `g` then `h / c / p / q / m` | Go to Home / Chapters / Past Papers / Practice (Q) / Predicted (M) (only when no input is focused) |
| `j` / `k` or `n` / `p` | Next / previous question or section in question and lecture views |
| `r` | Reveal or hide the current answer (question views, when focus is not in a field) |
| `b` | Toggle bookmark on current item |
| `?` | Show shortcut list dialog |
| Esc | Close the topmost dialog, popover or search |

Shortcuts are discoverable (the `?` dialog and tooltips), never intercept typing in inputs or textareas, and never override browser shortcuts with Ctrl/Cmd modifiers other than K.

---

## 7. Dashboard

### 7.1 Composition

```
┌────────────────────────────────────────────────────────────────────────┐
│ DA2451 Multivariate Methods in Business                                 │  title (display), one line
│ University of Moratuwa · Semester 4                                     │  meta, --ink-3
│                                                                         │
│ ┌────────────────────────────────────────────────────┬───────────────┐ │
│ │ DA2451 Final Examination                           │   ellipse     │ │  countdown panel (--r-lg)
│ │                                                    │   + axes      │ │
│ │  09      14      32      07                        │   (faint)     │ │
│ │  days    hours   minutes seconds                   │               │ │
│ │ 18 November 2026 · 9:00 AM–12:00 PM · Sri Lanka time                │ │
│ └────────────────────────────────────────────────────┴───────────────┘ │
│                                                                         │
│ Continue reading  ──────────────────────────────────────  [ Resume ]   │  single row
│ Chapter 3 · Principal Component Analysis  ·  Scree plots                │
│                                                                         │
│ Study                                  Your progress                    │
│ ┌──────────────────────────┐          Chapters        4 of 11 complete  │
│ │ ▤  Learning Chapters   11 ›          Past papers     2 of 9           │
│ │ ▭  Past Papers          9 ›          Worksheets      1 of 5           │
│ │ ▦  Practice Questions   5 ›          Predicted       6 marked done    │
│ │ ◌  Predicted Questions  N ›                                           │
│ └──────────────────────────┘                                            │
│                                                                         │
│ Recent                         Bookmarked                               │
│ …                              …                                        │
│                                                                         │
│ Made by Dinuka Himsara · About this app                                 │
└────────────────────────────────────────────────────────────────────────┘
```

Content width `min(var(--page-max), 100% - 2·gutter)`; gutters 20 px phone, 32 px tablet, 48 px desktop. Vertical rhythm between blocks `--s-9` (56 px) desktop, `--s-7` phone. Do not add more blocks.

### 7.2 Header

- Title in `--font-display`, `--fs-3xl`, weight 650, tracking −0.022em; subtitle `--fs-md` `--ink-2`. Left-aligned, never centred. No greeting text, no motivational copy.
- Do not use the university's crest or marks.

### 7.3 Countdown panel

- Panel: `--surface`, 1 px `--rule` border, `--r-lg`, padding `--s-7` (24 px phone). **No gradient, no glow, no shadow.** The faint ellipse (5.4) sits at the trailing edge at ~60% opacity and is hidden below 600 px.
- Label above numerals: "DA2451 Final Examination" in `--fs-md`, weight 560.
- Numerals: four units, `--fs-count`, weight 600, `tabular-nums`, `--ink`. Units labelled in sentence-case lowercase beneath ("days", "hours", "minutes", "seconds") in `--fs-sm` `--ink-3`. Units are separated by 1 px vertical hairlines, not colons. Two-digit zero padding for hours/minutes/seconds, days padded only to the digits needed (≥ 2).
- Ticks swap text instantly. **No flip, slide, fade or glow animation** on numbers (distracting and costly).
- Date line under numerals: `18 November 2026 · 9:00 AM–12:00 PM · Sri Lanka time` in `--fs-base` `--ink-2` (wording from the Master Plan §5). Optional second, smaller line shown **only when the viewer's UTC offset differs from +05:30**: "Your local time: Tue, 17 Nov, 10:30 PM–1:30 AM", formatted with `Intl.DateTimeFormat` from the absolute timestamps.
- **States** (same panel, same height to avoid layout shift):
  - *Before start*: days / hours / minutes / seconds.
  - *In progress (9:00 AM–12:00 PM IST)*: replace numerals with "Exam in progress" (`--fs-2xl`, weight 650) and one line "Time remaining 02:14:36" in tabular numerals.
  - *After*: "Exam completed" in `--ink-2`; the date line remains; the ellipse stays; the panel becomes visually quieter (numeral colour `--ink-3`). The app continues unchanged.
- Accessibility: the numeral group is visual only (`aria-hidden="true"`); a visually hidden element holds a human sentence ("9 days, 14 hours, 32 minutes until the exam"), updated **once per minute** in a `role="timer"` region with `aria-live="off"` (screen readers read it on demand, not every second). Reduced motion has no effect here because there is none to remove.

### 7.4 Continue reading

- One row, full width, `--surface` with hairline border, `--r-md`, padding 16–20 px: left side title block (chapter or item + last section heading, truncated), centre-right a thin position bar (3 px, `--sunken` track, `--accent` fill = reading position), right a **Resume** primary button.
- If nothing has been opened: row becomes "Start with Chapter 1: Introduction to Multivariate Analysis" with a **Start** button. Never hide the row.

### 7.5 Quick access (grouped list, not a card grid)

- One rounded grouped list with four rows: icon (24 px, accent), title (`--fs-md` weight 560), descriptor (`--fs-sm` `--ink-3`), **real count** (tabular), chevron. Row height 64 px, hover `--sunken`, whole row is one link with a visible focus ring.
- Descriptors are plain and factual (e.g. "Explained chapters with the original lecture PDFs", "Final exams, in-class papers and quizzes with worked answers", "Five worksheets with step-by-step solutions", "Unofficial AI-generated practice, no answers"). The Predicted row carries a small amber "Unofficial" chip.
- On ≥ 900 px the list and the progress summary sit side by side (60/40). Below, they stack.

### 7.6 Progress summary

- Four lines of text-first data, each: label, "n of N marked complete" (tabular), and a 4 px bar (`--sunken` track, `--accent` fill, `--r-pill`). Totals come from the data actually displayed (C1). No percentages in large type, no rings, no streaks, no scores, no "correct" language anywhere.
- If nothing is completed, show the same four lines at 0 with the bars empty; this is honest and stable (no empty-state illustration here).

### 7.7 Recent materials and Bookmarks

- Two compact lists side by side (stacked on phones): up to 5 items each; rows 48 px with leading section glyph, title, and a muted secondary line (section · position). "See all" link opens a full list view. Each row supports New-tab and keyboard activation.
- Empty states per 6.9; use the empty-state art once (in Bookmarks), plain text for Recent.

### 7.8 Creator attribution

- Footer line at the bottom of the dashboard and in the sidebar footer: "Made by Dinuka Himsara" (`--fs-sm`, `--ink-3`) with an "About this app" link. Never repeated on content pages beyond the sidebar footer.

### 7.9 Dashboard decoration policy

- Allowed: the hero ellipse (5.4) in the countdown panel; the empty-state art; section glyphs. Nothing else. No background patterns, no floating shapes, no matrix rain, no mesh, no animated background.
- Decorations must never sit under text smaller than 20 px or lower the contrast of any text.


---

## 8. Lecture reading experience

The eleven chapters are very long (85–175 KB of source each, hundreds of equations, 28–53 R blocks, up to 41 tables). Design for **three hours of reading without fatigue** and for exam-revision *navigation*: jump, resume, find, copy, return. Structure and order come from the Lecture guide; this section covers presentation only.

### 8.1 Chapter list (Learning Chapters home)

- A single grouped list in source order (never filename order). Row (72 px): chapter number in tabular numerals (`Chapter 4` label uses the **app position**, never the source's own "Lecture NN"), title, one-line source label ("Teaching chapter"), trailing progress ring, `i-external`, chevron.
- **Supplementary** chapters (04, 06, 11) stay in sequence, carry a dashed-outline **Supplementary** chip and the same row styling otherwise. No separate section, no different colour.
- Rows with an original PDF show a small `i-pdf` glyph with an accessible label "Original PDF available". Absence is shown honestly (no glyph), not as a disabled control.
- Above the list: a short line with the count (from data) and a "Resume Chapter N" row if a position exists.

### 8.2 Chapter landing and header

- Landing is the top of the chapter itself, not a separate screen: header block followed immediately by the content. Header: breadcrumb, title (`--fs-2xl`), chips (Core or Supplementary; "Teaching chapter"), then an action row:
  - **Resume** or **Start reading** (filled accent, the only filled button here)
  - **View Original PDF** (secondary, `i-pdf`), shown only when mapped
  - Overflow actions: Open in new tab, Bookmark, Mark complete, Reading settings (`i-aa`), Focus mode
- Beneath the header, a compact **Contents preview** (H1/H2 level only, two columns ≥ 900 px, one column below) as plain link text with hairline separators. Do not write descriptive blurbs; use only the source's own titles.
- Source label: "Teaching chapter" (expanded AI-assisted explanation) is always distinguishable from "Original lecture PDF". The label is text, `--ink-3`, placed in the header meta line.

### 8.3 Table of contents

- Desktop ≥ 1280 px: right rail, sticky, 264 px, 13 px text, 8 px vertical padding per entry, scrolls independently; current section has an accent leading bar and `--accent` text (tracked with `IntersectionObserver`, rootMargin offset by the topbar height).
- Headings may contain rendered math and inline code; render the heading's **inline HTML**, not raw text. Use `overflow-wrap: anywhere` and a 2-line clamp.
- Large chapters have 100+ H2 entries: show **H1 and H2 only**, expand H3 only beneath the *current* H2. If entries exceed ~40, add a small filter field at the top of the rail ("Filter headings"). Never render a 300-line unvirtualised outline expanded.
- Hierarchy is not uniform across files (title at H1/H2/H3). Indent by *relative* depth within the chapter, not by raw tag level, and tolerate skipped levels.
- Below 1280 px: a "Contents" button in the chapter header opens a popover (tablet) or bottom sheet (phone) with the same tree.

### 8.4 Layout modes

| Mode | Width | Layout |
|---|---|---|
| Desktop reading (default) | ≥ 1280 | Sidebar 280 · reading column `--measure` (centred in remaining space) · TOC 264 |
| Wide-screen split | ≥ 1360 | Optional PDF split: reading column (min 520 px) beside PDF pane (default 44%); toggle "Split view" in the PDF button group |
| Tablet | 720–1199 | Rail 72 · reading column · TOC as sheet |
| Phone | < 720 | Full-width column with 20 px gutters; TOC as sheet; tab bar auto-hides |
| Focus mode | any | Sidebar, topbar, TOC and tab bar hidden; slim "Exit focus" pill top-right (also `Esc`); progress bar remains |

- The reading column sits on `--surface` only for long-form surfaces when it improves separation on `--bg`; on phones the surface and canvas can merge (no borders at screen edge).
- Desktop **Focus mode** is a CSS class, not the Fullscreen API. A separate optional "Full screen" button may call `document.documentElement.requestFullscreen()` where supported; it must degrade silently.
- Reading width and size controls (4.7) apply instantly; layout never jumps because the column is centred and clamped.

### 8.5 Reading progress and resume

- A 2 px bar on the bottom edge of the topbar, `--accent`, `transform: scaleX(p)`; it reflects real scroll position within the chapter only.
- Resume position: saved as heading ID + offset ratio (pixel offsets break when text size changes). On return, restore position and show a quiet inline notice at the top of the viewport ("Resumed at ‘3.2 Scree plots’", fades after 3 s, dismissible); no modal.
- "Mark chapter complete" is explicit, student-controlled, at the chapter end and in the header overflow. Reaching the bottom does not auto-mark complete. No percentage-understood claims.

### 8.6 Content block presentation (style only what the parser provides)

Do **not** invent block types such as "Definition" or "Theorem" unless the source structure supplies them. Style these real structures:

| Source structure | Presentation |
|---|---|
| Blockquote (callouts, mostly near the top of chapters) | `.callout`: `--surface-2` fill, 3 px `--rule-strong` leading rule, `--r-sm`, padding 14 × 18; inner text `--ink-2`; no icon unless the content states a role |
| Bold lead-in labels (e.g. worked-example or note labels that exist in the text) | Weight 650, normal colour; no pill |
| Display math | `.math-block` (4.4) with generous vertical rhythm (`1em` above and below, `1.25em` after headings) |
| `\boxed` results | See 4.4; this is how final answers read as final |
| R code | Code card (4.5) with Copy |
| Console / ASCII output | "Output" card (4.5) |
| Tables | Table wrapper (4.6) |
| Horizontal rules (`---`) | Hairline with `margin-block: 2.2em`; do not turn them into section cards |
| Internal anchor links | Accent underline; after jumping, the target heading flashes a 600 ms `--accent-soft` background (opacity only on a pseudo-element) so the eye lands |
| External autolinks | Accent underline + trailing `i-external` 12 px; they will not work offline, so they are neutral text-links, no special treatment |

### 8.7 Source tags in headings

Headings may end with literal tags such as `[SOURCE, p. 1]`, `[TEACHING EXTENSION]`, `[CORRECTION, pp. 8, 15–16]`, `[Lecture p. 6]`. Wrap each trailing tag in a `.src-tag` span **without changing its text**:

- Default tags: `--fs-xs`, `--ink-3`, `border: 1px solid var(--rule)`, `--r-xs`, padding 1 × 6 px, `white-space: nowrap`, vertical-align middle.
- Tags beginning with `CORRECTION`: `--warn-soft` background and `--warn` text; the word is the cue, not the colour.
- In the TOC rail, show tags only in the tooltip, not inline, to keep the outline calm.

### 8.8 Formulas, tables, code, collapsible sections

- **Long equations:** scroll inside the block; edge fade; keyboard focusable; never reflow math. On phones the block keeps natural size and scrolls horizontally with momentum (`-webkit-overflow-scrolling: touch`).
- **Copy actions:** Copy TeX on equations (hover/focus on desktop, always visible on touch), Copy on every R block, **Copy AI Prompt** only where the Master Plan allows it for complex formulas or R demonstrations (optional, section 9.2 styling, never more than one per major worked demonstration).
- **Collapsible sections:** the *outline* collapses; content does not hide irretrievably. Optional per-H2 collapse chevron (default expanded) uses `hidden="until-found"` so browser find still opens it; an "Expand all / Collapse all" control sits in the chapter overflow menu. Collapsed state is not persisted across sessions.
- **Statistical tables:** numeric alignment from source colons, tabular numerals, row hairlines, sticky first column only for wide tables, 16-column maximum scrolls inside its wrapper.

### 8.9 Original PDF viewer

- **Entry:** the "View Original PDF" button in the chapter header (and nowhere else; no global grid of PDFs).
- **Overlay mode (default):** a full-viewport panel that slides up 8 px while fading in (200 ms, opacity + transform). It is a *reader view*, not a modal wall.
  - Header (56 px): back button **Back to chapter**, title "Original PDF · <chapter title>", filename in `--ink-3` (for example `Lec3.pdf`), a text label "Original lecture PDF, not the teaching chapter", and a group: **Open in new tab** (`i-external`), **Save PDF**, **Split view** (≥ 1360 px).
  - Body: the PDF `iframe`/`object` on a `--sunken` frame with 1 px border; the viewer's own controls handle zoom and pages.
- **Dark theme:** the PDF is **never inverted or filtered**; surround it with themed chrome only.
- **Loading:** only after the first click. Show the axis loader (10.3 #16) with "Preparing PDF…" in the frame immediately; if preview does not appear within 4 s or is blank, replace the frame with the fallback panel (6.9) offering Save PDF as the primary action. Never show a failure as "file missing".
- **Split view (optional, ≥ 1360 px):** reading column left, PDF right, a 6 px draggable divider (also `←/→` to resize in 24 px steps, `Home/End` to reset), min widths 520 / 360 px, persisted ratio with guarded storage. Do not imply page-to-section synchronisation unless a validated mapping exists.
- Closing returns focus to the **View Original PDF** button and restores chapter scroll position.

### 8.10 Previous / next

- Header icon buttons (Previous, Next) with tooltips showing the destination title; chapter end shows two large rows: ← Previous chapter title, Next chapter title →, each 72 px with chevron and the chapter number. Keyboard: `j`/`k` or `n`/`p`. Supplementary chapters are navigated in the same list, no special skipping.

### 8.11 Long-document accessibility

- Landmarks: `<main>`, `<nav aria-label="Chapter contents">`, `<article>` per chapter; one `<h1>` per view (the chapter title); source headings are demoted so the document outline stays valid.
- Skip link "Skip to chapter content" is the first focusable element.
- Heading permalinks (`#`) appear on hover/focus only, with `aria-label="Link to section …"`.
- Equation scroll regions and tables are focusable with labels; `content-visibility: auto` sections remain readable by assistive tech and findable.
- Support 200% browser zoom and 320 px viewport widths with no horizontal page scroll (only inside equation, table and code containers).

---

## 9. Question and answer interfaces

All four collections share **one card anatomy, one action vocabulary and one answer panel**. Differences come from **labels, chips, provenance tone and a few content-specific components**, so the product feels unified but never confuses official, practice and predicted material.

### 9.1 Shared question card anatomy

```
┌────────────────────────────────────────────────────────────────────┐
│ ┌──┐  Question 3                                  [bookmark] (ring)         │  header: number badge, title, bookmark, complete ring
│ │ 3│  Final · January 2024 · DA2451 · 20 marks                       │  meta chips (text)
│ └──┘                                                                 │
│  Question text, rendered Markdown and math, `--fs-md`, measure       │  body (.q-body)
│  (a)  Part text …                                       [5 marks]    │  parts with hanging labels
│       (i)  Sub-part …                                                │
│ ───────────────────────────────────────────────────────────────────  │
│  [ Show answer ]               [ Copy AI Prompt ]  [⧉]  [↗]          │  action row
│ ┌────────────────────────────────────────────────────────────────┐   │
│ │ Worked solution                                                │   │  answer panel (hidden by default)
│ └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────┘
```

- Card: `--surface`, 1 px `--rule`, `--r-md`, padding 24 px (16 px phone). No shadow. Cards are separated by 16 px, not nested in extra wrappers.
- **Number badge:** 36 px rounded square (`--r-sm`), `--sunken` fill, tabular numerals, weight 650. For MCQs it shows the number; for parts use hanging letters, not badges.
- **Meta chips** (text only, `--fs-xs`, `--r-xs`, outline): paper type (Final / In-class / Quiz), date label as printed (month-year for finals, "Semester 4, 2023" otherwise), course code **as printed per paper** (DA3420 or DA2451), marks. **Do not display or sort by invented dates.**
- **Marks** from the source appear as a muted pill (`--sunken`, `--ink-2`) right-aligned on the part row, text identical to source (`[3 marks]`, `(3 marks)`, `[Total marks for G-ESS-003 = 20]`). They are labels, not scores.
- **Parts and sub-parts:** hanging label column (`(a)` 32 px, `(i)` indented 32 px more) in tabular numerals, `--ink-2`, content flows at the right; parts are separated by `--s-4`, sub-parts by `--s-3`. Source numbering is shown exactly as given (including the preserved duplicate "(b)" case noted in the Practice guide).
- **Context / setup blocks** shared across parts (shared scenario, dataset, R output) appear once above the parts in a `.q-context` surface (`--surface-2`, `--r-sm`, label "Context"), with a "Context" jump link from any part.
- **Original question text** inside practice worksheets uses `.q-original`: `--surface-2`, 3 px `--accent-line` leading rule, label "Original question" in `--fs-sm` `--ink-3`.
- **Provenance and source-note labels from the content** (for example "Lecturer-provided solution", "Guided reasoning", "Supplementary exercise, not in the original PDF") stay visible and are styled as small neutral labels; "Supplementary exercise…" uses the same dashed-outline Supplementary chip as chapters.

### 9.2 Copy action vocabulary (Copy AI Prompt is a flagship feature)

Four distinct copy actions, visually and verbally different. **Never one generic "Copy".**

| Action | Look | Where | Label |
|---|---|---|---|
| **Copy AI Prompt** | Tinted violet pill: `--prompt-soft` fill, 1 px `--prompt-line` border, `--prompt` text and icon (`i-prompt`), 36 px high (44 px on touch), **text label always visible** | Every past-paper question, practice question, predicted MCQ and predicted essay; optionally complex formulas/R demos in lectures | "Copy AI Prompt" |
| **Explain this solution** | Same shape, outline only (transparent fill, `--prompt-line` border) | Inside a **revealed** answer panel only (never appears while the answer is hidden); copies a prompt asking the AI to explain the displayed solution | "Explain this solution" |
| **Copy question** | Ghost icon button (`i-copy`), 36 px, tooltip "Copy question" | Question header action cluster | icon only, `aria-label="Copy question"` |
| **Copy code / Copy TeX** | Small ghost text-button inside the code/equation chrome, `i-copy` + "Copy" | Code header strip, equation top-right | "Copy" / "Copy TeX" |

Rules:

- **Discoverability without competition:** the AI Prompt pill is the only coloured element in the action row, placed at the **start of the right-hand cluster**, directly left of the icon buttons, so it is always in the same spot in every collection. The reveal button is neutral outline so the academic action stays primary.
- **One per question**, not per part (the Master Plan specifies per question). Accessible name includes the ID: `aria-label="Copy AI Prompt for C-MCQ-017"` (text label stays "Copy AI Prompt").
- **First-use help:** a tiny `?` ghost button next to the first prompt button on a page opens a popover: "Copies a ready-to-paste prompt containing this question. Paste it into your own AI assistant (ChatGPT, Gemini, Claude…) to get a step-by-step explanation. It works offline and nothing is sent anywhere." The popover is dismissible and remembered once.
- **Feedback:** on click the pill's label becomes "Copied" with `i-check`, background switches to `--ok-soft`/`--ok` for 1800 ms, then eases back; a polite live region announces "Prompt copied. Paste it into your AI assistant." If the clipboard fails, open the manual-copy popover (6.9), pre-selected, instead of a toast.
- **Prediction-specific:** a one-line hint sits under the action row: "No answers are included: the prompt asks your AI assistant to teach and solve it." The prompt text states the question is unofficial and unverified (content rule from the Predicted guide), the UI does not repeat that warning here.
- **Past papers:** the question-only prompt must not contain the stored answer; "Explain this solution" is the only action that does, and appears only on revealed answers.
- On phones the action row wraps to two rows: reveal full-width above; below it the prompt pill (flex 1) plus the two icon buttons.

### 9.3 Past Papers

- **Paper selection:** grouped list by batch heading (Batch 19 … 23). Row (76 px): paper title as in the source ("Final Examination (July 2022)"), a paper-type chip (Final / In-class / Quiz), course code as printed, duration and total marks as printed, composition derived from data ("25 MCQ + 2 essay"), progress count, chevron, new-tab icon. Order follows the manifest in the Past Papers guide (source/chronological order). Three different paper types must be distinguishable by **text chip and chip shape** (Final = solid-outline, In-class = dashed-outline, Quiz = rounded pill outline), never colour alone.
- **Paper view:** title block (title, chips, duration/marks/open-book line as printed), collapsible **Instructions to candidates** (source content, collapsed by default, expand control labelled), then sections (MCQ, Essay) with the **question rail** (9.7).
- **Questions:** one card per question, parts nested. MCQs show lettered options (9.5 layout); essays show parts. Reveal applies per part/sub-part (button on each part's right edge) plus "Show all for this question" and "Show full paper solutions" (in the paper overflow menu; confirm is not needed).
- **Answer panel:** see 9.9. Shows restated heading, beginner explanation, steps, final answer, in that source order; "Final answer" blocks get the boxed treatment from 4.4.
- **Honesty states:** if a question has no mapped answer, show a `--warn-soft` inline note "No answer is mapped to this question in the source files." Do not hide the reveal button silently.
- **No timers, scores or marking.** Optional timed practice is not designed here; if shipped later it must be a quiet, dismissible countdown in the topbar with no pressure styling.

### 9.4 Practice Questions

- **Worksheet selection:** five rows in source order (not 5 tiles): "Practice Worksheet N", the source topic in `--ink-3`, question count and "n of N complete" (from data), chevron.
- **Worksheet view:** header (title, topic, counts), question rail (9.7), then question cards. A question card here contains: **Original question** (`.q-original`), optional note paragraph from the source, **Show solution** button, then the solution panel.
- **Long problems:** the question body may contain tables up to 12 columns, 25-row datasets and matrices; datasets in `text` fences render as scroll-contained "Data" cards (label "Data", Copy button). A very long inline equation on a phone scrolls inside its own line container; the page never scrolls sideways.
- **Solution panel for worksheets:** step groups (H3/H4) collapsible with **Expand all / Collapse all**, default **expanded after reveal** so nothing is hidden; sticky mini-TOC for the solution on ≥ 1280 px for long ones; R code and statistical interpretation appear in their source order using the standard code and callout styles.
- **Completion feedback:** "Mark complete" toggles the ring (5.6); the header shows "Marked complete" in `--ink-3`; the worksheet counter updates. After marking, a **Next question** ghost button appears inline; no auto-advance, no confetti, no sound.
- Conditional / dataset-dependent source answers keep their source wording; do not style them as errors.

### 9.5 Predicted MCQs

- **Entry:** the section header shows the **Unofficial practice predictions** notice (9.8) once; afterward it collapses to "About these questions".
- **Filter bar** (sticky under the topbar): segmented control **All / ChatGPT / Gemini** with counts computed from displayed data; a "Browse by source topic" disclosure (topics rendered exactly as written, including math); a small status filter (All / Bookmarked / Marked complete / Not marked).
- **Card header:** ID in tabular monospace small text (e.g. `C-MCQ-017`), number badge with the **original** number, generator chip "ChatGPT" or "Gemini" (text first, optional neutral glyph), the source topic line, the amber chip **Unofficial · AI-generated** (links to the notice).
- **Stem** in `--fs-md`; code spans and fenced output keep their styles (the "Supplied output (hypothetical data)" label only where the source says hypothetical).
- **Options:** real `radio` inputs (visually restyled) in a `role="radiogroup"` labelled by the stem; each option is a 48 px minimum row, full width, `--r-sm`, 1 px `--rule` border, a 28 px letter badge (A–D) and option text that wraps (`min-width: 0; overflow-wrap: anywhere`), with inline math allowed to scroll inside the option (Gemini options include inline matrices).
  - **Selected = "My pick":** `--accent-soft` fill, 1.5 px `--accent-line` border, letter badge filled `--accent` with `--accent-ink`, and a right-aligned text label "My pick". The same treatment for **any** option.
  - **No green, no red, no check/cross icons, no "Submit", "Check" or "Correct"** anywhere, and no animation that suggests judgement. A "Clear" text button removes the pick.
  - Helper text above the options: "Choose your working answer. This is for your own practice and isn't checked."
  - If a pick exists, an optional checkbox appears under the options: "Include my pick in the prompt: My tentative choice, please check my reasoning". **Default off.**
- **Action row:** `Copy AI Prompt` pill, `Copy question`, new-tab, bookmark and complete controls in the header. **No Reveal button on predictions.** The one-line "No answers are included" hint replaces it.

### 9.6 Predicted Essays

- Same filter bar and notice. Card header identical in structure, plus the essay title and marks as written.
- **Hierarchy:** scenario/context first (`.q-context`), then parts `(a)`, `(b)` with hanging labels, sub-parts `(i)`, `(ii)`; marks badges (muted) at the right of each row; data tables and fenced data inside scroll wrappers; matrices as display equations.
- **My notes (optional):** a collapsed disclosure "My notes" containing a plain textarea (stored locally only, clearly labelled "Personal notes, saved on this device"); no answer boxes, no word counters, no marking hints.
- Same action row as MCQs; **Copy AI Prompt** includes every part and sub-part. No reveal button.
- Long essays: sticky mini-outline of parts on ≥ 1280 px is optional; ensure an **Expand all parts** control is not needed (parts are never collapsed by default).

### 9.7 Question navigation (rail and strips)

- **Desktop:** a sticky left rail inside the content area (width 168 px) beside the questions. Sections are headings (MCQ, Essay); question numbers are 36 px square buttons in a 4-column grid (tabular numerals). States use **shape plus colour**:

| State | Visual |
|---|---|
| Current | Filled `--accent` background, `--accent-ink` text |
| Not started | Outline `--rule-strong` |
| Marked complete | Small check in the corner and `--ink-2` text |
| Bookmarked | Small notch/bookmark corner mark |
| Revealed (past papers/practice) | Small dot (shape), only where a reveal exists |

- **Phone:** a horizontally scrollable number strip pinned under the topbar (40 px, snap-aligned, current centred) plus a "Jump" button opening a bottom sheet with the full grid and filters. Strips for MCQ papers (up to 30 items) and essays are separate rows.
- Previous/next question buttons sit at the card bottom and are bound to `j`/`k`; hash updates for deep links; the rail scrolls the current item into view.
- **Selecting a paper, worksheet or filter never resets scroll in a surprising way:** returning from a question list restores scroll and open/revealed states (11.6).

### 9.8 Notices, creator note and attribution presentation

- **Unofficial predictions notice** (component `.notice-predicted`): `--predicted-soft` background, 1 px dashed `--predicted-line` border, `--r-md`, `i-predict` icon, title in weight 650, body in `--ink`. Text is the exact wording from the Master Plan §6 / Predicted guide §8.1. Shown **once** at the top of each Predicted view, collapsible and remembered per device, always re-openable by an "About these questions" link. Never repeated as a paragraph on cards (cards carry only the small chip).
- **Creator note:** directly under the notice, plain `--surface-2` box, `--fs-sm`, using the creator's verbatim wording (C3). It appears once per Predicted view and in About.
- **Attribution (About / footer):** a small credits list separating *question generation* (ChatGPT, Gemini, with their exact tool names as supplied) from *app and resource preparation* (Claude). Per-question chips say only "ChatGPT" or "Gemini". Nothing implies university endorsement; include "An independent student-created revision resource."
- **Distinct treatment of predicted material everywhere:** amber tone, dashed borders, "Unofficial · AI-generated" chip, "Predicted" in breadcrumbs, dashed-ellipse nav glyph. Past papers and worksheets never use amber and never carry these chips.

### 9.9 Answer reveal behaviour (all collections that have answers)

- **Control:** a real `<button>` with `aria-expanded` and `aria-controls`; label toggles **Show answer / Hide answer** (papers) or **Show solution / Hide solution** (worksheets). Answers start hidden in practice contexts.
- **Panel:** `.answer` = `--sunken` background, 1 px `--rule`, `--r-md`, 3 px `--accent-line` leading rule, padding 20–24 px, header "Worked solution" with the source label where relevant. Content stays in the DOM (or is injected lazily per question on first reveal) and is hidden with `hidden="until-found"` so browser find can open it; sync the button state on `beforematch`.
- **Chunks:** step groups keep their source headings; collapsible groups are optional and **default open** after reveal. "Show everything / Collapse steps" control at the panel top for long solutions.
- **Reveal does not move the viewport away from the question:** keep the panel's top edge in view (scroll into view only if the panel's top is below the fold).
- Hiding the answer does not discard its state; reopening restores expanded groups within the visit.

### 9.10 Completion and bookmark controls

- **Bookmark:** 36 px ghost icon button in the card header, `aria-pressed`; filled glyph when set; 220 ms soft scale pop (10.3 #15). Appears in Bookmarks on the dashboard.
- **Mark complete:** a 28 px ring-check toggle (5.6) with text label on hover/focus and always in an overflow menu on phones; `aria-pressed`. Completion means **"I have worked through this"**, never correctness. Copy must say "Marked complete" or "Mark complete", not "Done correctly".


---

## 10. Motion system

### 10.1 Philosophy and rules

- **Motion answers action or shows change.** It never decorates, never delays access to content, never loops (one exception, 10.3 #16).
- **One signature moment**, not many: the ellipse draw on the first dashboard view of a session (10.3). Everything else is interaction feedback.
- Animate `transform` and `opacity` only. Height or grid-row animation is allowed solely for small, short regions (< ~600 px tall); long content uses opacity only.
- Durations come from tokens: press 80 · fast 140 · base 200 · slow 280 · sheet 320 ms. Entrances use `--ease-out`; repositioning uses `--ease-in-out`; the soft spring is reserved for bookmark.
- No scroll-jacking, parallax, cursor effects, long intros, staggered list reveals, or blur effects.
- No timers for animation: use CSS transitions/keyframes; JavaScript only toggles classes and attributes.

### 10.2 Reduced-motion, designed rather than deleted

Define once; applies to both the OS preference and an in-app "Reduce animations" setting (`html[data-motion="reduce"]`).

```css
@media (prefers-reduced-motion: reduce) {
  :root { --t-press: 1ms; --t-fast: 1ms; --t-base: 1ms; --t-slow: 1ms; --t-sheet: 1ms; }
  html { scroll-behavior: auto; }
  .anim-draw { animation: none; stroke-dashoffset: 0; }          /* ellipse already drawn */
  .axis-loader { animation: none; }                              /* static axes + text */
  .skeleton { animation: none; opacity: .75; }
}
:root[data-motion="reduce"] { --t-press: 1ms; --t-fast: 1ms; --t-base: 1ms; --t-slow: 1ms; --t-sheet: 1ms; }
:root[data-motion="reduce"] .anim-draw, :root[data-motion="reduce"] .axis-loader { animation: none; stroke-dashoffset: 0; }
```

Reduced-motion replacements keep **state clarity**: reveals appear instantly; the copy button still changes label and icon (the information is textual); progress bars still update (no easing); modals appear without translation.

### 10.3 Catalogue (every major animation)

| # | Animation | Purpose | Visual behaviour | Duration · easing | Trigger | Implementation | Reduced-motion fallback | Performance notes |
|---|---|---|---|---|---|---|---|---|
| 1 | Initial page | Feel instant | **None.** The real shell is the first paint | 0 | Load | Inline critical CSS; no splash | n/a | Zero startup cost |
| 2 | Dashboard signature | One memorable, meaningful moment | Ellipse outline draws itself (stroke offset 1 → 0), axes fade in after | 700 ms · `--ease-out`, axes 200 ms delay | First dashboard view per session only | CSS keyframes on `pathLength="1"` ellipse; JS sets `sessionStorage` flag (guarded) after first run | Drawn statically | One SVG element, non-blocking, after first paint |
| 3 | Route/view change | Show a new view loaded | New view fades in; scroll restored; no exit animation | 160 ms · `--ease-out` | Hash change | Class `.view-enter` on the new container, removed on `animationend` | Instant | Opacity only; avoid animating huge chapter containers: apply to the header block only |
| 4 | Sidebar expand/collapse | Spatial continuity | Desktop: width 280 ↔ 72; labels fade; main shifts. Tablet/phone: overlay slides in on `translateX` over scrim | 200 ms · `--ease-in-out` | Toggle, `[` | Desktop: transition on `--sidebar-w` grid column (reading column width is clamped so text does not reflow); overlay: transform + scrim opacity | Instant | If profiling shows jank on long chapters, make the desktop collapse instant |
| 5 | Hover feedback | Affordance | Background steps one level; icon colour change | 140 ms · linear-ish ease | Pointer hover only | `@media (hover:hover)` transitions on `background-color`, `color` | Instant | No transforms on list rows |
| 6 | Button press | Tactile response | `scale(.98)` | 80 ms · `--ease-out` | `:active` | CSS | None | Transform only |
| 7 | Card interactions | Selection clarity | Rows: hover fill only. Question cards do **not** lift or tilt | 140 ms | Hover / focus | CSS | Instant | No box-shadow animation |
| 8 | Accordion / disclosure | Show structure change | Small regions: grid rows 0fr → 1fr with 8 px opacity-settle; chevron rotates 90° | 200 ms · `--ease-out` | Click, Enter/Space | `grid-template-rows` transition + `hidden`/class; chevron `transform: rotate` | Instant | Only for regions < ~600 px; long regions use opacity only |
| 9 | Theme change | Soften a global change | Crossfade of the whole viewport | 200 ms | Toggle | `document.startViewTransition` where supported, otherwise instant attribute swap (14.8) | Instant | Snapshot is viewport-sized and cheap; never a tree-wide colour transition |
| 10 | Question/answer reveal | Show what appeared | Panel fades in with 4 px rise; button label changes; chevron flips | 200 ms · `--ease-out` | Click, `r` | Toggle `hidden="until-found"`; add `.is-entering` (opacity + translateY 4px → 0) | Instant | Opacity/translate only, never height; lazy-inject content on first reveal |
| 11 | Dialog / sheet | Focus and layering | Dialog: scale .98 → 1 + fade; sheet: translateY 24 px → 0 + fade; scrim fades | Dialog 200 ms, sheet 320 ms · `--ease-out`; exit 140 ms | `showModal()` / close | CSS on `dialog[open]` + `@starting-style` where supported; else a class toggled the next frame | Instant | No blur on scrim |
| 12 | Reading progress | Orientation | Bar scales with scroll | No easing (direct) | Scroll | `transform: scaleX(p)` updated in a passive scroll handler throttled by `requestAnimationFrame`; progressive enhancement `animation-timeline: scroll(root)` | Same (it is information) | Single composited layer |
| 13 | Toast | Non-blocking confirmation | Slides up 8 px and fades; leaves with fade | In 200 ms, out 140 ms | Programmatic | Class toggle; auto-dismiss by one `setTimeout` per toast | Fade only | Max two toasts |
| 14 | Copy feedback | Confirm clipboard success | Label → "Copied" + check icon; tint turns green for 1.8 s | Colour 140 ms | Copy click | Class `is-copied` + label swap (14.5) | Same (no motion involved) | Class toggle only |
| 15 | Bookmark / completion | Acknowledge a state change | Bookmark: glyph scale .8 → 1.12 → 1 with soft spring; complete ring: arc fills, check fades in | 220 ms soft spring; ring 200 ms | Click, `b` | Keyframes on the icon; ring via `stroke-dashoffset` transition | Instant state change | Per-icon only |
| 16 | PDF preparing | Confirm work in progress | Two perpendicular axis lines rotate 90° back and forth | 1.2 s ease-in-out, **only while preparing** | PDF open | CSS keyframes on one `<svg>`; removed when ready | Static axes + text | Appears only after 300 ms delay |
| 17 | Search | Keep the eye oriented | Dialog per #11; results appear instantly; active-result bar moves with the selection | 100 ms | Typing, arrows | Class toggle; no list animations | Instant | Render ≤ 40 rows |
| 18 | Mobile tab bar | Gain reading space | Hides on scroll down, returns on scroll up | 200 ms · `--ease-in-out` | Scroll direction | `transform: translateY(100%)`; direction detected in a passive scroll handler (rAF) | Instant | Compositor only |
| 19 | Loading skeleton | Reserve space, signal pending | `--sunken` shapes; single opacity pulse only if loading > 400 ms | 1.2 s ease-in-out, max 3 cycles | Lazy hydrate | `.skeleton` class removed on ready | Static | No shimmer gradients |
| 20 | Countdown | Calm, accurate time | **No animation** on tick | 0 | Timer | Text swap only when value changes | n/a | Aligned `setTimeout`, paused when hidden |
| 21 | Anchor landing | Help the eye land after a jump | Target heading gets a brief tint | 600 ms fade | In-page jump | `::after` pseudo-element opacity animation | Skipped | Opacity only |
| 22 | Chapter hydrate | Avoid visual jump as sections render | None visible; placeholders keep height | 0 | IntersectionObserver | Pre-sized `content-visibility` placeholders | n/a | Chunks of ~1 screen |

### 10.4 Core keyframes and transitions

```css
@keyframes fade-in   { from { opacity: 0 } to { opacity: 1 } }
@keyframes rise-in   { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
@keyframes pop       { 0% { transform: scale(.8) } 60% { transform: scale(1.12) } 100% { transform: scale(1) } }
@keyframes draw      { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes pulse     { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
@keyframes axis-turn { 0% { transform: rotate(0) } 50% { transform: rotate(90deg) } 100% { transform: rotate(0) } }
@keyframes flash-bg  { from { opacity: .9 } to { opacity: 0 } }

.view-enter  { animation: fade-in 160ms var(--ease-out) both; }
.is-entering { animation: rise-in var(--t-base) var(--ease-out) both; }
.anim-draw   { stroke-dasharray: 1; animation: draw 700ms var(--ease-out) both; }   /* on .ax-ellipse, first view only */
.bm-pop      { animation: pop 220ms var(--ease-soft-spring); }
.skeleton    { background: var(--sunken); border-radius: var(--r-xs); animation: pulse 1.2s ease-in-out 3; }

.axis-loader { width: 28px; height: 28px; transform-origin: 50% 50%; animation: axis-turn 1.2s var(--ease-in-out) infinite; color: var(--ink-3); }

/* Dialog enter/exit (progressive enhancement; falls back to instant) */
dialog { border: 0; padding: 0; border-radius: var(--r-lg); background: var(--surface); color: var(--ink);
         box-shadow: var(--shadow-sheet); opacity: 0; transform: scale(.98);
         transition: opacity var(--t-base) var(--ease-out), transform var(--t-base) var(--ease-out),
                     overlay var(--t-fast) allow-discrete, display var(--t-fast) allow-discrete; }
dialog[open] { opacity: 1; transform: none; }
@starting-style { dialog[open] { opacity: 0; transform: scale(.98); } }
dialog::backdrop { background: var(--scrim); transition: opacity var(--t-base) var(--ease-out); }

/* Small disclosure (not for long answers) */
.disclosure { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--t-base) var(--ease-out); }
.disclosure.is-open { grid-template-rows: 1fr; }
.disclosure > .inner { overflow: hidden; min-height: 0; }
.chev { transition: transform var(--t-base) var(--ease-out); } [aria-expanded="true"] > .chev { transform: rotate(90deg); }
```

### 10.5 Scroll-based enhancements (only these)

1. Topbar hairline and `--shadow-1` once `scrollY > 8` (toggle a class in the same rAF handler as progress).
2. Reading-progress bar.
3. TOC current-section tracking with `IntersectionObserver`.
4. Mobile tab bar hide/show.

No reveal-on-scroll animations for content blocks.

---

## 11. Interaction standards

### 11.1 Button hierarchy (one vocabulary everywhere)

| Level | Look | Used for | Rule |
|---|---|---|---|
| Primary | Filled `--accent`, `--accent-ink` text, `--r-sm`, 40 px (44 touch) | Resume, Start reading, Continue, confirm in dialogs | **At most one per view area** |
| Secondary | `--surface`, 1 px `--rule-strong`, `--ink` | Show answer / solution, View Original PDF, Open, Save PDF | The default for academic actions |
| Prompt | Violet tint (9.2) | Copy AI Prompt, Explain this solution | Reserved; never reused |
| Ghost | Transparent, icon or text, hover `--sunken` | Copy question, bookmark, new tab, TeX copy, settings | 36 px visible, 44 px hit area on touch via padding or `::after` |
| Destructive | Secondary with `--err` text/border | Reset progress (inside a confirmation dialog) | Never inline on content pages |

Consistent placement: card action row is always [reveal] left, [prompt, copy, new tab] right; header always holds [bookmark, complete] at the trailing edge; chapter header holds [Resume/Start, View Original PDF] left and overflow right.

### 11.2 Affordances

- Every clickable thing has a hover cue (pointer only), a focus ring, and a cursor change; rows that are links look like rows (chevron), not like text.
- Icon-only buttons always have a tooltip and `aria-label`. Text buttons never use "Click here".
- Disabled controls explain themselves via `aria-describedby` text or tooltip (for example "No original PDF for this chapter" is not needed because the control is simply absent).

### 11.3 Copy interactions

- One click, no confirmation dialog, works **offline** (section 14.5). Feedback is inline on the button first; the live region second; a toast only for keyboard-shortcut-initiated copies.
- Copy buttons never move or resize when their label changes ("Copied" is reserved width via `min-width`).
- Clipboard failure shows the manual-copy popover with the text pre-selected (works under `file://`).

### 11.4 Solution reveal

Per 9.9. `r` toggles the answer of the focused/current question; the state is visible on the button; revealing never auto-scrolls the question out of view.

### 11.5 Search, filters and sources

- Search results update live; filter chips are real toggle buttons with counts where meaningful. The source filter (All / ChatGPT / Gemini) is a segmented control with `role="radiogroup"` semantics; the selection persists per view for the session and is announced ("Showing 40 ChatGPT questions").
- Changing a filter never scrolls the user to the top unexpectedly; it keeps the first visible question in place when it still exists, otherwise scrolls to the list top.

### 11.6 State preservation, scroll restoration and back navigation

| What | Behaviour |
|---|---|
| Browser Back | Returns to the previous view **with scroll position restored** (set `history.scrollRestoration = 'manual'` and store scroll per hash route) |
| Return from a question to its list | List restored at the same position with the same filters |
| Open/revealed answers | Preserved within the visit (in memory); not persisted across sessions |
| Persisted (guarded storage) | Theme, reading settings, bookmarks, completed flags, last position per chapter/paper/worksheet, source filter per view (optional), notices dismissed |
| Dialogs/sheets on phones | Close with Back (optional history entry) or swipe/scrim/Esc |
| Deep links | Open the exact item; focus moves to the item's heading, not the page top |

### 11.7 Notifications and confirmation

- Nonintrusive only: inline confirmations first, toast second, dialog last. Never auto-dismiss errors that require action. No badges, no counters, no nags.
- Confirmation dialogs only for: Reset all progress, Import that replaces data. Not for bookmark, complete, copy, filters or navigation.

### 11.8 Touch and pointer

- Hit targets ≥ 44 × 44 px on coarse pointers (`@media (pointer:coarse)`), ≥ 24 × 24 px minimum on fine pointers, 8 px between adjacent targets.
- No hover-dependent functionality: anything shown on hover is also available on focus and on touch (Copy TeX, heading permalinks).
- Swipe gestures are optional enhancements only (sheets); never the only way to navigate.

### 11.9 Writing in the interface

Sentence case, plain verbs, no filler, the same name for an action across its flow ("Copy AI Prompt" → "Copied"). Empty and error states state what happened and what to do. No exclamation marks, no motivational or "gamified" language, no emoji (except the creator's verbatim note, C3).

---

## 12. Performance-first design rules

The file is large and content-heavy; design must never be the reason it feels slow.

### 12.1 Budgets and rules

| Area | Rule |
|---|---|
| First paint | Real shell and dashboard skeleton in the first HTML chunk; critical CSS and the theme boot script come first; no splash |
| CSS | Aim ≲ 40 KB minified for app styles (excluding KaTeX); flat selectors (single class); avoid deep descendant selectors and heavy `:has()` over big DOM (use it only at the paragraph level, or drop it) |
| Icons | One inline sprite (≲ 8 KB), referenced with `<use>`; no per-icon `<svg>` path duplication in lists beyond the `<use>` tag |
| DOM | Hydrate chapters and answers lazily: render per H2 chunk as it nears the viewport (about 1.5 screens ahead), question bodies on first display, answer panels on first reveal. Target ≲ 3,000 DOM nodes visible-plus-nearby at any time (KaTeX is node-heavy) |
| Long documents | `content-visibility: auto; contain-intrinsic-size: auto 800px;` on chapter sections (retains find-in-page and anchor behaviour); `contain: content` on question cards |
| Events | One delegated `click` listener and one `keydown` listener at the root with `data-action` routing; passive scroll listeners; `IntersectionObserver` for TOC tracking and hydration |
| Layout thrash | Read all measurements, then write; never measure in loops; progress and tab bar updates are rAF-throttled |
| Effects | **No** `backdrop-filter`, `filter`, `mix-blend-mode`, large blurred shadows, gradients as decoration, or animated box-shadows. `will-change` only during an animation, then removed |
| Theme switch | One attribute change; all colours are variables; View Transitions crossfade only where supported |
| SVG | Illustrations ≤ ~1.5 KB each; no filters; no embedded rasters; animate stroke offset or transforms on one element |
| Fonts | System fonts; KaTeX woff2 only; no `@import`, no font CDNs |
| PDFs | Never preloaded; decode on the first View click; show the axis loader after 300 ms; remove viewer DOM and revoke object URLs when closed and not open in another tab; do not mount iframes at startup |
| Search | Index loaded lazily on first open; keep the dialog light; ≤ 40 rendered rows |
| Timers | Exactly one: the countdown (aligned to the second, paused while the tab is hidden). Toasts use per-toast timeouts. No polling |
| Storage | Writes are debounced (≥ 400 ms for scroll position) and wrapped in try/catch |
| Images | None required; no remote images; no data-URI photographs |

### 12.2 Perceived speed

- Interactions respond in one frame: active styles apply on `pointerdown`, not after `click` completes.
- Do not wait for animation before navigating; content swaps immediately.
- For chapters, show the header and first section first, then hydrate; the skeleton height matches the section's estimated height to avoid layout jumps.

### 12.3 Measure and report

Measure on a mid-range laptop and a mid-range phone: initial HTML size, time to dashboard usable, first chapter open, first search open, first PDF open, scroll smoothness through a long chapter, memory after repeated PDF opens. Report real values; do not invent benchmarks. (The Master Plan and PDF guide require these measurements.)

---

## 13. Accessibility and responsiveness

### 13.1 Requirements

| Area | Requirement |
|---|---|
| Structure | `<html lang="en">`; landmarks (`header`, `nav`, `main`, `footer`); one `h1` per view; no skipped heading levels in app chrome; skip link as the first focusable element |
| Keyboard | Everything operable by keyboard; logical tab order; roving tabindex for segmented controls, tab bar and question rail; `Esc` closes overlays; focus never trapped except inside open modal dialogs |
| Focus | 2 px outline, 2 px offset, ≥ 3:1 against adjacent colours in both themes; never `outline: none` without a replacement; focus moves intentionally after route change, dialog open/close and answer reveal (focus stays on the reveal button) |
| Screen readers | Buttons are `<button>`, links are `<a>`; state via `aria-expanded`, `aria-pressed`, `aria-current`, `aria-controls`; polite live region for copy, filter counts and search counts; countdown announced once per minute through a hidden `role="timer"` sentence, not per second |
| Contrast | Text ≥ 4.5:1, large text and UI ≥ 3:1; verify every token pair in both themes with 15.1; chip and badge text included |
| Colour independence | Selected, current, completed, bookmarked, predicted, supplementary: each has a **text, shape or icon** cue in addition to colour |
| Reduced motion | 10.2 |
| Text scaling | rem-based sizing; works to 200% browser zoom and 320 px width with no loss of content or function; no `maximum-scale` / `user-scalable=no` |
| Touch | 11.8 |
| SVG | Decorative: `aria-hidden="true"`; informative: `role="img"` with `<title>`/`<desc>`; icon buttons labelled on the button |
| Mathematics | KaTeX `htmlAndMathml` output where size permits (the guides say `html` saves ~2.8 MB; if `html` is chosen, state the accessibility trade-off); scrollable equation regions focusable and labelled; Copy TeX available; never images of equations |
| Tables | `<th scope>` present; captions kept; scroll wrappers focusable with labels |
| Collapsible answers | Button with `aria-expanded`/`aria-controls`; content hidden with `hidden` (`until-found` where supported), never `display:none` hacks on top of visible content |
| Forced colours / high contrast | `@media (forced-colors: active)` keeps borders and focus visible (use system colours); `@media (prefers-contrast: more)` strengthens rules (3.4) |
| Dark mode | Verified with long text, thin KaTeX strokes, code and tables; no pure white text on near-black |
| PDF | Native viewer retains its own accessibility; the app provides labelled controls and the Save fallback |

### 13.2 Breakpoints and layout transitions

Content-driven rather than device-named. Use these as the main switch points:

| Width | Change |
|---|---|
| < 600 px | Single column; ellipse hidden; bottom tab bar; 20 px gutters; 16 px card padding |
| 600–719 px | Single column, larger gutters (28 px); dashboard lists stack |
| 720–1199 px | Sidebar becomes a 72 px rail; dashboard list + progress side by side from 900 px; TOC in a sheet |
| 1200–1279 px | Full sidebar (280); TOC in a sheet |
| ≥ 1280 px | Right TOC rail appears in chapters |
| ≥ 1360 px | Optional PDF split view |
| ≥ 1680 px | Content stays clamped (`--page-max` and `--measure`); extra width becomes margin, not wider text |

Use **container queries** (`container-type: inline-size` on cards and the question column) for internal card layout changes (action row wrapping, option wrapping) so a card behaves the same inside any pane.

Layout transitions between breakpoints do not animate (resizing is user-driven); only the sidebar toggle and overlays animate (10.3).

### 13.3 Layout density

One comfortable density. Reading surfaces prioritise measure and rhythm; selection screens are compact (56–76 px rows). Whitespace has a job (separating ideas); do not add padding to look premium. The reading column holds `--measure` and the rest of the viewport is margin, TOC or PDF, so the page feels spacious without wasting reading space.

### 13.4 Mobile typography and equations

- Body reading size `--fs-read` min 17 px on phones; UI text ≥ 15 px; inputs ≥ 16 px (prevents iOS zoom).
- Gutters 20 px; code and tables use full-bleed scrolling containers (negative margin to the screen edge) while text keeps gutters.
- Equations keep natural size and scroll; display equations get 12 px vertical padding for touch scroll comfort.
- Select-a-question lists use the number strip and bottom sheet (9.7); never a tiny dropdown.


---

## 14. Implementation recipes

Compact, copy-ready patterns. They use tokens from section 3 and respect sections 10–13. Add only what the app actually needs; do not paste everything blindly. Content is delivered by the build pipeline (Master Plan), so these recipes only define presentation and behaviour.

### 14.1 Document head and skeleton order

```html
<!doctype html>
<html lang="en" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#F5F5F7">
  <title>DA2451 Study App</title>
  <script>/* theme boot script from 3.3 */</script>
  <style>/* 1 tokens + base + shell + components (critical)  2 content styles  3 KaTeX CSS with woff2 data URIs LAST */</style>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">…sprite from 5.2…</svg>
  <div class="app">
    <aside class="sidebar" aria-label="Primary">…</aside>
    <div class="main-col">
      <header class="topbar">…<div class="read-progress" aria-hidden="true"></div></header>
      <main id="main" tabindex="-1">…</main>
    </div>
  </div>
  <nav class="tabbar" aria-label="Primary">…</nav>
  <div id="toasts" role="status" aria-live="polite"></div>
  <div id="live" class="sr-only" role="status" aria-live="polite"></div>
  <!-- data and scripts at the end; content JSON inert until needed -->
</body>
</html>
```

### 14.2 Base, layout and shell

```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-padding-top: calc(var(--topbar-h) + var(--s-4)); }
body { margin: 0; }
img, svg { display: block; max-width: 100%; }
button { font: inherit; color: inherit; }
.sr-only { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden;
           clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.skip { position: absolute; inset: 8px auto auto 8px; padding: var(--s-2) var(--s-4); background: var(--surface);
        border-radius: var(--r-sm); transform: translateY(-200%); z-index: var(--z-toast); }
.skip:focus { transform: none; }
.ic { flex: none; stroke: currentColor; }

.app { display: grid; grid-template-columns: var(--sidebar-w) minmax(0, 1fr); min-height: 100dvh;
       transition: grid-template-columns var(--t-base) var(--ease-in-out); }
.app.is-collapsed { --sidebar-w: var(--rail-w); }
.sidebar { position: sticky; top: 0; height: 100dvh; overflow-y: auto; padding: var(--s-4) var(--s-3);
           background: var(--bg); border-inline-end: 1px solid var(--rule); }
.main-col { min-width: 0; }
main { max-width: var(--page-max); margin-inline: auto; padding: var(--s-7) var(--s-6) var(--s-10); outline: none; }
.topbar { position: sticky; top: 0; z-index: var(--z-nav); display: flex; align-items: center; gap: var(--s-3);
          height: calc(var(--topbar-h) + var(--safe-t)); padding: var(--safe-t) var(--s-4) 0;
          background: var(--bg); border-bottom: 1px solid transparent; }
.topbar.is-scrolled { border-bottom-color: var(--rule); box-shadow: var(--shadow-1); }
.read-progress { position: absolute; inset: auto 0 -1px 0; height: 2px; background: var(--accent);
                 transform: scaleX(0); transform-origin: 0 50%; }

.nav-item { display: flex; align-items: center; gap: var(--s-3); min-height: 40px; padding: 0 var(--s-3);
            border-radius: var(--r-sm); color: var(--ink-2); text-decoration: none; position: relative; }
@media (hover: hover) { .nav-item:hover { background: var(--sunken); color: var(--ink); } }
.nav-item[aria-current="page"] { background: var(--accent-soft); color: var(--accent); font-weight: 560; }
.nav-item[aria-current="page"]::before { content: ""; position: absolute; inset: 8px auto 8px 0; width: 3px;
                                         border-radius: 0 3px 3px 0; background: var(--accent); }

.tabbar { position: fixed; inset: auto 0 0 0; z-index: var(--z-nav); display: none;
          height: calc(var(--tabbar-h) + var(--safe-b)); padding-bottom: var(--safe-b);
          background: var(--bg); border-top: 1px solid var(--rule);
          transition: transform var(--t-base) var(--ease-in-out); }
.tabbar.is-hidden { transform: translateY(100%); }
.tab { flex: 1; display: grid; place-items: center; align-content: center; gap: 2px; min-height: 48px;
       color: var(--ink-3); font-size: var(--fs-xs); text-decoration: none; }
.tab[aria-current="page"] { color: var(--accent); font-weight: 560; }

@media (max-width: 1199px) { .app { --sidebar-w: var(--rail-w); } .nav-label, .sidebar-foot { display: none; } }
@media (max-width: 719px) {
  .app { grid-template-columns: minmax(0, 1fr); }
  .sidebar { display: none; }
  .tabbar { display: flex; }
  main { padding: var(--s-6) 20px calc(var(--tabbar-h) + var(--safe-b) + var(--s-8)); }
}
```

### 14.3 Buttons, chips, segmented control, meters

```css
.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--s-2); min-height: 40px;
       padding: 0 var(--s-4); border: 1px solid var(--rule-strong); border-radius: var(--r-sm);
       background: var(--surface); color: var(--ink); font: 500 var(--fs-base)/1 var(--font-ui); cursor: pointer;
       -webkit-tap-highlight-color: transparent; user-select: none;
       transition: background-color var(--t-fast), border-color var(--t-fast), color var(--t-fast),
                   transform var(--t-press) var(--ease-out); }
@media (hover: hover) { .btn:hover { background: var(--sunken); } }
.btn:active { transform: scale(.98); }
.btn[disabled], .btn[aria-disabled="true"] { opacity: .45; cursor: not-allowed; transform: none; }
@media (pointer: coarse) { .btn { min-height: 44px; } }

.btn-primary { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
@media (hover: hover) { .btn-primary:hover { background: color-mix(in srgb, var(--accent) 88%, #000); } }
.btn-ghost { background: transparent; border-color: transparent; min-width: 36px; padding: 0 var(--s-2); }
@media (pointer: coarse) { .btn-ghost { min-width: 44px; } }

/* Copy AI Prompt: reserved violet (9.2) */
.btn-prompt { background: var(--prompt-soft); border-color: var(--prompt-line); color: var(--prompt);
              min-width: 11.5rem; font-weight: 560; }
@media (hover: hover) { .btn-prompt:hover { background: color-mix(in srgb, var(--prompt) 16%, var(--surface)); } }
.btn-prompt--outline { background: transparent; }
.btn-prompt .ic-b { display: none; }
.btn-prompt.is-copied, .btn.is-copied { background: var(--ok-soft); border-color: transparent; color: var(--ok); }
.is-copied .ic-a { display: none; } .is-copied .ic-b { display: inline; }

.chip { display: inline-flex; align-items: center; gap: var(--s-1); height: 22px; padding: 0 var(--s-2);
        border: 1px solid var(--rule-strong); border-radius: var(--r-xs); color: var(--ink-2);
        font: 560 var(--fs-xs)/1 var(--font-ui); white-space: nowrap; }
.chip--dashed { border-style: dashed; }            /* Supplementary, In-class */
.chip--pill   { border-radius: var(--r-pill); }    /* Quiz */
.chip--predicted { color: var(--predicted); background: var(--predicted-soft);
                   border: 1px dashed var(--predicted-line); }
.marks { padding: 2px 8px; border-radius: var(--r-pill); background: var(--sunken); color: var(--ink-2);
         font: 500 var(--fs-xs)/1.4 var(--font-ui); font-variant-numeric: tabular-nums; white-space: nowrap; }

.seg { display: inline-flex; padding: 2px; background: var(--sunken); border-radius: var(--r-pill); }
.seg button { min-height: 32px; padding: 0 var(--s-4); border: 0; border-radius: var(--r-pill);
              background: transparent; color: var(--ink-2); font: 500 var(--fs-sm)/1 var(--font-ui); cursor: pointer; }
.seg button[aria-checked="true"] { background: var(--surface); color: var(--ink); font-weight: 650; box-shadow: var(--shadow-1); }

.meter { height: 4px; border-radius: var(--r-pill); background: var(--sunken); overflow: hidden; }
.meter > i { display: block; height: 100%; background: var(--accent); transform-origin: 0 50%; transform: scaleX(var(--p, 0)); }
```

### 14.4 Lists, question card, answer panel, MCQ options

```css
.group { background: var(--surface); border: 1px solid var(--rule); border-radius: var(--r-md); overflow: hidden; }
.row { position: relative; display: flex; align-items: center; gap: var(--s-4); min-height: 64px;
       padding: var(--s-3) var(--s-4); color: inherit; text-decoration: none; }
.row + .row::before { content: ""; position: absolute; inset: 0 0 auto var(--s-4); height: 1px; background: var(--rule); }
@media (hover: hover) { .row:hover { background: var(--sunken); } }
.row[aria-current="page"] { background: var(--accent-soft); }

.qcard { container-type: inline-size; content-visibility: auto; contain-intrinsic-size: auto 420px;
         background: var(--surface); border: 1px solid var(--rule); border-radius: var(--r-md); padding: var(--s-6); }
.qcard + .qcard { margin-top: var(--s-4); }
.qhead { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; gap: var(--s-4); align-items: start; }
.qnum { width: 36px; height: 36px; display: grid; place-items: center; border-radius: var(--r-sm);
        background: var(--sunken); font: 650 var(--fs-base)/1 var(--font-ui); font-variant-numeric: tabular-nums; }
.qmeta { display: flex; flex-wrap: wrap; gap: var(--s-2); margin-top: var(--s-2); }
.q-body { margin-top: var(--s-4); font-size: var(--fs-md); line-height: 1.6; max-width: var(--measure); }
.part { display: grid; grid-template-columns: 2rem minmax(0, 1fr) auto; gap: var(--s-3); margin-top: var(--s-4); }
.part .lbl { color: var(--ink-2); font-variant-numeric: tabular-nums; }
.part .part { margin-inline-start: 2rem; grid-template-columns: 2.25rem minmax(0, 1fr) auto; }
.q-original, .q-context { margin-top: var(--s-4); padding: var(--s-4) var(--s-5); background: var(--surface-2);
                          border-radius: var(--r-sm); border-inline-start: 3px solid var(--accent-line); }
.q-context { border-inline-start-color: var(--rule-strong); }

.qactions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--s-2);
            margin-top: var(--s-5); padding-top: var(--s-4); border-top: 1px solid var(--rule); }
.qactions .spacer { flex: 1; }
@container (max-width: 520px) {
  .qactions .btn-reveal { flex: 1 0 100%; }
  .qactions .spacer { display: none; }
  .qactions .btn-prompt { flex: 1; }
}
.qhint { margin: var(--s-2) 0 0; color: var(--ink-3); font-size: var(--fs-sm); }

.answer { margin-top: var(--s-4); padding: var(--s-5) var(--s-6); background: var(--sunken);
          border: 1px solid var(--rule); border-inline-start: 3px solid var(--accent-line); border-radius: var(--r-md); }
.answer > h3 { margin: 0 0 var(--s-3); font-size: var(--fs-md); }

/* MCQ options: neutral "My pick", no correctness colours */
.opts { display: grid; gap: var(--s-2); margin-top: var(--s-4); }
.opt { position: relative; display: flex; gap: var(--s-3); align-items: flex-start; min-height: 48px;
       padding: var(--s-3) var(--s-4); background: var(--surface); border: 1.5px solid var(--rule);
       border-radius: var(--r-sm); cursor: pointer; transition: background-color var(--t-fast), border-color var(--t-fast); }
.opt input { position: absolute; opacity: 0; pointer-events: none; }
.opt .badge { flex: none; width: 28px; height: 28px; display: grid; place-items: center; border-radius: 50%;
              border: 1.5px solid var(--rule-strong); font: 600 var(--fs-sm)/1 var(--font-ui); }
.opt .txt { flex: 1; min-width: 0; overflow-wrap: anywhere; }
.opt .txt .katex-display, .opt .txt .katex { max-width: 100%; }
.opt .pick { display: none; align-self: center; color: var(--accent); font: 600 var(--fs-xs)/1 var(--font-ui); }
@media (hover: hover) { .opt:hover { background: var(--sunken); } }
.opt.is-picked { background: var(--accent-soft); border-color: var(--accent-line); }
.opt.is-picked .badge { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); }
.opt.is-picked .pick { display: inline; }
.opt:focus-within { outline: 2px solid var(--focus); outline-offset: 2px; }   /* radio is focusable, label shows ring */

.notice-predicted { padding: var(--s-4) var(--s-5); background: var(--predicted-soft); color: var(--ink);
                    border: 1px dashed var(--predicted-line); border-radius: var(--r-md); }
.callout { padding: var(--s-4) var(--s-5); background: var(--surface-2); border-inline-start: 3px solid var(--rule-strong);
           border-radius: var(--r-sm); color: var(--ink-2); }
.src-tag { display: inline-block; margin-inline-start: .5em; padding: 1px 6px; border: 1px solid var(--rule);
           border-radius: var(--r-xs); color: var(--ink-3); font: 500 var(--fs-xs)/1.4 var(--font-ui); vertical-align: middle; white-space: nowrap; }
.src-tag--correction { background: var(--warn-soft); color: var(--warn); border-color: transparent; }
```

```js
// MCQ pick (neutral); radios keep native semantics, class drives the look
document.addEventListener('change', e => {
  const r = e.target.closest('.opt input[type=radio]'); if (!r) return;
  r.closest('.opts').querySelectorAll('.opt').forEach(o => o.classList.toggle('is-picked', o.contains(r) && r.checked));
});
```

### 14.5 One-click offline copy with feedback and fallback

```html
<button class="btn btn-prompt" data-action="copy-prompt" data-qid="C-MCQ-017" aria-label="Copy AI Prompt for C-MCQ-017">
  <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-prompt"/></svg>
  <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
  <span class="btn-label">Copy AI Prompt</span>
</button>
```

```js
async function copyText(text) {
  try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (e) {}
  try {                                                     // works on file:// in most browsers
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy'); ta.remove(); if (ok) return true;
  } catch (e) {}
  return false;
}
function announce(msg) { const l = document.getElementById('live'); l.textContent = ''; requestAnimationFrame(() => l.textContent = msg); }

async function copyWithFeedback(btn, text, spoken) {
  const ok = await copyText(text);
  if (!ok) return openManualCopy(text);                     // popover with a pre-selected readonly textarea
  const label = btn.querySelector('.btn-label');
  const prev = btn.dataset.label || (btn.dataset.label = label.textContent);
  btn.classList.add('is-copied'); label.textContent = 'Copied';
  announce(spoken || 'Copied');
  clearTimeout(btn._t);
  btn._t = setTimeout(() => { btn.classList.remove('is-copied'); label.textContent = prev; }, 1800);
}
// delegated: document.addEventListener('click', e => { const b = e.target.closest('[data-action="copy-prompt"]');
//   if (b) copyWithFeedback(b, buildPrompt(b.dataset.qid), 'Prompt copied. Paste it into your AI assistant.'); });
```
`buildPrompt(id)` assembles the text at click time from stored raw question data (content rules are in the guides). Reserve button width (`min-width`) so "Copied" never shifts the layout.

### 14.6 Accessible reveal / hide

```js
function setReveal(btn, panel, open) {
  panel.hidden = open ? false : 'until-found';              // findable when hidden where supported
  btn.setAttribute('aria-expanded', String(open));
  btn.querySelector('.btn-label').textContent = btn.dataset[open ? 'hide' : 'show'];   // data-show="Show answer" data-hide="Hide answer"
}
function toggleReveal(btn) {
  const panel = document.getElementById(btn.getAttribute('aria-controls')); if (!panel) return;
  const open = btn.getAttribute('aria-expanded') !== 'true';
  if (open && !panel.dataset.ready) { panel.innerHTML = renderAnswer(panel.dataset.qid); panel.dataset.ready = '1'; } // lazy inject
  setReveal(btn, panel, open);
  if (open) {
    panel.classList.add('is-entering');
    panel.addEventListener('animationend', () => panel.classList.remove('is-entering'), { once: true });
    if (panel.getBoundingClientRect().top > innerHeight - 96) panel.scrollIntoView({ block: 'nearest' });
  }
}
document.addEventListener('beforematch', e => {              // browser find opened a hidden answer
  const p = e.target, b = document.querySelector('[aria-controls="' + p.id + '"]'); if (b) setReveal(b, p, true);
}, true);
```
```html
<button class="btn btn-reveal" data-action="reveal" aria-expanded="false" aria-controls="ans-b21-final-2024-01--q3"
        data-show="Show answer" data-hide="Hide answer"><span class="btn-label">Show answer</span>
  <svg class="ic chev" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg></button>
<div class="answer" id="ans-b21-final-2024-01--q3" hidden="until-found" data-qid="b21-final-2024-01--q3"></div>
```

### 14.7 Toast

```css
#toasts { position: fixed; z-index: var(--z-toast); inset: auto 0 calc(var(--s-6) + var(--safe-b)) 0;
          display: grid; justify-items: center; gap: var(--s-2); pointer-events: none; }
@media (max-width: 719px) { #toasts { bottom: calc(var(--tabbar-h) + var(--s-4) + var(--safe-b)); } }
.toast { pointer-events: auto; max-width: min(360px, calc(100vw - 32px)); padding: var(--s-3) var(--s-4);
         border-radius: var(--r-pill); background: var(--ink); color: var(--bg); font-size: var(--fs-base);
         box-shadow: var(--shadow-pop); animation: rise-in var(--t-base) var(--ease-out) both; }
.toast.is-leaving { opacity: 0; transition: opacity 140ms; }
```
```js
function toast(msg, ms = 2400) {
  const host = document.getElementById('toasts');
  while (host.children.length >= 2) host.firstChild.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; host.appendChild(t);
  setTimeout(() => { t.classList.add('is-leaving'); setTimeout(() => t.remove(), 160); }, ms);
}
```

### 14.8 Theme switch (crossfade where supported)

```js
function applyTheme(pref) {                                  // 'light' | 'dark' | 'system'
  const root = document.documentElement;
  const dark = pref === 'dark' || (pref === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  const set = () => {
    root.setAttribute('data-theme', dark ? 'dark' : 'light'); root.setAttribute('data-theme-pref', pref);
    document.querySelector('meta[name=theme-color]').content = dark ? '#0E0F12' : '#F5F5F7';
  };
  try { localStorage.setItem('da2451:theme', pref); } catch (e) {}
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches || root.dataset.motion === 'reduce';
  if (document.startViewTransition && !calm) document.startViewTransition(set); else set();
}
```
```css
::view-transition-old(root), ::view-transition-new(root) { animation-duration: 200ms; animation-timing-function: var(--ease-in-out); }
```

### 14.9 Countdown (absolute timestamps, calm, accurate)

```html
<section class="countdown-panel" aria-labelledby="cd-title" data-state="before">
  <h2 id="cd-title" class="cd-title">DA2451 Final Examination</h2>
  <div class="cd-units" aria-hidden="true">
    <div class="cd-unit"><span class="cd-num" data-u="d">00</span><span class="cd-lbl">days</span></div>
    <div class="cd-unit"><span class="cd-num" data-u="h">00</span><span class="cd-lbl">hours</span></div>
    <div class="cd-unit"><span class="cd-num" data-u="m">00</span><span class="cd-lbl">minutes</span></div>
    <div class="cd-unit"><span class="cd-num" data-u="s">00</span><span class="cd-lbl">seconds</span></div>
  </div>
  <div class="cd-live"><p class="cd-big">Exam in progress</p><p class="cd-sub">Time remaining <span data-u="left">00:00:00</span></p></div>
  <div class="cd-done"><p class="cd-big">Exam completed</p></div>
  <p class="cd-sentence sr-only" id="cd-sr" role="timer" aria-live="off"></p>
  <p class="cd-date">18 November 2026 · 9:00 AM–12:00 PM · Sri Lanka time</p>
  <p class="cd-local" hidden></p>
</section>
```
```css
.countdown-panel { position: relative; overflow: hidden; padding: var(--s-7); background: var(--surface);
                   border: 1px solid var(--rule); border-radius: var(--r-lg); min-height: 240px; }
.cd-title { margin: 0 0 var(--s-5); font: 560 var(--fs-md)/1.3 var(--font-ui); }
.cd-units { display: flex; gap: 0; font-variant-numeric: tabular-nums lining-nums; }
.cd-unit { display: grid; gap: var(--s-1); padding-inline: var(--s-5); border-inline-start: 1px solid var(--rule); }
.cd-unit:first-child { padding-inline-start: 0; border: 0; }
.cd-num { font: 600 var(--fs-count)/1 var(--font-display); letter-spacing: -.02em; }
.cd-lbl { color: var(--ink-3); font-size: var(--fs-sm); }
.cd-date { margin: var(--s-5) 0 0; color: var(--ink-2); } .cd-local { margin: var(--s-1) 0 0; color: var(--ink-3); font-size: var(--fs-sm); }
.cd-live, .cd-done { display: none; } .cd-big { margin: 0; font: 650 var(--fs-2xl)/1.1 var(--font-display); }
.cd-sub { margin: var(--s-2) 0 0; color: var(--ink-2); font-variant-numeric: tabular-nums; }
[data-state="live"] .cd-units, [data-state="after"] .cd-units { display: none; }
[data-state="live"] .cd-live, [data-state="after"] .cd-done { display: block; }
[data-state="after"] .cd-big { color: var(--ink-2); }
@media (max-width: 599px) { .countdown-panel { padding: var(--s-5); } .cd-unit { padding-inline: var(--s-3); } }
```
```js
(function () {
  const START = Date.parse('2026-11-18T09:00:00+05:30'), END = Date.parse('2026-11-18T12:00:00+05:30');
  const panel = document.querySelector('.countdown-panel'); if (!panel) return;
  const el = {}; ['d','h','m','s','left'].forEach(k => el[k] = panel.querySelector('[data-u="' + k + '"]'));
  const sr = panel.querySelector('#cd-sr'), cache = {}; let lastMin = -1, timer = 0;
  const pad = n => String(n).padStart(2, '0');
  const put = (k, v) => { if (cache[k] !== v) { cache[k] = v; el[k].textContent = v; } };   // write only on change
  const split = ms => { const t = Math.max(0, Math.floor(ms / 1000));
    return { d: Math.floor(t / 86400), h: Math.floor(t % 86400 / 3600), m: Math.floor(t % 3600 / 60), s: t % 60 }; };
  function render() {
    const now = Date.now(), state = now < START ? 'before' : now < END ? 'live' : 'after';
    if (panel.dataset.state !== state) panel.dataset.state = state;
    if (state === 'before') {
      const p = split(START - now); put('d', pad(p.d)); put('h', pad(p.h)); put('m', pad(p.m)); put('s', pad(p.s));
      if (p.m !== lastMin) { lastMin = p.m; sr.textContent = p.d + ' days, ' + p.h + ' hours and ' + p.m + ' minutes until the exam starts.'; }
    } else if (state === 'live') { const p = split(END - now); put('left', pad(p.h) + ':' + pad(p.m) + ':' + pad(p.s)); }
    return state;
  }
  function tick() { if (document.hidden) return; if (render() === 'after') return;
    timer = setTimeout(tick, 1000 - (Date.now() % 1000) + 10); }   // aligned to the second, no drift
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { clearTimeout(timer); tick(); } });
  if (new Date(START).getTimezoneOffset() !== -330) {              // viewer is not on Sri Lanka time
    const f = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
    const t = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
    const loc = panel.querySelector('.cd-local'); loc.textContent = 'Your local time: ' + f.format(START) + '–' + t.format(END); loc.hidden = false;
  }
  tick();
})();
```

### 14.10 Scroll-linked chrome (one passive, rAF-throttled handler)

```js
(function () {
  const top = document.querySelector('.topbar'), bar = document.querySelector('.read-progress'),
        tab = document.querySelector('.tabbar'); let y0 = scrollY, busy = false;
  addEventListener('scroll', () => {
    if (busy) return; busy = true;
    requestAnimationFrame(() => {
      const el = document.documentElement, y = el.scrollTop;
      top.classList.toggle('is-scrolled', y > 8);
      if (bar) { const max = el.scrollHeight - el.clientHeight;      // for chapters, measure the article's rect instead
        bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')'; }
      if (tab && Math.abs(y - y0) > 8) { tab.classList.toggle('is-hidden', y > y0 && y > 120); y0 = y; }
      busy = false;
    });
  }, { passive: true });
})();
```
For chapters with lazily hydrated sections, compute progress from the article's `getBoundingClientRect()` and pre-sized placeholders so the bar does not jump when sections render.

### 14.11 Cheap loading skeleton and axis loader

```html
<div class="skeleton-doc" aria-busy="true" aria-label="Loading chapter">
  <div class="skeleton" style="height:36px;width:60%"></div>
  <div class="skeleton" style="height:14px;margin-top:20px"></div><div class="skeleton" style="height:14px;margin-top:10px;width:92%"></div>
  <div class="skeleton" style="height:14px;margin-top:10px;width:84%"></div>
</div>
<svg class="axis-loader" viewBox="0 0 28 28" aria-hidden="true"><path d="M14 3v22 M3 14h22" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" fill="none"/></svg>
```

---

## 15. Design consistency and quality control

### 15.1 Contrast script (run in the console, both themes)

```js
(function () {
  const lum = h => { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
    .map(v => v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4)); return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]; };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
  const P = [['--ink','--bg',7],['--ink','--surface',7],['--ink-2','--surface',4.5],['--ink-3','--surface',4.5],['--ink-3','--sunken',4.5],
    ['--accent','--surface',4.5],['--accent','--bg',4.5],['--accent-ink','--accent',4.5],['--prompt','--surface',4.5],
    ['--predicted','--predicted-soft',4.5],['--ok','--surface',4.5],['--err','--surface',4.5],['--warn','--surface',4.5],
    ['--code-ink','--code-bg',7],['--syn-kw','--code-bg',4.5],['--syn-fn','--code-bg',4.5],['--syn-str','--code-bg',4.5],
    ['--syn-num','--code-bg',4.5],['--syn-cm','--code-bg',4.5]];
  const root = document.documentElement, was = root.getAttribute('data-theme');
  ['light', 'dark'].forEach(t => { root.setAttribute('data-theme', t); const cs = getComputedStyle(root);
    P.forEach(([f, b, min]) => { const r = ratio(cs.getPropertyValue(f).trim(), cs.getPropertyValue(b).trim());
      console[r >= min ? 'log' : 'warn'](t, f, 'on', b, r.toFixed(2), r >= min ? 'ok' : 'FAIL, needs ' + min); }); });
  root.setAttribute('data-theme', was);
})();
```
Hex-only tokens are checked; check translucent tokens (`--rule`, `--accent-soft`, `--prompt-soft`) by eye and with a screenshot sampler, and verify focus rings against both element and background. **Token values in this file are design estimates; the script is authoritative.** If a pair fails, adjust the token (lightness only, keep hue) and note it.

### 15.2 Visual QA checklist

**Theme and colour**
- [ ] Light and dark were each reviewed with a real long chapter page, a worksheet, a past paper, an MCQ and an essay; neither looks like an inversion of the other.
- [ ] No pure white page, no pure black page; no pure-white body text in dark.
- [ ] Accent used only for links, focus, current location, selection and primary actions; violet only on prompt actions; amber only on predicted material.
- [ ] No green/red on any question option or answer; no check/cross on MCQ options.
- [ ] Every contrast pair passes 15.1; focus rings visible on every surface in both themes.

**Typography and math**
- [ ] One UI family, one mono, optional serif; only weights 400/500-560/650 used; tabular numerals in counts, marks, countdown, tables.
- [ ] Reading measure 62–72 characters at Standard width; headings have more space above than below; no orphaned headings.
- [ ] Inline math matches surrounding x-height; display math has breathing room; `\boxed` answers are clear; thin strokes visible in dark.
- [ ] Long equations scroll inside their block with a visible cue; no page-level horizontal scroll at 320 px.
- [ ] Copy TeX and Copy code work and are reachable by keyboard and on touch.

**Layout and spacing**
- [ ] All gaps come from the spacing scale; edges and baselines align across cards, rails and toolbars.
- [ ] Reading column centred and clamped; sidebar, TOC and PDF split do not change the text width unexpectedly.
- [ ] Question cards share one anatomy across Past Papers, Practice, Predicted MCQs and Essays.
- [ ] Action rows are in the same order everywhere: reveal left; prompt, copy question, new tab right.

**Navigation and components**
- [ ] Sidebar, rail, tab bar and breadcrumbs always show the current location with text/shape cues.
- [ ] Every component has default, hover (pointer), focus-visible, active, selected, disabled and busy states defined.
- [ ] Empty, loading, error, clipboard-blocked, storage-unavailable and PDF-unavailable states are designed.
- [ ] Search opens with Ctrl/⌘+K and `/`, supports keyboard navigation and announces counts.

**Questions and honesty**
- [ ] Copy AI Prompt is the same label, place and look on every question; the Explain this solution action appears only on revealed answers.
- [ ] Question-only prompts contain no stored answer; prediction cards contain no answer, no reveal, no grade, no score.
- [ ] Predicted material is unmistakable (amber, dashed, chip, notice) and past papers/worksheets are never styled that way.
- [ ] Counts shown anywhere are computed from displayed data; no hard-coded totals.
- [ ] Course codes and dates are shown as printed; no invented dates.

**Responsive and mobile**
- [ ] 320, 390, 768, 1024, 1280, 1440 and 1680 px checked in both themes.
- [ ] Touch targets ≥ 44 px on coarse pointers; tab bar never covers content; safe areas respected.
- [ ] MCQ options with inline matrices wrap or scroll inside the option without widening the page.
- [ ] Question selection works with the number strip and bottom sheet.

**Motion and performance**
- [ ] Only the catalogued animations exist; each uses transform/opacity; reduced motion replaces them as specified.
- [ ] No backdrop blur, filters, blend modes, animated shadows, shimmer or parallax anywhere.
- [ ] First paint shows the real shell; dashboard usable without decoding PDFs, rendering chapters or loading search.
- [ ] Scrolling a long chapter stays smooth; chapters hydrate by chunk without visible jumps.
- [ ] Countdown updates once per second without drift, pauses when hidden, and is correct from any time zone.

**Accessibility and offline**
- [ ] Complete keyboard pass (skip link, sidebar, search, reveal, copy, MCQ pick, dialogs, PDF viewer).
- [ ] Screen-reader pass on: reveal button state, copy announcements, filter counts, equation regions, countdown sentence.
- [ ] 200% zoom and large text pass; forced-colours and high-contrast pass.
- [ ] Network disabled: no layout shift, no missing fonts or icons, no failed requests; copy works; storage failure handled.

**Polish**
- [ ] You can point to three small deliberate details (for example optical alignment of the ellipse monogram, tabular numerals in marks, hanging part labels).
- [ ] Squint test: hierarchy is clear when blurred. Swap test: the design is specific to multivariate statistics.

### 15.3 Anti-patterns and common mistakes

| Anti-pattern | Why it fails here | Do instead |
|---|---|---|
| Grid of identical rounded cards with icon, title and one-liner | Generic; hides real counts and structure | Grouped list with real counts (7.5) |
| Gradient/glow hero, mesh backgrounds | Says nothing, costs paint | Quiet panel + true geometry (5.4) |
| Backdrop blur / glassmorphism | Expensive, unreadable behind text | Opaque surfaces and hairlines |
| Green/red option highlighting or "Correct!" | Violates the no-grading rule | Neutral "My pick" (9.5) |
| One generic "Copy" button | Users cannot find the AI prompt feature | Four distinct copy actions (9.2) |
| Staggered fade-up reveals on every section | Generic, slows access | One signature moment; instant content |
| Animating answer height on long solutions | Layout cost, janky | Opacity-only reveal with `until-found` |
| Flip or slide animation on countdown digits | Distracting, costly | Instant text swap |
| Hiding actions behind hover | Touch users cannot find them | Visible on focus and touch |
| Colour-only status (completed, predicted, supplementary) | Fails accessibility | Text, shape or icon plus colour |
| Shrinking equations to fit | Unreadable maths | Scroll inside the block |
| Wrapping code or tables silently | Breaks alignment and meaning | Horizontal scroll containers |
| All-caps tracked labels and `01 / 02` numbering everywhere | Template chrome | Sentence-case labels; numbers only for real sequences |
| Emoji as icons or decoration | Inconsistent, unprofessional | Sprite icons (only the creator's verbatim note keeps its one emoji) |
| Percent-correct, streaks, leaderboards, confetti | Implies grading and pressure | Counts of "marked complete" |
| Re-theming through a tree-wide colour transition | Jank with thousands of nodes | Attribute swap + view transition |
| Embedding web fonts "for polish" | Bundle size, delay | System fonts; KaTeX only |
| Auto-opening tabs, auto-advancing questions | Surprising | Explicit user actions only |

### 15.4 Resolving trade-offs

Resolve conflicts in this order. State the decision briefly in the build notes when you invoke a rule.

1. **Master Plan** (functionality, scope, offline, integrity) beats everything.
2. **Academic readability** beats aesthetics. If a decorative choice reduces legibility of text, maths, code or tables, remove it.
3. **Speed** beats polish. If an effect measurably costs first paint, scroll smoothness or interaction latency, delete it or make it instant.
4. **Accessibility** beats visual consistency. A larger target, stronger contrast or clearer label wins over a prettier one.
5. **Consistency** beats novelty. Reuse an existing component before inventing a new one.
6. **Beauty** is what remains: align, space, restrain, then stop. When two options are equal, choose the quieter one.

Specific calls:
- *Aesthetics vs readability:* readability. Example: widen the measure or enlarge text rather than keeping a tighter layout.
- *Animation vs speed:* drop the animation. The app must feel immediate.
- *Dense vs spacious:* choose spacious for reading surfaces, compact rows for selection screens.
- *Accent colour vs contrast:* adjust the lightness of the accent token, not the contrast requirement.
- *Design file vs Master Plan:* follow the Master Plan and note the deviation.
- *Gaps in this file:* extend the nearest existing pattern (same tokens, same states) rather than inventing a new one.

### 15.5 Decisions worth confirming with the creator (do not block the build)

- The exact AI-tool names in the credits (the supplied text spells one tool as "Agron"); render exactly as supplied unless corrected.
- Whether the dashboard should show the optional "Your local time" line; the default here is yes, only when the viewer is outside Sri Lanka time.
- Whether the system font stack is acceptable on all target devices, or an embedded text font is wanted after measuring bundle size.

*End of design skill.*
