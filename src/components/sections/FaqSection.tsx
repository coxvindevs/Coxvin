'use client';
import { BOOKING_URL } from '@/lib/contact';
import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import styles from './FaqSection.module.css';
import { faqs } from '@/lib/content';

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return <section id="faqs" className={styles.section} aria-labelledby="faq-title">
    <div className={styles.layout}>
      <header className={styles.intro}>
        <span className={styles.eyebrow}>FAQs</span>
        <h2 id="faq-title">Questions,<br />answered.</h2>
        <p>A few practical details about working together. For anything specific, let&apos;s talk.</p>
        <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.contact}>Start a conversation <ArrowUpRight size={18} aria-hidden="true" /></a>
      </header>
      <div className={styles.list}>{faqs.map(({ question, answer }, index) => {
        const expanded = open === index;
        return <div className={styles.item} key={question}>
          <h3><button type="button" id={`faq-header-${index}`} aria-expanded={expanded} aria-controls={`faq-answer-${index}`} onClick={() => setOpen(expanded ? null : index)} className={styles.question}>
            <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <span>{question}</span><Plus size={20} strokeWidth={1.5} aria-hidden="true" className={styles.icon} />
          </button></h3>
          <div id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-header-${index}`} aria-hidden={!expanded} className={styles.answer} data-open={expanded}>
            <div className={styles.clip}><p>{answer}</p></div>
          </div>
        </div>;
      })}</div>
    </div>
  </section>;
}
