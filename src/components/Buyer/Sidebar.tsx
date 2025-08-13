import React from "react";
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

interface SidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  onNavigate: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
}) => {
  const [currentView, setCurrentView] = React.useState("dashboard");
  const [expandedMenus, setExpandedMenus] = React.useState<{
    [key: string]: boolean;
  }>({});

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      view: "dashboard",
      type: "single",
    },
    {
      icon: Building,
      label: "My Company",
      view: "my-company",
      type: "single",
    },
    {
      icon: Users,
      label: "Suppliers",
      view: "suppliers",
      type: "single",
    },
    {
      icon: FileText,
      label: "Quotations",
      view: "quotations",
      type: "expandable",
      subItems: [
        { label: "RFQ List", view: "rfq-list" },
        { label: "RFQ Templates", view: "rfq-templates" },
        { label: "Approvals", view: "rfq-approvals" },
      ],
    },
    {
      icon: FileText,
      label: "Samples",
      view: "samples",
      type: "single",
    },
    {
      icon: Users,
      label: "Team",
      view: "team",
      type: "single",
    },
    {
      icon: MessageSquare,
      label: "Messages",
      view: "messages",
      type: "single",
    },
    {
      icon: Bell,
      label: "Notifications",
      view: "notifications",
      type: "single",
    },
    {
      icon: User,
      label: "My Profile",
      view: "profile",
      type: "single",
    },
    {
      icon: BarChart3,
      label: "Report",
      view: "report",
      type: "single",
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
    if (item.type === "expandable") {
      toggleMenuExpansion(item.label);
      // If it's a main expandable item, also navigate to its main view
      if (item.view) {
        handleNavigation(item.view);
      }
    } else {
      handleNavigation(item.view);
    }
  };

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
        className={`
        fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out lg:translate-x-0
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
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <a href="/">
            <div
              className={`flex items-center space-x-3 ${
                isCollapsed ? "lg:hidden" : ""
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Purchasync
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
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {menuItems.map((item) => (
              <div key={item.label}>
                {/* Main Menu Item */}
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
                      <item.icon
                        size={20}
                        className={
                          currentView === item.view
                            ? "text-blue-600"
                            : "text-gray-500 group-hover:text-blue-600"
                        }
                      />
                      <span
                        className={`font-medium ${
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

                {/* Sub Menu Items */}
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
          </div>
        </nav>

        {/* Footer */}
        <div
          className={`p-4 border-t border-gray-100 ${
            isCollapsed ? "lg:hidden" : ""
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">JB</span>
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-sm">
                John Buyer
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Procurement Manager
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
