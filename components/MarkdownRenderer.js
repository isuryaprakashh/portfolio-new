'use client'

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function MarkdownRenderer({ content }) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({node, inline, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, '')}
                style={vscDarkPlus}
                language={match[1]}
                PreTag="div"
                className="rounded-md my-4 text-sm"
              />
            ) : (
              <code {...props} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm text-[var(--color-primary)]">
                {children}
              </code>
            )
          },
          h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4 text-black" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-black" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-6 mb-3 text-black" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
          ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
          li: ({node, ...props}) => <li className="text-body" {...props} />,
          a: ({node, ...props}) => <a className="text-[var(--color-primary)] hover:underline" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[var(--color-primary)] pl-4 italic my-4 text-gray-600" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
