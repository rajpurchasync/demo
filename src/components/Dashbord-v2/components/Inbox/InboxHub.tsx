import React, { useState } from 'react';
import { Mail, Search, Archive, Trash2, Star, Clock, MessageCircle, ArrowRight, CheckCircle, Paperclip, Plus, Filter, MoreHorizontal, Check, X, Minus, Building } from 'lucide-react';

const InboxHub = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  const [hoveredRequest, setHoveredRequest] = useState<number | null>(null);
  const [requestActionMenuId, setRequestActionMenuId] = useState<number | null>(null);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const requests: any[] = [];

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'mail', label: 'Mail' },
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'assigned', label: 'Assigned' }
  ];

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'WhatsApp':
        return 'bg-green-100 text-green-800';
      case 'Email':
        return 'bg-blue-100 text-blue-800';
      case 'Assignment':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'converted':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleSelectAll = () => {
    if (selectedRequests.length === requests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(requests.map(request => request.id));
    }
  };

  const toggleRequestSelection = (requestId: number) => {
    setSelectedRequests(prev => 
      prev.includes(requestId) 
        ? prev.filter(id => id !== requestId)
        : [...prev, requestId]
    );
  };

  if (requests.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Requests</h1>
            <p className="text-sm font-medium text-gray-600 mt-1">Manage incoming procurement requests</p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              <Plus className="w-4 h-4" />
              <span>Create PR</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-gray-300">
              <span>Import</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div>
          <div className="flex items-center justify-between px-4 md:px-6 py-2">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
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
                  placeholder="Search requests..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
                />
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-100">
                      Filter Options
                    </div>
                    <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Status
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Priority
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Category
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                      Source
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
              <Mail className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
            <p className="text-gray-500 mb-6 text-sm font-medium">Start by creating a new request or import data from external sources.</p>
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
              Create Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Requests</h1>
          <p className="text-sm font-medium text-gray-600 mt-1">{requests.length} {requests.length === 1 ? 'request' : 'requests'} available</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create PR</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-colors border border-gray-300">
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center justify-between px-4 md:px-6 py-2">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-semibold border-b-2 transition-colors ${
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
                placeholder="Search requests..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-100">
                    Filter Options
                  </div>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Status
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Priority
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Category
                  </button>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Source
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Request List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedRequests.length === requests.length
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : selectedRequests.length > 0
                          ? 'bg-blue-100 border-blue-600 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {selectedRequests.length === requests.length && <Check className="w-3 h-3" />}
                      {selectedRequests.length > 0 && selectedRequests.length < requests.length && <Minus className="w-3 h-3" />}
                    </button>
                    <span>Title</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Source</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sender</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr 
                  key={request.id} 
                  className="hover:bg-gray-50 border-b border-gray-100"
                  onMouseEnter={() => setHoveredRequest(request.id)}
                  onMouseLeave={() => setHoveredRequest(null)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleRequestSelection(request.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedRequests.includes(request.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : (hoveredRequest === request.id || selectedRequests.length > 0)
                            ? 'border-gray-300 hover:border-blue-600'
                            : 'border-transparent'
                        }`}
                        style={{
                          opacity: (hoveredRequest === request.id || selectedRequests.includes(request.id) || selectedRequests.length > 0) ? 1 : 0
                        }}
                      >
                        {selectedRequests.includes(request.id) && <Check className="w-3 h-3" />}
                      </button>
                      <span className="text-sm font-semibold text-gray-900">{request.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getSourceColor(request.source)}`}>
                      {request.source}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">{request.sender}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">{new Date(request.date).toLocaleDateString()}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {request.status === 'pending' && (
                        <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-semibold transition-colors">
                          <ArrowRight className="w-3 h-3" />
                          <span>Convert</span>
                        </button>
                      )}
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setRequestActionMenuId(requestActionMenuId === request.id ? null : request.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {requestActionMenuId === request.id && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                            <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                              Convert
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                              Archive
                            </button>
                          </div>
                        )}
                      </div>
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
      {selectedRequests.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-4">
            <span className="text-sm font-semibold">
              {selectedRequests.length} record{selectedRequests.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={() => setSelectedRequests([])}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxHub;