import React, { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import SuppliersTable from "./SuppliersTable";
import CompanyDetailView from "./CompanyDetailView";
import AddCompanyModal from "./AddCompanyModal";

interface Supplier {
  id: string;
  companyName: string;
  type: string;
  category: string;
  label: "Credit" | "Approved" | "Prospective";
  tags: string[];
  country: string;
  state: string;
  city: string;
}

const SuppliersManagement = () => {
  const [activeSection, setActiveSection] = useState("suppliers");
  const [activeTab, setActiveTab] = useState("suppliers");
  const [activeSupplierTab, setActiveSupplierTab] = useState<
    "all" | "credit" | "approved" | "prospect"
  >("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Supplier | null>(null);
  const [isCompanyDetailOpen, setIsCompanyDetailOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      companyName: "Purchasync",
      type: "Technology",
      category: "Software",
      label: "Approved",
      tags: ["Software", "B2B"],
      country: "United States",
      state: "California",
      city: "San Francisco",
    },
    {
      id: "2",
      companyName: "Global Supply Co.",
      type: "Manufacturing",
      category: "Components",
      label: "Credit",
      tags: ["Manufacturing", "B2B"],
      country: "United States",
      state: "New York",
      city: "New York",
    },
    {
      id: "3",
      companyName: "Innovation Partners",
      type: "Service Provider",
      category: "Consulting",
      label: "Prospective",
      tags: ["Services", "Consulting"],
      country: "United States",
      state: "Texas",
      city: "Austin",
    },
  ]);

  // Filter suppliers based on active supplier tab
  const getFilteredSuppliersByTab = () => {
    switch (activeSupplierTab) {
      case "credit":
        return suppliers.filter((s) => s.label === "Credit");
      case "approved":
        return suppliers.filter((s) => s.label === "Approved");
      case "prospect":
        return suppliers.filter((s) => s.label === "Prospective");
      default:
        return suppliers;
    }
  };

  const filteredSuppliers = getFilteredSuppliersByTab();

  const handleUpdateSupplier = (
    id: string,
    updatedFields: Partial<Supplier>
  ) => {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === id ? { ...supplier, ...updatedFields } : supplier
      )
    );
    // Optionally show a success message here
  };

  const handleToggleSelection = (id: string) => {
    setSelectedSuppliers((prev) =>
      prev.includes(id)
        ? prev.filter((supplierId) => supplierId !== id)
        : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    setSelectedSuppliers((prev) =>
      prev.length === filteredSuppliers.length
        ? []
        : filteredSuppliers.map((s) => s.id)
    );
  };

  const handleDeleteSelected = () => {
    setSuppliers((prev) =>
      prev.filter((supplier) => !selectedSuppliers.includes(supplier.id))
    );
    setSelectedSuppliers([]);
  };

  const handleCompanyClick = (supplier: Supplier) => {
    setSelectedCompany(supplier);
    setIsCompanyDetailOpen(true);
  };

  const handleLabelSelected = () => {
    // Dummy implementation - would open label assignment modal
    console.log("Assign label to selected suppliers:", selectedSuppliers);
  };

  const handleTagsSelected = () => {
    // Dummy implementation - would open tags assignment modal
    console.log("Assign tags to selected suppliers:", selectedSuppliers);
  };

  const supplierTabCounts = {
    all: suppliers.length,
    credit: suppliers.filter((s) => s.label === "Credit").length,
    approved: suppliers.filter((s) => s.label === "Approved").length,
    prospect: suppliers.filter((s) => s.label === "Prospective").length,
  };

  return (
    <div>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddCompany={() => setIsAddCompanyModalOpen(true)}
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
      />

      {/* Supplier Filter Tabs */}
      <div className="flex justify-between bg-white border-b border-gray-200">
        <div className="flex space-x-8 px-6">
          {[
            { id: "all", label: "All", count: supplierTabCounts.all },
            { id: "credit", label: "Credit", count: supplierTabCounts.credit },
            {
              id: "approved",
              label: "Approved",
              count: supplierTabCounts.approved,
            },
            {
              id: "prospect",
              label: "New Prospect",
              count: supplierTabCounts.prospect,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSupplierTab(tab.id as any)}
              className={`py-1 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeSupplierTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span
                  className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    activeSupplierTab === tab.id
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
        <FilterBar
          selectedCount={selectedSuppliers.length}
          onDeleteSelected={handleDeleteSelected}
          onLabelSelected={handleLabelSelected}
          onTagsSelected={handleTagsSelected}
        />
      </div>

      <SuppliersTable
        suppliers={filteredSuppliers}
        onUpdateSupplier={handleUpdateSupplier}
        selectedSuppliers={selectedSuppliers}
        onToggleSelection={handleToggleSelection}
        onToggleSelectAll={handleToggleSelectAll}
        onCompanyClick={handleCompanyClick}
      />
      <AddCompanyModal // This modal is for adding new companies, not editing existing ones
        isOpen={isAddCompanyModalOpen}
        onClose={() => setIsAddCompanyModalOpen(false)}
        onAddSupplier={(supplier) =>
          setSuppliers((prev) => [...prev, supplier])
        }
      />

      {/* Company Detail View */}
      <CompanyDetailView
        isOpen={isCompanyDetailOpen}
        onClose={() => setIsCompanyDetailOpen(false)}
        company={selectedCompany}
        onUpdateSupplier={handleUpdateSupplier}
      />
    </div>
  );
};

export default SuppliersManagement;
