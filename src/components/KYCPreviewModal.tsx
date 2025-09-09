import React, { useState } from "react";
import {
  X,
  AlertCircle,
  Paperclip,
  ChevronDown,
  ChevronUp,
  Upload,
  Calendar,
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
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

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

interface KYCPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: KYCTemplate | null;
}

export function KYCPreviewModal({
  isOpen,
  onClose,
  template,
}: KYCPreviewModalProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [formData, setFormData] = useState<Record<string, any>>({});

  if (!template) return null;

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

  const updateFormData = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const renderField = (field: KYCField) => {
    const fieldValue = formData[field.id] || "";

    switch (field.type) {
      case "text":
        return (
          <Input
            value={fieldValue}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={
              field.placeholder || `Enter ${field.name.toLowerCase()}`
            }
            className="mt-1"
          />
        );

      case "number":
        return (
          <Input
            type="number"
            value={fieldValue}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={`Enter ${field.name.toLowerCase()}`}
            className="mt-1"
          />
        );

      case "dropdown":
        return (
          <Select
            value={fieldValue}
            onValueChange={(value) => updateFormData(field.id, value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={`Select ${field.name.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "yes_no":
        return (
          <Select
            value={fieldValue}
            onValueChange={(value) => updateFormData(field.id, value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <div className="relative mt-1">
            <Input
              type="date"
              value={fieldValue}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              className="pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        );

      case "file":
        return (
          <div className="mt-1">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, JPG, PNG (max 10MB)
              </p>
              <input
                type="file"
                className="hidden"
                onChange={(e) =>
                  updateFormData(field.id, e.target.files?.[0]?.name || "")
                }
              />
            </div>
            {fieldValue && (
              <div className="mt-2 flex items-center gap-2 p-2 bg-green-50 border border-green-200 rounded">
                <Paperclip className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700">{fieldValue}</span>
              </div>
            )}
          </div>
        );

      default:
        return (
          <Input
            value={fieldValue}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={`Enter ${field.name.toLowerCase()}`}
            className="mt-1"
          />
        );
    }
  };

  const sortedSections = [...template.sections].sort(
    (a, b) => a.order - b.order
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-semibold text-gray-900">
                {template.title}
              </DialogTitle>
              <p className="text-sm text-gray-600 mt-1">
                Supplier KYC Form Preview • {template.category}
              </p>
            </div>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Preview Mode
            </Badge>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Instructions */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">
                      Instructions for Suppliers
                    </h4>
                    <p className="text-sm text-blue-800">
                      Please complete all required fields marked with{" "}
                      <span className="text-red-600">*</span>. Upload supporting
                      documents where indicated. This information will be
                      reviewed by our procurement team.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Sections */}
            <div className="space-y-4">
              {sortedSections.map((section, index) => (
                <Card key={section.id} className="overflow-hidden">
                  <Collapsible
                    open={expandedSections.has(section.id)}
                    onOpenChange={() => toggleSection(section.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <CardTitle className="text-lg font-medium text-gray-900">
                                {section.title}
                                {section.fields.some((f) => f.required) && (
                                  <span className="text-red-500 ml-1">*</span>
                                )}
                              </CardTitle>
                              {section.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {section.description}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {section.fields.length} fields
                            </Badge>
                            {expandedSections.has(section.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <CardContent className="pt-0 pb-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {section.fields.map((field) => (
                            <div key={field.id} className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Label className="text-sm font-medium text-gray-700">
                                  {field.name}
                                  {field.required && (
                                    <span className="text-red-500 ml-1">*</span>
                                  )}
                                </Label>
                                {field.documentRequired && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-blue-100 text-blue-700 text-xs px-1.5 py-0.5"
                                  >
                                    <Paperclip className="w-3 h-3 mr-1" />
                                    Document
                                  </Badge>
                                )}
                              </div>
                              {renderField(field)}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
              ))}
            </div>

            {/* Submit Section */}
            <Card className="bg-gray-50 border-gray-200">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Ready to Submit?
                  </h4>
                  <p className="text-sm text-gray-600">
                    Please review all information before submitting. You can
                    save as draft and return later if needed.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" className="px-6">
                      Save as Draft
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 px-6">
                      Submit for Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">
              Close Preview
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
