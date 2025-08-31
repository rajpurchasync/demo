import React, { useState } from "react";
import {
  Search,
  QrCode,
  Upload,
  Edit,
  Filter,
  Plus,
  MessageCircle,
  Box,
  File,
  SearchIcon,
} from "lucide-react";
import { SupplierCard } from "../Cards/SupplierCard";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { mockSuppliers } from "../types/purchasync";

interface SuppliersScreenProps {
  showAddSupplierModal: boolean;
  setShowAddSupplierModal: (show: boolean) => void;
}

export function SuppliersScreen({
  showAddSupplierModal,
  setShowAddSupplierModal,
}: SuppliersScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState("all");

  const categories = [
    "all",
    "Produce",
    "Meat & Poultry",
    "Kitchen Equipment",
    "Spices & Seasonings",
  ];
  const labels = [
    "all",
    "Sustainable",
    "Local",
    "Certified",
    "Halal",
    "Premium",
    "Preferred",
  ];
  const quickActions = [
    {
      id: "find-new-supplier",
      label: "Find New Supplier",
      icon: SearchIcon,
      gradient: "from-blue-500 to-blue-600",
      action: () => {
        // onScreenChange("suppliers");
        // onScreenChange("suppliers");
        // setShowAddSupplierModal(true);
      },
    },
    {
      id: "add-supplier",
      label: "Add Supplier",
      icon: Plus,
      gradient: "from-purple-500 to-purple-600",
      action: () => {
        // onScreenChange("suppliers");
        // onScreenChange("suppliers");
        setShowAddSupplierModal(true);
      },
    },
    // {
    //   id: "message-rsupplier",
    //   label: "Message Supplier",
    //   icon: MessageCircle,
    //   gradient: "from-purple-500 to-purple-600",
    //   action: () => {
    //     // onScreenChange("rfqs");
    //   },
    // },
    // {
    //   id: "manage-todo-list",
    //   label: "Sample Request",
    //   icon: Box,
    //   gradient: "from-green-500 to-green-600",
    //   action: () => {
    //     // onScreenChange("todos");
    //   },
    // },
    // {
    //   id: "create-task",
    //   label: "Request Documents",
    //   icon: File,
    //   gradient: "from-orange-500 to-orange-600",
    //   action: () => {
    //     // onScreenChange("todos");
    //   },
    // },
  ];
  const filteredSuppliers = mockSuppliers.filter(
    (supplier) =>
      (supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        supplier.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (categoryFilter === "all" || supplier.category === categoryFilter) &&
      (labelFilter === "all" || supplier.tags.includes(labelFilter))
  );

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Supplier Management</h1>
        <span className="text-sm text-gray-500">
          {filteredSuppliers.length} suppliers
        </span>
      </div>

      {/* Quick Actions CTAs */}
      <div>
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-1">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.action}
                className="grow group relative overflow-hidden bg-white hover:bg-gray-50 rounded-xl p-2  py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex-shrink-0 w-20"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                    {action.label}
                  </span>
                </div>
              </button>
            );
          })}{" "}
          {/* <button
            key={action.id}
            onClick={action.action}
            className="grow group relative overflow-hidden bg-white hover:bg-gray-50 rounded-xl p-2  py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-gray-300 flex-shrink-0 w-20"
          >
            <div className="flex flex-col items-center space-y-2">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300`}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                Add Supplier
              </span>
            </div>
          </button>
          <button
            onClick={() => console.log("Message Supplier")}
            className="flex-shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xs font-medium text-gray-700">
              Message Supplier
            </span>
          </button>
          <button
            onClick={() => console.log("Sample Request")}
            className="flex-shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xs font-medium text-gray-700">
              Sample Request
            </span>
          </button>
          <button
            onClick={() => console.log("Request Documents")}
            className="flex-shrink-0 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            <span className="text-xs font-medium text-gray-700">
              Request Documents
            </span>
          </button> */}
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-2.5 text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2.5 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center space-x-2"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Label
            </label>
            <select
              value={labelFilter}
              onChange={(e) => setLabelFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
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

      {/* Suppliers List */}
      <div className="space-y-3">
        {filteredSuppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>

      {/* Add Supplier Modal */}
      {showAddSupplierModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Supplier
              </h2>
              <button
                onClick={() => setShowAddSupplierModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Quick Add Options */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  variant="secondary"
                  className="flex flex-col items-center py-4"
                  onClick={() => console.log("Scan business card")}
                >
                  <QrCode className="w-6 h-6 mb-2" />
                  <span className="text-sm">Scan Card</span>
                </Button>
                <Button
                  variant="secondary"
                  className="flex flex-col items-center py-4"
                  onClick={() => console.log("Upload from contacts")}
                >
                  <Upload className="w-6 h-6 mb-2" />
                  <span className="text-sm">From Contacts</span>
                </Button>
              </div>

              {/* Manual Entry Form */}
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-4 flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Manual Entry
                </h3>

                <div className="space-y-4">
                  <Input
                    label="Company Name"
                    placeholder="Enter company name"
                  />
                  <Input
                    label="Contact Person"
                    placeholder="Enter contact name"
                  />
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
                </div>

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
        </div>
      )}
    </div>
  );
}
