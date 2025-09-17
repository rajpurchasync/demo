import React, { useState } from "react";
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
  ArrowLeft,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeView: string;
  onViewChange: (view: string) => void;
  enableSettings: boolean;
  setEnableSettings: (enable: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  activeView,
  onViewChange,
  enableSettings,
  setEnableSettings,
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "workspace",
    "suppliers",
    "proposals",
  ]);

  const toggleSection = (section: string) => {
    if(enableSettings) {
      onViewChange(section);
      return;
    }
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  // If activeView is 'settings', show settings menu, else show normal menuSections
  const settingsItems = [
    { id: "profile", label: "Profile", icon: Building, color: "text-blue-600" },
    {
      id: "business",
      label: "Business Setup",
      icon: Building,
      color: "text-purple-600",
    },
    {
      id: "locations",
      label: "Locations",
      icon: Building,
      color: "text-green-600",
    },
    { id: "team", label: "Teams", icon: Users, color: "text-yellow-600" },
    {
      id: "security",
      label: "Security & Privacy",
      icon: Settings,
      color: "text-red-600",
    },
    {
      id: "integrations",
      label: "Import & Integrations",
      icon: Settings,
      color: "text-indigo-600",
    },
    {
      id: "memberships",
      label: "Memberships",
      icon: Award,
      color: "text-green-600",
    },
  ];

  const menuSections =
    enableSettings
      ? settingsItems.map((item) => ({
          id: item.id,
          label: item.label,
          title: item.label,
          icon: item.icon,
        }))
      : [
          {
            id: "workspace",
            title: "Workspace",
            icon: Home,
            items: [
              { id: "tasks", label: "All Tasks", icon: CheckSquare, badge: 12 },
              { id: "inbox", label: "Inbox", icon: Inbox, badge: 2 },
              { id: "calendar", label: "Calendar", icon: Calendar },
            ],
          },
          {
            id: "suppliers",
            title: "Supplier Management",
            icon: Building,
            items: [
              {
                id: "suppliers",
                label: "Suppliers",
                icon: Building,
                badge: 47,
              },
              { id: "contacts", label: "Contacts", icon: Users },
              {
                id: "messages",
                label: "Messages",
                icon: MessageSquare,
                badge: 3,
              },
            ],
          },
          {
            id: "proposals",
            title: "Proposals",
            icon: FileText,
            items: [
              { id: "rfqs", label: "RFQs", icon: Target, badge: 8 },
              {
                id: "approvals",
                label: "Approvals",
                icon: FileCheck,
                badge: 3,
              },
              { id: "quotations", label: "Quotations", icon: FileCheck },
              { id: "samples", label: "Samples", icon: Package },
              { id: "contracts", label: "Contracts", icon: Award },
            ],
          },
          {
            id: "operations",
            title: "Operations",
            icon: Settings,
            items: [{ id: "team", label: "Team", icon: Users }],
          },
          {
            id: "templates",
            title: "Templates",
            icon: FolderOpen,
            items: [
              { id: "rfq-templates", label: "RFQ Templates", icon: Target },
              { id: "kyc-templates", label: "KYC Templates", icon: FileCheck },
              {
                id: "contract-templates",
                label: "Contract Templates",
                icon: Award,
              },
            ],
          },
          {
            id: "projects",
            title: "Projects",
            icon: FolderOpen,
            items: [
              { id: "project-board", label: "Project Board", icon: FolderOpen },
            ],
          },
        ];

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {enableSettings && (
         <ArrowLeft
         onClick={() => {
          setEnableSettings(false)
          onViewChange('workspace')
         }}
            className="w-4 h-4 text-gray-500"
          />
        )}
        {!collapsed && (
          <span className="text-sm font-medium text-gray-700">{enableSettings ? "Back to Main Menu" : "Navigation"}</span>
        )}
        {
          <button
            onClick={onToggleCollapse}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft
              className={`w-4 h-4 text-gray-500 transition-transform ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        }
      </div>

      {/* Menu Sections */}
      {
        <div className="flex-1 overflow-y-auto py-2 thin-scrollbar">
          {menuSections.map((section: any) => (
            <div key={section.id} className="mb-1">
              <button
                onClick={() => !collapsed && toggleSection(section.id)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <section.icon className="w-4 h-4 text-gray-500" />
                  {!collapsed && (
                    <span className="font-medium">{section.title}</span>
                  )}
                </div>
                {!collapsed && section?.items?.length > 0 && (
                  <div className="flex items-center">
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                )}
              </button>

              {!collapsed && expandedSections.includes(section.id) && (
                <div className="ml-4 border-l border-gray-100">
                  {section?.items?.map((item: any) => (
                    <button
                      key={item.id}
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${
                        activeView === item.id
                          ? "text-blue-600 bg-blue-50 border-r-2 border-blue-600"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-3.5 h-3.5" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      }

      {/* Bottom Action */}
      <div className="border-t border-gray-100 p-4">
        <button
          className={`w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors ${
            collapsed ? "px-2" : ""
          }`}
        >
          <Plus className="w-4 h-4" />
          {!collapsed && <span className="text-sm font-medium">Invite</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
