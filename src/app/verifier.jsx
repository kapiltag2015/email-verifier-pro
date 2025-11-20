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
      setResult({ email, status: 'error', reason: 'API not connected' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-3xl p-10 shadow-2xl">
      <input
        type="email"
        placeholder="Enter email to verify..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-6 rounded-xl bg-gray-800 text-white text-lg mb-6"
      />
      <button
        onClick={verify}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-6 rounded-xl font-bold text-2xl"
      >
        {loading ? 'Verifying...' : 'Verify Email →'}
      </button>

      {result && (
        <div className={`mt-10 p-10 rounded-xl text-center ${result.status === 'valid' ? 'bg-green-900/50 border-green-500' : 'bg-red-900/50 border-red-500'} border-4`}>
          <p className="text-6xl font-bold">{result.status === 'valid' ? 'VALID' : 'INVALID'}</p>
          <p className="text-3xl mt-4">{result.email}</p>
          {result.reason && <p className="mt-4 text-gray-300">Reason: {result.reason}</p>}
        </div>
      )}
    </div>
  );
}
