'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  
  const [formData, setFormData] = useState({
    _id: '',
    title: '',
    slug: '',
    date: '',
    readTime: '',
    excerpt: '',
    content: '',
    tags: ''
  })
  
  const router = useRouter()

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    try {
      // Full documents (incl. content): the default list omits content, and editing from it would wipe posts.
      const res = await fetch('/api/blogs?full=true', { cache: 'no-store' })
      const data = await res.json()
      if (data.success) {
        setBlogs(data.data)
      }
    } catch (error) {
      console.error('Failed to fetch blogs', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Convert tags string back to array
    const submitData = {
      ...formData,
      tags: typeof formData.tags === 'string' 
        ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : formData.tags
    }

    const url = isEditing ? `/api/blogs/${formData._id}` : '/api/blogs'
    const method = isEditing ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })
      const data = await res.json()
      
      if (data.success) {
        resetForm()
        fetchBlogs()
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        fetchBlogs()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const editBlog = (blog) => {
    setFormData({
      ...blog,
      tags: blog.tags.join(', ')
    })
    setIsEditing(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const resetForm = () => {
    setFormData({ _id: '', title: '', slug: '', date: '', readTime: '', excerpt: '', content: '', tags: '' })
    setIsEditing(false)
  }

  const handleSeed = async () => {
    if (!confirm('This will add the 3 initial mock blogs to your database. Continue?')) return
    
    setLoading(true)
    const mockBlogs = [
      {
        title: 'Building Systems That Think',
        slug: 'building-systems-that-think',
        date: '2026 · 05',
        excerpt: 'Reflections on designing AI-powered architectures that balance intelligence with simplicity.',
        content: 'This is the full content of the blog. You can write Markdown or HTML here.',
        readTime: '5 min',
        tags: ['Systems', 'AI'],
      },
      {
        title: 'The Art of Immersive Interfaces',
        slug: 'the-art-of-immersive-interfaces',
        date: '2026 · 04',
        excerpt: 'How cinematic design principles can transform web experiences beyond the ordinary.',
        content: 'This is the full content of the blog. You can write Markdown or HTML here.',
        readTime: '4 min',
        tags: ['Design', 'Web'],
      },
      {
        title: 'From Hackathon to Production',
        slug: 'from-hackathon-to-production',
        date: '2026 · 03',
        excerpt: 'Lessons learned from turning rapid prototypes into systems that scale and sustain.',
        content: 'This is the full content of the blog. You can write Markdown or HTML here.',
        readTime: '6 min',
        tags: ['Engineering', 'Lessons'],
      }
    ]

    try {
      for (const blog of mockBlogs) {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blog)
        })
      }
      fetchBlogs()
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="min-h-screen pt-32 flex justify-center"><div className="contact-spinner border-[var(--color-primary)]"></div></div>
  }

  return (
    <main className="min-h-screen pt-32 pb-16 px-6">
      <div className="container-main">
        <div className="flex justify-between items-center mb-10 border-b border-[var(--color-border)] pb-6">
          <h1 className="text-heading">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/blogs" className="btn-glow !h-10 !px-6 !text-xs">View Blogs</Link>
            <button onClick={handleLogout} className="btn-primary !h-10 !px-6 !text-xs !bg-red-500 hover:!bg-red-600">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="card sticky top-32">
              <h2 className="text-subheading mb-6">{isEditing ? 'Edit Blog' : 'Create New Blog'}</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input required placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="contact-input !p-3 !text-xs" />
                <input required placeholder="Slug (e.g. my-first-blog)" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="contact-input !p-3 !text-xs" />
                <div className="flex gap-2">
                  <input required placeholder="Date (e.g. 2026 · 05)" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="contact-input !p-3 !text-xs w-1/2" />
                  <input required placeholder="Read Time (e.g. 5 min)" value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} className="contact-input !p-3 !text-xs w-1/2" />
                </div>
                <input placeholder="Tags (comma separated)" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="contact-input !p-3 !text-xs" />
                <textarea required placeholder="Excerpt (Short summary)" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="contact-input contact-textarea !min-h-[80px] !p-3 !text-xs" />
                <textarea required placeholder="Full Content (Markdown/HTML)" value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="contact-input contact-textarea !min-h-[200px] !p-3 !text-xs" />
                
                <div className="flex gap-2 mt-2">
                  <button type="submit" className="btn-primary flex-1 !h-10 !text-xs">
                    {isEditing ? 'Update Blog' : 'Publish Blog'}
                  </button>
                  {isEditing && (
                    <button type="button" onClick={resetForm} className="btn-primary !h-10 !bg-[var(--color-card-bg-alt)] !text-[var(--color-deep-ink)] hover:!bg-[var(--color-border)] !text-xs">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <h2 className="text-subheading mb-6">Manage Blogs ({blogs.length})</h2>
            <div className="flex flex-col gap-4">
              {blogs.map(blog => (
                <div key={blog._id} className="card !p-5 flex justify-between items-center group">
                  <div>
                    <h3 className="font-medium text-[15px]">{blog.title}</h3>
                    <p className="text-[12px] text-[var(--color-text-muted)] mt-1">{blog.date} • {blog.readTime}</p>
                  </div>
                  <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => editBlog(blog)} className="text-[12px] text-[var(--color-primary)] hover:underline">Edit</button>
                    <button onClick={() => handleDelete(blog._id)} className="text-[12px] text-red-500 hover:underline">Delete</button>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && (
                <div className="text-center py-10 border border-dashed border-[var(--color-border)] rounded-2xl flex flex-col items-center gap-4">
                  <p className="text-[13px] text-[var(--color-text-muted)]">Your database is currently empty.</p>
                  <button onClick={handleSeed} className="btn-primary !h-9 !px-5 !text-xs">
                    Seed Initial Mock Blogs
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
