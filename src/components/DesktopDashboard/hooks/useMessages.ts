import { useState, useMemo } from "react";
import { Message, Task, TaskFormData } from "../types";
import { mockMessages } from "../mockMessages";

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "email" | "whatsapp">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredMessages = useMemo(() => {
    let filtered = messages.filter((message) => {
      // Filter by tab
      if (activeTab !== "all" && message.type !== activeTab) {
        return false;
      }

      // Filter by date range
      if (fromDate) {
        const messageDate = new Date(
          message.timestamp.getFullYear(),
          message.timestamp.getMonth(),
          message.timestamp.getDate()
        );
        const filterFromDate = new Date(fromDate);
        if (messageDate < filterFromDate) {
          return false;
        }
      }

      if (toDate) {
        const messageDate = new Date(
          message.timestamp.getFullYear(),
          message.timestamp.getMonth(),
          message.timestamp.getDate()
        );
        const filterToDate = new Date(toDate);
        if (messageDate > filterToDate) {
          return false;
        }
      }

      return true;
    });

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (message) =>
          message.sender.toLowerCase().includes(query) ||
          message.content.toLowerCase().includes(query) ||
          (message.subject && message.subject.toLowerCase().includes(query)) ||
          (message.senderEmail &&
            message.senderEmail.toLowerCase().includes(query))
      );
    }

    return filtered.sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }, [messages, activeTab, searchQuery, fromDate, toDate]);

  const messageStats = useMemo(() => {
    return {
      total: messages.length,
      email: messages.filter((m) => m.type === "email").length,
      whatsapp: messages.filter((m) => m.type === "whatsapp").length,
    };
  }, [messages]);

  const convertToTask = (messageId: string, taskData?: TaskFormData) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title:
        taskData?.title || message.subject || `Task from ${message.sender}`,
      description: taskData?.description || message.content,
      priority: taskData?.priority || message.priority,
      dueDate: taskData?.dueDate ? new Date(taskData.dueDate) : undefined,
      assignedTo: taskData?.assignedTo || undefined,
      status: "todo",
      sourceMessageId: messageId,
      createdAt: new Date(),
    };

    setTasks((prev) => [...prev, newTask]);

    // Show success notification
    console.log("Task created successfully:", newTask);
  };

  return {
    messages: filteredMessages,
    activeTab,
    searchQuery,
    fromDate,
    toDate,
    messageStats,
    tasks,
    setActiveTab,
    setSearchQuery,
    setFromDate,
    setToDate,
    convertToTask,
  };
};
