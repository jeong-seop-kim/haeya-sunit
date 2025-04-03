import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,
  setUser: (user) => set({ user, isLoggedIn: !!user }),
  login: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  },
  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, isLoggedIn: false });
  },
}));
