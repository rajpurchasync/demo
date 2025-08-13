import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Check, Calculator } from 'lucide-react';
import type { RFQItem, ProposalItem } from '../types';

interface ItemQuoteModalProps {
  rfqItem: RFQItem;
  proposalItem: ProposalItem;
  itemIndex: number;
  totalItems: number;
  onSave: (item: ProposalItem) => void;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  onClose: () => void;
}

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain',
  'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark',
  'China', 'Japan', 'South Korea', 'India', 'Australia', 'New Zealand', 'Brazil',
  'Mexico', 'Argentina', 'Chile', 'South Africa', 'Turkey', 'UAE', 'Saudi Arabia'
];

export function ItemQuoteModal({
  rfqItem,
  proposalItem,
  itemIndex,
  totalItems,
  onSave,
  onNext,
  onPrevious,
  onFinish,
  onClose
}: ItemQuoteModalProps) {
  const [formData, setFormData] = useState<ProposalItem>(proposalItem);

  useEffect(() => {
    setFormData(proposalItem);
  }, [proposalItem]);

  const handleInputChange = (field: keyof ProposalItem, value: string | number) => {
    const numericFields = ['quantity', 'unitPrice', 'discountValue', 'vatPercentage'];
    const processedValue = numericFields.includes(field) ? Number(value) : value;
    
    const updatedItem = { ...formData, [field]: processedValue };
    
    // Recalculate totals
    const totalBeforeDiscount = updatedItem.quantity * updatedItem.unitPrice;
    const discountAmount = updatedItem.discountType === 'percentage' 
      ? (totalBeforeDiscount * updatedItem.discountValue / 100)
      : updatedItem.discountValue;
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;
    const vatAmount = totalAfterDiscount * (updatedItem.vatPercentage / 100);
    const totalIncludingVAT = totalAfterDiscount + vatAmount;

    const finalItem = {
      ...updatedItem,
      totalBeforeDiscount,
      totalAfterDiscount,
      totalIncludingVAT
    };

    setFormData(finalItem);
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleSaveAndNext = () => {
    onSave(formData);
    if (itemIndex < totalItems - 1) {
      onNext();
    } else {
      onFinish();
    }
  };

  const handleSaveAndPrevious = () => {
    onSave(formData);
    if (itemIndex > 0) {
      onPrevious();
    }
  };

  const isLastItem = itemIndex === totalItems - 1;
  const isFirstItem = itemIndex === 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Quote Item {itemIndex + 1} of {totalItems}</h3>
            <p className="text-sm text-gray-600 mt-1">{rfqItem.productName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Buyer Request Section */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-6">
            <h4 className="font-semibold text-blue-900 mb-3">Buyer Request (Locked)</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-blue-700 font-medium">Product:</span>
                <p className="text-blue-900">{rfqItem.productName}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">Quantity:</span>
                <p className="text-blue-900">{rfqItem.quantity.toLocaleString()} {rfqItem.uom}</p>
              </div>
              <div>
                <span className="text-blue-700 font-medium">UOM:</span>
                <p className="text-blue-900">{rfqItem.uom}</p>
              </div>
            </div>
          </div>

          {/* Seller Proposal Form */}
          <div className="bg-green-50 rounded-lg p-6 border border-green-200">
            <h4 className="font-semibold text-green-900 mb-4">Your Proposal Details</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SKU Number
                  </label>
                  <input
                    type="text"
                    value={formData.sku || ''}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter SKU number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Confirm or change product name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country of Origin *
                  </label>
                  <select
                    value={formData.origin}
                    onChange={(e) => handleInputChange('origin', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => handleInputChange('brand', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Packaging Details
                  </label>
                  <input
                    type="text"
                    value={formData.packaging}
                    onChange={(e) => handleInputChange('packaging', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., 24 pcs per carton"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleInputChange('quantity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Price * (USD)
                  </label>
                  <input
                    type="number"
                    value={formData.unitPrice}
                    onChange={(e) => handleInputChange('unitPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Type
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => handleInputChange('discountType', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      value={formData.discountValue}
                      onChange={(e) => handleInputChange('discountValue', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="0"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT % *
                  </label>
                  <input
                    type="number"
                    value={formData.vatPercentage}
                    onChange={(e) => handleInputChange('vatPercentage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    min="0"
                    max="100"
                    step="0.1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Computed Totals */}
            <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <Calculator className="w-5 h-5 text-gray-600" />
                <h5 className="font-semibold text-gray-900">Computed Totals</h5>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Before Discount:</span>
                  <p className="font-semibold text-gray-900">${formData.totalBeforeDiscount.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-gray-600">After Discount:</span>
                  <p className="font-semibold text-gray-900">${formData.totalAfterDiscount.toFixed(2)}</p>
                </div>
                <div>
                  <span className="text-gray-600">Including VAT:</span>
                  <p className="font-bold text-green-600 text-lg">${formData.totalIncludingVAT.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-2">
            {!isFirstItem && (
              <button
                onClick={handleSaveAndPrevious}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous Item
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <Check className="w-4 h-4" />
              Save Quote
            </button>
            
            {isLastItem ? (
              <button
                onClick={handleSaveAndNext}
                className="inline-flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Check className="w-4 h-4" />
                Finish Quoting
              </button>
            ) : (
              <button
                onClick={handleSaveAndNext}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Next Item
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}