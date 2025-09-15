import React, { useState } from "react";
import { MessageSquare, Send, Paperclip, Phone, Mail, Clock } from "lucide-react";

interface Message {
  id: string;
  type: "email" | "whatsapp" | "sms";
  content: string;
  timestamp: Date;
  sender: string;
  isFromSupplier: boolean;
}

interface MessagesTabProps {
  supplierId: string;
}

const MessagesTab: React.FC<MessagesTabProps> = ({ supplierId }) => {
  const [newMessage, setNewMessage] = useState("");

  // Mock messages data
  const messages: Message[] = [
    {
      id: "1",
      type: "email",
      content: "Thank you for your interest in our products. We have received your RFQ and will respond within 24 hours.",
      timestamp: new Date(2024, 0, 20, 14, 30),
      sender: "John Smith",
      isFromSupplier: true,
    },
    {
      id: "2",
      type: "whatsapp",
      content: "Hi, we need the updated pricing for the coffee beans. Can you send the latest catalog?",
      timestamp: new Date(2024, 0, 20, 10, 15),
      sender: "You",
      isFromSupplier: false,
    },
    {
      id: "3",
      type: "email",
      content: "Please find attached our latest product catalog with updated pricing. Let us know if you need any additional information.",
      timestamp: new Date(2024, 0, 19, 16, 45),
      sender: "Sarah Johnson",
      isFromSupplier: true,
    },
  ];

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - timestamp.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  const getMessageIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="w-4 h-4 text-blue-500" />;
      case "whatsapp":
        return <MessageSquare className="w-4 h-4 text-green-500" />;
      case "sms":
        return <Phone className="w-4 h-4 text-purple-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Messages Feed */}
      <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isFromSupplier ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg border border-gray-200 ${
                message.isFromSupplier
                  ? "bg-white text-gray-900"
                  : "bg-blue-50 text-gray-900"
              }`}
            >
              {message.isFromSupplier && (
                <div className="flex items-center space-x-2 mb-2">
                  {getMessageIcon(message.type)}
                  <span className="text-xs font-medium text-gray-600">
                    {message.sender}
                  </span>
                </div>
              )}
              <p className="text-sm">{message.content}</p>
              <div className="flex items-center justify-end mt-2 space-x-1">
                <Clock className="w-3 h-3 opacity-75" />
                <span className="text-xs opacity-75">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 pt-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;