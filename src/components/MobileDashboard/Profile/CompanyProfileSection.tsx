import React, { useState } from 'react';
import { Edit3, Upload, Trash2, FileText, Building, Globe, Users, X } from 'lucide-react';
import { Button } from '../UI/Button';

export function CompanyProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showGroupNameField, setShowGroupNameField] = useState(false);
  const [formData, setFormData] = useState({
    businessName: 'Grand Hotel Dubai',
    businessType: 'Hospitality',
    country: 'United Arab Emirates',
    state: 'Dubai',
    city: 'Dubai',
    website: 'www.grandhoteldubai.com',
    businessUnits: '3',
    isLargeChain: true,
    groupName: 'Grand Hotels International'
  });

  const [documents, setDocuments] = useState([
    { id: '1', name: 'Trade License.pdf', type: 'Trade License', uploadDate: '2024-01-15' },
    { id: '2', name: 'VAT Certificate.pdf', type: 'VAT Certificate', uploadDate: '2024-01-15' },
    { id: '3', name: 'Municipality License.pdf', type: 'Municipality License', uploadDate: '2024-01-10' }
  ]);

  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    expiry: ''
  });

  const businessTypes = [
    'Hospitality', 'Restaurant', 'Retail', 'Manufacturing', 'Healthcare', 'Education', 'Other'
  ];

  const countries = [
    'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'
  ];

  const states = [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'isLargeChain') {
      setShowGroupNameField(value as boolean);
    }
  };

  const handleSave = () => {
    console.log('Saving company profile:', formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
  };

  const handleAddDocument = () => {
    if (newDocument.name && newDocument.type) {
      const document = {
        id: Date.now().toString(),
        name: newDocument.name,
        type: newDocument.type,
        uploadDate: new Date().toISOString().split('T')[0],
        expiry: newDocument.expiry
      };
      setDocuments(prev => [...prev, document]);
      setNewDocument({ name: '', type: '', expiry: '' });
      setShowDocumentModal(false);
    }
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Company Profile</h2>
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

      <div className="space-y-2">
        {/* Business Information */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Business Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => handleInputChange('businessName', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center text-xs text-gray-900 px-2 py-1.5">
                <Building className="w-3 h-3 mr-1 text-gray-500" />
                {formData.businessName}
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Business Type</label>
            {isEditing ? (
              <select
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              >
                {businessTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            ) : (
              <div className="text-xs text-gray-900 px-2 py-1.5">
                {formData.businessType}
              </div>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Office Location</label>
          <div className="grid grid-cols-3 gap-1">
            {isEditing ? (
              <>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                >
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                >
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                  placeholder="City"
                />
              </>
            ) : (
              <div className="col-span-3 text-xs text-gray-900 px-2 py-1.5">
                {formData.city}, {formData.state}, {formData.country}
              </div>
            )}
          </div>
        </div>

        {/* Website and Business Units */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Website</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center text-xs text-gray-900 px-2 py-1.5">
                <Globe className="w-3 h-3 mr-1 text-gray-500" />
                {formData.website}
              </div>
            )}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Business Units</label>
            {isEditing ? (
              <input
                type="number"
                value={formData.businessUnits}
                onChange={(e) => handleInputChange('businessUnits', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              />
            ) : (
              <div className="flex items-center text-xs text-gray-900 px-2 py-1.5">
                <Users className="w-3 h-3 mr-1 text-gray-500" />
                {formData.businessUnits} units
              </div>
            )}
          </div>
        </div>

        {/* Large Chain Toggle */}
        <div className="flex items-center justify-between py-2">
          <label className="text-xs font-medium text-gray-700">Large restaurant chain or hotel group</label>
          {isEditing ? (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isLargeChain}
                onChange={(e) => handleInputChange('isLargeChain', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          ) : (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              formData.isLargeChain 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {formData.isLargeChain ? 'Yes' : 'No'}
            </span>
          )}
        </div>

        {/* Group Name Field */}
        {(showGroupNameField || formData.isLargeChain) && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Group Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.groupName}
                onChange={(e) => handleInputChange('groupName', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter group name"
              />
            ) : (
              <div className="text-xs text-gray-900 px-2 py-1.5">
                {formData.groupName}
              </div>
            )}
          </div>
        )}

        {/* Documents Section */}
        <div className="border-t border-gray-200 pt-3 mt-3">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-700">Attached Documents</label>
            <Button size="sm" variant="ghost" className="text-xs">
              <Upload 
                className="w-3 h-3 mr-1" 
                onClick={() => setShowDocumentModal(true)}
              />
              Upload
            </Button>
          </div>
          <div className="space-y-1">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <div className="flex items-center space-x-2">
                  <FileText className="w-3 h-3 text-gray-500" />
                  <div>
                    <p className="text-xs font-medium text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">
                      {doc.type} • {doc.uploadDate}
                      {doc.expiry && ` • Expires: ${doc.expiry}`}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteDocument(doc.id)}
                  className="p-1 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Document Upload Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-900">Upload Document</h3>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Document Name</label>
                <input
                  type="text"
                  value={newDocument.name}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Trade License"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Document Type</label>
                <select
                  value={newDocument.type}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="Trade License">Trade License</option>
                  <option value="VAT Certificate">VAT Certificate</option>
                  <option value="Municipality License">Municipality License</option>
                  <option value="Insurance Certificate">Insurance Certificate</option>
                  <option value="Other">Other</option>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={newDocument.expiry}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, expiry: e.target.value }))}
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
                </select>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Attach File</label>
                <input
                  type="file"
                  className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button size="sm" onClick={handleAddDocument} className="text-xs flex-1">
                  Add Document
                </Button>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={() => setShowDocumentModal(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}