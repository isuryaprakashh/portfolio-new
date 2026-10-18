import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';

export async function PUT(request, { params }) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const resolvedParams = await params;
    await connectToDatabase();
    const { id } = resolvedParams;
    const body = await request.json();
    
    const blog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    if (!isAdmin(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const resolvedParams = await params;
    await connectToDatabase();
    const { id } = resolvedParams;
    
    const deletedBlog = await Blog.deleteOne({ _id: id });
    
    if (!deletedBlog || deletedBlog.deletedCount === 0) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
