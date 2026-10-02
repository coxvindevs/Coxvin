'use client';
import { BOOKING_URL } from '@/lib/contact';
import { useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import styles from './FaqSection.module.css';

const faqs = [
  ['What does a project with Coxvin look like?', 'We start with your goals and current systems, then define the scope and delivery stages. You work directly with the team responsible for design, engineering and implementation.'],
  ['How long will the project take?', 'Timing depends on scope, complexity and what already exists. We agree a delivery plan and review points before implementation begins.'],
  ['How is pricing worked out?', 'Investment reflects the agreed scope, complexity and level of involvement. We define the work first, then propose an engagement structure. Ongoing support is discussed separately.'],
  ['What can you help us build?', 'We work across brand direction, websites, business systems, AI integrations and cloud infrastructure. The scope follows the problem you need to solve, rather than a fixed package.'],
  ['Who owns the work after handover?', 'Ownership, source files, access and handover deliverables should be set out in the project agreement. Third-party tools and assets may have their own licenses.'],
  ['Can you support us after launch?', 'Yes. Depending on the engagement, support can include updates, bug fixes, monitoring and performance improvements. We agree the scope of ongoing involvement with you.'],
  ['Which technologies do you use?', 'The choice depends on your requirements, existing systems and who will maintain the result. We discuss the trade-offs before committing to a stack.'],
  ['How will we stay in touch?', 'Work is organized into clear stages with regular reviews and visible next steps. We agree communication channels and responsibilities at the start.'],
  ['Where are you based?', 'Coxvin is based in Pakistan (UTC+5) and works with clients worldwide. We agree meeting times and review windows around our shared availability.'],
];

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
      <div className={styles.list}>{faqs.map(([question, answer], index) => {
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
