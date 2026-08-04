import { person, links } from '@/content/site';
import { Container } from './Section';
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-8">
      <Container>
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="font-mono text-[11px] tracking-[0.08em] text-fg-3">
            <span className="text-fg-2">{person.name}</span>
            <span className="mx-2 text-line-bright">/</span>
            <span>{year}</span>
            <span className="mx-2 text-line-bright">/</span>
            <span>Next.js · Tailwind · Vercel</span>
          </div>

          <div className="flex items-center gap-2">
            <FooterPort href={links.github} label="GitHub">
              <GitHubIcon className="h-4 w-4" />
            </FooterPort>
            <FooterPort href={links.linkedin} label="LinkedIn">
              <LinkedInIcon className="h-4 w-4" />
            </FooterPort>
            <FooterPort href={links.email} label="Email">
              <MailIcon className="h-4 w-4" />
            </FooterPort>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterPort({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="flex h-9 w-9 items-center justify-center border border-line text-fg-3 transition-colors hover:border-phosphor hover:text-phosphor"
    >
      {children}
    </a>
  );
}
