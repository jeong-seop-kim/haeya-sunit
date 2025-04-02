"use client";
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

  return (
    <nav className="w-64 h-screen  border-r border-orange-100 p-4">
      <div className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
              pathname === item.href
                ? "bg-orange-50 text-orange-600"
                : "hover:bg-orange-50"
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
