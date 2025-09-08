import React, { useState } from "react";
import { X, MessageCircle, Send } from "lucide-react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { addMockToDo } from "../types/purchasync";

interface SendMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export function SendMessageModal({
  isOpen,
  onClose,
  customerName,
}: SendMessageModalProps) {
  const [formData, setFormData] = useState({
    recipient: customerName,
    subject: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.subject || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    // Add to ToDo list
    addMockToDo({
      title: `Follow up on message: ${formData.subject} to ${customerName}`,
      type: "task",
      status: "ongoing",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 3 days from now
      priority: "medium",
      tags: [
        "message",
        "follow-up",
        customerName.toLowerCase().replace(/\s+/g, "-"),
      ],
      description: `Message sent regarding: ${formData.subject}`,
    });

    alert("Message sent successfully!");
    setFormData({
      recipient: customerName,
      subject: "",
      message: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-pink-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Send Message
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <Input
            label="Recipient"
            value={formData.recipient}
            onChange={(e) => handleInputChange("recipient", e.target.value)}
            className="bg-gray-50"
            disabled
          />

          <Input
            label="Subject *"
            placeholder="Enter message subject"
            value={formData.subject}
            onChange={(e) => handleInputChange("subject", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              placeholder="Type your message here..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#145434] focus:ring-0 transition-colors resize-none"
              rows={6}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
              className="flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
