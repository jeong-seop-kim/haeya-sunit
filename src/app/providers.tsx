"use client";

import ThemeProvider from "@/components/ThemeProvider";
import { useAuthStore } from "@/store/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const fetchUser = useAuthStore((s) => s.fetchUser);
  const user = useAuthStore((s) => s.user);
  console.log("🚀 ~ Providers ~ user:", user);

  useEffect(() => {
    fetchUser().catch(console.error); // 로그인한 경우만 성공
  }, [fetchUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false}  /> */}
    </QueryClientProvider>
  );
}
