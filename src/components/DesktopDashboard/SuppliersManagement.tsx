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
  ]);

  const handleUpdateSupplier = (id: string, field: string, value: string) => {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === id ? { ...supplier, [field]: value } : supplier
      )
    );
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
      prev.length === suppliers.length ? [] : suppliers.map((s) => s.id)
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
  return (
    <div>
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddCompany={() => setIsAddCompanyModalOpen(true)}
        onMobileMenuToggle={() => setIsMobileMenuOpen(true)}
      />
      <FilterBar
        selectedCount={selectedSuppliers.length}
        onDeleteSelected={handleDeleteSelected}
        onLabelSelected={handleLabelSelected}
        onTagsSelected={handleTagsSelected}
      />
      <SuppliersTable
        suppliers={suppliers}
        onUpdateSupplier={handleUpdateSupplier}
        selectedSuppliers={selectedSuppliers}
        onToggleSelection={handleToggleSelection}
        onToggleSelectAll={handleToggleSelectAll}
        onCompanyClick={handleCompanyClick}
      />
      <AddCompanyModal
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
      />
    </div>
  );
};

export default SuppliersManagement;
