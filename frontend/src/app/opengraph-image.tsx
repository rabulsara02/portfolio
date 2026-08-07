import { ImageResponse } from 'next/og';
import { person } from '@/content/site';

/**
 * The card that renders when the site is pasted into LinkedIn, Slack, iMessage,
 * or an email client. Generated at build time — no static asset to keep in sync.
 *
 * Deliberately uses no custom fonts. Loading Fraunces or Space Grotesk here
 * would mean a network fetch during the build, which is one more thing that can
 * fail on a deploy for the sake of a typeface most people see at thumbnail size.
 *
 * Satori (what powers ImageResponse) supports a subset of CSS: flexbox yes,
 * grid no, and every element with multiple children needs an explicit display.
 */

export const alt = `${person.name} — ${person.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const VOID = '#070b0e';
const PANEL = '#0c1318';
const LINE = '#1b2a33';
const PHOSPHOR = '#34e5a0';
const FG = '#dee9ef';
const FG2 = '#90a6b3';
const FG3 = '#69818e';

/** Same trace as the hero, flattened to one channel. */
const TRACE =
  'M0 62 L118 62 L134 20 L150 104 L166 62 L288 62 L302 46 L316 78 L330 62 ' +
  'L452 62 L468 10 L484 114 L500 62 L640 62 L654 50 L668 74 L682 62 L806 62 ' +
  'L822 26 L838 98 L854 62 L1000 62 L1014 54 L1028 70 L1042 62 L1200 62';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: VOID,
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* top rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 52,
              height: 52,
              border: `2px solid ${PHOSPHOR}`,
              borderRadius: 6,
              color: PHOSPHOR,
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            RB
          </div>
          <div
            style={{
              display: 'flex',
              color: PHOSPHOR,
              fontSize: 19,
              letterSpacing: 6,
              textTransform: 'uppercase',
            }}
          >
            {person.role}
          </div>
        </div>

        {/* headline */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              color: FG,
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            {person.headline[0]}
          </div>
          <div
            style={{
              display: 'flex',
              color: FG,
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -3,
              lineHeight: 1.02,
            }}
          >
            {person.headline[1]}
            <span style={{ color: PHOSPHOR }}>.</span>
          </div>
        </div>

        {/* trace */}
        <div
          style={{
            display: 'flex',
            borderTop: `1px solid ${LINE}`,
            borderBottom: `1px solid ${LINE}`,
            padding: '14px 0',
          }}
        >
          <svg width="1056" height="70" viewBox="0 0 1200 124" fill="none">
            <path d={TRACE} stroke={PHOSPHOR} strokeWidth="4" opacity="0.85" />
          </svg>
        </div>

        {/* footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', color: FG2, fontSize: 30 }}>
            {person.name}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              backgroundColor: PANEL,
              border: `1px solid ${LINE}`,
              borderRadius: 4,
              padding: '10px 20px',
              color: FG3,
              fontSize: 22,
            }}
          >
            rahulbulsara.com
          </div>
        </div>
      </div>
    ),
    size
  );
}
