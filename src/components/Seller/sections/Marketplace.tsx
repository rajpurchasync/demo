import React, { useState } from 'react';
import { 
  Store, 
  Crown,
  Building,
  Image,
  Award,
  Globe,
  Star,
  Plus,
  X,
  Upload,
  Save,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  FileText,
  Check
} from 'lucide-react';

interface MarketplaceProps {
  subSection?: string;
}

const Marketplace: React.FC<MarketplaceProps> = ({ subSection }) => {
  const [isSetupMode, setIsSetupMode] = useState(true);
  const [currentSetupTab, setCurrentSetupTab] = useState(0);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const setupTabs = [
    { id: 'company', name: 'Company Details', icon: Building },
    { id: 'media', name: 'Media', icon: Image },
    { id: 'brands', name: 'Brands', icon: Award },
    { id: 'social', name: 'Social Media', icon: Globe },
    { id: 'testimonials', name: 'Testimonials', icon: Star }
  ];

  const [onlineStoreData, setOnlineStoreData] = useState({
    // Company Details
    aboutCompany: '',
    expertise: [],
    certificates: [],
    tags: [],
    
    // Media
    logoUrl: '',
    bannerUrl: '',
    
    // Brands
    brands: [],
    
    // Social Media
    website: '',
    linkedin: '',
    instagram: '',
    facebook: '',
    
    // Testimonials
    testimonials: []
  });

  const certificateTypes = [
    'ISO Certification',
    'Quality Assurance',
    'Food Safety',
    'Environmental',
    'Industry Specific',
    'Other'
  ];

  // Expertise functions
  const addExpertise = () => {
    setOnlineStoreData(prev => ({
      ...prev,
      expertise: [...prev.expertise, '']
    }));
  };

  const removeExpertise = (index: number) => {
    setOnlineStoreData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }));
  };

  const updateExpertise = (index: number, value: string) => {
    setOnlineStoreData(prev => ({
      ...prev,
      expertise: prev.expertise.map((item, i) => i === index ? value : item)
    }));
  };

  // Certificate functions
  const addCertificate = () => {
    setOnlineStoreData(prev => ({
      ...prev,
      certificates: [...prev.certificates, { type: '', name: '', fileUrl: '' }]
    }));
  };

  const removeCertificate = (index: number) => {
    setOnlineStoreData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((_, i) => i !== index)
    }));
  };

  const updateCertificate = (index: number, field: string, value: string) => {
    setOnlineStoreData(prev => ({
      ...prev,
      certificates: prev.certificates.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  // Tags functions
  const addTag = () => {
    setOnlineStoreData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const removeTag = (index: number) => {
    setOnlineStoreData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const updateTag = (index: number, value: string) => {
    setOnlineStoreData(prev => ({
      ...prev,
      tags: prev.tags.map((item, i) => i === index ? value : item)
    }));
  };

  // Brand functions
  const addBrand = () => {
    setOnlineStoreData(prev => ({
      ...prev,
      brands: [...prev.brands, { name: '', logoUrl: '', description: '' }]
    }));
  };

  const removeBrand = (index: number) => {
    setOnlineStoreData(prev => ({
      ...prev,
      brands: prev.brands.filter((_, i) => i !== index)
    }));
  };

  const updateBrand = (index: number, field: string, value: string) => {
    setOnlineStoreData(prev => ({
      ...prev,
      brands: prev.brands.map((brand, i) => 
        i === index ? { ...brand, [field]: value } : brand
      )
    }));
  };

  // Testimonial functions
  const addTestimonial = () => {
    setOnlineStoreData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { customerName: '', location: '', testimonial: '' }]
    }));
  };

  const removeTestimonial = (index: number) => {
    setOnlineStoreData(prev => ({
      ...prev,
      testimonials: prev.testimonials.filter((_, i) => i !== index)
    }));
  };

  const updateTestimonial = (index: number, field: string, value: string) => {
    setOnlineStoreData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial, i) => 
        i === index ? { ...testimonial, [field]: value } : testimonial
      )
    }));
  };

  const handleNext = () => {
    // Basic validation for company details tab
    if (currentSetupTab === 0 && !onlineStoreData.aboutCompany.trim()) {
      alert('Please fill in the "About Company" field before proceeding.');
      return;
    }

    if (currentSetupTab < setupTabs.length - 1) {
      setCurrentSetupTab(currentSetupTab + 1);
    } else {
      handleSaveSettings();
    }
  };

  const handlePrevious = () => {
    if (currentSetupTab > 0) {
      setCurrentSetupTab(currentSetupTab - 1);
    }
  };

  const handleSaveSettings = () => {
    console.log('Saving online store settings:', onlineStoreData);
    setIsSetupMode(false);
    alert('Online store settings saved successfully!');
  };

  const handleEditSettings = () => {
    setIsSetupMode(true);
    setCurrentSetupTab(0);
  };

  const handlePreview = () => {
    setIsPreviewModalOpen(true);
  };

  const renderCompanyDetails = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          About Company <span className="text-red-500">*</span>
        </label>
        <textarea
          value={onlineStoreData.aboutCompany}
          onChange={(e) => setOnlineStoreData(prev => ({ ...prev, aboutCompany: e.target.value }))}
          rows={6}
          readOnly={!isSetupMode}
          className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
            !isSetupMode ? 'bg-gray-50' : ''
          }`}
          placeholder="Tell customers about your company, mission, and values..."
          required
        />
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
          <label className="block text-sm font-medium text-gray-700">Expertise</label>
          {isSetupMode && (
            <button
              onClick={addExpertise}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add Expertise
            </button>
          )}
        </div>
        <div className="space-y-3">
          {onlineStoreData.expertise.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-lg">
              {isSetupMode ? 'No expertise added yet. Click "Add Expertise" to get started.' : 'No expertise configured.'}
            </div>
          ) : (
            onlineStoreData.expertise.map((expertise, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => updateExpertise(index, e.target.value)}
                  placeholder="e.g., Premium Hospitality Supplies"
                  readOnly={!isSetupMode}
                  className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    !isSetupMode ? 'bg-gray-50' : ''
                  }`}
                />
                {isSetupMode && (
                  <button
                    onClick={() => removeExpertise(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto justify-center flex items-center"
                  >
                    <X className="w-4 h-4" />
                    <span className="ml-1 sm:hidden">Remove</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
          <label className="block text-sm font-medium text-gray-700">Certificates</label>
          {isSetupMode && (
            <button
              onClick={addCertificate}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add Certificate
            </button>
          )}
        </div>
        <div className="space-y-4">
          {onlineStoreData.certificates.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-lg">
              {isSetupMode ? 'No certificates added yet. Click "Add Certificate" to get started.' : 'No certificates configured.'}
            </div>
          ) : (
            onlineStoreData.certificates.map((certificate, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <h4 className="text-sm font-medium text-gray-900">Certificate {index + 1}</h4>
                  {isSetupMode && (
                    <button
                      onClick={() => removeCertificate(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto justify-center flex items-center"
                    >
                      <X className="w-4 h-4" />
                      <span className="ml-1 sm:hidden">Remove Certificate</span>
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Type of Certificate</label>
                    <select
                      value={certificate.type}
                      onChange={(e) => updateCertificate(index, 'type', e.target.value)}
                      disabled={!isSetupMode}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${
                        !isSetupMode ? 'bg-gray-50' : ''
                      }`}
                    >
                      <option value="">Select certificate type</option>
                      {certificateTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Certificate Name</label>
                    <input
                      type="text"
                      value={certificate.name}
                      onChange={(e) => updateCertificate(index, 'name', e.target.value)}
                      placeholder="Enter certificate name"
                      readOnly={!isSetupMode}
                      className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${
                        !isSetupMode ? 'bg-gray-50' : ''
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Certificate File</label>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                      type="text"
                      value={certificate.fileUrl}
                      onChange={(e) => updateCertificate(index, 'fileUrl', e.target.value)}
                      placeholder="Enter file URL or upload"
                      readOnly={!isSetupMode}
                      className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm ${
                        !isSetupMode ? 'bg-gray-50' : ''
                      }`}
                    />
                    {isSetupMode && (
                      <button className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors w-full sm:w-auto">
                        <Upload className="w-4 h-4 inline mr-1" />
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          {isSetupMode && (
            <button
              onClick={addTag}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Add Tag
            </button>
          )}
        </div>
        <div className="space-y-3">
          {onlineStoreData.tags.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm bg-gray-50 rounded-lg">
              {isSetupMode ? 'No tags added yet. Click "Add Tag" to get started.' : 'No tags configured.'}
            </div>
          ) : (
            onlineStoreData.tags.map((tag, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder="e.g., Premium, Organic, Sustainable"
                  readOnly={!isSetupMode}
                  className={`flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    !isSetupMode ? 'bg-gray-50' : ''
                  }`}
                />
                {isSetupMode && (
                  <button
                    onClick={() => removeTag(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto justify-center flex items-center"
                  >
                    <X className="w-4 h-4" />
                    <span className="ml-1 sm:hidden">Remove</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderMedia = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Company Logo</label>
        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isSetupMode ? 'border-gray-300 hover:border-purple-400' : 'border-gray-200 bg-gray-50'
        }`}>
          <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Upload your company logo</p>
          <p className="text-xs text-gray-500 mb-3">Recommended: 200x200px, PNG or JPG</p>
          <input
            type="text"
            value={onlineStoreData.logoUrl}
            onChange={(e) => setOnlineStoreData(prev => ({ ...prev, logoUrl: e.target.value }))}
            placeholder="Enter logo URL or upload file"
            readOnly={!isSetupMode}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3 ${
              !isSetupMode ? 'bg-gray-50' : ''
            }`}
          />
          {isSetupMode && (
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Upload & Crop Logo
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Store Banner</label>
        <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isSetupMode ? 'border-gray-300 hover:border-purple-400' : 'border-gray-200 bg-gray-50'
        }`}>
          <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">Upload your store banner</p>
          <p className="text-xs text-gray-500 mb-3">Recommended: 1200x400px, PNG or JPG</p>
          <input
            type="text"
            value={onlineStoreData.bannerUrl}
            onChange={(e) => setOnlineStoreData(prev => ({ ...prev, bannerUrl: e.target.value }))}
            placeholder="Enter banner URL or upload file"
            readOnly={!isSetupMode}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-3 ${
              !isSetupMode ? 'bg-gray-50' : ''
            }`}
          />
          {isSetupMode && (
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              Upload & Crop Banner
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderBrands = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h3 className="text-lg font-medium text-gray-900">Brand Management</h3>
        {isSetupMode && (
          <button
            onClick={addBrand}
            className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brand</span>
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {onlineStoreData.brands.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm">{isSetupMode ? 'No brands added yet. Click "Add Brand" to get started.' : 'No brands configured.'}</p>
          </div>
        ) : (
          onlineStoreData.brands.map((brand, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                <h4 className="text-md font-medium text-gray-900">Brand {index + 1}</h4>
                {isSetupMode && (
                  <button
                    onClick={() => removeBrand(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto justify-center flex items-center"
                  >
                    <X className="w-4 h-4" />
                    <span className="ml-1 sm:hidden">Remove Brand</span>
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name</label>
                  <input
                    type="text"
                    value={brand.name}
                    onChange={(e) => updateBrand(index, 'name', e.target.value)}
                    placeholder="Enter brand name"
                    readOnly={!isSetupMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      !isSetupMode ? 'bg-gray-50' : ''
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Logo URL</label>
                  <input
                    type="text"
                    value={brand.logoUrl}
                    onChange={(e) => updateBrand(index, 'logoUrl', e.target.value)}
                    placeholder="Enter logo URL or upload file"
                    readOnly={!isSetupMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      !isSetupMode ? 'bg-gray-50' : ''
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand Description</label>
                  <textarea
                    value={brand.description}
                    onChange={(e) => updateBrand(index, 'description', e.target.value)}
                    rows={4}
                    maxLength={1000}
                    readOnly={!isSetupMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      !isSetupMode ? 'bg-gray-50' : ''
                    }`}
                    placeholder="Describe this brand (max 1000 characters)"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {brand.description.length}/1000 characters
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Social Media Links</h3>
      
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={onlineStoreData.website}
            onChange={(e) => setOnlineStoreData(prev => ({ ...prev, website: e.target.value }))}
            placeholder="https://yourcompany.com"
            readOnly={!isSetupMode}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              !isSetupMode ? 'bg-gray-50' : ''
            }`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input
            type="url"
            value={onlineStoreData.linkedin}
            onChange={(e) => setOnlineStoreData(prev => ({ ...prev, linkedin: e.target.value }))}
            placeholder="https://linkedin.com/company/yourcompany"
            readOnly={!isSetupMode}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              !isSetupMode ? 'bg-gray-50' : ''
            }`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
          <input
            type="url"
            value={onlineStoreData.instagram}
            onChange={(e) => setOnlineStoreData(prev => ({ ...prev, instagram: e.target.value }))}
            placeholder="https://instagram.com/yourcompany"
            readOnly={!isSetupMode}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              !isSetupMode ? 'bg-gray-50' : ''
            }`}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
          <input
            type="url"
            value={onlineStoreData.facebook}
            onChange={(e) => setOnlineStoreData(prev => ({ ...prev, facebook: e.target.value }))}
            placeholder="https://facebook.com/yourcompany"
            readOnly={!isSetupMode}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
              !isSetupMode ? 'bg-gray-50' : ''
            }`}
          />
        </div>
      </div>
    </div>
  );

  const renderTestimonials = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h3 className="text-lg font-medium text-gray-900">Customer Testimonials</h3>
        {isSetupMode && (
          <button
            onClick={addTestimonial}
            className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        {onlineStoreData.testimonials.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm">{isSetupMode ? 'No testimonials added yet. Click "Add Testimonial" to get started.' : 'No testimonials configured.'}</p>
          </div>
        ) : (
          onlineStoreData.testimonials.map((testimonial, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-2 sm:space-y-0">
                <h4 className="text-md font-medium text-gray-900">Testimonial {index + 1}</h4>
                {isSetupMode && (
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full sm:w-auto justify-center flex items-center"
                  >
                    <X className="w-4 h-4" />
                    <span className="ml-1 sm:hidden">Remove Testimonial</span>
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                  <input
                    type="text"
                    value={testimonial.customerName}
                    onChange={(e) => updateTestimonial(index, 'customerName', e.target.value)}
                    placeholder="Customer name"
                    readOnly={!isSetupMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      !isSetupMode ? 'bg-gray-50' : ''
                    }`}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={testimonial.location}
                    onChange={(e) => updateTestimonial(index, 'location', e.target.value)}
                    placeholder="City, Country"
                    readOnly={!isSetupMode}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      !isSetupMode ? 'bg-gray-50' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Testimonial</label>
                <textarea
                  value={testimonial.testimonial}
                  onChange={(e) => updateTestimonial(index, 'testimonial', e.target.value)}
                  rows={4}
                  readOnly={!isSetupMode}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    !isSetupMode ? 'bg-gray-50' : ''
                  }`}
                  placeholder="Customer testimonial..."
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderCurrentTabContent = () => {
    switch (setupTabs[currentSetupTab].id) {
      case 'company':
        return renderCompanyDetails();
      case 'media':
        return renderMedia();
      case 'brands':
        return renderBrands();
      case 'social':
        return renderSocial();
      case 'testimonials':
        return renderTestimonials();
      default:
        return renderCompanyDetails();
    }
  };

  const renderViewMode = () => (
    <div className="space-y-6">
      {/* Header with Edit Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Online Store Configuration</h2>
          <p className="text-sm text-gray-600 mt-1">Your store is configured and ready</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={handleEditSettings}
            className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            <span>Edit Settings</span>
          </button>
          <button
            onClick={handlePreview}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>Preview Store</span>
          </button>
        </div>
      </div>

      {/* Configuration Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Details Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About Company</label>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {onlineStoreData.aboutCompany || 'Not configured'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expertise ({onlineStoreData.expertise.length})</label>
              <div className="flex flex-wrap gap-2">
                {onlineStoreData.expertise.length > 0 ? (
                  onlineStoreData.expertise.map((expertise, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                      {expertise}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">None configured</span>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Certificates ({onlineStoreData.certificates.length})</label>
              <div className="space-y-2">
                {onlineStoreData.certificates.length > 0 ? (
                  onlineStoreData.certificates.map((cert, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded text-xs">
                      <span className="font-medium">{cert.name}</span> - {cert.type}
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-500">None configured</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Media & Social Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Media & Social</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
              <p className="text-sm text-gray-600">
                {onlineStoreData.logoUrl ? 'Configured' : 'Not configured'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Banner</label>
              <p className="text-sm text-gray-600">
                {onlineStoreData.bannerUrl ? 'Configured' : 'Not configured'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Social Links</label>
              <div className="space-y-1 text-xs">
                <p>Website: {onlineStoreData.website || 'Not configured'}</p>
                <p>LinkedIn: {onlineStoreData.linkedin || 'Not configured'}</p>
                <p>Instagram: {onlineStoreData.instagram || 'Not configured'}</p>
                <p>Facebook: {onlineStoreData.facebook || 'Not configured'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Brands & Testimonials Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Brands ({onlineStoreData.brands.length})</h4>
              {onlineStoreData.brands.length > 0 ? (
                <div className="space-y-2">
                  {onlineStoreData.brands.map((brand, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-sm">{brand.name}</p>
                      <p className="text-xs text-gray-600 truncate">{brand.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No brands configured</p>
              )}
            </div>
            
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-3">Testimonials ({onlineStoreData.testimonials.length})</h4>
              {onlineStoreData.testimonials.length > 0 ? (
                <div className="space-y-2">
                  {onlineStoreData.testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-sm">{testimonial.customerName}</p>
                      <p className="text-xs text-gray-600">{testimonial.location}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No testimonials configured</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSetupMode = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Online Store Setup</h1>
          <p className="text-sm text-gray-600 mt-1">Configure your online store presence</p>
        </div>
        <div className="text-sm text-gray-500">
          Step {currentSetupTab + 1} of {setupTabs.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Setup Progress</span>
          <span className="text-sm text-gray-500">
            {Math.round(((currentSetupTab + 1) / setupTabs.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentSetupTab + 1) / setupTabs.length) * 100}%` }}
          ></div>
        </div>
        
        {/* Tab Indicators */}
        <div className="flex justify-between mt-4 overflow-x-auto">
          {setupTabs.map((tab, index) => (
            <div key={tab.id} className="flex flex-col items-center space-y-2 min-w-0 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index <= currentSetupTab 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {index < currentSetupTab ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span className="text-xs text-gray-600 text-center hidden sm:block">{tab.name}</span>
              <span className="text-xs text-gray-600 text-center sm:hidden">{tab.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Current Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-2">
            {React.createElement(setupTabs[currentSetupTab].icon, { className: "w-6 h-6 text-purple-600" })}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{setupTabs[currentSetupTab].name}</h2>
          </div>
          <div className="w-full h-px bg-gray-200"></div>
        </div>
        
        {renderCurrentTabContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentSetupTab === 0}
          className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>
        
        <button
          onClick={handleNext}
          className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex-1 sm:flex-none"
        >
          <span>
            {currentSetupTab === setupTabs.length - 1 ? 'Save & Complete Setup' : 'Next'}
          </span>
          {currentSetupTab < setupTabs.length - 1 && <ChevronRight className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Upgrade Notice */}
      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            <div>
              <h3 className="text-lg font-semibold text-purple-900">Premium Feature</h3>
              <p className="text-sm text-purple-700">Upgrade to access full online store customization</p>
            </div>
          </div>
          <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      {isSetupMode ? renderSetupMode() : renderViewMode()}

      {/* Preview Modal */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Store Preview</h2>
                <button
                  onClick={() => setIsPreviewModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">Premium Hospitality Supplies</h3>
                  <p className="text-gray-600 mt-2">{onlineStoreData.aboutCompany || 'About company not provided'}</p>
                </div>
                
                {onlineStoreData.expertise.filter(e => e.trim()).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Our Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {onlineStoreData.expertise.filter(e => e.trim()).map((expertise, index) => (
                        <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                          {expertise}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {onlineStoreData.certificates.filter(c => c.name.trim()).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Certificates</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {onlineStoreData.certificates.filter(c => c.name.trim()).map((cert, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-3">
                          <h5 className="font-medium text-gray-900 text-sm">{cert.name}</h5>
                          <p className="text-xs text-gray-600">{cert.type}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {onlineStoreData.brands.filter(b => b.name.trim()).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Our Brands</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {onlineStoreData.brands.filter(b => b.name.trim()).map((brand, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h5 className="font-medium text-gray-900">{brand.name}</h5>
                          <p className="text-sm text-gray-600 mt-1">{brand.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {onlineStoreData.testimonials.filter(t => t.customerName.trim()).length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Customer Testimonials</h4>
                    <div className="grid grid-cols-1 gap-4">
                      {onlineStoreData.testimonials.filter(t => t.customerName.trim()).map((testimonial, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <p className="text-gray-700 italic mb-2">"{testimonial.testimonial}"</p>
                          <p className="text-sm font-medium text-gray-900">{testimonial.customerName}</p>
                          <p className="text-xs text-gray-500">{testimonial.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;