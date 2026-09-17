'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface DomainItem {
  index: string;
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  videoSrc: string;
}

const domains: DomainItem[] = [
  {
    index: '01',
    title: 'Digital Experiences',
    subtitle: 'Premium websites, interfaces, commerce',
    description:
      'Engineered digital flagships designed for brand authority and conversion velocity. Real-time 3D environments, design systems, and hyper-responsive commerce architectures.',
    specs: ['WebGL / GLSL', 'Next.js App Router', 'Tailwind & Motion', 'Sub-second LCP'],
    videoSrc: 'https://byhuy.b-cdn.net/WebM/Design%20FINAL%20compressed.webm',
  },
  {
    index: '02',
    title: 'Product Engineering',
    subtitle: 'SaaS platforms, web applications, portals',
    description:
      'Full-lifecycle software engineering from domain modeling to high-concurrency production deployments. Scalable micro-frontends and resilient transactional backends.',
    specs: ['Distributed Systems', 'Realtime Sync', 'TypeScript / Node', 'Edge Compute'],
    videoSrc: 'https://byhuy.b-cdn.net/WebM/Development%20Final%20Compressed.webm',
  },
  {
    index: '03',
    title: 'Business Systems',
    subtitle: 'ERP systems, internal operational tools, integrations',
    description:
      'Mission-critical operational infrastructure that powers organizations. Modernizing legacy ERPs, orchestrating event pipelines, and building bespoke administrative cockpits.',
    specs: ['Enterprise Workflows', 'Event-Driven Queues', 'Custom ERP/CRM', 'Data Integrity'],
    videoSrc: 'https://byhuy.b-cdn.net/WebM/OH%20Arch%20Compressed.webm',
  },
  {
    index: '04',
    title: 'AI & Automation',
    subtitle: 'Intelligent workflows, operational agents',
    description:
      'Pragmatic, autonomous AI architectures integrated directly into business workflows. Semantic vector indexing, multi-agent orchestration, and deterministic MCP connectors.',
    specs: ['Autonomous Agents', 'MCP Connectors', 'Vector Embeddings', 'Deterministic Guardrails'],
    videoSrc: 'https://byhuy.b-cdn.net/WebM/Strategy%20Compressed.webm',
  },
];

export default function DomainsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Parallax scrubbing translation yPercent: 0 -> 50 and opacity: 1 -> 0 as cards exit viewport
      const cards = gsap.utils.toArray<HTMLElement>('.domain-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { yPercent: 0, opacity: 1 },
          {
            yPercent: 50,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: card,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="domains"
      ref={sectionRef}
      className="relative z-10 w-full px-6 md:px-12 py-24 md:py-36 bg-background border-t border-border-subtle"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-border-subtle">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-shader-fg block mb-3">
            [ 02 // CAPABILITIES MATRIX ]
          </span>
          <h2 className="font-sans font-bold text-3xl sm:text-5xl md:text-6xl text-foreground uppercase tracking-tight">
            The Four Domains
          </h2>
        </div>
        <p className="font-body text-neutral-400 max-w-md mt-4 md:mt-0 text-base md:text-lg">
          Precision-engineered digital capabilities designed to solve complex business bottlenecks at scale.
        </p>
      </div>

      {/* Domains Container with Native CSS sticky: top: 0px */}
      <div className="flex flex-col gap-12 lg:gap-16">
        {domains.map((domain) => (
          <div
            key={domain.index}
            className="domain-card sticky top-0 w-full min-h-[500px] lg:min-h-[580px] p-8 lg:p-12 border border-border-subtle bg-surface-dark/95 backdrop-blur-md transition-colors duration-500 overflow-hidden flex flex-col justify-between shadow-2xl"
          >
            {/* Background Looping WebM Video with preload="none" attribute */}
            <div className="absolute inset-0 z-0 opacity-25 pointer-events-none overflow-hidden">
              <video
                src={domain.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                preload="none"
                className="w-full h-full object-cover scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            {/* Top Card Metadata */}
            <div className="relative z-10 flex items-center justify-between border-b border-border-subtle/70 pb-4">
              <span className="font-mono text-xs tracking-widest text-shader-fg">
                [ DOMAIN // {domain.index} ]
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                ACTIVE PIPELINE
              </span>
            </div>

            {/* Middle Content */}
            <div className="relative z-10 my-auto py-8">
              <h3 className="font-sans font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 tracking-tight">
                {domain.title}
              </h3>
              <p className="font-mono text-xs text-neutral-400 uppercase tracking-wider mb-6">
                {domain.subtitle}
              </p>
              <p className="font-body text-neutral-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                {domain.description}
              </p>
            </div>

            {/* Bottom Specifications */}
            <div className="relative z-10 pt-4 border-t border-border-subtle/70">
              <div className="flex flex-wrap gap-2">
                {domain.specs.map((spec) => (
                  <span
                    key={spec}
                    className="font-mono text-[10px] sm:text-xs text-neutral-400 bg-background/80 border border-border-subtle px-3 py-1 rounded-none"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
