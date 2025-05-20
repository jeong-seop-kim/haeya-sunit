import { memo } from "react";
import TodoItem from "./TodoItem";

interface SubTodo {
  id: number;
  todo_id: number;
  title: string;
  content: string;
  completed: boolean;
}

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

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (
    id: number,
    title: string,
    content: string,
    dueDate: Date | null,
    startDate: Date | null,
    hasStartDate: boolean
  ) => void;
  onAddSubTodo: (parentId: number, title: string, content: string) => void;
  onToggleSubTodo: (parentId: number, subId: number) => void;
  onDeleteSubTodo: (parentId: number, subId: number) => void;
}

const TodoList = memo(function TodoList({
  todos,
  onToggle,
  onDelete,
  onEdit,
  onAddSubTodo,
  onToggleSubTodo,
  onDeleteSubTodo,
}: TodoListProps) {
  return (
    <div className="space-y-4 pb-[60px]">
      {todos?.map((todo) => (
        <TodoItem
          key={todo.id}
          {...todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onAddSubTodo={onAddSubTodo}
          onToggleSubTodo={onToggleSubTodo}
          onDeleteSubTodo={onDeleteSubTodo}
        />
      ))}
    </div>
  );
});

export default TodoList;
