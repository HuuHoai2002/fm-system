import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (
    !cookies.get(process.env.ACCESS_TOKEN_NAME as string) &&
    !cookies.get(process.env.REFRESH_TOKEN_NAME as string)
  ) {
    if (pathname !== "/login" && pathname !== "/register") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
