import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Target,
  MessageSquare,
  User,
  Package,
  Store,
  Megaphone,
  Building,
  Bot,
  Mail,
  UserPlus,
  FileText,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  DollarSign,
  BarChart3,
} from "lucide-react";

// Import all section components
import HomeSection from "./sections/Home";
import Invited from "./sections/Invited";
import Inbox from "./sections/Inbox";
import Customers from "./sections/Customers";
import Leads from "./sections/Leads";
import Messages from "./sections/Messages";
import Profile from "./sections/Profile";
import MyProfile from "./sections/MyProfile";
import Catalogue from "./sections/Catalogue";
import Marketplace from "./sections/Marketplace";
import Marketing from "./sections/Marketing";
import BusinessInfo from "./sections/BusinessInfo";
import CSAI from "./sections/CSAI";
import ToDos from "./sections/ToDos";
import Membership from "./sections/Membership";
import { Link } from "react-router-dom";

interface SellerDashboardProps {
  profileStatus: "pending" | "approved" | "rejected";
}

interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  component: React.ComponentType<any>;
  count?: number;
  subItems?: {
    name: string;
    component: React.ComponentType<any>;
    subSection?: string;
    activeTab?: string;
  }[];
}

interface MenuSection {
  title?: string;
  items: MenuItem[];
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ profileStatus }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [isOnlineStoreConfigComplete, setIsOnlineStoreConfigComplete] =
    useState(false);

  // Menu structure with three sections
  const menuSections: MenuSection[] = [
    // Workspace Section
    {
      title: "Workspace",
      items: [
        { name: "home", icon: Home, component: HomeSection },
        { name: "todos", icon: CheckSquare, component: ToDos },
        { name: "invited", icon: UserPlus, component: Invited },
      ],
    },
    // Main Section
    {
      items: [
        { name: "customers", icon: Users, component: Customers },
        {
          name: "leads",
          icon: Target,
          component: Leads,
          count: 8,
          subItems: [
            { name: "RFQ", component: Leads, subSection: "rfq" },
            { name: "Sample", component: Leads, subSection: "sample" },
            { name: "Enquiries", component: Leads, subSection: "enquiries" },
          ],
        },
        {
          name: "messages",
          icon: MessageSquare,
          component: Messages,
          count: 12,
        },
        {
          name: "profile",
          icon: User,
          component: Profile,
          subItems: [
            {
              name: "My Profile",
              component: MyProfile,
              subSection: "my-profile",
            },
            {
              name: "Company Info",
              component: BusinessInfo,
              subSection: "company-info",
            },
            {
              name: "Membership",
              component: Membership,
              subSection: "membership",
            },
          ],
        },
      ],
    },
    // Marketplace Section
    {
      title: "Marketplace",
      items: [
        {
          name: "catalogue",
          icon: Package,
          component: Catalogue,
          subItems: [
            {
              name: "Product List",
              component: Catalogue,
              activeTab: "products",
            },
            { name: "Variants", component: Catalogue, activeTab: "variants" },
            { name: "Pricing", component: Catalogue, activeTab: "pricing" },
          ],
        },
        {
          name: "marketing",
          icon: Megaphone,
          component: Marketing,
          subItems: [
            {
              name: "Promotions & Deals",
              component: Marketing,
              subSection: "promotions",
            },
            {
              name: "Affiliate Marketing",
              component: Marketing,
              subSection: "affiliates",
            },
          ],
        },
        { name: "cs-ai", icon: Bot, component: CSAI },
        { name: "online-store", icon: Store, component: Marketplace },
      ],
    },
  ];

  // Bottom navigation items
  const bottomNavItems = [
    { name: "home", icon: Home, component: HomeSection },
    { name: "customers", icon: Users, component: Customers },
    { name: "leads", icon: Target, component: Leads },
    { name: "todos", icon: CheckSquare, component: ToDos },
    { name: "profile", icon: User, component: Profile },
  ];

  const handleMenuClick = (
    itemName: string,
    hasSubItems: boolean = false,
    subSection?: string,
    activeTab?: string
  ) => {
    if (hasSubItems) {
      // Toggle submenu
      setOpenSubMenu(openSubMenu === itemName ? null : itemName);
    } else {
      // Set active section and close mobile menu
      let sectionKey = itemName;
      if (subSection) {
        sectionKey = `${itemName}-${subSection}`;
      } else if (activeTab) {
        sectionKey = `${itemName}-${activeTab}`;
      }
      setActiveSection(sectionKey);
      setIsMobileMenuOpen(false);
      setOpenSubMenu(null);
    }
  };

  const renderContent = () => {
    // Handle direct matches first
    if (activeSection === "home")
      return (
        <HomeSection
          profileStatus={profileStatus}
          isOnlineStoreConfigComplete={isOnlineStoreConfigComplete}
        />
      );
    if (activeSection === "invited") return <Invited />;
    if (activeSection === "customers") return <Customers />;
    if (activeSection === "messages") return <Messages />;
    if (activeSection === "profile") return <Profile />;
    if (activeSection === "cs-ai") return <CSAI />;
    if (activeSection === "todos") return <ToDos />;

    // Handle leads sub-sections
    if (activeSection === "leads-rfq") return <Leads subSection="rfq" />;
    if (activeSection === "leads-sample") return <Leads subSection="sample" />;
    if (activeSection === "leads-enquiries")
      return <Leads subSection="enquiries" />;
    if (activeSection === "leads") return <Leads />;

    // Handle profile sub-sections
    if (activeSection === "profile-my-profile") return <MyProfile />;
    if (activeSection === "profile-company-info") return <BusinessInfo />;
    if (activeSection === "profile-membership") return <Membership />;
    if (activeSection === "profile-membership") return <Membership />;

    // Handle online store sub-sections
    if (activeSection === "online-store") return <Marketplace />;

    // Handle catalogue sub-sections
    if (activeSection === "catalogue-products")
      return <Catalogue activeTab="products" />;
    if (activeSection === "catalogue-variants")
      return <Catalogue activeTab="variants" />;
    if (activeSection === "catalogue-pricing")
      return <Catalogue activeTab="pricing" />;
    if (activeSection === "catalogue") return <Catalogue />;

    // Handle marketing sub-sections
    if (activeSection === "marketing-promotions")
      return <Marketing subSection="promotions" />;
    if (activeSection === "marketing-affiliates")
      return <Marketing subSection="affiliates" />;
    if (activeSection === "marketing") return <Marketing />;

    // Default to home
    return (
      <HomeSection
        profileStatus={profileStatus}
        isOnlineStoreConfigComplete={isOnlineStoreConfigComplete}
      />
    );
  };

  const renderMenuItem = (item: MenuItem, sectionIndex: number) => {
    const isActive =
      activeSection === item.name || activeSection.startsWith(`${item.name}-`);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isSubMenuOpen = openSubMenu === item.name;

    return (
      <div key={item.name}>
        <button
          onClick={() => handleMenuClick(item.name, hasSubItems)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? "bg-purple-600 text-white"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="flex items-center space-x-3">
            <item.icon className="w-5 h-5" />
            <span className="capitalize">{item.name.replace("-", " ")}</span>
          </div>
          <div className="flex items-center space-x-2">
            {item.count && (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isActive
                    ? "bg-white text-purple-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {item.count}
              </span>
            )}
            {hasSubItems &&
              (isSubMenuOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              ))}
          </div>
        </button>

        {/* Sub-menu items */}
        {hasSubItems && isSubMenuOpen && (
          <div className="ml-8 mt-2 space-y-1">
            {item.subItems!.map((subItem) => (
              <button
                key={subItem.name}
                onClick={() =>
                  handleMenuClick(
                    item.name,
                    false,
                    subItem.subSection,
                    subItem.activeTab
                  )
                }
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection ===
                  `${item.name}-${subItem.subSection || subItem.activeTab}`
                    ? "bg-purple-100 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{subItem.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link to="/" className="flex items-center space-x-2">
              {/* <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" /> */}
              {/* <span className="text-sm sm:text-base font-bold text-gray-900">Purchasync</span> */}
              <img
                src="/purchasync-logo-2.webp"
                alt="purchasync"
                className="h-[25px]  w-auto md:h-[30px]"
              />
            </Link>
          </div>

          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-4 space-y-6">
              {menuSections.map((section, sectionIndex) => (
                <div key={sectionIndex}>
                  {section.title && (
                    <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {section.title}
                    </h3>
                  )}
                  <div className={`space-y-1 ${section.title ? "mt-2" : ""}`}>
                    {section.items.map((item) =>
                      renderMenuItem(item, sectionIndex)
                    )}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>

            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    Purchasync
                  </span>
                </div>
              </div>

              <nav className="mt-8 px-4 space-y-6">
                {menuSections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {section.title && (
                      <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {section.title}
                      </h3>
                    )}
                    <div className={`space-y-1 ${section.title ? "mt-2" : ""}`}>
                      {section.items.map((item) =>
                        renderMenuItem(item, sectionIndex)
                      )}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              {/* <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" /> */}
              {/* <span className="text-sm sm:text-base font-bold text-gray-900">Purchasync</span> */}
              <img
                src="/purchasync-logo-2.webp"
                alt="purchasync"
                className="h-[25px]  w-auto md:h-[30px]"
              />
            </Link>
            <div className="w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-32 lg:pb-8">
          {renderContent()}
        </main>

        {/* Mobile bottom navigation - Floating */}
        <div className="lg:hidden fixed bottom-6 left-4 right-4 z-40">
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 px-4 py-3 backdrop-blur-sm bg-white/95">
            <div className="flex justify-around">
              {bottomNavItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item.name)}
                  className={`flex flex-col items-center space-y-1 p-3 rounded-xl transition-all duration-300 touch-target ${
                    activeSection === item.name
                      ? "text-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 scale-105 shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs font-medium capitalize">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
