import type { NextRequest } from 'next/server'
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/(.*)'])

const isHomeRoute = createRouteMatcher(['/'])

export default clerkMiddleware(async (auth, request: NextRequest) => {
  const { userId, redirectToSignIn } = await auth()

  if (isPublicRoute(request)) {
    return NextResponse.next()
  }

  if (!userId) {
    return redirectToSignIn()
  }

  if (isHomeRoute(request)) {
    return NextResponse.rewrite(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
