import { useTodoStore } from "@/store/todo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface SubTodo {
  id: number;
  todo_id: number;
  title: string;
  content: string;
  completed: boolean;
}

export interface Todo {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  due_date: string | null;
  start_date: string | null;
  has_start_date: boolean;
  sub_todos: SubTodo[];
}

interface ApiError {
  message: string;
  status: number;
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

  const { data: todos, error: fetchError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const { data } = await axios.get<Todo[]>("/api/todos");
        setTodos(data);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw {
            message:
              error.response?.data?.message ||
              "할 일 목록을 불러오는데 실패했습니다.",
            status: error.response?.status || 500,
          } as ApiError;
        }
        throw error;
      }
    },
  });

  const createTodoMutation = useMutation({
    mutationFn: async (newTodo: Omit<Todo, "id" | "sub_todos">) => {
      try {
        const { data } = await axios.post<Todo>("/api/todos", newTodo);
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw {
            message:
              error.response?.data?.message || "할 일 생성에 실패했습니다.",
            status: error.response?.status || 500,
          } as ApiError;
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      addTodo({ ...data, sub_todos: [] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Todo> & { id: number }) => {
      try {
        const { data } = await axios.put<Todo>(`/api/todos`, {
          id,
          ...updates,
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw {
            message:
              error.response?.data?.message || "할 일 수정에 실패했습니다.",
            status: error.response?.status || 500,
          } as ApiError;
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      updateTodo(data.id, data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async (id: number) => {
      try {
        await axios.delete(`/api/todos?id=${id}`);
        return id;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw {
            message:
              error.response?.data?.message || "할 일 삭제에 실패했습니다.",
            status: error.response?.status || 500,
          } as ApiError;
        }
        throw error;
      }
    },
    onSuccess: (id) => {
      deleteTodo(id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const createSubTodoMutation = useMutation({
    mutationFn: async ({ todo_id, ...newSubTodo }: Omit<SubTodo, "id">) => {
      try {
        const { data } = await axios.post<SubTodo>("/api/sub-todos", {
          ...newSubTodo,
          todo_id,
        });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw {
            message:
              error.response?.data?.message ||
              "서브 할 일 생성에 실패했습니다.",
            status: error.response?.status || 500,
          } as ApiError;
        }
        throw error;
      }
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
      try {
        const { data } = await axios.put<SubTodo>("/api/sub-todos", {
          id,
          ...updates,
        });
        return { ...data, todoId };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw {
            message:
              error.response?.data?.message ||
              "서브 할 일 수정에 실패했습니다.",
            status: error.response?.status || 500,
          } as ApiError;
        }
        throw error;
      }
    },
    onSuccess: (data) => {
      updateSubTodo(data.todoId, data.id, data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteSubTodoMutation = useMutation({
    mutationFn: async ({ id, todoId }: { id: number; todoId: number }) => {
      try {
        await axios.delete(`/api/sub-todos?id=${id}`);
        return { id, todoId };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw {
            message:
              error.response?.data?.message ||
              "서브 할 일 삭제에 실패했습니다.",
            status: error.response?.status || 500,
          } as ApiError;
        }
        throw error;
      }
    },
    onSuccess: ({ id, todoId }) => {
      deleteSubTodo(todoId, id);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos,
    error: fetchError as ApiError | null,
    createTodo: createTodoMutation.mutate,
    updateTodo: updateTodoMutation.mutate,
    deleteTodo: deleteTodoMutation.mutate,
    createSubTodo: createSubTodoMutation.mutate,
    updateSubTodo: updateSubTodoMutation.mutate,
    deleteSubTodo: deleteSubTodoMutation.mutate,
  };
}
