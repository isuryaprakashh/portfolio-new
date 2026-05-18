import { NextResponse } from 'next/server';

export async function GET(request) {
  const token = request.cookies.get('admin_token');
  
  if (token && token.value === 'authenticated') {
    return NextResponse.json({ isAuthenticated: true });
  }
  
  return NextResponse.json({ isAuthenticated: false }, { status: 401 });
}
