import React, { useState } from 'react';
import { X, Calendar, User, Flag, Paperclip, Plus, ChevronDown, Check, Trash2, Expand, Minimize, MessageSquare, Activity, Upload, ArrowLeft, ArrowRight, Building, Target, Search } from 'lucide-react';

interface ValidationErrors {
  title?: string;
  category?: string;
  dueDate?: string;
  singleItemDescription?: string;
  singleItemQuantity?: string;
  multipleItems?: string;
  serviceDescription?: string;
  projectScope?: string;
  purchaseType?: string;
  paymentTerms?: string;
  deliveryDate?: string;
  deliveryLocation?: string;
  newLocationName?: string;
  newLocationCountry?: string;
  newLocationState?: string;
  newLocationCity?: string;
  newLocationStreet?: string;
  selectedVendors?: string;
}

interface RFQ {
  id?: number;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  rfqType: string;
  content: any;
  messageToSupplier: string;
  attachments: string[];
  purchaseType: string;
  paymentTerms: string;
  paymentMethod: string;
  deliveryDate: string;
  deliveryLocation: string;
  vendorOnboardingNeeded: boolean;
  selectedVendors: number[];
  invitedVendors: any[];
}

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
}

interface CreateRFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rfqData: any, isDraft: boolean) => void;
  rfq?: RFQ | null;
}

