import React, { useState } from 'react';
import { X } from 'lucide-react';

interface Company {
  name: string;
  country: string;
  state: string;
  productService: string;
  category: string;
  label: 'Approved' | 'On-credit' | 'New Prospect';
  tags: string[];
}

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Company) => void;
  supplier?: any;
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ isOpen, onClose, onSave, supplier }) => {
  const [productOrService, setProductOrService] = useState<'product' | 'service' | ''>('');
  const [formData, setFormData] = useState({
    name: supplier?.name || '',
    country: supplier?.country || '',
    state: supplier?.state || '',
    category: supplier?.category || '',
    label: (supplier?.label || 'New Prospect') as 'Approved' | 'On-credit' | 'New Prospect',
    tagInput: ''
  });
  const [tags, setTags] = useState<string[]>(supplier?.tags || []);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 
    'Japan', 'Australia', 'India', 'China', 'Brazil', 'Mexico', 'Italy'
  ];

  const statesByCountry: { [key: string]: string[] } = {
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba', 'Saskatchewan', 'Nova Scotia', 'New Brunswick'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Germany': ['Bavaria', 'North Rhine-Westphalia', 'Baden-Württemberg', 'Lower Saxony', 'Hesse', 'Saxony'],
    'France': ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie', 'Hauts-de-France'],
    'Japan': ['Tokyo', 'Osaka', 'Kanagawa', 'Aichi', 'Saitama', 'Chiba', 'Hyogo', 'Hokkaido'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'],
    'India': ['Maharashtra', 'Karnataka', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'West Bengal', 'Uttar Pradesh'],
    'China': ['Beijing', 'Shanghai', 'Guangdong', 'Jiangsu', 'Zhejiang', 'Shandong', 'Henan'],
    'Brazil': ['São Paulo', 'Rio de Janeiro', 'Minas Gerais', 'Bahia', 'Paraná', 'Rio Grande do Sul'],
    'Mexico': ['Mexico City', 'Jalisco', 'Nuevo León', 'Puebla', 'Guanajuato', 'Chihuahua'],
    'Italy': ['Lombardy', 'Lazio', 'Campania', 'Sicily', 'Veneto', 'Emilia-Romagna', 'Piedmont']
  };

  const productCategories = [
    'Office Supplies', 'IT Equipment', 'Industrial Parts', 'Construction Materials',
    'Food & Beverage', 'Healthcare Supplies', 'Automotive Parts', 'Electronics', 
    'Textiles', 'Chemicals', 'Machinery', 'Raw Materials'
  ];

  const serviceCategories = [
    'Logistics & Transportation', 'Software Services', 'Consulting', 'Marketing Services',
    'Legal Services', 'Financial Services', 'Maintenance & Repair', 'Training & Education',
    'Design Services', 'Installation Services', 'Security Services', 'Cleaning Services'
  ];

  const allCategories = [
    ...productCategories,
    ...serviceCategories
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.name.trim()) newErrors.name = 'Supplier name is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!isOpen) return null;

  // Debug log to confirm modal is attempting to render
  console.log('AddCompanyModal: Modal is rendering with isOpen =', isOpen);

  const handleSubmit = () => {
    if (validateForm()) {
      const company: Company = {
        name: formData.name,
        country: formData.country,
        state: formData.state,
        category: formData.category,
        label: formData.label,
        tags: tags
      };
      onSave(company);
      // Reset form
      setFormData({
        name: '',
        country: '',
        state: '',
        category: '',
        label: 'New Prospect',
        tagInput: ''
      });
      setTags([]);
      setErrors({});
      onClose();
    }
  };

  const addTag = () => {
    if (formData.tagInput.trim() && !tags.includes(formData.tagInput.trim())) {
      setTags([...tags, formData.tagInput.trim()]);
      setFormData({ ...formData, tagInput: '' });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Add Supplier</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Supplier Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter supplier name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value, state: '' })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.country ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.state ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={!formData.country}
            >
              <option value="">Select State</option>
              {formData.country && statesByCountry[formData.country]?.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.category ? 'border-red-300' : 'border-gray-300'
              }`}
            >
              <option value="">Select Category</option>
              {allCategories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>

          {/* Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
            <select
              value={formData.label}
              onChange={(e) => setFormData({ ...formData, label: e.target.value as 'Approved' | 'On-credit' | 'New Prospect' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="New Prospect">New Prospect</option>
              <option value="Approved">Approved</option>
              <option value="On-credit">On-credit</option>
            </select>
          </div>

          {/* Tags */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.tagInput}
                onChange={(e) => setFormData({ ...formData, tagInput: e.target.value })}
                onKeyPress={handleTagKeyPress}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add keywords to easily find detail when needed"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
          >
            {supplier ? 'Update Supplier' : 'Add Supplier'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;