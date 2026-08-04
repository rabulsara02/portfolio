import type { Metadata } from 'next';
import { Inter, Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { person } from '@/content/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  display: 'swap',
});

const plex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex',
  display: 'swap',
});

const title = `${person.name} — ${person.role}`;
const description = person.intro;

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s — ${person.name}`,
  },
  description,
  keywords: [
    'Rahul Bulsara',
    'test engineer',
    'RF testing',
    'test automation',
    'software engineer',
    'Python',
    'portfolio',
  ],
  authors: [{ name: person.name }],
  creator: person.name,
  openGraph: { title, description, type: 'profile', siteName: person.name },
  twitter: { card: 'summary_large_image', title, description },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${grotesk.variable} ${plex.variable} graticule font-sans antialiased`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-phosphor focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-void"
        >
          Skip to content
        </a>
        <div className="relative z-10">{children}</div>
        <div aria-hidden className="scanlines" />
      </body>
    </html>
  );
}
