import React, { useState, useRef } from 'react';
import { X, Upload, FileSpreadsheet, FileText, Check } from 'lucide-react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'spreadsheet' | 'document';
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, type }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [step, setStep] = useState<'upload' | 'options' | 'success'>('upload');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
    setStep('options');
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleImport = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
      resetModal();
    }, 2000);
  };

  const resetModal = () => {
    setStep('upload');
    setUploadedFile(null);
    setSelectedOption('');
    setDragActive(false);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  const getTitle = () => {
    if (type === 'spreadsheet') {
      return step === 'upload' ? 'Upload Spreadsheet' : step === 'options' ? 'Select Import Type' : 'Import Successful';
    }
    return step === 'upload' ? 'Upload Document' : step === 'options' ? 'Select Template Type' : 'Import Successful';
  };

  const getOptions = () => {
    if (type === 'spreadsheet') {
      return [
        { id: 'suppliers-contacts', label: 'Suppliers & Contacts', description: 'Import supplier information and contact details' },
        { id: 'contract-list', label: 'Contract List', description: 'Import contract data and related information' }
      ];
    }
    return [
      { id: 'contract-template', label: 'Contract Template', description: 'Import contract template for future use' }
    ];
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{getTitle()}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'upload' && (
            <div>
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept={type === 'spreadsheet' ? '.xlsx,.xls,.csv' : '.pdf,.doc,.docx'}
                  onChange={handleFileInput}
                />
                
                <div className="flex flex-col items-center">
                  {type === 'spreadsheet' ? (
                    <FileSpreadsheet className="w-12 h-12 text-gray-400 mb-4" />
                  ) : (
                    <FileText className="w-12 h-12 text-gray-400 mb-4" />
                  )}
                  
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop your {type} here
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    or click to browse files
                  </p>
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Supported formats: {type === 'spreadsheet' ? 'XLSX, XLS, CSV' : 'PDF, DOC, DOCX'}
              </p>
            </div>
          )}

          {step === 'options' && (
            <div>
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    {type === 'spreadsheet' ? (
                      <FileSpreadsheet className="w-4 h-4 mr-2" />
                    ) : (
                      <FileText className="w-4 h-4 mr-2" />
                    )}
                    <span className="font-medium">{uploadedFile?.name}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {getOptions().map((option) => (
                  <div
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOption === option.id
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-4 h-4 rounded-full border-2 mt-0.5 mr-3 flex items-center justify-center ${
                        selectedOption === option.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedOption === option.id && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{option.label}</h4>
                        <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setStep('upload')}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleImport}
                  disabled={!selectedOption}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Import
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Import Successful!</h3>
              <p className="text-gray-500">
                Your {selectedOption.replace('-', ' ')} data has been imported successfully.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;