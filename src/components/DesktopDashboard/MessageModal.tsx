import React from 'react';
import { Message } from './types';
import { X, Mail, MessageCircle, User, Phone, Clock, Paperclip } from 'lucide-react';

interface MessageModalProps {
  message: Message;
  onClose: () => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  message,
  onClose
}) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-full ${
                message.type === 'email' 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'bg-green-100 text-green-600'
              }`}>
                {message.type === 'email' ? (
                  <Mail size={20} />
                ) : (
                  <MessageCircle size={20} />
                )}
              </div>
              
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {message.subject || `${message.type === 'whatsapp' ? 'WhatsApp' : 'Email'} from ${message.sender}`}
                </h2>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-2">
                    <User size={14} />
                    <span>{message.sender}</span>
                  </div>
                  
                  {message.senderEmail && (
                    <div className="flex items-center space-x-2">
                      <Mail size={14} />
                      <span>{message.senderEmail}</span>
                    </div>
                  )}
                  
                  {message.senderPhone && (
                    <div className="flex items-center space-x-2">
                      <Phone size={14} />
                      <span>{message.senderPhone}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Clock size={14} />
                    <span>{message.timestamp.toLocaleString()}</span>
                  </div>
                </div>
                
                <span className={`inline-flex px-2 py-1 text-xs rounded-full border ${
                  getPriorityColor(message.priority)
                }`}>
                  {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority
                </span>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          
          {message.attachments && message.attachments.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Attachments ({message.attachments.length})
              </h3>
              <div className="space-y-2">
                {message.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Paperclip size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {attachment.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(attachment.size)}
                        </p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};