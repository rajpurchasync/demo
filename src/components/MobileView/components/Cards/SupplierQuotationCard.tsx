import React from 'react';
import { Calendar, FileText } from 'lucide-react';
import { SupplierQuotation } from '../../types/purchasync';
import { cn } from '../../utils/cn';

interface SupplierQuotationCardProps {
  quotation: SupplierQuotation;
  onClick?: () => void;
}

export function SupplierQuotationCard({ quotation, onClick }: SupplierQuotationCardProps) {
  const getStatusColor = () => {
    switch (quotation.status) {
      case 'received':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-gray-300',
        'border-gray-200'
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2 flex-1">
            <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">{quotation.title}</h3>
              <p className="text-xs text-gray-600 mt-0.5">RFQ: {quotation.rfqId}</p>
            </div>
          </div>
          <span className={cn(
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
            getStatusColor()
          )}>
            {quotation.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-3 h-3 mr-1" />
            <span className="font-medium">
              Submitted {formatDate(quotation.submittedDate)}
            </span>
          </div>
          {quotation.value && (
            <span className="text-green-600 font-semibold">
              AED {quotation.value.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}