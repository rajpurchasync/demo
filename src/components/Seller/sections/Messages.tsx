import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Phone, 
  Video, 
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Clock,
  CheckCheck
} from 'lucide-react';

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'Hotel Paradise Resort',
      avatar: 'SJ',
      lastMessage: 'Thanks for the quick response on the bed linens quote!',
      timestamp: '2 min ago',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: 'Mike Chen',
      company: 'Restaurant ABC Chain',
      avatar: 'MC',
      lastMessage: 'Can we schedule a call to discuss the weekly supply contract?',
      timestamp: '1 hour ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      name: 'Emma Wilson',
      company: 'Boutique Hotel Group',
      avatar: 'EW',
      lastMessage: 'The samples look great! When can we place the full order?',
      timestamp: '3 hours ago',
      unreadCount: 1,
      isOnline: true
    },
    {
      id: 4,
      name: 'David Rodriguez',
      company: 'Cafe Central',
      avatar: 'DR',
      lastMessage: 'Perfect! The coffee beans arrived and they taste amazing.',
      timestamp: '1 day ago',
      unreadCount: 0,
      isOnline: false
    }
  ];

  const messages = [
    {
      id: 1,
      senderId: 1,
      senderName: 'Sarah Johnson',
      message: 'Hi! I received your quote for the premium bed linens. The pricing looks competitive.',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'You',
      message: 'Thank you for considering our products! We pride ourselves on quality and competitive pricing.',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Sarah Johnson',
      message: 'Could you provide some samples before we proceed with the full order? We need to test the quality.',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: 4,
      senderId: 'me',
      senderName: 'You',
      message: 'Absolutely! I can send you samples of our top 3 bed linen collections. What\'s your preferred delivery address?',
      timestamp: '10:37 AM',
      isOwn: true
    },
    {
      id: 5,
      senderId: 1,
      senderName: 'Sarah Johnson',
      message: 'Thanks for the quick response on the bed linens quote!',
      timestamp: '2 min ago',
      isOwn: false
    }
  ];

  const selectedConversation = conversations.find(conv => conv.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Conversations List */}
      <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat === conversation.id ? 'bg-purple-50 border-purple-200' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                    {conversation.avatar}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-purple-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{conversation.company}</p>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium text-sm">
                      {selectedConversation.avatar}
                    </div>
                    {selectedConversation.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{selectedConversation.name}</h3>
                    <p className="text-xs text-gray-500">{selectedConversation.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isOwn
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                    <div className={`flex items-center justify-end mt-1 space-x-1 ${
                      message.isOwn ? 'text-purple-200' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{message.timestamp}</span>
                      {message.isOwn && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows={1}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a conversation from the list to start messaging.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;