import React from "react";
import {
  Calendar,
  TrendingUp,
  Users,
  FileText,
  AlertCircle,
  ChevronRight,
  Star,
  MapPin,
  Award,
  Eye,
  Plus,
  Search,
} from "lucide-react";
import CreateRFQModal from "./CreateRFQModal";
import FindSuppliersModal from "./FindSuppliersModal";
import { useNavigate } from "react-router-dom";

interface DashboardProps {
  sidebarCollapsed: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ sidebarCollapsed }) => {
  const router = useNavigate();
  const [fromDate, setFromDate] = React.useState("2024-01-01");
  const [toDate, setToDate] = React.useState("2024-01-31");
  const [isCreateRFQModalOpen, setIsCreateRFQModalOpen] = React.useState(false);
  const [isFindSuppliersModalOpen, setIsFindSuppliersModalOpen] =
    React.useState(false);

  const kpiData = [
    { label: "Total RFQs", value: "147", color: "blue" },
    { label: "Total RFQ Value", value: "$2.4M", color: "green" },
    { label: "Vendors Invited", value: "89", color: "purple" },
    { label: "Quotations Received", value: "234", color: "orange" },
  ];

  const suppliers = [
    {
      name: "TechCorp Industries",
      type: "Product",
      location: "CA, USA",
      status: "Preferred",
      isFavorite: true,
    },
    {
      name: "Global Supply Co.",
      type: "Service",
      location: "NY, USA",
      status: "Credit",
      isFavorite: false,
    },
    {
      name: "Innovation Partners",
      type: "Freelancer",
      location: "TX, USA",
      status: "Preferred",
      isFavorite: true,
    },
    {
      name: "MegaManuf Inc.",
      type: "Product",
      location: "IL, USA",
      status: "Preferred",
      isFavorite: false,
    },
    {
      name: "Swift Logistics",
      type: "Service",
      location: "FL, USA",
      status: "Credit",
      isFavorite: false,
    },
    {
      name: "Design Masters",
      type: "Freelancer",
      location: "WA, USA",
      status: "Preferred",
      isFavorite: true,
    },
    {
      name: "Quality Components",
      type: "Product",
      location: "CO, USA",
      status: "Credit",
      isFavorite: false,
    },
    {
      name: "Expert Consultants",
      type: "Service",
      location: "MA, USA",
      status: "Preferred",
      isFavorite: true,
    },
    {
      name: "Creative Solutions",
      type: "Freelancer",
      location: "OR, USA",
      status: "Credit",
      isFavorite: false,
    },
    {
      name: "Reliable Parts Co.",
      type: "Product",
      location: "AZ, USA",
      status: "Preferred",
      isFavorite: false,
    },
  ];

  const quotations = [
    {
      rfqTitle: "Office Equipment RFQ-2024-001",
      supplier: "TechCorp Industries",
      value: "$45,000",
      status: "Submitted",
      date: "2024-01-15",
      statusColor: "green",
    },
    {
      rfqTitle: "IT Services RFQ-2024-002",
      supplier: "Global Supply Co.",
      value: "$78,500",
      status: "Pending",
      date: "2024-01-14",
      statusColor: "yellow",
    },
    {
      rfqTitle: "Marketing Campaign RFQ-2024-003",
      supplier: "Innovation Partners",
      value: "$32,000",
      status: "Accepted",
      date: "2024-01-13",
      statusColor: "blue",
    },
    {
      rfqTitle: "Manufacturing Materials RFQ-2024-004",
      supplier: "MegaManuf Inc.",
      value: "$125,000",
      status: "Submitted",
      date: "2024-01-12",
      statusColor: "green",
    },
    {
      rfqTitle: "Logistics Services RFQ-2024-005",
      supplier: "Swift Logistics",
      value: "$67,200",
      status: "Pending",
      date: "2024-01-11",
      statusColor: "yellow",
    },
  ];

  const alerts = [
    {
      message: "New quotation received from TechCorp Industries",
      time: "2 hours ago",
      type: "success",
      unread: true,
    },
    {
      message: "Supplier Global Supply Co. updated their profile",
      time: "4 hours ago",
      type: "info",
      unread: true,
    },
    {
      message: "RFQ deadline approaching for Marketing Campaign",
      time: "1 day ago",
      type: "warning",
      unread: false,
    },
  ];

  const getStatusBadge = (status: string, color: string) => {
    const colors = {
      green: "bg-green-100 text-green-800",
      yellow: "bg-yellow-100 text-yellow-800",
      blue: "bg-blue-100 text-blue-800",
      purple: "bg-purple-100 text-purple-800",
      orange: "bg-orange-100 text-orange-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          colors[color as keyof typeof colors]
        }`}
      >
        {status}
      </span>
    );
  };

  const getSupplierStatusBadge = (status: string) => {
    const statusColors = {
      Preferred: "bg-green-100 text-green-800",
      Credit: "bg-blue-100 text-blue-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusColors[status as keyof typeof statusColors]
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <main
      className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "" : "lg:ml-60"}
      pb-8 min-h-screen bg-gray-50
    `}
    >
      {/* Header */}
      <div className="mb-8 mt-12 lg:mt-0 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-blue-600 font-medium">Welcome back, John! 👋</p>
        </div>

        {/* CTAs - Hidden on mobile, shown on desktop */}
        <div className="hidden lg:flex items-center space-x-3">
          <button
            onClick={() => setIsFindSuppliersModalOpen(true)}
            className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm"
          >
            <Search size={18} className="mr-2 text-blue-600" />
            <span className="text-gray-700 font-medium">Find Suppliers</span>
          </button>
          <button
            onClick={() => router("/rfq-creation")}
            className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Plus size={18} className="mr-2" />
            <span className="font-medium">Create RFQ</span>
          </button>
        </div>

        {/* Mobile CTAs */}
        <div className="lg:hidden flex items-center space-x-3 mt-6">
          <button
            onClick={() => setIsFindSuppliersModalOpen(true)}
            className="flex-1 flex items-center justify-center px-3 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-all duration-200 shadow-sm"
          >
            <Search size={16} className="mr-2 text-blue-600" />
            <span className="text-gray-700 font-medium text-sm">
              Find Suppliers
            </span>
          </button>
          <button
            onClick={() => setIsCreateRFQModalOpen(true)}
            className="flex-1 flex items-center justify-center px-3 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md"
          >
            <Plus size={16} className="mr-2" />
            <span className="font-medium text-sm">Create RFQ</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-0">
              Live RFQ Metrics
            </h2>
            <div className="flex items-center space-x-3">
              <Calendar size={16} className="text-blue-600" />
              <div className="flex items-center space-x-2">
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-xs font-medium text-gray-600 mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiData.map((kpi, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Suppliers */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Suppliers</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center hover:bg-blue-50 px-2 py-1 rounded-md transition-colors">
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="space-y-3">
            {suppliers.slice(0, 8).map((supplier, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-all duration-200 border border-transparent hover:border-blue-100"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {supplier.name}
                    </h4>
                  </div>
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">{supplier.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {getSupplierStatusBadge(supplier.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Quotations */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Latest Quotations
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center hover:bg-blue-50 px-2 py-1 rounded-md transition-colors">
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {quotations.slice(0, 5).map((quotation, index) => (
              <div
                key={index}
                className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0 hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {quotation.rfqTitle.replace(/RFQ-\d{4}-\d{3}/, "").trim()}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 font-medium">
                      {quotation.supplier}
                    </p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex items-center space-x-3">
                    <div className="font-bold text-gray-900 text-sm">
                      {quotation.value}
                    </div>
                    <button className="flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      <Eye size={12} className="mr-1" />
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Alerts & Notifications
            </h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center hover:bg-blue-50 px-2 py-1 rounded-md transition-colors">
              View All
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                  alert.unread
                    ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div
                  className={`p-1.5 rounded-full ${
                    alert.type === "success"
                      ? "bg-gradient-to-r from-green-100 to-emerald-100"
                      : alert.type === "warning"
                      ? "bg-gradient-to-r from-yellow-100 to-orange-100"
                      : "bg-gradient-to-r from-blue-100 to-indigo-100"
                  }`}
                >
                  <AlertCircle
                    size={14}
                    className={
                      alert.type === "success"
                        ? "text-green-600"
                        : alert.type === "warning"
                        ? "text-yellow-600"
                        : "text-blue-600"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-gray-600 font-medium">
                    {alert.time}
                  </p>
                </div>
                {alert.unread && (
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex-shrink-0 mt-1 animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create RFQ Modal */}
      <CreateRFQModal
        isOpen={isCreateRFQModalOpen}
        onClose={() => setIsCreateRFQModalOpen(false)}
      />

      {/* Find Suppliers Modal */}
      <FindSuppliersModal
        isOpen={isFindSuppliersModalOpen}
        onClose={() => setIsFindSuppliersModalOpen(false)}
      />
    </main>
  );
};

export default Dashboard;
