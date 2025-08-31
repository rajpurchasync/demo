import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  Globe, 
  Award, 
  Image, 
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Star,
  Users,
  Package,
  Target,
  Truck,
  X,
  Save,
  Upload,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const BusinessInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('business');
  const [isEditingOfficeLocation, setIsEditingOfficeLocation] = useState(false);
  const [isAddBranchModalOpen, setIsAddBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const [businessInfo, setBusinessInfo] = useState({
    businessNameLicense: 'Premium Hospitality Supplies Co. LLC',
    businessNamePublic: 'Premium Hospitality Supplies',
    businessType: 'Supplier',
    tradeLicenseNo: 'TL-2024-001234',
    vatEnabled: true,
    vatNumber: 'VAT-US-987654321'
  });

  const [officeLocation, setOfficeLocation] = useState({
    country: 'United States',
    state: 'New York',
    city: 'New York'
  });

  const [newBranch, setNewBranch] = useState({
    name: '',
    type: '',
    country: '',
    state: '',
    city: '',
    street: '',
    email: '',
    phone: ''
  });

  const [posSettings, setPosSettings] = useState({
    selectedCategories: [
      {
        main: 'Food',
        subCategories: ['Beverages', 'Fresh Produce']
      }
    ],
    keywords: 'premium, luxury, organic, sustainable',
    targetCustomers: ['Hotels', 'Restaurants'],
    deliveryLocations: [
      { country: 'United States', state: 'New York' },
      { country: 'United States', state: 'California' }
    ],
    exportAvailable: true
  });

  const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'New York Headquarters',
      country: 'United States',
      state: 'New York',
      city: 'New York',
      street: '123 Business Ave',
      phone: '+1 (555) 123-4567',
      email: 'ny@premiumsupplies.com',
      type: 'Headquarters'
    },
    {
      id: 2,
      name: 'Los Angeles Branch',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      street: '456 Supply St',
      phone: '+1 (555) 987-6543',
      email: 'la@premiumsupplies.com',
      type: 'Branch Office'
    }
  ]);

  const businessTypes = ['Supplier', 'Manufacturer', 'Distributor', 'Wholesaler'];
  const countries = ['United States', 'Canada', 'United Kingdom', 'Australia'];
  const states = ['New York', 'California', 'Texas', 'Florida', 'Illinois'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
  const branchTypes = ['Headquarters', 'Regional Office', 'Branch Office'];
  const customerTypes = ['Hotels', 'Restaurants', 'Cafes', 'Bars', 'Catering'];

  const mainCategories = [
    {
      name: 'Food',
      subCategories: ['Beverages', 'Fresh Produce', 'Dairy Products', 'Meat & Seafood', 'Bakery Items']
    },
    {
      name: 'Non-food & Packaging',
      subCategories: ['Disposable Items', 'Cleaning Supplies', 'Packaging Materials', 'Paper Products']
    },
    {
      name: 'Equipment',
      subCategories: ['Kitchen Equipment', 'Furniture', 'Electronics', 'Maintenance Tools']
    }
  ];

  const handleBusinessInfoChange = (field: string, value: string | boolean) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleOfficeLocationChange = (field: string, value: string) => {
    setOfficeLocation(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveOfficeLocation = () => {
    setIsEditingOfficeLocation(false);
    console.log('Saving office location:', officeLocation);
  };

  const handleAddBranch = () => {
    const newBranchWithId = {
      ...newBranch,
      id: branches.length + 1
    };
    setBranches(prev => [...prev, newBranchWithId]);
    setIsAddBranchModalOpen(false);
    setNewBranch({
      name: '',
      type: '',
      country: '',
      state: '',
      city: '',
      street: '',
      email: '',
      phone: ''
    });
  };

  const handleEditBranch = (branch: any) => {
    setEditingBranch(branch);
    setNewBranch(branch);
    setIsAddBranchModalOpen(true);
  };

  const handleSaveBranch = () => {
    if (editingBranch) {
      setBranches(prev => prev.map(branch => 
        branch.id === editingBranch.id ? { ...newBranch, id: editingBranch.id } : branch
      ));
      setEditingBranch(null);
    } else {
      handleAddBranch();
    }
    setIsAddBranchModalOpen(false);
    setNewBranch({
      name: '',
      type: '',
      country: '',
      state: '',
      city: '',
      street: '',
      email: '',
      phone: ''
    });
  };

  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    );
  };

  const addCategory = () => {
    setPosSettings(prev => ({
      ...prev,
      selectedCategories: [...prev.selectedCategories, { main: '', subCategories: [] }]
    }));
  };

  const removeCategory = (index: number) => {
    setPosSettings(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.filter((_, i) => i !== index)
    }));
  };

  const updateMainCategory = (index: number, value: string) => {
    setPosSettings(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.map((cat, i) => 
        i === index ? { ...cat, main: value, subCategories: [] } : cat
      )
    }));
  };

  const toggleSubCategory = (categoryIndex: number, subCategory: string) => {
    setPosSettings(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.map((cat, i) => {
        if (i === categoryIndex) {
          const subCategories = cat.subCategories.includes(subCategory)
            ? cat.subCategories.filter(sub => sub !== subCategory)
            : [...cat.subCategories, subCategory];
          return { ...cat, subCategories };
        }
        return cat;
      })
    }));
  };

  const addDeliveryLocation = () => {
    setPosSettings(prev => ({
      ...prev,
      deliveryLocations: [...prev.deliveryLocations, { country: '', state: '' }]
    }));
  };

  const updateDeliveryLocation = (index: number, field: string, value: string) => {
    setPosSettings(prev => ({
      ...prev,
      deliveryLocations: prev.deliveryLocations.map((loc, i) => 
        i === index ? { ...loc, [field]: value } : loc
      )
    }));
  };

  const removeDeliveryLocation = (index: number) => {
    setPosSettings(prev => ({
      ...prev,
      deliveryLocations: prev.deliveryLocations.filter((_, i) => i !== index)
    }));
  };

  const renderBusinessTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name (as per license)</label>
            <input
              type="text"
              value={businessInfo.businessNameLicense}
              onChange={(e) => handleBusinessInfoChange('businessNameLicense', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Name Public</label>
            <input
              type="text"
              value={businessInfo.businessNamePublic}
              onChange={(e) => handleBusinessInfoChange('businessNamePublic', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select
                value={businessInfo.businessType}
                onChange={(e) => handleBusinessInfoChange('businessType', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trade License No</label>
              <input
                type="text"
                value={businessInfo.tradeLicenseNo}
                onChange={(e) => handleBusinessInfoChange('tradeLicenseNo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={businessInfo.vatEnabled}
                  onChange={(e) => handleBusinessInfoChange('vatEnabled', e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">VAT Registered</span>
              </label>
            </div>
            {businessInfo.vatEnabled && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">VAT Number</label>
                <input
                  type="text"
                  value={businessInfo.vatNumber}
                  onChange={(e) => handleBusinessInfoChange('vatNumber', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter VAT number"
                />
              </div>
            )}
          </div>
        </div>
        <div className="mt-6">
          <button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderLocationTab = () => (
    <div className="space-y-6">
      {/* Office Location */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-4">
          <h3 className="text-lg font-medium text-gray-900">Office Location</h3>
          {!isEditingOfficeLocation ? (
            <button
              onClick={() => setIsEditingOfficeLocation(true)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={handleSaveOfficeLocation}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setIsEditingOfficeLocation(false)}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>

        {!isEditingOfficeLocation ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <p className="text-gray-900 font-medium">{officeLocation.country}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <p className="text-gray-900 font-medium">{officeLocation.state}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <p className="text-gray-900 font-medium">{officeLocation.city}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                value={officeLocation.country}
                onChange={(e) => handleOfficeLocationChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={officeLocation.state}
                onChange={(e) => handleOfficeLocationChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <select
                value={officeLocation.city}
                onChange={(e) => handleOfficeLocationChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Branches */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <h3 className="text-lg font-medium text-gray-900">Branches</h3>
          <button
            onClick={() => setIsAddBranchModalOpen(true)}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Branch</span>
          </button>
        </div>

        <div className="space-y-4">
          {branches.map((branch) => (
            <div key={branch.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{branch.name}</h4>
                    <p className="text-sm text-purple-600 font-medium">{branch.type}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleEditBranch(branch)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <Edit className="w-4 h-4 inline mr-1" />
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors">
                      <Trash2 className="w-4 h-4 inline mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{branch.country}, {branch.state}, {branch.city}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Building className="w-4 h-4" />
                    <span>{branch.street}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Globe className="w-4 h-4" />
                    <span>{branch.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Branch Modal */}
      {isAddBranchModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingBranch ? 'Edit Branch' : 'Add Branch'}
                </h2>
                <button
                  onClick={() => {
                    setIsAddBranchModalOpen(false);
                    setEditingBranch(null);
                    setNewBranch({
                      name: '',
                      type: '',
                      country: '',
                      state: '',
                      city: '',
                      street: '',
                      email: '',
                      phone: ''
                    });
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
                  <input
                    type="text"
                    value={newBranch.name}
                    onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter branch name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newBranch.type}
                    onChange={(e) => setNewBranch({...newBranch, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    {branchTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select
                      value={newBranch.country}
                      onChange={(e) => setNewBranch({...newBranch, country: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select
                      value={newBranch.state}
                      onChange={(e) => setNewBranch({...newBranch, state: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select state</option>
                      {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={newBranch.city}
                      onChange={(e) => setNewBranch({...newBranch, city: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                    <input
                      type="text"
                      value={newBranch.street}
                      onChange={(e) => setNewBranch({...newBranch, street: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter street address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email (Optional)</label>
                    <input
                      type="email"
                      value={newBranch.email}
                      onChange={(e) => setNewBranch({...newBranch, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="branch@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={newBranch.phone}
                      onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  onClick={() => {
                    setIsAddBranchModalOpen(false);
                    setEditingBranch(null);
                    setNewBranch({
                      name: '',
                      type: '',
                      country: '',
                      state: '',
                      city: '',
                      street: '',
                      email: '',
                      phone: ''
                    });
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBranch}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingBranch ? 'Update Branch' : 'Add Branch'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderPosTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Point of Sale Configuration</h3>
        
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Categories</label>
              <button
                onClick={addCategory}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                + Add Category
              </button>
            </div>
            <div className="space-y-4">
              {posSettings.selectedCategories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <select
                      value={category.main}
                      onChange={(e) => updateMainCategory(categoryIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mr-2"
                    >
                      <option value="">Select main category</option>
                      {mainCategories.map(cat => (
                        <option key={cat.name} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => removeCategory(categoryIndex)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {category.main && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Sub Categories</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mainCategories.find(cat => cat.name === category.main)?.subCategories.map(subCat => (
                          <label key={subCat} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={category.subCategories.includes(subCat)}
                              onChange={() => toggleSubCategory(categoryIndex, subCat)}
                              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                            />
                            <span className="text-sm text-gray-700">{subCat}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Keywords Search</label>
            <input
              type="text"
              value={posSettings.keywords}
              onChange={(e) => setPosSettings(prev => ({ ...prev, keywords: e.target.value }))}
              placeholder="Enter keywords separated by commas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">Keywords help customers find your products</p>
          </div>

          {/* Target Customers */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Target Customers</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {customerTypes.map(customer => (
                <label key={customer} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={posSettings.targetCustomers.includes(customer)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPosSettings(prev => ({
                          ...prev,
                          targetCustomers: [...prev.targetCustomers, customer]
                        }));
                      } else {
                        setPosSettings(prev => ({
                          ...prev,
                          targetCustomers: prev.targetCustomers.filter(c => c !== customer)
                        }));
                      }
                    }}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{customer}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Direct Delivery Locations */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-gray-700">Select Direct Delivery Locations</label>
              <button
                onClick={addDeliveryLocation}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                + Add Location
              </button>
            </div>
            <div className="space-y-3">
              {posSettings.deliveryLocations.map((location, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <select
                    value={location.country}
                    onChange={(e) => updateDeliveryLocation(index, 'country', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <select
                    value={location.state}
                    onChange={(e) => updateDeliveryLocation(index, 'state', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select state</option>
                    {states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeDeliveryLocation(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Export Available */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Export Available</p>
                  <p className="text-xs text-gray-600">Enable international shipping and export</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={posSettings.exportAvailable}
                  onChange={(e) => setPosSettings(prev => ({ ...prev, exportAvailable: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Upload Documents</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <FileSpreadsheet className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload Product List</p>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  className="hidden"
                  id="product-list-upload"
                />
                <label
                  htmlFor="product-list-upload"
                  className="cursor-pointer text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Choose Excel File
                </label>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload PDF Catalogue</p>
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  id="catalogue-upload"
                />
                <label
                  htmlFor="catalogue-upload"
                  className="cursor-pointer text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Choose PDF File
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
            Save POS Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Company Information</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your business profile and settings</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('business')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'business'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Building className="w-4 h-4 inline mr-2" />
            Business Info
          </button>
          <button
            onClick={() => setActiveTab('location')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'location'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            Location & Branches
          </button>
          <button
            onClick={() => setActiveTab('pos')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'pos'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Target className="w-4 h-4 inline mr-2" />
            POS
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'business' && renderBusinessTab()}
      {activeTab === 'location' && renderLocationTab()}
      {activeTab === 'pos' && renderPosTab()}
    </div>
  );
};

export default BusinessInfo;