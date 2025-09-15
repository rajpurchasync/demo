import React, { useState } from 'react';
import { Search, Filter, MessageCircle, Plus, Phone, Mail, Building } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  avatar?: string;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    title: 'Sales Manager',
    email: 'ahmed@freshco.ae',
    phone: '+971 50 123 4567',
    company: 'FreshCo Vegetables'
  },
  {
    id: '2',
    name: 'Sara Al-Mansoori',
    title: 'Account Manager',
    email: 'sara@gulfmeat.ae',
    phone: '+971 50 234 5678',
    company: 'Gulf Meat Supplies'
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    title: 'Sales Executive',
    email: 'mohammed@equipmax.ae',
    phone: '+971 50 345 6789',
    company: 'EquipMax'
  },
  {
    id: '4',
    name: 'Priya Sharma',
    title: 'Procurement Specialist',
    email: 'priya@spiceroute.ae',
    phone: '+971 50 456 7890',
    company: 'Spice Route Trading'
  },
  {
    id: '5',
    name: 'Omar Khan',
    title: 'Service Manager',
    email: 'omar@cleanpro.ae',
    phone: '+971 50 987 6543',
    company: 'CleanPro Services'
  }
];

export function ContactsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const tabs = [
    { id: 'all', label: 'All', count: mockContacts.length },
    { id: 'suppliers', label: 'Suppliers', count: 5 },
    { id: 'internal', label: 'Internal', count: 0 },
    { id: 'recent', label: 'Recent', count: 3 }
  ];

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageClick = (contact: Contact) => {
    setSelectedContact(contact);
    setShowMessageModal(true);
  };

  return (
    <div className="px-4 py-3 space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-2 font-medium text-sm flex items-center justify-center space-x-1 ${
              activeTab === tab.id
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-600"
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs text-gray-500">{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-3 py-2 border border-gray-200 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option value="all">All Companies</option>
              <option value="freshco">FreshCo Vegetables</option>
              <option value="gulfmeat">Gulf Meat Supplies</option>
              <option value="equipmax">EquipMax</option>
            </select>
          </div>
        </div>
      )}

      {/* Contacts List */}
      <div className="space-y-0">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact, index) => (
            <div
              key={contact.id}
              className={`bg-white p-4 border border-gray-200 flex items-center space-x-3 ${
                index === 0 && filteredContacts.length > 1 ? 'rounded-t-lg border-b-0' : 
                index === filteredContacts.length - 1 || filteredContacts.length === 1 ? 'rounded-b-lg' : 
                'border-b-0'
              }`}
            >
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-gray-600">
                  {contact.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
                <p className="text-xs text-gray-600">{contact.title}</p>
                <div className="flex items-center space-x-3 mt-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <Mail className="w-3 h-3 mr-1" />
                    {contact.email}
                  </div>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                  <Building className="w-3 h-3 mr-1" />
                  {contact.company}
                </div>
              </div>

              <button
                onClick={() => handleMessageClick(contact)}
                className="p-2 text-purple-600 transition-colors rounded-full"
              >
                <MessageCircle className="w-5 h-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="w-20 h-20 mx-auto mb-4 opacity-30">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="50" cy="35" r="15" />
                <path d="M25 75c0-15 11-25 25-25s25 10 25 25" />
              </svg>
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">
              No contacts found
            </p>
            <p className="text-xs text-gray-500">
              No contacts match your current search
            </p>
          </div>
        )}
      </div>

      {/* Message Modal */}
      {showMessageModal && selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Message {selectedContact.name}
              </h2>
              <button
                onClick={() => setShowMessageModal(false)}
                className="p-2 rounded-full transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{selectedContact.name}</p>
                    <p className="text-xs text-gray-600">{selectedContact.title} at {selectedContact.company}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter message subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm resize-none"
                  rows={6}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    console.log('Send message to:', selectedContact.name);
                    setShowMessageModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}