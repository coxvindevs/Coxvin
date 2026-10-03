/**
 * Shared site content.
 *
 * These values are rendered by the page sections AND emitted as structured data,
 * so they live here as the single source of truth. Duplicating them would let the
 * markup and the schema drift, which produces misleading structured data.
 */

export type Faq = { question: string; answer: string };

/** Rendered by FaqSection; mirrored as FAQPage structured data. */
export const faqs: Faq[] = [
  { question: 'What does a project with Coxvin look like?', answer: 'We start with your goals and current systems, then define the scope and delivery stages. You work directly with the team responsible for design, engineering and implementation.' },
  { question: 'How long will the project take?', answer: 'Timing depends on scope, complexity and what already exists. We agree a delivery plan and review points before implementation begins.' },
  { question: 'How is pricing worked out?', answer: 'Investment reflects the agreed scope, complexity and level of involvement. We define the work first, then propose an engagement structure. Ongoing support is discussed separately.' },
  { question: 'What can you help us build?', answer: 'We work across brand direction, websites, business systems, AI integrations and cloud infrastructure. The scope follows the problem you need to solve, rather than a fixed package.' },
  { question: 'Who owns the work after handover?', answer: 'Ownership, source files, access and handover deliverables should be set out in the project agreement. Third-party tools and assets may have their own licenses.' },
  { question: 'Can you support us after launch?', answer: 'Yes. Depending on the engagement, support can include updates, bug fixes, monitoring and performance improvements. We agree the scope of ongoing involvement with you.' },
  { question: 'Which technologies do you use?', answer: 'The choice depends on your requirements, existing systems and who will maintain the result. We discuss the trade-offs before committing to a stack.' },
  { question: 'How will we stay in touch?', answer: 'Work is organized into clear stages with regular reviews and visible next steps. We agree communication channels and responsibilities at the start.' },
  { question: 'Where are you based?', answer: 'Coxvin is based in Pakistan (UTC+5) and works with clients worldwide. We agree meeting times and review windows around our shared availability.' },
];

export type Service = { id: string; title: string; description: string };

/** Rendered by ServiceTabs; mirrored in the Organization service catalog. */
export const services: Service[] = [
  { id: '01', title: 'Digital Experiences', description: 'Premium websites, interfaces and commerce experiences.' },
  { id: '02', title: 'Visual Direction', description: 'Brand identity, typography and visual systems with a clear point of view.' },
  { id: '03', title: 'Business Systems', description: 'SaaS products, portals, ERP and internal tools engineered around your operations.' },
  { id: '04', title: 'AI & Integrations', description: 'Intelligent agents, automated workflows and connected business platforms.' },
  { id: '05', title: 'Cloud & Infrastructure', description: 'Cloud hosting, deployment and infrastructure management that keep your business running reliably.' },
  { id: '06', title: 'SEO & Optimization', description: 'Technical SEO, search visibility and performance improvements that help people find and use your website.' },
];

export type Founder = { name: string; role: string };

/** Rendered in the About dialog; mirrored as Organization founders. */
export const founders: Founder[] = [
  { name: 'Junaid Khan', role: 'CEO' },
  { name: 'Muhammad Abbas', role: 'COO' },
  { name: 'Muhammad Awais', role: 'Managing Director' },
  { name: 'Muhammad Abdullah Bhatti', role: 'CTO' },
];
