"use client";

import Header from "@/components/Header";
import TodoList from "@/components/TodoList";
import TodoModal from "@/components/TodoModal";
import { useCallback, useState } from "react";

interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  dueDate: Date | null;
  startDate: Date | null;
  hasStartDate: boolean;
  subItems: SubTodo[];
}

interface SubTodo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTodo = useCallback(
    (
      title: string,
      content: string,
      dueDate: Date | null,
      startDate: Date | null,
      hasStartDate: boolean
    ) => {
      setTodos((prevTodos) => [
        ...prevTodos,
        {
          id: Date.now(),
          title,
          content,
          completed: false,
          dueDate,
          startDate,
          hasStartDate,
          subItems: [],
        },
      ]);
    },
    []
  );

  const toggleTodo = useCallback((id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const editTodo = useCallback(
    (
      id: number,
      title: string,
      content: string,
      dueDate: Date | null,
      startDate: Date | null,
      hasStartDate: boolean
    ) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                title,
                content,
                dueDate,
                startDate,
                hasStartDate,
              }
            : todo
        )
      );
    },
    []
  );

  const addSubTodo = useCallback(
    (parentId: number, title: string, content: string) => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === parentId
            ? {
                ...todo,
                subItems: [
                  ...todo.subItems,
                  {
                    id: Date.now(),
                    title,
                    content,
                    completed: false,
                  },
                ],
              }
            : todo
        )
      );
    },
    []
  );

  const toggleSubTodo = useCallback((parentId: number, subId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === parentId
          ? {
              ...todo,
              subItems: todo.subItems.map((subItem) =>
                subItem.id === subId
                  ? { ...subItem, completed: !subItem.completed }
                  : subItem
              ),
            }
          : todo
      )
    );
  }, []);

  const deleteSubTodo = useCallback((parentId: number, subId: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === parentId
          ? {
              ...todo,
              subItems: todo.subItems.filter((subItem) => subItem.id !== subId),
            }
          : todo
      )
    );
  }, []);

  return (
    <main className="min-h-screen bg-white text-orange-500 p-8">
      <div className="max-w-2xl mx-auto">
        <Header onAddClick={() => setIsModalOpen(true)} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onAddSubTodo={addSubTodo}
          onToggleSubTodo={toggleSubTodo}
          onDeleteSubTodo={deleteSubTodo}
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
