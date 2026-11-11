/**
 * DA2451 Study App — Offline Full-Text Search Engine & Modal Controller (Task 4)
 * Lazy-loads the pre-indexed #search-index JSON payload on first open.
 * Searches across Chapters (ch), Past Papers (pp), Practice Questions (pq),
 * Predicted MCQs (pm), and Predicted Essays (pe).
 */
(function () {
  'use strict';

  var searchIndex = null;
  var activeFilter = 'all';
  var activeIdx = -1;
  var currentResults = [];
  var recentSearches = [];
  var RECENT_KEY = 'da2451:v1:recentSearches';

  var KIND_LABELS = {
    ch: 'Chapters',
    pp: 'Past Papers',
    pq: 'Practice Questions',
    pm: 'Predicted MCQs',
    pe: 'Predicted Essays'
  };

  var KIND_BADGES = {
    ch: 'Chapter',
    pp: 'Past Paper',
    pq: 'Practice',
    pm: 'Predicted MCQ',
    pe: 'Predicted Essay'
  };

  var EXAMPLE_QUERIES = [
    'Mahalanobis',
    'Hotelling T2',
    'eigenvalue',
    'Wilks Lambda',
    'MANOVA',
    'Factor rotation',
    'C-MCQ-001',
    'G-ESS-001'
  ];

  function loadRecent() {
    try {
      var raw = window.localStorage.getItem(RECENT_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) recentSearches = parsed.slice(0, 6);
      }
    } catch (e) {
      recentSearches = [];
    }
  }

  function saveRecent(q) {
    var clean = String(q || '').trim();
    if (!clean || clean.length < 2) return;
    recentSearches = [clean].concat(recentSearches.filter(function (item) {
      return item.toLowerCase() !== clean.toLowerCase();
    })).slice(0, 6);
    try {
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(recentSearches));
    } catch (e) { /* ignore */ }
  }

  function clearRecent() {
    recentSearches = [];
    try {
      window.localStorage.removeItem(RECENT_KEY);
    } catch (e) { /* ignore */ }
  }

  function ensureIndex() {
    if (searchIndex) return searchIndex;
    var el = document.getElementById('search-index');
    if (!el) {
      searchIndex = [];
      return searchIndex;
    }
    try {
      var raw = JSON.parse(el.textContent);
      // Tuple format: [kind, title, context, route, body]
      searchIndex = raw.map(function (row, idx) {
        var kind = row[0] || 'ch';
        var title = row[1] || '';
        var context = row[2] || '';
        var route = row[3] || '#home';
        var body = row[4] || '';
        return {
          id: idx,
          kind: kind,
          title: title,
          context: context,
          route: route,
          body: body,
          titleLower: title.toLowerCase(),
          contextLower: context.toLowerCase(),
          routeLower: route.toLowerCase(),
          bodyLower: body.toLowerCase()
        };
      });
    } catch (e) {
      console.error('Failed to parse #search-index:', e);
      searchIndex = [];
    }
    return searchIndex;
  }

  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function highlightText(text, tokens) {
    if (!text) return '';
    var safe = escHtml(text);
    if (!tokens || !tokens.length) return safe;
    var valid = tokens.filter(function (t) { return t.length >= 2; });
    if (!valid.length) return safe;
    // Sort longer tokens first to avoid partial nested replacements
    valid.sort(function (a, b) { return b.length - a.length; });
    var pattern = valid.map(escapeRegExp).join('|');
    try {
      var re = new RegExp('(' + pattern + ')', 'gi');
      return safe.replace(re, '<mark>$1</mark>');
    } catch (e) {
      return safe;
    }
  }

  function buildSnippet(body, tokens) {
    if (!body) return '';
    var maxLen = 150;
    var lower = body.toLowerCase();
    var firstPos = -1;
    for (var i = 0; i < tokens.length; i++) {
      var pos = lower.indexOf(tokens[i]);
      if (pos !== -1 && (firstPos === -1 || pos < firstPos)) {
        firstPos = pos;
      }
    }
    if (firstPos === -1 || firstPos < 50) {
      var slice = body.slice(0, maxLen);
      return highlightText(slice + (body.length > maxLen ? '…' : ''), tokens);
    }
    var start = Math.max(0, firstPos - 40);
    var end = Math.min(body.length, start + maxLen);
    var prefix = start > 0 ? '…' : '';
    var suffix = end < body.length ? '…' : '';
    return prefix + highlightText(body.slice(start, end), tokens) + suffix;
  }

  function runQuery(rawQuery, filterKind) {
    var idx = ensureIndex();
    var q = String(rawQuery || '').trim().toLowerCase();
    if (!q) return { total: 0, groups: {}, flat: [], tokens: [] };

    var tokens = q.split(/\s+/).filter(Boolean);
    var scored = [];

    for (var i = 0; i < idx.length; i++) {
      var rec = idx[i];
      if (filterKind && filterKind !== 'all' && rec.kind !== filterKind) continue;

      var allMatched = true;
      var score = 0;

      for (var t = 0; t < tokens.length; t++) {
        var tok = tokens[t];
        var inTitle = rec.titleLower.indexOf(tok) !== -1;
        var inRoute = rec.routeLower.indexOf(tok) !== -1;
        var inContext = rec.contextLower.indexOf(tok) !== -1;
        var inBody = rec.bodyLower.indexOf(tok) !== -1;

        if (!inTitle && !inRoute && !inContext && !inBody) {
          allMatched = false;
          break;
        }
        if (rec.titleLower === tok || rec.routeLower === '#' + tok) score += 120;
        else if (inTitle) score += 50;
        if (inRoute) score += 35;
        if (inContext) score += 20;
        if (inBody) score += 10;
      }

      if (allMatched) {
        // Boost phrase match
        if (tokens.length > 1) {
          if (rec.titleLower.indexOf(q) !== -1) score += 60;
          else if (rec.bodyLower.indexOf(q) !== -1) score += 25;
        }
        scored.push({ rec: rec, score: score });
      }
    }

    scored.sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return a.rec.id - b.rec.id;
    });

    var groups = { ch: [], pp: [], pq: [], pm: [], pe: [] };
    var limitPerGroup = (filterKind && filterKind !== 'all') ? 45 : 12;

    for (var j = 0; j < scored.length; j++) {
      var item = scored[j].rec;
      if (groups[item.kind] && groups[item.kind].length < limitPerGroup) {
        groups[item.kind].push(item);
      }
    }

    var flat = [];
    ['ch', 'pp', 'pq', 'pm', 'pe'].forEach(function (k) {
      for (var m = 0; m < groups[k].length; m++) {
        flat.push(groups[k][m]);
      }
    });

    return {
      total: scored.length,
      groups: groups,
      flat: flat,
      tokens: tokens
    };
  }

  function renderEmptyState(container, liveEl) {
    loadRecent();
    currentResults = [];
    activeIdx = -1;
    if (liveEl) liveEl.textContent = 'Type to search across all chapters, past papers, practice worksheets, and predicted questions.';

    var html = '<div class="search-empty-wrap" style="padding:var(--s-3) var(--s-2)">';

    if (recentSearches.length > 0) {
      html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:var(--s-2)">' +
        '<span class="search-group-title" style="margin:0">Recent searches</span>' +
        '<button type="button" class="btn btn-ghost" data-search-action="clear-recent" style="min-height:26px;padding:2px 8px;font-size:var(--fs-xs)">Clear</button>' +
      '</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--s-4)">';
      for (var i = 0; i < recentSearches.length; i++) {
        var rq = recentSearches[i];
        html += '<button type="button" class="chip" data-search-query="' + escHtml(rq) + '" style="cursor:pointer">' +
          '<svg class="ic" width="12" height="12" aria-hidden="true"><use href="#i-search"/></svg> ' + escHtml(rq) +
        '</button>';
      }
      html += '</div>';
    }

    html += '<div class="search-group-title" style="margin-bottom:var(--s-2)">Suggested statistical topics &amp; question IDs</div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:var(--s-3)">';
    for (var j = 0; j < EXAMPLE_QUERIES.length; j++) {
      var eq = EXAMPLE_QUERIES[j];
      html += '<button type="button" class="chip" data-search-query="' + escHtml(eq) + '" style="cursor:pointer">' + escHtml(eq) + '</button>';
    }
    html += '</div>' +
      '<p style="margin:var(--s-3) 0 0;font-size:var(--fs-xs);color:var(--ink-3)">' +
        'Tip: Use <kbd class="chip">↑</kbd> <kbd class="chip">↓</kbd> to navigate results and <kbd class="chip">Enter</kbd> to open. Hidden answers are never indexed so search will not spoil past paper or worksheet solutions.' +
      '</p>' +
    '</div>';

    container.innerHTML = html;
  }

  function renderSearchResults() {
    var input = document.getElementById('search-input');
    var container = document.getElementById('search-results');
    var liveEl = document.getElementById('search-live');
    if (!input || !container) return;

    var rawQuery = input.value || '';
    if (!rawQuery.trim()) {
      renderEmptyState(container, liveEl);
      return;
    }

    var res = runQuery(rawQuery, activeFilter);
    currentResults = res.flat;
    activeIdx = currentResults.length > 0 ? 0 : -1;

    if (liveEl) {
      liveEl.textContent = res.total + ' result' + (res.total === 1 ? '' : 's') + ' found for "' + rawQuery.trim() + '".';
    }

    if (currentResults.length === 0) {
      container.innerHTML =
        '<div style="padding:var(--s-5) var(--s-3);text-align:center;color:var(--ink-3)">' +
          '<svg class="empty-art" viewBox="0 0 120 72" aria-hidden="true" style="margin:0 auto var(--s-3);display:block">' +
            '<g transform="translate(60 36) rotate(-30)">' +
              '<ellipse rx="42" ry="19" fill="none" stroke="currentColor" stroke-width="1.25" stroke-dasharray="3 4"/>' +
              '<path d="M-50 0H50 M0 -26V26" stroke="currentColor" stroke-width="1" opacity=".45"/>' +
              '<circle r="2.2" fill="currentColor"/>' +
            '</g>' +
          '</svg>' +
          '<p style="margin:0 0 var(--s-2);font-size:var(--fs-base);color:var(--ink-2);font-weight:600">No matches for "' + escHtml(rawQuery.trim()) + '"</p>' +
          '<p style="margin:0 0 var(--s-3);font-size:var(--fs-xs)">Try fewer words, check spelling, or switch the section filter to <strong>All</strong>. (Note: PCR, Regression Diagnostics, and LDA are excluded from the course scope.)</p>' +
          '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px">' +
            EXAMPLE_QUERIES.slice(0, 5).map(function (eq) {
              return '<button type="button" class="chip" data-search-query="' + escHtml(eq) + '" style="cursor:pointer">' + escHtml(eq) + '</button>';
            }).join('') +
          '</div>' +
        '</div>';
      return;
    }

    var html = '';
    var flatIndex = 0;
    var order = ['ch', 'pp', 'pq', 'pm', 'pe'];

    for (var g = 0; g < order.length; g++) {
      var kind = order[g];
      var items = res.groups[kind];
      if (!items || items.length === 0) continue;

      html += '<div class="search-group">' +
        '<div class="search-group-title">' + escHtml(KIND_LABELS[kind]) + ' (' + items.length + ')</div>';

      for (var i = 0; i < items.length; i++) {
        var rec = items[i];
        var isUnofficial = (rec.kind === 'pm' || rec.kind === 'pe');
        var isSelected = (flatIndex === activeIdx);
        var titleHtml = highlightText(rec.title, res.tokens);
        var snippetHtml = buildSnippet(rec.body, res.tokens);

        html += '<a href="' + escHtml(rec.route) + '" class="search-item' + (isSelected ? ' is-active' : '') + '" ' +
          'role="option" id="search-opt-' + flatIndex + '" aria-selected="' + (isSelected ? 'true' : 'false') + '" ' +
          'data-search-idx="' + flatIndex + '" data-route="' + escHtml(rec.route) + '">' +
          '<div class="search-item-head">' +
            '<span class="search-item-title">' + titleHtml + '</span>' +
            '<span class="search-item-badges">' +
              (isUnofficial ? '<span class="chip chip-predicted">Unofficial</span>' : '') +
              '<span class="chip">' + escHtml(KIND_BADGES[rec.kind]) + '</span>' +
            '</span>' +
          '</div>' +
          '<div class="search-item-ctx">' + escHtml(rec.context) + '</div>' +
          (snippetHtml ? '<div class="search-snippet">' + snippetHtml + '</div>' : '') +
        '</a>';

        flatIndex++;
      }

      html += '</div>';
    }

    container.innerHTML = html;
  }

  function updateActiveItem(newIdx) {
    if (!currentResults.length) return;
    if (newIdx < 0) newIdx = currentResults.length - 1;
    if (newIdx >= currentResults.length) newIdx = 0;
    activeIdx = newIdx;

    var container = document.getElementById('search-results');
    if (!container) return;
    var items = container.querySelectorAll('.search-item');
    for (var i = 0; i < items.length; i++) {
      var match = (i === activeIdx);
      items[i].classList.toggle('is-active', match);
      items[i].setAttribute('aria-selected', match ? 'true' : 'false');
      if (match && typeof items[i].scrollIntoView === 'function') {
        items[i].scrollIntoView({ block: 'nearest' });
      }
    }
  }

  function navigateToResult(rec, newTab) {
    if (!rec) return;
    var input = document.getElementById('search-input');
    if (input && input.value.trim()) {
      saveRecent(input.value.trim());
    }
    var dlg = document.getElementById('dlg-search');
    if (newTab) {
      var base = window.location.href.split('#')[0];
      window.open(base + rec.route, '_blank', 'noopener');
      return;
    }
    if (dlg && dlg.open) {
      dlg.close();
    }
    if (window.location.hash === rec.route) {
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    } else {
      window.location.hash = rec.route;
    }
  }

  function initSearchModal() {
    var dlg = document.getElementById('dlg-search');
    var input = document.getElementById('search-input');
    var container = document.getElementById('search-results');
    if (!dlg || !input || !container) return;

    // Input typing handler
    input.addEventListener('input', function () {
      renderSearchResults();
    });

    // Keyboard navigation inside search dialog
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        if (currentResults.length > 0) {
          e.preventDefault();
          updateActiveItem(activeIdx + 1);
        }
      } else if (e.key === 'ArrowUp') {
        if (currentResults.length > 0) {
          e.preventDefault();
          updateActiveItem(activeIdx - 1);
        }
      } else if (e.key === 'Enter') {
        if (activeIdx >= 0 && currentResults[activeIdx]) {
          e.preventDefault();
          navigateToResult(currentResults[activeIdx], e.ctrlKey || e.metaKey);
        }
      }
    });

    // Filter chips & result clicks inside #dlg-search
    dlg.addEventListener('click', function (e) {
      var filterBtn = e.target.closest('[data-search-filter]');
      if (filterBtn) {
        e.preventDefault();
        activeFilter = filterBtn.getAttribute('data-search-filter') || 'all';
        var allChips = dlg.querySelectorAll('[data-search-filter]');
        for (var i = 0; i < allChips.length; i++) {
          var on = allChips[i] === filterBtn;
          allChips[i].classList.toggle('is-selected', on);
          allChips[i].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        renderSearchResults();
        input.focus();
        return;
      }

      var queryChip = e.target.closest('[data-search-query]');
      if (queryChip) {
        e.preventDefault();
        input.value = queryChip.getAttribute('data-search-query') || '';
        renderSearchResults();
        input.focus();
        return;
      }

      var clearBtn = e.target.closest('[data-search-action="clear-recent"]');
      if (clearBtn) {
        e.preventDefault();
        clearRecent();
        renderSearchResults();
        input.focus();
        return;
      }

      var itemEl = e.target.closest('.search-item');
      if (itemEl) {
        e.preventDefault();
        var idx = parseInt(itemEl.getAttribute('data-search-idx'), 10);
        var rec = currentResults[idx];
        if (rec) {
          navigateToResult(rec, e.ctrlKey || e.metaKey);
        }
      }
    });
  }

  window.DA2451_SEARCH = {
    init: initSearchModal,
    open: function (initialFilter) {
      ensureIndex();
      if (initialFilter) {
        activeFilter = initialFilter;
        var dlg = document.getElementById('dlg-search');
        if (dlg) {
          var allChips = dlg.querySelectorAll('[data-search-filter]');
          for (var i = 0; i < allChips.length; i++) {
            var on = allChips[i].getAttribute('data-search-filter') === activeFilter;
            allChips[i].classList.toggle('is-selected', on);
            allChips[i].setAttribute('aria-pressed', on ? 'true' : 'false');
          }
        }
      }
      renderSearchResults();
    },
    runQuery: runQuery,
    ensureIndex: ensureIndex
  };
})();
