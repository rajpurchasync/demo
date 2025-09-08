import React, { useState } from "react";
import { X, Calendar } from "lucide-react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { DateInput } from "../UI/DateInput";
import { Toggle } from "../UI/Toggle";
import { addMockToDo } from "../types/purchasync";

interface RequestMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export function RequestMeetingModal({
  isOpen,
  onClose,
  customerName,
}: RequestMeetingModalProps) {
  const [formData, setFormData] = useState({
    topic: "",
    date: "",
    time: "",
    isOnline: true,
    locationDetails: "",
    agenda: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.topic || !formData.date || !formData.time) {
      alert("Please fill in all required fields");
      return;
    }

    if (!formData.isOnline && !formData.locationDetails) {
      alert("Please provide location details for on-site meeting");
      return;
    }

    // Add to ToDo list
    addMockToDo({
      title: `Meeting: ${formData.topic} with ${customerName}`,
      type: "task",
      status: "ongoing",
      dueDate: formData.date,
      priority: "medium",
      tags: ["meeting", customerName.toLowerCase().replace(/\s+/g, "-")],
      description: `${
        formData.isOnline ? "Online" : "On-site"
      } meeting scheduled for ${formData.time}`,
    });

    alert("Meeting request sent successfully!");
    setFormData({
      topic: "",
      date: "",
      time: "",
      isOnline: true,
      locationDetails: "",
      agenda: "",
    });
    onClose();
  };

  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8; // 8 AM to 6 PM
    const time12 =
      hour > 12
        ? `${hour - 12}:00 PM`
        : hour === 12
        ? "12:00 PM"
        : `${hour}:00 AM`;
    return { value: `${hour}:00`, label: time12 };
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Request Meeting
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
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Customer:</span> {customerName}
            </p>
          </div>

          <Input
            label="Meeting Topic *"
            placeholder="e.g., Product discussion, Contract negotiation"
            value={formData.topic}
            onChange={(e) => handleInputChange("topic", e.target.value)}
          />

          <DateInput
            label="Select Date *"
            selected={formData.date}
            onChange={(date) => handleInputChange("date", date)}
          />

          <Select
            label="Select Time *"
            options={[{ value: "", label: "Choose time slot" }, ...timeSlots]}
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Type
            </label>
            <Toggle
              option1={{ label: "Online", value: "true" }}
              option2={{ label: "On-site", value: "false" }}
              selected={formData.isOnline ? "true" : "false"}
              onChange={(value) =>
                handleInputChange("isOnline", value === "true")
              }
            />
          </div>

          {!formData.isOnline && (
            <Input
              label="Location Details *"
              placeholder="Enter meeting location"
              value={formData.locationDetails}
              onChange={(e) =>
                handleInputChange("locationDetails", e.target.value)
              }
            />
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agenda (Optional)
            </label>
            <textarea
              value={formData.agenda}
              onChange={(e) => handleInputChange("agenda", e.target.value)}
              placeholder="Add meeting agenda..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#145434] focus:ring-0 transition-colors resize-none"
              rows={3}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button fullWidth onClick={handleSubmit}>
              Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
