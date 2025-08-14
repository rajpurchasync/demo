import React, { useState } from "react";
import { FileText, Package, Settings, FolderOpen } from "lucide-react";
import RFQWizard from "./RFQWizard";

const RFQCreationFlow: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);
  const [rfqType, setRfqType] = useState<
    "product" | "service" | "project" | null
  >(null);

  const handleRfqTypeSelection = (type: "product" | "service" | "project") => {
    setRfqType(type);
    setShowWizard(true);
  };

  if (showWizard) {
    return (
      <RFQWizard
        initialData={{ rfqType }}
        onBack={() => setShowWizard(false)}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-start md:items-center py-[80px] md:py-4 justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Request for Quote
          </h1>
          <p className="text-gray-600">
            Create a new RFQ or use a saved template
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleRfqTypeSelection("product")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
          >
            <Package className="w-5 h-5" />
            <span>Product</span>
          </button>

          <button
            onClick={() => handleRfqTypeSelection("service")}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <Settings className="w-5 h-5" />
            <span>Services</span>
          </button>

          <button
            onClick={() => handleRfqTypeSelection("project")}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-green-300 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <FolderOpen className="w-5 h-5" />
            <span>Projects</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RFQCreationFlow;
