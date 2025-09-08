import React, { useState, useEffect } from "react";
import { RFQ } from "./types/rfq";
import { mockRFQs } from "./data/rfqData";
import RFQListingScreen from "./RFQ/RFQListingScreen";
import RFQDetailView from "./RFQ/RFQDetailView";
import LoadingSpinner from "./RFQ/LoadingSpinner";

function App({ sidebarCollapsed }: any) {
  const [currentView, setCurrentView] = useState<"listing" | "detail">(
    "listing"
  );
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleRFQSelect = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setCurrentView("detail");
  };

  const handleBackToListing = () => {
    setCurrentView("listing");
    setSelectedRFQ(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}
      pb-8 min-h-screen bg-gray-50 rounded-[12px] overflow-hidden
    `}
    >
      {currentView === "listing" && (
        <RFQListingScreen rfqs={mockRFQs} onRFQSelect={handleRFQSelect} />
      )}

      {currentView === "detail" && selectedRFQ && (
        <RFQDetailView rfq={selectedRFQ} onBack={handleBackToListing} />
      )}
    </div>
  );
}

export default App;
