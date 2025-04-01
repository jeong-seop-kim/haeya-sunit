import { useTodoStore } from "@/store/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  due_date: string | null;
  start_date: string | null;
  has_start_date: boolean;
  sub_todos: SubTodo[];
}

interface SubTodo {
  id: number;
  todo_id: number;
  title: string;
  content: string;
  completed: boolean;
}

export function useTodos() {
  const queryClient = useQueryClient();
  const setTodos = useTodoStore((state) => state.setTodos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const addSubTodo = useTodoStore((state) => state.addSubTodo);
  const updateSubTodo = useTodoStore((state) => state.updateSubTodo);
  const deleteSubTodo = useTodoStore((state) => state.deleteSubTodo);

  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/api/todos");
      const data = await response.json();
      setTodos(data);
      return data;
    },
  });

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo: Omit<Todo, "id" | "sub_todos">) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      return response.json();
    },
    onSuccess: (data) => {
      addTodo({ ...data, sub_todos: [] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Todo> & { id: number }) => {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      updateTodo(data.id, data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/todos?id=${id}`, {
        method: "DELETE",
      });
      return id;
    },
    onSuccess: (id) => {
      deleteTodo(id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const createSubTodoMutation = useMutation({
    mutationFn: async ({ todo_id, ...newSubTodo }: Omit<SubTodo, "id">) => {
      const response = await fetch("/api/sub-todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...newSubTodo, todo_id }),
      });
      return response.json();
    },
    onSuccess: (data) => {
      addSubTodo(data.todo_id, data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateSubTodoMutation = useMutation({
    mutationFn: async ({
      id,
      todoId,
      ...updates
    }: Partial<SubTodo> & { id: number; todoId: number }) => {
      const response = await fetch("/api/sub-todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...updates }),
      });
      return { ...response.json(), todoId };
    },
    onSuccess: (data) => {
      updateSubTodo(data.todoId, data.id, data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteSubTodoMutation = useMutation({
    mutationFn: async ({ id, todoId }: { id: number; todoId: number }) => {
      await fetch(`/api/sub-todos?id=${id}`, {
        method: "DELETE",
      });
      return { id, todoId };
    },
    onSuccess: ({ id, todoId }) => {
      deleteSubTodo(todoId, id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    createSubTodo: createSubTodoMutation.mutate,
    updateSubTodo: updateSubTodoMutation.mutate,
    deleteSubTodo: deleteSubTodoMutation.mutate,
  };
}
