'use client';

import { useEffect, useRef, useState } from 'react';

export function useNearViewport<T extends HTMLElement>(rootMargin = '900px') {
  const ref = useRef<T>(null);
  const [nearby, setNearby] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setNearby(true);
      observer.disconnect();
    }, { rootMargin });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [rootMargin]);
  return { ref, nearby };
}
