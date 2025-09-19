import React, { useState } from 'react';
import ContactDetailModal from './ContactDetailModal';
import AddMeetingNoteModal from './AddMeetingNoteModal';
import AddCompanyModal from './AddCompanyModal';
import { 
  X, 
  MessageSquare, 
  FileText, 
  Send, 
  Calendar,
  CalendarPlus,
  FolderPlus,
  Target,
  FileCheck,
  Expand,
  Minimize,
  Upload,
  Download,
  Edit,
  Plus,
  Phone,
  Mail,
  MapPin,
  Tag,
  Building,
  Clock,
  User,
  DollarSign,
  Eye,
  Award,
  ChevronDown,
  Trash2,
  Activity,
  ExternalLink
} from 'lucide-react';

import EventModal from '../Calendar/EventModal';

interface SupplierDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: any;
  onUpdate?: (supplierId: number, updates: any) => void;
}

// Contact Form Component
const ContactForm: React.FC<{ onSave: (data: any) => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    email: '',
    phone: ''
  });

  const handleSubmit = () => {
    if (formData.name && formData.email) {
      onSave(formData);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <input
          type="text"
          value={formData.position}
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div className="flex items-center justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Contact
        </button>
      </div>
    </div>
  );
};

// Branch Form Component
const BranchForm: React.FC<{ onSave: (data: any) => void; onCancel: () => void }> = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    country: ''
  });

  const handleSubmit = () => {
    if (formData.city && formData.state && formData.country) {
      onSave(formData);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
        <input
          type="text"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
        <input
          type="text"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>
      <div className="flex items-center justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Add Branch
        </button>
      </div>
    </div>
  );
};

