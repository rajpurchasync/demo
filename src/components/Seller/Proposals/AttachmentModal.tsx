import React from 'react';
import { X, Download, FileText } from 'lucide-react';

interface AttachmentModalProps {
  attachmentId: string;
  onClose: () => void;
}

export function AttachmentModal({ attachmentId, onClose }: AttachmentModalProps) {
  // Mock attachment data - in real app, would fetch based on attachmentId
  const attachment = {
    id: attachmentId,
    name: 'specifications.pdf',
    type: 'pdf',
    size: '2.3 MB',
    uploadDate: '2024-12-15'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 h-5/6">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{attachment.name}</h3>
              <p className="text-sm text-gray-500">{attachment.size} • Uploaded {new Date(attachment.uploadDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 h-full">
          {/* Mock PDF preview */}
          <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">PDF Preview</p>
              <p className="text-gray-500 text-sm">This is a simulated preview of {attachment.name}</p>
              <p className="text-gray-500 text-sm mt-2">In a real application, the PDF content would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}