import{n as e,r as t,t as n}from"./index-DxwTJoEH.js";import{t as r}from"./createLucideIcon-DM8203f5.js";import{t as i}from"./arrow-left-DlS70RYK.js";import{t as a}from"./arrow-right-DGc0NrX5.js";import{n as o,t as s}from"./play-Dy98y0Qf.js";var c={name:`asterisk`,size:24,node:[[`path`,{d:`M12 5v14`,key:`s699le`}],[`path`,{d:`m18.065 8.496-12.125 7`,key:`1h26g9`}],[`path`,{d:`m5.94 8.504 12.125 7`,key:`k77sdm`}]]};c.node;var l=r(c),u={name:`at-sign`,size:24,node:[[`circle`,{cx:`12`,cy:`12`,r:`4`,key:`4exip2`}],[`path`,{d:`M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8`,key:`7n84p3`}]]};u.node;var d=r(u),f={name:`hash`,size:24,node:[[`line`,{x1:`4`,x2:`20`,y1:`9`,y2:`9`,key:`4lhtct`}],[`line`,{x1:`4`,x2:`20`,y1:`15`,y2:`15`,key:`vyu0kd`}],[`line`,{x1:`10`,x2:`8`,y1:`3`,y2:`21`,key:`1ggp8o`}],[`line`,{x1:`16`,x2:`14`,y1:`3`,y2:`21`,key:`weycgp`}]]};f.node;var p=r(f),m={name:`shopping-bag`,size:24,node:[[`path`,{d:`M16 10a4 4 0 0 1-8 0`,key:`1ltviw`}],[`path`,{d:`M3.103 6.034h17.794`,key:`awc11p`}],[`path`,{d:`M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z`,key:`o988cm`}]]};m.node;var h=r(m),g={name:`star`,size:24,node:[[`path`,{d:`M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z`,key:`r04s7s`}]]};g.node;var _=r(g),v={name:`zap`,size:24,node:[[`path`,{d:`M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z`,key:`1v7up4`}]]};v.node;var y=r(v),b=t(e(),1),x=n(),S=`
.nb-root {
  --nb-paper: #F8F4E8;
  --nb-ink: #09090B;
  --nb-acid: #D2E823;
  background: var(--nb-paper);
  color: var(--nb-ink);
  min-height: 100%;
  font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  position: relative;
  overflow-x: clip;
}
.nb-root *, .nb-root *::before, .nb-root *::after { box-sizing: border-box; }

/* custom cursor: only when fine pointer + motion allowed */
.nb-cursor-on, .nb-cursor-on * { cursor: none !important; }
.nb-cursor {
  position: fixed;
  top: 0; left: 0;
  width: 32px; height: 32px;
  border-radius: 100%;
  background: #ffffff;
  mix-blend-mode: difference;
  pointer-events: none;
  z-index: 9999;
  display: none;
  will-change: transform;
}

/* global SVG noise overlay, 3% */
.nb-noise {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E");
}

/* type */
.nb-display {
  font-family: 'Dela Gothic One', 'Space Grotesk', sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  line-height: 0.85;
}
.nb-mono {
  font-family: ui-monospace, 'Cascadia Mono', 'Courier New', monospace;
}

/* glitch-on-hover for display text (spec keyframes) */
.nb-glitch { display: inline-block; }
.nb-glitch:hover { animation: nb-glitch 0.3s infinite; }
@keyframes nb-glitch {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(-2px, 2px); }
  40%  { transform: translate(-2px, -2px); }
  60%  { transform: translate(2px, 2px); }
  80%  { transform: translate(2px, -2px); }
  100% { transform: translate(0, 0); }
}

/* hard shadows */
.nb-sh-2  { box-shadow: 2px 2px 0 0 var(--nb-ink); }
.nb-sh-4  { box-shadow: 4px 4px 0 0 var(--nb-ink); }
.nb-sh-8  { box-shadow: 8px 8px 0 0 var(--nb-ink); }

/* borders */
.nb-bd    { border: 2px solid var(--nb-ink); }
.nb-bd-4  { border: 4px solid var(--nb-ink); }

/* hard-shadow button (primary, per spec) */
.nb-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--nb-ink);
  color: var(--nb-acid);
  border: 2px solid var(--nb-ink);
  border-radius: 12px;
  padding: 16px 32px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 14px;
  box-shadow: 4px 4px 0 0 var(--nb-ink);
  transition: transform 120ms ease, box-shadow 120ms ease, background 150ms ease, color 150ms ease;
  text-decoration: none;
  user-select: none;
}
.nb-btn:hover { transform: translate(2px, 2px); box-shadow: 0 0 0 0 var(--nb-ink); }
.nb-btn:active { transform: translate(2px, 4px); box-shadow: 0 0 0 0 var(--nb-ink); }

/* secondary button (hero): paper bg, 8px shadow */
.nb-btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--nb-paper);
  color: var(--nb-ink);
  border: 2px solid var(--nb-ink);
  border-radius: 12px;
  padding: 20px 32px;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 14px;
  box-shadow: 8px 8px 0 0 var(--nb-ink);
  transition: transform 120ms ease, box-shadow 120ms ease, background 150ms ease;
  text-decoration: none;
  user-select: none;
}
.nb-btn-ghost:hover { transform: translate(4px, 4px); box-shadow: 2px 2px 0 0 var(--nb-ink); background: var(--nb-acid); }
.nb-btn-ghost:active { transform: translate(8px, 8px); box-shadow: 0 0 0 0 var(--nb-ink); }

/* nav button: hard-sm (2px) shadow, acid on hover */
.nb-navbtn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--nb-paper);
  color: var(--nb-ink);
  border: 2px solid var(--nb-ink);
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 2px 2px 0 0 var(--nb-ink);
  transition: transform 120ms ease, box-shadow 120ms ease, background 150ms ease;
  text-decoration: none;
}
.nb-navbtn:hover { background: var(--nb-acid); transform: translate(2px, 2px); box-shadow: 0 0 0 0 var(--nb-ink); }
.nb-navbtn:active { transform: translate(2px, 2px); box-shadow: 0 0 0 0 var(--nb-ink); }

/* nav link */
.nb-navlink {
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  text-decoration: none;
  color: var(--nb-ink);
  padding: 4px 2px;
  border-bottom: 2px solid transparent;
  transition: border-color 120ms ease, background 120ms ease;
}
.nb-navlink:hover { border-bottom-color: var(--nb-ink); }

/* nav bar itself */
.nb-navbar {
  position: sticky;
  top: 16px;
  z-index: 50;
  margin: 0 16px;
  background: rgba(248, 244, 232, 0.9);
  -webkit-backdrop-filter: blur(24px);
  backdrop-filter: blur(24px);
  border: 2px solid var(--nb-ink);
  border-radius: 12px;
  box-shadow: 4px 4px 0 0 var(--nb-ink);
}
@media (min-width: 768px) { .nb-navbar { margin: 0 24px; } }

/* sticker badge */
.nb-sticker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--nb-acid);
  border: 2px solid var(--nb-ink);
  border-radius: 999px;
  padding: 8px 18px;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transform: rotate(-2deg);
  box-shadow: 2px 2px 0 0 var(--nb-ink);
}

/* hero display size */
.nb-hero-title { font-size: clamp(3.25rem, 9.5vw, 8rem); }

/* marquee */
.nb-marquee {
  border-top: 2px solid var(--nb-ink);
  border-bottom: 2px solid var(--nb-ink);
  background: var(--nb-ink);
  color: var(--nb-acid);
  overflow: hidden;
  padding: 14px 0;
}
.nb-marquee-track {
  display: flex;
  width: max-content;
  animation: nb-marquee 20s linear infinite;
}
@keyframes nb-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* bento cards */
.nb-card {
  border: 2px solid var(--nb-ink);
  border-radius: 16px;
  background: var(--nb-paper);
  box-shadow: 6px 6px 0 0 var(--nb-ink);
  transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
  overflow: hidden;
  position: relative;
  text-decoration: none;
  color: inherit;
  display: block;
}
.nb-card:hover { transform: translate(4px, 4px); box-shadow: 0 0 0 0 var(--nb-ink); }

/* radial dot texture: 1px dots every 20px */
.nb-dots {
  background-image: radial-gradient(var(--nb-ink) 1px, transparent 1.4px);
  background-size: 20px 20px;
}
.nb-dots-acid {
  background-image: radial-gradient(var(--nb-acid) 1px, transparent 1.4px);
  background-size: 20px 20px;
}

/* dark bento card overlay: pattern at 40% + mix-blend-overlay */
.nb-overlay-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.4;
  mix-blend-mode: overlay;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44'%3E%3Cpath d='M0 44L44 0' stroke='%23D2E823' stroke-width='7'/%3E%3C/svg%3E");
}

/* product rail */
.nb-rail {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px 4px 24px 4px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.nb-rail::-webkit-scrollbar { display: none; }

.nb-product {
  flex: 0 0 320px;
  max-width: 320px;
  border: 2px solid var(--nb-ink);
  border-radius: 16px;
  background: var(--nb-paper);
  box-shadow: 8px 8px 0 0 var(--nb-ink);
  transition: transform 140ms ease, box-shadow 140ms ease;
  overflow: hidden;
}
.nb-product:hover { transform: translate(4px, 4px); box-shadow: 2px 2px 0 0 var(--nb-ink); }
.nb-product-sold .nb-product-img { filter: grayscale(1); opacity: 0.6; }

/* floating accent cards */
.nb-float { animation: nb-float 4.5s ease-in-out infinite; }
@keyframes nb-float {
  0%, 100% { transform: translateY(-10px); }
  50%      { transform: translateY(10px); }
}

/* footer */
.nb-footer {
  background: var(--nb-ink);
  color: var(--nb-paper);
  border-top: 4px solid var(--nb-ink);
}
.nb-footer a { color: var(--nb-paper); text-decoration: none; }
.nb-flink {
  display: inline-block;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 500;
  padding: 3px 0;
  border-bottom: 2px solid transparent;
  transition: color 120ms ease, border-color 120ms ease;
}
.nb-flink:hover { color: var(--nb-acid); border-bottom-color: var(--nb-acid); }

.nb-input {
  background: transparent;
  border: 2px solid var(--nb-paper);
  border-radius: 12px;
  color: var(--nb-paper);
  padding: 14px 16px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 14px;
  outline: none;
  min-width: 0;
  width: 100%;
}
.nb-input::placeholder { color: rgba(248, 244, 232, 0.55); }
.nb-input:focus { border-color: var(--nb-acid); }

.nb-submit {
  background: var(--nb-acid);
  color: var(--nb-ink);
  border: 2px solid var(--nb-acid);
  border-radius: 12px;
  padding: 14px 22px;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 4px 4px 0 0 rgba(210, 232, 35, 0.35);
  transition: transform 120ms ease, box-shadow 120ms ease;
}
.nb-submit:hover { transform: translate(2px, 2px); box-shadow: 0 0 0 0 rgba(210, 232, 35, 0.35); }
.nb-submit:active { transform: translate(2px, 4px); box-shadow: 0 0 0 0 rgba(210, 232, 35, 0.35); }

/* section label chip */
.nb-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 2px solid var(--nb-ink);
  border-radius: 8px;
  background: var(--nb-paper);
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  box-shadow: 2px 2px 0 0 var(--nb-ink);
}

/* reduced motion: kill loops */
@media (prefers-reduced-motion: reduce) {
  .nb-marquee-track,
  .nb-float,
  .nb-glitch:hover { animation: none !important; }
  .nb-rail { scroll-behavior: auto; }
}
`;function C(){return(0,x.jsxs)(`svg`,{viewBox:`0 0 480 520`,className:`nb-block h-full w-full`,role:`img`,"aria-label":`Abstract acid graphic composition`,children:[(0,x.jsx)(`defs`,{children:(0,x.jsx)(`pattern`,{id:`nb-hd`,width:`20`,height:`20`,patternUnits:`userSpaceOnUse`,children:(0,x.jsx)(`circle`,{cx:`4`,cy:`4`,r:`3`,fill:`#09090B`})})}),(0,x.jsx)(`rect`,{width:`480`,height:`520`,fill:`#D2E823`}),(0,x.jsx)(`rect`,{x:`28`,y:`28`,width:`424`,height:`464`,fill:`none`,stroke:`#09090B`,strokeWidth:`4`}),(0,x.jsx)(`rect`,{x:`52`,y:`52`,width:`200`,height:`180`,fill:`url(#nb-hd)`}),(0,x.jsx)(`circle`,{cx:`330`,cy:`150`,r:`86`,fill:`#09090B`}),(0,x.jsx)(`circle`,{cx:`330`,cy:`150`,r:`60`,fill:`#F8F4E8`}),(0,x.jsx)(`circle`,{cx:`330`,cy:`150`,r:`32`,fill:`#D2E823`,stroke:`#09090B`,strokeWidth:`4`}),(0,x.jsxs)(`g`,{children:[[0,1,2,3,4,5,6,7,8,9].map(e=>(0,x.jsx)(`rect`,{x:52+e*40,y:272,width:`20`,height:`20`,fill:`#09090B`},e)),[0,1,2,3,4,5,6,7,8,9].map(e=>(0,x.jsx)(`rect`,{x:72+e*40,y:292,width:`20`,height:`20`,fill:`#09090B`},`b${e}`))]}),(0,x.jsx)(`path`,{d:`M52 372 L92 332 L132 372 L172 332 L212 372 L252 332 L292 372`,fill:`none`,stroke:`#09090B`,strokeWidth:`8`,strokeLinejoin:`miter`}),(0,x.jsxs)(`g`,{transform:`translate(330 410)`,children:[(0,x.jsx)(`path`,{d:`M0 -70 L16 -18 L70 -14 L26 16 L42 68 L0 34 L-42 68 L-26 16 L-70 -14 L-16 -18 Z`,fill:`#09090B`}),(0,x.jsx)(`circle`,{cx:`0`,cy:`0`,r:`14`,fill:`#D2E823`,stroke:`#09090B`,strokeWidth:`4`})]}),(0,x.jsxs)(`g`,{children:[[0,1,2,3,4,5,6,7].map(e=>(0,x.jsx)(`rect`,{x:52+e*9,y:452,width:e%2==0?5:2,height:`40`,fill:`#09090B`},`c${e}`)),(0,x.jsx)(`text`,{x:`140`,y:`484`,fontFamily:`'Space Grotesk', sans-serif`,fontSize:`24`,fontWeight:`700`,fill:`#09090B`,children:`CW-001`})]})]})}function w({variant:e}){return(()=>{switch(e){case 0:return(0,x.jsxs)(`svg`,{viewBox:`0 0 200 200`,className:`h-full w-full`,role:`img`,"aria-hidden":`true`,children:[(0,x.jsx)(`rect`,{width:`200`,height:`200`,fill:`#D2E823`}),(0,x.jsx)(`path`,{d:`M60 40 L100 30 L140 40 L170 80 L145 100 L145 165 L55 165 L55 100 L30 80 Z`,fill:`#09090B`}),(0,x.jsx)(`path`,{d:`M80 55 L100 90 L120 55`,fill:`none`,stroke:`#D2E823`,strokeWidth:`6`}),(0,x.jsx)(`rect`,{x:`55`,y:`130`,width:`90`,height:`10`,fill:`#F8F4E8`}),(0,x.jsx)(`circle`,{cx:`165`,cy:`35`,r:`16`,fill:`#F8F4E8`,stroke:`#09090B`,strokeWidth:`4`})]});case 1:return(0,x.jsxs)(`svg`,{viewBox:`0 0 200 200`,className:`h-full w-full`,role:`img`,"aria-hidden":`true`,children:[(0,x.jsx)(`rect`,{width:`200`,height:`200`,fill:`#F8F4E8`}),(0,x.jsx)(`path`,{d:`M70 35 L100 45 L130 35 L165 60 L150 85 L140 75 L140 165 L60 165 L60 75 L50 85 L35 60 Z`,fill:`#09090B`}),(0,x.jsx)(`rect`,{x:`70`,y:`100`,width:`60`,height:`40`,fill:`#D2E823`}),(0,x.jsx)(`path`,{d:`M75 108 L125 132 M125 108 L75 132`,stroke:`#09090B`,strokeWidth:`5`})]});case 2:return(0,x.jsxs)(`svg`,{viewBox:`0 0 200 200`,className:`h-full w-full`,role:`img`,"aria-hidden":`true`,children:[(0,x.jsx)(`rect`,{width:`200`,height:`200`,fill:`#09090B`}),(0,x.jsx)(`path`,{d:`M45 110 A55 55 0 0 1 155 110 Z`,fill:`#D2E823`,stroke:`#F8F4E8`,strokeWidth:`4`}),(0,x.jsx)(`rect`,{x:`45`,y:`110`,width:`110`,height:`12`,fill:`#F8F4E8`}),(0,x.jsx)(`path`,{d:`M155 110 L185 128 L155 128 Z`,fill:`#D2E823`,stroke:`#F8F4E8`,strokeWidth:`4`}),(0,x.jsx)(`circle`,{cx:`100`,cy:`82`,r:`10`,fill:`#F8F4E8`})]});case 3:return(0,x.jsxs)(`svg`,{viewBox:`0 0 200 200`,className:`h-full w-full`,role:`img`,"aria-hidden":`true`,children:[(0,x.jsx)(`rect`,{width:`200`,height:`200`,fill:`#D2E823`}),(0,x.jsx)(`path`,{d:`M70 60 Q100 25 130 60`,fill:`none`,stroke:`#09090B`,strokeWidth:`8`}),(0,x.jsx)(`rect`,{x:`55`,y:`60`,width:`90`,height:`100`,fill:`#F8F4E8`,stroke:`#09090B`,strokeWidth:`4`}),[0,1,2,3].map(e=>(0,x.jsx)(`rect`,{x:`70`,y:78+e*20,width:60-e*12,height:`8`,fill:`#09090B`},e))]});case 4:return(0,x.jsxs)(`svg`,{viewBox:`0 0 200 200`,className:`h-full w-full`,role:`img`,"aria-hidden":`true`,children:[(0,x.jsx)(`rect`,{width:`200`,height:`200`,fill:`#F8F4E8`}),(0,x.jsx)(`path`,{d:`M65 40 L100 50 L135 40 L170 70 L150 95 L142 85 L142 165 L58 165 L58 85 L50 95 L30 70 Z`,fill:`#09090B`}),(0,x.jsx)(`path`,{d:`M78 56 L100 100 L122 56`,fill:`none`,stroke:`#D2E823`,strokeWidth:`6`}),(0,x.jsx)(`circle`,{cx:`100`,cy:`130`,r:`22`,fill:`#D2E823`,stroke:`#F8F4E8`,strokeWidth:`4`})]});default:return(0,x.jsxs)(`svg`,{viewBox:`0 0 200 200`,className:`h-full w-full`,role:`img`,"aria-hidden":`true`,children:[(0,x.jsx)(`rect`,{width:`200`,height:`200`,fill:`#09090B`}),[0,1,2].map(e=>(0,x.jsxs)(`g`,{transform:`translate(${32+e*48} 30)`,children:[(0,x.jsx)(`rect`,{width:`32`,height:`110`,rx:`6`,fill:`#F8F4E8`}),(0,x.jsx)(`rect`,{y:`14`,width:`32`,height:`10`,fill:`#D2E823`}),(0,x.jsx)(`path`,{d:`M0 110 Q16 150 32 110 L32 135 Q16 170 0 135 Z`,fill:`#F8F4E8`}),(0,x.jsx)(`rect`,{y:`40`,width:`32`,height:`4`,fill:`#09090B`}),(0,x.jsx)(`rect`,{y:`52`,width:`32`,height:`4`,fill:`#09090B`})]},e))]})}})()}var T=[`FREE SHIPPING OVER €75`,`NEW DROP EVERY FRIDAY 18:00 CET`,`NO RESTOCKS — EVER`,`CAUSTIC WERK BERLIN`,`100% HEAVYWEIGHT COTTON`,`MEMBERS GET 24H EARLY ACCESS`],E=[{name:`STATIC HOODIE / 001`,price:`€120`,tag:`NEW`,variant:0,soldOut:!1},{name:`HALFTONE TEE / ACID`,price:`€45`,tag:`HOT`,variant:1,soldOut:!1},{name:`WERK CAP / 5-PANEL`,price:`€35`,tag:`NEW`,variant:2,soldOut:!1},{name:`BIG TOTE / CAUSTIC`,price:`€25`,tag:`LAST`,variant:3,soldOut:!0},{name:`VOLT CREWNECK / 002`,price:`€95`,tag:`NEW`,variant:4,soldOut:!1},{name:`GLITCH SOCKS 3-PACK`,price:`€18`,tag:`NEW`,variant:5,soldOut:!1}],D=[{label:`STORE`,links:[`New Drops`,`Tees`,`Hoods & Crews`,`Caps`,`Accessories`,`Gift Cards`]},{label:`INFO`,links:[`Size Guide`,`Shipping`,`Returns`,`Care Instructions`,`Stockists`]},{label:`SOCIAL`,links:[`Instagram`,`TikTok`,`YouTube`,`Discord`]}];function O(){let e=(0,b.useRef)(null),t=(0,b.useRef)(null),n=(0,b.useRef)(null),[r,c]=(0,b.useState)(!1);(0,b.useEffect)(()=>{let e=`nb-acid-fonts`;if(document.getElementById(e))return;let t=document.createElement(`link`);t.rel=`preconnect`,t.href=`https://fonts.gstatic.com`,t.crossOrigin=``;let n=document.createElement(`link`);n.id=e,n.rel=`stylesheet`,n.href=`https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Space+Grotesk:wght@400;500;600;700&display=swap`,document.head.append(t,n)},[]),(0,b.useEffect)(()=>{let n=window.matchMedia(`(pointer: fine)`).matches,r=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,i=t.current,a=e.current;if(!n||r||!i||!a)return;a.classList.add(`nb-cursor-on`),i.style.display=`block`;let o=-100,s=-100,c=-100,l=-100,u=1,d=1,f=0,p=e=>{o=e.clientX,s=e.clientY},m=e=>{let t=e.target;t instanceof Element&&(u=t.closest(`a, button, input, [role="button"]`)?2.5:1)},h=()=>{c+=(o-c)*.2,l+=(s-l)*.2,d+=(u-d)*.2,i.style.transform=`translate(${c-16}px, ${l-16}px) scale(${d})`,f=requestAnimationFrame(h)};return window.addEventListener(`mousemove`,p,{passive:!0}),document.addEventListener(`mouseover`,m,!0),f=requestAnimationFrame(h),()=>{window.removeEventListener(`mousemove`,p),document.removeEventListener(`mouseover`,m,!0),cancelAnimationFrame(f),a.classList.remove(`nb-cursor-on`),i.style.display=`none`}},[]);let u=e=>{n.current?.scrollBy({left:e*344,behavior:`smooth`})};return(0,x.jsxs)(`div`,{ref:e,className:`nb-root`,children:[(0,x.jsx)(`style`,{children:S}),(0,x.jsx)(`div`,{ref:t,className:`nb-cursor`,"aria-hidden":`true`}),(0,x.jsx)(`div`,{className:`nb-noise`,"aria-hidden":`true`}),(0,x.jsx)(`header`,{className:`nb-navbar`,children:(0,x.jsxs)(`div`,{className:`flex items-center justify-between gap-3 px-4 py-3 md:px-6`,children:[(0,x.jsxs)(`a`,{href:`#top`,className:`nb-display text-xl md:text-2xl`,style:{textDecoration:`none`},children:[`CAUSTIC`,(0,x.jsx)(`span`,{style:{color:`var(--nb-acid)`,WebkitTextStroke:`1px var(--nb-ink)`},children:`WERK`})]}),(0,x.jsxs)(`nav`,{className:`hidden items-center gap-7 lg:flex`,children:[(0,x.jsx)(`a`,{className:`nb-navlink`,href:`#categories`,children:`Categories`}),(0,x.jsx)(`a`,{className:`nb-navlink`,href:`#drops`,children:`New Drops`}),(0,x.jsx)(`a`,{className:`nb-navlink`,href:`#lookbook`,children:`Lookbook`}),(0,x.jsx)(`a`,{className:`nb-navlink`,href:`#journal`,children:`Journal`})]}),(0,x.jsxs)(`div`,{className:`flex items-center gap-2 md:gap-3`,children:[(0,x.jsxs)(`button`,{type:`button`,className:`nb-navbtn hidden sm:inline-flex`,"aria-label":`Search`,children:[(0,x.jsx)(y,{size:15,strokeWidth:2.5}),`Members`]}),(0,x.jsxs)(`button`,{type:`button`,className:`nb-navbtn`,"aria-label":`Cart, 2 items`,children:[(0,x.jsx)(h,{size:15,strokeWidth:2.5}),(0,x.jsx)(`span`,{className:`hidden md:inline`,children:`Cart`}),(0,x.jsx)(`span`,{className:`nb-mono`,style:{background:`var(--nb-acid)`,border:`1px solid var(--nb-ink)`,borderRadius:4,padding:`0 5px`,fontSize:11},children:`2`})]}),(0,x.jsx)(`button`,{type:`button`,className:`nb-navbtn lg:hidden`,"aria-label":`Menu`,children:(0,x.jsx)(o,{size:15,strokeWidth:2.5})})]})]})}),(0,x.jsxs)(`section`,{id:`top`,className:`mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-8`,children:[(0,x.jsxs)(`div`,{className:`lg:col-span-7`,children:[(0,x.jsxs)(`div`,{className:`nb-sticker mb-8`,children:[(0,x.jsx)(_,{size:14,strokeWidth:2.5,fill:`currentColor`}),`EST. 2019 — BERLIN`]}),(0,x.jsxs)(`h1`,{className:`nb-display nb-hero-title mb-8`,children:[(0,x.jsx)(`span`,{className:`nb-glitch`,children:`WEAR`}),(0,x.jsx)(`br`,{}),(0,x.jsx)(`span`,{className:`nb-glitch`,style:{color:`transparent`,WebkitTextStroke:`3px var(--nb-ink)`},children:`THE`}),(0,x.jsx)(`br`,{}),(0,x.jsx)(`span`,{className:`nb-glitch`,style:{background:`var(--nb-acid)`,padding:`0 12px`,boxShadow:`6px 6px 0 0 var(--nb-ink)`},children:`STATIC`})]}),(0,x.jsx)(`p`,{className:`mb-10 max-w-md text-base leading-relaxed md:text-lg`,style:{fontWeight:500},children:`Heavyweight garms built loud on purpose. Screen-printed in small runs, numbered by hand, gone forever. No restocks — no apologies.`}),(0,x.jsxs)(`div`,{className:`flex flex-wrap items-center gap-5`,children:[(0,x.jsxs)(`a`,{href:`#drops`,className:`nb-btn`,children:[`Shop the drop`,(0,x.jsx)(a,{size:16,strokeWidth:2.5})]}),(0,x.jsx)(`a`,{href:`#lookbook`,className:`nb-btn-ghost`,children:`Lookbook`})]}),(0,x.jsxs)(`div`,{className:`mt-12 flex flex-wrap items-center gap-x-8 gap-y-3`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-display text-3xl`,children:`014`}),(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest opacity-70`,children:`DROPS SHIPPED`})]}),(0,x.jsx)(`div`,{className:`h-10 w-[2px]`,style:{background:`var(--nb-ink)`}}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-display text-3xl`,children:`500`}),(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest opacity-70`,children:`UNITS PER RUN`})]}),(0,x.jsx)(`div`,{className:`h-10 w-[2px]`,style:{background:`var(--nb-ink)`}}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-display text-3xl`,children:`0`}),(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest opacity-70`,children:`RESTOCKS`})]})]})]}),(0,x.jsx)(`div`,{className:`lg:col-span-5`,children:(0,x.jsxs)(`div`,{className:`relative mx-auto max-w-md pb-10 pr-6 md:pr-10`,children:[(0,x.jsx)(`div`,{className:`nb-bd-4 overflow-hidden`,style:{borderRadius:32,boxShadow:`10px 10px 0 0 var(--nb-ink)`},children:(0,x.jsx)(C,{})}),(0,x.jsxs)(`div`,{className:`nb-float nb-bd absolute -bottom-2 -right-1 md:right-2`,style:{borderRadius:14,background:`var(--nb-paper)`,boxShadow:`8px 8px 0 0 var(--nb-ink)`,padding:`14px 18px`,minWidth:168},children:[(0,x.jsx)(`div`,{className:`nb-mono text-[10px] tracking-widest opacity-70`,children:`HOODIE / 001`}),(0,x.jsx)(`div`,{className:`nb-display mt-1 text-2xl`,children:`€120`}),(0,x.jsxs)(`div`,{className:`mt-2 flex items-center gap-1 text-xs font-bold`,children:[(0,x.jsx)(_,{size:12,fill:`currentColor`,strokeWidth:2.5}),` 4.9 — 212 REVIEWS`]})]})]})})]}),(0,x.jsx)(`div`,{className:`nb-marquee`,"aria-hidden":`true`,children:(0,x.jsx)(`div`,{className:`nb-marquee-track`,children:[0,1].map(e=>(0,x.jsx)(`div`,{className:`flex items-center`,style:{flexShrink:0},children:T.map(t=>(0,x.jsxs)(`span`,{className:`flex items-center gap-6 pr-6`,children:[(0,x.jsx)(`span`,{className:`nb-display text-lg md:text-xl`,style:{whiteSpace:`nowrap`},children:t}),(0,x.jsx)(l,{size:22,strokeWidth:2.5})]},`${e}-${t}`))},e))})}),(0,x.jsxs)(`section`,{id:`categories`,className:`mx-auto max-w-7xl px-6 py-16 md:py-24`,children:[(0,x.jsxs)(`div`,{className:`mb-10 flex flex-wrap items-end justify-between gap-4`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`span`,{className:`nb-chip mb-5`,children:[(0,x.jsx)(l,{size:13,strokeWidth:2.5}),`SHOP BY CATEGORY`]}),(0,x.jsxs)(`h2`,{className:`nb-display text-4xl md:text-6xl`,children:[(0,x.jsx)(`span`,{className:`nb-glitch`,children:`THE`}),` `,(0,x.jsx)(`span`,{className:`nb-glitch`,children:`RACKS`})]})]}),(0,x.jsx)(`p`,{className:`max-w-xs text-sm font-medium leading-relaxed opacity-80`,children:`Everything sorted rough by weight and volume. Grab it before Friday's crowd does.`})]}),(0,x.jsxs)(`div`,{className:`grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2`,children:[(0,x.jsxs)(`a`,{href:`#drops`,className:`nb-card nb-dots-acid lg:col-span-2 lg:row-span-2`,style:{background:`var(--nb-ink)`,color:`var(--nb-paper)`},children:[(0,x.jsx)(`div`,{className:`nb-overlay-pattern`}),(0,x.jsxs)(`div`,{className:`relative flex h-full min-h-[300px] flex-col justify-between p-7 md:p-9`,children:[(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest`,style:{color:`var(--nb-acid)`},children:`01 / HEAVYWEIGHT`}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-display text-5xl md:text-7xl`,children:`HOODS`}),(0,x.jsx)(`div`,{className:`nb-display text-5xl md:text-7xl`,style:{color:`var(--nb-acid)`},children:`& CREWS`}),(0,x.jsx)(`p`,{className:`mt-4 max-w-xs text-sm font-medium leading-relaxed opacity-80`,children:`480gsm brushed fleece, boxy cut, drop shoulder. The armour of the collection.`})]}),(0,x.jsxs)(`div`,{className:`flex items-center gap-2 text-sm font-bold uppercase tracking-widest`,style:{color:`var(--nb-acid)`},children:[`Browse 18 styles `,(0,x.jsx)(a,{size:16,strokeWidth:2.5})]})]})]}),(0,x.jsx)(`a`,{href:`#drops`,className:`nb-card nb-dots lg:row-span-1`,children:(0,x.jsxs)(`div`,{className:`flex h-full min-h-[190px] flex-col justify-between p-6`,children:[(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest opacity-70`,children:`02 / STAPLES`}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-display text-3xl md:text-4xl`,children:`TEES`}),(0,x.jsx)(`div`,{className:`mt-2 text-sm font-medium opacity-80`,children:`240gsm carded cotton. Boxy, stiff, loud.`})]}),(0,x.jsx)(`span`,{className:`self-start px-2 py-1 text-[11px] font-bold uppercase tracking-widest`,style:{background:`var(--nb-acid)`,border:`2px solid var(--nb-ink)`,borderRadius:6},children:`24 styles`})]})}),(0,x.jsx)(`a`,{href:`#drops`,className:`nb-card`,style:{background:`var(--nb-acid)`},children:(0,x.jsxs)(`div`,{className:`nb-dots flex h-full min-h-[190px] flex-col justify-between p-6`,children:[(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest`,children:`03 / HEAD`}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-display text-3xl md:text-4xl`,children:`CAPS`}),(0,x.jsx)(`div`,{className:`mt-2 text-sm font-bold`,children:`5-panel & strapback.`})]}),(0,x.jsx)(`span`,{className:`self-start px-2 py-1 text-[11px] font-bold uppercase tracking-widest`,style:{background:`var(--nb-paper)`,border:`2px solid var(--nb-ink)`,borderRadius:6},children:`09 styles`})]})}),(0,x.jsx)(`a`,{href:`#drops`,className:`nb-card nb-dots sm:col-span-2 lg:col-span-2`,children:(0,x.jsxs)(`div`,{className:`flex h-full min-h-[150px] flex-col justify-between p-6 md:flex-row md:items-end md:gap-6`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest opacity-70`,children:`04 / EXTRAS`}),(0,x.jsx)(`div`,{className:`nb-display mt-1 text-3xl md:text-4xl`,children:`ACCESSORIES`}),(0,x.jsx)(`div`,{className:`mt-2 text-sm font-medium opacity-80`,children:`Totes, socks, patches, stickers. The small heavy stuff.`})]}),(0,x.jsx)(`div`,{className:`nb-display shrink-0 text-5xl md:text-6xl`,style:{color:`transparent`,WebkitTextStroke:`2px var(--nb-ink)`},children:`31+`})]})})]})]}),(0,x.jsxs)(`section`,{id:`drops`,className:`mx-auto max-w-7xl px-6 pb-20 md:pb-28`,children:[(0,x.jsxs)(`div`,{className:`mb-8 flex flex-wrap items-end justify-between gap-4`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsxs)(`span`,{className:`nb-chip mb-5`,children:[(0,x.jsx)(y,{size:13,strokeWidth:2.5}),`DROP 014 — LIVE NOW`]}),(0,x.jsx)(`h2`,{className:`nb-display text-4xl md:text-6xl`,children:(0,x.jsx)(`span`,{className:`nb-glitch`,children:`NEW DROPS`})})]}),(0,x.jsxs)(`div`,{className:`flex gap-3`,children:[(0,x.jsx)(`button`,{type:`button`,className:`nb-navbtn`,"aria-label":`Scroll products left`,onClick:()=>u(-1),children:(0,x.jsx)(i,{size:16,strokeWidth:2.5})}),(0,x.jsx)(`button`,{type:`button`,className:`nb-navbtn`,"aria-label":`Scroll products right`,onClick:()=>u(1),children:(0,x.jsx)(a,{size:16,strokeWidth:2.5})})]})]}),(0,x.jsx)(`div`,{ref:n,className:`nb-rail`,children:E.map(e=>(0,x.jsxs)(`article`,{className:`nb-product${e.soldOut?` nb-product-sold`:``}`,children:[(0,x.jsxs)(`div`,{className:`nb-product-img relative aspect-square border-b-2`,style:{borderColor:`var(--nb-ink)`},children:[(0,x.jsx)(w,{variant:e.variant}),(0,x.jsx)(`span`,{className:`absolute left-3 top-3 px-2 py-1 text-[10px] font-bold uppercase tracking-widest`,style:{background:`var(--nb-paper)`,border:`2px solid var(--nb-ink)`,borderRadius:6},children:e.tag}),e.soldOut&&(0,x.jsx)(`span`,{className:`nb-display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 px-4 py-2 text-xl`,style:{background:`var(--nb-ink)`,color:`var(--nb-paper)`,border:`2px solid var(--nb-paper)`,borderRadius:8},children:`SOLD OUT`})]}),(0,x.jsxs)(`div`,{className:`flex items-center justify-between gap-3 p-4`,children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`text-sm font-bold uppercase tracking-wide`,children:e.name}),(0,x.jsxs)(`div`,{className:`nb-mono mt-1 text-xs opacity-70`,children:[`CW-014 / `,e.soldOut?`RESTOCK: NEVER`:`IN STOCK`]})]}),(0,x.jsx)(`div`,{className:`nb-display shrink-0 text-lg`,children:e.price})]})]},e.name))})]}),(0,x.jsx)(`footer`,{id:`journal`,className:`nb-footer`,children:(0,x.jsxs)(`div`,{className:`mx-auto max-w-7xl px-6 py-14 md:py-20`,children:[(0,x.jsxs)(`div`,{className:`mb-14 grid grid-cols-1 gap-8 border-b-2 pb-14 md:grid-cols-2 md:gap-12`,style:{borderColor:`rgba(248,244,232,0.25)`},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-mono text-xs tracking-widest`,style:{color:`var(--nb-acid)`},children:`// TRANSMISSION`}),(0,x.jsxs)(`h3`,{className:`nb-display mt-3 text-3xl md:text-5xl`,style:{lineHeight:.95},children:[`GET THE DROP `,(0,x.jsx)(`span`,{style:{color:`var(--nb-acid)`},children:`ALARM`})]}),(0,x.jsx)(`p`,{className:`mt-4 max-w-sm text-sm leading-relaxed`,style:{opacity:.7},children:`One email per drop. 24 hours before the public. Unsubscribe whenever — we won't beg.`})]}),(0,x.jsxs)(`form`,{className:`flex flex-col gap-3 sm:flex-row sm:items-start`,onSubmit:e=>{e.preventDefault(),c(!0)},children:[(0,x.jsxs)(`div`,{className:`flex-1`,children:[(0,x.jsx)(`label`,{htmlFor:`nb-email`,className:`nb-mono mb-2 block text-xs tracking-widest`,style:{opacity:.7},children:`EMAIL ADDRESS`}),(0,x.jsx)(`input`,{id:`nb-email`,type:`email`,required:!0,className:`nb-input`,placeholder:`you@static.club`,disabled:r})]}),(0,x.jsx)(`div`,{className:`sm:pt-[26px]`,children:(0,x.jsx)(`button`,{type:`submit`,className:`nb-submit w-full sm:w-auto`,disabled:r,children:r?`You’re in ★`:`Sign me up`})})]})]}),(0,x.jsxs)(`div`,{className:`grid grid-cols-2 gap-10 md:grid-cols-4`,children:[(0,x.jsxs)(`div`,{className:`col-span-2 md:col-span-1`,children:[(0,x.jsxs)(`div`,{className:`nb-display text-2xl`,children:[`CAUSTIC`,(0,x.jsx)(`span`,{style:{color:`var(--nb-acid)`},children:`WERK`})]}),(0,x.jsx)(`p`,{className:`mt-4 max-w-[220px] text-xs leading-relaxed`,style:{opacity:.6},children:`Ritterstrasse 12, 10969 Berlin. Screen-printed, numbered, shipped rough.`}),(0,x.jsx)(`div`,{className:`mt-5 flex gap-2`,children:[d,p,s].map((e,t)=>(0,x.jsx)(`a`,{href:`#journal`,"aria-label":`Social link`,className:`flex h-10 w-10 items-center justify-center rounded-lg`,style:{border:`2px solid var(--nb-paper)`},children:(0,x.jsx)(e,{size:16,strokeWidth:2.25})},t))})]}),D.map(e=>(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{className:`nb-mono mb-4 text-xs tracking-widest`,style:{color:`var(--nb-acid)`},children:e.label}),(0,x.jsx)(`ul`,{className:`flex flex-col gap-2`,children:e.links.map(e=>(0,x.jsx)(`li`,{children:(0,x.jsx)(`a`,{className:`nb-flink`,href:`#top`,children:e})},e))})]},e.label))]}),(0,x.jsxs)(`div`,{className:`nb-mono mt-14 flex flex-col items-start justify-between gap-2 border-t-2 pt-6 text-[11px] tracking-widest md:flex-row md:items-center`,style:{borderColor:`rgba(248,244,232,0.25)`,opacity:.6},children:[(0,x.jsx)(`span`,{children:`© 2026 CAUSTIC WERK GMBH — ALL RIGHTS RESERVED`}),(0,x.jsx)(`span`,{children:`DESIGN SYSTEM: NEO-BRUTALIST ACID / PAPER #F8F4E8 / INK #09090B / ACID #D2E823`})]})]})})]})}export{O as default};