'use client'

import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Verifier() {
  const [email, setEmail] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [credits, setCredits] = useState(null)

  const checkCredits = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data } = await supabase.from('profiles').select('credits').eq('id', user.id).single()
      setCredits(data?.credits || 0)
    }
  }

  const verify = async () => {
    setLoading(true)
    setResult(null)
    await checkCredits()

    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails: [email] })
    })

    const data = await res.json()
    setResult(data[0])
    setLoading(false)
    checkCredits()
  }

  return (
    <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
      {credits !== null && <p className="text-right mb-4 text-lg">Credits left: <span className="font-bold text-purple-400">{credits}</span></p>}
      
      <input
        type="email"
        placeholder="Enter email (e.g. bill@gates.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none text-lg"
        onKeyPress={(e) => e.key === 'Enter' && verify()}
      />
      
      <button
        onClick={verify}
        disabled={loading || !email}
        className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 py-4 rounded-lg font-bold text-xl transition"
      >
        {loading ? 'Verifying...' : 'Verify Email →'}
      </button>

      {result && (
        <div className={`mt-8 p-6 rounded-lg border-2 ${result.status === 'valid' ? 'border-green-500 bg-green-900/20' : 'border-red-500 bg-red-900/20'}`}>
          <p className="text-2xl font-bold">{result.email}</p>
          <p className="text-4xl mt-4">{result.status === 'valid' ? '✅ VALID' : '❌ INVALID'}</p>
          {result.reason && <p className="mt-2 text-gray-400">Reason: {result.reason}</p>}
        </div>
      )}
    </div>
  )
}
