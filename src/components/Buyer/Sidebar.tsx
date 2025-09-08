import React from "react";
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
} from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Building,
  Heart,
  MessageSquare,
  Bell,
  User,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
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
  const [currentView, setCurrentView] = React.useState("todos");
  const [expandedMenus, setExpandedMenus] = React.useState<{
    [key: string]: boolean;
  }>({});

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
    {
      id: "team",
      label: "Team Management",
      icon: UserPlus,
      color: "text-teal-600",
    },
    { id: "profile", label: "Profile", icon: User, color: "text-gray-600" },
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
    {
      id: "team",
      label: "Team Management",
      icon: UserPlus,
      color: "text-teal-600",
    },
    { id: "profile", label: "Profile", icon: User, color: "text-gray-600" },
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
        {/* <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <a
            href="#"
            onClick={() =>
              handleMenuItemClick({
                id: "dashboard",
                label: "Dashboard",
                icon: LayoutDashboard,
                color: "text-blue-600",
              })
            }
          >
            <div
              className={`flex items-center space-x-3 ${
                isCollapsed ? "lg:hidden" : ""
              }`}
            >
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                <span className="text-gray-500 font-light">My Workspace</span>
              </span>
            </div>
          </a>

          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div> */}
        {/* Navigation */}
        <nav
          className={`relative flex-1 overflow-y-auto py-4 ${
            isCollapsed ? "px-3" : "px-4"
          }`}
        >
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
            <span
              className={`text-[16px] text-gray-500 font-light ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              My Workspace
            </span>

            {[
              {
                id: "todos",
                label: "To do list",
                icon: CheckSquare,
                color: "text-blue-600",
              },
              {
                id: "inbox",
                label: "Inbox",
                icon: Inbox,
                color: "text-green-600",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    console.log(`Navigate to ${item.id}`);
                    // router("/" + item.id);
                    // onClose();
                    handleMenuItemClick(item);
                  }}
                  className={` ${
                    currentView === item.id
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }pl-4 w-full flex items-center p-2 hover:bg-gray-50 rounded transition-colors text-left group`}
                >
                  <div
                    className={`p-1 rounded bg-gray-100 mr-2 ${item.color} group-hover:bg-gray-200 transition-colors`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && (
                    <span className="text-[14px] font-medium text-gray-900 group-hover:text-gray-700">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
            <hr className="!my-6 border-gray-200" />
            {(type === "buyer" ? menuItems2 : menuItemsSeller).map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      console.log(`Navigate to ${item.id}`);
                      // router("/" + item.id);
                      // onClose();
                      handleMenuItemClick(item);
                    }}
                    className={` ${
                      currentView === item.id
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }pl-4 w-full flex items-center p-2 hover:bg-gray-50 rounded transition-colors text-left group`}
                  >
                    <div
                      className={`p-1 rounded bg-gray-100 mr-2 ${item.color} group-hover:bg-gray-200 transition-colors`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    {!isCollapsed && (
                      <span className="text-[14px] font-medium text-gray-900 group-hover:text-gray-700">
                        {item.label}
                      </span>
                    )}
                    {item.subItems && (
                      <ChevronDown
                        size={16}
                        className={`ml-auto transform transition-transform duration-200 ${
                          expandedMenus[item.label] ? "rotate-180" : ""
                        } ${
                          currentView === item.id
                            ? "text-blue-600"
                            : "text-gray-400"
                        }`}
                      />
                    )}
                  </button>
                  {item.subItems && expandedMenus[item.label] && (
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
                          <span className="text-[14px] font-medium text-gray-600 group-hover:text-gray-700">
                            {subItem.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
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
        <div
          className={`p-4 mt-auto border-t border-gray-200 ${
            isCollapsed ? "lg:hidden" : ""
          }`}
        >
          <div className="flex items-center space-x-3">
            <UserPlus className="w-4 h-4" />
            <div>
              <div className="font-semibold text-gray-900 text-sm">Invite</div>
              {/* <div className="text-xs text-gray-600 font-medium">
                Procurement Manager
              </div> */}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
