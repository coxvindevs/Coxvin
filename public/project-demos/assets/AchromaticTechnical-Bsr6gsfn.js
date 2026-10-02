import{n as e,r as t,t as n}from"./index-DxwTJoEH.js";import{t as r}from"./createLucideIcon-DM8203f5.js";import{t as i}from"./arrow-up-right-CX5kz-Ad.js";import{t as a}from"./wind-Dctj6FR9.js";var o={name:`gauge`,size:24,node:[[`path`,{d:`m12 14 4-4`,key:`9kzdfg`}],[`path`,{d:`M3.34 19a10 10 0 1 1 17.32 0`,key:`19p75a`}]]};o.node;var s=r(o),c={name:`rotate-cw`,size:24,node:[[`path`,{d:`M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8`,key:`1p45f6`}],[`path`,{d:`M21 3v5h-5`,key:`1q7to0`}]]};c.node;var l=r(c),u=t(e(),1),d=n(),f=[`M`,`O`,`N`,`O`],p=2,m=[[`HUB MOTOR`,`DC BRUSHLESS · 6.4 W`],[`BEARINGS`,`SEALED · 40 000 H`],[`REGULATION`,`±0.4 % CLOSED-LOOP`]],h=[{label:`GUARD RIM`,desc:`Stamped single-piece rim, rolled edge, no fasteners.`,value:`Ø 420 MM`},{label:`APERTURE`,desc:`Free-air clearance measured at the blade plane.`,value:`Ø 356 MM`},{label:`SWEPT CIRCLE`,desc:`The circle described by the blade tips under load.`,value:`Ø 340 MM`},{label:`HUB`,desc:`Brushless motor bell, sealed shaft, front accessible.`,value:`Ø 64 MM`},{label:`SPOKE PITCH`,desc:`Front guard spoke spacing, constant across the ring.`,value:`15°`}],g=[[`MAX AIRFLOW`,`2 450 M³/H`],[`SPEED RANGE`,`320 – 1 450 RPM`],[`SPEED REGULATION`,`±0.4 %`],[`POWER DRAW`,`6.4 W`],[`SOUND AT 1 M`,`21.5 DB(A)`],[`SWEPT DIAMETER`,`Ø 340 MM`],[`GUARD APERTURE`,`Ø 356 MM`],[`BLADE COUNT`,`5`],[`BLADE PITCH`,`22°`],[`STATIC PRESSURE`,`41 PA`],[`MASS`,`2.9 KG`],[`INPUT`,`100 – 240 V ~ 50/60 HZ`]],_=[{id:`studio`,label:`Studio`,ground:`#EFEFEE`,ink:`#0D0D0F`,accent:`#2F5BFF`,cells:[`CHASSIS / POWDER COAT`,`GROUND / STUDIO BONE`,`ACCENT / SIGNAL BLUE`]},{id:`graphite`,label:`Graphite`,ground:`#E4E4E2`,ink:`#0D0D0F`,accent:`#2F5BFF`,cells:[`CHASSIS / ANODISED`,`GROUND / STAGE GREY`,`ACCENT / SIGNAL BLUE`]},{id:`ink`,label:`Ink`,ground:`#0D0D0F`,ink:`#EFEFEE`,accent:`#7C97FF`,cells:[`CHASSIS / BLACKOUT`,`GROUND / FULL INK`,`ACCENT / LIFT BLUE`]}],v=e=>Math.min(1,Math.max(0,e)),y=`M 0 -30 C 34 -52 66 -104 40 -150 C 24 -178 -10 -170 -22 -132 C -34 -92 -18 -52 0 -30 Z`;function b(e,t,n=240){let r=[];for(let t=0;t<=n;t++){let i=t/n,a=0;for(let[t,n,r]of e)a+=r*Math.sin(2*Math.PI*t*i+n);r.push(a)}let i=Math.max(...r.map(Math.abs),1e-6);return r.map((e,r)=>`${(r/n*560).toFixed(1)},${(170-e/i*t*13).toFixed(1)}`).join(` `)}var x=b([[3,.7,1],[7,2.1,.55],[13,4.2,.3]],9.2),S=b([[2,1.3,1],[9,.4,.5]],.4),C=(()=>{let e=.8,t=178*e,n=32*e,r=(e,t)=>[+(340+e*Math.cos(t*Math.PI/180)).toFixed(1),+(235-e*Math.sin(t*Math.PI/180)).toFixed(1)],i=[];for(let e=0;e<24;e++){let r=e*15*Math.PI/180;i.push(`M ${(340+n*Math.cos(r)).toFixed(1)} ${(235+n*Math.sin(r)).toFixed(1)} L ${(340+t*Math.cos(r)).toFixed(1)} ${(235+t*Math.sin(r)).toFixed(1)}`)}let a=r(168,15),o=r(t,-20);return{S:e,CX:340,CY:235,rim:168,ap:t,hub:n,spokes:i,rimPath:`M 172 235 A 168 168 0 1 1 508 235 A 168 168 0 1 1 172 235 Z`,blades:Array.from({length:5},(t,n)=>`rotate(${n*72}) scale(${e})`),leaders:[{d:`M ${a[0]} ${a[1]} L 584 160 L 668 160`,text:`RIM Ø 420 MM`,x:668,y:152,anchor:`end`,dot:a},{d:`M ${o[0]} ${o[1]} L 584 316 L 668 316`,text:`APERTURE Ø 356 MM`,x:668,y:308,anchor:`end`,dot:o},{d:`M 340 235 L 240 404 L 120 404`,text:`HUB Ø 64 MM — AXIS`,x:120,y:396,anchor:`start`,dot:[340,235]}]}})(),w=`
.at-root{--at-ground:#EFEFEE;--at-stage:#E4E4E2;--at-ink:#0D0D0F;--at-ink2:#43444A;--at-muted:#6E6F76;
--at-accent:#2F5BFF;--at-lift:#7C97FF;--at-hair:rgba(13,13,15,.12);--at-ease:cubic-bezier(.16,1,.3,1);
background:var(--at-ground);color:var(--at-ink);font-family:'Archivo',system-ui,sans-serif;
-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
.at-root *{box-sizing:border-box;margin:0;padding:0}
.at-root a{color:inherit;text-decoration:none}
.at-mono{font-family:'IBM Plex Mono',ui-monospace,SFMono-Regular,monospace}
.at-eyebrow{display:flex;align-items:center;gap:10px;font-family:'IBM Plex Mono',monospace;font-size:11px;
font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--at-ink2)}
.at-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--at-accent);flex:none}
.at-tag{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;
color:var(--at-muted);position:absolute;top:22px}
.at-sec{position:relative;padding:clamp(88px,13vh,150px) clamp(20px,4vw,56px)}

/* ---- nav ---- */
.at-nav{position:fixed;top:0;left:0;right:0;height:64px;z-index:60;display:flex;align-items:center;
justify-content:space-between;padding:0 clamp(18px,3vw,40px);background:rgba(239,239,238,.82);
-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);border-bottom:1px solid var(--at-hair)}
.at-brand{font-family:'Archivo',sans-serif;font-weight:800;font-size:16px;letter-spacing:-.035em;color:var(--at-ink)}
.at-brand i{font-style:normal;color:var(--at-accent)}
.at-navlinks{display:flex;align-items:center;gap:clamp(14px,2.2vw,32px)}
.at-navlinks a{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.14em;text-transform:uppercase;
color:var(--at-ink2);border-bottom:1px solid transparent;padding-bottom:2px;transition:border-color .3s,color .3s}
.at-navlinks a:hover{border-color:var(--at-accent);color:var(--at-ink)}
.at-pill{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--at-ink);border-radius:999px;
padding:10px 22px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;letter-spacing:.14em;
text-transform:uppercase;background:transparent;color:var(--at-ink);cursor:pointer;
transition:background-color .4s var(--at-ease),color .4s var(--at-ease)}
.at-pill:hover{background:var(--at-ink);color:#EFEFEE}
.at-pill svg{width:13px;height:13px}
.at-pill--solid{background:var(--at-ink);color:#EFEFEE}
.at-pill--light{border-color:#EFEFEE;color:#EFEFEE;background:transparent}
.at-pill--light:hover{background:#EFEFEE;color:var(--at-ink)}

/* ---- hero ---- */
.at-hero{position:relative;min-height:100svh;padding-top:64px;background:var(--at-stage);
overflow:hidden;isolation:isolate;display:flex;flex-direction:column;justify-content:center}
.at-hero-meta{position:absolute;top:84px;left:clamp(20px,4vw,56px);z-index:4;font-size:10px;
letter-spacing:.16em;text-transform:uppercase;color:var(--at-muted)}
.at-hero-col{position:relative;z-index:4;width:min(46vw,600px);padding:0 0 clamp(150px,24vh,300px) clamp(20px,4vw,56px)}
.at-h1{font-size:clamp(34px,5.1vw,74px);font-weight:800;letter-spacing:-.045em;line-height:.98;
margin:26px 0 22px;max-width:12ch}
.at-h1 em{font-style:normal;color:var(--at-accent)}
.at-lede{font-size:16px;line-height:1.65;color:var(--at-ink2);max-width:38ch}
.at-hero-btns{display:flex;gap:14px;flex-wrap:wrap;margin:30px 0 34px}
.at-herospecs{border-top:1px solid var(--at-hair);max-width:38ch}
.at-herospecs div{display:flex;justify-content:space-between;gap:20px;padding:9px 0;
font-family:'IBM Plex Mono',monospace;font-size:10.5px;letter-spacing:.14em;text-transform:uppercase}
.at-herospecs dt{color:var(--at-muted)}
.at-herospecs dd{color:var(--at-ink)}

/* ---- the occlusion weave: TWO word layers, subject between them ---- */
.at-word{position:absolute;left:0;right:0;bottom:0;pointer-events:none}
.at-word-layer{position:absolute;left:-2.5%;width:105%;bottom:0;display:flex;justify-content:space-between;
font-size:clamp(88px,20.5vw,304px);font-weight:900;line-height:.74;letter-spacing:-.055em;
color:var(--at-ink);transform:translateY(.10em);will-change:transform}
.at-word-back{z-index:1}
.at-word-front{z-index:3}
.at-subject{position:absolute;right:-4vw;bottom:9%;width:min(58vw,940px);z-index:2;
filter:drop-shadow(0 26px 34px rgba(13,13,15,.20));will-change:transform}
.at-subject svg{display:block;width:100%;height:auto}
.at-js .at-hero-blades{transform-box:view-box;transform-origin:50% 33.33%;animation:at-spin 9s linear infinite}
@keyframes at-spin{to{transform:rotate(360deg)}}

/* ---- proof (inverted) ---- */
.at-proof{background:var(--at-ink);color:#EFEFEE}
.at-proof .at-tag{color:rgba(239,239,238,.4)}
.at-cols{display:grid;grid-template-columns:5fr 6fr;gap:clamp(36px,6vw,90px);align-items:center}
.at-h2{font-size:clamp(30px,3.6vw,54px);font-weight:800;letter-spacing:-.04em;line-height:.98;margin:24px 0 18px}
.at-proof .at-lede{color:rgba(239,239,238,.62)}
.at-figrow{display:flex;align-items:baseline;gap:16px;margin:38px 0 26px}
.at-figure{font-size:clamp(56px,9vw,132px);font-weight:800;letter-spacing:-.04em;line-height:.9;
font-variant-numeric:tabular-nums;color:#EFEFEE}
.at-figunit{font-family:'IBM Plex Mono',monospace;font-size:clamp(13px,1.5vw,19px);letter-spacing:.16em;
color:var(--at-lift)}
.at-figcap{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;
color:rgba(239,239,238,.4);margin-bottom:22px}
.at-legend{display:flex;flex-direction:column;gap:10px}
.at-legend div{display:flex;align-items:center;gap:10px;font-family:'IBM Plex Mono',monospace;font-size:10.5px;
letter-spacing:.14em;text-transform:uppercase;color:rgba(239,239,238,.55)}
.at-legend i{width:7px;height:7px;border-radius:50%;flex:none}
.at-traces{width:100%;height:auto;display:block}

/* ---- diagram ---- */
.at-dl{border-top:1px solid var(--at-hair);margin-top:34px}
.at-dl>div{display:grid;grid-template-columns:150px 1fr auto;gap:18px;align-items:baseline;
border-bottom:1px solid var(--at-hair);padding:13px 0}
.at-dl dt{font-family:'IBM Plex Mono',monospace;font-size:10.5px;font-weight:500;letter-spacing:.14em;
text-transform:uppercase;color:var(--at-accent)}
.at-dl dd{font-size:13.5px;line-height:1.5;color:var(--at-ink2)}
.at-dl .at-val{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.1em;
font-variant-numeric:tabular-nums;color:var(--at-ink);text-align:right}
.at-fig{background:var(--at-ground)}
.at-fig svg{width:100%;height:auto;display:block}

/* ---- counter-travel stage ---- */
.at-stage{position:relative;height:320vh;background:var(--at-stage)}
.at-stagepin{position:sticky;top:0;height:100svh;overflow:hidden;isolation:isolate;
display:flex;align-items:center;justify-content:center}
.at-marquee{position:absolute;left:0;top:50%;transform:translateY(-50%);z-index:1;white-space:nowrap;
font-weight:900;font-size:clamp(78px,17vw,250px);line-height:1;letter-spacing:-.05em;
color:var(--at-ink);opacity:.14;will-change:transform}
.at-mtrack{display:inline-block;will-change:transform}
.at-stagefan{position:relative;z-index:2;width:min(56vw,600px)}
.at-stagefan svg{display:block;width:100%;height:auto}
.at-stagelabel{position:absolute;left:clamp(20px,4vw,56px);bottom:5vh;z-index:3;display:flex;
align-items:center;gap:10px;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;
text-transform:uppercase;color:var(--at-ink2)}
.at-stagelabel svg{width:14px;height:14px;color:var(--at-accent)}
.at-stageread{position:absolute;right:clamp(20px,4vw,56px);bottom:5vh;z-index:3;text-align:right}
.at-stageread b{display:block;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:24px;
letter-spacing:.1em;font-variant-numeric:tabular-nums;color:var(--at-ink)}
.at-stageread span{font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.16em;
text-transform:uppercase;color:var(--at-muted)}

/* ---- spec table ---- */
.at-speccols{display:grid;grid-template-columns:1fr 1fr;gap:0 clamp(28px,5vw,90px);margin-top:44px}
.at-specrow{display:flex;justify-content:space-between;align-items:baseline;gap:24px;
border-top:1px solid var(--at-hair);padding:15px 2px}
.at-specrow span{font-size:14.5px;letter-spacing:-.005em;color:var(--at-ink2)}
.at-specrow b{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.1em;
font-variant-numeric:tabular-nums;color:var(--at-ink);text-align:right;white-space:nowrap}

/* ---- runtime field-swap picker ---- */
.at-picker{transition:background-color .7s var(--at-ease),color .7s var(--at-ease)}
.at-picker .at-h2{color:inherit}
.at-picker .at-lede{color:color-mix(in srgb,currentColor 62%,transparent)}
.at-picker .at-eyebrow{color:color-mix(in srgb,currentColor 62%,transparent)}
.at-picker .at-eyebrow::before{background:var(--at-accent)}
.at-picks{display:flex;gap:12px;flex-wrap:wrap;margin-top:34px}
.at-pick{display:inline-flex;align-items:center;gap:10px;border:1px solid color-mix(in srgb,currentColor 38%,transparent);
border-radius:999px;padding:10px 20px;font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;
letter-spacing:.14em;text-transform:uppercase;background:transparent;color:inherit;cursor:pointer;
transition:border-color .3s,background-color .3s}
.at-pick:hover{border-color:color-mix(in srgb,currentColor 80%,transparent)}
.at-pick i{width:7px;height:7px;border-radius:50%;background:color-mix(in srgb,currentColor 30%,transparent);
flex:none;transition:background-color .3s}
.at-pick[aria-pressed="true"]{border-color:color-mix(in srgb,currentColor 85%,transparent);
background:color-mix(in srgb,currentColor 7%,transparent)}
.at-pick[aria-pressed="true"] i{background:var(--at-accent)}
.at-panel{display:grid;grid-template-columns:repeat(3,1fr);margin-top:40px;
border-top:1px solid color-mix(in srgb,currentColor 24%,transparent)}
.at-panel>div{padding:18px 20px 18px 0;border-left:1px solid color-mix(in srgb,currentColor 24%,transparent)}
.at-panel>div:first-child{border-left:none;padding-left:2px}
.at-panel small{display:block;font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.16em;
text-transform:uppercase;color:color-mix(in srgb,currentColor 52%,transparent);margin-bottom:8px}
.at-panel b{font-weight:600;font-size:15px;letter-spacing:-.01em;color:inherit}

/* ---- close ---- */
.at-close{background:var(--at-ink);color:#EFEFEE;overflow:hidden;padding-bottom:0}
.at-close .at-eyebrow{color:rgba(239,239,238,.5)}
.at-close .at-eyebrow::before{background:var(--at-lift)}
.at-closehead{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap}
.at-close .at-h2{max-width:14ch}
.at-fine{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;
color:rgba(239,239,238,.42);margin-top:16px}
.at-closefoot{display:flex;gap:clamp(20px,4vw,56px);align-items:center;margin-top:64px;padding-top:16px;
border-top:1px solid rgba(239,239,238,.14)}
.at-closefoot span{font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.16em;
text-transform:uppercase;color:rgba(239,239,238,.45)}
.at-closefoot span:last-child{margin-left:auto}
.at-closeword{display:flex;justify-content:space-between;margin-top:34px;
font-size:clamp(84px,19.5vw,300px);font-weight:900;line-height:.74;letter-spacing:-.055em;
color:#EFEFEE;transform:translateY(.19em);pointer-events:none}

/* ---- reveals (scoped to .at-js on the document element) ---- */
.at-js .at-rv{opacity:0;transform:translateY(18px);
transition:opacity 1s var(--at-ease),transform 1s var(--at-ease)}
.at-js .at-rv.in{opacity:1;transform:translateY(0)}
.at-js .at-fade{opacity:0;transition:opacity 1.05s var(--at-ease)}
.at-js .at-fade.in{opacity:1}
.at-draw{stroke-dasharray:1000}
.at-js .at-fig .at-draw{stroke-dashoffset:1000;transition:stroke-dashoffset 1.9s var(--at-ease) .15s}
.at-js .at-fig.in .at-draw{stroke-dashoffset:0}

@media (max-width:900px){
  .at-navlinks a{display:none}
  .at-hero-col{width:100%;padding-bottom:clamp(170px,34vh,320px)}
  .at-cols{grid-template-columns:1fr;gap:44px;align-items:start}
  .at-subject{width:88vw;right:-22vw;bottom:11%}
  .at-speccols{grid-template-columns:1fr}
  .at-stagefan{width:80vw}
  .at-panel{grid-template-columns:1fr}
  .at-panel>div{border-left:none;padding-left:2px;border-top:1px solid color-mix(in srgb,currentColor 24%,transparent)}
  .at-panel>div:first-child{border-top:none}
  .at-dl>div{grid-template-columns:1fr;gap:6px}
  .at-dl .at-val{text-align:left}
  .at-h1{max-width:none}
}
`;function T({cx:e,cy:t,s:n}){let r=[208,170,132,94,56],i=[];for(let r=0;r<24;r++){let a=r*15*Math.PI/180;i.push(`M ${e+56*n*Math.cos(a)} ${t+56*n*Math.sin(a)} L ${e+208*n*Math.cos(a)} ${t+208*n*Math.sin(a)}`)}return(0,d.jsxs)(`g`,{fill:`none`,stroke:`rgba(13,13,15,.30)`,strokeWidth:1,children:[i.map((e,t)=>(0,d.jsx)(`path`,{d:e},t)),r.map(r=>(0,d.jsx)(`circle`,{cx:e,cy:t,r:r*n,stroke:`rgba(13,13,15,.5)`,strokeWidth:r===208?2.5:1.2},r))]})}function E({s:e,className:t,gRef:n}){return(0,d.jsx)(`g`,{ref:n,className:t,children:Array.from({length:5},(t,n)=>(0,d.jsx)(`path`,{d:y,transform:`rotate(${n*72}) scale(${e})`,fill:`url(#at-bladeg)`,stroke:`#0D0D0F`,strokeWidth:1/e},n))})}function D(){let e=(0,u.useRef)(null),t=(0,u.useRef)(null),n=(0,u.useRef)(null),r=(0,u.useRef)(null),o=(0,u.useRef)(null),c=(0,u.useRef)(null),b=(0,u.useRef)(null),D=(0,u.useRef)(null),O=(0,u.useRef)(null),[k,A]=(0,u.useState)(_[0]);(0,u.useEffect)(()=>{let i=e.current;if(!i)return;let a=!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;if(a&&document.documentElement.classList.add(`at-js`),!document.getElementById(`at-fonts`)){let e=document.createElement(`link`);e.id=`at-fonts`,e.rel=`stylesheet`,e.href=`https://fonts.googleapis.com/css2?family=Archivo:wght@700;800;900&family=IBM+Plex+Mono:wght@400;500&display=swap`,document.head.appendChild(e)}let s=null,l=0,u=0,d=!1;if(a){s=new IntersectionObserver(e=>{for(let t of e)t.isIntersecting&&(t.target.classList.add(`in`),s?.unobserve(t.target))},{rootMargin:`0px 0px -12% 0px`,threshold:.08});for(let e of Array.from(i.querySelectorAll(`.at-rv`)))s.observe(e);l=requestAnimationFrame(()=>{for(let e of Array.from(i.querySelectorAll(`.at-now`)))e.classList.add(`in`)})}let f=()=>{let e=t.current;if(e){let t=e.getBoundingClientRect(),i=v(-t.top/Math.max(1,t.height))*t.height*.06,a=`translateY(calc(0.10em - ${i.toFixed(1)}px))`;n.current&&(n.current.style.transform=a),r.current&&(r.current.style.transform=a),o.current&&(o.current.style.transform=`translateY(${(i*.85).toFixed(1)}px)`)}let i=c.current;if(i){let e=i.getBoundingClientRect(),t=Math.max(1,e.height-window.innerHeight),n=v(-e.top/t),r=n*1440;b.current&&b.current.setAttribute(`transform`,`rotate(${r.toFixed(2)})`),D.current&&(D.current.style.transform=`translate3d(${(4-n*36).toFixed(2)}%,0,0)`),O.current&&(O.current.textContent=`${String(Math.round(r)).padStart(4,`0`)}°`)}},p=()=>{d||(d=!0,u=requestAnimationFrame(()=>{d=!1,f()}))};return a&&(window.addEventListener(`scroll`,p,{passive:!0}),window.addEventListener(`resize`,p),f()),()=>{document.documentElement.classList.remove(`at-js`),window.removeEventListener(`scroll`,p),window.removeEventListener(`resize`,p),s?.disconnect(),cancelAnimationFrame(l),d&&cancelAnimationFrame(u)}},[]);let j=e=>{let t=e.currentTarget.dataset.variant,n=_.find(e=>e.id===t);n&&A(n)},M=`clamp(20px,4vw,56px)`;return(0,d.jsxs)(`div`,{ref:e,id:`at-top`,className:`at-root`,children:[(0,d.jsx)(`style`,{children:w}),(0,d.jsxs)(`nav`,{className:`at-nav`,children:[(0,d.jsxs)(`a`,{className:`at-brand`,href:`#at-top`,children:[`MONO`,(0,d.jsx)(`i`,{children:`.`})]}),(0,d.jsxs)(`div`,{className:`at-navlinks`,children:[(0,d.jsx)(`a`,{href:`#at-top`,children:`Overview`}),(0,d.jsx)(`a`,{href:`#at-proof`,children:`Proof`}),(0,d.jsx)(`a`,{href:`#at-diagram`,children:`Diagram`}),(0,d.jsx)(`a`,{href:`#at-drive`,children:`Drive`}),(0,d.jsx)(`a`,{href:`#at-specs`,children:`Specs`}),(0,d.jsxs)(`a`,{className:`at-pill at-pill--solid`,href:`#at-finish`,children:[`Reserve `,(0,d.jsx)(i,{size:13,"aria-hidden":`true`})]})]})]}),(0,d.jsxs)(`header`,{ref:t,className:`at-hero`,children:[(0,d.jsx)(`p`,{className:`at-hero-meta at-mono`,children:`FIG. 01 — FRONT ELEVATION · REV C`}),(0,d.jsxs)(`div`,{className:`at-hero-col at-fade at-now`,children:[(0,d.jsxs)(`p`,{className:`at-eyebrow`,children:[(0,d.jsx)(a,{size:13,"aria-hidden":`true`}),` Precision air — MK II`]}),(0,d.jsxs)(`h1`,{className:`at-h1`,children:[`A desk fan machined to `,(0,d.jsx)(`em`,{children:`instrument tolerance.`})]}),(0,d.jsx)(`p`,{className:`at-lede`,children:`One moving part, governed 240 times per revolution. The MONO MK II holds its speed to four-tenths of a percent — and it is quiet enough to hear itself do it.`}),(0,d.jsxs)(`div`,{className:`at-hero-btns`,children:[(0,d.jsxs)(`a`,{className:`at-pill at-pill--solid`,href:`#at-finish`,children:[`Reserve unit `,(0,d.jsx)(i,{size:13,"aria-hidden":`true`})]}),(0,d.jsx)(`a`,{className:`at-pill`,href:`#at-specs`,children:`Read the spec`})]}),(0,d.jsx)(`dl`,{className:`at-herospecs`,children:m.map(([e,t])=>(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:e}),(0,d.jsx)(`dd`,{children:t})]},e))})]}),(0,d.jsx)(`div`,{ref:o,className:`at-subject at-fade at-now`,children:(0,d.jsxs)(`svg`,{viewBox:`0 0 640 780`,role:`img`,"aria-label":`MONO MK II desk fan — cut-out studio subject with rotating blades`,children:[(0,d.jsxs)(`defs`,{children:[(0,d.jsxs)(`radialGradient`,{id:`at-housing`,cx:`38%`,cy:`32%`,r:`80%`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#4A4B52`}),(0,d.jsx)(`stop`,{offset:`60%`,stopColor:`#2E2F35`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#191A1F`})]}),(0,d.jsxs)(`linearGradient`,{id:`at-bladeg`,x1:`0`,y1:`0`,x2:`1`,y2:`1`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#4A4B52`}),(0,d.jsx)(`stop`,{offset:`55%`,stopColor:`#26272C`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#17181C`})]}),(0,d.jsxs)(`radialGradient`,{id:`at-hubg`,cx:`36%`,cy:`32%`,r:`75%`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#5C5D66`}),(0,d.jsx)(`stop`,{offset:`70%`,stopColor:`#202127`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#131418`})]}),(0,d.jsxs)(`linearGradient`,{id:`at-stemg`,x1:`0`,y1:`0`,x2:`1`,y2:`0`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#17181C`}),(0,d.jsx)(`stop`,{offset:`38%`,stopColor:`#4A4B52`}),(0,d.jsx)(`stop`,{offset:`78%`,stopColor:`#101114`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#1B1C21`})]}),(0,d.jsxs)(`linearGradient`,{id:`at-baseg`,x1:`0`,y1:`0`,x2:`0`,y2:`1`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#2A2B31`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#101114`})]})]}),(0,d.jsx)(`path`,{d:`M196 676 L214 640 L426 640 L444 676 Z`,fill:`url(#at-baseg)`}),(0,d.jsx)(`path`,{d:`M214 641 L426 641`,stroke:`rgba(239,239,238,.28)`,strokeWidth:`1.2`}),(0,d.jsx)(`rect`,{x:`311`,y:`440`,width:`18`,height:`204`,fill:`url(#at-stemg)`}),(0,d.jsx)(`rect`,{x:`304`,y:`556`,width:`32`,height:`24`,rx:`2`,fill:`url(#at-stemg)`}),(0,d.jsx)(`circle`,{cx:`320`,cy:`260`,r:`196`,fill:`url(#at-housing)`}),(0,d.jsxs)(`g`,{fill:`none`,stroke:`rgba(13,13,15,.4)`,children:[(0,d.jsx)(`circle`,{cx:`320`,cy:`260`,r:`150`}),(0,d.jsx)(`circle`,{cx:`320`,cy:`260`,r:`104`})]}),(0,d.jsx)(E,{s:.99,className:`at-hero-blades`}),(0,d.jsx)(`circle`,{cx:`320`,cy:`260`,r:`30`,fill:`url(#at-hubg)`}),(0,d.jsx)(`circle`,{cx:`320`,cy:`260`,r:`12`,fill:`#0D0D0F`}),(0,d.jsx)(`circle`,{cx:`320`,cy:`260`,r:`3.2`,fill:`#2F5BFF`}),(0,d.jsx)(T,{cx:320,cy:260,s:.99}),(0,d.jsx)(`path`,{d:`M284.3 58.1 A205 205 0 0 0 118.1 224.3`,fill:`none`,stroke:`rgba(239,239,238,.5)`,strokeWidth:`2.2`,strokeLinecap:`round`})]})}),(0,d.jsxs)(`div`,{className:`at-word`,role:`img`,"aria-label":`MONO`,children:[(0,d.jsx)(`div`,{ref:n,className:`at-word-layer at-word-back at-fade at-now`,"aria-hidden":`true`,children:f.map((e,t)=>(0,d.jsx)(`span`,{style:{visibility:t===p?`hidden`:`visible`},children:e},t))}),(0,d.jsx)(`div`,{ref:r,className:`at-word-layer at-word-front at-fade at-now`,"aria-hidden":`true`,children:f.map((e,t)=>(0,d.jsx)(`span`,{style:{visibility:t===p?`visible`:`hidden`},children:e},t))})]})]}),(0,d.jsxs)(`section`,{id:`at-proof`,className:`at-sec at-proof`,children:[(0,d.jsx)(`span`,{className:`at-tag at-mono`,style:{left:M},children:`02 — REGULATION`}),(0,d.jsx)(`span`,{className:`at-tag at-mono`,style:{right:M},children:`MONO MK II`}),(0,d.jsxs)(`div`,{className:`at-cols`,children:[(0,d.jsxs)(`div`,{className:`at-rv`,children:[(0,d.jsx)(`p`,{className:`at-eyebrow`,children:`Measured — Closed loop`}),(0,d.jsx)(`h2`,{className:`at-h2`,children:`Speed that holds when the mains do not.`}),(0,d.jsx)(`p`,{className:`at-lede`,children:`The MK II shaft is the only part we do not govern by feel. A hall sensor reads the rotor 240 times per revolution and trims the winding current, so the set speed is the real speed — the trace on the right is generated from the same numbers it quotes.`}),(0,d.jsxs)(`div`,{className:`at-figrow`,children:[(0,d.jsx)(`span`,{className:`at-figure`,children:`±0.4`}),(0,d.jsx)(`span`,{className:`at-figunit`,children:`% SPEED`})]}),(0,d.jsxs)(`p`,{className:`at-figcap`,children:[(0,d.jsx)(s,{size:12,"aria-hidden":`true`}),` Peak deviation from set speed · 320–1 450 rpm · 60 s window`]}),(0,d.jsxs)(`div`,{className:`at-legend`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`i`,{style:{background:`#7C97FF`}}),` MK II — closed loop · ±0.4 %`]}),(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`i`,{style:{background:`rgba(239,239,238,.35)`}}),` Unregulated reference · ±9.2 %`]})]})]}),(0,d.jsx)(`div`,{className:`at-rv`,children:(0,d.jsxs)(`svg`,{className:`at-traces`,viewBox:`0 0 560 340`,role:`img`,"aria-label":`Two speed traces to the same scale: an unregulated reference wandering ±9.2 percent and the regulated MK II holding ±0.4 percent`,children:[(0,d.jsxs)(`g`,{stroke:`rgba(239,239,238,.12)`,strokeDasharray:`3 5`,children:[(0,d.jsx)(`line`,{x1:`0`,y1:`50.4`,x2:`560`,y2:`50.4`}),(0,d.jsx)(`line`,{x1:`0`,y1:`289.6`,x2:`560`,y2:`289.6`})]}),(0,d.jsx)(`line`,{x1:`0`,y1:`170`,x2:`560`,y2:`170`,stroke:`rgba(239,239,238,.2)`}),(0,d.jsxs)(`g`,{className:`at-mono`,fontSize:`9`,fill:`rgba(239,239,238,.4)`,letterSpacing:`1`,children:[(0,d.jsx)(`text`,{x:`4`,y:`45`,children:`+10 %`}),(0,d.jsx)(`text`,{x:`4`,y:`302`,children:`−10 %`}),(0,d.jsx)(`text`,{x:`4`,y:`186`,children:`0`}),(0,d.jsx)(`text`,{x:`4`,y:`330`,children:`0 S`}),(0,d.jsx)(`text`,{x:`556`,y:`330`,textAnchor:`end`,children:`60 S`})]}),(0,d.jsx)(`polyline`,{points:x,fill:`none`,stroke:`rgba(239,239,238,.3)`,strokeWidth:`1.2`}),(0,d.jsx)(`polyline`,{points:S,fill:`none`,stroke:`#7C97FF`,strokeWidth:`1.6`})]})})]})]}),(0,d.jsxs)(`section`,{id:`at-diagram`,className:`at-sec`,children:[(0,d.jsx)(`span`,{className:`at-tag at-mono`,style:{left:M},children:`03 — ELEVATION`}),(0,d.jsx)(`span`,{className:`at-tag at-mono`,style:{right:M},children:`SCALE 1:1.25 · MM`}),(0,d.jsxs)(`div`,{className:`at-cols`,children:[(0,d.jsxs)(`div`,{className:`at-rv`,children:[(0,d.jsx)(`p`,{className:`at-eyebrow`,children:`Drawn — To scale`}),(0,d.jsx)(`h2`,{className:`at-h2`,children:`Every radius on this page is computed.`}),(0,d.jsx)(`p`,{className:`at-lede`,children:`The elevation beside this list is generated from the same millimetre values the table quotes — rim, aperture, swept circle and hub are one geometry, not four illustrations of one.`}),(0,d.jsx)(`dl`,{className:`at-dl`,children:h.map(e=>(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`dt`,{children:e.label}),(0,d.jsx)(`dd`,{children:e.desc}),(0,d.jsx)(`dd`,{className:`at-val`,children:e.value})]},e.label))})]}),(0,d.jsx)(`div`,{className:`at-fig at-rv`,children:(0,d.jsxs)(`svg`,{viewBox:`0 0 680 470`,role:`img`,"aria-label":`Fan head front elevation, drawn to scale with construction geometry and labelled leader lines`,children:[(0,d.jsxs)(`g`,{stroke:`rgba(13,13,15,.12)`,strokeDasharray:`2 6`,children:[(0,d.jsx)(`line`,{x1:`20`,y1:C.CY,x2:`660`,y2:C.CY}),(0,d.jsx)(`line`,{x1:C.CX,y1:`20`,x2:C.CX,y2:`450`})]}),(0,d.jsx)(`g`,{stroke:`rgba(13,13,15,.16)`,strokeWidth:`0.7`,children:C.spokes.map((e,t)=>(0,d.jsx)(`path`,{d:e},t))}),(0,d.jsx)(`circle`,{cx:C.CX,cy:C.CY,r:170*C.S,fill:`none`,stroke:`rgba(13,13,15,.25)`,strokeDasharray:`4 5`}),(0,d.jsx)(`circle`,{cx:C.CX,cy:C.CY,r:C.ap,fill:`none`,stroke:`rgba(13,13,15,.28)`}),(0,d.jsx)(`g`,{fill:`none`,stroke:`rgba(13,13,15,.3)`,strokeWidth:`1`,children:C.blades.map((e,t)=>(0,d.jsx)(`path`,{d:y,transform:`translate(${C.CX} ${C.CY}) ${e}`},t))}),(0,d.jsx)(`circle`,{cx:C.CX,cy:C.CY,r:C.hub,fill:`none`,stroke:`#0D0D0F`,strokeWidth:`1.5`}),(0,d.jsx)(`path`,{className:`at-draw`,d:C.rimPath,pathLength:1e3,fill:`none`,stroke:`#0D0D0F`,strokeWidth:`2.5`}),C.leaders.map(e=>(0,d.jsxs)(`g`,{children:[(0,d.jsx)(`path`,{d:e.d,fill:`none`,stroke:`rgba(13,13,15,.35)`,strokeWidth:`1`}),(0,d.jsx)(`circle`,{cx:e.dot[0],cy:e.dot[1],r:`3.5`,fill:`#2F5BFF`}),(0,d.jsx)(`text`,{className:`at-mono`,x:e.x,y:e.y,textAnchor:e.anchor,fontSize:`9.5`,letterSpacing:`1.1`,fill:`#43444A`,children:e.text})]},e.text))]})})]})]}),(0,d.jsx)(`section`,{id:`at-drive`,ref:c,className:`at-stage`,children:(0,d.jsxs)(`div`,{className:`at-stagepin`,children:[(0,d.jsx)(`div`,{className:`at-marquee`,"aria-hidden":`true`,children:(0,d.jsx)(`div`,{ref:D,className:`at-mtrack`,children:`BLADE DRIVE — BLADE DRIVE — BLADE DRIVE —`})}),(0,d.jsx)(`div`,{className:`at-stagefan`,children:(0,d.jsxs)(`svg`,{viewBox:`-230 -230 460 460`,role:`img`,"aria-label":`Fan head with blades that rotate as the page scrolls`,children:[(0,d.jsxs)(`defs`,{children:[(0,d.jsxs)(`radialGradient`,{id:`at2-housing`,cx:`38%`,cy:`32%`,r:`80%`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#4A4B52`}),(0,d.jsx)(`stop`,{offset:`60%`,stopColor:`#2E2F35`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#191A1F`})]}),(0,d.jsxs)(`linearGradient`,{id:`at2-bladeg`,x1:`0`,y1:`0`,x2:`1`,y2:`1`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#4A4B52`}),(0,d.jsx)(`stop`,{offset:`55%`,stopColor:`#26272C`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#17181C`})]}),(0,d.jsxs)(`radialGradient`,{id:`at2-hubg`,cx:`36%`,cy:`32%`,r:`75%`,children:[(0,d.jsx)(`stop`,{offset:`0%`,stopColor:`#5C5D66`}),(0,d.jsx)(`stop`,{offset:`70%`,stopColor:`#202127`}),(0,d.jsx)(`stop`,{offset:`100%`,stopColor:`#131418`})]})]}),(0,d.jsx)(`circle`,{cx:`0`,cy:`0`,r:`196`,fill:`url(#at2-housing)`}),(0,d.jsxs)(`g`,{fill:`none`,stroke:`rgba(13,13,15,.4)`,children:[(0,d.jsx)(`circle`,{cx:`0`,cy:`0`,r:`150`}),(0,d.jsx)(`circle`,{cx:`0`,cy:`0`,r:`104`})]}),(0,d.jsx)(E,{s:1,gRef:b}),(0,d.jsx)(`circle`,{cx:`0`,cy:`0`,r:`30`,fill:`url(#at2-hubg)`}),(0,d.jsx)(`circle`,{cx:`0`,cy:`0`,r:`12`,fill:`#0D0D0F`}),(0,d.jsx)(`circle`,{cx:`0`,cy:`0`,r:`3.2`,fill:`#2F5BFF`}),(0,d.jsx)(T,{cx:0,cy:0,s:1}),(0,d.jsx)(`path`,{d:`M -35.7 -201.9 A 205 205 0 0 0 -201.9 -35.7`,fill:`none`,stroke:`rgba(239,239,238,.5)`,strokeWidth:`2.2`,strokeLinecap:`round`})]})}),(0,d.jsxs)(`p`,{className:`at-stagelabel`,children:[(0,d.jsx)(l,{size:14,"aria-hidden":`true`}),` SEC. 04 — BLADE DRIVE · ROTATION FOLLOWS SCROLL`]}),(0,d.jsxs)(`div`,{className:`at-stageread`,children:[(0,d.jsx)(`b`,{children:(0,d.jsx)(`span`,{ref:O,children:`0000°`})}),(0,d.jsx)(`span`,{children:`SHAFT ROTATION · SWEEP 0000°–1440°`})]})]})}),(0,d.jsxs)(`section`,{id:`at-specs`,className:`at-sec`,children:[(0,d.jsx)(`span`,{className:`at-tag at-mono`,style:{left:M},children:`05 — SPECIFICATION`}),(0,d.jsx)(`span`,{className:`at-tag at-mono`,style:{right:M},children:`TWELVE ROWS`}),(0,d.jsxs)(`div`,{className:`at-rv`,style:{maxWidth:1100},children:[(0,d.jsx)(`p`,{className:`at-eyebrow`,children:`Specification — Full`}),(0,d.jsx)(`h2`,{className:`at-h2`,children:`Twelve numbers. Nothing else.`}),(0,d.jsxs)(`div`,{className:`at-speccols`,children:[(0,d.jsx)(`div`,{children:g.slice(0,6).map(([e,t])=>(0,d.jsxs)(`div`,{className:`at-specrow`,children:[(0,d.jsx)(`span`,{children:e}),(0,d.jsx)(`b`,{children:t})]},e))}),(0,d.jsx)(`div`,{children:g.slice(6).map(([e,t])=>(0,d.jsxs)(`div`,{className:`at-specrow`,children:[(0,d.jsx)(`span`,{children:e}),(0,d.jsx)(`b`,{children:t})]},e))})]})]})]}),(0,d.jsxs)(`section`,{id:`at-finish`,className:`at-sec at-picker`,style:{backgroundColor:k.ground,color:k.ink,"--at-accent":k.accent},"data-active":k.id,children:[(0,d.jsx)(`span`,{className:`at-tag at-mono`,style:{left:M},children:`06 — FINISHES`}),(0,d.jsxs)(`div`,{className:`at-rv`,style:{maxWidth:1100},children:[(0,d.jsx)(`p`,{className:`at-eyebrow`,children:`Finish — Field swap`}),(0,d.jsx)(`h2`,{className:`at-h2`,children:`Three finishes. One instrument.`}),(0,d.jsx)(`p`,{className:`at-lede`,children:`This section is the swatch. Pick a finish and the whole field repaints — ground, ink and the divider weights of the panel below re-resolve in place over 0.7 seconds.`}),(0,d.jsx)(`div`,{className:`at-picks`,children:_.map(e=>(0,d.jsxs)(`button`,{type:`button`,className:`at-pick`,"data-variant":e.id,"data-ground":e.ground,"data-ink":e.ink,"aria-pressed":k.id===e.id,onClick:j,children:[(0,d.jsx)(`i`,{}),` `,e.label]},e.id))}),(0,d.jsx)(`div`,{className:`at-panel`,children:k.cells.map(e=>(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`small`,{children:e.split(` / `)[0]}),(0,d.jsx)(`b`,{children:e.split(` / `)[1]})]},e))})]})]}),(0,d.jsxs)(`section`,{className:`at-sec at-close`,children:[(0,d.jsxs)(`div`,{className:`at-closehead at-rv`,children:[(0,d.jsxs)(`div`,{children:[(0,d.jsx)(`p`,{className:`at-eyebrow`,children:`Mono — MK II`}),(0,d.jsx)(`h2`,{className:`at-h2`,children:`Instrument air, on your desk.`}),(0,d.jsx)(`p`,{className:`at-fine`,children:`SHIPS Q3 · 30-DAY RETURNS · 5-YEAR MOTOR WARRANTY`})]}),(0,d.jsxs)(`a`,{className:`at-pill at-pill--light`,href:`#at-top`,children:[`Reserve unit `,(0,d.jsx)(i,{size:13,"aria-hidden":`true`})]})]}),(0,d.jsxs)(`div`,{className:`at-closefoot at-rv`,children:[(0,d.jsx)(`span`,{children:`MONO MK II`}),(0,d.jsx)(`span`,{children:`±0.4 % REGULATION`}),(0,d.jsx)(`span`,{children:`Ø 340 MM SWEPT`}),(0,d.jsx)(`span`,{children:`© MMXXVI`})]}),(0,d.jsxs)(`div`,{className:`at-closeword`,"aria-hidden":`true`,children:[(0,d.jsx)(`span`,{children:`M`}),(0,d.jsx)(`span`,{children:`O`}),(0,d.jsx)(`span`,{children:`N`}),(0,d.jsx)(`span`,{children:`O`})]})]})]})}export{D as default};