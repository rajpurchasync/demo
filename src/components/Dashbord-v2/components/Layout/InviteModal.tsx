import React, { useState } from 'react';
import { X, Mail, User, UserCheck } from 'lucide-react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'colleague' | 'guest'>('colleague');
  const [role, setRole] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const roles = [
    'Admin', 'Manager', 'Team Lead', 'Senior', 'Junior', 'Intern',
    'Contractor', 'Consultant', 'Director', 'VP', 'C-Level'
  ];

  if (!isOpen) return null;

  const handleInvite = () => {
    if (email && (type === 'guest' || role)) {
      // Show success message
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Reset form
        setEmail('');
        setType('colleague');
        setRole('');
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-60">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5" />
            <span>Invitation sent successfully!</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Invite Person</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
              />
            </div>
          </div>

          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Invite as</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setType('colleague')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  type === 'colleague'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Colleague</span>
              </button>
              <button
                type="button"
                onClick={() => setType('guest')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                  type === 'guest'
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Guest</span>
              </button>
            </div>
          </div>

          {/* Role Selection (only for colleagues) */}
          {type === 'colleague' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                {roles.map((roleOption) => (
                  <option key={roleOption} value={roleOption}>{roleOption}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={!email || (type === 'colleague' && !role)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Invite
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;