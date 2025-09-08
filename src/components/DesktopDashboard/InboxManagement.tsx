import React, { useState } from "react";
import { MessageList } from "./MessageList";
import { MessageModal } from "./MessageModal";
import { TopBar } from "./TopBar";
import { useMessages } from "./hooks/useMessages";
import { Message } from "./types";

function InboxManagement() {
  const {
    messages,
    activeTab,
    searchQuery,
    fromDate,
    toDate,
    messageStats,
    setActiveTab,
    setSearchQuery,
    setFromDate,
    setToDate,
    convertToTask,
  } = useMessages();

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleMessageClick = (message: Message) => {
    setSelectedMessage(message);
  };

  const handleCloseModal = () => {
    setSelectedMessage(null);
  };

  const handleConvertToTask = (messageId: string) => {
    convertToTask(messageId);
    alert("Message converted to task successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
        messageStats={messageStats}
      />

      <div className="p-6">
        <MessageList
          messages={messages}
          onMessageClick={handleMessageClick}
          onConvertToTask={handleConvertToTask}
        />
      </div>

      {selectedMessage && (
        <MessageModal message={selectedMessage} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default InboxManagement;
