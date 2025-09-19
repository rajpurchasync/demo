import { useEffect, useState } from "react";
// import TopBar from '../components/Workspace/Layout/TopBar';
// import Sidebar from '../components/Workspace/Layout/Sidebar';
import CentralHub from "../components/Workspace/Layout/CentralHub";
import RightSidebar from "../components/Workspace/Layout/RightSidebar";
import { Supplier } from "../components/MobileDashboard/types/purchasync";
import React from "react";
import { HomeScreen } from "../components/MobileDashboard/Screens/HomeScreen";
import { ActivityScreen } from "../components/MobileView/components/Screens/ActivityScreen";
import { InboxScreen } from "../components/MobileView/components/Screens/InboxScreen";
import { SuppliersScreen } from "../components/MobileView/components/Screens/SuppliersScreen";
import { RFQsScreen } from "../components/MobileView/components/Screens/RFQsScreen";
import { ToDosScreen } from "../components/MobileView/components/Screens/ToDosScreen";
import { ContactsScreen } from "../components/MobileView/components/Screens/ContactsScreen";
import { MarketplaceScreen } from "../components/MobileView/components/Screens/MarketplaceScreen";
import { TeamManagementScreen } from "../components/MobileView/components/Screens/TeamManagementScreen";
import { ProfileScreen } from "../components/MobileView/components/Screens/ProfileScreen";
import { MobileLandingPage } from "../components/MobileView/components/Screens/MobileLandingPage";
import { Header } from "../components/MobileView/components/Layout/Header";
import { SupplierDetailScreen } from "../components/MobileView/components/Screens/SupplierDetailScreen";
import { BottomNavigation } from "../components/MobileView/components/Layout/BottomNavigation";
import { FloatingActionButton } from "../components/MobileView/components/UI/FloatingActionButton";
import { CreateMenuModal } from "../components/MobileView/components/Modals/CreateMenuModal";
import TopBar from "../components/Dashbord-v2/components/Layout/TopBar";
import Sidebar from "../components/Dashbord-v2/components/Layout/Sidebar";

type Screen =
  | "home"
  | "suppliers"
  | "rfqs"
  | "tasks"
  | "marketplace"
  | "team"
  | "profile"
  | "contacts"
  | "activity"
  | "inbox";

