import React, { useState } from 'react';
import { Plus, Users, Mail, Phone, Edit3, Trash2, UserPlus, Crown, Shield, User } from 'lucide-react';
import { Button } from '../UI/Button';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
  avatar?: string;
}

export function TeamManagementScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@grandhotel.ae',
      phone: '+971 50 123 4567',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@grandhotel.ae',
      phone: '+971 50 234 5678',
      role: 'manager',
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: '3',
      name: 'Fatima Al-Zahra',
      email: 'fatima.alzahra@grandhotel.ae',
      phone: '+971 50 345 6789',
      role: 'member',
      status: 'active',
      joinDate: '2024-01-20'
    },
    {
      id: '4',
      name: 'Omar Abdullah',
      email: 'omar.abdullah@grandhotel.ae',
      phone: '+971 50 456 7890',
      role: 'viewer',
      status: 'pending',
      joinDate: '2024-01-25'
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'member' as TeamMember['role']
  });

  const roles = [
    { value: 'admin', label: 'Admin', icon: Crown, description: 'Full access' },
    { value: 'manager', label: 'Manager', icon: Shield, description: 'Manage team & projects' },
    { value: 'member', label: 'Member', icon: User, description: 'Standard access' },
    { value: 'viewer', label: 'Viewer', icon: User, description: 'View only' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMember = () => {
    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember,
      status: 'pending',
      joinDate: new Date().toISOString().split('T')[0]
    };
    setTeamMembers(prev => [...prev, member]);
    setNewMember({ name: '', email: '', phone: '', role: 'member' });
    setShowAddForm(false);
  };

  const handleDeleteMember = (id: string) => {
    setTeamMembers(prev => prev.filter(member => member.id !== id));
  };

  const getRoleIcon = (role: TeamMember['role']) => {
    const roleData = roles.find(r => r.value === role);
    return roleData?.icon || User;
  };

  const getRoleColor = (role: TeamMember['role']) => {
    switch (role) {
      case 'admin': return 'text-red-600 bg-red-100';
      case 'manager': return 'text-blue-600 bg-blue-100';
      case 'member': return 'text-green-600 bg-green-100';
      case 'viewer': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="px-3 py-2 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-bold text-gray-900">Team Management</h1>
          <p className="text-xs text-gray-500">{teamMembers.length} team members</p>
        </div>
        <Button 
          size="sm" 
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs"
        >
          <UserPlus className="w-3 h-3 mr-1" />
          Add Member
        </Button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="p-3 border border-gray-200 rounded bg-gray-50">
          <h3 className="text-xs font-medium text-gray-900 mb-2">Add Team Member</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Full name"
              value={newMember.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
            
            <input
              type="email"
              placeholder="Email address"
              value={newMember.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />

            <input
              type="text"
              placeholder="Phone number"
              value={newMember.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Role</label>
              <select
                value={newMember.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label} - {role.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button size="sm" onClick={handleAddMember} className="text-xs">
                Send Invitation
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => setShowAddForm(false)}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="space-y-2">
        {teamMembers.map((member) => {
          const RoleIcon = getRoleIcon(member.role);
          return (
            <div key={member.id} className="p-2 border border-gray-200 rounded bg-white">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2 flex-1">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-3 h-3 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-0.5">
                      <h3 className="text-xs font-medium text-gray-900">{member.name}</h3>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        <RoleIcon className="w-2 h-2 mr-1" />
                        {member.role}
                      </span>
                      <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail className="w-2 h-2 mr-1" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="w-2 h-2 mr-1" />
                        {member.phone}
                      </div>
                      <div className="text-xs text-gray-500">
                        Joined {new Date(member.joinDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 text-gray-500 hover:bg-gray-100 rounded">
                    <Edit3 className="w-3 h-3" />
                  </button>
                  {member.role !== 'admin' && (
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Permissions Info */}
      <div className="border-t border-gray-200 pt-3 mt-4">
        <h3 className="text-xs font-medium text-gray-900 mb-2">Role Permissions</h3>
        <div className="space-y-1">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div key={role.value} className="flex items-center space-x-2 text-xs">
                <Icon className="w-3 h-3 text-gray-500" />
                <span className="font-medium text-gray-700">{role.label}:</span>
                <span className="text-gray-600">{role.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}