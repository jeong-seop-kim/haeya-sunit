"use client";

import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import TodoModal from "@/components/TodoModal";
import type { Todo } from "@/hooks/useTodos";
import { useTodos } from "@/hooks/useTodos";
import { useState } from "react";

interface ApiError {
  message: string;
  status: number;
}

export default function TodayTodosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const {
    todos,
    error: fetchError,
    createTodo,
    updateTodo,
    deleteTodo,
    createSubTodo,
    updateSubTodo,
    deleteSubTodo,
  } = useTodos();

  const handleError = (error: ApiError) => {
    setError(error.message || "오류가 발생했습니다.");
    setTimeout(() => setError(null), 3000);
  };

  const handleAddTodo = async (
    title: string,
    content: string,
    dueDate: Date | null,
    startDate: Date | null,
    hasStartDate: boolean
  ) => {
    try {
      await createTodo({
        title,
        content,
        completed: false,
        due_date: dueDate?.toISOString() || null,
        start_date: startDate?.toISOString() || null,
        has_start_date: hasStartDate,
      });
      setIsModalOpen(false);
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      const todo = todos?.find((t: Todo) => t.id === id);
      if (todo) {
        await updateTodo({
          id,
          completed: !todo.completed,
        });
      }
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  const handleEditTodo = async (
    id: number,
    title: string,
    content: string,
    dueDate: Date | null,
    startDate: Date | null,
    hasStartDate: boolean
  ) => {
    try {
      await updateTodo({
        id,
        title,
        content,
        due_date: dueDate?.toISOString() || null,
        start_date: startDate?.toISOString() || null,
        has_start_date: hasStartDate,
      });
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  const handleAddSubTodo = async (
    parentId: number,
    title: string,
    content: string
  ) => {
    try {
      await createSubTodo({
        todo_id: parentId,
        title,
        content,
        completed: false,
      });
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  const handleToggleSubTodo = async (parentId: number, subId: number) => {
    try {
      const todo = todos?.find((t: Todo) => t.id === parentId);
      const subTodo = todo?.sub_todos.find(
        (s: Todo["sub_todos"][0]) => s.id === subId
      );
      if (subTodo) {
        await updateSubTodo({
          id: subId,
          todoId: parentId,
          completed: !subTodo.completed,
        });
      }
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  const handleDeleteSubTodo = async (parentId: number, subId: number) => {
    try {
      await deleteSubTodo({ id: subId, todoId: parentId });
    } catch (error) {
      handleError(error as ApiError);
    }
  };

  // 오늘 날짜의 투두만 필터링
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayTodos = todos?.filter((todo) => {
    if (!todo.due_date) return false;
    const dueDate = new Date(todo.due_date);
    return dueDate >= today && dueDate < tomorrow;
  });

  return (
    <div className="min-h-screen  dark:bg-gray-900 text-orange-500 dark:text-orange-400 p-8">
      <div className="max-w-2xl mx-auto">
        <Header onAddClick={() => setIsModalOpen(true)} />
        {(error || fetchError) && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error || fetchError?.message}
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">오늘의 할 일</h1>
          <p className="text-gray-500">
            {today.toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "long",
              day: "numeric",
              weekday: "long",
            })}
          </p>
        </div>
        {todayTodos?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            오늘은 할 일이 없습니다.
          </div>
        ) : (
          <TodoList
            todos={todayTodos || []}
            onToggle={handleToggleTodo}
            onDelete={deleteTodo}
            onEdit={handleEditTodo}
            onAddSubTodo={handleAddSubTodo}
            onToggleSubTodo={handleToggleSubTodo}
            onDeleteSubTodo={handleDeleteSubTodo}
          />
        )}
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTodo}
      />
    </div>
  );
}