function BuyerMobileView() {
  const [activeView, setActiveView] = useState("tasks");
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false to show landing page initially
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showCreateRFQModal, setShowCreateRFQModal] = useState(false);
  const [showCreateToDoModal, setShowCreateToDoModal] = useState(false);

  // Listen for navigation events from hamburger menu
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setCurrentScreen(event.detail as Screen);
    };

    window.addEventListener("navigate", handleNavigate as EventListener);
    return () =>
      window.removeEventListener("navigate", handleNavigate as EventListener);
  }, []);

  const handleFloatingButtonClick = () => {
    switch (currentScreen) {
      case "home":
        setIsCreateMenuOpen(true);
        break;
      case "suppliers":
        setShowAddSupplierModal(true);
        break;
      case "rfqs":
        setShowCreateRFQModal(true);
        break;
      case "tasks":
        setShowCreateToDoModal(true);
        break;
      case "contacts":
        console.log("Add new contact");
        break;
      default:
        setIsCreateMenuOpen(true);
    }
  };

  const getFloatingButtonText = () => {
    switch (currentScreen) {
      case "suppliers":
        return "Supplier";
      case "rfqs":
        return "RFQ";
      case "tasks":
        return "Task";
      case "contacts":
        return "Contact";
      case "marketplace":
        return "Search";
      default:
        return "Create";
    }
  };
  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            onScreenChange={setCurrentScreen}
            setShowAddSupplierModal={setShowAddSupplierModal}
            setShowCreateRFQModal={setShowCreateRFQModal}
          />
        );
      case "activity":
        return <ActivityScreen />;
      case "inbox":
        return <InboxScreen />;
      case "suppliers":
        return (
          <SuppliersScreen
            showAddSupplierModal={showAddSupplierModal}
            setShowAddSupplierModal={setShowAddSupplierModal}
            onViewSupplier={(supplier) => setSelectedSupplier(supplier)}
          />
        );
      case "rfqs":
        return (
          <RFQsScreen
            showCreateRFQModal={showCreateRFQModal}
            setShowCreateRFQModal={setShowCreateRFQModal}
          />
        );
      case "tasks":
        return (
          <ToDosScreen
            showCreateToDoModal={showCreateToDoModal}
            setShowCreateToDoModal={setShowCreateToDoModal}
          />
        );
      case "contacts":
        return <ContactsScreen />;
      case "marketplace":
        return <MarketplaceScreen />;
      case "team":
        return <TeamManagementScreen />;
      case "profile":
        return <ProfileScreen onBack={() => setCurrentScreen("home")} />;
      default:
        return (
          <HomeScreen
            onScreenChange={setCurrentScreen}
            setShowAddSupplierModal={setShowAddSupplierModal}
            setShowCreateRFQModal={setShowCreateRFQModal}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return <MobileLandingPage onLogin={() => setIsLoggedIn(true)} />;
  }

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <div className="max-w-md mx-auto bg-white min-h-screen relative">
  //       {/* Header */}
  //       <Header
  //         currentScreen={currentScreen}
  //         isLoggedIn={isLoggedIn}
  //       />

  //       {/* Main Content */}
  //       <div className="pb-20">
  //         {selectedSupplier ? (
  //           <SupplierDetailScreen
  //             supplier={selectedSupplier}
  //             onClose={() => setSelectedSupplier(null)}
  //             onAddContact={() => console.log('Add contact')}
  //             onRequestQuotation={() => console.log('Request quotation')}
  //             onRequestSample={() => console.log('Request sample')}
  //             onRequestMeeting={() => console.log('Request meeting')}
  //             onRequestDocument={() => console.log('Request document')}
  //             onSendMessage={() => console.log('Send message')}
  //           />
  //         ) : (
  //           renderScreen()
  //         )}
  //       </div>
  //       {/* Bottom Navigation */}
  //       {isLoggedIn && currentScreen !== 'contacts' && currentScreen !== 'profile' && (
  //         <BottomNavigation
  //           currentScreen={currentScreen}
  //           onScreenChange={setCurrentScreen}
  //           isLoggedIn={isLoggedIn}
  //         />
  //       )}

  //       {/* Floating Action Button */}
  //       {isLoggedIn && currentScreen !== 'marketplace' && (
  //         // Only show FAB if logged in and not on marketplace
  //         // Marketplace has its own search bar
  //         // Profile and Contacts don't have bottom nav, so FAB is not needed there either
  //         <FloatingActionButton
  //           onClick={handleFloatingButtonClick}
  //           text={getFloatingButtonText()}
  //         />
  //       )}

  //       {/* Create Menu Modal */}
  //       <CreateMenuModal
  //         // Only show CreateMenuModal if logged in
  //         isOpen={isCreateMenuOpen}
  //         onClose={() => setIsCreateMenuOpen(false)}
  //       />
  //     </div>
  //   </div>
  // );
}

function Workspace() {
  const [activeView, setActiveView] = useState("tasks");
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarVisible, setRightSidebarVisible] = useState(true);

  // const [enableSettings, setEnableSettings] = useState(false);

  const [mobileView, setMobileView] = useState(false);

  // Use a media query to handle mobile view responsively and update on resize
  useEffect(() => {
    const checkMobile = () => setMobileView(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (mobileView) {
    return <BuyerMobileView />;
  }
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <TopBar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          collapsed={leftSidebarCollapsed}
          onToggleCollapse={() =>
            setLeftSidebarCollapsed(!leftSidebarCollapsed)
          }
          activeView={activeView}
          onViewChange={setActiveView}
        />

        <CentralHub activeView={activeView} onViewChange={setActiveView} />

        {rightSidebarVisible && activeView === "tasks" && (
          <RightSidebar
            activeView={activeView}
            onClose={() => setRightSidebarVisible(false)}
          />
        )}

        {!rightSidebarVisible && activeView === "tasks" && (
          <button
            onClick={() => setRightSidebarVisible(true)}
            className="fixed right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l-lg shadow-lg hover:bg-gray-900 transition-colors z-40"
            title="Show Quick Actions"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Workspace;
