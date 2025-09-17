import React from 'react';
import { Plus, Search, Filter, FileText, Calendar, DollarSign } from 'lucide-react';

const RFQsHub = () => {
  const rfqs = [
    {
      id: 1,
      title: 'Office Supplies Q1 2024',
      description: 'Stationery, paper, and basic office equipment',
      status: 'open',
      dueDate: '2024-03-15',
      responses: 5,
      estimatedValue: '$15,000'
    },
    {
      id: 2,
      title: 'IT Equipment Upgrade',
      description: 'Laptops, monitors, and networking hardware',
      status: 'in-review',
      dueDate: '2024-03-20',
      responses: 8,
      estimatedValue: '$75,000'
    },
    {
      id: 3,
      title: 'Facility Maintenance Services',
      description: 'Annual maintenance contract for building facilities',
      status: 'closed',
      dueDate: '2024-03-10',
      responses: 12,
      estimatedValue: '$45,000'
    },
    {
      id: 4,
      title: 'Marketing Materials Production',
      description: 'Brochures, banners, and promotional items',
      status: 'draft',
      dueDate: '2024-03-25',
      responses: 0,
      estimatedValue: '$8,500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in-review':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">RFQs</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>Create RFQ</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search RFQs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* RFQ List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4">
          {rfqs.map((rfq) => (
            <div key={rfq.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900">{rfq.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{rfq.description}</p>
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(rfq.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <DollarSign className="w-4 h-4" />
                        <span>{rfq.estimatedValue}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{rfq.responses} responses</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(rfq.status)}`}>
                      {rfq.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RFQsHub;