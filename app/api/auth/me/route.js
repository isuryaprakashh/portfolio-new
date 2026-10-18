import { NextResponse } from 'next/server';
import { isAdmin } from '@/lib/auth';

export async function GET(request) {
  if (isAdmin(request)) {
    return NextResponse.json({ isAuthenticated: true });
  }
  
  return NextResponse.json({ isAuthenticated: false }, { status: 401 });
}
