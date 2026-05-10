import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import BeyondCode from '@/components/BeyondCode'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Cinematic divider */}
      <div className="w-full max-w-[1280px] mx-auto h-px bg-[var(--color-border-gray)]" />

      <About />

      <div className="w-full max-w-[1280px] mx-auto h-px bg-[var(--color-border-gray)]" />

      <Projects />

      <div className="w-full max-w-[1280px] mx-auto h-px bg-[var(--color-border-gray)]" />

      <Research />

      <div className="w-full max-w-[1280px] mx-auto h-px bg-[var(--color-border-gray)]" />

      <BeyondCode />

      <div className="w-full max-w-[1280px] mx-auto h-px bg-[var(--color-border-gray)]" />

      <Footer />
    </main>
  )
}
