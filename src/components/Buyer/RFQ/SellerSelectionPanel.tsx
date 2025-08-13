import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { SellerOffer } from '../types';

interface SellerSelectionPanelProps {
  sellers: SellerOffer[];
  selectedSellers: string[];
  onSellerToggle: (sellerId: string) => void;
  onCompare: () => void;
  onViewPdf: (seller: SellerOffer) => void;
  showMaxSelectionModal: boolean;
  onCloseModal: () => void;
}

const SellerSelectionPanel: React.FC<SellerSelectionPanelProps> = ({
  sellers,
  selectedSellers,
  onSellerToggle,
  onCompare,
  onViewPdf,
  showMaxSelectionModal,
  onCloseModal,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile-First Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4 sm:px-6">
          <h1 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
            Select Sellers to Compare
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Choose up to 3 sellers to compare their proposals
          </p>
          <div className="mt-3 text-xs sm:text-sm text-gray-500">
            {selectedSellers.length} of 3 sellers selected
          </div>
        </div>
      </div>

      {/* Mobile-First Seller Cards */}
      <div className="px-4 py-4 sm:px-6 space-y-3 sm:space-y-4">
        {sellers.map((seller) => (
          <div
            key={seller.id}
            className={`bg-white rounded-lg border-2 transition-all duration-200 ${
              selectedSellers.includes(seller.id)
                ? 'border-blue-500 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div className="p-4">
              {/* Mobile Card Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`w-6 h-6 rounded border-2 flex items-center justify-center mt-1 ${
                    selectedSellers.includes(seller.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    <div 
                      onClick={() => onSellerToggle(seller.id)} 
                      className="w-full h-full flex items-center justify-center cursor-pointer"
                    >
                      {selectedSellers.includes(seller.id) && (
                        <Check className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => onViewPdf(seller)}
                      className="font-semibold text-blue-600 hover:text-blue-800 transition-colors text-left text-base sm:text-lg underline"
                    >
                      {seller.sellerName}
                    </button>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      {seller.status === 'partial' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Partial Offer
                        </span>
                      )}
                      <span className="text-xs sm:text-sm text-gray-500">
                        {seller.items.length} items
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-3">
                  <div className="font-bold text-lg sm:text-xl text-gray-900">
                    {formatCurrency(seller.totalIncludingVat)}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    incl. VAT
                  </div>
                </div>
              </div>
              
              {/* Mobile Additional Offer */}
              <div className="pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Additional Offer:</span> {seller.additionalOffer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <button
          onClick={onCompare}
          disabled={selectedSellers.length === 0}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-base transition-all duration-200 ${
            selectedSellers.length === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg active:scale-95'
          }`}
          style={{ minHeight: '44px' }}
        >
          Compare {selectedSellers.length}/3 Sellers
        </button>
      </div>

      {/* Mobile Full-Screen Modal */}
      {showMaxSelectionModal && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center max-w-sm">
              <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Selection Limit Reached</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                You can compare up to 3 sellers at a time. Please deselect a seller to choose a different one.
              </p>
            </div>
          </div>
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onCloseModal}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              style={{ minHeight: '44px' }}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerSelectionPanel;