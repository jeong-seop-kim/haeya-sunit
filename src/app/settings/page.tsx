"use client";

import { useThemeStore } from "@/store/theme";
import { useState } from "react";

interface Settings {
  notifications: boolean;
  defaultStartDate: boolean;
  autoArchive: boolean;
  archiveDays: number;
}

export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    defaultStartDate: true,
    autoArchive: true,
    archiveDays: 30,
  });

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const handleNotificationToggle = () => {
    setSettings((prev) => ({ ...prev, notifications: !prev.notifications }));
    // TODO: 알림 설정 변경 로직 구현
  };

  const handleDefaultStartDateToggle = () => {
    setSettings((prev) => ({
      ...prev,
      defaultStartDate: !prev.defaultStartDate,
    }));
    // TODO: 기본 시작일 설정 변경 로직 구현
  };

  const handleAutoArchiveToggle = () => {
    setSettings((prev) => ({ ...prev, autoArchive: !prev.autoArchive }));
    // TODO: 자동 아카이브 설정 변경 로직 구현
  };

  const handleArchiveDaysChange = (days: number) => {
    setSettings((prev) => ({ ...prev, archiveDays: days }));
    // TODO: 아카이브 기간 설정 변경 로직 구현
  };

  return (
    <div className="min-h-screen  dark:bg-gray-900 text-slate-500 dark:text-slate-400 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">설정</h1>
          <p className="text-gray-500 dark:text-gray-400">
            앱의 모양과 동작을 원하는 대로 커스터마이즈하세요.
          </p>
        </div>

        {/* 테마 설정 */}
        <div className="bg-slate-50 dark:bg-slate-900/20 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">테마</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleThemeChange("light")}
              className={`px-4 py-2 rounded-lg ${
                theme === "light"
                  ? "bg-slate-500 text-white"
                  : " dark:bg-gray-800 text-slate-500 border border-slate-200 dark:border-slate-700"
              }`}
            >
              라이트 모드
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`px-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-slate-500 text-white"
                  : " dark:bg-gray-800 text-slate-500 border border-slate-200 dark:border-slate-700"
              }`}
            >
              다크 모드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
