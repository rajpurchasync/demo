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
import { SupplierDetailScreen } from "./Screens/SupplierDetailScreen";
import { RequestSampleModal } from "./Modals/RequestSampleModal";
import { RequestMeetingModal } from "./Modals/RequestMeetingModal";
import { RequestDocumentModal } from "./Modals/RequestDocumentModal";
import { SendMessageModal } from "./Modals/SendMessageModal";
import { Supplier } from "./types/purchasync";

type Screen =
  | "home"
  | "suppliers"
  | "rfqs"
  | "todos"
  | "profile"
  | "team"
  | "supplierDetail";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [showAddSupplierModal, setShowAddSupplierModal] = useState(false);
  const [showCreateRFQModal, setShowCreateRFQModal] = useState(false);
  const [showCreateToDoModal, setShowCreateToDoModal] = useState(false);
  const [showRequestSampleModal, setShowRequestSampleModal] = useState(false);
  const [showRequestMeetingModal, setShowRequestMeetingModal] = useState(false);
  const [showRequestDocumentModal, setShowRequestDocumentModal] =
    useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

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

  const handleViewSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setCurrentScreen("supplierDetail");
  };

  const handleCloseSupplierDetail = () => {
    setSelectedSupplier(null);
    setCurrentScreen("suppliers");
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
            onViewSupplier={handleViewSupplier}
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
      case "supplierDetail":
        return selectedSupplier ? (
          <SupplierDetailScreen
            supplier={selectedSupplier}
            onClose={handleCloseSupplierDetail}
            onAddContact={() => setShowAddSupplierModal(true)}
            onRequestQuotation={() => setShowCreateRFQModal(true)}
            onRequestSample={() => setShowRequestSampleModal(true)}
            onRequestMeeting={() => setShowRequestMeetingModal(true)}
            onRequestDocument={() => setShowRequestDocumentModal(true)}
            onSendMessage={() => setShowSendMessageModal(true)}
          />
        ) : null;
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
        {currentScreen !== "supplierDetail" && <Header />}

        {/* Main Content */}
        <div className={currentScreen !== "supplierDetail" ? "pb-20" : ""}>
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        {currentScreen !== "supplierDetail" && (
          <BottomNavigation
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
          />
        )}

        {/* Floating Action Button */}
        {currentScreen !== "supplierDetail" && (
          <FloatingActionButton onClick={handleFloatingButtonClick} />
        )}

        {/* Create Menu Modal */}
        <CreateMenuModal
          isOpen={isCreateMenuOpen}
          onClose={() => setIsCreateMenuOpen(false)}
        />

        {/* New Action Modals */}
        <RequestSampleModal
          isOpen={showRequestSampleModal}
          onClose={() => setShowRequestSampleModal(false)}
          supplierName={selectedSupplier?.name || ""}
        />

        <RequestMeetingModal
          isOpen={showRequestMeetingModal}
          onClose={() => setShowRequestMeetingModal(false)}
          supplierName={selectedSupplier?.name || ""}
        />

        <RequestDocumentModal
          isOpen={showRequestDocumentModal}
          onClose={() => setShowRequestDocumentModal(false)}
          supplierName={selectedSupplier?.name || ""}
        />

        <SendMessageModal
          isOpen={showSendMessageModal}
          onClose={() => setShowSendMessageModal(false)}
          supplierName={selectedSupplier?.name || ""}
        />
      </div>
    </div>
  );
}

export default App;
