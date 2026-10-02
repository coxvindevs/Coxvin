import{n as e,r as t,t as n}from"./index-DxwTJoEH.js";import{t as r}from"./arrow-right-DGc0NrX5.js";import{t as i}from"./arrow-up-right-CX5kz-Ad.js";var a=t(e(),1),o=n(),s=[`M`,`A`,`R`,`L`,`O`,`W`],c=(s.length-1)/2,l=[{at:0,x:17,y:-5,r:-14,s:1.15,o:1},{at:.9,x:29,y:6,r:16,s:.85,o:1},{at:1.9,x:-26,y:12,r:-34,s:1.2,o:1},{at:3,x:24,y:-4,r:22,s:.8,o:.7},{at:3.8,x:34,y:16,r:44,s:.6,o:0}],u=[{label:`Nib`,desc:`Hand-ground 14k gold, tuned wet on stone before it ships.`,value:`F · M · B`},{label:`Feed`,desc:`Hand-cut ebonite, matched to its own nib and barrel.`,value:`0.9 ml`},{label:`Barrel`,desc:`Machined acrylic, turned and polished in a single pass.`,value:`24 g`},{label:`Fill`,desc:`Piston mechanism, captive and serviceable at the bench.`,value:`Piston`}],d=[{label:`Acrylic`,desc:`Cast in small blocks and aged six weeks before machining.`,value:`Barrel`},{label:`Ebonite`,desc:`Rolled and cured in-house, then cut one feed at a time.`,value:`Feed`},{label:`Steel`,desc:`Cold-rolled strip, sprung and blued by heat.`,value:`Clip`},{label:`Gold`,desc:`14k stock, stamped first, then ground entirely by hand.`,value:`Nib`}],f=[{label:`Length, nib to barrel end`,desc:`Measured at rest, nib exposed`,value:`138 mm`},{label:`Length, posted`,desc:`Cap seated on the barrel end`,value:`159 mm`},{label:`Weight, empty`,desc:`Piston fully retracted`,value:`24 g`},{label:`Weight, filled`,desc:`At the full 0.9 ml capacity`,value:`25 g`},{label:`Capacity`,desc:`Piston at full travel`,value:`0.9 ml`},{label:`Max diameter`,desc:`At the cap band`,value:`12.4 mm`},{label:`Nib projection`,desc:`From the section face`,value:`21 mm`}],p=[{key:`fine`,label:`Fine`,d:`M96 192 C96 84 156 84 156 186 C156 84 216 84 216 186 C216 84 276 84 276 192`,width:2.4,facts:[`LINE WIDTH · 0.4 MM`,`DOWN-STROKE · 0.6 MM`,`INK · 1.8 MG/M`]},{key:`medium`,label:`Medium`,d:`M96 96 C128 186 168 186 204 116 C240 188 282 188 322 100 C352 156 404 180 452 136`,width:4,facts:[`LINE WIDTH · 0.7 MM`,`DOWN-STROKE · 1.0 MM`,`INK · 2.4 MG/M`]},{key:`broad`,label:`Broad`,d:`M120 192 L120 76 M120 76 L340 192 M340 192 L340 76`,width:6.5,facts:[`LINE WIDTH · 1.1 MM`,`DOWN-STROKE · 1.6 MM`,`INK · 3.0 MG/M`]}],m=`
.ws-root{
  --ws-ground:#EFE9DD;
  --ws-ground2:#E5DED0;
  --ws-ink:#141C2B;
  --ws-ink2:#4A5364;
  --ws-muted:#767E8C;
  --ws-blue:#2C4A8F;
  --ws-hair:rgba(20,28,43,.16);
  --ws-serif:'Newsreader',Georgia,'Times New Roman',serif;
  --ws-mono:'Courier Prime','Courier New',monospace;
  background:var(--ws-ground);
  color:var(--ws-ink);
  font-family:var(--ws-serif);
  -webkit-font-smoothing:antialiased;
  overflow:hidden;
  position:relative;
}
.ws-root ::selection{background:var(--ws-ink);color:var(--ws-ground);}
.ws-root :focus-visible{outline:2px solid var(--ws-blue);outline-offset:3px;border-radius:0;}

/* --- type helpers ---------------------------------------------------- */
.ws-kicker{
  font-family:var(--ws-mono);font-size:11px;font-weight:400;
  letter-spacing:.1em;text-transform:uppercase;color:var(--ws-ink2);margin:0;
}
.ws-lede{
  font-family:var(--ws-mono);font-size:12px;font-weight:400;
  letter-spacing:.07em;line-height:1.9;color:var(--ws-ink2);margin:20px 0 0;max-width:46ch;
}
.ws-h2{
  font-family:var(--ws-serif);font-weight:500;
  font-size:clamp(28px,3.4vw,52px);line-height:1.1;letter-spacing:-.02em;
  color:var(--ws-ink);margin:18px 0 0;max-width:18ch;
}
.ws-h1 em,.ws-h2 em{font-style:italic;color:var(--ws-blue);}
.ws-lift{position:relative;z-index:3;}

/* --- reveal grammar --------------------------------------------------
   Entry reveals are scoped to .ws-js, a class added only after confirming
   prefers-reduced-motion is NOT set. Without it every element is visible.
   Reveals fire once (observer unobserves); scroll-bound motion is handled
   in JS and is fully reversible. ------------------------------------ */
.ws-js .ws-reveal{
  opacity:0;transform:translateY(26px);
  transition:opacity .9s ease,transform .9s cubic-bezier(.22,.6,.2,1);
}
.ws-js .ws-reveal.ws-in{opacity:1;transform:none;}
.ws-js .ws-word-in{opacity:0;animation:ws-word-in 1.1s cubic-bezier(.22,.6,.2,1) .15s both;}
@keyframes ws-word-in{
  from{opacity:0;transform:translateY(28px);}
  to{opacity:1;transform:none;}
}
.ws-js .ws-facts{animation:ws-facts-in .45s ease both;}
@keyframes ws-facts-in{from{opacity:0;}to{opacity:1;}}

/* --- navigation ------------------------------------------------------ */
.ws-nav{
  position:fixed;top:0;left:0;right:0;height:58px;z-index:50;
  display:flex;align-items:center;justify-content:space-between;gap:20px;
  padding:0 clamp(20px,4vw,56px);
  background:rgba(239,233,221,.82);
  -webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);
  border-bottom:1px solid var(--ws-hair);
}
.ws-brand{
  font-family:var(--ws-serif);font-weight:600;font-size:19px;
  letter-spacing:-.02em;color:var(--ws-ink);text-decoration:none;
}
.ws-brand .ws-dot{color:var(--ws-blue);}
.ws-nav-links{display:flex;gap:30px;}
.ws-nav-links a{
  font-family:var(--ws-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;
  color:var(--ws-ink2);text-decoration:none;transition:color .25s ease;
}
.ws-nav-links a:hover{color:var(--ws-blue);}
.ws-nav-sq{
  width:34px;height:34px;display:grid;place-items:center;
  border:1px solid rgba(20,28,43,.35);border-radius:0;
  background:transparent;color:var(--ws-ink);
  transition:border-color .25s ease,color .25s ease;
}
.ws-nav-sq:hover{border-color:var(--ws-blue);color:var(--ws-blue);}

/* --- buttons (radius 0 everywhere) ----------------------------------- */
.ws-btn{
  display:inline-flex;align-items:center;gap:10px;
  border-radius:0;border:1px solid transparent;padding:14px 24px;
  font-family:var(--ws-mono);font-size:12px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;text-decoration:none;cursor:pointer;
  transition:opacity .25s ease,border-color .25s ease,color .25s ease;
}
.ws-btn--ink{background:var(--ws-ink);color:var(--ws-ground);}
.ws-btn--ink:hover{opacity:.82;}
.ws-btn--line{border-color:rgba(20,28,43,.35);color:var(--ws-ink);background:transparent;}
.ws-btn--line:hover{border-color:var(--ws-blue);color:var(--ws-blue);}

/* --- hero ------------------------------------------------------------ */
.ws-hero{
  position:relative;min-height:100vh;display:flex;flex-direction:column;overflow:hidden;
  background:var(--ws-ground2);
  padding:calc(58px + 7vh) clamp(20px,4vw,56px) 0;
}
.ws-hero-copy{max-width:46vw;}
.ws-h1{
  font-family:var(--ws-serif);font-weight:500;
  font-size:clamp(32px,4.6vw,68px);line-height:1.06;letter-spacing:-.02em;
  color:var(--ws-ink);margin:24px 0 0;max-width:16ch;
}
.ws-hero-btns{display:flex;flex-wrap:wrap;gap:14px;margin-top:36px;}
.ws-spec{
  margin-top:auto;display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 26px;
  border-top:1px solid var(--ws-hair);padding:16px 0 22px;
  font-family:var(--ws-mono);font-size:11px;letter-spacing:.08em;color:var(--ws-ink2);
}

/* --- spread wordmark --------------------------------------------------
   Letter-by-letter flex row, justify-content:space-between, slightly wider
   than full width, translated down so the frame crops the baseline.
   --ws-spread (0..1 over the first 700px of scroll, set by JS) spreads the
   letters from the centre outward and sinks the row; it is scroll-bound
   and reversible. ---------------------------------------------------- */
.ws-word{
  display:flex;justify-content:space-between;width:106%;margin-left:-3%;
  font-family:var(--ws-serif);font-weight:600;
  font-size:clamp(56px,14.5vw,240px);line-height:.92;letter-spacing:-.03em;
  color:var(--ws-ink);user-select:none;
}
.ws-word span{transform:translateX(calc(var(--ws-o) * var(--ws-spread,0) * 7vw));}
.ws-word--hero{transform:translateY(calc(.16em + var(--ws-spread,0) * 36px));}
.ws-word--close{transform:translateY(.24em);}

/* --- travelling product ----------------------------------------------
   position:fixed cut-out, moved along a keyframed path by JS. It starts at
   the first stop in CSS so there is no flash before the first frame.
   Display-none under prefers-reduced-motion (bottom of sheet). ---------- */
.ws-product{
  position:fixed;left:50%;top:50%;z-index:2;
  width:clamp(240px,32vw,440px);pointer-events:none;
  transform:translate(-50%,-50%) translate(17vw,-4vh) rotate(-14deg) scale(1.15);
}
.ws-product svg{display:block;width:100%;height:auto;filter:drop-shadow(0 28px 42px rgba(20,28,43,.28));}

/* --- sections --------------------------------------------------------- */
.ws-section{padding:clamp(90px,13vh,150px) clamp(20px,4vw,56px);scroll-margin-top:70px;position:relative;}
.ws-ground2{background:var(--ws-ground2);}

/* --- two-column argument / material ----------------------------------- */
.ws-cols{display:grid;grid-template-columns:5fr 7fr;gap:clamp(40px,6vw,96px);}
.ws-rows{display:flex;flex-direction:column;}
.ws-row{
  display:grid;grid-template-columns:104px 1fr auto;gap:20px;align-items:baseline;
  border-top:1px solid var(--ws-hair);padding:18px 0;
}
.ws-rows .ws-row:last-child{border-bottom:1px solid var(--ws-hair);}
.ws-row-label{
  font-family:var(--ws-mono);font-size:11px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ws-blue);margin:0;
}
.ws-row-desc{
  font-family:var(--ws-mono);font-size:12px;letter-spacing:.07em;
  line-height:1.9;color:var(--ws-ink2);margin:0;
}
.ws-row-val{
  font-family:var(--ws-mono);font-size:12px;letter-spacing:.07em;
  color:var(--ws-ink);text-align:right;margin:0;white-space:nowrap;
}

/* --- demonstration ------------------------------------------------------ */
.ws-demo-top{
  display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;
  gap:22px;margin-bottom:36px;
}
.ws-variants{display:flex;gap:10px;}
.ws-variant{
  border:1px solid rgba(20,28,43,.35);border-radius:0;background:transparent;
  color:var(--ws-ink2);padding:10px 22px;
  font-family:var(--ws-mono);font-size:11px;font-weight:700;
  letter-spacing:.1em;text-transform:uppercase;cursor:pointer;
  transition:border-color .25s ease,color .25s ease;
}
.ws-variant:hover{color:var(--ws-blue);}
.ws-variant[aria-pressed="true"]{border-color:var(--ws-blue);color:var(--ws-blue);}
.ws-panel{border:1px solid var(--ws-hair);background:var(--ws-ground);}
.ws-demo-svg{display:block;width:100%;height:auto;}
.ws-guide{stroke:var(--ws-blue);stroke-width:1;opacity:.4;stroke-dasharray:1 6;}
.ws-demo-path{
  fill:none;stroke:var(--ws-ink);stroke-linecap:round;stroke-linejoin:round;
  stroke-dasharray:9999;stroke-dashoffset:9999;
}
.ws-facts{
  display:grid;grid-template-columns:repeat(3,1fr);gap:12px;
  border-top:1px solid var(--ws-hair);padding:14px 18px;
  font-family:var(--ws-mono);font-size:11px;letter-spacing:.08em;color:var(--ws-ink2);
}

/* --- measurements ------------------------------------------------------- */
.ws-measure-rows{max-width:820px;margin-top:44px;}
.ws-mrow{
  display:grid;grid-template-columns:220px 1fr auto;gap:20px;align-items:baseline;
  border-top:1px solid var(--ws-hair);padding:16px 0;
}
.ws-measure-rows .ws-mrow:last-child{border-bottom:1px solid var(--ws-hair);}
.ws-mlabel{
  font-family:var(--ws-mono);font-size:11px;font-weight:700;letter-spacing:.1em;
  text-transform:uppercase;color:var(--ws-ink);margin:0;
}
.ws-mval{font-variant-numeric:tabular-nums;white-space:nowrap;}

/* --- close --------------------------------------------------------------- */
.ws-close-btns{display:flex;flex-wrap:wrap;justify-content:space-between;gap:16px;margin-top:44px;}
.ws-fine{
  font-family:var(--ws-mono);font-size:11px;letter-spacing:.08em;line-height:1.9;
  color:var(--ws-muted);margin:26px 0 0;max-width:54ch;
}
.ws-footstrip{
  display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 26px;
  border-top:1px solid var(--ws-hair);margin-top:90px;padding:16px 0;
  font-family:var(--ws-mono);font-size:11px;letter-spacing:.08em;color:var(--ws-muted);
}

/* --- responsive ------------------------------------------------------------ */
@media (max-width:900px){
  .ws-hero-copy{max-width:100%;}
  .ws-cols{grid-template-columns:1fr;gap:44px;}
  .ws-row{grid-template-columns:1fr;gap:6px;}
  .ws-row-val{text-align:left;}
  .ws-mrow{grid-template-columns:1fr;gap:6px;}
  .ws-facts{grid-template-columns:1fr;}
  .ws-spec{flex-direction:column;}
  .ws-product{width:62vw;}
}

/* --- reduced motion ----------------------------------------------------------
   The travelling product disappears entirely; reveal rules never activate
   because .ws-js is never added; the page reads as a complete document. ---- */
@media (prefers-reduced-motion: reduce){
  .ws-product{display:none;}
}
`,h=e=>({"--ws-o":String(e)});function g(){let e=(0,a.useRef)(null),t=(0,a.useRef)(null),n=(0,a.useRef)(null),g=(0,a.useRef)(null),_=(0,a.useRef)(null),[v,y]=(0,a.useState)(`medium`),[b,x]=(0,a.useState)(!1),S=p.find(e=>e.key===v)??p[1];return(0,a.useEffect)(()=>{let e=`ws-google-fonts`;if(document.getElementById(e))return;let t=document.createElement(`link`);t.id=e,t.rel=`stylesheet`,t.href=`https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Newsreader:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap`,document.head.appendChild(t)},[]),(0,a.useEffect)(()=>{let t=e.current;if(!t||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;t.classList.add(`ws-js`);let n=Array.from(t.querySelectorAll(`.ws-reveal`)),r=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&(t.target.classList.add(`ws-in`),r.unobserve(t.target))},{threshold:.15,rootMargin:`0px 0px -6% 0px`});return n.forEach(e=>r.observe(e)),()=>r.disconnect()},[]),(0,a.useEffect)(()=>{if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let e=t.current,r=n.current;if(!e||!r)return;let i=0,a=e=>e*e*(3-2*e),o=()=>{i=0;let t=Math.max(1,window.innerHeight),n=window.scrollY/t,o=l[l.length-1].x,s=l[l.length-1].y,c=l[l.length-1].r,u=l[l.length-1].s,d=l[l.length-1].o;if(n<=l[0].at)({x:o,y:s,r:c,s:u,o:d}=l[0]);else{let e=0;for(;e<l.length-2&&n>l[e+1].at;)e++;let t=l[e],r=l[e+1];if(n>=r.at)({x:o,y:s,r:c,s:u,o:d}=r);else{let e=a((n-t.at)/(r.at-t.at));o=t.x+(r.x-t.x)*e,s=t.y+(r.y-t.y)*e,c=t.r+(r.r-t.r)*e,u=t.s+(r.s-t.s)*e,d=t.o+(r.o-t.o)*e}}e.style.transform=`translate(-50%, -50%) translate(`+o.toFixed(2)+`vw, `+s.toFixed(2)+`vh) rotate(`+c.toFixed(2)+`deg) scale(`+u.toFixed(3)+`)`,e.style.opacity=d.toFixed(3),e.style.visibility=d<=.004?`hidden`:`visible`;let f=Math.min(1,window.scrollY/700);r.style.setProperty(`--ws-spread`,f.toFixed(4))},s=()=>{i===0&&(i=requestAnimationFrame(o))};return o(),window.addEventListener(`scroll`,s,{passive:!0}),window.addEventListener(`resize`,s),()=>{window.removeEventListener(`scroll`,s),window.removeEventListener(`resize`,s),i!==0&&cancelAnimationFrame(i)}},[]),(0,a.useEffect)(()=>{if(window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){x(!0);return}let e=g.current;if(!e)return;let t=new IntersectionObserver(e=>{e.some(e=>e.isIntersecting)&&(x(!0),t.disconnect())},{threshold:.3});return t.observe(e),()=>t.disconnect()},[]),(0,a.useEffect)(()=>{let e=_.current;if(!e||!b)return;let t=e.getTotalLength();if(e.style.strokeDasharray=String(t),window.matchMedia(`(prefers-reduced-motion: reduce)`).matches){e.style.transition=`none`,e.style.strokeDashoffset=`0`;return}e.style.transition=`none`,e.style.strokeDashoffset=String(t),e.getBoundingClientRect(),e.style.transition=`stroke-dashoffset 2s cubic-bezier(.55,0,.25,1)`,e.style.strokeDashoffset=`0`},[b,v]),(0,o.jsxs)(`div`,{className:`ws-root`,id:`ws-top`,ref:e,children:[(0,o.jsx)(`style`,{children:m}),(0,o.jsxs)(`header`,{className:`ws-nav`,children:[(0,o.jsxs)(`a`,{className:`ws-brand`,href:`#ws-top`,children:[`Marlow`,(0,o.jsx)(`span`,{className:`ws-dot`,children:`.`})]}),(0,o.jsxs)(`nav`,{className:`ws-nav-links`,"aria-label":`Primary`,children:[(0,o.jsx)(`a`,{href:`#ws-demo`,children:`Demonstration`}),(0,o.jsx)(`a`,{href:`#ws-material`,children:`Material`}),(0,o.jsx)(`a`,{href:`#ws-measure`,children:`Measurements`})]}),(0,o.jsx)(`a`,{className:`ws-nav-sq`,href:`#ws-close`,"aria-label":`Reserve`,children:(0,o.jsx)(i,{size:15,strokeWidth:2,"aria-hidden":`true`})})]}),(0,o.jsx)(`div`,{className:`ws-product`,ref:t,"aria-hidden":`true`,children:(0,o.jsxs)(`svg`,{viewBox:`0 0 360 64`,xmlns:`http://www.w3.org/2000/svg`,focusable:`false`,children:[(0,o.jsx)(`path`,{d:`M6 32 L46 14 C52 12 58 16 58 22 L58 42 C58 48 52 52 46 50 L6 32 Z`,fill:`#141C2B`}),(0,o.jsx)(`circle`,{cx:`30`,cy:`32`,r:`2.6`,fill:`#EFE9DD`}),(0,o.jsx)(`rect`,{x:`9`,y:`31.2`,width:`17`,height:`1.6`,fill:`#EFE9DD`}),(0,o.jsx)(`rect`,{x:`58`,y:`17`,width:`42`,height:`30`,fill:`#141C2B`}),(0,o.jsx)(`rect`,{x:`92`,y:`17`,width:`2.5`,height:`30`,fill:`#EFE9DD`,opacity:`0.5`}),(0,o.jsx)(`path`,{d:`M100 17 H292 C320 17 334 24 334 32 C334 40 320 47 292 47 H100 Z`,fill:`#141C2B`}),(0,o.jsx)(`line`,{x1:`112`,y1:`23`,x2:`292`,y2:`23`,stroke:`#2C4A8F`,strokeWidth:`1.3`}),(0,o.jsx)(`rect`,{x:`112`,y:`41`,width:`180`,height:`1.2`,fill:`#EFE9DD`,opacity:`0.35`}),(0,o.jsx)(`path`,{d:`M312 4 C330 4 336 12 332 26 L330 32`,fill:`none`,stroke:`#141C2B`,strokeWidth:`4.5`,strokeLinecap:`square`})]})}),(0,o.jsxs)(`main`,{children:[(0,o.jsxs)(`section`,{className:`ws-hero`,children:[(0,o.jsxs)(`div`,{className:`ws-hero-copy ws-lift`,children:[(0,o.jsx)(`p`,{className:`ws-kicker ws-reveal`,children:`Marlow Pen Company · Workshop Series · No. 4`}),(0,o.jsxs)(`h1`,{className:`ws-h1 ws-reveal`,style:{transitionDelay:`90ms`},children:[`A pen that `,(0,o.jsx)(`em`,{children:`travels`}),` with the page.`]}),(0,o.jsx)(`p`,{className:`ws-lede ws-reveal`,style:{transitionDelay:`180ms`},children:`One barrel, one nib, ground to a line you can read. This page carries a single pen from headline to measurements — nothing about it is repeated except the object itself.`}),(0,o.jsxs)(`div`,{className:`ws-hero-btns ws-reveal`,style:{transitionDelay:`270ms`},children:[(0,o.jsxs)(`a`,{className:`ws-btn ws-btn--ink`,href:`#ws-close`,children:[`Reserve No. 4`,(0,o.jsx)(r,{size:14,strokeWidth:2.4,"aria-hidden":`true`})]}),(0,o.jsx)(`a`,{className:`ws-btn ws-btn--line`,href:`#ws-demo`,children:`See it write`})]})]}),(0,o.jsxs)(`div`,{className:`ws-spec ws-lift ws-reveal`,style:{transitionDelay:`340ms`},children:[(0,o.jsx)(`span`,{children:`NIB — 14K GOLD, F · M · B`}),(0,o.jsx)(`span`,{children:`LENGTH — 138 MM`}),(0,o.jsx)(`span`,{children:`WEIGHT — 24 G`}),(0,o.jsx)(`span`,{children:`FILL — PISTON, 0.9 ML`})]}),(0,o.jsx)(`div`,{className:`ws-word-in ws-lift`,children:(0,o.jsx)(`div`,{className:`ws-word ws-word--hero`,ref:n,"aria-hidden":`true`,children:s.map((e,t)=>(0,o.jsx)(`span`,{style:h(t-c),children:e},t))})})]}),(0,o.jsx)(`section`,{className:`ws-section`,id:`ws-argument`,children:(0,o.jsxs)(`div`,{className:`ws-cols ws-lift`,children:[(0,o.jsxs)(`div`,{className:`ws-reveal`,children:[(0,o.jsx)(`p`,{className:`ws-kicker`,children:`02 · The argument`}),(0,o.jsxs)(`h2`,{className:`ws-h2`,children:[`One object, `,(0,o.jsx)(`em`,{children:`carried`}),` through.`]}),(0,o.jsx)(`p`,{className:`ws-lede`,children:`Everything below refers to the same pen. The rows state what it is made of and what it does; the demonstration shows the line it makes; the measurements close the account.`})]}),(0,o.jsx)(`div`,{className:`ws-rows ws-reveal`,style:{transitionDelay:`120ms`},children:u.map(e=>(0,o.jsxs)(`div`,{className:`ws-row`,children:[(0,o.jsx)(`p`,{className:`ws-row-label`,children:e.label}),(0,o.jsx)(`p`,{className:`ws-row-desc`,children:e.desc}),(0,o.jsx)(`p`,{className:`ws-row-val`,children:e.value})]},e.label))})]})}),(0,o.jsx)(`section`,{className:`ws-section ws-ground2`,id:`ws-demo`,children:(0,o.jsxs)(`div`,{className:`ws-lift`,children:[(0,o.jsx)(`p`,{className:`ws-kicker ws-reveal`,children:`03 · Demonstration`}),(0,o.jsxs)(`div`,{className:`ws-demo-top`,children:[(0,o.jsxs)(`h2`,{className:`ws-h2 ws-reveal`,style:{transitionDelay:`80ms`},children:[`The line `,(0,o.jsx)(`em`,{children:`draws itself.`})]}),(0,o.jsx)(`div`,{className:`ws-variants ws-reveal`,role:`group`,"aria-label":`Nib variant`,children:p.map(e=>(0,o.jsx)(`button`,{type:`button`,className:`ws-variant`,"aria-pressed":v===e.key,onClick:()=>y(e.key),children:e.label},e.key))})]}),(0,o.jsxs)(`div`,{className:`ws-panel ws-reveal`,style:{transitionDelay:`160ms`},ref:g,children:[(0,o.jsxs)(`svg`,{className:`ws-demo-svg`,viewBox:`0 0 560 264`,role:`img`,"aria-label":`Sample line drawn by the `+S.label.toLowerCase()+` nib`,children:[(0,o.jsx)(`line`,{className:`ws-guide`,x1:`24`,y1:`72`,x2:`536`,y2:`72`}),(0,o.jsx)(`line`,{className:`ws-guide`,x1:`24`,y1:`192`,x2:`536`,y2:`192`}),(0,o.jsx)(`path`,{ref:_,className:`ws-demo-path`,d:S.d,strokeWidth:S.width})]}),(0,o.jsx)(`div`,{className:`ws-facts`,children:S.facts.map(e=>(0,o.jsx)(`span`,{children:e},e))},S.key)]})]})}),(0,o.jsx)(`section`,{className:`ws-section`,id:`ws-material`,children:(0,o.jsxs)(`div`,{className:`ws-cols ws-lift`,children:[(0,o.jsxs)(`div`,{className:`ws-reveal`,children:[(0,o.jsx)(`p`,{className:`ws-kicker`,children:`04 · Material`}),(0,o.jsxs)(`h2`,{className:`ws-h2`,children:[`Materials, `,(0,o.jsx)(`em`,{children:`named`}),` and nothing else.`]}),(0,o.jsx)(`p`,{className:`ws-lede`,children:`Four materials. Each is worked in the workshop, and each appears once in the pen. What is not listed is not in it.`})]}),(0,o.jsx)(`div`,{className:`ws-rows ws-reveal`,style:{transitionDelay:`120ms`},children:d.map(e=>(0,o.jsxs)(`div`,{className:`ws-row`,children:[(0,o.jsx)(`p`,{className:`ws-row-label`,children:e.label}),(0,o.jsx)(`p`,{className:`ws-row-desc`,children:e.desc}),(0,o.jsx)(`p`,{className:`ws-row-val`,children:e.value})]},e.label))})]})}),(0,o.jsx)(`section`,{className:`ws-section ws-ground2`,id:`ws-measure`,children:(0,o.jsxs)(`div`,{className:`ws-lift`,children:[(0,o.jsx)(`p`,{className:`ws-kicker ws-reveal`,children:`05 · Measurements`}),(0,o.jsxs)(`h2`,{className:`ws-h2 ws-reveal`,style:{transitionDelay:`80ms`},children:[`Measured, then `,(0,o.jsx)(`em`,{children:`printed.`})]}),(0,o.jsx)(`div`,{className:`ws-measure-rows ws-reveal`,style:{transitionDelay:`160ms`},children:f.map(e=>(0,o.jsxs)(`div`,{className:`ws-mrow`,children:[(0,o.jsx)(`p`,{className:`ws-mlabel`,children:e.label}),(0,o.jsx)(`p`,{className:`ws-row-desc`,children:e.desc}),(0,o.jsx)(`p`,{className:`ws-row-val ws-mval`,children:e.value})]},e.label))})]})}),(0,o.jsx)(`section`,{className:`ws-section`,id:`ws-close`,children:(0,o.jsxs)(`div`,{className:`ws-lift`,children:[(0,o.jsxs)(`h2`,{className:`ws-h2 ws-reveal`,children:[`Keep it `,(0,o.jsx)(`em`,{children:`moving.`})]}),(0,o.jsx)(`p`,{className:`ws-fine ws-reveal`,style:{transitionDelay:`80ms`},children:`Each pen is ground, cut and polished in one workshop. No. 4 ships in March. Reservations are taken quarterly and in order.`}),(0,o.jsxs)(`div`,{className:`ws-close-btns ws-reveal`,style:{transitionDelay:`160ms`},children:[(0,o.jsxs)(`a`,{className:`ws-btn ws-btn--ink`,href:`#ws-measure`,children:[`Reserve No. 4`,(0,o.jsx)(r,{size:14,strokeWidth:2.4,"aria-hidden":`true`})]}),(0,o.jsx)(`a`,{className:`ws-btn ws-btn--line`,href:`#ws-demo`,children:`See it write again`})]}),(0,o.jsxs)(`div`,{className:`ws-footstrip ws-reveal`,style:{transitionDelay:`240ms`},children:[(0,o.jsx)(`span`,{children:`MARLOW PEN COMPANY`}),(0,o.jsx)(`span`,{children:`MADE IN ONE WORKSHOP`}),(0,o.jsx)(`span`,{children:`© 2026`})]})]})})]}),(0,o.jsx)(`div`,{className:`ws-word ws-word--close`,"aria-hidden":`true`,children:s.map((e,t)=>(0,o.jsx)(`span`,{style:h(t-c),children:e},t))})]})}export{g as default};