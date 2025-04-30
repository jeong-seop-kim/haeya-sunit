"use client";

import { useAuthStore } from "@/store/auth";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuthStore();
  const { user } = useAuthStore();
  console.log("🚀 ~ LoginPage ~ user:", user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900">
      <div className="text-center space-y-8">
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src="/sun.png"
            alt="해야 로고"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="italic text-4xl font-bold text-slate-500 dark:text-slate-400">
          HaeYa
        </h1>

        <button
          onClick={login}
          className="mx-auto flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span>Google로 계속하기</span>
        </button>
      </div>
    </div>
  );
}
