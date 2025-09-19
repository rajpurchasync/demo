import React, { useState } from 'react';
import InviteModal from './InviteModal';
import { 
  ChevronLeft,
  Home,
  CheckSquare,
  Users,
  FileText,
  Inbox,
  FolderOpen,
  Calendar,
  Settings,
  Plus,
  ChevronDown,
  ChevronRight,
  Building,
  MessageSquare,
  Target,
  FileCheck,
  Package,
  Award,
  Bell,
  UserPlus,
  Workflow,
  BarChart3,
  Briefcase,
  User,
  ShoppingCart
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed, 
  onToggleCollapse, 
  activeView, 
  onViewChange 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['workspace', 'vendors']);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const menuSections = [
    {
      id: 'workspace',
      title: 'Workspace',
      icon: Home,
      items: [
        { id: 'tasks', label: 'Tasks', icon: CheckSquare },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'rfqs', label: 'RFQ', icon: Target },
      ]
    },
    {
      id: 'vendors',
      title: 'Vendors',
      icon: Users,
      items: [
        { id: 'suppliers', label: 'Suppliers', icon: Building },
        { id: 'contacts', label: 'Contacts', icon: User },
        { id: 'calendar', label: 'Meetings', icon: Calendar }
      ]
    },
    {
      id: 'procurement',
      title: 'Procurement',
      icon: ShoppingCart,
      items: [
        { id: 'requests', label: 'Requests', icon: Inbox },
        { id: 'rfqs', label: 'RFQs', icon: Target },
        { id: 'samples', label: 'Samples', icon: Package },
        { id: 'templates', label: 'Templates', icon: FolderOpen },
        { id: 'contracts', label: 'Contracts', icon: FileText }
      ]
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: Settings,
      items: [
        { id: 'team', label: 'Team', icon: UserPlus },
        { id: 'workflows', label: 'Workflows', icon: Workflow },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'messages', label: 'Messages', icon: MessageSquare }
      ]
    }
  ];

  return (
    <div className={`bg-white border-r border-slate-200 transition-all duration-300 overflow-y-auto overflow-x-hidden thin-scrollbar flex-shrink-0 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      
      {/* Collapse/Expand Button */}
      <div className="flex justify-end p-2 border-b border-slate-100">
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronLeft className={`w-4 h-4 text-slate-600 transition-transform ${
            collapsed ? 'rotate-180' : ''
          }`} />
        </button>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 py-4 overflow-y-auto overflow-x-hidden thin-scrollbar">
        {menuSections.map((section) => (
          <div key={section.id} className="mb-2">
            {/* Section Header */}
            <button
              onClick={() => !collapsed && toggleSection(section.id)}
              className={`w-full flex items-center justify-between px-3 py-2 mx-2 text-sm font-medium rounded-lg transition-colors hover:bg-slate-50 ${
                collapsed ? 'justify-center' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <section.icon className="w-4 h-4 text-slate-600" />
                {!collapsed && (
                  <span className="font-semibold text-slate-800">{section.title}</span>
                )}
              </div>
              {!collapsed && (
                <div className="flex items-center">
                  {expandedSections.includes(section.id) ? (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              )}
            </button>

            {/* Section Items */}
            {(!collapsed && expandedSections.includes(section.id) && section.id !== 'bottom-actions') && (
              <div className="mt-1 space-y-1 px-2">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ml-4 ${
                      activeView === item.id 
                        ? 'text-blue-600 bg-blue-50 font-semibold' 
                        : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Collapsed view - show items on hover */}
            {collapsed && (
              <div className="relative group">
                <div className="absolute left-full top-0 ml-2 bg-white border border-slate-200 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
                  <div className="px-3 py-1 text-xs font-semibold text-slate-600 uppercase tracking-wider border-b border-slate-100 mb-1">
                    {section.title}
                  </div>
                  {section.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium transition-colors ${
                        activeView === item.id 
                          ? 'text-blue-600 bg-blue-50 font-semibold' 
                          : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-slate-200 p-4 mt-auto">
        <div className="flex items-center justify-between space-x-2">
          <button 
            onClick={() => setShowInviteModal(true)}
            className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium flex-1"
          >
            <Users className="w-4 h-4" />
            {!collapsed && <span>Invite</span>}
          </button>
          
          {!collapsed && <div className="w-px h-6 bg-slate-300"></div>}
          
          <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 hover:bg-slate-50 px-3 py-2 rounded-lg transition-colors text-sm font-medium flex-1">
            <Settings className="w-4 h-4" />
            {!collapsed && <span>Settings</span>}
          </button>
        </div>
      </div>

      <InviteModal 
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
      />
    </div>
  );
};

export default Sidebar;