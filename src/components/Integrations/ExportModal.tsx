import React, { useState } from 'react';
import { X, Download, Users, CheckSquare, Building } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  if (!isOpen) return null;

  const exportOptions = [
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" />, description: 'Export all task data and assignments' },
    { id: 'contacts', label: 'Contacts', icon: <Users className="w-5 h-5" />, description: 'Export contact information and details' },
    { id: 'suppliers', label: 'Suppliers', icon: <Building className="w-5 h-5" />, description: 'Export supplier data and contracts' }
  ];

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleExport = () => {
    console.log('Exporting:', selectedOptions);
    // Simulate export process
    setTimeout(() => {
      onClose();
      setSelectedOptions([]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Export Data</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 mb-6">Select the data you want to export:</p>
          
          <div className="space-y-3">
            {exportOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionToggle(option.id)}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedOptions.includes(option.id)
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-5 h-5 rounded border-2 mt-0.5 mr-3 flex items-center justify-center ${
                    selectedOptions.includes(option.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedOptions.includes(option.id) && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center">
                    <div className="text-gray-600 mr-3">
                      {option.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{option.label}</h4>
                      <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={selectedOptions.length === 0}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export ({selectedOptions.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;