const SupplierDetailModal: React.FC<SupplierDetailModalProps> = ({ isOpen, onClose, supplier, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('communication');
  const [activeSubTab, setActiveSubTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showMeetingNoteModal, setShowMeetingNoteModal] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editData, setEditData] = useState(supplier || {});
  const [editingLabel, setEditingLabel] = useState(false);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddTagModal, setShowAddTagModal] = useState(false);
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showEditSupplierModal, setShowEditSupplierModal] = useState(false);
  const [hoveredSupplierName, setHoveredSupplierName] = useState(false);
  const [showCompanyDescModal, setShowCompanyDescModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [showCatalogueModal, setShowCatalogueModal] = useState(false);
  const [showUploadDocModal, setShowUploadDocModal] = useState(false);
  const [companyDescription, setCompanyDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [catalogueName, setCatalogueName] = useState('');
  
  // State for editable sections
  const [contacts, setContacts] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [emails, setEmails] = useState<any[]>([]);
  const [meetingNotes, setMeetingNotes] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [transactions, setTransactions] = useState({
    rfqs: [],
    quotations: [],
    contracts: [],
    samples: []
  });

  if (!isOpen || !supplier) return null;

  const tabs = [
    { id: 'communication', label: 'Communication' },
    { id: 'overview', label: 'Overview' },
    { id: 'onboarding', label: 'Onboarding' },
    { id: 'transactions', label: 'Transactions' }
  ];

  const communicationSubTabs = [
    { id: 'messages', label: 'Messages' },
    { id: 'emails', label: 'Emails' },
    { id: 'meeting-notes', label: 'Meeting Notes' }
  ];

  const overviewSubTabs = [
    { id: 'about', label: 'About' },
    { id: 'categories', label: 'Categories' },
    { id: 'catalogue', label: 'Catalogue' }
  ];

  const onboardingSubTabs = [
    { id: 'documents', label: 'Documents' },
    { id: 'kyc', label: 'KYC' }
  ];

  const documentsSubTabs = [
    { id: 'company', label: 'Company' },
    { id: 'kyc', label: 'KYC' }
  ];

  const transactionsSubTabs = [
    { id: 'rfq', label: 'RFQ' },
    { id: 'quotations', label: 'Quotations' },
    { id: 'contract', label: 'Contract' },
    { id: 'sample', label: 'Sample' }
  ];

  const getLabelColor = (label: string) => {
    switch (label?.toLowerCase()) {
      case 'approved':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'on-credit':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'new prospect':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        author: 'You',
        content: newMessage.trim(),
        timestamp: 'Just now',
        type: 'sent'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleEditField = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    if (onUpdate) {
      onUpdate(supplier.id, { [field]: value });
    }
    setEditingField(null);
  };

  const openContactModal = (contact: any) => {
    setSelectedContact(contact);
    setShowContactModal(true);
  };

  const handleAddMeetingNote = (noteData: any) => {
    setMeetingNotes(prev => [...prev, noteData]);
  };

  const handleAddContact = (contactData: any) => {
    const newContact = {
      id: Date.now(),
      name: contactData.name,
      position: contactData.position,
      email: contactData.email,
      phone: contactData.phone
    };
    setContacts(prev => [...prev, newContact]);
    setShowAddContactModal(false);
  };

  const handleAddBranch = (branchData: any) => {
    const newBranch = {
      id: Date.now(),
      city: branchData.city,
      state: branchData.state,
      country: branchData.country
    };
    setBranches(prev => [...prev, newBranch]);
    setShowAddBranchModal(false);
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !supplier.tags?.includes(newTagInput.trim())) {
      const updatedTags = [...(supplier.tags || []), newTagInput.trim()];
      if (onUpdate) {
        onUpdate(supplier.id, { tags: updatedTags });
      }
      setNewTagInput('');
      setShowAddTagModal(false);
    }
  };

  const handleLabelChange = (newLabel: string) => {
    if (onUpdate) {
      onUpdate(supplier.id, { label: newLabel });
    }
    setEditingLabel(false);
  };

  const handleEditSupplier = (supplierData: any) => {
    if (onUpdate) {
      onUpdate(supplier.id, supplierData);
    }
    setShowEditSupplierModal(false);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex">
        {/* Backdrop */}
        <div 
          className="flex-1 bg-black bg-opacity-50" 
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className={`bg-white shadow-xl flex flex-col transition-all duration-300 ${
          isExpanded ? 'w-full' : 'w-[80%]'
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {supplier.name}
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isExpanded ? <Minimize className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Section (60%) */}
            <div className="w-[35%] border-r border-gray-200 flex flex-col rounded-tl-lg">
              {/* Supplier Info */}
              <div className="p-6 border-b border-gray-100">
                <div className="space-y-4">
                  {/* Logo and Name */}
                  <div>
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <Building className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div 
                          className="group"
                          onMouseEnter={() => setHoveredSupplierName(true)}
                          onMouseLeave={() => setHoveredSupplierName(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <h2 className="text-lg font-semibold text-gray-900 truncate">{supplier.name}</h2>
                            {hoveredSupplierName && (
                              <button
                                onClick={() => setShowEditSupplierModal(true)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                              >
                                <Edit className="w-4 h-4 text-gray-400" />
                              </button>
                            )}
                          </div>
                        </div>
                        
                        {/* Location */}
                        <div className="flex items-center space-x-2 mt-1">
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-600">{supplier.location}</span>
                        </div>
                        
                        {/* Labels and Tags */}
                        <div className="flex items-center space-x-2 flex-wrap mt-2">
                          {supplier.label && (
                            <div className="relative">
                              {editingLabel ? (
                                <select
                                  value={supplier.label}
                                  onChange={(e) => handleLabelChange(e.target.value)}
                                  onBlur={() => setEditingLabel(false)}
                                  className="text-xs font-medium border border-gray-300 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                  autoFocus
                                >
                                  <option value="Approved">Approved</option>
                                  <option value="On-credit">On-credit</option>
                                  <option value="New Prospect">New Prospect</option>
                                </select>
                              ) : (
                                <button
                                  onClick={() => setEditingLabel(true)}
                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border hover:bg-gray-50 transition-colors ${getLabelColor(supplier.label)}`}
                                >
                                  {supplier.label}
                                </button>
                              )}
                            </div>
                          )}
                          {supplier.tags?.map((tag: string, index: number) => (
                            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* View Storefront */}
                  <button 
                    onClick={() => console.log('View storefront')}
                    className="flex items-center space-x-2 text-gray-900 hover:text-gray-700 text-sm font-medium underline"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Storefront</span>
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-6 border-b border-gray-100">
                <div className="grid grid-cols-4 gap-2">
                  <button className="flex flex-col items-center justify-center p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <MessageSquare className="w-5 h-5 text-gray-600 mb-1" />
                    <span className="mt-1">Message</span>
                  </button>
                  <button 
                    onClick={() => setShowEventModal(true)}
                    className="flex flex-col items-center justify-center p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <CalendarPlus className="w-5 h-5 text-gray-600 mb-1" />
                    <span className="mt-1">Set Meeting</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Target className="w-5 h-5 text-gray-600 mb-1" />
                    <span className="mt-1">Ask Quote</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <FileCheck className="w-5 h-5 text-gray-600 mb-1" />
                    <span className="mt-1">Send KYC</span>
                  </button>
                </div>
              </div>

              {/* Contacts */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900">Contacts</h4>
                  <button 
                    onClick={() => setShowAddContactModal(true)}
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Contact</span>
                  </button>
                </div>
                {contacts.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-sm text-gray-500 mb-3">No contacts added yet</p>
                    <button 
                      onClick={() => setShowAddContactModal(true)}
                      className="text-sm font-medium text-gray-900 hover:text-gray-700 underline"
                    >
                      Add your first contact
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <button 
                          onClick={() => openContactModal(contact)}
                          className="text-left w-full"
                        >
                          <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          <div className="text-xs text-gray-600">{contact.position}</div>
                          <div className="text-xs text-gray-500">{contact.email}</div>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupplierDetailModal;