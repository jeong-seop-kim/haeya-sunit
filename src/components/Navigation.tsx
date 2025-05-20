"use client";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import BeforeIcon from "./icons/BeforeIcon";
import ListIcon from "./icons/ListIcon";
import SettingIcon from "./icons/SettingIcon";
import StatisticsIcon from "./icons/StatisticsIcon";
import TodayIcon from "./icons/TodayIcon";
import UserIcon from "./icons/UserIcon";

interface NavItem {
  href: string;
  label: string;
  icon: ReactNode;
}

const navItems: NavItem[] = [
  {
    href: "/today",
    label: "오늘의 투두",
    icon: <TodayIcon className="w-6 h-6" />,
  },
  {
    href: "/overdue",
    label: "지난 투두",
    icon: <BeforeIcon className="w-6 h-6" />,
  },
  { href: "/all", label: "전체 보기", icon: <ListIcon className="w-6 h-6" /> },
  {
    href: "/stats",
    label: "통계",
    icon: <StatisticsIcon className="w-6 h-6" />,
  },
  {
    href: "/settings",
    label: "설정",
    icon: <SettingIcon className="w-6 h-6" />,
  },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <>
      {/* 데스크톱 네비게이션 */}
      <nav className="hidden lg:block h-full bg-white dark:bg-gray-900 border-r border-slate-100 dark:border-slate-900 p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              draggable={false}
              className={`select-none flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-slate-50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white hover:text-gray-900 dark:hover:text-gray-900"
              }`}
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          {user && (
            <Link
              href="/profile"
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/profile"
                  ? "bg-slate-50 dark:bg-slate-900/30 text-slate-600 dark:text-slate-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white hover:text-gray-900 dark:hover:text-gray-900"
              }`}
            >
              <span>
                <UserIcon className="w-6 h-6" />
              </span>
              <span>프로필</span>
            </Link>
          )}
        </div>
      </nav>

      {/* 모바일 네비게이션 */}
      <nav className=" lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-slate-100 dark:border-slate-900 p-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              draggable={false}
              className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-colors ${
                pathname === item.href
                  ? "text-slate-600 dark:text-slate-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-xs">{item.label}</span>
            </Link>
          ))}
          {user && (
            <Link
              href="/profile"
              className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-colors ${
                pathname === "/profile"
                  ? "text-slate-600 dark:text-slate-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="text-xl">
                <UserIcon className="w-6 h-6" />
              </span>
              <span className="text-xs">프로필</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
