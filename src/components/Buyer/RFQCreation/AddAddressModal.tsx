import React, { useState } from 'react';
import { X, MapPin, Globe, Building, Home, Hash } from 'lucide-react';
import CustomDropdown from './CustomDropdown';

interface AddAddressModalProps {
  onClose: () => void;
  onSave: (address: string) => void;
}

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Germany',
  'France',
  'Australia',
  'Japan',
  'Singapore',
  'India',
  'Brazil'
];

const statesByCountry: { [key: string]: string[] } = {
  'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick', 'Newfoundland and Labrador', 'Prince Edward Island'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  'Germany': ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony', 'Hesse', 'Saxony', 'Rhineland-Palatinate', 'Schleswig-Holstein', 'Brandenburg', 'Saxony-Anhalt'],
  'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory']
};

const AddAddressModal: React.FC<AddAddressModalProps> = ({
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    country: '',
    state: '',
    city: '',
    street: '',
    unitNo: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset state when country changes
      ...(field === 'country' ? { state: '' } : {})
    }));
  };

  const handleSave = () => {
    if (formData.country && formData.city && formData.street) {
      const addressParts = [
        formData.unitNo && `Unit ${formData.unitNo}`,
        formData.street,
        formData.city,
        formData.state,
        formData.country
      ].filter(Boolean);
      
      const fullAddress = addressParts.join(', ');
      onSave(fullAddress);
    }
  };

  const isFormValid = formData.country && formData.city && formData.street;
  const availableStates = statesByCountry[formData.country] || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
            <div>
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>Add New Address</span>
              </h3>
              <p className="text-gray-600 text-sm mt-1">Enter the delivery location details</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
              title="Close"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {/* Country Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Country *</span>
                </div>
              </label>
              <CustomDropdown
                options={countries.map(country => ({ value: country, label: country }))}
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                placeholder="Select country"
              />
            </div>

            {/* State Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>State/Province {availableStates.length > 0 ? '*' : ''}</span>
                </div>
              </label>
              {availableStates.length > 0 ? (
                <CustomDropdown
                  options={availableStates.map(state => ({ value: state, label: state }))}
                  value={formData.state}
                  onChange={(value) => handleInputChange('state', value)}
                  placeholder="Select state/province"
                />
              ) : (
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Enter state/province"
                  disabled={!formData.country}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-base"
                />
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>City *</span>
                </div>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Enter city name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Home className="w-4 h-4" />
                  <span>Street Address *</span>
                </div>
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                placeholder="Enter street address"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Unit Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4" />
                  <span>Unit/Suite Number</span>
                </div>
              </label>
              <input
                type="text"
                value={formData.unitNo}
                onChange={(e) => handleInputChange('unitNo', e.target.value)}
                placeholder="Enter unit or suite number (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Address Preview */}
            {isFormValid && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Address Preview:</h4>
                <p className="text-sm text-blue-800">
                  {[
                    formData.unitNo && `Unit ${formData.unitNo}`,
                    formData.street,
                    formData.city,
                    formData.state,
                    formData.country
                  ].filter(Boolean).join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setFormData({
                  country: '',
                  state: '',
                  city: '',
                  street: '',
                  unitNo: ''
                });
              }}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Clear Form
            </button>
            <button
              onClick={handleSave}
              disabled={!isFormValid}
              className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
                isFormValid
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;