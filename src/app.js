/* ==========================================================================
   DA2451 Multivariate Methods in Business — Application Core (Task 1)
   Offline-first, zero runtime dependencies, file:// compatible
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Guarded Storage Wrapper ---------- */
  const memStore = {};
  let storageAvailable = true;
  try {
    const testKey = 'da2451:__test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
  } catch (e) {
    storageAvailable = false;
  }

  const Store = {
    isAvailable: () => storageAvailable,
    get(key, fallback = null) {
      try {
        const raw = storageAvailable ? window.localStorage.getItem(key) : memStore[key];
        return raw ? JSON.parse(raw) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set(key, val) {
      const serialized = JSON.stringify(val);
      memStore[key] = serialized;
      if (storageAvailable) {
        try { window.localStorage.setItem(key, serialized); } catch (e) {}
      }
    },
    getRaw(key) {
      try {
        return storageAvailable ? window.localStorage.getItem(key) : (memStore[key] || null);
      } catch (e) {
        return null;
      }
    },
    setRaw(key, val) {
      memStore[key] = String(val);
      if (storageAvailable) {
        try { window.localStorage.setItem(key, String(val)); } catch (e) {}
      }
    }
  };

  /* ---------- 2. Default User Study State ---------- */
  const defaultState = {
    completed: {},       // id -> true
    bookmarks: {},       // id -> { id, title, section, route, ts }
    recent: [],          // [{ id, title, section, route, ts }]
    lastReading: null,   // { id, title, section, route, progress }
    readFontSize: 16,    // 12 to 22 in 1px increments (§Checkpoint 5C.1B)
    readScale: 1,        // backwards-compatible: readFontSize / 16
    measure: '44rem',    // '38rem' | '44rem' | '56rem'
    fontRead: 'sans',    // 'sans' | 'serif'
    motion: 'system',    // 'system' | 'reduce'
    sidebarCollapsed: false,
    dismissedPredNotice: false,
    dismissedStorageBanner: false,
    mcqPicks: {},             // qid -> 'A'|'B'|'C'|'D'
    includePickInPrompt: {},  // qid -> boolean
    predNotes: {},            // qid -> string
    chapterPositions: {}      // chId -> { headingId, headingTitle, ts }
  };

  let state = Object.assign({}, defaultState, Store.get('da2451:state', {}));
  function saveState() {
    Store.set('da2451:state', state);
  }

  /* ---------- 3. Authoritative Content Manifests ---------- */
  const DATA = window.DA2451_DATA || {
    chapters: [
      { pos: '01', id: 'ch01', file: 'DA2451_Lec01_Introduction_Teaching.md', pdf: 'Lec1.pdf', title: 'Introduction to Multivariate Analysis', kind: 'core' },
      { pos: '02', id: 'ch02', file: 'DA2451_Lec02_Matrix_Algebra_Teaching.md', pdf: 'Lec2.pdf', title: 'Review of Matrix Algebra', kind: 'core' },
      { pos: '03', id: 'ch03', file: 'DA2451_Lec03_PCA_Teaching.md', pdf: 'Lec3.pdf', title: 'Principal Component Analysis', kind: 'core' },
      { pos: '04', id: 'ch04', file: 'DA2451_PCA_R_Methods_Teaching.md', pdf: 'PCA-R-2013.pdf', title: 'PCA in R: Supplementary Methods', kind: 'supplementary' },
      { pos: '05', id: 'ch05', file: 'DA2451_Lec05_Factor_Analysis_Teaching.md', pdf: 'Lec5.pdf', title: 'Factor Analysis', kind: 'core' },
      { pos: '06', id: 'ch06', file: 'DA2451_Lec05_Extra_Factor_Analysis_Teaching.md', pdf: 'Lec5Extra.pdf', title: 'Factor Analysis: Additional Remarks', kind: 'supplementary' },
      { pos: '07', id: 'ch07', file: 'DA2451_Lec06_Multivariate_Normal_Teaching.md', pdf: 'Lec6.pdf', title: 'Multivariate Normal Distribution', kind: 'core' },
      { pos: '08', id: 'ch08', file: 'DA2451_Lec07_Mean_Vector_Inference_Teaching.md', pdf: 'Lec7.pdf', title: 'Inferences About a Mean Vector', kind: 'core' },
      { pos: '09', id: 'ch09', file: 'DA2451_Lec08_Multivariate_Mean_Comparisons_Teaching.md', pdf: 'Lec8.pdf', title: 'Comparisons of Several Multivariate Means', kind: 'core' },
      { pos: '10', id: 'ch10', file: 'DA2451_Lec09_MMLR_Teaching.md', pdf: 'Lec9.pdf', title: 'Multivariate Multiple Linear Regression', kind: 'core' },
      { pos: '11', id: 'ch11', file: 'DA2451_Multivariate_Linear_Models_R_Teaching.md', pdf: 'Multivariate-Linear-Models.pdf', title: 'Multivariate Linear Models in R: Supplementary Reference', kind: 'supplementary' }
    ],
    papers: [
      { id: 'b19-final-2022-07', batch: 19, type: 'Final', chipClass: '', course: 'DA3420', dateLabel: 'July 2022', duration: '3 Hours', totalMarks: 100, composition: '4 essay questions', answerFile: '19_batch_july_2022_answers.md', title: 'Final Examination (July 2022)' },
      { id: 'b20-final-2023-08', batch: 20, type: 'Final', chipClass: '', course: 'DA3420', dateLabel: 'August 2023', duration: '3 Hours', totalMarks: 100, composition: '10 MCQ + 4 essay', answerFile: '20_batch_august_2023_answers.md', title: 'Final Examination (August 2023)' },
      { id: 'b21-inclass-2023', batch: 21, type: 'In-class', chipClass: 'chip--dashed', course: 'DA2451', dateLabel: 'Semester 4, 2023', duration: '1 h 30 min', totalMarks: 50, composition: '3 questions', answerFile: '21_batch_2023_in_class_answers.md', title: 'In-Class Examination (Semester 4, 2023)' },
      { id: 'b21-final-2024-01', batch: 21, type: 'Final', chipClass: '', course: 'DA2451', dateLabel: 'January 2024', duration: '3 Hours', totalMarks: 100, composition: '5 questions', answerFile: '21_batch_january_2024_answers.md', title: 'Final Examination (January 2024)' },
      { id: 'b22-final-2024-12', batch: 22, type: 'Final', chipClass: '', course: 'DA2451', dateLabel: 'December 2024', duration: '3 Hours', totalMarks: 100, composition: '25 MCQ + 2 essay', answerFile: '22_batch_december_2024_answers.md', title: 'Final Examination (December 2024)' },
      { id: 'b23-quiz1-2025', batch: 23, type: 'Quiz', chipClass: 'chip--pill', course: 'DA2451', dateLabel: 'Semester 4, 2025', duration: '45 minutes', totalMarks: 45, composition: '3 questions', answerFile: '23_batch_2025_quiz_1_answers.md', title: 'In-Class Quiz 1 (Semester 4, 2025)' },
      { id: 'b23-quiz2-2025', batch: 23, type: 'Quiz', chipClass: 'chip--pill', course: 'DA2451', dateLabel: 'Semester 4, 2025', duration: '45 minutes', totalMarks: 45, composition: '3 questions', answerFile: '23_batch_2025_quiz_2_answers.md', title: 'In-Class Quiz 2 (Semester 4, 2025)' },
      { id: 'b23-quiz3-2025', batch: 23, type: 'Quiz', chipClass: 'chip--pill', course: 'DA2451', dateLabel: 'Semester 4, 2025', duration: '45 minutes', totalMarks: 40, composition: '2 questions', answerFile: '23_batch_2025_quiz_3_answers.md', title: 'In-Class Quiz 3 (Semester 4, 2025)' },
      { id: 'b23-final-2025-10', batch: 23, type: 'Final', chipClass: '', course: 'DA2451', dateLabel: 'October 2025', duration: '2 Hours & 30 Minutes', totalMarks: 100, composition: '30 MCQ + 3 essay', answerFile: '23_batch_october_2025_answers.md', title: 'Final Examination (October 2025)' }
    ],
    worksheets: [
      { pos: '01', id: 'pq01', file: 'DA2451_PQ01_Complete_Teaching.md', title: 'Practice Worksheet 1', topic: 'Introduction to Multivariate Analysis' },
      { pos: '02', id: 'pq02', file: 'DA2451_PQ02_Complete_Teaching.md', title: 'Practice Worksheet 2', topic: 'Sample Geometry and Random Sampling' },
      { pos: '03', id: 'pq03', file: 'DA2451_PQ03_Complete_Teaching.md', title: 'Practice Worksheet 3', topic: 'Multivariate Normal Distribution, Part I' },
      { pos: '04', id: 'pq04', file: 'DA2451_PQ04_Complete_Teaching.md', title: 'Practice Worksheet 4', topic: 'Multivariate Normal Distribution, Part II' },
      { pos: '05', id: 'pq05', file: 'DA2451_PQ05_Complete_Teaching.md', title: 'Practice Worksheet 5', topic: 'Inferences about a mean vector; comparisons of several multivariate means' }
    ],
    predictedMeta: {
      mcqSources: ['DA2451_ChatGPT_Predicted_MCQs.md', 'da2451_predicted_multiple_choice_questions.md'],
      essaySources: ['DA2451_ChatGPT_Predicted_Essays.md', 'da2451_predicted_essay_questions.md']
    },
    samples: window.DA2451_SAMPLES || {}
  };
  window.DA2451_DATA = DATA;

  /* ---------- 4. Theme & Reading Preferences ---------- */
  function applyTheme(pref) {
    const root = document.documentElement;
    const dark = pref === 'dark' || (pref === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const updateDom = () => {
      root.setAttribute('data-theme', dark ? 'dark' : 'light');
      root.setAttribute('data-theme-pref', pref);
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.content = dark ? '#0E0F12' : '#F5F5F7';
      updateThemeButtons(dark, pref);
    };
    Store.setRaw('da2451:theme', pref);
    const calm = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || root.dataset.motion === 'reduce';
    if (document.startViewTransition && !calm) {
      const vt = document.startViewTransition(updateDom);
      if (vt && vt.ready && typeof vt.ready.catch === 'function') vt.ready.catch(() => {});
      if (vt && vt.finished && typeof vt.finished.catch === 'function') vt.finished.catch(() => {});
    } else {
      updateDom();
    }
  }

  function updateThemeButtons(isDark, pref) {
    const toggleBtn = document.getElementById('btn-theme-toggle');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      toggleBtn.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
      const useEl = toggleBtn.querySelector('use');
      if (useEl) useEl.setAttribute('href', isDark ? '#i-sun' : '#i-moon');
    }
    document.querySelectorAll('[data-theme-opt]').forEach(btn => {
      btn.setAttribute('aria-checked', String(btn.dataset.themeOpt === pref));
    });
  }

  function applyReadingPrefs() {
    const root = document.documentElement;
    let fs = parseInt(state.readFontSize, 10);
    if (isNaN(fs) || fs < 12 || fs > 22) {
      if (state.readScale && typeof state.readScale === 'number') {
        fs = Math.round(state.readScale * 16);
      } else {
        fs = 16;
      }
    }
    fs = Math.min(22, Math.max(12, fs));
    state.readFontSize = fs;
    state.readScale = fs / 16;

    root.style.setProperty('--read-fs', `${fs}px`);
    root.style.setProperty('--read-scale', String(fs / 16));
    root.style.setProperty('--measure', state.measure || '44rem');
    root.style.setProperty('--font-read', state.fontRead === 'serif' ? 'var(--font-serif)' : 'var(--font-ui)');
    if (state.motion === 'reduce') {
      root.setAttribute('data-motion', 'reduce');
    } else {
      root.removeAttribute('data-motion');
    }
    const appEl = document.querySelector('.app');
    if (appEl) {
      appEl.classList.toggle('is-collapsed', Boolean(state.sidebarCollapsed));
    }
    const sbBtn = document.getElementById('btn-sidebar-toggle');
    if (sbBtn) {
      sbBtn.setAttribute('aria-expanded', String(!state.sidebarCollapsed));
    }
  }

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const pref = document.documentElement.getAttribute('data-theme-pref');
      if (pref === 'system' || pref === 'unset') applyTheme(pref === 'unset' ? 'system' : pref);
    });
  }

  /* ---------- 5. Live Exam Countdown (§5 & §14.9) ---------- */
  const EXAM_START = Date.parse('2026-11-18T09:00:00+05:30');
  const EXAM_END   = Date.parse('2026-11-18T12:00:00+05:30');
  let cdTimer = 0;
  let cdLastMin = -1;
  const cdCache = {};

  function initCountdown() {
    clearTimeout(cdTimer);
    const panel = document.querySelector('.countdown-panel');
    if (!panel) return;
    const el = {};
    ['d', 'h', 'm', 's', 'left'].forEach(k => { el[k] = panel.querySelector('[data-u="' + k + '"]'); });
    const sr = panel.querySelector('#cd-sr');
    const pad = n => String(n).padStart(2, '0');
    const put = (k, v) => {
      if (el[k] && cdCache[k] !== v) {
        cdCache[k] = v;
        el[k].textContent = v;
      }
    };
    const split = ms => {
      const t = Math.max(0, Math.floor(ms / 1000));
      return {
        d: Math.floor(t / 86400),
        h: Math.floor((t % 86400) / 3600),
        m: Math.floor((t % 3600) / 60),
        s: t % 60
      };
    };

    function renderTick() {
      const now = Date.now();
      const st = now < EXAM_START ? 'before' : (now < EXAM_END ? 'live' : 'after');
      if (panel.dataset.state !== st) panel.dataset.state = st;
      if (st === 'before') {
        const p = split(EXAM_START - now);
        put('d', pad(p.d));
        put('h', pad(p.h));
        put('m', pad(p.m));
        put('s', pad(p.s));
        if (sr && p.m !== cdLastMin) {
          cdLastMin = p.m;
          sr.textContent = p.d + ' days, ' + p.h + ' hours and ' + p.m + ' minutes until the exam starts.';
        }
      } else if (st === 'live') {
        const p = split(EXAM_END - now);
        put('left', pad(p.h) + ':' + pad(p.m) + ':' + pad(p.s));
        if (sr && p.m !== cdLastMin) {
          cdLastMin = p.m;
          sr.textContent = 'Exam in progress. ' + p.h + ' hours and ' + p.m + ' minutes remaining.';
        }
      } else if (sr && cdLastMin !== -2) {
        cdLastMin = -2;
        sr.textContent = 'Exam completed.';
      }
      return st;
    }

    function tick() {
      if (document.hidden) return;
      if (renderTick() === 'after') return;
      cdTimer = setTimeout(tick, 1000 - (Date.now() % 1000) + 10);
    }

    // Check if viewer's local timezone differs from Sri Lanka Standard Time (UTC+05:30 => offset -330)
    if (new Date().getTimezoneOffset() !== -330) {
      try {
        const f = new Intl.DateTimeFormat(undefined, { weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' });
        const t = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
        const loc = panel.querySelector('.cd-local');
        if (loc) {
          loc.textContent = 'Your local time: ' + f.format(EXAM_START) + '–' + t.format(EXAM_END);
          loc.hidden = false;
        }
      } catch (e) {}
    }

    Object.keys(cdCache).forEach(k => delete cdCache[k]);
    cdLastMin = -1;
    tick();
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && document.querySelector('.countdown-panel')) {
      initCountdown();
    }
  });

  /* ---------- 6. Clipboard & Announcer (§14.5) ---------- */
  function announce(msg) {
    const l = document.getElementById('live');
    if (!l) return;
    l.textContent = '';
    requestAnimationFrame(() => { l.textContent = msg; });
  }

  function toast(msg, ms = 2400) {
    const host = document.getElementById('toasts');
    if (!host) return;
    while (host.children.length >= 2) host.firstChild.remove();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    host.appendChild(t);
    setTimeout(() => {
      t.classList.add('is-leaving');
      setTimeout(() => t.remove(), 160);
    }, ms);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {}
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      const ok = document.execCommand('copy');
      ta.remove();
      if (ok) return true;
    } catch (e) {}
    return false;
  }

  function openManualCopy(text) {
    const dlg = document.getElementById('dlg-manual-copy');
    const ta = document.getElementById('manual-copy-ta');
    if (!dlg || !ta) return;
    ta.value = text;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
    setTimeout(() => {
      ta.focus();
      ta.select();
    }, 30);
  }

  async function copyWithFeedback(btn, text, spoken) {
    const ok = await copyText(text);
    if (!ok) {
      openManualCopy(text);
      return;
    }
    const label = btn.querySelector('.btn-label');
    if (label) {
      const prev = btn.dataset.label || (btn.dataset.label = label.textContent);
      btn.classList.add('is-copied');
      label.textContent = 'Copied';
      clearTimeout(btn._t);
      btn._t = setTimeout(() => {
        btn.classList.remove('is-copied');
        label.textContent = prev;
      }, 1800);
    } else {
      btn.classList.add('is-copied');
      clearTimeout(btn._t);
      btn._t = setTimeout(() => btn.classList.remove('is-copied'), 1800);
      toast(spoken || 'Copied to clipboard');
    }
    announce(spoken || 'Copied');
  }

  /* ---------- 7. Explicit Accessible Show/Hide Answer (§9.9 & User Rule 1) ---------- */
  function setReveal(btn, panel, open) {
    // Explicit boolean hidden attribute ONLY
    if (open) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
    btn.setAttribute('aria-expanded', String(open));
    const lbl = btn.querySelector('.btn-label');
    if (lbl) {
      lbl.textContent = btn.dataset[open ? 'hide' : 'show'] || (open ? 'Hide answer' : 'Show answer');
    }
  }

  function toggleReveal(btn) {
    const panelId = btn.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (!panel) return;
    const open = btn.getAttribute('aria-expanded') !== 'true';
    setReveal(btn, panel, open);
    if (open) {
      panel.classList.add('is-entering');
      panel.addEventListener('animationend', () => panel.classList.remove('is-entering'), { once: true });
      if (panel.getBoundingClientRect().top > window.innerHeight - 96) {
        panel.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  /* ---------- 8. Predictions Lazy Loader & AI Prompt Builder ---------- */
  let predDataCache = null;
  let predByIdCache = null;

  function getPredictionsData() {
    if (predDataCache) return predDataCache;
    const el = document.getElementById('pred-data');
    if (!el) return null;
    try {
      predDataCache = JSON.parse(el.textContent);
      predByIdCache = {};
      (predDataCache.mcqs || []).forEach(q => { predByIdCache[q.id] = q; });
      (predDataCache.essays || []).forEach(q => { predByIdCache[q.id] = q; });
      return predDataCache;
    } catch (e) {
      console.error('Failed to parse #pred-data:', e);
      return null;
    }
  }

  function getPredictedItem(qid) {
    getPredictionsData();
    return (predByIdCache && predByIdCache[qid]) || null;
  }

  const SAMPLE_RECORDS = {
    'sample-pp-q1': {
      type: 'paper',
      meta: 'Final Examination (January 2024) · Batch 21 · DA2451 · Question 1(a) [4 marks]',
      question: 'Suppose X = (X_1, X_2)^T follows a bivariate normal distribution with mean vector μ = [2, -1]^T and covariance matrix Σ = [[4, 1.4], [1.4, 1]]. Find the marginal distribution of X_1 and the conditional distribution of X_2 given X_1 = x_1.',
      answer: '1. Marginal distribution of X_1: By the marginal property of the multivariate normal distribution, X_1 ~ N(μ_1, σ_11) = N(2, 4).\n2. Conditional distribution of X_2 | X_1 = x_1: Since X is bivariate normal, X_2 | X_1 = x_1 ~ N(μ_{2|1}, σ_{2|1}^2), where:\n   μ_{2|1} = μ_2 + (σ_12 / σ_11)(x_1 - μ_1) = -1 + (1.4 / 4)(x_1 - 2) = -1 + 0.35(x_1 - 2)\n   σ_{2|1}^2 = σ_22 - (σ_12^2 / σ_11) = 1 - (1.96 / 4) = 1 - 0.49 = 0.51.'
    },
    'sample-pred-mcq': {
      type: 'predicted-mcq',
      meta: 'C-MCQ-001 · ChatGPT Predicted MCQ (Unofficial practice)',
      question: 'Let Σ be a 3 × 3 covariance matrix with eigenvalues λ_1 = 5.4, λ_2 = 1.8, and λ_3 = 0.8. What proportion of the total population variance is explained by the first principal component?\nA. 0.540\nB. 0.675\nC. 0.800\nD. 0.900'
    }
  };

  function buildPredictedMcqPrompt(q, opts = {}) {
    const predData = getPredictionsData();
    const fileInstr = (q.generator === 'chatgpt' && predData && predData.fileInstructions && predData.fileInstructions['C-MCQ'])
      ? `\nFile-level exam conventions from source:\n${predData.fileInstructions['C-MCQ']}\n`
      : '';
    const pick = opts.includePick && state.mcqPicks[q.id]
      ? `\nMy tentative selection before checking: Option ${state.mcqPicks[q.id]}. Please evaluate whether this is right or wrong without flattering me.\n`
      : '';

    return `You are an expert tutor for DA2451: Multivariate Methods in Business (B.Sc. Business Science, Department of Decision Sciences, University of Moratuwa).

CONTEXT & PROVENANCE
- Item ID: ${q.id} (${q.generatorLabel} predicted MCQ #${q.seq} of 40)
- Source file: ${q.sourceFile}
- Source topic section: ${q.topic.raw}
- Status: UNOFFICIAL AI-generated practice prediction. No official or verified answer key is attached to this item.
${fileInstr}
ORIGINAL QUESTION (verbatim from source; do not alter numbers, notation, or options)
<question>
${q.sourceMd}
</question>
${pick}
HOW TO TEACH AND SOLVE THIS QUESTION
1. Start from zero: briefly explain the multivariate concept, definitions, and every symbol appearing in the question so a complete beginner can follow.
2. State the relevant theorem, matrix identity, distribution result, or formula, and explain why it applies here.
3. Work through the calculation or logical derivation step by step, showing every intermediate quantity and checking units, dimensions, and assumptions.
4. Evaluate all four options (A, B, C, and D) explicitly:
   - Identify the best-supported option.
   - Explain why each of the other three options is incorrect or what common misconception produces it.
5. Give a plain-English business or statistical takeaway in 2-3 sentences.
6. Where useful, include a short, self-contained R snippet that reproduces or checks the numerical calculation.
7. Sanity-check your own arithmetic and matrix dimensions before concluding. If any part of the question is ambiguous or under-specified, flag that explicitly rather than inventing facts. Remember that your explanation is an independent AI tutoring solution, not an official university marking scheme.`;
  }

  function buildPredictedEssayPrompt(q) {
    const predData = getPredictionsData();
    const fileInstr = (q.generator === 'chatgpt' && predData && predData.fileInstructions && predData.fileInstructions['C-ESS'])
      ? `\nFile-level exam conventions from source:\n${predData.fileInstructions['C-ESS']}\n`
      : '';
    const partLabels = (q.parts || []).map(p => `(${p.label}) [${p.marks} marks]`).join(', ');

    return `You are an expert tutor and examiner for DA2451: Multivariate Methods in Business (B.Sc. Business Science, Department of Decision Sciences, University of Moratuwa).

CONTEXT & PROVENANCE
- Item ID: ${q.id} (${q.generatorLabel} predicted Essay Question #${q.seq} of 15)
- Source file: ${q.sourceFile}
- Source topic section: ${q.topic.raw}${q.title ? `\n- Question title: ${q.title}` : ''}
- Total marks: ${q.totalMarks} marks across parts: ${partLabels}
- Status: UNOFFICIAL AI-generated practice prediction. No official or verified marking scheme is attached to this item.
${fileInstr}
ORIGINAL QUESTION (verbatim from source; preserve all matrices, tables, R output, and sub-parts)
<question>
${q.sourceMd}
</question>

HOW TO TEACH AND SOLVE THIS ESSAY QUESTION
1. Before solving, give a short roadmap of the statistical ideas needed across parts ${partLabels}, defining every symbol, matrix, and distribution from first principles.
2. Solve EVERY sub-part ${partLabels} in order under clear headings that show the part letter and its mark allocation:
   - State the formula, hypothesis, or model clearly before substituting numbers.
   - Show all intermediate matrix/numerical steps, degrees of freedom, test statistics, critical-value comparisons, and decision rules.
   - Calibrate the depth of your explanation to the marks allocated to each sub-part.
   - Write the plain-English managerial or statistical interpretation required by the prompt.
3. If the question includes R code or R console output, explain every relevant line and number in the output. Where helpful, provide a clean, reproducible R script that verifies the calculations.
4. Double-check all arithmetic, eigenvalue proportions, degrees of freedom, and matrix dimensions. Do not invent unseen datasets or unstated assumptions; if anything requires an explicit assumption, state it clearly.
5. Finish with a compact "Exam Check & Common Pitfalls" summary highlighting what students most often get wrong on this topic. Remember that your answer is an independent AI tutoring explanation, not an official university marking scheme.`;
  }

  function buildPrompt(qid) {
    const predItem = getPredictedItem(qid);
    if (predItem) {
      if (predItem.kind === 'mcq' || predItem.kind === 'predicted-mcq') {
        return buildPredictedMcqPrompt(predItem, { includePick: Boolean(state.includePickInPrompt && state.includePickInPrompt[qid]) });
      }
      return buildPredictedEssayPrompt(predItem);
    }

    const promptStore = window.DA2451_PROMPTS || {};
    const rec = promptStore[qid] || SAMPLE_RECORDS[qid];
    if (!rec) return '';
    if (rec.type === 'paper' || rec.type === 'pq') {
      return [
        'You are an exceptionally patient DA2451 Multivariate Methods in Business tutor.',
        'Teach this question from absolute zero. Here is the COMPLETE ORIGINAL QUESTION:',
        '[' + rec.meta + ']',
        rec.question,
        '',
        'HERE IS THE SOURCE-PROVIDED ANSWER / TEACHING SOLUTION:',
        rec.answer || 'No reliably matched source answer was available for this item.',
        '',
        'Use the source-provided solution as a REFERENCE, not guaranteed truth. First check the method, arithmetic, assumptions, interpretations and any R code; identify and explain errors or incomplete steps rather than blindly agreeing. Then teach the problem from prerequisites, define every symbol, justify each formula, show all substitutions and intermediate calculations, explain the source\'s reasoning, and interpret the result in simple English. Where needed, provide and explain relevant reproducible R code. Clearly distinguish the original source answer from any independent correction. Do not invent missing values or unseen datasets.'
      ].join('\n');
    }
    return [
      'You are an exceptionally patient DA2451 Multivariate Methods in Business tutor.',
      'This is an UNOFFICIAL AI-generated practice prediction with NO PROVIDED ANSWER KEY.',
      'Here is the COMPLETE QUESTION:',
      '[' + rec.meta + ']',
      rec.question,
      '',
      'Teach every prerequisite from zero; solve independently step by step, check calculations and assumptions, explain every formula and symbol, and interpret the conclusion in simple English. For an MCQ, choose the best-supported option and explain the alternatives. For essays, cover every subpart. Include annotated R code where genuinely useful. Do not invent missing data; flag uncertainty. Your response is an independently generated explanation, not an official marking scheme.'
    ].join('\n');
  }

  /* ---------- 9. View Rendering & Router ---------- */
  const scrollPositions = {};
  let routeSwitching = false;
  let currentRoute = 'dashboard';
  let hasDrawnHeroEllipse = false;
  try {
    hasDrawnHeroEllipse = window.sessionStorage.getItem('da2451:ellipse-drawn') === '1';
  } catch (e) {}

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderRingSvg(isComplete, label) {
    return `<svg class="ring ${isComplete ? 'is-complete' : ''}" width="20" height="20" viewBox="0 0 20 20" role="img" aria-label="${escapeHtml(label || (isComplete ? 'Marked complete' : 'Not marked complete'))}">
      <circle cx="10" cy="10" r="8" class="ring-track"/>
      <circle cx="10" cy="10" r="8" class="ring-fill" pathLength="100" stroke-dasharray="100 100" transform="rotate(-90 10 10)"/>
      <path class="ring-check" d="M6.4 10.3l2.5 2.5 4.7-5"/>
    </svg>`;
  }

  function renderEmptyArt() {
    return `<svg class="empty-art" viewBox="0 0 120 72" aria-hidden="true">
      <g transform="translate(60 36) rotate(-30)">
        <ellipse rx="42" ry="19" fill="none" stroke="currentColor" stroke-width="1.25" stroke-dasharray="3 4"/>
        <path d="M-50 0H50 M0 -26V26" stroke="currentColor" stroke-width="1" opacity=".45"/>
        <circle r="2.2" fill="currentColor"/>
      </g>
    </svg>`;
  }

  function getSectionArt(kind) {
    if (kind === 'chapters') {
      // Orthogonal subspace projection: vector y onto plane V, projection y-hat, residual e
      return `<svg class="page-head-art" viewBox="0 0 160 100" role="img" aria-label="Orthogonal projection onto a subspace">
        <polygon points="25,75 105,75 145,45 65,45" fill="var(--accent-soft)" stroke="var(--rule-strong)" stroke-width="1.25"/>
        <text x="35" y="68" font-size="10" font-family="var(--font-ui)" font-weight="600" fill="var(--ink-3)">Subspace 𝒱</text>
        <path d="M25 75L145 75" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 3"/>
        <line x1="45" y1="65" x2="105" y2="55" stroke="var(--accent)" stroke-width="1.75"/>
        <polygon points="105,55 98,52 100,56" fill="var(--accent)"/>
        <text x="96" y="70" font-size="10" font-family="var(--font-ui)" font-weight="650" fill="var(--accent)">ŷ</text>
        <line x1="45" y1="65" x2="105" y2="20" stroke="currentColor" stroke-width="1.75"/>
        <polygon points="105,20 98,24 102,26" fill="currentColor"/>
        <text x="110" y="22" font-size="11" font-family="var(--font-ui)" font-weight="650" fill="var(--ink)">y</text>
        <line x1="105" y1="20" x2="105" y2="55" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3 3"/>
        <path d="M100 55v-5h5" fill="none" stroke="var(--accent)" stroke-width="1.2"/>
        <text x="112" y="40" font-size="10" font-family="var(--font-ui)" font-weight="600" fill="var(--ink-3)">e ⟂ 𝒱</text>
        <circle cx="45" cy="65" r="2.5" fill="currentColor"/>
      </svg>`;
    }
    if (kind === 'papers') {
      // Concentric Bivariate Density Contours + Principal Axes
      return `<svg class="page-head-art" viewBox="0 0 160 100" role="img" aria-label="Bivariate normal density contours and confidence ellipsoid">
        <g class="ax-orig" opacity=".5"><path d="M10 50H150 M80 10V90" stroke="var(--rule-strong)" stroke-width="1" stroke-dasharray="2 3"/></g>
        <g transform="translate(80 50) rotate(-32)">
          <ellipse rx="62" ry="28" fill="none" stroke="var(--rule-strong)" stroke-width="1.25" stroke-dasharray="3 3"/>
          <ellipse rx="44" ry="20" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
          <ellipse rx="24" ry="11" fill="none" stroke="var(--accent)" stroke-width="1.25"/>
          <line x1="-72" y1="0" x2="72" y2="0" stroke="var(--ink-3)" stroke-width="1.25"/>
          <line x1="0" y1="-34" x2="0" y2="34" stroke="var(--ink-3)" stroke-width="1.25"/>
          <circle cx="0" cy="0" r="2.2" fill="var(--accent)"/>
          <line x1="44" y1="-12" x2="44" y2="12" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="2 2"/>
          <text transform="translate(56 -4) rotate(32)" font-size="9" font-family="var(--font-ui)" font-weight="650" fill="var(--accent)">χ²(α)</text>
        </g>
      </svg>`;
    }
    if (kind === 'practice') {
      // Eigen-decomposition Matrix Transformation
      return `<svg class="page-head-art" viewBox="0 0 160 100" role="img" aria-label="Matrix eigenvalue transformation of unit sphere">
        <g transform="translate(42 50)">
          <circle cx="0" cy="0" r="24" fill="none" stroke="var(--rule-strong)" stroke-width="1.25" stroke-dasharray="2 3"/>
          <line x1="-28" y1="0" x2="28" y2="0" stroke="var(--rule-strong)" stroke-width="1"/>
          <line x1="0" y1="-28" x2="0" y2="28" stroke="var(--rule-strong)" stroke-width="1"/>
          <text x="-6" y="-28" font-size="9" font-family="var(--font-ui)" font-weight="600" fill="var(--ink-3)">‖x‖=1</text>
        </g>
        <g transform="translate(80 50)">
          <path d="M-8 0H8 M4 -4L8 0L4 4" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <text x="-9" y="-8" font-size="9" font-family="var(--font-ui)" font-weight="650" fill="var(--accent)">Σ½</text>
        </g>
        <g transform="translate(122 50) rotate(-35)">
          <ellipse rx="32" ry="15" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5"/>
          <line x1="-36" y1="0" x2="36" y2="0" stroke="var(--ink-3)" stroke-width="1.25"/>
          <line x1="0" y1="-18" x2="0" y2="18" stroke="var(--ink-3)" stroke-width="1.25"/>
          <circle cx="0" cy="0" r="2" fill="var(--accent)"/>
          <text transform="translate(24 10) rotate(35)" font-size="8" font-family="var(--font-ui)" font-weight="650" fill="var(--ink)">√λ₁</text>
        </g>
      </svg>`;
    }
    if (kind === 'predicted') {
      // Prediction Ellipse with Confidence Boundary & Centroid
      return `<svg class="page-head-art" viewBox="0 0 160 100" role="img" aria-label="Multivariate prediction region">
        <g class="ax-orig" opacity=".4"><path d="M15 50H145 M80 15V85" stroke="var(--rule-strong)" stroke-width="1" stroke-dasharray="2 3"/></g>
        <g transform="translate(80 50) rotate(-28)">
          <ellipse rx="56" ry="26" fill="var(--predicted-soft)" stroke="var(--predicted)" stroke-width="1.5" stroke-dasharray="3.5 3"/>
          <line x1="-65" y1="0" x2="65" y2="0" stroke="var(--ink-3)" stroke-width="1.2"/>
          <line x1="0" y1="-32" x2="0" y2="32" stroke="var(--ink-3)" stroke-width="1.2"/>
          <circle cx="-20" cy="8" r="1.8" fill="var(--ink-3)"/>
          <circle cx="16" cy="-6" r="1.8" fill="var(--ink-3)"/>
          <circle cx="-10" cy="-12" r="1.8" fill="var(--ink-3)"/>
          <circle cx="28" cy="10" r="1.8" fill="var(--ink-3)"/>
          <circle cx="0" cy="0" r="2.8" fill="var(--predicted)"/>
          <text transform="translate(4 -4) rotate(28)" font-size="9" font-family="var(--font-ui)" font-weight="650" fill="var(--predicted)">x̄</text>
          <circle cx="36" cy="-14" r="2.4" fill="var(--accent)"/>
          <line x1="0" y1="0" x2="36" y2="-14" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="2 2"/>
          <text transform="translate(39 -14) rotate(28)" font-size="9" font-family="var(--font-ui)" font-weight="650" fill="var(--accent)">x₀</text>
        </g>
      </svg>`;
    }
    if (kind === 'bookmarks') {
      // Bookmarks Geometry: Confidence Ellipse with Bookmark Pin
      return `<svg class="page-head-art" viewBox="0 0 160 100" role="img" aria-label="Bookmarked focal points">
        <g transform="translate(80 50) rotate(-30)">
          <ellipse rx="52" ry="24" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3 3"/>
          <line x1="-60" y1="0" x2="60" y2="0" stroke="var(--rule-strong)" stroke-width="1"/>
          <line x1="0" y1="-28" x2="0" y2="28" stroke="var(--rule-strong)" stroke-width="1"/>
          <circle cx="-18" cy="6" r="2.2" fill="var(--accent)"/>
          <circle cx="20" cy="-8" r="2.2" fill="var(--accent)"/>
        </g>
        <g transform="translate(73 38)">
          <path d="M3 2h8a1 1 0 0 1 1 1v12l-5-3.5L2 15V3a1 1 0 0 1 1-1z" fill="var(--accent)" stroke="var(--accent)" stroke-width="1.5" stroke-linejoin="round"/>
        </g>
      </svg>`;
    }
    return '';
  }

  function countCompleted(prefix) {
    return Object.keys(state.completed).filter(k => state.completed[k] && k.startsWith(prefix)).length;
  }

  function renderDashboard() {
    const chDone = DATA.chapters.filter(c => state.completed[c.id]).length;
    const ppDone = DATA.papers.filter(p => state.completed[p.id]).length;
    const pqDone = DATA.worksheets.filter(w => state.completed[w.id]).length;
    const predDone = countCompleted('C-') + countCompleted('G-') + (state.completed['sample-pred-mcq'] ? 1 : 0);

    const drawClass = !hasDrawnHeroEllipse ? 'anim-draw' : '';
    if (!hasDrawnHeroEllipse) {
      hasDrawnHeroEllipse = true;
      try { window.sessionStorage.setItem('da2451:ellipse-drawn', '1'); } catch (e) {}
    }

    const last = state.lastReading;
    const continueHtml = last
      ? `<div class="continue-row">
          <div class="continue-info">
            <span class="continue-kicker">Continue reading</span>
            <span class="continue-title">${escapeHtml(last.title)}</span>
          </div>
          <div class="continue-bar"><div class="meter"><i style="--p:${Math.min(1, Math.max(0.08, last.progress || 0.25))}"></i></div></div>
          <a class="btn btn-primary" href="${escapeHtml(last.route)}">Resume</a>
        </div>`
      : `<div class="continue-row">
          <div class="continue-info">
            <span class="continue-kicker">Continue reading</span>
            <span class="continue-title">Start with Chapter 1: Introduction to Multivariate Analysis</span>
          </div>
          <a class="btn btn-primary" href="#chapter/ch01">Start</a>
        </div>`;

    const recentList = state.recent.slice(0, 5);
    const recentHtml = recentList.length
      ? `<div class="group">${recentList.map(item => `
          <a class="row row-compact" href="${escapeHtml(item.route)}">
            <svg class="ic row-icon" width="20" height="20" aria-hidden="true"><use href="#i-book"/></svg>
            <div class="row-main">
              <span class="row-title" style="font-size:var(--fs-base)">${escapeHtml(item.title)}</span>
              <span class="row-desc">${escapeHtml(item.section)}</span>
            </div>
            <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
          </a>`).join('')}</div>`
      : `<div class="empty-box">
          <span>Nothing opened yet. Start with Chapter 1.</span>
          <a class="btn" href="#chapter/ch01">Start with Chapter 1</a>
        </div>`;

    const bmList = Object.values(state.bookmarks).sort((a, b) => (b.ts || 0) - (a.ts || 0)).slice(0, 5);
    const bmHtml = bmList.length
      ? `<div class="group">${bmList.map(item => `
          <a class="row row-compact" href="${escapeHtml(item.route)}">
            <svg class="ic row-icon" width="20" height="20" aria-hidden="true"><use href="#i-bookmark-fill"/></svg>
            <div class="row-main">
              <span class="row-title" style="font-size:var(--fs-base)">${escapeHtml(item.title)}</span>
              <span class="row-desc">${escapeHtml(item.section)}</span>
            </div>
            <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
          </a>`).join('')}</div>`
      : `<div class="empty-box">
          ${renderEmptyArt()}
          <span>No bookmarks yet. Tap the bookmark icon on any chapter or question to keep it here.</span>
        </div>`;

    const storageBanner = (!storageAvailable && !state.dismissedStorageBanner)
      ? `<div class="sys-banner" role="status">
          <span>Progress can't be saved in this browser mode. It will be kept until you close this tab.</span>
          <button class="btn btn-ghost" data-action="dismiss-storage-banner" aria-label="Dismiss notice">Dismiss</button>
        </div>`
      : '';

    return `
      <div class="dash-stack view-enter">
        ${storageBanner}
        <header class="dash-header">
          <h1 class="dash-title">DA2451 Multivariate Methods in Business</h1>
          <p class="dash-meta">University of Moratuwa · Semester 4 · Curated by <strong>Dinuka Himsara</strong></p>
        </header>

        <section class="countdown-panel" aria-labelledby="cd-title" data-state="before">
          <div class="cd-content">
            <h2 id="cd-title" class="cd-title">DA2451 Final Examination</h2>
            <div class="cd-units" aria-hidden="true">
              <div class="cd-unit"><span class="cd-num" data-u="d">09</span><span class="cd-lbl">days</span></div>
              <div class="cd-unit"><span class="cd-num" data-u="h">03</span><span class="cd-lbl">hours</span></div>
              <div class="cd-unit"><span class="cd-num" data-u="m">00</span><span class="cd-lbl">minutes</span></div>
              <div class="cd-unit"><span class="cd-num" data-u="s">00</span><span class="cd-lbl">seconds</span></div>
            </div>
            <div class="cd-live">
              <p class="cd-big">Exam in progress</p>
              <p class="cd-sub">Time remaining <span data-u="left">00:00:00</span></p>
            </div>
            <div class="cd-done">
              <p class="cd-big">Exam completed</p>
            </div>
            <p class="cd-sentence sr-only" id="cd-sr" role="timer" aria-live="off"></p>
            <p class="cd-date">DA2451 Final Examination • 18 November 2026 • 9:00 AM–12:00 PM • Sri Lanka time</p>
            <p class="cd-local" hidden></p>
          </div>
          <div class="cd-art" aria-hidden="true">
            <svg class="axis-hero" viewBox="0 0 320 220" aria-hidden="true" focusable="false">
              <g class="ax-orig"><path d="M20 110H300 M160 18V202"/></g>
              <g transform="translate(160 110) rotate(-45)">
                <ellipse class="ax-ellipse ${drawClass}" rx="104" ry="44" pathLength="1"/>
                <path class="ax-pc" d="M-128 0H128 M0 -64V64"/>
                <path class="ax-drop" d="M60 28V0"/>
                <path class="ax-right" d="M54 0V6H60"/>
                <circle class="ax-pt" cx="60" cy="28" r="3.2"/>
                <circle class="ax-foot" cx="60" cy="0" r="2.4"/>
                <text class="ax-label" transform="translate(134 0) rotate(45)" y="4">PC1</text>
                <text class="ax-label" transform="translate(0 -70) rotate(45)" text-anchor="end" x="-2" y="4">PC2</text>
              </g>
            </svg>
          </div>
        </section>

        ${continueHtml}

        <div class="dash-grid-2">
          <section aria-labelledby="study-heading">
            <div class="section-block-head">
              <h2 id="study-heading" class="section-block-title">Study</h2>
            </div>
            <div class="group">
              <a class="row" href="#chapters">
                <svg class="ic row-icon" width="24" height="24" aria-hidden="true"><use href="#i-book"/></svg>
                <div class="row-main">
                  <span class="row-title">Learning Chapters</span>
                  <span class="row-desc">Explained chapters with the original lecture PDFs</span>
                </div>
                <span class="row-count">${DATA.chapters.length}</span>
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
              </a>
              <a class="row" href="#papers">
                <svg class="ic row-icon" width="24" height="24" aria-hidden="true"><use href="#i-paper"/></svg>
                <div class="row-main">
                  <span class="row-title">Past Papers</span>
                  <span class="row-desc">Final exams, in-class papers and quizzes with worked answers</span>
                </div>
                <span class="row-count">${DATA.papers.length}</span>
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
              </a>
              <a class="row" href="#practice">
                <svg class="ic row-icon" width="24" height="24" aria-hidden="true"><use href="#i-matrix"/></svg>
                <div class="row-main">
                  <span class="row-title">Practice Questions</span>
                  <span class="row-desc">Five worksheets with step-by-step solutions</span>
                </div>
                <span class="row-count">${DATA.worksheets.length}</span>
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
              </a>
              <a class="row" href="#predicted-mcqs">
                <svg class="ic row-icon" width="24" height="24" aria-hidden="true"><use href="#i-predict"/></svg>
                <div class="row-main">
                  <span class="row-title">Predicted Questions <span class="chip chip--predicted">Unofficial</span></span>
                  <span class="row-desc">Unofficial AI-generated practice (ChatGPT &amp; Gemini), no answers</span>
                </div>
                <span class="row-count">61 MCQs · 24 Essays</span>
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
              </a>
            </div>
          </section>

          <section aria-labelledby="prog-heading">
            <div class="section-block-head">
              <h2 id="prog-heading" class="section-block-title">Your progress</h2>
            </div>
            <div class="progress-card">
              <div class="prog-row">
                <div class="prog-head">
                  <span class="prog-label">Chapters</span>
                  <span class="prog-val">${chDone} of ${DATA.chapters.length} marked complete</span>
                </div>
                <div class="meter"><i style="--p:${DATA.chapters.length ? (chDone / DATA.chapters.length) : 0}"></i></div>
              </div>
              <div class="prog-row">
                <div class="prog-head">
                  <span class="prog-label">Past papers</span>
                  <span class="prog-val">${ppDone} of ${DATA.papers.length} marked complete</span>
                </div>
                <div class="meter"><i style="--p:${DATA.papers.length ? (ppDone / DATA.papers.length) : 0}"></i></div>
              </div>
              <div class="prog-row">
                <div class="prog-head">
                  <span class="prog-label">Worksheets</span>
                  <span class="prog-val">${pqDone} of ${DATA.worksheets.length} marked complete</span>
                </div>
                <div class="meter"><i style="--p:${DATA.worksheets.length ? (pqDone / DATA.worksheets.length) : 0}"></i></div>
              </div>
              <div class="prog-row">
                <div class="prog-head">
                  <span class="prog-label">Predicted</span>
                  <span class="prog-val">${predDone} of 85 marked complete</span>
                </div>
                <div class="meter"><i style="--p:${Math.min(1, predDone / 85)}"></i></div>
              </div>
            </div>
          </section>
        </div>

        <div class="dash-col-equal">
          <section aria-labelledby="recent-heading">
            <div class="section-block-head">
              <h2 id="recent-heading" class="section-block-title">Recent</h2>
            </div>
            ${recentHtml}
          </section>
          <section aria-labelledby="bm-heading">
            <div class="section-block-head">
              <h2 id="bm-heading" class="section-block-title">Bookmarked</h2>
              ${bmList.length ? `<a class="section-block-link" href="#bookmarks">See all</a>` : ''}
            </div>
            ${bmHtml}
          </section>
        </div>

        <footer class="dash-footer">
          <div class="dash-footer-auth">
            <span class="dash-footer-auth-name">Made by Dinuka Himsara</span>
            <span class="dash-footer-auth-sub">DA2451 Multivariate Methods in Business · Independent Academic Project</span>
          </div>
          <div class="dash-footer-links">
            <button type="button" class="btn btn-ghost" data-action="open-about">About this app</button>
            <span>·</span>
            <button type="button" class="btn btn-ghost" data-action="open-shortcuts">Keyboard shortcuts (?)</button>
          </div>
        </footer>
      </div>
    `;
  }

  function renderChaptersList() {
    const lastCh = state.lastReading && state.lastReading.id && state.lastReading.id.startsWith('ch')
      ? DATA.chapters.find(c => c.id === state.lastReading.id)
      : null;

    return `
      <div class="view-enter">
        <header class="page-header">
          <div class="page-head-row">
            <div class="page-head-copy">
              <h1 class="page-title">Learning Chapters</h1>
              <p class="page-desc">${DATA.chapters.length} chapters in study sequence (8 core lecture chapters and 3 supplementary readings), each paired with its original lecture PDF.</p>
            </div>
            <div class="page-head-art" aria-hidden="true">
              ${getSectionArt('chapters')}
            </div>
          </div>
        </header>
        ${lastCh ? `
          <div class="continue-row" style="margin-bottom:var(--s-5)">
            <div class="continue-info">
              <span class="continue-kicker">Resume chapter</span>
              <span class="continue-title">${escapeHtml(state.lastReading.title)}</span>
            </div>
            <a class="btn btn-primary" href="${escapeHtml(state.lastReading.route)}">Resume Chapter ${Number(lastCh.pos)}</a>
          </div>
        ` : ''}
        <div class="group">
          ${DATA.chapters.map(ch => {
            const done = Boolean(state.completed[ch.id]);
            return `
              <div class="row row-chapter" data-action="nav-route" data-href="#chapter/${escapeHtml(ch.id)}" style="cursor:pointer">
                <span class="row-num">${escapeHtml(ch.pos)}</span>
                <a class="row-main" href="#chapter/${escapeHtml(ch.id)}" style="text-decoration:none;color:inherit">
                  <span class="row-title">
                    ${escapeHtml(ch.title)}
                    ${ch.kind === 'supplementary' ? `<span class="chip chip--dashed">Supplementary</span>` : ''}
                  </span>
                  <span class="row-desc">Teaching chapter · Original PDF (${escapeHtml(ch.pdf)})</span>
                </a>
                <a class="btn" href="#chapter/${escapeHtml(ch.id)}" style="min-height:34px;padding:0 12px;font-size:var(--fs-xs)" aria-label="Read Chapter ${Number(ch.pos)}: ${escapeHtml(ch.title)}">
                  <span>Read</span>
                </a>
                <button type="button" class="btn btn-ghost" data-action="open-pdf-from-list" data-chid="${escapeHtml(ch.id)}" title="Original PDF available (${escapeHtml(ch.pdf)})" aria-label="Original PDF available for Chapter ${Number(ch.pos)}">
                  <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-pdf"/></svg>
                  <span style="font-size:var(--fs-xs)">Original PDF</span>
                </button>
                <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escapeHtml(ch.id)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark complete'}" aria-label="${done ? 'Marked complete' : 'Mark complete'}">
                  ${renderRingSvg(done)}
                </button>
                <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#chapter/${escapeHtml(ch.id)}" title="Open in new tab" aria-label="Open Chapter ${escapeHtml(ch.pos)} in new tab">
                  <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
                </button>
                <a href="#chapter/${escapeHtml(ch.id)}" class="btn btn-ghost" aria-label="Open ${escapeHtml(ch.title)}">
                  <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderChapterShell(chId, targetAnchor) {
    const idx = DATA.chapters.findIndex(c => c.id === chId);
    const ch = DATA.chapters[idx] || DATA.chapters[0];
    const done = Boolean(state.completed[ch.id]);
    const bm = Boolean(state.bookmarks[ch.id]);
    const savedPos = (state.chapterPositions && state.chapterPositions[ch.id]) || null;

    if (window.DA2451_READER) {
      const html = window.DA2451_READER.renderChapterView(ch.id, {
        isCompleted: done,
        isBookmarked: bm,
        savedPosition: savedPos,
        renderRingSvg,
        targetAnchor
      });
      recordVisit(ch.id, 'Chapter ' + Number(ch.pos) + ' · ' + ch.title, 'Learning Chapters', '#chapter/' + ch.id);
      return html;
    }
    return `<div class="empty-box">Chapter reader module is not loaded.</div>`;
  }

  let paperBatchFilter = 'all';
  let paperTypeFilter = 'all';

  function renderPapersList() {
    const batches = [19, 20, 21, 22, 23];
    const filteredPapers = DATA.papers.filter(p => {
      if (paperBatchFilter !== 'all' && String(p.batch) !== String(paperBatchFilter)) return false;
      if (paperTypeFilter !== 'all' && p.type.toLowerCase() !== paperTypeFilter.toLowerCase()) return false;
      return true;
    });

    const visibleBatches = batches.filter(b => filteredPapers.some(p => p.batch === b));

    return `
      <div class="view-enter">
        <header class="page-header">
          <div class="page-head-row">
            <div class="page-head-copy">
              <h1 class="page-title">Past Papers</h1>
              <p class="page-desc">${DATA.papers.length} historical examination papers across Batches 19–23 (Final examinations, In-class examinations, and Quizzes), each paired with its complete matched worked solution.</p>
            </div>
            <div class="page-head-art" aria-hidden="true">
              ${getSectionArt('papers')}
            </div>
          </div>
        </header>

        <div class="filter-bar" role="region" aria-label="Filter past papers">
          <div class="filter-group">
            <span class="filter-label">Batch:</span>
            <div class="seg" role="radiogroup" aria-label="Filter by batch">
              ${['all', '19', '20', '21', '22', '23'].map(b => `
                <button type="button" role="radio" aria-checked="${String(paperBatchFilter) === b}" data-action="set-paper-batch" data-batch="${b}">
                  ${b === 'all' ? 'All' : 'Batch ' + b}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="filter-group">
            <span class="filter-label">Type:</span>
            <div class="seg" role="radiogroup" aria-label="Filter by exam type">
              ${[
                ['all', 'All'],
                ['Final', 'Final'],
                ['In-class', 'In-class'],
                ['Quiz', 'Quiz']
              ].map(([val, lbl]) => `
                <button type="button" role="radio" aria-checked="${paperTypeFilter === val}" data-action="set-paper-type" data-type="${val}">
                  ${lbl}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        ${visibleBatches.length === 0 ? `
          <div class="empty-box">
            <span>No past papers match the selected Batch and Type filters.</span>
            <button type="button" class="btn" data-action="reset-paper-filters">Reset filters</button>
          </div>
        ` : visibleBatches.map(b => {
          const list = filteredPapers.filter(p => p.batch === b);
          return `
            <section style="margin-bottom:var(--s-6)" aria-label="Batch ${b}">
              <h2 class="section-block-title" style="margin-bottom:var(--s-3)">Batch ${b}</h2>
              <div class="group">
                ${list.map(p => {
                  const done = Boolean(state.completed[p.id]);
                  return `
                    <div class="row row-chapter" data-action="nav-route" data-href="#paper/${escapeHtml(p.id)}" style="cursor:pointer">
                      <a class="row-main" href="#paper/${escapeHtml(p.id)}" style="text-decoration:none;color:inherit">
                        <span class="row-title">
                          ${escapeHtml(p.title)}
                          <span class="chip ${p.chipClass}">${escapeHtml(p.type)}</span>
                          <span class="chip">${escapeHtml(p.course)}</span>
                        </span>
                        <span class="row-desc">${escapeHtml(p.dateLabel)} · ${escapeHtml(p.duration)} · ${p.totalMarks} marks · ${escapeHtml(p.composition)}</span>
                      </a>
                      <a class="btn" href="#paper/${escapeHtml(p.id)}" style="min-height:34px;padding:0 12px;font-size:var(--fs-xs)" aria-label="Open ${escapeHtml(p.title)}">
                        <span>Open paper</span>
                      </a>
                      <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escapeHtml(p.id)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark paper complete'}" aria-label="Mark ${escapeHtml(p.title)} complete">
                        ${renderRingSvg(done)}
                      </button>
                      <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#paper/${escapeHtml(p.id)}" title="Open in new tab" aria-label="Open ${escapeHtml(p.title)} in new tab">
                        <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
                      </button>
                      <a href="#paper/${escapeHtml(p.id)}" class="btn btn-ghost" aria-label="Open ${escapeHtml(p.title)}">
                        <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
                      </a>
                    </div>
                  `;
                }).join('')}
              </div>
            </section>
          `;
        }).join('')}
      </div>
    `;
  }

  function renderPaperShell(paperId) {
    const p = DATA.papers.find(x => x.id === paperId) || DATA.papers[0];
    const done = Boolean(state.completed[p.id]);
    const bm = Boolean(state.bookmarks[p.id]);

    if (window.DA2451_READER && typeof window.DA2451_READER.renderPaperView === 'function') {
      const html = window.DA2451_READER.renderPaperView(p.id, {
        isCompleted: done,
        isBookmarked: bm,
        completedMap: state.completed,
        bookmarksMap: state.bookmarks,
        mcqPicks: state.mcqPicks,
        renderRingSvg
      });
      recordVisit(p.id, 'Batch ' + p.batch + ' · ' + p.title, 'Past Papers', '#paper/' + p.id);
      return html;
    }
    return `<div class="empty-box">Past paper reader module is not loaded.</div>`;
  }

  function renderPracticeList() {
    return `
      <div class="view-enter">
        <header class="page-header">
          <div class="page-head-row">
            <div class="page-head-copy">
              <h1 class="page-title">Practice Questions</h1>
              <p class="page-desc">${DATA.worksheets.length} complete teaching worksheets (PQ01–PQ05) in course sequence with original questions, step-by-step worked solutions, R verifications, and beginner-friendly intuition.</p>
            </div>
            <div class="page-head-art" aria-hidden="true">
              ${getSectionArt('practice')}
            </div>
          </div>
        </header>
        <div class="group">
          ${DATA.worksheets.map(w => {
            const done = Boolean(state.completed[w.id]);
            return `
              <div class="row row-chapter" data-action="nav-route" data-href="#worksheet/${escapeHtml(w.id)}" style="cursor:pointer">
                <span class="row-num">${escapeHtml(w.pos)}</span>
                <a class="row-main" href="#worksheet/${escapeHtml(w.id)}" style="text-decoration:none;color:inherit">
                  <span class="row-title">${escapeHtml(w.title)}: ${escapeHtml(w.topic)}</span>
                  <span class="row-desc">Step-by-step teaching solutions · Source: ${escapeHtml(w.file)}</span>
                </a>
                <a class="btn" href="#worksheet/${escapeHtml(w.id)}" style="min-height:34px;padding:0 12px;font-size:var(--fs-xs)" aria-label="Open ${escapeHtml(w.title)}">
                  <span>Open worksheet</span>
                </a>
                <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escapeHtml(w.id)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark worksheet complete'}" aria-label="Mark ${escapeHtml(w.title)} complete">
                  ${renderRingSvg(done)}
                </button>
                <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#worksheet/${escapeHtml(w.id)}" title="Open in new tab" aria-label="Open ${escapeHtml(w.title)} in new tab">
                  <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
                </button>
                <a href="#worksheet/${escapeHtml(w.id)}" class="btn btn-ghost" aria-label="Open ${escapeHtml(w.title)}">
                  <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
                </a>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function renderWorksheetShell(pqId, targetAnchor) {
    const w = DATA.worksheets.find(x => x.id === pqId) || DATA.worksheets[0];
    const done = Boolean(state.completed[w.id]);
    const bm = Boolean(state.bookmarks[w.id]);

    if (window.DA2451_READER && typeof window.DA2451_READER.renderWorksheetView === 'function') {
      const html = window.DA2451_READER.renderWorksheetView(w.id, {
        isCompleted: done,
        isBookmarked: bm,
        completedMap: state.completed,
        bookmarksMap: state.bookmarks,
        renderRingSvg,
        targetAnchor
      });
      recordVisit(w.id, w.title + ' · ' + w.topic, 'Practice Questions', '#worksheet/' + w.id);
      return html;
    }
    return `<div class="empty-box">Practice worksheet reader module is not loaded.</div>`;
  }

  let predGenFilter = 'all';     // 'all' | 'chatgpt' | 'gemini'
  let predStatusFilter = 'all';  // 'all' | 'bookmarked' | 'completed' | 'remaining'
  let predTopicFilter = 'all';   // 'all' | topic.slug

  function renderPredictedMcqCard(q) {
    const pick = state.mcqPicks[q.id] || '';
    const includePick = Boolean(state.includePickInPrompt && state.includePickInPrompt[q.id]);
    const bm = Boolean(state.bookmarks[q.id]);
    const done = Boolean(state.completed[q.id]);
    const bmTitle = `${q.id} · ${q.generatorLabel} MCQ #${q.seq} (${q.topic.raw.replace(/^Topic\s+\d+:\s*/i, '')})`;

    return `
      <article class="qcard" id="${escapeHtml(q.id)}" data-generator="${escapeHtml(q.generator)}" data-topic="${escapeHtml(q.topic.slug)}">
        <div class="qhead">
          <div class="qnum" title="Original sequence #${q.seq} in ${escapeHtml(q.sourceFile)}">${q.seq}</div>
          <div style="min-width:0">
            <div style="display:flex;align-items:center;gap:var(--s-2);flex-wrap:wrap">
              <code style="font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600;color:var(--ink)">${escapeHtml(q.id)}</code>
              <span class="chip" title="Generated by ${escapeHtml(q.generatorLabel)} (${escapeHtml(q.generatorSub)})">${escapeHtml(q.generatorLabel)}</span>
              <span class="chip chip--predicted">Unofficial · AI-generated</span>
            </div>
            <div style="font-size:var(--fs-xs);color:var(--ink-3);margin-top:4px">${q.topic.html}</div>
          </div>
          <div style="display:flex;align-items:center;gap:var(--s-1)">
            <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escapeHtml(q.id)}" data-title="${escapeHtml(bmTitle)}" data-section="Predicted MCQs" data-route="#${escapeHtml(q.id)}" aria-pressed="${bm}" title="${bm ? 'Remove bookmark' : 'Bookmark prediction'}" aria-label="Bookmark ${escapeHtml(q.id)}">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${bm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escapeHtml(q.id)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark complete'}" aria-label="Mark ${escapeHtml(q.id)} complete">
              ${renderRingSvg(done)}
            </button>
            <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#${escapeHtml(q.id)}" title="Open ${escapeHtml(q.id)} in new tab" aria-label="Open ${escapeHtml(q.id)} in new tab">
              <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-external"/></svg>
            </button>
          </div>
        </div>

        <div class="q-body">
          <div class="prose pred-stem">${q.stemHtml}</div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--s-2);margin:var(--s-3) 0 var(--s-2)">
            <span style="font-size:var(--fs-xs);color:var(--ink-3)">Choose your working answer. This is for your own practice and isn't checked.</span>
            ${pick ? `<button type="button" class="btn btn-ghost" data-action="clear-mcq-pick" data-qid="${escapeHtml(q.id)}" style="min-height:26px;padding:2px 8px;font-size:var(--fs-xs)">Clear pick (${escapeHtml(pick)})</button>` : ''}
          </div>
          <div class="opts" role="radiogroup" aria-label="Options for ${escapeHtml(q.id)}">
            ${(q.options || []).map(opt => `
              <label class="opt ${pick === opt.label ? 'is-picked' : ''}">
                <input type="radio" name="opt-${escapeHtml(q.id)}" value="${escapeHtml(opt.label)}" data-qid="${escapeHtml(q.id)}" ${pick === opt.label ? 'checked' : ''}>
                <span class="badge">${escapeHtml(opt.label)}</span>
                <span class="txt">${opt.html}</span>
                <span class="pick">My pick</span>
              </label>
            `).join('')}
          </div>
          <label style="display:inline-flex;align-items:center;gap:6px;margin-top:var(--s-3);font-size:var(--fs-xs);color:var(--ink-3);cursor:pointer">
            <input type="checkbox" data-action="toggle-include-pick" data-qid="${escapeHtml(q.id)}" ${includePick ? 'checked' : ''}>
            <span>Include my tentative pick in the copied AI prompt</span>
          </label>
        </div>

        <div class="qactions">
          <span style="font-size:var(--fs-xs);color:var(--ink-3)">Source: <code>${escapeHtml(q.sourceFile)}</code></span>
          <span class="spacer"></span>
          <button type="button" class="btn btn-prompt" data-action="copy-prompt" data-qid="${escapeHtml(q.id)}" aria-label="Copy AI Prompt for ${escapeHtml(q.id)}">
            <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-prompt"/></svg>
            <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
            <span class="btn-label">Copy AI Prompt</span>
          </button>
          <button type="button" class="btn btn-ghost" data-action="copy-raw" data-qid="${escapeHtml(q.id)}" title="Copy question text" aria-label="Copy question ${escapeHtml(q.id)}">
            <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-copy"/></svg>
            <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
            <span class="btn-label" style="font-size:var(--fs-xs)">Copy question</span>
          </button>
        </div>
        <p class="qhint">No answers are included: the prompt asks your AI assistant to teach and solve it from zero.</p>
      </article>
    `;
  }

  function renderPredictedEssayCard(q) {
    const bm = Boolean(state.bookmarks[q.id]);
    const done = Boolean(state.completed[q.id]);
    const noteVal = (state.predNotes && state.predNotes[q.id]) || '';
    const titlePlain = q.title || q.topic.raw.replace(/^Topic\s+\d+:\s*/i, '');
    const bmTitle = `${q.id} · ${titlePlain} (${q.totalMarks} marks)`;
    const partLabelsStr = (q.parts || []).map(p => `(${p.label})`).join(', ');

    return `
      <article class="qcard" id="${escapeHtml(q.id)}" data-generator="${escapeHtml(q.generator)}" data-topic="${escapeHtml(q.topic.slug)}">
        <div class="qhead">
          <div class="qnum" title="Original Question ${q.seq} in ${escapeHtml(q.sourceFile)}">Q${q.seq}</div>
          <div style="min-width:0">
            <div style="display:flex;align-items:center;gap:var(--s-2);flex-wrap:wrap">
              <code style="font-family:var(--font-mono);font-size:var(--fs-xs);font-weight:600;color:var(--ink)">${escapeHtml(q.id)}</code>
              <span class="chip" title="Generated by ${escapeHtml(q.generatorLabel)} (${escapeHtml(q.generatorSub)})">${escapeHtml(q.generatorLabel)}</span>
              <span class="chip">${q.totalMarks} marks</span>
              <span class="chip chip--predicted">Unofficial · AI-generated</span>
            </div>
            ${q.titleHtml
              ? `<h3 style="margin:6px 0 2px;font-size:var(--fs-md);font-weight:600;color:var(--ink)">${q.titleHtml}</h3>
                 <div style="font-size:var(--fs-xs);color:var(--ink-3)">${q.topic.html}</div>`
              : `<h3 style="margin:6px 0 2px;font-size:var(--fs-md);font-weight:600;color:var(--ink)">${q.topic.html}</h3>`
            }
          </div>
          <div style="display:flex;align-items:center;gap:var(--s-1)">
            <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escapeHtml(q.id)}" data-title="${escapeHtml(bmTitle)}" data-section="Predicted Essays" data-route="#${escapeHtml(q.id)}" aria-pressed="${bm}" title="${bm ? 'Remove bookmark' : 'Bookmark prediction'}" aria-label="Bookmark ${escapeHtml(q.id)}">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${bm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escapeHtml(q.id)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark complete'}" aria-label="Mark ${escapeHtml(q.id)} complete">
              ${renderRingSvg(done)}
            </button>
            <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#${escapeHtml(q.id)}" title="Open ${escapeHtml(q.id)} in new tab" aria-label="Open ${escapeHtml(q.id)} in new tab">
              <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-external"/></svg>
            </button>
          </div>
        </div>

        <div class="q-body">
          <div class="prose essay-scenario">${q.scenarioHtml}</div>

          <div class="essay-parts" role="list" aria-label="Sub-parts for ${escapeHtml(q.id)}" style="margin-top:var(--s-4);display:grid;gap:var(--s-3)">
            ${(q.parts || []).map(p => `
              <div class="essay-part" role="listitem" style="padding:var(--s-3) var(--s-4);border-radius:var(--r-md);background:var(--sunken);border:1px solid var(--rule)">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--s-2);margin-bottom:var(--s-2)">
                  <strong style="font-family:var(--font-mono);font-size:var(--fs-sm);color:var(--ink)">Part (${escapeHtml(p.label)})</strong>
                  ${p.marks != null ? `<span class="chip">${p.marks} marks</span>` : ''}
                </div>
                <div class="prose part-prose">${p.html}</div>
              </div>
            `).join('')}
          </div>

          <details class="pp-details pred-notes" style="margin-top:var(--s-4)" ${noteVal ? 'open' : ''}>
            <summary>My rough notes / outline (saved on this device)</summary>
            <div class="pp-details-body">
              <textarea class="pred-note-ta" data-note-qid="${escapeHtml(q.id)}" rows="3" placeholder="Jot down key formulas, matrix dimensions, or your solution outline for ${escapeHtml(q.id)}…">${escapeHtml(noteVal)}</textarea>
            </div>
          </details>
        </div>

        <div class="qactions">
          <span style="font-size:var(--fs-xs);color:var(--ink-3)">Source: <code>${escapeHtml(q.sourceFile)}</code> · Parts ${escapeHtml(partLabelsStr)}</span>
          <span class="spacer"></span>
          <button type="button" class="btn btn-prompt" data-action="copy-prompt" data-qid="${escapeHtml(q.id)}" aria-label="Copy AI Prompt for ${escapeHtml(q.id)}">
            <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-prompt"/></svg>
            <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
            <span class="btn-label">Copy AI Prompt</span>
          </button>
          <button type="button" class="btn btn-ghost" data-action="copy-raw" data-qid="${escapeHtml(q.id)}" title="Copy question text" aria-label="Copy question ${escapeHtml(q.id)}">
            <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-copy"/></svg>
            <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
            <span class="btn-label" style="font-size:var(--fs-xs)">Copy question</span>
          </button>
        </div>
        <p class="qhint">No answers are included: the prompt asks your AI assistant to teach and solve every subpart (${escapeHtml(partLabelsStr)}; ${q.totalMarks} marks).</p>
      </article>
    `;
  }

  function renderPredictedView(mode) {
    const isEssay = mode === 'essays';
    const predData = getPredictionsData();
    if (!predData) {
      return `<div class="empty-box">Predicted questions data payload is not loaded.</div>`;
    }

    const allItems = isEssay ? (predData.essays || []) : (predData.mcqs || []);
    const totalAll = allItems.length;
    const totalChatgpt = allItems.filter(q => q.generator === 'chatgpt').length;
    const totalGemini = allItems.filter(q => q.generator === 'gemini').length;

    // Build unique topics list for the active generator filter
    const genFiltered = allItems.filter(q => predGenFilter === 'all' || q.generator === predGenFilter);
    const topicMap = new Map();
    genFiltered.forEach(q => {
      if (!topicMap.has(q.topic.slug)) {
        topicMap.set(q.topic.slug, {
          slug: q.topic.slug,
          raw: q.topic.raw,
          html: q.topic.html,
          generator: q.generatorLabel,
          count: 0
        });
      }
      topicMap.get(q.topic.slug).count++;
    });
    const topicsList = Array.from(topicMap.values());

    // Reset predTopicFilter if it no longer exists in the current view
    if (predTopicFilter !== 'all' && !topicMap.has(predTopicFilter)) {
      predTopicFilter = 'all';
    }

    const filtered = genFiltered.filter(q => {
      if (predTopicFilter !== 'all' && q.topic.slug !== predTopicFilter) return false;
      if (predStatusFilter === 'bookmarked' && !state.bookmarks[q.id]) return false;
      if (predStatusFilter === 'completed' && !state.completed[q.id]) return false;
      if (predStatusFilter === 'remaining' && state.completed[q.id]) return false;
      return true;
    });

    const doneInMode = allItems.filter(q => state.completed[q.id]).length;
    const instrKey = isEssay ? 'C-ESS' : 'C-MCQ';
    const fileInstrHtml = (predData.fileInstructionsHtml && predData.fileInstructionsHtml[instrKey]) || '';
    const showFileInstr = (predGenFilter === 'all' || predGenFilter === 'chatgpt') && fileInstrHtml;

    return `
      <div class="view-enter">
        <header class="page-header">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--s-2);flex-wrap:wrap">
            <div style="display:flex;align-items:center;gap:var(--s-2);flex-wrap:wrap">
              <span class="chip chip--predicted">Unofficial · AI-generated</span>
              <div class="seg" role="radiogroup" aria-label="Predicted question type">
                <button type="button" role="radio" aria-checked="${!isEssay}" data-action="nav-route" data-href="#predicted-mcqs">Predicted MCQs (${(predData.mcqs || []).length})</button>
                <button type="button" role="radio" aria-checked="${isEssay}" data-action="nav-route" data-href="#predicted-essays">Predicted Essays (${(predData.essays || []).length})</button>
              </div>
            </div>
            <span style="font-size:var(--fs-xs);color:var(--ink-3)">${doneInMode} of ${totalAll} marked complete</span>
          </div>
          <div class="page-head-row" style="margin-top:var(--s-2)">
            <div class="page-head-copy">
              <h1 class="page-title">${isEssay ? 'Predicted Essays' : 'Predicted MCQs'}</h1>
              <p class="page-desc">
                ${isEssay
                  ? `24 in-scope exam-style multi-part essay questions (12 ChatGPT Plus · GPT-6 High and 12 Gemini Pro · Gemini 4 Argon High). Out-of-scope PCR, Regression Diagnostics, and LDA essays (6 questions) are excluded.`
                  : `61 in-scope multiple-choice practice questions (31 ChatGPT Plus · GPT-6 High and 30 Gemini Pro · Gemini 4 Argon High). Out-of-scope PCR, Regression Diagnostics, and LDA MCQs (19 questions) are excluded.`
                }
              </p>
            </div>
            <div class="page-head-art" aria-hidden="true">
              ${getSectionArt('predicted')}
            </div>
          </div>
        </header>

        ${state.dismissedPredNotice ? `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:var(--s-2);margin-bottom:var(--s-3);padding:var(--s-2) var(--s-3);border-radius:var(--r-md);background:var(--predicted-bg);border:1px solid var(--predicted-border);font-size:var(--fs-xs)">
            <span><strong>AI-GENERATED PRACTICE PREDICTIONS — NOT OFFICIAL EXAM QUESTIONS.</strong> Unanswered practice only.</span>
            <button type="button" class="btn btn-ghost" data-action="toggle-pred-notice" style="min-height:26px;padding:2px 8px;font-size:var(--fs-xs)">Show full notice</button>
          </div>
        ` : `
          <section class="notice-predicted" style="margin-bottom:var(--s-4)" aria-label="Unofficial practice predictions notice">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--s-3)">
              <div style="display:flex;gap:var(--s-3);align-items:flex-start">
                <svg class="ic" width="22" height="22" style="color:var(--predicted);margin-top:2px;flex-shrink:0" aria-hidden="true"><use href="#i-predict"/></svg>
                <div>
                  <strong>AI-GENERATED PRACTICE PREDICTIONS — NOT OFFICIAL EXAM QUESTIONS.</strong>
                  These are speculative original practice questions generated by ChatGPT Plus (GPT-6 High) and Gemini Pro (Gemini 4 Argon High). They are not leaked, lecturer-approved, or guaranteed to appear on the final examination. No answer keys or grading are included—use <strong>Copy AI Prompt</strong> to study with your preferred AI tutor, and always verify external AI answers against your lecture chapters.
                </div>
              </div>
              <button type="button" class="btn btn-ghost" data-action="toggle-pred-notice" style="min-height:28px;padding:2px 8px;font-size:var(--fs-xs);flex-shrink:0" aria-label="Collapse notice">Collapse</button>
            </div>
          </section>
        `}

        <div class="callout" style="margin-bottom:var(--s-5);font-size:var(--fs-sm)">
          <strong>For AI-predicted questions:</strong> Use <strong>Copy AI Prompt</strong> and ask your preferred AI assistant for a step-by-step explanation. Dinuka has exhausted his available ChatGPT, Gemini, and Claude usage while preparing these study materials and is rather stressed! 😅 The predictions therefore come without verified worked answers. Thanks for understanding.
        </div>

        <div class="filter-bar pred-filter-bar" role="region" aria-label="Filter predicted questions" style="margin-bottom:var(--s-4)">
          <div class="filter-group">
            <span class="filter-label">AI Source:</span>
            <div class="seg" role="radiogroup" aria-label="Filter by AI generator">
              <button type="button" role="radio" aria-checked="${predGenFilter === 'all'}" data-action="set-pred-gen" data-gen="all">All (${totalAll})</button>
              <button type="button" role="radio" aria-checked="${predGenFilter === 'chatgpt'}" data-action="set-pred-gen" data-gen="chatgpt">ChatGPT (${totalChatgpt})</button>
              <button type="button" role="radio" aria-checked="${predGenFilter === 'gemini'}" data-action="set-pred-gen" data-gen="gemini">Gemini (${totalGemini})</button>
            </div>
          </div>

          <div class="filter-group">
            <span class="filter-label">Status:</span>
            <div class="seg" role="radiogroup" aria-label="Filter by study status">
              ${[
                ['all', 'All'],
                ['bookmarked', 'Bookmarked'],
                ['completed', 'Completed'],
                ['remaining', 'Remaining']
              ].map(([val, lbl]) => `
                <button type="button" role="radio" aria-checked="${predStatusFilter === val}" data-action="set-pred-status" data-status="${val}">${lbl}</button>
              `).join('')}
            </div>
          </div>

          ${predTopicFilter !== 'all' ? `
            <button type="button" class="btn btn-ghost" data-action="set-pred-topic" data-topic="all" style="min-height:30px;padding:0 10px;font-size:var(--fs-xs)">
              Clear topic filter ×
            </button>
          ` : ''}
        </div>

        <details class="pp-details" style="margin-bottom:var(--s-4)" ${predTopicFilter !== 'all' ? 'open' : ''}>
          <summary>Browse by source topic (${topicsList.length} topic sections) &amp; quick jump (${filtered.length} shown)</summary>
          <div class="pp-details-body" style="display:grid;gap:var(--s-3)">
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              <button type="button" class="chip ${predTopicFilter === 'all' ? 'is-selected' : ''}" data-action="set-pred-topic" data-topic="all" style="cursor:pointer">
                All topics (${genFiltered.length})
              </button>
              ${topicsList.map(t => `
                <button type="button" class="chip ${predTopicFilter === t.slug ? 'is-selected' : ''}" data-action="set-pred-topic" data-topic="${escapeHtml(t.slug)}" style="cursor:pointer;height:auto;padding:4px 10px;text-align:left">
                  <span>${t.html}</span>
                  <span style="opacity:.7;margin-left:4px">(${t.count})</span>
                </button>
              `).join('')}
            </div>
            ${filtered.length > 0 ? `
              <div style="border-top:1px solid var(--rule);padding-top:var(--s-2);display:flex;flex-wrap:wrap;gap:4px;align-items:center">
                <span style="font-size:var(--fs-xs);color:var(--ink-3);margin-right:4px">Jump to question:</span>
                ${filtered.map(q => `
                  <button type="button" class="chip" data-action="jump-in-page" data-target="${escapeHtml(q.id)}" style="cursor:pointer;font-family:var(--font-mono);font-size:11px">
                    ${escapeHtml(q.id)}
                  </button>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </details>

        ${showFileInstr ? `
          <details class="pp-details" style="margin-bottom:var(--s-5)">
            <summary>Source Exam Instructions &amp; Notation Conventions (ChatGPT ${isEssay ? 'Essay' : 'MCQ'} Paper)</summary>
            <div class="pp-details-body prose" style="font-size:var(--fs-sm)">
              ${fileInstrHtml}
            </div>
          </details>
        ` : ''}

        ${filtered.length === 0 ? `
          <div class="empty-box">
            <span>No predicted ${isEssay ? 'essays' : 'MCQs'} match the current filters.</span>
            <button type="button" class="btn" data-action="reset-pred-filters">Reset filters</button>
          </div>
        ` : `
          <div class="pred-cards-stack">
            ${filtered.map(q => isEssay ? renderPredictedEssayCard(q) : renderPredictedMcqCard(q)).join('')}
          </div>
        `}
      </div>
    `;
  }

  function renderBookmarksView() {
    const bmList = Object.values(state.bookmarks).sort((a, b) => (b.ts || 0) - (a.ts || 0));
    return `
      <div class="view-enter">
        <header class="page-header">
          <div class="page-head-row">
            <div class="page-head-copy">
              <h1 class="page-title">Bookmarks</h1>
              <p class="page-desc">Chapters and questions saved on this device for quick revision.</p>
            </div>
            <div class="page-head-art" aria-hidden="true">
              ${getSectionArt('bookmarks')}
            </div>
          </div>
        </header>
        ${bmList.length
          ? `<div class="group">${bmList.map(item => `
              <div class="row">
                <svg class="ic row-icon" width="20" height="20" aria-hidden="true"><use href="#i-bookmark-fill"/></svg>
                <a class="row-main" href="${escapeHtml(item.route)}" style="text-decoration:none;color:inherit">
                  <span class="row-title">${escapeHtml(item.title)}</span>
                  <span class="row-desc">${escapeHtml(item.section)}</span>
                </a>
                <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escapeHtml(item.id)}" aria-label="Remove bookmark">Remove</button>
              </div>
            `).join('')}</div>`
          : `<div class="empty-box">
              ${renderEmptyArt()}
              <span>No bookmarks yet. Tap the bookmark icon on any chapter or question to keep it here.</span>
            </div>`
        }
      </div>
    `;
  }

  function recordVisit(id, title, section, route) {
    state.lastReading = { id, title, section, route, progress: 0.25, ts: Date.now() };
    state.recent = [{ id, title, section, route, ts: Date.now() }].concat(
      (state.recent || []).filter(r => r.id !== id)
    ).slice(0, 10);
    saveState();
  }

  function updateBreadcrumbs(crumbs) {
    const ol = document.getElementById('breadcrumbs');
    if (!ol) return;
    ol.innerHTML = crumbs.map((c, idx) => {
      const isLast = idx === crumbs.length - 1;
      if (isLast) {
        return `<li><span aria-current="page">${escapeHtml(c.label)}</span></li>`;
      }
      return `<li>
        <a href="${escapeHtml(c.href)}">${escapeHtml(c.label)}</a>
        <svg class="ic crumbs-sep" width="14" height="14" aria-hidden="true"><use href="#i-chev"/></svg>
      </li>`;
    }).join('');
  }

  function updateNavHighlight(sectionKey, subId) {
    document.querySelectorAll('.sidebar .nav-item, .tabbar .tab').forEach(el => {
      const match = el.dataset.nav === sectionKey;
      if (match) el.setAttribute('aria-current', 'page');
      else el.removeAttribute('aria-current');
    });
    const chSublist = document.getElementById('nav-chapters-sublist');
    if (chSublist) {
      chSublist.hidden = sectionKey !== 'chapters';
      chSublist.querySelectorAll('.nav-subitem').forEach(el => {
        if (el.dataset.chid === subId) el.setAttribute('aria-current', 'page');
        else el.removeAttribute('aria-current');
      });
    }
    const predSublist = document.getElementById('nav-predicted-sublist');
    if (predSublist) {
      predSublist.hidden = sectionKey !== 'predicted';
      predSublist.querySelectorAll('.nav-subitem').forEach(el => {
        if (el.dataset.predmode === subId) el.setAttribute('aria-current', 'page');
        else el.removeAttribute('aria-current');
      });
    }
  }

  function renderRoute() {
    const rawHash = window.location.hash.replace(/^#/, '') || 'dashboard';
    // Scroll positions are recorded continuously per route by the scroll listener
    // (initScrollChrome). Reading window.scrollY here is unreliable because the browser
    // may already have moved/clamped the viewport before 'hashchange' fires.
    routeSwitching = true;
    setTimeout(() => { routeSwitching = false; }, 120); // safety: renderRoute has early returns
    currentRoute = rawHash;

    const main = document.getElementById('main');
    const progBar = document.querySelector('.read-progress');
    if (!main) return;

    // Close mobile sidebar drawer if open
    const appEl = document.querySelector('.app');
    const scrim = document.getElementById('sidebar-scrim');
    if (appEl) appEl.classList.remove('is-drawer-open');
    if (scrim) scrim.classList.remove('is-open');

    // Support direct chapter anchor hashes (#ch03--... or #ch03) per Lecture Guide §6.4
    let chapterTargetId = null;
    let anchorTargetId = null;
    let paperTargetId = null;
    let paperAnchorId = null;
    let worksheetTargetId = null;
    let worksheetAnchorId = null;
    let predModeTarget = null;
    let predQuestionTarget = null;

    if (rawHash.startsWith('chapter/')) {
      chapterTargetId = rawHash.split('/')[1] || 'ch01';
    } else if (/^ch(0[1-9]|1[01])(--.+)?$/.test(rawHash)) {
      chapterTargetId = rawHash.slice(0, 4);
      if (rawHash.includes('--')) anchorTargetId = rawHash;
    } else if (rawHash.startsWith('paper/')) {
      const parts = rawHash.split('/');
      paperTargetId = parts[1] || 'b19-final-2022-07';
      if (parts[2]) paperAnchorId = parts[2];
    } else if (rawHash.startsWith('worksheet/')) {
      worksheetTargetId = rawHash.split('/')[1] || 'pq01';
    } else if (/^pq0[1-5](--.+)?$/.test(rawHash)) {
      worksheetTargetId = rawHash.slice(0, 4);
      if (rawHash.includes('--')) worksheetAnchorId = rawHash;
    } else if (/^PQ0[1-5]-Q\d+/.test(rawHash)) {
      worksheetTargetId = rawHash.slice(0, 4).toLowerCase();
      worksheetAnchorId = rawHash;
    } else if (/^[CG]-MCQ-\d{3}$/i.test(rawHash)) {
      predModeTarget = 'mcqs';
      predQuestionTarget = rawHash.toUpperCase();
    } else if (/^[CG]-ESS-\d{3}$/i.test(rawHash)) {
      predModeTarget = 'essays';
      predQuestionTarget = rawHash.toUpperCase();
    } else if (rawHash.startsWith('predicted-mcqs/')) {
      predModeTarget = 'mcqs';
      predQuestionTarget = (rawHash.split('/')[1] || '').toUpperCase();
    } else if (rawHash.startsWith('predicted-essays/')) {
      predModeTarget = 'essays';
      predQuestionTarget = (rawHash.split('/')[1] || '').toUpperCase();
    }

    if (!chapterTargetId && !worksheetTargetId && window.DA2451_READER) {
      window.DA2451_READER.teardown();
    }

    if (rawHash === 'dashboard' || rawHash === '') {
      if (progBar) progBar.hidden = true;
      updateBreadcrumbs([{ label: 'DA2451', href: '#dashboard' }, { label: 'Dashboard' }]);
      updateNavHighlight('dashboard');
      main.innerHTML = renderDashboard();
      initCountdown();
    } else if (rawHash === 'chapters') {
      if (progBar) progBar.hidden = true;
      updateBreadcrumbs([{ label: 'DA2451', href: '#dashboard' }, { label: 'Learning Chapters' }]);
      updateNavHighlight('chapters');
      main.innerHTML = renderChaptersList();
    } else if (chapterTargetId) {
      const ch = DATA.chapters.find(c => c.id === chapterTargetId) || DATA.chapters[0];
      if (progBar) progBar.hidden = false;
      updateBreadcrumbs([
        { label: 'DA2451', href: '#dashboard' },
        { label: 'Learning Chapters', href: '#chapters' },
        { label: 'Chapter ' + Number(ch.pos) + ' · ' + ch.title }
      ]);
      updateNavHighlight('chapters', ch.id);
      main.innerHTML = renderChapterShell(ch.id, anchorTargetId);
      if (window.DA2451_READER) {
        window.DA2451_READER.afterChapterMount(ch.id, {
          targetAnchor: anchorTargetId,
          onSectionChange(tocItem) {
            if (!state.chapterPositions) state.chapterPositions = {};
            const cleanHeading = String(tocItem.raw || '').replace(/\[(?:SOURCE|TEACHING|CORRECTION|Lecture)[^\]]*\]/gi, '').replace(/[`*]/g, '').trim();
            state.chapterPositions[ch.id] = {
              headingId: tocItem.id,
              headingTitle: cleanHeading,
              ts: Date.now()
            };
            state.lastReading = {
              id: ch.id,
              title: 'Chapter ' + Number(ch.pos) + ' · ' + ch.title + (cleanHeading ? ' · ' + cleanHeading : ''),
              section: 'Learning Chapters',
              route: '#' + tocItem.id,
              progress: Math.min(1, Math.max(0.08, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight))),
              ts: Date.now()
            };
            saveState();
          }
        });
      }
      if (anchorTargetId) return;
    } else if (rawHash === 'papers') {
      if (progBar) progBar.hidden = true;
      updateBreadcrumbs([{ label: 'DA2451', href: '#dashboard' }, { label: 'Past Papers' }]);
      updateNavHighlight('papers');
      main.innerHTML = renderPapersList();
    } else if (paperTargetId) {
      const p = DATA.papers.find(x => x.id === paperTargetId) || DATA.papers[0];
      if (progBar) progBar.hidden = false;
      updateBreadcrumbs([
        { label: 'DA2451', href: '#dashboard' },
        { label: 'Past Papers', href: '#papers' },
        { label: 'Batch ' + p.batch + ' · ' + p.title }
      ]);
      updateNavHighlight('papers', p.id);
      main.innerHTML = renderPaperShell(p.id);
      if (paperAnchorId) {
        setTimeout(() => {
          const el = document.getElementById(paperAnchorId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.classList.add('heading-flash');
            setTimeout(() => el.classList.remove('heading-flash'), 750);
          }
        }, 25);
        return;
      }
    } else if (rawHash === 'practice') {
      if (progBar) progBar.hidden = true;
      updateBreadcrumbs([{ label: 'DA2451', href: '#dashboard' }, { label: 'Practice Questions' }]);
      updateNavHighlight('practice');
      main.innerHTML = renderPracticeList();
    } else if (worksheetTargetId) {
      const w = DATA.worksheets.find(x => x.id === worksheetTargetId) || DATA.worksheets[0];
      if (progBar) progBar.hidden = false;
      updateBreadcrumbs([
        { label: 'DA2451', href: '#dashboard' },
        { label: 'Practice Questions', href: '#practice' },
        { label: w.title + ': ' + w.topic }
      ]);
      updateNavHighlight('practice', w.id);
      main.innerHTML = renderWorksheetShell(w.id, worksheetAnchorId);
      if (window.DA2451_READER && typeof window.DA2451_READER.afterWorksheetMount === 'function') {
        window.DA2451_READER.afterWorksheetMount(w.id, { targetAnchor: worksheetAnchorId });
      }
      if (worksheetAnchorId) return;
    } else if (rawHash === 'predicted' || rawHash === 'predicted-mcqs' || predModeTarget === 'mcqs') {
      if (progBar) progBar.hidden = false;
      if (predQuestionTarget) {
        predGenFilter = 'all';
        predStatusFilter = 'all';
        predTopicFilter = 'all';
      }
      updateBreadcrumbs([
        { label: 'DA2451', href: '#dashboard' },
        { label: 'Predicted Questions', href: '#predicted-mcqs' },
        { label: 'Predicted MCQs' }
      ]);
      updateNavHighlight('predicted', 'mcqs');
      main.innerHTML = renderPredictedView('mcqs');
      if (predQuestionTarget) {
        setTimeout(() => {
          const el = document.getElementById(predQuestionTarget);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.classList.add('heading-flash');
            setTimeout(() => el.classList.remove('heading-flash'), 800);
          }
        }, 25);
        return;
      }
    } else if (rawHash === 'predicted-essays' || predModeTarget === 'essays') {
      if (progBar) progBar.hidden = false;
      if (predQuestionTarget) {
        predGenFilter = 'all';
        predStatusFilter = 'all';
        predTopicFilter = 'all';
      }
      updateBreadcrumbs([
        { label: 'DA2451', href: '#dashboard' },
        { label: 'Predicted Questions', href: '#predicted-mcqs' },
        { label: 'Predicted Essays' }
      ]);
      updateNavHighlight('predicted', 'essays');
      main.innerHTML = renderPredictedView('essays');
      if (predQuestionTarget) {
        setTimeout(() => {
          const el = document.getElementById(predQuestionTarget);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.classList.add('heading-flash');
            setTimeout(() => el.classList.remove('heading-flash'), 800);
          }
        }, 25);
        return;
      }
    } else if (rawHash === 'bookmarks') {
      if (progBar) progBar.hidden = true;
      updateBreadcrumbs([{ label: 'DA2451', href: '#dashboard' }, { label: 'Bookmarks' }]);
      updateNavHighlight('bookmarks');
      main.innerHTML = renderBookmarksView();
    } else {
      window.location.hash = '#dashboard';
      return;
    }

    // Only long reading routes (chapter / past paper / worksheet) resume a saved position, and
    // only if it is still valid for the freshly rendered content (clamped to the real scrollable
    // range). Dashboard, libraries, predictions, bookmarks always open at the top.
    const isReadingRoute = /^(chapter|paper|worksheet)\//.test(rawHash);
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const savedY = isReadingRoute ? Math.max(0, scrollPositions[rawHash] || 0) : 0;
    window.scrollTo(0, Math.min(savedY, maxY));
    routeSwitching = false;
  }

  /* ---------- 10. Scroll-Linked Chrome (§14.10) ---------- */
  function initScrollChrome() {
    const top = document.querySelector('.topbar');
    const bar = document.querySelector('.read-progress');
    const tab = document.querySelector('.tabbar');
    let y0 = window.scrollY;
    let busy = false;

    window.addEventListener('scroll', () => {
      if (busy) return;
      busy = true;
      requestAnimationFrame(() => {
        const el = document.documentElement;
        const y = el.scrollTop || window.scrollY;
        if (!routeSwitching) scrollPositions[currentRoute] = y;
        if (top) top.classList.toggle('is-scrolled', y > 8);
        if (bar && !bar.hidden) {
          const max = el.scrollHeight - el.clientHeight;
          const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
          bar.style.transform = 'scaleX(' + p + ')';
        }
        if (tab && Math.abs(y - y0) > 8) {
          tab.classList.toggle('is-hidden', y > y0 && y > 120);
          y0 = y;
        }
        busy = false;
      });
    }, { passive: true });
  }

  /* ---------- 11. Delegated Click, Change & Keyboard Listeners (§6.12) ---------- */
  function openDialog(id) {
    const dlg = document.getElementById(id);
    if (!dlg) return;
    if (typeof dlg.showModal === 'function') {
      if (!dlg.open) dlg.showModal();
    } else {
      dlg.setAttribute('open', '');
    }
  }

  function closeDialog(dlg) {
    if (!dlg) return;
    if (typeof dlg.close === 'function' && dlg.open) dlg.close();
    else dlg.removeAttribute('open');
  }

  function navigateTo(targetHash) {
    const h = String(targetHash || '#dashboard').startsWith('#')
      ? String(targetHash || '#dashboard')
      : ('#' + String(targetHash));
    if (window.location.hash !== h) {
      window.location.hash = h;
    } else {
      renderRoute();
    }
  }

  document.addEventListener('click', e => {
    // 1. Check if a nested button/link with a specific [data-action] (other than row wrapper nav-route) was clicked first
    const actionEl = e.target.closest('[data-action]');
    const directLink = e.target.closest('a[href^="#"]');

    // If user clicked a plain <a href="#..."> (inside or outside a row) that has no data-action:
    if (directLink && !directLink.hasAttribute('data-action') && (!actionEl || actionEl.contains(directLink)) && !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      const href = directLink.getAttribute('href') || '';
      const m = href.match(/^#(ch(?:0[1-9]|1[01]))--(.+)$/);
      if (m && window.DA2451_READER && (currentRoute === 'chapter/' + m[1] || currentRoute.startsWith(m[1]))) {
        e.preventDefault();
        window.DA2451_READER.jumpToChapterAnchor(m[1], href.slice(1));
        return;
      }
      const pm = href.match(/^#(pq0[1-5])--(.+)$/);
      if (pm && window.DA2451_READER && (currentRoute === 'worksheet/' + pm[1] || currentRoute.startsWith(pm[1]))) {
        e.preventDefault();
        window.DA2451_READER.jumpToWorksheetAnchor(pm[1], href.slice(1));
        return;
      }
      e.preventDefault();
      navigateTo(href);
      return;
    }

    const btn = actionEl;
    if (!btn) {
      // Close dialog on backdrop click
      if (e.target.tagName === 'DIALOG') {
        closeDialog(e.target);
      }
      return;
    }

    const action = btn.dataset.action;
    if (action === 'toc-jump') {
      e.preventDefault();
      const chId = btn.dataset.chid;
      const target = btn.dataset.target;
      closeDialog(document.getElementById('dlg-mobile-toc'));
      if (window.DA2451_READER && chId && target) {
        window.DA2451_READER.jumpToChapterAnchor(chId, target);
      }
      return;
    } else if (action === 'pq-toc-jump') {
      e.preventDefault();
      const pqId = btn.dataset.pqid;
      const target = btn.dataset.target;
      closeDialog(document.getElementById('dlg-mobile-toc'));
      if (window.DA2451_READER && pqId && target) {
        window.DA2451_READER.jumpToWorksheetAnchor(pqId, target);
      }
      return;
    } else if (action === 'open-pq-mobile-toc') {
      if (window.DA2451_READER) window.DA2451_READER.openPqMobileTocSheet(btn.dataset.pqid);
      return;
    } else if (action === 'jump-in-page') {
      e.preventDefault();
      const targetEl = document.getElementById(btn.dataset.target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetEl.classList.add('heading-flash');
        setTimeout(() => targetEl.classList.remove('heading-flash'), 750);
      }
      return;
    } else if (action === 'paper-reveal-all' || action === 'pq-reveal-all') {
      const open = btn.dataset.open !== 'true';
      btn.dataset.open = String(open);
      const lbl = btn.querySelector('.btn-label');
      if (lbl) {
        lbl.textContent = action === 'paper-reveal-all'
          ? (open ? 'Hide all answers' : 'Show all answers')
          : (open ? 'Hide all teaching solutions' : 'Show all teaching solutions');
      }
      document.querySelectorAll('#main .btn-reveal').forEach(rBtn => {
        const pId = rBtn.getAttribute('aria-controls');
        const panel = pId ? document.getElementById(pId) : null;
        if (panel) setReveal(rBtn, panel, open);
      });
      return;
    } else if (action === 'question-reveal-all') {
      const open = btn.dataset.open !== 'true';
      btn.dataset.open = String(open);
      const card = document.getElementById(btn.dataset.qcard);
      if (card) {
        const rBtns = card.querySelectorAll('.btn-reveal');
        rBtns.forEach(rBtn => {
          const pId = rBtn.getAttribute('aria-controls');
          const panel = pId ? document.getElementById(pId) : null;
          if (panel) setReveal(rBtn, panel, open);
        });
        const lbl = btn.querySelector('.btn-label');
        if (lbl) {
          lbl.textContent = open
            ? `Hide all ${rBtns.length} part solutions`
            : `Show all ${rBtns.length} part solutions`;
        }
      }
      return;
    } else if (action === 'set-paper-batch') {
      paperBatchFilter = btn.dataset.batch || 'all';
      renderRoute();
      return;
    } else if (action === 'set-paper-type') {
      paperTypeFilter = btn.dataset.type || 'all';
      renderRoute();
      return;
    } else if (action === 'reset-paper-filters') {
      paperBatchFilter = 'all';
      paperTypeFilter = 'all';
      renderRoute();
      return;
    } else if (action === 'set-pred-gen') {
      predGenFilter = btn.dataset.gen || 'all';
      renderRoute();
      return;
    } else if (action === 'set-pred-status') {
      predStatusFilter = btn.dataset.status || 'all';
      renderRoute();
      return;
    } else if (action === 'set-pred-topic') {
      predTopicFilter = btn.dataset.topic || 'all';
      renderRoute();
      return;
    } else if (action === 'reset-pred-filters') {
      predGenFilter = 'all';
      predStatusFilter = 'all';
      predTopicFilter = 'all';
      renderRoute();
      return;
    } else if (action === 'toggle-pred-notice') {
      state.dismissedPredNotice = !state.dismissedPredNotice;
      saveState();
      renderRoute();
      return;
    } else if (action === 'clear-mcq-pick') {
      const qid = btn.dataset.qid;
      if (qid && state.mcqPicks) {
        delete state.mcqPicks[qid];
        saveState();
        renderRoute();
      }
      return;
    } else if (action === 'open-pdf') {
      if (window.DA2451_READER) window.DA2451_READER.openPdfViewer(btn.dataset.chid, false);
      return;
    } else if (action === 'open-pdf-from-list') {
      e.stopPropagation();
      const chId = btn.dataset.chid || 'ch01';
      navigateTo('#chapter/' + chId);
      requestAnimationFrame(() => {
        if (window.DA2451_READER) window.DA2451_READER.openPdfViewer(chId, false);
      });
      return;
    } else if (action === 'preview-task3-card') {
      const targetId = btn.dataset.target || 'sample-pp-q1';
      const card = document.getElementById(targetId);
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        card.classList.add('heading-flash');
        setTimeout(() => card.classList.remove('heading-flash'), 800);
      }
      if (btn.dataset.msg) toast(btn.dataset.msg, 3200);
      return;
    } else if (action === 'close-pdf') {
      if (window.DA2451_READER) window.DA2451_READER.closePdfViewer();
      return;
    } else if (action === 'toggle-split-pdf') {
      if (window.DA2451_READER) window.DA2451_READER.toggleSplitPdf(btn.dataset.chid);
      return;
    } else if (action === 'save-pdf') {
      if (window.DA2451_READER) window.DA2451_READER.saveOriginalPdf(btn.dataset.chid);
      return;
    } else if (action === 'open-pdf-tab') {
      if (window.DA2451_READER) window.DA2451_READER.openPdfInNewTab(btn.dataset.chid);
      return;
    } else if (action === 'open-mobile-toc') {
      if (window.DA2451_READER) window.DA2451_READER.openMobileTocSheet(btn.dataset.chid);
      return;
    } else if (action === 'toggle-toc-rail') {
      if (window.DA2451_READER) window.DA2451_READER.toggleTocRail();
      return;
    } else if (action === 'toggle-toc-subsections') {
      if (window.DA2451_READER) window.DA2451_READER.toggleTocSubsections();
      return;
    } else if (action === 'hydrate-all') {
      if (window.DA2451_READER) {
        window.DA2451_READER.hydrateAllForCurrent();
        toast('All chapter sections loaded');
      }
      return;
    } else if (action === 'copy-code') {
      const card = btn.closest('.code-card');
      const codeEl = card ? card.querySelector('pre code') : null;
      copyWithFeedback(btn, codeEl ? codeEl.textContent : '', 'Code copied to clipboard.');
      return;
    } else if (action === 'copy-tex') {
      const blk = btn.closest('.math-block');
      copyWithFeedback(btn, blk ? (blk.dataset.tex || '') : '', 'TeX formula copied to clipboard.');
      return;
    } else if (action === 'scroll-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    } else if (action === 'dismiss-resume-banner') {
      document.getElementById('chapter-resume-banner')?.remove();
      return;
    }

    if (action === 'toggle-theme') {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    } else if (action === 'set-theme') {
      applyTheme(btn.dataset.themeOpt || 'system');
    } else if (action === 'welcome-pick') {
      const chosen = btn.dataset.themeOpt || 'light';
      document.querySelectorAll('.theme-tile').forEach(t => {
        t.setAttribute('aria-checked', String(t.dataset.themeOpt === chosen));
      });
      applyTheme(chosen);
    } else if (action === 'welcome-continue') {
      const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      applyTheme(cur);
      closeDialog(document.getElementById('dlg-welcome'));
    } else if (action === 'welcome-system') {
      applyTheme('system');
      closeDialog(document.getElementById('dlg-welcome'));
    } else if (action === 'toggle-sidebar') {
      if (window.innerWidth < 1200) {
        const appEl = document.querySelector('.app');
        const scrim = document.getElementById('sidebar-scrim');
        const open = !appEl.classList.contains('is-drawer-open');
        appEl.classList.toggle('is-drawer-open', open);
        if (scrim) scrim.classList.toggle('is-open', open);
      } else {
        state.sidebarCollapsed = !state.sidebarCollapsed;
        saveState();
        applyReadingPrefs();
      }
    } else if (action === 'close-drawer') {
      document.querySelector('.app')?.classList.remove('is-drawer-open');
      document.getElementById('sidebar-scrim')?.classList.remove('is-open');
    } else if (action === 'open-search') {
      openDialog('dlg-search');
      if (window.DA2451_SEARCH) window.DA2451_SEARCH.open();
      setTimeout(() => document.getElementById('search-input')?.focus(), 30);
    } else if (action === 'open-settings') {
      syncSettingsUI();
      openDialog('dlg-settings');
    } else if (action === 'open-about') {
      openDialog('dlg-about');
    } else if (action === 'open-shortcuts') {
      openDialog('dlg-shortcuts');
    } else if (action === 'close-dialog') {
      closeDialog(btn.closest('dialog'));
    } else if (action === 'reveal') {
      toggleReveal(btn);
    } else if (action === 'copy-prompt') {
      const txt = buildPrompt(btn.dataset.qid);
      copyWithFeedback(btn, txt, 'Prompt copied. Paste it into your AI assistant.');
    } else if (action === 'copy-raw') {
      let rawTxt = btn.dataset.copy || '';
      if (!rawTxt && btn.dataset.qid) {
        const pItem = getPredictedItem(btn.dataset.qid);
        if (pItem) rawTxt = pItem.sourceMd || '';
      }
      copyWithFeedback(btn, rawTxt, 'Question copied to clipboard.');
    } else if (action === 'open-new-tab') {
      const href = btn.dataset.href || '#dashboard';
      const url = window.location.href.split('#')[0] + href;
      const win = window.open(url, '_blank', 'noopener');
      if (!win) {
        window.location.hash = href;
      }
    } else if (action === 'nav-route') {
      navigateTo(btn.dataset.href || '#dashboard');
    } else if (action === 'toggle-complete') {
      const id = btn.dataset.id;
      if (!id) return;
      state.completed[id] = !state.completed[id];
      saveState();
      renderRoute();
      renderSidebarChapters();
      announce(state.completed[id] ? 'Marked complete' : 'Marked incomplete');
    } else if (action === 'toggle-bookmark') {
      const id = btn.dataset.id;
      if (!id) return;
      if (state.bookmarks[id]) {
        delete state.bookmarks[id];
        announce('Bookmark removed');
      } else {
        state.bookmarks[id] = {
          id,
          title: btn.dataset.title || id,
          section: btn.dataset.section || 'Study Item',
          route: btn.dataset.route || window.location.hash || '#dashboard',
          ts: Date.now()
        };
        announce('Bookmarked');
      }
      saveState();
      renderRoute();
    } else if (action === 'adjust-font-size') {
      const step = parseInt(btn.dataset.step || '0', 10);
      const cur = state.readFontSize || 16;
      state.readFontSize = Math.min(22, Math.max(12, cur + step));
      state.readScale = state.readFontSize / 16;
      saveState();
      applyReadingPrefs();
      syncSettingsUI();
    } else if (action === 'set-font-size') {
      const sz = parseInt(btn.dataset.size || '16', 10);
      state.readFontSize = Math.min(22, Math.max(12, sz));
      state.readScale = state.readFontSize / 16;
      saveState();
      applyReadingPrefs();
      syncSettingsUI();
    } else if (action === 'set-scale') {
      const sc = parseFloat(btn.dataset.scale || '1');
      state.readFontSize = Math.min(22, Math.max(12, Math.round(sc * 16)));
      state.readScale = state.readFontSize / 16;
      saveState();
      applyReadingPrefs();
      syncSettingsUI();
    } else if (action === 'set-measure') {
      state.measure = btn.dataset.measure || '44rem';
      saveState();
      applyReadingPrefs();
      syncSettingsUI();
    } else if (action === 'set-font') {
      state.fontRead = btn.dataset.font || 'sans';
      saveState();
      applyReadingPrefs();
      syncSettingsUI();
    } else if (action === 'set-motion') {
      state.motion = btn.dataset.motion || 'system';
      saveState();
      applyReadingPrefs();
      syncSettingsUI();
    } else if (action === 'export-data') {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'DA2451_Study_Progress.json';
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast('Study data exported');
    } else if (action === 'reset-data') {
      if (window.confirm('Reset all bookmarks, completed items, and reading positions on this device?')) {
        state = Object.assign({}, defaultState);
        saveState();
        applyReadingPrefs();
        renderRoute();
        renderSidebarChapters();
        toast('Study progress reset');
      }
    } else if (action === 'dismiss-storage-banner') {
      state.dismissedStorageBanner = true;
      saveState();
      renderRoute();
    } else if (action === 'toggle-focus') {
      document.querySelector('.app')?.classList.toggle('is-focus');
    } else if (action === 'scroll-article') {
      document.getElementById('chapter-article-body')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'toast-msg') {
      toast(btn.dataset.msg || '');
    }
  });

  // MCQ neutral radio pick handler (§14.4) + include-pick checkbox
  document.addEventListener('change', e => {
    const incCb = e.target.closest('input[type="checkbox"][data-action="toggle-include-pick"]');
    if (incCb) {
      const qid = incCb.dataset.qid;
      if (qid) {
        if (!state.includePickInPrompt) state.includePickInPrompt = {};
        state.includePickInPrompt[qid] = Boolean(incCb.checked);
        saveState();
      }
      return;
    }

    const r = e.target.closest('.opt input[type="radio"]');
    if (!r) return;
    const qid = r.dataset.qid;
    if (qid) {
      state.mcqPicks[qid] = r.value;
      saveState();
    }
    const opts = r.closest('.opts');
    if (opts) {
      opts.querySelectorAll('.opt').forEach(o => {
        o.classList.toggle('is-picked', o.contains(r) && r.checked);
      });
    }
  });

  // Settings font-size slider & Personal notes textarea auto-save
  document.addEventListener('input', e => {
    const fsSlider = e.target.closest('#setting-font-size-slider');
    if (fsSlider) {
      const val = parseInt(fsSlider.value, 10);
      if (!isNaN(val)) {
        state.readFontSize = Math.min(22, Math.max(12, val));
        state.readScale = state.readFontSize / 16;
        saveState();
        applyReadingPrefs();
        syncSettingsUI();
      }
      return;
    }

    const ta = e.target.closest('.pred-note-ta');
    if (!ta) return;
    const qid = ta.getAttribute('data-note-qid');
    if (qid) {
      if (!state.predNotes) state.predNotes = {};
      state.predNotes[qid] = ta.value;
      saveState();
    }
  });

  // Global keyboard shortcuts (§6.12)
  let gPressedAt = 0;
  document.addEventListener('keydown', e => {
    const inField = e.target.matches('input, textarea, select, [contenteditable="true"]');
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
      if (window.DA2451_READER) window.DA2451_READER.hydrateAllForCurrent();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openDialog('dlg-search');
      if (window.DA2451_SEARCH) window.DA2451_SEARCH.open();
      setTimeout(() => document.getElementById('search-input')?.focus(), 30);
      return;
    }
    if (e.key === 'Escape') {
      const pdfOverlay = document.getElementById('pdf-overlay');
      if (pdfOverlay && !pdfOverlay.hidden && window.DA2451_READER) {
        window.DA2451_READER.closePdfViewer();
        return;
      }
      const appEl = document.querySelector('.app');
      if (appEl && appEl.classList.contains('is-focus')) {
        appEl.classList.remove('is-focus');
        return;
      }
    }
    if (inField || e.ctrlKey || e.metaKey || e.altKey) return;

    if (e.key === '/') {
      e.preventDefault();
      openDialog('dlg-search');
      if (window.DA2451_SEARCH) window.DA2451_SEARCH.open();
      setTimeout(() => document.getElementById('search-input')?.focus(), 30);
    } else if (e.key === '[') {
      e.preventDefault();
      state.sidebarCollapsed = !state.sidebarCollapsed;
      saveState();
      applyReadingPrefs();
    } else if (e.key === '?') {
      e.preventDefault();
      openDialog('dlg-shortcuts');
    } else if (e.key.toLowerCase() === 'r') {
      const revBtn = document.querySelector('.btn-reveal');
      if (revBtn) {
        e.preventDefault();
        toggleReveal(revBtn);
      }
    } else if (e.key.toLowerCase() === 'b') {
      const bmBtn = document.querySelector('[data-action="toggle-bookmark"]');
      if (bmBtn) {
        e.preventDefault();
        bmBtn.click();
      }
    } else if (e.key.toLowerCase() === 'g') {
      gPressedAt = Date.now();
    } else if (Date.now() - gPressedAt < 900) {
      const k = e.key.toLowerCase();
      gPressedAt = 0;
      if (k === 'h') window.location.hash = '#dashboard';
      else if (k === 'c') window.location.hash = '#chapters';
      else if (k === 'p') window.location.hash = '#papers';
      else if (k === 'q') window.location.hash = '#practice';
      else if (k === 'm') window.location.hash = '#predicted-mcqs';
    }
  });

  function syncSettingsUI() {
    const pref = document.documentElement.getAttribute('data-theme-pref') || 'system';
    document.querySelectorAll('[data-theme-opt]').forEach(b => {
      b.setAttribute('aria-checked', String(b.dataset.themeOpt === pref));
    });
    const fs = Math.min(22, Math.max(12, parseInt(state.readFontSize || 16, 10)));
    const fsInd = document.getElementById('setting-fs-indicator');
    if (fsInd) fsInd.textContent = `${fs}px`;
    const fsSlider = document.getElementById('setting-font-size-slider');
    if (fsSlider) fsSlider.value = String(fs);
    document.querySelectorAll('.fs-preset-ticks span').forEach(b => {
      b.classList.toggle('is-active', parseInt(b.dataset.size, 10) === fs);
    });
    document.querySelectorAll('[data-action="set-scale"]').forEach(b => {
      b.setAttribute('aria-checked', String(parseFloat(b.dataset.scale) === (state.readScale || 1)));
    });
    document.querySelectorAll('[data-action="set-measure"]').forEach(b => {
      b.setAttribute('aria-checked', String(b.dataset.measure === (state.measure || '44rem')));
    });
    document.querySelectorAll('[data-action="set-font"]').forEach(b => {
      b.setAttribute('aria-checked', String(b.dataset.font === (state.fontRead || 'sans')));
    });
    document.querySelectorAll('[data-action="set-motion"]').forEach(b => {
      b.setAttribute('aria-checked', String(b.dataset.motion === (state.motion || 'system')));
    });
    const stLine = document.getElementById('settings-storage-status');
    if (stLine) {
      stLine.textContent = storageAvailable
        ? 'Local browser storage is active on this device.'
        : 'Local storage is restricted in this browser mode; session memory is used.';
    }
  }

  function renderSidebarChapters() {
    const sub = document.getElementById('nav-chapters-sublist');
    if (!sub) return;
    sub.innerHTML = DATA.chapters.map(ch => {
      const done = Boolean(state.completed[ch.id]);
      return `
        <a class="nav-subitem" href="#chapter/${escapeHtml(ch.id)}" data-chid="${escapeHtml(ch.id)}" title="${escapeHtml(ch.title)}">
          <span class="ch-num">${escapeHtml(ch.pos)}</span>
          <span class="nav-label">${escapeHtml(ch.title)}</span>
          ${ch.kind === 'supplementary' ? `<span class="chip chip--dashed" style="height:18px;padding:0 4px;font-size:10px">Suppl.</span>` : ''}
          ${done ? renderRingSvg(true, 'Completed') : ''}
        </a>
      `;
    }).join('');
  }

  /* ---------- 12. Boot Sequence ---------- */
  function init() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    applyReadingPrefs();
    renderSidebarChapters();
    initScrollChrome();
    if (window.DA2451_SEARCH && typeof window.DA2451_SEARCH.init === 'function') {
      window.DA2451_SEARCH.init();
    }
    window.addEventListener('hashchange', renderRoute);
    renderRoute();

    const pref = document.documentElement.getAttribute('data-theme-pref');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    updateThemeButtons(isDark, pref === 'unset' ? 'system' : pref);

    // Show First-Launch Welcome Sheet if theme preference is unset (§6.10)
    if (pref === 'unset') {
      const dlg = document.getElementById('dlg-welcome');
      if (dlg) {
        document.querySelectorAll('.theme-tile').forEach(t => {
          t.setAttribute('aria-checked', String(t.dataset.themeOpt === (isDark ? 'dark' : 'light')));
        });
        openDialog('dlg-welcome');
      }
    }
  }

  window.DA2451_APP = {
    buildPrompt,
    getPredictionsData,
    getPredictedItem
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
