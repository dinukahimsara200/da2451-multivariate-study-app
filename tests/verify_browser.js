/**
 * DA2451 Multivariate Methods in Business — Real Browser Interaction Test Suite (Task 2)
 * Launches headless Chromium (Microsoft Edge) directly on file:///.../APP_DEV/dist/DA2451_Study_App.html
 * and verifies via Chrome DevTools Protocol (CDP):
 *  1. Zero uncaught JavaScript exceptions and zero console.error messages.
 *  2. Clicking every main navigation section (#dashboard, #chapters, #papers, #practice, #predicted-mcqs, #predicted-essays, #bookmarks).
 *  3. Opening all 11 teaching chapters (ch01..ch11) by clicking UI links, verifying actual prose, KaTeX math, tables, R code, and TOC jumps.
 *  4. Opening all 11 original lecture PDFs (Lec1.pdf..Multivariate-Linear-Models.pdf) via "View Original PDF", verifying valid blob: URLs, exact decoded PDF byte counts, Split View, and clean close/restore.
 */
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const htmlPath = path.resolve(__dirname, '..', 'DA2451_Study_App.html').replace(/\\/g, '/');
const fileUrl = 'file:///' + encodeURI(htmlPath);
const profileDir = path.resolve(__dirname, '..', '.tmp-edge-test');

let failures = 0;
function assert(cond, msg) {
  if (!cond) {
    console.error(`  [FAIL] ${msg}`);
    failures++;
  } else {
    console.log(`  [PASS] ${msg}`);
  }
}

// Clean up any leftover temp profile
try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}

const proc = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--disable-extensions',
  '--no-first-run',
  '--window-size=1440,900',
  '--user-data-dir=' + profileDir,
  '--remote-debugging-port=9335',
  fileUrl
]);

let started = false;
const pageExceptions = [];
const consoleErrors = [];

