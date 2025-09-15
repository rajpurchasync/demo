import React, { useState } from 'react';
import { Eye, EyeOff, Key } from 'lucide-react';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Button } from '../UI/Button';

export function PersonalDetailsSection() {
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    position: 'Procurement Manager',
    email: 'sarah.johnson@grandhotel.ae',
    countryCode: '+971',
    phone: '50 123 4567',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const countryCodes = [
    { value: '+971', label: '🇦🇪 +971' },
    { value: '+1', label: '🇺🇸 +1' },
    { value: '+44', label: '🇬🇧 +44' },
    { value: '+91', label: '🇮🇳 +91' },
    { value: '+92', label: '🇵🇰 +92' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = () => {
    console.log('Password change requested - OTP would be sent');
    alert('OTP sent to your email address');
    setShowChangePassword(false);
  };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Personal Details</h2>
        <Button size="sm" variant="ghost" className="text-xs">
          Edit Profile Photo
        </Button>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Position</label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="flex space-x-1">
            <select
              value={formData.countryCode}
              onChange={(e) => handleInputChange('countryCode', e.target.value)}
              className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            >
              {countryCodes.map((code) => (
                <option key={code.value} value={code.value}>
                  {code.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Password Section */}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-700">Password</label>
            <button
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="text-xs text-purple-600 hover:text-purple-700 font-medium"
            >
              {showChangePassword ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {!showChangePassword ? (
            <div className="flex items-center space-x-2">
              <div className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded bg-gray-50">
                ••••••••••
              </div>
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <input
                type="password"
                placeholder="Current password"
                value={formData.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="New password"
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="flex space-x-2">
                <Button size="sm" onClick={handlePasswordChange} className="text-xs">
                  <Key className="w-3 h-3 mr-1" />
                  Send OTP
                </Button>
                <Button size="sm" variant="secondary" onClick={() => setShowChangePassword(false)} className="text-xs">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-3 border-t border-gray-200 mt-4">
          <Button size="sm" className="text-xs">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}