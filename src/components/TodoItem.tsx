import { memo, useState } from "react";
import EditTodoModal from "./EditTodoModal";
import CheckIcon from "./icons/CheckIcon";

interface SubTodo {
  id: number;
  todo_id: number;
  title: string;
  content: string;
  completed: boolean;
}

interface TodoItemProps {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  due_date: string | null;
  start_date: string | null;
  has_start_date: boolean;
  sub_todos: SubTodo[];
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

const TodoItem = memo(function TodoItem({
  id,
  title,
  content,
  completed,
  due_date,
  start_date,
  has_start_date,
  sub_todos,
  onToggle,
  onDelete,
  onEdit,
  onAddSubTodo,
  onToggleSubTodo,
  onDeleteSubTodo,
}: TodoItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddingSubTodo, setIsAddingSubTodo] = useState(false);
  const [subTitle, setSubTitle] = useState("");
  const [subContent, setSubContent] = useState("");

  const handleAddSubTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subTitle.trim()) return;
    onAddSubTodo(id, subTitle, subContent);
    setSubTitle("");
    setSubContent("");
    setIsAddingSubTodo(false);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="p-4  hover:bg-orange-50 hover:bg-opacity-10 hover:border-orange-300 transition-all border border-orange-200 rounded-lg font-pretendard">
          <div className="flex items-start gap-4">
            <button
              onClick={() => onToggle(id)}
              className="mt-1 w-6 h-6 text-orange-400 hover:text-orange-600 transition-colors"
            >
              <CheckIcon checked={completed} />
            </button>
            <div className="flex-1">
              <h3
                className={`text-lg font-semibold ${
                  completed ? "line-through text-orange-300" : "text-orange-600"
                }`}
              >
                {title}
              </h3>
              <p
                className={`mt-1 ${
                  completed ? "line-through text-orange-300" : "text-orange-500"
                }`}
              >
                {content}
              </p>
              <div className="mt-2 space-x-2 text-sm text-orange-400">
                {has_start_date && start_date && (
                  <span>시작: {formatDate(new Date(start_date))}</span>
                )}
                {due_date && (
                  <>
                    {has_start_date && start_date && <span>•</span>}
                    <span>마감: {formatDate(new Date(due_date))}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 text-orange-400 hover:text-orange-600 transition-colors"
              >
                수정
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-2 text-orange-400 hover:text-orange-600 transition-colors"
              >
                삭제
              </button>
            </div>
          </div>

          <div className="mt-4 pl-10">
            {sub_todos.map((subItem) => (
              <div
                key={subItem.id}
                className="flex items-start gap-4 p-3 bg-orange-50/50 border border-orange-100 rounded-lg mb-2"
              >
                <button
                  onClick={() => onToggleSubTodo(id, subItem.id)}
                  className="mt-1 w-5 h-5 text-orange-400 hover:text-orange-600 transition-colors"
                >
                  <CheckIcon checked={subItem.completed} />
                </button>
                <div className="flex-1">
                  <h4
                    className={`font-medium ${
                      subItem.completed
                        ? "line-through text-orange-300"
                        : "text-orange-600"
                    }`}
                  >
                    {subItem.title}
                  </h4>
                  <p
                    className={`mt-1 text-sm ${
                      subItem.completed
                        ? "line-through text-orange-300"
                        : "text-orange-500"
                    }`}
                  >
                    {subItem.content}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteSubTodo(id, subItem.id)}
                  className="p-2 text-orange-400 hover:text-orange-600 transition-colors"
                >
                  삭제
                </button>
              </div>
            ))}

            {isAddingSubTodo ? (
              <form onSubmit={handleAddSubTodo} className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="서브 항목 제목"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  className="w-full p-2  border border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 text-orange-600 placeholder-orange-300"
                />
                <textarea
                  placeholder="서브 항목 내용"
                  value={subContent}
                  onChange={(e) => setSubContent(e.target.value)}
                  className="w-full p-2  border border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 text-orange-600 placeholder-orange-300 min-h-[60px]"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                  >
                    추가
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingSubTodo(false)}
                    className="px-3 py-1 bg-orange-100 text-orange-500 rounded-lg hover:bg-orange-200 transition-colors text-sm"
                  >
                    취소
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingSubTodo(true)}
                className="mt-2 px-3 py-1 bg-orange-100 text-orange-500 rounded-lg hover:bg-orange-200 transition-colors text-sm"
              >
                + 서브 항목 추가
              </button>
            )}
          </div>
        </div>
      </div>

      <EditTodoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(title, content, dueDate, startDate, hasStartDate) =>
          onEdit(id, title, content, dueDate, startDate, hasStartDate)
        }
        initialTitle={title}
        initialContent={content}
        initialDueDate={due_date ? new Date(due_date) : null}
        initialStartDate={start_date ? new Date(start_date) : null}
        initialHasStartDate={has_start_date}
      />
    </>
  );
});

export default TodoItem;
