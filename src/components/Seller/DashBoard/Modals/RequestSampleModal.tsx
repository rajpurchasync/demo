import React, { useState } from "react";
import { X, Package } from "lucide-react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { DateInput } from "../UI/DateInput";
import { mockLocations } from "../types/locations";
import { addMockToDo } from "../types/purchasync";

interface RequestSampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
}

export function RequestSampleModal({
  isOpen,
  onClose,
  customerName,
}: RequestSampleModalProps) {
  const [formData, setFormData] = useState({
    sampleType: "",
    purpose: "",
    expectedDate: "",
    deliveryLocation: "",
    newLocation: {
      street: "",
      building: "",
      flat: "",
    },
  });

  const [showNewLocationFields, setShowNewLocationFields] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewLocationChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      newLocation: { ...prev.newLocation, [field]: value },
    }));
  };

  const handleLocationChange = (value: string) => {
    if (value === "add-new") {
      setShowNewLocationFields(true);
      setFormData((prev) => ({ ...prev, deliveryLocation: value }));
    } else {
      setShowNewLocationFields(false);
      setFormData((prev) => ({ ...prev, deliveryLocation: value }));
    }
  };

  const handleSubmit = () => {
    if (!formData.sampleType || !formData.purpose) {
      alert("Please fill in all required fields");
      return;
    }

    // Add to ToDo list
    addMockToDo({
      title: `Sample request: ${formData.sampleType} from ${customerName}`,
      type: "sample",
      status: "ongoing",
      dueDate:
        formData.expectedDate ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
      priority: "medium",
      tags: ["sample-request", customerName.toLowerCase().replace(/\s+/g, "-")],
      description: `Purpose: ${formData.purpose}`,
    });

    alert("Sample request submitted successfully!");
    setFormData({
      sampleType: "",
      purpose: "",
      expectedDate: "",
      deliveryLocation: "",
      newLocation: { street: "", building: "", flat: "" },
    });
    setShowNewLocationFields(false);
    onClose();
  };

  const locationOptions = [
    { value: "", label: "Select delivery location" },
    ...mockLocations.map((loc) => ({
      value: loc.id,
      label: `${loc.name} - ${loc.city}, ${loc.state}`,
    })),
    { value: "add-new", label: "+ Add New Location" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Request Sample
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
            label="Sample Type *"
            placeholder="e.g., Organic Tomatoes, Premium Beef"
            value={formData.sampleType}
            onChange={(e) => handleInputChange("sampleType", e.target.value)}
          />

          <Input
            label="Purpose *"
            placeholder="e.g., Quality testing, Menu planning"
            value={formData.purpose}
            onChange={(e) => handleInputChange("purpose", e.target.value)}
          />

          <DateInput
            label="Expected Date"
            selected={formData.expectedDate}
            onChange={(date) => handleInputChange("expectedDate", date)}
          />

          <Select
            label="Delivery Location"
            options={locationOptions}
            value={formData.deliveryLocation}
            onChange={(e) => handleLocationChange(e.target.value)}
          />

          {showNewLocationFields && (
            <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900">
                New Location Details
              </h4>
              <Input
                label="Street Address"
                placeholder="Enter street address"
                value={formData.newLocation.street}
                onChange={(e) =>
                  handleNewLocationChange("street", e.target.value)
                }
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Building"
                  placeholder="Building name/number"
                  value={formData.newLocation.building}
                  onChange={(e) =>
                    handleNewLocationChange("building", e.target.value)
                  }
                />
                <Input
                  label="Flat/Unit"
                  placeholder="Flat number"
                  value={formData.newLocation.flat}
                  onChange={(e) =>
                    handleNewLocationChange("flat", e.target.value)
                  }
                />
              </div>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <Button variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button fullWidth onClick={handleSubmit}>
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
