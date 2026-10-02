'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './SiteLoader.module.css';

const RevealContext = createContext(true);
export const useSiteRevealed = () => useContext(RevealContext);

export default function SiteLoader({ children }: { children: ReactNode }) {
  const content = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'loading' | 'leaving' | 'done'>('loading');
  const [progress, setProgress] = useState(0);
  const [canSkip, setCanSkip] = useState(false);
  useEffect(() => {
    let cancelled = false;
    const cleanups: (() => void)[] = [];
    const delay = (ms: number) => new Promise<void>(resolve => {
      const timer = window.setTimeout(resolve, ms);
      cleanups.push(() => clearTimeout(timer));
    });
    const shaderReady = new Promise<void>(resolve => {
      const check = () => {
        const host = document.querySelector<HTMLElement>('[data-portal-field]');
        if (!host || host.dataset.context === 'ready') resolve();
      };
      const observer = new MutationObserver(check);
      observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['data-context'] });
      cleanups.push(() => observer.disconnect());
      check();
    });
    // Do not turn below-the-fold lazy images into blocking startup requests.
    const urls = new Set(Array.from(content.current?.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"], img[loading="eager"]') ?? []).map(image => image.currentSrc || image.src));
    urls.add('/images/coxvin-wordmark-white.png');
    const carouselReady = new Promise<void>(resolve => {
      const check = () => {
        const work = document.getElementById('work');
        if (!work || work.dataset.preloadState === 'ready') resolve();
      };
      const observer = new MutationObserver(check);
      observer.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['data-preload-state'] });
      cleanups.push(() => observer.disconnect());
      check();
    });
    const tasks = [document.fonts.ready, shaderReady, carouselReady, ...Array.from(urls, src => new Promise<void>(resolve => {
      const image = new window.Image();
      image.onload = image.onerror = () => resolve();
      image.src = src;
      cleanups.push(() => { image.onload = image.onerror = null; });
      if (image.complete) resolve();
    }))];
    let completed = 0;
    const ready = Promise.allSettled(tasks.map(async task => {
      await task;
      completed++;
      if (!cancelled) setProgress(Math.round(completed / tasks.length * 100));
    }));
    const skipTimer = window.setTimeout(() => setCanSkip(true), 4000);
    // Never trap visitors behind a stalled third-party asset.
    void Promise.race([Promise.all([ready, delay(1200)]), delay(8000)]).then(() => {
      if (!cancelled) setPhase(current => current === 'loading' ? 'leaving' : current);
    });
    return () => { cancelled = true; clearTimeout(skipTimer); cleanups.forEach(cleanup => cleanup()); };
  }, []);
  useEffect(() => {
    if (phase === 'done') return;
    const node = content.current;
    if (node) node.inert = true;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const block = (event: Event) => event.preventDefault();
    window.addEventListener('wheel', block, { passive: false, capture: true });
    window.addEventListener('touchmove', block, { passive: false, capture: true });
    return () => {
      if (node) node.inert = false;
      document.body.style.overflow = overflow;
      window.removeEventListener('wheel', block, true);
      window.removeEventListener('touchmove', block, true);
    };
  }, [phase]);
  useEffect(() => {
    if (phase !== 'leaving') return;
    const timer = window.setTimeout(() => setPhase('done'), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850);
    return () => clearTimeout(timer);
  }, [phase]);
  return <RevealContext.Provider value={phase !== 'loading'}>
    <div ref={content}>{children}</div>
    {phase !== 'done' && <div className={styles.loader} data-site-loader data-phase={phase}>
      <div className={styles.top}><span>COXVIN</span><span>DESIGN / ENGINEERING</span></div>
      <div className={styles.center}>
        <div className={styles.logo} role="img" aria-label="Coxvin"><div className={styles.fill} style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }} /></div>
        <div className={styles.caption}>Ideas into systems.</div>
      </div>
      <div className={styles.bottom}>
        <span role="status">{phase === 'loading' ? 'Preparing your experience' : 'Welcome to Coxvin'}</span>
        {canSkip && phase === 'loading' && <button onClick={() => setPhase('leaving')}>Enter site</button>}
        <span className={styles.count} aria-hidden="true">{String(progress).padStart(3, '0')}<small>%</small></span>
      </div>
      <div className={styles.track}><div style={{ transform: `scaleX(${progress / 100})` }} /></div>
    </div>}
    <noscript><style>{'[data-site-loader]{display:none!important}'}</style></noscript>
  </RevealContext.Provider>;
}
