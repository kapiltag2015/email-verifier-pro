import validateEmail from 'deep-email-validator';

export async function POST(req) {
  const { emails } = await req.json();

  const results = [];
  for (const email of emails) {
    const { valid, reason } = await validateEmail({
      email,
      validateRegex: true,
      validateMx: true,
      validateTypo: true,
      validateDisposable: true,
      validateSMTP: true,
      timeout: 12000,
    });

    results.push({
      email,
      status: valid ? 'valid' : 'invalid',
      reason: valid ? '' : (reason || 'failed'),
    });
  }

  return Response.json(results);
}

export const runtime = 'edge';
