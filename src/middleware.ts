import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// 인증이 필요한 경로 목록
const protectedRoutes = [
  "/today",
  "/overdue",
  "/all",
  "/stats",
  "/settings",
  "/profile",
];

// 인증된 사용자가 접근하면 리다이렉트할 경로 목록 (예: 로그인 페이지)
const authRoutes = ["/", "/login"];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // 현재 세션 확인
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const path = request.nextUrl.pathname;

  // 인증이 필요한 페이지에 접근하려는 경우
  if (protectedRoutes.some((route) => path.startsWith(route))) {
    if (!session) {
      // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
      const redirectUrl = new URL("/", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 이미 인증된 사용자가 로그인/회원가입 페이지에 접근하려는 경우
  if (authRoutes.includes(path)) {
    if (session) {
      // 인증된 사용자는 today 페이지로 리다이렉트
      const redirectUrl = new URL("/today", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

// 미들웨어가 실행될 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - auth/callback (auth callback)
     */
    "/((?!_next/static|_next/image|favicon.ico|public|auth/callback).*)",
  ],
};
