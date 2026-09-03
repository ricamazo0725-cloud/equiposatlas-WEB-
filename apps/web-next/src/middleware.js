import { NextResponse } from "next/server";

// Respaldo a nivel de app: fuerza equiposatlas.com como dominio canónico
// aunque la config de DNS/Hostinger no redirija www -> no-www por su cuenta.
export function middleware(request) {
  const host = request.headers.get("host") || "";

  if (host.startsWith("www.")) {
    const url = new URL(request.url);
    url.host = host.slice(4);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
