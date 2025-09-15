import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface NumericStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label: string;
}

export function NumericStepper({ value, onChange, min = 1, max = 12, label }: NumericStepperProps) {
  return (
    <div className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
      <span className="font-medium text-gray-900">{label}</span>
      <div className="flex items-center space-x-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xl font-semibold min-w-[3ch] text-center">{value}</span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-10 h-10 rounded-full bg-[#145434] text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0f3f29] transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}