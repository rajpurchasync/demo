import React, { useState } from "react";
import {
  CheckSquare,
  Inbox,
  FileCheck,
  MessageCircle,
  UserPlus,
  TrendingUp,
  Cat as Catalog,
  Settings,
  PanelRightClose,
  PanelRightOpen,
  ArrowLeft,
  Puzzle,
  CreditCard,
  Download,
} from "lucide-react";
import {
  Package,
  Phone,
  Shield,
  ClipboardList,
  FileSignature,
  Archive,
} from "lucide-react";
import { FileText, Users, Building, User, Menu, X } from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (view: string) => void;
  type?: "buyer" | "seller";
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
  type = "buyer",
}) => {
  const [currentView, setCurrentView] = React.useState("tasks");
  const [isSettingsMode, setIsSettingsMode] = useState(false);
  const [expandedMenus, setExpandedMenus] = React.useState<{
    [key: string]: boolean;
  }>({});

  const handleBackToMain = () => {
    setIsSettingsMode(false);
    setCurrentView("home");
  };
  const menuItems2 = [
    {
      id: "suppliers",
      label: "Suppliers",
      icon: Users,
      color: "text-purple-600",
    },

    {
      id: "RFQs",
      label: "RFQ",
      icon: TrendingUp,
      color: "text-orange-600",
      subItems: [
        { id: "rfq-list", label: "RFQ List", view: "rfq-list" },
        // { label: "RFQ Templates", view: "rfq-templates" },
        { id: "rfq-approvals", label: "Approvals", view: "rfq-approvals" },
      ],
    },
    {
      id: "templates",
      label: "Templates",
      icon: Catalog,
      color: "text-yellow-600",
      subItems: [
        { id: "rfq-templates", label: "RFQ Templates", view: "rfq-templates" },
        {
          id: "contract-template",
          label: "Contract Template",
          view: "contract-templates",
        },
        {
          id: "kyc-template",
          label: "KYC Template",
          view: "kyc-templates",
        },
        // { label: "Approvals", view: "rfq-approvals" },
      ],
    },
    {
      id: "samples",
      label: "Samples",
      icon: FileText,
      color: "text-indigo-600",
    },
    {
      id: "contract-list",
      label: "Contracts",
      icon: FileCheck,
      color: "text-red-600",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageCircle,
      color: "text-pink-600",
    },
  ];
  const menuSections = [
    {
      title: "SRM",
      items: [
        {
          id: "suppliers",
          label: "Supplier",
          icon: Users,
          color: "text-purple-600",
        },
        {
          id: "contactsScreen",
          label: "Contacts",
          icon: Phone,
          color: "text-blue-600",
        },
        {
          id: "messages",
          label: "Messages",
          icon: MessageCircle,
          color: "text-pink-600",
        },
        {
          id: "Meeting",
          label: "Meeting",
          icon: Shield,
          color: "text-green-600",
        },
      ],
    },
    {
      title: "Procurement",
      items: [
        {
          id: "rfq-list",
          label: "RFQ",
          icon: FileText,
          color: "text-orange-600",
        },
        {
          id: "quotation",
          label: "Quotation",
          icon: FileCheck,
          color: "text-indigo-600",
        },
        {
          id: "samples",
          label: "Sample",
          icon: Package,
          color: "text-teal-600",
        },
        {
          id: "contract-list",
          label: "Contract",
          icon: FileSignature,
          color: "text-red-600",
        },
      ],
    },
    {
      title: "Workspace",
      items: [
        {
          id: "tasks",
          label: "Tasks",
          icon: CheckSquare,
          color: "text-blue-600",
        },
        { id: "inbox", label: "Inbox", icon: Inbox, color: "text-green-600" },
        {
          id: "rfq-approvals",
          label: "Approvals",
          icon: ClipboardList,
          color: "text-yellow-600",
        },
        {
          id: "rfq-templates",
          label: "Templates",
          icon: Archive,
          color: "text-gray-600",
        },
      ],
    },
    {
      title: "Profile & Settings",
      items: [
        { id: "profile", label: "Profile", icon: User, color: "text-gray-600" },
      ],
    },
  ];

  const settingsItems = [
    { id: "profile", label: "Profile", icon: User, color: "text-blue-600" },
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
      icon: Puzzle,
      color: "text-indigo-600",
    },
    {
      id: "memberships",
      label: "Memberships",
      icon: CreditCard,
      color: "text-green-600",
    },
  ];
  const menuItemsSeller = [
    {
      id: "suppliers",
      label: "Customers",
      icon: Users,
      color: "text-purple-600",
    },

    {
      id: "leads",
      label: "Leads",
      icon: TrendingUp,
      color: "text-orange-600",
      subItems: [
        { label: "RFQ List", view: "rfq-list", id: "rfq-list" },
        { label: "Sample", view: "sample", id: "sample" },
      ],
    },
    {
      id: "templates",
      label: "Templates",
      icon: Catalog,
      color: "text-yellow-600",
      subItems: [
        { id: "rfq-templates", label: "RFQ Templates", view: "rfq-templates" },
        {
          id: "contract-template",
          label: "Contract Template",
          view: "contract-templates",
        },
        // { label: "Approvals", view: "rfq-approvals" },
      ],
    },
    {
      id: "contract-list",
      label: "Contracts",
      icon: FileCheck,
      color: "text-red-600",
    },
    {
      id: "messages",
      label: "Messages",
      icon: MessageCircle,
      color: "text-pink-600",
    },
  ];
  const handleNavigation = (view: string) => {
    setCurrentView(view);
    onNavigate(view);
    // Close mobile menu after navigation on mobile
    if (window.innerWidth < 1024) {
      onToggleMobileMenu();
    }
  };

  const toggleMenuExpansion = (menuLabel: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuLabel]: !prev[menuLabel],
    }));
  };

  const handleMenuItemClick = (item: any) => {
    setCurrentView(item.id);
    if (item.subItems) {
      toggleMenuExpansion(item.label);
      // If it's a main expandable item, also navigate to its main view
      if (item.view) {
        handleNavigation(item.id);
      }
    } else {
      toggleMenuExpansion("");
      handleNavigation(item.id);
    }
  };
  const router = useNavigate();
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggleMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          height: "calc(100% - 80px)",
        }}
        className={`
      flex flex-col  fixed left-0 top-[80px]  border-r border-gray-200 z-40 transition-all duration-300 ease-in-out lg:translate-x-0
        ${isCollapsed ? "lg:w-16" : "lg:w-60"}
        w-72
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Header */}

        {/* Navigation */}
        <nav
          className={`relative flex-1 overflow-y-auto py-4 ${
            isCollapsed ? "px-3" : "px-4"
          }`}
        >
          {!isCollapsed && (
            <div
              className={`mb-4 p-2 bg-gray-50 rounded-lg ${
                isCollapsed ? "hidden" : " transition-all duration-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">
                    Sarah Johnson
                  </p>
                  <p className="text-xs text-gray-500">Procurement Manager</p>
                </div>
              </div>
            </div>
          )}
          <button
            onClick={onToggleCollapse}
            className={`absolute -top-2 ${
              isCollapsed ? "left-3" : "right-0"
            } hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors`}
          >
            {isCollapsed ? (
              <PanelRightClose className="w-4 h-4 text-gray-500" size={20} />
            ) : (
              <PanelRightOpen className="w-4 h-4 text-gray-500" size={20} />
            )}
          </button>
          <div className={`space-y-1 ${isCollapsed ? "py-2" : ""}`}>
            <hr className="!my-4 border-gray-200" />
            {menuSections.map((section, sectionIndex) => {
              // const Icon = section.icon;
              return (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            onNavigate?.(item.id);
                          }}
                          className="w-full flex items-center p-2 hover:bg-gray-50 rounded transition-colors text-left group"
                        >
                          <div
                            className={`p-1 rounded bg-gray-100 mr-2 ${item.color} group-hover:bg-gray-200 transition-colors`}
                          >
                            <Icon className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-medium text-gray-900 group-hover:text-gray-700">
                            {item.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {/* <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <div key={item.label}>
                <div
                  className={`
                    flex items-center px-3 py-3 rounded-lg cursor-pointer transition-all duration-200
                    ${
                      currentView === item.view
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 border-l-3 border-blue-600 shadow-sm"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }
                  `}
                  onClick={() => handleMenuItemClick(item)}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-1 rounded bg-gray-100 mr-2 ${item.color} group-hover:bg-gray-200 transition-colors`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>

                      <span
                        className={`font-medium text-sm ${
                          isCollapsed ? "lg:hidden" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.type === "expandable" && (
                      <ChevronDown
                        size={16}
                        className={`transform transition-transform duration-200 ${
                          expandedMenus[item.label] ? "rotate-180" : ""
                        } ${
                          currentView === item.view
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                </div>

                {item.type === "expandable" && expandedMenus[item.label] && (
                  <div
                    className={`ml-6 mt-1 space-y-1 ${
                      isCollapsed ? "lg:hidden" : ""
                    }`}
                  >
                    {item.subItems?.map((subItem) => (
                      <div
                        key={subItem.view}
                        className={`
                          flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 text-sm
                          ${
                            currentView === subItem.view
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          }
                        `}
                        onClick={() => handleNavigation(subItem.view)}
                      >
                        <span>{subItem.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div> */}
        </nav>

        {/* Footer */}
      </aside>
    </>
  );
};

export default Sidebar;
