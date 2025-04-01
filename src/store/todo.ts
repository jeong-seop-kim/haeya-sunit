import { create } from "zustand";

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

interface TodoStore {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  deleteTodo: (id: number) => void;
  addSubTodo: (todoId: number, subTodo: SubTodo) => void;
  updateSubTodo: (
    todoId: number,
    subTodoId: number,
    updates: Partial<SubTodo>
  ) => void;
  deleteSubTodo: (todoId: number, subTodoId: number) => void;
}

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [todo, ...state.todos] })),
  updateTodo: (id, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  addSubTodo: (todoId, subTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? { ...todo, sub_todos: [...todo.sub_todos, subTodo] }
          : todo
      ),
    })),
  updateSubTodo: (todoId, subTodoId, updates) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              sub_todos: todo.sub_todos.map((subTodo) =>
                subTodo.id === subTodoId ? { ...subTodo, ...updates } : subTodo
              ),
            }
          : todo
      ),
    })),
  deleteSubTodo: (todoId, subTodoId) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              sub_todos: todo.sub_todos.filter(
                (subTodo) => subTodo.id !== subTodoId
              ),
            }
          : todo
      ),
    })),
}));
