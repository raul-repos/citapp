// Wraps the whole application to avoid unauthenticated access
// Refer to [documentation for more info](https://nextjs.org/docs/pages/building-your-application/routing/middleware)

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
	// exclude index page, TRPC calls and next.js stuff
	const isPrivatePath = !request.nextUrl.pathname.includes('/api/') && request.nextUrl.pathname !== '/' && !request.nextUrl.pathname.includes('/_next/')
	if (isPrivatePath) {
		const hasAuthCookie = request.cookies.has('next-auth.session-token') //Authentication token
		if (!hasAuthCookie) return NextResponse.redirect(new URL('/', request.url))
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
