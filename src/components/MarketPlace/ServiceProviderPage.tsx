import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Shield, MessageSquare, FileText, Bot, Facebook, Instagram, Linkedin, Twitter, ChevronDown, ChevronUp, Clock, Users, Award, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ServiceProviderPage: React.FC = () => {
  const navigate = useNavigate();
  const { providerId } = useParams<{ providerId: string }>();
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  // Mock service provider data
  const providerData = {
    id: providerId || 'gulf-maintenance-services',
    companyName: 'Gulf Maintenance Services',
    companyType: 'Professional Service Provider',
    location: 'Dubai, United Arab Emirates',
    verified: true,
    rating: 4.9,
    reviewCount: 187,
    tags: ['Licensed', 'Insured', '24/7 Support', 'Emergency Response', 'Certified Technicians'],
    banner: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1200&h=240&fit=crop',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
    about: 'Gulf Maintenance Services has been providing comprehensive maintenance and repair solutions to the hospitality industry across the UAE for over 12 years. We specialize in HVAC, plumbing, electrical, and general maintenance services for hotels, restaurants, and commercial properties. Our team of certified technicians ensures minimal downtime and maximum efficiency for your operations.',
    expertise: [
      'HVAC Installation & Maintenance',
      'Plumbing & Water Systems',
      'Electrical Services',
      'Kitchen Equipment Repair',
      'Emergency Response Services',
      'Preventive Maintenance Programs'
    ],
    certifications: [
      { name: 'ISO 9001:2015', description: 'Quality Management System' },
      { name: 'OHSAS 18001', description: 'Occupational Health & Safety' },
      { name: 'Dubai Municipality License', description: 'Authorized Service Provider' },
      { name: 'DEWA Approved', description: 'Electrical Works Authorization' }
    ],
    clients: [
      { name: 'Marriott Hotels', logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Hilton Dubai', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Four Seasons', logo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Jumeirah Group', logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
    ],
    directServiceAreas: [
      { country: 'United Arab Emirates', states: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'] },
      { country: 'Saudi Arabia', states: ['Riyadh', 'Jeddah', 'Dammam'] },
      { country: 'Qatar', states: ['Doha', 'Al Rayyan'] }
    ],
    locations: [
      {
        type: 'Head Office',
        address: 'Business Bay, Dubai, UAE'
      },
      {
        type: 'Service Center',
        address: 'Al Quoz Industrial Area, Dubai, UAE'
      },
      {
        type: 'Branch Office',
        address: 'Abu Dhabi, UAE'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/gulfmaintenance',
      instagram: 'https://instagram.com/gulfmaintenance',
      linkedin: 'https://linkedin.com/company/gulfmaintenance',
      twitter: 'https://twitter.com/gulfmaintenance'
    },
    testimonials: [
      {
        quote: "Gulf Maintenance Services has been our go-to partner for all HVAC and electrical needs. Their response time is exceptional and technicians are highly skilled.",
        author: "Ahmed Al-Mansouri",
        title: "Facilities Manager",
        companyName: "Atlantis The Palm",
        location: "Dubai, UAE"
      },
      {
        quote: "Professional, reliable, and always available when we need them. Their preventive maintenance program has significantly reduced our equipment downtime.",
        author: "Sarah Johnson",
        title: "Operations Director",
        companyName: "Marriott Downtown",
        location: "Dubai, UAE"
      },
      {
        quote: "Outstanding service quality and competitive pricing. They understand the unique needs of the hospitality industry and deliver accordingly.",
        author: "Marco Rossi",
        title: "General Manager",
        companyName: "Palazzo Versace",
        location: "Dubai, UAE"
      }
    ],
    services: [
      {
        id: 1,
        name: 'HVAC System Maintenance',
        category: 'HVAC Services',
        description: 'Complete heating, ventilation, and air conditioning maintenance and repair services',
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: '2-4 hours',
        availability: '24/7',
        certified: true,
        emergency: true
      },
      {
        id: 2,
        name: 'Kitchen Equipment Repair',
        category: 'Equipment Services',
        description: 'Specialized repair and maintenance for commercial kitchen equipment',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: '1-3 hours',
        availability: 'Business Hours',
        certified: true,
        emergency: true
      },
      {
        id: 3,
        name: 'Electrical Services',
        category: 'Electrical',
        description: 'Licensed electrical installation, repair, and maintenance services',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: '1-2 hours',
        availability: '24/7',
        certified: true,
        emergency: true
      },
      {
        id: 4,
        name: 'Plumbing Services',
        category: 'Plumbing',
        description: 'Complete plumbing solutions including installation, repair, and maintenance',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: '1-3 hours',
        availability: '24/7',
        certified: true,
        emergency: true
      },
      {
        id: 5,
        name: 'Preventive Maintenance Program',
        category: 'Maintenance Programs',
        description: 'Comprehensive preventive maintenance programs to reduce equipment downtime',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: 'Scheduled',
        availability: 'Business Hours',
        certified: true,
        emergency: false
      },
      {
        id: 6,
        name: 'Emergency Response Services',
        category: 'Emergency Services',
        description: 'Rapid response emergency services for critical system failures',
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: '30 minutes',
        availability: '24/7',
        certified: true,
        emergency: true
      },
      {
        id: 7,
        name: 'Energy Efficiency Consulting',
        category: 'Consulting Services',
        description: 'Professional energy audits and efficiency improvement recommendations',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: '1-2 days',
        availability: 'Business Hours',
        certified: true,
        emergency: false
      },
      {
        id: 8,
        name: 'Fire Safety System Maintenance',
        category: 'Safety Services',
        description: 'Fire alarm, sprinkler, and safety system maintenance and testing',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        responseTime: 'Scheduled',
        availability: 'Business Hours',
        certified: true,
        emergency: false
      }
    ]
  };

  const ServiceCard = ({ service }: { service: any }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-24 sm:h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {service.emergency && (
          <div className="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded-full text-xs font-medium">
            Emergency
          </div>
        )}
      </div>

      <div className="p-2">
        <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1">
          {service.category}
        </p>

        <h3 className="text-xs font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {service.name}
        </h3>

        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
          {service.description}
        </p>

        <div className="space-y-1 mb-2">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600 truncate">Response: {service.responseTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-600 truncate">{service.availability}</span>
          </div>
          {service.certified && (
            <div className="flex items-center space-x-1">
              <Award className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 truncate">Certified</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <button className="w-full bg-blue-600 text-white py-1.5 px-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-xs font-medium">
            Quote
          </button>
          <button className="w-full border border-blue-600 text-blue-600 py-1.5 px-2 rounded-md hover:bg-blue-50 transition-colors duration-200 text-xs font-medium">
            Schedule
          </button>
        </div>
      </div>
    </div>
  );

  const AIAgentModal = () => {
    if (!showAIAgent) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI Service Agent</h3>
            <p className="text-gray-600">Chat with our intelligent service assistant</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">👋 Hi! I'm Alex, Gulf Maintenance Services' AI assistant.</p>
            <p className="text-sm text-gray-600">I can help you with:</p>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>• Service information and scheduling</li>
              <li>• Emergency response coordination</li>
              <li>• Maintenance program setup</li>
              <li>• Technical consultations</li>
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Service Quote</h3>
            <p className="text-gray-600">Get a custom quote from Gulf Maintenance Services</p>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>HVAC Maintenance</option>
                <option>Plumbing Services</option>
                <option>Electrical Services</option>
                <option>Kitchen Equipment Repair</option>
                <option>Emergency Services</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Hotel</option>
                <option>Restaurant</option>
                <option>Resort</option>
                <option>Commercial Building</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Details</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your service requirements..."
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
            <p className="text-gray-600">Contact Gulf Maintenance Services directly</p>
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

  const displayedServices = showAllServices ? providerData.services : providerData.services.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
        <img
          src={providerData.banner}
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
            <div className="flex items-start space-x-2 sm:space-x-4 flex-1">
              <img
                src={providerData.logo}
                alt="Company Logo"
                className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover shadow-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">
                    {providerData.companyName}
                  </h1>
                  {providerData.verified && (
                    <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full flex-shrink-0">
                      <Shield className="w-2 h-2" />
                      <span className="text-xs font-medium hidden sm:inline">Verified</span>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-gray-600 mb-1 truncate">{providerData.companyType}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-2 h-2 flex-shrink-0" />
                    <span className="text-xs truncate">{providerData.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2 h-2 ${
                            i < Math.floor(providerData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-900">{providerData.rating}</span>
                    <span className="text-xs text-gray-500">({providerData.reviewCount})</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {providerData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-1 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - CTAs */}
            <div className="flex flex-col space-y-2 w-full lg:w-auto lg:min-w-[160px]">
              <button
                onClick={() => setShowAIAgent(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-2 py-1.5 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium flex items-center justify-center space-x-1 shadow-lg text-xs"
              >
                <Bot className="w-2 h-2" />
                <span>AI Agent</span>
              </button>
              
              <button
                onClick={() => setShowRFQModal(true)}
                className="w-full bg-blue-500 text-white px-2 py-1.5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium flex items-center justify-center space-x-1 text-xs"
              >
                <FileText className="w-2 h-2" />
                <span>Quote</span>
              </button>
              
              <button
                onClick={() => setShowMessageModal(true)}
                className="w-full text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium text-center text-xs"
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Order 1 on mobile, Order 2 on desktop */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Our Locations */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Our Locations</h3>
              <div className="space-y-4">
                {providerData.locations.map((location, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900">{location.type}</h4>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Service Coverage */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Direct Service Coverage</h3>
              <div className="space-y-4">
                {providerData.directServiceAreas.map((area, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900 mb-2">{area.country}</h4>
                    <div className="flex flex-wrap gap-1">
                      {area.states.map((state, stateIndex) => (
                        <span
                          key={stateIndex}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded"
                        >
                          {state}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
              <div className="space-y-3">
                {providerData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href={providerData.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={providerData.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={providerData.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={providerData.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Content Column - Order 2 on mobile, Order 1 on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-8">
            {/* About Us */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3">About Us</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{providerData.about}</p>
            </div>

            {/* Expertise */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Our Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {providerData.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-1.5">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Our Clients</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {providerData.clients.map((client, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-10 h-10 mx-auto rounded-md object-cover mb-1"
                    />
                    <p className="text-xs font-medium text-gray-900 truncate">{client.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Testimonials */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Testimonials</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {providerData.testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-3 bg-gray-50 p-3 rounded-lg">
                    <blockquote className="text-xs text-gray-700 italic mb-2">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="text-xs font-semibold text-gray-900 truncate">{testimonial.author}</p>
                      <p className="text-xs text-gray-600 truncate">{testimonial.title}</p>
                      <p className="text-xs font-medium text-blue-600 truncate">{testimonial.companyName}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Services */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Our Services</h2>
                <button
                  onClick={() => setShowAllServices(!showAllServices)}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center space-x-1"
                >
                  <span>{showAllServices ? 'View Less' : 'View More'}</span>
                  {showAllServices ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
                {displayedServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
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

export default ServiceProviderPage;