import Link from 'next/link'
import { getPostList, isBuildPhase } from '@/lib/blogs'
import BlogIndex from '@/components/blog/BlogIndex'

// ISR: served from cache, regenerated at most every 5 min, and immediately after any
// create/update/delete (revalidatePath in /api/blogs).
export const revalidate = 300

async function loadPosts() {
  try {
    return await getPostList()
  } catch (err) {
    // Don't fail `next build` if the DB is unreachable from the build machine: ship an empty list
    // that fills in on the first revalidation. At runtime, rethrow so ISR keeps the last good page.
    if (!isBuildPhase()) throw err
    console.warn('[blogs] Database unreachable during build; /blogs will fill in on first revalidation.', err?.message)
    return []
  }
}

export default async function BlogsPage() {
  const posts = await loadPosts()
  return (
    <main className="pb-main">
      <div className="pb-wrap">
        <Link className="pb-back" href="/">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          Surya Prakash
        </Link>
        <h1 className="pb-h1">Writing</h1>
        <p className="pb-intro">Occasionally writing about systems, experiments, and things I&apos;m exploring.</p>
        <BlogIndex posts={posts} />
      </div>
    </main>
  )
}
