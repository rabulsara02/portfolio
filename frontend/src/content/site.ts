/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR EVERYTHING ON THE SITE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit this file to update the portfolio. No component changes needed.
 *
 *  Anything marked  // TODO(rahul)  is a placeholder or an educated guess
 *  pulled from the resume summary — replace it with the real thing.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Identity ─────────────────────────────────────────────────────────────── */

export const person = {
  name: 'Rahul Bulsara',
  firstName: 'Rahul',
  role: 'Wireless Test Engineer',

  // The giant hero headline, split across two lines.
  // Keep both lines short — they're set at ~5.5rem on desktop.
  headline: ['I break things', 'on purpose'] as [string, string],

  // Two or three sentences. Sits under the waveform.
  intro:
    'Wireless test engineer at SGS, where I validate radios and connected devices against regulatory and performance standards. I write the automation that makes that testing repeatable, and I build software on the side.',

  location: 'Portland, OR', // TODO(rahul): confirm — resume didn't say
  email: 'rahulvbulsara@gmail.com',

  // Drop a PDF at frontend/public/resume.pdf to turn on the "Datasheet" button.
  // Set to null to hide the button.
  resumeUrl: null as string | null,

  // Shown in the hero front panel next to a blinking status LED.
  availability: 'Accepting signals',
} as const;

export const links = {
  github: 'https://github.com/rabulsara02',
  linkedin: 'https://www.linkedin.com/in/rahulbulsara30/',
  email: `mailto:${person.email}`,
} as const;

/* ── About ────────────────────────────────────────────────────────────────── */

export const about = {
  heading: 'About',
  // Each string is a paragraph.
  paragraphs: [
    // TODO(rahul): rewrite in your own voice — this is drafted from your resume.
    "I test wireless devices for a living. That means sitting between a spec sheet and a piece of hardware and figuring out where the two disagree — running RF and protocol test suites, chasing down intermittent failures, and writing up findings clearly enough that someone can act on them.",
    "The part I like most is the automation. Manual test passes don't scale and they don't stay honest, so I spend a lot of my time turning repeated lab procedures into Python that runs the same way every time. That's also how I got deeper into software generally.",
    "Outside of work I build small full-stack projects to keep those muscles working — APIs, databases, and the occasional front end. I have an MS from Texas A&M and a BS from UC San Diego, both in computer engineering.", // TODO(rahul): confirm degree fields
  ],
  // Small stat cards next to the text. Keep to 3 or 4.
  facts: [
    { label: 'Currently', value: 'Wireless Test Engineer @ SGS' },
    { label: 'Education', value: 'MS Texas A&M · BS UC San Diego' },
    { label: 'Focus', value: 'Test automation, RF validation, backend' },
  ],
} as const;

/* ── Experience ───────────────────────────────────────────────────────────── */

export type Job = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  bullets: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: 'SGS North America',
    role: 'Wireless Test Engineer',
    period: 'Jul 2025 — Present',
    location: 'North America',
    summary:
      'Regulatory and performance testing for wireless and connected devices in an accredited lab.',
    // TODO(rahul): these are drafted from a generic wireless-test-engineer profile.
    // Replace with what you actually do — specific standards, tools, and outcomes.
    bullets: [
      'Run RF and protocol conformance testing on wireless devices against regulatory and carrier requirements.',
      'Write Python tooling to automate repeated lab procedures and instrument control, cutting manual test time.',
      'Debug intermittent and hard-to-reproduce failures across firmware, RF, and test-harness layers.',
      'Produce test reports and documentation that engineering and compliance teams use to make ship decisions.',
    ],
    tags: ['RF Testing', 'Python', 'Test Automation', 'Debugging', 'Firmware', 'Linux'],
  },
  {
    company: 'Microsoft TEALS',
    role: 'Instructor Assistant',
    period: '2023 — 2024', // TODO(rahul): confirm end date
    location: 'Oregon',
    summary:
      'Volunteer classroom support for a high school computer science program.',
    bullets: [
      'Co-taught introductory computer science alongside a classroom teacher.',
      'Worked one-on-one with students on debugging, program design, and core CS concepts.',
    ],
    tags: ['Teaching', 'Java', 'CS Fundamentals'],
  },
  {
    company: "NASA L'SPACE",
    role: 'Software Engineer Intern',
    period: 'Jan 2023 — May 2023', // TODO(rahul): confirm end date
    location: 'Remote',
    summary:
      'Software work inside NASA’s L’SPACE virtual internship program.',
    // TODO(rahul): fill in what you actually built here.
    bullets: [
      'Built and tested software components as part of a distributed engineering team.',
      'Worked to mission-style requirements with formal reviews and documentation.',
    ],
    tags: ['Python', 'Git', 'Systems Engineering'],
  },
  {
    company: "NASA L'SPACE",
    role: 'Computer Engineer Researcher — Mission Concept Academy',
    period: 'Sep 2022 — Dec 2022',
    summary:
      'Mission concept design and feasibility research for a planetary science payload.',
    // TODO(rahul): fill in the actual mission/payload and your role.
    bullets: [
      'Contributed the computing and avionics portion of a mission concept proposal.',
      'Used JMARS for site selection and mission planning analysis.',
    ],
    tags: ['JMARS', 'Research', 'Systems Design'],
  },
];

