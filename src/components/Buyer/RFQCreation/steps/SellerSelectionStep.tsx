import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Users, Shield, Plus, X, Phone, Mail, User, Building, Award, CheckSquare, Square, AlertCircle, ChevronDown, FileText, Upload } from 'lucide-react';
import CustomDropdown from '../CustomDropdown';

interface ProviderSelectionStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface DummyProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  rating: number;
  location: string;
  specialties: string[];
  verified: boolean;
}

interface Certificate {
  id: string;
  name: string;
  mandatory: boolean;
}

interface ManualProvider {
  id: string;
  name: string;
  email: string;
  phone: string;
  contactPerson: string;
}

interface Document {
  id: string;
  name: string;
  mandatory: boolean;
}

const languages = [
  'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 
  'Arabic', 'Portuguese', 'Russian', 'Italian', 'Korean', 'Dutch',
  'Swedish', 'Norwegian', 'Danish', 'Finnish', 'Polish', 'Czech',
  'Hungarian', 'Romanian', 'Bulgarian', 'Greek', 'Turkish', 'Hindi'
];

const dummyProviders: DummyProvider[] = [
  {
    id: '1',
    name: 'Global Supply Co.',
    email: 'contact@globalsupply.com',
    phone: '+1 (555) 123-4567',
    rating: 4.8,
    location: 'New York, USA',
    specialties: ['Office Supplies', 'Electronics', 'Furniture'],
    verified: true
  },
  {
    id: '2',
    name: 'Premium Materials Ltd.',
    email: 'sales@premiummaterials.com',
    phone: '+1 (555) 234-5678',
    rating: 4.6,
    location: 'Los Angeles, USA',
    specialties: ['Construction', 'Raw Materials', 'Tools'],
    verified: true
  },
  {
    id: '3',
    name: 'Tech Solutions Inc.',
    email: 'info@techsolutions.com',
    phone: '+1 (555) 345-6789',
    rating: 4.9,
    location: 'San Francisco, USA',
    specialties: ['Technology', 'Software', 'Hardware'],
    verified: true
  },
  {
    id: '4',
    name: 'Industrial Partners',
    email: 'orders@industrialpartners.com',
    phone: '+1 (555) 456-7890',
    rating: 4.5,
    location: 'Chicago, USA',
    specialties: ['Industrial Equipment', 'Manufacturing', 'Logistics'],
    verified: false
  }
];

