import React from 'react';
import { X, FileText, Download, Printer as Print } from 'lucide-react';
import { SellerOffer } from '../types';

interface PdfModalProps {
  seller: SellerOffer | null;
  isOpen: boolean;
  onClose: () => void;
}

const PdfModal: React.FC<PdfModalProps> = ({ seller, isOpen, onClose }) => {
  if (!isOpen || !seller) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const quoteNumber = `QT-${seller.id.toUpperCase()}-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
  const quoteDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const validityDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const shipmentAmount = 250; // Fixed shipping cost
  const grandTotal = seller.totalIncludingVat + shipmentAmount;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full h-full sm:max-w-6xl sm:max-h-[90vh] sm:rounded-lg flex flex-col shadow-2xl">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Quotation - {quoteNumber}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{seller.sellerName}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">
              <Download className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors hidden sm:block">
              <Print className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 bg-gray-50 overflow-auto">
          <div className="bg-white p-4 sm:p-8 shadow-sm max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 pb-6 border-b-2 border-blue-600">
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">QUOTATION</h1>
              <div className="text-base sm:text-lg font-semibold text-gray-800">{seller.sellerName}</div>
            </div>

            {/* Quote Details and Seller Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mb-8">
              {/* Quote Details - Inline Format */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">Quote Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-900">Quote Number: </span>
                    <span className="text-gray-700">{quoteNumber}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Quote Date: </span>
                    <span className="text-gray-700">{quoteDate}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Quote Validity: </span>
                    <span className="text-gray-700">{validityDate}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900">Payment Terms: </span>
                    <span className="text-gray-700">Net 30 Days</span>
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">Offered By</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold text-gray-900">{seller.sellerName}</div>
                  <div className="text-gray-700">1234 Business Avenue, Suite 100</div>
                  <div className="text-gray-700">New York, NY 10001</div>
                  <div className="text-gray-700">Phone: +1 (555) 123-4567</div>
                  <div className="text-gray-700">VAT ID: US-VAT-{seller.id.toUpperCase()}123</div>
                </div>
              </div>
            </div>

            {/* Billing and Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-8">
              {/* Billing To */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Billing To:</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold text-gray-900">TechCorp Industries Ltd.</div>
                  <div className="text-gray-700">5678 Corporate Drive</div>
                  <div className="text-gray-700">San Francisco, CA 94105</div>
                  <div className="text-gray-700">United States</div>
                </div>
              </div>

              {/* Ship To */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Ship To:</h3>
                <div className="space-y-1 text-sm">
                  <div className="font-semibold text-gray-900">TechCorp Warehouse</div>
                  <div className="text-gray-700">9012 Distribution Center</div>
                  <div className="text-gray-700">Oakland, CA 94607</div>
                  <div className="text-gray-700">United States</div>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-base sm:text-lg">Quote Items</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-blue-50">
                      <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Sr.</th>
                      <th className="border border-gray-300 px-3 py-3 text-left font-semibold">SKU</th>
                      <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Product Description</th>
                      <th className="border border-gray-300 px-3 py-3 text-left font-semibold">Brand</th>
                      <th className="border border-gray-300 px-3 py-3 text-center font-semibold">Quantity</th>
                      <th className="border border-gray-300 px-3 py-3 text-center font-semibold">UOM</th>
                      <th className="border border-gray-300 px-3 py-3 text-right font-semibold">Base Rate</th>
                      <th className="border border-gray-300 px-3 py-3 text-right font-semibold">Discount</th>
                      <th className="border border-gray-300 px-3 py-3 text-right font-semibold">Total (after Discount)</th>
                      <th className="border border-gray-300 px-3 py-3 text-right font-semibold">VAT</th>
                      <th className="border border-gray-300 px-3 py-3 text-right font-semibold">Total (incl. VAT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {seller.items.map((item, index) => {
                      const baseRate = item.unitPrice * 1.1; // Simulate original price before discount
                      const discount = baseRate - item.unitPrice;
                      const totalAfterDiscount = item.totalPrice;
                      const vatAmount = item.totalPrice * 0.2; // 20% VAT
                      const totalInclVat = item.totalPrice * 1.2;
                      const sku = `SKU-${item.id.toUpperCase().replace('-', '')}`;
                      const brand = item.itemName.includes('Dell') ? 'Dell' : 
                                   item.itemName.includes('HP') ? 'HP' : 
                                   item.itemName.includes('Office') ? 'ErgoMax' : 'TechPro';

                      return (
                        <tr key={item.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}>
                          <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                          <td className="border border-gray-300 px-3 py-2 font-mono text-xs">{sku}</td>
                          <td className="border border-gray-300 px-3 py-2">{item.itemName}</td>
                          <td className="border border-gray-300 px-3 py-2">{brand}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">{item.quantity}</td>
                          <td className="border border-gray-300 px-3 py-2 text-center">PCS</td>
                          <td className="border border-gray-300 px-3 py-2 text-right">{formatCurrency(baseRate)}</td>
                          <td className="border border-gray-300 px-3 py-2 text-right text-green-600">
                            -{formatCurrency(discount)}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-right font-semibold">
                            {formatCurrency(totalAfterDiscount)}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-right">
                            {formatCurrency(vatAmount)}
                          </td>
                          <td className="border border-gray-300 px-3 py-2 text-right font-semibold">
                            {formatCurrency(totalInclVat)}
                          </td>
                        </tr>
                      );
                    })}
                    {/* Total Row */}
                    <tr className="bg-blue-50 border-t-2 border-blue-200">
                      <td colSpan={8} className="border border-gray-300 px-3 py-3 text-right font-bold text-gray-900">
                        TOTAL:
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-right font-bold text-blue-600">
                        {formatCurrency(seller.totalAmount)}
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-right font-bold text-blue-600">
                        {formatCurrency(seller.vat)}
                      </td>
                      <td className="border border-gray-300 px-3 py-3 text-right font-bold text-blue-600">
                        {formatCurrency(seller.totalIncludingVat)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mb-8">
              <div className="w-full sm:w-96">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="space-y-3">
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="font-bold text-gray-900">{formatCurrency(seller.totalIncludingVat)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3">
                      <span className="font-semibold text-gray-900">Shipment Amount (Incl. VAT):</span>
                      <span className="font-semibold text-gray-900">{formatCurrency(shipmentAmount)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-3 text-xl">
                      <span className="font-bold text-blue-600">Grand Total (Including Shipment):</span>
                      <span className="font-bold text-blue-600">{formatCurrency(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Offer */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Special Offer</h3>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                <p className="text-blue-800 font-medium">{seller.additionalOffer}</p>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Terms & Conditions</h3>
              <div className="text-sm text-gray-700 space-y-2 bg-gray-50 p-4 rounded-lg">
                <p>1. Payment terms: Net 30 days from invoice date.</p>
                <p>2. Delivery: 5-7 business days from order confirmation.</p>
                <p>3. Warranty: All items come with manufacturer's standard warranty.</p>
                <p>4. Returns: Items must be returned within 30 days in original condition.</p>
              </div>
            </div>

            {/* Digital Approval Note */}
            <div className="text-center py-6 border-t border-gray-200">
              <div className="inline-flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-800 font-medium">
                  This document is digitally approved and does not require a signature
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
              <p>Generated on {new Date().toLocaleString()} | {seller.sellerName} | Quote ID: {quoteNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;