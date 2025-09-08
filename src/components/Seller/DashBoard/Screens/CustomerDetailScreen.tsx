import React, { useState } from "react";
import { ChevronLeft, MoreVertical, Edit3 } from "lucide-react";
import { Customer } from "../types/purchasync";
import { CustomerActionModal } from "../Modals/CustomerActionModal";
import { CustomerCompanyInfoSection } from "../Profile/CustomerCompanyInfoSection";
import { CustomerContactsSection } from "../Profile/CustomerContactsSection";
import { CustomerDocumentsSection } from "../Profile/CustomerDocumentsSection";
import { CustomerQuotationCard } from "../Cards/CustomerQuotationCard";
import { CustomerSampleCard } from "../Cards/CustomerSampleCard";

interface CustomerDetailScreenProps {
  customer: Customer;
  onClose: () => void;
  onAddContact: () => void;
  onRequestQuotation: () => void;
  onRequestSample: () => void;
  onRequestMeeting: () => void;
  onRequestDocument: () => void;
  onSendMessage: () => void;
}

export function CustomerDetailScreen({
  customer,
  onClose,
  onAddContact,
  onRequestQuotation,
  onRequestSample,
  onRequestMeeting,
  onRequestDocument,
  onSendMessage,
}: CustomerDetailScreenProps) {
  const [activeTab, setActiveTab] = useState("activity");
  const [showActionModal, setShowActionModal] = useState(false);
  const [isEditingCompanyInfo, setIsEditingCompanyInfo] = useState(false);
  const [customerData, setCustomerData] = useState(customer);
  const [companyFormData, setCompanyFormData] = useState({
    name: customer.name,
    type: customer.type,
    category: customer.category,
    country: customer.country,
    state: customer.state,
    city: customer.city,
    tags: customer.tags.join(", "),
  });

  const tabs = [
    { id: "activity", label: "Activity" },
    { id: "contact", label: "Contacts" },
    { id: "documents", label: "Docs" },
    { id: "quotes", label: "Requests" },
    { id: "samples", label: "Samples" },
  ];

  const mockActivity = [
    {
      id: "1",
      user: "Ahmed Hassan",
      action: "updated Description and 1 other field",
      timestamp: "16 minutes ago",
      details: "Description → Added Fresh vegetables and produce customer",
    },
    {
      id: "2",
      user: "Ahmed Hassan",
      action: "created this customer",
      timestamp: "44 minutes ago",
      details: null,
    },
  ];

  const handleCustomerUpdate = (updates: Partial<Customer>) => {
    setCustomerData((prev) => ({ ...prev, ...updates }));
  };

  const handleCompanyInputChange = (field: string, value: string) => {
    setCompanyFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveCompanyInfo = () => {
    const updates = {
      ...companyFormData,
      tags: companyFormData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };
    handleCustomerUpdate(updates);
    setIsEditingCompanyInfo(false);
  };

  const handleCancelCompanyEdit = () => {
    setCompanyFormData({
      name: customerData.name,
      type: customerData.type,
      category: customerData.category,
      country: customerData.country,
      state: customerData.state,
      city: customerData.city,
      tags: customerData.tags.join(", "),
    });
    setIsEditingCompanyInfo(false);
  };

  const customerTypes = [
    { value: "Vendor", label: "Vendor" },
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "Distributor", label: "Distributor" },
    { value: "Service Provider", label: "Service Provider" },
    { value: "Wholesaler", label: "Wholesaler" },
  ];

  const categories = [
    { value: "Produce", label: "Produce" },
    { value: "Meat & Poultry", label: "Meat & Poultry" },
    { value: "Kitchen Equipment", label: "Kitchen Equipment" },
    { value: "Spices & Seasonings", label: "Spices & Seasonings" },
    { value: "Cleaning Services", label: "Cleaning Services" },
    { value: "Other", label: "Other" },
  ];

  const countries = [
    { value: "United Arab Emirates", label: "United Arab Emirates" },
    { value: "Saudi Arabia", label: "Saudi Arabia" },
    { value: "Qatar", label: "Qatar" },
    { value: "Kuwait", label: "Kuwait" },
    { value: "Bahrain", label: "Bahrain" },
    { value: "Oman", label: "Oman" },
  ];

  const states = [
    { value: "Dubai", label: "Dubai" },
    { value: "Abu Dhabi", label: "Abu Dhabi" },
    { value: "Sharjah", label: "Sharjah" },
    { value: "Ajman", label: "Ajman" },
    { value: "Ras Al Khaimah", label: "Ras Al Khaimah" },
    { value: "Fujairah", label: "Fujairah" },
    { value: "Umm Al Quwain", label: "Umm Al Quwain" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "activity":
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-900 flex items-center justify-between">
                Activity
                {/* <button className="text-xs text-purple-600 hover:text-purple-700">Subscribe</button> */}
              </h3>

              {mockActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">R</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                      <span className="text-gray-500 ml-2">
                        {activity.timestamp}
                      </span>
                    </p>
                    {activity.details && (
                      <p className="text-xs text-gray-600 mt-1">
                        {activity.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <CustomerContactsSection
            contacts={customerData.contacts}
            onUpdate={(contacts) => handleCustomerUpdate({ contacts })}
          />
        );

      case "documents":
        return (
          <CustomerDocumentsSection
            documents={customerData.documents}
            onUpdate={(documents) => handleCustomerUpdate({ documents })}
          />
        );

      case "quotes":
        return (
          <div className="space-y-3">
            {customerData.quotations.length > 0 ? (
              customerData.quotations.map((quotation) => (
                <CustomerQuotationCard
                  key={quotation.id}
                  quotation={quotation}
                  onClick={() => console.log("View quotation:", quotation.id)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No requests yet</p>
                <p className="text-xs mt-1">
                  Requests will appear here when available.
                </p>
              </div>
            )}
          </div>
        );

      case "samples":
        return (
          <div className="space-y-3">
            {customerData.samples.length > 0 ? (
              customerData.samples.map((sample) => (
                <CustomerSampleCard
                  key={sample.id}
                  sample={sample}
                  onClick={() => console.log("View sample:", sample.id)}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No samples yet</p>
                <p className="text-xs mt-1">
                  Sample requests will appear here when available.
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">This section is coming soon!</p>
            <p className="text-xs mt-1">More details will be available here.</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10 shadow-sm px-3 py-2 flex items-center justify-between">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-sm font-bold text-gray-900 tracking-tight flex-1 text-left ml-2">
          Customer Details
        </h1>
      </div>

      {/* Main Content */}
      <div className="p-3 space-y-4">
        {/* Company Details Card */}
        <div className="bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-gray-900">
              Company Details
            </h3>
            <div className="flex items-center space-x-2">
              {!isEditingCompanyInfo ? (
                <>
                  <button
                    onClick={() => setIsEditingCompanyInfo(true)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setShowActionModal(true)}
                    className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveCompanyInfo}
                    className="px-3 py-1 bg-purple-600 text-white text-xs rounded hover:bg-purple-700 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelCompanyEdit}
                    className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {isEditingCompanyInfo ? (
            <div className="space-y-3">
              <input
                type="text"
                value={companyFormData.name}
                onChange={(e) =>
                  handleCompanyInputChange("name", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="Company Name"
              />

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={companyFormData.type}
                  onChange={(e) =>
                    handleCompanyInputChange("type", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="">Select type</option>
                  {customerTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <select
                  value={companyFormData.category}
                  onChange={(e) =>
                    handleCompanyInputChange("category", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={companyFormData.country}
                  onChange={(e) =>
                    handleCompanyInputChange("country", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="">Country</option>
                  {countries.map((country) => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
                <select
                  value={companyFormData.state}
                  onChange={(e) =>
                    handleCompanyInputChange("state", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="">State</option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={companyFormData.city}
                  onChange={(e) =>
                    handleCompanyInputChange("city", e.target.value)
                  }
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="City"
                />
              </div>

              <input
                type="text"
                value={companyFormData.tags}
                onChange={(e) =>
                  handleCompanyInputChange("tags", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent text-sm"
                placeholder="Tags (comma separated)"
              />
            </div>
          ) : (
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg font-bold text-white">
                  {customerData.name.charAt(0)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gray-900">
                  {customerData.name}
                </h2>
                <p className="text-xs text-gray-600">
                  {customerData.customerType} • {customerData.category}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {customerData.city}, {customerData.state}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {customerData.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      {tag}
                    </span>
                  ))}
                  {customerData.tags.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{customerData.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Tabs */}
        <div className="sticky top-12 bg-white z-10 border-b border-gray-200">
          <div className="flex space-x-6 px-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-4">{renderTabContent()}</div>
      </div>

      {/* Action Modal */}
      <CustomerActionModal
        isOpen={showActionModal}
        onClose={() => setShowActionModal(false)}
        customerName={customerData.name}
        onAddContact={onAddContact}
        onRequestQuotation={onRequestQuotation}
        onRequestSample={onRequestSample}
        onRequestMeeting={onRequestMeeting}
        onRequestDocument={onRequestDocument}
        onSendMessage={onSendMessage}
      />
    </div>
  );
}
