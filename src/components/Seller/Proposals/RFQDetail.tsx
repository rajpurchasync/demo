import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, X, FileText, Download, Eye } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { RejectModal } from './RejectModal';
import { AttachmentModal } from './AttachmentModal';
import type { RFQ, RFQStatus } from '../types';

interface RFQDetailProps {
  rfq: RFQ;
  onBack: () => void;
  onCreateProposal: () => void;
  onStatusUpdate: (rfqId: string, status: RFQStatus, comment?: string) => void;
}

export function RFQDetail({ rfq, onBack, onCreateProposal, onStatusUpdate }: RFQDetailProps) {
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState(false);

  const handleRejectConfirm = (comment: string) => {
    onStatusUpdate(rfq.id, 'rejected', comment);
    setShowRejectModal(false);
  };

  const getAttachmentIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'excel':
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{rfq.id}</h1>
                <h2 className="text-xl text-gray-600 mb-4">{rfq.title}</h2>
              </div>
              <div className="flex items-center gap-4">
                <StatusBadge status={rfq.status} />
                <div className="flex gap-2">
                  {rfq.status === 'accepted' && (
                    <>
                      <button
                        onClick={onCreateProposal}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        Create Proposal
                      </button>
                      <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                        <MessageCircle className="w-4 h-4" />
                        Chat with Buyer
                      </button>
                      <button
                        onClick={() => setShowRejectModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      >
                        <X className="w-4 h-4" />
                        Reject RFQ
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - RFQ Summary and Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* RFQ Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">RFQ Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">RFQ Number:</span>
                    <span className="font-medium">{rfq.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created Date:</span>
                    <span className="font-medium">{new Date(rfq.createdDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Purchase Type:</span>
                    <span className="font-medium">{rfq.purchaseType}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Terms:</span>
                    <span className="font-medium">{rfq.paymentTerms}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Date:</span>
                    <span className="font-medium">{new Date(rfq.deliveryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deadline:</span>
                    <span className="font-medium text-red-600">{new Date(rfq.deadline).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RFQ Items */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">RFQ Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Product Name</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">UOM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rfq.items.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-gray-900">{item.productName}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">{item.quantity.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.uom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column - Comments and Attachments */}
          <div className="space-y-6">
            {/* Buyer Comments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Buyer Comments</h3>
              <div className="text-gray-700">
                {expandedComments || rfq.buyerComments.length <= 150 ? (
                  <p>{rfq.buyerComments}</p>
                ) : (
                  <p>
                    {rfq.buyerComments.substring(0, 150)}...
                    <button
                      onClick={() => setExpandedComments(true)}
                      className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                    >
                      Read more
                    </button>
                  </p>
                )}
                {expandedComments && rfq.buyerComments.length > 150 && (
                  <button
                    onClick={() => setExpandedComments(false)}
                    className="text-blue-600 hover:text-blue-800 ml-1 font-medium"
                  >
                    Show less
                  </button>
                )}
              </div>

              {rfq.rejectionComment && (
                <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="text-sm font-semibold text-red-800 mb-1">Rejection Comment:</h4>
                  <p className="text-sm text-red-700">{rfq.rejectionComment}</p>
                </div>
              )}
            </div>

            {/* Attachments */}
            {rfq.attachments.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
                <div className="space-y-3">
                  {rfq.attachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      {getAttachmentIcon(attachment.type)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{attachment.name}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setSelectedAttachment(attachment.id)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showRejectModal && (
        <RejectModal
          rfq={rfq}
          onConfirm={handleRejectConfirm}
          onCancel={() => setShowRejectModal(false)}
        />
      )}

      {selectedAttachment && (
        <AttachmentModal
          attachmentId={selectedAttachment}
          onClose={() => setSelectedAttachment(null)}
        />
      )}
    </div>
  );
}