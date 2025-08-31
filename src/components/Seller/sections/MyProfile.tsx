import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Shield, 
  Globe,
  Eye,
  EyeOff,
  Smartphone,
  Edit,
  X,
  Check,
  Save,
  MapPin
} from 'lucide-react';

const MyProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    countryCode: '+1',
    country: 'United States',
    position: 'Sales Manager'
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true
  });

  const countries = [
    { code: '+1', name: 'United States', flag: '🇺🇸' },
    { code: '+1', name: 'Canada', flag: '🇨🇦' },
    { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+91', name: 'India', flag: '🇮🇳' }
  ];

  const countryOptions = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India'
  ];

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = () => {
    console.log('Triggering OTP for password change...');
    alert('OTP sent to your registered phone number');
  };

  const handleSavePersonalInfo = () => {
    setIsEditingPersonalInfo(false);
    console.log('Saving personal info:', personalInfo);
  };

  const handleCancelEdit = () => {
    setIsEditingPersonalInfo(false);
    // Reset to original values if needed
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
        {!isEditingPersonalInfo ? (
          <button
            onClick={() => setIsEditingPersonalInfo(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleSavePersonalInfo}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancelEdit}
              className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>

      {!isEditingPersonalInfo ? (
        // Display Mode
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <p className="text-gray-900 font-medium">{personalInfo.firstName}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <p className="text-gray-900 font-medium">{personalInfo.lastName}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <p className="text-gray-900 font-medium">{personalInfo.email}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <p className="text-gray-900 font-medium">{personalInfo.countryCode} {personalInfo.phone}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <p className="text-gray-900 font-medium">{personalInfo.position}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <p className="text-gray-900 font-medium">{personalInfo.country}</p>
          </div>
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={personalInfo.firstName}
                onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
              <input
                type="text"
                value={personalInfo.lastName}
                onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="flex space-x-2">
                <select
                  value={personalInfo.countryCode}
                  onChange={(e) => handlePersonalInfoChange('countryCode', e.target.value)}
                  className="w-20 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                >
                  {countries.map(country => (
                    <option key={country.code + country.name} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="555-123-4567"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="text"
                value={personalInfo.position}
                onChange={(e) => handlePersonalInfoChange('position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your job title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
            <select
              value={personalInfo.country}
              onChange={(e) => handlePersonalInfoChange('country', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {countryOptions.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={securitySettings.currentPassword}
                onChange={(e) => handleSecurityChange('currentPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={securitySettings.newPassword}
                onChange={(e) => handleSecurityChange('newPassword', e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={securitySettings.confirmPassword}
              onChange={(e) => handleSecurityChange('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Change Password (Send OTP)
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-gray-900">Enable 2FA</p>
              <p className="text-xs text-gray-600">Add an extra layer of security to your account</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={securitySettings.twoFactorEnabled}
              onChange={(e) => handleSecurityChange('twoFactorEnabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Notifications</p>
                <p className="text-xs text-gray-600">Enable or disable all notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
                defaultChecked
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your personal account settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('personal')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'personal'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Lock className="w-4 h-4 inline mr-2" />
            Security
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'notifications'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bell className="w-4 h-4 inline mr-2" />
            Notifications
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        {activeTab === 'personal' && renderPersonalInfo()}
        {activeTab === 'security' && renderSecurity()}
        {activeTab === 'notifications' && renderNotifications()}
      </div>
    </div>
  );
};

export default MyProfile;