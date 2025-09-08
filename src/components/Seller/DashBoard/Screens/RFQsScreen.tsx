import React, { useState } from "react";
import {
  Calendar,
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
  Plus,
} from "lucide-react";
import { RFQCard } from "../Cards/RFQCard";
import { Button } from "../UI/Button";
import { mockRFQs, mockCustomers, RFQ } from "../types/purchasync";
import { mockLocations } from "../types/locations";

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
  const [proposalCreated, setProposalCreated] = useState(false);

  const statusFilters = [
    { id: "new", label: "New" },
    { id: "due-today", label: "Due Today" },
    { id: "due-this-week", label: "Due This Week" },
    { id: "open", label: "Open" },
    { id: "pending", label: "Pending" },
    { id: "closed", label: "Closed" },
    { id: "draft", label: "Drafts" },
    { id: "all", label: "All" },
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
      if (statusFilter === "due-today") {
        const today = new Date().toDateString();
        matchesStatus = new Date(rfq.dueDate).toDateString() === today;
      } else if (statusFilter === "due-this-week") {
        const today = new Date();
        const weekFromNow = new Date();
        weekFromNow.setDate(today.getDate() + 7);
        matchesStatus =
          new Date(rfq.dueDate) >= today &&
          new Date(rfq.dueDate) <= weekFromNow;
      } else if (statusFilter === "new") {
        matchesStatus = rfq.status === "open"; // Treat "open" as "new" for seller perspective
      } else if (statusFilter !== "all" && statusFilter !== "earliest-due") {
        matchesStatus = rfq.status === statusFilter;
      }

      return (
        matchesSearch && matchesDateRange && matchesCategory && matchesStatus
      );
    })
    .sort((a, b) => {
      if (statusFilter === "earliest-due") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return 0;
    });

  const getCustomerName = (customerId: string) => {
    const customer = mockCustomers.find((c) => c.id === customerId);
    return customer ? customer.name : `Customer ${customerId}`;
  };

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">Customer Requests</h1>
        <span className="text-sm text-gray-500">
          {filteredRFQs.length} requests
        </span>
      </div>

      {/* Top KPIs */}
      <div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-3 px-4">
            <div className="text-2xl font-bold text-blue-700 mb-1">4</div>
            <div className="text-xs text-left font-medium text-black">
              New <br />
              Requests
            </div>
          </div>
          <div className="flex flex-row items-center gap-3 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-3">
            <div className="text-2xl font-bold text-purple-700 mb-1">6</div>
            <div className="text-xs font-medium text-black">
              Awaiting Decision
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2.5 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center space-x-2"
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

      {/* Filters */}
      <div className="flex items-center space-x-3">
        <div className="flex space-x-2 overflow-x-auto">
          {statusFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setStatusFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                statusFilter === filter.id
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {filteredRFQs.length > 0 ? (
          filteredRFQs.map((rfq) => {
            const isNew = rfq.status === "open"; // Treat "open" as "new" for seller
            return (
              <div
                key={rfq.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm flex-1">
                      {rfq.title}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-3">
                      {rfq.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 font-medium">{rfq.id}</span>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">
                        Due{" "}
                        {new Date(rfq.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  {isNew && (
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={() => console.log("Accept request:", rfq.id)}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => console.log("Reject request:", rfq.id)}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {!isNew && (
                    <button
                      onClick={() => {
                        setSelectedRFQ(rfq);
                        setShowRFQDetailModal(true);
                        setShowLineItems(false);
                        setProposalCreated(false);
                      }}
                      className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            );
          })
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
              No requests match your current filter
            </p>
          </div>
        )}
      </div>

      {/* Request Detail Modal */}
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
              {/* Request Details */}
              <div>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Request No:</span>
                    <span className="font-medium">{selectedRFQ.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium capitalize">
                      {selectedRFQ.status === "open"
                        ? "new"
                        : selectedRFQ.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{selectedRFQ.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Customer:</span>
                    <span className="font-medium">
                      {getCustomerName(selectedRFQ.customers[0] || "1")}
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                        Credit
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Purchase Type:</span>
                    <span className="font-medium">One-time</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Payment Terms:</span>
                    <span className="font-medium">Net 30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Location:</span>
                    <span className="font-medium">Dubai, UAE</span>
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
                    Item List
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
                  </div>
                )}
              </div>

              {/* Comments and Attachments */}
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-3">
                  Comments & Attachments
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-2">Customer Notes:</p>
                  <p className="text-sm text-gray-900 mb-3">
                    "Please provide organic options where available. Delivery
                    needed by 8 AM."
                  </p>
                  <button
                    onClick={() => console.log("View attachment")}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    📎 View Attachment (specifications.pdf)
                  </button>
                </div>
              </div>

              {/* Floating Action Button */}
              <div className="fixed bottom-6 right-6">
                {!proposalCreated ? (
                  <button
                    onClick={() => {
                      setProposalCreated(true);
                      console.log("Create proposal for:", selectedRFQ.id);
                    }}
                    className="w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => console.log("View proposal")}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => console.log("Edit proposal")}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => console.log("Submit proposal")}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>

              {proposalCreated && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <p className="text-sm text-green-800 font-medium">
                    ✅ Proposal created successfully!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
