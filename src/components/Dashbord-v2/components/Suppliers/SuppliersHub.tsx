import React from 'react';
import { Plus, Search, Filter, Building, MoreHorizontal, Check, Edit, Trash2, Tag, X, Minus } from 'lucide-react';
import { useState } from 'react';
import AddCompanyModal from './AddCompanyModal';
import SupplierDetailModal from './SupplierDetailModal';

const SuppliersHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState('latest');
  const [selectedSuppliers, setSelectedSuppliers] = useState<number[]>([]);
  const [hoveredSupplier, setHoveredSupplier] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<any>(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [supplierActionMenuId, setSupplierActionMenuId] = useState<number | null>(null);

  // Listen for the custom event from Quick Actions
  React.useEffect(() => {
    const handleOpenModal = () => {
      console.log('SuppliersHub: Event received from Quick Actions - Opening Add Supplier Modal');
      console.log('SuppliersHub: Setting showAddModal to true via event listener');
      console.log('SuppliersHub: Current showAddModal state before:', showAddModal);
      setShowAddModal(true);
      console.log('SuppliersHub: setShowAddModal(true) called');
    };
    
    window.addEventListener('openAddSupplierModal', handleOpenModal);
    return () => window.removeEventListener('openAddSupplierModal', handleOpenModal);
  }, [showAddModal]);

  const handleAddCompany = (companyData: any) => {
    const newSupplier = {
      id: Date.now(),
      name: companyData.name,
      country: companyData.country,
      state: companyData.state,
      label: companyData.label,
      tags: companyData.tags.length > 0 ? companyData.tags : [companyData.productService || 'General'],
      status: 'active',
      favorite: false,
      category: companyData.category || companyData.productService || 'General',
      location: `${companyData.state}, ${companyData.country}`,
      totalOrders: 0,
      lastOrder: 'Never'
    };
    setSuppliers(prev => [...prev, newSupplier]);
  };

  const openSupplierDetail = (supplier: any) => {
    setSelectedSupplier(supplier);
    setShowSupplierModal(true);
  };

  const tabs = [
    { id: 'latest', label: 'Latest Active' },
    { id: 'favorite', label: 'Favorite' },
    { id: 'newly', label: 'Newly Added' }
  ];

  const getLabelColor = (label: string) => {
    switch (label.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'on-credit':
        return 'bg-blue-100 text-blue-800';
      case 'new prospect':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleSelectAll = () => {
    if (selectedSuppliers.length === suppliers.length) {
      setSelectedSuppliers([]);
    } else {
      setSelectedSuppliers(suppliers.map(supplier => supplier.id));
    }
  };

  const toggleSupplierSelection = (supplierId: number) => {
    setSelectedSuppliers(prev => 
      prev.includes(supplierId) 
        ? prev.filter(id => id !== supplierId)
        : [...prev, supplierId]
    );
  };

  const handleEditSelected = () => {
    console.log('Editing suppliers:', selectedSuppliers);
  };

  const handleDeleteSelected = () => {
    setSuppliers(prev => prev.filter(supplier => !selectedSuppliers.includes(supplier.id)));
    setSelectedSuppliers([]);
  };

  const handleLabelSelected = () => {
    console.log('Labeling suppliers:', selectedSuppliers);
  };

  // Show empty state if no suppliers
  if (suppliers.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Suppliers</h1>
            <p className="text-sm text-gray-600 mt-1">No suppliers available</p>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Supplier</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between px-4 md:px-6 py-2">
            <div className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search suppliers..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
            <p className="text-gray-500 mb-6 text-sm">Start by adding a new supplier or import data from a CSV file.</p>
            <div className="flex items-center justify-center space-x-3">
              <button 
                onClick={() => {
                  console.log('Empty State: Opening Add Supplier Modal');
                  console.log('Empty State: Current showAddModal state before:', showAddModal);
                  setShowAddModal(true);
                  console.log('Empty State: setShowAddModal(true) called');
                }}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Add Supplier
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm border border-gray-300">
                Import
              </button>
            </div>
          </div>
        </div>
        
        <AddCompanyModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddCompany}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Suppliers</h1>
          <p className="text-sm text-gray-600 mt-1">{suppliers.length} {suppliers.length === 1 ? 'supplier' : 'suppliers'} available</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300">
          <span>Import</span>
        </button>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex items-center justify-between px-4 md:px-6 py-2">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search suppliers..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
                {showFilterDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Filter Options
                    </div>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Label
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Tags
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Location
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Category
                    </button>
                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Type
                    </button>
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Supplier List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedSuppliers.length === suppliers.length
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : selectedSuppliers.length > 0
                          ? 'bg-blue-100 border-blue-600 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {selectedSuppliers.length === suppliers.length && <Check className="w-3 h-3" />}
                      {selectedSuppliers.length > 0 && selectedSuppliers.length < suppliers.length && <Minus className="w-3 h-3" />}
                    </button>
                    <span>Supplier Name</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Country</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">State</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Label</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Tags</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr 
                  key={supplier.id} 
                  className="hover:bg-gray-50 border-b border-gray-100"
                  onMouseEnter={() => setHoveredSupplier(supplier.id)}
                  onMouseLeave={() => setHoveredSupplier(null)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleSupplierSelection(supplier.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedSuppliers.includes(supplier.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : (hoveredSupplier === supplier.id || selectedSuppliers.length > 0)
                            ? 'border-gray-300 hover:border-blue-600'
                            : 'border-transparent'
                        }`}
                        style={{
                          opacity: (hoveredSupplier === supplier.id || selectedSuppliers.includes(supplier.id) || selectedSuppliers.length > 0) ? 1 : 0
                        }}
                      >
                        {selectedSuppliers.includes(supplier.id) && <Check className="w-3 h-3" />}
                      </button>
                      <button 
                        onClick={() => openSupplierDetail(supplier)}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 cursor-pointer"
                      >
                        {supplier.name}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{supplier.country}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{supplier.state}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLabelColor(supplier.label)}`}>
                      {supplier.label}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-1">
                      {supplier.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="relative">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSupplierActionMenuId(supplierActionMenuId === supplier.id ? null : supplier.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4 text-gray-400" />
                      </button>
                      
                      {supplierActionMenuId === supplier.id && (
                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Message
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Request Quote
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Ask Meeting
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Send KYC
                          </button>
                          <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                            Edit
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Bottom Action Panel */}
      {selectedSuppliers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-4">
            <span className="text-sm font-medium">
              {selectedSuppliers.length} record{selectedSuppliers.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLabelSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Add Label"
              >
                <Tag className="w-4 h-4" />
              </button>
              <button
                onClick={handleEditSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Edit Suppliers"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Delete Suppliers"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setSelectedSuppliers([])}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <AddCompanyModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCompany}
      />

      <SupplierDetailModal 
        isOpen={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
        supplier={selectedSupplier}
      />
    </div>
  );
};

export default SuppliersHub;