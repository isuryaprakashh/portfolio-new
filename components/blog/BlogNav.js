export default function BlogNav() {
  return (
    <nav className="pb-nav" aria-label="Main">
      <a className="brand" href="/" aria-label="Surya Prakash, home">
        <span className="bf">Surya Prakash</span><span className="bs">SP</span>
      </a>
      <a className="nl opt" href="/#h-work">Work</a>
      <a className="nl opt" href="/#h-research">Research</a>
      <a className="nl opt" href="/#h-projects">Projects</a>
      <a className="nl on" href="/blogs">Blog</a>
      <a className="np1" href="/SURYA-RESUME.pdf" target="_blank" rel="noopener">Resume</a>
      <a className="np2" href="/#h-contact">Contact</a>
    </nav>
  )
}
