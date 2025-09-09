import React, { useState } from 'react';
import { Plus, Users, Mail, Phone, Edit3, Trash2, UserPlus, Crown, Shield, User, Building } from 'lucide-react';
import { Button } from '../UI/Button';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  department: string;
  role: 'admin' | 'manager' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
}

export function TeamManagementScreen() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@grandhotel.ae',
      department: 'Management',
      role: 'admin',
      status: 'active',
    },
    {
      id: '2',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@grandhotel.ae',
      department: 'Sales',
      role: 'manager',
      status: 'active',
    },
    {
      id: '3',
      name: 'Fatima Al-Zahra',
      email: 'fatima.alzahra@grandhotel.ae',
      department: 'Operations',
      role: 'member',
      status: 'active',
    },
    {
      id: '4',
      name: 'Omar Abdullah',
      email: 'omar.abdullah@grandhotel.ae',
      department: 'Finance',
      role: 'viewer',
      status: 'pending',
    }
  ]);

  const [newMember, setNewMember] = useState({
    name: '',
    email: '',
    department: '',
    role: 'member' as TeamMember['role']
  });
  
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: 'member' as TeamMember['role']
  });

  const roles = [
    { value: 'admin', label: 'Admin', icon: Crown, description: 'Full access' },
    { value: 'manager', label: 'Manager', icon: Shield, description: 'Department management' },
    { value: 'member', label: 'Member', icon: User, description: 'Standard access' },
    { value: 'viewer', label: 'Viewer', icon: User, description: 'View only' }
  ];

  const departments = [
    'Management',
    'Sales',
    'Operations',
    'Finance',
    'HR',
    'IT',
    'Marketing'
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewMember(prev => ({ ...prev, [field]: value }));
  };

  const handleEditInputChange = (field: string, value: string) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.department) {
      alert('Please fill in all required fields');
      return;
    }

    const member: TeamMember = {
      id: Date.now().toString(),
      ...newMember,
      status: 'pending',
    };
    setTeamMembers(prev => [...prev, member]);
    setNewMember({ name: '', email: '', department: '', role: 'member' });
    setShowAddForm(false);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    setEditFormData({
      name: member.name,
      email: member.email,
      department: member.department,
      role: member.role
    });
  };

  const handleSaveEdit = () => {
    if (!editFormData.name || !editFormData.email || !editFormData.department) {
      alert('Please fill in all required fields');
      return;
    }

    setTeamMembers(prev => prev.map(member => 
      member.id === editingMember?.id 
        ? { ...member, ...editFormData }
        : member
    ));
    setEditingMember(null);
    setEditFormData({ name: '', email: '', department: '', role: 'member' });
  };

  const handleCancelEdit = () => {
    setEditingMember(null);
    setEditFormData({ name: '', email: '', department: '', role: 'member' });
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(prev => prev.filter(member => member.id !== id));
    }
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
          <h1 className="text-lg font-bold text-gray-900">Team Management</h1>
          <p className="text-sm text-gray-600">{teamMembers.length} team members</p>
        </div>
        <Button 
          size="sm" 
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs bg-purple-600 hover:bg-purple-700"
        >
          <UserPlus className="w-3 h-3 mr-1" />
          Add Member
        </Button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <div className="p-4 border border-purple-200 rounded-xl bg-purple-50">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Add Team Member</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full name"
              value={newMember.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            
            <input
              type="email"
              placeholder="Email address"
              value={newMember.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />

            <select
              value={newMember.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={newMember.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>

            <div className="flex space-x-2 pt-2">
              <Button size="sm" onClick={handleAddMember} className="text-sm bg-purple-600 hover:bg-purple-700">
                Add Member
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={() => setShowAddForm(false)}
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {editingMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Team Member</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={editFormData.name}
                onChange={(e) => handleEditInputChange('name', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              
              <input
                type="email"
                placeholder="Email address"
                value={editFormData.email}
                onChange={(e) => handleEditInputChange('email', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />

              <select
                value={editFormData.department}
                onChange={(e) => handleEditInputChange('department', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>

              <select
                value={editFormData.role}
                onChange={(e) => handleEditInputChange('role', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              <div className="flex space-x-3 pt-4">
                <Button onClick={handleSaveEdit} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Save Changes
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Team Members List */}
      <div className="space-y-3">
        {teamMembers.map((member) => {
          const RoleIcon = getRoleIcon(member.role);
          return (
            <div key={member.id} className="p-4 border border-gray-200 rounded-xl bg-white hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{member.name}</h3>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(member.role)}`}>
                        <RoleIcon className="w-3 h-3 mr-1" />
                        {member.role}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                        {member.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="w-3 h-3 mr-2" />
                        {member.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="w-3 h-3 mr-2" />
                        {member.department}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handleEditMember(member)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  {member.role !== 'admin' && (
                    <button 
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}