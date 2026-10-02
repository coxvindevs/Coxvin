'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { engagements } from './engagements';
import styles from './EngagementsGallery.module.css';

export default function EngagementsGallery() {
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef<number | null>(null);
  const hovered = useRef(false);
  const suppressed = useRef<number | null>(null);
  const closing = useRef(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>();
  const hoverIndex = useRef<number | null>(null);
  const waitForPointerMovement = useRef(false);
  const pointerFocus = useRef(false);
  const animation = useRef<gsap.core.Timeline>();
  const orbit = useRef({ phase: -Math.PI / 2 });
  const [active, setActive] = useState<number | null>(null);
  const [motionPaused, setMotionPaused] = useState(false);
  const [position, setPosition] = useState(0);
  const [atEnd, setAtEnd] = useState(false);
  const [atStart, setAtStart] = useState(true);

  const open = useCallback((index: number) => {
    if (activeRef.current !== null || suppressed.current === index) return;
    clearTimeout(hoverTimer.current);
    hoverIndex.current = null;
    activeRef.current = index;
    setActive(index);
  }, []);

  const queueHover = (index: number) => {
    if (activeRef.current !== null || hoverIndex.current === index) return;
    clearTimeout(hoverTimer.current);
    hoverIndex.current = index;
    hoverTimer.current = setTimeout(() => open(index), 280);
  };

  useEffect(() => {
    const track = rail.current;
    const root = section.current;
    if (!track || !root) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = matchMedia('(hover: hover) and (pointer: fine)');
    const compact = matchMedia('(max-width: 700px)');
    const orbitState = orbit.current;
    let visible = false;
    let speed = 0;
    let width = track.clientWidth;
    let cardWidth = cards.current[0]?.offsetWidth ?? 360;
    let previousScroll = -1;
    let previousPhase = NaN;
    const resize = new ResizeObserver(() => {
      width = track.clientWidth;
      cardWidth = cards.current[0]?.offsetWidth ?? 360;
      previousScroll = -1;
      previousPhase = NaN;
      tick(0, 0);
    });
    resize.observe(track);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; tick(0, 0); });
    observer.observe(root);
    const tick = (_time: number, delta: number) => {
      if (document.hidden || (!visible && Number.isFinite(previousPhase))) return;
      const target = !compact.matches && hovered.current && !motionPaused && activeRef.current === null && !motion.matches && pointer.matches ? Math.PI * 2 / 15.015 : 0;
      speed += (target - speed) * Math.min(delta / 700, 1);
      if (activeRef.current === null && Math.abs(speed) > .0001) orbitState.phase += speed * Math.min(delta, 50) / 1000;
      const scroll = track.scrollLeft;
      if (scroll === previousScroll && orbitState.phase === previousPhase) return;
      previousScroll = scroll;
      previousPhase = orbitState.phase;
      cards.current.forEach((card, index) => {
        if (!card) return;
        if (compact.matches) {
          card.style.transform = 'none';
          card.style.opacity = '1';
          card.style.zIndex = '1';
          card.style.setProperty('--logo-face', 'none');
          return;
        }
        // Project the ring's tangent and axis so each plate turns edge-on as it orbits.
        const angle = orbitState.phase + index * Math.PI / 4;
        const tilt = 25.5 * Math.PI / 180;
        const inclination = .492;
        const depthScale = Math.sqrt(1 - inclination * inclination);
        const radius = Math.min(230, width * .25);
        const horizontalSpread = Math.min(1.6, Math.max(1, (width - 180) / 460));
        const cosine = Math.cos(angle);
        const sine = Math.sin(angle);
        const x = cosine * Math.cos(tilt) - sine * Math.sin(tilt) * inclination;
        const y = cosine * Math.sin(tilt) + sine * Math.cos(tilt) * inclination;
        const z = sine * depthScale;
        const perspective = 13 / (13 - z);
        const tangentX = -sine * Math.cos(tilt) - cosine * Math.sin(tilt) * inclination;
        const tangentY = -sine * Math.sin(tilt) + cosine * Math.cos(tilt) * inclination;
        const axisX = Math.sin(tilt) * depthScale;
        const axisY = -Math.cos(tilt) * depthScale;
        const a = tangentX * perspective;
        const b = tangentY * perspective;
        const c = axisX * perspective;
        const d = axisY * perspective;
        card.style.transform = `translate(${x * radius * perspective * horizontalSpread}px, ${y * radius * perspective}px) matrix(${a},${b},${c},${d},0,0) translate(-50%, -50%)`;
        card.style.zIndex = z > 0 ? String(20 + Math.round(z * 10)) : String(1 + Math.round((z + 1) * 8));
        card.style.opacity = z > 0 ? '1' : '.52';
        card.style.setProperty('--logo-face', z > 0 ? 'rotate(180deg)' : 'scaleY(-1)');
      });
      setPosition(Math.min(7, Math.round(scroll / (cardWidth + 24))));
      setAtStart(compact.matches && scroll <= 4);
      setAtEnd(compact.matches && scroll >= track.scrollWidth - width - 4);
    };
    gsap.ticker.add(tick);
    tick(0, 0);
    return () => {
      gsap.ticker.remove(tick);
      resize.disconnect();
      observer.disconnect();
      clearTimeout(hoverTimer.current);
      gsap.killTweensOf(track);
      gsap.killTweensOf(orbitState);
    };
  }, [motionPaused]);

  const close = useCallback(() => {
    const panel = dialog.current;
    const index = activeRef.current;
    if (!panel || index === null || closing.current) return;
    closing.current = true;
    const origin = cards.current[index]?.getBoundingClientRect();
    animation.current?.kill();
    const finish = () => {
      waitForPointerMovement.current = true;
      clearTimeout(hoverTimer.current);
      hoverIndex.current = null;
      suppressed.current = index;
      panel.close();
      activeRef.current = null;
      setActive(null);
      closing.current = false;
      cards.current[index]?.focus({ preventScroll: true });
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !origin) {
      finish();
      return;
    }
    animation.current = gsap.timeline({ onComplete: finish })
      .to(panel.querySelectorAll('[data-detail]'), { opacity: 0, duration: .15 })
      .to(panel, { left: origin.left, top: origin.top, width: origin.width, height: origin.height,
        opacity: 0, duration: .45, ease: 'power3.inOut' }, 0);
  }, []);

  useEffect(() => {
    const panel = dialog.current;
    if (active === null || !panel) return;
    const card = cards.current[active];
    const origin = card?.getBoundingClientRect();
    if (!origin) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = innerWidth <= 700 ? 132 : 96;
    const inset = innerWidth <= 700 ? 12 : 24;
    panel.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const blockOutsideScroll = (event: WheelEvent | TouchEvent) => {
      if (!(event.target instanceof Node) || !panel.contains(event.target)) event.preventDefault();
    };
    document.addEventListener('wheel', blockOutsideScroll, { passive: false });
    document.addEventListener('touchmove', blockOutsideScroll, { passive: false });
    const details = panel.querySelectorAll('[data-detail]');
    gsap.set(panel, { opacity: 1, left: origin.left, top: origin.top, width: origin.width, height: origin.height });
    gsap.set(details, { opacity: 0, y: 12 });
    animation.current = gsap.timeline()
      .to(panel, { left: inset, top, width: innerWidth - inset * 2, height: innerHeight - top - inset,
        duration: reduced ? 0 : .75, ease: 'power3.inOut' })
      .to(details, { opacity: 1, y: 0, duration: reduced ? 0 : .28, stagger: reduced ? 0 : .04 }, reduced ? 0 : .45);
    const resize = () => {
      animation.current?.kill();
      gsap.set(panel, { left: innerWidth <= 700 ? 12 : 24, top: innerWidth <= 700 ? 132 : 96,
        width: innerWidth - (innerWidth <= 700 ? 24 : 48), height: innerHeight - (innerWidth <= 700 ? 144 : 120) });
      gsap.set(details, { opacity: 1, y: 0 });
    };
    window.addEventListener('resize', resize);
    return () => {
      animation.current?.kill();
      document.body.style.overflow = overflow;
      document.removeEventListener('wheel', blockOutsideScroll);
      document.removeEventListener('touchmove', blockOutsideScroll);
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  const browse = (direction: number) => {
    const track = rail.current;
    if (!track) return;
    if (innerWidth > 700) {
      gsap.to(orbit.current, { phase: orbit.current.phase + direction * Math.PI / 4,
        duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1.2,
        ease: 'power3.inOut', overwrite: true });
      return;
    }
    gsap.to(track, { scrollLeft: Math.max(0, Math.min(track.scrollWidth - track.clientWidth,
      track.scrollLeft + direction * ((cards.current[0]?.offsetWidth ?? 360) + 24))),
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : .8, ease: 'power3.inOut', overwrite: true });
  };
  const brand = active === null ? null : engagements[active];

  return (
    <section ref={section} id="engagements" className={styles.section} aria-labelledby="engagements-title">
      <div className={styles.headingRow}>
        <h2 id="engagements-title"><span>03 /</span> SELECTED ENGAGEMENTS</h2>
        <div className={styles.navigation}>
          <span>08 BRANDS</span>
          <button type="button" title={motionPaused ? 'Resume gallery motion' : 'Pause gallery motion'}
            aria-label={motionPaused ? 'Resume gallery motion' : 'Pause gallery motion'}
            aria-pressed={motionPaused} onClick={() => setMotionPaused(!motionPaused)}>{motionPaused ? 'Play' : 'Pause'}</button>
          <button type="button" title="Previous brands" aria-label="Previous brands" disabled={atStart}
            onClick={() => browse(-1)}>←</button>
          <button type="button" title="Next brands" aria-label="Next brands" disabled={atEnd}
            onClick={() => browse(1)}>→</button>
        </div>
      </div>
      <div ref={rail} className={`${styles.rail} ${active !== null ? styles.receded : ''}`} data-lenis-prevent
        onPointerEnter={() => { hovered.current = true; }}
        onPointerLeave={() => { hovered.current = false; clearTimeout(hoverTimer.current); }}>
        <div className={styles.orbitTitle} aria-hidden="true"><span>BRANDS WE</span><br />HAVE HELPED</div>
        <div className={styles.track}>
          {engagements.map((item, index) => (
            <button key={item.logo} ref={(element) => { cards.current[index] = element; }} type="button"
              className={`${styles.card} ${index % 2 ? styles.light : styles.dark}`}
              aria-label={`Explore ${item.name}`} aria-haspopup="dialog" aria-expanded={active === index}
              onPointerEnter={(event) => {
                if (!waitForPointerMovement.current && event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) {
                  queueHover(index);
                }
              }}
              onPointerMove={(event) => {
                if (event.pointerType === 'mouse' && matchMedia('(hover: hover)').matches) {
                  waitForPointerMovement.current = false;
                  queueHover(index);
                }
              }}
              onPointerLeave={() => { clearTimeout(hoverTimer.current); hoverIndex.current = null; suppressed.current = null; }}
              onPointerDown={() => { pointerFocus.current = true; }}
              onPointerUp={() => { pointerFocus.current = false; }}
              onPointerCancel={() => { pointerFocus.current = false; }}
              onBlur={() => { pointerFocus.current = false; }}
              onFocus={() => { if (!pointerFocus.current) open(index); }}
              onClick={() => { suppressed.current = null; open(index); }}>
              <span className={styles.cardHeading}><span>{String(index + 1).padStart(2, '0')}</span>{item.name}</span>
              <span className={styles.logoStage}><Image src={`/images/brands/prepared/${item.logo}.png`}
                alt="" width={280} height={140} className={styles.logo} /></span>
              <span className={styles.category}>{item.category}</span>
            </button>
          ))}
        </div>
      </div>
      <div className={styles.footer} aria-hidden="true"><span>COXVIN / SELECTED RELATIONSHIPS</span><span>{String(position + 1).padStart(2, '0')} — 08</span></div>
      <dialog ref={dialog} className={`${styles.takeover} ${active !== null && active % 2 ? styles.light : styles.dark}`}
        aria-labelledby="engagement-name" data-lenis-prevent onCancel={(event) => { event.preventDefault(); close(); }}
        onKeyDown={(event) => {
          if (event.key === 'Tab') {
            event.preventDefault();
            event.currentTarget.querySelector<HTMLButtonElement>('button')?.focus();
          }
        }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        {brand && <div className={styles.panel}>
          <div className={styles.panelHeading} data-detail>
            <span>{String((active ?? 0) + 1).padStart(2, '0')} / SELECTED ENGAGEMENT</span>
            <button type="button" onClick={close} autoFocus aria-label="Close engagement" title="Close engagement">×</button>
          </div>
          <div className={styles.panelLogo} data-detail><Image src={`/images/brands/prepared/${brand.logo}.png`}
            alt={brand.name} width={520} height={240} loading="eager" className={styles.logo} /></div>
          <div className={styles.detailGrid}>
            <div data-detail><h3 id="engagement-name">{brand.name}</h3><p className={styles.eyebrow}>WHAT WE SHAPED</p>
              <ul>{brand.capabilities.map((capability) => <li key={capability}>{capability.charAt(0) + capability.slice(1).toLowerCase()}</li>)}</ul>
            </div>
            <p className={styles.description} data-detail>{brand.copy}</p>
          </div>
        </div>}
      </dialog>
    </section>
  );
}