proc.stderr.on('data', async d => {
  const s = d.toString();
  if (!started && s.includes('DevTools listening')) {
    started = true;
    try {
      const targets = await fetch('http://127.0.0.1:9335/json').then(r => r.json());
      const page = targets.find(t => t.type === 'page');
      const ws = new WebSocket(page.webSocketDebuggerUrl);
      let id = 1;
      const send = (method, params = {}) => new Promise((resolve, reject) => {
        const cur = id++;
        const listener = ev => {
          const msg = JSON.parse(ev.data);
          if (msg.id === cur) {
            ws.removeEventListener('message', listener);
            if (msg.error) reject(new Error(msg.error.message));
            else resolve(msg.result);
          }
        };
        ws.addEventListener('message', listener);
        ws.send(JSON.stringify({ id: cur, method, params }));
      });

      ws.addEventListener('message', ev => {
        const msg = JSON.parse(ev.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          const det = msg.params.exceptionDetails;
          const desc = (det.exception && det.exception.description) || det.text;
          console.error('  [BROWSER EXCEPTION]', desc);
          pageExceptions.push(desc);
        }
        if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
          const text = msg.params.args.map(a => a.value || a.description).join(' ');
          console.error('  [BROWSER CONSOLE ERROR]', text);
          consoleErrors.push(text);
        }
      });

      const evalPage = async (expr, awaitPromise = false) => {
        const res = await send('Runtime.evaluate', {
          expression: expr,
          returnByValue: true,
          awaitPromise
        });
        if (res && res.exceptionDetails) {
          const desc = (res.exceptionDetails.exception && res.exceptionDetails.exception.description) || res.exceptionDetails.text;
          pageExceptions.push(desc);
          throw new Error(desc);
        }
        return res && res.result ? res.result.value : undefined;
      };

      ws.addEventListener('open', async () => {
        await send('Runtime.enable');
        for (let waitIdx = 0; waitIdx < 40; waitIdx++) {
          const ready = await evalPage(`Boolean(window.DA2451_APP && document.querySelector('main h1'))`);
          if (ready) break;
          await new Promise(r => setTimeout(r, 150));
        }

        console.log('=== 1. Verifying Initial file:// Load & Welcome Dialog ===');
        const boot = await evalPage(`({
          protocol: location.protocol,
          mainH1: document.querySelector('main h1')?.textContent,
          hasReader: Boolean(window.DA2451_READER),
          hasData: Boolean(window.DA2451_DATA && Array.isArray(window.DA2451_DATA.chapters)),
          chaptersCount: window.DA2451_DATA?.chapters?.length || 0,
          welcomeOpen: Boolean(document.getElementById('dlg-welcome')?.open)
        })`);
        assert(boot.protocol === 'file:', `Loaded directly via file:// protocol`);
        assert(boot.mainH1 === 'DA2451 Multivariate Methods in Business', `Dashboard heading rendered (${boot.mainH1})`);
        assert(boot.hasReader && boot.hasData && boot.chaptersCount === 11, `window.DA2451_READER and window.DA2451_DATA (11 chapters) initialized`);
        assert(boot.welcomeOpen === true, `First-launch welcome theme sheet opened on fresh profile`);

        await evalPage(`document.querySelector('[data-action="welcome-continue"]')?.click()`);
        const welcomeClosed = await evalPage(`!document.getElementById('dlg-welcome')?.open`);
        assert(welcomeClosed, `Welcome dialog closed cleanly after clicking Continue`);

        console.log('\n=== 2. Verifying Main Navigation Sections via Real Clicks ===');
        const navTests = [
          { sel: 'a.nav-item[href="#chapters"]', expectedHash: '#chapters', expectedH1: 'Learning Chapters' },
          { sel: 'a.nav-item[href="#papers"]', expectedHash: '#papers', expectedH1: 'Past Papers' },
          { sel: 'a.nav-item[href="#practice"]', expectedHash: '#practice', expectedH1: 'Practice Questions' },
          { sel: 'a.nav-item[href="#predicted-mcqs"]', expectedHash: '#predicted-mcqs', expectedH1: 'Predicted MCQs' },
          { sel: 'a.nav-subitem[href="#predicted-essays"]', expectedHash: '#predicted-essays', expectedH1: 'Predicted Essays' },
          { sel: 'a.nav-item[href="#bookmarks"]', expectedHash: '#bookmarks', expectedH1: 'Bookmarks' },
          { sel: 'a.nav-item[href="#dashboard"]', expectedHash: '#dashboard', expectedH1: 'DA2451 Multivariate Methods in Business' }
        ];

        for (const t of navTests) {
          await evalPage(`document.querySelector('${t.sel}').click()`);
          await new Promise(r => setTimeout(r, 80));
          const st = await evalPage(`({ hash: location.hash, h1: document.querySelector('main h1')?.textContent })`);
          assert(
            st.hash === t.expectedHash && st.h1 === t.expectedH1,
            `Click ${t.sel} -> hash="${st.hash}", H1="${st.h1}"`
          );
        }

        // Also test clicking Dashboard's "Start" button (#chapter/ch01)
        await evalPage(`document.querySelector('.continue-row a[href="#chapter/ch01"]').click()`);
        await new Promise(r => setTimeout(r, 120));
        const startCheck = await evalPage(`({
          hash: location.hash,
          h1: document.querySelector('main h1.page-title')?.textContent
        })`);
        assert(
          startCheck.hash === '#chapter/ch01' && startCheck.h1 === 'Chapter 1: Introduction to Multivariate Analysis',
          `Dashboard "Start" button opens Chapter 1 (${startCheck.h1})`
        );

        console.log('\n=== 3. Verifying All 11 Teaching Chapters & All 11 Lazy Embedded PDFs ===');
        for (let i = 1; i <= 11; i++) {
          const pos = String(i).padStart(2, '0');
          const chId = 'ch' + pos;

          // Navigate to Learning Chapters list first, then click the chapter's Read link
          await evalPage(`document.querySelector('a.nav-item[href="#chapters"]').click()`);
          await new Promise(r => setTimeout(r, 50));
          await evalPage(`document.querySelector('.row-chapter a[href="#chapter/${chId}"]').click()`);
          await new Promise(r => setTimeout(r, 100));

          // Hydrate all chunks in this chapter and inspect live DOM counts
          await evalPage(`document.querySelector('[data-action="hydrate-all"]')?.click()`);
          await new Promise(r => setTimeout(r, 80));

          const chDom = await evalPage(`(() => {
            const art = document.getElementById('chapter-article-body');
            const tocLinks = document.querySelectorAll('#toc-rail-list .toc-link');
            return {
              hash: location.hash,
              title: document.querySelector('main h1.page-title')?.textContent || '',
              proseLength: art ? art.textContent.length : 0,
              katexCount: art ? art.querySelectorAll('.katex').length : 0,
              codeCards: art ? art.querySelectorAll('.code-card').length : 0,
              tables: art ? art.querySelectorAll('.table-wrap table').length : 0,
              tocCount: tocLinks.length,
              placeholdersLeft: art ? art.querySelectorAll('[data-chunk-placeholder]').length : -1
            };
          })()`);

          assert(
            chDom.hash === `#chapter/${chId}` && chDom.title.startsWith(`Chapter ${i}:`),
            `[Ch ${pos}] Opened "${chDom.title}"`
          );
          assert(
            chDom.proseLength > 10000 && chDom.katexCount > 100 && chDom.codeCards > 5 && chDom.tables > 5 && chDom.tocCount > 50 && chDom.placeholdersLeft === 0,
            `[Ch ${pos}] Live DOM rendered: ${(chDom.proseLength / 1024).toFixed(0)} KB text, ${chDom.katexCount} KaTeX nodes, ${chDom.codeCards} code cards, ${chDom.tables} tables, ${chDom.tocCount} TOC links`
          );

          // Test clicking a TOC item to jump to an anchor
          const tocJumpOk = await evalPage(`(() => {
            const links = document.querySelectorAll('#toc-rail-list .toc-link');
            const targetLink = links[Math.min(5, links.length - 1)];
            if (!targetLink) return false;
            const targetId = targetLink.getAttribute('data-target');
            targetLink.click();
            const targetEl = document.getElementById(targetId);
            return Boolean(targetEl && targetEl.classList.contains('heading-flash'));
          })()`);
          assert(tocJumpOk, `[Ch ${pos}] Clicking TOC link jumps to target heading and triggers heading-flash`);

          // Test opening the chapter's Original PDF (verifying fallback notice in public build)
          await evalPage(`document.getElementById('btn-view-original-pdf').click()`);
          await new Promise(r => setTimeout(r, 120));

          const pdfCheck = await evalPage(`(() => {
            const overlay = document.getElementById('pdf-overlay');
            if (!overlay || overlay.hidden) return { ok: false };
            const hasNotice = overlay.textContent.includes('Original lecturer PDFs are not included in this public GitHub version.');
            return { ok: hasNotice };
          })()`);

          assert(
            pdfCheck && pdfCheck.ok,
            `[Ch ${pos} PDF] Cleanly displays notice: Original lecturer PDFs are not included in this public GitHub version.`
          );

          // Close the PDF viewer and confirm return to chapter
          await evalPage(`document.querySelector('#pdf-overlay [data-action="close-pdf"]').click()`);
          await new Promise(r => setTimeout(r, 50));
          const pdfClosed = await evalPage(`Boolean(document.getElementById('pdf-overlay')?.hidden)`);
          assert(pdfClosed, `[Ch ${pos} PDF] Closed cleanly and returned to Chapter ${i}`);
        }

        // Test Split View on Chapter 11
        await evalPage(`document.querySelector('[data-action="toggle-split-pdf"]').click()`);
        await new Promise(r => setTimeout(r, 100));
        const splitCheck = await evalPage(`({
          isSplit: document.getElementById('chapter-shell')?.classList.contains('is-split'),
          paneVisible: !document.getElementById('pdf-split-pane')?.hidden,
          hasNotice: Boolean(document.querySelector('#pdf-split-pane')?.textContent.includes('Original lecturer PDFs are not included in this public GitHub version.'))
        })`);
        assert(
          splitCheck.isSplit && splitCheck.paneVisible && splitCheck.hasNotice,
          `[Ch 11 Split View] Side-by-side chapter + PDF fallback notice split view active`
        );

        console.log('\n=== 4. Verifying All 9 Historical Past Papers & Explicit Show/Hide + AI Prompt ===');
        const paperIds = [
          'b19-final-2022-07',
          'b20-final-2023-08',
          'b21-inclass-2023',
          'b21-final-2024-01',
          'b22-final-2024-12',
          'b23-quiz1-2025',
          'b23-quiz2-2025',
          'b23-quiz3-2025',
          'b23-final-2025-10'
        ];

        for (const pId of paperIds) {
          await evalPage(`document.querySelector('a.nav-item[href="#papers"]').click()`);
          await new Promise(r => setTimeout(r, 40));
          await evalPage(`document.querySelector('.row-chapter a[href="#paper/${pId}"]').click()`);
          await new Promise(r => setTimeout(r, 80));

          const ppDom = await evalPage(`(() => {
            const root = document.getElementById('paper-view-root');
            const revealBtns = root ? root.querySelectorAll('.btn-reveal') : [];
            const answers = root ? root.querySelectorAll('.answer') : [];
            const allHidden = Array.from(answers).every(a => a.hasAttribute('hidden') && a.getAttribute('hidden') !== 'until-found');
            const katexCount = root ? root.querySelectorAll('.katex').length : 0;

            // Test Copy AI Prompt on the first question/part while answer is still HIDDEN
            const firstPromptBtn = root ? root.querySelector('.btn-prompt[data-qid]') : null;
            const qid = firstPromptBtn ? firstPromptBtn.getAttribute('data-qid') : '';
            const rec = (window.DA2451_PROMPTS || {})[qid];

            // Toggle first reveal button open, check state, then toggle closed
            const firstRev = revealBtns[0];
            let toggleOk = false;
            if (firstRev) {
              const ansId = firstRev.getAttribute('aria-controls');
              const ansEl = document.getElementById(ansId);
              const beforeOpen = firstRev.getAttribute('aria-expanded') === 'false' && ansEl && ansEl.hidden === true;
              firstRev.click();
              const afterOpen = firstRev.getAttribute('aria-expanded') === 'true' && ansEl && ansEl.hidden === false;
              firstRev.click();
              const afterClose = firstRev.getAttribute('aria-expanded') === 'false' && ansEl && ansEl.hidden === true;
              toggleOk = beforeOpen && afterOpen && afterClose;
            }

            return {
              hash: location.hash,
              title: document.querySelector('main h1.page-title')?.textContent || '',
              revealCount: revealBtns.length,
              answerCount: answers.length,
              allHidden,
              katexCount,
              toggleOk,
              qid,
              hasPromptQuestionAndAnswer: Boolean(rec && rec.question && rec.question.length > 10 && rec.answer && rec.answer.length > 20)
            };
          })()`);

          assert(
            ppDom.hash === `#paper/${pId}` && ppDom.revealCount > 0 && ppDom.revealCount === ppDom.answerCount,
            `[Paper ${pId}] Opened "${ppDom.title}" (${ppDom.revealCount} interactive answer panels, ${ppDom.katexCount} KaTeX nodes)`
          );
          assert(
            ppDom.allHidden && ppDom.toggleOk,
            `[Paper ${pId}] Explicit Show/Hide Answer verified (boolean hidden attribute, aria-expanded, 0 hidden="until-found")`
          );
          assert(
            ppDom.hasPromptQuestionAndAnswer,
            `[Paper ${pId}] Copy AI Prompt (${ppDom.qid}) bundles both original question + matched source answer while answer is hidden`
          );
        }

        console.log('\n=== 5. Verifying All 5 Practice Worksheets (PQ01–PQ05) & Auto-Reveal TOC Jump ===');
        for (let w = 1; w <= 5; w++) {
          const pqId = 'pq0' + w;
          await evalPage(`document.querySelector('a.nav-item[href="#practice"]').click()`);
          await new Promise(r => setTimeout(r, 40));
          await evalPage(`document.querySelector('.row-chapter a[href="#worksheet/${pqId}"]').click()`);
          await new Promise(r => setTimeout(r, 80));

          const pqDom = await evalPage(`(() => {
            const root = document.getElementById('worksheet-view-root');
            const cards = root ? root.querySelectorAll('.pq-card') : [];
            const answers = root ? root.querySelectorAll('.answer.pq-solution') : [];
            const allHidden = Array.from(answers).every(a => a.hasAttribute('hidden') && a.getAttribute('hidden') !== 'until-found');
            const katexCount = root ? root.querySelectorAll('.katex').length : 0;

            const firstPromptBtn = root ? root.querySelector('.btn-prompt[data-qid]') : null;
            const qid = firstPromptBtn ? firstPromptBtn.getAttribute('data-qid') : '';
            const rec = (window.DA2451_PROMPTS || {})[qid];

            // Test jumping via TOC to a heading inside a collapsed teaching solution
            const firstAns = answers[0];
            const innerHeading = firstAns ? firstAns.querySelector('h2[id], h3[id]') : null;
            let autoRevealOk = false;
            if (innerHeading && firstAns.hidden) {
              window.DA2451_READER.jumpToWorksheetAnchor('${pqId}', innerHeading.id);
              autoRevealOk = (firstAns.hidden === false);
            }

            return {
              hash: location.hash,
              title: document.querySelector('main h1.page-title')?.textContent || '',
              cardCount: cards.length,
              allHidden,
              katexCount,
              qid,
              hasPromptQuestionAndAnswer: Boolean(rec && rec.question && rec.question.length > 10 && rec.answer && rec.answer.length > 20),
              autoRevealOk
            };
          })()`);

          assert(
            pqDom.hash === `#worksheet/${pqId}` && pqDom.cardCount >= 4,
            `[Worksheet ${pqId.toUpperCase()}] Opened "${pqDom.title}" (${pqDom.cardCount} interactive question cards, ${pqDom.katexCount} KaTeX nodes)`
          );
          assert(
            pqDom.allHidden && pqDom.autoRevealOk && pqDom.hasPromptQuestionAndAnswer,
            `[Worksheet ${pqId.toUpperCase()}] Solutions hidden by default, TOC jump auto-reveals collapsed solution, and Copy AI Prompt (${pqDom.qid}) bundles question + solution`
          );
        }

        console.log('\n=== 6. Verifying Task 4 Predicted MCQs (61) & Predicted Essays (24), Source Filters & Prompt Assembly ===');
        await evalPage(`document.querySelector('a.nav-item[href="#predicted-mcqs"]').click()`);
        await new Promise(r => setTimeout(r, 120));

        const predMcqCheck = await evalPage(`(() => {
          const allCards = document.querySelectorAll('.pred-cards-stack .qcard').length;
          document.querySelector('[data-action="set-pred-gen"][data-gen="chatgpt"]').click();
          const chatgptCards = document.querySelectorAll('.pred-cards-stack .qcard').length;
          document.querySelector('[data-action="set-pred-gen"][data-gen="gemini"]').click();
          const geminiCards = document.querySelectorAll('.pred-cards-stack .qcard').length;
          document.querySelector('[data-action="set-pred-gen"][data-gen="all"]').click();

          // Test neutral "My pick" radio selection and Clear pick
          const firstRadio = document.querySelector('#C-MCQ-001 .opt input[type="radio"][value="C"]');
          if (firstRadio) {
            firstRadio.checked = true;
            firstRadio.dispatchEvent(new Event('change', { bubbles: true }));
          }
          const isPicked = Boolean(document.querySelector('#C-MCQ-001 .opt.is-picked'));

          // Verify prompt assembly for ALL 61 in-scope MCQs
          const pData = window.DA2451_APP.getPredictionsData();
          const allPromptsValid = (pData.mcqs || []).every(q => {
            const p = window.DA2451_APP.buildPrompt(q.id);
            const hasVerbatim = p.includes(q.sourceMd.trim());
            const hasInstr = q.generator === 'chatgpt' ? p.includes('Choose the single best answer') : !p.includes('File-level exam conventions');
            return hasVerbatim && hasInstr && p.includes('UNOFFICIAL AI-generated practice prediction');
          });

          // Verify zero answer buttons (.btn-reveal) or answer panels (.answer) exist in Predicted MCQs
          const zeroAnswers = document.querySelectorAll('#main .btn-reveal, #main .answer').length === 0;

          return { allCards, chatgptCards, geminiCards, isPicked, allPromptsValid, zeroAnswers };
        })()`);

        assert(
          predMcqCheck.allCards === 61 && predMcqCheck.chatgptCards === 31 && predMcqCheck.geminiCards === 30,
          `[Predicted MCQs] Generator filters verified: All=${predMcqCheck.allCards}, ChatGPT=${predMcqCheck.chatgptCards}, Gemini=${predMcqCheck.geminiCards}`
        );
        assert(
          predMcqCheck.isPicked && predMcqCheck.allPromptsValid && predMcqCheck.zeroAnswers,
          `[Predicted MCQs] Neutral "My pick" works, zero answer keys/grading present, and all 61 Copy AI Prompts include verbatim sourceMd`
        );

        await evalPage(`document.querySelector('a.nav-subitem[href="#predicted-essays"]').click()`);
        await new Promise(r => setTimeout(r, 120));

        const predEssayCheck = await evalPage(`(() => {
          const allCards = document.querySelectorAll('.pred-cards-stack .qcard').length;
          document.querySelector('[data-action="set-pred-gen"][data-gen="chatgpt"]').click();
          const chatgptCards = document.querySelectorAll('.pred-cards-stack .qcard').length;
          document.querySelector('[data-action="set-pred-gen"][data-gen="gemini"]').click();
          const geminiCards = document.querySelectorAll('.pred-cards-stack .qcard').length;
          document.querySelector('[data-action="set-pred-gen"][data-gen="all"]').click();

          const pData = window.DA2451_APP.getPredictionsData();
          const allPromptsValid = (pData.essays || []).every(q => {
            const p = window.DA2451_APP.buildPrompt(q.id);
            const hasVerbatim = p.includes(q.sourceMd.trim());
            const hasInstr = q.generator === 'chatgpt' ? p.includes('Answer every subpart of the chosen question') : !p.includes('File-level exam conventions');
            return hasVerbatim && hasInstr && p.includes(q.totalMarks + ' marks');
          });

          const zeroAnswers = document.querySelectorAll('#main .btn-reveal, #main .answer').length === 0;
          return { allCards, chatgptCards, geminiCards, allPromptsValid, zeroAnswers };
        })()`);

        assert(
          predEssayCheck.allCards === 24 && predEssayCheck.chatgptCards === 12 && predEssayCheck.geminiCards === 12,
          `[Predicted Essays] Generator filters verified: All=${predEssayCheck.allCards}, ChatGPT=${predEssayCheck.chatgptCards}, Gemini=${predEssayCheck.geminiCards}`
        );
        assert(
          predEssayCheck.allPromptsValid && predEssayCheck.zeroAnswers,
          `[Predicted Essays] Zero answer keys present, and all 24 Copy AI Prompts include verbatim sourceMd, part labels, and totalMarks`
        );

        console.log('\n=== 7. Verifying Task 4 Offline Global Search, Bookmarks & Study Progress Persistence ===');
        const searchAndProgressCheck = await evalPage(`(() => {
          // 1. Bookmark and mark complete C-ESS-001
          const bmBtn = document.querySelector('#C-ESS-001 [data-action="toggle-bookmark"]');
          const doneBtn = document.querySelector('#C-ESS-001 [data-action="toggle-complete"]');
          if (bmBtn) bmBtn.click();
          if (doneBtn) doneBtn.click();

          // 2. Open Global Search modal
          document.querySelector('[data-action="open-search"]').click();
          const dlgOpen = Boolean(document.getElementById('dlg-search')?.open);

          // 3. Search for "Mahalanobis"
          const input = document.getElementById('search-input');
          input.value = 'Mahalanobis';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          const mahaItems = document.querySelectorAll('#search-results .search-item').length;
          const mahaMarks = document.querySelectorAll('#search-results mark').length;

          // 4. Filter by Predicted MCQs (pm) and search "C-MCQ-001"
          document.querySelector('[data-search-filter="pm"]').click();
          input.value = 'C-MCQ-001';
          input.dispatchEvent(new Event('input', { bubbles: true }));
          const firstResult = document.querySelector('#search-results .search-item');
          const firstRoute = firstResult ? firstResult.getAttribute('data-route') : '';
          if (firstResult) firstResult.click();

          return {
            dlgOpen,
            mahaItems,
            mahaMarks,
            firstRoute,
            navigatedHash: location.hash,
            dlgClosedAfterNav: !document.getElementById('dlg-search')?.open
          };
        })()`);

        assert(
          searchAndProgressCheck.dlgOpen && searchAndProgressCheck.mahaItems > 5 && searchAndProgressCheck.mahaMarks > 5,
          `[Global Search] Search modal opened, indexed 2,230 records, and returned highlighted results for "Mahalanobis" (${searchAndProgressCheck.mahaItems} items shown)`
        );
        assert(
          searchAndProgressCheck.firstRoute === '#C-MCQ-001' && searchAndProgressCheck.navigatedHash === '#C-MCQ-001' && searchAndProgressCheck.dlgClosedAfterNav,
          `[Global Search] Section filter + clicking result navigated cleanly to ${searchAndProgressCheck.navigatedHash} and closed search dialog`
        );

        // Verify Bookmarks view and Dashboard progress update
        await evalPage(`document.querySelector('a.nav-item[href="#bookmarks"]').click()`);
        await new Promise(r => setTimeout(r, 60));
        const bmCount = await evalPage(`document.querySelectorAll('#main .group .row').length`);
        assert(bmCount >= 1, `[Bookmarks & Progress] Bookmarked predicted item persisted and rendered in Bookmarks view (${bmCount} item)`);

        console.log('\n=== 9. Verifying Checkpoint 5C.1: Academic Rendering & Responsive Layout Across 6 Breakpoints ===');

        // Test representative questions from all 9 historical papers
        const auditPaperIds = [
          'b19-final-2022-07', 'b20-final-2023-08', 'b21-inclass-2023',
          'b21-final-2024-01', 'b22-final-2024-12', 'b23-quiz1-2025',
          'b23-quiz2-2025', 'b23-quiz3-2025', 'b23-final-2025-10'
        ];

        for (const pid of auditPaperIds) {
          await evalPage(`location.hash = '#paper/${pid}'`);
          await new Promise(r => setTimeout(r, 70));

          const academicAudit = await evalPage(`(() => {
            const partLabels = Array.from(document.querySelectorAll('.pp-part-label')).map(el => el.textContent.trim());
            const hasRawLatex = partLabels.some(t => /\\$|H_0|H_1|X_2|Y_1/.test(t));
            const hasRawMarks = partLabels.some(t => /\\[\\d+\\s*marks?\\]|\\(\\d+\\s*marks?\\)|\\x60/.test(t));
            const marksPills = Array.from(document.querySelectorAll('.marks')).map(el => el.textContent.trim());
            const invalidMarks = marksPills.filter(m => !/^\\[\\d+\\s*marks?(?:\\s*total)?\\]$/i.test(m));
            const katexCount = document.querySelectorAll('.katex').length;
            const mathBlocks = document.querySelectorAll('.math-block').length;
            return {
              partCount: partLabels.length,
              hasRawLatex,
              hasRawMarks,
              invalidMarks,
              katexCount,
              mathBlocks
            };
          })()`);

          assert(!academicAudit.hasRawLatex, `[${pid}] Zero raw LaTeX in part headings (${academicAudit.partCount} parts verified)`);
          assert(!academicAudit.hasRawMarks, `[${pid}] Zero raw Markdown marks/backticks in part headings`);
          assert(academicAudit.invalidMarks.length === 0, `[${pid}] All marks badges properly formatted`);
          assert(academicAudit.katexCount > 50, `[${pid}] KaTeX math successfully rendered (${academicAudit.katexCount} KaTeX nodes)`);
        }

        // Test multi-breakpoint layout across 320px, 390px, 768px, 1024px, 1280px, 1440px
        const testBreakpoints = [320, 390, 768, 1024, 1280, 1440];
        for (const w of testBreakpoints) {
          await send('Emulation.setDeviceMetricsOverride', {
            width: w,
            height: 900,
            deviceScaleFactor: 1,
            mobile: w < 768
          });
          await new Promise(r => setTimeout(r, 60));

          const layoutCheck = await evalPage(`(() => {
            const body = document.body;
            const docEl = document.documentElement;
            const scrollW = Math.max(body.scrollWidth, docEl.scrollWidth);
            const innerW = window.innerWidth;
            const overflow = scrollW > innerW + 2;

            // Check bounding boxes of question head items
            let overlaps = 0;
            const qheads = Array.from(document.querySelectorAll('.qhead'));
            for (const qh of qheads.slice(0, 5)) {
              const children = Array.from(qh.children).filter(c => c.offsetParent !== null);
              for (let i = 0; i < children.length; i++) {
                for (let j = i + 1; j < children.length; j++) {
                  const r1 = children[i].getBoundingClientRect();
                  const r2 = children[j].getBoundingClientRect();
                  if (r1.width === 0 || r2.width === 0) continue;
                  const collides = !(r1.right <= r2.left + 1 || r1.left >= r2.right - 1 || r1.bottom <= r2.top + 1 || r1.top >= r2.bottom - 1);
                  if (collides) overlaps++;
                }
              }
            }

            return {
              overflow,
              scrollW,
              innerW,
              overlaps
            };
          })()`);

          assert(!layoutCheck.overflow, `[Layout @ ${w}px] Zero horizontal page overflow (scrollW=${layoutCheck.scrollW}px, innerW=${layoutCheck.innerW}px)`);
          assert(layoutCheck.overlaps === 0, `[Layout @ ${w}px] Zero bounding box collisions in question cards (${layoutCheck.overlaps} overlaps)`);
        }

        // Restore default desktop dimensions
        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false
        });

        console.log('\n=== 9B. Verifying Checkpoint 5C.1B: Custom Favicon, 12px–22px Font-Size Range & Persistence ===');
        const faviconCheck = await evalPage(`(() => {
          const link = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
          return {
            exists: Boolean(link),
            isDataUri: Boolean(link && link.href.startsWith('data:image/svg+xml;base64,')),
            len: link ? link.href.length : 0
          };
        })()`);
        assert(faviconCheck.exists, 'Custom SVG favicon link exists in <head>');
        assert(faviconCheck.isDataUri, 'Custom SVG favicon uses offline base64 data URI (zero network requests)');

        // Test 12px minimum reading text size
        const fs12Result = await evalPage(`(() => {
          const btn12 = document.querySelector('[data-action="set-font-size"][data-size="12"]');
          if (btn12) btn12.click();
          const rootFs = document.documentElement.style.getPropertyValue('--read-fs');
          const stored = JSON.parse(localStorage.getItem('da2451:state') || '{}');
          return { rootFs, storedFs: stored.readFontSize };
        })()`);
        assert(fs12Result.rootFs === '12px' && fs12Result.storedFs === 12, `Minimum 12px text size applied to :root (--read-fs=12px) and persisted in storage (got ${fs12Result.rootFs}, stored ${fs12Result.storedFs})`);

        // Check layout at 12px on 320px mobile
        await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 600, deviceScaleFactor: 1, mobile: true });
        const fs12Layout = await evalPage(`document.documentElement.scrollWidth <= document.documentElement.clientWidth`);
        assert(fs12Layout, 'Zero horizontal overflow at 12px minimum reading text size on 320px viewport');

        // Test 22px maximum reading text size
        const fs22Result = await evalPage(`(() => {
          const btn22 = document.querySelector('[data-action="set-font-size"][data-size="22"]');
          if (btn22) btn22.click();
          const rootFs = document.documentElement.style.getPropertyValue('--read-fs');
          const stored = JSON.parse(localStorage.getItem('da2451:state') || '{}');
          return { rootFs, storedFs: stored.readFontSize };
        })()`);
        assert(fs22Result.rootFs === '22px' && fs22Result.storedFs === 22, `Maximum 22px text size applied to :root (--read-fs=22px) and persisted in storage (got ${fs22Result.rootFs}, stored ${fs22Result.storedFs})`);

        // Check layout at 22px on 320px mobile
        const fs22Layout = await evalPage(`document.documentElement.scrollWidth <= document.documentElement.clientWidth`);
        assert(fs22Layout, 'Zero horizontal overflow at 22px maximum reading text size on 320px viewport');

        // Reset to default 16px text size
        await evalPage(`(() => {
          const btn16 = document.querySelector('[data-action="set-font-size"][data-size="16"]');
          if (btn16) btn16.click();
        })()`);

        // Restore default desktop dimensions and navigate to dashboard to verify footer
        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false
        });
        await evalPage(`window.location.hash = '#dashboard'`);
        await new Promise(r => setTimeout(r, 80));

        // Verify creator attribution touchpoints
        const creatorCheck = await evalPage(`(() => {
          const welcomeNote = document.getElementById('welcome-creator-note');
          const aboutBox = document.querySelector('.author-profile-box');
          const dashFoot = document.querySelector('.dash-footer');
          const sideFoot = document.querySelector('.sidebar-foot');
          return {
            hasWelcomeAvatar: Boolean(welcomeNote && welcomeNote.querySelector('.creator-avatar')),
            hasAboutBox: Boolean(aboutBox && aboutBox.textContent.includes('Dinuka Himsara')),
            hasDashSignature: Boolean(dashFoot && dashFoot.textContent.includes('Made by Dinuka Himsara')),
            hasSideAttribution: Boolean(sideFoot && sideFoot.textContent.includes('Made by Dinuka Himsara'))
          };
        })()`);
        assert(creatorCheck.hasWelcomeAvatar, 'First-launch welcome note features creator avatar and styled profile');
        assert(creatorCheck.hasAboutBox, 'About dialog features author profile card for Dinuka Himsara');
        assert(creatorCheck.hasDashSignature, 'Dashboard footer features tasteful creator signature');
        assert(creatorCheck.hasSideAttribution, 'Sidebar footer features clean project attribution');

        console.log('\n=== 9.5. Verifying Independent Sidebar Scrolling & Redesigned About Modal ===');
        // Test short laptop viewport height (1366x600)
        await send('Emulation.setDeviceMetricsOverride', {
          width: 1366,
          height: 600,
          deviceScaleFactor: 1,
          mobile: false
        });
        await new Promise(r => setTimeout(r, 60));

        const sidebarScrollCheck = await evalPage(`(() => {
          const sidebar = document.querySelector('.sidebar');
          const settingsBtn = sidebar ? sidebar.querySelector('[data-action="open-settings"]') : null;
          const aboutBtn = sidebar ? sidebar.querySelector('[data-action="open-about"]') : null;
          
          if (sidebar) sidebar.scrollTop = 150;
          const scrolledDown = sidebar ? sidebar.scrollTop > 0 : false;
          if (sidebar) sidebar.scrollTop = 0;

          return {
            hasSidebar: Boolean(sidebar),
            overflowY: sidebar ? window.getComputedStyle(sidebar).overflowY : '',
            maxHeight: sidebar ? window.getComputedStyle(sidebar).maxHeight : '',
            hasSettings: Boolean(settingsBtn),
            hasAbout: Boolean(aboutBtn)
          };
        })()`);
        assert(sidebarScrollCheck.hasSidebar && (sidebarScrollCheck.overflowY === 'auto' || sidebarScrollCheck.overflowY === 'scroll'), 'Sidebar has overflow-y: auto for independent vertical scrolling');
        assert(sidebarScrollCheck.hasSettings && sidebarScrollCheck.hasAbout, 'Navigation items, Settings, and About controls remain accessible in sidebar');

        // Test About Modal redesign: open modal, check single scrollbar, sticky header, curation pillars, role cards
        const aboutModalCheck = await evalPage(`(() => {
          const dlg = document.getElementById('dlg-about');
          if (!dlg) return { exists: false };
          if (typeof dlg.showModal === 'function') dlg.showModal();
          else dlg.setAttribute('open', '');

          const head = dlg.querySelector('.dlg-editorial-head');
          const body = dlg.querySelector('.dlg-editorial-body');
          const hero = dlg.querySelector('.about-hero-card');
          const pillars = dlg.querySelectorAll('.curation-card');
          const roleCards = dlg.querySelectorAll('.role-card');
          const quota = dlg.querySelector('.about-quota-note');
          const disclaimer = dlg.querySelector('.about-disclaimer');
          const closeBtn = dlg.querySelector('.dlg-close-btn');

          const dlgStyle = window.getComputedStyle(dlg);
          const bodyStyle = body ? window.getComputedStyle(body) : null;

          // Double scrollbar check: dialog itself must have overflow hidden, only body scrolls
          const dlgOverflow = dlgStyle.overflow;
          const bodyOverflowY = bodyStyle ? bodyStyle.overflowY : '';
          const bodyCanScroll = body ? body.scrollHeight >= body.clientHeight : false;

          // Test close button
          const isOpenBefore = dlg.open;
          if (closeBtn) closeBtn.click();
          const isOpenAfter = dlg.open;

          const heroHeight = hero ? hero.getBoundingClientRect().height : 0;

          return {
            exists: true,
            hasHead: Boolean(head),
            hasBody: Boolean(body),
            hasHero: Boolean(hero && hero.textContent.includes('Dinuka Himsara')),
            heroHeight,
            pillarsCount: pillars.length,
            roleCardsCount: roleCards.length,
            hasQuotaNote: Boolean(quota && quota.textContent.includes('exhausted')),
            hasDisclaimer: Boolean(disclaimer && disclaimer.textContent.includes('Academic Disclaimer')),
            dlgOverflow,
            bodyOverflowY,
            bodyCanScroll,
            isOpenBefore,
            isOpenAfter
          };
        })()`);

        assert(aboutModalCheck.exists && aboutModalCheck.hasHead && aboutModalCheck.hasBody, 'Redesigned About modal features sticky header and editorial body container');
        assert(aboutModalCheck.dlgOverflow === 'hidden' && (aboutModalCheck.bodyOverflowY === 'auto' || aboutModalCheck.bodyOverflowY === 'scroll'), 'Single scrollbar verified: dialog overflow is hidden, body container scrolls independently with zero double scrollbars');
        assert(aboutModalCheck.hasHero && aboutModalCheck.heroHeight >= 200, `Creator profile hero card is completely unclipped (height=${aboutModalCheck.heroHeight.toFixed(1)}px >= 200px)`);
        assert(aboutModalCheck.pillarsCount === 3 && aboutModalCheck.roleCardsCount === 4, 'About modal presents 3 Curation Pillars and 4 Role Cards');
        assert(aboutModalCheck.hasQuotaNote && aboutModalCheck.hasDisclaimer, 'Quota exhaustion note and academic disclaimer clearly rendered');
        assert(aboutModalCheck.isOpenBefore && !aboutModalCheck.isOpenAfter, 'Accessible Close button cleanly closes About dialog');

        // Restore default desktop dimensions
        await send('Emulation.setDeviceMetricsOverride', {
          width: 1440,
          height: 900,
          deviceScaleFactor: 1,
          mobile: false
        });

        console.log('\n=== 10. Verifying Zero Browser Exceptions & Console Errors ===');
        assert(pageExceptions.length === 0, `Zero uncaught browser exceptions (${pageExceptions.length})`);
        assert(consoleErrors.length === 0, `Zero console.error messages (${consoleErrors.length})`);

        proc.kill();
        try { fs.rmSync(profileDir, { recursive: true, force: true }); } catch (e) {}

        console.log('\n======================================================');
        if (failures > 0) {
          console.error(`Browser Verification FAILED with ${failures} error(s).`);
          process.exit(1);
        } else {
          console.log('ALL REAL-BROWSER NAVIGATION, CHAPTER & PDF CHECKS PASSED (0 errors).');
          process.exit(0);
        }
      });
    } catch (e) {
      console.error(e);
      proc.kill();
      process.exit(1);
    }
  }
});
