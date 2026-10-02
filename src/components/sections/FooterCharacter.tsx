'use client';
import { memo, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './FooterSection.module.css';

// Face proportions and motion adapted from Matthias Oelschlegel's FooterCharacter.
function FooterCharacter() {
  const stage = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const blink = useRef(() => {});
  useEffect(() => {
    const root = stage.current;
    const mascot = body.current;
    if (!root || !mascot) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, elapsed = 0, previous = 0, blinkStart = -1000, nextBlink = 3200;
    let visible = false;
    let secondBlink = -1;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      const delta = previous ? Math.min(48, now - previous) : 16;
      previous = now; elapsed += delta;
      const blend = media.matches ? 1 : 1 - Math.exp(-delta / 154);
      x += (targetX - x) * blend; y += (targetY - y) * blend;
      mascot.style.setProperty('--look-x', `${x * 18}%`);
      mascot.style.setProperty('--look-y', `${y * 16}%`);
      mascot.style.setProperty('--light-x', `${50 + x * 22}%`);
      mascot.style.setProperty('--light-y', `${30 + y * 16}%`);
      mascot.style.transform = media.matches ? 'none' : `translateY(${Math.sin(elapsed / 1600) * 8}px) perspective(1000px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) rotateZ(${x * 1.5}deg)`;
      if (!media.matches && elapsed >= nextBlink) { blinkStart = elapsed; secondBlink = Math.random() < .22 ? elapsed + 290 : -1; nextBlink = elapsed + 3600 + Math.random() * 4700; }
      if (!media.matches && secondBlink >= 0 && elapsed >= secondBlink) { blinkStart = elapsed; secondBlink = -1; }
      const age = elapsed - blinkStart;
      const closure = age >= 0 && age < 180 ? age < 65 ? age / 65 : 1 - (age - 65) / 115 : 0;
      mascot.style.setProperty('--blink', String(closure));
      if (!media.matches || (age >= 0 && age < 180)) frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick); };
    const gaze = (clientX: number, clientY: number) => {
      const rect = mascot.getBoundingClientRect();
      targetX = Math.max(-1, Math.min(1, (clientX - rect.left - rect.width / 2) / Math.max(180, rect.width / 2)));
      targetY = Math.max(-1, Math.min(1, (clientY - rect.top - rect.height / 2) / Math.max(180, rect.height / 2)));
      start();
    };
    const move = (event: PointerEvent) => {
      const link = event.target instanceof Element ? event.target.closest('a,button') : null;
      if (link && root.closest('footer')?.contains(link)) { const r = link.getBoundingClientRect(); gaze(r.left + r.width / 2, r.top + r.height / 2); }
      else gaze(event.clientX, event.clientY);
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement) || !root.closest('footer')?.contains(event.target)) return;
      const rect = event.target.getBoundingClientRect(); gaze(rect.left + rect.width / 2, rect.top + rect.height / 2);
    };
    const reset = () => { targetX = targetY = 0; start(); };
    const visibility = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; start(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visibility(); });
    observer.observe(root);
    blink.current = () => { blinkStart = elapsed; secondBlink = -1; nextBlink = elapsed + 4000; start(); };
    window.addEventListener('pointermove', move, { passive: true }); window.addEventListener('blur', reset);
    document.addEventListener('focusin', focus); document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', visibility);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener('pointermove', move); window.removeEventListener('blur', reset);
      document.removeEventListener('focusin', focus); document.removeEventListener('visibilitychange', visibility);
      media.removeEventListener('change', visibility); blink.current = () => {};
    };
  }, []);
  return <div ref={stage} className={styles.stage}><div ref={body} className={styles.character}>
    <Image src="/images/footer-character.png" alt="" fill sizes="(max-width: 700px) 90vw, 470px" draggable={false} />
    <div className={styles.surfaceLight} aria-hidden="true" />
    <button className={styles.face} type="button" aria-label="Make the character blink" onClick={() => blink.current()}>{[0, 1].map(index => <span key={index} className={styles.eye} aria-hidden="true"><span className={styles.pupil} /></span>)}</button>
  </div></div>;
}

export default memo(FooterCharacter);
