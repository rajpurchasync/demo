import React, { useState } from "react";
import { Header } from "./Layout/Header";
import { BottomNavigation } from "./Layout/BottomNavigation";
import { FloatingActionButton } from "./UI/FloatingActionButton";
import { HomeScreen } from "./Screens/HomeScreen";
import { CustomersScreen } from "./Screens/CustomersScreen";
import { RFQsScreen } from "./Screens/RFQsScreen";
import { ToDosScreen } from "./Screens/ToDosScreen";
import { ProfileScreen } from "./Screens/ProfileScreen";
import { TeamManagementScreen } from "./Screens/TeamManagementScreen";
import { CustomerDetailScreen } from "./Screens/CustomerDetailScreen";
import { RequestSampleModal } from "./Modals/RequestSampleModal";
import { RequestMeetingModal } from "./Modals/RequestMeetingModal";
import { RequestDocumentModal } from "./Modals/RequestDocumentModal";
import { SendMessageModal } from "./Modals/SendMessageModal";
import { Customer } from "./types/purchasync";

type Screen =
  | "home"
  | "customers"
  | "rfqs"
  | "todos"
  | "profile"
  | "team"
  | "customerDetail";

function MobileDashboardSeller() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showCreateRFQModal, setShowCreateRFQModal] = useState(false);
  const [showCreateToDoModal, setShowCreateToDoModal] = useState(false);
  const [showRequestSampleModal, setShowRequestSampleModal] = useState(false);
  const [showRequestMeetingModal, setShowRequestMeetingModal] = useState(false);
  const [showRequestDocumentModal, setShowRequestDocumentModal] =
    useState(false);
  const [showSendMessageModal, setShowSendMessageModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const handleFloatingButtonClick = () => {
    switch (currentScreen) {
      case "customers":
        setShowAddCustomerModal(true);
        break;
      case "todos":
        setShowCreateToDoModal(true);
        break;
      default:
        setShowCreateToDoModal(true);
    }
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setCurrentScreen("customerDetail");
  };

  const handleCloseCustomerDetail = () => {
    setSelectedCustomer(null);
    setCurrentScreen("customers");
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
            setShowAddCustomerModal={setShowAddCustomerModal}
            setShowCreateRFQModal={setShowCreateRFQModal}
          />
        );
      case "customers":
        return (
          <CustomersScreen
            showAddCustomerModal={showAddCustomerModal}
            setShowAddCustomerModal={setShowAddCustomerModal}
            onViewCustomer={handleViewCustomer}
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
      case "customerDetail":
        return selectedCustomer ? (
          <CustomerDetailScreen
            customer={selectedCustomer}
            onClose={handleCloseCustomerDetail}
            onAddContact={() => setShowAddCustomerModal(true)}
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
            setShowAddCustomerModal={setShowAddCustomerModal}
            setShowCreateRFQModal={setShowCreateRFQModal}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        {/* Header */}
        {currentScreen !== "customerDetail" && <Header />}

        {/* Main Content */}
        <div className={currentScreen !== "customerDetail" ? "pb-20" : ""}>
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        {currentScreen !== "customerDetail" && (
          <BottomNavigation
            currentScreen={currentScreen}
            onScreenChange={setCurrentScreen}
          />
        )}

        {/* Floating Action Button */}
        {currentScreen !== "customerDetail" && (
          <FloatingActionButton onClick={handleFloatingButtonClick} />
        )}

        {/* New Action Modals */}
        <RequestSampleModal
          isOpen={showRequestSampleModal}
          onClose={() => setShowRequestSampleModal(false)}
          customerName={selectedCustomer?.name || ""}
        />

        <RequestMeetingModal
          isOpen={showRequestMeetingModal}
          onClose={() => setShowRequestMeetingModal(false)}
          customerName={selectedCustomer?.name || ""}
        />

        <RequestDocumentModal
          isOpen={showRequestDocumentModal}
          onClose={() => setShowRequestDocumentModal(false)}
          customerName={selectedCustomer?.name || ""}
        />

        <SendMessageModal
          isOpen={showSendMessageModal}
          onClose={() => setShowSendMessageModal(false)}
          customerName={selectedCustomer?.name || ""}
        />
      </div>
    </div>
  );
}

export default MobileDashboardSeller;
