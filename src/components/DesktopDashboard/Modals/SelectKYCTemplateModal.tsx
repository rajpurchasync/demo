import React, { useState } from 'react';
import { X, FileText, Check } from 'lucide-react';

interface SelectKYCTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName: string;
}

const SelectKYCTemplateModal: React.FC<SelectKYCTemplateModalProps> = ({ isOpen, onClose, supplierName }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Mock KYC templates
  const kycTemplates = [
    { id: '1', name: 'Standard Supplier KYC', description: 'General KYC for all new suppliers' },
    { id: '2', name: 'Food & Beverage Supplier KYC', description: 'Specific requirements for F&B suppliers' },
    { id: '3', name: 'Technology Vendor KYC', description: 'Detailed KYC for technology service providers' },
  ];

  if (!isOpen) return null;

  const handleSelectTemplate = () => {
    if (selectedTemplate) {
      const templateName = kycTemplates.find(t => t.id === selectedTemplate)?.name;
      console.log(`Sending KYC template "${templateName}" to ${supplierName}`);
      // Simulate API call or state update
      onClose();
      setSelectedTemplate('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Send KYC to {supplierName}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select KYC Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Choose a template</option>
              {kycTemplates.map(template => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>
          {selectedTemplate && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                {kycTemplates.find(t => t.id === selectedTemplate)?.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSelectTemplate}
            disabled={!selectedTemplate}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Check className="w-4 h-4 mr-2" />
            Send KYC
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectKYCTemplateModal;