# Portfolio — Rahul Bulsara

Personal site. Next.js App Router, TypeScript, Tailwind v4, deployed on Vercel.

Live: https://portfolio-umber-one-64.vercel.app

## Editing content

**Almost everything on the site lives in one file:**

```
frontend/src/content/site.ts
```

Bio, experience, skills, projects, links, nav — all of it. Components read from
it, so you never need to touch JSX to update the site. Anything marked
`// TODO(rahul)` is a placeholder or a guess drafted from the resume summary.

### Adding a project

Append an entry to the `projects` array in `site.ts`:

```ts
{
  id: 'my-project',
  title: 'My Project',
  blurb: 'One line.',
  description: 'Two or three sentences on what it does and why.',
  tech: ['Python', 'pytest'],
  liveUrl: 'https://...',      // optional
  githubUrl: 'https://...',    // optional
  status: 'live',              // or 'in-progress' for a dashed placeholder card
  featured: true,              // optional — makes the card full width
  mark: 'MP',                  // 2 chars shown on the card
}
```

Set `featured: true` on at most one project.

### Adding your resume

Drop the PDF at `frontend/public/resume.pdf`, then in `site.ts` set:

```ts
resumeUrl: '/resume.pdf',
```

That turns on the Resume button in the hero. Leave it `null` to hide it.

## Structure

```
frontend/
├── src/
│   ├── content/site.ts        ← all copy and data
│   ├── app/
│   │   ├── layout.tsx         fonts + metadata
│   │   ├── page.tsx           section order
│   │   ├── globals.css        design tokens (colors, fonts, animations)
│   │   └── api/contact/       contact form endpoint
│   ├── components/            Nav, Hero, About, Experience, Projects,
│   │                          Skills, Contact, Footer + shared primitives
│   ├── lib/supabase.ts        server-only Supabase client
│   └── types/
└── public/
```

## Design

The theme is a lab instrument: dark panel, phosphor-green trace, amber as a
second channel. Every color, font, and animation lives in the `@theme` block at
the top of `src/app/globals.css`. Change `--color-phosphor` there and the whole
site retunes.

Pieces worth knowing about:

- `.graticule` — the fixed scope grid behind everything, masked to fade at the edges
- `.scanlines` — a barely-visible CRT overlay (deliberately ~1.6% opacity)
- `.brackets` — screen-corner marks on panels, brighten on hover
- `Waveform.tsx` — the hero trace. A dim persistent path plus a short bright dash
  swept along it with `stroke-dashoffset`. Pure CSS, no JS.
- `Sparkline` (same file) — the small traces on project cards

All text colors clear WCAG AA (4.5:1) against both the page and panel
backgrounds. If you change the palette, re-check that. Everything animated is
disabled under `prefers-reduced-motion`.

## Contact form

`POST /api/contact` validates the submission server-side and inserts it into the
`contacts` table in Supabase. If Supabase is unreachable or unconfigured, the
form shows a prefilled "email me directly" link instead of failing silently.

Environment variables (server-side only — **not** `NEXT_PUBLIC_`):

```
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_KEY=<anon or service-role key>
```

Set these locally in `frontend/.env.local` and in Vercel under
Project Settings → Environment Variables. See `frontend/.env.example`.

Reading submissions: Supabase dashboard → Table Editor → `contacts`.

## Local development

```bash
cd frontend
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # production build
npm run lint    # eslint
```

## Deployment

Pushing to `main` triggers a Vercel deploy. Vercel's root directory for this
project is `frontend`.
