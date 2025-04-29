// app/auth/callback/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    // ❌ code 없으면 홈으로
    return NextResponse.redirect(`${requestUrl.origin}/`);
  }

  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    // ❌ 로그인 실패하면 홈으로
    console.error("로그인 실패:", error.message);
    return NextResponse.redirect(`${requestUrl.origin}/`);
  }

  // ✅ 성공하면 today로 이동
  return NextResponse.redirect(`${requestUrl.origin}/today`);
}
