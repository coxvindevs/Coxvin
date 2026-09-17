'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
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
    number: '04',
    copy: 'Core technology domains spanning experience, product, systems and AI.',
  },
  {
    number: '01',
    copy: 'Integrated technology partner from strategy through engineering and automation.',
  },
];

interface BrandItem {
  id: string;
  name: string;
  alt: string;
  src: string;
  stageWidth: string;
  stageHeight: string;
  opacity?: number;
}

const BRANDS: BrandItem[] = [
  // ROW 1
  {
    id: '01',
    name: 'Cullet',
    alt: 'Cullet',
    src: '/images/brands/prepared/cullet.png',
    stageWidth: '156px',
    stageHeight: '38px',
  },
  {
    id: '02',
    name: 'Softly',
    alt: 'Softly',
    src: '/images/brands/prepared/softly.png',
    stageWidth: '152px',
    stageHeight: '52px',
  },
  {
    id: '03',
    name: 'Oscilla Engineering',
    alt: 'Oscilla Engineering',
    src: '/images/brands/prepared/oscilla.png',
    stageWidth: '152px',
    stageHeight: '58px',
  },
  {
    id: '04',
    name: 'Flozen AI',
    alt: 'Flozen AI',
    src: '/images/brands/prepared/flozen.png',
    stageWidth: '128px',
    stageHeight: '76px',
  },
  // ROW 2
  {
    id: '05',
    name: 'Gulf Fiber',
    alt: 'Gulf Fiber Company (PVT) LIMITED',
    src: '/images/brands/prepared/gulf-fiber.png',
    stageWidth: '152px',
    stageHeight: '52px',
  },
  {
    id: '06',
    name: 'Open ERP',
    alt: 'Open ERP',
    src: '/images/brands/prepared/open-erp.png',
    stageWidth: '96px',
    stageHeight: '80px',
  },
  {
    id: '07',
    name: 'Mowasala',
    alt: 'Mowasala',
    src: '/images/brands/prepared/mowasala.png',
    stageWidth: '90px',
    stageHeight: '82px',
  },
  {
    id: '08',
    name: 'Staatliche Form',
    alt: 'Staatliche Form',
    src: '/images/brands/prepared/staatliche.png',
    stageWidth: '152px',
    stageHeight: '60px',
  },
];

const PARAGRAPH_1 =
  "Ambitious businesses deserve technology as capable as the ideas behind them. Too often, growth outpaces the systems supporting it. Coxvin closes that gap between what a business has become and what its technology allows it to do.";

const PARAGRAPH_2 =
  "When the right systems fall into place, technology stops being overhead and becomes leverage.";

