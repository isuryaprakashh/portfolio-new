import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/Reveal';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// 5. Dynamic SEO & Open Graph Tags
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug: resolvedParams.slug });
  
  if (!blog) return { title: 'Not Found' };
  
  return {
    title: `${blog.title} | Portfolio`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `/blogs/${blog.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
    }
  };
}

// 3. Estimated Reading Time Calculator
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wordsPerMinute);
  return `${time} min read`;
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  await connectToDatabase();
  
  // 1. Live View Counter (Find and increment simultaneously)
  const blog = await Blog.findOneAndUpdate(
    { slug: resolvedParams.slug },
    { $inc: { views: 1 } },
    { returnDocument: 'after' }
  );

  if (!blog) {
    notFound();
  }

  const actualReadTime = calculateReadingTime(blog.content);

  return (
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
          <header className="mb-16 border-b border-[var(--color-border)] pb-12">
            <h1 className="text-display text-black mb-6 leading-tight">{blog.title}</h1>
            
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <span className="text-[12px] tracking-[0.08em] text-[var(--color-text-muted)]">
                {blog.date}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
              <span className="text-[12px] tracking-[0.06em] text-[var(--color-text-muted)]">
                {actualReadTime}
              </span>
              <span className="w-1 h-1 rounded-full bg-[var(--color-border)]"></span>
              <span className="text-[12px] tracking-[0.06em] text-[var(--color-text-muted)] flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {blog.views} views
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.08em] uppercase text-[var(--color-text-muted)] px-3 py-1.5 border border-[rgba(0,0,0,0.15)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.2}>
          <article className="prose prose-lg max-w-none text-body leading-relaxed">
            {/* 4. Full Markdown Rendering with Syntax Highlighting */}
            <MarkdownRenderer content={blog.content} />
          </article>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-24 pt-10 border-t border-[var(--color-border)] text-center">
            <p className="text-[14px] text-[var(--color-text-muted)] mb-6">Thanks for reading.</p>
            <Link
              href="/blogs"
              className="text-[12px] tracking-[0.08em] uppercase text-black hover:text-[var(--color-primary)] transition-colors"
            >
              Read more writings →
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
