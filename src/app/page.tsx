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

export default function Home() {
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

  return (
    <main className="min-h-screen bg-white text-orange-500 p-8">
      <div className="max-w-2xl mx-auto">
        <Header onAddClick={() => setIsModalOpen(true)} />
        {(error || fetchError) && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error || fetchError?.message}
          </div>
        )}
        <TodoList
          todos={todos || []}
          onToggle={handleToggleTodo}
          onDelete={deleteTodo}
          onEdit={handleEditTodo}
          onAddSubTodo={handleAddSubTodo}
          onToggleSubTodo={handleToggleSubTodo}
          onDeleteSubTodo={handleDeleteSubTodo}
        />
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTodo}
      />
    </main>
  );
}
