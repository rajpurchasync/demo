import React from "react";
import { Plus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-28 right-4 w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 active:scale-95 z-20"
    >
      <Plus className="w-5 h-5" />
    </button>
  );
}
