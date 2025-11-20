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
      setResult({ email, status: 'error', reason: 'Check console' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900 rounded-3xl p-10 shadow-2xl">
      <input
        type="email"
        placeholder="Type any email here..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-6 rounded-xl bg-gray-800 text-white text-lg mb-6"
      />
      <button
        onClick={verify}
        disabled={loading}
        className="w-full bg-purple-600 py-6 rounded-xl font-bold text-2xl"
      >
        {loading ? 'Checking...' : 'Verify Email →'}
      </button>

      {result && (
        <div className={`mt-10 p-10 rounded-xl text-center ${result.status === 'valid' ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
          <p className="text-5xl font-bold">{result.status.toUpperCase()}</p>
          <p className="text-2xl mt-4">{result.email}</p>
          {result.reason && <p className="mt-4">Reason: {result.reason}</p>}
        </div>
      )}
    </div>
  );
}
