import Link from 'next/link'

export default function BlogNav() {
  return (
    <nav className="pb-nav" aria-label="Main">
      <Link className="brand" href="/" aria-label="Surya Prakash, home">
        <span className="bf">Surya Prakash</span><span className="bs">SP</span>
      </Link>
      {/* <Link className="nl opt" href="/#h-work">Work</Link> */}
      <Link className="nl opt" href="/#h-research">Research</Link>
      <Link className="nl opt" href="/#h-projects">Projects</Link>
      <Link className="nl on" href="/blogs">Blog</Link>
      <a className="np1" href="/SURYA-RESUME.pdf" target="_blank" rel="noopener">Resume</a>
      <Link className="np2" href="/#h-contact">Contact</Link>
    </nav>
  )
}
