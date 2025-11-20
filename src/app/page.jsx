import Verifier from './verifier.jsx'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
          Email Verifier Pro
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Real SMTP Verification • Catch-all & Disposable Detection
        </p>
        <p className="text-lg text-gray-400 mb-16">
          5000 free checks • No signup required • Made with ❤️ in India
        </p>

        {/* This line shows the verification form */}
        <Verifier />
      </div>
    </main>
  )
}
