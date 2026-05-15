import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Research from '@/components/Research'
import BeyondCode from '@/components/BeyondCode'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />

      <div className="section-divider" />

      <About />

      <div className="section-divider" />

      <Projects />

      <div className="section-divider" />

      <Research />

      <div className="section-divider" />

      <BeyondCode />

      <div className="section-divider" />

      <Contact />

      <div className="section-divider" />

      <Footer />
    </main>
  )
}
