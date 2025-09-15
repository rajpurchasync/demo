import React from 'react';
import { MessageCircle, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isFromSupplier: boolean;
}

interface SupplierMessagesSectionProps {
  supplierName: string;
}

export function SupplierMessagesSection({ supplierName }: SupplierMessagesSectionProps) {
  // Mock messages for this specific supplier
  const messages: Message[] = [
    {
      id: '1',
      sender: supplierName,
      content: 'Thank you for your interest in our products. We have received your RFQ and will respond within 24 hours.',
      timestamp: '2 hours ago',
      isFromSupplier: true
    },
    {
      id: '2',
      sender: 'You',
      content: 'Could you please provide more details about your organic certification process?',
      timestamp: '1 day ago',
      isFromSupplier: false
    },
    {
      id: '3',
      sender: supplierName,
      content: 'We are ISO 22000 certified and follow strict organic farming practices. I can send you our certification documents.',
      timestamp: '1 day ago',
      isFromSupplier: true
    },
    {
      id: '4',
      sender: 'You',
      content: 'That would be great. Also, what are your minimum order quantities?',
      timestamp: '2 days ago',
      isFromSupplier: false
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Recent Messages</h3>
        <button className="text-xs text-purple-600 hover:text-purple-700 font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.isFromSupplier 
                ? 'bg-blue-50 border border-blue-200' 
                : 'bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-900">
                  {message.sender}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {message.timestamp}
              </div>
            </div>
            <p className="text-sm text-gray-700">{message.content}</p>
          </div>
        ))}
      </div>
      
      {messages.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No messages yet</p>
          <p className="text-xs mt-1">Messages with {supplierName} will appear here.</p>
        </div>
      )}
    </div>
  );
}