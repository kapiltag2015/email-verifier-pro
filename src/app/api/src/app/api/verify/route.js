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
        validateDisposable: true,
        validateSMTP: true,
        timeout: 15000,
      });

      results.push({
        email,
        status: valid ? 'valid' : 'invalid',
        reason: valid ? '' : reason || 'failed',
      });
    } catch (err) {
      results.push({ email, status: 'error', reason: 'timeout' });
    }
  }

  return Response.json(results);
}
