import Verifier from './verifier'

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-5xl font-bold text-center mt-10 mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        Email Verifier Pro
      </h1>
      <p className="text-center text-gray-400 mb-12 text-xl">
        5000 free verifications · No card needed · API ready
      </p>
      <Verifier />
    </main>
  )
}
