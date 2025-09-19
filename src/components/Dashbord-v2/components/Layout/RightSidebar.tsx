import React from 'react';
import { X, Plus, Clock, AlertCircle, CheckCircle, TrendingUp, Upload, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface RightSidebarProps {
  activeView: string;
  onClose: () => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ activeView, onClose }) => {
  const [overviewFilter, setOverviewFilter] = useState('today');
  const [showCreateRFQModal, setShowCreateRFQModal] = useState(false);
  
  const handleAddSupplier = () => {
    console.log('Quick Action: Dispatching openAddSupplierModal event');
    const event = new CustomEvent('openAddSupplierModal');
    window.dispatchEvent(event);
  };

  const handleRequestQuote = () => {
    console.log('Quick Action: Dispatching openCreateRFQModal event');
    const event = new CustomEvent('openCreateRFQModal');
    window.dispatchEvent(event);
  };

  const quickActions = [
    { label: 'Add a Task', icon: Plus, onClick: () => {
      console.log('Quick Action: Dispatching openTaskModal event');
      const event = new CustomEvent('openTaskModal');
      window.dispatchEvent(event);
    }},
    { label: 'Create a Project', icon: Plus, onClick: () => {
      console.log('Quick Action: Dispatching openProjectModal event');
      const event = new CustomEvent('openProjectModal');
      window.dispatchEvent(event);
    }},
    { label: 'Add a Supplier', icon: Plus, onClick: handleAddSupplier },
    { label: 'Request a Quote', icon: Plus, onClick: () => {
      console.log('Quick Action: Dispatching openCreateRFQModal event');
      const event = new CustomEvent('openCreateRFQModal');
      window.dispatchEvent(event);
    }},
  ];

  const stats = [
    { label: 'Tasks', value: '0' },
    { label: 'RFQs', value: '0' },
    { label: 'Messages', value: '0' }
  ];

  const recentActivity = [
  ];

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Quick Actions</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Quick Actions */}
        <div className="p-4 border-b border-gray-100">
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="flex items-center justify-center space-x-2 p-3 text-gray-800 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200 bg-blue-50/30 text-center"
              >
                <action.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-semibold text-xs leading-tight">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mini Dashboard */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-bold text-gray-900">Overview</h4>
            <button 
              onClick={() => setOverviewFilter(overviewFilter === 'today' ? 'week' : 'today')}
              className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              <span className="capitalize">{overviewFilter === 'today' ? 'Today' : 'This Week'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-3">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{stat.label}</span>
                <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-4">
          <h4 className="text-base font-bold text-gray-900 mb-3">Recent Activity</h4>
          <div className="text-center py-8">
            <p className="text-sm font-medium text-gray-500">No recent activity</p>
          </div>
        </div>
      </div>

      {/* Purchasync Software */}
      <div className="border-t border-gray-100 p-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <h5 className="text-sm font-bold text-gray-800 mb-1">Purchasync Software</h5>
          <a 
            href="https://purchasync.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;