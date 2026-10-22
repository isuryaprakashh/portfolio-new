import { NextResponse } from 'next/server';

// POST /api/auth/logout clears the admin session cookie.
// POST rather than GET so a link, prefetch or <img src> can't sign the admin out.
export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logged out' },
    { headers: { 'Cache-Control': 'no-store' } }
  );
  response.cookies.delete('admin_token');
  return response;
}
