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
  console.log('1. Setting up Local...');
  const local = await setupPage('http://localhost:3000/', 9310);

  const localData = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const faq = document.querySelector("#faqs");
      const cta = document.querySelector("#closing-cta");
      const footer = document.querySelector("#contact");
      const h = cta ? cta.querySelector(".font-sans.font-medium") : null;
      const btn = cta ? cta.querySelector("a[href='#contact']") : null;
      const proof = cta ? cta.querySelector(".font-mono.tracking-\\\\[0\\\\.25em\\\\]") : null;
      const img = cta ? cta.querySelector("img") : null;
      
      const rect = el => el ? {
        top: el.getBoundingClientRect().top + window.scrollY,
        bottom: el.getBoundingClientRect().bottom + window.scrollY,
        height: el.getBoundingClientRect().height,
        width: el.getBoundingClientRect().width,
      } : null;

      const style = el => el ? {
        fontSize: window.getComputedStyle(el).fontSize,
        lineHeight: window.getComputedStyle(el).lineHeight,
        letterSpacing: window.getComputedStyle(el).letterSpacing,
        fontWeight: window.getComputedStyle(el).fontWeight,
        color: window.getComputedStyle(el).color,
        fontFamily: window.getComputedStyle(el).fontFamily,
      } : null;

      return {
        faqRect: rect(faq),
        ctaRect: rect(cta),
        footerRect: rect(footer),
        headingStyle: style(h),
        buttonStyle: style(btn),
        imageTransform: img ? window.getComputedStyle(img.parentElement).transform : null
      };
    })()`,
    returnByValue: true
  });

  console.log('Local Measurements:', JSON.stringify(localData.result.value, null, 2));
  const { ctaRect: locCta } = localData.result.value;

  // Local Entry: top of #closing-cta
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${locCta.top}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssLocEntry = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-closing-cta-entry.png'), Buffer.from(ssLocEntry.data, 'base64'));
  console.log('Saved local-closing-cta-entry.png');

  // Local Button: slightly scrolled down so button is fully in view
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${locCta.top + 260}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssLocButton = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-closing-cta-button.png'), Buffer.from(ssLocButton.data, 'base64'));
  console.log('Saved local-closing-cta-button.png');

  // Local Mid: middle of #closing-cta
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${locCta.top + 500}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssLocMid = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-closing-cta-mid.png'), Buffer.from(ssLocMid.data, 'base64'));
  console.log('Saved local-closing-cta-mid.png');

  // Local Bottom: proof area at bottom of #closing-cta
  await local.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${locCta.top + locCta.height - 720}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssLocBottom = await local.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'local-closing-cta-bottom.png'), Buffer.from(ssLocBottom.data, 'base64'));
  console.log('Saved local-closing-cta-bottom.png');

  // Check parallax transform when scrolled to bottom
  const locParallax = await local.send('Runtime.evaluate', {
    expression: `(() => {
      const cta = document.querySelector("#closing-cta");
      const imgWrap = cta ? cta.querySelector(".h-\\\\[calc\\\\(100\\\\%\\\\+300px\\\\)\\\\]") : null;
      return imgWrap ? window.getComputedStyle(imgWrap).transform : null;
    })()`,
    returnByValue: true
  });
  console.log('Local Parallax Transform at bottom:', locParallax.result.value);

  local.chrome.kill();

  console.log('2. Setting up Reference...');
  const ref = await setupPage('https://bymonolog.com/', 9311);

  const refData = await ref.send('Runtime.evaluate', {
    expression: `(() => {
      const faq = document.querySelector("#faqs");
      const cta = document.querySelector(".cta_home_wrap");
      const footer = document.querySelector(".footer_wrap_main");
      const rect = el => el ? {
        top: el.getBoundingClientRect().top + window.scrollY,
        bottom: el.getBoundingClientRect().bottom + window.scrollY,
        height: el.getBoundingClientRect().height,
        width: el.getBoundingClientRect().width,
      } : null;
      return {
        faqRect: rect(faq),
        ctaRect: rect(cta),
        footerRect: rect(footer)
      };
    })()`,
    returnByValue: true
  });
  console.log('Ref Measurements:', JSON.stringify(refData.result.value, null, 2));
  const { ctaRect: refCta } = refData.result.value;

  // Ref Entry
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refCta.top}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssRefEntry = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-closing-cta-entry.png'), Buffer.from(ssRefEntry.data, 'base64'));
  console.log('Saved reference-closing-cta-entry.png');

  // Ref Button
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refCta.top + 260}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssRefButton = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-closing-cta-button.png'), Buffer.from(ssRefButton.data, 'base64'));
  console.log('Saved reference-closing-cta-button.png');

  // Ref Mid
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refCta.top + 500}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssRefMid = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-closing-cta-mid.png'), Buffer.from(ssRefMid.data, 'base64'));
  console.log('Saved reference-closing-cta-mid.png');

  // Ref Bottom
  await ref.send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${refCta.top + refCta.height - 720}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1200));
  const ssRefBottom = await ref.send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-closing-cta-bottom.png'), Buffer.from(ssRefBottom.data, 'base64'));
  console.log('Saved reference-closing-cta-bottom.png');

  ref.chrome.kill();
  console.log('Done capturing all screenshots!');
}

run().catch(console.error);
