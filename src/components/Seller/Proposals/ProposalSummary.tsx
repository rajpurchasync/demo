import React from 'react';

interface ProposalSummaryProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
  paymentTerms: string;
  onPaymentTermsChange: (terms: string) => void;
  shipmentMethod: string;
  onShipmentMethodChange: (method: string) => void;
  includeShipment: boolean;
  onIncludeShipmentChange: (include: boolean) => void;
  shipmentCharge: number;
  onShipmentChargeChange: (charge: number) => void;
  quotationValidityDate: string;
  onQuotationValidityDateChange: (date: string) => void;
  totals: {
    subtotal: number;
    totalDiscounts: number;
    totalVAT: number;
    finalTotal: number;
  };
}

export function ProposalSummary({
  currency,
  onCurrencyChange,
  paymentTerms,
  onPaymentTermsChange,
  shipmentMethod,
  onShipmentMethodChange,
  includeShipment,
  onIncludeShipmentChange,
  shipmentCharge,
  onShipmentChargeChange,
  quotationValidityDate,
  onQuotationValidityDateChange,
  totals
}: ProposalSummaryProps) {
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD'];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Proposal Summary</h3>
      
      <div className="space-y-6">
        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Currency *</label>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {currencies.map(curr => (
                <option key={curr} value={curr}>{curr}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quotation Validity Date *</label>
            <input
              type="date"
              value={quotationValidityDate}
              onChange={(e) => onQuotationValidityDateChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Payment & Shipment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
            <input
              type="text"
              value={paymentTerms}
              onChange={(e) => onPaymentTermsChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Net 30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Shipment Method</label>
            <input
              type="text"
              value={shipmentMethod}
              onChange={(e) => onShipmentMethodChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Direct Delivery"
            />
          </div>
        </div>

        {/* Shipment Charges */}
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeShipment}
              onChange={(e) => onIncludeShipmentChange(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Include Shipment Charge</span>
          </label>
          
          {includeShipment && (
            <div className="max-w-xs">
              <input
                type="number"
                value={shipmentCharge}
                onChange={(e) => onShipmentChargeChange(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          )}
        </div>

        {/* Financial Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{currency} {totals.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Discounts:</span>
              <span className="font-medium text-green-600">-{currency} {totals.totalDiscounts.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VAT:</span>
              <span className="font-medium">{currency} {totals.totalVAT.toFixed(2)}</span>
            </div>
            {includeShipment && shipmentCharge > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Shipment Charge:</span>
                <span className="font-medium">{currency} {shipmentCharge.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t border-gray-300 pt-3">
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-gray-900">Final Total Amount:</span>
                <span className="text-lg font-bold text-blue-600">{currency} {totals.finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}