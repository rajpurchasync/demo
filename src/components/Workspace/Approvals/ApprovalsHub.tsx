import React from 'react';
import { Plus, Search, Filter, FileCheck, Calendar, DollarSign, User } from 'lucide-react';

const ApprovalsHub = () => {
  const approvals = [
    {
      id: 1,
      title: 'Contract Amendment - Acme Corp',
      description: 'Review and approve contract terms modification',
      type: 'contract',
      requestedBy: 'John Mitchell',
      dueDate: '2024-03-15',
      amount: '$25,000',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Budget Increase Request',
      description: 'Additional budget allocation for Q2 procurement',
      type: 'budget',
      requestedBy: 'Sarah Chen',
      dueDate: '2024-03-18',
      amount: '$50,000',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Supplier Onboarding - TechPro',
      description: 'Approve new supplier registration and KYC documents',
      type: 'supplier',
      requestedBy: 'Mike Rodriguez',
      dueDate: '2024-03-20',
      amount: null,
      status: 'approved'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'contract':
        return 'bg-blue-100 text-blue-800';
      case 'budget':
        return 'bg-purple-100 text-purple-800';
      case 'supplier':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-900">Approvals</h1>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            <span>Request Approval</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search approvals..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Approvals List */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-4">
          {approvals.map((approval) => (
            <div key={approval.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileCheck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{approval.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(approval.type)}`}>
                        {approval.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{approval.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <User className="w-4 h-4" />
                        <span>Requested by: {approval.requestedBy}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(approval.dueDate).toLocaleDateString()}</span>
                      </div>
                      {approval.amount && (
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <DollarSign className="w-4 h-4" />
                          <span>{approval.amount}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(approval.status)}`}>
                    {approval.status}
                  </span>
                  {approval.status === 'pending' && (
                    <div className="flex items-center space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        Approve
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovalsHub;