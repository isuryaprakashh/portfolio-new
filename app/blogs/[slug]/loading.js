export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-16">
      <div className="container-narrow">
        <div className="mb-16">
          <div className="h-4 w-24 bg-[var(--color-border)] rounded animate-pulse"></div>
        </div>

        <header className="mb-16 border-b border-[var(--color-border)] pb-12">
          {/* Title Skeleton */}
          <div className="h-[48px] md:h-[64px] bg-[var(--color-border)] rounded-xl w-3/4 mb-4 animate-pulse"></div>
          <div className="h-[48px] md:h-[64px] bg-[var(--color-border)] rounded-xl w-1/2 mb-8 animate-pulse"></div>
          
          {/* Metadata Skeleton */}
          <div className="flex gap-4 items-center mb-8">
            <div className="h-3 w-16 bg-[var(--color-border)] rounded animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-[var(--color-border)]"></div>
            <div className="h-3 w-16 bg-[var(--color-border)] rounded animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-[var(--color-border)]"></div>
            <div className="h-3 w-20 bg-[var(--color-border)] rounded animate-pulse"></div>
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2">
            <div className="h-7 w-16 bg-[var(--color-border)] rounded-full animate-pulse"></div>
            <div className="h-7 w-20 bg-[var(--color-border)] rounded-full animate-pulse"></div>
            <div className="h-7 w-14 bg-[var(--color-border)] rounded-full animate-pulse"></div>
          </div>
        </header>

        {/* Content Skeleton */}
        <article className="max-w-none">
          <div className="space-y-4 mb-10">
            <div className="h-4 bg-[var(--color-border)] rounded w-full animate-pulse"></div>
            <div className="h-4 bg-[var(--color-border)] rounded w-11/12 animate-pulse"></div>
            <div className="h-4 bg-[var(--color-border)] rounded w-full animate-pulse"></div>
            <div className="h-4 bg-[var(--color-border)] rounded w-4/5 animate-pulse"></div>
          </div>
          
          <div className="space-y-4 mb-10">
            <div className="h-4 bg-[var(--color-border)] rounded w-full animate-pulse"></div>
            <div className="h-4 bg-[var(--color-border)] rounded w-11/12 animate-pulse"></div>
            <div className="h-4 bg-[var(--color-border)] rounded w-3/4 animate-pulse"></div>
          </div>
          
          {/* Code block skeleton */}
          <div className="h-48 bg-[var(--color-border)] opacity-60 rounded-xl w-full mb-10 animate-pulse"></div>
          
          <div className="space-y-4">
            <div className="h-4 bg-[var(--color-border)] rounded w-full animate-pulse"></div>
            <div className="h-4 bg-[var(--color-border)] rounded w-5/6 animate-pulse"></div>
          </div>
        </article>
      </div>
    </main>
  );
}
