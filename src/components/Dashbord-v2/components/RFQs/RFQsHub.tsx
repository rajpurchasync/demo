import React from 'react';
import { Plus, Search, Filter, FileText, Calendar, DollarSign, Target, MoreHorizontal, Check, X, Minus } from 'lucide-react';
import { useState } from 'react';
import CreateRFQModal from './CreateRFQModal';
import RFQDetailModal from './RFQDetailModal';

const RFQsHub = () => {
  const [activeTab, setActiveTab] = useState('on-process');
  const [selectedRFQs, setSelectedRFQs] = useState<number[]>([]);
  const [hoveredRFQ, setHoveredRFQ] = useState<number | null>(null);
  const [rfqActionMenuId, setRFQActionMenuId] = useState<number | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showCreateRFQModal, setShowCreateRFQModal] = useState(false);
  const [selectedRFQ, setSelectedRFQ] = useState<any>(null);
  const [showRFQDetailModal, setShowRFQDetailModal] = useState(false);
  const [selectedRFQForDetail, setSelectedRFQForDetail] = useState<any>(null);

  const [rfqs, setRfqs] = useState([]);

  const tabs = [
    { id: 'on-process', label: 'On Process' },
    { id: 'under-approval', label: 'Under Approval' },
    { id: 'draft', label: 'Draft' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-process':
        return 'bg-blue-100 text-blue-800';
      case 'under-approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleSelectAll = () => {
    if (selectedRFQs.length === rfqs.length) {
      setSelectedRFQs([]);
    } else {
      setSelectedRFQs(rfqs.map(rfq => rfq.id));
    }
  };

  const toggleRFQSelection = (rfqId: number) => {
    setSelectedRFQs(prev => 
      prev.includes(rfqId) 
        ? prev.filter(id => id !== rfqId)
        : [...prev, rfqId]
    );
  };

  const handleCreateRFQ = (rfqData: any, isDraft: boolean) => {
    if (rfqData.id) {
      // Edit existing RFQ
      console.log('Updating existing RFQ:', rfqData);
      // Update existing RFQ logic here
    } else {
      // Create new RFQ
      const newRFQ = {
        id: Date.now(),
        title: rfqData.title,
        category: rfqData.category,
        priority: rfqData.priority || 'medium',
        dueDate: rfqData.dueDate,
        rfqType: rfqData.rfqType || rfqData.type,
        content: rfqData.content,
        messageToSupplier: rfqData.messageToSupplier,
        attachments: rfqData.attachments || [],
        purchaseType: rfqData.purchaseType,
        paymentTerms: rfqData.paymentTerms,
        paymentMethod: rfqData.paymentMethod,
        deliveryDate: rfqData.deliveryDate,
        deliveryLocation: rfqData.deliveryLocation,
        vendorOnboardingNeeded: rfqData.vendorOnboardingNeeded,
        status: isDraft ? 'draft' : 'on-process',
        vendorsInvited: rfqData.selectedSuppliers?.length || rfqData.selectedVendors?.length || 0,
        responses: 0,
        invitedVendors: rfqData.selectedSuppliers || rfqData.selectedVendors || []
      };
      
      // Add to rfqs array
      console.log('New RFQ created:', newRFQ);
      
      // Automatically create a task for the RFQ
      if (!isDraft) {
        const taskEvent = new CustomEvent('addEventTask', {
          detail: {
            title: `RFQ: ${rfqData.title}`,
            description: `Follow up on RFQ for ${rfqData.category}. Due date: ${rfqData.dueDate}`,
            taskType: 'RFQ Follow-up',
            dueDate: rfqData.dueDate,
            priority: 'medium',
            assignee: 'Self'
          }
        });
        window.dispatchEvent(taskEvent);
      }
    }
    setShowCreateRFQModal(false);
    setSelectedRFQ(null);
  };

  const handleViewRFQ = (rfq: any) => {
    setSelectedRFQForDetail(rfq);
    setShowRFQDetailModal(true);
  };

  const handleUpdateRFQ = (rfqId: number, updates: any) => {
    // Update RFQ in the list
    console.log('Updating RFQ:', rfqId, updates);
    // This would normally update the rfqs state
  };

  // Listen for the custom event from Quick Actions
  React.useEffect(() => {
    const handleOpenModal = () => {
      console.log('RFQsHub: Event received from Quick Actions - Opening Create RFQ Modal');
      setShowCreateRFQModal(true);
    };
    
    window.addEventListener('openCreateRFQModal', handleOpenModal);
    return () => window.removeEventListener('openCreateRFQModal', handleOpenModal);
  }, []);

  const filteredRFQs = rfqs.filter(rfq => rfq.status === activeTab);

  if (rfqs.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Quotations Requests and Management</h1>
            <p className="text-sm text-gray-600 mt-1">Request, manage and compare supplier quotations</p>
          </div>

          <button 
            onClick={() => setShowCreateRFQModal(true)}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Target className="w-4 h-4" />
            <span>Create RFQ</span>
          </button>
        </div>

        {/* Tabs */}
        <div>
          <div className="flex items-center justify-between px-4 md:px-6 py-2">
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
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search RFQs..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Filter Options
                    </div>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Status
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Due Date
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Category
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
            <p className="text-gray-500 mb-6 text-sm">Start by creating a new RFQ to request quotes from suppliers.</p>
            <button 
              onClick={() => setShowCreateRFQModal(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Create RFQ
            </button>
          </div>
        </div>
        
        <CreateRFQModal 
          isOpen={showCreateRFQModal}
          onClose={() => setShowCreateRFQModal(false)}
          onSave={handleCreateRFQ}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Quotations (RFQs)</h1>
          <p className="text-sm text-gray-600 mt-1">{rfqs.length} {rfqs.length === 1 ? 'RFQ' : 'RFQs'} available</p>
        </div>

        <button 
          onClick={() => setShowCreateRFQModal(true)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Target className="w-4 h-4" />
          <span>Create RFQ</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between px-4 md:px-6 py-2">
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
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search RFQs..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* RFQ List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedRFQs.length === filteredRFQs.length
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : selectedRFQs.length > 0
                          ? 'bg-blue-100 border-blue-600 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {selectedRFQs.length === filteredRFQs.length && <Check className="w-3 h-3" />}
                      {selectedRFQs.length > 0 && selectedRFQs.length < filteredRFQs.length && <Minus className="w-3 h-3" />}
                    </button>
                    <span>Title</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Vendors Invited</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRFQs.map((rfq) => (
                <tr 
                  key={rfq.id} 
                  className="hover:bg-gray-50 border-b border-gray-100"
                  onMouseEnter={() => setHoveredRFQ(rfq.id)}
                  onMouseLeave={() => setHoveredRFQ(null)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleRFQSelection(rfq.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedRFQs.includes(rfq.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : (hoveredRFQ === rfq.id || selectedRFQs.length > 0)
                            ? 'border-gray-300 hover:border-blue-600'
                            : 'border-transparent'
                        }`}
                        style={{
                          opacity: (hoveredRFQ === rfq.id || selectedRFQs.includes(rfq.id) || selectedRFQs.length > 0) ? 1 : 0
                        }}
                      >
                        {selectedRFQs.includes(rfq.id) && <Check className="w-3 h-3" />}
                      </button>
                      <button 
                        onClick={() => handleViewRFQ(rfq)}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        {rfq.title}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{rfq.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{new Date(rfq.dueDate).toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(rfq.status)}`}>
                      {rfq.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{rfq.vendorsInvited} ({rfq.responses} responses)</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setRFQActionMenuId(rfqActionMenuId === rfq.id ? null : rfq.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {rfqActionMenuId === rfq.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            View
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Edit
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Close
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Bottom Action Panel */}
      {selectedRFQs.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-4">
            <span className="text-sm font-medium">
              {selectedRFQs.length} record{selectedRFQs.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => setSelectedRFQs([])}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      <CreateRFQModal 
        isOpen={showCreateRFQModal}
        onClose={() => setShowCreateRFQModal(false)}
        onSave={handleCreateRFQ}
        rfq={selectedRFQ}
      />
      
      <RFQDetailModal 
        isOpen={showRFQDetailModal}
        onClose={() => setShowRFQDetailModal(false)}
        rfq={selectedRFQForDetail}
        onUpdate={handleUpdateRFQ}
      />
    </div>
  );
};

export default RFQsHub;