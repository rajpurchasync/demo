import React, { useState } from "react";
import { X, MessageSquare, Calendar, FileText, DollarSign, MapPin, Tag, Building, MoreHorizontal, Fullscreen, Fullscreen as FullscreenExit, Edit, Save, XCircle } from "lucide-react";
import MessagesTab from "./CompanyDetailTabs/MessagesTab";
import ContactsTab from "./CompanyDetailTabs/ContactsTab";
import DocumentsTab from "./CompanyDetailTabs/DocumentsTab";
import TransactionsTab from "./CompanyDetailTabs/TransactionsTab";
import MessageModal from "./Modals/MessageModal";
import RequestMeetingModal from "./Modals/RequestMeetingModal";
import SelectKYCTemplateModal from "./Modals/SelectKYCTemplateModal";
import RFQModal from "./Modals/RFQModal";

interface Supplier {
  id: string;
  companyName: string;
  type: string;
  category: string;
  label: "Credit" | "Approved" | "Prospective";
  tags: string[];
  country: string;
  state: string;
  city: string;
}

interface CompanyDetailViewProps {
  isOpen: boolean;
  onClose: () => void;
  company: Supplier | null;
  onUpdateSupplier: (id: string, updatedFields: Partial<Supplier>) => void;
}

const CompanyDetailView: React.FC<CompanyDetailViewProps> = ({
  isOpen,
  onClose,
  company,
  onUpdateSupplier,
}) => {
  const [activeTab, setActiveTab] = useState<"messages" | "contacts" | "documents" | "transactions">("messages");
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);
  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedCompany, setEditedCompany] = useState<Supplier | null>(company);

  React.useEffect(() => {
    setEditedCompany(company);
  }, [company]);

  if (!isOpen || !company) return null;

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Credit":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "Prospective":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const quickActions = [
    {
      id: "message",
      label: "Message",
      icon: MessageSquare,
      action: () => setIsMessageModalOpen(true),
    },
    {
      id: "meeting",
      label: "Set Meeting",
      icon: Calendar,
      action: () => setIsMeetingModalOpen(true),
    },
    {
      id: "kyc",
      label: "Send KYC",
      icon: FileText,
      action: () => setIsKYCModalOpen(true),
    },
    {
      id: "quote",
      label: "Ask Quote",
      icon: DollarSign,
      action: () => setIsRFQModalOpen(true),
    },
  ];

  const tabs = [
    { id: "messages", label: "Messages", count: 12 },
    { id: "contacts", label: "Contacts", count: 3 },
    { id: "documents", label: "Documents", count: 8 },
    { id: "transactions", label: "Transactions", count: 5 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "messages":
        return <MessagesTab supplierId={company.id} />;
      case "contacts":
        return <ContactsTab supplierId={company.id} />;
      case "documents":
        return <DocumentsTab supplierId={company.id} />;
      case "transactions":
        return <TransactionsTab supplierId={company.id} />;
      default:
        return null;
    }
  };

  const handleSaveEdit = () => {
    if (editedCompany) {
      onUpdateSupplier(company.id, editedCompany);
      setEditMode(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedCompany(company);
    setEditMode(false);
  };

  const handleInputChange = (field: keyof Supplier, value: string) => {
    setEditedCompany(prev => prev ? { ...prev, [field]: value } : null);
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${isFullScreen ? 'overflow-auto' : ''}`}>
      <div className={`bg-white rounded-xl shadow-xl w-full ${isFullScreen ? 'max-w-full h-full' : 'max-w-4xl max-h-[90vh]'} overflow-hidden flex flex-col`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex-1">
            {/* Company Name */}
            {editMode ? (
              <input
                type="text"
                value={editedCompany?.companyName || ''}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                className="text-2xl font-semibold text-gray-900 mb-3 border-b border-gray-300 focus:outline-none"
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {company.companyName}
              </h2>
            )}
            
            {/* Location, Labels and Tags */}
            <div className="space-y-2">
              {/* Location */}
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  {editMode ? (
                    <>
                      <input type="text" value={editedCompany?.city || ''} onChange={(e) => handleInputChange('city', e.target.value)} className="text-sm border-b border-gray-300 focus:outline-none" />
                      , <input type="text" value={editedCompany?.state || ''} onChange={(e) => handleInputChange('state', e.target.value)} className="text-sm border-b border-gray-300 focus:outline-none" />
                      , <input type="text" value={editedCompany?.country || ''} onChange={(e) => handleInputChange('country', e.target.value)} className="text-sm border-b border-gray-300 focus:outline-none" />
                    </>
                  ) : (
                    `${company.city}, ${company.state}, ${company.country}`
                  )}
                </span>
              </div>
              
              {/* Label */}
              <div className="flex items-center space-x-2">
                {editMode ? (
                  <select
                    value={editedCompany?.label}
                    onChange={(e) => handleInputChange('label', e.target.value as any)}
                    className="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 focus:outline-none"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Credit">Credit</option>
                    <option value="Prospective">Prospective</option>
                  </select>
                ) : (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getLabelColor(company.label)}`}>
                    {company.label}
                  </span>
                )}
                {editMode ? (
                  <input
                    type="text"
                    value={editedCompany?.type || ''}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="px-3 py-1 rounded-full text-sm font-medium border border-gray-300 focus:outline-none"
                  />
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                    <Building className="w-3 h-3 mr-1" />
                    {company.type}
                  </span>
                )}
              </div>
              
              {/* Tags */}
              {editMode ? (
                <input
                  type="text"
                  value={editedCompany?.tags.join(', ') || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
                  className="w-full px-3 py-1 text-sm border-b border-gray-300 focus:outline-none"
                  placeholder="Tags (comma separated)"
                />
              ) : (
                company.tags.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4 text-gray-400 mr-1" />
                    <div className="flex flex-wrap gap-1">
                      {company.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={action.action}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 rounded-lg transition-colors font-medium text-sm border border-gray-200 hover:bg-gray-100"
                  >
                    <action.icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 inline-block">
              View storefront
            </a>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            {editMode ? (
              <>
                <button
                  onClick={handleSaveEdit}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                  title="Save Changes"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Cancel Edit"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit Details"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullScreen ? <FullscreenExit className="w-5 h-5" /> : <Fullscreen className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 flex-shrink-0">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto">
          {renderTabContent()}
        </div>
      </div>

      {/* Modals */}
      {isMessageModalOpen && <MessageModal isOpen={isMessageModalOpen} onClose={() => setIsMessageModalOpen(false)} supplierName={company.companyName} />}
      {isMeetingModalOpen && <RequestMeetingModal isOpen={isMeetingModalOpen} onClose={() => setIsMeetingModalOpen(false)} supplierName={company.companyName} />}
      {isKYCModalOpen && <SelectKYCTemplateModal isOpen={isKYCModalOpen} onClose={() => setIsKYCModalOpen(false)} supplierName={company.companyName} />}
      {isRFQModalOpen && <RFQModal isOpen={isRFQModalOpen} onClose={() => setIsRFQModalOpen(false)} supplierName={company.companyName} />}
    </div>
  );
};

export default CompanyDetailView;