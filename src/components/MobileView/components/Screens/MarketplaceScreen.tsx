import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Package, Users, Truck } from 'lucide-react';

export function MarketplaceScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: Package },
    { id: 'food', label: 'Food & Beverage', icon: Package },
    { id: 'equipment', label: 'Equipment', icon: Package },
    { id: 'services', label: 'Services', icon: Users },
    { id: 'logistics', label: 'Logistics', icon: Truck },
  ];

  const featuredSuppliers = [
    {
      id: '1',
      name: 'Premium Foods UAE',
      category: 'Food & Beverage',
      location: 'Dubai, UAE',
      certificates: ['ISO 22000', 'HACCP'],
      labels: ['Verified', 'Premium'],
      verified: true,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '2',
      name: 'Gulf Equipment Co.',
      category: 'Kitchen Equipment',
      location: 'Abu Dhabi, UAE',
      certificates: ['CE Certified', 'ISO 9001'],
      labels: ['Trusted', 'Local'],
      verified: true,
      image: 'https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      id: '3',
      name: 'Fresh Produce Direct',
      category: 'Food & Beverage',
      location: 'Sharjah, UAE',
      certificates: ['Organic Certified', 'Global GAP'],
      labels: ['Sustainable', 'Fresh'],
      verified: true,
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  return (
    <div className="px-4 py-3 space-y-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900 mb-1">Purchasync Marketplace</h1>
          <p className="text-xs text-gray-500">Discover verified suppliers and service providers</p>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Go to marketplace
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex space-x-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-20 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-0 transition-colors text-sm"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs border-none bg-transparent focus:ring-0 text-gray-600"
          >
            <option value="all">All Categories</option>
            <option value="food">Food & Beverage</option>
            <option value="equipment">Equipment</option>
            <option value="services">Services</option>
            <option value="logistics">Logistics</option>
          </select>
        </div>
        <button className="px-3 py-2.5 border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-3 h-3" />
              <span>{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Featured Suppliers */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Featured Suppliers</h2>
        <div className="space-y-3">
          {featuredSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow"
            >
              <div className="flex space-x-3">
                <img
                  src={supplier.image}
                  alt={supplier.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <h3 className="text-sm font-semibold text-gray-900">
                          {supplier.name}
                        </h3>
                        {supplier.verified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">✓</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{supplier.category}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-0.5">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span>{supplier.location}</span>
                      </div>
                    </div>
                    
                    <div className="text-right ml-3">
                      {/* Certificates */}
                      <div className="flex flex-wrap gap-1 justify-end mb-1">
                        {supplier.certificates.map((cert) => (
                          <span key={cert} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-green-100 text-green-800">
                            {cert}
                          </span>
                        ))}
                      </div>
                      
                      {/* Labels */}
                      <div className="flex flex-wrap gap-1 justify-end">
                        {supplier.labels.map((label) => (
                          <span key={label} className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800">
                            {label}
                          </span>
                        ))}
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Browse by Category */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.slice(1).map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{category.label}</h3>
                    <p className="text-xs text-gray-500">50+ suppliers</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}