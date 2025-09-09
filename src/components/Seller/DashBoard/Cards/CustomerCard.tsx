import {
  MessageCircle,
  FileText,
  FileCheck,
  // Tag,
  Eye,
  Edit,
} from "lucide-react";
import { Customer } from "../types/purchasync";
import { cn } from "../utils/cn";
import { useState } from "react";

interface CustomerCardProps {
  customer: Customer;
  onClick?: (customer: Customer) => void;
}

export function CustomerCard({ customer, onClick }: CustomerCardProps) {
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
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200 cursor-pointer hover:border-gray-300"
      onClick={() => onClick?.(customer)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight">
              {customer.name}
            </h3>
            {customer.isCredit && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-green-100 text-green-800">
                Credit
              </span>
            )}
            {customer.isNewProspect && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-100 text-blue-800">
                New Prospect
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-2">
            <p className="text-xs text-gray-600 font-medium">
              {customer.customerType}
            </p>
          </div>

          <p className="text-xs text-gray-500 mb-2 font-medium">
            {customer.city}, {customer.state}
          </p>

          <div className="flex flex-wrap gap-1">
            {customer.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-600 font-medium"
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
              // setShowMenu(!showMenu);
            }}
            className="flex items-center px-3 py-2 text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors shadow-sm"
          >
            <MessageCircle className="w-3 h-3 mr-1 inline-block" />
            Message
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
                      console.log(`${option.label} for ${customer.name}`);
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
