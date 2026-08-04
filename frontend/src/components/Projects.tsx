import { projects, links, type Project } from '@/content/site';
import Section from './Section';
import Reveal from './Reveal';
import { Sparkline } from './Waveform';
import { ArrowUpRight, GitHubIcon } from './Icons';

export default function Projects() {
  return (
    <Section
      id="projects"
      index="03"
      channel="Devices under test"
      title="Things I've built."
      lead="Two more units are on the bench."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.id}
            delay={i * 80}
            className={project.featured ? 'sm:col-span-2' : ''}
          >
            <ProjectCard project={project} seed={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={260}>
        <div className="mt-8 flex justify-center">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] text-fg-2 uppercase transition-colors hover:border-phosphor hover:text-phosphor"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            Full inventory on GitHub
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

function ProjectCard({ project, seed }: { project: Project; seed: number }) {
  const pending = project.status === 'in-progress';

  return (
    <article
      className={`brackets group flex h-full flex-col border bg-panel transition-colors duration-300 ${
        pending
          ? 'border-line border-dashed bg-panel/40'
          : 'border-line hover:border-line-bright'
      }`}
    >
      {/* status strip */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
          Unit {project.mark}
        </span>
        <span
          className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase ${
            pending ? 'text-amber' : 'text-phosphor'
          }`}
        >
          <span
            aria-hidden
            className={`h-1.5 w-1.5 rounded-full ${
              pending ? 'bg-amber' : 'led bg-phosphor text-phosphor'
            }`}
          />
          {pending ? 'In test' : 'Pass'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-6">
          <h3
            className={`font-display text-2xl font-medium tracking-[-0.02em] ${
              pending ? 'text-fg-3' : 'text-fg'
            }`}
          >
            {project.title}
          </h3>
          <Sparkline
            seed={seed}
            className={`h-6 w-[88px] shrink-0 transition-opacity duration-300 ${
              pending
                ? 'text-fg-3 opacity-25'
                : 'text-phosphor opacity-45 group-hover:opacity-100'
            }`}
          />
        </div>

        <p
          className={`mt-3 flex-1 text-[15px] leading-relaxed ${
            pending ? 'text-fg-3' : 'text-fg-2'
          }`}
        >
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className={`border px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] ${
                pending ? 'border-line text-fg-3' : 'border-line text-fg-2'
              }`}
            >
              {t}
            </li>
          ))}
        </ul>

        {!pending && (project.liveUrl || project.githubUrl) && (
          <div className="mt-6 flex items-center gap-6 border-t border-line pt-5">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-phosphor uppercase hover:underline"
              >
                Live
                <ArrowUpRight className="h-3 w-3" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-fg-2 uppercase hover:text-fg hover:underline"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
