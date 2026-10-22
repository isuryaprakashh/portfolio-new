import { Geist, Geist_Mono, VT323 } from 'next/font/google'
import './globals.css'

// Fonts are self-hosted by next/font (no render-blocking Google Fonts request).
// Use the CSS variables, never the literal family names: next/font renames the
// families, so `font-family: "Geist"` would silently fall back to system fonts.
const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
  preload: false,
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vt323',
  preload: false,
})

export const metadata = {
  metadataBase: new URL('https://www.suryaprakash.me'),
  title: {
    default: 'Surya Prakash — Engineer, Explorer, Builder',
    template: '%s — Surya Prakash',
  },
  description: 'A curious engineer exploring systems, AI, and immersive digital experiences through thoughtful design, modern technology, and continuous experimentation.',
  keywords: ['Surya Prakash', 'portfolio', 'engineer', 'AI', 'systems', 'full-stack', 'deep learning', 'web development'],
  authors: [{ name: 'Surya Prakash' }],
  openGraph: {
    title: {
      default: 'Surya Prakash — Engineer, Explorer, Builder',
      template: '%s — Surya Prakash',
    },
    description: 'A curious engineer exploring systems, AI, and immersive digital experiences.',
    type: 'website',
  },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF9' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${vt323.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
