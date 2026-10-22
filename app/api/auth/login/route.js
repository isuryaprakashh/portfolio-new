import { NextResponse } from 'next/server';
import { adminToken, safeEqual } from '@/lib/auth';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const token = adminToken();

    if (!adminUsername || !adminPassword || !token) {
      return NextResponse.json({ success: false, message: 'Admin login is not configured' }, { status: 503 });
    }

    if (safeEqual(username, adminUsername) && safeEqual(password, adminPassword)) {
      // Create response
      const response = NextResponse.json({ success: true }, { status: 200 });
      
      // Set an HTTP-only cookie to keep the user logged in
      response.cookies.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
