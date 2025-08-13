import React from 'react';
import { X, Download, FileText, Building2, Calendar, MapPin } from 'lucide-react';
import type { RFQ, Proposal } from '../types';

interface QuotationPreviewModalProps {
  rfq: RFQ;
  proposal: Proposal;
  onClose: () => void;
}

export function QuotationPreviewModal({ rfq, proposal, onClose }: QuotationPreviewModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 h-5/6 flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Quotation Preview</h3>
              <p className="text-sm text-gray-500">{proposal.quotationNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* PDF-styled Quotation */}
          <div className="bg-white border border-gray-300 rounded-lg p-8 max-w-4xl mx-auto shadow-sm">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">QUOTATION</h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Professional Quote Document</p>
            </div>

            {/* Quotation Details */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Bill To
                </h3>
                <div className="space-y-2 text-sm">
                  <p className="font-medium text-gray-900">{rfq.customer?.name}</p>
                  <p className="text-gray-600">{rfq.customer?.businessType}</p>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-gray-600">{rfq.customer?.billingAddress || rfq.customer?.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Quotation Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quotation Number:</span>
                    <span className="font-medium">{proposal.quotationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quote Date:</span>
                    <span className="font-medium">{new Date(proposal.createdDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Valid Until:</span>
                    <span className="font-medium text-red-600">{new Date(proposal.quotationValidityDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">RFQ Reference:</span>
                    <span className="font-medium">{rfq.id}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quoted Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-300">SKU</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-300">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b border-gray-300">Brand</th>
                      <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 border-b border-gray-300">Qty</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b border-gray-300">Unit Price</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b border-gray-300">Discount</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b border-gray-300">After Discount</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b border-gray-300">VAT</th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border-b border-gray-300">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proposal.items.map((item, index) => (
                      <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200">{item.sku}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            {item.packaging && <p className="text-xs text-gray-500">{item.packaging}</p>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-b border-gray-200">{item.brand}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center border-b border-gray-200">{item.quantity.toLocaleString()}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right border-b border-gray-200">{proposal.currency} {item.unitPrice.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-green-600 text-right border-b border-gray-200">
                          {item.discountValue > 0 ? (
                            item.discountType === 'percentage' 
                              ? `-${item.discountValue}%`
                              : `-${proposal.currency} ${item.discountValue.toFixed(2)}`
                          ) : '-'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right border-b border-gray-200">{proposal.currency} {item.totalAfterDiscount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right border-b border-gray-200">{item.vatPercentage}%</td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right border-b border-gray-200">{proposal.currency} {item.totalIncludingVAT.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Summary */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                {/* Special Offers */}
                {proposal.additionalBenefits && (
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">Special Offers & Benefits</h4>
                    <p className="text-sm text-green-800">{proposal.additionalBenefits}</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">{proposal.currency} {proposal.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Discounts:</span>
                    <span className="font-medium text-green-600">-{proposal.currency} {proposal.totalDiscounts.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">VAT:</span>
                    <span className="font-medium">{proposal.currency} {proposal.totalVAT.toFixed(2)}</span>
                  </div>
                  {proposal.includeShipment && proposal.shipmentCharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipment:</span>
                      <span className="font-medium">{proposal.currency} {proposal.shipmentCharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-300 pt-2 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-900">Total Amount:</span>
                      <span className="text-lg font-bold text-blue-600">{proposal.currency} {proposal.finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-sm text-gray-700 whitespace-pre-line">{proposal.termsAndConditions}</p>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Terms</h4>
                <p className="text-sm text-gray-700">{proposal.paymentTerms}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Delivery Method</h4>
                <p className="text-sm text-gray-700">{proposal.shipmentMethod}</p>
              </div>
            </div>

            {/* Digital Approval Notice */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
              <p className="text-sm text-blue-800">
                <strong>Digital Approval Notice:</strong> This quotation is digitally generated and does not require a physical signature. 
                Acceptance of this quote constitutes agreement to the terms and conditions stated above.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}