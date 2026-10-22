import Link from 'next/link'
import './blog.css'
import BlogNav from '@/components/blog/BlogNav'

// Writing pages share the pixel home's look: pill navbar, Geist type, light + AMOLED dark.
export default function WritingLayout({ children }) {
  return (
    <div className="pb">
      <BlogNav />
      {children}
      <footer className="pb-foot">
        <div className="pb-wrap pb-footrow">
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
