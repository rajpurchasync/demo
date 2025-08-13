import React, { useState, useMemo } from "react";
import { Search, Filter, Eye, Check, X, FileText } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { RejectModal } from "./RejectModal";
import type { RFQ, RFQStatus, Proposal } from "../types";

interface SellerDashboardProps {
  rfqs: RFQ[];
  onRFQStatusUpdate: (
    rfqId: string,
    status: RFQStatus,
    comment?: string
  ) => void;
  onPreviewRFQ: (rfq: RFQ) => void;
  onViewRFQ: (rfq: RFQ) => void;
  onViewProposal: (proposal: Proposal) => void;
}

// Mock proposals for demonstration
const mockProposals: Proposal[] = [
  {
    id: "PROP001",
    rfqId: "RFQ003",
    status: "submitted",
    currency: "USD",
    paymentTerms: "Monthly",
    shipmentMethod: "Direct Delivery",
    shipmentCharge: 0,
    includeShipment: false,
    items: [],
    subtotal: 15000,
    totalDiscounts: 500,
    totalVAT: 1450,
    finalTotal: 15950,
    createdDate: "2024-12-16",
    submittedDate: "2024-12-16",
    quotationValidityDate: "2025-01-15",
    termsAndConditions: "Standard terms apply",
    additionalBenefits: "Volume discount available",
  },
];

export function SellerDashboard({
  rfqs,
  onRFQStatusUpdate,
  onPreviewRFQ,
  onViewRFQ,
  onViewProposal,
}: SellerDashboardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RFQStatus>("all");
  const [rejectingRFQ, setRejectingRFQ] = useState<RFQ | null>(null);

  const filteredRFQs = useMemo(() => {
    return rfqs.filter((rfq) => {
      const matchesSearch =
        rfq.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfq.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || rfq.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [rfqs, searchTerm, statusFilter]);

  const handleReject = (rfq: RFQ) => {
    setRejectingRFQ(rfq);
  };

  const handleRejectConfirm = (comment: string) => {
    if (rejectingRFQ) {
      onRFQStatusUpdate(rejectingRFQ.id, "rejected", comment);
      setRejectingRFQ(null);
    }
  };

  const getProposalForRFQ = (rfqId: string) => {
    return mockProposals.find((p) => p.rfqId === rfqId);
  };

  return (
    <div className="p-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by RFQ number or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as "all" | RFQStatus)
                }
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="submitted">Submitted</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  RFQ Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Buyer Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Purchase Details
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Delivery Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Proposal
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRFQs.map((rfq) => {
                const proposal = getProposalForRFQ(rfq.id);
                return (
                  <tr
                    key={rfq.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {rfq.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {rfq.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium text-gray-900">
                          {rfq.customer?.businessType || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {rfq.customer?.location?.split(",").pop()?.trim() ||
                            "Location TBD"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium text-gray-900">
                          {rfq.items.length} items
                        </p>
                        <p className="text-xs text-gray-500">
                          {rfq.paymentTerms}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={rfq.status} />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div>
                        <p className="font-medium text-gray-900">
                          {new Date(rfq.deliveryDate).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">Required by</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {proposal ? (
                        <div className="flex items-center gap-2">
                          <StatusBadge
                            status={proposal.status}
                            type="proposal"
                          />
                          <button
                            onClick={() => onViewProposal(proposal)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">
                          No proposal
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {rfq.status === "new" && (
                          <>
                            <button
                              onClick={() => onPreviewRFQ(rfq)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                            >
                              <Check className="w-4 h-4" />
                              Accept
                            </button>
                            <button
                              onClick={() => handleReject(rfq)}
                              className="inline-flex items-center gap-1 px-2 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {rfq.status === "accepted" && (
                          <button
                            onClick={() => onViewRFQ(rfq)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View RFQ
                          </button>
                        )}
                        {(rfq.status === "rejected" ||
                          rfq.status === "submitted") && (
                          <button
                            onClick={() => onViewRFQ(rfq)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRFQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No RFQs found matching your criteria.
            </p>
          </div>
        )}
      </div>

      {rejectingRFQ && (
        <RejectModal
          rfq={rejectingRFQ}
          onConfirm={handleRejectConfirm}
          onCancel={() => setRejectingRFQ(null)}
        />
      )}
    </div>
  );
}
