import React, { useState } from "react";
import {
  MessageCircle,
  FileText,
  FileCheck,
  // Tag,
  Eye,
  Edit,
} from "lucide-react";
import { Supplier } from "../types/purchasync";
import { cn } from "../utils/cn";

interface SupplierCardProps {
  supplier: Supplier;
  onClick?: (supplier: Supplier) => void;
}

export function SupplierCard({ supplier, onClick }: SupplierCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const menuOptions = [
    { id: "view", label: "View", icon: Eye },
    { id: "edit", label: "Edit", icon: Edit },
    { id: "quote", label: "Request Quote", icon: FileText },
    { id: "message", label: "Message", icon: MessageCircle },
    { id: "document", label: "Request Document", icon: FileCheck },
    // { id: "label", label: "Assign Label", icon: Tag },
  ];

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
      onClick={() => onClick?.(supplier)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm">
              {supplier.name}
            </h3>
            {supplier.isPreferred && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Preferred
              </span>
            )}
          </div>

          <p className="text-xs text-gray-600 mb-2">{supplier.category}</p>

          <div className="flex flex-wrap gap-1">
            {supplier.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#145434] hover:bg-[#0f3f29] rounded-md transition-colors shadow-sm"
          >
            Manage
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
              {menuOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`${option.label} for ${supplier.name}`);
                      setShowMenu(false);
                    }}
                    className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <Icon className="w-3 h-3 mr-2 text-gray-500" />
                    <span className="text-xs text-gray-700">
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
