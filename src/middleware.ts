import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 인증이 필요한 경로들
  const protectedPaths = ["/today", "/overdue", "/all", "/stats", "/profile"];
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  // 인증되지 않은 사용자가 보호된 경로에 접근하려고 할 때
  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 이미 로그인한 사용자가 로그인 페이지에 접근하려고 할 때
  if (session && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/today", request.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
