import React from 'react';
import { ArrowLeft, Download, RotateCcw, FileText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import type { Proposal } from '../types';

interface ProposalViewProps {
  proposal: Proposal;
  onBack: () => void;
}

export function ProposalView({ proposal, onBack }: ProposalViewProps) {
  const handleRecall = () => {
    // Simulate recall action
    alert('Recall request sent to buyer. Status updated to "Recall Pending". You will be notified once the buyer responds.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposal {proposal.id}</h1>
                <h2 className="text-xl text-gray-600 mb-4">RFQ: {proposal.rfqId}</h2>
                <p className="text-sm text-gray-500">Quotation: {proposal.quotationNumber}</p>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={proposal.status} type="proposal" />
                <div className="flex gap-2">
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  {proposal.status === 'submitted' && (
                    <button
                      onClick={handleRecall}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Request Recall
                    </button>
                  )}
                  {proposal.status === 'recall-pending' && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg font-medium">
                      <RotateCcw className="w-4 h-4" />
                      Recall Pending
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Proposal Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Proposal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <span className="text-sm text-gray-600">Status:</span>
              <div className="mt-1">
                <StatusBadge status={proposal.status} type="proposal" />
              </div>
            </div>
            <div>
              <span className="text-sm text-gray-600">Currency:</span>
              <p className="font-medium text-gray-900">{proposal.currency}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Payment Terms:</span>
              <p className="font-medium text-gray-900">{proposal.paymentTerms}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Shipment Method:</span>
              <p className="font-medium text-gray-900">{proposal.shipmentMethod}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Quotation Validity:</span>
              <p className="font-medium text-red-600">{new Date(proposal.quotationValidityDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Created Date:</span>
              <p className="font-medium text-gray-900">{new Date(proposal.createdDate).toLocaleDateString()}</p>
            </div>
            {proposal.submittedDate && (
              <div>
                <span className="text-sm text-gray-600">Submitted Date:</span>
                <p className="font-medium text-gray-900">{new Date(proposal.submittedDate).toLocaleDateString()}</p>
              </div>
            )}
          </div>
          
          {/* Additional Benefits */}
          {proposal.additionalBenefits && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="text-sm font-semibold text-green-800 mb-2">Additional Benefits & Offers</h4>
              <p className="text-sm text-green-700">{proposal.additionalBenefits}</p>
            </div>
          )}
        </div>

        {/* Proposal Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
          
          {/* Mock PDF-like display */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FileText className="w-6 h-6 text-blue-500" />
                  <h4 className="text-xl font-bold text-gray-900">PROPOSAL QUOTATION</h4>
                </div>
                <p className="text-gray-600">{proposal.quotationNumber}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Proposal Information</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Proposal ID:</span>
                        <span className="font-medium">{proposal.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">RFQ Reference:</span>
                        <span className="font-medium">{proposal.rfqId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Currency:</span>
                        <span className="font-medium">{proposal.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Terms:</span>
                        <span className="font-medium">{proposal.paymentTerms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Valid Until:</span>
                        <span className="font-medium text-red-600">{new Date(proposal.quotationValidityDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 mb-3">Financial Breakdown</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{proposal.currency} {proposal.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Discounts:</span>
                        <span className="font-medium text-green-600">-{proposal.currency} {proposal.totalDiscounts.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT:</span>
                        <span className="font-medium">{proposal.currency} {proposal.totalVAT.toFixed(2)}</span>
                      </div>
                      {proposal.includeShipment && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipment:</span>
                          <span className="font-medium">{proposal.currency} {proposal.shipmentCharge.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between">
                        <span className="font-semibold text-gray-900">Total Amount:</span>
                        <span className="font-bold text-blue-600 text-lg">{proposal.currency} {proposal.finalTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800 text-center">
                    This quotation is valid until {new Date(proposal.quotationValidityDate).toLocaleDateString()}. 
                    Digital approval - no signature required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}