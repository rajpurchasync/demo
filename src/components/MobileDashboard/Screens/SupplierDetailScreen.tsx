import React, { useState } from "react";
import {
  ChevronLeft,
  MoreVertical,
  Phone,
  Mail,
  MessageSquare,
  Edit3,
  Trash2,
  Heart,
  ExternalLink,
  MessageCircle,
  Calendar,
  FileText,
  Upload,
  Shield,
  UserPlus,
  ChevronDown,
  ChevronRight,
  Store,
} from "lucide-react";
import { Supplier } from "../types/purchasync";

import { SendMessageModal } from "../Modals/SendMessageModal";

import { RequestMeetingModal } from "../Modals/RequestMeetingModal";
import { RequestDocumentModal } from "../Modals/RequestDocumentModal";
import { SupplierMessagesSection } from "../Profile/SupplierMessagesSection";
import { SupplierContactsSection } from "../Profile/SupplierContactsSection";
import { SupplierTransactionsSection } from "../Profile/SupplierTransactionsSection";
import { cn } from "../utils/cn";

interface SupplierDetailScreenProps {
  supplier: Supplier;
  onClose: () => void;
  onAddContact: () => void;
  onRequestQuotation: () => void;
  onRequestSample: () => void;
  onRequestMeeting: () => void;
  onRequestDocument: () => void;
  onSendMessage: () => void;
}

