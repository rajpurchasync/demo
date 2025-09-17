import React, { useState } from 'react';
import { X, FileText, Plus, Trash2 } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Toggle } from '../UI/Toggle';
import { addMockToDo } from '../../types/purchasync';

interface RequestDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName: string;
}

interface DocumentRequest {
  id: string;
  name: string;
  isMandatory: boolean;
}

export function RequestDocumentModal({ isOpen, onClose, supplierName }: RequestDocumentModalProps) {
  const [documents, setDocuments] = useState<DocumentRequest[]>([
    { id: '1', name: '', isMandatory: true }
  ]);

  if (!isOpen) return null;

  const handleDocumentChange = (id: string, field: string, value: string | boolean) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const addDocument = () => {
    const newDoc: DocumentRequest = {
      id: Date.now().toString(),
      name: '',
      isMandatory: true
    };
    setDocuments(prev => [...prev, newDoc]);
  };

  const removeDocument = (id: string) => {
    if (documents.length > 1) {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    }
  };

  const handleSubmit = () => {
    const validDocuments = documents.filter(doc => doc.name.trim());
    
    if (validDocuments.length === 0) {
      alert('Please add at least one document name');
      return;
    }

    // Add each document request to ToDo list
    validDocuments.forEach(doc => {
      addMockToDo({
        title: `Request document: ${doc.name} from ${supplierName}`,
        type: 'task',
        status: 'ongoing',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        priority: doc.isMandatory ? 'high' : 'medium',
        tags: ['document-request', supplierName.toLowerCase().replace(/\s+/g, '-'), doc.isMandatory ? 'mandatory' : 'optional'],
        description: `${doc.isMandatory ? 'Mandatory' : 'Optional'} document request`
      });
    });

    alert(`Document request${validDocuments.length > 1 ? 's' : ''} submitted successfully!`);
    setDocuments([{ id: '1', name: '', isMandatory: true }]);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full max-w-md mx-auto rounded-t-2xl p-4 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Request Document</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <span className="font-medium">Supplier:</span> {supplierName}
            </p>
          </div>

          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={doc.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-medium text-gray-900">
                    Document {index + 1}
                  </h4>
                  {documents.length > 1 && (
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <Input
                    label="Document Name *"
                    placeholder="e.g., Trade License, Certificate"
                    value={doc.name}
                    onChange={(e) => handleDocumentChange(doc.id, 'name', e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </label>
                    <Toggle
                      option1={{ label: 'Mandatory', value: 'true' }}
                      option2={{ label: 'Optional', value: 'false' }}
                      selected={doc.isMandatory ? 'true' : 'false'}
                      onChange={(value) => handleDocumentChange(doc.id, 'isMandatory', value === 'true')}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="secondary"
            fullWidth
            onClick={addDocument}
            className="flex items-center justify-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Document
          </Button>

          <div className="flex space-x-3 pt-4">
            <Button
              variant="secondary"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={handleSubmit}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}