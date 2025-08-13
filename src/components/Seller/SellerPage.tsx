import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Shield, MessageSquare, FileText, Bot, ExternalLink, Phone, Mail, Globe, Users, Award, Package, Truck, Building, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SellerPageProps {
  sellerId?: string;
}

const SellerPage: React.FC<SellerPageProps> = ({ sellerId = 'emirates-food-solutions' }) => {
  const navigate = useNavigate();
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);

  // Mock seller data - in real app, this would come from API based on sellerId
  const sellerData = previewData || {
    id: 'emirates-food-solutions',
    companyName: 'Emirates Food Solutions',
    companyType: 'Distributor & Supplier',
    location: 'Dubai, United Arab Emirates',
    verified: true,
    rating: 4.8,
    reviewCount: 245,
    tags: ['Halal Certified', 'ISO 22000', 'HACCP', 'Sustainable', 'Premium Quality'],
    banner: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200&h=240&fit=crop',
    logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    about: 'Emirates Food Solutions has been a leading distributor of premium food products across the Middle East for over 15 years. We specialize in providing high-quality ingredients, specialty foods, and culinary solutions to hotels, restaurants, and catering companies throughout the region. Our commitment to excellence and customer satisfaction has made us a trusted partner for hospitality professionals.',
    expertise: [
      'Premium Food Distribution',
      'Specialty Ingredients Sourcing',
      'Halal Certified Products',
      'Cold Chain Management',
      'Custom Packaging Solutions',
      'Bulk Order Fulfillment'
    ],
    clients: [
      { name: 'Marriott Hotels', logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Hilton Dubai', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Four Seasons', logo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Jumeirah Group', logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
    ],
    brands: [
      { name: 'Unilever', logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Nestlé', logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Kraft Heinz', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'General Mills', logo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
    ],
    locations: [
      {
        type: 'Head Office',
        address: 'Dubai Investment Park, Dubai, UAE',
        services: ['Sales', 'Customer Service', 'Logistics']
      },
      {
        type: 'Warehouse',
        address: 'Jebel Ali Free Zone, Dubai, UAE',
        services: ['Storage', 'Distribution', 'Cold Chain']
      },
      {
        type: 'Branch Office',
        address: 'Abu Dhabi, UAE',
        services: ['Sales', 'Local Distribution']
      }
    ],
    serviceAvailability: [
      { service: 'Direct Delivery', available: true, coverage: 'UAE, GCC' },
      { service: 'Export Services', available: true, coverage: 'Middle East, Africa' },
      { service: 'Cold Chain', available: true, coverage: 'UAE' },
      { service: '24/7 Support', available: true, coverage: 'All Regions' }
    ],
    products: [
      {
        id: 1,
        name: 'Premium Olive Oil Collection',
        image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Extra virgin olive oils from Mediterranean regions',
        specs: ['500ml, 1L bottles', 'Organic certified', 'Cold pressed']
      },
      {
        id: 2,
        name: 'Halal Meat Products',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Premium halal beef, lamb, and poultry',
        specs: ['Fresh & Frozen', 'Halal certified', 'Various cuts available']
      },
      {
        id: 3,
        name: 'Specialty Spices & Herbs',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Authentic Middle Eastern and international spices',
        specs: ['Bulk packaging', 'Custom blends', 'Premium quality']
      },
      {
        id: 4,
        name: 'Dairy & Cheese Selection',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Imported and local dairy products',
        specs: ['Temperature controlled', 'Various brands', 'Bulk orders']
      }
    ],
    contact: {
      phone: '+971 4 123 4567',
      email: 'sales@emiratesfood.ae',
      website: 'www.emiratesfoodsolutions.com'
    }
  };

  const AIAgentModal = () => {
    if (!showAIAgent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Sales Agent</h3>
            <p className="text-gray-600">Chat with our intelligent sales assistant</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">👋 Hi! I'm Anita, Emirates Food Solutions' AI assistant.</p>
            <p className="text-sm text-gray-600">I can help you with:</p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Product information and pricing</li>
              <li>• Custom quotations</li>
              <li>• Delivery options</li>
              <li>• Technical specifications</li>
            </ul>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowAIAgent(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
            <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-700">
              Start Chat
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RFQModal = () => {
    if (!showRFQModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Quotation</h3>
            <p className="text-gray-600">Get a custom quote from Emirates Food Solutions</p>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="What are you looking for?"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Expected quantity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any specific requirements or details..."
              />
            </div>
          </form>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowRFQModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-indigo-700">
              Send Request
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MessageModal = () => {
    if (!showMessageModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Send Message</h3>
            <p className="text-gray-600">Contact Emirates Food Solutions directly</p>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Message subject"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Your message..."
              />
            </div>
          </form>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowMessageModal(false)}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700">
              Send Message
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
        <img
          src={sellerData.banner}
          alt="Company Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/marketplace')}
          className="absolute top-4 left-4 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Marketplace</span>
        </button>
      </div>

      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            {/* Left Side - Company Info */}
            <div className="flex items-start space-x-4 sm:space-x-6 flex-1">
              <img
                src={sellerData.logo}
                alt="Company Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full object-cover shadow-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 truncate">
                    {sellerData.companyName}
                  </h1>
                  {sellerData.verified && (
                    <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      <Shield className="w-4 h-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>
                
                <p className="text-lg text-gray-600 mb-2">{sellerData.companyType}</p>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{sellerData.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(sellerData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{sellerData.rating}</span>
                    <span className="text-sm text-gray-500">({sellerData.reviewCount} reviews)</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {sellerData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - CTAs */}
            <div className="flex flex-col space-y-3 w-full lg:w-auto lg:min-w-[200px]">
              <button
                onClick={() => setShowAIAgent(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2 shadow-lg"
              >
                <Bot className="w-5 h-5" />
                <span>AI Sales Agent</span>
              </button>
              
              <button
                onClick={() => setShowRFQModal(true)}
                className="w-full bg-blue-500 text-white px-6 py-2.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
              >
                <FileText className="w-4 h-4" />
                <span>Request Quotation</span>
              </button>
              
              <button
                onClick={() => setShowMessageModal(true)}
                className="w-full text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium underline text-center"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Us */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About Us</h2>
              <p className="text-gray-600 leading-relaxed">{sellerData.about}</p>
            </div>

            {/* Expertise */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sellerData.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Clients</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {sellerData.clients.map((client, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-16 h-16 mx-auto rounded-lg object-cover mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">{client.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands We Work With */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Brands We Work With</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {sellerData.brands.map((brand, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-16 h-16 mx-auto rounded-lg object-cover mb-2"
                    />
                    <p className="text-sm font-medium text-gray-900">{brand.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product List */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sellerData.products.map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                    <div className="space-y-1">
                      {product.specs.map((spec, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <span className="text-xs text-gray-500">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{sellerData.contact.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{sellerData.contact.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <a href={`https://${sellerData.contact.website}`} className="text-sm text-blue-600 hover:text-blue-800">
                    {sellerData.contact.website}
                  </a>
                </div>
              </div>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Our Locations</h3>
              <div className="space-y-4">
                {sellerData.locations.map((location, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900">{location.type}</h4>
                    <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                    <div className="flex flex-wrap gap-1">
                      {location.services.map((service, serviceIndex) => (
                        <span
                          key={serviceIndex}
                          className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Availability */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Service Availability</h3>
              <div className="space-y-3">
                {sellerData.serviceAvailability.map((service, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${service.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{service.service}</p>
                      <p className="text-sm text-gray-600">{service.coverage}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AIAgentModal />
      <RFQModal />
      <MessageModal />
    </div>
  );
};

export default SellerPage;