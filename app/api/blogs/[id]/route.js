import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { isAdmin } from '@/lib/auth'
import { errorResponseInit, getPostForEdit, isObjectId, pickPostFields, revalidateBlogs, validatePost } from '@/lib/blogs'

const NO_STORE = { 'Cache-Control': 'private, no-store' }

function fail(error, status, headers) {
  return NextResponse.json({ success: false, error }, { status, headers })
}

// Admin editor: the full post (content + original cover), always fresh.
export async function GET(request, { params }) {
  if (!isAdmin(request)) return fail('Unauthorized', 401, NO_STORE)
  const { id } = await params
  try {
    const post = await getPostForEdit(id)
    if (!post) return fail('Blog not found', 404, NO_STORE)
    return NextResponse.json({ success: true, data: post }, { headers: NO_STORE })
  } catch (error) {
    return fail(error.message, 500, NO_STORE)
  }
}

// Partial update with a field whitelist. Fields that are sent must be non-empty, so a stale or
// half-loaded form can never blank `content` (the schema validator enforces the same on update).
export async function PUT(request, { params }) {
  if (!isAdmin(request)) return fail('Unauthorized', 401)
  const { id } = await params
  if (!isObjectId(id)) return fail('Blog not found', 404)
  try {
    const update = pickPostFields(await request.json())
    const invalid = validatePost(update, { partial: true })
    if (invalid) return fail(invalid, 400)
    if (Object.keys(update).length === 0) return fail('Nothing to update.', 400)

    await connectToDatabase()
    const before = await Blog.findById(id, { slug: 1 }).lean()
    if (!before) return fail('Blog not found', 404)

    const blog = await Blog.findByIdAndUpdate(id, { $set: update }, { returnDocument: 'after', runValidators: true })
      .select('slug')
      .lean()
    if (!blog) return fail('Blog not found', 404)

    revalidateBlogs(before.slug, blog.slug)
    return NextResponse.json({ success: true, data: { _id: id, slug: blog.slug } })
  } catch (error) {
    const { status, message } = errorResponseInit(error)
    return fail(message, status)
  }
}

export async function DELETE(request, { params }) {
  if (!isAdmin(request)) return fail('Unauthorized', 401)
  const { id } = await params
  if (!isObjectId(id)) return fail('Blog not found', 404)
  try {
    await connectToDatabase()
    const deleted = await Blog.findByIdAndDelete(id).select('slug').lean()
    if (!deleted) return fail('Blog not found', 404)
    revalidateBlogs(deleted.slug)
    return NextResponse.json({ success: true, data: {} })
  } catch (error) {
    const { status, message } = errorResponseInit(error)
    return fail(message, status)
  }
}
