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

type Screen = "home" | "suppliers" | "rfqs" | "todos" | "profile" | "team";

function MobileDashboardBuyer() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showCreateRFQModal, setShowCreateRFQModal] = useState(false);
  const [showCreateToDoModal, setShowCreateToDoModal] = useState(false);

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
      case "todos":
        setShowCreateToDoModal(true);
        break;
      default:
        setIsCreateMenuOpen(true);
    }
  };

  const renderScreen = () => {
    if (currentScreen === "profile") {
      return <ProfileScreen />;
    }

    switch (currentScreen) {
      case "home":
        return (
          <HomeScreen
            onScreenChange={setCurrentScreen}
            setShowAddSupplierModal={setShowAddSupplierModal}
            setShowCreateRFQModal={setShowCreateRFQModal}
          />
        );
      case "suppliers":
        return (
          <SuppliersScreen
            showAddSupplierModal={showAddSupplierModal}
            setShowAddSupplierModal={setShowAddSupplierModal}
          />
        );
      case "rfqs":
        return (
          <RFQsScreen
            showCreateRFQModal={showCreateRFQModal}
            setShowCreateRFQModal={setShowCreateRFQModal}
          />
        );
      case "todos":
        return (
          <ToDosScreen
            showCreateToDoModal={showCreateToDoModal}
            setShowCreateToDoModal={setShowCreateToDoModal}
          />
        );
      case "team":
        return <TeamManagementScreen />;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div className="pb-20">{renderScreen()}</div>

        {/* Bottom Navigation */}
        <BottomNavigation
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
        />

        {/* Floating Action Button */}
        <FloatingActionButton onClick={handleFloatingButtonClick} />

        {/* Create Menu Modal */}
        <CreateMenuModal
          isOpen={isCreateMenuOpen}
          onClose={() => setIsCreateMenuOpen(false)}
        />
      </div>
    </div>
  );
}

export default MobileDashboardBuyer;
