// Content and markup for the pixel home. Edit text here; behaviour lives in initPixel.js.
// Everything below is plain data plus small template helpers, rendered once into an HTML
// string. Images are static files: stack logos in /public/icons/stack, school/company logos
// in /public/icons/logos, project screenshots in /public/projects.

/* ---------- data ---------- */

// Tech stack, in marquee order. The value is the file name in /public/icons/stack.
const STACK = {
  'Python': 'python',
  'JavaScript': 'javascript',
  'TypeScript': 'typescript',
  'Java': 'java',
  'React': 'react',
  'Vite': 'vite',
  'Tailwind CSS': 'tailwind-css',
  'Node.js': 'nodejs',
  'Express': 'express',
  'Flask': 'flask',
  'Django': 'django',
  'Spring Boot': 'spring-boot',
  'PyTorch': 'pytorch',
  'scikit-learn': 'scikit-learn',
  'MongoDB': 'mongodb',
  'MySQL': 'mysql',
  'SQLite': 'sqlite',
  'Git': 'git',
  'GitHub': 'github',
  'Vercel': 'vercel',
};
export const stackIcon = (name) => `/icons/stack/${STACK[name]}.svg`;

// Projects. n = name, img = screenshot (hover peek + modal), s = short blurb, d = modal text,
// t = modal tags, l = [label, url] links, st = stack (names from STACK).
export const PROJECTS = [
  {
    id: 'hirevexa', n: 'Hirevexa', img: '/projects/HireVexa.png',
    s: 'An AI-powered platform that rethinks hiring through intelligent applications and product thinking.',
    d: 'An AI-powered platform that rethinks hiring through intelligent applications and product thinking. Built to make recruitment smarter, not just faster.',
    t: ['AI-Powered', 'Product Thinking', 'Intelligent Systems'],
    l: [['Code', 'https://github.com/isuryaprakashh/HireVexa'], ['Live', 'https://hirevexa.vercel.app/']],
    st: ['React', 'Vite', 'Tailwind CSS', 'Flask', 'Python', 'scikit-learn'],
  },
  {
    id: 'aprameya', n: 'Aprameya', img: '/projects/aprameya.png',
    s: 'A centralized platform designed for managing club operations, events, and collaboration.',
    d: 'A centralized platform designed for managing club operations, events, and collaboration. Built with a focus on structure, usability, and scalable coordination within student communities.',
    t: ['Community Systems', 'MERN Stack', 'Collaboration'],
    l: [['Code', 'https://github.com/isuryaprakashh/Aprameya'], ['Live', 'https://aprameya.kluniversity.me/']],
    st: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB'],
  },
  {
    id: 'scene', n: 'Scene Classification', img: '/projects/Scene-Classification.png',
    s: 'Deep learning experiments that became published research at INDIACOM 2026.',
    d: 'What started as experimentation in deep learning eventually evolved into published research presented at INDIACOM 2026. A journey from curiosity to contribution.',
    t: ['Deep Learning', 'Computer Vision', 'Research'],
    l: [['Code', 'https://github.com/isuryaprakashh/SceneClassification'], ['Paper', 'https://ieeexplore.ieee.org/document/11525589']],
    st: ['Python', 'PyTorch', 'scikit-learn', 'Flask'],
  },
  {
    id: 'asthetica', n: 'Asthetica', img: '/projects/asthetica.png',
    s: 'Digital commerce that feels more like a curated gallery than a storefront.',
    d: 'An immersive product experience balancing full-stack architecture with design and systems thinking. Built to explore how digital commerce can feel more like a curated gallery than a storefront.',
    t: ['Immersive Experience', 'Full-Stack', 'Design Systems'],
    l: [['Code', 'https://github.com/isuryaprakashh/Asthetica'], ['Live', 'https://asthetica.vercel.app/']],
    st: ['React', 'Vite', 'Tailwind CSS', 'Spring Boot', 'Java', 'MySQL'],
  },
  {
    id: 'odinmail', n: 'ODINMAIL', img: '/projects/OdinMail.png',
    s: 'An AI-driven tool for organizing, prioritizing, and drafting emails intelligently. Developed as part of the OpenAI x NxtWave Hackathon.',
    d: 'An AI-driven productivity tool focused on organizing, prioritizing, and drafting emails intelligently. Built around the idea that communication systems should feel seamless and less overwhelming. Developed as part of the OpenAI x NxtWave Hackathon.',
    t: ['AI Productivity', 'Workflow Systems', 'OpenAI x NxtWave Hackathon'],
    l: [['Code', 'https://github.com/isuryaprakashh/NxtWaveOpenAI'], ['Live', 'https://odin-mail-dusky.vercel.app/']],
    st: ['React', 'Vite', 'Tailwind CSS', 'Flask', 'Python', 'MongoDB'],
  },
  {
    id: 'property', n: 'Property Sales & Rental', img: '/projects/property-sales.png',
    s: 'A web platform for browsing and managing property rentals and sales.',
    d: 'A web-based platform focused on improving the experience of browsing and managing property rentals and sales through structured interfaces and streamlined workflows.',
    t: ['Web Platform', 'Management System', 'User Experience'],
    l: [['Code', 'https://github.com/isuryaprakashh/PS6'], ['Live', 'http://psrm.pythonanywhere.com/']],
    st: ['Python', 'Django', 'SQLite', 'JavaScript'],
  },
];

