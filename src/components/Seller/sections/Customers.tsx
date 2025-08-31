import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MapPin, 
  Mail, 
  Building, 
  User,
  X,
  Camera,
  Upload,
  Tag
} from 'lucide-react';

const Customers: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLabel, setFilterLabel] = useState('all');

  const customers = [
    {
      id: 1,
      companyName: 'Hotel Paradise Resort',
      personName: 'Sarah Johnson',
      location: 'Miami, FL, USA',
      email: 'sarah.johnson@hotelparadise.com',
      customerLabel: 'Premium',
      phone: '+1 (555) 123-4567',
      joinDate: '2023-12-15'
    },
    {
      id: 2,
      companyName: 'Restaurant ABC Chain',
      personName: 'Mike Chen',
      location: 'New York, NY, USA',
      email: 'mike.chen@restaurantabc.com',
      customerLabel: 'Regular',
      phone: '+1 (555) 987-6543',
      joinDate: '2024-01-08'
    },
    {
      id: 3,
      companyName: 'Boutique Hotel Group',
      personName: 'Emma Wilson',
      location: 'Los Angeles, CA, USA',
      email: 'emma.wilson@boutiquehotels.com',
      customerLabel: 'VIP',
      phone: '+1 (555) 456-7890',
      joinDate: '2023-11-22'
    },
    {
      id: 4,
      companyName: 'Cafe Central',
      personName: 'David Rodriguez',
      location: 'Austin, TX, USA',
      email: 'david@cafecentral.com',
      customerLabel: 'Regular',
      phone: '+1 (555) 321-0987',
      joinDate: '2024-01-12'
    }
  ];

  const [newCustomer, setNewCustomer] = useState({
    customerName: '',
    businessName: '',
    email: '',
    country: '',
    state: '',
    tag: ''
  });

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'India'
  ];

  const states = [
    'California', 'New York', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia'
  ];

  const getLabelColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'vip':
        return 'bg-purple-100 text-purple-800';
      case 'premium':
        return 'bg-blue-100 text-blue-800';
      case 'regular':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterLabel === 'all' || customer.customerLabel.toLowerCase() === filterLabel;
    
    return matchesSearch && matchesFilter;
  });

  const handleAddCustomer = () => {
    console.log('Adding customer:', newCustomer);
    setIsAddModalOpen(false);
    setNewCustomer({
      customerName: '',
      businessName: '',
      email: '',
      country: '',
      state: '',
      tag: ''
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your customer relationships</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={filterLabel}
          onChange={(e) => setFilterLabel(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        >
          <option value="all">All Labels</option>
          <option value="vip">VIP</option>
          <option value="premium">Premium</option>
          <option value="regular">Regular</option>
        </select>
      </div>

      {/* Customer List - Mobile Cards, Desktop Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Desktop Table Header */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
            <div>Company Name</div>
            <div>Person Name</div>
            <div>Location</div>
            <div>Email</div>
            <div>Label</div>
          </div>
        </div>

        {/* Customer Rows */}
        <div className="divide-y divide-gray-200">
          {filteredCustomers.map((customer) => (
            <div key={customer.id} className="p-4 hover:bg-gray-50 transition-colors">
              {/* Mobile Card Layout */}
              <div className="md:hidden space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.companyName}</h3>
                    <p className="text-sm text-gray-600">{customer.personName}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(customer.customerLabel)}`}>
                    {customer.customerLabel}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{customer.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{customer.email}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden md:grid md:grid-cols-5 md:gap-4 md:items-center">
                <div className="font-medium text-gray-900">{customer.companyName}</div>
                <div className="text-gray-600">{customer.personName}</div>
                <div className="text-gray-600">{customer.location}</div>
                <div className="text-gray-600">{customer.email}</div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLabelColor(customer.customerLabel)}`}>
                    {customer.customerLabel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600">Try adjusting your search or filters, or add your first customer.</p>
        </div>
      )}

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Add Customer</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scan Card & Upload Section */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors">
                    <Camera className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Scan Card</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Upload</span>
                  </button>
                </div>
                <div className="text-center text-sm text-gray-500 mb-4">OR</div>
              </div>

              {/* Manual Entry Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={newCustomer.customerName}
                    onChange={(e) => setNewCustomer({...newCustomer, customerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter customer name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <input
                    type="text"
                    value={newCustomer.businessName}
                    onChange={(e) => setNewCustomer({...newCustomer, businessName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter business name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <select
                    value={newCustomer.country}
                    onChange={(e) => setNewCustomer({...newCustomer, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    value={newCustomer.state}
                    onChange={(e) => setNewCustomer({...newCustomer, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
                  <input
                    type="text"
                    value={newCustomer.tag}
                    onChange={(e) => setNewCustomer({...newCustomer, tag: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter customer tag (e.g., VIP, Premium)"
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;