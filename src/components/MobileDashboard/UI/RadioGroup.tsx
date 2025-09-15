import React from "react";
import { cn } from "../utils/cn";

interface RadioOption {
  label: string;
  value: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selected: string;
  onChange: (value: string) => void;
  name: string;
}

export function RadioGroup({
  options,
  selected,
  onChange,
  name,
}: RadioGroupProps) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all duration-200",
            selected === option.value
              ? "border-[#145434] bg-green-50"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selected === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 text-[#145434] focus:ring-[#145434]"
          />
          <div className="ml-3">
            <div className="font-medium text-gray-900">{option.label}</div>
            {option.description && (
              <div className="text-sm text-gray-500 mt-1">
                {option.description}
              </div>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}
