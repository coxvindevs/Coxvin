'use client';

import React, { useRef, useState } from 'react';
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

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    id: '01',
    question: 'Who will actually be working on our project?',
    answer:
      'You work directly with the Coxvin team responsible for the engagement. The people involved depend on the scope — product, engineering, design, systems or automation — rather than being passed through layers of account management.',
  },
  {
    id: '02',
    question: 'What kinds of projects does Coxvin take on?',
    answer:
      'Coxvin works across digital experiences, product engineering, business systems, AI and automation, systems integration and technical strategy. The exact combination depends on the business problem rather than forcing every engagement into the same package.',
  },
  {
    id: '03',
    question: 'How long do projects usually take?',
    answer:
      'Timelines depend on scope, complexity and how much already exists. A focused website or automation can move relatively quickly; a larger product or operational system requires a longer build and validation cycle. We establish the delivery plan before implementation begins.',
  },
  {
    id: '04',
    question: 'How do you communicate and manage the work?',
    answer:
      'Projects are broken into clear stages with visible progress, defined responsibilities and regular review points. Decisions, implementation changes and next steps should remain understandable to both technical and non-technical stakeholders.',
  },
  {
    id: '05',
    question: 'What do you need from us before we start?',
    answer:
      "We normally need a clear understanding of the business, the people using the system, the current workflow or technology and the outcome you want to improve. Existing brand, product or technical material is useful, but it doesn't need to be perfectly organized before the conversation starts.",
  },
  {
    id: '06',
    question: 'What happens after launch?',
    answer:
      'Launch is the beginning of real-world validation. Depending on the engagement, Coxvin can continue with monitoring, refinement, support, automation changes and further product development as the system evolves.',
  },
  {
    id: '07',
    question: 'How does project investment work?',
    answer:
      'Investment depends on scope, technical complexity, timeline and the level of ongoing involvement required. We define the work first and then provide a clear engagement structure rather than forcing every project into one fixed price.',
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  // Eyebrow one-time entrance animation
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'clamp(top 85%)',
          once: true,
        },
      });

      tl.fromTo(
        '.faq-eyebrow-circle',
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.65, ease: 'ease-transition' }
      )
        .fromTo(
          '.faq-eyebrow-word',
          { xPercent: -40, opacity: 0, skewX: 15 },
          {
            xPercent: 0,
            opacity: 1,
            skewX: 0,
            duration: 0.65,
            stagger: 0.05,
            ease: 'ease-transition',
          },
          0
        )
        .fromTo(
          '.faq-eyebrow-text',
          { xPercent: -10 },
          { xPercent: 0, duration: 0.3, ease: 'ease-transition' },
          '-=0.15'
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="faqs"
      ref={sectionRef}
      className="relative w-full text-[#E8E8E3] select-none z-[1]"
      style={{
        backgroundColor: '#181715',
        paddingTop: '100px',
        paddingBottom: '31px',
      }}
    >
      <div className="w-full max-w-[1265px] mx-auto px-6">
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-12"
          style={{
            columnGap: '16px',
            minHeight: '650.875px',
          }}
        >
          {/* Left Column: 4 columns = 395px width */}
          <div
            className="w-full lg:col-span-4 flex flex-col justify-between"
            style={{ minHeight: '650.875px' }}
          >
            {/* Top: Eyebrow */}
            <div className="faq_home_left">
              <div className="faq-eyebrow flex items-center">
                <span
                  className="faq-eyebrow-circle inline-block rounded-full bg-[#E8E8E3] shrink-0"
                  style={{ width: '13.6px', height: '13.6px', marginRight: '11.5px' }}
                />
                <div className="faq-eyebrow-text overflow-hidden">
                  <span
                    className="faq-eyebrow-word inline-block font-sans font-medium text-[#E8E8E3]"
                    style={{
                      fontSize: '19.5px',
                      lineHeight: '25.35px',
                      letterSpacing: '-0.195px',
                    }}
                  >
                    FAQs
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom: Contact Block */}
            <div className="faq_home_content flex flex-col mt-12 lg:mt-0">
              <div className="w-[121px] h-[121px] rounded-[2.4px] bg-[#1F1E1B] border border-[#2E2C28] flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/images/cx-mark-light.png"
                  alt="Coxvin"
                  className="w-[84px] h-auto object-contain select-none pointer-events-none"
                />
              </div>

              <p
                className="font-sans font-bold text-[#938F8A] mt-[23px]"
                style={{
                  fontSize: '23.5px',
                  lineHeight: '25.85px',
                  letterSpacing: '-0.3525px',
                  maxWidth: '221.37px',
                }}
              >
                Still have questions? Talk to Coxvin.
              </p>

              <a
                href="#contact"
                className="faq-contact-btn group inline-flex items-center select-none"
                style={{
                  height: '35px',
                  padding: '4.375px 4.375px 4.375px 12px',
                  backgroundColor: '#E8E8E3',
                  color: '#080807',
                  borderRadius: '2.4px',
                  marginTop: '23px',
                  width: 'fit-content',
                }}
              >
                <div className="overflow-hidden relative" style={{ height: '15.5px' }}>
                  <div className="faq-btn-text-roll flex flex-col transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] group-hover:-translate-y-1/2">
                    <span
                      className="font-sans font-medium whitespace-nowrap block"
                      style={{
                        fontSize: '15.5px',
                        lineHeight: '15.5px',
                        letterSpacing: '-0.155px',
                      }}
                    >
                      Start a conversation
                    </span>
                    <span
                      className="font-sans font-medium whitespace-nowrap block"
                      style={{
                        fontSize: '15.5px',
                        lineHeight: '15.5px',
                        letterSpacing: '-0.155px',
                      }}
                    >
                      Start a conversation
                    </span>
                  </div>
                </div>

                <div
                  className="relative overflow-hidden ml-3 flex items-center justify-center shrink-0"
                  style={{ width: '22px', height: '22px' }}
                >
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="w-3 h-3 text-[#080807] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] group-hover:translate-x-[17.5px] group-hover:-translate-y-[17.5px]"
                  >
                    <path
                      d="M8.90954 9.09046L9 3L2.90954 3.09046L2.90213 4.32367L6.86437 4.25391L2.55914 8.55914L3.44086 9.44086L7.74609 5.13563L7.68708 9.10862L8.90954 9.09046Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    className="w-3 h-3 text-[#080807] absolute -translate-x-[17.5px] translate-y-[17.5px] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.35,1)] group-hover:translate-x-0 group-hover:translate-y-0"
                  >
                    <path
                      d="M8.90954 9.09046L9 3L2.90954 3.09046L2.90213 4.32367L6.86437 4.25391L2.55914 8.55914L3.44086 9.44086L7.74609 5.13563L7.68708 9.10862L8.90954 9.09046Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: 8 columns = 806px width */}
          <div
            className="faq_home_main w-full lg:col-span-8 flex flex-col justify-between"
            style={{ minHeight: '650.875px' }}
          >
            <h2
              className="font-sans font-bold text-[#E8E8E3]"
              style={{
                fontSize: '69px',
                lineHeight: '63.49px',
                letterSpacing: '-2.07px',
                maxWidth: '693.3px',
                marginBottom: '58px',
              }}
            >
              What you should know
              <br />
              before we build together.
            </h2>

            <div
              className="g_faq_list flex flex-col w-full"
              style={{ borderBottom: '1px solid rgb(57, 54, 50)' }}
            >
              {FAQS.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={item.id}
                    data-accordion-status={isOpen ? 'active' : 'not-active'}
                    className="g_faq_item relative w-full"
                    style={{
                      borderTop: '1px dotted rgb(57, 54, 50)',
                    }}
                  >
                    <button
                      type="button"
                      id={`faq-header-${idx}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      onClick={() => toggleFaq(idx)}
                      className="accordion_css_item_top relative w-full flex items-center justify-between overflow-hidden cursor-pointer"
                      style={{
                        height: '56.3438px',
                        padding: '15.5px 0',
                        background: 'transparent',
                        border: 'none',
                      }}
                    >
                      <span className="accordion_css_item_bg" />
                      <h3
                        className="accordion_css_item_heading font-sans font-medium text-left z-[1] select-none"
                        style={{
                          fontSize: '19.5px',
                          lineHeight: '25.35px',
                          letterSpacing: '-0.195px',
                          color: isOpen ? '#080807' : '#E8E8E3',
                        }}
                      >
                        {item.question}
                      </h3>
                      <div
                        className="accordion_css_square z-[1]"
                        style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: isOpen ? '#080807' : '#938F8A',
                        }}
                      />
                    </button>

                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-header-${idx}`}
                      className={`accordion_css_item_bottom ${isOpen ? 'is-open' : ''}`}
                    >
                      <div className="accordion_css_bottom_wrap overflow-hidden">
                        <div
                          className="font-sans font-medium text-[#938F8A]"
                          style={{
                            fontSize: '17.5px',
                            lineHeight: '22.75px',
                            letterSpacing: '-0.175px',
                            maxWidth: '603.5px',
                            paddingTop: '23px',
                            paddingBottom: '23px',
                          }}
                        >
                          <p>{item.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .accordion_css_item_bottom {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.6s cubic-bezier(0.625, 0.05, 0, 1);
        }
        .accordion_css_item_bottom.is-open {
          grid-template-rows: 1fr;
        }
        .accordion_css_bottom_wrap {
          overflow: hidden;
        }
        .accordion_css_item_bg {
          position: absolute;
          inset: 0;
          background-color: transparent;
          transition: background-color 0.65s cubic-bezier(0.16, 1, 0.35, 1);
          pointer-events: none;
        }
        .accordion_css_square {
          transition:
            transform 0.65s cubic-bezier(0.16, 1, 0.35, 1),
            background-color 0.65s cubic-bezier(0.16, 1, 0.35, 1);
          flex-shrink: 0;
        }
        .accordion_css_item_heading {
          transition:
            transform 0.65s cubic-bezier(0.16, 1, 0.35, 1),
            color 0.65s cubic-bezier(0.16, 1, 0.35, 1);
        }

        .g_faq_item[data-accordion-status='active'] .accordion_css_square {
          background-color: #080807 !important;
          transform: translateX(-10px);
        }
        .g_faq_item[data-accordion-status='active'] .accordion_css_item_heading {
          color: #080807 !important;
          transform: translateX(10px);
        }
        .g_faq_item[data-accordion-status='active'] .accordion_css_item_bg {
          background-color: #e8e8e3 !important;
        }

        @media (hover: hover) and (pointer: fine) {
          .accordion_css_item_top:hover .accordion_css_square {
            background-color: #080807 !important;
            transform: translateX(-10px);
          }
          .accordion_css_item_top:hover .accordion_css_item_heading {
            color: #080807 !important;
            transform: translateX(10px);
          }
          .accordion_css_item_top:hover .accordion_css_item_bg {
            background-color: #e8e8e3 !important;
          }
        }
      `}</style>
    </section>
  );
}