export default function ProblemsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const statContainerRef = useRef<HTMLDivElement>(null);
  const highlightTlRef = useRef<gsap.core.Timeline | null>(null);

  const [activeStatIndex, setActiveStatIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Helper to trigger stat transition
  const goToStat = useCallback(
    (newIndex: number) => {
      if (isTransitioning || newIndex === activeStatIndex) return;
      setIsTransitioning(true);

      const currentNum = statContainerRef.current?.querySelector('.stat-num');
      const currentCopy = statContainerRef.current?.querySelector('.stat-copy');

      const tl = gsap.timeline({
        onComplete: () => {
          setActiveStatIndex(newIndex);
          setIsTransitioning(false);
        },
      });

      // Outgoing: yPercent -> -150, opacity -> 0, duration .3, stagger .03, ease-primary
      if (currentNum && currentCopy) {
        tl.to([currentNum, currentCopy], {
          yPercent: -150,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: 'power2.inOut',
        });
      }
    },
    [activeStatIndex, isTransitioning]
  );

  const nextStat = useCallback(() => {
    const nextIdx = (activeStatIndex + 1) % STATS.length;
    goToStat(nextIdx);
  }, [activeStatIndex, goToStat]);

  const prevStat = useCallback(() => {
    const prevIdx = (activeStatIndex - 1 + STATS.length) % STATS.length;
    goToStat(prevIdx);
  }, [activeStatIndex, goToStat]);

  // Animate incoming stat
  useEffect(() => {
    const currentNum = statContainerRef.current?.querySelector('.stat-num');
    const currentCopy = statContainerRef.current?.querySelector('.stat-copy');

    if (currentNum && currentCopy) {
      gsap.fromTo(
        [currentNum, currentCopy],
        { yPercent: 150, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.075,
          stagger: 0.03,
          ease: 'ease-transition',
        }
      );
    }
  }, [activeStatIndex]);

  // 16s automatic progress cycle
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });
    const anim = gsap.to(bar, {
      scaleX: 1,
      duration: 16,
      ease: 'none',
      onComplete: () => {
        nextStat();
      },
    });

    return () => {
      anim.kill();
    };
  }, [activeStatIndex, nextStat]);

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
    gsap.set(chars, { opacity: 0.2 });

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
        { opacity: 0.2 },
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

      // Subtle eyebrow entrance
      gsap.fromTo(
        '.problems_home_left',
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.problems_home_bottom',
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

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
            style={{ opacity: 0.2 }}
          >
            {char}
          </span>
        ))}
        {wIdx < words.length - 1 && (
          <span className="char-highlight inline-block" style={{ opacity: 0.2 }}>
            &nbsp;
          </span>
        )}
      </span>
    ));
  };

  const currentStat = STATS[activeStatIndex];

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
      <div className="flex flex-col" style={{ width: '1217px' }}>
        {/* TOP HEADER BLOCK */}
        <header
          className="problems_home_header w-full flex flex-row items-start"
          style={{ paddingBottom: '120px' }}
        >
          {/* LEFT COLUMN: STATISTIC / CAROUSEL (x = 24px, width ≈ 292.25px) */}
          <div
            className="problems_home_stats flex flex-col justify-start"
            style={{ width: '292.25px', flexShrink: 0 }}
          >
            {/* Progress line & Navigation */}
            <div className="problems_stats_navigation w-full">
              {/* Thin progress line (16s cycle) */}
              <div className="problem_stats_line w-full h-[1px] bg-[#393632] relative overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="problem_stats_progress-start absolute inset-0 bg-[#E8E8E3] h-full"
                />
              </div>

              {/* Controls row */}
              <div className="problem_stats_bottom flex items-center justify-between pt-3 pb-8">
                {/* Arrow Controls */}
                <div className="problem_stats_pagination flex items-center space-x-2">
                  <button
                    onClick={prevStat}
                    aria-label="previous statistic"
                    className="problem_stats_button p-1 -ml-1 text-neutral-400 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      className="w-[13px] h-[13px]"
                    >
                      <path
                        d="M6.696 13L0 6.5L6.696 0L8.04 1.32796L3.672 5.5448H13V7.4552H3.672L8.04 11.6953L6.696 13Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={nextStat}
                    aria-label="next statistic"
                    className="problem_stats_button p-1 text-neutral-400 hover:text-foreground transition-colors cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                      fill="none"
                      className="w-[13px] h-[13px]"
                    >
                      <path
                        d="M6.304 -5.85383e-07L13 6.5L6.304 13L4.96 11.672L9.328 7.4552L4.84742e-07 7.4552L6.51754e-07 5.5448L9.328 5.5448L4.96 1.30466L6.304 -5.85383e-07Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                </div>

                {/* Index Counter */}
                <div className="problem_stats_index font-mono text-xs text-neutral-400 flex items-center space-x-1">
                  <span>0{activeStatIndex + 1}</span>
                  <span className="text-neutral-600">/</span>
                  <span>0{STATS.length}</span>
                </div>
              </div>
            </div>

            {/* Stat Item Content */}
            <div ref={statContainerRef} className="problem_home_stat-wrap overflow-hidden pt-2">
              <div className="stat-num font-sans text-[50px] leading-[50px] font-bold tracking-[-1.5px] text-foreground">
                {currentStat.number}
              </div>
              <p className="stat-copy font-sans text-[17.5px] leading-[22.75px] font-medium text-neutral-400 mt-4 max-w-[274px]">
                {currentStat.copy}
              </p>
            </div>
          </div>

          {/* RIGHT EDITORIAL COLUMN (x ≈ 537.75px, width ≈ 703.23px) */}
          <div
            className="problems_home_top flex flex-col justify-start"
            style={{ width: '703.23px', marginLeft: '221.5px', flexShrink: 0 }}
          >
            {/* Scroll-Linked Editorial Heading (max width ≈ 659.4px) */}
            <h2
              ref={headingRef}
              className="problems_home_heading font-sans text-[42px] leading-[46.2px] font-bold tracking-[-1.26px] text-foreground w-full max-w-[659.4px]"
            >
              <div>{renderScrubText(PARAGRAPH_1)}</div>
              <div className="h-6" aria-hidden="true" />
              <div>{renderScrubText(PARAGRAPH_2)}</div>
            </h2>

            {/* IDENTITY ROW BENEATH STATEMENT */}
            <div className="gap_home_testimonial flex items-center space-x-3 mt-10">
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

        {/* LOWER PANEL: BRANDS WE'VE HELPED + 4x2 REAL CLIENT GRID */}
        <div
          className="problems_home_bottom w-full flex flex-row items-start pt-0"
          style={{ minHeight: '384px' }}
        >
          {/* LEFT: eyebrow with reference-like circle marker (x = 24px) */}
          <div
            className="problems_home_left flex items-center space-x-3.5 pt-6 select-none"
            style={{ width: '292.25px', flexShrink: 0 }}
          >
            <div
              className="g_eyebrow_circle rounded-full bg-[#D2CFC9] flex-shrink-0"
              style={{ width: '15px', height: '15px' }}
              aria-hidden="true"
            />
            <span className="g_eyebrow_text font-sans text-[18px] leading-[24px] font-semibold text-neutral-100 tracking-[-0.01em]">
              Brands we&apos;ve helped
            </span>
          </div>

          {/* RIGHT: 4-column × 2-row brand logo grid (x ≈ 537.76px, width ≈ 703.23px) */}
          <div
            className="problems_home_collection grid grid-cols-4"
            style={{ width: '703.23px', marginLeft: '221.5px', flexShrink: 0 }}
          >
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                className="problems_home_item flex flex-col items-center justify-between border-b border-dotted border-[#393632] group select-none"
                style={{
                  width: '175.8px',
                  height: '192px',
                  padding: '24px 10px 18px 10px',
                  boxSizing: 'border-box',
                }}
              >
                {/* Normalized Logo Stage (height: 96px, centered horizontally & vertically) */}
                <div
                  className="logo-stage flex items-center justify-center w-full"
                  style={{ height: '96px' }}
                >
                  <div
                    className="flex items-center justify-center transition-opacity duration-200"
                    style={{
                      width: brand.stageWidth,
                      height: brand.stageHeight,
                      opacity: brand.opacity ?? 0.95,
                    }}
                  >
                    <img
                      src={brand.src}
                      alt={brand.alt}
                      className="w-full h-full object-contain object-center select-none pointer-events-none"
                    />
                  </div>
                </div>

                {/* Centered Brand Name with consistent baseline */}
                <div
                  className="font-mono text-[11px] leading-[14px] uppercase tracking-[0.06em] text-center w-full whitespace-nowrap"
                  style={{ color: '#8E8A83' }}
                >
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
