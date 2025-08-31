import React, { useState } from 'react';
import { 
  Target, 
  FileText, 
  Package, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  DollarSign,
  Building,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Globe
} from 'lucide-react';

interface LeadsProps {
  subSection?: string;
}

const Leads: React.FC<LeadsProps> = ({ subSection = 'rfq' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const rfqData = [
    {
      id: 1,
      title: 'Premium Bed Linens - 500 Sets',
      company: 'Hotel Paradise Resort',
      contact: 'Sarah Johnson',
      budget: '$25,000 - $35,000',
      deadline: '2024-02-15',
      status: 'active',
      priority: 'high',
      type: 'bulk_order',
      description: 'Looking for high-quality bed linens for new hotel wing',
      submittedDate: '2024-01-10'
    },
    {
      id: 2,
      title: 'Fresh Ingredients - Weekly Supply',
      company: 'Restaurant ABC Chain',
      contact: 'Mike Chen',
      budget: '$5,000 - $8,000',
      deadline: '2024-02-20',
      status: 'pending',
      priority: 'medium',
      type: 'recurring',
      description: 'Weekly supply of fresh vegetables and meat',
      submittedDate: '2024-01-12'
    },
    {
      id: 3,
      title: 'Luxury Amenities Package',
      company: 'Boutique Hotel Group',
      contact: 'Emma Wilson',
      budget: '$15,000 - $20,000',
      deadline: '2024-02-10',
      status: 'won',
      priority: 'high',
      type: 'one_time',
      description: 'Complete luxury amenities for 50 rooms',
      submittedDate: '2024-01-08'
    }
  ];

  const sampleData = [
    {
      id: 1,
      productName: 'Organic Coffee Beans - Premium Blend',
      company: 'Cafe Central',
      contact: 'David Rodriguez',
      requestDate: '2024-01-15',
      status: 'sent',
      quantity: '5kg sample',
      followUpDate: '2024-01-22',
      notes: 'Interested in bulk ordering if quality meets standards'
    },
    {
      id: 2,
      productName: 'Egyptian Cotton Towels',
      company: 'Hotel Paradise Resort',
      contact: 'Sarah Johnson',
      requestDate: '2024-01-12',
      status: 'pending',
      quantity: '10 pieces',
      followUpDate: '2024-01-19',
      notes: 'Evaluating for spa renovation project'
    },
    {
      id: 3,
      productName: 'Artisan Bread Selection',
      company: 'Restaurant ABC Chain',
      contact: 'Mike Chen',
      requestDate: '2024-01-10',
      status: 'approved',
      quantity: '20 pieces',
      followUpDate: '2024-01-17',
      notes: 'Approved for trial period, potential monthly order'
    }
  ];

  const enquiriesData = [
    {
      id: 1,
      title: 'Bulk Coffee Bean Inquiry',
      company: 'Coffee House Network',
      contact: 'Lisa Park',
      source: 'Online Store',
      message: 'Interested in your premium coffee bean selection for our 15 locations',
      receivedDate: '2024-01-16',
      status: 'new',
      priority: 'medium'
    },
    {
      id: 2,
      title: 'Hotel Linen Partnership',
      company: 'Luxury Hotels International',
      contact: 'Robert Kim',
      source: 'WhatsApp',
      message: 'Looking for a reliable supplier for our hotel chain expansion',
      receivedDate: '2024-01-14',
      status: 'responded',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Restaurant Equipment Inquiry',
      company: 'Fine Dining Group',
      contact: 'Maria Garcia',
      source: 'Direct Message',
      message: 'Need quotes for kitchen equipment for new restaurant opening',
      receivedDate: '2024-01-12',
      status: 'closed',
      priority: 'low'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'sent':
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'won':
      case 'approved':
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'lost':
      case 'closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source.toLowerCase()) {
      case 'online store':
        return <Globe className="w-4 h-4 text-blue-600" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'direct message':
        return <MessageSquare className="w-4 h-4 text-purple-600" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredRFQs = rfqData.filter(rfq => {
    const matchesSearch = rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rfq.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || rfq.status === statusFilter;
    const matchesType = typeFilter === 'all' || rfq.type === typeFilter;
    const matchesDateRange = (!fromDate || rfq.submittedDate >= fromDate) && 
                            (!toDate || rfq.submittedDate <= toDate);
    return matchesSearch && matchesStatus && matchesType && matchesDateRange;
  });

  const filteredSamples = sampleData.filter(sample => {
    const matchesSearch = sample.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sample.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sample.status === statusFilter;
    const matchesDateRange = (!fromDate || sample.requestDate >= fromDate) && 
                            (!toDate || sample.requestDate <= toDate);
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const filteredEnquiries = enquiriesData.filter(enquiry => {
    const matchesSearch = enquiry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || enquiry.status === statusFilter;
    const matchesDateRange = (!fromDate || enquiry.receivedDate >= fromDate) && 
                            (!toDate || enquiry.receivedDate <= toDate);
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const renderFilters = () => (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${subSection === 'rfq' ? 'RFQs' : subSection === 'sample' ? 'samples' : 'enquiries'}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="all">All Status</option>
          {subSection === 'rfq' ? (
            <>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="won">Won</option>
              <option value="lost">Lost</option>
            </>
          ) : subSection === 'sample' ? (
            <>
              <option value="pending">Pending</option>
              <option value="sent">Sent</option>
              <option value="approved">Approved</option>
            </>
          ) : (
            <>
              <option value="new">New</option>
              <option value="responded">Responded</option>
              <option value="closed">Closed</option>
            </>
          )}
        </select>
        
        {subSection === 'rfq' && (
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="all">All Types</option>
            <option value="bulk_order">Bulk Order</option>
            <option value="recurring">Recurring</option>
            <option value="one_time">One Time</option>
          </select>
        )}
        
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          placeholder="From Date"
        />
        
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          placeholder="To Date"
        />
      </div>
    </div>
  );

  const renderRFQContent = () => (
    <div className="space-y-4">
      {filteredRFQs.map((rfq) => (
        <div key={rfq.id} className={`bg-white rounded-lg border border-gray-200 p-4 sm:p-6 border-l-4 ${getPriorityColor(rfq.priority)}`}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{rfq.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rfq.status)}`}>
                {rfq.status.charAt(0).toUpperCase() + rfq.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building className="w-4 h-4" />
                <span>{rfq.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>{rfq.budget}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Deadline: {rfq.deadline}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Type: {rfq.type.replace('_', ' ')}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-700">{rfq.description}</p>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                Submit Quote
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSampleContent = () => (
    <div className="space-y-4">
      {filteredSamples.map((sample) => (
        <div key={sample.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{sample.productName}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(sample.status)}`}>
                {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building className="w-4 h-4" />
                <span>{sample.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>{sample.quantity}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Requested: {sample.requestDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Follow-up: {sample.followUpDate}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-700">{sample.notes}</p>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {sample.status === 'pending' && (
                <>
                  <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                    <CheckCircle className="w-4 h-4 inline mr-1" />
                    Approve
                  </button>
                  <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                    <XCircle className="w-4 h-4 inline mr-1" />
                    Decline
                  </button>
                </>
              )}
              {sample.status === 'sent' && (
                <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Track Shipment
                </button>
              )}
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEnquiriesContent = () => (
    <div className="space-y-4">
      {filteredEnquiries.map((enquiry) => (
        <div key={enquiry.id} className={`bg-white rounded-lg border border-gray-200 p-4 sm:p-6 border-l-4 ${getPriorityColor(enquiry.priority)}`}>
          <div className="flex flex-col space-y-4">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{enquiry.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(enquiry.status)}`}>
                {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1)}
              </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building className="w-4 h-4" />
                <span>{enquiry.company}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {getSourceIcon(enquiry.source)}
                <span>Source: {enquiry.source}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Received: {enquiry.receivedDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Contact: {enquiry.contact}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-700">{enquiry.message}</p>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {enquiry.status === 'new' && (
                <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                  Respond
                </button>
              )}
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const getPageTitle = () => {
    switch (subSection) {
      case 'rfq':
        return 'RFQ';
      case 'sample':
        return 'Sample Requests';
      case 'enquiries':
        return 'Enquiries';
      default:
        return 'Leads';
    }
  };

  const getPageDescription = () => {
    switch (subSection) {
      case 'rfq':
        return 'Manage your request for quotations';
      case 'sample':
        return 'Handle sample requests from customers';
      case 'enquiries':
        return 'Manage enquiries from various sources';
      default:
        return 'Manage your leads and opportunities';
    }
  };

  const getCurrentData = () => {
    switch (subSection) {
      case 'rfq':
        return filteredRFQs;
      case 'sample':
        return filteredSamples;
      case 'enquiries':
        return filteredEnquiries;
      default:
        return filteredRFQs;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
          <p className="text-sm text-gray-600 mt-1">{getPageDescription()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {getCurrentData().length} items
          </span>
        </div>
      </div>

      {/* Filters */}
      {renderFilters()}

      {/* Content */}
      {subSection === 'rfq' && renderRFQContent()}
      {subSection === 'sample' && renderSampleContent()}
      {subSection === 'enquiries' && renderEnquiriesContent()}

      {/* Empty State */}
      {getCurrentData().length === 0 && (
        <div className="text-center py-12">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No {subSection === 'rfq' ? 'RFQs' : subSection === 'sample' ? 'sample requests' : 'enquiries'} found
          </h3>
          <p className="text-gray-600">
            {subSection === 'rfq' 
              ? 'RFQs from potential customers will appear here.' 
              : subSection === 'sample'
              ? 'Sample requests from customers will appear here.'
              : 'Enquiries from various sources will appear here.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Leads;