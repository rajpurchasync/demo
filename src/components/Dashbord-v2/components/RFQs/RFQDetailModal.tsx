import React, { useState } from 'react';
import { 
  X, 
  Edit, 
  Send, 
  Plus, 
  Eye, 
  Bell, 
  BarChart3,
  Expand,
  Minimize,
  MapPin,
  Building,
  Tag,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Paperclip,
  MessageSquare,
  Activity
} from 'lucide-react';

interface RFQDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  rfq: any;
  onUpdate: (rfqId: number, updates: any) => void;
}

const RFQDetailModal: React.FC<RFQDetailModalProps> = ({ isOpen, onClose, rfq, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedVendors, setSelectedVendors] = useState<number[]>([]);
  const [selectedVendorForMessages, setSelectedVendorForMessages] = useState<any>(null);

  if (!isOpen || !rfq) return null;

  const tabs = [
    { id: 'details', label: 'RFQ Details' },
    { id: 'vendors', label: 'Vendors Invited' },
    { id: 'messages', label: 'Vendor Messages' }
  ];

  const handleWithdrawInvitations = () => {
    onUpdate(rfq.id, { status: 'draft', invitationsSent: false });
    setIsEditing(true);
  };

  const handleCloseRFQ = () => {
    onUpdate(rfq.id, { status: 'closed' });
  };

  const handleExtendRFQ = (newDate: string) => {
    onUpdate(rfq.id, { dueDate: newDate });
    setShowExtendModal(false);
  };

  const handleSendReminder = (vendorId: number) => {
    console.log('Sending reminder to vendor:', vendorId);
  };

  const handleViewQuote = (vendorId: number) => {
    console.log('Viewing quote from vendor:', vendorId);
  };

  const handlePrepareComparison = () => {
    setShowComparisonModal(true);
  };

  const toggleVendorSelection = (vendorId: number) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-process':
        return 'bg-blue-100 text-blue-800';
      case 'under-approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="flex-1 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`bg-white shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-full' : 'w-3/5'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-gray-900">{rfq.title}</h2>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rfq.status)}`}>
                  {rfq.status.replace('-', ' ')}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-600">Category: {rfq.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">Due: {new Date(rfq.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleWithdrawInvitations}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Withdraw
              </button>
              <button
                onClick={handleCloseRFQ}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => setShowExtendModal(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Extend
              </button>
            </div>
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
          <div className="flex items-center justify-between px-6">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {activeTab === 'vendors' && (
              <button
                onClick={handlePrepareComparison}
                className="bg-black hover:bg-gray-800 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
              >
                Prepare Comparison
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' && (
            <div className="space-y-4">
              {/* Basic Information - Compact Row */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <p className="text-sm text-gray-900">{rfq.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(rfq.priority)}`}>
                    {rfq.priority || 'Medium'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <p className="text-sm text-gray-900">{new Date(rfq.dueDate).toLocaleDateString()}</p>
                </div>
              </div>

              {/* Items - Compact Display */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
                {rfq.items && rfq.items.length === 1 ? (
                  <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">
                    {rfq.items[0].name} - Qty: {rfq.items[0].quantity} {rfq.items[0].unit}
                    {rfq.items[0].specifications && ` (${rfq.items[0].specifications})`}
                  </p>
                ) : rfq.items && rfq.items.length > 1 ? (
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-600 mb-2">{rfq.items.length} items - Click to view list</p>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {rfq.items.map((item: any, index: number) => (
                        <div key={index} className="text-sm text-gray-900">
                          • {item.name} - Qty: {item.quantity} {item.unit}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No items specified</p>
                )}
              </div>

              {/* Attachments - Compact */}
              {rfq.attachments && rfq.attachments.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
                  <div className="space-y-1">
                    {rfq.attachments.map((attachment: any, index: number) => (
                      <button
                        key={index}
                        className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded"
                      >
                        <Paperclip className="w-4 h-4" />
                        <span>{attachment.name}</span>
                        <span className="text-xs text-gray-500">({attachment.size})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Supplier Message */}
              {rfq.supplierMessage && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Message</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded">{rfq.supplierMessage}</p>
                </div>
              )}

              {/* Purchase Details - Compact Grid */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Purchase Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Purchase Type:</span>
                    <span className="ml-2 text-gray-900">{rfq.purchaseType || 'One-time'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Payment Terms:</span>
                    <span className="ml-2 text-gray-900">{rfq.paymentTerms || 'Net 30'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Delivery Date:</span>
                    <span className="ml-2 text-gray-900">{rfq.deliveryDate || 'TBD'}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Delivery Location:</span>
                    <span className="ml-2 text-gray-900">{rfq.deliveryLocation || 'TBD'}</span>
                  </div>
                </div>
              </div>

              {/* Onboarding Documents */}
              {rfq.onboardingDoc && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Onboarding Documents</label>
                  <button className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded">
                    <Paperclip className="w-4 h-4" />
                    <span>{rfq.onboardingDoc}</span>
                  </button>
                </div>
              )}

              {/* Terms - Compact List */}
              {rfq.terms && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Terms & Conditions</label>
                  <div className="bg-gray-50 p-3 rounded text-sm space-y-1">
                    {rfq.terms.map((term: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        <span className="text-gray-900">{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'vendors' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {rfq.invitedVendors?.map((vendor: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-sm font-medium text-gray-900">{vendor.name}</h4>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(vendor.label)}`}>
                            {vendor.label}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                          <span>{vendor.location}</span>
                          <span>{vendor.type}</span>
                        </div>
                        {vendor.tags && vendor.tags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            {vendor.tags.map((tag: string, tagIndex: number) => (
                              <span key={tagIndex} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        {vendor.quoteReceived ? (
                          <div className="mb-2">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium text-green-600">AED {vendor.quoteAmount?.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              {vendor.proposalType || 'Full'} Proposal
                            </div>
                            <button
                              onClick={() => handleViewQuote(vendor.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center space-x-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Quote</span>
                            </button>
                          </div>
                        ) : (
                          <div className="mb-2">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-500">Pending</span>
                            </div>
                            <button
                              onClick={() => handleSendReminder(vendor.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition-colors flex items-center space-x-1"
                            >
                              <Bell className="w-3 h-3" />
                              <span>Send Reminder</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add New Vendor */}
              <div className="border-t pt-4">
                <button
                  onClick={() => setShowAddVendorModal(true)}
                  className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Vendor</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-4">
              {/* All Vendor Messages Overview */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Recent Messages from All Vendors</h3>
                <div className="space-y-3">
                  <div 
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedVendorForMessages(rfq.invitedVendors?.[0])}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{rfq.invitedVendors?.[0]?.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{rfq.invitedVendors?.[0]?.name}</span>
                          <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-700">We have reviewed your RFQ and have a few questions about the delivery timeline...</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedVendorForMessages(rfq.invitedVendors?.[1])}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{rfq.invitedVendors?.[1]?.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">{rfq.invitedVendors?.[1]?.name}</span>
                          <span className="text-xs text-gray-500">5 hours ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Thank you for considering us. Our quote is ready for your review...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Vendor Selection */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Vendor</label>
                <select
                  value={selectedVendorForMessages?.id || ''}
                  onChange={(e) => {
                    const vendor = rfq.invitedVendors?.find((v: any) => v.id === parseInt(e.target.value));
                    setSelectedVendorForMessages(vendor);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose a vendor to view messages</option>
                  {rfq.invitedVendors?.map((vendor: any) => (
                    <option key={vendor.id} value={vendor.id}>{vendor.name}</option>
                  ))}
                </select>
              </div>

              {/* Messages for Selected Vendor */}
              {selectedVendorForMessages ? (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Messages with {selectedVendorForMessages.name}
                  </h3>
                  <div className="space-y-3">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">{selectedVendorForMessages.name.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">{selectedVendorForMessages.name}</span>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-700">We have reviewed your RFQ and have a few questions about the delivery timeline. Can we schedule a call to discuss?</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-white">You</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900">You</span>
                            <span className="text-xs text-gray-500">3 hours ago</span>
                          </div>
                          <p className="text-sm text-gray-700">Thank you for your interest. The delivery timeline is flexible within the specified range. Please submit your best quote.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a vendor to view messages</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Extend Modal */}
      {showExtendModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Extend RFQ Due Date</h3>
              <button
                onClick={() => setShowExtendModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Due Date</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowExtendModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleExtendRFQ('2024-04-15')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Extend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Suppliers for Comparison</h3>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {rfq.invitedVendors?.filter((vendor: any) => vendor.quoteReceived).map((vendor: any, index: number) => (
                <label key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedVendors.includes(vendor.id)}
                    onChange={() => toggleVendorSelection(vendor.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{vendor.name}</span>
                      <span className="text-sm font-medium text-green-600">AED {vendor.quoteAmount?.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500">{vendor.location} • {vendor.proposalType || 'Full'} Proposal</p>
                  </div>
                </label>
              ))}
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={selectedVendors.length < 2}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Selected ({selectedVendors.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFQDetailModal;