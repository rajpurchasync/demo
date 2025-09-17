import React from 'react';
import { cn } from '../../utils/cn';

interface ToggleProps {
  option1: { label: string; value: string };
  option2: { label: string; value: string };
  selected: string;
  onChange: (value: string) => void;
}

export function Toggle({ option1, option2, selected, onChange }: ToggleProps) {
  return (
    <div className="bg-gray-100 p-1 rounded-lg flex">
      <button
        type="button"
        onClick={() => onChange(option1.value)}
        className={cn(
          'flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200',
          selected === option1.value 
            ? 'bg-white text-[#145434] shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        )}
      >
        {option1.label}
      </button>
      <button
        type="button"
        onClick={() => onChange(option2.value)}
        className={cn(
          'flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200',
          selected === option2.value 
            ? 'bg-white text-[#145434] shadow-sm' 
            : 'text-gray-600 hover:text-gray-800'
        )}
      >
        {option2.label}
      </button>
    </div>
  );
}