import React from 'react';
import { X, FileText, Send } from 'lucide-react';
import type { RFQ, Proposal } from '../types';

interface SubmitConfirmModalProps {
  rfq: RFQ;
  proposal: Proposal;
  totals: {
    subtotal: number;
    totalDiscounts: number;
    totalVAT: number;
    finalTotal: number;
  };
  currency: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubmitConfirmModal({ rfq, proposal, totals, currency, onConfirm, onCancel }: SubmitConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Send className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Submit Proposal Confirmation</h3>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              You are about to submit your proposal. Please review the summary below:
            </p>
            
            {/* RFQ & Proposal Info */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
              <h4 className="font-medium text-blue-900 mb-3">Proposal Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                <div>
                  <p><span className="font-medium">RFQ:</span> {rfq.id}</p>
                  <p><span className="font-medium">Customer:</span> {rfq.customer?.name}</p>
                  <p><span className="font-medium">Items:</span> {proposal.items.length} items</p>
                </div>
                <div>
                  <p><span className="font-medium">Quotation #:</span> {proposal.quotationNumber}</p>
                  <p><span className="font-medium">Valid Until:</span> {new Date(proposal.quotationValidityDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">Currency:</span> {proposal.currency}</p>
                </div>
              </div>
            </div>
            
            {/* Mock PDF Preview */}
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <h4 className="font-medium text-gray-900">Proposal Quotation Preview</h4>
                  <p className="text-sm text-gray-500">Generated PDF preview</p>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center mb-4">
                  <h5 className="font-bold text-lg">PROPOSAL QUOTATION</h5>
                  <p className="text-sm text-gray-600">{proposal.quotationNumber}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{currency} {totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discounts:</span>
                    <span>-{currency} {totals.totalDiscounts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT:</span>
                    <span>{currency} {totals.totalVAT.toFixed(2)}</span>
                  </div>
                  {proposal.includeShipment && proposal.shipmentCharge > 0 && (
                    <div className="flex justify-between">
                      <span>Shipment:</span>
                      <span>{currency} {proposal.shipmentCharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-bold text-blue-600">
                    <span>Total Amount:</span>
                    <span>{currency} {totals.finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> Once submitted, this proposal will be sent to the buyer and cannot be edited without recall approval. 
                You can request a recall, but it requires buyer approval to make changes.
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-2 px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
            >
              <Send className="w-4 h-4" />
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}