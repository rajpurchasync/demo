import React, { useState } from "react";
import { SellerDashboard } from "./SellerDashboard";
import { RFQDetail } from "./RFQDetail";
import { ProposalCreation } from "./ProposalCreation";
import { ProposalView } from "./ProposalView";
import type { RFQ, RFQStatus, Proposal } from "../types";

// Mock data for demonstration
const mockRFQs: RFQ[] = [
  {
    id: "RFQ001",
    title: "Office Supplies Q1 2025",
    status: "new" as RFQStatus,
    createdDate: "2024-12-15",
    purchaseType: "Standard",
    paymentTerms: "Net 30",
    deliveryDate: "2025-01-15",
    deadline: "2024-12-25",
    buyerComments:
      "Looking for competitive pricing on bulk office supplies including paper, pens, and desk accessories.",
    customer: {
      name: "Grand Plaza Hotel",
      businessType: "Hotel",
      location: "New York, NY",
      billingAddress: "123 Business Ave, New York, NY 10001",
      shippingAddress: "123 Business Ave, New York, NY 10001",
    },
    attachments: [
      { id: "att1", name: "specifications.pdf", type: "pdf" },
      { id: "att2", name: "requirements.xlsx", type: "excel" },
    ],
    items: [
      {
        id: "item1",
        productName: "A4 Copy Paper",
        quantity: 500,
        uom: "Reams",
      },
      {
        id: "item2",
        productName: "Blue Ballpoint Pens",
        quantity: 1000,
        uom: "Pieces",
      },
    ],
  },
  {
    id: "RFQ002",
    title: "IT Equipment Procurement",
    status: "accepted" as RFQStatus,
    createdDate: "2024-12-10",
    purchaseType: "Urgent",
    paymentTerms: "Net 15",
    deliveryDate: "2025-01-05",
    deadline: "2024-12-20",
    buyerComments:
      "Need high-quality laptops and monitors for new office setup.",
    customer: {
      name: "Bella Vista Restaurant",
      businessType: "Restaurant",
      location: "Los Angeles, CA",
      billingAddress: "456 Restaurant Row, Los Angeles, CA 90028",
      shippingAddress: "456 Restaurant Row, Los Angeles, CA 90028",
    },
    attachments: [{ id: "att3", name: "tech_specs.pdf", type: "pdf" }],
    items: [
      {
        id: "item3",
        productName: "Business Laptop",
        quantity: 25,
        uom: "Units",
      },
      { id: "item4", productName: '24" Monitor', quantity: 25, uom: "Units" },
    ],
  },
  {
    id: "RFQ003",
    title: "Catering Services Annual Contract",
    status: "submitted" as RFQStatus,
    createdDate: "2024-12-08",
    purchaseType: "Service",
    paymentTerms: "Monthly",
    deliveryDate: "2025-01-01",
    deadline: "2024-12-22",
    buyerComments:
      "Seeking reliable catering partner for office events and daily lunch services.",
    customer: {
      name: "Corporate Center",
      businessType: "Office Complex",
      location: "Chicago, IL",
      billingAddress: "789 Corporate Blvd, Chicago, IL 60601",
      shippingAddress: "789 Corporate Blvd, Chicago, IL 60601",
    },
    attachments: [],
    items: [
      {
        id: "item5",
        productName: "Daily Lunch Service",
        quantity: 250,
        uom: "Days",
      },
      {
        id: "item6",
        productName: "Event Catering",
        quantity: 12,
        uom: "Events",
      },
    ],
  },
];

function MainRFQ() {
  const [currentView, setCurrentView] = useState<
    | "dashboard"
    | "rfq-preview"
    | "rfq-detail"
    | "proposal-creation"
    | "proposal-view"
  >("dashboard");
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(
    null
  );
  const [rfqs, setRFQs] = useState<RFQ[]>(mockRFQs);

  const handleRFQStatusUpdate = (
    rfqId: string,
    newStatus: RFQStatus,
    comment?: string,
    quotationValidityDate?: string
  ) => {
    setRFQs((prev) =>
      prev.map((rfq) =>
        rfq.id === rfqId
          ? {
              ...rfq,
              status: newStatus,
              rejectionComment: comment,
              quotationValidityDate,
            }
          : rfq
      )
    );
  };

  const handlePreviewRFQ = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setCurrentView("rfq-preview");
  };

  const handleViewRFQ = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setCurrentView("rfq-detail");
  };

  const handleCreateProposal = (rfq: RFQ) => {
    setSelectedRFQ(rfq);
    setCurrentView("proposal-creation");
  };

  const handleViewProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setCurrentView("proposal-view");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedRFQ(null);
    setSelectedProposal(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "rfq-preview":
        return selectedRFQ ? (
          <RFQPreview
            rfq={selectedRFQ}
            onBack={handleBackToDashboard}
            onAccept={(quotationValidityDate) => {
              handleRFQStatusUpdate(
                selectedRFQ.id,
                "accepted",
                undefined,
                quotationValidityDate
              );
              setCurrentView("rfq-detail");
            }}
            onReject={(comment) => {
              handleRFQStatusUpdate(selectedRFQ.id, "rejected", comment);
              handleBackToDashboard();
            }}
          />
        ) : null;
      case "rfq-detail":
        return selectedRFQ ? (
          <RFQDetail
            rfq={selectedRFQ}
            onBack={handleBackToDashboard}
            onCreateProposal={() => handleCreateProposal(selectedRFQ)}
            onStatusUpdate={handleRFQStatusUpdate}
          />
        ) : null;
      case "proposal-creation":
        return selectedRFQ ? (
          <ProposalCreation
            rfq={selectedRFQ}
            onBack={handleBackToDashboard}
            onSubmit={handleBackToDashboard}
          />
        ) : null;
      case "proposal-view":
        return selectedProposal ? (
          <ProposalView
            proposal={selectedProposal}
            onBack={handleBackToDashboard}
          />
        ) : null;
      default:
        return (
          <SellerDashboard
            rfqs={rfqs}
            onRFQStatusUpdate={handleRFQStatusUpdate}
            onPreviewRFQ={handlePreviewRFQ}
            onViewRFQ={handleViewRFQ}
            onViewProposal={handleViewProposal}
          />
        );
    }
  };

  return <div className="min-h-screen bg-gray-50">{renderCurrentView()}</div>;
}

export default MainRFQ;
