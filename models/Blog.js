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
  },
  readTime: {
    type: String,
    required: [true, 'Please provide the read time'],
  },
  tags: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
