'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

try {
  CustomEase.create('ease-transition', '0.22, 1, 0.36, 1');
  CustomEase.create('ease-primary', '0.55, 0, 0.7, 0');
  CustomEase.create('ease-fade', '0.76, 0, 0.24, 1');
} catch {
  // registered
}

interface EngagementItem {
  id: string;
  lines: string[];
  company: string;
  descriptor: string;
  logo: string;
}

const ENGAGEMENTS: EngagementItem[] = [
  {
    id: '01',
    lines: [
      'Corporate digital platform and',
      'operational technology work for',
      'a major industrial manufacturer.',
    ],
    company: 'Gulf Fiber',
    descriptor: 'Industrial Platform',
    logo: '/images/brands/prepared/gulf-fiber.png',
  },
  {
    id: '02',
    lines: [
      'AI automation and agent',
      'infrastructure designed around',
      'practical business workflows.',
    ],
    company: 'Flozen AI',
    descriptor: 'AI & Automation',
    logo: '/images/brands/prepared/flozen.png',
  },
  {
    id: '03',
    lines: [
      'Operational business systems',
      'focused on administration,',
      'visibility and repeatable workflows.',
    ],
    company: 'Open ERP',
    descriptor: 'Business Systems',
    logo: '/images/brands/prepared/open-erp.png',
  },
];

interface ServiceItem {
  id: string;
  title: string;
  img: string;
}