// "Beyond code": the club gets a role timeline, the rest are short blurbs.
const CLUB = {
  n: 'Aprameya - ASC', meta: '2025–Present', url: 'https://aprameya.kluniversity.me',
  sub: 'AI & Autonomous Systems Club, KL University · 1 yr 4 mos',
  roles: [
    ['Director of Strategic Planning', 'Jan 2026 – Present · 10 mos'],
    ['Core Member', 'Sep 2025 – Jan 2026 · 5 mos'],
    ['Member', 'Jul 2025 – Sep 2025 · 3 mos'],
  ],
  d: 'Leading explorations in AI with a community of curious builders, organizing events and sharing knowledge along the way.',
};
const BEYOND = [
  { n: 'Hackathons', d: 'Building under constraints, rapid prototyping, and discovering new approaches through competitive collaboration.' },
  { n: 'Collaborative Projects', d: 'Working across disciplines, combining engineering, design, and product thinking in team environments.' },
];

const NAME = 'Surya Prakash Inukurthi';
const QUOTE = {
  text: "Ideas don't come out fully formed; they only become clearer as you work on them. You just have to get started.",
  who: 'Mark Zuckerberg',
};
export const QUOTE_TEXT = QUOTE.text;

/* ---------- icons ---------- */

const svg = (attrs, body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" ${attrs}>${body}</svg>`;
export const EXT = svg('stroke-width="2"', '<path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>');
const ARROW = svg('stroke-width="2" aria-hidden="true"', '<path d="M7 17 17 7M8 7h9v9"/>');
const GITHUB_PATH = '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.4a3 3 0 0 0-.8-2.3c2.8-.3 5.8-1.4 5.8-6.3a4.9 4.9 0 0 0-1.3-3.4 4.6 4.6 0 0 0-.1-3.4s-1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.4 1.9 5.4 2.2 5.4 2.2a4.6 4.6 0 0 0-.1 3.4A4.9 4.9 0 0 0 4 9c0 4.9 3 6 5.8 6.3a3 3 0 0 0-.8 2.3V21"/>';
const LINK_ICONS = {
  Code: svg('stroke-width="1.8"', GITHUB_PATH),
  Live: svg('stroke-width="2"', '<path d="M7 17 17 7M8 7h9v9"/>'),
  Paper: svg('stroke-width="1.8"', '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>'),
};
const LINK_LABELS = { Code: 'Source code on GitHub', Live: 'Open live site', Paper: 'Read the paper' };
const ROW_ICON = (body) => `<svg stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" viewBox="0 0 24 24">${body}</svg>`;

/* ---------- template helpers ---------- */

const ext = (url) => `href="${url}" target="_blank" rel="noopener"`;
const join = (list, fn) => list.map(fn).join('');

const stackImg = (name, size, attrs = '') =>
  `<img src="${stackIcon(name)}" ${attrs} width="${size}" height="${size}" loading="lazy" decoding="async">`;

const project = (p) => `
      <div class="proj">
        <div class="ph">
          <button class="name" data-open="${p.id}">${p.n}<svg class="nch" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg></button>
          <div class="pacts">${join(p.l, ([label, url]) => `<a ${ext(url)} aria-label="${LINK_LABELS[label]}" title="${LINK_LABELS[label]}">${LINK_ICONS[label] || label}</a>`)}</div>
        </div>
        <p>${p.s}</p>
        <div class="pst">${join(p.st, (k) => stackImg(k, 20, `alt="${k}" title="${k}"`))}</div>
      </div>`;

const club = (c) => `
      <div class="club">
        <div class="row"><span class="ico logo" style="background:#111418;color:#fff;font-size:16px;font-weight:700" title="Aprameya">A</span><span class="rt"><span class="line"><b><a class="clink" ${ext(c.url)}>${c.n}${ARROW}</a></b><i class="dl"></i><span class="meta">${c.meta}</span></span><span class="sub">${c.sub}</span></span></div>
        <div class="tl">${join(c.roles, ([role, when]) => `<div class="tli"><b>${role}</b><span>${when}</span></div>`)}</div>
        <p class="cd">${c.d}</p>
      </div>`;

const blurb = (b) => `
      <div class="proj"><h3 class="pname">${b.n}</h3><p>${b.d}</p></div>`;

// The marquee track holds three copies so it can loop seamlessly; the copies are hidden from screen readers.
const marquee = () => [0, 1, 2].map((copy) => join(Object.keys(STACK), (k) => `
        <span${copy ? ' aria-hidden="true"' : ''}>${stackImg(k, 22, 'alt=""')}${k}</span>`)).join('');

// Last visit's canvas snapshot, painted before React hydrates so a repeat visit never shows an
// empty sky or meadow. It only runs on a full page load: the browser executes inline scripts while
// parsing the server HTML, but never runs scripts that React inserts with innerHTML on client-side
// navigation (initPixel draws synchronously in that case, and React never sees this <script>, so
// there is no "script tag" warning). initPixel removes data-snap once the live canvas has drawn.
// The time-of-day split and the key format must match TOD and snapKey() in initPixel.js.
export const SNAP_KEY = 'px:snap:v1:';
const snapshot = (kind, selector) => `<script>(function(){try{
  var h=new Date().getHours()+new Date().getMinutes()/60;
  var tod=h>=5&&h<8.5?'dawn':h>=8.5&&h<17?'day':h>=17&&h<19.3?'dusk':'night';
  var key='${SNAP_KEY}${kind}:'+tod${kind === 'meadow' ? "+(matchMedia('(prefers-color-scheme: dark)').matches?':dark':':light')" : ''};
  var url=localStorage.getItem(key),el=document.querySelector('${selector}');
  if(url&&el){el.style.setProperty('--snap','url('+url+')');el.setAttribute('data-snap','')}
}catch(e){}})()</script>`;

/* ---------- page ---------- */

const MARKUP = `<nav class="nav" aria-label="Main">
  <a class="brand" href="#" aria-label="Surya Prakash"><span class="bf">Surya Prakash</span><span class="bs">SP</span></a>
  <!-- <a class="nl opt" href="#h-work">Work</a> --><a class="nl opt" href="#h-research">Research</a><a class="nl opt" href="#h-projects">Projects</a><a class="nl" href="/blogs">Blog</a>
  <a class="np1" ${ext('https://www.suryaprakash.me/SURYA-RESUME.pdf')}>Resume</a><a class="np2" href="#h-contact">Contact</a>
</nav>
<header class="hero" id="sky"><div class="frame"><canvas id="skyC" role="img" aria-label="Pixel-art garden with a stone pavilion, trees and drifting clouds. Tap to send the birds flying."></canvas></div></header>
${snapshot('sky', '.px .hero .frame')}

<main class="col">
<div id="home">
  <div class="top">
    <h1 id="name">${NAME}</h1>
    <nav class="social" aria-label="Social">
      <a ${ext('https://linkedin.com/in/isuryaprakashh')} aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><path d="M8 10.5V16M8 7.8v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1 1 2.1 2.6V16"/></svg></a>
      <a ${ext('https://github.com/isuryaprakashh')} aria-label="GitHub"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${GITHUB_PATH}</svg></a>
      <a ${ext('https://x.com/isuryaprakashh')} aria-label="X"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h4.6L20 20h-4.6z"/><path d="M19.6 4l-6.4 7.3M4.4 20l6.4-7.3"/></svg></a>
    </nav>
  </div>
  <div class="role" id="role" aria-live="polite">Curiosity</div>

  <div class="bio">
    <p>I enjoy building things that combine technology, systems, and experience.</p>
    <p>From full-stack applications to AI-driven projects and immersive interfaces, I like exploring ideas by turning them into real products.</p>
    <p>Most of what I learn comes through building experimenting with projects, participating in hackathons, and collaborating with people around me through communities and events.</p>
    <p>I'm currently open to internships and collaborations. Feel free to reach me <a href="#h-contact">here!</a></p>
  </div>

  <!-- Work section commented out
  <section aria-labelledby="h-work">
    <h2 id="h-work">Work</h2>
    <div class="row"><span class="ico logo" style="background:#fff;overflow:hidden" title="HubWise.Ai"><img src="/icons/logos/hubwise.png" alt="" width="30" height="30" loading="lazy" decoding="async" style="width:30px;height:30px;object-fit:contain"></span><span class="rt"><span class="line"><b>HubWise.Ai</b><i class="dl"></i><span class="meta">Sept 2026–Present</span></span><span class="sub">Software Engineer Intern</span></span></div>
  </section>
  -->

  <section aria-labelledby="h-edu">
    <h2 id="h-edu">Education</h2>
    <a class="row" ${ext('https://kluniversity.in')}><span class="ico logo" style="background:#fff;overflow:hidden" title="KL University"><img src="/icons/logos/kl-university.png" alt="" width="34" height="34" loading="lazy" decoding="async" style="width:34px;height:34px;object-fit:contain"></span><span class="rt"><span class="line"><b>KL University</b><i class="dl"></i><span class="meta">2023–2027</span></span><span class="sub">B.Tech in Computer Science and Engineering</span></span></a>
  </section>

  <section aria-labelledby="h-research">
    <h2 id="h-research">Research</h2>
    <button class="row" aria-expanded="false" data-more="m-paper">
      <span class="ico logo" style="background:#fff" title="IEEE"><svg viewBox="0 8.35 7.5 7.5" style="width:26px;height:26px" aria-hidden="true"><path fill="#00629B" d="M4.74 14.973h-.05v-.064h.04c.022 0 .051.002.051.03 0 .028-.015.034-.04.034zm.101-.03c0-.06-.04-.079-.109-.079h-.099v.265h.057v-.111h.027l.061.111h.068l-.069-.116c.036-.003.064-.02.064-.07zm-.11.243c-.098 0-.176-.076-.176-.19 0-.113.078-.188.176-.188.095 0 .177.075.177.188 0 .114-.082.19-.177.19zm-.247-.19c0 .156.116.247.247.247.13 0 .247-.09.247-.247a.238.238 0 0 0-.247-.246.239.239 0 0 0-.247.246zM3.35 12.61c-.02.374-.025.72-.052 1.096.148.013.315.026.473.003l-.047-1.046-.009-.05c-.12.005-.234.01-.365-.003zm-.926-1.051c-.182.091-.45.23-.421.48.04.136.187.224.304.28.647.286 1.506.295 2.19.083.168-.065.395-.16.426-.366-.002-.171-.183-.279-.313-.344v-.008a.575.575 0 0 1 .144-.039v-.004c-.228-.041-.45-.101-.671-.16.043.097.073.2.109.301.067-.021.135-.038.207-.047.117.045.284.11.3.256.014.137-.136.204-.23.26-.501.181-1.065.2-1.588.06-.144-.045-.353-.103-.37-.287.102-.242.367-.292.588-.351-.114-.073-.23-.138-.34-.22-.119.007-.227.059-.335.106zm1.107-1.46l-.064.208-.326.932c.082.008.183 0 .263.008v.008l-.048 1.054.008.01c.104.01.234.016.34-.002V12.3l-.042-1.022.006-.035.286-.004a46.727 46.727 0 0 1-.414-1.14zm-.15-.469c.239-.163.453.065.639.195.717.578 1.393 1.238 1.909 1.984.065.096.094.246.036.355-.134.223-.314.426-.485.633v.011c-.426.454-.876.92-1.363 1.305-.237.144-.455.46-.761.264a11.007 11.007 0 0 1-1.927-1.82c-.096-.149-.246-.271-.312-.44-.093-.23.112-.394.229-.566.576-.71 1.291-1.407 2.034-1.92zm.6-.678l-.266-.376c-.032-.02-.073-.052-.108-.062-.079-.034-.163.007-.227.056l-.48.624c-.769.953-1.68 1.843-2.673 2.525-.079.061-.195.121-.22.222-.026.091.022.166.078.223a13.061 13.061 0 0 1 2.234 1.94c.12.127.217.252.335.37.198.265.43.53.613.813.057.06.066.158.156.187.07.024.156.04.223 0l.066-.067a13.269 13.269 0 0 1 3.034-3.06c.117-.103.34-.142.343-.336a.308.308 0 0 0-.137-.226l-.02-.003c-.6-.408-1.159-.87-1.686-1.394l-.582-.609a16.595 16.595 0 0 1-.684-.827zm.039.672c.206.157.42.336.61.518l.034.02a10.122 10.122 0 0 1 1.405 1.592c.065.1.122.212.086.343-.133.332-.403.597-.639.887-.51.55-1.05 1.081-1.652 1.506-.122.086-.287.166-.433.097-.444-.232-.818-.613-1.207-.96-.45-.417-.902-.904-1.244-1.413a.417.417 0 0 1-.064-.253c.044-.176.165-.32.279-.469.403-.514.897-1.002 1.397-1.447.011-.012.032-.036.05-.047.215-.186.428-.35.652-.511.234-.182.529-.031.726.137zm15.942-.197H24v1.028h-2.569v1.094h2.364v1.028H21.43V13.7H24v1.028h-4.038zm-4.859 0h4.037v1.028h-2.57v1.094h2.363v1.028H16.57V13.7h2.569v1.028h-4.037zm-4.86 0h4.037v1.028h-2.57v1.094h2.365v1.028H11.71V13.7h2.57v1.028h-4.038zm-2.24 0h1.469v5.301H8.004Z"/></svg></span>
      <span class="rt"><span class="line"><b>INDIACOM</b><i class="dl"></i><span class="meta">2026</span><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg></span>
      <span class="sub">Enhanced Visual Understanding Using Deep Learning Based on Scene Classification</span></span>
    </button>
    <div class="more" id="m-paper"><div>
      <p>A Deep Learning project that became my first research paper.</p>
      <div class="chips">
        <a class="chip" href="/blogs" style="background:var(--ink);color:var(--bg)">Read the full blog</a>
        <a class="chip" ${ext('https://ieeexplore.ieee.org/document/11525589')}>IEEE Xplore ${EXT}</a>
        <a class="chip" ${ext('https://doi.org/10.23919/INDIACom70271.2026.11525589')}>DOI ${EXT}</a>
      </div>
    </div></div>
  </section>

  <section aria-labelledby="h-beyond">
    <h2 id="h-beyond">Beyond code</h2>
    <div id="beyond">${club(CLUB)}${join(BEYOND, blurb)}
    </div>
  </section>

  <section aria-labelledby="h-projects">
    <h2 id="h-projects">Projects</h2>
    <div id="projects">${join(PROJECTS, project)}
    </div>
  </section>

  <section aria-labelledby="h-stack">
    <h2 id="h-stack">Stack</h2>
    <div class="marq" id="marq" aria-label="Tech stack: ${Object.keys(STACK).join(', ')}"><div class="track" id="mtrack">${marquee()}
      </div></div>
    <p class="mhint">Drag to scroll</p>
  </section>

  <section aria-labelledby="h-contact">
    <h2 id="h-contact">Contact</h2>
    <div class="row"><span class="ico">${ROW_ICON('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>')}</span><span class="rt"><span class="line"><b>Email</b><i class="dl"></i></span></span></div>
    <div class="cfield"><span>isurya2005@gmail.com</span><button class="cbtn" id="copy" type="button" aria-label="Copy email"><svg class="cp" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg><svg class="ok" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></button></div>
    <div class="row"><span class="ico">${ROW_ICON('<path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>')}</span><span class="rt"><span class="line"><b>Location</b><i class="dl"></i><span class="meta">India</span></span></span></div>
    <div class="geo"><canvas id="globe" aria-label="Spinning dot globe with India marked. Drag to spin it faster."></canvas><div class="clock"><b id="clk">--:--</b><small id="clkd">Local time in India</small></div></div>
    <div class="row"><span class="ico">${ROW_ICON('<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6"/>')}</span><span class="rt"><span class="line"><b>Resume</b><i class="dl"></i><a class="meta val" ${ext('https://www.suryaprakash.me/SURYA-RESUME.pdf')}>SURYA_RESUME.pdf</a></span></span></div>
    <form class="cform" id="cform" novalidate aria-label="Send me a message">
      <div class="crow"><input name="name" type="text" placeholder="Your Name" aria-label="Your name" autocomplete="name" required><input name="email" type="email" placeholder="Your Email" aria-label="Your email" autocomplete="email" required></div>
      <div class="cmsg"><textarea name="msg" rows="2" placeholder="Say hi, or tell me about your idea…" aria-label="Your message" required></textarea><button type="submit" aria-label="Send message" title="Send"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button></div>
      <p class="cerr" id="cerr" role="alert"></p>
    </form>
    <span class="open"><i></i>Open to opportunities</span>
  </section>

  <section aria-labelledby="h-writing">
    <h2 id="h-writing">Writing</h2>
    <p class="wintro">Occasionally writing about systems, experiments, and things I'm exploring.</p>
    <div class="plist" data-posts="3"><p style="color:var(--faint);font-size:15px;padding:10px 0">Loading posts…</p></div>
    <div class="chips" style="padding:16px 0 0"><a class="chip" href="/blogs">Read the blog</a></div>
  </section>

  <figure class="mon" id="mon" style="margin-left:0;margin-right:0;margin-bottom:0"><blockquote class="sr">${QUOTE.text} ${QUOTE.who}</blockquote>
    <div class="crt" aria-hidden="true"><div><span id="qt"></span><span class="cur"></span></div><div class="who" id="qw">${QUOTE.who}</div></div>
  </figure>

</div>

  <footer>
    <div class="foot"><span id="vwrap" style="visibility:hidden">You are the <b id="vcount">&nbsp;</b> visitor</span></div>
    <button class="island paused" id="island" aria-expanded="false" aria-label="Music I'm listening to"><span class="art" id="iArt" aria-hidden="true"></span><span class="tx"><b id="iTitle">Spotify</b><small id="iSub">Last.fm</small></span><span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><a class="play" id="iLink" href="#" target="_blank" rel="noopener">Play on Spotify ↗</a><span class="bar" aria-hidden="true"><i></i></span></button>
  </footer>
<div class="toast" id="toast" role="status">Email copied</div>
</main>

<div class="meadow" id="night"><canvas id="nightC" role="img" aria-label="Pixel art of a person working at a retro computer in an open meadow. Tap to send a breeze."></canvas>
  <div class="mf">
    <div class="mbrand"><b>Surya Prakash</b>
      <p>Exploring AI, scalable systems, and immersive web experiences through building and experimentation.</p></div>
    <nav class="mcols" aria-label="Footer">
      <div><h4>Explore</h4><!-- <a href="#h-work">Work</a> --><a href="#h-research">Research</a><a href="#h-projects">Projects</a><a href="/blogs">Blog</a></div>
      <div><h4>Contact</h4><a href="mailto:isurya2005@gmail.com">Email</a><a ${ext('https://www.suryaprakash.me/SURYA-RESUME.pdf')}>Resume</a></div>
      <div><h4>Social</h4><a ${ext('https://github.com/isuryaprakashh')}>GitHub</a><a ${ext('https://linkedin.com/in/isuryaprakashh')}>LinkedIn</a><a ${ext('https://x.com/isuryaprakashh')}>X</a><a href="/login">Login</a></div>
    </nav>
  </div>
  <div class="mcopy">© 2026 Surya Prakash. All rights reserved.</div>
</div>
${snapshot('meadow', '.px .meadow')}

<div class="peek" id="peek" aria-hidden="true"><img id="peekImg" alt=""></div>
<dialog id="dlg" aria-labelledby="dTitle">
  <button class="x" id="dClose" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
  <div class="mimg"><img id="dImg" alt=""></div>
  <div class="mbody"><h3 id="dTitle"></h3><p id="dText"></p><div class="mtags" id="dTags"></div><div class="chips" id="dLinks" style="padding:0"></div></div>
</dialog>`;

export default MARKUP;
