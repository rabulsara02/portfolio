import type { ReactNode } from 'react';
import Reveal from './Reveal';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-5xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

/** A mono readout label, the way an instrument front panel labels a channel. */
export function Readout({
  children,
  tone = 'phosphor',
}: {
  children: ReactNode;
  tone?: 'phosphor' | 'amber' | 'cyan' | 'muted';
}) {
  const color = {
    phosphor: 'text-phosphor',
    amber: 'text-amber',
    cyan: 'text-cyan',
    muted: 'text-fg-3',
  }[tone];

  return (
    <span
      className={`font-mono text-[11px] tracking-[0.2em] uppercase ${color}`}
    >
      {children}
    </span>
  );
}

export default function Section({
  id,
  index,
  channel,
  title,
  lead,
  children,
  className = '',
}: {
  id: string;
  /** Two-digit channel number shown in the header. */
  index: string;
  /** Short all-caps channel name, e.g. "TEST LOG". */
  channel: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 sm:py-28 ${className}`}>
      <Container>
        <Reveal>
          <header>
            {/* channel bar */}
            <div className="flex items-center gap-3 border-b border-line pb-3">
              <span className="font-mono text-[11px] text-phosphor">
                [{index}]
              </span>
              <Readout>{channel}</Readout>
              <span aria-hidden className="h-px flex-1 bg-line" />
              <span
                aria-hidden
                className="led h-1.5 w-1.5 rounded-full bg-phosphor text-phosphor"
              />
            </div>

            <h2 className="font-display mt-7 max-w-3xl text-4xl leading-[1.05] font-medium tracking-[-0.03em] text-fg sm:text-5xl">
              {title}
            </h2>

            {lead && (
              <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-fg-2">
                {lead}
              </p>
            )}
          </header>
        </Reveal>

        <div className="mt-12">{children}</div>
      </Container>
    </section>
  );
}
