const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'C:\\Users\\asimk\\.gemini\\antigravity\\brain\\e9364a0b-ff17-4d1d-a480-9aae633f75cd\\screenshots';
const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:8080';
const PORT = 9334;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'chrome-vp-'));
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--disable-gpu',
    '--no-sandbox',
    '--disable-extensions',
    '--user-data-dir=' + tmpDir,
    '--window-size=1440,900'
  ]);

  try {
    await sleep(1500);
    const tabs = await fetchJson(`http://127.0.0.1:${PORT}/json`);
    const pageTab = tabs.find(t => t.type === 'page' && !t.url.startsWith('chrome-extension:'));
    if (!pageTab) throw new Error('No valid page tab found');

    const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    });

    let msgId = 0;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = ++msgId;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === id) {
            ws.removeEventListener('message', handler);
            if (msg.error) reject(msg.error);
            else resolve(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const consoleErrors = [];
    ws.addEventListener('message', (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.method === 'Runtime.exceptionThrown') {
        consoleErrors.push(msg.params.exceptionDetails.text || JSON.stringify(msg.params.exceptionDetails));
      }
      if (msg.method === 'Console.messageAdded' && msg.params.message.level === 'error') {
        consoleErrors.push(msg.params.message.text);
      }
    });

    await send('Page.enable');
    await send('Runtime.enable');
    await send('Console.enable');

    async function evaluate(expression) {
      const res = await send('Runtime.evaluate', { expression, returnByValue: true });
      if (res.exceptionDetails) {
        throw new Error(JSON.stringify(res.exceptionDetails));
      }
      return res.result ? res.result.value : null;
    }

    async function setViewport(width, height, isMobile) {
      await send('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: isMobile ? 2 : 1,
        mobile: isMobile
      });
      await sleep(300);
    }

    async function navigateTo(url) {
      await send('Page.navigate', { url });
      await sleep(1000);
      await evaluate(`document.querySelectorAll('.reveal').forEach(el => el.classList.add('reveal--visible'))`);
      await sleep(300);
    }

    async function captureScreenshot(filepath) {
      const data = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(filepath, Buffer.from(data.data, 'base64'));
      console.log(`Saved screenshot: ${path.basename(filepath)} (${fs.statSync(filepath).size} bytes)`);
    }

    console.log(`\n============================================================`);
    console.log(`Verifying Viewports on Static Preview: ${BASE_URL}`);
    console.log(`============================================================\n`);

    const viewports = [
      { name: 'Desktop (1440x900)', width: 1440, height: 900, isMobile: false, tag: '1440x900' },
      { name: 'Mobile (375x812)', width: 375, height: 812, isMobile: true, tag: '375x812' }
    ];

    const testPages = [
      { path: '/', name: 'Homepage', capture: true, id: 'homepage' },
      { path: '/work/', name: 'Work Hub', capture: true, id: 'work_hub' },
      { path: '/work/windows-taskflow/live/', name: 'Windows Taskflow Live', capture: false },
      { path: '/work/irctc/live/', name: 'IRCTC Live', capture: false },
      { path: '/resume/', name: 'Resume', capture: false }
    ];

    for (const vp of viewports) {
      console.log(`\n--- Testing ${vp.name} ---`);
      await setViewport(vp.width, vp.height, vp.isMobile);

      for (const page of testPages) {
        const fullUrl = `${BASE_URL}${page.path}`;
        await navigateTo(fullUrl);

        const pageInfo = await evaluate(`({
          title: document.title,
          hasH1: !!document.querySelector('h1'),
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
        })`);

        console.log(`  [${vp.tag}] ${page.name.padEnd(24)} | Title: "${pageInfo.title.slice(0, 32)}..." | Overflow: ${pageInfo.hasHorizontalOverflow ? 'YES (FAIL)' : 'None (OK)'}`);

        if (pageInfo.hasHorizontalOverflow) {
          console.error(`    WARNING: Overflow detected on ${page.name} (${pageInfo.scrollWidth}px > ${pageInfo.clientWidth}px)`);
        }

        if (page.capture) {
          const ssName = `static_preview_${page.id}_${vp.tag}.png`;
          const ssPath = path.join(OUTPUT_DIR, ssName);
          await captureScreenshot(ssPath);
        }
      }
    }

    console.log(`\nConsole errors collected during testing: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach(e => console.log('  - ' + e));
    }

    ws.close();
  } finally {
    if (chromeProc && !chromeProc.killed) chromeProc.kill();
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch (e) {}
  }
}

main().catch(err => {
  console.error('Viewport verification error:', err);
  process.exit(1);
});
