import { skillGroups } from '@/content/site';
import Section from './Section';
import Reveal from './Reveal';

const channelTone = ['text-phosphor', 'text-cyan', 'text-amber', 'text-fg-2'];

export default function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      channel="Instrumentation"
      title="What I work with."
      lead="No percentage bars — nobody believes 'Python 90%'. Here's the actual bench, grouped by what it's for."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 80}>
            <div className="brackets h-full border border-line bg-panel">
              <div className="flex items-baseline justify-between border-b border-line px-5 py-3">
                <span
                  className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                    channelTone[i % channelTone.length]
                  }`}
                >
                  CH{i + 1} · {group.title}
                </span>
                <span className="font-mono text-[10px] text-fg-3">
                  {group.items.length}
                </span>
              </div>

              <div className="p-5">
                <p className="font-mono text-[11px] text-fg-3">{group.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border border-line bg-panel-2 px-2.5 py-1.5 font-mono text-[11px] text-fg-2 transition-colors hover:border-phosphor/50 hover:text-fg"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
