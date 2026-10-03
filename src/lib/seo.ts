import { SOCIAL_PROFILES } from './contact';
import { faqs, founders, services } from './content';

/**
 * The canonical host is www.coxvin.com — the host Vercel actually serves.
 * The apex domain 308-redirects here, so the canonical tag, og:url, sitemap and
 * robots.txt must all name this host. Pointing them at the apex told Google to
 * index a URL that redirects, which is why the site was not appearing in search.
 */
export const SITE_URL = 'https://www.coxvin.com';
export const SITE_NAME = 'Coxvin';
export const SITE_TITLE = 'Coxvin | Digital Systems, Product Engineering & AI Integration';
export const SITE_DESCRIPTION =
  'Coxvin designs and engineers digital systems that help businesses operate, grow, and evolve. Websites, business systems, AI and cloud infrastructure.';
export const CONTACT_EMAIL = 'contact@coxvin.com';
export const OG_IMAGE = '/images/og-cover.png';
export const OG_IMAGE_ALT = 'Coxvin';

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const sameAs = SOCIAL_PROFILES.flatMap(profile => (profile.href ? [profile.href] : []));

const organizationSchema = {
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/cx-mark-light.png`,
    width: 940,
    height: 466,
  },
  image: `${SITE_URL}${OG_IMAGE}`,
  address: { '@type': 'PostalAddress', addressCountry: 'PK' },
  areaServed: 'Worldwide',
  sameAs,
  founder: founders.map(({ name, role }) => ({
    '@type': 'Person',
    name,
    jobTitle: role,
  })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: services.map(({ title, description }) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: title,
        description,
        provider: { '@id': ORGANIZATION_ID },
      },
    })),
  },
};

const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: { '@id': ORGANIZATION_ID },
};

/** Built from the same FAQ content the page renders. */
const faqSchema = {
  '@type': 'FAQPage',
  '@id': `${SITE_URL}/#faq`,
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
};

/** Emitted as one JSON-LD block in the document head. */
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema, faqSchema],
};
