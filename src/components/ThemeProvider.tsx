"use client";

import { useThemeStore } from "@/store/theme";
import { useEffect, useState } from "react";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useThemeStore((state) => state.theme);
  const [mounted, setMounted] = useState(false);

  // 초기 테마 설정
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme-storage");
    if (savedTheme) {
      const parsed = JSON.parse(savedTheme);
      if (parsed.state.theme === "dark") {
        document.documentElement.classList.add("dark");
      }
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      useThemeStore.setState({ theme: "dark" });
    }
    setMounted(true);
  }, []);

  // 테마 변경 시 클래스 토글
  useEffect(() => {
    if (!mounted) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mounted]);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}
