import { ImageResponse } from 'next/og'
import { getOgPost, parseDataUrl } from '@/lib/blogs'
import { SITE_URL } from '@/components/blog/utils'

export const alt = 'Surya Prakash — Writing'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// Cached like the page; edits invalidate it via revalidatePath('/(writing)/blogs/[slug]', 'layout').
export const revalidate = 3600

const C = { bg: '#FAFAF9', ink: '#1F2328', muted: '#6B7078', faint: '#A3A7AD', dots: '#CDD0D4', chip: '#F0F0EE', pill: '#16171A' }

const clip = (s, n) => {
  const t = String(s || '').trim()
  return t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t
}

// Satori (next/og) can only embed PNG, JPEG and GIF. WebP/AVIF covers are skipped: the card stays text-only.
function embeddable(buf) {
  if (!buf || buf.length < 4 || buf.length > 5_000_000) return false
  const png = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47
  const jpg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff
  const gif = buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46
  return png || jpg || gif
}

async function loadCover(cover) {
  try {
    let buf = null
    if (cover.startsWith('data:')) {
      buf = parseDataUrl(cover)?.bytes || null
    } else if (/^https?:\/\//i.test(cover) || (cover.startsWith('/') && !cover.startsWith('/api/'))) {
      const res = await fetch(cover.startsWith('/') ? `${SITE_URL}${cover}` : cover, { signal: AbortSignal.timeout(4000) })
      if (res.ok) buf = Buffer.from(await res.arrayBuffer())
    }
    if (!embeddable(buf)) return null
    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  } catch {
    return null
  }
}

export default async function Image({ params }) {
  const { slug } = await params
  let post = null
  try {
    post = await getOgPost(slug)
  } catch {}

  const title = clip(post?.title || 'Writing', 110)
  const sub = clip(post?.subtitle || post?.excerpt || 'Notes on systems, experiments, AI, and things I’m exploring.', 150)
  const meta = [post?.date, post?.readTime].filter(Boolean).join(' · ')
  const tags = (post?.tags || []).slice(0, 3)
  const cover = post?.coverImage ? await loadCover(post.coverImage) : null
  const titleSize = title.length > 70 ? 50 : title.length > 40 ? 60 : 72

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: C.bg, color: C.ink, padding: 64 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', padding: '10px 22px', borderRadius: 999, background: C.pill, color: '#fff', fontSize: 26 }}>
              Surya Prakash
            </div>
            <div style={{ display: 'flex', fontSize: 26, color: C.muted }}>Writing</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: cover ? titleSize - 8 : titleSize, lineHeight: 1.12, letterSpacing: '-0.03em', color: C.ink }}>
              {title}
            </div>
            <div style={{ display: 'flex', marginTop: 22, fontSize: cover ? 26 : 30, lineHeight: 1.4, color: C.muted }}>{sub}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 24, borderTop: `2px dashed ${C.dots}`, fontSize: 24, color: C.muted }}>
            {meta && <div style={{ display: 'flex' }}>{meta}</div>}
            {tags.map((t) => (
              <div key={t} style={{ display: 'flex', padding: '6px 16px', borderRadius: 999, background: C.chip, fontSize: 20 }}>{t}</div>
            ))}
            <div style={{ display: 'flex', marginLeft: 'auto', color: C.faint }}>suryaprakash.me</div>
          </div>
        </div>

        {cover && (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            src={cover}
            width={400}
            height={502}
            style={{ marginLeft: 48, width: 400, height: 502, objectFit: 'cover', borderRadius: 24, border: `1px solid ${C.dots}` }}
          />
        )}
      </div>
    ),
    { ...size }
  )
}
