import validateEmail from 'deep-email-validator';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');

  if (!file) return new Response('No file', { status: 400 });

  const text = await file.text();
  const emails = text.split('\n').map(line => line.trim()).filter(line => line.includes('@'));

  const results = [];
  for (const email of emails.slice(0, 500)) {  // limit 500 for speed
    const { valid, reason } = await validateEmail({ email, validateSMTP: true });
    results.push(`${email},${valid ? 'valid' : 'invalid'},${valid ? '' : reason || 'failed'}`);
  }

  }

  const csv = [`Email,Status,Reason`, ...results].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="verified-emails.csv"',
    },
  });
}

export const runtime = 'edge';
