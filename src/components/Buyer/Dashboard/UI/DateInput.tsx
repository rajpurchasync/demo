import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { DatePicker } from './DatePicker';

interface DateInputProps {
  label: string;
  selected: string;
  onChange: (date: string) => void;
}

export function DateInput({ label, selected, onChange }: DateInputProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return 'Select date';
    return new Date(dateStr).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#145434] focus:ring-0 transition-colors text-left flex items-center justify-between"
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-500'}>
          {formatDisplayDate(selected)}
        </span>
        <Calendar className="w-5 h-5 text-gray-400" />
      </button>
      
      {isOpen && (
        <div className="relative">
          <DatePicker
            selected={selected}
            onChange={onChange}
            onClose={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
}