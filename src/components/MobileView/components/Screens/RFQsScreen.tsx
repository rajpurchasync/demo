import React, { useState } from "react";
import {
  Filter,
  X,
  Eye,
  Clock,
  Search,
  FilePlus,
  FileSearch,
  Scale,
  BarChart,
  LineChart,
} from "lucide-react";
import { RFQCard } from "../Cards/RFQCard";
import { Button } from "../UI/Button";
import { mockRFQs, mockSuppliers, RFQ } from "../../types/purchasync";
import { mockLocations } from "../../types/locations";

interface RFQsScreenProps {
  showCreateRFQModal: boolean;
  setShowCreateRFQModal: (show: boolean) => void;
}

export function RFQsScreen({
  showCreateRFQModal,
  setShowCreateRFQModal,
}: RFQsScreenProps) {
  const [statusFilter, setStatusFilter] = useState("earliest-due");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [dateFromFilter, setDateFromFilter] = useState("");
  const [dateToFilter, setDateToFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showRFQDetailModal, setShowRFQDetailModal] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [showLineItems, setShowLineItems] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All", count: mockRFQs.length },
    { id: "draft", label: "Draft", count: 0 },
    { id: "ongoing", label: "Ongoing", count: 2 },
    { id: "closed", label: "Closed", count: 1 },
  ];
  const rfqQuickActions = [
    {
      id: "create-rfq",
      label: "Create RFQ",
      icon: FilePlus,
      gradient: "from-indigo-500 to-indigo-600",
      action: () => {
        // onScreenChange("createRFQ");
        setShowCreateRFQModal(true);
      },
    },
    {
      id: "review-quotes",
      label: "Review Quotes",
      icon: FileSearch,
      gradient: "from-pink-500 to-pink-600",
      action: () => {
        // onScreenChange("reviewQuotes");
      },
    },
    {
      id: "compare-quotes",
      label: "Compare Quotes",
      icon: Scale,
      gradient: "from-teal-500 to-teal-600",
      action: () => {
        // onScreenChange("compareQuotes");
      },
    },
  ];

  const filteredRFQs = mockRFQs
    .filter((rfq) => {
      // Search filter
      const matchesSearch =
        rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfq.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfq.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Date filter
      const matchesDateRange =
        (!dateFromFilter ||
          new Date(rfq.dueDate) >= new Date(dateFromFilter)) &&
        (!dateToFilter || new Date(rfq.dueDate) <= new Date(dateToFilter));

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || rfq.category === categoryFilter;

      // Status filter
      let matchesStatus = true;
      if (activeTab === "draft") {
        matchesStatus = rfq.status === "draft";
      } else if (activeTab === "ongoing") {
        matchesStatus = rfq.status === "open" || rfq.status === "pending";
      } else if (activeTab === "closed") {
        matchesStatus = rfq.status === "closed";
      }

      return (
        matchesSearch && matchesDateRange && matchesCategory && matchesStatus
      );
    })
    .sort((a, b) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });

  const getSupplierName = (supplierId: string) => {
    const supplier = mockSuppliers.find((s) => s.id === supplierId);
    return supplier ? supplier.name : `Supplier ${supplierId}`;
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
          <input
            type="text"
            placeholder="Search RFQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2 border border-gray-200 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <input
                type="date"
                value={dateFromFilter}
                onChange={(e) => setDateFromFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                value={dateToFilter}
                onChange={(e) => setDateToFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Produce">Produce</option>
              <option value="Equipment">Equipment</option>
              <option value="Meat">Meat</option>
              <option value="Supplies">Supplies</option>
            </select>
          </div>
        </div>
      )}

      {/* RFQs List */}
      <div className="space-y-0">
        {filteredRFQs.length > 0 ? (
          filteredRFQs.map((rfq) => (
            <div
              key={rfq.id}
              className={`${
                filteredRFQs.indexOf(rfq) === 0 && filteredRFQs.length > 1 ? 'rounded-t-lg' : 
                filteredRFQs.indexOf(rfq) === filteredRFQs.length - 1 || filteredRFQs.length === 1 ? 'rounded-b-lg' : 
                ''
              }`}
            >
              <RFQCard
                rfq={rfq}
                onClick={() => {
                  setSelectedRFQ(rfq);
                  setShowRFQDetailModal(true);
                  setShowLineItems(false);
                }}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="w-20 h-20 mx-auto mb-4 opacity-30">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="25" y="20" width="50" height="60" rx="6" />
                <path d="M35 35h30M35 45h25M35 55h20" />
              </svg>
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">
              Nothing to see here
            </p>
            <p className="text-xs text-gray-500">
              No RFQs match your current filter
            </p>
          </div>
        )}
      </div>

      {/* RFQ Detail Modal */}
      {showRFQDetailModal && selectedRFQ && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedRFQ.title}
              </h2>
              <button
                onClick={() => setShowRFQDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              {/* RFQ Details */}
              <div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">RFQ No:</span>
                    <span className="font-medium">{selectedRFQ.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{selectedRFQ.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">
                      {selectedRFQ.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Due Date:</span>
                    <span className="font-medium">
                      {new Date(selectedRFQ.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-medium text-gray-900">
                    Line Items
                  </h3>
                  <button
                    onClick={() => setShowLineItems(!showLineItems)}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    {showLineItems ? "Hide list" : "View list"}
                  </button>
                </div>
                {showLineItems && (
                  <div className="space-y-2">
                    {selectedRFQ.lineItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600">
                          {item.quantity} {item.unit}
                        </span>
                      </div>
                    ))}

                    {/* Delivery Location */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Delivery Location
                      </h4>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option value="">Select delivery location</option>
                        {mockLocations.map((location) => (
                          <option key={location.id} value={location.id}>
                            {location.name} - {location.city}, {location.state}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* Invited Suppliers */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium text-gray-900">
                    Invited Suppliers ({selectedRFQ.suppliersInvited})
                  </h3>
                  {selectedRFQ.quotationsReceived > 1 && (
                    <button
                      onClick={() => console.log("Compare quotes")}
                      className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      Compare
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {selectedRFQ.quotes.map((quote) => {
                    const supplierName = getSupplierName(quote.supplierId);
                    return (
                      <div
                        key={quote.supplierId}
                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">
                            {supplierName}
                          </h4>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              quote.status === "received"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {quote.status === "received"
                              ? "Quote Received"
                              : "Pending"}
                          </span>
                        </div>

                        {quote.value && (
                          <div className="mb-3">
                            <span className="text-sm text-gray-600">
                              Quote Value:{" "}
                            </span>
                            <span className="font-semibold text-lg text-green-600">
                              AED {quote.value.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="flex space-x-2">
                          {quote.status === "received" ? (
                            <button
                              onClick={() =>
                                console.log("Compare quote from:", supplierName)
                              }
                              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                            >
                              View Quote
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                console.log("Send reminder to:", supplierName)
                              }
                              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                              Send Reminder
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  {selectedRFQ.quotes.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                      No suppliers invited yet
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">
                  Actions
                </h3>
                <div className="space-y-3">
                  {selectedRFQ.status === "draft" && (
                    <Button
                      variant="secondary"
                      fullWidth
                      size="sm"
                      onClick={() => console.log("Edit RFQ")}
                    >
                      Edit RFQ
                    </Button>
                  )}
                  {selectedRFQ.status === "draft" && (
                    <Button
                      fullWidth
                      size="sm"
                      onClick={() => console.log("Send RFQ")}
                    >
                      Send RFQ
                    </Button>
                  )}
                  {selectedRFQ.quotationsReceived > 0 && (
                    <Button
                      fullWidth
                      size="sm"
                      onClick={() => console.log("Compare All Quotes")}
                    >
                      Compare All Quotes
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create RFQ Modal */}
      {showCreateRFQModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">
                Create New RFQ
              </h2>
              <button
                onClick={() => setShowCreateRFQModal(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Step 1: Basic Info */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  1. Basic Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      RFQ Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Enter RFQ title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>Select category</option>
                      <option>Food & Beverages</option>
                      <option>Equipment</option>
                      <option>Supplies</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Line Items */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  2. Line Items
                </h3>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Item name"
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <select className="w-full px-2 py-1 border border-gray-300 rounded text-sm">
                      <option>Select unit</option>
                      <option>kg</option>
                      <option>pieces</option>
                      <option>boxes</option>
                    </select>
                  </div>
                  <Button variant="secondary" size="sm">
                    + Add Another Item
                  </Button>
                </div>
              </div>

              {/* Step 3: Suppliers */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  3. Select Suppliers
                </h3>
                <div className="space-y-2">
                  {["FreshCo Vegetables", "Gulf Meat Supplies", "EquipMax"].map(
                    (supplier) => (
                      <label
                        key={supplier}
                        className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                      >
                        <input type="checkbox" className="mr-3" />
                        <span className="text-sm">{supplier}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setShowCreateRFQModal(false)}
                >
                  Save as Draft
                </Button>
                <Button
                  fullWidth
                  onClick={() => {
                    console.log("Send RFQ");
                    setShowCreateRFQModal(false);
                  }}
                >
                  Send RFQ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
