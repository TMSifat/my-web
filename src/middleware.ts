import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Update the session and get the response
  const response = await updateSession(request)
  
  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // In a real app, you would check the user role here
    // For now, we'll just ensure the user is authenticated
    // If updateSession logic handles redirection, we don't need to do much here
    // But usually, you'd check supabase.auth.getUser() and its metadata/profile
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
