'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function BlogMarkdown({ content }) {
  return (
    <div className="pb-md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter {...props} style={vscDarkPlus} language={match[1]} PreTag="pre">
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code {...props}>{children}</code>
            )
          },
          a: ({ node, ...props }) => <a {...props} target={props.href?.startsWith('http') ? '_blank' : undefined} rel="noopener" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
