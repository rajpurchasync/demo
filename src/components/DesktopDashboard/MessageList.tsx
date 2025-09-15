import React from "react";
import { Message } from "./types";
import { Mail, MessageCircle, CheckSquare } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  onMessageClick: (message: Message) => void;
  onConvertToTask: (messageId: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  onMessageClick,
  onConvertToTask,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Mail size={32} className="text-gray-400" />
            </div>
            <p>No messages found</p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message) => (
                <tr
                  key={message.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onMessageClick(message)}
                      className="text-left hover:text-blue-600 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900 hover:underline">
                        {message.subject ||
                          `${
                            message.type === "whatsapp" ? "WhatsApp" : "Email"
                          } message`}
                      </div>
                      {/* <div className="text-sm text-gray-500 truncate max-w-xs">
                        {message.content.substring(0, 60)}...
                      </div> */}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex p-2 rounded-full ${
                        message.type === "email"
                          ? " text-blue-600"
                          : " text-green-600"
                      }`}
                    >
                      {message.type === "email" ? (
                        <span>Email</span>
                      ) : (
                        <span>Whatsapp</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(message.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onConvertToTask(message.id)}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <CheckSquare size={14} />
                      <span>Convert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
