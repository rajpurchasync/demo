import React, { useState } from "react";
import { Search, Filter, Trash2 } from "lucide-react";
import { SupplierCard } from "../Cards/SupplierCard";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { mockSuppliers, Supplier } from "../types/purchasync";

interface SuppliersScreenProps {
  showAddSupplierModal: boolean;
  setShowAddSupplierModal: (show: boolean) => void;
  onViewSupplier: (supplier: Supplier) => void;
}

export function SuppliersScreen({
  showAddSupplierModal,
  setShowAddSupplierModal,
  onViewSupplier,
}: SuppliersScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [favoriteSuppliers, setFavoriteSuppliers] = useState<string[]>([
    "1",
    "2",
  ]); // Mock favorites
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const categories = [
    "all",
    "Produce",
    "Meat & Poultry",
    "Kitchen Equipment",
    "Spices & Seasonings",
  ];
  const labels = ["All", "Approved", "Credit", "Prospect", "Preferred"];

  const tabs = [
    { id: "all", label: "All", count: mockSuppliers.length },
    { id: "favorite", label: "Favorite", count: favoriteSuppliers.length },
    { id: "approved", label: "Approved", count: 4 },
    { id: "prospect", label: "Prospect", count: 1 },
  ];

  const filteredSuppliers = mockSuppliers
    .filter(
      (supplier) =>
        (supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          supplier.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )) &&
        (categoryFilter === "all" || supplier.category === categoryFilter) &&
        (labelFilter === "all" || supplier.tags.includes(labelFilter)) &&
        (activeTab === "all" ||
          (activeTab === "favorite" &&
            favoriteSuppliers.includes(supplier.id)) ||
          (activeTab === "approved" &&
            getSupplierLabel(supplier.id) === "Approved") ||
          (activeTab === "prospect" &&
            getSupplierLabel(supplier.id) === "New Prospect"))
    )
    .sort((a, b) => {
      // Favorite suppliers appear on top
      const aIsFavorite = favoriteSuppliers.includes(a.id);
      const bIsFavorite = favoriteSuppliers.includes(b.id);
      if (aIsFavorite && !bIsFavorite) return -1;
      if (!aIsFavorite && bIsFavorite) return 1;
      return 0;
    });

  // Mock function to get supplier labels
  const getSupplierLabel = (supplierId: string) => {
    const labels = {
      "1": "Approved",
      "2": "Credit",
      "3": "New Prospect",
      "4": "Approved",
      "5": "Credit",
    };
    return labels[supplierId] || "New Prospect";
  };
  const handleToggleSelect = (supplierId: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(supplierId)
        ? prev.filter((id) => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleToggleFavorite = (supplierId: string) => {
    setFavoriteSuppliers((prev) =>
      prev.includes(supplierId)
        ? prev.filter((id) => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleLongPress = (supplierId: string) => {
    setShowCheckboxes(true);
    setSelectedSuppliers([supplierId]);
  };

  const handleMouseDown = (supplierId: string) => {
    const timer = setTimeout(() => {
      handleLongPress(supplierId);
    }, 1000); // 1 second
    setLongPressTimer(timer);
  };

  const handleMouseUp = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleSelectAll = () => {
    setSelectedSuppliers(filteredSuppliers.map((s) => s.id));
  };

  const handleRemoveSelected = () => {
    if (confirm(`Remove ${selectedSuppliers.length} selected suppliers?`)) {
      console.log("Remove suppliers:", selectedSuppliers);
      setSelectedSuppliers([]);
      setShowCheckboxes(false);
    }
  };

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-2 font-medium text-sm flex items-center justify-center space-x-1 ${
              activeTab === tab.id
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs text-gray-500">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-1.5 text-sm border-gray-200 rounded-lg"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Label
            </label>
            <select
              value={labelFilter}
              onChange={(e) => setLabelFilter(e.target.value)}
              className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs"
            >
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label === "all" ? "All Labels" : label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Selection Bar - only show when checkboxes are visible */}
      {showCheckboxes && (
        <div className="flex items-center justify-between bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSelectAll}
              className="text-sm font-medium text-blue-600"
            >
              Select All ({filteredSuppliers.length})
            </button>
            {selectedSuppliers.length > 0 && (
              <span className="text-xs text-blue-600">
                {selectedSuppliers.length} selected
              </span>
            )}
          </div>
          <button
            onClick={handleRemoveSelected}
            disabled={selectedSuppliers.length === 0}
            className="flex items-center space-x-1 px-3 py-1 bg-red-500 text-white rounded text-xs disabled:opacity-50"
          >
            <Trash2 className="w-3 h-3" />
            <span>Remove</span>
          </button>
        </div>
      )}

      {/* Suppliers List */}
      <div className="space-y-0">
        {filteredSuppliers.map((supplier) => (
          <div
            key={supplier.id}
            className={`${
              filteredSuppliers.indexOf(supplier) === 0 &&
              filteredSuppliers.length > 1
                ? "rounded-t-lg"
                : filteredSuppliers.indexOf(supplier) ===
                    filteredSuppliers.length - 1 ||
                  filteredSuppliers.length === 1
                ? "rounded-b-lg"
                : ""
            }`}
          >
            <SupplierCard
              supplier={supplier}
              onClick={onViewSupplier}
              isSelected={selectedSuppliers.includes(supplier.id)}
              onToggleSelect={handleToggleSelect}
              isFavorite={favoriteSuppliers.includes(supplier.id)}
              onToggleFavorite={handleToggleFavorite}
              showCheckbox={showCheckboxes}
              onMouseDown={() => handleMouseDown(supplier.id)}
              onMouseUp={handleMouseUp}
              onTouchStart={() => handleMouseDown(supplier.id)}
              onTouchEnd={handleMouseUp}
            />
          </div>
        ))}
      </div>

      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Add Supplier
              </h2>
              <button
                onClick={() => setShowAddSupplierModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-lg">×</span>
              </button>
            </div>

            <div className="space-y-4">
              <Input label="Company Name" placeholder="Enter company name" />
              <Input label="Contact Person" placeholder="Enter contact name" />
              <Input
                label="Email"
                type="email"
                placeholder="contact@company.com"
              />
              <Input label="Phone" placeholder="+971 50 123 4567" />
              <Input
                label="Category"
                placeholder="e.g., Fresh Produce, Equipment"
              />
              <Input
                label="Tags (comma separated)"
                placeholder="e.g., Local, Certified, Premium"
              />

              <div className="flex space-x-3 mt-6">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowAddSupplierModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    console.log("Save supplier");
                    setShowAddSupplierModal(false);
                  }}
                >
                  Save Supplier
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
