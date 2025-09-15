import React, { useState } from "react";
import { Header } from "./Layout/Header";
import { BottomNavigation } from "./Layout/BottomNavigation";
import { FloatingActionButton } from "./UI/FloatingActionButton";
import { CreateMenuModal } from "./Modals/CreateMenuModal";
import { HomeScreen } from "./Screens/HomeScreen";
import { SuppliersScreen } from "./Screens/SuppliersScreen";
import { RFQsScreen } from "./Screens/RFQsScreen";
import { ToDosScreen } from "./Screens/ToDosScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { TeamManagementScreen } from "./Screens/TeamManagementScreen";
import { MarketplaceScreen } from "./Screens/MarketplaceScreen";
import { ContactsScreen } from "./Screens/ContactsScreen";
import { Supplier } from "./types/purchasync";
import { MobileLandingPage } from "./Screens/MobileLandingPage";
import { ActivityScreen } from "./Screens/ActivityScreen";
import { SupplierDetailScreen } from "./Screens/SupplierDetailScreen";
import { InboxScreen } from "./Screens/InboxScreen";

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

function MobileDashboardBuyer() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false to show landing page initially
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {/* Header */}
        <Header currentScreen={currentScreen} isLoggedIn={isLoggedIn} />

        {/* Main Content */}
        <div className="pb-20">
          {selectedSupplier ? (
            <SupplierDetailScreen
              supplier={selectedSupplier}
              onClose={() => setSelectedSupplier(null)}
              onAddContact={() => console.log("Add contact")}
              onRequestQuotation={() => console.log("Request quotation")}
              onRequestSample={() => console.log("Request sample")}
              onRequestMeeting={() => console.log("Request meeting")}
              onRequestDocument={() => console.log("Request document")}
              onSendMessage={() => console.log("Send message")}
            />
          ) : (
            renderScreen()
          )}
        </div>
        {/* Bottom Navigation */}
        {isLoggedIn &&
          currentScreen !== "contacts" &&
          currentScreen !== "profile" && (
            <BottomNavigation
              currentScreen={currentScreen}
              onScreenChange={setCurrentScreen}
              isLoggedIn={isLoggedIn}
            />
          )}

        {/* Floating Action Button */}
        {isLoggedIn && currentScreen !== "marketplace" && (
          // Only show FAB if logged in and not on marketplace
          // Marketplace has its own search bar
          // Profile and Contacts don't have bottom nav, so FAB is not needed there either
          <FloatingActionButton
            onClick={handleFloatingButtonClick}
            text={getFloatingButtonText()}
          />
        )}

        {/* Create Menu Modal */}
        <CreateMenuModal
          // Only show CreateMenuModal if logged in
          isOpen={isCreateMenuOpen}
          onClose={() => setIsCreateMenuOpen(false)}
        />
      </div>
    </div>
  );
}

export default MobileDashboardBuyer;
