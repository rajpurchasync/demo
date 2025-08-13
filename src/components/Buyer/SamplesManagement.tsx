import React, { useState } from 'react';
import { Package, Search, Filter, Calendar, X, AlertTriangle, Check, Clock, XCircle, Minus, ChevronDown, Eye, MapPin, DollarSign, Truck } from 'lucide-react';

interface SampleRequest {
  id: string;
  productName: string;
  sellerName: string;
  dateRequested: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  category: string;
  subCategory: string;
  description?: string;
  estimatedValue: string;
  shipmentCharge?: string;
  sampleCharge?: string;
  sellerComment?: string;
  deliveryDate?: string;
}

interface SamplesManagementProps {
  sidebarCollapsed: boolean;
}

const SamplesManagement: React.FC<SamplesManagementProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState<SampleRequest | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewingSample, setViewingSample] = useState<SampleRequest | null>(null);

  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    category: '',
    subCategory: '',
    status: ''
  });

  const [sampleRequests, setSampleRequests] = useState<SampleRequest[]>([
    {
      id: '1',
      productName: 'Premium Coffee Beans',
      sellerName: 'Global Coffee Suppliers',
      dateRequested: '2024-01-15',
      status: 'pending',
      category: 'Food & Beverage',
      subCategory: 'Coffee',
      estimatedValue: '$250',
      shipmentCharge: '$25',
      sampleCharge: '$15',
      deliveryDate: '2024-01-25'
    },
    {
      id: '2',
      productName: 'Organic Cotton T-Shirts',
      sellerName: 'EcoWear Manufacturing',
      dateRequested: '2024-01-12',
      status: 'accepted',
      category: 'Textiles',
      subCategory: 'Apparel',
      estimatedValue: '$150',
      sellerComment: 'Sample approved. We can provide 3 different sizes for evaluation. Shipping within 2 business days.',
      deliveryDate: '2024-01-20'
    },
    {
      id: '3',
      productName: 'LED Light Fixtures',
      sellerName: 'Bright Solutions Inc.',
      dateRequested: '2024-01-10',
      status: 'rejected',
      category: 'Electronics',
      subCategory: 'Lighting',
      estimatedValue: '$450',
      sellerComment: 'Unfortunately, we cannot provide samples for this product due to high manufacturing costs. Please consider our catalog specifications.',
      deliveryDate: '2024-01-18'
    },
    {
      id: '4',
      productName: 'Bamboo Kitchenware Set',
      sellerName: 'Sustainable Living Co.',
      dateRequested: '2024-01-08',
      status: 'pending',
      category: 'Home & Garden',
      subCategory: 'Kitchenware',
      estimatedValue: '$80',
      shipmentCharge: '$12',
      deliveryDate: '2024-01-30'
    },
    {
      id: '5',
      productName: 'Wireless Headphones',
      sellerName: 'TechAudio Solutions',
      dateRequested: '2024-01-05',
      status: 'withdrawn',
      category: 'Electronics',
      subCategory: 'Audio',
      estimatedValue: '$120',
      sampleCharge: '$30',
      shipmentCharge: '$8',
      deliveryDate: '2024-01-22'
    }
  ]);

  const categories = ['Food & Beverage', 'Textiles', 'Electronics', 'Home & Garden'];
  const subCategories = {
    'Food & Beverage': ['Coffee', 'Tea', 'Snacks', 'Beverages'],
    'Textiles': ['Apparel', 'Fabrics', 'Accessories'],
    'Electronics': ['Lighting', 'Audio', 'Components'],
    'Home & Garden': ['Kitchenware', 'Furniture', 'Decor']
  };

  const filteredSamples = sampleRequests.filter(sample => {
    const matchesSearch = sample.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sample.sellerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !filters.category || sample.category === filters.category;
    const matchesSubCategory = !filters.subCategory || sample.subCategory === filters.subCategory;
    const matchesStatus = !filters.status || sample.status === filters.status;
    
    let matchesDateRange = true;
    if (filters.dateFrom && filters.dateTo) {
      const sampleDate = new Date(sample.dateRequested);
      const fromDate = new Date(filters.dateFrom);
      const toDate = new Date(filters.dateTo);
      matchesDateRange = sampleDate >= fromDate && sampleDate <= toDate;
    }

    return matchesSearch && matchesCategory && matchesSubCategory && matchesStatus && matchesDateRange;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock, label: 'Pending' },
      accepted: { color: 'bg-green-100 text-green-800 border-green-200', icon: Check, label: 'Accepted' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle, label: 'Rejected' },
      withdrawn: { color: 'bg-gray-100 text-gray-800 border-gray-200', icon: Minus, label: 'Withdrawn' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border ${config.color}`}>
        <IconComponent size={12} className="mr-1" />
        {config.label}
      </span>
    );
  };

  const handleWithdraw = (sample: SampleRequest) => {
    setSelectedSample(sample);
    setShowWithdrawModal(true);
  };

  const confirmWithdraw = () => {
    if (selectedSample) {
      setSampleRequests(prev => prev.map(sample => 
        sample.id === selectedSample.id 
          ? { ...sample, status: 'withdrawn' as const }
          : sample
      ));
      setShowWithdrawModal(false);
      setSelectedSample(null);
      showSuccess('Sample request withdrawn successfully');
    }
  };
  const handleViewSample = (sample: SampleRequest) => {
    setViewingSample(sample);
    setShowViewModal(true);
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      category: '',
      subCategory: '',
      status: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '');

  return (
    <main className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'}
      pt-4 lg:pt-8 px-4 lg:px-8 pb-8 min-h-screen bg-gray-50
    `}>
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <Check size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-8 mt-12 lg:mt-0">
        <div className="flex items-center space-x-3 mb-2">
          <Package className="text-purple-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">My Samples</h1>
        </div>
        <p className="text-gray-600">Track and manage your sample requests</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} className="mr-2" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-purple-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value, subCategory: '' }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Sub-Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category</label>
                <select
                  value={filters.subCategory}
                  onChange={(e) => setFilters(prev => ({ ...prev, subCategory: e.target.value }))}
                  disabled={!filters.category}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm disabled:bg-gray-100"
                >
                  <option value="">All Sub-Categories</option>
                  {filters.category && subCategories[filters.category as keyof typeof subCategories]?.map(subCat => (
                    <option key={subCat} value={subCat}>{subCat}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="withdrawn">Withdrawn</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sample Requests List */}
      <div className="space-y-4">
        {/* Mobile: Card Layout */}
        <div className="lg:hidden">
          {filteredSamples.map((sample) => (
            <div key={sample.id} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{sample.productName}</h3>
                  <p className="text-sm text-gray-600 mb-2">{sample.sellerName}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusBadge(sample.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Requested:</span>
                  <p className="font-medium text-gray-900">{new Date(sample.dateRequested).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleViewSample(sample)}
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    <Eye size={14} className="mr-1" />
                    View Details
                  </button>
                </div>
                {sample.status === 'pending' && (
                  <button
                    onClick={() => handleWithdraw(sample)}
                    className="flex items-center text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    <X size={14} className="mr-1" />
                    Withdraw
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden lg:block bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Item Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Seller</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Requested Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSamples.map((sample) => (
                  <tr key={sample.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <h3 className="font-semibold text-gray-900">{sample.productName}</h3>
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-gray-900">{sample.sellerName}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-900">{new Date(sample.dateRequested).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(sample.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleViewSample(sample)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Eye size={16} />
                        </button>
                        {sample.status === 'pending' && (
                          <button
                            onClick={() => handleWithdraw(sample)}
                            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredSamples.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <Package size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sample requests found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || hasActiveFilters 
                ? 'Try adjusting your search or filters'
                : 'You haven\'t made any sample requests yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* View Sample Details Modal */}
      {showViewModal && viewingSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
          <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Package className="text-purple-600" size={24} />
                <h2 className="text-xl font-medium text-gray-900">Sample Details</h2>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 lg:p-6 space-y-6">
              {/* Basic Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-3">{viewingSample.productName}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Seller:</span>
                    <p className="font-medium text-blue-900">{viewingSample.sellerName}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Status:</span>
                    <div className="mt-1">{getStatusBadge(viewingSample.status)}</div>
                  </div>
                  <div>
                    <span className="text-blue-700">Category:</span>
                    <p className="font-medium text-blue-900">{viewingSample.category} → {viewingSample.subCategory}</p>
                  </div>
                  <div>
                    <span className="text-blue-700">Requested Date:</span>
                    <p className="font-medium text-blue-900">{new Date(viewingSample.dateRequested).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              {viewingSample.description && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Product Description</h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{viewingSample.description}</p>
                </div>
              )}

              {/* Charges */}
              {(viewingSample.shipmentCharge || viewingSample.sampleCharge) && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Charges</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {viewingSample.shipmentCharge && (
                        <div className="flex items-center space-x-2">
                          <Truck size={16} className="text-yellow-600" />
                          <div>
                            <span className="text-sm text-yellow-700">Shipment Charge:</span>
                            <p className="font-medium text-yellow-900">{viewingSample.shipmentCharge}</p>
                          </div>
                        </div>
                      )}
                      {viewingSample.sampleCharge && (
                        <div className="flex items-center space-x-2">
                          <DollarSign size={16} className="text-yellow-600" />
                          <div>
                            <span className="text-sm text-yellow-700">Sample Charge:</span>
                            <p className="font-medium text-yellow-900">{viewingSample.sampleCharge}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Date */}
              {viewingSample.deliveryDate && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Expected Delivery</h4>
                  <div className="flex items-center space-x-2 bg-green-50 border border-green-200 rounded-lg p-3">
                    <Calendar size={16} className="text-green-600" />
                    <span className="font-medium text-green-900">
                      {new Date(viewingSample.deliveryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Seller Comment */}
              {viewingSample.sellerComment && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Seller Comment</h4>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800">{viewingSample.sellerComment}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {viewingSample.status === 'pending' && (
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      handleWithdraw(viewingSample);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Withdraw Request
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Confirmation Modal */}
      {showWithdrawModal && selectedSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Withdraw Sample Request</h3>
              <p className="text-gray-600 mb-2">
                Are you sure you want to withdraw your sample request for:
              </p>
              <p className="font-semibold text-gray-900 mb-6">
                "{selectedSample.productName}" from {selectedSample.sellerName}?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmWithdraw}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Withdraw Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default SamplesManagement;