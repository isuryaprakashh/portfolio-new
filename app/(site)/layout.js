import { SmoothScrollProvider } from '@/components/SmoothScroll'
import Navbar from '@/components/Navbar'
import CursorFollower from '@/components/CursorFollower'
import SpotifyPlaying from '@/components/SpotifyPlaying'

// Blog, admin and login keep the original site chrome (navbar, cursor, smooth scroll, music widget).
export default function SiteLayout({ children }) {
  return (
    <SmoothScrollProvider>
      <CursorFollower />
      <Navbar />
      {children}
      <SpotifyPlaying />
    </SmoothScrollProvider>
  )
}
