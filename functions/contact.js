// Netlify Function: Contact Form Handler
// Validates input, applies basic anti-spam, and optionally emails via Resend API

// Environment variables required for emailing (optional):
// - RESEND_API_KEY
// - CONTACT_TO_EMAIL (recipient)
// - CONTACT_FROM_EMAIL (verified sender, e.g., no-reply@yourdomain)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function badRequest(message) {
  return {
    statusCode: 400,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: false, error: message })
  };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: { Allow: 'POST' }, body: 'Method Not Allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch {
    return badRequest('Invalid JSON');
  }

  // Honeypot check
  if (data.website) {
    // likely bot
    return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: true }) };
  }

  const name = (data.name || '').toString().trim();
  const email = (data.email || '').toString().trim();
  const subject = (data.subject || '').toString().trim();
  const message = (data.message || '').toString().trim();

  if (!name || name.length < 2 || name.length > 100) return badRequest('Invalid name');
  if (!emailRegex.test(email) || email.length > 200) return badRequest('Invalid email');
  if (!subject || subject.length > 120) return badRequest('Invalid subject');
  if (!message || message.length < 10 || message.length > 5000) return badRequest('Invalid message');

  const meta = {
    ip: event.headers['x-nf-client-connection-ip'] || event.headers['x-forwarded-for'] || 'unknown',
    ua: event.headers['user-agent'] || 'unknown',
    time: new Date().toISOString(),
  };

  // If Resend is configured, send an email
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const TO = process.env.CONTACT_TO_EMAIL;
  const FROM = process.env.CONTACT_FROM_EMAIL || 'no-reply@localhost';

  try {
    if (RESEND_API_KEY && TO) {
      const html = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space: pre-wrap; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;">${escapeHtml(message)}</pre>
        <hr />
        <small>IP: ${escapeHtml(meta.ip)} | UA: ${escapeHtml(meta.ua)} | Time: ${escapeHtml(meta.time)}</small>
      `;

      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM,
          to: [TO],
          subject: `[BullRider] ${subject || 'New Message'}`,
          html,
          reply_to: email,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error('Resend error:', errText);
        return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: 'Email service error' }) };
      }
    } else {
      // No email provider configured; still accept the submission.
      console.log('Contact submission (no email provider configured):', { name, email, subject, message, meta });
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true })
    };
  } catch (e) {
    console.error('Handler error:', e);
    return { statusCode: 500, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ success: false, error: 'Server error' }) };
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
