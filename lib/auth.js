import crypto from 'crypto'

// The admin cookie holds an HMAC derived from your ADMIN_USERNAME / ADMIN_PASSWORD,
// so it can't be forged by simply setting admin_token=authenticated in the browser.
export function adminToken() {
  const user = process.env.ADMIN_USERNAME
  const pass = process.env.ADMIN_PASSWORD
  if (!user || !pass) return null
  return crypto.createHmac('sha256', pass).update(`admin:${user}`).digest('hex')
}

export function isAdmin(request) {
  const expected = adminToken()
  const got = request.cookies.get('admin_token')?.value
  if (!expected || !got) return false
  const a = Buffer.from(got)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

export function safeEqual(a, b) {
  const x = Buffer.from(String(a ?? ''))
  const y = Buffer.from(String(b ?? ''))
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}
