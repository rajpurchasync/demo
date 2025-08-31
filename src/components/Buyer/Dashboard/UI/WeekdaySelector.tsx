import React from "react";
import { cn } from "../utils/cn";

interface WeekdaySelectorProps {
  selected: string[];
  onChange: (weekdays: string[]) => void;
}

export function WeekdaySelector({ selected, onChange }: WeekdaySelectorProps) {
  const weekdays = [
    { label: "Mon", value: "monday" },
    { label: "Tue", value: "tuesday" },
    { label: "Wed", value: "wednesday" },
    { label: "Thu", value: "thursday" },
    { label: "Fri", value: "friday" },
    { label: "Sat", value: "saturday" },
    { label: "Sun", value: "sunday" },
  ];

  const toggleWeekday = (weekday: string) => {
    if (selected.includes(weekday)) {
      onChange(selected.filter((day) => day !== weekday));
    } else {
      onChange([...selected, weekday]);
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {weekdays.map((day) => (
        <button
          key={day.value}
          type="button"
          onClick={() => toggleWeekday(day.value)}
          className={cn(
            "h-12 rounded-lg font-medium text-sm transition-all duration-200",
            selected.includes(day.value)
              ? "bg-[#145434] text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}