const SERVICES: ServiceItem[] = [
  { id: '01', title: 'Digital Experiences', img: '/images/services/service-01-digital.jpg' },
  { id: '02', title: 'Product Engineering', img: '/images/services/service-02-product.jpg' },
  { id: '03', title: 'Business Systems', img: '/images/services/service-03-business.jpg' },
  { id: '04', title: 'AI & Automation', img: '/images/services/service-04-ai.jpg' },
  { id: '05', title: 'Systems Integration', img: '/images/services/service-05-integration.jpg' },
  { id: '06', title: 'Technical Strategy', img: '/images/services/service-06-strategy.jpg' },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const previewWrapperRef = useRef<HTMLDivElement>(null);

  // Engagement carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const activeSlideRef = useRef(0);
  activeSlideRef.current = activeSlide;

  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const isVisibleRef = useRef(false);

  // Selected service state
  const [selectedService, setSelectedService] = useState(0);
  const startTimerRef = useRef<() => void>(() => {});

  // 1. Engagement Slide Transition Animation
  const changeSlide = useCallback((newIndex: number, isAuto: boolean) => {
    if (isTransitioning || newIndex === activeSlideRef.current) return;
    setIsTransitioning(true);

    const oldIndex = activeSlideRef.current;
    const oldSlideEl = document.querySelector(`.engagement-slide-${oldIndex}`);
    const newSlideEl = document.querySelector(`.engagement-slide-${newIndex}`);

    if (progressTweenRef.current) {
      progressTweenRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setActiveSlide(newIndex);
        setIsTransitioning(false);
        startTimerRef.current();
      },
    });

    if (isAuto && progressRef.current) {
      tl.to(progressRef.current, {
        xPercent: 100,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }

    // Outgoing elements
    if (oldSlideEl) {
      const oldLines = oldSlideEl.querySelectorAll('.engagement-line');
      const oldVisual = oldSlideEl.querySelector('.engagement-visual');
      const oldDetails = oldSlideEl.querySelectorAll('.engagement-detail');

      tl.to(
        oldLines,
        {
          yPercent: -150,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: 'ease-primary',
        },
        isAuto ? 0.2 : 0
      );

      tl.to(
        oldVisual,
        {
          yPercent: -50,
          opacity: 0,
          duration: 0.3,
          ease: 'ease-primary',
        },
        '<0.05'
      );

      tl.to(
        oldDetails,
        {
          yPercent: -150,
          opacity: 0,
          duration: 0.3,
          stagger: 0.03,
          ease: 'ease-primary',
        },
        '<0.05'
      );
    }

    // Incoming elements
    if (newSlideEl) {
      const newLines = newSlideEl.querySelectorAll('.engagement-line');
      const newVisual = newSlideEl.querySelector('.engagement-visual');
      const newDetails = newSlideEl.querySelectorAll('.engagement-detail');

      const incomingDelay = isAuto ? 0.4 : 0.2;

      tl.set(newSlideEl, { opacity: 1, yPercent: 0 }, `+=${incomingDelay}`);

      tl.fromTo(
        newLines,
        { yPercent: 150, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.075,
          stagger: 0.03,
          ease: 'ease-transition',
        }
      );

      tl.fromTo(
        newVisual,
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.075,
          ease: 'ease-transition',
        },
        '<-0.05'
      );

      tl.fromTo(
        newDetails,
        { yPercent: 150, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.075,
          ease: 'ease-transition',
        },
        '<-0.05'
      );
    }
  }, [isTransitioning]);

  const startTimer = useCallback(() => {
    if (progressTweenRef.current) progressTweenRef.current.kill();
    if (!progressRef.current) return;

    gsap.set(progressRef.current, { xPercent: -100 });
    progressTweenRef.current = gsap.to(progressRef.current, {
      xPercent: 0,
      duration: 16,
      ease: 'none',
      onComplete: () => {
        const next = (activeSlideRef.current + 1) % ENGAGEMENTS.length;
        changeSlide(next, true);
      },
    });

    if (!isVisibleRef.current) {
      progressTweenRef.current.pause();
    }
  }, [changeSlide]);

  startTimerRef.current = startTimer;

  const nextSlide = () => {
    const next = (activeSlide + 1) % ENGAGEMENTS.length;
    changeSlide(next, false);
  };

  const prevSlide = () => {
    const prev = (activeSlide - 1 + ENGAGEMENTS.length) % ENGAGEMENTS.length;
    changeSlide(prev, false);
  };

  // 2. IntersectionObserver to pause/resume 16s timer
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            if (!progressTweenRef.current) {
              startTimer();
            } else {
              progressTweenRef.current.resume();
            }
          } else {
            progressTweenRef.current?.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, [startTimer]);

  // 3. GSAP animations: Eyebrow entrance, Preview scroll reveal, Moving preview wrapper
  useGSAP(
    () => {
      // Eyebrow Entrance
      gsap.fromTo(
        '.services-eyebrow-circle',
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.services-eyebrow',
            start: 'clamp(top 85%)',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.services-eyebrow-word',
        { xPercent: -40, opacity: 0, skewX: 15 },
        {
          xPercent: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'ease-transition',
          scrollTrigger: {
            trigger: '.services-eyebrow',
            start: 'clamp(top 85%)',
            once: true,
          },
        }
      );

      // Preview Scroll Reveal (from yPercent: -50, opacity: 0, blur(4px) -> 0, 1, blur(0))
      if (previewScrollRef.current) {
        gsap.fromTo(
          previewScrollRef.current,
          { yPercent: -50, opacity: 0, filter: 'blur(4px)' },
          {
            yPercent: 0,
            opacity: 1,
            filter: 'blur(0px)',
            ease: 'none',
            scrollTrigger: {
              trigger: '#services',
              start: 'top bottom',
              end: 'center bottom',
              scrub: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // 4. Update preview wrapper travel position when selected service changes
  useEffect(() => {
    if (!previewWrapperRef.current) return;
    // Row 0 center: 26.234px, vertical pitch 75.46875px
    const targetY = 26.234 + selectedService * 75.46875;
    gsap.to(previewWrapperRef.current, {
      y: targetY,
      duration: 1.075,
      ease: 'ease-transition',
    });
  }, [selectedService]);

  return (
    <section
      ref={sectionRef}
      id="services"
      data-theme-section="dark"
      className="services_home_wrap relative w-full z-10 select-none"
      style={{
        backgroundColor: '#080807',
        color: '#E8E8E3',
        height: '757.656px',
        padding: '196px 24px 72px',
        boxSizing: 'border-box',
      }}
    >
      {/* Usable Desktop Content Grid (width ≈ 1217px) */}
      <div
        className="services_home_contain relative flex"
        style={{
          width: '1217px',
          height: '489.656px',
          margin: '0',
        }}
      >
        {/* ======================================================== */}
        {/* LEFT COLUMN: EVIDENCE / ENGAGEMENT CAROUSEL (width 292.25px) */}
        {/* ======================================================== */}
        <div
          className="services_home_left flex-shrink-0 flex flex-col"
          style={{ width: '292.25px' }}
        >
          {/* Top Progress & Navigation block (height ≈ 28.5px) */}
          <div className="services_home_nav flex flex-col" style={{ width: '292.25px' }}>
            {/* 1px Progress Line */}
            <div
              className="problem_stats_line w-full relative overflow-hidden"
              style={{
                height: '1px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              <div
                ref={progressRef}
                className="absolute inset-0 bg-[#E8E8E3] will-change-transform"
                style={{ transform: 'translateX(-100%)' }}
              />
            </div>

            {/* Controls and Index */}
            <div
              className="flex items-center justify-between mt-3"
              style={{ height: '16px' }}
            >
              {/* Arrow buttons */}
              <div className="flex items-center" style={{ gap: '11.5px' }}>
                <button
                  type="button"
                  aria-label="Previous engagement"
                  onClick={prevSlide}
                  className="w-[16px] h-[16px] flex items-center justify-center text-[#E8E8E3] hover:opacity-60 transition-opacity"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M6.696 13L0 6.5L6.696 0L8.04 1.32796L3.672 5.5448H13V7.4552H3.672L8.04 11.6953L6.696 13Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next engagement"
                  onClick={nextSlide}
                  className="w-[16px] h-[16px] flex items-center justify-center text-[#E8E8E3] hover:opacity-60 transition-opacity"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path
                      d="M6.304 0L13 6.5L6.304 13L4.96 11.672L9.328 7.4552H0V5.5448H9.328L4.96 1.30466L6.304 0Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>

              {/* Index 01/03 */}
              <div
                className="font-mono text-[11.6px] leading-[15.08px] tracking-[-0.175px]"
                style={{ color: '#938F8A' }}
              >
                0{activeSlide + 1}/03
              </div>
            </div>
          </div>

          {/* Eyebrow Label */}
          <div
            className="font-mono text-[11.6px] leading-[15.08px] tracking-[-0.116px] uppercase"
            style={{ color: '#938F8A', marginTop: '31px' }}
          >
            ( SELECTED ENGAGEMENTS )
          </div>

          {/* 3 Overlapping Engagement Summaries (Grid Area 1/1) */}
          <div
            className="engagement-collection relative grid grid-cols-1 grid-rows-1"
            style={{
              width: '292.25px',
              marginTop: '38px',
            }}
          >
            {ENGAGEMENTS.map((item, idx) => {
              const isActive = activeSlide === idx;

              return (
                <div
                  key={item.id}
                  className={`engagement-slide-${idx} flex flex-col`}
                  style={{
                    gridArea: '1 / 1',
                    opacity: isActive ? 1 : 0,
                    pointerEvents: isActive ? 'auto' : 'none',
                    transition: isTransitioning ? 'none' : 'opacity 0.2s ease',
                  }}
                >
                  {/* Summary Text: Khteka 17.5px 500 22.75px */}
                  <div
                    className="flex flex-col font-sans font-medium text-[17.5px] leading-[22.75px] tracking-[-0.175px] text-[#E8E8E3]"
                    style={{ maxWidth: '292px' }}
                  >
                    {item.lines.map((line, lineIdx) => (
                      <div key={lineIdx} className="overflow-clip">
                        <span className="engagement-line inline-block will-change-transform">
                          {line}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Identity Group: 43.75 × 43.75 circle + Details */}
                  <div
                    className="flex items-center"
                    style={{ marginTop: '31px' }}
                  >
                    <div
                      className="engagement-visual w-[43.75px] h-[43.75px] rounded-full border border-white/10 bg-[#141412] flex items-center justify-center overflow-hidden flex-shrink-0 will-change-transform p-1.5"
                    >
                      <img
                        src={item.logo}
                        alt={item.company}
                        className="max-w-[28px] max-h-[28px] object-contain opacity-80 select-none pointer-events-none"
                      />
                    </div>
                    <div
                      className="flex flex-col ml-[11.5px] overflow-clip"
                    >
                      <span
                        className="engagement-detail font-sans font-medium text-[15.5px] leading-[20.15px] will-change-transform"
                        style={{ color: '#938F8A' }}
                      >
                        {item.company}
                      </span>
                      <span
                        className="engagement-detail font-sans font-medium text-[11.6px] leading-[11.6px] will-change-transform mt-0.5"
                        style={{ color: '#938F8A' }}
                      >
                        {item.descriptor}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT COLUMN: CAPABILITIES REGION (width 806px, x 435px) */}
        {/* ======================================================== */}
        <div
          className="services_home_right relative flex flex-col"
          style={{
            width: '806px',
            marginLeft: '118.75px',
          }}
        >
          {/* Right Column Eyebrow (● What we can help with) */}
          <div
            className="services-eyebrow flex items-center"
            style={{ marginBottom: '45px' }}
          >
            <span
              className="services-eyebrow-circle inline-block rounded-full bg-[#E8E8E3] mr-3 flex-shrink-0"
              style={{
                width: '13.6px',
                height: '13.6px',
                transformOrigin: 'center center',
              }}
            />
            <span
              className="services-eyebrow-text font-sans font-medium text-[19.5px] leading-[25.35px] tracking-[-0.195px] text-[#E8E8E3] inline-flex space-x-1"
            >
              <span className="services-eyebrow-word inline-block">What</span>
              <span className="services-eyebrow-word inline-block">we</span>
              <span className="services-eyebrow-word inline-block">can</span>
              <span className="services-eyebrow-word inline-block">help</span>
              <span className="services-eyebrow-word inline-block">with</span>
            </span>
          </div>

          {/* Six Service Rows */}
          <div
            className="services_home_service-list flex flex-col relative"
            style={{
              width: '806px',
              height: '429.8125px',
            }}
          >
            {SERVICES.map((service, idx) => {
              const isSelected = selectedService === idx;

              return (
                <div
                  key={service.id}
                  className="services_home_service_item cursor-pointer flex items-center will-change-opacity select-none"
                  style={{
                    height: '52.46875px',
                    marginBottom: idx === SERVICES.length - 1 ? '0px' : '23px',
                    opacity: isSelected ? 1 : 0.3,
                    transition: 'opacity 0.2s cubic-bezier(0.76, 0, 0.24, 1)',
                  }}
                  onMouseEnter={() => setSelectedService(idx)}
                >
                  <h3
                    className="font-sans font-bold text-[69px] leading-[69px] tracking-[-2.07px] text-[#E8E8E3] whitespace-nowrap"
                  >
                    {service.title}
                  </h3>
                </div>
              );
            })}

            {/* ======================================================== */}
            {/* MOVING PREVIEW IMAGE (Right-aligned, 189.5px × 236.875px) */}
            {/* ======================================================== */}
            <div
              ref={previewScrollRef}
              className="absolute top-0 right-0 pointer-events-none will-change-transform"
              style={{
                width: '189.5px',
                height: '0px', // wrapper has 0 base height; travel handled by inner container
              }}
            >
              {/* Traveling wrapper that aligns preview center to active row center */}
              <div
                ref={previewWrapperRef}
                className="absolute right-0 will-change-transform"
                style={{
                  top: '0px',
                  width: '189.5px',
                  transform: 'translateY(26.234px)',
                }}
              >
                {/* Visual Image Box (centered at translateY(-50%)) */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: '189.5px',
                    height: '236.875px',
                    borderRadius: '2.4px',
                    transform: 'translateY(-50%)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  {SERVICES.map((service, idx) => {
                    const isActive = selectedService === idx;

                    return (
                      <img
                        key={service.id}
                        src={service.img}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover object-center will-change-opacity select-none pointer-events-none"
                        style={{
                          opacity: isActive ? 1 : 0,
                          transition: 'opacity 0.2s cubic-bezier(0.76, 0, 0.24, 1)',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
