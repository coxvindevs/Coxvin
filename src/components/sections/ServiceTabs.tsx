'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import dynamic from 'next/dynamic';
import { useNearViewport } from '@/lib/use-near-viewport';
import styles from './ServicesSection.module.css';

const IntegrationCardDemo = dynamic(() => import('@/components/ui/integration-card'));
const DigitalMarquee = dynamic(() => import('@/components/ui/digital-marquee'));
const BusinessSystemsGrid = dynamic(() => import('@/components/ui/business-systems-grid'));
const BrandDirectionCarousel = dynamic(() => import('@/components/ui/brand-direction-carousel'));
const CloudInfrastructure = dynamic(() => import('@/components/ui/service-operations').then(module => module.CloudInfrastructure));
const SystemPerformance = dynamic(() => import('@/components/ui/service-operations').then(module => module.SystemPerformance));

const SERVICES = [
  { id: '01', title: 'Digital Experiences', description: 'Premium websites, interfaces and commerce experiences.' },
  { id: '02', title: 'Visual Direction', description: 'Brand identity, typography and visual systems with a clear point of view.' },
  { id: '03', title: 'Business Systems', description: 'SaaS products, portals, ERP and internal tools engineered around your operations.' },
  { id: '04', title: 'AI & Integrations', description: 'Intelligent agents, automated workflows and connected business platforms.' },
  { id: '05', title: 'Cloud & Infrastructure', description: 'Cloud hosting, deployment and infrastructure management that keep your business running reliably.' },
  { id: '06', title: 'SEO & Optimization', description: 'Technical SEO, search visibility and performance improvements that help people find and use your website.' },
];

export default function ServiceTabs() {
  const { ref, nearby } = useNearViewport<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastPointerSelection = useRef<{ x: number; y: number } | null>(null);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (event.key === 'ArrowDown') next = (index + 1) % SERVICES.length;
    else if (event.key === 'ArrowUp') next = (index - 1 + SERVICES.length) % SERVICES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = SERVICES.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus({ preventScroll: true });
  };

  return (
    <div ref={ref} className={styles.tabsCard}>
      <div className={styles.tabList} role="tablist" aria-label="Services" aria-orientation="vertical">
        {SERVICES.map((service, index) => (
          <button key={service.id} ref={(node) => { tabs.current[index] = node; }}
            type="button" role="tab" id={`service-tab-${service.id}`}
            aria-label={service.title} aria-selected={active === index}
            aria-controls="service-preview" tabIndex={active === index ? 0 : -1}
            className={styles.tab} onClick={() => setActive(index)}
            onPointerMove={(event) => {
              if (event.pointerType !== 'mouse') return;
              const previous = lastPointerSelection.current;
              // Expanding tabs can move under a stationary pointer. Only real movement selects.
              if (previous && Math.hypot(event.clientX - previous.x, event.clientY - previous.y) < 4) return;
              lastPointerSelection.current = { x: event.clientX, y: event.clientY };
              setActive(index);
            }}
            onFocus={() => setActive(index)} onKeyDown={(event) => onKeyDown(event, index)}>
            <span className={styles.tabHeading}><span className={styles.number} aria-hidden="true">{service.id}</span><span>{service.title}</span></span>
            <span className={styles.description} aria-hidden={active !== index}>
              <span>{service.description}</span>
            </span>
          </button>
        ))}
      </div>
      <div id="service-preview" role="tabpanel" aria-labelledby={`service-tab-${SERVICES[active].id}`}
        tabIndex={0} className={styles.visual} data-service={SERVICES[active].id}>
        <div className={styles.previewLayer} hidden={active !== 1}>{active === 1 && <BrandDirectionCarousel />}</div>
        <div className={styles.previewLayer} hidden={active !== 3}>{active === 3 && <IntegrationCardDemo />}</div>
        <div className={styles.previewLayer} hidden={active !== 4}>{active === 4 && <CloudInfrastructure />}</div>
        <div className={styles.previewLayer} hidden={active !== 5}>{active === 5 && <SystemPerformance />}</div>
        {nearby && <DigitalMarquee active={SERVICES[active].id === '01'} />}
        <div className={styles.previewLayer} hidden={active !== 2}>{active === 2 && <BusinessSystemsGrid active />}</div>
      </div>
    </div>
  );
}
