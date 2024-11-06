import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Appliquer l'en-tête "no-cache" pour les images
  if (request.nextUrl.pathname.startsWith("/_next/image")) {
    response.headers.set(
      "Cache-Control",
      "no-store, max-age=0, must-revalidate"
    );
  }

  return response;
}
