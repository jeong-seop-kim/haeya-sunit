"use client";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { href: "/today", label: "오늘의 투두", icon: "🔥" },
  { href: "/overdue", label: "지난 투두", icon: "⏳" },
  { href: "/all", label: "전체 보기", icon: "📋" },
  { href: "/stats", label: "통계", icon: "📊" },
  { href: "/settings", label: "설정", icon: "⚙️" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <>
      {/* 데스크톱 네비게이션 */}
      <nav className="hidden lg:block w-64 h-screen bg-white dark:bg-gray-900 border-r border-orange-100 dark:border-orange-900 p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              draggable={false}
              className={`select-none flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white hover:text-gray-900 dark:hover:text-gray-900"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          {user && (
            <Link
              href="/profile"
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === "/profile"
                  ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white hover:text-gray-900 dark:hover:text-gray-900"
              }`}
            >
              <span>👤</span>
              <span>프로필</span>
            </Link>
          )}
        </div>
      </nav>

      {/* 모바일 네비게이션 */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-orange-100 dark:border-orange-900 p-2">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              draggable={false}
              className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-colors ${
                pathname === item.href
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
          {user && (
            <Link
              href="/profile"
              className={`flex flex-col items-center space-y-1 px-2 py-1 rounded-lg transition-colors ${
                pathname === "/profile"
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              <span className="text-xl">👤</span>
              <span className="text-xs">프로필</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
