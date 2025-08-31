import React, { useState } from 'react';
import { Mail, Search, Filter, Archive, Trash2, Star, Clock, Paperclip, Calendar, MessageCircle } from 'lucide-react';

const Inbox: React.FC = () => {
  const [selectedEmails, setSelectedEmails] = useState<number[]>([]);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const emails = [
    {
      id: 1,
      sender: 'Hotel Paradise Resort',
      senderEmail: 'procurement@hotelparadise.com',
      subject: 'RFQ: Premium Bed Linens - Urgent',
      preview: 'We need quotes for 500 sets of premium bed linens for our new wing opening...',
      time: '2 hours ago',
      date: '2024-01-18',
      isRead: false,
      isStarred: true,
      hasAttachment: true,
      priority: 'high',
      type: 'email'
    },
    {
      id: 2,
      sender: 'Restaurant ABC',
      senderEmail: 'orders@restaurantabc.com',
      subject: 'Weekly Order Confirmation',
      preview: 'Please confirm the weekly order for fresh ingredients as discussed...',
      time: '4 hours ago',
      date: '2024-01-18',
      isRead: true,
      isStarred: false,
      hasAttachment: false,
      priority: 'medium',
      type: 'whatsapp'
    },
    {
      id: 3,
      sender: 'Cafe Central',
      senderEmail: 'manager@cafecentral.com',
      subject: 'Sample Request: Organic Coffee Beans',
      preview: 'We would like to request samples of your organic coffee bean varieties...',
      time: '1 day ago',
      date: '2024-01-17',
      isRead: false,
      isStarred: false,
      hasAttachment: true,
      priority: 'low',
      type: 'email'
    },
    {
      id: 4,
      sender: 'Boutique Hotel Group',
      senderEmail: 'supplies@boutiquehotels.com',
      subject: 'Payment Confirmation - Invoice #12345',
      preview: 'This is to confirm that payment has been processed for invoice #12345...',
      time: '2 days ago',
      date: '2024-01-16',
      isRead: true,
      isStarred: true,
      hasAttachment: false,
      priority: 'medium',
      type: 'whatsapp'
    }
  ];

  const toggleEmailSelection = (emailId: number) => {
    setSelectedEmails(prev => 
      prev.includes(emailId) 
        ? prev.filter(id => id !== emailId)
        : [...prev, emailId]
    );
  };

  const toggleStar = (emailId: number) => {
    console.log(`Toggle star for email ${emailId}`);
  };

  const handleCustomerClick = (sender: string) => {
    console.log(`Opening customer history for: ${sender}`);
    // This would navigate to customer details/history page
  };

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

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="w-3 h-3 text-blue-600" />;
      case 'whatsapp':
        return <MessageCircle className="w-3 h-3 text-green-600" />;
      default:
        return <Mail className="w-3 h-3 text-gray-600" />;
    }
  };

  const filteredEmails = emails.filter(email => {
    const matchesStatus = filter === 'all' || 
                         (filter === 'unread' && !email.isRead) ||
                         (filter === 'starred' && email.isStarred) ||
                         (filter === 'high' && email.priority === 'high');
    
    const matchesType = typeFilter === 'all' || email.type === typeFilter;
    
    const matchesDateRange = (!fromDate || email.date >= fromDate) && 
                            (!toDate || email.date <= toDate);
    
    return matchesStatus && matchesType && matchesDateRange;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Inbox</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your business communications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              {emails.filter(e => !e.isRead).length} unread
            </span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
              {emails.filter(e => e.isStarred).length} starred
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search emails..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="starred">Starred</option>
            <option value="high">High Priority</option>
          </select>
          
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
          >
            <option value="all">All Types</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            placeholder="From Date"
          />
          
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            placeholder="To Date"
          />
        </div>
      </div>

      {/* Action Bar */}
      {selectedEmails.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-purple-700">
              {selectedEmails.length} email{selectedEmails.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex space-x-2">
              <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors">
                <Archive className="w-4 h-4" />
              </button>
              <button className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Email List */}
      <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
        {filteredEmails.map((email) => (
          <div
            key={email.id}
            className={`p-4 hover:bg-gray-50 transition-colors border-l-4 ${getPriorityColor(email.priority)} ${
              !email.isRead ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={selectedEmails.includes(email.id)}
                onChange={() => toggleEmailSelection(email.id)}
                className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <button
                onClick={() => toggleStar(email.id)}
                className="mt-1 p-1 hover:bg-gray-200 rounded transition-colors"
              >
                <Star className={`w-4 h-4 ${email.isStarred ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleCustomerClick(email.sender)}
                      className={`text-sm ${!email.isRead ? 'font-semibold' : 'font-medium'} text-purple-600 hover:text-purple-800 transition-colors truncate`}
                    >
                      {email.sender}
                    </button>
                    {email.hasAttachment && <Paperclip className="w-3 h-3 text-gray-400" />}
                    {getTypeBadge(email.type)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">{email.time}</span>
                  </div>
                </div>
                <p className={`text-sm ${!email.isRead ? 'font-medium' : ''} text-gray-900 mt-1`}>
                  {email.subject}
                </p>
                <p className="text-sm text-gray-600 mt-1 truncate">{email.preview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEmails.length === 0 && (
        <div className="text-center py-12">
          <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No emails found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
};

export default Inbox;