import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Shield, MessageSquare, FileText, Bot, Facebook, Instagram, Linkedin, Twitter, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

interface SellerPageProps {
  // No props needed since we'll get sellerId from URL params
}

const SellerPage: React.FC<SellerPageProps> = () => {
  const navigate = useNavigate();
  const { sellerId } = useParams<{ sellerId: string }>();
  const [showAIAgent, setShowAIAgent] = useState(false);
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Mock seller data - in real app, this would come from API based on sellerId
  const sellerData = {
    id: sellerId || 'emirates-food-solutions',
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
    directDeliveryAreas: [
      { country: 'United Arab Emirates', states: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'] },
      { country: 'Saudi Arabia', states: ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina'] },
      { country: 'Qatar', states: ['Doha', 'Al Rayyan', 'Al Wakrah'] },
      { country: 'Kuwait', states: ['Kuwait City', 'Al Ahmadi', 'Hawalli'] },
      { country: 'Bahrain', states: ['Manama', 'Muharraq', 'Riffa'] },
      { country: 'Oman', states: ['Muscat', 'Salalah', 'Sohar'] }
    ],
    brands: [
      { name: 'Unilever', logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Nestlé', logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Kraft Heinz', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'General Mills', logo: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Barilla', logo: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Ferrero', logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Danone', logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
      { name: 'Mondelez', logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
    ],
    locations: [
      {
        type: 'Head Office',
        address: 'Dubai Investment Park, Dubai, UAE'
      },
      {
        type: 'Warehouse',
        address: 'Jebel Ali Free Zone, Dubai, UAE'
      },
      {
        type: 'Branch Office',
        address: 'Abu Dhabi, UAE'
      }
    ],
    socialMedia: {
      facebook: 'https://facebook.com/emiratesfoodsolutions',
      instagram: 'https://instagram.com/emiratesfoodsolutions',
      linkedin: 'https://linkedin.com/company/emiratesfoodsolutions',
      twitter: 'https://twitter.com/emiratesfood'
    },
    testimonials: [
      {
        quote: "Emirates Food Solutions has been our trusted partner for over 5 years. Their quality and reliability are unmatched in the region.",
        author: "Chef Alessandro Marino",
        title: "Executive Chef",
        companyName: "Palazzo Versace Dubai",
        location: "Dubai, UAE"
      },
      {
        quote: "The cold chain management and timely delivery have helped us maintain our high standards. Excellent service across all our properties.",
        author: "Sarah Al-Mahmoud",
        title: "F&B Director",
        companyName: "Marriott International",
        location: "Dubai, UAE"
      },
      {
        quote: "Their halal-certified products and sustainable sourcing align perfectly with our values. A reliable partner for our restaurant chain.",
        author: "Ahmed Hassan",
        title: "Operations Manager",
        companyName: "Local Restaurant Group",
        location: "Abu Dhabi, UAE"
      }
    ],
    products: [
      {
        id: 1,
        name: 'Pasta Paccheri Rigatti Giuseppe Cocco',
        brand: 'Paccheri Righati',
        origin: 'Italy',
        image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Premium Italian pasta made from durum wheat semolina',
        organic: true,
        bioSafe: true,
        category: 'FOOD',
        leadTime: '3-5 business days',
        packaging: 'Recyclable cardboard boxes with protective inner lining',
        warranty: 'Quality guarantee - 18 months shelf life',
        packSize: '500g per package, 20 packages per case',
        variants: [
          { id: 1, name: 'Paccheri 500g', sku: 'PPC-500', stock: 'In Stock' },
          { id: 2, name: 'Paccheri 1kg', sku: 'PPC-1000', stock: 'In Stock' }
        ],
        specifications: [
          { label: 'Ingredients', value: '100% Durum Wheat Semolina, Water' },
          { label: 'Protein Content', value: '13g per 100g' },
          { label: 'Cooking Time', value: '12-14 minutes' },
          { label: 'Storage', value: 'Store in cool, dry place' }
        ],
        customerReviews: [
          {
            reviewerName: 'Chef Marco Rossi',
            title: 'Head Chef, Palazzo Hotel Dubai',
            rating: 5,
            comment: 'Exceptional quality pasta. Our guests love the authentic Italian taste.',
            date: '2 weeks ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      },
      {
        id: 2,
        name: 'Premium Extra Virgin Olive Oil',
        brand: 'Mediterranean Gold',
        origin: 'Spain',
        image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Cold-pressed extra virgin olive oil from Spanish olives',
        organic: true,
        bioSafe: false,
        category: 'FOOD',
        leadTime: '2-4 business days',
        packaging: 'Dark glass bottles to preserve quality',
        warranty: 'Quality guarantee - 24 months shelf life',
        packSize: '500ml bottles, 12 bottles per case',
        variants: [
          { id: 1, name: 'Olive Oil 500ml', sku: 'OO-500', stock: 'In Stock' },
          { id: 2, name: 'Olive Oil 1L', sku: 'OO-1000', stock: 'Limited Stock' }
        ],
        specifications: [
          { label: 'Acidity Level', value: '< 0.3%' },
          { label: 'Origin', value: 'Andalusia, Spain' },
          { label: 'Harvest', value: 'First cold press' },
          { label: 'Storage', value: 'Store in cool, dark place' }
        ],
        customerReviews: [
          {
            reviewerName: 'Chef Isabella Rodriguez',
            title: 'Culinary Director, Atlantis Resort',
            rating: 5,
            comment: 'Outstanding quality olive oil. Perfect for our Mediterranean dishes.',
            date: '1 week ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      },
      {
        id: 3,
        name: 'Artisan Spice Collection',
        brand: 'Spice Masters',
        origin: 'India',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Authentic Middle Eastern and international spices',
        organic: false,
        bioSafe: true,
        category: 'FOOD',
        leadTime: '5-7 business days',
        packaging: 'Airtight containers with moisture protection',
        warranty: 'Quality guarantee - 12 months shelf life',
        packSize: 'Various sizes available, bulk packaging',
        variants: [
          { id: 1, name: 'Spice Mix 250g', sku: 'SM-250', stock: 'In Stock' },
          { id: 2, name: 'Spice Mix 1kg', sku: 'SM-1000', stock: 'In Stock' }
        ],
        specifications: [
          { label: 'Origin', value: 'Kerala, India' },
          { label: 'Processing', value: 'Traditional stone grinding' },
          { label: 'Purity', value: '100% natural, no additives' },
          { label: 'Storage', value: 'Store in airtight container' }
        ],
        customerReviews: [
          {
            reviewerName: 'Chef Raj Patel',
            title: 'Head Chef, Indian Palace Restaurant',
            rating: 5,
            comment: 'Authentic flavors that remind me of home. Excellent quality spices.',
            date: '3 weeks ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      },
      {
        id: 4,
        name: 'Premium Dairy Selection',
        brand: 'Alpine Fresh',
        origin: 'Switzerland',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Imported and local dairy products for professional kitchens',
        organic: true,
        bioSafe: true,
        category: 'FOOD',
        leadTime: '1-3 business days',
        packaging: 'Temperature-controlled packaging',
        warranty: 'Freshness guarantee',
        packSize: 'Various sizes, temperature controlled',
        variants: [
          { id: 1, name: 'Cheese Selection 1kg', sku: 'CS-1000', stock: 'In Stock' },
          { id: 2, name: 'Butter 500g', sku: 'BT-500', stock: 'In Stock' }
        ],
        specifications: [
          { label: 'Fat Content', value: 'Various (2%-35%)' },
          { label: 'Storage', value: 'Refrigerated 2-4°C' },
          { label: 'Shelf Life', value: '2-8 weeks depending on product' },
          { label: 'Certification', value: 'Organic, Halal' }
        ],
        customerReviews: [
          {
            reviewerName: 'Chef Marie Dubois',
            title: 'Pastry Chef, Burj Al Arab',
            rating: 5,
            comment: 'Exceptional quality dairy products. Perfect for our fine pastries.',
            date: '1 month ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      },
      {
        id: 5,
        name: 'Premium Coffee Beans',
        brand: 'Arabian Roast',
        origin: 'Ethiopia',
        image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Single-origin coffee beans with rich flavor profile',
        organic: true,
        bioSafe: false,
        category: 'Food & Beverage',
        leadTime: '2-4 business days',
        packaging: 'Vacuum-sealed bags with one-way valve',
        warranty: 'Freshness guarantee - 12 months',
        packSize: '1kg bags, 10 bags per case',
        variants: [
          { id: 1, name: 'Coffee Beans 1kg', sku: 'CB-1000', stock: 'In Stock' },
          { id: 2, name: 'Coffee Beans 5kg', sku: 'CB-5000', stock: 'In Stock' }
        ],
        specifications: [
          { label: 'Roast Level', value: 'Medium Dark' },
          { label: 'Processing', value: 'Washed' },
          { label: 'Altitude', value: '1800-2200m' },
          { label: 'Storage', value: 'Store in cool, dry place' }
        ],
        customerReviews: [
          {
            reviewerName: 'Chef Omar Al-Rashid',
            title: 'Head Barista, Atlantis Resort',
            rating: 5,
            comment: 'Exceptional coffee beans with consistent quality. Perfect for our specialty coffee menu.',
            date: '2 weeks ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      },
      {
        id: 6,
        name: 'Hotel Bed Linens Set',
        brand: 'LuxuryLinen',
        origin: 'Turkey',
        image: 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Premium hotel-grade bed linens with superior comfort',
        organic: false,
        bioSafe: false,
        category: 'Textiles',
        leadTime: '7-10 business days',
        packaging: 'Protective plastic wrapping',
        warranty: 'Quality guarantee - 2 years',
        packSize: 'Complete set per package',
        variants: [
          { id: 1, name: 'Queen Size Set', sku: 'BL-Q', stock: 'In Stock' },
          { id: 2, name: 'King Size Set', sku: 'BL-K', stock: 'In Stock' }
        ],
        specifications: [
          { label: 'Thread Count', value: '400 TC' },
          { label: 'Material', value: '100% Egyptian Cotton' },
          { label: 'Care', value: 'Machine washable' },
          { label: 'Color', value: 'White, Ivory, Gray' }
        ],
        customerReviews: [
          {
            reviewerName: 'Layla Mansouri',
            title: 'Housekeeping Manager, Burj Al Arab',
            rating: 5,
            comment: 'Outstanding quality linens that maintain their softness after multiple washes.',
            date: '1 month ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      },
      {
        id: 7,
        name: 'Commercial Dishwasher',
        brand: 'CleanMaster Pro',
        origin: 'Germany',
        image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'High-efficiency commercial dishwasher for professional kitchens',
        organic: false,
        bioSafe: false,
        category: 'Kitchen Equipment',
        leadTime: '14-21 business days',
        packaging: 'Wooden crate with foam protection',
        warranty: 'Manufacturer warranty - 3 years',
        packSize: 'Single unit',
        variants: [
          { id: 1, name: 'Standard Model', sku: 'DW-STD', stock: 'In Stock' },
          { id: 2, name: 'High Capacity', sku: 'DW-HC', stock: 'Limited Stock' }
        ],
        specifications: [
          { label: 'Capacity', value: '60 racks/hour' },
          { label: 'Power', value: '380V, 3-phase' },
          { label: 'Water Usage', value: '2.5L per rack' },
          { label: 'Dimensions', value: '600 x 600 x 820mm' }
        ],
        customerReviews: [
          {
            reviewerName: 'Hassan Al-Zahra',
            title: 'Kitchen Manager, Emirates Palace',
            rating: 5,
            comment: 'Reliable and efficient dishwasher. Handles our high-volume operations perfectly.',
            date: '3 weeks ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      },
      {
        id: 8,
        name: 'Eco-Friendly Cleaning Kit',
        brand: 'GreenClean Pro',
        origin: 'Netherlands',
        image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        description: 'Complete eco-friendly cleaning solution for hospitality',
        organic: false,
        bioSafe: true,
        category: 'Cleaning Supplies',
        leadTime: '3-5 business days',
        packaging: 'Recyclable containers',
        warranty: 'Quality guarantee - 12 months',
        packSize: 'Complete kit with 6 products',
        variants: [
          { id: 1, name: 'Standard Kit', sku: 'ECK-STD', stock: 'In Stock' },
          { id: 2, name: 'Premium Kit', sku: 'ECK-PREM', stock: 'In Stock' }
        ],
        specifications: [
          { label: 'Components', value: '6 cleaning products' },
          { label: 'Coverage', value: 'All-purpose cleaning' },
          { label: 'Eco Rating', value: 'A+ Environmental Standard' },
          { label: 'Usage', value: 'Dilution ratios included' }
        ],
        customerReviews: [
          {
            reviewerName: 'Maria Santos',
            title: 'Housekeeping Director, JW Marriott',
            rating: 4,
            comment: 'Great eco-friendly products that work effectively while being safe for our staff.',
            date: '1 month ago'
          }
        ],
        soldBy: {
          name: 'Emirates Food Solutions',
          location: 'Dubai, UAE',
          logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
        }
      }
    ]
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

  const displayedBrands = showAllBrands ? sellerData.brands : sellerData.brands.slice(0, 4);
  const displayedProducts = showAllProducts ? sellerData.products : sellerData.products.slice(0, 8);

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
            <div className="flex items-start space-x-2 sm:space-x-4 flex-1">
              <img
                src={sellerData.logo}
                alt="Company Logo"
                className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full object-cover shadow-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 truncate">
                    {sellerData.companyName}
                  </h1>
                  {sellerData.verified && (
                    <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-1 py-0.5 rounded-full flex-shrink-0">
                      <Shield className="w-2 h-2" />
                      <span className="text-xs font-medium hidden sm:inline">Verified</span>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-gray-600 mb-1 truncate">{sellerData.companyType}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <MapPin className="w-2 h-2 flex-shrink-0" />
                    <span className="text-xs truncate">{sellerData.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2 h-2 ${
                            i < Math.floor(sellerData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-gray-900">{sellerData.rating}</span>
                    <span className="text-xs text-gray-500">({sellerData.reviewCount})</span>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {sellerData.tags.map((tag, index) => (
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
      <div className="max-w-7xl mx-auto px-3 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Order 1 on mobile, Order 2 on desktop */}
          <div className="order-1 lg:order-2 space-y-6">
            {/* Our Locations */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Our Locations</h3>
              <div className="space-y-4">
                {sellerData.locations.map((location, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-2">
                    <h4 className="text-xs font-medium text-gray-900">{location.type}</h4>
                    <p className="text-xs text-gray-600">{location.address}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Delivery Coverage */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Direct Delivery Coverage</h3>
              <div className="space-y-4">
                {sellerData.directDeliveryAreas.map((area, index) => (
                  <div key={index}>
                    <h4 className="text-xs font-medium text-gray-900 mb-1">{area.country}</h4>
                    <div className="flex flex-wrap gap-1">
                      {area.states.map((state, stateIndex) => (
                        <span
                          key={stateIndex}
                          className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded"
                        >
                          {state}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href={sellerData.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  <Facebook className="w-3 h-3" />
                </a>
                <a
                  href={sellerData.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-200"
                >
                  <Instagram className="w-3 h-3" />
                </a>
                <a
                  href={sellerData.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-blue-700 rounded-full flex items-center justify-center text-white hover:bg-blue-800 transition-colors duration-200"
                >
                  <Linkedin className="w-3 h-3" />
                </a>
                <a
                  href={sellerData.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-600 transition-colors duration-200"
                >
                  <Twitter className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Content Column - Order 2 on mobile, Order 1 on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-8">
            {/* About Us */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-2">About Us</h2>
              <p className="text-xs text-gray-600 leading-relaxed">{sellerData.about}</p>
            </div>

            {/* Expertise */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-2">Our Expertise</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {sellerData.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Clients */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Our Clients</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {sellerData.clients.map((client, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="w-6 h-6 mx-auto rounded-md object-cover mb-1"
                    />
                    <p className="text-xs font-medium text-gray-900 truncate leading-tight">{client.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Brands We Work With */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Brands We Work With</h2>
                <button
                  onClick={() => setShowAllBrands(!showAllBrands)}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center space-x-0.5"
                >
                  <span>{showAllBrands ? 'View Less' : 'View More'}</span>
                  {showAllBrands ? <ChevronUp className="w-2 h-2" /> : <ChevronDown className="w-2 h-2" />}
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {displayedBrands.map((brand, index) => (
                  <div key={index} className="text-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-6 h-6 mx-auto rounded-md object-cover mb-1"
                    />
                    <p className="text-xs font-medium text-gray-900 truncate leading-tight">{brand.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Testimonials */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-3">Customer Testimonials</h2>
              <div className="grid grid-cols-1 gap-3">
                {sellerData.testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-2 bg-gray-50 p-2 rounded-lg">
                    <blockquote className="text-xs text-gray-700 italic mb-2">
                      "{testimonial.quote}"
                    </blockquote>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-xs text-gray-600 truncate">{testimonial.title}</p>
                      <p className="text-xs font-medium text-blue-600 truncate">{testimonial.companyName}</p>
                      <p className="text-xs text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Our Products */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-900">Our Products</h2>
                <button
                  onClick={() => setShowAllProducts(!showAllProducts)}
                  className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center space-x-0.5"
                >
                  <span>{showAllProducts ? 'View Less' : 'View More'}</span>
                  {showAllProducts ? <ChevronUp className="w-2 h-2" /> : <ChevronDown className="w-2 h-2" />}
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {displayedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={{
                      ...product,
                      sellerId: sellerData.id
                    }} 
                  />
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