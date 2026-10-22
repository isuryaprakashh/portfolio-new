import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blogs'
import { readTime } from '@/components/blog/utils'
import BlogMarkdown from '@/components/blog/BlogMarkdown'
import BlogShare from '@/components/blog/BlogShare'
import BlogProgress from '@/components/blog/BlogProgress'
import ViewBeacon from '@/components/blog/ViewBeacon'

// ISR: prerendered at build, regenerated at most every 5 min and right after an edit
// (revalidatePath in /api/blogs). The view count shown can lag by up to one period.
export const revalidate = 300

export async function generateStaticParams() {
  try {
    return (await getAllSlugs()).map((slug) => ({ slug }))
  } catch (err) {
    // DB unreachable at build: prerender nothing; every post renders (and is cached) on first visit.
    console.warn('[blogs] generateStaticParams: database unreachable, posts will render on demand.', err?.message)
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Not found' }
  const description = post.subtitle || post.excerpt
  const url = `/blogs/${post.slug}`
  // The title template (blogs/layout.js) adds " — Surya Prakash". og:image / twitter:image come from
  // ./opengraph-image.js (never the stored cover data URL); twitter title/description inherit from openGraph.
  return {
    title: post.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      siteName: 'Surya Prakash',
      authors: ['Surya Prakash'],
      publishedTime: post.publishedAt,
      modifiedTime: post.modifiedAt,
      tags: post.tags,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()
  const related = await getRelatedPosts(post).catch(() => [])

  return (
    <>
      <BlogProgress />
      <ViewBeacon id={post._id} />
      <main className="pb-main">
        <article className="pb-wrap pb-art">
          <Link className="pb-back" href="/blogs">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
            Writing
          </Link>
          <h1>{post.title}</h1>
          {post.subtitle && <p className="pb-sub">{post.subtitle}</p>}

          <div className="pb-artmeta">
            <span>{post.date}</span>
            <span>{readTime(post.content)}</span>
            <span className="vw">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7S2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
              {post.views} {post.views === 1 ? 'view' : 'views'}
            </span>
            <BlogShare title={post.title} slug={post.slug} />
          </div>

          {post.tags.length > 0 && (
            <div className="pb-chips pb-art-tags">
              {post.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
          )}

          {post.cover && (
            <div className="pb-cover">
              <img src={post.cover} alt="" width={1600} height={900} decoding="async" fetchPriority="high" />
            </div>
          )}

          <BlogMarkdown content={post.content} />

          {related.length > 0 && (
            <section className="pb-related" aria-labelledby="more-writing">
              <h2 id="more-writing">More writing</h2>
              {related.map((r) => (
                <Link key={r._id} className="pb-post" href={`/blogs/${r.slug}`}>
                  <span className="pb-line"><b>{r.title}</b><i className="pb-dl" /><span className="pb-meta">{r.date}</span></span>
                  <p>{r.excerpt}</p>
                </Link>
              ))}
            </section>
          )}

          <p className="pb-thanks">Thanks for reading. <Link href="/blogs">All writing</Link></p>
        </article>
      </main>
    </>
  )
}
