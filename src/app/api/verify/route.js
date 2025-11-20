import validateEmail from 'deep-email-validator';

export async function POST(req) {
  const { emails } = await req.json();

  const results = [];

  for (const email of emails) {
    const { valid, reason } = await validateEmail({
      email,
      validateSMTP: true,
      validateDisposable: true,
      timeout: 15000,
    });

    results.push({
      email,
      status: valid ? 'valid' : 'invalid',
      reason: valid ? '' : reason,
    });
  }

  return Response.json(results);
}
