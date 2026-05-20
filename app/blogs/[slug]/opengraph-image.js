import { ImageResponse } from 'next/og';
import connectToDatabase from '@/lib/mongodb';
import Blog from '@/models/Blog';

export const alt = 'Surya Prakash Portfolio - Blog Post';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }) {
  // In Next.js 16+, params is a Promise
  const { slug } = await params;
  
  await connectToDatabase();
  const blog = await Blog.findOne({ slug });

  // Fallback title if blog not found
  const title = blog ? blog.title : 'Blog Post Not Found';
  const date = blog ? blog.date : 'Unknown Date';
  const tags = blog && blog.tags ? blog.tags : [];

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#f5f5f7', // Apple-esque soft grey background
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <p
            style={{
              color: '#86868b', // Apple muted grey
              fontSize: 28,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              margin: 0,
              fontWeight: 500,
            }}
          >
            Surya Prakash / Writings
          </p>
          <h1
            style={{
              color: '#1d1d1f', // Apple dark grey/black
              fontSize: 76,
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.1,
              maxWidth: '960px',
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </h1>
        </div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ color: '#86868b', fontSize: 32, fontWeight: 400 }}>{date}</span>
            {blog && blog.views !== undefined && (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d2d2d7' }}></span>
                <span style={{ color: '#86868b', fontSize: 32, fontWeight: 400 }}>{blog.views} views</span>
              </>
            )}
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                style={{
                  color: '#1d1d1f',
                  fontSize: 24,
                  padding: '8px 24px',
                  border: '2px solid #d2d2d7',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
