import { about } from '@/content/site';
import Section from './Section';
import Reveal from './Reveal';

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      channel="Subject"
      title="Somebody has to find the failure first."
    >
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div className="space-y-6">
          {about.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <p className="text-[17px] leading-[1.75] text-fg-2">{p}</p>
            </Reveal>
          ))}
        </div>

        {/* spec sheet */}
        <Reveal delay={120}>
          <div className="brackets border border-line bg-panel">
            <div className="border-b border-line px-5 py-3">
              <span className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
                Spec sheet
              </span>
            </div>
            <dl className="divide-y divide-line">
              {about.facts.map((fact) => (
                <div key={fact.label} className="px-5 py-4">
                  <dt className="font-mono text-[10px] tracking-[0.2em] text-phosphor uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[14px] leading-snug text-fg">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
