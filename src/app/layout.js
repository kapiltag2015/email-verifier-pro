import './globals.css'

export const metadata = {
  title: 'Email Verifier Pro',
  description: 'NeverBounce alternative – 100% free to start',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white min-h-screen">{children}</body>
    </html>
  )
}
