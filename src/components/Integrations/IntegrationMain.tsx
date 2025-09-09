import React, { useState } from "react";
import UploadModal from "./UploadModal";
import ExportModal from "./ExportModal";
import IntegrationModal from "./IntegrationModal";
import {
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  Users,
  Calendar,
  Building,
  Zap,
  CheckSquare,
  ShoppingCart,
  Package,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: "tasks" | "docs" | "contacts" | "catalog";
  color: string;
}

const integrations: Integration[] = [
  // Local file options
  {
    id: "spreadsheet",
    name: "Spreadsheet",
    icon: <FileSpreadsheet className="w-5 h-5" />,
    category: "tasks",
    color: "text-gray-600",
  },
  {
    id: "document",
    name: "Document",
    icon: <FileText className="w-5 h-5" />,
    category: "docs",
    color: "text-gray-600",
  },

  // App integrations
  {
    id: "trello",
    name: "Trello",
    icon: <CheckCircle2 className="w-5 h-5" />,
    category: "tasks",
    color: "text-blue-500",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    icon: <Building className="w-5 h-5" />,
    category: "contacts",
    color: "text-orange-600",
  },
  {
    id: "jira",
    name: "Jira",
    icon: <CheckSquare className="w-5 h-5" />,
    category: "tasks",
    color: "text-blue-600",
  },
  {
    id: "notion",
    name: "Notion",
    icon: <FileText className="w-5 h-5" />,
    category: "tasks",
    color: "text-gray-800",
  },
  {
    id: "monday",
    name: "Monday.com",
    icon: <Calendar className="w-5 h-5" />,
    category: "tasks",
    color: "text-purple-600",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    icon: <Zap className="w-5 h-5" />,
    category: "contacts",
    color: "text-blue-500",
  },
  {
    id: "shopify",
    name: "Shopify",
    icon: <ShoppingCart className="w-5 h-5" />,
    category: "catalog",
    color: "text-green-600",
  },
  {
    id: "woocommerce",
    name: "WooCommerce",
    icon: <Package className="w-5 h-5" />,
    category: "catalog",
    color: "text-purple-500",
  },
  {
    id: "sap-ariba",
    name: "SAP Ariba",
    icon: <Building className="w-5 h-5" />,
    category: "contacts",
    color: "text-blue-700",
  },
];

function IntegrationMain() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(
    null
  );
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"spreadsheet" | "document">(
    "spreadsheet"
  );
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [integrationModalOpen, setIntegrationModalOpen] = useState(false);
  const [selectedIntegrationData, setSelectedIntegrationData] = useState<{
    name: string;
    icon: React.ReactNode;
    color: string;
  } | null>(null);

  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration.id);

    if (integration.id === "spreadsheet") {
      setUploadType("spreadsheet");
      setUploadModalOpen(true);
    } else if (integration.id === "document") {
      setUploadType("document");
      setUploadModalOpen(true);
    } else {
      // For all other integrations, show the integration modal
      setSelectedIntegrationData({
        name: integration.name,
        icon: integration.icon,
        color: integration.color,
      });
      setIntegrationModalOpen(true);
    }
  };

  const handleExportClick = () => {
    setExportModalOpen(true);
  };

  const getCategoryTag = (category: string) => {
    switch (category) {
      case "tasks":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
            Tasks
          </span>
        );
      case "docs":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-100 text-purple-800">
            Docs
          </span>
        );
      case "contacts":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800">
            Contacts
          </span>
        );
      case "catalog":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800">
            Catalog
          </span>
        );
      default:
        return null;
    }
  };

  const localFileIntegrations = integrations.slice(0, 2);
  const appIntegrations = integrations.slice(2);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              IMPORT
            </p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">
              Select source of import
            </h1>
          </div>
          <button
            onClick={handleExportClick}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Export instead
          </button>
        </div>

        {/* Import from local files */}
        <div className="mb-12">
          <h2 className="text-lg font-medium text-gray-500 mb-4">
            Import from local files
          </h2>
          <div className="space-y-2">
            {localFileIntegrations.map((integration) => (
              <div
                key={integration.id}
                onClick={() => handleIntegrationClick(integration)}
                className={`group relative flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md hover:border-gray-300 cursor-pointer transition-all duration-200 ${
                  selectedIntegration === integration.id
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`${integration.color} group-hover:scale-110 transition-transform duration-200`}
                  >
                    {integration.icon}
                  </div>
                  <span className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {integration.name}
                  </span>
                </div>
                <div className="flex items-center">
                  {getCategoryTag(integration.category)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Import from apps */}
        <div>
          <h2 className="text-lg font-medium text-gray-500 mb-4">
            Import from apps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {appIntegrations.map((integration) => (
              <div
                key={integration.id}
                onClick={() => handleIntegrationClick(integration)}
                className={`group relative flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md hover:border-gray-300 cursor-pointer transition-all duration-200 ${
                  selectedIntegration === integration.id
                    ? "ring-2 ring-blue-500 border-blue-500"
                    : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`${integration.color} group-hover:scale-110 transition-transform duration-200`}
                  >
                    {integration.icon}
                  </div>
                  <span className="text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {integration.name}
                  </span>
                </div>
                <div className="flex items-center">
                  {getCategoryTag(integration.category)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected integration feedback */}
        {selectedIntegration && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              Selected:{" "}
              <span className="font-medium">
                {integrations.find((i) => i.id === selectedIntegration)?.name}
              </span>
            </p>
          </div>
        )}

        {/* Modals */}
        <UploadModal
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          type={uploadType}
        />

        <ExportModal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
        />

        <IntegrationModal
          isOpen={integrationModalOpen}
          onClose={() => setIntegrationModalOpen(false)}
          integration={selectedIntegrationData}
        />
      </div>
    </div>
  );
}

export default IntegrationMain;
