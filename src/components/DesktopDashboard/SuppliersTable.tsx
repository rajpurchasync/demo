import React, { useState } from "react";
import { MoreHorizontal } from "lucide-react";

interface Supplier {
  id: string;
  companyName: string;
  type: string;
  category: string;
  label: "Credit" | "Approved" | "Prospective";
  tags: string[];
  country: string;
  state: string;
  city: string;
}

interface SuppliersTableProps {
  suppliers: Supplier[];
  onUpdateSupplier: (id: string, field: string, value: string) => void;
  selectedSuppliers: string[];
  onToggleSelection: (id: string) => void;
  onToggleSelectAll: () => void;
  onCompanyClick: (supplier: Supplier) => void;
}

export default function SuppliersTable({
  suppliers,
  onUpdateSupplier,
  selectedSuppliers,
  onToggleSelection,
  onToggleSelectAll,
  onCompanyClick,
}: SuppliersTableProps) {
  const [editingCell, setEditingCell] = useState<{
    id: string;
    field: string;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const handleCellClick = (id: string, field: string, currentValue: string) => {
    if (field === "companyName") return; // Company name is not editable
    setEditingCell({ id, field });
    setEditValue(currentValue);
  };

  const handleSave = () => {
    if (editingCell) {
      onUpdateSupplier(editingCell.id, editingCell.field, editValue);
      setEditingCell(null);
      setEditValue("");
    }
  };

  const handleCancel = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const handleMenuClick = (e: React.MouseEvent, supplierId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === supplierId ? null : supplierId);
  };

  const handleMenuAction = (action: string, supplierId: string) => {
    console.log(`${action} for supplier ${supplierId}`);
    setOpenMenuId(null);
    // Here you would implement the actual functionality for each action
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Credit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Prospective":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const allSelected =
    suppliers.length > 0 && selectedSuppliers.length === suppliers.length;
  const someSelected =
    selectedSuppliers.length > 0 && selectedSuppliers.length < suppliers.length;

  const EditableCell = ({
    id,
    field,
    value,
    className = "",
    isClickable = false,
  }: {
    id: string;
    field: string;
    value: string;
    className?: string;
    isClickable?: boolean;
  }) => {
    const isEditing = editingCell?.id === id && editingCell?.field === field;

    if (isEditing) {
      return (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyPress}
          className="w-full px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      );
    }

    if (isClickable) {
      return (
        <button
          onClick={() => onCompanyClick(suppliers.find((s) => s.id === id)!)}
          className={`text-left hover:text-blue-600 transition-colors ${className}`}
        >
          {value || "-"}
        </button>
      );
    }

    return (
      <div
        onClick={() => handleCellClick(id, field, value)}
        className={`cursor-pointer hover:bg-blue-50 px-2 py-1 rounded transition-colors ${className}`}
      >
        <span className="text-sm text-gray-900">{value || "-"}</span>
      </div>
    );
  };

  return (
    <div className="bg-white overflow-hidden flex-1">
      <div className="overflow-x-auto min-w-full h-full min-h-[50vh]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="w-8 sm:w-12 py-2 sm:py-3 px-2 sm:px-4">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = someSelected;
                  }}
                  onChange={onToggleSelectAll}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 min-w-[16px] min-h-[16px]"
                />
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm min-w-[120px]">
                Company Name
              </th>

              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm hidden lg:table-cell">
                Category
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm">
                Label
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm hidden xl:table-cell">
                Tags
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm hidden lg:table-cell">
                Country
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm hidden xl:table-cell">
                State
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm hidden xl:table-cell">
                City
              </th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-700 text-xs sm:text-sm hidden xl:table-cell pr-[50px]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier.id}
                className={`border-b border-gray-100 hover:bg-gray-50 ${
                  selectedSuppliers.includes(supplier.id) ? "bg-blue-50" : ""
                }`}
              >
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={() => onToggleSelection(supplier.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 min-w-[16px] min-h-[16px]"
                  />
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <EditableCell
                    id={supplier.id}
                    field="companyName"
                    value={supplier.companyName}
                    className="font-medium text-blue-600 cursor-pointer"
                    isClickable={true}
                  />
                </td>

                <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">
                  <EditableCell
                    id={supplier.id}
                    field="category"
                    value={supplier.category}
                  />
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <span
                    className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium border ${getLabelColor(
                      supplier.label
                    )}`}
                  >
                    {supplier.label}
                  </span>
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 hidden xl:table-cell">
                  <div className="flex flex-wrap gap-1">
                    {supplier.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">
                  <EditableCell
                    id={supplier.id}
                    field="country"
                    value={supplier.country}
                  />
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 hidden xl:table-cell">
                  <EditableCell
                    id={supplier.id}
                    field="state"
                    value={supplier.state}
                  />
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4 hidden xl:table-cell">
                  <EditableCell
                    id={supplier.id}
                    field="city"
                    value={supplier.city}
                  />
                </td>
                <td className="py-2 sm:py-3 px-2 sm:px-4">
                  <div className="relative">
                    <button
                      onClick={(e) => handleMenuClick(e, supplier.id)}
                      className="min-w-[44px] min-h-[44px] w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>

                    {openMenuId === supplier.id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[160px]">
                          <button
                            onClick={() =>
                              handleMenuAction("Ask Quote", supplier.id)
                            }
                            className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                          >
                            Ask Quote
                          </button>
                          <button
                            onClick={() =>
                              handleMenuAction("Message", supplier.id)
                            }
                            className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                          >
                            Message
                          </button>
                          <button
                            onClick={() =>
                              handleMenuAction("Ask Sample", supplier.id)
                            }
                            className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                          >
                            Ask Sample
                          </button>
                          <button
                            onClick={() =>
                              handleMenuAction("Request Document", supplier.id)
                            }
                            className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                          >
                            Request Document
                          </button>
                          <button
                            onClick={() =>
                              handleMenuAction("Add new contact", supplier.id)
                            }
                            className="w-full text-left px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 transition-colors min-h-[36px]"
                          >
                            Add new contact
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
