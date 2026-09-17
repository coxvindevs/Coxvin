'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);

try {
  CustomEase.create('ease-transition', '0.22, 1, 0.36, 1');
} catch {
  // registered
}

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  description: string;
  poster: string;
  videoSrc?: string;
  result?: {
    value: string;
    label: string;
  };
}

const PROJECTS: ProjectItem[] = [
  {
    id: '01',
    index: 'SS — 01/05',
    title: 'Gulf Fiber',
    description:
      "Industrial corporate platform and digital infrastructure engineered for Pakistan's premier polyester staple fibre manufacturer.",
    poster: '/images/work/work-1-gulf-fiber.jpg',
    videoSrc: '/videos/work/gulf-fiber-preview.mp4',
    result: {
      value: '15,000 T',
      label: 'Annual Production Capacity',
    },
  },
  {
    id: '02',
    index: 'SS — 02/05',
    title: 'Cullet',
    description:
      'Architectural digital presence and spatial portfolio system highlighting sustainable material engineering.',
    poster: '/images/work/work-2-cullet.jpg',
  },
  {
    id: '03',
    index: 'SS — 03/05',
    title: 'Oscilla Engineering',
    description:
      'High-precision technical consultancy platform featuring real-time computational models and structural data visualizations.',
    poster: '/images/work/work-3-oscilla.jpg',
  },
  {
    id: '04',
    index: 'SS — 04/05',
    title: 'Flozen AI',
    description:
      'Autonomous agent platform orchestrating vector indexing, continuous data pipelines, and deterministic tool use.',
    poster: '/images/work/work-4-flozen.jpg',
  },
  {
    id: '05',
    index: 'SS — 05/05',
    title: 'Open ERP',
    description:
      'Mission-critical operational cockpit and event-driven administrative workflows modernizing enterprise business systems.',
    poster: '/images/work/work-5-open-erp.jpg',
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const coverRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Video playback: play only while in viewport, pause when leaves
  useEffect(() => {
    const video = videoRef.current;
    const firstCover = coverRefs.current[0];
    if (!video || !firstCover) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(firstCover);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      // 1. Label entrance (eyebrow words & circle)
      gsap.fromTo(
        '.g_eyebrow_circle',
        { scale: 0.4, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.g_eyebrow',
            start: 'clamp(top 85%)',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.eyebrow-word',
        { xPercent: -40, opacity: 0, skewX: 15 },
        {
          xPercent: 0,
          opacity: 1,
          skewX: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'ease-transition',
          scrollTrigger: {
            trigger: '.g_eyebrow',
            start: 'clamp(top 85%)',
            once: true,
          },
        }
      );

      // 2. Poster Parallax: from y = -125px to y = +125px, scale = 1.15
      imgRefs.current.forEach((imgEl, idx) => {
        const coverEl = coverRefs.current[idx];
        if (!imgEl || !coverEl) return;

        gsap.fromTo(
          imgEl,
          { y: -125, scale: 1.15 },
          {
            y: 125,
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: coverEl,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      data-theme-section="light"
      className="works_home_wrap u-theme-light w-full relative z-20 select-none"
      style={{
        backgroundColor: '#E8E8E3',
        color: '#080807',
        padding: '142px 24px 0',
        boxSizing: 'border-box',
      }}
    >
      {/* Subtle restrained grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'url(/images/grain.png)',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Hidden desktop H2 heading matching reference semantic document outline */}
      <h2 className="sr-only">SUCCESS STORIES</h2>

      {/* Main 2-Column Desktop Grid */}
      <div
        className="works_home_contain flex"
        style={{
          width: '1217px',
          gap: '16px',
          boxSizing: 'border-box',
          paddingBottom: '23px',
        }}
      >
        {/* Left Label Rail (width ≈ 189.5px, x ≈ 24px) */}
        <div
          className="works_home_left flex-shrink-0"
          style={{ width: '189.5px' }}
        >
          <div className="g_eyebrow flex items-center">
            <span
              className="g_eyebrow_circle inline-block w-[7px] h-[7px] rounded-full bg-[#080807] mr-2.5 flex-shrink-0"
              style={{ transformOrigin: 'center center' }}
            />
            <span
              className="g_eyebrow_text font-sans font-medium text-[19.5px] leading-[25.35px] tracking-[-0.195px] text-[#080807] inline-flex space-x-1"
            >
              <span className="eyebrow-word inline-block">Success</span>
              <span className="eyebrow-word inline-block">Stories</span>
            </span>
          </div>
        </div>

        {/* Right Project List (width ≈ 1011.5px, x ≈ 229.5px) */}
        <div
          className="works_home_collection flex-shrink-0 flex flex-col"
          style={{ width: '1011.5px' }}
        >
          {PROJECTS.map((project, idx) => {
            const isLast = idx === PROJECTS.length - 1;
            const hasVideo = Boolean(project.videoSrc);

            return (
              <div
                key={project.id}
                className="works_home_item w-full"
                style={{
                  paddingBottom: isLast ? '0px' : '31px',
                  marginBottom: isLast ? '0px' : '31px',
                  borderBottom: isLast ? 'none' : '1px dotted rgba(8, 8, 7, 0.2)',
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="works_home_link flex items-stretch cursor-pointer group"
                  style={{
                    width: '1011.5px',
                    gap: '16px',
                  }}
                >
                  {/* Left: Media Slot (583.375px × 388.906px, 3:2 ratio) */}
                  <div
                    ref={(el) => {
                      coverRefs.current[idx] = el;
                    }}
                    className="works_home_cover relative flex-shrink-0 overflow-hidden"
                    style={{
                      width: '583.375px',
                      height: '388.906px',
                      borderRadius: '2.4px',
                    }}
                  >
                    {/* Parallax Poster Image */}
                    <img
                      ref={(el) => {
                        imgRefs.current[idx] = el;
                      }}
                      src={project.poster}
                      alt={project.title}
                      className="works_home_image absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none will-change-transform"
                      style={{
                        transform: 'scale(1.15)',
                      }}
                    />

                    {/* Hover Video Preview Layer (where local video exists) */}
                    {hasVideo && (
                      <>
                        {/* Backdrop overlay */}
                        <div
                          className="works_home_overlay absolute inset-0 z-10 pointer-events-none"
                          style={{
                            backgroundColor: 'rgba(8, 8, 7, 0.8)',
                            opacity: hoveredIndex === idx ? 1 : 0,
                            backdropFilter:
                              hoveredIndex === idx ? 'blur(2px) sepia(1)' : 'none',
                            WebkitBackdropFilter:
                              hoveredIndex === idx ? 'blur(2px) sepia(1)' : 'none',
                            transition:
                              'opacity 0.2s cubic-bezier(0.25, 0, 0.25, 1), backdrop-filter 0.85s cubic-bezier(0.2, 1, 0.36, 1), -webkit-backdrop-filter 0.85s cubic-bezier(0.2, 1, 0.36, 1)',
                          }}
                        />

                        {/* Centered Video Preview Window (300px × 200px) */}
                        <div
                          className="reel_home_cover absolute z-20 pointer-events-none overflow-hidden rounded-[2px]"
                          style={{
                            width: '300px',
                            height: '200px',
                            top: '50%',
                            left: '50%',
                            opacity: hoveredIndex === idx ? 1 : 0,
                            transform:
                              hoveredIndex === idx
                                ? 'translate(-50%, -50%) scale(1) perspective(600px) translateY(0%) rotateX(0deg)'
                                : 'translate(-50%, -50%) scale(0.95) perspective(600px) translateY(75%) perspective(500px) rotateX(18deg)',
                            transition:
                              'opacity 0.15s cubic-bezier(0.25, 0, 0.25, 1), transform 0.85s cubic-bezier(0.2, 1, 0.36, 1)',
                          }}
                        >
                          <video
                            ref={videoRef}
                            src={project.videoSrc}
                            loop
                            muted
                            playsInline
                            preload="none"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right: Text Information (412.125px × 388.906px) */}
                  <div
                    className="works_home_content flex-shrink-0 flex flex-col justify-between"
                    style={{
                      width: '412.125px',
                      height: '388.906px',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Top Group: Micro Index, Title, Description */}
                    <div className="works_home_title flex flex-col">
                      {/* Micro/index: KhTeKa 10.2px / 10.2px 500 */}
                      <div
                        className="works_home_micro font-sans font-medium text-[10.2px] leading-[10.2px] text-[#080807] mb-6"
                      >
                        {project.index}
                      </div>

                      {/* Project title: KhTeKa 23.5px 700 25.85px -0.3525px */}
                      <h3
                        className="works_home_inner_title font-sans font-bold text-[23.5px] leading-[25.85px] tracking-[-0.3525px] text-[#080807] mb-3 group-hover:opacity-80 transition-opacity"
                      >
                        {project.title}
                      </h3>

                      {/* Description: KhTeKa 17.5px 500 22.75px #6B645C */}
                      <p
                        className="works_home_p font-sans font-medium text-[17.5px] leading-[22.75px] text-[#6B645C]"
                      >
                        {project.description}
                      </p>
                    </div>

                    {/* Bottom Group: Verified Outcome (Only where truthful/verified) */}
                    {project.result ? (
                      <div className="works_home_result flex flex-col mt-auto pt-4">
                        {/* Outcome value: 23.5px 500 */}
                        <div
                          className="works_home_result_value font-sans font-medium text-[23.5px] leading-[25.85px] text-[#080807] mb-1"
                        >
                          {project.result.value}
                        </div>
                        {/* Outcome label: 17.5px 500 max-width ≈ 219px */}
                        <p
                          className="works_home_result_label font-sans font-medium text-[17.5px] leading-[22.75px] text-[#6B645C]"
                          style={{ maxWidth: '219px' }}
                        >
                          {project.result.label}
                        </p>
                      </div>
                    ) : (
                      <div className="works_home_spacer" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-width Reference-Style CTA */}
      <div
        className="works_home_cta"
        style={{
          width: '1217px',
          height: '101px',
        }}
      >
        <Link
          href="#work"
          className="works_home_cta_link flex items-center justify-between group select-none transition-opacity duration-200 hover:opacity-75"
          style={{
            height: '101px',
            padding: '31px 0',
            borderTop: '1px solid #D1D1C7',
            boxSizing: 'border-box',
          }}
        >
          <div
            className="works_home_cta_text font-sans font-bold text-[50px] leading-[50px] tracking-[-1.5px] text-[#080807]"
          >
            05
          </div>
          <div
            className="works_home_cta_text font-sans font-bold text-[50px] leading-[50px] tracking-[-1.5px] text-[#080807]"
          >
            View All Stories
          </div>
          <div
            className="works_home_cta_text font-sans font-bold text-[50px] leading-[50px] tracking-[-1.5px] text-[#080807] transition-transform duration-300 group-hover:translate-x-1"
          >
            (→)
          </div>
        </Link>
      </div>
    </section>
  );
}
