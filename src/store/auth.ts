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
      },
    });
    if (response?.error) throw response.error;
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();

    // 🔐 Supabase 세션 토큰이 남아있는 경우 강제로 초기화 (클라이언트 측 캐시 방지용)
    await supabase.auth.setSession({
      access_token: "",
      refresh_token: "",
    });

    if (error) throw error;

    set({ user: null, isLoggedIn: false });
  },
}));
