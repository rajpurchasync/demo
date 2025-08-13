import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Bell, User, ChevronDown, Plus, ArrowRight, Users, FileText, TrendingUp, Leaf, Award, Globe, Package, Wrench, UserCheck, Building, ChevronRight, Sparkles } from 'lucide-react';

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const categories = [
    { 
      id: 'food-beverage', 
      name: 'Food & Beverage', 
      icon: '🍽️',
      subcategories: ['Fresh Produce', 'Dairy Products', 'Beverages', 'Frozen Foods', 'Bakery Items']
    },
    { 
      id: 'non-food', 
      name: 'Non-food & Consumables', 
      icon: '🧴',
      subcategories: ['Cleaning Supplies', 'Paper Products', 'Personal Care', 'Chemicals']
    },
    { 
      id: 'furniture', 
      name: 'Furniture & Equipment', 
      icon: '🪑',
      subcategories: ['Kitchen Equipment', 'Dining Furniture', 'Bedroom Furniture', 'Appliances']
    },
    { 
      id: 'technology', 
      name: 'Technology & IT', 
      icon: '💻',
      subcategories: ['POS Systems', 'Software', 'Hardware', 'Networking']
    },
    { 
      id: 'repair', 
      name: 'Repair & Maintenance', 
      icon: '🔧',
      subcategories: ['HVAC Services', 'Plumbing', 'Electrical', 'General Maintenance']
    },
    { 
      id: 'professional', 
      name: 'Professional Services', 
      icon: '👔',
      subcategories: ['Consulting', 'Legal Services', 'Marketing', 'Training']
    },
    { 
      id: 'rental', 
      name: 'Rental & Leasing', 
      icon: '🏢',
      subcategories: ['Equipment Rental', 'Space Rental', 'Vehicle Leasing', 'Temporary Services']
    }
  ];

  const trendingTags = [
    { name: 'Plant Based', icon: Leaf, color: 'bg-green-500' },
    { name: 'Healthy Food', icon: Heart, color: 'bg-red-500' },
    { name: 'Plastic Free', icon: Leaf, color: 'bg-green-600' },
    { name: 'Made in UAE', icon: Globe, color: 'bg-blue-500' }
  ];

  const topCompanies = [
    {
      name: 'Emirates Food Solutions',
      category: 'Food & Beverage',
      rating: 4.8,
      reviews: 245,
      verified: true,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      name: 'Dubai Equipment Co.',
      category: 'Furniture & Equipment',
      rating: 4.9,
      reviews: 189,
      verified: true,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      name: 'Gulf Tech Solutions',
      category: 'Technology & IT',
      rating: 4.7,
      reviews: 156,
      verified: true,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      name: 'Green Clean Services',
      category: 'Professional Services',
      rating: 4.6,
      reviews: 203,
      verified: true,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-2 sm:px-4 lg:px-8">
          {/* Search Bar */}
          <div className="py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              {/* Logo */}
              <div className="flex items-center space-x-2 flex-shrink-0 w-full sm:w-auto justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-indigo-600" />
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Purchasync</span>
                </div>
                
                {/* Mobile User Menu */}
                <div className="flex sm:hidden items-center space-x-3">
                  <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
                  
                  <div className="relative">
                    <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                        <span className="text-white font-semibold text-sm">P</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 relative w-full">
                <div className="relative">
                  <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search product, service or supplier"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm sm:text-base"
                  />
                </div>
                <button className="absolute right-1 sm:right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base">
                  <Search className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-sm">Search</span>
                </button>
              </div>
              
              <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base">Saved</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 hidden lg:flex">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-sm sm:text-base hidden lg:inline">Purchasync</span>
                  <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8 pb-3 sm:pb-4 overflow-x-auto scrollbar-hide">
            <button className="flex items-center space-x-1 sm:space-x-2 text-gray-900 font-medium whitespace-nowrap border-b-2 border-blue-500 pb-2 text-sm sm:text-base">
              <Package className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>All Categories</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap text-sm sm:text-base">
              Service Providers
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap text-sm sm:text-base">
              Digital Solutions
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap text-sm sm:text-base">
              Sustainability Hub
            </button>
            <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap text-sm sm:text-base">
              Deals
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap text-sm sm:text-base">
              <span>Purchasync Hub</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900">All Categories</h2>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex items-center justify-between p-2 sm:p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 group"
                    >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-base sm:text-lg">{category.icon}</span>
                        <span className="text-sm sm:text-base text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                          {category.name}
                        </span>
                      </div>
                      <Plus className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 ${
                        expandedCategories.includes(category.id) ? 'rotate-45' : ''
                      }`} />
                    </button>
                    
                    {expandedCategories.includes(category.id) && (
                      <div className="ml-6 sm:ml-8 mt-1 sm:mt-2 space-y-1">
                        {category.subcategories.map((sub, index) => (
                          <button
                            key={index}
                            className="block w-full text-left p-1.5 sm:p-2 text-xs sm:text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors duration-200"
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            {/* Sustainable Solutions Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-0">
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Sustainable Solutions</h2>
                    <p className="text-green-100 mb-2 sm:mb-4 italic text-sm sm:text-base">Environmental, Social & Ethical</p>
                    <p className="text-xs sm:text-sm text-green-100 mb-4 sm:mb-6">Certificates | Filters | Tags</p>
                    
                    <div className="flex items-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Leaf className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                    </div>
                    
                    <button className="bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-white/30 transition-all duration-200 font-medium text-sm sm:text-base">
                      Browse Now
                    </button>
                  </div>
                  
                  <div className="hidden lg:block flex-shrink-0">
                    <img 
                      src="https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
                      alt="Sustainable products"
                      className="w-32 h-20 sm:w-48 sm:h-32 object-cover rounded-lg opacity-80"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Top Companies */}
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Top Companies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {topCompanies.map((company, index) => (
                  <Link 
                    key={index} 
                    to={`/seller/${company.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                    className="group border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:border-blue-200 block"
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <img 
                        src={company.image} 
                        alt={company.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start space-x-2 mb-1">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors duration-200 flex-1">
                            {company.name}
                          </h3>
                          {company.verified && (
                            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{company.category}</p>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-xs sm:text-sm font-medium text-gray-700">{company.rating}</span>
                          </div>
                          <span className="text-xs sm:text-sm text-gray-500">({company.reviews} reviews)</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Trending */}
          <div className="lg:col-span-1 order-3">
            <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Trending</h2>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                {trendingTags.map((tag, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 ${tag.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <tag.icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="font-medium text-sm sm:text-base text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                      {tag.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Add custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Marketplace;