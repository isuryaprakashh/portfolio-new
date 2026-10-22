// Server Component: highlighting happens at render time, so no Prism code ships to the browser.
// PrismLight (refractor core) has no hooks or browser APIs; only the languages registered below are bundled.
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import java from 'react-syntax-highlighter/dist/esm/languages/prism/java'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import CopyCode from './CopyCode'

const LANGS = { javascript, jsx, typescript, tsx, python, java, bash, json, css, markup, sql, yaml }
for (const [name, lang] of Object.entries(LANGS)) SyntaxHighlighter.registerLanguage(name, lang)

const ALIASES = {
  js: 'javascript', mjs: 'javascript', cjs: 'javascript', ts: 'typescript', py: 'python',
  sh: 'bash', shell: 'bash', zsh: 'bash', console: 'bash', html: 'markup', xml: 'markup', svg: 'markup', yml: 'yaml',
}

function resolve(lang) {
  const l = String(lang || '').toLowerCase()
  if (LANGS[l]) return l
  return ALIASES[l] || null
}

export default function CodeBlock({ language, code }) {
  const lang = resolve(language)
  return (
    <div className="pb-code">
      <div className="pb-code-bar">
        <span>{language || 'text'}</span>
        <CopyCode />
      </div>
      {lang ? (
        <SyntaxHighlighter
          language={lang}
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: 0, padding: '16px 18px', fontSize: 14, lineHeight: 1.6, fontFamily: 'var(--mono)', background: '#1e1e1e' }}
          codeTagProps={{ className: `language-${lang}`, style: { fontFamily: 'inherit', fontSize: 'inherit', lineHeight: 'inherit' } }}
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <pre className="pb-pre"><code>{code}</code></pre>
      )}
    </div>
  )
}
