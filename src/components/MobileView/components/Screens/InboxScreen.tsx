import React, { useState } from 'react';
import { Search, Filter, Mail, MessageCircle, Clock, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  hasAttachment?: boolean;
  type: 'mail' | 'whatsapp';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'FreshCo Vegetables',
    subject: 'RFQ Response - Organic Tomatoes',
    preview: 'Thank you for your RFQ. We are pleased to provide our quotation...',
    timestamp: '2 hours ago',
    isRead: false,
    hasAttachment: true,
    type: 'mail'
  },
  {
    id: '2',
    sender: 'Gulf Meat Supplies',
    subject: 'Sample Request Approved',
    preview: 'Your sample request has been approved and will be shipped...',
    timestamp: '4 hours ago',
    isRead: true,
    type: 'mail'
  },
  {
    id: '3',
    sender: 'Ahmed Hassan',
    subject: '',
    preview: 'Hi, regarding the meeting tomorrow at 2 PM...',
    timestamp: '1 hour ago',
    isRead: false,
    type: 'whatsapp'
  },
  {
    id: '4',
    sender: 'EquipMax',
    subject: 'Equipment Maintenance Schedule',
    preview: 'Please find attached the maintenance schedule for your equipment...',
    timestamp: '1 day ago',
    isRead: true,
    hasAttachment: true,
    type: 'mail'
  },
  {
    id: '5',
    sender: 'Sara Al-Mansoori',
    subject: '',
    preview: 'The quotation is ready. Can we schedule a call?',
    timestamp: '3 hours ago',
    isRead: false,
    type: 'whatsapp'
  }
];

export function InboxScreen() {
  const [activeTab, setActiveTab] = useState<'mail' | 'whatsapp'>('mail');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { id: 'mail' as const, label: 'Mail', icon: Mail },
    { id: 'whatsapp' as const, label: 'WhatsApp', icon: MessageCircle }
  ];

  const filteredMessages = mockMessages.filter(message => {
    const matchesTab = message.type === activeTab;
    const matchesSearch = 
      message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  const unreadCount = filteredMessages.filter(m => !m.isRead).length;

  return (
    <div className="px-4 py-3 space-y-3">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const tabMessages = mockMessages.filter(m => m.type === tab.id);
          const tabUnread = tabMessages.filter(m => !m.isRead).length;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-2 font-medium text-sm flex items-center justify-center space-x-1 ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tabUnread > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center">
                  {tabUnread}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab === 'mail' ? 'emails' : 'messages'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-0 transition-colors text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2 border border-gray-200 rounded-lg transition-colors flex items-center"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs">
              <option>All Messages</option>
              <option>Unread</option>
              <option>Read</option>
              <option>With Attachments</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
            <select className="w-full px-2 py-1.5 border border-gray-300 rounded text-xs">
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      )}

      {/* Messages List */}
      <div className="space-y-0">
        {filteredMessages.length > 0 ? (
          filteredMessages.map((message, index) => (
            <div
              key={message.id}
              className={`bg-white p-3 border border-gray-200 cursor-pointer transition-colors hover:bg-gray-50 ${
                index === 0 && filteredMessages.length > 1 ? 'rounded-t-lg border-b-0' : 
                index === filteredMessages.length - 1 || filteredMessages.length === 1 ? 'rounded-b-lg' : 
                'border-b-0'
              } ${!message.isRead ? 'bg-blue-50 border-blue-200' : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${!message.isRead ? 'bg-blue-500' : 'bg-transparent'}`} />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className={`text-sm ${!message.isRead ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                      {message.sender}
                    </h3>
                    <div className="flex items-center space-x-1">
                      {message.hasAttachment && (
                        <Paperclip className="w-3 h-3 text-gray-400" />
                      )}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                  
                  {message.subject && (
                    <p className={`text-xs mb-1 ${!message.isRead ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                      {message.subject}
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-500 line-clamp-2">
                    {message.preview}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="w-20 h-20 mx-auto mb-4 opacity-30">
              {activeTab === 'mail' ? (
                <Mail className="w-full h-full" />
              ) : (
                <MessageCircle className="w-full h-full" />
              )}
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">
              No {activeTab === 'mail' ? 'emails' : 'messages'} found
            </p>
            <p className="text-xs text-gray-500">
              No {activeTab === 'mail' ? 'emails' : 'messages'} match your current search
            </p>
          </div>
        )}
      </div>

      {/* Summary */}
      {filteredMessages.length > 0 && (
        <div className="text-center text-xs text-gray-500 pt-2">
          {filteredMessages.length} {activeTab === 'mail' ? 'emails' : 'messages'}
          {unreadCount > 0 && ` • ${unreadCount} unread`}
        </div>
      )}
    </div>
  );
}