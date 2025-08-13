import React, { useState } from 'react';
import { ArrowLeft, Calendar, FileText, Download, Package, Users, ChevronDown, ChevronUp, MapPin, Award, Mail, Bell, Check } from 'lucide-react';
import { RFQ, RFQAttachment } from '../types/rfq';
import SellerSelectionPanel from './SellerSelectionPanel';
import HighLevelComparison from './HighLevelComparison';
import DetailedComparison from './DetailedComparison';
import PdfModal from './PdfModal';
import { SellerOffer } from '../types';

interface RFQDetailViewProps {
  rfq: RFQ;
  onBack: () => void;
}

const RFQDetailView: React.FC<RFQDetailViewProps> = ({ rfq, onBack }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['summary']));
  const [currentView, setCurrentView] = useState<'rfq-detail' | 'high-level' | 'detailed'>('rfq-detail');
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState<SellerOffer | null>(null);
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [showNoQuotesModal, setShowNoQuotesModal] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  // Convert RFQ vendors to SellerOffer format for comparison
  const convertToSellerOffers = (): SellerOffer[] => {
    return rfq.vendors
      .filter(vendor => vendor.submittedRFQ && vendor.totalAmount)
      .map(vendor => ({
        id: vendor.id,
        sellerName: vendor.vendorName,
        status: 'full' as const,
        totalAmount: vendor.totalAmount || 0,
        vat: (vendor.totalAmount || 0) * 0.2,
        totalIncludingVat: (vendor.totalAmount || 0) * 1.2,
        additionalOffer: `Special terms for ${rfq.rfqNumber}`,
        pdfUrl: '#',
        items: rfq.items.map(item => ({
          id: `${vendor.id}-${item.id}`,
          itemName: item.itemName,
          quantity: item.quantity,
          unitPrice: Math.floor(Math.random() * 100) + 50,
          totalPrice: Math.floor(Math.random() * 1000) + 500,
          sellerId: vendor.id
        }))
      }));
  };

  const handleCompareRFQs = () => {
    const availableVendors = rfq.vendors.filter(vendor => vendor.submittedRFQ && vendor.totalAmount);
    if (availableVendors.length === 0) {
      setShowNoQuotesModal(true);
      return;
    }
    if (selectedVendors.length === 0) {
      alert('Please select at least one vendor to compare');
      return;
    }
    setCurrentView('high-level');
  };

  const handleVendorToggle = (vendorId: string) => {
    if (selectedVendors.includes(vendorId)) {
      setSelectedVendors(selectedVendors.filter(id => id !== vendorId));
    } else {
      if (selectedVendors.length >= 3) {
        alert('You can compare up to 3 vendors at a time. Please deselect a vendor to choose a different one.');
        return;
      }
      setSelectedVendors([...selectedVendors, vendorId]);
    }
  };

  const handleViewDetailed = () => {
    setCurrentView('detailed');
  };

  const handleBackToHighLevel = () => {
    setCurrentView('high-level');
  };

  const handleBackToRFQDetail = () => {
    setCurrentView('rfq-detail');
    setSelectedVendors([]);
  };

  const handleViewPdf = (seller: SellerOffer) => {
    setSelectedSeller(seller);
    setShowPdfModal(true);
  };

  const handleNegotiate = (seller: SellerOffer) => {
    setSelectedSeller(seller);
    setShowNegotiationModal(true);
  };

  const handleDownloadReport = () => {
    console.log('Downloading comparison report...');
    alert('Comparison report download started');
  };

  // Get selected sellers for comparison
  const getSelectedSellers = (): SellerOffer[] => {
    const allSellers = convertToSellerOffers();
    return allSellers.filter(seller => selectedVendors.includes(seller.id));
  };

  if (currentView === 'high-level') {
    return (
      <HighLevelComparison
        selectedSellers={getSelectedSellers()}
        onBack={handleBackToRFQDetail}
        onViewDetailed={handleViewDetailed}
        onViewPdf={handleViewPdf}
        onNegotiate={handleNegotiate}
      />
    );
  }

  if (currentView === 'detailed') {
    return (
      <DetailedComparison
        selectedSellers={getSelectedSellers()}
        onBack={handleBackToHighLevel}
        onDownloadReport={handleDownloadReport}
      />
    );
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getFileIcon = (type: RFQAttachment['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'excel':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'word':
        return <FileText className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'Invited': { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Mail },
      'Quote Received': { bg: 'bg-green-100', text: 'text-green-800', icon: FileText },
      'Rejected': { bg: 'bg-red-100', text: 'text-red-800', icon: null }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    if (!config) return null;

    const IconComponent = config.icon;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
        {status}
      </span>
    );
  };

  const getPaymentTermsBadge = (terms: string) => {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
        {terms}
      </span>
    );
  };

  const handleSendReminder = (vendorName: string) => {
    // Dummy action for now
    alert(`Reminder sent to ${vendorName}`);
  };

  const isExpanded = (section: string) => expandedSections.has(section);

  const submittedVendors = rfq.vendors.filter(vendor => vendor.submittedRFQ);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center space-x-3 mb-3">
            <button
              onClick={handleBackToRFQDetail}
              className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-blue-600 text-sm">
                {rfq.rfqNumber}
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">
                {rfq.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-3 space-y-6">
              {/* RFQ Summary */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  RFQ Summary
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">RFQ Number</label>
                    <div className="text-sm text-gray-900 font-semibold">{rfq.rfqNumber}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Created Date</label>
                    <div className="text-sm text-gray-900">{formatDate(rfq.createdDate)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Date</label>
                    <div className="text-sm text-gray-900">{formatDate(rfq.deliveryDate)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Deadline</label>
                    <div className="text-sm text-gray-900 font-semibold text-red-600">{formatDate(rfq.deadline)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Payment Terms</label>
                    <div>{getPaymentTermsBadge(rfq.paymentTerms)}</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                    <div className="text-sm text-gray-900">{rfq.category}</div>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Purchase Type</label>
                    <div className="text-sm text-gray-900">{rfq.purchaseType}</div>
                  </div>
                </div>
              </div>

              {/* Attachments & Comments */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments & Comments</h3>
                
                {rfq.attachments.length > 0 ? (
                  <div className="space-y-3 mb-6">
                    {rfq.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        {getFileIcon(attachment.type)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{attachment.filename}</div>
                          <div className="text-xs text-gray-500">{attachment.size}</div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No attachments added yet</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">RFQ Comments</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{rfq.comments}</p>
                  </div>
                </div>
              </div>

              {/* Items Requested */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Items Requested
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Item Name</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">Quantity</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900">UOM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {rfq.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 text-sm text-gray-900">{item.itemName}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center font-medium">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 text-center">{item.unitOfMeasure}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Vendors Invited */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-600" />
                    Vendors Invited ({rfq.vendors.length})
                  </h2>
                  <button
                    onClick={handleCompareRFQs}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Compare ({selectedVendors.length}/3)
                  </button>
                </div>
                {rfq.vendors.length > 0 ? (
                  <div className="space-y-4">
                    {rfq.vendors.map((vendor) => (
                      <div key={vendor.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3 mb-3">
                          {vendor.submittedRFQ && vendor.totalAmount && (
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 cursor-pointer ${
                              selectedVendors.includes(vendor.id)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}
                            onClick={() => handleVendorToggle(vendor.id)}
                            >
                              {selectedVendors.includes(vendor.id) && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{vendor.vendorName}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {vendor.location}
                            </div>
                            {vendor.submittedRFQ && vendor.submissionDate && (
                              <div className="text-sm text-gray-600 mt-1">
                                Submitted: {formatDate(vendor.submissionDate)}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            {getStatusBadge(vendor.quotationStatus)}
                            {vendor.submittedRFQ && vendor.totalAmount && (
                              <div className="text-lg font-bold text-blue-600">
                                {formatCurrency(vendor.totalAmount)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {vendor.certificates.map((cert, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </span>
                          ))}
                        </div>

                        {vendor.submittedRFQ && vendor.totalAmount && (
                          <button
                            onClick={() => {
                              const sellerOffer: SellerOffer = {
                                id: vendor.id,
                                sellerName: vendor.vendorName,
                                status: 'full' as const,
                                totalAmount: vendor.totalAmount || 0,
                                vat: (vendor.totalAmount || 0) * 0.2,
                                totalIncludingVat: (vendor.totalAmount || 0) * 1.2,
                                additionalOffer: `Special terms for ${rfq.rfqNumber}`,
                                pdfUrl: '#',
                                items: rfq.items.map(item => ({
                                  id: `${vendor.id}-${item.id}`,
                                  itemName: item.itemName,
                                  quantity: item.quantity,
                                  unitPrice: Math.floor(Math.random() * 100) + 50,
                                  totalPrice: Math.floor(Math.random() * 1000) + 500,
                                  sellerId: vendor.id
                                }))
                              };
                              handleViewPdf(sellerOffer);
                            }}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2 mt-3"
                          >
                            <FileText className="w-4 h-4" />
                            <span>View Quote</span>
                          </button>
                        )}

                        {vendor.quotationStatus === 'Invited' && !vendor.submittedRFQ && (
                          <button
                            onClick={() => handleSendReminder(vendor.vendorName)}
                            className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center space-x-2 mt-3"
                          >
                            <Bell className="w-4 h-4" />
                            <span>Send Reminder</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No vendors invited yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {/* RFQ Summary Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('summary')}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              style={{ minHeight: '44px' }}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">RFQ Summary</span>
              </div>
              {isExpanded('summary') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {isExpanded('summary') && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">RFQ Number</label>
                      <div className="text-sm text-gray-900 font-semibold">{rfq.rfqNumber}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Created Date</label>
                      <div className="text-sm text-gray-900">{formatDate(rfq.createdDate)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Date</label>
                      <div className="text-sm text-gray-900">{formatDate(rfq.deliveryDate)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Deadline</label>
                      <div className="text-sm text-gray-900 font-semibold text-red-600">{formatDate(rfq.deadline)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Payment Terms</label>
                      <div>{getPaymentTermsBadge(rfq.paymentTerms)}</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                      <div className="text-sm text-gray-900">{rfq.category}</div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Purchase Type</label>
                    <div className="text-sm text-gray-900">{rfq.purchaseType}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Attachments & Comments Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('attachments')}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              style={{ minHeight: '44px' }}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Attachments & Comments</span>
              </div>
              {isExpanded('attachments') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {isExpanded('attachments') && (
              <div className="px-4 pb-4 border-t border-gray-100 space-y-4">
                {rfq.attachments.length > 0 ? (
                  <div className="space-y-3">
                    {rfq.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        {getFileIcon(attachment.type)}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{attachment.filename}</div>
                          <div className="text-xs text-gray-500">{attachment.size}</div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No attachments added yet</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">RFQ Comments</label>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">{rfq.comments}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Items Requested Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('items')}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              style={{ minHeight: '44px' }}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Items Requested ({rfq.items.length})</span>
              </div>
              {isExpanded('items') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {isExpanded('items') && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="space-y-3">
                  {rfq.items.map((item) => (
                    <div key={item.id} className="bg-gray-50 p-3 rounded-lg">
                      <div className="font-medium text-gray-900 mb-2">{item.itemName}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Quantity:</span>
                          <span className="ml-2 font-medium text-gray-900">{item.quantity}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">UOM:</span>
                          <span className="ml-2 font-medium text-gray-900">{item.unitOfMeasure}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Vendors Section */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSection('vendors')}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              style={{ minHeight: '44px' }}
            >
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-gray-900">Vendors Invited ({rfq.vendors.length})</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCompareRFQs();
                }}
                className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium mr-2"
                style={{ minHeight: '32px' }}
              >
                Compare ({selectedVendors.length}/3)
              </button>
              {isExpanded('vendors') ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {isExpanded('vendors') && (
              <div className="px-4 pb-4 border-t border-gray-100">
                {rfq.vendors.length > 0 ? (
                  <div className="space-y-4">
                    {rfq.vendors.map((vendor) => (
                      <div key={vendor.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-3 mb-3">
                          {vendor.submittedRFQ && vendor.totalAmount && (
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 cursor-pointer ${
                              selectedVendors.includes(vendor.id)
                                ? 'border-blue-500 bg-blue-500'
                                : 'border-gray-300'
                            }`}
                            onClick={() => handleVendorToggle(vendor.id)}
                            >
                              {selectedVendors.includes(vendor.id) && (
                                <Check className="w-4 h-4 text-white" />
                              )}
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{vendor.vendorName}</h3>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 mr-1" />
                              {vendor.location}
                            </div>
                            {vendor.submittedRFQ && vendor.submissionDate && (
                              <div className="text-sm text-gray-600 mt-1">
                                Submitted: {formatDate(vendor.submissionDate)}
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            {getStatusBadge(vendor.quotationStatus)}
                            {vendor.submittedRFQ && vendor.totalAmount && (
                              <div className="text-lg font-bold text-blue-600">
                                {formatCurrency(vendor.totalAmount)}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {vendor.certificates.map((cert, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              <Award className="w-3 h-3 mr-1" />
                              {cert}
                            </span>
                          ))}
                        </div>

                        {vendor.submittedRFQ && vendor.totalAmount && (
                          <button
                            onClick={() => {
                              const sellerOffer: SellerOffer = {
                                id: vendor.id,
                                sellerName: vendor.vendorName,
                                status: 'full' as const,
                                totalAmount: vendor.totalAmount || 0,
                                vat: (vendor.totalAmount || 0) * 0.2,
                                totalIncludingVat: (vendor.totalAmount || 0) * 1.2,
                                additionalOffer: `Special terms for ${rfq.rfqNumber}`,
                                pdfUrl: '#',
                                items: rfq.items.map(item => ({
                                  id: `${vendor.id}-${item.id}`,
                                  itemName: item.itemName,
                                  quantity: item.quantity,
                                  unitPrice: Math.floor(Math.random() * 100) + 50,
                                  totalPrice: Math.floor(Math.random() * 1000) + 500,
                                  sellerId: vendor.id
                                }))
                              };
                              handleViewPdf(sellerOffer);
                            }}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2 mb-3"
                            style={{ minHeight: '44px' }}
                          >
                            <FileText className="w-4 h-4" />
                            <span>View Quote</span>
                          </button>
                        )}

                        {vendor.quotationStatus === 'Invited' && !vendor.submittedRFQ && (
                          <button
                            onClick={() => handleSendReminder(vendor.vendorName)}
                            className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center space-x-2"
                            style={{ minHeight: '44px' }}
                          >
                            <Bell className="w-4 h-4" />
                            <span>Send Reminder</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No vendors invited yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showPdfModal && selectedSeller && (
        <PdfModal
          seller={selectedSeller}
          isOpen={showPdfModal}
          onClose={() => setShowPdfModal(false)}
        />
      )}

      {showNegotiationModal && selectedSeller && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Negotiate with {selectedSeller.sellerName}</h3>
            <p className="text-gray-600 mb-4">
              Negotiation feature will be implemented in the next phase.
            </p>
            <button
              onClick={() => setShowNegotiationModal(false)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* No Quotes Modal */}
      {showNoQuotesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Quotes to Compare</h3>
              <p className="text-gray-600 mb-6">
                There are no vendor quotes available for comparison. Please wait for vendors to submit their proposals.
              </p>
              <button
                onClick={() => setShowNoQuotesModal(false)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFQDetailView;