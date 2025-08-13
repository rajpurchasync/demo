import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className = "",
  error = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
      
      // Calculate position
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const dropdownHeight = Math.min(options.length * 48 + 16, 240); // Max 5 items visible
        
        if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, options.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`w-full px-4 py-3 text-left border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base bg-white flex items-center justify-between ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300'
        } ${className}`}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Mobile overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden" />
          
          {/* Dropdown menu */}
          <div 
            className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto ${
              dropdownPosition === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
            }`}
            style={{
              minWidth: '100%',
              maxWidth: '100vw'
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors flex items-center justify-between ${
                  value === option.value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
                }`}
              >
                <span className="truncate">{option.label}</span>
                {value === option.value && (
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CustomDropdown;