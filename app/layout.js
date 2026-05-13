import './globals.css'
import { SmoothScrollProvider } from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import CursorFollower from '@/components/CursorFollower'

export const metadata = {
  title: 'Surya Prakash — Engineer, Explorer, Builder',
  description: 'A curious engineer exploring systems, AI, and immersive digital experiences through thoughtful design, modern technology, and continuous experimentation.',
  keywords: ['Surya Prakash', 'portfolio', 'engineer', 'AI', 'systems', 'full-stack', 'deep learning', 'web development'],
  authors: [{ name: 'Surya Prakash' }],
  openGraph: {
    title: 'Surya Prakash — Engineer, Explorer, Builder',
    description: 'A curious engineer exploring systems, AI, and immersive digital experiences.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <CursorFollower />
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
