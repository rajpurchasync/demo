import React from "react";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
  text?: string;
}

export function FloatingActionButton({ onClick, text = "+ Create" }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-28 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 z-20"
    >
      {text === 'Search' ? null : <Plus className="w-4 h-4 mr-1" />}
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
}
