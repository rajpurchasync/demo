import React, { useState, useEffect } from "react";
import Sidebar from "./Buyer/Sidebar";
import TopNavigation from "./Buyer/TopNavigation";
import NotificationCenter from "./Buyer/NotificationCenter";
import Dashboard from "./Buyer/Dashboard";
import MyBusiness from "./Buyer/MyBusiness";
import ProfileManagement from "./Buyer/ProfileManagement";
import SupplierManagement from "./Buyer/SupplierManagement";
import SamplesManagement from "./Buyer/SamplesManagement";
import RFQList from "./Buyer/RFQList";
import RFQTemplates from "./Buyer/RFQTemplates";
import RFQApprovals from "./Buyer/RFQApprovals";
import QuotationManagement from "./Buyer/QuotationManagement";
import TeamManagement from "./Buyer/TeamManagement";
import MessagesInterface from "./Buyer/MessagesInterface";
import NotificationsInterface from "./Buyer/NotificationsInterface";
import RFQSummaryReport from "./Buyer/RFQSummaryReport";
import BottomNavigation from "./Buyer/BottomNavigation";

function BuyerDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState("dashboard");
  const [currentView, setCurrentView] = useState("dashboard");
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] =
    useState(false);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(3);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Auto-collapse sidebar on smaller screens
      if (mobile) {
        setSidebarCollapsed(true);
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleBottomTabChange = (tab: string) => {
    setActiveBottomTab(tab);
    // Map bottom nav tabs to actual views
    const viewMapping: { [key: string]: string } = {
      dashboard: "dashboard",
      messages: "messages",
      rfq: "quotations", // RFQ maps to quotations view
      saved: "saved",
      alerts: "notifications", // Alerts maps to notifications view
    };
    setCurrentView(viewMapping[tab] || tab);
    // Handle navigation logic here
  };

  const handleSidebarNavigation = (view: string) => {
    setCurrentView(view);
    // Map views back to bottom nav tabs
    const tabMapping: { [key: string]: string } = {
      dashboard: "dashboard",
      messages: "messages",
      quotations: "rfq",
      saved: "saved",
      notifications: "alerts",
    };
    setActiveBottomTab(tabMapping[view] || "dashboard");
    // Close mobile menu when navigating
    if (isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
      case "my-company":
        return <MyBusiness sidebarCollapsed={sidebarCollapsed} />;
      case "samples":
        return <SamplesManagement sidebarCollapsed={sidebarCollapsed} />;
      case "suppliers":
        return <SupplierManagement sidebarCollapsed={sidebarCollapsed} />;
      case "saved":
        return (
          <div
            className={`transition-all duration-300 ease-in-out ${
              sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"
            } pt-4 lg:pt-8 px-4 lg:px-8 pb-8 min-h-screen bg-gray-50`}
          >
            <div className="mb-8 mt-12 lg:mt-0">
              <h1 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-2">
                Saved Items
              </h1>
              <p className="text-gray-600">
                View your saved suppliers, RFQs, and other items
              </p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-gray-500">Saved items module coming soon...</p>
            </div>
          </div>
        );
      case "quotations":
      case "rfq-list":
        return <QuotationManagement sidebarCollapsed={sidebarCollapsed} />;
      case "rfq-templates":
        return <RFQTemplates sidebarCollapsed={sidebarCollapsed} />;
      case "rfq-approvals":
        return <RFQApprovals sidebarCollapsed={sidebarCollapsed} />;
      case "team":
        return <TeamManagement sidebarCollapsed={sidebarCollapsed} />;
      case "messages":
        return <MessagesInterface sidebarCollapsed={sidebarCollapsed} />;
      case "notifications":
        return <NotificationsInterface sidebarCollapsed={sidebarCollapsed} />;
      case "profile":
        return <ProfileManagement sidebarCollapsed={sidebarCollapsed} />;
      case "report":
        return <RFQSummaryReport sidebarCollapsed={sidebarCollapsed} />;
      default:
        return <Dashboard sidebarCollapsed={sidebarCollapsed} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 lg:pb-0">
      <TopNavigation
        onNotificationClick={() => setIsNotificationCenterOpen(true)}
        unreadNotificationCount={unreadNotificationCount}
        onProfileClick={() => setCurrentView("profile")}
      />

      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onNavigate={handleSidebarNavigation}
      />

      {renderCurrentView()}

      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        unreadCount={unreadNotificationCount}
      />

      <BottomNavigation
        activeTab={activeBottomTab}
        onTabChange={handleBottomTabChange}
      />
    </div>
  );
}

export default BuyerDashboard;
