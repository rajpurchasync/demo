import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Package, Clock, Building2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { AcceptConfirmModal } from './AcceptConfirmModal';
import { RejectModal } from './RejectModal';
import type { RFQ } from '../types';

interface RFQPreviewProps {
  rfq: RFQ;
  onBack: () => void;
  onAccept: (quotationValidityDate: string) => void;
  onReject: (comment: string) => void;
}

export function RFQPreview({ rfq, onBack, onAccept, onReject }: RFQPreviewProps) {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleAcceptConfirm = (quotationValidityDate: string) => {
    onAccept(quotationValidityDate);
    setShowAcceptModal(false);
  };

  const handleRejectConfirm = (comment: string) => {
    onReject(comment);
    setShowRejectModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
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
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">RFQ Preview</h1>
                <p className="text-gray-600">Review the details before accepting or rejecting this RFQ</p>
              </div>
              <StatusBadge status={rfq.status} />
            </div>

            {/* RFQ Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* RFQ Details Card */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">RFQ Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">RFQ Number</p>
                    <p className="text-blue-900 font-semibold">{rfq.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Title</p>
                    <p className="text-blue-900">{rfq.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Items Count</p>
                    <p className="text-blue-900 font-semibold">{rfq.items.length} items</p>
                  </div>
                </div>
              </div>

              {/* Customer Card */}
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">Customer Info</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-green-700 font-medium">Business Type</p>
                    <p className="text-green-900 font-semibold">{rfq.customer?.businessType || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-700 font-medium">General Location</p>
                    <p className="text-green-900">Available after acceptance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-green-700 italic">Full details revealed upon RFQ acceptance</p>
                  </div>
                </div>
              </div>

              {/* Purchase Details Card */}
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-900">Purchase Details</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Purchase Type</p>
                    <p className="text-purple-900 font-semibold">{rfq.purchaseType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Payment Terms</p>
                    <p className="text-purple-900">{rfq.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Number of Items</p>
                    <p className="text-purple-900 font-semibold">{rfq.items.length} items</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-amber-600" />
                <h3 className="text-lg font-semibold text-amber-900">Important Dates</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-amber-700 font-medium">Created Date</p>
                  <p className="text-amber-900">{new Date(rfq.createdDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-medium">Delivery Date</p>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <p className="text-amber-900 font-semibold">{new Date(rfq.deliveryDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-amber-700 font-medium">Response Deadline</p>
                  <p className="text-red-600 font-semibold">{new Date(rfq.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* RFQ Items Preview */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Requested Items Overview</h3>
              <div className="space-y-3">
                {rfq.items.map((item, index) => (
                  <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.productName}</p>
                        <p className="text-sm text-gray-600">Item #{index + 1}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{item.quantity.toLocaleString()} {item.uom}</p>
                        <p className="text-sm text-gray-600">Quantity</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-8">
              <h4 className="font-medium text-blue-900 mb-2">Privacy Notice</h4>
              <p className="text-sm text-blue-800">
                Customer name and exact location details will be revealed only after you accept this RFQ. 
                This protects buyer privacy while allowing you to evaluate the business opportunity.
              </p>
            </div>

            {/* Buyer Comments Preview */}
            {rfq.buyerComments && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Buyer Requirements</h3>
                <p className="text-gray-700">{rfq.buyerComments}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowRejectModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                Reject RFQ
              </button>
              <button
                onClick={() => setShowAcceptModal(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Accept RFQ
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAcceptModal && (
        <AcceptConfirmModal
          rfq={rfq}
          onConfirm={handleAcceptConfirm}
          onCancel={() => setShowAcceptModal(false)}
        />
      )}

      {showRejectModal && (
        <RejectModal
          rfq={rfq}
          onConfirm={handleRejectConfirm}
          onCancel={() => setShowRejectModal(false)}
        />
      )}
    </div>
  );
}