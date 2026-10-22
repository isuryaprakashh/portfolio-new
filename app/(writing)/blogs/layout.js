const description = 'Thoughts on systems, experiments, AI, and things I\'m exploring.'

// A plain-string title here would drop the root '%s — Surya Prakash' template for every post below,
// so re-declare it (same for openGraph, which is replaced per segment, not merged).
export const metadata = {
  title: { default: 'Writing', template: '%s — Surya Prakash' },
  description,
  openGraph: {
    title: { default: 'Writing', template: '%s — Surya Prakash' },
    description,
    type: 'website',
    url: '/blogs',
  },
}

export default function BlogsLayout({ children }) {
  return children
}
