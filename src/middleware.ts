import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authSecret = process.env.NEXTAUTH_SECRET;

const privateRoutes = [
  "/",
  "/new-session",
  "/report-history",
  "/billing",
  "/support",
  "/settings",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: authSecret });
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = pathname.startsWith("/auth");

  const isPrivateRoute = privateRoutes.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!token && isPrivateRoute) {
    return NextResponse.redirect(
      new URL("/auth/sign-in", req.url)
    );
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/new-session/:path*",
    "/report-history/:path*",
    "/billing/:path*",
    "/support/:path*",
    "/settings/:path*",
    "/auth/:path*",
  ],
};
