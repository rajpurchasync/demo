import React, { useState } from "react";
import { X } from "lucide-react";

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSupplier?: (supplier: any) => void;
}

export default function AddCompanyModal({
  isOpen,
  onClose,
  onAddSupplier,
}: AddCompanyModalProps) {
  const [formData, setFormData] = useState({
    companyName: "",

    customType: "",
    category: "",
    tags: "",
    label: "Prospective" as "Approved" | "Credit" | "Prospective",
    country: "",
    state: "",
    city: "",
  });

  const typeOptions = [
    "Manufacturer",
    "Distributor",
    "Service Provider",
    "Agency",
    "Digital",
    "Freelancer",
    "Others",
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "India",
    "Brazil",
    "Mexico",
    "China",
    "Italy",
    "Spain",
    "Netherlands",
    "Sweden",
    "Norway",
    "Denmark",
    "Switzerland",
  ];

  const states = [
    "California",
    "New York",
    "Texas",
    "Florida",
    "Illinois",
    "Pennsylvania",
    "Ohio",
    "Georgia",
    "North Carolina",
    "Michigan",
    "New Jersey",
    "Virginia",
    "Washington",
    "Arizona",
    "Massachusetts",
    "Tennessee",
    "Indiana",
    "Missouri",
    "Maryland",
    "Wisconsin",
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onAddSupplier && formData.companyName) {
      const finalType =
        formData.type === "Others" ? formData.customType : formData.type;

      const newSupplier = {
        id: Date.now().toString(),
        companyName: formData.companyName,
        type: finalType || "Other",
        category: formData.category || "Other",
        label: formData.label,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
        country: formData.country,
        state: formData.state,
        city: formData.city,
      };
      onAddSupplier(newSupplier);

      // Reset form
      setFormData({
        companyName: "",

        customType: "",
        category: "",
        tags: "",
        label: "Prospective",
        country: "",
        state: "",
        city: "",
      });
    }

    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            Add Company
          </h2>
          <button
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-3 sm:space-y-4"
        >
          {/* Company Name */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Company Name
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border-2 border-teal-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
              placeholder="apple.com or Apple"
            />
          </div>

          {/* Custom Type (if Others selected) */}
          {formData.type === "Others" && (
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                Custom Type
              </label>
              <input
                type="text"
                value={formData.customType}
                onChange={(e) =>
                  handleInputChange("customType", e.target.value)
                }
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Enter custom type"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter category"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => handleInputChange("tags", e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter tags separated by commas"
            />
          </div>

          {/* Label */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Label
            </label>
            <select
              value={formData.label}
              onChange={(e) => handleInputChange("label", e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="Approved">Approved</option>
              <option value="Credit">Credit</option>
              <option value="Prospective">Prospective</option>
            </select>
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              Country
            </label>
            <select
              value={formData.country}
              onChange={(e) => handleInputChange("country", e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              State
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select state</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter city"
            />
          </div>

          {/* Save Button */}
          <div className="pt-3 sm:pt-4">
            <button
              type="submit"
              className="w-full px-4 py-3 sm:px-6 sm:py-3 text-sm sm:text-base text-white bg-gray-900 rounded-lg font-medium hover:bg-gray-800 transition-colors min-h-[44px]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
