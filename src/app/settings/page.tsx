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
    <div className="min-h-screen  dark:bg-gray-900 text-orange-500 dark:text-orange-400 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">설정</h1>
          <p className="text-gray-500 dark:text-gray-400">
            앱의 모양과 동작을 원하는 대로 커스터마이즈하세요.
          </p>
        </div>

        {/* 테마 설정 */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">테마</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => handleThemeChange("light")}
              className={`px-4 py-2 rounded-lg ${
                theme === "light"
                  ? "bg-orange-500 text-white"
                  : " dark:bg-gray-800 text-orange-500 border border-orange-200 dark:border-orange-700"
              }`}
            >
              라이트 모드
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`px-4 py-2 rounded-lg ${
                theme === "dark"
                  ? "bg-orange-500 text-white"
                  : " dark:bg-gray-800 text-orange-500 border border-orange-200 dark:border-orange-700"
              }`}
            >
              다크 모드
            </button>
          </div>
        </div>

        {/* 알림 설정 */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">알림</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">마감일 알림</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                할 일의 마감일이 다가오면 알림을 받습니다.
              </p>
            </div>
            <button
              onClick={handleNotificationToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                settings.notifications
                  ? "bg-orange-500"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full  transition ${
                  settings.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* 기본 설정 */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mb-6">
          <h2 className="text-lg font-semibold mb-4">기본 설정</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">시작일 기본 설정</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  새로운 할 일 생성 시 시작일을 오늘로 설정합니다.
                </p>
              </div>
              <button
                onClick={handleDefaultStartDateToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.defaultStartDate
                    ? "bg-orange-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full  transition ${
                    settings.defaultStartDate
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* 아카이브 설정 */}
        <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">아카이브</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">자동 아카이브</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  완료된 할 일을 자동으로 아카이브합니다.
                </p>
              </div>
              <button
                onClick={handleAutoArchiveToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  settings.autoArchive
                    ? "bg-orange-500"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full  transition ${
                    settings.autoArchive ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            {settings.autoArchive && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">아카이브 기간</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    완료 후 아카이브까지의 기간을 설정합니다.
                  </p>
                </div>
                <select
                  value={settings.archiveDays}
                  onChange={(e) =>
                    handleArchiveDaysChange(Number(e.target.value))
                  }
                  className="px-3 py-1 rounded-lg border border-orange-200 dark:border-orange-700  dark:bg-gray-800"
                >
                  <option value="7">7일</option>
                  <option value="14">14일</option>
                  <option value="30">30일</option>
                  <option value="60">60일</option>
                  <option value="90">90일</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
