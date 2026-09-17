'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const GAP_IMAGES = [
  '/images/gap/gap-1.jpg',
  '/images/gap/gap-2.jpg',
  '/images/gap/gap-3.jpg',
  '/images/gap/gap-4.jpg',
  '/images/gap/gap-5.jpg',
];

const LEFT_TEXT = 'WE CLOSE';
const RIGHT_TEXT = 'THAT GAP';
const SUPPORTING_COPY =
  'When growth outpaces the systems behind it, the gap becomes impossible to ignore. Coxvin turns that gap into engineered technology that helps businesses operate, scale and move forward with confidence.';

export default function GapSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const leftHeadingContainRef = useRef<HTMLDivElement>(null);
  const rightHeadingContainRef = useRef<HTMLDivElement>(null);
  const mediaCoverRef = useRef<HTMLDivElement>(null);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isCycling, setIsCycling] = useState(false);

  // Cycling interval for 5 Coxvin images (every 800ms)
  useEffect(() => {
    if (!isCycling) return;
    const interval = setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % GAP_IMAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, [isCycling]);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      const panelEl = panelRef.current;
      const leftContainEl = leftHeadingContainRef.current;
      const rightContainEl = rightHeadingContainRef.current;
      const mediaCoverEl = mediaCoverRef.current;

      if (!sectionEl || !panelEl || !leftContainEl || !rightContainEl || !mediaCoverEl) return;

      const mm = gsap.matchMedia();

      // 1. PREVIOUS CLIENT SECTION EXIT ANIMATION (Desktop min-width: 992px)
      mm.add('(min-width: 992px)', () => {
        gsap.fromTo(
          '.problems_home_wrap',
          { yPercent: 0, opacity: 1 },
          {
            yPercent: 50,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top bottom',
              end: 'top top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      // 2. IMAGE CYCLING VIEWPORT TRIGGER
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => setIsCycling(true),
        onLeave: () => setIsCycling(false),
        onEnterBack: () => setIsCycling(true),
        onLeaveBack: () => setIsCycling(false),
      });

      // 3. MAIN SECTION TIMELINE: HEADING CONVERGENCE & MEDIA CLIP REVEAL
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 50%',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Left container: x from -30vw to 0
      mainTl.fromTo(
        leftContainEl,
        { x: '-30vw' },
        { x: 0, duration: 1.075, ease: 'power3.out' },
        0
      );

      // Right container: x from +30vw to 0
      mainTl.fromTo(
        rightContainEl,
        { x: '30vw' },
        { x: 0, duration: 1.075, ease: 'power3.out' },
        0
      );

      // Media clip reveal: inset(50% 50% 50% 50% round 4px) to inset(0% 0% 0% 0% round 4px)
      mainTl.fromTo(
        mediaCoverEl,
        { clipPath: 'inset(50% 50% 50% 50% round 4px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 4px)', duration: 1.075, ease: 'power3.out' },
        0
      );

      // 4. CHARACTER REVEAL ANIMATION (with keyframes 40% -> opacity:1, 90% -> x:0, scaleY:1)
      const leftChars = panelEl.querySelectorAll<HTMLElement>('.left-char');
      const rightChars = panelEl.querySelectorAll<HTMLElement>('.right-char');

      const charTl = gsap.timeline({
        scrollTrigger: {
          trigger: panelEl,
          start: 'top 50%',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      if (leftChars.length > 0) {
        charTl.fromTo(
          leftChars,
          { x: -80, scaleY: 0.95, opacity: 0 },
          {
            keyframes: [
              { opacity: 1, duration: 0.4 },
              { x: 0, scaleY: 1, duration: 0.5 },
              { x: 0, scaleY: 1, opacity: 1, duration: 0.1 },
            ],
            duration: 1,
            ease: 'expo.out',
            stagger: {
              each: 0.022,
              from: 'end',
            },
          },
          0
        );
      }

      if (rightChars.length > 0) {
        charTl.fromTo(
          rightChars,
          { x: 80, scaleY: 0.95, opacity: 0 },
          {
            keyframes: [
              { opacity: 1, duration: 0.4 },
              { x: 0, scaleY: 1, duration: 0.5 },
              { x: 0, scaleY: 1, opacity: 1, duration: 0.1 },
            ],
            duration: 1,
            ease: 'expo.out',
            stagger: {
              each: 0.022,
              from: 'start',
            },
          },
          0
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="gap"
      className="gap_home_wrap w-full relative z-20 select-none"
      style={{
        height: '1440px',
        backgroundColor: '#080807',
        paddingLeft: '24px',
        paddingRight: '24px',
        boxSizing: 'border-box',
      }}
    >
      {/* STICKY INNER PANEL (1217px × 720px at 1280×720) */}
      <div
        ref={panelRef}
        className="gap_home_contain sticky top-0 mx-auto overflow-hidden"
        style={{
          width: '1217px',
          height: '720px',
          backgroundColor: '#080807',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* CENTER MEDIA SLOT (256px × 320px, behind headline) */}
        <div
          ref={mediaCoverRef}
          className="gap_home_cover absolute z-10 overflow-hidden"
          style={{
            width: '256px',
            height: '320px',
            left: '480.5px', // In 1217px panel, centers around 608.5px (x=632.5 in 1280 viewport)
            top: '128.5px',
            aspectRatio: '4 / 5',
            borderRadius: '2.4px',
            clipPath: 'inset(50% 50% 50% 50% round 4px)',
            willChange: 'clip-path',
          }}
        >
          {/* Constant dark overlay (rgba(0,0,0,0.3), no gradient, no blur) */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'rgba(0, 0, 0, 0.3)' }}
          />

          {/* 5 Cycling Images */}
          {GAP_IMAGES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Coxvin work ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
              style={{
                opacity: activeImageIndex === idx ? 1 : 0,
              }}
            />
          ))}
        </div>

        {/* HEADLINE COMPOSITION (Two separate H2 groups, Animo 131px, in front of media) */}
        <div
          className="gap_home_inner_content absolute z-20 w-full flex items-center justify-between pointer-events-none"
          style={{
            top: '238px',
            paddingLeft: '70px',
            paddingRight: '70px',
            boxSizing: 'border-box',
          }}
        >
          {/* LEFT: WE CLOSE */}
          <div
            ref={leftHeadingContainRef}
            className="gap_home_inner_heading-contain is-left will-change-transform"
            style={{ width: '520.8px', display: 'flex', justifyContent: 'flex-start' }}
          >
            <h2
              className="gap_home_inner_heading is-left font-display uppercase whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-animo), sans-serif',
                fontSize: '131px',
                fontWeight: 500,
                lineHeight: '117.9px',
                letterSpacing: '-3.93px',
                color: '#E8E8E3',
              }}
            >
              {LEFT_TEXT.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="left-char inline-block"
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>

          {/* RIGHT: THAT GAP */}
          <div
            ref={rightHeadingContainRef}
            className="gap_home_inner_heading-contain is-right will-change-transform"
            style={{ width: '502.69px', display: 'flex', justifyContent: 'flex-end' }}
          >
            <h2
              className="gap_home_inner_heading is-right font-display uppercase whitespace-nowrap"
              style={{
                fontFamily: 'var(--font-animo), sans-serif',
                fontSize: '131px',
                fontWeight: 500,
                lineHeight: '117.9px',
                letterSpacing: '-3.93px',
                color: '#E8E8E3',
              }}
            >
              {RIGHT_TEXT.split('').map((char, cIdx) => (
                <span
                  key={cIdx}
                  className="right-char inline-block"
                  style={{
                    willChange: 'transform, opacity',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* SUPPORTING COPY (Centered, Khteka 15.5px, max-width: 379px, top ≈ 504px) */}
        <div
          className="gap_home_bottom absolute z-20 w-full flex justify-center pointer-events-none"
          style={{
            top: '504px',
            left: 0,
          }}
        >
          <p
            className="gap_home_p font-sans text-center"
            style={{
              fontFamily: 'var(--font-khteka), Arial, sans-serif',
              fontSize: '15.5px',
              fontWeight: 500,
              lineHeight: '20.15px',
              letterSpacing: '-0.155px',
              color: '#E8E8E3',
              maxWidth: '379px',
              width: '100%',
              margin: '0 auto',
            }}
          >
            {SUPPORTING_COPY}
          </p>
        </div>
      </div>
    </section>
  );
}
