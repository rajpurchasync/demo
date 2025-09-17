import React, { useState } from 'react';
import { Edit3, Building, MapPin, Tag } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import { Select } from '../UI/Select';
import { Supplier } from '../../types/purchasync';

interface SupplierCompanyInfoSectionProps {
  supplier: Supplier;
  onUpdate: (updates: Partial<Supplier>) => void;
}

export function SupplierCompanyInfoSection({ supplier, onUpdate }: SupplierCompanyInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: supplier.name,
    type: supplier.type,
    category: supplier.category,
    country: supplier.country,
    state: supplier.state,
    city: supplier.city,
    tags: supplier.tags.join(', ')
  });

  const supplierTypes = [
    { value: 'Vendor', label: 'Vendor' },
    { value: 'Manufacturer', label: 'Manufacturer' },
    { value: 'Distributor', label: 'Distributor' },
    { value: 'Service Provider', label: 'Service Provider' },
    { value: 'Wholesaler', label: 'Wholesaler' }
  ];

  const categories = [
    { value: 'Produce', label: 'Produce' },
    { value: 'Meat & Poultry', label: 'Meat & Poultry' },
    { value: 'Kitchen Equipment', label: 'Kitchen Equipment' },
    { value: 'Spices & Seasonings', label: 'Spices & Seasonings' },
    { value: 'Cleaning Services', label: 'Cleaning Services' },
    { value: 'Other', label: 'Other' }
  ];

  const countries = [
    { value: 'United Arab Emirates', label: 'United Arab Emirates' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Bahrain', label: 'Bahrain' },
    { value: 'Oman', label: 'Oman' }
  ];

  const states = [
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Abu Dhabi', label: 'Abu Dhabi' },
    { value: 'Sharjah', label: 'Sharjah' },
    { value: 'Ajman', label: 'Ajman' },
    { value: 'Ras Al Khaimah', label: 'Ras Al Khaimah' },
    { value: 'Fujairah', label: 'Fujairah' },
    { value: 'Umm Al Quwain', label: 'Umm Al Quwain' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const updates = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onUpdate(updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: supplier.name,
      type: supplier.type,
      category: supplier.category,
      country: supplier.country,
      state: supplier.state,
      city: supplier.city,
      tags: supplier.tags.join(', ')
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Company Information</h3>
          {!isEditing ? (
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="text-xs">
              <Edit3 className="w-3 h-3 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex space-x-2">
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
          {isEditing ? (
            <>
              <Input
                label="Company Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="text-sm"
              />
              
              <div className="grid grid-cols-2 gap-3">
                <Select
                  label="Type"
                  options={[{ value: '', label: 'Select type' }, ...supplierTypes]}
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="text-sm"
                />
                <Select
                  label="Category"
                  options={[{ value: '', label: 'Select category' }, ...categories]}
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="text-sm"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <Select
                  label="Country"
                  options={[{ value: '', label: 'Select country' }, ...countries]}
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="text-sm"
                />
                <Select
                  label="State"
                  options={[{ value: '', label: 'Select state' }, ...states]}
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="text-sm"
                />
                <Input
                  label="City"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="text-sm"
                />
              </div>

              <Input
                label="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="e.g., Sustainable, Local, Certified"
                className="text-sm"
              />
            </>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Building className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600 w-20">Name:</span>
                <span className="font-medium">{supplier.name}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium ml-2">{supplier.type}</span>
                </div>
                <div>
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium ml-2">{supplier.category}</span>
                </div>
              </div>

              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-gray-600 w-20">Location:</span>
                <span className="font-medium">{supplier.city}, {supplier.state}, {supplier.country}</span>
              </div>

              <div className="flex items-start text-sm">
                <Tag className="w-4 h-4 mr-2 text-gray-500 mt-0.5" />
                <span className="text-gray-600 w-20">Tags:</span>
                <div className="flex flex-wrap gap-1">
                  {supplier.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      {tag}
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