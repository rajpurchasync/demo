import React, { useState } from 'react';
import { Users, MapPin, Edit3 } from 'lucide-react';
import { Button } from '../UI/Button';
import { Select } from '../UI/Select';

export function TargetCustomerSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    customerTypes: ['Hotels', 'Restaurants'],
    serviceCountries: ['United Arab Emirates'],
    serviceStates: ['Dubai', 'Abu Dhabi', 'Sharjah']
  });

  const customerTypeOptions = [
    { value: 'Hotels', label: 'Hotels' },
    { value: 'Restaurants', label: 'Restaurants' },
    { value: 'Catering', label: 'Catering Companies' },
    { value: 'Cafes', label: 'Cafes & Coffee Shops' },
    { value: 'Fast Food', label: 'Fast Food Chains' },
    { value: 'Fine Dining', label: 'Fine Dining' },
    { value: 'Corporate', label: 'Corporate Offices' },
    { value: 'Healthcare', label: 'Healthcare Facilities' },
    { value: 'Education', label: 'Educational Institutions' },
    { value: 'Retail', label: 'Retail Stores' }
  ];

  const countryOptions = [
    { value: 'United Arab Emirates', label: 'United Arab Emirates' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Bahrain', label: 'Bahrain' },
    { value: 'Oman', label: 'Oman' }
  ];

  const stateOptions = {
    'United Arab Emirates': [
      { value: 'Dubai', label: 'Dubai' },
      { value: 'Abu Dhabi', label: 'Abu Dhabi' },
      { value: 'Sharjah', label: 'Sharjah' },
      { value: 'Ajman', label: 'Ajman' },
      { value: 'Ras Al Khaimah', label: 'Ras Al Khaimah' },
      { value: 'Fujairah', label: 'Fujairah' },
      { value: 'Umm Al Quwain', label: 'Umm Al Quwain' }
    ],
    'Saudi Arabia': [
      { value: 'Riyadh', label: 'Riyadh' },
      { value: 'Jeddah', label: 'Jeddah' },
      { value: 'Dammam', label: 'Dammam' }
    ]
  };

  const handleCustomerTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      customerTypes: prev.customerTypes.includes(type)
        ? prev.customerTypes.filter(t => t !== type)
        : [...prev.customerTypes, type]
    }));
  };

  const handleCountryChange = (country: string) => {
    setFormData(prev => ({
      ...prev,
      serviceCountries: prev.serviceCountries.includes(country)
        ? prev.serviceCountries.filter(c => c !== country)
        : [...prev.serviceCountries, country],
      serviceStates: [] // Reset states when countries change
    }));
  };

  const handleStateChange = (state: string) => {
    setFormData(prev => ({
      ...prev,
      serviceStates: prev.serviceStates.includes(state)
        ? prev.serviceStates.filter(s => s !== state)
        : [...prev.serviceStates, state]
    }));
  };

  const handleSave = () => {
    console.log('Saving target customer data:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const getAvailableStates = () => {
    const allStates = [];
    for (const country of formData.serviceCountries) {
      if (stateOptions[country]) {
        allStates.push(...stateOptions[country]);
      }
    }
    return allStates;
  };

  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Target Customer</h2>
        {!isEditing ? (
          <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="text-xs">
            <Edit3 className="w-3 h-3 mr-1" />
            Edit
          </Button>
        ) : (
          <div className="flex space-x-1">
            <Button size="sm" onClick={handleSave} className="text-xs">
              Save
            </Button>
            <Button size="sm" variant="secondary" onClick={handleCancel} className="text-xs">
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Customer Types */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4 inline mr-1" />
            Customer Types
          </label>
          {isEditing ? (
            <div className="grid grid-cols-2 gap-2">
              {customerTypeOptions.map((option) => (
                <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.customerTypes.includes(option.value)}
                    onChange={() => handleCustomerTypeChange(option.value)}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {formData.customerTypes.map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Service Locations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Service Locations
          </label>
          
          {isEditing ? (
            <div className="space-y-3">
              {/* Countries */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Countries</label>
                <div className="space-y-1">
                  {countryOptions.map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.serviceCountries.includes(option.value)}
                        onChange={() => handleCountryChange(option.value)}
                        className="text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* States */}
              {formData.serviceCountries.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">States/Emirates</label>
                  <div className="grid grid-cols-2 gap-1">
                    {getAvailableStates().map((option) => (
                      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.serviceStates.includes(option.value)}
                          onChange={() => handleStateChange(option.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <span className="text-xs font-medium text-gray-600">Countries:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.serviceCountries.map((country) => (
                    <span
                      key={country}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <span className="text-xs font-medium text-gray-600">States/Emirates:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.serviceStates.map((state) => (
                    <span
                      key={state}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
                    >
                      {state}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}