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
      channel="Projects"
      title="Things I've built."
      lead="Two test harnesses and a Transformer. Each one measures something about itself, not just the thing it's pointed at."
    >
      <div className="space-y-4">
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 80}>
            <ProjectCard project={project} seed={i} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={240}>
        <div className="mt-8 flex justify-center">
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] text-fg-2 uppercase transition-colors hover:border-phosphor hover:text-phosphor"
          >
            <GitHubIcon className="h-3.5 w-3.5" />
            More on GitHub
            <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

function ProjectCard({ project, seed }: { project: Project; seed: number }) {
  return (
    <article className="brackets group border border-line bg-panel transition-colors duration-300 hover:border-line-bright">
      {/* header strip */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 sm:px-6">
        <span className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
          <span className="text-phosphor">{project.mark}</span>
          {project.period}
        </span>
        {project.passing && (
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-phosphor uppercase">
            <span
              aria-hidden
              className="led h-1.5 w-1.5 rounded-full bg-phosphor text-phosphor"
            />
            Pass
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-6">
          <h3 className="font-display text-2xl leading-tight font-medium tracking-[-0.02em] text-fg">
            {project.title}
          </h3>
          <Sparkline
            seed={seed}
            className="hidden h-6 w-[88px] shrink-0 text-phosphor opacity-45 transition-opacity duration-300 group-hover:opacity-100 sm:block"
          />
        </div>

        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-fg-2">
          {project.description}
        </p>

        {/* metrics readout */}
        <dl className="mt-5 grid grid-cols-3 border border-line">
          {project.metrics.map((m, i) => (
            <div
              key={m.label}
              className={`px-3 py-3 sm:px-4 ${
                i < project.metrics.length - 1 ? 'border-r border-line' : ''
              }`}
            >
              <dd className="font-display text-xl leading-none font-medium text-phosphor">
                {m.value}
              </dd>
              <dt className="mt-1.5 font-mono text-[9.5px] tracking-[0.14em] text-fg-3 uppercase">
                {m.label}
              </dt>
            </div>
          ))}
        </dl>

        {project.points.length > 0 && (
          <ul className="mt-5 space-y-2">
            {project.points.map((point) => (
              <li
                key={point}
                className="relative max-w-2xl pl-5 text-[14px] leading-relaxed text-fg-2"
              >
                <span
                  aria-hidden
                  className="absolute top-0 left-0 font-mono text-[11px] text-phosphor/60"
                >
                  ›
                </span>
                {point}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <li
                key={t}
                className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-fg-2"
              >
                {t}
              </li>
            ))}
          </ul>

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex items-center gap-5">
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
      </div>
    </article>
  );
}
