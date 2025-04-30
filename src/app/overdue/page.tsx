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

export default function OverdueTodosPage() {
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

  // 지난 투두 필터링
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdueTodos = todos?.filter((todo) => {
    if (!todo.due_date || todo.completed) return false;
    const dueDate = new Date(todo.due_date);
    return dueDate < today;
  });

  // 마감일 기준으로 정렬 (가장 오래된 것부터)
  overdueTodos?.sort((a, b) => {
    if (!a.due_date || !b.due_date) return 0;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  return (
    <div className="min-h-screen  dark:bg-gray-900 text-slate-500 dark:text-slate-400 p-8">
      <div className="max-w-2xl mx-auto">
        <Header onAddClick={() => setIsModalOpen(true)} />
        {(error || fetchError) && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error || fetchError?.message}
          </div>
        )}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">지난 할 일</h1>
          <p className="text-gray-500">
            마감일이 지났지만 아직 완료되지 않은 할 일입니다.
          </p>
        </div>
        {overdueTodos?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            지난 할 일이 없습니다.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-700">
                ⚠️ {overdueTodos?.length}개의 지난 할 일이 있습니다.
              </p>
            </div>
            <TodoList
              todos={overdueTodos || []}
              onToggle={handleToggleTodo}
              onDelete={deleteTodo}
              onEdit={handleEditTodo}
              onAddSubTodo={handleAddSubTodo}
              onToggleSubTodo={handleToggleSubTodo}
              onDeleteSubTodo={handleDeleteSubTodo}
            />
          </div>
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
