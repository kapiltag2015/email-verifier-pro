'use client';

import { useState } from 'react';

export default function Verifier() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setLoading(true);
    setResult(null);
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails: [email] })
    });
    if (res.ok) {
      const data = await res.json();
      setResult(data[0]);
    } else {
      setResult({ email, status: 'error', reason: 'API not ready' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <input
        type="email"
        placeholder="Enter any email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-6 rounded-xl bg-gray-800 text-lg mb-6"
      />
      <button onClick={verify} className="w-full bg-purple-600 py-6 rounded-xl font-bold text-2xl">
        Verify Now →
      </button>
      {result && (
        <div className={`mt-10 p-10 rounded-xl text-center text-6xl font-bold ${result.status === 'valid' ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
          {result.status === 'valid' ? '✅ VALID' : '❌ INVALID'}
          <p className="text-2xl mt-4 mt-4">{result.email}</p>
        </div>
      )}
    </div>
  );
}
