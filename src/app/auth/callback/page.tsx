"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const provider_token = params.get("provider_token");

        if (access_token && refresh_token) {
          await supabase.auth.setSession({
            access_token,
            refresh_token,
          });

          // provider token을 쿠키에 저장 (7일 유효)
          if (provider_token) {
            Cookies.set("google_provider_token", provider_token, {
              expires: 7,
            });
          }

          router.replace("/today");
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.replace("/");
      }
    };

    handleCallback();
  }, [router, supabase]);

  return <p>로그인 처리 중입니다...</p>;
}
