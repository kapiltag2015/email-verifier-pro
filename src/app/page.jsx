import Verifier from './verifier.jsx'   // ← must have .jsx at the end

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto p-8 pt-20 text-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Email Verifier Pro
        </h1>
        <p className="text-2xl text-gray-300 mb-16">
          5000 free checks · Real SMTP verification · Made with ❤️ in India
        </p>
        <Verifier />
      </div>
    </main>
  )
}
