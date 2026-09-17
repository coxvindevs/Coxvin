import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const brainDir = '/home/junaid-khan/.gemini/antigravity/brain/baa2f004-910c-4dcc-8495-9c43c350f6b2';

async function setupPage(url, port) {
  const chrome = spawn('/usr/bin/google-chrome', [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1280,720',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const pageTarget = targets.find(t => t.type === 'page') || targets[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, 4500));

  return { chrome, send };
}

async function run() {
  console.log('Setting up Local on port 9340...');
  const local = await setupPage('http://localhost:3000/', 9340);

  // Evaluate local footer metrics
  const localData = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector("#contact");
      const infoWrap = footer ? footer.querySelector(".relative.z-10.w-full.min-h-\\\\[792\\\\.44px\\\\]") || footer.firstElementChild : null;
      const terminal = footer ? footer.querySelector(".h-\\\\[288px\\\\]") || footer.lastElementChild : null;
      const navWrap = footer ? footer.querySelector("ul") : null;
      const navLi = navWrap ? navWrap.querySelector("li") : null;
      const navLink = navLi ? navLi.querySelector("a") : null;
      const navLabel = navLink ? navLink.firstElementChild : null;
      const navArrow = navLink ? navLink.lastElementChild : null;
      const aside = footer ? footer.querySelector(".w-full.lg\\\\:w-\\\\[497\\\\.75px\\\\]") : null;
      const studio = aside ? aside.children[0] : null;
      const socials = aside ? aside.children[1] : null;
      const ai = aside ? aside.children[2] : null;
      const aiBtn = ai ? ai.querySelector("a") : null;
      const bottomGrid = footer ? footer.querySelector(".grid.grid-cols-1.md\\\\:grid-cols-3") : null;

      const rect = el => el ? {
        top: Math.round((el.getBoundingClientRect().top + window.scrollY) * 100) / 100,
        bottom: Math.round((el.getBoundingClientRect().bottom + window.scrollY) * 100) / 100,
        height: Math.round(el.getBoundingClientRect().height * 100) / 100,
        width: Math.round(el.getBoundingClientRect().width * 100) / 100,
      } : null;

      const style = el => el ? {
        fontSize: window.getComputedStyle(el).fontSize,
        lineHeight: window.getComputedStyle(el).lineHeight,
        letterSpacing: window.getComputedStyle(el).letterSpacing,
        fontWeight: window.getComputedStyle(el).fontWeight,
        fontFamily: window.getComputedStyle(el).fontFamily,
        color: window.getComputedStyle(el).color
      } : null;

      return {
        footerRect: rect(footer),
        infoWrapRect: rect(infoWrap),
        terminalRect: rect(terminal),
        navWrapRect: rect(navWrap),
        navLiRect: rect(navLi),
        navLabelStyle: style(navLabel),
        navArrowStyle: style(navArrow),
        asideRect: rect(aside),
        studioRect: rect(studio),
        socialsRect: rect(socials),
        aiRect: rect(ai),
        aiBtnRect: rect(aiBtn),
        bottomGridRect: rect(bottomGrid)
      };
    })()`,
    returnByValue: true
  });

  console.log('Local Footer Measurements:', JSON.stringify(localData.result.value, null, 2));
  const { footerRect, navWrapRect, aiRect, bottomGridRect, terminalRect } = localData.result.value;

  // 1. local-footer-navigation.png
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${footerRect.top}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssLocNav = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-footer-navigation.png'), Buffer.from(ssLocNav.data, 'base64'));
  console.log('Saved local-footer-navigation.png');

  // 2. local-footer-nav-hover.png
  const workItemCoord = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const items = document.querySelectorAll("#contact ul li");
      const target = items[1] || items[0];
      const r = target.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    })()`,
    returnByValue: true
  });
  const { x: nx, y: ny } = workItemCoord.result.value;
  await local.send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: nx,
    y: ny
  });
  await new Promise(r => setTimeout(r, 800));
  const ssLocNavHover = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-footer-nav-hover.png'), Buffer.from(ssLocNavHover.data, 'base64'));
  console.log('Saved local-footer-nav-hover.png');

  // 3. local-footer-ai.png
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${footerRect.top + 100}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  const ssLocAi = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-footer-ai.png'), Buffer.from(ssLocAi.data, 'base64'));
  console.log('Saved local-footer-ai.png');

  // 4. local-footer-ai-hover.png
  const aiCoord = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const btn = document.querySelector("#contact a[aria-label*='Claude']");
      if (!btn) return { x: 0, y: 0 };
      const r = btn.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    })()`,
    returnByValue: true
  });
  const { x: ax, y: ay } = aiCoord.result.value;
  await local.send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: ax,
    y: ay
  });
  await new Promise(r => setTimeout(r, 800));
  const ssLocAiHover = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-footer-ai-hover.png'), Buffer.from(ssLocAiHover.data, 'base64'));
  console.log('Saved local-footer-ai-hover.png');

  // 5. local-footer-clock.png
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${bottomGridRect ? bottomGridRect.top - 200 : footerRect.top + 500}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  const ssLocClock = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-footer-clock.png'), Buffer.from(ssLocClock.data, 'base64'));
  console.log('Saved local-footer-clock.png');

  // 6. local-footer-terminal.png
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssLocTerminal = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-footer-terminal.png'), Buffer.from(ssLocTerminal.data, 'base64'));
  console.log('Saved local-footer-terminal.png');

  // 7. local-footer-canvas-hold.png
  const termCoord = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const term = document.querySelector("#contact .h-\\\\[288px\\\\]");
      const r = term.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    })()`,
    returnByValue: true
  });
  const { x: tx, y: ty } = termCoord.result.value;
  // Dispatch mouse move to bring cursor over canvas
  await local.send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: tx,
    y: ty
  });
  await new Promise(r => setTimeout(r, 400));
  // Dispatch mouse press / hold
  await local.send('Input.dispatchMouseEvent', {
    type: 'mousePressed',
    button: 'left',
    x: tx,
    y: ty,
    clickCount: 1
  });
  // Wait for 1.2s to observe amplitude disruption
  await new Promise(r => setTimeout(r, 1200));
  const ssLocHold = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-footer-canvas-hold.png'), Buffer.from(ssLocHold.data, 'base64'));
  console.log('Saved local-footer-canvas-hold.png');

  // Release mouse
  await local.send('Input.dispatchMouseEvent', {
    type: 'mouseReleased',
    button: 'left',
    x: tx,
    y: ty
  });

  local.chrome.kill();
  console.log('All local captures complete!');
}

run().catch(console.error);
