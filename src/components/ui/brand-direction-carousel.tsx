'use client';

// Adapted from the supplied Skiper UI 49 / Carousel_003 by Gurvinder Singh.
import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Pagination } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './brand-direction-carousel.module.css';

const images = [
  ['513ea132-b43c-43fc-9f17-ea995ad5cc63', 'Sports eyewear poster with orange lenses'],
  ['485d066a-25f3-4fcc-8460-6804d60b12e5', 'Green landscape and oversized typographic poster'],
  ['fa13af6f-8264-4041-b3eb-7f0e454b6963', 'Vision poster with an eye and bold typography'],
  ['a6467a47-8782-48b3-9cee-e67060db1c6b', 'Minimal product editorial with orange accents'],
  ['19446ada-b879-4988-b5e3-69c90fd78bdd', 'Red experimental typographic poster'],
  ['4cad6799-e6a5-4bfc-af78-c21d5b183ca4', 'Gero Bold fashion typography poster'],
  ['b9c84c01-0811-44e8-bb5a-756c1660407d', 'Reformr studio identity on textured white'],
  ['2543d2af-d8c6-4937-b572-298a1956188e', 'Automotive editorial poster with red typography'],
  ['2d31cedb-a6ad-436f-947a-323e12c5ebf9', 'Rise Above typographic campaign poster'],
  ['0bc7a09c-9388-4a33-bce0-2892d1d73d8a', 'Warp Gradients orange and white design poster'],
];

export default function BrandDirectionCarousel() {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [index, setIndex] = useState(0);
  return <div className={styles.surface}>
    <header className={styles.header}><span>VISUAL REFERENCES</span><span>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></header>
    <Swiper className={styles.carousel} onSwiper={setSwiper} onSlideChange={instance => setIndex(instance.realIndex)}
      modules={[EffectCoverflow, Pagination, A11y]} effect="coverflow" grabCursor slidesPerView="auto" centeredSlides loop
      coverflowEffect={{ rotate:40, stretch:0, depth:100, modifier:1, slideShadows:true }}
      pagination={{clickable:true}} speed={500} a11y={{containerMessage:'Visual direction reference gallery'}}>
      {images.map(([id, alt]) => <SwiperSlide key={id} className={styles.slide}>
        <Image src={`/images/brand-direction/codex-clipboard-${id}.png`} alt={alt} fill sizes="(max-width:700px) 70vw, 340px" className={styles.image} />
      </SwiperSlide>)}
    </Swiper>
    <footer className={styles.footer}><div>
      <button type="button" title="Previous reference" aria-label="Previous reference" onClick={() => swiper?.slidePrev()}><ChevronLeft size={18}/></button>
      <button type="button" title="Next reference" aria-label="Next reference" onClick={() => swiper?.slideNext()}><ChevronRight size={18}/></button>
    </div></footer>
  </div>;
}
