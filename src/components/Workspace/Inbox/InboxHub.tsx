import React from 'react';
import { Mail, Search, Archive, Trash2, Star, Clock, MessageCircle } from 'lucide-react';

const InboxHub = () => {
  const messages = [
    {
      id: 1,
      sender: 'John Mitchell',
      company: 'Acme Corp',
      subject: 'Contract Amendment Request',
      preview: 'Hi team, we need to discuss some amendments to the current contract terms...',
      time: '2m ago',
      unread: true,
      starred: false,
      priority: 'high',
      type: 'email'
    },
    {
      id: 2,
      sender: 'Sarah Chen',
      company: 'TechPro Solutions',
      subject: 'Quotation Follow-up',
      preview: 'Thank you for your RFQ. We have prepared a detailed quotation for your review...',
      time: '15m ago',
      unread: true,
      starred: true,
      priority: 'medium',
      type: 'whatsapp'
    },
    {
      id: 3,
      sender: 'Mike Rodriguez',
      company: 'Global Manufacturing',
      subject: 'Delivery Schedule Update',
      preview: 'I wanted to update you on the delivery schedule for your recent order...',
      time: '1h ago',
      unread: false,
      starred: false,
      priority: 'low',
      type: 'email'
    },
    {
      id: 4,
      sender: 'Lisa Wang',
      company: 'Premier Logistics',
      subject: 'Shipping Confirmation',
      preview: 'Your order #12345 has been shipped and is on its way to your facility...',
      time: '3h ago',
      unread: false,
      starred: true,
      priority: 'medium',
      type: 'email'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Inbox</h1>
          <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
            2 unread
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search messages..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Archive className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${getPriorityColor(message.priority)} ${
                message.unread ? 'bg-blue-50' : 'bg-white'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  {message.type === 'whatsapp' ? (
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <Mail className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <h3 className={`text-sm font-medium ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                        {message.sender}
                      </h3>
                      <span className="text-xs text-gray-500">• {message.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {message.starred && (
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      )}
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{message.time}</span>
                      </div>
                    </div>
                  </div>
                  <h4 className={`text-sm mt-1 ${message.unread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                    {message.subject}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1 truncate">
                    {message.preview}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxHub;