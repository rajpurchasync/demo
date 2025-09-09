import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  FileText,
  Calendar,
  User,
  Search,
  Eye,
  Copy,
} from "lucide-react";

import { format } from "date-fns";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CreateKYCTemplateModal } from "./CreateKYCTemplateModal";
import { KYCPreviewModal } from "./KYCPreviewModal";

interface KYCField {
  id: string;
  name: string;
  type: "text" | "number" | "dropdown" | "yes_no" | "date" | "file";
  required: boolean;
  documentRequired: boolean;
  options?: string[];
  placeholder?: string;
}

interface KYCSection {
  id: string;
  title: string;
  description?: string;
  isStandard: boolean;
  fields: KYCField[];
  order: number;
}

interface KYCTemplate {
  id: string;
  title: string;
  category: string;
  createdBy: string;
  createdOn: string;
  sections: KYCSection[];
  status: "Draft" | "Active" | "Archived";
}

const mockKYCTemplates: KYCTemplate[] = [
  {
    id: "1",
    title: "Food Supplier KYC",
    category: "Food & Beverages",
    createdBy: "John Doe",
    createdOn: "2024-01-15",
    status: "Active",
    sections: [
      {
        id: "basic-info",
        title: "Basic Information",
        description: "Essential company details",
        isStandard: true,
        order: 1,
        fields: [
          {
            id: "company-name",
            name: "Company Name",
            type: "text",
            required: true,
            documentRequired: false,
          },
          {
            id: "license-number",
            name: "License Number",
            type: "text",
            required: true,
            documentRequired: true,
          },
          {
            id: "location",
            name: "Location",
            type: "text",
            required: true,
            documentRequired: false,
          },
          {
            id: "contact-person",
            name: "Contact Person",
            type: "text",
            required: true,
            documentRequired: false,
          },
        ],
      },
      {
        id: "documents",
        title: "Documents and Certificates",
        description: "Required documentation",
        isStandard: true,
        order: 2,
        fields: [
          {
            id: "business-license",
            name: "Business License",
            type: "file",
            required: true,
            documentRequired: true,
          },
          {
            id: "haccp-cert",
            name: "HACCP Certificate",
            type: "file",
            required: true,
            documentRequired: true,
          },
          {
            id: "municipality-approval",
            name: "Municipality Approval",
            type: "file",
            required: true,
            documentRequired: true,
          },
        ],
      },
      {
        id: "key-personnel",
        title: "Key Personnel",
        description: "Key team members information",
        isStandard: true,
        order: 3,
        fields: [
          {
            id: "ceo-name",
            name: "CEO Name",
            type: "text",
            required: true,
            documentRequired: false,
          },
          {
            id: "quality-manager",
            name: "Quality Manager",
            type: "text",
            required: true,
            documentRequired: false,
          },
          {
            id: "contact-email",
            name: "Primary Contact Email",
            type: "text",
            required: true,
            documentRequired: false,
          },
        ],
      },
      {
        id: "compliance",
        title: "Compliance",
        description: "Regulatory compliance information",
        isStandard: true,
        order: 4,
        fields: [
          {
            id: "organic-cert",
            name: "Do you have organic certification?",
            type: "yes_no",
            required: false,
            documentRequired: true,
          },
          {
            id: "years-business",
            name: "Years in business",
            type: "number",
            required: false,
            documentRequired: false,
          },
          {
            id: "iso-cert",
            name: "ISO Certification",
            type: "yes_no",
            required: false,
            documentRequired: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Technology Supplier KYC",
    category: "Technology",
    createdBy: "Sara Smith",
    createdOn: "2024-01-20",
    status: "Active",
    sections: [
      {
        id: "basic-info",
        title: "Basic Information",
        description: "Essential company details",
        isStandard: true,
        order: 1,
        fields: [
          {
            id: "company-name",
            name: "Company Name",
            type: "text",
            required: true,
            documentRequired: false,
          },
          {
            id: "registration-number",
            name: "Registration Number",
            type: "text",
            required: true,
            documentRequired: true,
          },
          {
            id: "headquarters",
            name: "Headquarters Location",
            type: "text",
            required: true,
            documentRequired: false,
          },
        ],
      },
      {
        id: "technical-specs",
        title: "Technical Specifications",
        description: "Technical capabilities and certifications",
        isStandard: false,
        order: 2,
        fields: [
          {
            id: "tech-stack",
            name: "Primary Technology Stack",
            type: "dropdown",
            required: true,
            documentRequired: false,
            options: ["Java", "Python", ".NET", "Node.js", "Other"],
          },
          {
            id: "security-cert",
            name: "Security Certifications",
            type: "file",
            required: true,
            documentRequired: true,
          },
          {
            id: "uptime-guarantee",
            name: "Uptime Guarantee (%)",
            type: "number",
            required: true,
            documentRequired: false,
          },
        ],
      },
    ],
  },
];

export function KYCTemplateView() {
  const [templates, setTemplates] = useState<KYCTemplate[]>(mockKYCTemplates);
  const [searchTerm, setSearchTerm] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<KYCTemplate | null>(
    null
  );
  const [previewTemplate, setPreviewTemplate] = useState<KYCTemplate | null>(
    null
  );

  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTemplate = (
    templateData: Omit<KYCTemplate, "id" | "createdBy" | "createdOn" | "status">
  ) => {
    const newTemplate: KYCTemplate = {
      ...templateData,
      id: Date.now().toString(),
      createdBy: "Current User",
      createdOn: new Date().toISOString().split("T")[0],
      status: "Draft",
    };

    setTemplates((prev) => [newTemplate, ...prev]);
    toast.success(`KYC Template "${newTemplate.title}" created successfully`);
  };

  const handleUpdateTemplate = (
    templateData: Omit<KYCTemplate, "id" | "createdBy" | "createdOn" | "status">
  ) => {
    if (!editingTemplate) return;

    const updatedTemplate: KYCTemplate = {
      ...editingTemplate,
      ...templateData,
    };

    setTemplates((prev) =>
      prev.map((t) => (t.id === editingTemplate.id ? updatedTemplate : t))
    );
    toast.success(
      `KYC Template "${updatedTemplate.title}" updated successfully`
    );
    setEditingTemplate(null);
  };

  const handleEditTemplate = (template: KYCTemplate) => {
    setEditingTemplate(template);
    setCreateModalOpen(true);
  };

  const handlePreviewTemplate = (template: KYCTemplate) => {
    setPreviewTemplate(template);
    setPreviewModalOpen(true);
  };

  const handleDuplicateTemplate = (template: KYCTemplate) => {
    const duplicatedTemplate: KYCTemplate = {
      ...template,
      id: Date.now().toString(),
      title: `${template.title} (Copy)`,
      createdBy: "Current User",
      createdOn: new Date().toISOString().split("T")[0],
      status: "Draft",
    };

    setTemplates((prev) => [duplicatedTemplate, ...prev]);
    toast.success(`Template duplicated: "${duplicatedTemplate.title}"`);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setTemplates((prev) => prev.filter((t) => t.id !== templateId));
      toast.success(`KYC Template "${template.title}" deleted successfully`);
    }
  };

  const handleStatusChange = (
    templateId: string,
    status: "Draft" | "Active" | "Archived"
  ) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === templateId ? { ...t, status } : t))
    );
    toast.success(`Template status changed to ${status}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "food & beverages":
        return "bg-green-100 text-green-700";
      case "technology":
        return "bg-blue-100 text-blue-700";
      case "cleaning":
        return "bg-purple-100 text-purple-700";
      case "equipment":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Archived":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            KYC Templates
          </h1>
          <p className="text-gray-600">
            Create and manage supplier KYC templates
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <Button
            onClick={() => {
              setEditingTemplate(null);
              setCreateModalOpen(true);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white w-full lg:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create KYC Template
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Template Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created By
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Created On
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Sections
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {template.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(template.category)}
                    >
                      {template.category}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(template.status)}
                    >
                      {template.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {template.createdBy}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {format(new Date(template.createdOn), "MMM d, yyyy")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {template.sections.length} sections
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePreviewTemplate(template)}
                        className="p-2"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTemplate(template)}
                        className="p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicateTemplate(template)}
                        className="p-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="p-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-medium text-gray-900 mb-2">
                    {template.title}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className={getCategoryColor(template.category)}
                    >
                      {template.category}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(template.status)}
                    >
                      {template.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Template Stats */}
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-900">
                  {template.sections.length}
                </div>
                <div className="text-xs text-gray-500">Sections</div>
              </div>

              {/* Created Info */}
              <div className="pt-3 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <User className="w-3 h-3" />
                  <span>Created by {template.createdBy}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {format(new Date(template.createdOn), "MMM d, yyyy")}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-3 border-t border-gray-200">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreviewTemplate(template)}
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditTemplate(template)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDuplicateTemplate(template)}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No templates found
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm
              ? "Try adjusting your search terms"
              : "Create your first KYC template to get started"}
          </p>
          {!searchTerm && (
            <Button
              onClick={() => {
                setEditingTemplate(null);
                setCreateModalOpen(true);
              }}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create KYC Template
            </Button>
          )}
        </div>
      )}

      {/* Create/Edit KYC Template Modal */}
      <CreateKYCTemplateModal
        isOpen={createModalOpen}
        onClose={() => {
          setCreateModalOpen(false);
          setEditingTemplate(null);
        }}
        onCreateTemplate={
          editingTemplate ? handleUpdateTemplate : handleCreateTemplate
        }
        editingTemplate={editingTemplate}
      />

      {/* Preview Modal */}
      <KYCPreviewModal
        isOpen={previewModalOpen}
        onClose={() => {
          setPreviewModalOpen(false);
          setPreviewTemplate(null);
        }}
        template={previewTemplate}
      />
    </div>
  );
}
