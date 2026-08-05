import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';
import { sendContactNotification } from '@/lib/notify';
import type { ContactFormData, ContactResponse } from '@/types';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS = {
  name: { min: 2, max: 100 },
  subject: { min: 3, max: 200 },
  message: { min: 10, max: 5000 },
} as const;

type Errors = ContactResponse['errors'];

function validate(body: Partial<ContactFormData>): {
  errors: Errors;
  clean: ContactFormData;
} {
  const errors: Errors = {};

  const name = (body.name ?? '').trim();
  const email = (body.email ?? '').trim().toLowerCase();
  const subject = (body.subject ?? '').trim();
  const message = (body.message ?? '').trim();

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    errors.name = `Name must be ${LIMITS.name.min}–${LIMITS.name.max} characters.`;
  }
  if (!EMAIL_RE.test(email) || email.length > 255) {
    errors.email = 'Enter a valid email address.';
  }
  if (
    subject.length < LIMITS.subject.min ||
    subject.length > LIMITS.subject.max
  ) {
    errors.subject = `Subject must be ${LIMITS.subject.min}–${LIMITS.subject.max} characters.`;
  }
  if (
    message.length < LIMITS.message.min ||
    message.length > LIMITS.message.max
  ) {
    errors.message = `Message must be ${LIMITS.message.min}–${LIMITS.message.max} characters.`;
  }

  return { errors, clean: { name, email, subject, message } };
}

export async function POST(request: Request) {
  let body: Partial<ContactFormData>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ContactResponse>(
      { success: false, message: 'Malformed request.' },
      { status: 400 }
    );
  }

  // Honeypot: pretend it worked so bots don't retry.
  if (body.website) {
    return NextResponse.json<ContactResponse>({
      success: true,
      message: 'Thanks — your message is on its way.',
    });
  }

  const { errors, clean } = validate(body);

  if (errors && Object.keys(errors).length > 0) {
    return NextResponse.json<ContactResponse>(
      { success: false, message: 'Please fix the highlighted fields.', errors },
      { status: 422 }
    );
  }

  const supabase = getSupabase();

  if (!supabase) {
    console.error('[contact] Supabase is not configured — check env vars.');
    return NextResponse.json<ContactResponse>(
      {
        success: false,
        message: 'The form is temporarily unavailable.',
      },
      { status: 503 }
    );
  }

  const { error } = await supabase.from('contacts').insert({
    name: clean.name,
    email: clean.email,
    subject: clean.subject,
    message: clean.message,
  });

  if (error) {
    console.error('[contact] Insert failed:', error.message);
    return NextResponse.json<ContactResponse>(
      { success: false, message: 'Could not save your message.' },
      { status: 502 }
    );
  }

  // The message is saved at this point, so the submission has succeeded no
  // matter what happens next. Awaited so the serverless function doesn't get
  // frozen mid-request, but it swallows its own errors.
  await sendContactNotification(clean);

  return NextResponse.json<ContactResponse>({
    success: true,
    message: "Thanks — your message came through. I'll get back to you soon.",
  });
}
