import React, { useState } from 'react';
import { X, Calendar, CheckCircle } from 'lucide-react';
import type { RFQ } from '../types';

interface AcceptConfirmModalProps {
  rfq: RFQ;
  onConfirm: (quotationValidityDate: string) => void;
  onCancel: () => void;
}

export function AcceptConfirmModal({ rfq, onConfirm, onCancel }: AcceptConfirmModalProps) {
  const [quotationValidityDate, setQuotationValidityDate] = useState('');

  // Set minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quotationValidityDate) {
      onConfirm(quotationValidityDate);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Accept RFQ</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              You are about to accept RFQ <span className="font-medium text-gray-900">{rfq.id}</span>. 
              Please set the quotation validity date for your proposal.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
              <h4 className="font-medium text-blue-900 mb-2">RFQ Summary</h4>
              <div className="space-y-1 text-sm text-blue-800">
                <p><span className="font-medium">Title:</span> {rfq.title}</p>
                <p><span className="font-medium">Customer:</span> {rfq.customer?.name}</p>
                <p><span className="font-medium">Items:</span> {rfq.items.length} items</p>
                <p><span className="font-medium">Delivery Date:</span> {new Date(rfq.deliveryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Quotation Validity Date *
            </label>
            <input
              type="date"
              value={quotationValidityDate}
              onChange={(e) => setQuotationValidityDate(e.target.value)}
              min={minDate}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This date will be included in your quotation and represents how long your pricing is valid.
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium"
            >
              Accept & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}