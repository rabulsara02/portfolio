'use client';

import { useEffect, useState } from 'react';
import { navLinks, person } from '@/content/site';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(`#${hit.target.id}`);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'border-b border-line bg-void/90 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" onClick={() => setOpen(false)} className="group flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center border border-phosphor/50 font-mono text-[11px] text-phosphor transition-colors group-hover:bg-phosphor group-hover:text-void">
            RB
          </span>
          <span className="font-mono text-[11px] tracking-[0.2em] whitespace-nowrap text-fg-2 uppercase">
            {person.name}
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`flex items-baseline gap-1.5 px-3 py-2 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors ${
                  active === link.href
                    ? 'text-phosphor'
                    : 'text-fg-3 hover:text-fg'
                }`}
              >
                <span className="text-[9px] opacity-50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <span
            aria-hidden
            className="led h-1.5 w-1.5 rounded-full bg-phosphor text-phosphor"
          />
          <span className="font-mono text-[10px] tracking-[0.18em] text-fg-3 uppercase">
            Online
          </span>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-10 w-10 items-center justify-center text-fg-2 transition-colors hover:text-phosphor md:hidden"
        >
          <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-line bg-void transition-[max-height,opacity] duration-300 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="mx-auto w-full max-w-5xl px-5 py-2 sm:px-8">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 border-b border-line py-3.5 font-mono text-sm tracking-[0.14em] text-fg uppercase last:border-0"
              >
                <span className="text-[10px] text-phosphor">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
