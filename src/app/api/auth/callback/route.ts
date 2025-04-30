// /app/api/auth/callback/route.ts (App Router 기준)
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("🚀 ~ GET ~ request:", request);
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  console.log("🚀 ~ GET ~ code:", code);

  if (!code) return NextResponse.redirect(`${requestUrl.origin}/`);

  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) return NextResponse.redirect(`${requestUrl.origin}/`);

  return NextResponse.redirect(`${requestUrl.origin}/today`);
}
