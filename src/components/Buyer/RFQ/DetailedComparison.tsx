import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Trophy, Download, X, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { SellerOffer, ProposalItem } from '../types';

interface DetailedComparisonProps {
  selectedSellers: SellerOffer[];
  onBack: () => void;
  onDownloadReport: () => void;
}

const DetailedComparison: React.FC<DetailedComparisonProps> = ({
  selectedSellers,
  onBack,
  onDownloadReport,
}) => {
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [activeSellerIndex, setActiveSellerIndex] = useState(0);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get all unique items from selected sellers
  const getAllItems = (): string[] => {
    const itemNames = new Set<string>();
    selectedSellers.forEach(seller => {
      seller.items.forEach(item => {
        itemNames.add(item.itemName);
      });
    });
    return Array.from(itemNames).sort();
  };

  const allItems = getAllItems();

  const getItemForSeller = (itemName: string, sellerId: string): ProposalItem | null => {
    const seller = selectedSellers.find(s => s.id === sellerId);
    return seller?.items.find(item => item.itemName === itemName) || null;
  };

  const getBestPriceForItem = (itemName: string): number | null => {
    const prices = selectedSellers
      .map(seller => getItemForSeller(itemName, seller.id))
      .filter(item => item !== null)
      .map(item => item!.totalPrice);
    
    return prices.length > 0 ? Math.min(...prices) : null;
  };

  const getBestTotalIndex = () => {
    let bestIndex = 0;
    let bestTotal = selectedSellers[0]?.totalIncludingVat || 0;
    
    selectedSellers.forEach((seller, index) => {
      if (seller.totalIncludingVat < bestTotal && seller.status === 'full') {
        bestTotal = seller.totalIncludingVat;
        bestIndex = index;
      }
    });
    
    return selectedSellers[bestIndex]?.status === 'full' ? bestIndex : -1;
  };

  const bestTotalIndex = getBestTotalIndex();

  const handleDownloadReport = () => {
    setShowPdfModal(true);
  };

  const generateComparisonPdf = () => {
    console.log('Generating comprehensive PDF with comparison and all quotes...');
    alert('PDF report generated successfully!');
    setShowPdfModal(false);
  };

  const nextSeller = () => {
    setActiveSellerIndex((prev) => (prev + 1) % selectedSellers.length);
  };

  const prevSeller = () => {
    setActiveSellerIndex((prev) => (prev - 1 + selectedSellers.length) % selectedSellers.length);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Mobile-First Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center space-x-3 mb-3">
              <button
                onClick={onBack}
                className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
                  Detailed Line-by-Line
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  Item-by-item comparison
                </p>
              </div>
              <button
                onClick={handleDownloadReport}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center space-x-2"
                style={{ minHeight: '44px' }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Report</span>
                <span className="sm:hidden">Download</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Tabbed View */}
        <div className="lg:hidden">
          {/* Tab Navigation */}
          <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
            <div className="flex items-center justify-between px-4 py-2">
              <button
                onClick={prevSeller}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex-1 text-center">
                <div className="font-semibold text-gray-900">
                  {selectedSellers[activeSellerIndex]?.sellerName}
                </div>
                <div className="text-sm text-blue-600 font-medium">
                  {formatCurrency(selectedSellers[activeSellerIndex]?.totalIncludingVat || 0)}
                </div>
                <div className="flex justify-center items-center space-x-2 mt-1">
                  {bestTotalIndex !== -1 && activeSellerIndex === bestTotalIndex && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <Trophy className="w-3 h-3 mr-1" />
                      Best Offer
                    </span>
                  )}
                  {selectedSellers[activeSellerIndex]?.status === 'partial' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Partial Offer
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-600 italic mt-1 px-2">
                  "{selectedSellers[activeSellerIndex]?.additionalOffer}"
                </div>
              </div>
              
              <button
                onClick={nextSeller}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Tab Indicators */}
            <div className="flex justify-center space-x-2 pb-3">
              {selectedSellers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSellerIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeSellerIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Mobile Item List */}
          <div className="px-4 py-4 space-y-3">
            {allItems.map((itemName) => {
              const activeSeller = selectedSellers[activeSellerIndex];
              const item = getItemForSeller(itemName, activeSeller.id);
              const bestPrice = getBestPriceForItem(itemName);
              const isBestPrice = item && item.totalPrice === bestPrice;
              
              return (
                <div key={itemName} className={`bg-white rounded-lg p-4 border-2 ${
                  isBestPrice ? 'border-green-200 bg-green-50' : 'border-gray-200'
                }`}>
                  <div className="font-semibold text-gray-900 mb-3">{itemName}</div>
                  
                  {item ? (
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">Quantity</div>
                        <div className="font-medium text-gray-900">{item.quantity}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">Base Price</div>
                        <div className="font-medium text-gray-900">{formatCurrency(item.unitPrice)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-600 mb-1">Total</div>
                        <div className={`font-bold ${isBestPrice ? 'text-green-700' : 'text-gray-900'}`}>
                          {formatCurrency(item.totalPrice)}
                          {isBestPrice && (
                            <Trophy className="w-3 h-3 inline ml-1 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-orange-500 py-4">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <span className="text-sm">Not Available</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block max-w-7xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="sticky top-20 bg-white border-b-2 border-gray-200 z-10">
                  <tr>
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 w-80 border-r border-gray-300 border-b border-gray-300 bg-gray-50">
                      Item Details
                    </th>
                    {selectedSellers.map((seller) => (
                      <th key={seller.id} className="border-r border-gray-300 border-b border-gray-300">
                        <div className="text-center py-3 px-2 border-b border-gray-200 bg-white">
                          <div className="font-bold text-gray-900 mb-1">{seller.sellerName}</div>
                          <div className="text-sm font-semibold text-blue-600 mb-2">
                            {formatCurrency(seller.totalIncludingVat)}
                          </div>
                          <div className="flex flex-col items-center space-y-1 mb-2">
                            {bestTotalIndex !== -1 && selectedSellers.findIndex(s => s.id === seller.id) === bestTotalIndex && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Trophy className="w-3 h-3 mr-1" />
                                Best Offer
                              </span>
                            )}
                            {seller.status === 'partial' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                Partial Offer
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-600 italic px-1">
                            "{seller.additionalOffer}"
                          </div>
                        </div>
                        <div className="grid grid-cols-3 text-xs font-semibold text-gray-700 bg-gray-100">
                          <div className="py-2 px-2 border-r border-gray-300 text-center">Qty</div>
                          <div className="py-2 px-2 border-r border-gray-300 text-center">Base Price</div>
                          <div className="py-2 px-2 text-center">Total</div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allItems.map((itemName, index) => {
                    const bestPrice = getBestPriceForItem(itemName);
                    return (
                      <tr key={itemName} className={`border-b border-gray-300 hover:bg-gray-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                      }`}>
                        <td className="py-4 px-4 font-medium text-gray-900 border-r border-gray-300 border-l border-gray-300">
                          <div className="font-semibold">{itemName}</div>
                        </td>
                        {selectedSellers.map((seller) => {
                          const item = getItemForSeller(itemName, seller.id);
                          const isBestPrice = item && item.totalPrice === bestPrice;
                          
                          return (
                            <td key={seller.id} className="border-r border-gray-300">
                              {item ? (
                                <div className={`grid grid-cols-3 h-full ${
                                  isBestPrice ? 'bg-green-50' : ''
                                }`}>
                                  <div className="py-3 px-2 border-r border-gray-300 text-center text-sm font-medium text-gray-700">
                                    {item.quantity}
                                  </div>
                                  <div className="py-3 px-2 border-r border-gray-300 text-center text-sm font-medium text-gray-700">
                                    {formatCurrency(item.unitPrice)}
                                  </div>
                                  <div className={`py-3 px-2 text-center text-sm font-bold flex items-center justify-center ${
                                    isBestPrice ? 'text-green-700' : 'text-gray-900'
                                  }`}>
                                    <span>{formatCurrency(item.totalPrice)}</span>
                                    {isBestPrice && (
                                      <Trophy className="w-3 h-3 ml-1 text-green-600" />
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-3 h-full">
                                  <div className="py-3 px-2 border-r border-gray-300 text-center text-orange-500">
                                    <AlertTriangle className="w-4 h-4 mx-auto" />
                                  </div>
                                  <div className="py-3 px-2 border-r border-gray-300 text-center text-orange-500">
                                    <AlertTriangle className="w-4 h-4 mx-auto" />
                                  </div>
                                  <div className="py-3 px-2 text-center text-orange-500">
                                    <span className="text-xs">N/A</span>
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Sticky Bottom Action Bar */}
      </div>

      {/* Comprehensive PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900">Comprehensive Comparison Report</h3>
                  <p className="text-sm text-gray-600">Detailed comparison + All seller quotations</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={generateComparisonPdf}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button
                  onClick={() => setShowPdfModal(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 bg-gray-50 overflow-auto">
              <div className="bg-white p-4 sm:p-8 shadow-sm max-w-6xl mx-auto">
                {/* Comparison Report Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
                  <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">COMPREHENSIVE COMPARISON REPORT</h1>
                  <div className="text-lg font-semibold text-gray-800">Detailed Analysis & Quotations</div>
                  <div className="text-sm text-gray-600 mt-2">Generated on {new Date().toLocaleDateString()}</div>
                </div>

                {/* Executive Summary */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Executive Summary</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {selectedSellers.map((seller, index) => (
                      <div key={seller.id} className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900">{seller.sellerName}</h3>
                        <div className="text-xl sm:text-2xl font-bold text-blue-600 mt-2">
                          {formatCurrency(seller.totalIncludingVat)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Status: {seller.status === 'full' ? 'Complete Offer' : 'Partial Offer'}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Items: {seller.items.length}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 italic">
                          "{seller.additionalOffer}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Comparison Table */}
                <div className="mb-12">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Item-by-Item Comparison</h2>
                  <div className="mb-4 text-sm text-gray-600">
                    Items marked with ★ indicate the best price for that item.
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                      <thead>
                        <tr className="bg-blue-50">
                          <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Item Name</th>
                          {selectedSellers.map((seller) => (
                            <th key={seller.id} className="border border-gray-300">
                              <div className="px-3 py-3 text-center border-b border-gray-300">
                                {seller.sellerName}
                                <div className="text-xs font-semibold text-blue-600 mt-1">
                                  {formatCurrency(seller.totalIncludingVat)}
                                </div>
                                <div className="flex flex-col items-center space-y-1 mt-2">
                                  {bestTotalIndex !== -1 && selectedSellers.findIndex(s => s.id === seller.id) === bestTotalIndex && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Best Offer
                                    </span>
                                  )}
                                  {seller.status === 'partial' && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                      Partial Offer
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-600 italic mt-2 px-1">
                                  "{seller.additionalOffer}"
                                </div>
                              </div>
                              <div className="grid grid-cols-3 text-xs font-semibold bg-gray-100">
                                <div className="px-2 py-1 border-r border-gray-300 text-center">Qty</div>
                                <div className="px-2 py-1 border-r border-gray-300 text-center">Base</div>
                                <div className="px-2 py-1 text-center">Total</div>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {allItems.map((itemName, index) => {
                          const bestPrice = getBestPriceForItem(itemName);
                          
                          return (
                            <tr key={itemName} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                              <td className="border border-gray-300 px-3 py-2 font-medium">{itemName}</td>
                              {selectedSellers.map((seller) => {
                                const item = getItemForSeller(itemName, seller.id);
                                const isBestPrice = item && item.totalPrice === bestPrice;
                                
                                return (
                                  <td key={seller.id} className={`border border-gray-300 ${
                                    isBestPrice ? 'bg-green-50 font-semibold text-green-700' : ''
                                  }`}>
                                    {item ? (
                                      <div className="grid grid-cols-3">
                                        <div className="px-2 py-1 border-r border-gray-300 text-center text-xs">
                                          {item.quantity}
                                        </div>
                                        <div className="px-2 py-1 border-r border-gray-300 text-center text-xs">
                                          {formatCurrency(item.unitPrice)}
                                        </div>
                                        <div className="px-2 py-1 text-center text-xs font-bold">
                                          {formatCurrency(item.totalPrice)}
                                          {isBestPrice && ' ★'}
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="grid grid-cols-3">
                                        <div className="px-2 py-1 border-r border-gray-300 text-center text-orange-500 text-xs">N/A</div>
                                        <div className="px-2 py-1 border-r border-gray-300 text-center text-orange-500 text-xs">N/A</div>
                                        <div className="px-2 py-1 text-center text-orange-500 text-xs">N/A</div>
                                      </div>
                                    )}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Individual Quotations */}
                {selectedSellers.map((seller, sellerIndex) => (
                  <div key={seller.id} className={`mb-12 ${sellerIndex > 0 ? 'border-t-2 border-gray-200 pt-8' : ''}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Quotation #{sellerIndex + 1}: {seller.sellerName}
                    </h2>
                    
                    {/* Quote Header */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Quote Details</h3>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-semibold">Quote Number:</span> QT-{seller.id.toUpperCase()}-2025-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</div>
                          <div><span className="font-semibold">Quote Date:</span> {new Date().toLocaleDateString()}</div>
                          <div><span className="font-semibold">Status:</span> {seller.status === 'full' ? 'Complete Offer' : 'Partial Offer'}</div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
                        <div className="space-y-1 text-sm">
                          <div className="font-semibold">{seller.sellerName}</div>
                          <div className="text-gray-600">1234 Business Avenue</div>
                          <div className="text-gray-600">New York, NY 10001</div>
                          <div className="text-gray-600">Phone: +1 (555) 123-4567</div>
                        </div>
                      </div>
                    </div>

                    {/* Items Table */}
                    <div className="mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300 text-sm">
                          <thead>
                            <tr className="bg-gray-50">
                              <th className="border border-gray-300 px-3 py-2 text-left font-semibold">Item</th>
                              <th className="border border-gray-300 px-3 py-2 text-center font-semibold">Qty</th>
                              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Unit Price</th>
                              <th className="border border-gray-300 px-3 py-2 text-right font-semibold">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {seller.items.map((item, itemIndex) => (
                              <tr key={item.id} className={itemIndex % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                                <td className="border border-gray-300 px-3 py-2">{item.itemName}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{item.quantity}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(item.unitPrice)}</td>
                                <td className="border border-gray-300 px-3 py-2 text-right font-semibold">{formatCurrency(item.totalPrice)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end mb-6">
                      <div className="w-full sm:w-64 bg-gray-50 p-4 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="font-semibold">{formatCurrency(seller.totalAmount)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>VAT (20%):</span>
                            <span className="font-semibold">{formatCurrency(seller.vat)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2 text-lg">
                            <span className="font-bold">Total:</span>
                            <span className="font-bold text-blue-600">{formatCurrency(seller.totalIncludingVat)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Offer */}
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-semibold text-blue-900 mb-2">Special Offer:</h4>
                      <p className="text-blue-800">{seller.additionalOffer}</p>
                    </div>
                  </div>
                ))}

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-200">
                  <p>Comprehensive Comparison Report | Generated on {new Date().toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailedComparison;