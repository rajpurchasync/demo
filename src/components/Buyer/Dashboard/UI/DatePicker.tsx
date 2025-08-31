import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../utils/cn";

interface DatePickerProps {
  selected: string;
  onChange: (date: string) => void;
  onClose?: () => void;
}

export function DatePicker({ selected, onChange, onClose }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const days = [];
  const current = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const goToPreviousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );
  };

  const handleDateClick = (date: Date) => {
    if (date < today) return;
    onChange(date.toISOString().split("T")[0]);
    onClose?.();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <h3 className="font-semibold text-lg text-gray-900">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          type="button"
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === currentMonth.getMonth();
          const isPast = date < today;
          const isSelected = selected === date.toISOString().split("T")[0];
          const isToday = date.toDateString() === today.toDateString();

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleDateClick(date)}
              disabled={isPast}
              className={cn(
                "h-10 w-10 rounded-lg text-sm font-medium transition-colors",
                {
                  "text-gray-300": !isCurrentMonth,
                  "text-gray-400 cursor-not-allowed": isPast,
                  "text-gray-900 hover:bg-gray-100":
                    isCurrentMonth && !isPast && !isSelected,
                  "bg-[#145434] text-white": isSelected,
                  "bg-blue-100 text-blue-600": isToday && !isSelected,
                }
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
