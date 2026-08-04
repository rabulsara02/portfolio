import { experience } from '@/content/site';
import Section from './Section';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      channel="Test log"
      title="Where I've worked."
      lead="Most recent first. Test engineering now, with a run through NASA's L'SPACE program and a classroom before that."
    >
      <ol className="border-t border-line">
        {experience.map((job, i) => (
          <Reveal as="li" key={`${job.company}-${job.role}`} delay={i * 70}>
            <article className="grid gap-5 border-b border-line py-8 sm:grid-cols-[130px_1fr] sm:gap-8">
              {/* timestamp gutter */}
              <div className="flex items-start gap-3 sm:flex-col sm:gap-2">
                <span className="font-mono text-[11px] whitespace-nowrap text-fg-3">
                  {job.period}
                </span>
                {i === 0 && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.16em] text-phosphor uppercase">
                    <span
                      aria-hidden
                      className="led h-1.5 w-1.5 rounded-full bg-phosphor text-phosphor"
                    />
                    Running
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-fg">
                  {job.role}
                </h3>
                <div className="mt-1.5 font-mono text-[11px] tracking-[0.1em] text-phosphor uppercase">
                  {job.company}
                  {job.location && (
                    <span className="text-fg-3"> · {job.location}</span>
                  )}
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-fg-2">
                  {job.summary}
                </p>

                <ul className="mt-4 space-y-2">
                  {job.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="relative pl-5 text-[15px] leading-relaxed text-fg-2"
                    >
                      <span
                        aria-hidden
                        className="absolute top-0 left-0 font-mono text-[11px] text-phosphor/60"
                      >
                        ›
                      </span>
                      {bullet}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {job.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-fg-2"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
