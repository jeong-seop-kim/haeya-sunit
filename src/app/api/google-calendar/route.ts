import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { google } from "googleapis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const GOOGLE_CALENDAR_ID = "primary";

async function getGoogleOAuthToken(userId: string) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();
  if (sessionError || !session) {
    throw new Error("인증 세션을 찾을 수 없습니다.");
  }

  // 쿠키에서 provider token 가져오기
  const cookieStore = cookies();
  const providerToken = cookieStore.get("google_provider_token")?.value;

  if (!providerToken) {
    throw new Error(
      "Google Provider 토큰을 찾을 수 없습니다. 다시 로그인해주세요."
    );
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    access_token: providerToken,
  });

  return oauth2Client;
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // 현재 세션 확인
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { title, description, due_date, start_date } = body;

    const auth = await getGoogleOAuthToken(session.user.id);
    const calendar = google.calendar({ version: "v3", auth });

    const event = {
      summary: title,
      description: description || "",
      start: {
        dateTime: start_date || due_date,
        timeZone: "Asia/Seoul",
      },
      end: {
        dateTime: due_date,
        timeZone: "Asia/Seoul",
      },
      reminders: {
        useDefault: true,
      },
    };

    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      requestBody: event,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Google Calendar 이벤트 추가 실패:", error);
    return new NextResponse(JSON.stringify({ error: error }), { status: 500 });
  }
}
