'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import styles from './ProblemsSection.module.css';
import EngagementsGallery from './EngagementsGallery';
import Image from 'next/image';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(CustomEase, useGSAP, ScrollTrigger);

try {
  CustomEase.create('ease-transition', '0.22, 1, 0.36, 1');
  CustomEase.create('ease-primary', '0.4, 0, 0.2, 1');
} catch {
  // registered
}

interface StatItem {
  number: string;
  copy: string;
}

const STATS: StatItem[] = [
  {
    number: '01',
    copy: 'Integrated technology partner from strategy through engineering and automation.',
  },
  {
    number: '04',
    copy: 'Core technology domains spanning experience, product, systems and AI.',
  },
];


const PARAGRAPH_1 =
  "Ambitious businesses deserve technology as capable as the ideas behind them. Too often, growth outpaces the systems supporting it. Coxvin closes that gap between what a business has become and what its technology allows it to do.";

const PARAGRAPH_2 =
  "When the right systems fall into place, technology stops being overhead and becomes leverage.";

export default function ProblemsSection() {
  const [activeStat, setActiveStat] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const [mediaMounted, setMediaMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const highlightTlRef = useRef<gsap.core.Timeline | null>(null);

  // Keep browser-injected video attributes outside the hydration boundary.
  useEffect(() => { setMediaMounted(true); }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const timer = window.setInterval(() => {
      const card = sectionRef.current?.querySelector('article');
      const bounds = card?.getBoundingClientRect();
      if (!rotationPaused && !motion.matches && !document.hidden && bounds &&
          bounds.bottom > 0 && bounds.top < window.innerHeight) {
        setActiveStat((index) => (index + 1) % STATS.length);
      }
    }, 15000);
    return () => window.clearInterval(timer);
  }, [rotationPaused, activeStat]);

  useEffect(() => {
    if (!mediaMounted) return;
    const videos = Array.from(sectionRef.current?.querySelectorAll('video') ?? []);
    // Set media properties after hydration, before any autoplay attempt.
    videos.forEach((video) => { video.muted = true; video.defaultMuted = true; });
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const visible = new Set<HTMLVideoElement>();
    const sync = () => videos.forEach((video) => {
      if (visible.has(video) && !motion.matches && !document.hidden) {
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) visible.add(video);
        else visible.delete(video);
      });
      sync();
    });
    videos.forEach((video) => observer.observe(video));
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      videos.forEach((video) => video.pause());
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [mediaMounted]);

  // Line-aware diagonal character highlight timeline
  const initHighlightTimeline = useCallback(() => {
    if (highlightTlRef.current) {
      highlightTlRef.current.kill();
      highlightTlRef.current = null;
    }

    const headingEl = headingRef.current;
    if (!headingEl) return;

    const chars = Array.from(
      headingEl.querySelectorAll<HTMLElement>('.char-highlight')
    );
    if (chars.length === 0) return;

    // Reset initial opacity
    gsap.set(chars, { opacity: 0.3 });
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(chars, { opacity: 1 });
      return;
    }

    // Group characters by rendered visual line using getBoundingClientRect().top
    const linesMap = new Map<number, HTMLElement[]>();
    chars.forEach((char) => {
      const rect = char.getBoundingClientRect();
      const top = Math.round(rect.top);

      let matchedKey: number | null = null;
      linesMap.forEach((_, key) => {
        if (matchedKey === null && Math.abs(key - top) <= 8) {
          matchedKey = key;
        }
      });

      if (matchedKey !== null) {
        linesMap.get(matchedKey)!.push(char);
      } else {
        linesMap.set(top, [char]);
      }
    });

    const sortedLineKeys = Array.from(linesMap.keys()).sort((a, b) => a - b);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingEl,
        start: 'top 100%',
        end: 'center 40%',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    sortedLineKeys.forEach((key, lineIdx) => {
      const lineChars = linesMap.get(key)!;
      // Sort characters strictly left to right
      lineChars.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

      // Successive visual lines begin with approximately 0.3 timeline offset
      const lineStartTime = lineIdx * 0.3;

      tl.fromTo(
        lineChars,
        { opacity: 0.3 },
        {
          opacity: 1,
          duration: 0.35,
          stagger: 0.09, // character stagger ~0.1 within each line
          ease: 'none',
        },
        lineStartTime
      );
    });

    highlightTlRef.current = tl;
  }, []);

  useGSAP(
    () => {
      // Delay initialization slightly to ensure font loading and layout are settled
      const timer = setTimeout(() => {
        initHighlightTimeline();
      }, 50);

      const handleResize = () => {
        initHighlightTimeline();
      };

      window.addEventListener('resize', handleResize);
      ScrollTrigger.addEventListener('refresh', handleResize);


      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.removeEventListener('refresh', handleResize);
        if (highlightTlRef.current) {
          highlightTlRef.current.kill();
        }
      };
    },
    { scope: sectionRef }
  );

  // Helper function to render text split into individual character spans
  const renderScrubText = (text: string) => {
    const words = text.split(' ');
    return words.map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {word.split('').map((char, cIdx) => (
          <span
            key={cIdx}
            className="char-highlight inline-block"
            style={{ opacity: 0.3 }}
          >
            {char}
          </span>
        ))}
        {wIdx < words.length - 1 && (
          <span className="char-highlight inline-block" style={{ opacity: 0.3 }}>
            &nbsp;
          </span>
        )}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="overview"
      className="problems_home_wrap relative w-full bg-background text-foreground select-none"
      style={{
        paddingTop: '31px',
        paddingBottom: '196px',
        paddingLeft: '24px',
        paddingRight: '24px',
        minHeight: '1299px',
      }}
    >
      <div className={`flex flex-col ${styles.inner}`}>
        {/* TOP HEADER BLOCK */}
        <header
          className={`problems_home_header w-full ${styles.header}`}
          style={{ paddingBottom: '120px' }}
        >
          {/* Both slides share one frame aligned to the editorial heading. */}
          <article className={`font-sans ${styles.stats}`} aria-label="Coxvin statistics">
            {STATS.map((stat, index) => (
              <div key={stat.number} aria-hidden={activeStat !== index}
                className={`${styles.card} ${stat.number === '01' ? styles.inverted : ''} ${activeStat === index ? styles.active : ''}`}>
                {mediaMounted ? <video
                  className={styles.art}
                  src="https://assets.21st.dev/ascii-recipes/videos/user_3GfOHB2dxQI7kZ41USLqxbqthoO/e066e2fd-d43b-4508-a073-e4bd3c475074.mp4"
                  poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_3GfOHB2dxQI7kZ41USLqxbqthoO/62e70811-e1f9-4691-b4a1-92140338364f.webp"
                  loop playsInline preload="none" aria-hidden="true"
                /> : <Image
                  className={styles.art}
                  src="https://assets.21st.dev/ascii-recipes/thumbnails/user_3GfOHB2dxQI7kZ41USLqxbqthoO/62e70811-e1f9-4691-b4a1-92140338364f.webp"
                  alt=""
                  fill
                  unoptimized
                  aria-hidden="true"
                />}
                <div className={styles.cardContent}>
                  <span className={styles.number}>{stat.number}</span>
                  <p className={styles.copy}>{stat.copy}</p>
                </div>
              </div>
            ))}
            <div className={`${styles.controls} ${STATS[activeStat].number === '01' ? styles.lightControls : ''}`}>
              {STATS.map((stat, index) => (
                <button key={stat.number} type="button" aria-label={`Show statistic ${stat.number}`}
                  aria-pressed={activeStat === index} onClick={() => setActiveStat(index)}>
                  {stat.number}
                </button>
              ))}
              <button type="button" onClick={() => setRotationPaused((paused) => !paused)}
                aria-label={rotationPaused ? 'Resume statistic rotation' : 'Pause statistic rotation'}>
                {rotationPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </article>

          {/* RIGHT EDITORIAL COLUMN (x ≈ 537.75px, width ≈ 703.23px) */}
          <div
            className={styles.editorial}
          >
            {/* Scroll-Linked Editorial Heading (max width ≈ 659.4px) */}
            <h2
              ref={headingRef}
              className={`problems_home_heading font-sans font-bold text-foreground ${styles.heading}`}
            >
              <div>{renderScrubText(PARAGRAPH_1)}</div>
              <div className="h-6" aria-hidden="true" />
              <div>{renderScrubText(PARAGRAPH_2)}</div>
            </h2>

            {/* IDENTITY ROW BENEATH STATEMENT */}
            <div className={`gap_home_testimonial flex items-center space-x-3 mt-10 ${styles.identity}`}>
              <div className="w-[40px] h-[40px] rounded-full bg-surface-dark border border-border-subtle flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
                <Image
                  src="/images/cx-mark-light.png"
                  alt="Coxvin"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="gap_home_content flex flex-col font-sans text-[17.5px] leading-[22.75px] text-neutral-400 font-medium">
                <span className="text-neutral-200">Coxvin</span>
                <span>Technology Solutions</span>
              </div>
            </div>
          </div>
        </header>

        {/* 1PX SUBTLE / DOTTED DIVIDER */}
        <div
          className="problems_home_header-inner w-full h-[1px] border-b border-dotted border-[#393632]"
          aria-hidden="true"
        />

        <EngagementsGallery />
      </div>
    </section>
  );
}
