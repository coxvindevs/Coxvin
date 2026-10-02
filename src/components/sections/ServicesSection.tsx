'use client';

import ServiceTabs from './ServiceTabs';
import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  return (
    <section id="services" data-theme-section="dark" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>What we can help with</h2>
        <ServiceTabs />
      </div>
    </section>
  );
}
