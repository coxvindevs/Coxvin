'use client';

// Adapted from the supplied Hyperiux Vault timeline.
import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useAbout } from '@/components/layout/AboutProvider';
import { ArrowUpRight } from 'lucide-react';
import styles from './CompanyTimeline.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);
const founders = [
  ['Junaid Khan', 'Chief Executive Officer', 'CEO'],
  ['Muhammad Abbas', 'Chief Operating Officer', 'COO'],
  ['Muhammad Awais', 'Managing Director', 'MD'],
  ['Muhammad Abdullah Bhatti', 'Chief Technology Officer', 'CTO'],
];

export default function CompanyTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const openAbout = useAbout();
  useGSAP(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    const media = gsap.matchMedia();
    media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance() + 240}`, pin: viewport, scrub: true, invalidateOnRefresh: true },
      });
      timeline.to(track, { x: () => -distance(), duration: 1 }, 0);
      timeline.fromTo(section.querySelector(`.${styles.progress}`), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0);
      section.querySelectorAll(`.${styles.entry}`).forEach((entry, index) => {
        const at = index * 0.18;
        timeline.fromTo(entry.querySelector(`.${styles.stem}`), { scaleY: 0 }, { scaleY: 1, duration: 0.15 }, at);
        timeline.fromTo(entry.querySelector(`.${styles.dot}`), { scale: 0 }, { scale: 1, duration: 0.1 }, at);
        timeline.fromTo(entry.querySelector(`.${styles.copy}`), { y: 32 }, { y: 0, duration: 0.18 }, at + 0.02);
      });
    });
    return () => media.revert();
  }, { scope: sectionRef });
  return <section id="gap" ref={sectionRef} className={styles.section} aria-labelledby="company-heading">
    <div ref={viewportRef} className={styles.viewport}>
      <header className={styles.header}><span>THE PEOPLE BEHIND COXVIN</span><span>PAKISTAN / WORLDWIDE</span></header>
      <div ref={trackRef} className={styles.track}>
        <div className={styles.intro}>
          <div className={styles.image}><Image src="/images/closing-cta/cta-bg-loom.webp" alt="Interconnected threads on an industrial loom" fill sizes="(max-width: 767px) 100vw, 300px" /></div>
          <div className={styles.introCopy}>
            <h2 id="company-heading">One team.<br />Connected thinking.</h2>
            <p>Coxvin brings brand, digital experiences and business systems together. Four co-founders, working across the company to turn complex business needs into connected solutions.</p>
            <button onClick={openAbout} className={styles.about}>About the studio <ArrowUpRight size={19} aria-hidden="true" /></button>
          </div>
        </div>
        <div className={styles.timeline}>
          <div className={styles.rail} aria-hidden="true"><div className={styles.progress} /></div>
          <ol className={styles.entries}>{founders.map(([name, role, short], index) => <li key={name} className={styles.entry}>
            <span className={styles.stem} aria-hidden="true" /><span className={styles.dot} aria-hidden="true" />
            <div className={styles.copy}><span className={styles.number}>0{index + 1} / CO-FOUNDER</span><h3>{name}</h3><p>{role}</p><span className={styles.role}>{short}</span></div>
          </li>)}</ol>
        </div>
      </div>
    </div>
  </section>;
}
