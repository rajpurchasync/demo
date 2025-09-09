import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Paperclip,
  Eye,
  Save,
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
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

interface CreateKYCTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTemplate: (
    template: Omit<KYCTemplate, "id" | "createdBy" | "createdOn" | "status">
  ) => void;
  editingTemplate?: KYCTemplate | null;
}

const supplierCategories = [
  "Food & Beverages",
  "Technology",
  "Cleaning Services",
  "Equipment & Machinery",
  "Professional Services",
  "Maintenance & Repair",
  "Transportation & Logistics",
  "Construction & Materials",
  "Healthcare & Medical",
  "Others",
];

const fieldTypes = [
  { value: "text", label: "Text Input" },
  { value: "number", label: "Number" },
  { value: "dropdown", label: "Dropdown" },
  { value: "yes_no", label: "Yes/No" },
  { value: "date", label: "Date" },
  { value: "file", label: "File Upload" },
];

const standardSections = [
  {
    id: "basic-info",
    title: "Basic Information",
    description: "Essential company details and contact information",
    isStandard: true,
    order: 1,
    fields: [
      {
        id: "company-name",
        name: "Company Name",
        type: "text" as const,
        required: true,
        documentRequired: false,
      },
      {
        id: "registration-number",
        name: "Registration Number",
        type: "text" as const,
        required: true,
        documentRequired: false,
      },
      {
        id: "address",
        name: "Business Address",
        type: "text" as const,
        required: true,
        documentRequired: false,
      },
      {
        id: "contact-person",
        name: "Primary Contact Person",
        type: "text" as const,
        required: true,
        documentRequired: false,
      },
      {
        id: "email",
        name: "Contact Email",
        type: "text" as const,
        required: true,
        documentRequired: false,
      },
      {
        id: "phone",
        name: "Phone Number",
        type: "text" as const,
        required: true,
        documentRequired: false,
      },
    ],
  },
  {
    id: "documents",
    title: "Documents and Certificates",
    description: "Required legal documents and certifications",
    isStandard: true,
    order: 2,
    fields: [
      {
        id: "business-license",
        name: "Business License",
        type: "file" as const,
        required: true,
        documentRequired: true,
      },
      {
        id: "tax-certificate",
        name: "Tax Registration Certificate",
        type: "file" as const,
        required: true,
        documentRequired: true,
      },
      {
        id: "insurance-cert",
        name: "Insurance Certificate",
        type: "file" as const,
        required: false,
        documentRequired: true,
      },
    ],
  },
  {
    id: "key-personnel",
    title: "Key Personnel",
    description: "Government-affiliated personnel information",
    isStandard: true,
    order: 3,
    fields: [
      {
        id: "govt-affiliated",
        name: "Any government-affiliated personnel?",
        type: "yes_no" as const,
        required: true,
        documentRequired: false,
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance",
    description: "Local compliance and international sanctions",
    isStandard: true,
    order: 4,
    fields: [
      {
        id: "local-compliance",
        name: "Local Compliance Certificate",
        type: "yes_no" as const,
        required: true,
        documentRequired: true,
      },
      {
        id: "international-sanctions",
        name: "Subject to International Sanctions?",
        type: "yes_no" as const,
        required: true,
        documentRequired: false,
      },
      {
        id: "anti-corruption",
        name: "Anti-Corruption Policy Compliance",
        type: "yes_no" as const,
        required: true,
        documentRequired: true,
      },
    ],
  },
  {
    id: "notes",
    title: "Notes to Supplier",
    description: "Additional instructions and policy documents",
    isStandard: true,
    order: 5,
    fields: [
      {
        id: "special-requirements",
        name: "Special Requirements",
        type: "text" as const,
        required: false,
        documentRequired: false,
        placeholder: "Any specific requirements or instructions",
      },
      {
        id: "policy-documents",
        name: "Policy Documents (T&C, Procurement Policy)",
        type: "file" as const,
        required: false,
        documentRequired: true,
      },
    ],
  },
  {
    id: "attachments",
    title: "Additional Attachments",
    description: "Any additional documents or files",
    isStandard: true,
    order: 6,
    fields: [
      {
        id: "company-profile",
        name: "Company Profile/Brochure",
        type: "file" as const,
        required: false,
        documentRequired: true,
      },
      {
        id: "references",
        name: "Client References",
        type: "file" as const,
        required: false,
        documentRequired: true,
      },
    ],
  },
];

export function CreateKYCTemplateModal({
  isOpen,
  onClose,
  onCreateTemplate,
  editingTemplate,
}: CreateKYCTemplateModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
  });

  const [sections, setSections] = useState<KYCSection[]>(standardSections);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["basic-info"])
  );
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [draggedField, setDraggedField] = useState<{
    sectionId: string;
    fieldId: string;
  } | null>(null);

  // Initialize form data when editing
  useEffect(() => {
    if (editingTemplate) {
      setFormData({
        title: editingTemplate.title,
        category: editingTemplate.category,
      });
      setSections(editingTemplate.sections);
      setExpandedSections(
        new Set([editingTemplate.sections[0]?.id || "basic-info"])
      );
    } else {
      setFormData({ title: "", category: "" });
      setSections(standardSections);
      setExpandedSections(new Set(["basic-info"]));
    }
  }, [editingTemplate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      return;
    }

    const templateData = {
      title: formData.title,
      category: formData.category,
      sections: sections.map((section, index) => ({
        ...section,
        order: index + 1,
      })),
    };

    onCreateTemplate(templateData);
    handleClose();
  };

  const handleClose = () => {
    setFormData({ title: "", category: "" });
    setSections(standardSections);
    setExpandedSections(new Set(["basic-info"]));
    setPreviewModalOpen(false);
    onClose();
  };

  const handlePreview = () => {
    const previewTemplate = {
      id: "preview",
      title: formData.title || "Preview Template",
      category: formData.category || "General",
      createdBy: "Current User",
      createdOn: new Date().toISOString().split("T")[0],
      status: "Draft" as const,
      sections: sections.map((section, index) => ({
        ...section,
        order: index + 1,
      })),
    };
    setPreviewModalOpen(true);
  };

  // Section Management
  const addCustomSection = () => {
    const newSection: KYCSection = {
      id: `custom-${Date.now()}`,
      title: "New Section",
      description: "Custom section description",
      isStandard: false,
      order: sections.length + 1,
      fields: [],
    };
    setSections([...sections, newSection]);
    setExpandedSections((prev) => new Set([...prev, newSection.id]));
  };

  const updateSection = (sectionId: string, updates: Partial<KYCSection>) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      )
    );
  };

  const removeSection = (sectionId: string) => {
    setSections((prev) => prev.filter((section) => section.id !== sectionId));
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(sectionId);
      return newSet;
    });
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  // Field Management
  const addField = (sectionId: string) => {
    const newField: KYCField = {
      id: `field-${Date.now()}`,
      name: "New Field",
      type: "text",
      required: false,
      documentRequired: false,
    };

    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, fields: [...section.fields, newField] }
          : section
      )
    );
  };

  const updateField = (
    sectionId: string,
    fieldId: string,
    updates: Partial<KYCField>
  ) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, ...updates } : field
              ),
            }
          : section
      )
    );
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldId),
            }
          : section
      )
    );
  };

  // Drag and Drop for Sections
  const handleSectionDragStart = (sectionId: string) => {
    setDraggedSection(sectionId);
  };

  const handleSectionDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSectionDrop = (targetSectionId: string) => {
    if (!draggedSection || draggedSection === targetSectionId) return;

    const draggedIndex = sections.findIndex((s) => s.id === draggedSection);
    const targetIndex = sections.findIndex((s) => s.id === targetSectionId);

    const newSections = [...sections];
    const [draggedItem] = newSections.splice(draggedIndex, 1);
    newSections.splice(targetIndex, 0, draggedItem);

    setSections(newSections);
    setDraggedSection(null);
  };

  // Drag and Drop for Fields
  const handleFieldDragStart = (sectionId: string, fieldId: string) => {
    setDraggedField({ sectionId, fieldId });
  };

  const handleFieldDrop = (targetSectionId: string, targetFieldId: string) => {
    if (
      !draggedField ||
      (draggedField.sectionId === targetSectionId &&
        draggedField.fieldId === targetFieldId)
    )
      return;

    const sourceSection = sections.find((s) => s.id === draggedField.sectionId);
    const targetSection = sections.find((s) => s.id === targetSectionId);

    if (!sourceSection || !targetSection) return;

    const draggedFieldData = sourceSection.fields.find(
      (f) => f.id === draggedField.fieldId
    );
    if (!draggedFieldData) return;

    const newSections = sections.map((section) => {
      if (section.id === draggedField.sectionId) {
        return {
          ...section,
          fields: section.fields.filter((f) => f.id !== draggedField.fieldId),
        };
      }
      if (section.id === targetSectionId) {
        const targetIndex = section.fields.findIndex(
          (f) => f.id === targetFieldId
        );
        const newFields = [...section.fields];
        newFields.splice(targetIndex, 0, draggedFieldData);
        return { ...section, fields: newFields };
      }
      return section;
    });

    setSections(newSections);
    setDraggedField(null);
  };

  const renderField = (sectionId: string, field: KYCField) => (
    <div
      key={field.id}
      draggable
      onDragStart={() => handleFieldDragStart(sectionId, field.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => handleFieldDrop(sectionId, field.id)}
      className="flex items-center gap-3 p-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors cursor-move"
    >
      <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-3 items-center">
        <Input
          value={field.name}
          onChange={(e) =>
            updateField(sectionId, field.id, { name: e.target.value })
          }
          placeholder="Field name"
          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
        />

        <Select
          value={field.type}
          onValueChange={(value) =>
            updateField(sectionId, field.id, {
              type: value as KYCField["type"],
            })
          }
        >
          <SelectTrigger className="bg-white border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fieldTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-4 ml-[20px]">
          <div className="flex items-center gap-2 min-w-[120px]">
            <Switch
              checked={field.required}
              onCheckedChange={(checked) =>
                updateField(sectionId, field.id, { required: checked })
              }
              // className="data-[state=checked]:bg-red-600"
            />
            <span className="text-sm text-gray-700">
              {field.required ? "Mandatory" : "Optional"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={field.documentRequired}
              onCheckedChange={(checked) =>
                updateField(sectionId, field.id, { documentRequired: checked })
              }
              // className="data-[state=checked]:bg-blue-600"
            />
            <span className="text-sm text-gray-700">Document</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={() => removeField(sectionId, field.id)}
          size="sm"
          variant="ghost"
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-semibold text-gray-900">
              {editingTemplate ? "Edit KYC Template" : "Create KYC Template"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full max-h-[calc(95vh-80px)]">
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Information */}
                <Card className="border-gray-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">
                      Template Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="title"
                          className="text-gray-700 font-medium"
                        >
                          Template Title *
                        </Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          placeholder="e.g., Food Supplier KYC"
                          className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                          required
                        />
                      </div>
                      <div>
                        <Label className="text-gray-700 font-medium">
                          Supplier Category *
                        </Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) =>
                            setFormData({ ...formData, category: value })
                          }
                        >
                          <SelectTrigger className="bg-white border-gray-300">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {supplierCategories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sections */}
                <Card className="border-gray-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Template Sections
                      </CardTitle>
                      <Button
                        type="button"
                        onClick={addCustomSection}
                        size="sm"
                        variant="outline"
                        className="text-purple-600 border-purple-600 hover:bg-purple-50"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Section
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        draggable
                        onDragStart={() => handleSectionDragStart(section.id)}
                        onDragOver={handleSectionDragOver}
                        onDrop={() => handleSectionDrop(section.id)}
                        className="border border-gray-300 rounded-lg overflow-hidden bg-white"
                      >
                        <Collapsible
                          open={expandedSections.has(section.id)}
                          onOpenChange={() => toggleSection(section.id)}
                        >
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer border-b border-gray-200">
                              <div className="flex items-center gap-3">
                                <GripVertical className="w-4 h-4 text-gray-400" />
                                <div>
                                  <h4 className="font-medium text-gray-900">
                                    {section.title}
                                  </h4>
                                  <p className="text-sm text-gray-600">
                                    {section.description}
                                  </p>
                                </div>
                                {!section.isStandard && (
                                  <Badge
                                    // variant="secondary"
                                    className="bg-purple-100 text-purple-700"
                                  >
                                    Custom
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  // variant="outline"
                                  className="text-xs border-gray-300"
                                >
                                  {section.fields.length} fields
                                </Badge>
                                {!section.isStandard && (
                                  <Button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeSection(section.id);
                                    }}
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                )}
                                {expandedSections.has(section.id) ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </div>
                            </div>
                          </CollapsibleTrigger>

                          <CollapsibleContent>
                            <div className="p-4 space-y-4 bg-white">
                              {!section.isStandard && (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                                  <div>
                                    <Label className="text-gray-700 font-medium">
                                      Section Title
                                    </Label>
                                    <Input
                                      value={section.title}
                                      onChange={(e) =>
                                        updateSection(section.id, {
                                          title: e.target.value,
                                        })
                                      }
                                      placeholder="Section title"
                                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-gray-700 font-medium">
                                      Description
                                    </Label>
                                    <Input
                                      value={section.description || ""}
                                      onChange={(e) =>
                                        updateSection(section.id, {
                                          description: e.target.value,
                                        })
                                      }
                                      placeholder="Section description"
                                      className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="space-y-3">
                                {section.fields.map((field) =>
                                  renderField(section.id, field)
                                )}
                              </div>

                              <Button
                                type="button"
                                onClick={() => addField(section.id)}
                                size="sm"
                                variant="outline"
                                className="w-full border-dashed border-gray-400 text-gray-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Add Field
                              </Button>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t border-gray-200">
                  <Button type="button" variant="outline" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePreview}
                    className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button
                    type="submit"
                    disabled={!formData.title || !formData.category}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Save className="w-4 h-4 mr-1" />
                    {editingTemplate ? "Update Template" : "Create Template"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <KYCPreviewModal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        template={{
          id: "preview",
          title: formData.title || "Preview Template",
          category: formData.category || "General",
          createdBy: "Current User",
          createdOn: new Date().toISOString().split("T")[0],
          status: "Draft",
          sections: sections.map((section, index) => ({
            ...section,
            order: index + 1,
          })),
        }}
      />
    </>
  );
}
