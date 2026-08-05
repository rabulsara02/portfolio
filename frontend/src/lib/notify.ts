import 'server-only';
import { person } from '@/content/site';
import type { ContactFormData } from '@/types';

/**
 * Emails you a copy of each contact-form submission via Resend.
 *
 * Calls the REST API directly rather than pulling in the `resend` package —
 * it's one fetch, and one fewer dependency to keep updated.
 *
 * Entirely optional. If RESEND_API_KEY isn't set, this is a no-op and the
 * submission still gets stored in Supabase. Failures here never surface to
 * the person filling in the form: their message is already saved, so making
 * them retry because your mail provider hiccuped would be the wrong call.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Escape user-supplied text before it goes anywhere near an HTML email. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function sendContactNotification(
  contact: ContactFormData
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Say so rather than returning silently. A quiet no-op is indistinguishable
  // from a successful send in the logs, which makes "why didn't I get an
  // email" much harder to answer than it needs to be.
  if (!apiKey || !from) {
    const missing = [
      !apiKey && 'RESEND_API_KEY',
      !from && 'CONTACT_FROM_EMAIL',
    ].filter(Boolean);
    console.warn(
      `[contact] Email notification skipped — missing ${missing.join(' and ')}. ` +
        'The submission was still saved.'
    );
    return;
  }

  const to = process.env.CONTACT_TO_EMAIL ?? person.email;

  const name = escapeHtml(contact.name);
  const email = escapeHtml(contact.email);
  const subject = escapeHtml(contact.subject);
  const message = escapeHtml(contact.message).replace(/\n/g, '<br>');

  const html = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#777">
        New message from rahulbulsara.com
      </p>
      <h2 style="margin:0 0 20px;font-size:19px;font-weight:600;color:#111">${subject}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333">
        <tr>
          <td style="padding:6px 0;color:#777;width:70px">From</td>
          <td style="padding:6px 0">${name}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;color:#777">Email</td>
          <td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td>
        </tr>
      </table>
      <div style="margin-top:20px;padding-top:20px;border-top:1px solid #e5e5e5;font-size:15px;line-height:1.6;color:#222">
        ${message}
      </div>
    </div>
  `;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Hitting reply in your mail client replies to them, not to yourself.
        reply_to: contact.email,
        subject: `Portfolio: ${contact.subject}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error(
        '[contact] Resend rejected the notification:',
        res.status,
        await res.text()
      );
    } else {
      console.info(`[contact] Notification sent to ${to}.`);
    }
  } catch (error) {
    console.error('[contact] Could not reach Resend:', error);
  }
}
