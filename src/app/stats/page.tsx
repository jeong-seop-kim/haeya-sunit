"use client";

import type { Todo } from "@/hooks/useTodos";
import { useTodos } from "@/hooks/useTodos";

interface Stats {
  totalTodos: number;
  completedTodos: number;
  completionRate: number;
  weeklyStats: {
    date: string;
    completed: number;
    total: number;
    rate: number;
  }[];
  monthlyStats: {
    date: string;
    completed: number;
    total: number;
    rate: number;
  }[];
}

function calculateStats(todos: Todo[] | undefined): Stats {
  if (!todos) {
    return {
      totalTodos: 0,
      completedTodos: 0,
      completionRate: 0,
      weeklyStats: [],
      monthlyStats: [],
    };
  }

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // 전체 통계
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const completionRate =
    totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  // 주간 통계
  const weeklyStats = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + i);
    const dayTodos = todos.filter((todo) => {
      const todoDate = new Date(todo.due_date || "");
      return todoDate.toDateString() === date.toDateString();
    });
    const completed = dayTodos.filter((todo) => todo.completed).length;
    const total = dayTodos.length;
    return {
      date: date.toLocaleDateString("ko-KR", { weekday: "short" }),
      completed,
      total,
      rate: total > 0 ? (completed / total) * 100 : 0,
    };
  });

  // 월간 통계
  const monthlyStats = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(today.getFullYear(), i, 1);
    const monthTodos = todos.filter((todo) => {
      const todoDate = new Date(todo.due_date || "");
      return (
        todoDate.getMonth() === date.getMonth() &&
        todoDate.getFullYear() === date.getFullYear()
      );
    });
    const completed = monthTodos.filter((todo) => todo.completed).length;
    const total = monthTodos.length;
    return {
      date: date.toLocaleDateString("ko-KR", { month: "short" }),
      completed,
      total,
      rate: total > 0 ? (completed / total) * 100 : 0,
    };
  });

  return {
    totalTodos,
    completedTodos,
    completionRate,
    weeklyStats,
    monthlyStats,
  };
}

export default function StatsPage() {
  const { todos, error: fetchError } = useTodos();
  const stats = calculateStats(todos);

  return (
    <div className="min-h-screen  dark:bg-gray-900 text-slate-500 dark:text-slate-400 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">통계 및 회고</h1>
          <p className="text-gray-500">
            할 일 완료 현황과 생산성을 확인해보세요.
          </p>
        </div>

        {fetchError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {fetchError.message}
          </div>
        )}

        {/* 전체 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">전체 할 일</h3>
            <p className="text-3xl font-bold">{stats.totalTodos}개</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">완료된 할 일</h3>
            <p className="text-3xl font-bold">{stats.completedTodos}개</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">완료율</h3>
            <p className="text-3xl font-bold">
              {stats.completionRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* 주간 통계 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">주간 통계</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {stats.weeklyStats.map((day, index) => (
              <div
                key={index}
                className="bg-slate-50 p-4 rounded-lg text-center"
              >
                <p className="font-semibold mb-2">{day.date}</p>
                <p className="text-sm text-gray-600">
                  {day.completed}/{day.total}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-slate-500 h-2 rounded-full"
                    style={{ width: `${day.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 월간 통계 */}
        <div>
          <h2 className="text-xl font-bold mb-4">월간 통계</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {stats.monthlyStats.map((month, index) => (
              <div
                key={index}
                className="bg-slate-50 p-4 rounded-lg text-center"
              >
                <p className="font-semibold mb-2">{month.date}</p>
                <p className="text-sm text-gray-600">
                  {month.completed}/{month.total}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-slate-500 h-2 rounded-full"
                    style={{ width: `${month.rate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
