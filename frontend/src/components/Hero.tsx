import { person, links } from '@/content/site';
import { Container } from './Section';
import Reveal from './Reveal';
import Waveform from './Waveform';
import {
  ArrowDown,
  ArrowUpRight,
  DocumentIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from './Icons';

/** Instrument front-panel readouts. */
const panel = [
  { label: 'Subject', value: person.name },
  { label: 'Function', value: person.role },
  { label: 'Site', value: person.location },
  { label: 'Status', value: person.availability, live: true },
];

export default function Hero() {
  return (
    <section id="top" className="relative pt-28 pb-16 sm:pt-36 sm:pb-20">
      <Container>
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] uppercase">
            <span className="text-phosphor">CH1</span>
            <span aria-hidden className="h-px w-5 bg-line-bright" />
            <span className="text-fg-3">SGS North America</span>
            <span aria-hidden className="h-px w-5 bg-line-bright" />
            <span className="text-fg-3">Wireless</span>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <h1 className="font-display mt-7 text-[clamp(2.5rem,8.5vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.045em] text-fg">
            {person.headline[0]}
            <br />
            {person.headline[1]}
            <span className="text-phosphor">.</span>
            <span aria-hidden className="caret ml-2 text-phosphor">
              _
            </span>
          </h1>
        </Reveal>

        {/* the trace */}
        <Reveal delay={130}>
          <div className="mt-8 border-y border-line py-3">
            <Waveform className="h-20 w-full sm:h-24" />
          </div>
        </Reveal>

        <Reveal delay={190}>
          <p className="mt-8 max-w-xl text-[17px] leading-relaxed text-fg-2">
            {person.intro}
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 bg-phosphor px-6 py-3 font-mono text-[12px] tracking-[0.12em] text-void uppercase transition-colors hover:bg-fg"
            >
              Run diagnostics
              <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-line-bright px-6 py-3 font-mono text-[12px] tracking-[0.12em] text-fg uppercase transition-colors hover:border-phosphor hover:text-phosphor"
            >
              Send signal
            </a>
            {person.resumeUrl && (
              <a
                href={person.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3 py-3 font-mono text-[12px] tracking-[0.12em] text-fg-3 uppercase transition-colors hover:text-fg"
              >
                <DocumentIcon className="h-3.5 w-3.5" />
                Datasheet
                <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </div>
        </Reveal>

        {/* front panel */}
        <Reveal delay={310}>
          <dl className="mt-14 grid grid-cols-2 border border-line sm:grid-cols-4">
            {panel.map((item, i) => (
              <div
                key={item.label}
                className={`p-4 sm:p-5 ${
                  i < panel.length - 1 ? 'border-line sm:border-r' : ''
                } ${i < 2 ? 'border-b sm:border-b-0' : ''} ${
                  i % 2 === 0 ? 'border-r sm:border-r' : ''
                }`}
              >
                <dt className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 flex items-center gap-2 text-[13px] leading-snug text-fg">
                  {item.live && (
                    <span
                      aria-hidden
                      className="led h-1.5 w-1.5 shrink-0 rounded-full bg-phosphor text-phosphor"
                    />
                  )}
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={370}>
          <div className="mt-6 flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
              Ports
            </span>
            <div className="flex items-center gap-2">
              <Port href={links.github} label="GitHub">
                <GitHubIcon className="h-4 w-4" />
              </Port>
              <Port href={links.linkedin} label="LinkedIn">
                <LinkedInIcon className="h-4 w-4" />
              </Port>
              <Port href={links.email} label="Email">
                <MailIcon className="h-4 w-4" />
              </Port>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Port({
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
