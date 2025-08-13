import React from "react";
import { FileText } from "lucide-react";

interface RFQListProps {
  sidebarCollapsed: boolean;
}

const RFQList: React.FC<RFQListProps> = ({ sidebarCollapsed }) => {
  return (
    <main
      className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}
      pt-4 lg:pt-8 px-4 lg:px-8 pb-8 min-h-screen bg-gray-50
    `}
    >
      {/* Header */}
      <div className="mb-8 mt-12 lg:mt-0">
        <div className="flex items-center space-x-3 mb-2">
          <FileText className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">
            RFQ List
          </h1>
        </div>
        <p className="text-gray-600">Manage your RFQ quotes and approvals</p>
      </div>

      {/* Coming Soon Message */}
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
        <FileText size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
        <p className="text-gray-600">
          RFQ List functionality is under development
        </p>
      </div>
    </main>
  );
};

export default RFQList;
