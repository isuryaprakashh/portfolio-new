import connectToDatabase from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { notFound } from 'next/navigation'
import BlogMarkdown from '@/components/blog/BlogMarkdown'
import BlogShare from '@/components/blog/BlogShare'
import BlogProgress from '@/components/blog/BlogProgress'

export async function generateMetadata({ params }) {
  const { slug } = await params
  await connectToDatabase()
  const blog = await Blog.findOne({ slug })
  if (!blog) return { title: 'Not Found' }
  const description = blog.subtitle || blog.excerpt
  return {
    title: `${blog.title} — Surya Prakash`,
    description,
    openGraph: { title: blog.title, description, type: 'article', url: `/blogs/${blog.slug}`, ...(blog.coverImage && { images: [{ url: blog.coverImage }] }) },
    twitter: { card: blog.coverImage ? 'summary_large_image' : 'summary', title: blog.title, description, ...(blog.coverImage && { images: [blog.coverImage] }) },
  }
}

function readTime(text) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean).length
  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  await connectToDatabase()

  // live view counter
  const blog = await Blog.findOneAndUpdate({ slug }, { $inc: { views: 1 } }, { returnDocument: 'after' })
  if (!blog) notFound()

  let related = []
  if (blog.tags?.length) {
    related = await Blog.find({ _id: { $ne: blog._id }, tags: { $in: blog.tags } }).sort({ createdAt: -1 }).limit(3).select('title slug excerpt date')
  }
  if (related.length < 3) {
    const more = await Blog.find({ _id: { $ne: blog._id, $nin: related.map((p) => p._id) } }).sort({ createdAt: -1 }).limit(3 - related.length).select('title slug excerpt date')
    related = [...related, ...more]
  }

  return (
    <>
      <BlogProgress />
      <main className="pb-main">
        <article className="pb-wrap pb-art">
          <a className="pb-back" href="/blogs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            Writing
          </a>
          <h1>{blog.title}</h1>
          {blog.subtitle && <p className="pb-sub">{blog.subtitle}</p>}

          <div className="pb-artmeta">
            <span>{blog.date}</span>
            <span>{readTime(blog.content)}</span>
            <span className="vw">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7S2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
              {blog.views} views
            </span>
            <BlogShare title={blog.title} slug={blog.slug} />
          </div>

          {blog.tags?.length > 0 && (
            <div className="pb-chips" style={{ marginTop: 14 }}>
              {blog.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          )}

          {blog.coverImage && (
            <div className="pb-cover"><img src={blog.coverImage} alt="" /></div>
          )}

          <BlogMarkdown content={blog.content} />

          {related.length > 0 && (
            <section className="pb-related" aria-labelledby="more-writing">
              <h2 id="more-writing">More writing</h2>
              {related.map((r) => (
                <a key={r._id.toString()} className="pb-post" href={`/blogs/${r.slug}`}>
                  <span className="pb-line"><b>{r.title}</b><i className="pb-dl" /><span className="pb-meta">{r.date}</span></span>
                  <p>{r.excerpt}</p>
                </a>
              ))}
            </section>
          )}

          <p className="pb-thanks">Thanks for reading. <a href="/blogs">All writing</a></p>
        </article>
      </main>
    </>
  )
}