const CreateRFQModal: React.FC<CreateRFQModalProps> = ({ isOpen, onClose, onSave, rfq }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [currentStage, setCurrentStage] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  
  // Stage 1 - RFQ Details
  const [title, setTitle] = useState(rfq?.title || '');
  const [category, setCategory] = useState(rfq?.category || '');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(rfq?.priority || 'medium');
  const [dueDate, setDueDate] = useState(rfq?.dueDate || '');
  const [rfqType, setRfqType] = useState('single-item');
  const [singleItem, setSingleItem] = useState({ description: '', quantity: '', unit: 'pcs' });
  const [multipleItemsMode, setMultipleItemsMode] = useState<'template' | 'manual' | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [multipleItems, setMultipleItems] = useState([
    { id: 1, description: '', quantity: '', unit: 'pcs' }
  ]);
  const [serviceDescription, setServiceDescription] = useState('');
  const [projectScope, setProjectScope] = useState('');
  const [messageToSupplier, setMessageToSupplier] = useState('');
  const [attachments, setAttachments] = useState<{ name: string; file?: File }[]>([]);
  const [newAttachmentName, setNewAttachmentName] = useState('');
  
  // Stage 2 - Terms
  const [purchaseType, setPurchaseType] = useState('one-time');
  const [recurringType, setRecurringType] = useState('monthly');
  const [showRecurringModal, setShowRecurringModal] = useState(false);
  const [paymentTerms, setPaymentTerms] = useState('net-30');
  const [paymentMethod, setPaymentMethod] = useState('bank-transfer');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('main-office');
  const [customLocation, setCustomLocation] = useState('');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [vendorOnboardingNeeded, setVendorOnboardingNeeded] = useState(false);
  const [selectedOnboardingTemplate, setSelectedOnboardingTemplate] = useState('');
  const [showOnboardingTemplates, setShowOnboardingTemplates] = useState(false);
  
  // Stage 3 - Vendors
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newVendor, setNewVendor] = useState({ name: '', email: '' });
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [invitedVendors, setInvitedVendors] = useState<any[]>([]);
  const [selectedQuotes, setSelectedQuotes] = useState<number[]>([]);
  const [mySupplierSearchTerm, setMySupplierSearchTerm] = useState('');
  const [showMySupplierSearchResults, setShowMySupplierSearchResults] = useState(false);

  // Location modal state
  const [newLocationData, setNewLocationData] = useState({
    name: '',
    country: '',
    state: '',
    city: '',
    street: '',
    additionalInfo: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const categories = [
    'Office Supplies', 'IT Equipment', 'Industrial Parts', 'Logistics', 'Construction Materials',
    'Food & Beverage', 'Healthcare Supplies', 'Automotive Parts', 'Electronics', 'Textiles'
  ];

  const units = ['pcs', 'kg', 'lbs', 'meters', 'feet', 'liters', 'gallons', 'boxes', 'sets', 'hours'];
  
  const paymentTermsOptions = [
    { value: 'net-15', label: 'Net 15' },
    { value: 'net-30', label: 'Net 30' },
    { value: 'net-45', label: 'Net 45' },
    { value: 'net-60', label: 'Net 60' },
    { value: 'due-on-receipt', label: 'Due on Receipt' },
    { value: '2-10-net-30', label: '2/10 Net 30' }
  ];

  const deliveryLocations = [
    { id: 'main-office', name: 'Main Office - 123 Business St, City' },
    { id: 'warehouse', name: 'Warehouse - 456 Storage Ave, City' },
    { id: 'branch-office', name: 'Branch Office - 789 Branch Rd, City' }
  ];

  const rfqTemplates = [
    { id: 'office-supplies', name: 'Office Supplies Template' },
    { id: 'it-equipment', name: 'IT Equipment Template' },
    { id: 'industrial-parts', name: 'Industrial Parts Template' }
  ];

  const onboardingTemplates = [
    { id: 'standard-kyc', name: 'Standard KYC Template' },
    { id: 'financial-verification', name: 'Financial Verification Template' },
    { id: 'compliance-checklist', name: 'Compliance Checklist Template' }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Japan', 'Australia', 'India', 'China', 'Brazil', 'Mexico', 'Italy'
  ];

  const statesByCountry: { [key: string]: string[] } = {
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Germany': ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony', 'Hesse', 'Saxony'],
    'France': ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie', 'Hauts-de-France'],
    'Japan': ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Saitama', 'Chiba', 'Hyogo', 'Hokkaido'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'],
    'India': ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh'],
    'China': ['Beijing', 'Shanghai', 'Guangdong', 'Jiangsu', 'Zhejiang', 'Shandong', 'Henan'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná', 'Rio Grande do Sul'],
    'Mexico': ['Mexico City', 'Jalisco', 'Nuevo León', 'Puebla', 'Guanajuato', 'Chihuahua'],
    'Italy': ['Lombardy', 'Lazio', 'Campania', 'Sicily', 'Veneto', 'Emilia-Romagna', 'Piedmont']
  };

  const mySuppliers = [
    { id: 101, name: 'Alpha Industries', category: 'Industrial Parts', location: 'Detroit, MI' },
    { id: 102, name: 'Beta Office Solutions', category: 'Office Supplies', location: 'Chicago, IL' },
    { id: 103, name: 'Gamma Tech Corp', category: 'IT Equipment', location: 'Austin, TX' },
    { id: 104, name: 'Delta Logistics', category: 'Logistics', location: 'Atlanta, GA' },
    { id: 105, name: 'Epsilon Materials', category: 'Construction Materials', location: 'Denver, CO' },
    { id: 106, name: 'Zeta Healthcare', category: 'Healthcare Supplies', location: 'Boston, MA' },
    { id: 107, name: 'Eta Electronics', category: 'Electronics', location: 'San Jose, CA' },
    { id: 108, name: 'Theta Automotive', category: 'Automotive Parts', location: 'Detroit, MI' },
    { id: 109, name: 'Iota Textiles', category: 'Textiles', location: 'Charlotte, NC' },
    { id: 110, name: 'Kappa Food Services', category: 'Food & Beverage', location: 'Portland, OR' }
  ];

  const recommendedVendors = [
    { 
      id: 1, 
      name: 'Acme Corporation', 
      location: 'California, US', 
      type: 'Office Supplies',
      label: 'Approved',
      tags: ['Reliable', 'Fast Delivery']
    },
    { 
      id: 2, 
      name: 'TechPro Solutions', 
      location: 'New York, US', 
      type: 'IT Equipment',
      label: 'On-credit',
      tags: ['Quality', 'Support']
    },
    { 
      id: 3, 
      name: 'Global Supplies Inc', 
      location: 'Texas, US', 
      type: 'Industrial Parts',
      label: 'New Prospect',
      tags: ['Competitive', 'Bulk Orders']
    },
    { 
      id: 4, 
      name: 'Office Pro Ltd', 
      location: 'Florida, US', 
      type: 'Office Supplies',
      label: 'Approved',
      tags: ['Premium', 'Quick Response']
    },
    { 
      id: 5, 
      name: 'Industrial Partners', 
      location: 'Illinois, US', 
      type: 'Industrial Parts',
      label: 'On-credit',
      tags: ['Bulk Specialist', 'Custom Solutions']
    }
  ];

  const mockInvitedVendors = [
    { 
      id: 1, 
      name: 'Acme Corporation', 
      location: 'California, US', 
      type: 'Office Supplies', 
      status: 'Quote Submitted',
      totalValue: 15000,
      currency: 'USD',
      submittedAt: '2024-03-20'
    },
    { 
      id: 2, 
      name: 'TechPro Solutions', 
      location: 'New York, US', 
      type: 'IT Equipment', 
      status: 'Invited',
      totalValue: null,
      currency: null,
      submittedAt: null
    }
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) newErrors.title = 'RFQ title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (!formData.content.trim()) newErrors.content = 'RFQ content is required';
    
    // Validate items
    items.forEach((item, index) => {
      if (!item.name.trim()) newErrors[`item_${index}_name`] = `Item ${index + 1} name is required`;
      if (!item.quantity.trim()) newErrors[`item_${index}_quantity`] = `Item ${index + 1} quantity is required`;
      if (!item.unit.trim()) newErrors[`item_${index}_unit`] = `Item ${index + 1} unit is required`;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!isOpen) return null;

  const validateStage = (stage: number): boolean => {
    const errors: ValidationErrors = {};
    let isValid = true;

    if (stage === 1) {
      // Stage 1 validation
      if (!title.trim()) {
        errors.title = 'Title is required';
        isValid = false;
      }
      if (!category) {
        errors.category = 'Category is required';
        isValid = false;
      }
      if (!dueDate) {
        errors.dueDate = 'Due date is required';
        isValid = false;
      }

      // RFQ Type specific validation
      if (rfqType === 'single-item') {
        if (!singleItem.description.trim()) {
          errors.singleItemDescription = 'Item description is required';
          isValid = false;
        }
        if (!singleItem.quantity.trim()) {
          errors.singleItemQuantity = 'Quantity is required';
          isValid = false;
        }
      } else if (rfqType === 'multiple-items') {
        const hasValidItem = multipleItems.some(item => 
          item.description.trim() && item.quantity.trim()
        );
        if (!hasValidItem) {
          errors.multipleItems = 'At least one item with description and quantity is required';
          isValid = false;
        }
      } else if (rfqType === 'services') {
        if (!serviceDescription.trim()) {
          errors.serviceDescription = 'Service description is required';
          isValid = false;
        }
      } else if (rfqType === 'project') {
        if (!projectScope.trim()) {
          errors.projectScope = 'Project scope is required';
          isValid = false;
        }
      }
    }

    if (stage === 2) {
      // Stage 2 validation
      if (!purchaseType) {
        errors.purchaseType = 'Purchase type is required';
        isValid = false;
      }
      if (!paymentTerms) {
        errors.paymentTerms = 'Payment terms are required';
        isValid = false;
      }
      if (!deliveryDate) {
        errors.deliveryDate = 'Delivery date is required';
        isValid = false;
      }
      if (!deliveryLocation) {
        errors.deliveryLocation = 'Delivery location is required';
        isValid = false;
      }

      // If custom location is being added, validate new location fields
      if (showLocationModal) {
        if (!newLocationData.name.trim()) {
          errors.newLocationName = 'Location name is required';
          isValid = false;
        }
        if (!newLocationData.country) {
          errors.newLocationCountry = 'Country is required';
          isValid = false;
        }
        if (!newLocationData.state) {
          errors.newLocationState = 'State is required';
          isValid = false;
        }
        if (!newLocationData.city.trim()) {
          errors.newLocationCity = 'City is required';
          isValid = false;
        }
        if (!newLocationData.street.trim()) {
          errors.newLocationStreet = 'Street address is required';
          isValid = false;
        }
      }
    }

    if (stage === 3) {
      // Stage 3 validation (only for final save, not for draft)
      if (selectedVendors.length === 0) {
        errors.selectedVendors = 'At least one vendor must be selected';
        isValid = false;
      }
    }

    setValidationErrors(errors);
    return isValid;
  };

  const filteredMySuppliers = mySuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(mySupplierSearchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(mySupplierSearchTerm.toLowerCase())
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && newAttachmentName.trim()) {
      const newAttachments = Array.from(files).map(file => ({
        name: newAttachmentName.trim(),
        file
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
      setNewAttachmentName('');
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const addMultipleItem = () => {
    setMultipleItems(prev => [...prev, {
      id: Date.now(),
      description: '',
      quantity: '',
      unit: 'pcs'
    }]);
  };

  const removeMultipleItem = (id: number) => {
    setMultipleItems(prev => prev.filter(item => item.id !== id));
  };

  const updateMultipleItem = (id: number, field: string, value: string) => {
    setMultipleItems(prev => prev.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const toggleVendorSelection = (vendorId: number) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleAddVendor = () => {
    if (newVendor.name && newVendor.email) {
      const vendor = {
        id: Date.now(),
        name: newVendor.name,
        location: 'Manual Entry',
        type: 'Custom'
      };
      setSelectedVendors(prev => [...prev, vendor.id]);
      setNewVendor({ name: '', email: '' });
      setShowAddVendorModal(false);
    }
  };

  const handleAddLocation = () => {
    if (newLocationData.name && newLocationData.country && newLocationData.state) {
      // Add the new location to the delivery locations list
      const newLocation = {
        id: `custom-${Date.now()}`,
        name: `${newLocationData.name} - ${newLocationData.street}, ${newLocationData.city}, ${newLocationData.state}, ${newLocationData.country}`
      };
      
      // Reset form and close modal
      setNewLocationData({
        name: '',
        country: '',
        state: '',
        city: '',
        street: '',
        additionalInfo: ''
      });
      setShowLocationModal(false);
      setDeliveryLocation(newLocation.id);
    }
  };

  const handleNext = () => {
    if (!validateStage(currentStage)) {
      return;
    }

    if (currentStage === 1) {
      setCurrentStage(2);
      setActiveTab('terms');
    } else if (currentStage === 2) {
      setCurrentStage(3);
      setActiveTab('vendors');
      setInvitedVendors(mockInvitedVendors);
    }
  };

  const handleBack = () => {
    if (currentStage === 2) {
      setCurrentStage(1);
      setActiveTab('properties');
    } else if (currentStage === 3) {
      setCurrentStage(2);
      setActiveTab('terms');
    }
  };

  const handleSaveDraft = () => {
    // Validate only completed stages for draft
    let isValid = true;
    for (let stage = 1; stage <= currentStage; stage++) {
      if (stage === 3) continue; // Skip vendor validation for draft
      if (!validateStage(stage)) {
        isValid = false;
        break;
      }
    }
    
    if (!isValid) {
      return;
    }

    const rfqData = {
      title,
      category,
      priority,
      dueDate,
      type: rfqType,
      content: getRFQContent(),
      messageToSupplier,
      attachments: attachments.map(a => a.name),
      purchaseType,
      paymentTerms,
      paymentMethod,
      deliveryDate,
      deliveryLocation,
      vendorOnboardingNeeded,
      selectedVendors: currentStage >= 3 ? selectedVendors : [],
      invitedVendors: currentStage >= 3 ? invitedVendors : []
    };
    onSave(rfqData, true);
  };

  const handleFinalSave = () => {
    // Validate all stages for final save
    let isValid = true;
    for (let stage = 1; stage <= 3; stage++) {
      if (!validateStage(stage)) {
        isValid = false;
      }
    }
    
    if (!isValid) {
      return;
    }

    const rfqData = {
      title,
      category,
      priority,
      dueDate,
      type: rfqType,
      content: getRFQContent(),
      messageToSupplier,
      attachments: attachments.map(a => a.name),
      purchaseType,
      paymentTerms,
      paymentMethod,
      deliveryDate,
      deliveryLocation,
      vendorOnboardingNeeded,
      selectedVendors,
      invitedVendors
    };
    
    // Show success message
    const vendorCount = selectedVendors.length;
    setSuccessMessage(`RFQ invitation sent successfully to ${vendorCount} vendor${vendorCount > 1 ? 's' : ''}!`);
    setShowSuccessMessage(true);
    
    setTimeout(() => {
      setShowSuccessMessage(false);
      onSave(rfqData, false);
      onClose();
    }, 2000);
  };

  const getRFQContent = () => {
    switch (rfqType) {
      case 'single-item':
        return singleItem;
      case 'multiple-items':
        return multipleItems;
      case 'services':
        return serviceDescription;
      case 'project':
        return projectScope;
      default:
        return '';
    }
  };

  const toggleQuoteSelection = (vendorId: number) => {
    setSelectedQuotes(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Quote Submitted':
        return 'bg-green-100 text-green-800';
      case 'Invited':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getLabelColor = (label: string) => {
    switch (label?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'on-credit':
        return 'bg-blue-100 text-blue-800';
      case 'new prospect':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateForInput = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toISOString().split('T')[0];
    } catch {
      return '';
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      setDeliveryDate(selectedDate);
    }
  };

  const handleSendInvitations = () => {
    handleFinalSave();
  };

  const handleAddSupplierFromSearch = (supplier: any) => {
    if (!selectedVendors.includes(supplier.id)) {
      setSelectedVendors(prev => [...prev, supplier.id]);
    }
    setMySupplierSearchTerm('');
    setShowMySupplierSearchResults(false);
  };

  const handleAddAllFilteredSuppliers = () => {
    const newSupplierIds = filteredMySuppliers
      .filter(supplier => !selectedVendors.includes(supplier.id))
      .map(supplier => supplier.id);
    
    setSelectedVendors(prev => [...prev, ...newSupplierIds]);
    setMySupplierSearchTerm('');
    setShowMySupplierSearchResults(false);
  };

  const getSelectedSupplierNames = () => {
    const allSuppliers = [...mySuppliers, ...recommendedVendors];
    return selectedVendors
      .map(id => allSuppliers.find(s => s.id === id))
      .filter(Boolean)
      .map(s => s.name);
  };

  const tabs = [
    { id: 'properties', label: 'Create Quote', icon: Flag },
    { id: 'terms', label: 'Set Terms', icon: MessageSquare },
    { id: 'vendors', label: 'Invite Vendors', icon: Activity }
  ];

  const rfqTypes = [
    { id: 'single-item', label: 'Single Item' },
    { id: 'multiple-items', label: 'Multiple Items' },
    { id: 'services', label: 'Services' },
    { id: 'project', label: 'Project' }
  ];

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-60">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Backdrop */}
      <div 
        className="flex-1 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal - 40% width */}
      <div className={`bg-white shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-full' : 'w-[50%]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-blue-500 cursor-pointer transition-colors" />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="RFQ title"
              className="text-lg font-semibold text-gray-900 bg-transparent border-none outline-none flex-1"
            />
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

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-semibold border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'properties' && (
            <div className="space-y-6">
              {/* Category, Priority, Due Date in one row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.category ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {validationErrors.category && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
                    className={`w-full px-3 py-2 rounded-lg font-medium border outline-none cursor-pointer ${getPriorityColor(priority)}`}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={formatDateForInput(dueDate)}
                    onChange={handleDateChange}
                    min={today}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                      validationErrors.dueDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {validationErrors.dueDate && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.dueDate}</p>
                  )}
                </div>
              </div>

              {validationErrors.title && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
              )}

              {/* RFQ Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">RFQ Type</label>
                <div className="flex space-x-4">
                  {rfqTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setRfqType(type.id)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        rfqType === type.id
                          ? 'bg-blue-50 border-blue-500 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* RFQ Type Content */}
              <div>
                {rfqType === 'single-item' && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Item Details</label>
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-6">
                        <input
                          type="text"
                          value={singleItem.description}
                          onChange={(e) => setSingleItem(prev => ({ ...prev, description: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            validationErrors.singleItemDescription ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Item description"
                        />
                        {validationErrors.singleItemDescription && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.singleItemDescription}</p>
                        )}
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          value={singleItem.quantity}
                          onChange={(e) => setSingleItem(prev => ({ ...prev, quantity: e.target.value }))}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            validationErrors.singleItemQuantity ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Quantity"
                        />
                        {validationErrors.singleItemQuantity && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.singleItemQuantity}</p>
                        )}
                      </div>
                      <div className="col-span-3">
                        <select
                          value={singleItem.unit}
                          onChange={(e) => setSingleItem(prev => ({ ...prev, unit: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {units.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {rfqType === 'multiple-items' && (
                  <div className="space-y-4">
                    {!multipleItemsMode && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Choose Method</label>
                        <div className="flex space-x-4">
                          <button
                            type="button"
                            onClick={() => setMultipleItemsMode('template')}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Use Template
                          </button>
                          <button
                            type="button"
                            onClick={() => setMultipleItemsMode('manual')}
                            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Add List Manual
                          </button>
                        </div>
                      </div>
                    )}

                    {multipleItemsMode === 'template' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Template</label>
                        <select
                          value={selectedTemplate}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Choose a template</option>
                          {rfqTemplates.map((template) => (
                            <option key={template.id} value={template.id}>{template.name}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {multipleItemsMode === 'manual' && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">Items List</label>
                          <button
                            onClick={addMultipleItem}
                            className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add Item</span>
                          </button>
                        </div>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <div className="grid grid-cols-12 gap-2 bg-gray-50 p-3 text-sm font-medium text-gray-700">
                            <div className="col-span-6">Description</div>
                            <div className="col-span-2">Quantity</div>
                            <div className="col-span-3">Unit</div>
                            <div className="col-span-1">Action</div>
                          </div>
                          {multipleItems.map((item) => (
                            <div key={item.id} className="grid grid-cols-12 gap-2 p-3 border-t border-gray-100">
                              <div className="col-span-6">
                                <input
                                  type="text"
                                  value={item.description}
                                  onChange={(e) => updateMultipleItem(item.id, 'description', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  placeholder="Item description"
                                />
                              </div>
                              <div className="col-span-2">
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateMultipleItem(item.id, 'quantity', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  placeholder="Qty"
                                />
                              </div>
                              <div className="col-span-3">
                                <select
                                  value={item.unit}
                                  onChange={(e) => updateMultipleItem(item.id, 'unit', e.target.value)}
                                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                >
                                  {units.map((unit) => (
                                    <option key={unit} value={unit}>{unit}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-span-1">
                                <button
                                  onClick={() => removeMultipleItem(item.id)}
                                  className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                        {validationErrors.multipleItems && (
                          <p className="text-red-500 text-xs mt-1">{validationErrors.multipleItems}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {rfqType === 'services' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                    <textarea
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        validationErrors.serviceDescription ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Describe the services required"
                    />
                    {validationErrors.serviceDescription && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.serviceDescription}</p>
                    )}
                  </div>
                )}

                {rfqType === 'project' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Scope</label>
                    <textarea
                      value={projectScope}
                      onChange={(e) => setProjectScope(e.target.value)}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                        validationErrors.projectScope ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Define the project scope and requirements"
                    />
                    {validationErrors.projectScope && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.projectScope}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Message to Supplier */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message to Supplier</label>
                <textarea
                  value={messageToSupplier}
                  onChange={(e) => setMessageToSupplier(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Add any additional message for suppliers"
                />
              </div>

              {/* Document Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Attachments</label>
                <div className="space-y-3">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="text-sm text-gray-700">{attachment.name}</span>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex space-x-3">
                    <input
                      type="text"
                      value={newAttachmentName}
                      onChange={(e) => setNewAttachmentName(e.target.value)}
                      placeholder="Document name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center space-x-2 cursor-pointer bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors border border-blue-200"
                    >
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-blue-600">Attach</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-6">
              {/* Purchase Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Type</label>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setPurchaseType('one-time')}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      purchaseType === 'one-time'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    One Time
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPurchaseType('recurring');
                      setShowRecurringModal(true);
                    }}
                    className={`px-4 py-2 rounded-lg border transition-colors ${
                      purchaseType === 'recurring'
                        ? 'bg-blue-50 border-blue-500 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Recurring
                  </button>
                </div>
                {purchaseType === 'recurring' && (
                  <div className="mt-2 text-sm text-gray-600">
                    Selected: {recurringType}
                  </div>
                )}
              </div>

              {/* Payment Terms and Delivery Date in same row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
                  <select
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.paymentTerms ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    {paymentTermsOptions.map((term) => (
                      <option key={term.value} value={term.value}>{term.label}</option>
                    ))}
                  </select>
                  {validationErrors.paymentTerms && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.paymentTerms}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Date</label>
                  <input
                    type="date"
                    value={formatDateForInput(deliveryDate)}
                    onChange={handleDeliveryDateChange}
                    min={today}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                      validationErrors.deliveryDate ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {validationErrors.deliveryDate && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.deliveryDate}</p>
                  )}
                </div>
              </div>

              {/* Payment Method (for Project type) */}
              {rfqType === 'project' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="check">Check</option>
                    <option value="milestone-based">Milestone Based</option>
                  </select>
                </div>
              )}

              {/* Delivery Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Location</label>
                <div className="flex space-x-3">
                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className={`flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.deliveryLocation ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    {deliveryLocations.map((location) => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowLocationModal(true)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Location</span>
                  </button>
                </div>
                {validationErrors.deliveryLocation && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.deliveryLocation}</p>
                )}
              </div>

              {/* Vendor Onboarding Toggle */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Vendor Onboarding Required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={vendorOnboardingNeeded}
                      onChange={(e) => {
                        setVendorOnboardingNeeded(e.target.checked);
                        if (e.target.checked) {
                          setShowOnboardingTemplates(true);
                        }
                      }}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Required</span>
                  </label>
                </div>
              </div>
              {vendorOnboardingNeeded && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Onboarding Template</label>
                  <select
                    value={selectedOnboardingTemplate}
                    onChange={(e) => setSelectedOnboardingTemplate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a template</option>
                    {onboardingTemplates.map((template) => (
                      <option key={template.id} value={template.id}>{template.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {activeTab === 'vendors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Invite Vendors</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      // Open supplier list modal
                      console.log('Opening supplier list modal');
                    }}
                    className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-900 transition-colors"
                  >
                    <Building className="w-4 h-4" />
                    <span>Select from My Supplier List</span>
                  </button>
                  <button 
                    onClick={() => {
                      // Open add supplier modal
                      const event = new CustomEvent('openAddSupplierModal');
                      window.dispatchEvent(event);
                    }}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Manual Supplier</span>
                  </button>
                </div>
              </div>

              {/* Supplier Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Search My Suppliers</label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={mySupplierSearchTerm}
                      onChange={(e) => {
                        setMySupplierSearchTerm(e.target.value);
                        setShowMySupplierSearchResults(e.target.value.length > 0);
                      }}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Search suppliers by name or category..."
                    />
                    
                    {/* Search Results Dropdown */}
                    {showMySupplierSearchResults && filteredMySuppliers.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                        {filteredMySuppliers.map((supplier) => (
                          <button
                            key={supplier.id}
                            onClick={() => handleAddSupplierFromSearch(supplier)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            disabled={selectedVendors.includes(supplier.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium text-gray-900">{supplier.name}</p>
                                <p className="text-sm text-gray-600">{supplier.category}</p>
                                <p className="text-sm text-gray-500">{supplier.location}</p>
                              </div>
                              {selectedVendors.includes(supplier.id) && (
                                <Check className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleAddAllFilteredSuppliers}
                    disabled={filteredMySuppliers.length === 0 || mySupplierSearchTerm.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Suppliers
                  </button>
                </div>
              </div>

              {/* Selected Vendors Display */}
              {selectedVendors.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Selected Suppliers ({selectedVendors.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {getSelectedSupplierNames().map((name, index) => (
                      <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                        {name}
                        <button
                          onClick={() => {
                            const supplierId = [...mySuppliers, ...recommendedVendors].find(s => s.name === name)?.id;
                            if (supplierId) {
                              setSelectedVendors(prev => prev.filter(id => id !== supplierId));
                            }
                          }}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {validationErrors.selectedVendors && (
                <p className="text-red-500 text-xs">{validationErrors.selectedVendors}</p>
              )}
              
              <div className="mt-6">
                <h4 className="text-base font-semibold text-gray-900 mb-4">Supplier Recommendations</h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {(showMoreRecommended ? recommendedVendors : recommendedVendors.slice(0, 3)).map((vendor) => (
                      <div key={vendor.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <input
                            type="checkbox"
                            checked={selectedVendors.includes(vendor.id)}
                            onChange={() => toggleVendorSelection(vendor.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <div>
                            <h5 className="font-medium text-gray-900">{vendor.name}</h5>
                            <p className="text-sm text-gray-600">{vendor.location}</p>
                            <p className="text-sm text-gray-500">{vendor.type}</p>
                            <div className="flex items-center space-x-1 mt-1">
                              {vendor.tags.map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-wrap gap-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${getLabelColor(vendor.label)}`}>
                              {vendor.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {recommendedVendors.length > 3 && (
                    <div className="text-center">
                      <button
                        onClick={() => setShowMoreRecommended(!showMoreRecommended)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        {showMoreRecommended ? 'View Less' : 'View More'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Purchasync Marketplace */}
                <div>
                  <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    <Target className="w-4 h-4" />
                    <span>Search Purchasync Marketplace</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Only show for Properties and Terms tabs */}
        {(activeTab === 'properties' || activeTab === 'terms') && (
          <div className="border-t border-gray-200 p-4 flex items-center justify-end space-x-3">
            <button
              onClick={handleSaveDraft}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save as Draft
            </button>
            
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            {activeTab === 'properties' && (
              <button 
                onClick={() => setActiveTab('terms')}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
              >
                Save & Next
              </button>
            )}
            
            {activeTab === 'terms' && (
              <>
                <button 
                  onClick={() => setActiveTab('properties')}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button 
                  onClick={() => setActiveTab('vendors')}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                >
                  Save & Next
                </button>
              </>
            )}
          </div>
        )}

        {/* Send RFQ Button for Vendors tab */}
        {activeTab === 'vendors' && (
          <div className="border-t border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSaveDraft}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
              <button 
                onClick={() => setActiveTab('terms')}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
            <button 
              onClick={handleSendInvitations}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Send RFQ Invite
            </button>
          </div>
        )}
      </div>

      {/* Recurring Modal */}
      {showRecurringModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Recurring Type</h3>
              <button
                onClick={() => setShowRecurringModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {['weekly', 'monthly', 'quarterly', 'yearly'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setRecurringType(type);
                    setShowRecurringModal(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 ${
                    recurringType === type ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Location</h3>
              <button
                onClick={() => setShowLocationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location Name</label>
                <input
                  type="text"
                  value={newLocationData.name}
                  onChange={(e) => setNewLocationData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.newLocationName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Warehouse 2"
                />
                {validationErrors.newLocationName && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.newLocationName}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    value={newLocationData.country}
                    onChange={(e) => setNewLocationData(prev => ({ ...prev, country: e.target.value, state: '' }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.newLocationCountry ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {validationErrors.newLocationCountry && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.newLocationCountry}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <select
                    value={newLocationData.state}
                    onChange={(e) => setNewLocationData(prev => ({ ...prev, state: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      validationErrors.newLocationState ? 'border-red-300' : 'border-gray-300'
                    }`}
                    disabled={!newLocationData.country}
                  >
                    <option value="">Select State</option>
                    {newLocationData.country && statesByCountry[newLocationData.country]?.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {validationErrors.newLocationState && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.newLocationState}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  value={newLocationData.city}
                  onChange={(e) => setNewLocationData(prev => ({ ...prev, city: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.newLocationCity ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter city"
                />
                {validationErrors.newLocationCity && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.newLocationCity}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                <input
                  type="text"
                  value={newLocationData.street}
                  onChange={(e) => setNewLocationData(prev => ({ ...prev, street: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    validationErrors.newLocationStreet ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter street address"
                />
                {validationErrors.newLocationStreet && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.newLocationStreet}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Info</label>
                <textarea
                  value={newLocationData.additionalInfo}
                  onChange={(e) => setNewLocationData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={2}
                  placeholder="Additional location details"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowLocationModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddLocation}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Add Location
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Vendor Modal */}
      {showAddVendorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Vendor Manually</h3>
              <button
                onClick={() => setShowAddVendorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
                <input
                  type="text"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter vendor name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddVendorModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVendor}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
              >
                Add Vendor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRFQModal;