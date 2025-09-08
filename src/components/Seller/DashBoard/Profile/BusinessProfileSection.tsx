import React, { useState } from 'react';
import { Edit3, Building, Calendar, FileText, DollarSign, Users } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';

export function BusinessProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyNameLicense: 'Grand Hotel Dubai LLC',
    companyNamePublic: 'Grand Hotel Dubai',
    companyType: 'Hospitality',
    establishedDate: '2015-03-15',
    registrationNumber: 'DED-123456789',
    vatEnabled: true,
    vatNumber: 'AE123456789012345',
    numberOfEmployees: '51-100',
    revenue: '5M-10M'
  });

  const companyTypes = [
    { value: 'Hospitality', label: 'Hospitality' },
    { value: 'Restaurant', label: 'Restaurant' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Other', label: 'Other' }
  ];

  const employeeOptions = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-25', label: '11-25 employees' },
    { value: '26-50', label: '26-50 employees' },
    { value: '51-100', label: '51-100 employees' },
    { value: '101-250', label: '101-250 employees' },
    { value: '251-500', label: '251-500 employees' },
    { value: '500+', label: '500+ employees' }
  ];

  const revenueOptions = [
    { value: 'Under 1M', label: 'Under AED 1M' },
    { value: '1M-5M', label: 'AED 1M - 5M' },
    { value: '5M-10M', label: 'AED 5M - 10M' },
    { value: '10M-25M', label: 'AED 10M - 25M' },
    { value: '25M-50M', label: 'AED 25M - 50M' },
    { value: '50M+', label: 'AED 50M+' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving business profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  return (
    <div className="p-3 space-y-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Business Profile</h2>
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

      <div className="space-y-3">
        {isEditing ? (
          <>
            <Input
              label="Company Name (as per license)"
              value={formData.companyNameLicense}
              onChange={(e) => handleInputChange('companyNameLicense', e.target.value)}
              className="text-sm"
            />
            
            <Input
              label="Company Name (public)"
              value={formData.companyNamePublic}
              onChange={(e) => handleInputChange('companyNamePublic', e.target.value)}
              className="text-sm"
            />

            <Select
              label="Company Type"
              options={[{ value: '', label: 'Select type' }, ...companyTypes]}
              value={formData.companyType}
              onChange={(e) => handleInputChange('companyType', e.target.value)}
              className="text-sm"
            />

            <Input
              type="date"
              label="Established Date"
              value={formData.establishedDate}
              onChange={(e) => handleInputChange('establishedDate', e.target.value)}
              className="text-sm"
            />

            <Input
              label="Registration / License No."
              value={formData.registrationNumber}
              onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
              className="text-sm"
            />

            <div className="flex items-center justify-between py-2">
              <label className="text-sm font-medium text-gray-700">VAT Registered</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.vatEnabled}
                  onChange={(e) => handleInputChange('vatEnabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {formData.vatEnabled && (
              <Input
                label="VAT Number"
                value={formData.vatNumber}
                onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                placeholder="AE123456789012345"
                className="text-sm"
              />
            )}

            <Select
              label="Number of Employees"
              options={[{ value: '', label: 'Select range' }, ...employeeOptions]}
              value={formData.numberOfEmployees}
              onChange={(e) => handleInputChange('numberOfEmployees', e.target.value)}
              className="text-sm"
            />

            <Select
              label="Annual Revenue"
              options={[{ value: '', label: 'Select range' }, ...revenueOptions]}
              value={formData.revenue}
              onChange={(e) => handleInputChange('revenue', e.target.value)}
              className="text-sm"
            />
          </>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600 w-24">Legal Name:</span>
              <span className="font-medium">{formData.companyNameLicense}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Building className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600 w-24">Public Name:</span>
              <span className="font-medium">{formData.companyNamePublic}</span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="font-medium ml-2">{formData.companyType}</span>
              </div>
              <div>
                <span className="text-gray-600">Established:</span>
                <span className="font-medium ml-2">
                  {new Date(formData.establishedDate).getFullYear()}
                </span>
              </div>
            </div>

            <div className="flex items-center text-sm">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600 w-24">License No:</span>
              <span className="font-medium">{formData.registrationNumber}</span>
            </div>

            <div className="flex items-center text-sm">
              <FileText className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600 w-24">VAT:</span>
              <span className="font-medium">
                {formData.vatEnabled ? formData.vatNumber : 'Not registered'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Employees:</span>
                <span className="font-medium ml-2">{formData.numberOfEmployees}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium ml-2">{formData.revenue}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}