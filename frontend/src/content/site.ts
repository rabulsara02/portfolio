/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR EVERYTHING ON THE SITE
 * ─────────────────────────────────────────────────────────────────────────────
 *  Edit this file to update the portfolio. No component changes needed.
 *  Everything here is drawn from Bulsara_Rahul_Resume_Main.pdf.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ── Identity ─────────────────────────────────────────────────────────────── */

export const person = {
  name: 'Rahul Bulsara',
  firstName: 'Rahul',
  role: 'Test Engineer',

  // The hero headline, split across two lines. Keep both short.
  headline: ['I break things', 'on purpose'] as [string, string],

  intro:
    "I'm a test engineer. Most recently at SGS, running RF conformance testing on 5G NR and LTE devices against 3GPP specifications. I'm now doing an MS at Texas A&M and building conformance test harnesses — the kind of tooling that tells you whether a failure belongs to the device or to your own test rig.",

  location: 'San Francisco, CA',
  email: 'rahulvbulsara@gmail.com',

  // Canonical origin. Used for metadataBase, the canonical <link>, and to
  // resolve Open Graph image paths. No trailing slash.
  siteUrl: 'https://rahulbulsara.com',

  // Drop a PDF at frontend/public/resume.pdf to turn on the Resume button.
  // Set to null to hide it.
  resumeUrl: null as string | null,

  // Shown in the hero panel next to a status light.
  availability: 'Open to SDET and test automation roles',
} as const;

export const links = {
  github: 'https://github.com/rabulsara02',
  linkedin: 'https://www.linkedin.com/in/rahulbulsara30/',
  email: `mailto:${person.email}`,
} as const;

/* ── About ────────────────────────────────────────────────────────────────── */

export const about = {
  paragraphs: [
    'At SGS I ran RF conformance testing on 5G NR and LTE devices — Keysight and Anritsu platforms, 3GPP specifications, and a lot of time spent working out whether a failure belonged to the device or to the bench.',
    'The part I kept coming back to was the automation. I built a Python service there that cross-checked license files against multi-format test data and test case requirements, which took manual setup errors off the table across thousands of configurations.',
    "Now I'm doing an MS in Mathematics at Texas A&M and building test infrastructure on my own time. Two conformance harnesses so far, and both of them measure their own effectiveness rather than just reporting green — I'd rather know what my tests miss than assume they catch everything.",
  ],
  facts: [
    { label: 'Currently', value: 'MS Mathematics · Texas A&M' },
    { label: 'Previously', value: 'Wireless Test Engineer · SGS' },
    { label: 'Focus', value: 'Test automation, conformance, CI' },
  ],
} as const;

/* ── Education ────────────────────────────────────────────────────────────── */

export const education = [
  {
    school: 'Texas A&M University',
    degree: 'MS, Mathematics',
    period: 'Jan 2026 — Dec 2027',
    current: true,
  },
  {
    school: 'University of California, San Diego',
    degree: 'BS, Mathematics and Computer Science',
    period: 'Sep 2023 — Jun 2025',
    current: false,
  },
] as const;

/* ── Experience ───────────────────────────────────────────────────────────── */

export type Job = {
  company: string;
  role: string;
  period: string;
  location?: string;
  /** Drives the "Current" status light. */
  current?: boolean;
  summary: string;
  bullets: string[];
  tags: string[];
};

export const experience: Job[] = [
  {
    company: 'SGS — North America',
    role: 'Wireless Test Engineer',
    period: 'Jul 2025 — Dec 2025',
    location: 'San Diego, CA',
    summary:
      'RF conformance testing on cellular devices in an accredited lab, plus the automation to make it repeatable.',
    bullets: [
      'Performed RF conformance testing on 5G NR and LTE devices using Keysight and Anritsu platforms, ensuring compliance with 3GPP specifications.',
      'Automated license validation for 5G NR/LTE test cases with a Python service that cross-checked license files and multi-format test data (Excel, HTML) against test case requirements — eliminating manual setup errors and cutting test plan setup time across thousands of configurations.',
      'Applied 3GPP standards and RF engineering principles to troubleshoot, analyze, and optimize device performance alongside cross-functional RF teams.',
    ],
    tags: ['5G NR', 'LTE', '3GPP', 'Keysight', 'Anritsu', 'Python', 'RF Conformance'],
  },
  {
    company: 'Microsoft TEALS',
    role: 'Instructor Assistant',
    period: 'Aug 2023 — Aug 2024',
    location: 'Oregon, WI',
    summary:
      'Classroom support for a high school AP Computer Science program.',
    bullets: [
      'Designed curriculum for High School AP Computer Science covering introductory Python and Java, improving lesson efficiency by 50% and giving students more time on projects and assignments.',
    ],
    tags: ['Teaching', 'Python', 'Java', 'Curriculum Design'],
  },
  {
    company: "NASA L'SPACE",
    role: 'Software Engineer Intern',
    period: 'Jan 2023 — May 2023',
    location: 'Remote',
    summary:
      "Proposal research inside NASA's L'SPACE virtual internship program.",
    bullets: [
      'Drafted a NASA proposal outlining the use of Finite Element Models enhanced by AI — Artificially Learned Finite Elements (ALFE) — projected to improve engineer efficiency by up to 40% by reducing manual computation.',
    ],
    tags: ['Research', 'Finite Element Models', 'Technical Writing'],
  },
];

