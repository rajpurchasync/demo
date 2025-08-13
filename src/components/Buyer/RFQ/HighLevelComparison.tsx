import React, { useState } from 'react';
import { ArrowLeft, FileText, MessageSquare, Trophy, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { SellerOffer } from '../types';

interface HighLevelComparisonProps {
  selectedSellers: SellerOffer[];
  onBack: () => void;
  onViewDetailed: () => void;
  onViewPdf: (seller: SellerOffer) => void;
  onNegotiate: (seller: SellerOffer) => void;
}

const HighLevelComparison: React.FC<HighLevelComparisonProps> = ({
  selectedSellers,
  onBack,
  onViewDetailed,
  onViewPdf,
  onNegotiate,
}) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
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

  const toggleCard = (sellerId: string) => {
    setExpandedCard(expandedCard === sellerId ? null : sellerId);
  };

  return (
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
                High-Level Comparison
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                Overview of selected seller proposals
              </p>
            </div>
            <button
              onClick={onViewDetailed}
              className="hidden lg:block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
              style={{ minHeight: '44px' }}
            >
              View Detailed Comparison
            </button>
          </div>
          
          {/* Mobile View Detailed Comparison Button */}
          <div className="mb-4 flex justify-center lg:hidden">
            <button
              onClick={onViewDetailed}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg active:scale-95"
              style={{ minHeight: '44px' }}
            >
              View Detailed Comparison
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-First Seller Cards Stack */}
      <div className="px-4 py-4 sm:px-6 space-y-4">
        {/* Desktop Table View - Hidden on Mobile */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-900 w-48">
                      Comparison Details
                    </th>
                    {selectedSellers.map((seller) => (
                      <th key={seller.id} className="text-center py-4 px-4 font-semibold text-gray-900">
                        <div className="w-64"></div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">Seller Name</td>
                    {selectedSellers.map((seller) => (
                      <td key={seller.id} className="py-4 px-4 text-center">
                        <div className="space-y-2">
                          <button
                            onClick={() => onViewPdf(seller)}
                            className="font-bold text-lg text-blue-600 hover:text-blue-800 transition-colors cursor-pointer underline"
                          >
                            {seller.sellerName}
                          </button>
                          <div className="flex flex-col items-center space-y-1">
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
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">Offer Summary</td>
                    {selectedSellers.map((seller) => (
                      <td key={seller.id} className="py-4 px-4 text-center">
                        <div className="space-y-3">
                          <div>
                            <div className="font-bold text-xl text-gray-900">{formatCurrency(seller.totalIncludingVat)}</div>
                            <div className="text-sm text-gray-600">Total Including VAT</div>
                          </div>
                          <button
                            onClick={() => onNegotiate(seller)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                          >
                            Negotiate
                          </button>
                        </div>
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium text-gray-900">Additional Offer</td>
                    {selectedSellers.map((seller) => (
                      <td key={seller.id} className="py-4 px-4 text-center">
                        <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                          <p className="text-blue-800 font-medium text-sm">
                            {seller.additionalOffer}
                          </p>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Mobile Card Stack View */}
        <div className="lg:hidden space-y-4">
          {selectedSellers.map((seller, index) => {
            const isBestOffer = bestTotalIndex !== -1 && index === bestTotalIndex;
            const isExpanded = expandedCard === seller.id;
            
            return (
              <div key={seller.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Card Header - Always Visible */}
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => toggleCard(seller.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewPdf(seller);
                        }}
                        className="font-bold text-lg text-blue-600 hover:text-blue-800 transition-colors underline text-left"
                      >
                        {seller.sellerName}
                      </button>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {isBestOffer && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <Trophy className="w-3 h-3 mr-1" />
                            Best Offer
                          </span>
                        )}
                        {seller.status === 'partial' && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Partial Offer
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <div className="font-bold text-xl text-gray-900">
                        {formatCurrency(seller.totalIncludingVat)}
                      </div>
                      <div className="text-sm text-gray-600">incl. VAT</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 space-y-4">
                    {/* VAT Breakdown */}
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Price Breakdown</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatCurrency(seller.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>VAT (20%):</span>
                          <span>{formatCurrency(seller.vat)}</span>
                        </div>
                        <div className="flex justify-between font-semibold border-t pt-1">
                          <span>Total:</span>
                          <span>{formatCurrency(seller.totalIncludingVat)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Offer */}
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                      <h4 className="font-medium text-blue-900 mb-1">Special Offer</h4>
                      <p className="text-blue-800 text-sm">{seller.additionalOffer}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onViewPdf(seller)}
                        className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center space-x-2"
                        style={{ minHeight: '44px' }}
                      >
                        <FileText className="w-4 h-4" />
                        <span>View PDF</span>
                      </button>
                      <button
                        onClick={() => onNegotiate(seller)}
                        className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center space-x-2"
                        style={{ minHeight: '44px' }}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Negotiate</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default HighLevelComparison;