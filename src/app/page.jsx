import Verifier from './verifier'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white">
      <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-6xl md:text-7xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Email Verifier Pro
        </h1>
        <p className="text-center text-xl md:text-2xl text-gray-300 mb-16">
          5000 free checks · Real SMTP verification · Bulk CSV supported
        </p>
        <Verifier />
      </div>
    </main>
  )
}