/* ── Skills ───────────────────────────────────────────────────────────────── */
/* No percentage bars. Nobody believes "Python 90%". Grouped tags read better. */

export const skillGroups = [
  {
    title: 'Test & Validation',
    blurb: 'The day job.',
    items: [
      'RF / wireless testing',
      'Regulatory compliance',
      'Test automation',
      'Lab instrumentation',
      'Firmware validation',
      'RTOS',
      'Root-cause debugging',
      'Test documentation',
    ],
  },
  {
    title: 'Languages',
    blurb: 'What I write in.',
    items: ['Python', 'C', 'C++', 'C#', 'TypeScript', 'JavaScript', 'Java', 'SQL', 'Bash', 'MATLAB'],
  },
  {
    title: 'Software & Data',
    blurb: 'Side projects and internal tooling.',
    items: [
      'FastAPI',
      'Flask',
      'Next.js',
      'React',
      'Node.js',
      'REST APIs',
      'PostgreSQL',
      'MySQL',
      'Pandas',
      'NumPy',
    ],
  },
  {
    title: 'Tooling & Infra',
    blurb: 'How it ships and stays running.',
    items: ['Git / GitHub', 'Docker', 'Linux / RHEL', 'CI/CD', 'Shell scripting', 'PowerShell', 'VMWare'],
  },
] as const;

/* ── Projects ─────────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  title: string;
  blurb: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: 'live' | 'in-progress';
  featured?: boolean;
  /** Two-letter mark shown on the card when there's no screenshot. */
  mark: string;
};

export const projects: Project[] = [
  {
    id: 'url-shortener',
    title: 'URL Shortener',
    blurb: 'Link shortening with click analytics.',
    description:
      'Full-stack URL shortening service with click tracking. Generates short codes, records hit counts and referrers, and exposes the whole thing through an auto-documented REST API.',
    tech: ['FastAPI', 'Python', 'SQLAlchemy', 'PostgreSQL', 'JavaScript'],
    liveUrl: 'https://url-shortener-production-440d.up.railway.app',
    githubUrl: 'https://github.com/rabulsara02/url-shortener',
    status: 'live',
    featured: true,
    mark: 'US',
  },

  // ───────────────────────────────────────────────────────────────────────────
  // TODO(rahul): your two test-engineering projects go here.
  // Fill in the fields and flip status to 'live' when they're ready.
  // Until then they render honestly as "In progress" cards.
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'test-project-1',
    title: 'Test Automation Project',
    blurb: 'In progress.',
    description:
      'A test-engineering project currently in development. Details coming soon.',
    tech: ['Python'],
    status: 'in-progress',
    mark: '01',
  },
  {
    id: 'test-project-2',
    title: 'Instrumentation Project',
    blurb: 'In progress.',
    description:
      'A second test-engineering project currently in development. Details coming soon.',
    tech: ['Python'],
    status: 'in-progress',
    mark: '02',
  },
];

/* ── Navigation ───────────────────────────────────────────────────────────── */

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;
