import React, { useState } from 'react';
import { Check, Loader2, Building } from 'lucide-react';

interface CompanyInfoFormProps {
  onComplete: (data: any) => void;
}

const CompanyInfoForm: React.FC<CompanyInfoFormProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showVAT, setShowVAT] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    vatNumber: '',
    country: '',
    state: '',
    city: '',
    streetAddress: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const companyTypes = [
    'Limited Liability Company (LLC)',
    'Corporation',
    'Partnership',
    'Sole Proprietorship',
    'Free Zone Company',
    'Branch Office',
    'Representative Office'
  ];

  const countries = [
    'United Arab Emirates',
    'Saudi Arabia',
    'Qatar',
    'Kuwait',
    'Bahrain',
    'Oman',
    'United States',
    'United Kingdom',
    'India'
  ];

  const states = {
    'United Arab Emirates': ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
    'Saudi Arabia': ['Riyadh', 'Makkah', 'Eastern Province', 'Asir', 'Jazan', 'Tabuk', 'Hail'],
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland']
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.companyType) newErrors.companyType = 'Company type is required';
    if (showVAT && !formData.vatNumber.trim()) newErrors.vatNumber = 'VAT number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State/Province is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onComplete(formData);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Information</h1>
          <p className="text-gray-600">
            Tell us about your company to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.companyName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter company name as per license"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.companyType}
              onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.companyType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select company type</option>
              {companyTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.companyType && <p className="text-red-500 text-sm mt-1">{errors.companyType}</p>}
          </div>

          <div>
            <div className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                id="hasVAT"
                checked={showVAT}
                onChange={(e) => setShowVAT(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="hasVAT" className="text-sm font-medium text-gray-700">
                Company has VAT registration
              </label>
            </div>
            
            {showVAT && (
              <input
                type="text"
                value={formData.vatNumber}
                onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.vatNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter VAT number"
              />
            )}
            {errors.vatNumber && <p className="text-red-500 text-sm mt-1">{errors.vatNumber}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value, state: '' })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.country ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State/Province <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={!formData.country}
              >
                <option value="">Select state/province</option>
                {formData.country && states[formData.country as keyof typeof states]?.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter city"
            />
            {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.streetAddress}
              onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.streetAddress ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter complete street address"
            />
            {errors.streetAddress && <p className="text-red-500 text-sm mt-1">{errors.streetAddress}</p>}
          </div>

          <div className="flex items-center justify-end pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center space-x-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Continue</span>
                  <Check className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyInfoForm;