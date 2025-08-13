import React from 'react';
import { Quote, CheckCircle, Clock } from 'lucide-react';
import type { RFQItem, ProposalItem } from '../types';

interface BuyerItemsListProps {
  rfqItems: RFQItem[];
  items: ProposalItem[];
  onQuoteItem: (rfqItem: RFQItem) => void;
}

export function BuyerItemsList({ rfqItems, items, onQuoteItem }: BuyerItemsListProps) {
  const getItemStatus = (rfqItemId: string) => {
    const proposalItem = items.find(item => item.rfqItemId === rfqItemId);
    return proposalItem && proposalItem.unitPrice > 0 ? 'quoted' : 'pending';
  };

  const getProposalItem = (rfqItemId: string) => {
    return items.find(item => item.rfqItemId === rfqItemId);
  };

  return (
    <div className="p-4">
      <div className="space-y-3">
        {rfqItems.map((rfqItem, index) => {
          const status = getItemStatus(rfqItem.id);
          const proposalItem = getProposalItem(rfqItem.id);
          
          return (
            <div
              key={rfqItem.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      {status === 'quoted' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-amber-600" />
                      )}
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        status === 'quoted' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {status === 'quoted' ? 'Quoted' : 'Pending Quote'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 mb-1">{rfqItem.productName}</h4>
                      <div className="space-y-1 text-xs text-gray-600">
                        <p><span className="font-medium">Quantity:</span> {rfqItem.quantity.toLocaleString()} {rfqItem.uom}</p>
                      </div>
                    </div>
                    
                    {status === 'quoted' && proposalItem && (
                      <>
                        <div className="space-y-1 text-xs text-gray-600">
                          <p><span className="font-medium">Brand:</span> {proposalItem.brand || 'Not specified'}</p>
                          <p><span className="font-medium">Origin:</span> {proposalItem.origin || 'Not specified'}</p>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-600">
                          <p><span className="font-medium">Unit Price:</span> ${proposalItem.unitPrice.toFixed(2)}</p>
                          <p><span className="font-medium">Discount:</span> {
                            proposalItem.discountValue > 0 
                              ? `${proposalItem.discountValue}${proposalItem.discountType === 'percentage' ? '%' : ' USD'}`
                              : 'None'
                          }</p>
                        </div>
                        
                        <div className="space-y-1 text-xs text-gray-600">
                          <p><span className="font-medium">VAT:</span> {proposalItem.vatPercentage}%</p>
                          <p><span className="font-medium text-blue-600">Total:</span> <span className="font-bold text-blue-600 text-sm">${proposalItem.totalIncludingVAT.toFixed(2)}</span></p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="ml-4">
                  <button
                    onClick={() => onQuoteItem(rfqItem)}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      status === 'quoted'
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <Quote className="w-4 h-4" />
                    {status === 'quoted' ? 'Edit Quote' : 'Quote Item'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}