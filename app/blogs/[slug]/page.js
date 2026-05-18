import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/Reveal';

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  await connectToDatabase();
  const blog = await Blog.findOne({ slug: resolvedParams.slug });

  if (!blog) {
    notFound();
  }

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
                {blog.readTime} read
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[0.08em] uppercase text-[var(--color-text-muted)] px-3 py-1.5 border border-[var(--color-border)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>
        </Reveal>

        <Reveal delay={0.2}>
          <article className="prose prose-lg max-w-none text-body leading-relaxed">
            {/* Extremely simple Markdown/HTML renderer for now. If you use real Markdown, we can add react-markdown later */}
            <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }} />
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
