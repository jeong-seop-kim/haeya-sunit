import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    title: string,
    content: string,
    dueDate: Date | null,
    startDate: Date | null,
    hasStartDate: boolean
  ) => void;
  initialTitle?: string;
  initialContent?: string;
  initialDueDate?: Date | null;
  initialStartDate?: Date | null;
  initialHasStartDate?: boolean;
}

export default function TodoModal({
  isOpen,
  onClose,
  onSubmit,
  initialTitle = "",
  initialContent = "",
  initialDueDate = null,
  initialStartDate = null,
  initialHasStartDate = false,
}: TodoModalProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [dueDate, setDueDate] = useState<Date | null>(initialDueDate);
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [hasStartDate, setHasStartDate] = useState(initialHasStartDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title, content, dueDate, startDate, hasStartDate);
    setTitle("");
    setContent("");
    setDueDate(null);
    setStartDate(null);
    setHasStartDate(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "" : " pointer-events-none"
      }`}
    >
      <div
        className={`bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 w-full max-w-md mx-4 transform transition-all ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-orange-600">
            새로운 할 일
          </h2>
          <button
            onClick={onClose}
            className="text-orange-400 hover:text-orange-600 transition-colors"
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
              className="w-full p-2 sm:p-3 bg-orange-50 border border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 text-orange-600 placeholder-orange-300"
            />
          </div>
          <div>
            <textarea
              placeholder="내용을 입력하세요"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 sm:p-3 bg-orange-50 border border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 min-h-[100px] text-orange-600 placeholder-orange-300"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-orange-600 font-medium">시작 날짜</label>
              <button
                type="button"
                onClick={() => setHasStartDate(!hasStartDate)}
                className={`px-2 sm:px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  hasStartDate
                    ? "bg-orange-500 text-white"
                    : "bg-orange-100 text-orange-500"
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
                className="w-full p-2 sm:p-3 bg-orange-50 border border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 text-orange-600 placeholder-orange-300"
              />
            )}
          </div>
          <div>
            <label className="block text-orange-600 font-medium mb-2">
              마감 날짜
            </label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              dateFormat="yyyy/MM/dd"
              placeholderText="마감 날짜 선택"
              className="w-full p-2 sm:p-3 bg-orange-50 border border-orange-200 rounded-lg focus:outline-none focus:border-orange-400 text-orange-600 placeholder-orange-300"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 sm:p-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
          >
            추가하기
          </button>
        </form>
      </div>
    </div>
  );
}
