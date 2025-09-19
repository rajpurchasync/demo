import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Calendar, 
  Send, 
  FileText,
  Expand,
  Minimize,
  Phone,
  Mail,
  MapPin,
  Building,
  User,
  Edit,
  Plus
} from 'lucide-react';

interface ContactDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
  supplier: any;
}

const ContactDetailModal: React.FC<ContactDetailModalProps> = ({ isOpen, onClose, contact, supplier }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');

  if (!isOpen || !contact) return null;

  const quickActions = [
    { label: 'Message', icon: MessageSquare, color: 'blue' },
    { label: 'Request Meeting', icon: Calendar, color: 'green' },
    { label: 'Send KYC', icon: Send, color: 'purple' },
    { label: 'Ask Quote', icon: FileText, color: 'orange' }
  ];

  const tabs = [
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'meetings', label: 'Meeting Notes', icon: Calendar },
    { id: 'business-card', label: 'Business Card', icon: User }
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      setNewMessage('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div 
        className="flex-1 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`bg-white shadow-xl flex flex-col transition-all duration-300 ${
        isExpanded ? 'w-full' : 'w-[65%]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-semibold text-gray-900">{contact.name}</h2>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-gray-600">{contact.position}</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">{supplier?.name}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isExpanded ? <Minimize className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900">{contact.email}</span>
            </div>
            {contact.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{contact.phone}</span>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-900">{supplier?.location}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="grid grid-cols-4 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex items-center justify-center space-x-2 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left border border-gray-200 min-w-0"
              >
                <action.icon className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <span className="text-sm font-medium truncate">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">{contact.name?.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Thank you for reaching out. I'll review the requirements and get back to you with a detailed proposal.</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg ml-8">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">You</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">You</p>
                        <p className="text-xs text-gray-500">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Hi {contact.name}, we're looking for office supplies for Q2. Can you provide a quote for bulk orders?</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex space-x-3">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Meeting Notes</h3>
                <button className="flex items-center space-x-2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm hover:bg-gray-900 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Add Note</span>
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Product Demo Call</h4>
                      <p className="text-xs text-gray-500">March 20, 2024 • 2:00 PM</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">Discussed new product features and pricing options. {contact.name} showed interest in the premium package.</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Initial Introduction</h4>
                      <p className="text-xs text-gray-500">March 15, 2024 • 10:30 AM</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">First meeting to understand their requirements and introduce our services.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'business-card' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{contact.name}</h3>
                    <p className="text-blue-100 mt-1">{contact.position}</p>
                    <p className="text-blue-200 text-sm mt-2">{supplier?.name}</p>
                  </div>
                  <button className="text-blue-200 hover:text-white">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="mt-6 space-y-2">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-blue-200" />
                    <span className="text-sm">{contact.email}</span>
                  </div>
                  {contact.phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-blue-200" />
                      <span className="text-sm">{contact.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-blue-200" />
                    <span className="text-sm">{supplier?.location}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetailModal;