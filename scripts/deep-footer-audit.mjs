import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const brainDir = '/home/junaid-khan/.gemini/antigravity/brain/baa2f004-910c-4dcc-8495-9c43c350f6b2';

async function main() {
  const chrome = spawn('/usr/bin/google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9325',
    '--no-sandbox',
    '--disable-gpu',
    '--window-size=1280,720',
    'about:blank'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const targets = await new Promise((resolve, reject) => {
    http.get('http://127.0.0.1:9325/json', res => {
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
  await send('DOM.enable');
  await send('CSS.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false,
  });

  console.log('Navigating to bymonolog.com...');
  await send('Page.navigate', { url: 'https://bymonolog.com/' });
  await new Promise(r => setTimeout(r, 7000));

  // Perform comprehensive evaluation of footer
  const auditData = await send('Runtime.evaluate', {
    expression: `(() => {
      const footer = document.querySelector("footer.footer_wrap_main");
      if (!footer) return { error: "No footer found" };

      const getRect = el => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: Math.round(r.x * 100) / 100,
          y: Math.round((r.y + window.scrollY) * 100) / 100,
          top: Math.round((r.top + window.scrollY) * 100) / 100,
          bottom: Math.round((r.bottom + window.scrollY) * 100) / 100,
          width: Math.round(r.width * 100) / 100,
          height: Math.round(r.height * 100) / 100,
          viewportTop: Math.round(r.top * 100) / 100
        };
      };

      const getStyles = el => {
        if (!el) return null;
        const cs = window.getComputedStyle(el);
        return {
          fontFamily: cs.fontFamily,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          textTransform: cs.textTransform,
          display: cs.display,
          position: cs.position,
          padding: cs.padding,
          margin: cs.margin,
          border: cs.border,
          borderRadius: cs.borderRadius,
          opacity: cs.opacity,
          transform: cs.transform,
          gap: cs.gap
        };
      };

      // 1. Navigation Block
      const navWrap = footer.querySelector(".footer_nav_wrap");
      const eyebrow = footer.querySelector(".footer_eyebrow");
      const navUl = footer.querySelector(".footer_nav_ul");
      const navItems = Array.from(footer.querySelectorAll(".footer_nav_li")).map(li => {
        const link = li.querySelector("a, button");
        const heading = li.querySelector("[data-hover-heading], .footer_nav_span:not(.is-arrow)");
        const arrow = li.querySelector("[data-footer-arrow], .footer_nav_span.is-arrow");
        return {
          tag: link ? link.tagName : li.tagName,
          text: heading ? heading.textContent.trim() : link ? link.textContent.trim() : li.textContent.trim(),
          href: link ? link.getAttribute("href") : null,
          rect: getRect(link || li),
          styles: getStyles(heading || link || li),
          arrowText: arrow ? arrow.textContent.trim() : null,
          arrowStyles: getStyles(arrow)
        };
      });

      // 2. Middle / Studio details
      const middleWebflow = footer.querySelector(".footer_middle_webflow");
      const middleEmail = footer.querySelector(".footer_middle_email");
      const middleLocation = footer.querySelector(".footer_middle_location, .footer_middle_text, .footer_middle_desc");
      // Search all text/links in middle
      const middleContainer = footer.querySelector(".footer_middle, .footer_middle_wrap");
      const allMiddleLinks = middleContainer ? Array.from(middleContainer.querySelectorAll("a")).map(a => ({
        text: a.textContent.trim(),
        href: a.getAttribute("href"),
        className: a.className,
        rect: getRect(a),
        styles: getStyles(a)
      })) : [];

      // 3. Socials
      const socialsWrap = footer.querySelector(".footer_socials_wrap, .footer_socials");
      const socialLinks = Array.from(footer.querySelectorAll(".footer_socials_link, a[href*='youtube'], a[href*='linkedin'], a[href*='instagram']")).map(a => ({
        text: a.textContent.trim(),
        href: a.getAttribute("href"),
        className: a.className,
        rect: getRect(a),
        styles: getStyles(a)
      }));

      // 4. Ask AI about MONOLOG
      const aiContainer = footer.querySelector(".footer_ai_wrap, .footer_ai_list, [data-footer-ai]");
      const aiLinks = Array.from(footer.querySelectorAll("a[href*='claude.ai'], a[href*='search?udm=50'], a[href*='chatgpt.com'], a[href*='grok.com'], a[href*='perplexity.ai'], .footer_ai_link")).map((a, idx) => {
        const svg = a.querySelector("svg");
        const img = a.querySelector("img");
        return {
          index: idx,
          text: a.textContent.trim() || a.getAttribute("aria-label") || a.getAttribute("title"),
          ariaLabel: a.getAttribute("aria-label"),
          title: a.getAttribute("title"),
          href: a.getAttribute("href"),
          className: a.className,
          rect: getRect(a),
          styles: getStyles(a),
          target: a.getAttribute("target"),
          rel: a.getAttribute("rel"),
          hasSvg: !!svg,
          svgViewBox: svg ? svg.getAttribute("viewBox") : null,
          svgHTML: svg ? svg.outerHTML.slice(0, 200) : null,
          hasImg: !!img,
          imgSrc: img ? img.getAttribute("src") : null
        };
      });

      // 5. Clock & seasonal
      const clockCanvas = footer.querySelector("#seasonal-canvas, .footer_bottom_canvas");
      const clockTime = footer.querySelector(".footer_bottom_time, .footer_time");
      const clockLocation = footer.querySelector(".footer_bottom_location");
      const clockDate = footer.querySelector(".footer_bottom_date");
      const clockContainer = footer.querySelector(".footer_bottom");

      // 6. Terminal WebGL Wordmark
      const terminalCanvas = footer.querySelector(".footer_canvas_item, canvas[data-engine]");
      const terminalSvg = footer.querySelector(".footer_canvas_svg");
      const terminalWrap = footer.querySelector(".footer_canvas_bottom");

      // 7. Full DOM Tree Outline
      function serializeNode(node, depth = 0) {
        if (depth > 6) return null;
        if (node.nodeType !== 1) return null;
        const tag = node.tagName.toLowerCase();
        const cls = node.className && typeof node.className === 'string' ? '.' + node.className.trim().split(/\\s+/).join('.') : '';
        const id = node.id ? '#' + node.id : '';
        const r = node.getBoundingClientRect();
        const textSnippet = node.children.length === 0 ? node.textContent.trim().slice(0, 40) : '';
        const children = Array.from(node.children).map(c => serializeNode(c, depth + 1)).filter(Boolean);
        return {
          selector: tag + id + cls,
          tag, id: node.id, cls: node.className,
          w: Math.round(r.width), h: Math.round(r.height),
          top: Math.round(r.top + window.scrollY),
          textSnippet,
          children
        };
      }

      return {
        footerRect: getRect(footer),
        footerStyles: getStyles(footer),
        navWrapRect: getRect(navWrap),
        eyebrowRect: getRect(eyebrow),
        eyebrowText: eyebrow ? eyebrow.textContent.trim() : null,
        eyebrowStyles: getStyles(eyebrow),
        navItems,
        middleContainerRect: getRect(middleContainer),
        allMiddleLinks,
        middleLocationText: middleLocation ? middleLocation.textContent.trim() : null,
        middleLocationStyles: getStyles(middleLocation),
        middleLocationRect: getRect(middleLocation),
        socialsWrapRect: getRect(socialsWrap),
        socialLinks,
        aiContainerRect: getRect(aiContainer),
        aiLinks,
        clock: {
          containerRect: getRect(clockContainer),
          canvasRect: getRect(clockCanvas),
          timeText: clockTime ? clockTime.textContent.trim() : null,
          timeStyles: getStyles(clockTime),
          locationText: clockLocation ? clockLocation.textContent.trim() : null,
          dateText: clockDate ? clockDate.textContent.trim() : null
        },
        terminal: {
          wrapRect: getRect(terminalWrap),
          canvasRect: getRect(terminalCanvas),
          canvasAttrs: terminalCanvas ? {
            width: terminalCanvas.getAttribute("width"),
            height: terminalCanvas.getAttribute("height"),
            dataEngine: terminalCanvas.getAttribute("data-engine"),
            style: terminalCanvas.getAttribute("style")
          } : null,
          svgAttrs: terminalSvg ? {
            viewBox: terminalSvg.getAttribute("viewBox"),
            className: terminalSvg.className,
            style: terminalSvg.getAttribute("style")
          } : null
        },
        treeOutline: serializeNode(footer)
      };
    })()`,
    returnByValue: true
  });

  const data = auditData.result.value;
  await fs.writeFile('/tmp/monolog_footer_raw.json', JSON.stringify(data, null, 2));
  console.log('Saved raw audit to /tmp/monolog_footer_raw.json');

  const { footerRect } = data;
  console.log('Footer bounds:', footerRect);

  // 1. reference-footer-entry.png (when footer enters into view, top aligned)
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${footerRect.top}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1500));
  const ssEntry = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-footer-entry.png'), Buffer.from(ssEntry.data, 'base64'));
  console.log('Saved reference-footer-entry.png');

  // 2. reference-footer-navigation.png (scrolled to show Navigation, Studio, Socials, AI)
  // Look at navWrapRect
  const navY = data.navWrapRect ? data.navWrapRect.top : footerRect.top;
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${navY - 60}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1500));
  const ssNav = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-footer-navigation.png'), Buffer.from(ssNav.data, 'base64'));
  console.log('Saved reference-footer-navigation.png');

  // 3. reference-footer-ai.png (focused on the AI links and middle row)
  const aiY = data.aiContainerRect ? data.aiContainerRect.top : navY + 200;
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${aiY - 180}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1500));
  const ssAi = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-footer-ai.png'), Buffer.from(ssAi.data, 'base64'));
  console.log('Saved reference-footer-ai.png');

  // 4. reference-footer-clock.png (scrolled to the clock & seasonal area)
  const clockY = data.clock.containerRect ? data.clock.containerRect.top : footerRect.top + 400;
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${clockY - 200}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1500));
  const ssClock = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-footer-clock.png'), Buffer.from(ssClock.data, 'base64'));
  console.log('Saved reference-footer-clock.png');

  // 5. reference-footer-wordmark.png (scrolled to the bottom terminal WebGL wordmark canvas)
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1500));
  const ssWordmark = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-footer-wordmark.png'), Buffer.from(ssWordmark.data, 'base64'));
  console.log('Saved reference-footer-wordmark.png');

  // 6. reference-footer-nav-hover.png (hover over second nav item: Work)
  // Scroll back to nav
  await send('Runtime.evaluate', {
    expression: `window.scrollTo({ top: ${navY - 60}, behavior: 'instant' })`
  });
  await new Promise(r => setTimeout(r, 1000));
  
  // Find Work link client coordinates
  const hoverCoord = await send('Runtime.evaluate', {
    expression: `(() => {
      const items = document.querySelectorAll(".footer_nav_li");
      const target = items[1] || items[0];
      const r = target.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    })()`,
    returnByValue: true
  });
  const { x: hx, y: hy } = hoverCoord.result.value;

  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: hx,
    y: hy
  });
  await new Promise(r => setTimeout(r, 800));
  const ssNavHover = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-footer-nav-hover.png'), Buffer.from(ssNavHover.data, 'base64'));
  console.log('Saved reference-footer-nav-hover.png');

  // 7. reference-footer-ai-hover.png (hover over first AI icon: Claude)
  const aiHoverCoord = await send('Runtime.evaluate', {
    expression: `(() => {
      const link = document.querySelector(".footer_ai_link");
      if (!link) return { x: 0, y: 0 };
      const r = link.getBoundingClientRect();
      return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
    })()`,
    returnByValue: true
  });
  const { x: ax, y: ay } = aiHoverCoord.result.value;
  await send('Input.dispatchMouseEvent', {
    type: 'mouseMoved',
    x: ax,
    y: ay
  });
  await new Promise(r => setTimeout(r, 800));
  const ssAiHover = await send('Page.captureScreenshot', { format: 'png' });
  await fs.writeFile(path.join(brainDir, 'reference-footer-ai-hover.png'), Buffer.from(ssAiHover.data, 'base64'));
  console.log('Saved reference-footer-ai-hover.png');

  chrome.kill();
  console.log('Finished capturing reference footer data and screenshots.');
}

main().catch(console.error);
