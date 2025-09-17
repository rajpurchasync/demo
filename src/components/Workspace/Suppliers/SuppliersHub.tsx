import React from 'react';
import { Plus, Search, Filter, Building, MapPin, Star } from 'lucide-react';

const SuppliersHub = () => {
  const suppliers = [
    {
      id: 1,
      name: 'Acme Corporation',
      category: 'Office Supplies',
      location: 'New York, NY',
      rating: 4.8,
      status: 'active',
      totalOrders: 45,
      lastOrder: '2 days ago'
    },
    {
      id: 2,
      name: 'TechPro Solutions',
      category: 'IT Equipment',
      location: 'San Francisco, CA',
      rating: 4.6,
      status: 'active',
      totalOrders: 23,
      lastOrder: '1 week ago'
    },
    {
      id: 3,
      name: 'Global Manufacturing Ltd',
      category: 'Industrial Parts',
      location: 'Chicago, IL',
      rating: 4.9,
      status: 'pending',
      totalOrders: 67,
      lastOrder: '3 days ago'
    },
    {
      id: 4,
      name: 'Premier Logistics',
      category: 'Shipping & Delivery',
      location: 'Dallas, TX',
      rating: 4.4,
      status: 'active',
      totalOrders: 89,
      lastOrder: '1 day ago'
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Suppliers</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>Add Supplier</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Supplier List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">{supplier.name}</h3>
                    <p className="text-sm text-gray-600">{supplier.category}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <MapPin className="w-4 h-4" />
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Star className="w-4 h-4 fill-current text-yellow-400" />
                        <span>{supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{supplier.totalOrders} orders</p>
                    <p className="text-xs text-gray-500">Last: {supplier.lastOrder}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    supplier.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {supplier.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuppliersHub;