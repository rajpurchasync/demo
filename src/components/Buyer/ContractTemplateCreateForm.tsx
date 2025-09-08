import React, { useState } from "react";
import {
  X,
  FileText,
  ChevronDown,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Save,
  Paperclip,
  Package,
} from "lucide-react";

interface RFQItem {
  id: string;
  productName: string;
  uom: string;
  quantity?: number;
}

interface TemplateData {
  title: string;
  category: string;
  subCategory: string;
  subSubCategory?: string;
  items: RFQItem[];
}

interface TemplateCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: TemplateData) => void;
}

const ContractTemplateCreateForm: React.FC<TemplateCreateFormProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TemplateData>({
    title: "",
    category: "",
    subCategory: "",
    subSubCategory: "",
    items: [],
  });

  const [dropdowns, setDropdowns] = useState({
    category: false,
    subCategory: false,
    subSubCategory: false,
  });

  const [newItem, setNewItem] = useState({
    productName: "",
    uom: "",
  });

  const categories = {
    "Office Supplies": {
      Furniture: ["Desks & Chairs", "Storage", "Meeting Room"],
      Stationery: ["Writing Materials", "Paper Products", "Filing"],
      Equipment: ["Printers", "Scanners", "Shredders"],
    },
    Technology: {
      Hardware: ["Computers", "Servers", "Networking"],
      Software: ["Operating Systems", "Applications", "Security"],
      Services: ["Support", "Consulting", "Training"],
    },
    Services: {
      "Food & Beverage": ["Event Catering", "Office Catering", "Vending"],
      Cleaning: ["Office Cleaning", "Deep Cleaning", "Maintenance"],
      Maintenance: ["HVAC", "Electrical", "Plumbing"],
    },
    Manufacturing: {
      "Raw Materials": ["Metals", "Plastics", "Chemicals"],
      Components: ["Electronic", "Mechanical", "Fasteners"],
      Tools: ["Hand Tools", "Power Tools", "Measuring"],
    },
  };

  const uomOptions = [
    "Piece",
    "Unit",
    "Set",
    "Pair",
    "Box",
    "Pack",
    "Carton",
    "Dozen",
    "Meter",
    "Kilogram",
    "Liter",
    "Square Meter",
    "Cubic Meter",
    "Hour",
    "Day",
    "Month",
    "Year",
    "Person",
    "Service",
  ];

  const steps = [
    {
      number: 1,
      title: "Basic Info",
      description: "Title and category",
    },
    {
      number: 2,
      title: "Add Items",
      description: "Product or Service List",
    },
    { number: 3, title: "Review", description: "Confirm and save" },
  ];

  const handleDropdownToggle = (dropdown: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleCategorySelect = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      category,
      subCategory: "",
      subSubCategory: "",
    }));
    setDropdowns((prev) => ({ ...prev, category: false }));
  };

  const handleSubCategorySelect = (subCategory: string) => {
    setFormData((prev) => ({
      ...prev,
      subCategory,
      subSubCategory: "",
    }));
    setDropdowns((prev) => ({ ...prev, subCategory: false }));
  };

  const handleSubSubCategorySelect = (subSubCategory: string) => {
    setFormData((prev) => ({ ...prev, subSubCategory }));
    setDropdowns((prev) => ({ ...prev, subSubCategory: false }));
  };

  const handleAddItem = () => {
    if (newItem.productName.trim() && newItem.uom) {
      const item: RFQItem = {
        id: Date.now().toString(),
        productName: newItem.productName.trim(),
        uom: newItem.uom,
      };
      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, item],
      }));
      setNewItem({ productName: "", uom: "" });
    }
  };

  const handleRemoveItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
    handleClose();
  };

  const handleClose = () => {
    setCurrentStep(1);
    setFormData({
      title: "",
      category: "",
      subCategory: "",
      subSubCategory: "",
      items: [],
    });
    setNewItem({ productName: "", uom: "" });
    setDropdowns({
      category: false,
      subCategory: false,
      subSubCategory: false,
    });
    onClose();
  };

  const isStep1Valid = () => {
    return formData.title.trim() && formData.category;
  };

  const isStep2Valid = () => {
    return formData.items.length > 0;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end lg:items-center justify-center">
      <div className="bg-white w-full h-full lg:h-auto lg:max-w-2xl lg:rounded-xl lg:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="text-purple-600" size={24} />
            <h2 className="text-xl font-medium text-gray-900">
              Create Contract Template
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep >= step.number
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </div>
                <div className="ml-3 hidden lg:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-purple-600"
                        : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 lg:w-20 h-0.5 mx-4 ${
                      currentStep > step.number
                        ? "bg-purple-600"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-4 lg:p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Template Information
                </h3>

                {/* Template Title */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="outline-none w-full px-4 py-3 border border-gray-300 rounded-lg "
                    placeholder="Enter template title"
                  />
                </div>

                {/* Category Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="outline-none w-full px-4 py-3 border border-gray-300 rounded-lg "
                      placeholder="Enter template category"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <div className="flex items-center space-x-2">
                      <Package className="w-4 h-4" />
                      <span>Upload Templates</span>
                    </div>
                  </label>

                  {/* Show Add Item button if no items with names exist */}

                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                    <Paperclip className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    {/* <p className="text-gray-500 mb-4">No items added yet</p> */}
                    <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                      <button
                        type="button"
                        //  onClick={() => setShowItemModal(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                      >
                        <Plus className="w-5 h-5" />
                        <span>Add Document</span>
                      </button>
                      <button
                        type="button"
                        //  onClick={() => setShowItemModal(true)}
                        className="flex items-center space-x-2 px-6 py-3 bg-transparent hover:from-purple-600 hover:to-purple-700 text-black border border-gray-300 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                      >
                        <FileText className="w-5 h-5" />
                        <span>Use Template</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={currentStep === 1 ? handleClose : handlePrevious}
              className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {currentStep === 1 ? (
                <>
                  <X size={16} className="mr-2" />
                  Cancel
                </>
              ) : (
                <>
                  <ArrowLeft size={16} className="mr-2" />
                  Previous
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Save size={16} className="mr-2" />
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractTemplateCreateForm;
