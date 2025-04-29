import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.exchangeCodeForSession(code);

    if (session) {
      const user = session.user;

      // profiles 테이블에 유저 정보 upsert
      await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        display_name: user.user_metadata.full_name,
      });
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin);
}
