import React from 'react';
import { Lock } from 'lucide-react';
import type { RFQItem, ProposalItem } from '../types';

interface SideBySideProposalTableProps {
  rfqItems: RFQItem[];
  items: ProposalItem[];
  onUpdateItem: (itemId: string, updates: Partial<ProposalItem>) => void;
}

export function SideBySideProposalTable({ rfqItems, items, onUpdateItem }: SideBySideProposalTableProps) {
  const handleInputChange = (itemId: string, field: keyof ProposalItem, value: string | number) => {
    const numericFields = ['quantity', 'unitPrice', 'discountValue', 'vatPercentage'];
    const processedValue = numericFields.includes(field) ? Number(value) : value;
    onUpdateItem(itemId, { [field]: processedValue });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {/* Buyer Request Section */}
            <th colSpan={3} className="px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-blue-50 border-r-2 border-blue-200">
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                Buyer Request (Locked)
              </div>
            </th>
            {/* Seller Proposal Section */}
            <th colSpan={9} className="px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-green-50">
              Seller Proposal (Editable)
            </th>
          </tr>
          <tr>
            {/* Buyer columns */}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-blue-50 min-w-[200px]">Product Name</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-blue-50 min-w-[100px]">Quantity</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-blue-50 border-r-2 border-blue-200 min-w-[80px]">UOM</th>
            
            {/* Seller columns */}
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-green-50 min-w-[80px]">SKU</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-green-50 min-w-[200px]">Product Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-green-50 min-w-[120px]">Brand</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-green-50 min-w-[100px]">Origin</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 bg-green-50 min-w-[120px]">Packaging</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-green-50 min-w-[100px]">Quantity</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-green-50 min-w-[120px]">Unit Price</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 bg-green-50 min-w-[120px]">Discount</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 bg-green-50 min-w-[140px]">Total Inc. VAT</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item, index) => {
            const rfqItem = rfqItems.find(r => r.id === item.rfqItemId);
            return (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {/* Buyer Request Columns (Locked) */}
                <td className="px-4 py-3 bg-blue-50 border-r border-blue-100">
                  <div className="text-sm font-medium text-blue-900">{rfqItem?.productName}</div>
                </td>
                <td className="px-4 py-3 bg-blue-50 border-r border-blue-100 text-center">
                  <div className="text-sm font-medium text-blue-900">{rfqItem?.quantity.toLocaleString()}</div>
                </td>
                <td className="px-4 py-3 bg-blue-50 border-r-2 border-blue-200">
                  <div className="text-sm font-medium text-blue-900">{rfqItem?.uom}</div>
                </td>

                {/* Seller Proposal Columns (Editable) */}
                <td className="px-4 py-3 bg-green-50">
                  <input
                    type="text"
                    value={item.sku || ''}
                    onChange={(e) => handleInputChange(item.id, 'sku', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="SKU"
                  />
                </td>
                <td className="px-4 py-3 bg-green-50">
                  <input
                    type="text"
                    value={item.productName}
                    onChange={(e) => handleInputChange(item.id, 'productName', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="Product Name"
                  />
                </td>
                <td className="px-4 py-3 bg-green-50">
                  <input
                    type="text"
                    value={item.brand}
                    onChange={(e) => handleInputChange(item.id, 'brand', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="Brand"
                  />
                </td>
                <td className="px-4 py-3 bg-green-50">
                  <input
                    type="text"
                    value={item.origin}
                    onChange={(e) => handleInputChange(item.id, 'origin', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="Origin"
                  />
                </td>
                <td className="px-4 py-3 bg-green-50">
                  <input
                    type="text"
                    value={item.packaging}
                    onChange={(e) => handleInputChange(item.id, 'packaging', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    placeholder="Packaging"
                  />
                </td>
                <td className="px-4 py-3 bg-green-50 text-center">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-center bg-white"
                    min="0"
                  />
                </td>
                <td className="px-4 py-3 bg-green-50 text-center">
                  <input
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleInputChange(item.id, 'unitPrice', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-right bg-white"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                  />
                </td>
                <td className="px-4 py-3 bg-green-50 text-center">
                  <div className="flex gap-1">
                    <select
                      value={item.discountType}
                      onChange={(e) => handleInputChange(item.id, 'discountType', e.target.value)}
                      className="w-16 px-1 py-1 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                    >
                      <option value="percentage">%</option>
                      <option value="fixed">$</option>
                    </select>
                    <input
                      type="number"
                      value={item.discountValue}
                      onChange={(e) => handleInputChange(item.id, 'discountValue', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent text-right bg-white"
                      min="0"
                      step="0.01"
                      placeholder="0"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 bg-green-50 text-right">
                  <div className="text-sm font-bold text-green-900">
                    ${item.totalIncludingVAT.toFixed(2)}
                  </div>
                  <div className="text-xs text-green-700">
                    VAT: {item.vatPercentage}%
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}