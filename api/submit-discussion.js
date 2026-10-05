const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  if (ALLOWED_ORIGIN !== '*') res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.end(JSON.stringify(body));
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (ALLOWED_ORIGIN !== '*') res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
    return res.end();
  }

  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });
  if (!process.env.RESEND_API_KEY) return json(res, 500, { error: 'Email service is not configured.' });

  const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  // Honeypot: bots should never fill this hidden field.
  if (body.website) return json(res, 200, { ok: true });

  const fields = {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim(),
    ageGrade: String(body.ageGrade || '').trim(),
    school: String(body.school || '').trim(),
    city: String(body.city || '').trim(),
    question: String(body.question || '').trim(),
    hypothesis: String(body.hypothesis || '').trim()
  };

  if (!fields.name || !fields.email || !fields.ageGrade || !fields.school || !fields.city || !fields.question || !fields.hypothesis) {
    return json(res, 400, { error: 'Please complete all required fields.' });
  }
  if (fields.question.length > 1200 || fields.hypothesis.length > 1200) return json(res, 400, { error: 'Your response is too long.' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return json(res, 400, { error: 'Please enter a valid email address.' });

  const subject = `New Axiom Frontier discussion request — ${fields.name}`;
  const text = [
    'New Axiom Frontier Executive Discussion Hub submission',
    '',
    `Name: ${fields.name}`,
    `Preferred email: ${fields.email}`,
    `Age / grade: ${fields.ageGrade}`,
    `School: ${fields.school}`,
    `City / region: ${fields.city}`,
    '',
    'Question / observation:',
    fields.question,
    '',
    'Current hypothesis / direction:',
    fields.hypothesis
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'Axiom Frontier <onboarding@resend.dev>',
      to: [process.env.DISCUSSION_TO_EMAIL || 'pulika.prasad@gmail.com'],
      reply_to: fields.email,
      subject,
      text
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend error:', detail);
    return json(res, 502, { error: 'The email service could not accept the submission.' });
  }

  return json(res, 200, { ok: true });
};
