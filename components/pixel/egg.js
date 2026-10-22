// sp-os: an easter egg hidden in the meadow's computer.
//
// Click the computer once and it says hi. Click again and a small terminal
// window pops up over the meadow (which keeps animating behind it). `exit` (or
// Esc) closes it. The terminal is CLI-only: every command just prints text.
//
// initPixel lazy-loads this file on the first click that hits the computer:
//   const egg = (await import('./egg')).default(api); egg.click()
// and calls egg.click() again on every later computer click.
// api: { root, meadow, meadowCanvas, skyCanvas, computerRect(), screenRect(),
//        setMeadowPaused(bool), reduceMotion, tod, projects, signal }
import './egg.css'

const HINT = 'click one more time and see what happens'
const EMAIL = 'isurya2005@gmail.com'
const SITE = 'suryaprakash.me'
const RESUME = 'www.suryaprakash.me/SURYA-RESUME.pdf'
const SOCIALS = [
  ['github', 'github.com/isuryaprakashh'],
  ['linkedin', 'linkedin.com/in/isuryaprakashh'],
  ['x', 'x.com/isuryaprakashh'],
]
const ARM_MS = 8000 // how long the bubble waits for the second click
const POP_MS = 280 // the site's dialog pop
const CLOSE_MS = 180

// --- small helpers -----------------------------------------------------------
function h(tag, cls, html) {
  const n = document.createElement(tag)
  if (cls) n.className = cls
  if (html != null) n.innerHTML = html
  return n
}
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])
}
function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v))
}
function bare(u) {
  return String(u || '').replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '')
}
function niceDate(d) {
  const s = String(d || '')
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    const t = new Date(s)
    if (!isNaN(t)) return t.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }
  return s
}

