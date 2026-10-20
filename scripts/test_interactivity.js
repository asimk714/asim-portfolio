const os = require('os');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { spawn } = require('child_process');

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9223;
const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:5000';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function httpPut(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = http.request({
      hostname: u.hostname,
      port: u.port,
      path: u.pathname + (u.search || ''),
      method: 'PUT'
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.end();
  });
}

async function runTest() {
  // 0. Preflight check for running server on BASE_URL
  try {
    await new Promise((resolve, reject) => {
      const targetUrl = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
      const client = targetUrl.startsWith('https:') ? require('https') : http;
      const req = client.get(targetUrl, { timeout: 4000 }, (res) => {
        resolve();
      });
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error(`Timeout connecting to ${BASE_URL}`)); });
    });
    console.log(`[OK] Server preflight passed: ${BASE_URL} is live.`);
  } catch (err) {
    console.error(`[FAIL] Server preflight failed: Server is not responding on ${BASE_URL}.`);
    console.error('Please ensure the web server is running before executing this test.');
    process.exit(1);
  }

  const tmpDir = path.join(os.tmpdir(), `chrome-test-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  const chromeProc = spawn(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    `--user-data-dir=${tmpDir}`,
    `--remote-debugging-port=${DEBUG_PORT}`,
    'about:blank'
  ]);

  await sleep(1500);

  try {
    const listJson = await httpGet(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
    const tabs = JSON.parse(listJson);
    const tab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension:') && t.webSocketDebuggerUrl) || tabs[0];
    const wsUrl = tab.webSocketDebuggerUrl;

    const ws = new WebSocket(wsUrl);
    await new Promise(res => ws.onopen = res);

    let id = 1;
    function send(method, params = {}, timeoutMs = 6000) {
      return new Promise((resolve, reject) => {
        const curId = id++;
        const timer = setTimeout(() => {
          ws.removeEventListener('message', handler);
          reject(new Error(`Timeout waiting for CDP response for ${method} (${timeoutMs}ms)`));
        }, timeoutMs);
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === curId) {
            clearTimeout(timer);
            ws.removeEventListener('message', handler);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    }

    const consoleMessages = [];
    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Console.messageAdded') {
        consoleMessages.push(msg.params.message.text);
      }
      if (msg.method === 'Runtime.consoleAPICalled') {
        consoleMessages.push(msg.params.args.map(a => a.value || a.description).join(' '));
      }
      if (msg.method === 'Runtime.exceptionThrown') {
        consoleMessages.push('EXCEPTION: ' + JSON.stringify(msg.params.exceptionDetails));
      }
    });

    await send('Console.enable');
    await send('Runtime.enable');
    await send('Page.enable');

    async function evaluate(expr) {
      const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
      if (res.exceptionDetails) {
        throw new Error(JSON.stringify(res.exceptionDetails));
      }
      return res.result ? res.result.value : null;
    }

    async function navigateTo(url, timeoutMs = 12000) {
      const p = new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          ws.removeEventListener('message', handler);
          reject(new Error(`Navigation timeout to ${url} after ${timeoutMs}ms`));
        }, timeoutMs);
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.method === 'Page.loadEventFired' || msg.method === 'Page.domContentEventFired') {
            clearTimeout(timer);
            ws.removeEventListener('message', handler);
            resolve();
          }
        };
        ws.addEventListener('message', handler);
      });
      await send('Page.navigate', { url });
      await p;
      await sleep(500);
    }

    console.log('--> Testing /work/windows-taskflow/live/...');
    await navigateTo(`${BASE_URL}/work/windows-taskflow/live/`);

    let wtState = await evaluate(`({
      hasTaskbarApps: document.querySelectorAll('.wt-taskbar-app-btn').length,
      saveBtnExists: !!document.getElementById('wt-save-workspace-btn'),
      openWindowsBefore: document.querySelectorAll('.wt-window').length
    })`);
    console.log('WT Live initial state:', wtState);

    // Click first app in taskbar
    await evaluate(`document.querySelector('.wt-taskbar-app-btn') && document.querySelector('.wt-taskbar-app-btn').click()`);
    await sleep(500);
    let openWindowsAfter = await evaluate(`document.querySelectorAll('.wt-window').length`);
    console.log('WT Live open windows after app click:', openWindowsAfter);

    // Save workspace
    await evaluate(`
      const input = document.getElementById('wt-workspace-name');
      if (input) input.value = 'Test Workspace';
      const btn = document.getElementById('wt-save-workspace-btn');
      if (btn) btn.click();
    `);
    await sleep(500);
    let savedWorkspaces = await evaluate(`document.querySelectorAll('.wt-workspace-item').length`);
    console.log('WT Live saved workspaces count:', savedWorkspaces);

    // 2. Test Standalone Windows 11 prototype: /static/prototypes/windows11/index.html
    console.log('\n--> Testing /static/prototypes/windows11/index.html...');
    await navigateTo(`${BASE_URL}/static/prototypes/windows11/index.html`);

    let win11State = await evaluate(`({
      activeView: document.querySelector('.view-section.active') ? document.querySelector('.view-section.active').id : null,
      slideViewerVisible: !!document.getElementById('view-slides'),
      protoViewVisible: !!document.getElementById('view-prototype'),
      btnProtoExists: !!document.getElementById('btn-view-prototype')
    })`);
    console.log('Win11 prototype initial state:', win11State);

    // Switch to prototype view
    await evaluate(`document.getElementById('btn-view-prototype').click()`);
    await sleep(500);
    let win11ViewAfter = await evaluate(`({
      activeView: document.querySelector('.view-section.active') ? document.querySelector('.view-section.active').id : null,
      desktopExists: !!document.getElementById('mock-desktop'),
      taskbarApps: document.querySelectorAll('.taskbar-app').length,
      windowsCount: document.querySelectorAll('.window').length
    })`);
    console.log('Win11 prototype view after switch:', win11ViewAfter);

    // 3. Test IRCTC live route: /work/irctc/live/
    console.log('\n--> Testing /work/irctc/live/...');
    await navigateTo(`${BASE_URL}/work/irctc/live/`);

    let irctcState = await evaluate(`({
      btnToggleCurrent: !!document.getElementById('irctc-btn-toggle-current'),
      btnToggleRedesign: !!document.getElementById('irctc-btn-toggle-redesign'),
      screenCurrentDisplay: document.getElementById('irctc-screen-current') ? document.getElementById('irctc-screen-current').style.display : null,
      screenRedesignDisplay: document.getElementById('irctc-screen-redesign') ? document.getElementById('irctc-screen-redesign').style.display : null,
      autofillBtn: !!document.getElementById('irctc-btn-autofill'),
      checkoutBtn: !!document.getElementById('irctc-btn-checkout')
    })`);
    console.log('IRCTC Live initial state:', irctcState);

    // Click Redesign Toggle
    await evaluate(`document.getElementById('irctc-btn-toggle-redesign').click()`);
    await sleep(500);
    let irctcAfterRedesign = await evaluate(`({
      screenCurrentDisplay: document.getElementById('irctc-screen-current').style.display,
      screenRedesignDisplay: document.getElementById('irctc-screen-redesign').style.display,
      latencyVal: document.getElementById('irctc-metric-latency-val').textContent
    })`);
    console.log('IRCTC Live after clicking redesign:', irctcAfterRedesign);

    // Click Autofill
    await evaluate(`document.getElementById('irctc-btn-autofill').click()`);
    await sleep(500);
    // Click Checkout
    await evaluate(`document.getElementById('irctc-btn-checkout').click()`);
    await sleep(1000);
    let irctcQueueState = await evaluate(`({
      waitingQueueDisplay: document.getElementById('irctc-waiting-queue') ? document.getElementById('irctc-waiting-queue').style.display : null,
      queuePos: document.getElementById('irctc-queue-position') ? document.getElementById('irctc-queue-position').textContent : null
    })`);
    console.log('IRCTC Live after checkout click (queue state):', irctcQueueState);

    // 4. Test Standalone IRCTC: /static/prototypes/irctc-checkout.html
    console.log('\n--> Testing /static/prototypes/irctc-checkout.html...');
    await navigateTo(`${BASE_URL}/static/prototypes/irctc-checkout.html`);

    let irctcStandalone = await evaluate(`({
      title: document.title,
      btnToggleCurrent: !!document.getElementById('btn-toggle-current'),
      btnToggleRedesign: !!document.getElementById('btn-toggle-redesign')
    })`);
    console.log('IRCTC Standalone prototype state:', irctcStandalone);

    console.log('\nConsole messages collected:', consoleMessages);

    ws.close();
  } finally {
    if (chromeProc && !chromeProc.killed) {
      chromeProc.kill();
    }
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (_) {}
  }
}

runTest().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
