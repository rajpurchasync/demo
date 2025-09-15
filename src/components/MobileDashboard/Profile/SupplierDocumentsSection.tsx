import React, { useState } from "react";
import { Plus, FileText, Trash2, Upload, X } from "lucide-react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { SupplierDocument } from "../types/purchasync";

interface SupplierDocumentsSectionProps {
  documents: SupplierDocument[];
  onUpdate: (documents: SupplierDocument[]) => void;
}

export function SupplierDocumentsSection({
  documents,
  onUpdate,
}: SupplierDocumentsSectionProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: "",
    expiryDate: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewDocument((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddDocument = () => {
    if (newDocument.name) {
      const document: SupplierDocument = {
        id: Date.now().toString(),
        name: newDocument.name,
        expiryDate: newDocument.expiryDate,
        attachmentUrl: `/docs/${newDocument.name
          .toLowerCase()
          .replace(/\s+/g, "_")}.pdf`,
      };
      onUpdate([...documents, document]);
      setNewDocument({ name: "", expiryDate: "" });
      setShowAddModal(false);
    }
  };

  const handleDeleteDocument = (id: string) => {
    onUpdate(documents.filter((doc) => doc.id !== id));
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "No expiry";
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Documents</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowAddModal(true)}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Document
          </Button>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {documents.map((document) => (
            <div
              key={document.id}
              className="p-3 border border-gray-200 rounded bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <FileText className="w-4 h-4 text-gray-500 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900">
                      {document.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      Expires: {formatDate(document.expiryDate)}
                    </p>
                    <button
                      onClick={() =>
                        window.open(document.attachmentUrl, "_blank")
                      }
                      className="text-xs text-blue-600 hover:text-blue-700 mt-1"
                    >
                      View Attachment
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteDocument(document.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No documents added yet
            </p>
          )}
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Add Document
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <Input
                label="Document Name"
                placeholder="e.g., Trade License"
                value={newDocument.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-sm"
              />

              <Input
                type="date"
                label="Expiry Date (Optional)"
                value={newDocument.expiryDate}
                onChange={(e) =>
                  handleInputChange("expiryDate", e.target.value)
                }
                className="text-sm"
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">
                    Click to upload or drag and drop
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  onClick={handleAddDocument}
                  className="text-xs flex-1"
                >
                  Add Document
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowAddModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
