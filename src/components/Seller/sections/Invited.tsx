import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';

const Invited: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ongoing');

  const invitations = [
    {
      id: 1,
      companyName: 'Hotel Paradise Resort - Miami, FL, USA',
      inviterName: 'Sarah Johnson',
      inviterRole: 'Procurement Manager',
      invitedDate: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      companyName: 'Restaurant Chain ABC - New York, NY, USA',
      inviterName: 'Mike Chen',
      inviterRole: 'Supply Chain Director',
      invitedDate: '2024-01-12',
      status: 'accepted'
    },
    {
      id: 3,
      companyName: 'Boutique Hotel Group - Los Angeles, CA, USA',
      inviterName: 'Emma Wilson',
      inviterRole: 'Operations Manager',
      invitedDate: '2024-01-10',
      status: 'declined'
    },
    {
      id: 4,
      companyName: 'Cafe Central - Austin, TX, USA',
      inviterName: 'David Rodriguez',
      inviterRole: 'Manager',
      invitedDate: '2024-01-08',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'declined':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInvitations = invitations.filter(invitation => {
    if (activeTab === 'ongoing') {
      return invitation.status === 'pending';
    } else {
      return invitation.status === 'accepted' || invitation.status === 'declined';
    }
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Invitations</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your leads, business networks.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <span>{invitations.filter(inv => inv.status === 'pending').length} pending</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('ongoing')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'ongoing'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Ongoing ({invitations.filter(inv => inv.status === 'pending').length})
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'closed'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Closed ({invitations.filter(inv => inv.status === 'accepted' || inv.status === 'declined').length})
          </button>
        </nav>
      </div>

      {/* Invitations List */}
      <div className="space-y-3 sm:space-y-4">
        {filteredInvitations.map((invitation) => (
          <div key={invitation.id} className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{invitation.companyName}</h3>
                  <p className="text-sm text-gray-600">
                    Invited by {invitation.inviterName} • {invitation.inviterRole}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(invitation.status)}`}>
                  {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{invitation.invitedDate}</span>
                  {getStatusIcon(invitation.status)}
                </div>
                
                {invitation.status === 'pending' && (
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="w-full sm:w-auto px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
                      Accept
                    </button>
                    <button className="w-full sm:w-auto px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredInvitations.length === 0 && (
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} invitations</h3>
          <p className="text-gray-600">
            {activeTab === 'ongoing' 
              ? "You don't have any pending invitations at the moment." 
              : "You don't have any closed invitations yet."
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Invited;