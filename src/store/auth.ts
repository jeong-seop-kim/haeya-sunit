import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  fetchUser: async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    set({ user, isLoggedIn: !!user });
  },

  login: async () => {
    const response = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/auth/callback"
            : "https://haeya-sunit.vercel.app/auth/callback",
        scopes: "email profile https://www.googleapis.com/auth/calendar",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (response?.error) throw response.error;
  },

  logout: async () => {
    try {
      // 1. Supabase 세션 로그아웃
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      // 2. 세션 토큰 초기화
      await supabase.auth.setSession({
        access_token: "",
        refresh_token: "",
      });

      // 3. 로컬 스토리지 클리어
      if (typeof window !== "undefined") {
        // Supabase 관련 로컬 스토리지 항목 제거
        localStorage.removeItem("sb-kxuixxexrdjabszzheoz-auth-token");
        localStorage.removeItem("sb-kxuixxexrdjabszzheoz-refresh-token");

        // Supabase 쿠키 제거
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(
              /=.*/,
              "=;expires=" + new Date().toUTCString() + ";path=/"
            );
        });

        // 특정 Supabase 쿠키 명시적 제거
        document.cookie =
          "sb-kxuixxexrdjabszzheoz-auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "sb-kxuixxexrdjabszzheoz-refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }

      // 4. 상태 초기화
      set({ user: null, isLoggedIn: false });

      // 5. 페이지 새로고침으로 모든 상태 초기화
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
}));
