import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { isAdmin } from '@/lib/auth'
import { errorResponseInit, getPostList, pickPostFields, revalidateBlogs, validatePost } from '@/lib/blogs'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'private, no-store' }

// Public: lightweight list (title, slug, excerpt, date, readTime, tags, cover URL). Used by the pixel home.
// Admin-only `?full=true`: raw documents for the legacy /admin editor. Never cached anywhere.
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const limit = Math.min(Math.max(parseInt(searchParams.get('limit'), 10) || 0, 0), 100)

  if (searchParams.get('full') === 'true') {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401, headers: NO_STORE })
    }
    try {
      await connectToDatabase()
      let query = Blog.find({}).sort({ createdAt: -1 })
      if (limit > 0) query = query.limit(limit)
      const data = await query.lean()
      return NextResponse.json({ success: true, data }, { headers: NO_STORE })
    } catch (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500, headers: NO_STORE })
    }
  }

  try {
    const data = await getPostList({ limit })
    return NextResponse.json(
      { success: true, data },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
    )
  } catch {
    return NextResponse.json({ success: false, error: 'Could not load posts' }, { status: 500, headers: NO_STORE })
  }
}

export async function POST(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = pickPostFields(await request.json())
    const invalid = validatePost(data)
    if (invalid) return NextResponse.json({ success: false, error: invalid }, { status: 400 })

    await connectToDatabase()
    const blog = await Blog.create(data)
    revalidateBlogs(blog.slug)
    return NextResponse.json({ success: true, data: { _id: String(blog._id), slug: blog.slug } }, { status: 201 })
  } catch (error) {
    const { status, message } = errorResponseInit(error)
    return NextResponse.json({ success: false, error: message }, { status })
  }
}
