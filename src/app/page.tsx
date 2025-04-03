"use client";

import { useAuthStore } from "@/store/auth";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuthStore();

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
        <h1 className="text-4xl font-bold text-orange-500 dark:text-orange-400">
          해야
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          해야 할 일을 관리하는 애플리케이션
        </p>
        <button
          onClick={login}
          className="flex items-center justify-center space-x-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
