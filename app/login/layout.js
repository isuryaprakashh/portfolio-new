import Link from 'next/link'
import './login.css'

export const metadata = {
  title: 'Sign in',
  description: 'Admin sign-in for managing writing and site content.',
  robots: { index: false, follow: false },
}

// Same chrome as the writing pages: dark pill nav on top, quiet footer below.
export default function LoginLayout({ children }) {
  return (
    <div className="login">
      <nav className="login-nav" aria-label="Main">
        <Link className="brand" href="/" aria-label="Surya Prakash, home">
          <span className="bf">Surya Prakash</span><span className="bs">SP</span>
        </Link>
        <Link className="nl opt" href="/#h-research">Research</Link>
        <Link className="nl opt" href="/#h-projects">Projects</Link>
        <Link className="nl" href="/blogs">Blog</Link>
        <a className="np1" href="/SURYA-RESUME.pdf" target="_blank" rel="noopener">Resume</a>
        <Link className="np2" href="/#h-contact">Contact</Link>
      </nav>

      {children}

      <footer className="login-foot">
        <div className="login-footrow">
          <span>© 2026 Surya Prakash</span>
          <nav aria-label="Footer">
            <Link href="/">Home</Link>
            <a href="https://github.com/isuryaprakashh" target="_blank" rel="noopener">GitHub</a>
            <a href="https://linkedin.com/in/isuryaprakashh" target="_blank" rel="noopener">LinkedIn</a>
            <a href="https://x.com/isuryaprakashh" target="_blank" rel="noopener">X</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
