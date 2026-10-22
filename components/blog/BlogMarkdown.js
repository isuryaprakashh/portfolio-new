// Server Component: markdown → HTML on the server (react-markdown's sync renderer has no hooks).
// Raw HTML in posts is not rendered (no rehype-raw), so post content can't inject markup.
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import CodeBlock from './CodeBlock'

function text(node) {
  if (!node) return ''
  if (node.type === 'text') return node.value
  return (node.children || []).map(text).join('')
}

const components = {
  // Fenced code arrives as <pre><code class="language-x">. Replace the whole <pre> (react-markdown v10
  // has no `inline` prop), so we never emit <pre><pre>. Inline `code` keeps the default renderer.
  pre({ node, children, ...props }) {
    const code = node?.children?.find((c) => c.type === 'element' && c.tagName === 'code')
    if (!code) return <pre {...props}>{children}</pre>
    const cls = [].concat(code.properties?.className || []).map(String)
    const language = cls.find((c) => c.startsWith('language-'))?.slice(9)
    return <CodeBlock language={language} code={text(code).replace(/\n$/, '')} />
  },
  img({ node, alt, ...props }) {
    return <img {...props} alt={alt || ''} loading="lazy" decoding="async" className="pb-md-img" />
  },
  a({ node, href, ...props }) {
    const external = /^https?:\/\//i.test(href || '')
    return <a {...props} href={href} {...(external && { target: '_blank', rel: 'noopener' })} />
  },
}

export default function BlogMarkdown({ content }) {
  return (
    <div className="pb-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
