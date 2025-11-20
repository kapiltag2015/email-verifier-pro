import validateEmail from 'deep-email-validator'

export async function POST(req) {
  const { emails } = await req.json()

  const results = []
  for (const email of emails) {
    const { valid, reason, validators } = await validateEmail({
      email,
      validateSMTP: true,
      validateDisposable: true,
      validateMX: true,
      timeout: 10000
    })

    results.push({
      email,
      status: valid ? 'valid' : 'invalid',
      reason: valid ? '' : reason || 'unknown_error'
    })
  }

  return Response.json(results)
}

export const runtime = 'edge'
