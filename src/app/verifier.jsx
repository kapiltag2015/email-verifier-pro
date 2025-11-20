'use client';

import { useState } from 'react';

export default function Verifier() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    if (!email) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: [email] })
      });
      const data = await res.json();
      setResult(data[0]);
    } catch (e) {
      setResult({ email, status: 'error', reason: 'API not ready yet' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur rounded-3xl p-10 shadow-2xl border border-gray-800">
      <input
        type="email"
        placeholder="Enter email (e.g. elon@tesla.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none text-lg mb-6"
        onKeyPress={(e) => e.key === 'Enter' && verify()}
      />
      <button
        onClick={verify}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-60 py-5 rounded-xl font-bold text-2xl transition"
      >
        {loading ? 'Verifying...' : 'Verify Email →'}
      </button>

      {result && (
        <div className={`mt-10 p-8 rounded-2xl text-center border-4 ${result.status === 'valid' ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30'}`}>
          <p className="text-3xl font-bold mb-4">{result.email}</p>
          <p className="text-6xl">{result.status === 'valid' ? '✅ VALID' : '❌ INVALID'}</p>
          {result.reason && <p className="mt-6 text-gray-300">Reason: {result.reason}</p>}
        </div>
      )}
    </div>
  );
}
