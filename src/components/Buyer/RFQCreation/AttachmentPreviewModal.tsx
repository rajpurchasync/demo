import React from 'react';
import { X, Download, FileText, Image, FileSpreadsheet } from 'lucide-react';

interface AttachmentPreviewModalProps {
  attachment: {
    id: string;
    name: string;
    type: string;
    size: string;
  };
  onClose: () => void;
}

const AttachmentPreviewModal: React.FC<AttachmentPreviewModalProps> = ({
  attachment,
  onClose
}) => {
  const renderPreview = () => {
    switch (attachment.type) {
      case 'pdf':
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-xl">
            <FileText className="w-16 h-16 text-red-500 mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-2">{attachment.name}</p>
            <p className="text-gray-600 mb-4">PDF Document ({attachment.size})</p>
            <div className="bg-white p-4 rounded-lg shadow-sm border max-w-md">
              <p className="text-sm text-gray-700">
                This is a preview simulation of the PDF document. In a real implementation, 
                you would see the actual PDF content rendered here using a PDF viewer component.
              </p>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-xl">
            <div className="w-64 h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
              <Image className="w-12 h-12 text-white opacity-50" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">{attachment.name}</p>
            <p className="text-gray-600">Image File ({attachment.size})</p>
          </div>
        );

      case 'excel':
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-xl">
            <FileSpreadsheet className="w-16 h-16 text-green-500 mb-4" />
            <p className="text-lg font-semibold text-gray-900 mb-2">{attachment.name}</p>
            <p className="text-gray-600 mb-4">Excel Spreadsheet ({attachment.size})</p>
            <div className="bg-white p-4 rounded-lg shadow-sm border max-w-md">
              <p className="text-sm text-gray-700">
                Spreadsheet preview would show a table view of the Excel data here. 
                This is a simulation of the preview functionality.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-lg font-semibold text-gray-900 mb-2">{attachment.name}</p>
            <p className="text-gray-600">File ({attachment.size})</p>
            <p className="text-sm text-gray-500 mt-2">Preview not available for this file type</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Attachment Preview</h2>
              <p className="text-gray-600 text-sm mt-1">{attachment.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {/* Simulate download */}}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="p-6">
            {renderPreview()}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {/* Simulate download */}}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Download className="w-4 h-4 inline mr-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentPreviewModal;