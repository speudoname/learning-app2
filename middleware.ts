import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default clerkMiddleware((auth, req: NextRequest) => {
  // Check if request is coming from the main app proxy
  const isProxied = req.headers.get('x-proxied-from') === 'learning-main';
  
  if (isProxied) {
    // Trust the main app's authentication
    return NextResponse.next();
  }
  
  // If not proxied, do normal Clerk authentication
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};