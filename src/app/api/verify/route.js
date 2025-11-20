import validateEmail from 'deep-email-validator';

export async function POST(req) {
  const { emails } = await req.json();

  const results = [];

  for (const email of emails) {
    try {
      const { valid, reason } = await validateEmail({
        email,
        validateRegex: true,
        validateMx: true,
        validateTypo: true,
        validateDisposable: true,
        validateSMTP: true,
        timeout: 15000,
      });

      results.push({
        email,
        status: valid ? 'valid' : 'invalid',
        reason: valid ? '' : (reason || 'failed SMTP check'),
      });
    } catch (err) {
      results.push({ email, status: 'error', reason: 'timeout or blocked' });
    }
  }

  return Response.json(results);
}

export const runtime = 'edge';
