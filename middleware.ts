// middleware.ts
import { NextResponse } from 'next/server'
import * as jose from 'jose'
import type { NextRequest } from 'next/server'

import { JWT_SECRET } from './lib/contants'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('session')
    if (!token) {
      throw Error('Not logged in')
    }

    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    )
    if (!payload) {
      throw Error('Session verification error')
    }
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}
