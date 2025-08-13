import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { RFQ } from '../types';

interface RejectModalProps {
  rfq: RFQ;
  onConfirm: (comment: string) => void;
  onCancel: () => void;
}

export function RejectModal({ rfq, onConfirm, onCancel }: RejectModalProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onConfirm(comment.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Reject RFQ</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">
              You are about to reject RFQ <span className="font-medium">{rfq.id}</span>. 
              Please provide a reason for rejection:
            </p>
          </div>

          <div className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={4}
              placeholder="Enter your reason for rejecting this RFQ..."
              required
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Reject RFQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}