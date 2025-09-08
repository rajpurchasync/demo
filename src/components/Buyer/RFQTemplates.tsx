import React, { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Filter,
  ChevronDown,
  X,
  Save,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import TemplateCreateForm from "./TemplateCreateForm";
import TemplateEditForm from "./TemplateEditForm";
import QuantityInputModal from "./QuantityInputModal";

interface RFQItem {
  id: string;
  productName: string;
  uom: string;
  quantity?: number;
}

interface RFQTemplate {
  id: string;
  templateNo: string;
  title: string;
  category: string;
  subCategory: string;
  subSubCategory?: string;
  items: RFQItem[];
  createdDate: string;
}

interface RFQTemplatesProps {
  sidebarCollapsed: boolean;
}

const RFQTemplates: React.FC<RFQTemplatesProps> = ({ sidebarCollapsed }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<RFQTemplate | null>(
    null
  );
  const [isQuantityModalOpen, setIsQuantityModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<RFQTemplate | null>(
    null
  );

  const [filters, setFilters] = useState({
    category: "",
    subCategory: "",
  });

  const [templates, setTemplates] = useState<RFQTemplate[]>([
    {
      id: "1",
      templateNo: "TPL-001",
      title: "Office Equipment Standard",
      category: "Office Supplies",
      subCategory: "Furniture",
      subSubCategory: "Desks & Chairs",
      items: [
        { id: "1", productName: "Executive Desk", uom: "Piece" },
        { id: "2", productName: "Office Chair", uom: "Piece" },
        { id: "3", productName: "Filing Cabinet", uom: "Piece" },
      ],
      createdDate: "2024-01-10",
    },
    {
      id: "2",
      templateNo: "TPL-002",
      title: "IT Hardware Procurement",
      category: "Technology",
      subCategory: "Hardware",
      subSubCategory: "Computers",
      items: [
        { id: "1", productName: "Desktop Computer", uom: "Unit" },
        { id: "2", productName: 'Monitor 24"', uom: "Unit" },
        { id: "3", productName: "Keyboard & Mouse Set", uom: "Set" },
      ],
      createdDate: "2024-01-08",
    },
    {
      id: "3",
      templateNo: "TPL-003",
      title: "Catering Services",
      category: "Services",
      subCategory: "Food & Beverage",
      subSubCategory: "Event Catering",
      items: [
        { id: "1", productName: "Breakfast Package", uom: "Person" },
        { id: "2", productName: "Lunch Package", uom: "Person" },
        { id: "3", productName: "Coffee Break", uom: "Person" },
      ],
      createdDate: "2024-01-05",
    },
  ]);

  const categories = [
    "Office Supplies",
    "Technology",
    "Services",
    "Manufacturing",
  ];
  const subCategories: { [key: string]: string[] } = {
    "Office Supplies": ["Furniture", "Stationery", "Equipment"],
    Technology: ["Hardware", "Software", "Services"],
    Services: ["Food & Beverage", "Cleaning", "Maintenance"],
    Manufacturing: ["Raw Materials", "Components", "Tools"],
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.templateNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !filters.category || template.category === filters.category;
    const matchesSubCategory =
      !filters.subCategory || template.subCategory === filters.subCategory;

    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  const handleCreateTemplate = (
    templateData: Omit<RFQTemplate, "id" | "templateNo" | "createdDate">
  ) => {
    const newTemplate: RFQTemplate = {
      ...templateData,
      id: Date.now().toString(),
      templateNo: `TPL-${String(templates.length + 1).padStart(3, "0")}`,
      createdDate: new Date().toISOString().split("T")[0],
    };
    setTemplates((prev) => [...prev, newTemplate]);
    setIsCreateFormOpen(false);
    showSuccess("Template created successfully!");
  };

  const handleEditTemplate = (template: RFQTemplate) => {
    setEditingTemplate(template);
    setIsEditFormOpen(true);
  };

  const handleUpdateTemplate = (updatedTemplate: RFQTemplate) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === updatedTemplate.id ? updatedTemplate : t))
    );
    setIsEditFormOpen(false);
    setEditingTemplate(null);
    showSuccess("Template updated successfully!");
  };

  const handleMakeRFQ = (template: RFQTemplate) => {
    setSelectedTemplate(template);
    setIsQuantityModalOpen(true);
  };

  const handleCreateRFQ = (templateWithQuantities: RFQTemplate) => {
    setIsQuantityModalOpen(false);
    setSelectedTemplate(null);
    showSuccess(`RFQ created from template "${templateWithQuantities.title}"!`);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates((prev) => prev.filter((t) => t.id !== id));
    showSuccess("Template deleted successfully!");
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const clearFilters = () => {
    setFilters({ category: "", subCategory: "" });
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );

  return (
    <main
      className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}
      pb-8 min-h-screen bg-gray-50 rounded-[12px] overflow-hidden
    `}
    >
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <FileText size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      {/* <div className="mb-8 mt-12 lg:mt-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <FileText className="text-purple-600" size={28} />
              <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">
                RFQ Templates
              </h1>
            </div>
            <p className="text-gray-600">
              Create and manage reusable RFQ templates
            </p>
          </div>
          <button
            onClick={() => setIsCreateFormOpen(true)}
            className="hidden lg:flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <Plus size={16} className="mr-2" />
            <span>Create Template</span>
          </button>
        </div>
      </div> */}
      <div className="bg-white flex items-center justify-between p-4 py-3  lg:py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              RFQ Templates
            </h1>
          </div>
        </div>

        <button
          onClick={() => setIsCreateFormOpen(true)}
          className="bg-gray-900 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors text-xs sm:text-sm min-h-[16px]"
        >
          <span className="hidden sm:inline">Create RFQ Template</span>
        </button>
      </div>

      {/* Search and Filters */}

      {/* Templates List */}
      <div className="bg-white">
        {/* Mobile: Card Layout */}
        <div className="lg:hidden">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                      {template.templateNo}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {template.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {template.category} → {template.subCategory}
                    {template.subSubCategory && ` → ${template.subSubCategory}`}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {template.items.length} items
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-gray-600">Created:</span>
                  <p className="font-medium text-gray-900">
                    {new Date(template.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(template.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <button
                  onClick={() => handleMakeRFQ(template)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
                >
                  Make RFQ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden lg:block bg-white  shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-[16px]">
                    Template No.
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-[16px]">
                    Template Title
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-[16px]">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-500 text-[16px]">
                    Items
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-500 text-[16px]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTemplates.map((template) => (
                  <tr
                    key={template.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <span className="inline-block bg-purple-100 text-purple-800 px-2 py-1 text-xs font-medium rounded-full">
                        {template.templateNo}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <h3 className="font-semibold text-gray-900">
                        {template.title}
                      </h3>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">
                          {template.category}
                        </p>
                        {/* <p className="text-gray-600">{template.subCategory}</p> */}
                        {/* {template.subSubCategory && (
                          <p className="text-gray-500 text-xs">
                            {template.subSubCategory}
                          </p>
                        )} */}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium rounded-full">
                        {template.items.length} items
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditTemplate(template)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Template"
                        >
                          <Edit size={16} />
                        </button>
                        {/* <button
                          onClick={() => handleMakeRFQ(template)}
                          className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors font-medium"
                          title="Make RFQ"
                        >
                          Make RFQ
                        </button> */}
                        <button
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || hasActiveFilters
                ? "Try adjusting your search or filters"
                : "Create your first RFQ template to get started"}
            </p>
            <button
              onClick={() => setIsCreateFormOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              <Plus size={16} className="mr-2" />
              Create Template
            </button>
          </div>
        )}
      </div>

      {/* Floating Create Button (Mobile) */}
      <button
        onClick={() => setIsCreateFormOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors flex items-center justify-center z-40"
      >
        <Plus size={24} />
      </button>

      {/* Template Create Form */}
      <TemplateCreateForm
        isOpen={isCreateFormOpen}
        onClose={() => setIsCreateFormOpen(false)}
        onSave={handleCreateTemplate}
      />

      {/* Template Edit Form */}
      <TemplateEditForm
        isOpen={isEditFormOpen}
        onClose={() => {
          setIsEditFormOpen(false);
          setEditingTemplate(null);
        }}
        onSave={handleUpdateTemplate}
        template={editingTemplate}
      />

      {/* Quantity Input Modal */}
      <QuantityInputModal
        isOpen={isQuantityModalOpen}
        onClose={() => {
          setIsQuantityModalOpen(false);
          setSelectedTemplate(null);
        }}
        onSave={handleCreateRFQ}
        template={selectedTemplate}
      />
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default RFQTemplates;
