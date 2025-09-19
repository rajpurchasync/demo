import React, { useState } from 'react';
import { Plus, Search, Filter, Users, MoreHorizontal, Check, Edit, Trash2, Tag, MessageSquare, X, Minus } from 'lucide-react';
import AddTeamModal from './AddTeamModal';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  role: string;
}

const TeamHub = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [memberActionMenuId, setMemberActionMenuId] = useState<number | null>(null);

  const toggleSelectAll = () => {
    if (selectedMembers.length === teamMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(teamMembers.map(member => member.id));
    }
  };

  const toggleMemberSelection = (memberId: number) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleEditSelected = () => {
    console.log('Editing team members:', selectedMembers);
  };

  const handleDeleteSelected = () => {
    setTeamMembers(prev => prev.filter(member => !selectedMembers.includes(member.id)));
    setSelectedMembers([]);
  };

  const handleLabelSelected = () => {
    console.log('Labeling team members:', selectedMembers);
  };

  const handleAddTeamMember = (memberData: any) => {
    const member: TeamMember = {
      id: Date.now(),
      name: memberData.name,
      email: memberData.email,
      department: memberData.department,
      position: memberData.position,
      role: memberData.role
    };
    setTeamMembers(prev => [...prev, member]);
  };

  if (teamMembers.length === 0) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your team members</p>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Team Member</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search team members..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
            <p className="text-gray-500 mb-6 text-sm">Start by adding team members to collaborate on procurement tasks.</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Add Team Member
            </button>
          </div>
        </div>

        <AddTeamModal 
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTeamMember}
        />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Team</h1>
          <p className="text-sm text-gray-600 mt-1">{teamMembers.length} {teamMembers.length === 1 ? 'member' : 'members'} available</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="border-b border-gray-200 p-4 md:p-6">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search team members..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Team List */}
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
                        selectedMembers.length === teamMembers.length
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : selectedMembers.length > 0
                          ? 'bg-blue-100 border-blue-600 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {selectedMembers.length === teamMembers.length && <Check className="w-3 h-3" />}
                      {selectedMembers.length > 0 && selectedMembers.length < teamMembers.length && <Minus className="w-3 h-3" />}
                    </button>
                    <span>Name</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr 
                  key={member.id} 
                  className="hover:bg-gray-50 border-b border-gray-100"
                  onMouseEnter={() => setHoveredMember(member.id)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleMemberSelection(member.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedMembers.includes(member.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : (hoveredMember === member.id || selectedMembers.length > 0)
                            ? 'border-gray-300 hover:border-blue-600'
                            : 'border-transparent'
                        }`}
                        style={{
                          opacity: (hoveredMember === member.id || selectedMembers.includes(member.id) || selectedMembers.length > 0) ? 1 : 0
                        }}
                      >
                        {selectedMembers.includes(member.id) && <Check className="w-3 h-3" />}
                      </button>
                      <span className="text-sm font-medium text-gray-900">{member.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{member.department}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{member.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{member.role}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setMemberActionMenuId(memberActionMenuId === member.id ? null : member.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {memberActionMenuId === member.id && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[120px]">
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Edit
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Remove
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Message
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Add Team Modal */}
      <AddTeamModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddTeamMember}
      />

      {/* Bottom Action Panel */}
      {selectedMembers.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-4">
            <span className="text-sm font-medium">
              {selectedMembers.length} record{selectedMembers.length > 1 ? 's' : ''} selected
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
                title="Edit Members"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Delete Members"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setSelectedMembers([])}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamHub;