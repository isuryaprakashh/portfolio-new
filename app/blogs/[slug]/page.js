import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButton from '@/components/ShareButton';

// Dynamic SEO & Open Graph Tags
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug: resolvedParams.slug });
  
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: `${blog.title} | Portfolio`,
    description: blog.subtitle || blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.subtitle || blog.excerpt,
      type: 'article',
      url: `/blogs/${blog.slug}`,
      ...(blog.coverImage && { images: [{ url: blog.coverImage }] }),
    },
    twitter: {
      card: blog.coverImage ? 'summary_large_image' : 'summary',
      title: blog.title,
      description: blog.subtitle || blog.excerpt,
      ...(blog.coverImage && { images: [blog.coverImage] }),
    }
  };
}

// Reading time calculator
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  await connectToDatabase();
  
  // Live View Counter
  const blog = await Blog.findOneAndUpdate(
    { slug: resolvedParams.slug },
    { $inc: { views: 1 } },
    { returnDocument: 'after' }
  );

  if (!blog) {
    notFound();
  }

  const actualReadTime = calculateReadingTime(blog.content);

  // Fetch related posts (same tags, excluding current)
  let relatedPosts = [];
  if (blog.tags && blog.tags.length > 0) {
    relatedPosts = await Blog.find({
      _id: { $ne: blog._id },
      tags: { $in: blog.tags }
    })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('title slug excerpt date tags content');
  }

  // If not enough related posts, fill with recent posts
  if (relatedPosts.length < 2) {
    const additionalPosts = await Blog.find({
      _id: { $ne: blog._id, $nin: relatedPosts.map(p => p._id) }
    })
      .sort({ createdAt: -1 })
      .limit(3 - relatedPosts.length)
      .select('title slug excerpt date tags content');
    relatedPosts = [...relatedPosts, ...additionalPosts];
  }

  return (
    <>
      <ReadingProgress />
      <main className="min-h-screen pt-32 pb-16">
        <div className="container-narrow">
          <Reveal>
            <Link
              href="/blogs"
              className="text-[12px] tracking-[0.06em] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors duration-300 inline-block mb-16"
            >
              ← Back to writings
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <header className="mb-12">
              {/* Title */}
              <h1 className="blog-detail-title">{blog.title}</h1>
              
              {/* Subtitle */}
              {blog.subtitle && (
                <p className="blog-detail-subtitle">{blog.subtitle}</p>
              )}

              {/* Meta info */}
              <div className="blog-detail-meta">
                <span className="blog-detail-meta-item">
                  {blog.date}
                </span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--color-text-muted)', opacity: 0.5 }} />
                <span className="blog-detail-meta-item">
                  {actualReadTime}
                </span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--color-text-muted)', opacity: 0.5 }} />
                <span className="blog-detail-meta-item">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {blog.views} views
                </span>

                {/* Share button */}
                <div style={{ marginLeft: 'auto' }}>
                  <ShareButton title={blog.title} slug={blog.slug} />
                </div>
              </div>

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        padding: '4px 14px',
                        borderRadius: '100px',
                        border: '1px solid var(--color-border)',
                        color: 'var(--color-text-secondary)',
                        background: 'transparent',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </header>
          </Reveal>

          {/* Cover Image */}
          {blog.coverImage && (
            <Reveal delay={0.15}>
              <div className="blog-detail-hero">
                <img src={blog.coverImage} alt={blog.title} />
              </div>
            </Reveal>
          )}

          {/* Article Content */}
          <Reveal delay={0.2}>
            <article className="blog-content-medium">
              <MarkdownRenderer content={blog.content} />
            </article>
          </Reveal>

          {/* Article Footer */}
          <Reveal delay={0.3}>
            <div className="mt-24 pt-10 border-t border-[var(--color-border)]">
              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mb-16">
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--color-deep-ink)',
                    marginBottom: '8px',
                  }}>
                    More writings
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-text-muted)',
                    marginBottom: '24px',
                  }}>
                    Continue exploring related thoughts and experiments.
                  </p>
                  <div className="related-posts-grid">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related._id.toString()}
                        href={`/blogs/${related.slug}`}
                        className="related-post-card"
                      >
                        <h4 className="related-post-title">{related.title}</h4>
                        <p className="related-post-excerpt">{related.excerpt}</p>
                        <div className="related-post-meta">
                          <span>{related.date}</span>
                          <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--color-text-muted)', opacity: 0.5 }} />
                          <span>{calculateReadingTime(related.content)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom CTA */}
              <div className="text-center py-8">
                <p className="text-[14px] text-[var(--color-text-muted)] mb-6">Thanks for reading.</p>
                <Link
                  href="/blogs"
                  className="text-[12px] tracking-[0.08em] uppercase text-black hover:text-[var(--color-primary)] transition-colors"
                >
                  Read more writings →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
    </>
  );
}
