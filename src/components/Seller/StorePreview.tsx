import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Send, Check, Star, MapPin, Users, DollarSign, Globe, Linkedin, Facebook, Instagram } from 'lucide-react';

interface StorePreviewProps {
  companyData: any;
  storeData: any;
  onSubmit: () => void;
  onEdit: () => void;
}

const StorePreview: React.FC<StorePreviewProps> = ({ companyData, storeData, onSubmit, onEdit }) => {
  const { keyInfo, documents, media, socialMedia, clients } = storeData;
  const navigate = useNavigate();

  const handlePreview = () => {
    const sellerId = companyData?.companyName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'emirates-food-solutions';
    navigate(`/seller/${sellerId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Preview</h1>
              <p className="text-gray-600">Review your online store before submitting for approval</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onEdit}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={onSubmit}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
              >
                <Send className="w-5 h-5" />
                <span>Submit for Approval</span>
              </button>
              
              <button
                onClick={handlePreview}
                className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all duration-200 font-medium"
              >
                <span>Preview Public Page</span>
              </button>
            </div>
          </div>
        </div>

        {/* Store Preview */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner */}
          {media.bannerCropped && (
            <div className="h-64 relative">
              <img
                src={URL.createObjectURL(media.bannerCropped)}
                alt="Company Banner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
          )}

          {/* Company Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="flex items-start space-x-6">
              {media.logoCropped && (
                <img
                  src={URL.createObjectURL(media.logoCropped)}
                  alt="Company Logo"
                  className={`object-contain bg-white rounded-lg shadow-md p-2 ${
                    storeData.media.logoShape === 'square' ? 'w-24 h-24' : 'w-32 h-18'
                  }`}
                />
              )}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{companyData.companyName}</h2>
                <div className="flex items-center space-x-4 text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{companyData.city}, {companyData.state}, {companyData.country}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{keyInfo.numberOfEmployees}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4" />
                    <span>{keyInfo.annualRevenue}</span>
                  </div>
                </div>
                
                {/* Company Tags */}
                {keyInfo.companyTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {keyInfo.companyTags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Social Media Links */}
                <div className="flex space-x-3">
                  {socialMedia.website && (
                    <a href={socialMedia.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                  {socialMedia.linkedin && (
                    <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {socialMedia.facebook && (
                    <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {socialMedia.instagram && (
                    <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* About */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About Us</h3>
                  <p className="text-gray-600 leading-relaxed">{keyInfo.about}</p>
                </div>

                {/* Expertise */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Our Expertise</h3>
                  <p className="text-gray-600 leading-relaxed">{keyInfo.expertise}</p>
                </div>

                {/* Other Images */}
                {media.otherImages.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {media.otherImages.map((image, index) => (
                        <img
                          key={index}
                          src={URL.createObjectURL(image)}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Client Testimonials */}
                {clients.filter(client => client.name.trim() !== '').length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Client Testimonials</h3>
                    <div className="space-y-6">
                      {clients.filter(client => client.name.trim() !== '').map((client, index) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            {client.image && (
                              <img
                                src={URL.createObjectURL(client.image)}
                                alt={client.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                              <p className="text-gray-600 mb-3 italic">"{client.testimonial}"</p>
                              <div className="text-sm">
                                <p className="font-medium text-gray-900">{client.name}</p>
                                <p className="text-gray-500">{client.location}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Documents */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications & Documents</h3>
                  <div className="space-y-4">
                    {(['permits', 'certificates', 'inspections'] as const).map((type) => (
                      documents[type].length > 0 && (
                        <div key={type}>
                          <h4 className="font-medium text-gray-900 mb-2 capitalize">
                            {type === 'permits' ? 'Permits' : type === 'certificates' ? 'Certificates' : 'Inspections'}
                          </h4>
                          <div className="space-y-2">
                            {documents[type].map((doc, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-gray-600">{doc.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                </div>

                {/* Company Info */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Company Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Type:</span>
                      <span className="text-gray-600 ml-2">{companyData.companyType}</span>
                    </div>
                    {companyData.vatNumber && (
                      <div>
                        <span className="font-medium text-gray-900">VAT Number:</span>
                        <span className="text-gray-600 ml-2">{companyData.vatNumber}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-medium text-gray-900">Address:</span>
                      <span className="text-gray-600 ml-2">{companyData.streetAddress}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePreview;