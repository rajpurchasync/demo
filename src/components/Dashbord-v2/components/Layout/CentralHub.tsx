import React, { useState } from 'react';
import { User, FileText, Briefcase, Users, Workflow, FolderOpen, Search, Filter, Package, BarChart3, MoreHorizontal, Plus, Bell, MessageSquare } from 'lucide-react';
import TaskHub from '../Tasks/TaskHub';
import SuppliersHub from '../Suppliers/SuppliersHub';
import RFQsHub from '../RFQs/RFQsHub';
import RequestsHub from '../Inbox/InboxHub';
import CalendarHub from '../Calendar/CalendarHub';
import ContactsHub from '../Contacts/ContactsHub';
import TeamHub from '../Team/TeamHub';
import ProjectsHub from '../Projects/ProjectsHub';
import CreateTemplateModal from '../Templates/CreateTemplateModal';

interface CentralHubProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const CentralHub: React.FC<CentralHubProps> = ({ activeView, onViewChange }) => {
  const [showCreateTemplateModal, setShowCreateTemplateModal] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);

  const handleCreateTemplate = (templateData: any) => {
    console.log('Template created:', templateData);
    // Add template to the templates list
    setTemplates(prev => [...prev, templateData]);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'tasks':
        return <TaskHub />;
      case 'requests':
        return <RequestsHub />;
      case 'suppliers':
        return <SuppliersHub />;
      case 'rfqs':
        return <RFQsHub />;
      case 'requests':
        return <RequestsHub />;
      case 'calendar':
        return <CalendarHub />;
      case 'contacts':
        return <ContactsHub />;
      case 'contracts':
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Contracts</h1>
                <p className="text-sm font-medium text-gray-600 mt-1">Manage your contract agreements</p>
              </div>

              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <FileText className="w-4 h-4" />
                <span>Create Contract</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="border-b border-gray-200">
              <div className="p-4 md:p-6">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search contracts..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
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
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
                <p className="text-gray-500 mb-6 text-sm font-medium">Start by creating a new contract or import existing agreements.</p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                  Create Contract
                </button>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="h-full overflow-hidden">
            <ProjectsHub onViewChange={onViewChange} />
          </div>
        );
      case 'samples':
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Samples</h1>
                <p className="text-sm text-gray-600 mt-1">Manage product samples and requests</p>
              </div>

              <button className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Package className="w-4 h-4" />
                <span>Request Sample</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between px-4 md:px-6 py-2">
                <div className="flex space-x-8">
                  <button className="py-4 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                    Requested
                  </button>
                  <button className="py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                    On-Process
                  </button>
                  <button className="py-4 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                    Draft
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search samples..."
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
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
                <p className="text-gray-500 mb-6 text-sm">Start by requesting product samples from suppliers.</p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  Request Sample
                </button>
              </div>
            </div>
          </div>
        );
      case 'team':
        return (
          <TeamHub />
        );
      case 'workflows':
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Workflows</h1>
                <p className="text-sm text-gray-600 mt-1">Automate your procurement processes</p>
              </div>

              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Workflow className="w-4 h-4" />
                <span>Add Workflow</span>
              </button>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
              <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Workflow className="w-8 h-8 text-gray-400" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">No workflow yet. Let's get started</h1>
                <p className="text-gray-500 mb-6 text-sm">Create automated workflows to streamline your processes.</p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  Add workflow
                </button>
              </div>
            </div>
          </div>
        );
      case 'templates':
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
                <p className="text-sm font-medium text-gray-600 mt-1">Manage document templates</p>
              </div>

              <button 
                onClick={() => setShowCreateTemplateModal(true)}
                className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Template</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between px-4 md:px-6 py-2">
                <div className="flex space-x-8">
                  <button className="py-4 text-sm font-medium border-b-2 border-blue-600 text-blue-600">
                    RFQ
                  </button>
                  <button className="py-4 text-sm font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                    KYC
                  </button>
                  <button className="py-4 text-sm font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                    PR
                  </button>
                  <button className="py-4 text-sm font-semibold border-b-2 border-transparent text-gray-500 hover:text-gray-700">
                    Contract
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search templates..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 md:w-64"
                    />
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {templates.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
                <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FolderOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
                  <p className="text-gray-500 mb-6 text-sm font-medium">Start by creating document templates for RFQs, contracts, and more.</p>
                  <button 
                    onClick={() => setShowCreateTemplateModal(true)}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    Create Template
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{template.type.replace('-', ' ')}</p>
                        </div>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">
                          {template.sections.length} section{template.sections.length !== 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-gray-600">
                          {template.sections.reduce((total: number, section: any) => total + section.fields.length, 0)} field{template.sections.reduce((total: number, section: any) => total + section.fields.length, 0) !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-gray-500">
                          Created {new Date(template.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button 
                          onClick={() => {
                            // Open template preview/use modal
                            console.log('Using template:', template);
                          }}
                          className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                        >
                          Use Template
                        </button>
                        <button 
                          onClick={() => {
                            // Open template for editing
                            console.log('Editing template:', template);
                          }}
                          className="px-3 py-2 border border-gray-300 rounded text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'analytics':
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
                <p className="text-sm text-gray-600 mt-1">Track performance and insights</p>
              </div>

              <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <BarChart3 className="w-4 h-4" />
                <span>Create Report</span>
              </button>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
              <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
                <p className="text-gray-500 mb-6 text-sm">Start by creating reports and dashboards to track your performance.</p>
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
                  Create Report
                </button>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
                <p className="text-sm text-gray-600 mt-1">Manage your notifications and alerts</p>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
              <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-gray-400" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
                <p className="text-gray-500 mb-6 text-sm">You'll see notifications and alerts here when they arrive.</p>
              </div>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
                <p className="text-sm text-gray-600 mt-1">Communicate with suppliers and team members</p>
              </div>
            </div>

            {/* Empty State */}
            <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
              <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
                <p className="text-gray-500 mb-6 text-sm">Start conversations with suppliers and team members.</p>
              </div>
            </div>
          </div>
        );
      default:
        return <TaskHub />;
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col min-w-0 rounded-tl-lg shadow-sm">

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
      
      <CreateTemplateModal 
        isOpen={showCreateTemplateModal}
        onClose={() => setShowCreateTemplateModal(false)}
        onSave={handleCreateTemplate}
      />
    </div>
  );
};

export default CentralHub;