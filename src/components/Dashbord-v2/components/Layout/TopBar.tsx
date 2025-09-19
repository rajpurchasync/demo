import React from 'react';
import { 
  Plus, 
  Bell, 
  User, 
  ShoppingCart,
  Zap,
  ChevronDown,
  Settings,
  LogOut,
  UserCircle,
  MessageSquare,
  Search,
  Building,
  Target,
  FileText,
  Upload,
  CheckSquare,
  Briefcase,
  X
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

const TopBar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [showAddDocumentModal, setShowAddDocumentModal] = useState(false);
  const [documentData, setDocumentData] = useState({
    name: '',
    location: '',
    selectedItem: ''
  });

  const createActions = [
    { 
      label: 'Add a Supplier', 
      icon: Building,
      action: () => {
      const event = new CustomEvent('openAddSupplierModal');
      window.dispatchEvent(event);
      setCreateDropdownOpen(false);
    }
    },
    { 
      label: 'Add Document', 
      icon: Upload,
      action: () => {
      setShowAddDocumentModal(true);
      setCreateDropdownOpen(false);
    }
    },
    { 
      label: 'Add a Task', 
      icon: CheckSquare,
      action: () => {
      const event = new CustomEvent('openTaskModal');
      window.dispatchEvent(event);
      setCreateDropdownOpen(false);
    }
    },
    { 
      label: 'Create Project', 
      icon: Briefcase,
      action: () => {
      const event = new CustomEvent('openProjectModal');
      window.dispatchEvent(event);
      setCreateDropdownOpen(false);
    }
    },
    { 
      label: 'Request Quote', 
      icon: Target,
      action: () => {
      const event = new CustomEvent('openCreateRFQModal');
      window.dispatchEvent(event);
      setCreateDropdownOpen(false);
    }
    }
  ];

  const locationOptions = [
    { value: 'supplier', label: 'Supplier' },
    { value: 'task', label: 'Task' },
    { value: 'project', label: 'Project' },
    { value: 'rfq', label: 'RFQ' },
    { value: 'contract', label: 'Contract' }
  ];

  const handleAddDocument = () => {
    if (documentData.name && documentData.location) {
      console.log('Adding document:', documentData);
      // Reset form
      setDocumentData({ name: '', location: '', selectedItem: '' });
      setShowAddDocumentModal(false);
    }
  };
  return (
    <>
      <div className="h-16 bg-[#27326D] border-b border-slate-700 flex items-center justify-between px-4 md:px-6">
      {/* Left Section */}
      <Link to="/">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold text-white">Purchasync</span>
        </div>
      </div>
      </Link>


      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-2xl mx-4 md:mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks, suppliers, RFQs..."
            className="w-full pl-10 pr-4 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Create Button */}
        <div className="relative">
          <button 
            onClick={() => setCreateDropdownOpen(!createDropdownOpen)}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
          
          {createDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              {createActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <action.icon className="w-4 h-4 text-gray-600" />
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <Link to="/marketplace">
        <button className="text-slate-200 hover:text-white text-sm font-medium transition-colors hidden lg:block border border-slate-500 px-3 py-1 rounded outline outline-1 outline-slate-400">
          Marketplace
        </button>
        </Link>

        <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-slate-200" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">2</span>
          </div>
        </button>

<Link to="/messages"> 
        <button className="p-2 hover:bg-slate-600 rounded-lg transition-colors hidden md:block">
          <MessageSquare className="w-5 h-5 text-slate-200" />
        </button>
        </Link>

        <div className="relative">
          <button 
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center space-x-2 hover:bg-slate-600 rounded-lg p-2 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">JB</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-200" />
          </button>
          
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              <Link to="/profile">
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <UserCircle className="w-4 h-4" />
                <span>Profile</span>
              </button>
              </Link>
              <Link to="/settings"> 
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              </Link>
              <hr className="my-1" />
              <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <LogOut className="w-4 h-4" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Add Document Modal */}
      {showAddDocumentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Add Document</h2>
              <button
                onClick={() => setShowAddDocumentModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Document Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Name *</label>
                <input
                  type="text"
                  value={documentData.name}
                  onChange={(e) => setDocumentData({ ...documentData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter document name"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <select
                  value={documentData.location}
                  onChange={(e) => setDocumentData({ ...documentData, location: e.target.value, selectedItem: '' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Location</option>
                  {locationOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              {/* Item Selection */}
              {documentData.location && ['project', 'task', 'rfq', 'supplier'].includes(documentData.location) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select {documentData.location.charAt(0).toUpperCase() + documentData.location.slice(1)} *
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      value={documentData.selectedItem}
                      onChange={(e) => setDocumentData({ ...documentData, selectedItem: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Search and select ${documentData.location}`}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddDocumentModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDocument}
                disabled={!documentData.name || !documentData.location || (['project', 'task', 'rfq', 'supplier'].includes(documentData.location) && !documentData.selectedItem)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Document
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;