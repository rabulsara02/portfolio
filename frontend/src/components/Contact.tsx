'use client';

import { useState, type FormEvent } from 'react';
import { person, links } from '@/content/site';
import type { ContactFormData, ContactResponse } from '@/types';
import Section from './Section';
import Reveal from './Reveal';
import { ArrowUpRight, GitHubIcon, LinkedInIcon } from './Icons';

const EMPTY: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export default function Contact() {
  const [form, setForm] = useState<ContactFormData>(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<ContactResponse['errors']>({});

  const set = (field: keyof ContactFormData) => (value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data: ContactResponse = await res.json();

      if (res.ok && data.success) {
        setStatus('sent');
        setNote(data.message);
        setForm(EMPTY);
      } else {
        setStatus('failed');
        setNote(data.message ?? 'Something went wrong.');
        setErrors(data.errors ?? {});
      }
    } catch {
      setStatus('failed');
      setNote('Could not reach the server.');
    }
  }

  const mailtoFallback = `mailto:${person.email}?subject=${encodeURIComponent(
    form.subject || 'Hello from your site'
  )}&body=${encodeURIComponent(form.message || '')}`;

  return (
    <Section
      id="contact"
      index="05"
      channel="Signal in"
      title="Let's talk."
      lead="Roles, projects, or a question about test engineering — I read everything."
    >
      <div className="grid gap-8 md:grid-cols-[1fr_1.3fr] md:gap-12">
        {/* direct channels */}
        <div className="space-y-4">
          <Reveal>
            <a
              href={links.email}
              className="brackets group block border border-line bg-panel p-5 transition-colors hover:border-phosphor/50"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
                Direct line
              </span>
              <span className="mt-2 block font-mono text-[14px] break-all text-phosphor group-hover:underline">
                {person.email}
              </span>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <div className="border border-line bg-panel p-5">
              <span className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
                Location
              </span>
              <span className="mt-2 block text-[14px] text-fg">
                {person.location}
              </span>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="flex gap-2">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-1 items-center justify-center gap-2 border border-line px-4 py-3 font-mono text-[11px] tracking-[0.12em] text-fg-2 uppercase transition-colors hover:border-phosphor hover:text-phosphor"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                GitHub
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-1 items-center justify-center gap-2 border border-line px-4 py-3 font-mono text-[11px] tracking-[0.12em] text-fg-2 uppercase transition-colors hover:border-phosphor hover:text-phosphor"
              >
                <LinkedInIcon className="h-3.5 w-3.5" />
                LinkedIn
                <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </div>
          </Reveal>
        </div>

        {/* intake form */}
        <Reveal delay={120}>
          <form
            onSubmit={handleSubmit}
            noValidate
            className="brackets border border-line bg-panel"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3 sm:px-6">
              <span className="font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase">
                Intake form
              </span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-fg-3 uppercase">
                {status === 'sending'
                  ? 'Transmitting'
                  : status === 'sent'
                    ? 'Received'
                    : 'Ready'}
              </span>
            </div>

            <div className="p-5 sm:p-6">
              {/* honeypot */}
              <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => set('website')(e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={set('name')}
                  error={errors?.name}
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={set('email')}
                  error={errors?.email}
                />
              </div>

              <div className="mt-4">
                <Field
                  id="subject"
                  label="Subject"
                  placeholder="Role at Acme / quick question"
                  value={form.subject}
                  onChange={set('subject')}
                  error={errors?.subject}
                />
              </div>

              <div className="mt-4">
                <Field
                  id="message"
                  label="Message"
                  textarea
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={set('message')}
                  error={errors?.message}
                />
              </div>

              {status !== 'idle' && status !== 'sending' && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-5 border-l-2 px-4 py-3 text-[13px] leading-relaxed ${
                    status === 'sent'
                      ? 'border-phosphor bg-phosphor/5 text-phosphor'
                      : 'border-amber bg-amber/5 text-amber'
                  }`}
                >
                  {note}
                  {status === 'failed' && (
                    <>
                      {' '}
                      You can also{' '}
                      <a href={mailtoFallback} className="underline">
                        email me directly
                      </a>
                      .
                    </>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="mt-6 w-full bg-phosphor px-6 py-3.5 font-mono text-[12px] tracking-[0.14em] text-void uppercase transition-colors hover:bg-fg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'sending' ? 'Transmitting…' : 'Transmit'}
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  textarea = false,
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  error?: string;
}) {
  const base =
    'w-full border bg-void px-3.5 py-2.5 text-[14px] text-fg placeholder:text-fg-3/70 outline-none transition-colors';
  const state = error
    ? 'border-amber focus:border-amber'
    : 'border-line focus:border-phosphor';

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[10px] tracking-[0.2em] text-fg-3 uppercase"
      >
        {label}
      </label>

      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${state} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${base} ${state}`}
        />
      )}

      {error && (
        <p id={`${id}-error`} className="mt-1.5 font-mono text-[11px] text-amber">
          {error}
        </p>
      )}
    </div>
  );
}
