"use client";

import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import TodoModal from "@/components/TodoModal";
import type { Todo } from "@/hooks/useTodos";
import { useTodos } from "@/hooks/useTodos";
import { useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
    createSubTodo,
    updateSubTodo,
    deleteSubTodo,
  } = useTodos();

  const handleAddTodo = (
    title: string,
    content: string,
    dueDate: Date | null,
    startDate: Date | null,
    hasStartDate: boolean
  ) => {
    createTodo({
      title,
      content,
      completed: false,
      due_date: dueDate?.toISOString() || null,
      start_date: startDate?.toISOString() || null,
      has_start_date: hasStartDate,
    });
    setIsModalOpen(false);
  };

  const handleToggleTodo = (id: number) => {
    const todo = todos?.find((t: Todo) => t.id === id);
    if (todo) {
      updateTodo({
        id,
        completed: !todo.completed,
      });
    }
  };

  const handleEditTodo = (
    id: number,
    title: string,
    content: string,
    dueDate: Date | null,
    startDate: Date | null,
    hasStartDate: boolean
  ) => {
    updateTodo({
      id,
      title,
      content,
      due_date: dueDate?.toISOString() || null,
      start_date: startDate?.toISOString() || null,
      has_start_date: hasStartDate,
    });
  };

  const handleAddSubTodo = (
    parentId: number,
    title: string,
    content: string
  ) => {
    createSubTodo({
      todo_id: parentId,
      title,
      content,
      completed: false,
    });
  };

  const handleToggleSubTodo = (parentId: number, subId: number) => {
    const todo = todos?.find((t: Todo) => t.id === parentId);
    const subTodo = todo?.sub_todos.find(
      (s: Todo["sub_todos"][0]) => s.id === subId
    );
    if (subTodo) {
      updateSubTodo({
        id: subId,
        todoId: parentId,
        completed: !subTodo.completed,
      });
    }
  };

  const handleDeleteSubTodo = (parentId: number, subId: number) => {
    deleteSubTodo({ id: subId, todoId: parentId });
  };

  return (
    <main className="min-h-screen bg-white text-orange-500 p-8">
      <div className="max-w-2xl mx-auto">
        <Header onAddClick={() => setIsModalOpen(true)} />
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
