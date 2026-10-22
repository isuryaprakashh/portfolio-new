import { after } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import Blog from '@/models/Blog'
import { isObjectId } from '@/lib/blogs'

// View counter, hit by a navigator.sendBeacon() from the post page (once per tab session per post).
// Keeping this off the page render is what lets /blogs/[slug] be statically cached (ISR).
export async function POST(request, { params }) {
  const { id } = await params
  const site = request.headers.get('sec-fetch-site')
  if (isObjectId(id) && (!site || site === 'same-origin')) {
    after(async () => {
      try {
        await connectToDatabase()
        // timestamps:false so a view doesn't bump updatedAt (which versions the cover URL).
        await Blog.updateOne({ _id: id }, { $inc: { views: 1 } }, { timestamps: false })
      } catch {}
    })
  }
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
}
