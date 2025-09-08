import React, { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Filter,
  MapPin,
  MessageSquare,
  FileText,
  Trash2,
  Mail,
  Phone,
  User,
  Building,
  ChevronDown,
  X,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Eye,
  Download,
  Shield,
} from "lucide-react";
import SupplierSearchModal from "./SupplierSearchModal";
import SupplierDocumentsDrawer from "./SupplierDocumentsDrawer";
import SupplierReviewModal from "./SupplierReviewModal";

interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  contactPerson: string;
  location: {
    city: string;
    country: string;
  };
  category: string;
  subCategory: string;
  type:
    | "Distributor"
    | "Manufacturer"
    | "Service Provider"
    | "Retailer"
    | "Wholesaler";
  status: "approved" | "credit-pending" | "credit-confirmed";
  dateAdded: string;
  documentsOnFile: boolean;
  lastReviewDate?: string;
  rating?: number;
  reviewComments?: string;
}

interface SupplierManagementProps {
  sidebarCollapsed: boolean;
}

const SupplierManagement: React.FC<SupplierManagementProps> = ({
  sidebarCollapsed,
}) => {
  const [activeTab, setActiveTab] = useState<
    "suppliers" | "documents" | "reviews"
  >("suppliers");
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isDocumentsDrawerOpen, setIsDocumentsDrawerOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    supplierType: "",
    location: "",
    status: "",
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "TechCorp Industries",
      email: "contact@techcorp.com",
      phone: "+1-555-0123",
      contactPerson: "John Smith",
      location: { city: "San Francisco", country: "USA" },
      category: "Technology",
      subCategory: "Hardware",
      type: "Manufacturer",
      status: "approved",
      dateAdded: "2024-01-15",
      documentsOnFile: true,
      lastReviewDate: "2024-01-10",
      rating: 4.5,
      reviewComments:
        "Excellent quality and timely delivery. Highly recommended for tech equipment.",
    },
    {
      id: "2",
      name: "Global Supply Co.",
      email: "info@globalsupply.com",
      phone: "+1-555-0456",
      contactPerson: "Sarah Johnson",
      location: { city: "New York", country: "USA" },
      category: "Manufacturing",
      subCategory: "Components",
      type: "Distributor",
      status: "credit-confirmed",
      dateAdded: "2024-01-10",
      documentsOnFile: true,
      lastReviewDate: "2024-01-08",
      rating: 4.2,
      reviewComments:
        "Good supplier with competitive pricing. Credit terms are favorable.",
    },
    {
      id: "3",
      name: "Innovation Partners",
      email: "hello@innovation.com",
      phone: "+1-555-0789",
      contactPerson: "Mike Davis",
      location: { city: "Austin", country: "USA" },
      category: "Services",
      subCategory: "Consulting",
      type: "Service Provider",
      status: "approved",
      dateAdded: "2024-01-08",
      documentsOnFile: false,
      lastReviewDate: "2024-01-05",
      rating: 4.8,
      reviewComments:
        "Outstanding consulting services. Very professional team and excellent results.",
    },
    {
      id: "4",
      name: "Pending Supplier Ltd",
      email: "contact@pending.com",
      phone: "+1-555-0321",
      contactPerson: "Lisa Wilson",
      location: { city: "Chicago", country: "USA" },
      category: "Technology",
      subCategory: "Software",
      type: "Manufacturer",
      status: "credit-pending",
      dateAdded: "2024-01-12",
      documentsOnFile: false,
    },
    {
      id: "5",
      name: "Quality Components Inc",
      email: "sales@qualitycomp.com",
      phone: "+1-555-0654",
      contactPerson: "Robert Chen",
      location: { city: "Seattle", country: "USA" },
      category: "Manufacturing",
      subCategory: "Raw Materials",
      type: "Manufacturer",
      status: "approved",
      dateAdded: "2024-01-06",
      documentsOnFile: true,
      lastReviewDate: "2024-01-03",
      rating: 3.9,
      reviewComments:
        "Decent quality materials but delivery times could be improved.",
    },
  ]);

  const categories = ["Technology", "Manufacturing", "Services", "Logistics"];
  const supplierTypes = [
    "Distributor",
    "Manufacturer",
    "Service Provider",
    "Retailer",
    "Wholesaler",
  ];
  const locations = ["USA", "Canada", "UK", "Germany"];

  const filteredSuppliers = suppliers.filter((supplier) => {
    const matchesTab =
      activeTab === "suppliers" ||
      (activeTab === "documents" && supplier.documentsOnFile) ||
      (activeTab === "reviews" && supplier.lastReviewDate);

    const matchesSearch =
      supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !filters.category || supplier.category === filters.category;
    const matchesSupplierType =
      !filters.supplierType || supplier.type === filters.supplierType;
    const matchesLocation =
      !filters.location || supplier.location.country === filters.location;
    const matchesStatus = !filters.status || supplier.status === filters.status;

    return (
      matchesTab &&
      matchesSearch &&
      matchesCategory &&
      matchesSupplierType &&
      matchesLocation &&
      matchesStatus
    );
  });

  const handleAddSupplier = (
    supplierData: Omit<Supplier, "id" | "dateAdded">
  ) => {
    const newSupplier: Supplier = {
      ...supplierData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split("T")[0],
    };

    setSuppliers((prev) => [...prev, newSupplier]);
    setIsSearchModalOpen(false);

    if (newSupplier.status === "credit-pending") {
      showSuccess("Credit supplier added! Confirmation email sent.");
    } else {
      showSuccess("Approved supplier added successfully!");
    }
  };

  const handleRemoveSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((supplier) => supplier.id !== id));
    showSuccess("Supplier removed successfully");
  };

  const handleResendConfirmation = (id: string) => {
    showSuccess("Confirmation email resent successfully");
  };

  const handleViewDocuments = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDocumentsDrawerOpen(true);
  };

  const handleMarkAsCreditSupplier = (supplier: Supplier) => {
    setSuppliers((prev) =>
      prev.map((s) =>
        s.id === supplier.id ? { ...s, status: "credit-pending" as const } : s
      )
    );
    showSuccess(
      `${supplier.name} marked as credit supplier. Confirmation email sent.`
    );
  };

  const handleViewReview = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsReviewModalOpen(true);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const getStatusBadge = (supplier: Supplier) => {
    const statusConfig = {
      approved: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        label: "Approved",
        icon: CheckCircle,
      },
      "credit-pending": {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: "Credit Pending",
        icon: Clock,
      },
      "credit-confirmed": {
        color: "bg-green-100 text-green-800 border-green-200",
        label: "Credit Confirmed",
        icon: CheckCircle,
      },
    };

    const config = statusConfig[supplier.status];
    const IconComponent = config.icon;

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${config.color}`}
      >
        <IconComponent size={12} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const getSupplierTypeBadge = (type: string) => {
    const typeColors = {
      Distributor: "bg-blue-100 text-blue-800",
      Manufacturer: "bg-green-100 text-green-800",
      "Service Provider": "bg-purple-100 text-purple-800",
      Retailer: "bg-orange-100 text-orange-800",
      Wholesaler: "bg-indigo-100 text-indigo-800",
    };

    return (
      <span
        className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
          typeColors[type as keyof typeof typeColors]
        }`}
      >
        {type}
      </span>
    );
  };

  const getRatingStars = (rating?: number) => {
    if (!rating) return null;

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={12}
            className={`${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-xs text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      supplierType: "",
      location: "",
      status: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some((f) => f !== "");

  return (
    <main
      className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}
      pb-8 min-h-screen bg-gray-50
    `}
    >
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <CheckCircle size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 mt-12 lg:mt-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-2">
              Supplier Management
            </h1>
            <p className="text-gray-600">
              Manage your suppliers, documents, and reviews
            </p>
          </div>

          {/* Add Supplier Button - Sticky Top Right */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="hidden lg:flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            <Plus size={16} className="mr-2" />
            Add Supplier
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6 shadow-sm overflow-x-auto">
        <div className="flex min-w-max">
          <button
            onClick={() => setActiveTab("suppliers")}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap min-w-[120px] ${
              activeTab === "suppliers"
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Approved Suppliers</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {
                  suppliers.filter(
                    (s) =>
                      s.status === "approved" ||
                      s.status === "credit-pending" ||
                      s.status === "credit-confirmed"
                  ).length
                }
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("documents")}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap min-w-[120px] ${
              activeTab === "documents"
                ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Supplier Documents</span>
              <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                {suppliers.filter((s) => s.documentsOnFile).length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors whitespace-nowrap min-w-[120px] ${
              activeTab === "reviews"
                ? "text-orange-600 border-b-2 border-orange-600 bg-orange-50"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <span>Supplier Reviews</span>
              <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
                {suppliers.filter((s) => s.lastReviewDate).length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Search Bar - Sticky */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm sticky top-4 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search suppliers by name or contact person..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} className="mr-2" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Desktop Inline Filters */}
        {isFilterOpen && (
          <div className="hidden lg:block mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filters.supplierType}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      supplierType: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Supplier Types</option>
                  {supplierTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="credit-pending">Credit Pending</option>
                  <option value="credit-confirmed">Credit Confirmed</option>
                </select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-h-[80vh] rounded-t-xl overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Supplier Type
                </label>
                <select
                  value={filters.supplierType}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      supplierType: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Supplier Types</option>
                  {supplierTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="credit-pending">Credit Pending</option>
                  <option value="credit-confirmed">Credit Confirmed</option>
                </select>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 flex space-x-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suppliers List */}
      <div className="space-y-4">
        {/* Mobile: Card Layout */}
        {/* Suppliers Tab - Mobile */}
        {activeTab === "suppliers" && (
          <div className="lg:hidden">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">
                    {supplier.name}
                  </h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-600">
                      {supplier.location.country}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {getSupplierTypeBadge(supplier.type)}
                    {getStatusBadge(supplier)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{supplier.category}</span> →{" "}
                    {supplier.subCategory}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    <MessageSquare size={14} className="mr-1" />
                    Message
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                    <FileText size={14} className="mr-1" />
                    Quote
                  </button>
                  <button
                    onClick={() => handleRemoveSupplier(supplier.id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors col-span-2"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Documents Tab - Mobile */}
        {activeTab === "documents" && (
          <div className="lg:hidden">
            {filteredSuppliers
              .filter((s) => s.documentsOnFile)
              .map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {supplier.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm text-gray-600">
                        {supplier.location.city}, {supplier.location.country}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <FileText size={14} className="text-purple-600" />
                      <span className="text-sm font-medium text-gray-900">
                        4 documents on file
                      </span>
                    </div>
                  </div>
                  <div className="w-full">
                    <button
                      onClick={() => handleViewDocuments(supplier)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Eye size={14} className="mr-1" />
                      View Documents
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Reviews Tab - Mobile */}
        {activeTab === "reviews" && (
          <div className="lg:hidden">
            {filteredSuppliers
              .filter((s) => s.lastReviewDate)
              .map((supplier) => (
                <div
                  key={supplier.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                >
                  <div className="mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-2">
                      {supplier.name}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2">
                      <span className="font-medium">RFQ:</span> RFQ-2024-
                      {String(parseInt(supplier.id) + 100).padStart(3, "0")}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      <span className="font-medium">Review Date:</span>{" "}
                      {new Date(supplier.lastReviewDate).toLocaleDateString()}
                    </div>
                    {supplier.rating && (
                      <div className="mb-3">
                        {getRatingStars(supplier.rating)}
                      </div>
                    )}
                  </div>
                  <div className="w-full">
                    <button
                      onClick={() => handleViewReview(supplier)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <Eye size={14} className="mr-1" />
                      View Review
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Desktop: Table Layout */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Supplier
                  </th>
                  {activeTab === "suppliers" && (
                    <>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Country
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Type
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Status
                      </th>
                    </>
                  )}
                  {activeTab === "documents" && (
                    <>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Country
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Documents
                      </th>
                    </>
                  )}
                  {activeTab === "reviews" && (
                    <>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        RFQ Number
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Review Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Rating
                      </th>
                    </>
                  )}
                  <th className="text-right py-3 px-4 font-medium text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSuppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">
                              {supplier.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </td>
                    {activeTab === "suppliers" && (
                      <>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <span>{supplier.location.country}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getSupplierTypeBadge(supplier.type)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <p className="font-medium text-gray-900">
                              {supplier.category}
                            </p>
                            <p className="text-gray-600">
                              {supplier.subCategory}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          {getStatusBadge(supplier)}
                        </td>
                      </>
                    )}
                    {activeTab === "documents" && (
                      <>
                        <td className="py-4 px-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <span>{supplier.location.country}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <FileText size={14} className="text-purple-600" />
                            <span className="text-sm font-medium text-gray-900">
                              4 documents
                            </span>
                          </div>
                        </td>
                      </>
                    )}
                    {activeTab === "reviews" && (
                      <>
                        <td className="py-4 px-4">
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                            RFQ-2024-
                            {String(parseInt(supplier.id) + 100).padStart(
                              3,
                              "0"
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-900">
                            {supplier.lastReviewDate
                              ? new Date(
                                  supplier.lastReviewDate
                                ).toLocaleDateString()
                              : "-"}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {getRatingStars(supplier.rating)}
                        </td>
                      </>
                    )}
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        {activeTab === "suppliers" && (
                          <>
                            <button className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors">
                              <MessageSquare size={16} />
                            </button>
                            <button className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
                              <FileText size={16} />
                            </button>
                            <button
                              onClick={() => handleRemoveSupplier(supplier.id)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        )}
                        {activeTab === "documents" && (
                          <button
                            onClick={() => handleViewDocuments(supplier)}
                            className="p-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        {activeTab === "reviews" && (
                          <button
                            onClick={() => handleViewReview(supplier)}
                            className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredSuppliers.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <Users size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No{" "}
              {activeTab === "suppliers"
                ? "suppliers"
                : activeTab === "documents"
                ? "suppliers with documents"
                : "reviewed suppliers"}{" "}
              found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || hasActiveFilters
                ? "Try adjusting your search or filters"
                : `Start by adding your first supplier`}
            </p>
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Plus size={16} className="mr-2" />
              Add Supplier
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={() => setIsSearchModalOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-40"
      >
        <Plus size={24} />
      </button>

      {/* Supplier Search Modal */}
      <SupplierSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSave={handleAddSupplier}
      />

      {/* Supplier Documents Drawer */}
      <SupplierDocumentsDrawer
        isOpen={isDocumentsDrawerOpen}
        onClose={() => setIsDocumentsDrawerOpen(false)}
        supplier={selectedSupplier}
      />

      {/* Supplier Review Modal */}
      <SupplierReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        supplier={selectedSupplier}
      />

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default SupplierManagement;
