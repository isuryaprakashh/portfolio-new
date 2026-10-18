// Seeds the starter blog posts into MongoDB.
// Usage (from the repo root):  npm run seed:blogs
// Reads MONGODB_URI from .env.local or .env. Posts are upserted by slug,
// so running it twice won't create duplicates and won't reset view counts.
import fs from 'node:fs'
import path from 'node:path'
import mongoose from 'mongoose'

for (const f of ['.env.local', '.env']) {
  const p = path.resolve(process.cwd(), f)
  if (!fs.existsSync(p)) continue
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
}

const uri = process.env.MONGODB_URI
if (!uri) {
  console.error('MONGODB_URI is not set. Add it to .env.local (or .env) and try again.')
  process.exit(1)
}

const posts = JSON.parse(fs.readFileSync(new URL('./blogs-seed.json', import.meta.url), 'utf8'))

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  slug: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  readTime: { type: String, required: true },
  coverImage: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  tags: { type: [String], default: [] },
  views: { type: Number, default: 0 },
}, { timestamps: true })
const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema)

await mongoose.connect(uri, { bufferCommands: false })
let created = 0, updated = 0
// insert oldest first so the first post in the file shows as the newest
for (const post of [...posts].reverse()) {
  const res = await Blog.updateOne({ slug: post.slug }, { $set: post }, { upsert: true, runValidators: true })
  if (res.upsertedCount) created++
  else updated++
  console.log(`${res.upsertedCount ? 'created' : 'updated'}  ${post.slug}`)
}
console.log(`Done: ${created} created, ${updated} updated.`)
await mongoose.disconnect()
