'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { createCarousel, type CarouselEngine } from '../canvas/liquid-carousel/engine';
import styles from './WorkSection.module.css';

interface ProjectItem {
  id: string;
  index: string;
  title: string;
  description: string;
  poster: string;
  videoSrc?: string;
  href: string;
  result?: {
    value: string;
    label: string;
  };
}

const PROJECTS: ProjectItem[] = [
  ...[
    ['neo-brutalist-acid', 'Neo-brutalist Acid'],
    ['kpop-carousel', 'K-pop Carousel'],
    ['neumorphism', 'Neumorphism'],
    ['bauhaus-primaries', 'Bauhaus Primaries'],
    ['warm-stationery', 'Warm Stationery'],
  ].map(([slug, title], index) => ({
    id: String(index + 1).padStart(2, '0'),
    index: 'Design concept',
    title,
    description: 'An independent website design concept from the Coxvin preview collection.',
    poster: `/images/optimized/project-previews/${slug}.webp`,
    href: `/project-demos/index.html?preview=/${slug}`,
  })),
  {
    id: '06',
    index: 'Live project',
    title: 'Gulf Fiber',
    description:
      "Industrial corporate platform and digital infrastructure engineered for Pakistan's premier polyester staple fibre manufacturer.",
    poster: '/images/optimized/project-previews/gulf-fiber.webp',
    href: 'https://www.gulffiber.co/',
    videoSrc: '/videos/work/gulf-fiber-preview.mp4',
    result: {
      value: '15,000 T',
      label: 'Annual Production Capacity',
    },
  },
  {
    id: '07',
    index: 'Live project',
    title: 'Flozen AI',
    description:
      'Autonomous agent platform orchestrating vector indexing, continuous data pipelines, and deterministic tool use.',
    poster: '/images/optimized/project-previews/flozen-ai.webp',
    href: 'https://flozenai.co/',
  },
];


const carouselProjects = PROJECTS.map((p) => ({ brand: p.title, description: p.description, image: { src: p.poster } }));

export default function WorkSection() {
  const mount = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const engine = useRef<CarouselEngine | null>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [fallback, setFallback] = useState(false);
  const [ready, setReady] = useState(false);
  const [entryDone, setEntryDone] = useState(false);
  const project = PROJECTS[active];

  useEffect(() => {
    const host = mount.current;
    if (!host) return;
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const settings = { current: {
      panelHeight: 450, panelAspect: 16 / 9, gap: 12, glide: .075, wheelSensitivity: 1, snap: true,
      snapDistance: 60, snapDelay: 120, speedShrink: 60, lensShape: 'circle',
      lensRotation: 65, lensWidth: .565, lensHeight: 1, lensX: .5, lensY: .5,
      dispersion: 11, zoom: 0, blur: 0, glow: 4.2, blueRing: 6, blueColor: '#009dff',
      shimmer: !motion.matches, rimWave: .6, entryAnimation: !motion.matches,
      focusScale: motion.matches ? 1 : 1.18, background: '#ffffff', pixelRatio: 1.5,
    }};
    const updateMotion = () => {
      settings.current.shimmer = !motion.matches;
      settings.current.glide = motion.matches ? 1 : .075;
      settings.current.speedShrink = motion.matches ? 100000 : 60;
      settings.current.focusScale = motion.matches ? 1 : 1.18;
    };
    updateMotion();
    const lost = (event: Event) => { event.preventDefault(); setFallback(true); };
    try {
      engine.current = createCarousel(host, {
        projects: carouselProjects, propsRef: settings,
        cursorElement: matchMedia('(hover: hover)').matches ? cursor.current : null,
        staticMode: false,
        onActiveChange: (index) => { activeRef.current = index; setActive(index); },
        onFocusChange: (focused) => { if (focused) window.location.assign(PROJECTS[activeRef.current].href); },
        onEntryDone: setEntryDone,
        onReady: () => setReady(true),
      });
      host.querySelector('canvas')?.addEventListener('webglcontextlost', lost);
    } catch (error) {
      console.error('Selected Work carousel initialization failed', error);
      setFallback(true);
    }
    motion.addEventListener('change', updateMotion);
    return () => {
      motion.removeEventListener('change', updateMotion);
      host.querySelector('canvas')?.removeEventListener('webglcontextlost', lost);
      engine.current?.destroy();
      engine.current = null;
    };
  }, []);

  const navigate = (direction: number) => {
    if (fallback) {
      const next = (active + direction + PROJECTS.length) % PROJECTS.length;
      activeRef.current = next;
      setActive(next);
    } else engine.current?.navigate(direction);
  };

  return (
    <section id="work" data-preload-state={ready || fallback ? 'ready' : 'loading'} data-theme-section="light" className={styles.section} aria-labelledby="selected-work-title">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <h2 id="selected-work-title">Selected Work</h2>
          <span className={styles.count}>{String(active + 1).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}</span>
        </div>
        <div className={styles.stage} aria-label="Selected Work carousel" aria-busy={!fallback && (!ready || !entryDone)} tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') { event.preventDefault(); navigate(1); }
            if (event.key === 'ArrowLeft') { event.preventDefault(); navigate(-1); }
            if (event.key === 'Enter' && event.target === event.currentTarget) window.location.assign(project.href);
          }}>
          <div ref={mount} className={styles.canvas} aria-hidden="true" />
          {fallback && <a className={styles.fallback} href={project.href} aria-label={`Visit ${project.title}`}>
            <Image src={project.poster} alt={project.title} width={1200} height={800} />
          </a>}
          <div ref={cursor} className={styles.cursor} aria-hidden="true">View</div>
        </div>
        <div className={styles.details} aria-live="polite">
          <div><p className={styles.index}>{project.index}</p><h3>{project.title}</h3></div>
          <div><p className={styles.description}>{project.description}</p>
            {project.result && <p className={styles.result}><strong>{project.result.value}</strong>{project.result.label}</p>}
          </div>
          <div className={styles.controls}>
            <button type="button" disabled={!fallback && !entryDone} onClick={() => navigate(-1)} aria-label="Previous story" title="Previous story">←</button>
            <a href={project.href} aria-label={`Preview ${project.title}`}>Preview ↗</a>
            <button type="button" disabled={!fallback && !entryDone} onClick={() => navigate(1)} aria-label="Next story" title="Next story">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
