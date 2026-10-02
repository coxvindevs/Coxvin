import{n as e,r as t,t as n}from"./index-DxwTJoEH.js";import{t as r}from"./arrow-right-DGc0NrX5.js";var i=t(e(),1),a=n(),o=`https://designerstephen.github.io/public-assets/videos/serene-art-hero.mp4`,s=[`Collections`,`Artists`,`Journal`,`Contact`],c=`
.mec-root {
  --mec-ink: #0f172a;
  --mec-muted: hsl(215 25% 32%);
  --mec-deep: hsl(201 100% 13%);
  --mec-serif: 'Instrument Serif', Georgia, 'Times New Roman', serif;
  --mec-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;

  position: relative;
  min-height: 100vh;
  background: var(--mec-deep);
  color: var(--mec-ink);
  font-family: var(--mec-sans);
  font-weight: 400;
  overflow-x: hidden;
}

/* --- full-bleed video layer + legibility overlay ----------------- */

.mec-media {
  position: absolute;
  inset: 0;
  background: var(--mec-deep); /* loading / fallback ground */
  z-index: 0;
}

.mec-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.mec-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
}

/* --- 3-column distributed navigation ------------------------------ */

.mec-nav {
  position: relative;
  z-index: 2;
  width: 100%;
}

.mec-nav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 32px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.mec-brand {
  font-family: var(--mec-serif);
  font-weight: 400;
  font-size: 30px;
  line-height: 1;
  color: var(--mec-ink);
  text-decoration: none;
  justify-self: start;
}

.mec-brand sup {
  font-size: 11px;
  font-family: var(--mec-sans);
  margin-left: 2px;
  letter-spacing: 0;
}

.mec-links {
  display: flex;
  align-items: center;
  gap: 40px;
  justify-self: center;
}

.mec-links a {
  font-family: var(--mec-sans);
  font-size: 14px;
  font-weight: 500;
  color: var(--mec-ink);
  text-decoration: none;
  transition: opacity 200ms ease-in-out;
}

.mec-links a:hover {
  opacity: 0.6;
}

.mec-nav-cta {
  justify-self: end;
}

/* --- pill action buttons ------------------------------------------ */

.mec-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 9999px;
  background-color: #000000;
  color: #ffffff;
  font-family: var(--mec-sans);
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: transform 200ms ease-in-out;
}

.mec-pill:hover {
  transform: scale(1.03);
}

.mec-pill--sm {
  padding: 10px 24px;
  font-size: 14px;
}

.mec-pill--hero {
  padding: 20px 56px;
  font-size: 16px;
}

/* --- centered hero ------------------------------------------------- */

.mec-hero {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 102px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 32px 96px;
}

.mec-hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.mec-h1 {
  font-family: var(--mec-serif);
  font-weight: 400;
  font-size: 48px;
  line-height: 0.95;
  letter-spacing: -2.46px;
  color: var(--mec-ink);
  max-width: 14ch;
  margin: 0;
}

.mec-h1 em {
  font-style: normal; /* non-italic editorial emphasis */
}

.mec-sub {
  max-width: 670px;
  margin: 28px 0 0;
  font-family: var(--mec-sans);
  font-size: 18px;
  font-weight: 400;
  line-height: 1.625;
  color: var(--mec-muted);
}

.mec-hero .mec-pill--hero {
  margin-top: 48px;
}

/* --- staggered fade-rise entrance ---------------------------------- */

@keyframes mec-fade-rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mec-rise {
  animation: mec-fade-rise 0.8s ease-out both;
}

.mec-rise--h1 {
  animation-delay: 0s;
}

.mec-rise--sub {
  animation-delay: 0.2s;
}

.mec-rise--cta {
  animation-delay: 0.4s;
}

/* --- responsive ----------------------------------------------------- */

@media (min-width: 768px) {
  .mec-h1 {
    font-size: 80px;
  }
}

@media (max-width: 767px) {
  .mec-links {
    display: none; /* center column hidden on mobile */
  }
}

/* --- reduced motion: content visible, no entrance choreography ------ */

@media (prefers-reduced-motion: reduce) {
  .mec-rise {
    animation: none;
    opacity: 1;
    transform: none;
  }

  .mec-pill {
    transition: none;
  }

  .mec-pill:hover {
    transform: none;
  }

  .mec-links a {
    transition: none;
  }
}
`;function l(){return(0,i.useEffect)(()=>{let e=`mec-google-fonts`;if(document.getElementById(e))return;let t=document.createElement(`link`);t.id=e,t.rel=`stylesheet`,t.href=`https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;500&display=swap`,document.head.appendChild(t)},[]),(0,a.jsxs)(`div`,{className:`mec-root`,children:[(0,a.jsx)(`style`,{children:c}),(0,a.jsxs)(`div`,{className:`mec-media`,"aria-hidden":`true`,children:[(0,a.jsx)(`video`,{className:`mec-video`,src:o,autoPlay:!0,loop:!0,playsInline:!0,preload:`auto`,ref:e=>{e&&(e.muted=!0)}}),(0,a.jsx)(`div`,{className:`mec-overlay`})]}),(0,a.jsx)(`header`,{className:`mec-nav`,children:(0,a.jsxs)(`div`,{className:`mec-nav-inner`,children:[(0,a.jsxs)(`a`,{className:`mec-brand`,href:`#top`,children:[`Sérène`,(0,a.jsx)(`sup`,{children:`®`})]}),(0,a.jsx)(`nav`,{className:`mec-links`,"aria-label":`Primary`,children:s.map(e=>(0,a.jsx)(`a`,{href:`#top`,children:e},e))}),(0,a.jsx)(`a`,{className:`mec-pill mec-pill--sm mec-nav-cta`,href:`#top`,children:`Find my dream`})]})}),(0,a.jsx)(`main`,{className:`mec-hero`,id:`top`,children:(0,a.jsxs)(`div`,{className:`mec-hero-inner`,children:[(0,a.jsxs)(`h1`,{className:`mec-h1 mec-rise mec-rise--h1`,children:[`Find the piece that makes a room `,(0,a.jsx)(`em`,{children:`breathe`}),`.`]}),(0,a.jsx)(`p`,{className:`mec-sub mec-rise mec-rise--sub`,children:`A quiet catalogue of serene, collectable art — each work chosen for its stillness, its light, and its ability to hold a space without raising its voice.`}),(0,a.jsxs)(`a`,{className:`mec-pill mec-pill--hero mec-rise mec-rise--cta`,href:`#top`,children:[`Explore the collection`,(0,a.jsx)(r,{size:16,strokeWidth:2,"aria-hidden":`true`})]})]})})]})}export{l as default};