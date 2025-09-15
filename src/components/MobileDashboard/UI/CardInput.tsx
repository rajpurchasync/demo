import React from "react";
import { CreditCard } from "lucide-react";
import { cn } from "../utils/cn";

interface CardInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
}

export function CardInput({
  label,
  value,
  onChange,
  placeholder,
  className,
}: CardInputProps) {
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const getCardType = (number: string) => {
    const num = number.replace(/\s/g, "");
    if (num.startsWith("4")) return "visa";
    if (num.startsWith("5") || num.startsWith("2")) return "mastercard";
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      onChange(formatted);
    }
  };

  const cardType = getCardType(value);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cn(
            "w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#145434] focus:ring-0 transition-colors pr-12",
            className
          )}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {cardType === "visa" && (
            <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
              VISA
            </div>
          )}
          {cardType === "mastercard" && (
            <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
              MC
            </div>
          )}
          {!cardType && <CreditCard className="w-5 h-5 text-gray-400" />}
        </div>
      </div>
    </div>
  );
}