/* ── Projects ─────────────────────────────────────────────────────────────── */

export type Project = {
  id: string;
  title: string;
  period: string;
  description: string;
  /** Short bullets. Keep to three or fewer. */
  points: string[];
  /** Headline numbers. Two or three. */
  metrics: { label: string; value: string }[];
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Two-character mark shown on the card. */
  mark: string;
};

export const projects: Project[] = [
  {
    id: 'modem-conformance-harness',
    title: 'Modem Conformance Test Harness',
    period: 'Jul 2026',
    description:
      'A cellular-modem conformance harness that runs declarative YAML test plans against a device and classifies every failure as a device fault, a timeout, or a fault in the harness itself.',
    points: [
      'Separates 82 automated pytest cases from declarative YAML test definitions, covering 21 conformance cases across identity, registration, data-context, and error-handling behavior.',
      'Every push runs the full conformance pass against a live modem simulator in Docker and publishes JUnit XML and HTML reports as CI artifacts.',
    ],
    metrics: [
      { label: 'Automated tests', value: '82' },
      { label: 'Conformance cases', value: '21' },
      { label: 'Fault classification', value: '100%' },
    ],
    tech: ['Python', 'pytest', 'YAML', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/rabulsara02/modem-conformance-harness',
    mark: 'MC',
  },
  {
    id: 'api-conformance-harness',
    title: 'API Conformance Test Harness',
    period: 'Aug 2026',
    description:
      'An automated framework that validates a running REST service against its published OpenAPI contract, using a single spec-driven test oracle instead of per-endpoint assertions.',
    points: [
      'Measured its own defect-detection rate by seeding 6 labelled defects into the service under test — caught 6 of 6 with zero false positives on a healthy build.',
      'A contract-drift gate in CI fails the build on any undeclared change to the public interface, catching breaking API changes before consumers do.',
    ],
    metrics: [
      { label: 'Automated tests', value: '109' },
      { label: 'Negative-path coverage', value: '54%' },
      { label: 'Seeded defects caught', value: '6/6' },
    ],
    tech: ['Python', 'pytest', 'OpenAPI', 'Docker', 'GitHub Actions'],
    githubUrl: 'https://github.com/rabulsara02/api-conformance-harness',
    mark: 'AC',
  },
  {
    id: 'symbolic-music-generation',
    title: 'Symbolic Music Generation',
    period: 'May — Jun 2025',
    description:
      'A decoder-only Transformer trained on symbolic music, with a custom embedding and positional encoding pipeline.',
    points: [
      'Multi-stage generation system producing conditional and unconditional output from pitch, pause, and duration tokens in a learned embedding space.',
    ],
    metrics: [
      { label: 'MIDI files', value: '900+' },
      { label: 'Validation loss', value: '0.8918' },
      { label: 'Generated segments', value: '1000+' },
    ],
    tech: ['PyTorch', 'Transformers', 'Sequence Modeling'],
    mark: 'SM',
  },
];

/* ── Skills ───────────────────────────────────────────────────────────────── */

/*
 * Kept deliberately short. Everything here is something that matters for a
 * test or SDET role and that you could be questioned on. Filler removed:
 * HTML/CSS, Ruby, MATLAB, Agile, and MySQL (folded into SQL). PyTorch and
 * Transformers still appear as tags on the music project, where they belong.
 */
export const skillGroups = [
  {
    title: 'Test & Validation',
    blurb: 'The core of the work.',
    items: [
      'pytest',
      'JUnit',
      'YAML-driven test plans',
      'Fault injection',
      'Negative-path design',
      'Contract testing',
      'RF conformance testing',
      '3GPP standards',
    ],
  },
  {
    title: 'Languages',
    blurb: 'What I write in.',
    items: ['Python', 'Java', 'C', 'C++', 'SQL', 'Bash'],
  },
  {
    title: 'Tooling & CI',
    blurb: 'How it ships and stays honest.',
    items: [
      'Git',
      'Docker',
      'Docker Compose',
      'GitHub Actions',
      'CI/CD',
      'OpenAPI',
      'GDB',
    ],
  },
] as const;

/* ── Navigation ───────────────────────────────────────────────────────────── */

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;
