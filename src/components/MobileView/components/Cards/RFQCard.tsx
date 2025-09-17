import React from 'react';
import { Calendar } from 'lucide-react';
import { RFQ } from '../../types/purchasync';
import { cn } from '../../utils/cn';

interface RFQCardProps {
  rfq: RFQ;
  onClick?: () => void;
}

export function RFQCard({ rfq, onClick }: RFQCardProps) {
  const getStatusColor = () => {
    switch (rfq.status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = new Date(rfq.dueDate) < new Date() && rfq.status !== 'closed';

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white border rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-gray-300',
        isOverdue ? 'border-red-200 bg-red-50' : 'border-gray-200'
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-gray-900 text-sm flex-1">{rfq.title}</h3>
          <span className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ml-3',
            getStatusColor()
          )}>
            {rfq.status}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600 font-medium">{rfq.id}</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-xs">
            {rfq.category}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className={isOverdue ? 'text-red-600 font-medium' : 'font-medium'}>
              Due {formatDate(rfq.dueDate)}
            </span>
          </div>
          <span className="text-gray-600 font-medium">
            {rfq.suppliersInvited} supplier{rfq.suppliersInvited !== 1 ? 's' : ''} invited
          </span>
        </div>
      </div>
    </div>
  );
}