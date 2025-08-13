import React from 'react';
import type { ProposalItem } from '../types';

interface ProposalItemsTableProps {
  items: ProposalItem[];
  onUpdateItem: (itemId: string, updates: Partial<ProposalItem>) => void;
  partialProposal: boolean;
}

export function ProposalItemsTable({ items, onUpdateItem, partialProposal }: ProposalItemsTableProps) {
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
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[200px]">Product Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[120px]">Brand</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[100px]">Origin</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 min-w-[120px]">Packaging</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[100px]">Quantity</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[120px]">Unit Price</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[120px]">Discount Type</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[120px]">Discount Value</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 min-w-[100px]">VAT %</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 min-w-[120px]">Before Discount</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 min-w-[120px]">After Discount</th>
            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 min-w-[140px]">Including VAT</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <div className="text-sm font-medium text-gray-900">{item.productName}</div>
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={item.brand}
                  onChange={(e) => handleInputChange(item.id, 'brand', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brand"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={item.origin}
                  onChange={(e) => handleInputChange(item.id, 'origin', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Origin"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={item.packaging}
                  onChange={(e) => handleInputChange(item.id, 'packaging', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Packaging"
                />
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleInputChange(item.id, 'quantity', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  min="0"
                  disabled={!partialProposal}
                />
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="number"
                  value={item.unitPrice}
                  onChange={(e) => handleInputChange(item.id, 'unitPrice', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </td>
              <td className="px-4 py-3 text-center">
                <select
                  value={item.discountType}
                  onChange={(e) => handleInputChange(item.id, 'discountType', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="percentage">%</option>
                  <option value="fixed">Fixed</option>
                </select>
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="number"
                  value={item.discountValue}
                  onChange={(e) => handleInputChange(item.id, 'discountValue', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
                  min="0"
                  step="0.01"
                  placeholder="0"
                />
              </td>
              <td className="px-4 py-3 text-center">
                <input
                  type="number"
                  value={item.vatPercentage}
                  onChange={(e) => handleInputChange(item.id, 'vatPercentage', e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center"
                  min="0"
                  max="100"
                  step="0.1"
                />
              </td>
              <td className="px-4 py-3 text-right">
                <div className="text-sm font-medium text-gray-900">
                  ${item.totalBeforeDiscount.toFixed(2)}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="text-sm font-medium text-gray-900">
                  ${item.totalAfterDiscount.toFixed(2)}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <div className="text-sm font-bold text-gray-900">
                  ${item.totalIncludingVAT.toFixed(2)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}