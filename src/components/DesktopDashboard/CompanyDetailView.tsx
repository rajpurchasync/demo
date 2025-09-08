import React, { useState } from "react";
import {
  X,
  ExternalLink,
  Plus,
  Star,
  MoreHorizontal,
  Edit2,
  Trash2,
  Upload,
  User,
  FileText,
  MessageSquare,
  Maximize2,
  Minimize2,
  UserPlus,
  Calendar,
  FileSearch,
  Package,
  CreditCard,
  Eye,
} from "lucide-react";

interface CompanyDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  company: {
    id: string;
    companyName: string;
    type: string;
    category: string;
    label: "Credit" | "Approved" | "Prospective";
    tags: string[];
    country: string;
    state: string;
    city: string;
  } | null;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  hasBusinessCard?: boolean;
}

interface Document {
  id: string;
  name: string;
  expiry: string;
  attachment: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewer: string;
  date: string;
}

interface QuotationProduct {
  id: string;
  name: string;
  quantity: number;
  specifications: string;
}

interface QuotationService {
  id: string;
  name: string;
  description: string;
  duration: string;
}

export default function CompanyDetailView({
  isOpen,
  onClose,
  company,
}: CompanyDetailViewProps) {
  const [activeTab, setActiveTab] = useState("activity");
  const [comment, setComment] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isQuotationModalOpen, setIsQuotationModalOpen] = useState(false);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isRequestDocumentModalOpen, setIsRequestDocumentModalOpen] =
    useState(false);
  const [editingCompanyInfo, setEditingCompanyInfo] = useState(false);
  const [quotationTab, setQuotationTab] = useState("products");
  const [contactMethod, setContactMethod] = useState("manual");

  // Company info state
  const [companyInfo, setCompanyInfo] = useState({
    website: "www.purchasync.com",
    description: "B2B marketplace for Hospitality",
    notes: "",
  });

  // Dummy data
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john@purchasync.com",
      phone: "+1 555-0123",
      position: "Sales Manager",
      hasBusinessCard: true,
    },
  ]);
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Business License",
      expiry: "2025-12-31",
      attachment: "license.pdf",
    },
    {
      id: "2",
      name: "Tax Certificate",
      expiry: "2024-06-30",
      attachment: "tax-cert.pdf",
    },
  ]);
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      rating: 5,
      comment: "Excellent service and quality products",
      reviewer: "John Smith",
      date: "2024-01-15",
    },
  ]);

  if (!isOpen || !company) return null;

  const tabs = [
    { id: "activity", label: "Latest Activity" },
    { id: "info", label: "Company info" },
    { id: "contact", label: "Contact" },
    { id: "documents", label: "Documents" },
    { id: "quotations", label: "Quotations" },
    { id: "samples", label: "Sample" },
    { id: "reviews", label: "Reviews" },
    { id: "message", label: "Message" },
  ];

  const handleAddComment = () => {
    if (comment.trim()) {
      console.log("Adding comment:", comment);
      setComment("");
    }
  };

  const handleAddContact = (contactData: any) => {
    const newContact = {
      id: Date.now().toString(),
      hasBusinessCard: contactMethod === "scan",
      ...contactData,
    };
    setContacts((prev) => [...prev, newContact]);
    setIsAddContactModalOpen(false);
    setContactMethod("manual");
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleAddReview = (reviewData: any) => {
    const newReview = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      ...reviewData,
    };
    setReviews((prev) => [...prev, newReview]);
    setIsAddReviewModalOpen(false);
  };

  const modalClasses = isFullScreen
    ? "fixed inset-0 bg-white z-50"
    : "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4";

  const contentClasses = isFullScreen
    ? "w-full h-full flex flex-col"
    : "bg-white rounded-xl shadow-xl w-full max-w-7xl h-[90vh] flex flex-col";

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <div className="w-4 h-4 bg-orange-400 rounded"></div>
                Companies
              </span>
              <span>›</span>
              <span>All</span>
              <span>›</span>
              <span className="text-gray-900 font-medium">
                {company.companyName}
              </span>
            </div>
            <Star className="w-5 h-5 text-gray-400 hover:text-yellow-500 cursor-pointer" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isFullScreen ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
            {/* <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-5 h-5" />
            </button> */}
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Company Header */}
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-500 rounded-lg flex items-center justify-center text-white text-lg lg:text-2xl font-bold">
                  {company.companyName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    {company.companyName}
                  </h1>
                  <p className="text-gray-600 text-sm lg:text-base">
                    {companyInfo.description}
                  </p>
                </div>
              </div>

              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm lg:text-base">
                <ExternalLink className="w-4 h-4" />
                View Online Store
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 overflow-x-auto">
              <nav className="flex px-4 lg:px-6 min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 lg:px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
              {activeTab === "activity" && (
                <div className="space-y-6">
                  {/* Comment Input */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      P
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Send a message..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={handleAddComment}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <span className="text-gray-600">↑</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Activity Feed */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-between">
                      Activity
                      {/* <button className="text-sm text-gray-500 hover:text-gray-700">
                        Subscribe
                      </button> */}
                    </h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          R
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              Raj Dhakal
                            </span>
                            <span className="text-gray-500 text-sm">
                              updated Description and 1 other field
                            </span>
                            <span className="text-gray-400 text-sm">
                              16 minutes ago
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>
                              Description → Added{" "}
                              <span className="font-medium">
                                B2B marketplace for Hospitality
                              </span>
                            </div>
                            <div>
                              Domains → Updated{" "}
                              <span className="font-medium">
                                www.purchasync.com
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          R
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">
                              Raj Dhakal
                            </span>
                            <span className="text-gray-500 text-sm">
                              created this company
                            </span>
                            <span className="text-gray-400 text-sm">
                              44 minutes ago
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "info" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Company Information
                    </h3>
                    <button
                      onClick={() => setEditingCompanyInfo(!editingCompanyInfo)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Edit2 className="w-4 h-4" />
                      {editingCompanyInfo ? "Save" : "Edit"}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name
                      </label>
                      <p className="text-gray-900">{company.companyName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <p className="text-gray-900">{company.type}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <p className="text-gray-900">{company.category}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <p className="text-gray-900">
                        {company.city}, {company.state}, {company.country}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      {editingCompanyInfo ? (
                        <input
                          type="text"
                          value={companyInfo.website}
                          onChange={(e) =>
                            setCompanyInfo((prev) => ({
                              ...prev,
                              website: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        <p className="text-blue-600">{companyInfo.website}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label
                      </label>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          company.label === "Approved"
                            ? "bg-green-100 text-green-800"
                            : company.label === "Credit"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {company.label}
                      </span>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      {editingCompanyInfo ? (
                        <textarea
                          value={companyInfo.description}
                          onChange={(e) =>
                            setCompanyInfo((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-900">
                          {companyInfo.description}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Notes
                      </label>
                      {editingCompanyInfo ? (
                        <textarea
                          value={companyInfo.notes}
                          onChange={(e) =>
                            setCompanyInfo((prev) => ({
                              ...prev,
                              notes: e.target.value,
                            }))
                          }
                          placeholder="Add internal notes..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                        />
                      ) : (
                        <p className="text-gray-900">
                          {companyInfo.notes || "No notes added"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Contacts
                    </h3>
                    <button
                      onClick={() => setIsAddContactModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Contact
                    </button>
                  </div>

                  {contacts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-8 h-8 text-orange-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Nobody home! Add your first contact to bring this
                        company to life.
                      </h3>
                      <div className="flex gap-3 justify-center mt-4">
                        <button
                          onClick={() => setIsAddContactModalOpen(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Add Manual
                        </button>
                        <button
                          onClick={() => {
                            setContactMethod("scan");
                            setIsAddContactModalOpen(true);
                          }}
                          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          Scan Business Card
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="bg-gray-50 p-4 rounded-lg"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">
                                {contact.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {contact.position}
                              </p>
                              <p className="text-sm text-gray-600">
                                {contact.email} • {contact.phone}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {contact.hasBusinessCard && (
                                <button className="flex items-center gap-1 px-2 py-1 text-xs text-blue-600 hover:text-blue-700 font-medium">
                                  <Eye className="w-3 h-3" />
                                  View Card
                                </button>
                              )}
                              <button className="text-gray-400 hover:text-gray-600">
                                <Edit2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "documents" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Documents
                    </h3>
                    <button
                      onClick={() => setIsAddDocumentModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Document
                    </button>
                  </div>

                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {doc.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                Expires: {doc.expiry}
                              </p>
                              <p className="text-sm text-blue-600">
                                {doc.attachment}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="text-gray-400 hover:text-gray-600">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="text-gray-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "quotations" && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No quotations yet
                  </h3>
                  <p className="text-gray-600">
                    Request quotations to see them here.
                  </p>
                </div>
              )}

              {activeTab === "samples" && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No samples yet
                  </h3>
                  <p className="text-gray-600">
                    Request samples to track them here.
                  </p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Supplier Reviews
                    </h3>
                    <button
                      onClick={() => setIsAddReviewModalOpen(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Review
                    </button>
                  </div>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div
                        key={review.id}
                        className="bg-gray-50 p-4 rounded-lg"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">
                              {review.reviewer}
                            </span>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "message" && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">📄</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Message yet
                  </h3>
                  <p className="text-gray-600">Messages will appear here.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Actions Only */}
          <div className="w-64 lg:w-80 border-l border-gray-200 bg-gray-50 hidden md:block">
            <div className="p-4 lg:p-6 space-y-1">
              <h3 className="font-semibold text-gray-900 mb-4">Actions</h3>

              <button
                onClick={() => setIsAddContactModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <UserPlus className="w-4 h-4 text-teal-600" />
                Add New Contact
              </button>

              <button
                onClick={() => setIsQuotationModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <CreditCard className="w-4 h-4 text-teal-600" />
                Request Quotation
              </button>

              <button
                onClick={() => setIsSampleModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <Package className="w-4 h-4 text-teal-600" />
                Request Sample
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                <Calendar className="w-4 h-4 text-teal-600" />
                Send Message
              </button>

              <button className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left">
                <Calendar className="w-4 h-4 text-teal-600" />
                Request Meeting
              </button>

              <button
                onClick={() => setIsRequestDocumentModalOpen(true)}
                className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-left"
              >
                <FileSearch className="w-4 h-4 text-teal-600" />
                Request Document
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Contact
              </h2>
              <button
                onClick={() => setIsAddContactModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setContactMethod("manual")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    contactMethod === "manual"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Add Manual
                </button>
                <button
                  onClick={() => setContactMethod("scan")}
                  className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                    contactMethod === "scan"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Scan Business Card
                </button>
              </div>

              {contactMethod === "scan" && (
                <div className="mb-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Upload business card image
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG up to 10MB
                    </p>
                  </div>
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  handleAddContact({
                    name: formData.get("name"),
                    email: formData.get("email"),
                    phone: formData.get("phone"),
                    position: formData.get("position"),
                  });
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Save Contact
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Request Quotation Modal */}
      {isQuotationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Request Quotation
              </h2>
              <button
                onClick={() => setIsQuotationModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quotation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex px-6">
                <button
                  onClick={() => setQuotationTab("products")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    quotationTab === "products"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Products
                </button>
                <button
                  onClick={() => setQuotationTab("services")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    quotationTab === "services"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Services
                </button>
              </nav>
            </div>

            <div className="p-6">
              {quotationTab === "products" && (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter quantity"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specifications
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter product specifications"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Request Quotation
                  </button>
                </form>
              )}

              {quotationTab === "services" && (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter service name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Describe the service requirements"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Expected duration"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Request Quotation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Request Sample Modal */}
      {isSampleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Request Sample
              </h2>
              <button
                onClick={() => setIsSampleModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sample Required For
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Purpose of sample"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Location
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select delivery location</option>
                  <option value="profile">Use profile address</option>
                  <option value="custom">Add new address</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Request Sample
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Request Document Modal */}
      {isRequestDocumentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Request Document
              </h2>
              <button
                onClick={() => setIsRequestDocumentModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Purpose
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain why you need these documents"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Required Documents
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Document name"
                        className="w-full border-none outline-none text-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1 text-xs">
                        <input
                          type="radio"
                          name="doc1"
                          value="mandatory"
                          defaultChecked
                        />
                        Mandatory
                      </label>
                      <label className="flex items-center gap-1 text-xs">
                        <input type="radio" name="doc1" value="optional" />
                        Optional
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    Add Document
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reference Files (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Attach reference files for seller
                  </p>
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Document Modal */}
      {isAddDocumentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Document
              </h2>
              <button
                onClick={() => setIsAddDocumentModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const newDoc = {
                  id: Date.now().toString(),
                  name: formData.get("name") as string,
                  expiry: formData.get("expiry") as string,
                  attachment:
                    (formData.get("name") as string)
                      .toLowerCase()
                      .replace(/\s+/g, "-") + ".pdf",
                };
                setDocuments((prev) => [...prev, newDoc]);
                setIsAddDocumentModalOpen(false);
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Document Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiry"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Click to upload or drag and drop
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Save Document
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {isAddReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Add Review
              </h2>
              <button
                onClick={() => setIsAddReviewModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleAddReview({
                  rating: parseInt(formData.get("rating") as string),
                  comment: formData.get("comment"),
                  reviewer: formData.get("reviewer"),
                });
              }}
              className="p-6 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reviewer Name
                </label>
                <input
                  type="text"
                  name="reviewer"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  name="rating"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select rating</option>
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Very Poor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review Comment
                </label>
                <textarea
                  name="comment"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Share your experience with this supplier..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Save Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