const ProviderSelectionStep: React.FC<ProviderSelectionStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious
}) => {
  const [formData, setFormData] = useState({
    certificates: data.certificates || [],
    documents: data.documents || [],
    languageRequirements: data.languageRequirements || [],
    languagePreferenceEnabled: data.languagePreferenceEnabled || false,
    selectedProviders: data.selectedProviders || [],
    manualProviders: data.manualProviders || [],
  });

  const [showManualProviderModal, setShowManualProviderModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [newCertificate, setNewCertificate] = useState({ name: '', mandatory: false });
  const [newDocument, setNewDocument] = useState({ name: '', mandatory: false });
  const [selectAll, setSelectAll] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [manualProviderForm, setManualProviderForm] = useState({
    name: '',
    email: '',
    phone: '',
    contactPerson: ''
  });

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user makes changes
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languageRequirements: prev.languageRequirements.includes(language)
        ? prev.languageRequirements.filter((lang: string) => lang !== language)
        : [...prev.languageRequirements, language]
    }));
  };

  const handleProviderToggle = (providerId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedProviders: prev.selectedProviders.includes(providerId)
        ? prev.selectedProviders.filter((id: string) => id !== providerId)
        : [...prev.selectedProviders, providerId]
    }));
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deselect all
      setFormData(prev => ({ ...prev, selectedProviders: [] }));
    } else {
      // Select all
      const allProviderIds = dummyProviders.map(provider => provider.id);
      setFormData(prev => ({ ...prev, selectedProviders: allProviderIds }));
    }
    setSelectAll(!selectAll);
  };

  const addCertificate = () => {
    if (newCertificate.name.trim()) {
      const certificate: Certificate = {
        id: Date.now().toString(),
        name: newCertificate.name.trim(),
        mandatory: newCertificate.mandatory
      };
      
      setFormData(prev => ({
        ...prev,
        certificates: [...prev.certificates, certificate]
      }));
      
      setNewCertificate({ name: '', mandatory: false });
      setShowCertificateModal(false);
    }
  };

  const addDocument = () => {
    if (newDocument.name.trim()) {
      const document: Document = {
        id: Date.now().toString(),
        name: newDocument.name.trim(),
        mandatory: newDocument.mandatory
      };
      
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, document]
      }));
      
      setNewDocument({ name: '', mandatory: false });
      setShowDocumentModal(false);
    }
  };

  const removeDocument = (documentId: string) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((doc: Document) => doc.id !== documentId)
    }));
  };

  const removeCertificate = (certificateId: string) => {
    setFormData(prev => ({
      ...prev,
      certificates: prev.certificates.filter((cert: Certificate) => cert.id !== certificateId)
    }));
  };

  const handleManualProviderSubmit = () => {
    if (manualProviderForm.name && manualProviderForm.email) {
      const newProvider: ManualProvider = {
        id: Date.now().toString(),
        ...manualProviderForm
      };
      
      setFormData(prev => ({
        ...prev,
        manualProviders: [...prev.manualProviders, newProvider]
      }));

      setManualProviderForm({ name: '', email: '', phone: '', contactPerson: '' });
      setShowManualProviderModal(false);
    }
  };

  // Update selectAll state based on current selection
  useEffect(() => {
    const allSelected = dummyProviders.length > 0 && dummyProviders.every(provider => 
      formData.selectedProviders.includes(provider.id)
    );
    setSelectAll(allSelected);
  }, [formData.selectedProviders]);

  const removeManualProvider = (providerId: string) => {
    setFormData(prev => ({
      ...prev,
      manualProviders: prev.manualProviders.filter((provider: ManualProvider) => provider.id !== providerId)
    }));
  };

  const isServicesRFQ = data.rfqType === 'service';
  const isProjectRFQ = data.rfqType === 'project';
  const sectionTitle = isProjectRFQ ? 'Contractor Selection' : 'Provider Selection';

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{sectionTitle}</h2>
          <p className="text-gray-600">Define your requirements and select {isProjectRFQ ? 'contractors' : 'providers'}</p>
        </div>

        <div className="space-y-6">
          {/* Certificates */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Certificates</span>
                </div>
              </label>
              <div className="flex items-center space-x-2">
                {formData.certificates.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleInputChange('certificates', [])}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(true)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certificate</span>
                </button>
              </div>
            </div>
            
            {formData.certificates.length > 0 ? (
              <div className="space-y-2">
                {formData.certificates.map((cert: Certificate) => (
                  <div key={cert.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Award className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-gray-900">{cert.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        cert.mandatory 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {cert.mandatory ? 'Mandatory' : 'Preferred'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeCertificate(cert.id)}
                      className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No certificates specified</p>
            )}
          </div>

          {/* Documents - Only for Projects */}
          {isProjectRFQ && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4" />
                    <span>Documents</span>
                  </div>
                </label>
                <div className="flex items-center space-x-2">
                  {formData.documents.length > 0 && (
                    <button
                      type="button"
                      onClick={() => handleInputChange('documents', [])}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowDocumentModal(true)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Document</span>
                  </button>
                </div>
              </div>
              
              {formData.documents.length > 0 ? (
                <div className="space-y-2">
                  {formData.documents.map((doc: Document) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">{doc.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          doc.mandatory 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {doc.mandatory ? 'Mandatory' : 'Preferred'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeDocument(doc.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No documents specified</p>
              )}
            </div>
          )}

          {/* Language Requirements */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Language Preference</span>
                  {isProjectRFQ && (
                    <span className="text-xs text-gray-500">(Optional)</span>
                  )}
                </div>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.languagePreferenceEnabled}
                  onChange={(e) => {
                    handleInputChange('languagePreferenceEnabled', e.target.checked);
                    if (!e.target.checked) {
                      handleInputChange('languageRequirements', []);
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            {formData.languagePreferenceEnabled && (
              <>
                <div className="flex items-center justify-between mb-2">
                  {formData.languageRequirements?.length > 0 && (
                    <button
                      onClick={() => handleInputChange('languageRequirements', [])}
                      className="text-sm text-red-600 hover:text-red-700 font-medium ml-auto"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="w-full px-4 py-3 text-left border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex items-center justify-between"
                  >
                    <span className={formData.languageRequirements.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                      {formData.languageRequirements.length > 0 
                        ? `${formData.languageRequirements.length} language${formData.languageRequirements.length > 1 ? 's' : ''} selected`
                        : 'Select languages'
                      }
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${showLanguageDropdown ? 'transform rotate-180' : ''}`} />
                  </button>
                  
                  {showLanguageDropdown && (
                    <>
                      <div className="fixed inset-0 z-5" onClick={() => setShowLanguageDropdown(false)} />
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                        {languages.map(language => (
                          <label
                            key={language}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-blue-50 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={formData.languageRequirements.includes(language)}
                              onChange={() => handleLanguageToggle(language)}
                              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-900">{language}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                
                {formData.languageRequirements?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.languageRequirements.map((language: string) => (
                      <span
                        key={language}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {language}
                        <button
                          type="button"
                          onClick={() => handleLanguageToggle(language)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Recommended Providers/Contractors */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recommended {isProjectRFQ ? 'Contractors' : 'Providers'}</h3>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {selectAll ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                  <span>{selectAll ? 'Deselect All' : 'Select All'}</span>
                </button>
                <span className="text-sm text-gray-500">
                  {formData.selectedProviders.length} of {dummyProviders.length} selected
                </span>
              </div>
            </div>
            <div className="space-y-3">
              {dummyProviders.map(provider => (
                <div
                  key={provider.id}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    formData.selectedProviders.includes(provider.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleProviderToggle(provider.id)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.selectedProviders.includes(provider.id)}
                      onChange={() => handleProviderToggle(provider.id)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                        {provider.verified && (
                          <Shield className="w-4 h-4 text-green-500" title="Verified Provider" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{provider.location}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {provider.specialties.map(specialty => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Manual Providers/Contractors */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Manual {isProjectRFQ ? 'Contractors' : 'Providers'}</h3>
              <div className="flex items-center space-x-2">
                {formData.manualProviders.length > 0 && (
                  <button
                    type="button"
                    onClick={() => handleInputChange('manualProviders', [])}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowManualProviderModal(true)}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add {isProjectRFQ ? 'Contractor' : 'Provider'} Manually</span>
                </button>
              </div>
            </div>

            {formData.manualProviders.length > 0 ? (
              <div className="space-y-3">
                {formData.manualProviders.map((provider: ManualProvider) => (
                  <div key={provider.id} className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                        <div className="space-y-1 mt-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>{provider.email}</span>
                          </div>
                          {provider.phone && (
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{provider.phone}</span>
                            </div>
                          )}
                          {provider.contactPerson && (
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span>{provider.contactPerson}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeManualProvider(provider.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No manual {isProjectRFQ ? 'contractors' : 'providers'} added</p>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onPrevious}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <span>Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowCertificateModal(false)} />
            
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Add Certificate</h3>
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Certificate Name *
                  </label>
                  <input
                    type="text"
                    value={newCertificate.name}
                    onChange={(e) => setNewCertificate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., ISO 9001, FDA Certification"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={newCertificate.mandatory}
                      onChange={(e) => setNewCertificate(prev => ({ ...prev, mandatory: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div>
                      <span className="font-semibold text-blue-900">Mandatory</span>
                      <p className="text-sm text-blue-700 mt-1">
                        {newCertificate.mandatory 
                          ? 'Only sellers with this certificate can respond' 
                          : 'Sellers with this certificate will be preferred'
                        }
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowCertificateModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addCertificate}
                  disabled={!newCertificate.name.trim()}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    newCertificate.name.trim()
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Add Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Modal - Only for Projects */}
      {showDocumentModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowDocumentModal(false)} />
            
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Add Document</h3>
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Document Name *
                  </label>
                  <input
                    type="text"
                    value={newDocument.name}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Insurance Certificate, License"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-blue-50 rounded-xl p-4">
                  <label className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={newDocument.mandatory}
                      onChange={(e) => setNewDocument(prev => ({ ...prev, mandatory: e.target.checked }))}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                    />
                    <div>
                      <span className="font-semibold text-blue-900">Mandatory</span>
                      <p className="text-sm text-blue-700 mt-1">
                        {newDocument.mandatory 
                          ? 'Only contractors with this document can respond' 
                          : 'Contractors with this document will be preferred'
                        }
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowDocumentModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addDocument}
                  disabled={!newDocument.name.trim()}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    newDocument.name.trim()
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Add Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Provider Modal */}
      {showManualProviderModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowManualProviderModal(false)} />
            
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900">Add {isProjectRFQ ? 'Contractor' : 'Provider'} Manually</h3>
                <button
                  onClick={() => setShowManualProviderModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Form */}
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4" />
                      <span>{isProjectRFQ ? 'Contractor' : 'Provider'} Name *</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={manualProviderForm.name}
                    onChange={(e) => setManualProviderForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Company or individual name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Email *</span>
                    </div>
                  </label>
                  <input
                    type="email"
                    value={manualProviderForm.email}
                    onChange={(e) => setManualProviderForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="provider@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>Phone Number</span>
                    </div>
                  </label>
                  <input
                    type="tel"
                    value={manualProviderForm.phone}
                    onChange={(e) => setManualProviderForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Contact Person</span>
                    </div>
                  </label>
                  <input
                    type="text"
                    value={manualProviderForm.contactPerson}
                    onChange={(e) => setManualProviderForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowManualProviderModal(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleManualProviderSubmit}
                  disabled={!manualProviderForm.name || !manualProviderForm.email}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all duration-200 ${
                    manualProviderForm.name && manualProviderForm.email
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Add {isProjectRFQ ? 'Contractor' : 'Provider'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderSelectionStep;