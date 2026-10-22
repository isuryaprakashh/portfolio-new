import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this blog.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug for this blog.'],
    unique: true,
  },
  date: {
    type: String, // E.g., '2026 · 05'
    required: [true, 'Please provide a date'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the blog content'],
    // Also runs on updates (runValidators), so an edit can never blank a post.
    validate: {
      validator: (v) => typeof v === 'string' && v.trim().length > 0,
      message: 'Blog content cannot be empty',
    },
  },
  readTime: {
    type: String,
    required: [true, 'Please provide the read time'],
  },
  // An http(s) URL, a /path, or (legacy + admin uploads) a base64 data URL.
  // Lists never read the base64; it is served as bytes by /api/blogs/[id]/cover.
  coverImage: {
    type: String,
    default: '',
  },
  subtitle: {
    type: String,
    default: '',
  },
  tags: {
    type: [String],
    default: [],
  },
  views: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
