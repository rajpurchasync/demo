import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Award, Calendar, Download, Eye, Plus } from "lucide-react";
import AddDocumentsModal from "../Modals/AddDocumentsModal";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: Date;
  size: string; // Size is still here for mock data, but won't be displayed
  category: "license" | "meeting" | "catalogue";
}

interface DocumentsTabProps {
  supplierId: string;
}

const DocumentsTab: React.FC<DocumentsTabProps> = ({ supplierId }) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(["license"]));
  const [isAddDocumentsModalOpen, setIsAddDocumentsModalOpen] = useState(false);

  // Mock documents data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Business License Certificate",
      type: "PDF",
      uploadDate: new Date(2024, 0, 15),
      size: "2.4 MB",
      category: "license",
    },
    {
      id: "2",
      name: "ISO 9001 Quality Certificate",
      type: "PDF",
      uploadDate: new Date(2024, 0, 10),
      size: "1.8 MB",
      category: "license",
    },
    {
      id: "3",
      name: "Tax Registration Certificate",
      type: "PDF",
      uploadDate: new Date(2024, 0, 8),
      size: "1.2 MB",
      category: "license",
    },
    {
      id: "4",
      name: "Q1 Strategy Meeting Notes",
      type: "DOCX",
      uploadDate: new Date(2024, 0, 20),
      size: "890 KB",
      category: "meeting",
    },
    {
      id: "5",
      name: "Partnership Discussion - Jan 2024",
      type: "PDF",
      uploadDate: new Date(2024, 0, 18),
      size: "1.5 MB",
      category: "meeting",
    },
    {
      id: "6",
      name: "Product Catalog 2024",
      type: "PDF",
      uploadDate: new Date(2024, 0, 12),
      size: "5.2 MB",
      category: "catalogue",
    },
    {
      id: "7",
      name: "Price List - Updated",
      type: "XLSX",
      uploadDate: new Date(2024, 0, 16),
      size: "780 KB",
      category: "catalogue",
    },
  ]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const getDocumentsByCategory = (category: string) => {
    return documents.filter(doc => doc.category === category);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "docx":
      case "doc":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "xlsx":
      case "xls":
        return <FileText className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleAddDocument = (newDoc: Omit<Document, 'id' | 'uploadDate' | 'size'> & { file: File }) => {
    setDocuments(prev => [...prev, {
      id: Date.now().toString(),
      name: newDoc.name,
      type: newDoc.type,
      uploadDate: new Date(),
      size: `${(newDoc.file.size / 1024 / 1024).toFixed(2)} MB`,
      category: newDoc.category,
    }]);
    setIsAddDocumentsModalOpen(false);
  };

  const sections = [
    {
      id: "license",
      title: "License & Certificates",
      icon: Award,
      color: "text-green-600",
      documents: getDocumentsByCategory("license"),
    },
    {
      id: "meeting",
      title: "Meeting Notes",
      icon: Calendar,
      color: "text-blue-600",
      documents: getDocumentsByCategory("meeting"),
    },
    {
      id: "catalogue",
      title: "Catalogues",
      icon: FileText,
      color: "text-purple-600",
      documents: getDocumentsByCategory("catalogue"),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setIsAddDocumentsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Document</span>
        </button>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <section.icon className={`w-5 h-5 ${section.color}`} />
                <h4 className="font-semibold text-gray-900">{section.title}</h4>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full">
                  {section.documents.length}
                </span>
              </div>
              {expandedSections.has(section.id) ? (
                <ChevronUp className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Section Content */}
            {expandedSections.has(section.id) && (
              <div className="p-4 bg-white">
                {section.documents.length > 0 ? (
                  <div className="space-y-3">
                    {section.documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          {getFileIcon(document.type)}
                          <div>
                            <h5 className="font-medium text-gray-900 text-sm">
                              {document.name}
                            </h5>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>{document.type}</span>
                              <span>•</span>
                              <span>{document.uploadDate.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Document"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No documents in this category</p>
                    <button 
                      onClick={() => setIsAddDocumentsModalOpen(true)}
                      className="mt-2 flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium mx-auto"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Document</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {isAddDocumentsModalOpen && (
        <AddDocumentsModal 
          isOpen={isAddDocumentsModalOpen} 
          onClose={() => setIsAddDocumentsModalOpen(false)} 
          onSave={handleAddDocument} 
        />
      )}
    </div>
  );
};

export default DocumentsTab;