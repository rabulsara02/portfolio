'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Stagger in milliseconds. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
};

/**
 * Fades + lifts its children into view the first time they're scrolled to.
 *
 * The visibility class is toggled directly on the DOM node rather than through
 * React state — this is a pure visual effect driven by an external system
 * (IntersectionObserver), so there's nothing for React to re-render. It also
 * means no hydration mismatch and no cascading renders.
 *
 * Falls back to immediately visible if IntersectionObserver is unavailable,
 * and respects prefers-reduced-motion via globals.css.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