export default function initEgg(api) {
  const { meadow, signal } = api || {}
  const noop = { click() {} }
  if (!meadow || typeof document === 'undefined' || (signal && signal.aborted)) return noop

  const reduce = !!api.reduceMotion || (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches)
  const fine = () => typeof matchMedia === 'function' && matchMedia('(hover: hover) and (pointer: fine)').matches

  let state = 'idle' // idle | armed | in | term | out
  let gen = 0 // bumps on every phase change; stale timers and frames check it
  let dead = false
  let lastClick = -1e9
  let ui = {} // bubble, ping, hit while armed
  let term = null
  const timers = new Set()
  const life = new AbortController()

  const layer = h('div', 'egg-layer')
  meadow.appendChild(layer)

  function after(fn, ms) {
    const id = setTimeout(() => {
      timers.delete(id)
      if (!dead) fn()
    }, ms)
    timers.add(id)
    return id
  }
  function later(fn, ms) {
    const g = gen
    return after(() => {
      if (g === gen) fn()
    }, ms)
  }
  // Resolves after ms, or never if the phase changes first (the awaiting code just stops).
  const wait = (ms) => new Promise((res) => later(res, ms))
  function phase(s) {
    state = s
    gen++
  }
  function monitor() {
    try {
      return api.computerRect()
    } catch (e) {
      return null
    }
  }

  // --- click 1: the computer speaks -------------------------------------------
  function click() {
    if (dead) return
    const now = performance.now()
    if (now - lastClick < 260) return // double-delivered or double-tapped
    lastClick = now
    if (state === 'idle') arm()
    else if (state === 'armed') enter()
  }

  function arm() {
    phase('armed')
    dropHint(true)
    const ping = h('div', 'egg-ping')
    const hit = h('button', 'egg-hit')
    hit.type = 'button'
    hit.setAttribute('aria-label', 'Click the computer again')
    const bubble = h('div', 'egg-tip')
    bubble.setAttribute('role', 'status')
    const chars = Array.from(HINT).map((ch) => '<span class="egg-ch">' + esc(ch) + '</span>').join('')
    bubble.innerHTML =
      '<span class="egg-who" aria-hidden="true"><i class="egg-dot"></i>Ai</span>' +
      '<span class="egg-msg" aria-hidden="true"><span class="egg-ch egg-lead on egg-at"></span>' + chars + '</span>' +
      '<span class="egg-sr"></span><i class="egg-tail" aria-hidden="true"></i>' +
      '<span class="egg-warm" aria-hidden="true">sp-os</span>' // starts the mono font download early
    const poke = (e) => {
      e.preventDefault()
      e.stopPropagation()
      click()
    }
    hit.addEventListener('click', poke)
    bubble.addEventListener('click', poke)
    layer.append(ping, hit, bubble)
    meadow.classList.add('egg-armed')
    ui = { ping, hit, bubble }
    place()
    later(() => {
      const sr = bubble.querySelector('.egg-sr')
      if (sr) sr.textContent = 'Ai: ' + HINT
    }, 80)
    const spans = bubble.querySelectorAll('.egg-ch')
    if (reduce) {
      spans.forEach((s) => s.classList.add('on'))
      bubble.classList.add('egg-done')
    } else {
      later(() => typeSpans(bubble, spans), 260)
    }
    later(disarm, ARM_MS)
  }

  // Reveal characters by elapsed time (not tick count) so slow timers don't drag it out.
  function typeSpans(bubble, spans) {
    const start = performance.now()
    let shown = 0
    const tick = () => {
      const i = Math.min(spans.length - 1, Math.floor((performance.now() - start) / 26))
      if (i !== shown) {
        spans[shown].classList.remove('egg-at')
        for (let k = shown + 1; k <= i; k++) spans[k].classList.add('on')
        spans[i].classList.add('egg-at')
        shown = i
      }
      if (shown < spans.length - 1) later(tick, 16)
      else later(() => bubble.classList.add('egg-done'), 1400)
    }
    tick()
  }

  // Anchor the bubble above the monitor, clamped inside the meadow.
  function place() {
    const { bubble, ping, hit } = ui
    if (!bubble) return
    const c = monitor()
    if (!c) return
    const mw = layer.clientWidth
    const mh = layer.clientHeight
    const bw = bubble.offsetWidth
    const cx = c.x + c.w / 2
    const left = Math.max(12, Math.min(Math.round(cx - bw / 2), mw - bw - 12))
    const tail = clamp(Math.round(cx - left), 18, Math.max(18, bw - 18))
    bubble.style.left = left + 'px'
    bubble.style.bottom = Math.round(mh - c.y + 14) + 'px'
    bubble.style.setProperty('--egg-tail', tail + 'px')
    if (ping) Object.assign(ping.style, { left: c.x - 3 + 'px', top: c.y - 3 + 'px', width: c.w + 6 + 'px', height: c.h + 6 + 'px' })
    if (hit) {
      const hw = Math.max(44, c.w + 16)
      const hh = Math.max(44, c.h + 16)
      Object.assign(hit.style, { left: cx - hw / 2 + 'px', top: c.y + c.h / 2 - hh / 2 + 'px', width: hw + 'px', height: hh + 'px' })
    }
  }

  function disarm() {
    phase('idle')
    dropHint(false)
  }

  function dropHint(now) {
    const nodes = [ui.bubble, ui.ping, ui.hit].filter(Boolean)
    ui = {}
    meadow.classList.remove('egg-armed')
    if (!nodes.length) return
    if (now) return nodes.forEach((n) => n.remove())
    nodes.forEach((n) => n.classList.add('egg-bye'))
    after(() => nodes.forEach((n) => n.remove()), 260)
  }

  // --- click 2: sp-os pops up over the meadow ------------------------------------
  function enter() {
    phase('term')
    dropHint(false)
    meadow.classList.add('egg-on')
    const t = makeTerminal()
    term = t
    layer.appendChild(t.el)
    if (!reduce && t.el.animate) {
      t.el.animate(
        [{ opacity: 0, transform: 'translateY(8px) scale(.985)' }, { opacity: 1, transform: 'none' }],
        { duration: POP_MS, easing: 'cubic-bezier(.3,.7,.2,1)' },
      )
    }
    t.boot()
  }

  function leave() {
    if (state !== 'term' || !term) return
    phase('idle')
    const t = term
    term = null
    t.close()
    meadow.classList.remove('egg-on')
    if (reduce || !t.el.animate) return t.el.remove()
    t.el.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(4px)' }], { duration: CLOSE_MS, easing: 'ease', fill: 'forwards' })
    after(() => t.el.remove(), CLOSE_MS + 20)
  }

  function makeTerminal() {
    const ac = new AbortController()
    const on = { signal: ac.signal }
    const el = h('div', 'egg-win')
    el.setAttribute('role', 'region')
    el.setAttribute('aria-label', 'sp-os terminal (easter egg). Type help for commands, exit or Escape to leave.')
    el.innerHTML =
      '<div class="egg-head">' +
        '<span class="egg-brand"><i aria-hidden="true"><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b><b></b></i>sp-os<span class="egg-guest">guest</span></span>' +
        '<span class="egg-hint"><span class="egg-fine"><kbd>esc</kbd> to leave</span><span class="egg-coarse">type exit to leave</span></span>' +
      '</div>' +
      '<div class="egg-scroll"><div class="egg-out" role="log" aria-live="polite"></div>' +
        '<form class="egg-line" hidden><span class="egg-ps1" aria-hidden="true">' + ps1() + '</span>' +
          '<span class="egg-field"><span class="egg-mirror" aria-hidden="true"><span></span><span class="egg-cur"> </span><span></span></span>' +
          '<input class="egg-in" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="send" aria-label="Terminal command"></span>' +
        '</form>' +
      '</div>'

    const out = el.querySelector('.egg-out')
    const scroller = el.querySelector('.egg-scroll')
    const form = el.querySelector('.egg-line')
    const field = el.querySelector('.egg-field')
    const input = el.querySelector('.egg-in')
    const [pre, cur, post] = el.querySelector('.egg-mirror').children
    const hist = []
    let hIdx = 0
    let draft = ''

    function ps1() {
      return '<span class="egg-u">guest@sp-os</span> <span class="egg-path">~</span> <span class="egg-sym">%</span>'
    }
    const hi = (s) => '<span class="egg-hl">' + esc(s) + '</span>'
    const ai = (s) => '<span class="egg-ai"><i class="egg-dot"></i>Ai</span>' + esc(s)
    function line(html, cls) {
      const d = h('div', 'egg-l' + (cls ? ' ' + cls : ''), html)
      out.appendChild(d)
      while (out.childElementCount > 400) out.firstElementChild.remove()
      return d
    }
    const kv = (k, v, w) => line('<span class="egg-k" style="--w:' + (w || 9) + 'ch">' + esc(k) + '</span>' + esc(v))
    function toEnd() {
      scroller.scrollTop = scroller.scrollHeight
    }
    function echo(v) {
      line('<span class="egg-ps1">' + ps1() + '</span> ' + esc(v), 'egg-cmd')
    }
    // block caret: a mirror of the (invisible) input
    function sync() {
      const v = input.value
      const s = input.selectionStart == null ? v.length : input.selectionStart
      pre.textContent = v.slice(0, s)
      cur.textContent = v.slice(s, s + 1) || ' '
      post.textContent = v.slice(s + 1)
      cur.classList.remove('egg-blink')
      void cur.offsetWidth
      cur.classList.add('egg-blink')
    }
    const syncSoon = () => requestAnimationFrame(sync)

    async function boot() {
      out.setAttribute('aria-busy', 'true')
      const rows = [
        ['sp-os 1.0 · tty1', 'egg-faint'],
        [ai('told you something would happen.'), '', true],
        ['type ' + hi('help') + ' to look around · ' + hi('exit') + ' or ' + hi('esc') + ' to close', 'egg-dim', true],
      ]
      for (const [html, cls, raw] of rows) {
        line(raw ? html : esc(html), (cls ? cls + ' ' : '') + 'egg-rise')
        if (!reduce) await wait(90)
      }
      out.removeAttribute('aria-busy')
      form.hidden = false
      sync()
      toEnd()
      if (fine()) input.focus({ preventScroll: true })
    }

    const FILES = {
      'about.txt': () => CMD.about.run(),
      'meadow.bak': () => line('binary file · a backup of the sky, the grass and one person at a desk. just in case.', 'egg-dim'),
      'resume.pdf': () => line('that is a pdf. ' + hi('resume') + ' prints where to find it.', 'egg-dim'),
      '.secrets': () => line('the grass only has four shades of green. nobody ever noticed.'),
    }
    const LS_FILES = ['about.txt', 'meadow.bak', 'projects/', 'resume.pdf']

    function blog() {
      const slot = line('fetching latest posts…', 'egg-dim')
      const ctl = new AbortController()
      const stop = () => ctl.abort()
      ac.signal.addEventListener('abort', stop, { once: true })
      const tid = after(stop, 6000)
      const fill = (rows) => {
        if (ac.signal.aborted) return
        slot.className = 'egg-blk egg-rise'
        slot.innerHTML = rows.join('')
        toEnd()
      }
      fetch('/api/blogs?limit=5', { signal: ctl.signal })
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http ' + r.status))))
        .then((j) => {
          clearTimeout(tid)
          timers.delete(tid)
          const list = (j && Array.isArray(j.data) ? j.data : []).slice(0, 5)
          if (!list.length) return fill(['<div class="egg-l egg-dim">no posts yet. they will live at ' + esc(SITE) + '/blogs</div>'])
          fill(
            ['<div class="egg-l egg-faint">latest writing</div>'].concat(
              list.map(
                (p) =>
                  '<div class="egg-l egg-item">' + hi(p.title || 'untitled') + (p.date ? '<span class="egg-dim"> · ' + esc(niceDate(p.date)) + '</span>' : '') + '</div>' +
                  '<div class="egg-l egg-ind egg-dim">' + esc(SITE + '/blogs/' + (p.slug || '')) + '</div>',
              ),
            ),
          )
        })
        .catch(() => {
          clearTimeout(tid)
          timers.delete(tid)
          fill(['<div class="egg-l egg-err">could not reach the blog right now.</div>', '<div class="egg-l egg-dim">it lives at ' + esc(SITE) + '/blogs</div>'])
        })
    }

    const CMD = {
      help: {
        d: 'list commands',
        run() {
          const rows = Object.keys(CMD)
            .filter((c) => CMD[c].d)
            .map((c) => '<span class="egg-hl">' + esc(c) + '</span><span class="egg-dim">' + esc(CMD[c].d) + '</span>')
            .join('')
          line('<div class="egg-grid">' + rows + '</div>')
          line('↑ ↓ history · tab completes · ctrl+l clears', 'egg-faint')
        },
      },
      about: {
        d: 'who Surya is',
        run() {
          line(hi('Surya Prakash'))
          line('A curious engineer exploring AI, systems and the immersive web, at KL University.')
          line('Likes building things that feel alive. Like this meadow.', 'egg-dim')
        },
      },
      projects: {
        d: 'things he has built',
        run() {
          const list = Array.isArray(api.projects) ? api.projects : []
          if (!list.length) return line('projects/ is empty. he is probably building one right now.', 'egg-dim')
          line('projects · ' + list.length, 'egg-faint')
          list.forEach((p) => {
            line(hi(p.n), 'egg-item')
            if (p.s) line(esc(p.s), 'egg-ind egg-dim')
            ;(p.l || []).forEach((x) => {
              if (x && x[1]) line('<span class="egg-k" style="--w:7ch">' + esc(String(x[0]).toLowerCase()) + '</span>' + esc(bare(x[1])), 'egg-ind')
            })
          })
        },
      },
      blog: { d: 'latest posts', run: blog },
      resume: {
        d: 'where to find the resume',
        run() {
          kv('resume', RESUME, 8)
        },
      },
      contact: {
        d: 'how to say hello',
        run() {
          kv('email', EMAIL, 8)
          line('or try ' + hi('socials') + '.', 'egg-dim')
        },
      },
      socials: {
        d: 'elsewhere online',
        run() {
          SOCIALS.forEach(([n, u]) => kv(n, u, 10))
        },
      },
      whoami: {
        d: 'who are you?',
        run() {
          line('guest · uid 1000 · groups meadow, curious')
          line('you clicked a computer twice. that is the whole job description.', 'egg-dim')
        },
      },
      date: {
        d: 'your time, and his',
        run() {
          const now = new Date()
          kv('you', now.toLocaleString(undefined, { weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }), 8)
          try {
            kv('surya', new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(now) + ' IST', 8)
          } catch (e) {}
          const tod = api.tod || 'day'
          kv('meadow', tod + (tod === 'night' || tod === 'dusk' ? ', fireflies out' : ''), 8)
        },
      },
      ls: {
        d: 'list files',
        run(args) {
          const all = args.some((x) => /^-\w*a/.test(x))
          const names = (all ? ['.', '..', '.secrets'] : []).concat(LS_FILES)
          line(names.map((f) => (f.endsWith('/') ? hi(f) : esc(f))).join('   '))
        },
      },
      cat: {
        d: 'print a file',
        run(args) {
          const f = args[0]
          if (!f) return line('usage: cat &lt;file&gt; · try ' + hi('ls'), 'egg-dim')
          if (/^projects\/?$/.test(f)) return line('cat: projects/ is a directory · try ' + hi('projects'), 'egg-err')
          if (Object.prototype.hasOwnProperty.call(FILES, f)) return FILES[f]()
          line('cat: ' + esc(f) + ': no such file', 'egg-err')
        },
      },
      clear: {
        d: 'clear the screen',
        run() {
          out.textContent = ''
        },
      },
      exit: {
        d: 'close the terminal',
        run() {
          later(leave, reduce ? 0 : 120)
        },
      },
      // unlisted
      sudo: {
        run() {
          line('nice try. guest is not in the sudoers file. this incident will be reported to the meadow.', 'egg-err')
        },
      },
      echo: { run: (args) => line(esc(args.join(' '))) },
      pwd: { run: () => line('/home/guest') },
      cd: { run: () => line('cd: it is a meadow. there is nowhere else to go.', 'egg-dim') },
      rm: { run: () => line('rm: permission denied. the meadow is load-bearing.', 'egg-err') },
      hi: { run: () => line(ai('hey. type help.')) },
      ai: { run: () => line(ai('I am a few hundred lines of JavaScript doing an impression. a real one might move in later.')) },
    }
    CMD.hello = { run: CMD.hi.run }
    CMD.cls = { run: CMD.clear.run }
    CMD.quit = CMD.logout = { run: CMD.exit.run }
    const VISIBLE = Object.keys(CMD).filter((c) => CMD[c].d)

    function run(raw) {
      if (state !== 'term') return
      const v = String(raw || '')
      echo(v)
      const cmd = v.trim()
      if (cmd && hist[hist.length - 1] !== cmd) hist.push(cmd)
      if (hist.length > 50) hist.shift()
      hIdx = hist.length
      draft = ''
      if (cmd) {
        const parts = cmd.split(/\s+/)
        const name = parts[0].toLowerCase()
        const c = Object.prototype.hasOwnProperty.call(CMD, name) ? CMD[name] : null
        if (c) c.run(parts.slice(1))
        else line('command not found: ' + esc(parts[0]) + ' · try ' + hi('help'), 'egg-err')
      }
      toEnd()
    }

    function lcp(list) {
      let p = list[0] || ''
      for (const s of list) while (!s.startsWith(p)) p = p.slice(0, -1)
      return p
    }
    // Tab completion. Returns false to let Tab move focus (empty prompt).
    function complete() {
      const v = input.value
      let m = v.match(/^(\s*)(\S*)$/)
      let pool = VISIBLE
      let space = ' '
      if (!m) {
        m = v.match(/^(\s*cat\s+)(\S*)$/i)
        if (!m) return true
        pool = Object.keys(FILES).concat('projects/')
        space = ''
      }
      const pre0 = m[2].toLowerCase()
      if (!pre0 && pool === VISIBLE) return false
      const hits = pool.filter((c) => c.startsWith(pre0))
      if (hits.length === 1) input.value = m[1] + hits[0] + space
      else if (hits.length > 1) {
        const c = lcp(hits)
        if (c.length > pre0.length) input.value = m[1] + c
        else {
          echo(v)
          line(hits.join('   '), 'egg-dim')
          toEnd()
        }
      }
      return true
    }

    form.addEventListener(
      'submit',
      (e) => {
        e.preventDefault()
        const v = input.value
        input.value = ''
        sync()
        run(v)
      },
      on,
    )
    input.addEventListener(
      'keydown',
      (e) => {
        const key = e.key
        if (key === 'ArrowUp') {
          if (!hist.length) return
          e.preventDefault()
          if (hIdx === hist.length) draft = input.value
          hIdx = Math.max(0, hIdx - 1)
          input.value = hist[hIdx]
          input.setSelectionRange(input.value.length, input.value.length)
        } else if (key === 'ArrowDown') {
          if (hIdx >= hist.length) return
          e.preventDefault()
          hIdx++
          input.value = hIdx === hist.length ? draft : hist[hIdx]
          input.setSelectionRange(input.value.length, input.value.length)
        } else if (key === 'Tab' && !e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey) {
          if (complete()) e.preventDefault()
        } else if (e.ctrlKey && (key === 'l' || key === 'L')) {
          e.preventDefault()
          out.textContent = ''
        } else if (e.ctrlKey && (key === 'c' || key === 'C') && input.selectionStart === input.selectionEnd) {
          e.preventDefault()
          echo(input.value + '^C')
          input.value = ''
          toEnd()
        }
        syncSoon()
      },
      on,
    )
    input.addEventListener('input', sync, on)
    input.addEventListener('select', sync, on)
    input.addEventListener('focus', () => { field.classList.add('egg-focus'); sync() }, on)
    input.addEventListener('blur', () => field.classList.remove('egg-focus'), on)
    // tapping anywhere in the window focuses the prompt (unless selecting text)
    el.addEventListener(
      'click',
      () => {
        const sel = window.getSelection && window.getSelection()
        if (sel && String(sel).length) return
        if (!form.hidden) {
          input.focus({ preventScroll: true })
          syncSoon()
        }
      },
      on,
    )
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key !== 'Escape' || e.defaultPrevented) return
        const act = document.activeElement
        if (act && act !== document.body && !el.contains(act)) return
        if (document.querySelector('dialog[open]')) return
        e.preventDefault()
        leave()
      },
      on,
    )

    return {
      el,
      boot,
      close() {
        ac.abort()
        if (el.contains(document.activeElement)) document.activeElement.blur()
      },
    }
  }

  // --- lifecycle -------------------------------------------------------------------
  addEventListener(
    'resize',
    () => {
      if (state === 'armed') place()
    },
    { signal: life.signal },
  )

  function destroy() {
    if (dead) return
    dead = true
    gen++
    timers.forEach(clearTimeout)
    timers.clear()
    life.abort()
    if (term) term.close()
    term = null
    ui = {}
    layer.remove()
    meadow.classList.remove('egg-on', 'egg-armed')
  }
  if (signal) signal.addEventListener('abort', destroy, { once: true })

  return { click }
}
