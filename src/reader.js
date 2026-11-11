/* ==========================================================================
   DA2451 Multivariate Methods in Business — Lecture & PDF Reader (Task 2)
   Handles on-demand chapter JSON hydration, TOC scroll-spy, anchor routing,
   and lazy base64 -> Blob PDF decoding with memory cleanup.
   ========================================================================== */
(function () {
  'use strict';

  const chapterCache = {};     // chId -> parsed { meta, toc, chunks, anchorToChunk }
  const paperCache = {};       // paperId -> parsed paper JSON
  const worksheetCache = {};   // pqId -> parsed worksheet JSON
  let activeChId = null;
  let activePqId = null;
  let hydratedChunks = new Set();
  let chunkObserver = null;
  let headingObserver = null;
  let activeHeadingId = null;

  // PDF Blob URL state management
  let activePdfChId = null;
  let activePdfBlobUrl = null;
  const newTabPdfUrls = new Set();
  let isSplitMode = false;

  function escHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stripTags(html) {
    return String(html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  }

  /* ---------- 1. Lazy Chapter Data Loader ---------- */
  function getChapterData(chId) {
    if (chapterCache[chId]) return chapterCache[chId];
    const el = document.getElementById('ch-data-' + chId);
    if (!el) return null;
    try {
      const parsed = JSON.parse(el.textContent);
      chapterCache[chId] = parsed;
      return parsed;
    } catch (e) {
      console.error('Failed to parse chapter data for', chId, e);
      return null;
    }
  }

  /* ---------- 2. Lazy PDF Base64 -> Blob Decoder ---------- */
  function decodePdfToBlobUrl(chId) {
    if (activePdfChId === chId && activePdfBlobUrl) {
      return activePdfBlobUrl;
    }
    cleanupPdfBlobUrl();

    const el = document.getElementById('pdf-b64-' + chId);
    if (!el) return null;
    const b64 = el.textContent.trim();
    if (!b64) return null;

    try {
      const binStr = window.atob(b64);
      const len = binStr.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binStr.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      activePdfChId = chId;
      activePdfBlobUrl = url;
      return url;
    } catch (e) {
      console.error('Failed to decode PDF for', chId, e);
      return null;
    }
  }

  function cleanupPdfBlobUrl() {
    if (activePdfBlobUrl && !newTabPdfUrls.has(activePdfBlobUrl)) {
      try { URL.revokeObjectURL(activePdfBlobUrl); } catch (e) {}
    }
    activePdfBlobUrl = null;
    activePdfChId = null;
  }

  /* ---------- 3. PDF Viewer Controls (Overlay, Split View, New Tab, Save) ---------- */
  function openPdfViewer(chId, split = false) {
    const chData = getChapterData(chId);
    const meta = chData ? chData.meta : { id: chId, title: chId, pdf: chId + '.pdf' };
    const url = decodePdfToBlobUrl(chId);

    if (split && window.innerWidth >= 1100) {
      isSplitMode = true;
      closePdfOverlayOnly();
      const shell = document.getElementById('chapter-shell');
      const pane = document.getElementById('pdf-split-pane');
      if (shell && pane) {
        shell.classList.add('is-split');
        pane.hidden = false;
        pane.innerHTML = renderPdfPaneHtml(meta, url, true);
        return;
      }
    }

    isSplitMode = false;
    const shell = document.getElementById('chapter-shell');
    const pane = document.getElementById('pdf-split-pane');
    if (shell) shell.classList.remove('is-split');
    if (pane) {
      pane.hidden = true;
      pane.innerHTML = '';
    }

    let overlay = document.getElementById('pdf-overlay');
    if (!overlay) {
      overlay = document.createElement('section');
      overlay.id = 'pdf-overlay';
      overlay.className = 'pdf-overlay';
      overlay.setAttribute('role', 'region');
      overlay.setAttribute('aria-label', 'Original Lecture PDF Viewer');
      document.body.appendChild(overlay);
    }
    overlay.hidden = false;
    overlay.innerHTML = renderPdfPaneHtml(meta, url, false);
    const backBtn = overlay.querySelector('[data-action="close-pdf"]');
    if (backBtn) backBtn.focus();
  }

  function renderPdfPaneHtml(meta, blobUrl, isSplit) {
    if (!blobUrl) {
      return `
        <div class="pdf-bar">
          <div class="pdf-bar-left">
            <button type="button" class="btn" data-action="close-pdf" aria-label="Back to teaching chapter">
              <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-chev-left"/></svg>
              <span>${isSplit ? 'Close split' : 'Back to chapter'}</span>
            </button>
            <div style="min-width:0">
              <div class="pdf-bar-title">Original PDF · ${escHtml(meta.title)}</div>
              <div class="pdf-bar-sub">${escHtml(meta.pdf)} · Original lecture PDF, not the teaching chapter</div>
            </div>
          </div>
          <div class="pdf-bar-actions">
            <button type="button" class="btn btn-split-pdf" data-action="toggle-split-pdf" data-chid="${escHtml(meta.id)}" title="${isSplit ? 'Switch to full overlay' : 'Side-by-side split view'}">
              <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-split"/></svg>
              <span>${isSplit ? 'Full view' : 'Split view'}</span>
            </button>
            <button type="button" class="btn" data-action="save-pdf" data-chid="${escHtml(meta.id)}" aria-label="Save Original PDF (${escHtml(meta.pdf)})" disabled title="Original lecturer PDFs are not included in this public GitHub version.">
              <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-download"/></svg>
              <span>Save PDF</span>
            </button>
            <button type="button" class="btn btn-ghost" data-action="open-pdf-tab" data-chid="${escHtml(meta.id)}" title="Original lecturer PDFs are not included in this public GitHub version." aria-label="Open PDF in new tab" disabled>
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
            </button>
          </div>
        </div>
        <div class="pdf-stage">
          <div style="flex:1;display:grid;place-items:center;min-height:360px;padding:var(--s-6);box-sizing:border-box">
            <div class="sys-banner" style="max-width:560px;text-align:center;font-size:var(--fs-sm);padding:var(--s-4) var(--s-5)">
              Original lecturer PDFs are not included in this public GitHub version.
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="pdf-bar">
        <div class="pdf-bar-left">
          <button type="button" class="btn" data-action="close-pdf" aria-label="Back to teaching chapter">
            <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-chev-left"/></svg>
            <span>${isSplit ? 'Close split' : 'Back to chapter'}</span>
          </button>
          <div style="min-width:0">
            <div class="pdf-bar-title">Original PDF · ${escHtml(meta.title)}</div>
            <div class="pdf-bar-sub">${escHtml(meta.pdf)} · Original lecture PDF, not the teaching chapter</div>
          </div>
        </div>
        <div class="pdf-bar-actions">
          <button type="button" class="btn btn-split-pdf" data-action="toggle-split-pdf" data-chid="${escHtml(meta.id)}" title="${isSplit ? 'Switch to full overlay' : 'Side-by-side split view'}">
            <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-split"/></svg>
            <span>${isSplit ? 'Full view' : 'Split view'}</span>
          </button>
          <button type="button" class="btn" data-action="save-pdf" data-chid="${escHtml(meta.id)}" aria-label="Save Original PDF (${escHtml(meta.pdf)})">
            <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-download"/></svg>
            <span>Save PDF</span>
          </button>
          <button type="button" class="btn btn-ghost" data-action="open-pdf-tab" data-chid="${escHtml(meta.id)}" title="Open PDF in new tab" aria-label="Open PDF in new tab">
            <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
          </button>
        </div>
      </div>
      <div class="pdf-stage">
        <iframe class="pdf-frame" src="${blobUrl}" title="Original PDF: ${escHtml(meta.pdf)}"></iframe>
      </div>
      <div class="pdf-status-strip">
        <span>If your browser blocks inline PDF preview on local files, use <strong>Save PDF</strong> or <strong>Open in new tab</strong>.</span>
        <div style="display:flex;gap:var(--s-3)">
          <button type="button" class="btn btn-ghost" style="min-height:26px;font-size:var(--fs-xs)" data-action="open-pdf-tab" data-chid="${escHtml(meta.id)}">Open PDF in new tab ↗</button>
          <button type="button" class="btn btn-ghost" style="min-height:26px;font-size:var(--fs-xs)" data-action="save-pdf" data-chid="${escHtml(meta.id)}">Save ${escHtml(meta.pdf)}</button>
        </div>
      </div>
    `;
  }

  function closePdfOverlayOnly() {
    const overlay = document.getElementById('pdf-overlay');
    if (overlay) {
      overlay.hidden = true;
      overlay.innerHTML = '';
    }
  }

  function closePdfViewer() {
    closePdfOverlayOnly();
    isSplitMode = false;
    const shell = document.getElementById('chapter-shell');
    const pane = document.getElementById('pdf-split-pane');
    if (shell) shell.classList.remove('is-split');
    if (pane) {
      pane.hidden = true;
      pane.innerHTML = '';
    }
    cleanupPdfBlobUrl();
    const triggerBtn = document.getElementById('btn-view-original-pdf');
    if (triggerBtn) triggerBtn.focus();
  }

  function saveOriginalPdf(chId) {
    const chData = getChapterData(chId);
    const filename = chData && chData.meta ? chData.meta.pdf : (chId + '.pdf');
    const url = decodePdfToBlobUrl(chId);
    if (!url) return;
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function openPdfInNewTab(chId) {
    const url = decodePdfToBlobUrl(chId);
    if (!url) return;
    newTabPdfUrls.add(url);
    const win = window.open(url, '_blank');
    if (!win) {
      // Popup blocked: fall back to in-app viewer
      openPdfViewer(chId, false);
    }
  }

  /* ---------- 4. Progressive Chunk Hydration & Anchor Jumping ---------- */
  function teardownChapterObservers() {
    if (chunkObserver) {
      chunkObserver.disconnect();
      chunkObserver = null;
    }
    if (headingObserver) {
      headingObserver.disconnect();
      headingObserver = null;
    }
  }

  function hydrateChunk(chData, idx) {
    if (hydratedChunks.has(idx)) return;
    const slot = document.getElementById(`ch-chunk-slot-${idx}`);
    if (!slot) return;
    slot.className = 'ch-chunk';
    slot.removeAttribute('data-chunk-placeholder');
    slot.innerHTML = chData.chunks[idx] || '';
    hydratedChunks.add(idx);
    observeHeadingsInContainer(slot);
  }

  function hydrateUpTo(chData, maxIdx) {
    const limit = Math.min(chData.chunks.length - 1, maxIdx);
    for (let i = 0; i <= limit; i++) {
      hydrateChunk(chData, i);
    }
  }

  function hydrateAllChunks(chData) {
    hydrateUpTo(chData, chData.chunks.length - 1);
  }

  function setupChunkObserver(chData) {
    if (!('IntersectionObserver' in window)) {
      hydrateAllChunks(chData);
      return;
    }
    chunkObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-chunk-idx'), 10);
          if (!isNaN(idx)) {
            hydrateChunk(chData, idx);
            chunkObserver.unobserve(entry.target);
          }
        }
      }
    }, { rootMargin: '1200px 0px' });

    document.querySelectorAll('[data-chunk-placeholder]').forEach(el => {
      chunkObserver.observe(el);
    });
  }

  function observeHeadingsInContainer(container) {
    if (!headingObserver) return;
    container.querySelectorAll('h1[id], h2[id], h3[id]').forEach(h => {
      headingObserver.observe(h);
    });
  }

  function setupHeadingScrollSpy(chData, onSectionChange) {
    if (!('IntersectionObserver' in window)) return;
    headingObserver = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting);
      if (visible.length > 0) {
        const topHeading = visible[0].target;
        setActiveTocHeading(chData, topHeading.id, onSectionChange);
      }
    }, { rootMargin: '-64px 0px -72% 0px', threshold: 0 });

    document.querySelectorAll('.chapter-prose h1[id], .chapter-prose h2[id], .chapter-prose h3[id]').forEach(h => {
      headingObserver.observe(h);
    });
  }

  function setActiveTocHeading(chData, headingId, onSectionChange) {
    if (!headingId || activeHeadingId === headingId) return;
    activeHeadingId = headingId;

    // Highlight active link in TOC rail
    document.querySelectorAll('.toc-rail .toc-link').forEach(link => {
      const match = link.getAttribute('data-toc-id') === headingId;
      link.classList.toggle('is-active', match);
    });

    // Expand L3 items belonging to the current active L2/group parent
    updateTocL3Visibility(chData, headingId);

    if (typeof onSectionChange === 'function') {
      const item = chData.toc.find(t => t.id === headingId);
      if (item) onSectionChange(item);
    }
  }

  let tocShowSubsections = false;

  function toggleTocSubsections() {
    tocShowSubsections = !tocShowSubsections;
    const btn = document.getElementById('btn-toc-expand-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(tocShowSubsections));
      const txt = btn.querySelector('.toc-tool-txt');
      if (txt) txt.textContent = tocShowSubsections ? 'Major' : 'All';
    }
    const filterInput = document.getElementById('toc-filter-input');
    if (filterInput && filterInput.value.trim()) return;

    const items = document.querySelectorAll('#toc-rail-list > li[data-toc-role="l3"]');
    items.forEach(li => {
      li.hidden = !tocShowSubsections;
    });
  }

  function toggleTocRail() {
    const shell = document.querySelector('.chapter-shell');
    if (!shell) return;
    const isCollapsed = shell.classList.toggle('is-toc-collapsed');
    const rail = document.getElementById('chapter-toc-rail');
    if (rail) {
      rail.setAttribute('aria-hidden', String(isCollapsed));
    }
  }

  function updateTocL3Visibility(chData, currentId) {
    if (tocShowSubsections) return; // All subsections explicitly expanded
    const filterInput = document.getElementById('toc-filter-input');
    if (filterInput && filterInput.value.trim()) return; // filter mode handles visibility

    // Find which L2 or L1 group owns currentId
    let ownerGroupIdx = -1;
    const curIdx = chData.toc.findIndex(t => t.id === currentId);
    if (curIdx >= 0) {
      for (let i = curIdx; i >= 0; i--) {
        if (chData.toc[i].role === 'l2' || chData.toc[i].role === 'group') {
          ownerGroupIdx = i;
          break;
        }
      }
    }

    let currentParentIdx = -1;
    chData.toc.forEach((t, idx) => {
      if (t.role === 'l2' || t.role === 'group') {
        currentParentIdx = idx;
      } else if (t.role === 'l3') {
        const domEl = document.querySelector(`.toc-rail [data-toc-id="${t.id}"]`);
        if (domEl && domEl.parentElement) {
          domEl.parentElement.hidden = (currentParentIdx !== ownerGroupIdx);
        }
      }
    });
  }

  function jumpToChapterAnchor(chId, anchorId) {
    const chData = getChapterData(chId);
    if (!chData) return false;
    const chunkIdx = chData.anchorToChunk[anchorId];
    if (typeof chunkIdx === 'number') {
      hydrateUpTo(chData, chunkIdx);
    } else {
      hydrateAllChunks(chData);
    }
    const targetEl = document.getElementById(anchorId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      targetEl.classList.add('heading-flash');
      setTimeout(() => targetEl.classList.remove('heading-flash'), 750);
      setActiveTocHeading(chData, anchorId);
      return true;
    }
    return false;
  }

  /* ---------- 5. Render Complete Chapter View ---------- */
  function buildTocListHtml(toc, includeAllL3 = false) {
    return toc.map(t => {
      if (t.role === 'front' && t.level === 1) return ''; // skip repeat of main chapter banner
      const roleClass = t.role === 'group' ? 'toc-link--group' : (t.role === 'l2' ? 'toc-link--l2' : 'toc-link--l3');
      const hideL3 = !includeAllL3 && t.role === 'l3';
      return `<li ${hideL3 ? 'hidden' : ''} data-toc-role="${t.role}">
        <a class="toc-link ${roleClass}" href="#${escHtml(t.id)}" data-action="toc-jump" data-chid="${escHtml(t.id.slice(0, 4))}" data-target="${escHtml(t.id)}" data-toc-id="${escHtml(t.id)}" title="${escHtml(stripTags(t.raw))}">${t.html}</a>
      </li>`;
    }).join('');
  }

  function renderChapterView(chId, options = {}) {
    teardownChapterObservers();
    cleanupPdfBlobUrl();
    isSplitMode = false;
    tocShowSubsections = false;
    activeChId = chId;
    hydratedChunks = new Set();
    activeHeadingId = null;

    const chData = getChapterData(chId);
    if (!chData) {
      return `<div class="empty-box">Chapter data not found for ${escHtml(chId)}.</div>`;
    }

    const meta = chData.meta;
    const defaultChapters = [
      { pos: '01', id: 'ch01', title: 'Introduction to Multivariate Analysis' },
      { pos: '02', id: 'ch02', title: 'Review of Matrix Algebra' },
      { pos: '03', id: 'ch03', title: 'Principal Component Analysis' },
      { pos: '04', id: 'ch04', title: 'PCA in R: Supplementary Methods' },
      { pos: '05', id: 'ch05', title: 'Factor Analysis' },
      { pos: '06', id: 'ch06', title: 'Factor Analysis: Additional Remarks' },
      { pos: '07', id: 'ch07', title: 'Multivariate Normal Distribution' },
      { pos: '08', id: 'ch08', title: 'Inferences About a Mean Vector' },
      { pos: '09', id: 'ch09', title: 'Comparisons of Several Multivariate Means' },
      { pos: '10', id: 'ch10', title: 'Multivariate Multiple Linear Regression' },
      { pos: '11', id: 'ch11', title: 'Multivariate Linear Models in R: Supplementary Reference' }
    ];
    const allChapters = (window.DA2451_DATA && Array.isArray(window.DA2451_DATA.chapters))
      ? window.DA2451_DATA.chapters
      : defaultChapters;
    const idx = allChapters.findIndex(c => c.id === chId);
    const prev = idx > 0 ? allChapters[idx - 1] : null;
    const next = idx < allChapters.length - 1 ? allChapters[idx + 1] : null;
    const done = Boolean(options.isCompleted);
    const bm = Boolean(options.isBookmarked);
    const savedPos = options.savedPosition; // { headingId, headingTitle }

    // Contents preview entries (group L1s or top-level H2s, up to 16 items)
    let previewItems = chData.toc.filter(t => t.role === 'group');
    if (previewItems.length < 3) {
      previewItems = chData.toc.filter(t => t.level <= 2).slice(1);
    }

    // Pre-hydrate first 2 chunks immediately for zero-latency initial screen
    const initialChunksHtml = chData.chunks.map((chunkHtml, cIdx) => {
      if (cIdx < 2) {
        hydratedChunks.add(cIdx);
        return `<div class="ch-chunk" id="ch-chunk-slot-${cIdx}">${chunkHtml}</div>`;
      }
      return `<div class="ch-chunk-placeholder" id="ch-chunk-slot-${cIdx}" data-chunk-placeholder="1" data-chunk-idx="${cIdx}">Loading section ${cIdx + 1} of ${chData.chunks.length}…</div>`;
    }).join('');

    const resumeBannerHtml = savedPos && savedPos.headingId
      ? `<div class="resume-banner" id="chapter-resume-banner">
          <span>Last read section: <strong>${escHtml(savedPos.headingTitle || 'Saved section')}</strong></span>
          <div style="display:flex;gap:var(--s-2)">
            <button type="button" class="btn btn-primary" style="min-height:30px;padding:0 12px;font-size:var(--fs-xs)" data-action="toc-jump" data-chid="${escHtml(chId)}" data-target="${escHtml(savedPos.headingId)}">Resume here</button>
            <button type="button" class="btn btn-ghost" style="min-height:30px;font-size:var(--fs-xs)" data-action="dismiss-resume-banner" aria-label="Dismiss">Dismiss</button>
          </div>
        </div>`
      : '';

    return `
      <div class="view-enter">
        <header class="chapter-header">
          <div class="chapter-meta-row">
            <span class="chip ${meta.kind === 'supplementary' ? 'chip--dashed' : ''}">${meta.kind === 'supplementary' ? 'Supplementary' : 'Core chapter'}</span>
            <span class="chip">Teaching chapter</span>
            <span>Source: <code>${escHtml(meta.file)}</code></span>
            <span>·</span>
            <span>Original PDF: <code>${escHtml(meta.pdf)}</code></span>
          </div>
          <h1 class="page-title">Chapter ${Number(meta.pos)}: ${escHtml(meta.title)}</h1>

          <div class="page-actions">
            ${savedPos && savedPos.headingId
              ? `<button type="button" class="btn btn-primary" data-action="toc-jump" data-chid="${escHtml(chId)}" data-target="${escHtml(savedPos.headingId)}">Resume reading</button>`
              : `<button type="button" class="btn btn-primary" data-action="scroll-article">Start reading</button>`
            }
            <button type="button" class="btn" id="btn-view-original-pdf" data-action="open-pdf" data-chid="${escHtml(chId)}">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-pdf"/></svg>
              <span>View Original PDF (${escHtml(meta.pdf)})</span>
            </button>
            <button type="button" class="btn btn-split-pdf" data-action="toggle-split-pdf" data-chid="${escHtml(chId)}" title="Open Original PDF side by side">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-split"/></svg>
              <span>Split view</span>
            </button>
            <button type="button" class="btn btn-mobile-toc" data-action="open-mobile-toc" data-chid="${escHtml(chId)}">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-menu"/></svg>
              <span>Contents</span>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escHtml(chId)}" data-title="Chapter ${Number(meta.pos)}: ${escHtml(meta.title)}" data-section="Learning Chapters" data-route="#chapter/${escHtml(chId)}" aria-pressed="${bm}" title="${bm ? 'Bookmarked' : 'Bookmark chapter'}" aria-label="Bookmark chapter">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${bm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escHtml(chId)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark chapter complete'}" aria-label="Mark chapter complete">
              ${options.renderRingSvg ? options.renderRingSvg(done) : ''}
              <span style="font-size:var(--fs-sm)">${done ? 'Marked complete' : 'Mark complete'}</span>
            </button>
            <button type="button" class="btn btn-ghost" data-action="open-settings" title="Reading settings (Aa)" aria-label="Reading settings">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-aa"/></svg>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-focus" title="Focus mode" aria-label="Focus mode">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-focus"/></svg>
            </button>
            <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#chapter/${escHtml(chId)}" title="Open chapter in new tab" aria-label="Open chapter in new tab">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
            </button>
          </div>
        </header>

        <div class="chapter-shell" id="chapter-shell">
          <div class="chapter-main">
            ${resumeBannerHtml}

            <nav class="contents-preview" aria-label="Chapter contents preview">
              <div class="contents-preview-head">
                <span>Major sections in this chapter (${previewItems.length})</span>
                <button type="button" class="btn btn-ghost" style="min-height:26px;font-size:var(--fs-xs)" data-action="hydrate-all" data-chid="${escHtml(chId)}">Load all sections</button>
              </div>
              <ol class="contents-preview-grid">
                ${previewItems.map(item => `
                  <li>
                    <a class="contents-preview-link" href="#${escHtml(item.id)}" data-action="toc-jump" data-chid="${escHtml(chId)}" data-target="${escHtml(item.id)}" title="${escHtml(stripTags(item.raw))}">${item.html}</a>
                  </li>
                `).join('')}
              </ol>
            </nav>

            <article class="prose chapter-prose" id="chapter-article-body">
              ${initialChunksHtml}
            </article>

            <div style="margin-top:var(--s-8);padding-top:var(--s-5);border-top:1px solid var(--rule);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--s-3)">
              <button type="button" class="btn" data-action="toggle-complete" data-id="${escHtml(chId)}" aria-pressed="${done}">
                ${options.renderRingSvg ? options.renderRingSvg(done) : ''}
                <span>${done ? 'Chapter marked complete' : 'Mark chapter complete'}</span>
              </button>
              <button type="button" class="btn btn-ghost" data-action="scroll-top">Back to top ↑</button>
            </div>

            <nav aria-label="Chapter pagination" style="margin-top:var(--s-6);display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--s-4)">
              ${prev ? `<a class="row row-chapter group" href="#chapter/${escHtml(prev.id)}">
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev-left"/></svg>
                <div class="row-main">
                  <span class="row-desc">Previous · Chapter ${Number(prev.pos)}</span>
                  <span class="row-title">${escHtml(prev.title)}</span>
                </div>
              </a>` : '<div></div>'}
              ${next ? `<a class="row row-chapter group" href="#chapter/${escHtml(next.id)}">
                <div class="row-main" style="text-align:right">
                  <span class="row-desc">Next · Chapter ${Number(next.pos)}</span>
                  <span class="row-title" style="justify-content:flex-end">${escHtml(next.title)}</span>
                </div>
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
              </a>` : '<div></div>'}
            </nav>
          </div>

          <aside class="toc-rail" id="chapter-toc-rail" aria-label="Chapter contents">
            <div class="toc-rail-head">
              <span class="toc-rail-title">On this page</span>
              <div class="toc-rail-head-actions">
                <button type="button" class="btn-toc-tool" id="btn-toc-expand-toggle" data-action="toggle-toc-subsections" title="Expand / collapse subsections" aria-label="Expand or collapse subsections" aria-pressed="false">
                  <span class="toc-tool-txt">All</span>
                </button>
                <button type="button" class="btn-toc-tool btn-toc-close" data-action="toggle-toc-rail" title="Collapse table of contents" aria-label="Collapse table of contents">
                  <svg class="ic" width="12" height="12" aria-hidden="true"><use href="#i-close"/></svg>
                </button>
              </div>
            </div>
            <input type="search" id="toc-filter-input" class="toc-filter" placeholder="Filter headings…" aria-label="Filter chapter headings" autocomplete="off">
            <ul class="toc-list" id="toc-rail-list">
              ${buildTocListHtml(chData.toc, false)}
            </ul>
          </aside>

          <button type="button" class="btn btn-rail-floating" data-action="toggle-toc-rail" title="Open table of contents" aria-label="Open table of contents">
            <svg class="ic" width="14" height="14" aria-hidden="true"><use href="#i-menu"/></svg>
            <span>Contents</span>
          </button>

          <aside class="pdf-split-pane" id="pdf-split-pane" aria-label="Original Lecture PDF Split View" hidden></aside>
        </div>
      </div>
    `;
  }

  function afterChapterMount(chId, options = {}) {
    const chData = getChapterData(chId);
    if (!chData) return;

    setupChunkObserver(chData);
    setupHeadingScrollSpy(chData, options.onSectionChange);

    // Filter input inside TOC rail
    const filterInput = document.getElementById('toc-filter-input');
    if (filterInput) {
      filterInput.addEventListener('input', () => {
        const q = filterInput.value.trim().toLowerCase();
        const items = document.querySelectorAll('#toc-rail-list > li');
        items.forEach(li => {
          const link = li.querySelector('a');
          if (!q) {
            li.hidden = li.getAttribute('data-toc-role') === 'l3';
          } else {
            const txt = (link ? link.textContent : '').toLowerCase();
            li.hidden = !txt.includes(q);
          }
        });
      });
    }

    if (options.targetAnchor) {
      setTimeout(() => jumpToChapterAnchor(chId, options.targetAnchor), 20);
    }
  }

  function openMobileTocSheet(chId) {
    const chData = getChapterData(chId);
    if (!chData) return;
    let dlg = document.getElementById('dlg-mobile-toc');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlg-mobile-toc';
      dlg.setAttribute('aria-labelledby', 'mobile-toc-title');
      document.body.appendChild(dlg);
    }
    dlg.innerHTML = `
      <div class="dlg-inner">
        <div class="dlg-head">
          <h2 id="mobile-toc-title" class="dlg-title">Contents · Chapter ${Number(chData.meta.pos)}</h2>
          <button type="button" class="btn btn-ghost" data-action="close-dialog" aria-label="Close contents">
            <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-close"/></svg>
          </button>
        </div>
        <ul class="toc-list" style="max-height:65dvh;overflow-y:auto">
          ${buildTocListHtml(chData.toc, true)}
        </ul>
      </div>
    `;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  /* ---------- 6. Lazy Past Paper & Practice Worksheet Data Loaders (Task 3) ---------- */
  function getPaperData(paperId) {
    if (paperCache[paperId]) return paperCache[paperId];
    const el = document.getElementById('pp-data-' + paperId);
    if (!el) return null;
    try {
      const parsed = JSON.parse(el.textContent);
      paperCache[paperId] = parsed;
      return parsed;
    } catch (e) {
      console.error('Failed to parse past paper data for', paperId, e);
      return null;
    }
  }

  function getWorksheetData(pqId) {
    if (worksheetCache[pqId]) return worksheetCache[pqId];
    const el = document.getElementById('pq-data-' + pqId);
    if (!el) return null;
    try {
      const parsed = JSON.parse(el.textContent);
      worksheetCache[pqId] = parsed;
      return parsed;
    } catch (e) {
      console.error('Failed to parse practice worksheet data for', pqId, e);
      return null;
    }
  }

  /* ---------- 7. Render Historical Past Paper View (Task 3) ---------- */
  function renderPaperView(paperId, options = {}) {
    teardownChapterObservers();
    closePdfViewer();
    activeChId = null;
    activePqId = null;

    const pData = getPaperData(paperId);
    if (!pData) {
      return `<div class="empty-box">Past paper data not found for ${escHtml(paperId)}.</div>`;
    }

    const meta = pData.meta;
    const allPapers = (window.DA2451_DATA && Array.isArray(window.DA2451_DATA.papers))
      ? window.DA2451_DATA.papers
      : [];
    const idx = allPapers.findIndex(p => p.id === paperId);
    const prev = idx > 0 ? allPapers[idx - 1] : null;
    const next = idx >= 0 && idx < allPapers.length - 1 ? allPapers[idx + 1] : null;

    const done = Boolean(options.isCompleted);
    const bm = Boolean(options.isBookmarked);
    const completedMap = options.completedMap || {};
    const bookmarksMap = options.bookmarksMap || {};
    const mcqPicks = options.mcqPicks || {};

    // Quick Question Jump Strip
    const jumpPillsHtml = [
      ...pData.mcqs.map(m => `<a class="q-jump-pill" href="#pp-mcq-${m.num}" data-action="jump-in-page" data-target="pp-mcq-${m.num}">MCQ ${m.num}</a>`),
      ...pData.questions.map(q => `<a class="q-jump-pill" href="#pp-q-${q.num}" data-action="jump-in-page" data-target="pp-q-${q.num}">Q${q.num}</a>`)
    ].join('');

    // Render MCQ Section
    const mcqsHtml = pData.mcqs.length > 0 ? `
      <section style="margin-bottom:var(--s-8)" aria-labelledby="pp-mcq-section-title">
        <div class="section-block-head" style="margin-bottom:var(--s-4)">
          <h2 id="pp-mcq-section-title" class="section-block-title">Part I · Multiple-Choice Questions (${pData.mcqs.length})</h2>
        </div>
        ${pData.mcqs.map(mcq => {
          const groupIntroHtml = (pData.mcqGroupIntro && pData.mcqGroupIntro.fromMcq === mcq.num) ? `
            <div class="pp-shared-ctx" id="pp-mcq-shared-intro">
              <div class="pp-shared-ctx-title">Shared R Output for MCQs ${mcq.num}–${pData.mcqGroupIntro.toMcq || pData.mcqs[pData.mcqs.length - 1].num}</div>
              <div class="prose" style="max-width:100%">${pData.mcqGroupIntro.html}</div>
              ${pData.mcqGroupIntro.guideHtml ? `
                <details class="pp-details" style="margin-top:var(--s-4);margin-bottom:0">
                  <summary>
                    <span>Show Reference Guide for Shared R Output</span>
                    <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
                  </summary>
                  <div class="pp-details-body prose">${pData.mcqGroupIntro.guideHtml}</div>
                </details>
              ` : ''}
            </div>
          ` : '';

          const mDone = Boolean(completedMap[mcq.id]);
          const mBm = Boolean(bookmarksMap[mcq.id]);
          const pick = mcqPicks[mcq.id] || '';
          const ansId = `ans-${mcq.id}`;

          return `
            ${groupIntroHtml}
            <article class="qcard" id="pp-mcq-${mcq.num}">
              <div class="qhead">
                <div class="qnum">${mcq.num}</div>
                <div>
                  <div style="font-weight:650;font-size:var(--fs-md)">MCQ ${mcq.num}</div>
                  <div class="qmeta">
                    <span class="chip">${escHtml(meta.type)}</span>
                    <span class="chip">Batch ${meta.batch}</span>
                    <span class="chip">${escHtml(meta.dateLabel)}</span>
                    <span class="marks">[2 marks]</span>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:var(--s-1)">
                  <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escHtml(mcq.id)}" data-title="${escHtml(meta.title)} · MCQ ${mcq.num}" data-section="Past Papers" data-route="#paper/${escHtml(meta.id)}" aria-pressed="${mBm}" title="Bookmark MCQ ${mcq.num}" aria-label="Bookmark MCQ ${mcq.num}">
                    <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${mBm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
                  </button>
                  <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escHtml(mcq.id)}" aria-pressed="${mDone}" title="${mDone ? 'Marked complete' : 'Mark complete'}" aria-label="Mark MCQ ${mcq.num} complete">
                    ${options.renderRingSvg ? options.renderRingSvg(mDone) : ''}
                  </button>
                </div>
              </div>

              <div class="q-body prose" style="max-width:100%">
                ${mcq.stemHtml}
                <div class="opts" role="radiogroup" aria-label="Options for MCQ ${mcq.num}">
                  ${mcq.options.map(opt => `
                    <label class="opt ${pick === opt.letter ? 'is-picked' : ''}">
                      <input type="radio" name="opt-${escHtml(mcq.id)}" value="${escHtml(opt.letter)}" data-qid="${escHtml(mcq.id)}" ${pick === opt.letter ? 'checked' : ''}>
                      <span class="badge">${escHtml(opt.letter)}</span>
                      <span class="txt">${opt.html}</span>
                      <span class="pick">My pick</span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <div class="qactions">
                <button type="button" class="btn btn-reveal" data-action="reveal" aria-expanded="false" aria-controls="${escHtml(ansId)}" data-show="Show answer &amp; explanation" data-hide="Hide answer &amp; explanation">
                  <span class="btn-label">Show answer &amp; explanation</span>
                  <svg class="ic chev" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
                </button>
                <span class="spacer"></span>
                <button type="button" class="btn btn-prompt" data-action="copy-prompt" data-qid="${escHtml(mcq.id)}" title="Copies question + matched source answer for AI explanation (even while hidden)" aria-label="Copy AI Prompt for MCQ ${mcq.num}">
                  <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-prompt"/></svg>
                  <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
                  <span class="btn-label">Copy AI Prompt</span>
                </button>
                <button type="button" class="btn btn-ghost" data-action="copy-raw" data-copy="${escHtml(mcq.fullQuestionMd || '')}" title="Copy question text" aria-label="Copy MCQ ${mcq.num} question">
                  <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-copy"/></svg>
                  <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
                </button>
              </div>
              <p class="qhint">Copies question + matched source answer for AI explanation (even while answer is hidden).</p>

              <div class="answer prose" id="${escHtml(ansId)}" style="max-width:100%" hidden>
                ${mcq.answer && mcq.answer.keyLineHtml ? `<div class="mcq-key-banner">${mcq.answer.keyLineHtml}</div>` : ''}
                ${mcq.answer ? mcq.answer.html : ''}
              </div>
            </article>
          `;
        }).join('')}
      </section>
    ` : '';

    // Render Essay / Structured Questions Section
    const essaysHtml = pData.questions.length > 0 ? `
      <section aria-labelledby="pp-essay-section-title">
        <div class="section-block-head" style="margin-bottom:var(--s-4)">
          <h2 id="pp-essay-section-title" class="section-block-title">${pData.mcqs.length > 0 ? 'Part II · ' : ''}Structured / Essay Questions (${pData.questions.length})</h2>
        </div>
        ${pData.questions.map(q => {
          const sharedCtxHtml = (pData.sharedContext && Array.isArray(pData.sharedContext.appliesTo) && pData.sharedContext.appliesTo[0] === q.num) ? `
            <div class="pp-shared-ctx" id="pp-shared-ctx-q3-q4">
              <div class="pp-shared-ctx-title">${escHtml(pData.sharedContext.title)}</div>
              <div class="prose" style="max-width:100%">${pData.sharedContext.html}</div>
              ${pData.sharedContext.answerHtml ? `
                <details class="pp-details" style="margin-top:var(--s-4);margin-bottom:0">
                  <summary>
                    <span>Show Shared Context Analysis &amp; Beginner's Guide</span>
                    <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
                  </summary>
                  <div class="pp-details-body prose">${pData.sharedContext.answerHtml}</div>
                </details>
              ` : ''}
            </div>
          ` : '';

          const qDone = Boolean(completedMap[q.id]);
          const qBm = Boolean(bookmarksMap[q.id]);

          const relatedLinksHtml = (q.chapters || []).map(chId => {
            return `<a class="chip" href="#chapter/${escHtml(chId)}" style="text-decoration:none;color:var(--accent);border-color:var(--accent-line)">Lecture ${escHtml(chId.toUpperCase())}</a>`;
          }).join('');

          const outsideChipHtml = q.outsideCurrentLectures
            ? `<span class="chip chip--dashed" title="Historical exam question preserved; topic outside current 11 lecture chapters">Outside current lecture chapters</span>`
            : '';

          return `
            ${sharedCtxHtml}
            <article class="qcard" id="pp-q-${q.num}">
              <div class="qhead">
                <div class="qnum">Q${q.num}</div>
                <div>
                  <div style="font-weight:650;font-size:var(--fs-lg)">Question ${q.num}${q.topic ? ` · ${escHtml(q.topic)}` : ''}</div>
                  <div class="qmeta">
                    <span class="chip">${escHtml(meta.type)}</span>
                    <span class="chip">Batch ${meta.batch}</span>
                    <span class="chip">${escHtml(meta.dateLabel)}</span>
                    ${q.totalMarks ? `<span class="marks">[${q.totalMarks} marks total]</span>` : ''}
                    ${relatedLinksHtml}
                    ${outsideChipHtml}
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:var(--s-1)">
                  <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escHtml(q.id)}" data-title="${escHtml(meta.title)} · Question ${q.num}" data-section="Past Papers" data-route="#paper/${escHtml(meta.id)}" aria-pressed="${qBm}" title="Bookmark Question ${q.num}" aria-label="Bookmark Question ${q.num}">
                    <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${qBm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
                  </button>
                  <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escHtml(q.id)}" aria-pressed="${qDone}" title="${qDone ? 'Marked complete' : 'Mark Question ' + q.num + ' complete'}" aria-label="Mark Question ${q.num} complete">
                    ${options.renderRingSvg ? options.renderRingSvg(qDone) : ''}
                  </button>
                </div>
              </div>

              <div style="display:flex;flex-wrap:wrap;align-items:center;gap:var(--s-2);margin-top:var(--s-3);padding-bottom:var(--s-3);border-bottom:1px solid var(--rule)">
                <button type="button" class="btn" style="min-height:34px;font-size:var(--fs-xs)" data-action="question-reveal-all" data-qcard="pp-q-${q.num}" data-open="false">
                  <span class="btn-label">Show all ${q.parts.length} part solutions</span>
                </button>
                <button type="button" class="btn btn-prompt" style="min-height:34px;font-size:var(--fs-xs)" data-action="copy-prompt" data-qid="${escHtml(q.id)}" title="Copies full Question ${q.num} + all part solutions for AI explanation">
                  <svg class="ic ic-a" width="16" height="16" aria-hidden="true"><use href="#i-prompt"/></svg>
                  <svg class="ic ic-b" width="16" height="16" aria-hidden="true"><use href="#i-check"/></svg>
                  <span class="btn-label">Copy Full Q${q.num} AI Prompt</span>
                </button>
              </div>

              ${q.foundationHtml ? `
                <details class="pp-details" style="margin-top:var(--s-4);margin-bottom:0">
                  <summary>
                    <span>Beginner's Foundation &amp; Prerequisites for Question ${q.num}</span>
                    <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
                  </summary>
                  <div class="pp-details-body prose">${q.foundationHtml}</div>
                </details>
              ` : ''}

              ${q.stemHtml ? `<div class="q-body prose" style="max-width:100%">${q.stemHtml}</div>` : ''}

              ${q.parts.map(part => {
                const pAnsId = `ans-${part.id}`;
                const subpartsHtml = (part.subParts && part.subParts.length > 0) ? `
                  <div class="pp-subparts">
                    ${part.subParts.map(sp => `
                      <div class="pp-subpart-row">
                        <span class="pp-subpart-lbl">(${escHtml(sp.roman)})</span>
                        <div class="prose" style="max-width:100%">${sp.html}</div>
                        ${sp.marks !== null ? `<span class="marks">[${sp.marks} marks]</span>` : '<span></span>'}
                      </div>
                    `).join('')}
                  </div>
                ` : '';

                return `
                  <div class="pp-part-block" id="pp-part-${escHtml(part.id)}">
                    <div class="pp-part-head">
                      <span class="pp-part-label">Part (${escHtml(part.letter)})</span>
                      ${part.marks !== null ? `<span class="marks">[${part.marks} marks]</span>` : ''}
                    </div>
                    ${part.introHtml ? `<div class="prose" style="max-width:100%">${part.introHtml}</div>` : ''}
                    ${subpartsHtml}
                    <div class="qactions">
                      <button type="button" class="btn btn-reveal" data-action="reveal" aria-expanded="false" aria-controls="${escHtml(pAnsId)}" data-show="Show solution (${escHtml(part.letter)})" data-hide="Hide solution (${escHtml(part.letter)})">
                        <span class="btn-label">Show solution (${escHtml(part.letter)})</span>
                        <svg class="ic chev" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
                      </button>
                      <span class="spacer"></span>
                      <button type="button" class="btn btn-prompt" data-action="copy-prompt" data-qid="${escHtml(part.id)}" title="Copies Part (${escHtml(part.letter)}) question + matched source solution for AI explanation (even while hidden)" aria-label="Copy AI Prompt for Question ${q.num}(${escHtml(part.letter)})">
                        <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-prompt"/></svg>
                        <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
                        <span class="btn-label">Copy AI Prompt (${escHtml(part.letter)})</span>
                      </button>
                      <button type="button" class="btn btn-ghost" data-action="copy-raw" data-copy="${escHtml(part.rawMd || '')}" title="Copy Part (${escHtml(part.letter)}) question text" aria-label="Copy Question ${q.num}(${escHtml(part.letter)}) text">
                        <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-copy"/></svg>
                        <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
                      </button>
                    </div>
                    <p class="qhint">Copies Part (${escHtml(part.letter)}) question + matched source solution for AI explanation (even while hidden).</p>
                    <div class="answer prose" id="${escHtml(pAnsId)}" style="max-width:100%" hidden>
                      <h3>Worked solution — Question ${q.num}(${escHtml(part.letter)})</h3>
                      ${part.answer ? part.answer.html : '<p>No matched answer block found.</p>'}
                    </div>
                  </div>
                `;
              }).join('')}
            </article>
          `;
        }).join('')}
      </section>
    ` : '';

    return `
      <div class="view-enter" id="paper-view-root">
        <header class="page-header">
          <div class="chapter-meta-row">
            <span class="chip ${escHtml(meta.chipClass || '')}">${escHtml(meta.type)}</span>
            <span class="chip">Batch ${meta.batch}</span>
            <span class="chip">${escHtml(meta.course)}</span>
            <span>${escHtml(meta.dateLabel)}</span>
            <span>·</span>
            <span>${escHtml(meta.duration)}</span>
            <span>·</span>
            <span><strong>${meta.totalMarks} marks</strong></span>
            <span>·</span>
            <span>Source: <code>${escHtml(meta.answerFile)}</code></span>
          </div>
          <h1 class="page-title">${escHtml(meta.title)} — Batch ${meta.batch}</h1>
          <p class="page-desc">${escHtml(meta.composition)} · Every question, part, and sub-part verified and paired with its complete source worked solution.</p>
          <div class="page-actions">
            <button type="button" class="btn btn-primary" data-action="paper-reveal-all" data-open="false">
              <span class="btn-label">Show all answers</span>
            </button>
            <a class="btn" href="#papers">All Past Papers</a>
            <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escHtml(meta.id)}" data-title="Batch ${meta.batch} · ${escHtml(meta.title)}" data-section="Past Papers" data-route="#paper/${escHtml(meta.id)}" aria-pressed="${bm}" title="${bm ? 'Bookmarked' : 'Bookmark paper'}" aria-label="Bookmark paper">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${bm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escHtml(meta.id)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark paper complete'}" aria-label="Mark paper complete">
              ${options.renderRingSvg ? options.renderRingSvg(done) : ''}
              <span style="font-size:var(--fs-sm)">${done ? 'Marked complete' : 'Mark complete'}</span>
            </button>
            <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#paper/${escHtml(meta.id)}" title="Open paper in new tab" aria-label="Open paper in new tab">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
            </button>
          </div>
        </header>

        ${pData.headerHtml ? `
          <details class="pp-details">
            <summary>
              <span>Official Examination Header &amp; Instructions</span>
              <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
            </summary>
            <div class="pp-details-body prose">${pData.headerHtml}</div>
          </details>
        ` : ''}

        ${pData.preambleHtml ? `
          <details class="pp-details">
            <summary>
              <span>Examination Overview &amp; Study Notes</span>
              <svg class="ic" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
            </summary>
            <div class="pp-details-body prose">${pData.preambleHtml}</div>
          </details>
        ` : ''}

        <nav class="q-jump-strip" aria-label="Quick question jump">
          <span class="filter-label">Jump to:</span>
          ${jumpPillsHtml}
        </nav>

        ${mcqsHtml}
        ${essaysHtml}

        <div style="margin-top:var(--s-8);padding-top:var(--s-5);border-top:1px solid var(--rule);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--s-3)">
          <button type="button" class="btn" data-action="toggle-complete" data-id="${escHtml(meta.id)}" aria-pressed="${done}">
            ${options.renderRingSvg ? options.renderRingSvg(done) : ''}
            <span>${done ? 'Paper marked complete' : 'Mark paper complete'}</span>
          </button>
          <button type="button" class="btn btn-ghost" data-action="scroll-top">Back to top ↑</button>
        </div>

        <nav aria-label="Past paper pagination" style="margin-top:var(--s-6);display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--s-4)">
          ${prev ? `<a class="row row-chapter group" href="#paper/${escHtml(prev.id)}">
            <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev-left"/></svg>
            <div class="row-main">
              <span class="row-desc">Previous · Batch ${prev.batch}</span>
              <span class="row-title">${escHtml(prev.title)}</span>
            </div>
          </a>` : '<div></div>'}
          ${next ? `<a class="row row-chapter group" href="#paper/${escHtml(next.id)}">
            <div class="row-main" style="text-align:right">
              <span class="row-desc">Next · Batch ${next.batch}</span>
              <span class="row-title" style="justify-content:flex-end">${escHtml(next.title)}</span>
            </div>
            <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
          </a>` : '<div></div>'}
        </nav>
      </div>
    `;
  }

  /* ---------- 8. Render Practice Worksheet View (Task 3) ---------- */
  function buildPqTocListHtml(toc, includeAllL3 = false) {
    return toc.map(t => {
      if (t.level === 1 && t.id.endsWith('--practice-worksheet-' + t.id.slice(3, 4))) return '';
      const role = t.level === 1 ? 'group' : (t.level === 2 ? 'l2' : 'l3');
      const roleClass = role === 'group' ? 'toc-link--group' : (role === 'l2' ? 'toc-link--l2' : 'toc-link--l3');
      const hideL3 = !includeAllL3 && role === 'l3';
      return `<li ${hideL3 ? 'hidden' : ''} data-toc-role="${role}">
        <a class="toc-link ${roleClass}" href="#${escHtml(t.id)}" data-action="pq-toc-jump" data-pqid="${escHtml(t.id.slice(0, 4))}" data-target="${escHtml(t.id)}" data-toc-id="${escHtml(t.id)}" title="${escHtml(stripTags(t.raw))}">${t.html}</a>
      </li>`;
    }).join('');
  }

  function renderWorksheetView(pqId, options = {}) {
    teardownChapterObservers();
    closePdfViewer();
    activeChId = null;
    activePqId = pqId;

    const wData = getWorksheetData(pqId);
    if (!wData) {
      return `<div class="empty-box">Practice worksheet data not found for ${escHtml(pqId)}.</div>`;
    }

    const meta = wData.meta;
    const allWorksheets = (window.DA2451_DATA && Array.isArray(window.DA2451_DATA.worksheets))
      ? window.DA2451_DATA.worksheets
      : [];
    const idx = allWorksheets.findIndex(w => w.id === pqId);
    const prev = idx > 0 ? allWorksheets[idx - 1] : null;
    const next = idx >= 0 && idx < allWorksheets.length - 1 ? allWorksheets[idx + 1] : null;

    const done = Boolean(options.isCompleted);
    const bm = Boolean(options.isBookmarked);
    const completedMap = options.completedMap || {};
    const bookmarksMap = options.bookmarksMap || {};

    const qUnits = wData.units.filter(u => u.kind === 'question' || u.kind === 'subquestion');
    const jumpPillsHtml = qUnits.map(u => {
      const label = u.subLetter ? `Q${u.qNum}(${u.subLetter})` : `Q${u.qNum}`;
      return `<a class="q-jump-pill" href="#${escHtml(u.unitId)}" data-action="pq-toc-jump" data-pqid="${escHtml(pqId)}" data-target="${escHtml(u.unitId)}">${escHtml(label)}</a>`;
    }).join('');

    const relatedLinksHtml = (meta.chapters || []).map(chId => {
      return `<a class="chip" href="#chapter/${escHtml(chId)}" style="text-decoration:none;color:var(--accent);border-color:var(--accent-line)">Lecture ${escHtml(chId.toUpperCase())}</a>`;
    }).join('');

    const unitsStreamHtml = wData.units.map(unit => {
      if (unit.kind === 'reading') {
        return `<section class="prose chapter-prose" id="${escHtml(unit.unitId)}">${unit.html}</section>`;
      }

      const uDone = Boolean(completedMap[unit.unitId]);
      const uBm = Boolean(bookmarksMap[unit.unitId]);
      const badgeNum = unit.subLetter ? `${unit.qNum}${unit.subLetter}` : `${unit.qNum}`;
      const ansId = `ans-${unit.unitId}`;

      return `
        <article class="qcard pq-card" id="${escHtml(unit.unitId)}">
          <div class="qhead">
            <div class="qnum">${escHtml(badgeNum)}</div>
            <div>
              <div style="font-weight:650;font-size:var(--fs-lg)">${unit.titleHtml || escHtml(unit.title || unit.unitId)}</div>
              <div class="qmeta">
                <span class="chip">${escHtml(meta.code || meta.id.toUpperCase())}</span>
                <span class="chip">Step-by-step Teaching Solution</span>
                ${relatedLinksHtml}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:var(--s-1)">
              <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escHtml(unit.unitId)}" data-title="${escHtml(meta.title)} · ${escHtml(unit.title || unit.unitId)}" data-section="Practice Questions" data-route="#worksheet/${escHtml(meta.id)}" aria-pressed="${uBm}" title="Bookmark ${escHtml(unit.unitId)}" aria-label="Bookmark ${escHtml(unit.unitId)}">
                <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${uBm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
              </button>
              <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escHtml(unit.unitId)}" aria-pressed="${uDone}" title="${uDone ? 'Marked complete' : 'Mark complete'}" aria-label="Mark ${escHtml(unit.unitId)} complete">
                ${options.renderRingSvg ? options.renderRingSvg(uDone) : ''}
              </button>
            </div>
          </div>

          <div class="q-body prose" style="max-width:100%">
            ${unit.questionHtml}
          </div>

          <div class="qactions">
            <button type="button" class="btn btn-reveal" data-action="reveal" aria-expanded="false" aria-controls="${escHtml(ansId)}" data-show="Show teaching solution" data-hide="Hide teaching solution">
              <span class="btn-label">Show teaching solution</span>
              <svg class="ic chev" width="16" height="16" aria-hidden="true"><use href="#i-chev"/></svg>
            </button>
            <span class="spacer"></span>
            <button type="button" class="btn btn-prompt" data-action="copy-prompt" data-qid="${escHtml(unit.unitId)}" title="Copies original question + complete teaching solution for AI explanation (even while hidden)" aria-label="Copy AI Prompt for ${escHtml(unit.unitId)}">
              <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-prompt"/></svg>
              <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
              <span class="btn-label">Copy AI Prompt</span>
            </button>
            <button type="button" class="btn btn-ghost" data-action="copy-raw" data-copy="${escHtml(unit.rawQuestionMd || '')}" title="Copy question text" aria-label="Copy ${escHtml(unit.unitId)} question">
              <svg class="ic ic-a" width="18" height="18" aria-hidden="true"><use href="#i-copy"/></svg>
              <svg class="ic ic-b" width="18" height="18" aria-hidden="true"><use href="#i-check"/></svg>
            </button>
          </div>
          <p class="qhint">Copies original question + complete teaching solution for AI explanation (even while solution is hidden).</p>

          <div class="answer pq-solution prose" id="${escHtml(ansId)}" hidden>
            ${unit.solutionHtml}
          </div>
        </article>
      `;
    }).join('');

    return `
      <div class="view-enter" id="worksheet-view-root">
        <header class="chapter-header">
          <div class="chapter-meta-row">
            <span class="chip">PQ${escHtml(meta.pos)}</span>
            <span class="chip">Practice Worksheet</span>
            <span>${meta.questionCount} questions</span>
            <span>·</span>
            <span>Source: <code>${escHtml(meta.file)}</code></span>
            ${relatedLinksHtml}
          </div>
          <h1 class="page-title">${escHtml(meta.title)}: ${escHtml(meta.topic)}</h1>
          <div class="page-actions">
            <button type="button" class="btn btn-primary" data-action="pq-reveal-all" data-open="false">
              <span class="btn-label">Show all teaching solutions</span>
            </button>
            <a class="btn" href="#practice">All Worksheets</a>
            <button type="button" class="btn btn-mobile-toc" data-action="open-pq-mobile-toc" data-pqid="${escHtml(pqId)}">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-menu"/></svg>
              <span>Contents</span>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-bookmark" data-id="${escHtml(meta.id)}" data-title="${escHtml(meta.title)}: ${escHtml(meta.topic)}" data-section="Practice Questions" data-route="#worksheet/${escHtml(meta.id)}" aria-pressed="${bm}" title="${bm ? 'Bookmarked' : 'Bookmark worksheet'}" aria-label="Bookmark worksheet">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="${bm ? '#i-bookmark-fill' : '#i-bookmark'}"/></svg>
            </button>
            <button type="button" class="btn btn-ghost" data-action="toggle-complete" data-id="${escHtml(meta.id)}" aria-pressed="${done}" title="${done ? 'Marked complete' : 'Mark worksheet complete'}" aria-label="Mark worksheet complete">
              ${options.renderRingSvg ? options.renderRingSvg(done) : ''}
              <span style="font-size:var(--fs-sm)">${done ? 'Marked complete' : 'Mark complete'}</span>
            </button>
            <button type="button" class="btn btn-ghost" data-action="open-new-tab" data-href="#worksheet/${escHtml(meta.id)}" title="Open worksheet in new tab" aria-label="Open worksheet in new tab">
              <svg class="ic" width="18" height="18" aria-hidden="true"><use href="#i-external"/></svg>
            </button>
          </div>
        </header>

        <div class="chapter-shell" id="worksheet-shell">
          <div class="chapter-main">
            <nav class="q-jump-strip" aria-label="Quick question jump">
              <span class="filter-label">Questions:</span>
              ${jumpPillsHtml}
            </nav>

            <div id="worksheet-article-body">
              ${unitsStreamHtml}
            </div>

            <div style="margin-top:var(--s-8);padding-top:var(--s-5);border-top:1px solid var(--rule);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--s-3)">
              <button type="button" class="btn" data-action="toggle-complete" data-id="${escHtml(meta.id)}" aria-pressed="${done}">
                ${options.renderRingSvg ? options.renderRingSvg(done) : ''}
                <span>${done ? 'Worksheet marked complete' : 'Mark worksheet complete'}</span>
              </button>
              <button type="button" class="btn btn-ghost" data-action="scroll-top">Back to top ↑</button>
            </div>

            <nav aria-label="Worksheet pagination" style="margin-top:var(--s-6);display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:var(--s-4)">
              ${prev ? `<a class="row row-chapter group" href="#worksheet/${escHtml(prev.id)}">
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev-left"/></svg>
                <div class="row-main">
                  <span class="row-desc">Previous · Worksheet ${Number(prev.pos)}</span>
                  <span class="row-title">${escHtml(prev.topic)}</span>
                </div>
              </a>` : '<div></div>'}
              ${next ? `<a class="row row-chapter group" href="#worksheet/${escHtml(next.id)}">
                <div class="row-main" style="text-align:right">
                  <span class="row-desc">Next · Worksheet ${Number(next.pos)}</span>
                  <span class="row-title" style="justify-content:flex-end">${escHtml(next.topic)}</span>
                </div>
                <svg class="ic row-chev" width="18" height="18" aria-hidden="true"><use href="#i-chev"/></svg>
              </a>` : '<div></div>'}
            </nav>
          </div>

          <aside class="toc-rail" aria-label="Worksheet contents">
            <div class="toc-rail-title">On this page</div>
            <input type="search" id="pq-toc-filter-input" class="toc-filter" placeholder="Filter headings…" aria-label="Filter worksheet headings" autocomplete="off">
            <ul class="toc-list" id="pq-toc-rail-list">
              ${buildPqTocListHtml(wData.toc, false)}
            </ul>
          </aside>
        </div>
      </div>
    `;
  }

  function jumpToWorksheetAnchor(pqId, anchorId) {
    const targetEl = document.getElementById(anchorId);
    if (!targetEl) return false;

    // If targetEl is inside a hidden .answer solution panel, reveal it first!
    const hiddenAnswer = targetEl.closest('.answer[hidden]');
    if (hiddenAnswer) {
      hiddenAnswer.removeAttribute('hidden');
      const ctrlBtn = document.querySelector(`[aria-controls="${hiddenAnswer.id}"]`);
      if (ctrlBtn) {
        ctrlBtn.setAttribute('aria-expanded', 'true');
        const lbl = ctrlBtn.querySelector('.btn-label');
        if (lbl) lbl.textContent = ctrlBtn.dataset.hide || 'Hide teaching solution';
      }
    }

    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    targetEl.classList.add('heading-flash');
    setTimeout(() => targetEl.classList.remove('heading-flash'), 750);
    return true;
  }

  function afterWorksheetMount(pqId, options = {}) {
    const filterInput = document.getElementById('pq-toc-filter-input');
    if (filterInput) {
      filterInput.addEventListener('input', () => {
        const q = filterInput.value.trim().toLowerCase();
        const items = document.querySelectorAll('#pq-toc-rail-list > li');
        items.forEach(li => {
          const link = li.querySelector('a');
          if (!q) {
            li.hidden = li.getAttribute('data-toc-role') === 'l3';
          } else {
            const txt = (link ? link.textContent : '').toLowerCase();
            li.hidden = !txt.includes(q);
          }
        });
      });
    }

    if (options.targetAnchor) {
      setTimeout(() => jumpToWorksheetAnchor(pqId, options.targetAnchor), 20);
    }
  }

  function openPqMobileTocSheet(pqId) {
    const wData = getWorksheetData(pqId);
    if (!wData) return;
    let dlg = document.getElementById('dlg-mobile-toc');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'dlg-mobile-toc';
      dlg.setAttribute('aria-labelledby', 'mobile-toc-title');
      document.body.appendChild(dlg);
    }
    dlg.innerHTML = `
      <div class="dlg-inner">
        <div class="dlg-head">
          <h2 id="mobile-toc-title" class="dlg-title">Contents · ${escHtml(wData.meta.title)}</h2>
          <button type="button" class="btn btn-ghost" data-action="close-dialog" aria-label="Close contents">
            <svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-close"/></svg>
          </button>
        </div>
        <ul class="toc-list" style="max-height:65dvh;overflow-y:auto">
          ${buildPqTocListHtml(wData.toc, true)}
        </ul>
      </div>
    `;
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
  }

  // Expose Reader API to app.js
  window.DA2451_READER = {
    getChapterData,
    renderChapterView,
    afterChapterMount,
    jumpToChapterAnchor,
    getPaperData,
    renderPaperView,
    getWorksheetData,
    renderWorksheetView,
    afterWorksheetMount,
    jumpToWorksheetAnchor,
    openPqMobileTocSheet,
    hydrateAllForCurrent() {
      if (activeChId) {
        const d = getChapterData(activeChId);
        if (d) hydrateAllChunks(d);
      }
    },
    openPdfViewer,
    closePdfViewer,
    toggleSplitPdf(chId) {
      openPdfViewer(chId, !isSplitMode);
    },
    saveOriginalPdf,
    openPdfInNewTab,
    openMobileTocSheet,
    toggleTocSubsections,
    toggleTocRail,
    teardown: () => {
      teardownChapterObservers();
      closePdfViewer();
    }
  };
})();
