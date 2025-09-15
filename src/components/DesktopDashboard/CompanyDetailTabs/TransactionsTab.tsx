import React, { useState } from "react";
import { FileText, Package, Shield, Calendar, DollarSign, Eye, ChevronRight } from "lucide-react";

interface Transaction {
  id: string;
  type: "rfq" | "sample" | "kyc";
  title: string;
  status: "pending" | "completed" | "in-progress" | "rejected";
  date: Date;
  value?: string;
  description?: string;
}

interface TransactionsTabProps {
  supplierId: string;
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ supplierId }) => {
  const [activeFilter, setActiveFilter] = useState<"all" | "rfq" | "sample" | "kyc">("all");

  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "rfq",
      title: "Office Equipment RFQ-2024-001",
      status: "completed",
      date: new Date(2024, 0, 20),
      value: "$45,000",
      description: "Request for office furniture and equipment",
    },
    {
      id: "2",
      type: "sample",
      title: "Coffee Beans Sample Request",
      status: "in-progress",
      date: new Date(2024, 0, 18),
      description: "Sample request for premium arabica coffee beans",
    },
    {
      id: "3",
      type: "kyc",
      title: "Supplier KYC Verification",
      status: "completed",
      date: new Date(2024, 0, 15),
      description: "Know Your Customer verification process",
    },
    {
      id: "4",
      type: "rfq",
      title: "IT Services RFQ-2024-002",
      status: "pending",
      date: new Date(2024, 0, 22),
      value: "$78,500",
      description: "Annual IT support and maintenance contract",
    },
    {
      id: "5",
      type: "sample",
      title: "Organic Pasta Sample",
      status: "rejected",
      date: new Date(2024, 0, 12),
      description: "Sample request for organic pasta products",
    },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "rfq":
        return <FileText className="w-5 h-5 text-blue-600" />;
      case "sample":
        return <Package className="w-5 h-5 text-green-600" />;
      case "kyc":
        return <Shield className="w-5 h-5 text-purple-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      "in-progress": { color: "bg-blue-100 text-blue-800", label: "In Progress" },
      rejected: { color: "bg-red-100 text-red-800", label: "Rejected" },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredTransactions = transactions.filter(transaction => 
    activeFilter === "all" || transaction.type === activeFilter
  );

  const filters = [
    { id: "all", label: "All", count: transactions.length },
    { id: "rfq", label: "RFQs", count: transactions.filter(t => t.type === "rfq").length },
    { id: "sample", label: "Samples", count: transactions.filter(t => t.type === "sample").length },
    { id: "kyc", label: "KYC", count: transactions.filter(t => t.type === "kyc").length },
  ];

  return (
    <div className="p-6">
      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeFilter === filter.id
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeFilter === filter.id
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Transactions List */}
      <div className="space-y-4">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{transaction.title}</h4>
                    {getStatusBadge(transaction.status)}
                  </div>
                  {transaction.description && (
                    <p className="text-sm text-gray-600 mb-2">{transaction.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{transaction.date.toLocaleDateString()}</span>
                    </div>
                    {transaction.value && (
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span className="font-medium">{transaction.value}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Details"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            {activeFilter === "rfq" && <FileText className="w-8 h-8 text-gray-400" />}
            {activeFilter === "sample" && <Package className="w-8 h-8 text-gray-400" />}
            {activeFilter === "kyc" && <Shield className="w-8 h-8 text-gray-400" />}
            {activeFilter === "all" && <FileText className="w-8 h-8 text-gray-400" />}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {activeFilter === "all" ? "transactions" : activeFilter.toUpperCase()} found
          </h3>
          <p className="text-gray-500">
            {activeFilter === "all" 
              ? "No transactions have been recorded with this supplier yet."
              : `No ${activeFilter} transactions found for this supplier.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionsTab;