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
import { CustomerCard } from "../Cards/CustomerCard";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { mockCustomers, Customer } from "../types/purchasync";

interface CustomersScreenProps {
  showAddCustomerModal: boolean;
  setShowAddCustomerModal: (show: boolean) => void;
  onViewCustomer: (customer: Customer) => void;
}

export function CustomersScreen({
  showAddCustomerModal,
  setShowAddCustomerModal,
  onViewCustomer,
}: CustomersScreenProps) {
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
    "Credit",
  ];

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      (customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )) &&
      (categoryFilter === "all" || customer.category === categoryFilter) &&
      (labelFilter === "all" || customer.tags.includes(labelFilter))
  );

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Customer Management</h1>
        <span className="text-sm text-gray-500">
          {filteredCustomers.length} customers
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search customers..."
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

      {/* Customers List */}
      <div className="space-y-3">
        {filteredCustomers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onClick={onViewCustomer}
          />
        ))}
      </div>

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Customer
              </h2>
              <button
                onClick={() => setShowAddCustomerModal(false)}
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
                  <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#145434] focus:ring-0 transition-colors">
                    <option value="">Select Customer Type</option>
                    <option value="Hotels">Hotels</option>
                    <option value="Restaurants">Restaurants</option>
                    <option value="Catering">Catering</option>
                    <option value="Other">Other</option>
                  </select>
                  <Input
                    label="Tags (comma separated)"
                    placeholder="e.g., Credit, Premium, Local"
                  />
                </div>

                <div className="flex space-x-3 mt-6">
                  <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => setShowAddCustomerModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    onClick={() => {
                      console.log("Save customer");
                      setShowAddCustomerModal(false);
                    }}
                  >
                    Save Customer
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
