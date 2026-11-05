'use client';

import { useEffect, useRef } from 'react';

/**
 * Tiny client island. Watches the story steps and writes the active step
 * number to the parent `.parse-story` section's `data-stage` attribute.
 * DOM-only: React never controls `data-stage`, so server HTML stays stage 1.
 */
export default function StageObserver() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current?.closest<HTMLElement>('.parse-story');
    if (!root || typeof IntersectionObserver === 'undefined') return;
    const steps = root.querySelectorAll<HTMLElement>('.parse-story__step');
    const io = new IntersectionObserver(
      (entries) => {
        let next: string | undefined;
        for (const e of entries) {
          if (e.isIntersecting) next = (e.target as HTMLElement).dataset.step;
        }
        if (next) root.setAttribute('data-stage', next);
      },
      { rootMargin: '-55% 0px -35% 0px', threshold: 0 },
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return <span ref={ref} hidden aria-hidden="true" />;
}
