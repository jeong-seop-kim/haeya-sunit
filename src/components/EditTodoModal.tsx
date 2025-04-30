import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    title: string,
    content: string,
    dueDate: Date | null,
    startDate: Date | null,
    hasStartDate: boolean
  ) => void;
  initialTitle: string;
  initialContent: string;
  initialDueDate: Date | null;
  initialStartDate: Date | null;
  initialHasStartDate: boolean;
}

export default function EditTodoModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle,
  initialContent,
  initialDueDate,
  initialStartDate,
  initialHasStartDate,
}: EditTodoModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [dueDate, setDueDate] = useState<Date | null>(initialDueDate);
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [hasStartDate, setHasStartDate] = useState(initialHasStartDate);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setDueDate(initialDueDate);
    setStartDate(initialStartDate);
    setHasStartDate(initialHasStartDate);
  }, [
    initialTitle,
    initialContent,
    initialDueDate,
    initialStartDate,
    initialHasStartDate,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, content, dueDate, startDate, hasStartDate);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-4 sm:p-6 rounded-lg w-full max-w-md mx-4 border border-slate-200 font-pretendard">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-600">할 일 수정</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-600 placeholder-slate-300"
            />
          </div>
          <div>
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 min-h-[100px] text-slate-600 placeholder-slate-300"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-slate-600 font-medium">시작 날짜</label>
              <button
                type="button"
                onClick={() => setHasStartDate(!hasStartDate)}
                className={`px-2 sm:px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  hasStartDate
                    ? "bg-slate-500 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {hasStartDate ? "사용" : "사용 안 함"}
              </button>
            </div>
            {hasStartDate && (
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="시작 날짜 선택"
                className="w-full p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-600 placeholder-slate-300"
              />
            )}
          </div>
          <div>
            <label className="block text-slate-600 font-medium mb-2">
              마감 날짜
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="마감 날짜 선택"
              className="w-full p-2 sm:p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-slate-400 text-slate-600 placeholder-slate-300"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 sm:p-3 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
}
