import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';

// Session probe used by the blog UI. Always 200: "not signed in" is the normal
// state for visitors, not an error, so it shouldn't show up as a failed request.
export async function GET(request) {
  return NextResponse.json(
    { isAuthenticated: isAdmin(request) },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
