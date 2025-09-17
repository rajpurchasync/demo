import React, { useState } from "react";
import {
  MessageCircle,
  FileText,
  Shield,
  Edit,
  Trash2,
  MoreVertical,
  Heart,
  MapPin
} from "lucide-react";
import { Supplier } from "../../types/purchasync";
import { cn } from "../../utils/cn";

interface SupplierCardProps {
  supplier: Supplier;
  onClick?: (supplier: Supplier) => void;
  isSelected?: boolean;
  onToggleSelect?: (supplierId: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (supplierId: string) => void;
  showCheckbox?: boolean;
}

export function SupplierCard({ 
  supplier, 
  onClick, 
  isSelected, 
  onToggleSelect,
  isFavorite = false,
  onToggleFavorite,
  showCheckbox = false
}: SupplierCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const menuOptions = [
    { id: "edit", label: "Edit", icon: Edit },
    { id: "remove", label: "Remove", icon: Trash2 },
    { id: "message", label: "Send Message", icon: MessageCircle },
    { id: "quote", label: "Request Quote", icon: FileText },
    { id: "kyc", label: "Send KYC", icon: Shield },
  ];

  // Mock labels for suppliers
  const getSupplierLabel = (supplierId: string) => {
    const labels = {
      '1': 'Approved',
      '2': 'Credit',
      '3': 'New Prospect',
      '4': 'Approved',
      '5': 'Credit'
    };
    return labels[supplierId] || 'New Prospect';
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'Approved':
        return 'text-green-800';
      case 'Credit':
        return 'text-blue-800';
      case 'New Prospect':
        return 'text-yellow-800';
      default:
        return 'text-gray-800';
    }
  };

  const handleMenuClick = (e: React.MouseEvent, optionId: string) => {
    e.stopPropagation();
    console.log(`${optionId} for ${supplier.name}`);
    setShowMenu(false);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(supplier.id);
  };

  const handleSelectClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSelect?.(supplier.id);
  };

  const supplierLabel = getSupplierLabel(supplier.id);

  return (
    <div 
      className={cn(
        "bg-white border p-3 hover:shadow-sm transition-all cursor-pointer relative",
        isFavorite ? "border-blue-300 bg-blue-50" : "border-gray-200",
        "max-h-20" // Limit to 2 rows
      )}
      onClick={() => onClick?.(supplier)}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          {/* Checkbox for selection - only show when showCheckbox is true */}
          {showCheckbox && (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isSelected || false}
                onChange={handleSelectClick}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* First Row: Supplier Name and Label */}
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 text-sm truncate flex-1 mr-2">
                {supplier.name}
              </h3>
              <span className={cn(
                "text-xs font-medium whitespace-nowrap",
                getLabelColor(supplierLabel)
              )}>
                {supplierLabel}
              </span>
            </div>

            {/* Second Row: Location and Tags */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-gray-600 min-w-0 flex-1">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{supplier.city}, {supplier.country}</span>
              </div>
              
              {/* Show max 2 tags */}
              <div className="flex space-x-1 ml-2">
                {supplier.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex flex-col justify-between h-full ml-2 relative">
          {/* 3 Dots Menu - Top Right */}
          <div className="flex justify-end">
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>

              {showMenu && (
                <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-40">
                  {menuOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                      <button
                        key={option.id}
                        onClick={(e) => handleMenuClick(e, option.id)}
                        className={cn(
                          "w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg",
                          option.id === 'remove' ? 'text-red-600' : 'text-gray-700'
                        )}
                      >
                        <Icon className={cn(
                          "w-3 h-3 mr-2",
                          option.id === 'remove' ? 'text-red-500' : 'text-gray-500'
                        )} />
                        <span className="text-xs">
                          {option.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Favorite Button - Bottom Right */}
          <div className="flex justify-end">
            <button
              onClick={handleFavoriteClick}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Heart 
                className={cn(
                  "w-4 h-4 transition-colors",
                  isFavorite 
                    ? "text-red-500 fill-current" 
                    : "text-gray-400 hover:text-red-400"
                )} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}