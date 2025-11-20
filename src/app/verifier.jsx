'use client';

import { useState } from 'react';

export default function Verifier() {
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);
  const [singleResult, setSingleResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifySingle = async () => {
    if (!email) return;
    setLoading(true);
    setSingleResult(null);
    const res = await fetch('/api/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails: [email] })
    });
    const data = await res.json();
    setSingleResult(data[0]);
    setLoading(false);
  };

  const verifyBulk = async () => {
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/verify-bulk', { method: 'POST', body: form });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'clean-emails-by-kapil.csv';
    a.click();
    setLoading(false);
  };

  return (
    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
      {/* Single Email */}
      <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 p-10">
        <h2 className="text-3xl font-bold mb-8 text-purple-400">Single Email Check</h2>
        <input
          type="email"
          placeholder="example: jeff@amazon.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 outline-none text-lg mb-6"
        />
        <button
          onClick={verifySingle}
          disabled={loading || !email}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-5 rounded-xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition"
        >
          {loading ? 'Checking...' : 'Verify Email →'}
        </button>

        {singleResult && (
          <div className={`mt-8 p-8 rounded-xl border-4 ${singleResult.status === 'valid' ? 'border-green-500 bg-green-900/30' : 'border-red-500 bg-red-900/30'}`}>
            <p className="text-2xl font-bold">{singleResult.email}</p>
            <p className="text-5xl mt-4">{singleResult.status === 'valid' ? '✅ VALID' : '❌ INVALID'}</p>
            {singleResult.reason && <p className="mt-4 text-gray-400">Reason: {singleResult.reason}</p>}
          </div>
        )}
      </div>

      {/* Bulk Upload */}
      <div className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-8 text-pink-400">Bulk CSV Upload</h2>
        <p className="text-gray-400 mb-6">Upload a CSV (one email per line or comma separated)</p>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-gray-300 file:mr-6 file:py-4 file:px-10 file:rounded-xl file:border-0 file:bg-pink-600 file:text-white hover:file:bg-pink-700"
        />
        <button
          onClick={verifyBulk}
          disabled={loading || !file}
          className="mt-8 w-full bg-gradient-to-r from-pink-600 to-purple-600 py-5 rounded-xl font-bold text-xl disabled:opacity-50"
        >
          {loading ? 'Processing list...' : 'Upload & Download Clean List →'}
        </button>
      </div>
    </div>
  );
}