export function SupplierDetailScreen({
  supplier,
  onClose,
  onAddContact,
  onRequestQuotation,
  onRequestSample,
  onRequestMeeting,
  onRequestDocument,
  onSendMessage,
}: SupplierDetailScreenProps) {
  const [activeTab, setActiveTab] = useState("messages");
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [showRequestMeetingModal, setShowRequestMeetingModal] = useState(false);
  const [showRequestDocumentModal, setShowRequestDocumentModal] =
    useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "licenses",
  ]);

  // Mock favorite suppliers list - in real app this would come from props or context
  const favoriteSuppliers = ["1", "2"]; // Mock IDs of favorite suppliers
  const isFavorite = favoriteSuppliers.includes(supplier.id);

  // Mock supplier label
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

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Approved":
        return "text-green-800";
      case "Credit":
        return "text-blue-800";
      case "New Prospect":
        return "text-yellow-800";
      default:
        return "text-gray-800";
    }
  };
  const tabs = [
    { id: "messages", label: "Messages" },
    { id: "contacts", label: "Contact" },
    { id: "documents", label: "Documents" },
    { id: "transactions", label: "Transactions" },
  ];

  const documentSections = [
    {
      id: "licenses",
      title: "License and Certificates",
      documents: [
        { name: "Trade License", date: "2024-01-15" },
        { name: "Food Safety Certificate", date: "2024-01-10" },
      ],
    },
    {
      id: "meetings",
      title: "Meeting Notes",
      documents: [
        { name: "Q1 Review Meeting", date: "2024-01-20" },
        { name: "Contract Discussion", date: "2024-01-18" },
      ],
    },
    {
      id: "catalogues",
      title: "Catalogues",
      documents: [
        { name: "Product Catalogue 2024", date: "2024-01-01" },
        { name: "Price List", date: "2024-01-05" },
      ],
    },
    {
      id: "contracts",
      title: "Contracts",
      documents: [
        { name: "Supply Agreement", date: "2024-01-12" },
        { name: "Service Contract", date: "2024-01-08" },
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case "messages":
        return <SupplierMessagesSection supplierName={supplier.name} />;
      case "contacts":
        return (
          <SupplierContactsSection
            contacts={supplier.contacts}
            onUpdate={() => {}}
          />
        );
      case "documents":
        return (
          <div className="space-y-3">
            {documentSections.map((section) => (
              <div
                key={section.id}
                className="bg-white rounded-lg border border-gray-200"
              >
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {section.title}
                  </span>
                  {expandedSections.includes(section.id) ? (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </button>

                {expandedSections.includes(section.id) && (
                  <div className="border-t border-gray-200 p-3 space-y-2">
                    {section.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded"
                      >
                        <div>
                          <p className="text-xs font-medium text-gray-900">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">{doc.date}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700">
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      case "transactions":
        return (
          <SupplierTransactionsSection
            quotations={supplier.quotations}
            samples={supplier.samples}
          />
        );
      default:
        return <SupplierMessagesSection supplierName={supplier.name} />;
    }
  };

  const supplierLabel = getSupplierLabel(supplier.id);
  return (
    <div className="fixed inset-0 bg-gray-50 z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowHeaderMenu(!showHeaderMenu)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-blue-600" />
            </button>

            {showHeaderMenu && (
              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-32">
                <button
                  onClick={() => {
                    console.log("Edit supplier");
                    setShowHeaderMenu(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg"
                >
                  <Edit3 className="w-3 h-3 mr-2 text-gray-500" />
                  <span className="text-xs text-gray-700">Edit</span>
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm("Are you sure you want to remove this supplier?")
                    ) {
                      console.log("Remove supplier");
                    }
                    setShowHeaderMenu(false);
                  }}
                  className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50 transition-colors last:rounded-b-lg"
                >
                  <Trash2 className="w-3 h-3 mr-2 text-red-500" />
                  <span className="text-xs text-red-600">Remove</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Supplier Info */}
        <div className="text-center px-4 pb-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 text-left">
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                  {supplier.name}
                </h1>
                {isFavorite && <Heart className="w-4 h-4 text-gray-400" />}
              </div>
              <p className="text-xs text-gray-600">
                {supplier.city}, {supplier.country}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={cn(
                    "text-xs font-medium",
                    getLabelColor(supplierLabel)
                  )}
                >
                  {supplierLabel}
                </span>
                <div className="flex space-x-1">
                  {supplier.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs text-gray-500">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <a
              href="#"
              className="text-blue-600 underline hover:text-blue-700 text-sm inline-flex items-center"
            >
              View storefront
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center space-x-8 px-4 pb-4">
          <button
            onClick={() => setShowSendMessageModal(true)}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-1 border border-blue-200">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">Message</span>
          </button>

          <button
            onClick={() => setShowRequestMeetingModal(true)}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-1 border border-blue-200">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">
              Set Meeting
            </span>
          </button>

          <button
            onClick={onRequestQuotation}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-1 border border-blue-200">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">Ask Quote</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 text-xs font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 py-4">
        {activeTab === "messages" && (
          <div className="space-y-3">
            {/* Action Buttons */}
            <div className="px-4">
              <div className="flex justify-center space-x-8">
                <button
                  onClick={() => setShowRequestDocumentModal(true)}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center mb-1">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Add Document</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center mb-1">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Send KYC</span>
                </button>
                <button
                  onClick={onAddContact}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 border-2 border-blue-500 rounded-full flex items-center justify-center mb-1">
                    <UserPlus className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-gray-600">Add Contact</span>
                </button>
              </div>
            </div>

            {/* Messages Content */}
            <div className="px-4">
              <SupplierMessagesSection supplierName={supplier.name} />
            </div>
          </div>
        )}

        {activeTab !== "messages" && (
          <div className="px-4">{renderTabContent()}</div>
        )}
      </div>

      {/* Send Message Modal */}
      <SendMessageModal
        isOpen={showSendMessageModal}
        onClose={() => setShowSendMessageModal(false)}
        supplierName={supplier.name}
      />

      {/* Request Meeting Modal */}
      <RequestMeetingModal
        isOpen={showRequestMeetingModal}
        onClose={() => setShowRequestMeetingModal(false)}
        supplierName={supplier.name}
      />

      {/* Request Document Modal */}
      <RequestDocumentModal
        isOpen={showRequestDocumentModal}
        onClose={() => setShowRequestDocumentModal(false)}
        supplierName={supplier.name}
      />
    </div>
  );
}
