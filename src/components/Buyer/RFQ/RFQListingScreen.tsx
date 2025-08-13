import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, FileText, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import { RFQ, RFQCategory, RFQStatus, SortOrder } from '../types/rfq';

interface RFQListingScreenProps {
  rfqs: RFQ[];
  onRFQSelect: (rfq: RFQ) => void;
}

const RFQListingScreen: React.FC<RFQListingScreenProps> = ({ rfqs, onRFQSelect }) => {
  const [activeCategory, setActiveCategory] = useState<RFQCategory>('Products');
  const [statusFilter, setStatusFilter] = useState<RFQStatus | 'All'>('All');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAndSortedRFQs = useMemo(() => {
    let filtered = rfqs.filter(rfq => {
      const matchesCategory = rfq.category === activeCategory;
      const matchesStatus = statusFilter === 'All' || rfq.status === statusFilter;
      const matchesSearch = searchQuery === '' || 
        rfq.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rfq.rfqNumber.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesStatus && matchesSearch;
    });

    return filtered.sort((a, b) => {
      const dateA = new Date(a.createdDate).getTime();
      const dateB = new Date(b.createdDate).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [rfqs, activeCategory, statusFilter, searchQuery, sortOrder]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: RFQStatus) => {
    if (status === 'Ongoing') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <Clock className="w-3 h-3 mr-1" />
          Ongoing
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Completed
      </span>
    );
  };

  const ongoingCount = filteredAndSortedRFQs.filter(rfq => rfq.status === 'Ongoing').length;
  const completedCount = filteredAndSortedRFQs.filter(rfq => rfq.status === 'Completed').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 sm:px-6">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-4">
            RFQ Management
          </h1>
          
          {/* Category Toggle Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-4 lg:max-w-xs">
            <button
              onClick={() => setActiveCategory('Products')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeCategory === 'Products'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ minHeight: '44px' }}
            >
              Products
            </button>
            <button
              onClick={() => setActiveCategory('Services')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeCategory === 'Services'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ minHeight: '44px' }}
            >
              Services
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by RFQ title or number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ minHeight: '44px' }}
            />
          </div>

          {/* Filter Controls */}
          {/* Always Visible Filters */}
          <div className="space-y-4">
            {/* Mobile Filters - Stacked */}
            <div className="lg:hidden space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('All')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === 'All'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    All ({ongoingCount + completedCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Ongoing')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === 'Ongoing'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Ongoing ({ongoingCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Completed')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === 'Completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Completed ({completedCount})
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    placeholder="From Date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    style={{ minHeight: '44px' }}
                  />
                  <input
                    type="date"
                    placeholder="To Date"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    style={{ minHeight: '44px' }}
                  />
                </div>
              </div>
            </div>

            {/* Desktop Filters - Same Row */}
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:space-x-6">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Status:</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setStatusFilter('All')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === 'All'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    All ({ongoingCount + completedCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Ongoing')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === 'Ongoing'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Ongoing ({ongoingCount})
                  </button>
                  <button
                    onClick={() => setStatusFilter('Completed')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      statusFilter === 'Completed'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Completed ({completedCount})
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Date Range:</label>
                <input
                  type="date"
                  placeholder="From Date"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-36"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="date"
                  placeholder="To Date"
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-36"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ List */}
      <div className="px-4 py-4 sm:px-6 space-y-3">
        {filteredAndSortedRFQs.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No RFQs Found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms or filters.' : `No ${activeCategory.toLowerCase()} RFQs available.`}
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Card View */}
            <div className="lg:hidden space-y-3">
              {filteredAndSortedRFQs.map((rfq) => (
                <div
                  key={rfq.id}
                  onClick={() => onRFQSelect(rfq)}
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer active:scale-95"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-blue-600 text-sm mb-1">
                        {rfq.rfqNumber}
                      </div>
                      <h3 className="font-medium text-gray-900 text-base leading-tight mb-2">
                        {rfq.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(rfq.createdDate)}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {getStatusBadge(rfq.status)}
                    <div className="text-xs text-gray-500">
                      {rfq.vendors.length} vendor{rfq.vendors.length !== 1 ? 's' : ''} invited
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        RFQ Number
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Title
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Created Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Vendors
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAndSortedRFQs.map((rfq) => (
                      <tr
                        key={rfq.id}
                        onClick={() => onRFQSelect(rfq)}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-blue-600">
                            {rfq.rfqNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {rfq.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {formatDate(rfq.createdDate)}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(rfq.status)}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {rfq.vendors.length} invited
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                            View
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RFQListingScreen;