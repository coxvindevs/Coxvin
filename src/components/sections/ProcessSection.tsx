'use client';

import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProcessStep {
  id: string;
  stepNum: string;
  heading: string;
  body: string;
  video: string;
  poster: string;
  ctaText: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: '01',
    stepNum: '01',
    heading: 'We understand the system',
    body: 'We start with the business, its users and the constraints around them. The goal is to define the right problem, map the system clearly and establish what the technology actually needs to accomplish.',
    video: '/videos/process/process-1-system.mp4',
    poster: '/videos/process/process-1-poster.jpg',
    ctaText: 'STEP 01 See this step in action ↗',
  },
  {
    id: '02',
    stepNum: '02',
    heading: 'We engineer the solution',
    body: 'With the architecture defined, we design and build the product, experience or automation as one coherent system — from interface and integrations to the infrastructure underneath it.',
    video: '/videos/process/process-2-engineering.mp4',
    poster: '/videos/process/process-2-poster.jpg',
    ctaText: 'STEP 02 See this step in action ↗',
  },
  {
    id: '03',
    stepNum: '03',
    heading: 'We launch and evolve it',
    body: 'We take the system into production, validate it in the real environment and continue refining what matters so the technology remains reliable as the business grows.',
    video: '/videos/process/process-3-launch.mp4',
    poster: '/videos/process/process-3-poster.jpg',
    ctaText: 'STEP 03 See this step in action ↗',
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const cursorWrapRef = useRef<HTMLDivElement>(null);

  const [ctaText, setCtaText] = useState('STEP 01 See this step in action ↗');
  const [cursorState, setCursorState] = useState<'' | 'active' | 'active-edge'>('');
  const [isPressed, setIsPressed] = useState(false);

  // GSAP quickTo for smooth pointer following
  useEffect(() => {
    const cursor = cursorWrapRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.4, ease: 'power3.out' });
    const hideCursor = () => {
      cursor.style.visibility = 'hidden';
      setCursorState('');
      setIsPressed(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest<HTMLElement>('.process-media-link') : null;
      if (!link || !sectionRef.current?.contains(link)) {
        hideCursor();
        return;
      }
      const threshold = 340; // width allowance for flip
      const isNearRightEdge = e.clientX + threshold > window.innerWidth;

      cursor.style.visibility = 'visible';
      setCtaText(link.dataset.cta ?? '');
      setCursorState(isNearRightEdge ? 'active-edge' : 'active');

      const targetX = isNearRightEdge ? e.clientX - 16 : e.clientX + 16;
      const targetY = e.clientY - 17.5;

      xTo(targetX);
      yTo(targetY);
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    // Scrolling can move the hovered media away without firing mouseleave.
    window.addEventListener('scroll', hideCursor, { passive: true, capture: true });
    window.addEventListener('blur', hideCursor);
    window.addEventListener('resize', hideCursor);
    document.addEventListener('visibilitychange', hideCursor);
    document.documentElement.addEventListener('mouseleave', hideCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', hideCursor, true);
      window.removeEventListener('blur', hideCursor);
      window.removeEventListener('resize', hideCursor);
      document.removeEventListener('visibilitychange', hideCursor);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      xTo.tween.kill();
      yTo.tween.kill();
    };
  }, []);

  // Visibility-based video playback
  useGSAP(
    () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;

        ScrollTrigger.create({
          trigger: video,
          start: '0% 100%',
          end: '100% 0%',
          onEnter: () => {
            video.play().catch(() => {});
          },
          onEnterBack: () => {
            video.play().catch(() => {});
          },
          onLeave: () => {
            video.pause();
          },
          onLeaveBack: () => {
            video.pause();
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full overflow-clip text-[#E8E8E3] bg-transparent select-none z-[1]"
      style={{
        paddingTop: '142px',
        paddingBottom: '196px',
      }}
    >
      {/* Accessible visually-hidden H2 */}
      <h2 className="sr-only">Project Journey</h2>

      {/* Main Container: 1217px painted content + 24px side padding = 1265px max */}
      <div className="w-full max-w-[1265px] mx-auto px-6">
        {/* Top SVG Title Treatment: 123.125px high, 78.75px spacing to rows */}
        <div
          className="w-full flex items-center justify-center overflow-hidden"
          style={{ height: '123.125px', marginBottom: '78.75px' }}
        >
          <svg
            viewBox="0 0 1217 123.125"
            className="w-full h-full block fill-current select-none pointer-events-none text-[#E8E8E3]"
            aria-hidden="true"
          >
            <text
              x="0"
              y="104"
              fontFamily="var(--font-khteka), Arial, sans-serif"
              fontWeight="700"
              fontSize="128"
              letterSpacing="0.015em"
              textLength="1217"
              lengthAdjust="spacing"
              fill="currentColor"
            >
              PROJECT JOURNEY
            </text>
          </svg>
        </div>

        {/* Process List: exactly 3 rows, 0px gap between rows */}
        <div className="w-full flex flex-col">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.id}
              className="process-row w-full flex flex-col lg:flex-row items-stretch"
              style={{ minHeight: '337.78125px' }}
            >
              {/* Left Column: 616.5px width */}
              <div
                className="w-full lg:w-[616.5px] shrink-0 flex flex-row items-start"
                style={{
                  borderTop: '1px solid #181715',
                  paddingTop: '31px',
                }}
              >
                {/* Index Allocation: 142.125px width */}
                <div
                  className="shrink-0 flex items-center"
                  style={{ width: '142.125px' }}
                >
                  <span
                    className="font-mono uppercase font-medium flex items-center text-[#938F8A]"
                    style={{
                      fontSize: '10.2px',
                      lineHeight: '13.26px',
                      letterSpacing: '-0.175px',
                    }}
                  >
                    STEP
                    <span
                      className="inline-block rounded-full bg-[#938F8A] mx-[5.8px]"
                      style={{ width: '3px', height: '3px' }}
                    />
                    {step.stepNum}
                  </span>
                </div>

                {/* Copy Block: width ≈340.14px, starts at relative x ≈ 166.125px */}
                <div className="flex-1 max-w-[340.15px] pr-4 lg:pr-0">
                  <h3
                    className="font-sans font-bold text-[#E8E8E3] max-w-[339.43px]"
                    style={{
                      fontSize: '23.5px',
                      lineHeight: '25.85px',
                      letterSpacing: '-0.3525px',
                      marginBottom: '23px',
                    }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    className="font-sans font-medium text-[#938F8A] max-w-[340.15px]"
                    style={{
                      fontSize: '17.5px',
                      lineHeight: '22.75px',
                      letterSpacing: '-0.175px',
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>

              {/* Right Media: 600.5px x 337.78125px (16:9) */}
              <div
                className="w-full lg:w-[600.5px] shrink-0 relative overflow-hidden"
                style={{ height: '337.78125px' }}
              >
                <a
                  href="#process"
                  onClick={(e) => e.preventDefault()}
                  onMouseEnter={(e) => {
                    setCtaText(step.ctaText);
                    const threshold = 340;
                    setCursorState(e.clientX + threshold > window.innerWidth ? 'active-edge' : 'active');
                  }}
                  onMouseLeave={() => {
                    if (cursorWrapRef.current) cursorWrapRef.current.style.visibility = 'hidden';
                    setCursorState('');
                  }}
                  className="process-media-link block w-full h-full relative group cursor-none"
                  data-cta={step.ctaText}
                  aria-label={`${step.heading} - ${step.ctaText}`}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[idx] = el;
                    }}
                    src={step.video}
                    poster={step.poster}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pointer-Following CTA Wrapper */}
      <div
        ref={cursorWrapRef}
        className={`process-cursor-wrap fixed top-0 left-0 z-[25] pointer-events-none will-change-transform ${
          isPressed ? 'is-pressed' : ''
        }`}
        data-cursor={cursorState}
        style={{
          transform: 'translate3d(-9999px, -9999px, 0)',
        }}
      >
        <div className="cursor-bubble flex items-center select-none">
          <span className="cursor-bubble__text whitespace-nowrap">
            {ctaText}
          </span>
        </div>
      </div>

      {/* Scoped CSS for pointer cursor matching Monolog */}
      <style jsx>{`
        .process-cursor-wrap .cursor-bubble {
          height: 35px;
          padding: 0 15.5px;
          background-color: #ddddd5;
          color: #080807;
          border-radius: 2.4px;
          clip-path: inset(0% 100% 0% 0% round 6px);
          opacity: 0;
          transform: translateX(0%) scale(0.92) rotate(0.001deg);
          transition:
            clip-path 0.45s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-cursor-wrap[data-cursor='active'] .cursor-bubble {
          clip-path: inset(0% 0% 0% 0% round 6px);
          opacity: 1;
          transform: translateX(0%) scale(1) rotate(0.001deg);
        }

        .process-cursor-wrap[data-cursor='active-edge'] .cursor-bubble {
          clip-path: inset(0% 0% 0% 0% round 6px);
          opacity: 1;
          transform: translateX(-100%) scale(1) rotate(0.001deg);
        }

        .process-cursor-wrap.is-pressed .cursor-bubble {
          transform: scale(0.9);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-cursor-wrap .cursor-bubble .cursor-bubble__text {
          display: inline-block;
          font-family: var(--font-khteka), Arial, sans-serif;
          font-size: 17.5px;
          font-weight: 500;
          line-height: 22.75px;
          letter-spacing: -0.35px;
          opacity: 0;
          transform: translateY(4px);
          transition:
            opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-cursor-wrap[data-cursor='active'] .cursor-bubble .cursor-bubble__text,
        .process-cursor-wrap[data-cursor='active-edge'] .cursor-bubble .cursor-bubble__text {
          opacity: 1;
          transform: translateY(0);
        }

        @media (hover: none) and (pointer: coarse) {
          .process-cursor-wrap {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
