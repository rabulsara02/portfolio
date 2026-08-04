/**
 * Oscilloscope trace.
 *
 * Three layers stacked in one SVG:
 *   1. a dim persistent trace (what the phosphor remembers)
 *   2. a short bright dash swept along the same path via stroke-dashoffset —
 *      this is the refresh scan, animated in globals.css
 *   3. a low-opacity amber square wave as channel 2
 *
 * Pure CSS, no JS, no layout cost. Decorative, so it's hidden from AT.
 */

/** Channel 1 — a mostly-flat line punctuated by pulses. */
const CH1 =
  'M0 62 L118 62 L134 20 L150 104 L166 62 L288 62 L302 46 L316 78 L330 62 L452 62 ' +
  'L468 10 L484 114 L500 62 L640 62 L654 50 L668 74 L682 62 L806 62 L822 26 ' +
  'L838 98 L854 62 L1000 62 L1014 54 L1028 70 L1042 62 L1200 62';

/** Channel 2 — a slow square wave running underneath. */
const CH2 =
  'M0 92 L60 92 L60 76 L180 76 L180 92 L300 92 L300 76 L420 76 L420 92 L540 92 ' +
  'L540 76 L660 76 L660 92 L780 92 L780 76 L900 76 L900 92 L1020 92 L1020 76 ' +
  'L1140 76 L1140 92 L1200 92';

export default function Waveform({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 124"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d={CH2} className="trace-ch2" fill="none" strokeWidth="1.5" />
      <path d={CH1} className="trace-dim" fill="none" strokeWidth="2" />
      <path d={CH1} className="trace-sweep" fill="none" strokeWidth="2" />
    </svg>
  );
}

/**
 * Tiny inline sparkline used on project cards. Each project gets a slightly
 * different trace so the cards don't look copy-pasted.
 */
export function Sparkline({
  seed = 0,
  className = '',
}: {
  seed?: number;
  className?: string;
}) {
  const paths = [
    'M0 14 L18 14 L24 4 L30 24 L36 14 L60 14 L66 8 L72 20 L78 14 L110 14',
    'M0 14 L14 14 L14 5 L34 5 L34 22 L54 22 L54 9 L74 9 L74 14 L110 14',
    'M0 18 L20 18 L28 6 L40 20 L52 9 L64 16 L76 7 L88 15 L110 12',
  ];

  return (
    <svg
      viewBox="0 0 110 28"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path
        d={paths[seed % paths.length]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
