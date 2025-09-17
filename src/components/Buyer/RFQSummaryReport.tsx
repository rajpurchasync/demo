import React, { useState } from "react";
import { BarChart3, Download, Filter, ChevronDown, X } from "lucide-react";

interface RFQData {
  id: string;
  rfqNumber: string;
  rfqTitle: string;
  createdDate: string;
  sellerName: string;
  sellerLocation: {
    city: string;
    country: string;
  };
  buyerLocation: {
    city: string;
    country: string;
  };
  category: string;
  subCategory: string;
  rfqValue: string;
  quotationsReceived: number;
}

interface RFQSummaryReportProps {
  sidebarCollapsed: boolean;
}

const RFQSummaryReport: React.FC<RFQSummaryReportProps> = ({
  sidebarCollapsed,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    sellerName: "",
    dateFrom: "",
    dateTo: "",
    category: "",
    subCategory: "",
    country: "",
    locations: [] as string[],
  });

  const [rfqData] = useState<RFQData[]>([
    {
      id: "1",
      rfqNumber: "RFQ-2024-001",
      rfqTitle: "Office Equipment Procurement",
      createdDate: "2024-01-15",
      sellerName: "TechCorp Industries",
      sellerLocation: { city: "San Francisco", country: "USA" },
      buyerLocation: { city: "New York", country: "USA" },
      category: "Office Supplies",
      subCategory: "Furniture",
      rfqValue: "$45,000",
      quotationsReceived: 3,
    },
    {
      id: "2",
      rfqNumber: "RFQ-2024-002",
      rfqTitle: "IT Services Contract",
      createdDate: "2024-01-14",
      sellerName: "Global Supply Co.",
      sellerLocation: { city: "Austin", country: "USA" },
      buyerLocation: { city: "Chicago", country: "USA" },
      category: "Technology",
      subCategory: "Services",
      rfqValue: "$78,500",
      quotationsReceived: 2,
    },
    {
      id: "3",
      rfqNumber: "RFQ-2024-003",
      rfqTitle: "Marketing Campaign",
      createdDate: "2024-01-13",
      sellerName: "Innovation Partners",
      sellerLocation: { city: "Los Angeles", country: "USA" },
      buyerLocation: { city: "Miami", country: "USA" },
      category: "Services",
      subCategory: "Marketing",
      rfqValue: "$32,000",
      quotationsReceived: 1,
    },
    {
      id: "4",
      rfqNumber: "RFQ-2024-004",
      rfqTitle: "Manufacturing Materials",
      createdDate: "2024-01-12",
      sellerName: "Quality Components Inc.",
      sellerLocation: { city: "Detroit", country: "USA" },
      buyerLocation: { city: "Boston", country: "USA" },
      category: "Manufacturing",
      subCategory: "Raw Materials",
      rfqValue: "$125,000",
      quotationsReceived: 4,
    },
    {
      id: "5",
      rfqNumber: "RFQ-2024-005",
      rfqTitle: "Logistics Services",
      createdDate: "2024-01-11",
      sellerName: "Swift Logistics",
      sellerLocation: { city: "Seattle", country: "USA" },
      buyerLocation: { city: "Denver", country: "USA" },
      category: "Logistics",
      subCategory: "Shipping",
      rfqValue: "$67,200",
      quotationsReceived: 2,
    },
  ]);

  const categories = [
    "Office Supplies",
    "Technology",
    "Services",
    "Manufacturing",
    "Logistics",
  ];
  const subCategories: { [key: string]: string[] } = {
    "Office Supplies": ["Furniture", "Equipment", "Stationery"],
    Technology: ["Hardware", "Software", "Services"],
    Services: ["Marketing", "Consulting", "Support"],
    Manufacturing: ["Raw Materials", "Components", "Tools"],
    Logistics: ["Shipping", "Warehousing", "Transportation"],
  };

  const countries = [
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "India",
    "China",
    "Brazil",
  ];

  const locationsByCountry: { [key: string]: string[] } = {
    USA: [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
    ],
    Canada: [
      "Toronto",
      "Montreal",
      "Vancouver",
      "Calgary",
      "Edmonton",
      "Ottawa",
      "Winnipeg",
      "Quebec City",
    ],
    UK: [
      "London",
      "Manchester",
      "Birmingham",
      "Leeds",
      "Glasgow",
      "Liverpool",
      "Bristol",
      "Sheffield",
    ],
    Germany: [
      "Berlin",
      "Munich",
      "Hamburg",
      "Cologne",
      "Frankfurt",
      "Stuttgart",
      "Düsseldorf",
      "Dortmund",
    ],
    France: [
      "Paris",
      "Lyon",
      "Marseille",
      "Toulouse",
      "Nice",
      "Nantes",
      "Strasbourg",
      "Montpellier",
    ],
    Australia: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Gold Coast",
      "Newcastle",
      "Canberra",
    ],
    Japan: [
      "Tokyo",
      "Osaka",
      "Yokohama",
      "Nagoya",
      "Sapporo",
      "Fukuoka",
      "Kobe",
      "Kyoto",
    ],
    India: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Pune",
      "Ahmedabad",
    ],
    China: [
      "Beijing",
      "Shanghai",
      "Guangzhou",
      "Shenzhen",
      "Tianjin",
      "Wuhan",
      "Dongguan",
      "Chengdu",
    ],
    Brazil: [
      "São Paulo",
      "Rio de Janeiro",
      "Brasília",
      "Salvador",
      "Fortaleza",
      "Belo Horizonte",
      "Manaus",
      "Curitiba",
    ],
  };

  const handleExport = () => {
    setIsLoading(true);
    // Simulate export process
    setTimeout(() => {
      setIsLoading(false);
      // Simulate file download
      console.log("Exporting RFQ Summary Report...");
      alert("Report exported successfully! (Simulated)");
    }, 2000);
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    console.log("Applying filters:", filters);
  };

  const handleCountrySelect = (country: string) => {
    setFilters((prev) => ({
      ...prev,
      country,
      locations: [], // Reset locations when country changes
    }));
  };

  const handleLocationToggle = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, `${location}, ${prev.country}`],
    }));
  };

  const handleRemoveLocation = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.filter((l) => l !== location),
    }));
  };

  const clearFilters = () => {
    setFilters({
      sellerName: "",
      dateFrom: "",
      dateTo: "",
      category: "",
      subCategory: "",
      country: "",
      locations: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );

  return (
    <main
      className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "" : "lg:ml-60"}
      pb-8 min-h-screen bg-gray-50
    `}
    >
      {/* Header */}
      <div className="mb-8 mt-12 lg:mt-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <BarChart3 className="text-blue-600" size={28} />
              <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">
                RFQ Summary Report
              </h1>
            </div>
            <p className="text-gray-600">
              Generate and export RFQ data reports
            </p>
          </div>
          <button
            onClick={handleExport}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
            title="Download report with current filters applied"
          >
            <Download size={16} className="mr-2" />
            {isLoading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Report Filters</h2>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter size={16} className="mr-2" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Desktop Filters - Always Visible */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Seller Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Name
              </label>
              <input
                type="text"
                placeholder="Search seller..."
                value={filters.sellerName}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sellerName: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Date From */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Date To */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, dateTo: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    category: e.target.value,
                    subCategory: "",
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sub-Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-Category
              </label>
              <select
                value={filters.subCategory}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    subCategory: e.target.value,
                  }))
                }
                disabled={!filters.category}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100"
              >
                <option value="">All Sub-Categories</option>
                {filters.category &&
                  subCategories[filters.category]?.map((subCat) => (
                    <option key={subCat} value={subCat}>
                      {subCat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={filters.country}
                onChange={(e) => handleCountrySelect(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="">All Countries</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Multi-Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Locations
              </label>
              <div className="relative">
                <div className="w-full min-h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                  {filters.locations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {filters.locations.map((location) => (
                        <span
                          key={location}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {location}
                          <button
                            type="button"
                            onClick={() => handleRemoveLocation(location)}
                            className="ml-1 hover:text-blue-600"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  <select
                    onChange={(e) => {
                      if (
                        e.target.value &&
                        !filters.locations.includes(e.target.value)
                      ) {
                        handleLocationToggle(e.target.value);
                      }
                      e.target.value = "";
                    }}
                    disabled={!filters.country}
                    className="w-full border-0 focus:ring-0 text-sm disabled:bg-transparent"
                  >
                    <option value="">
                      {filters.country
                        ? "Select locations..."
                        : "Select country first"}
                    </option>
                    {filters.country &&
                      locationsByCountry[filters.country]
                        ?.filter(
                          (loc) =>
                            !filters.locations.includes(
                              `${loc}, ${filters.country}`
                            )
                        )
                        .map((location) => (
                          <option key={location} value={location}>
                            {location}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Apply Filters
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {rfqData.length} records found
            </p>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
            <div className="bg-white w-full max-h-[80vh] rounded-t-xl overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Report Filters
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown size={20} />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Seller Name
                  </label>
                  <input
                    type="text"
                    placeholder="Search seller..."
                    value={filters.sellerName}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        sellerName: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      From Date
                    </label>
                    <input
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          dateFrom: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      To Date
                    </label>
                    <input
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          dateTo: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.value,
                        subCategory: "",
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sub-Category
                  </label>
                  <select
                    value={filters.subCategory}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        subCategory: e.target.value,
                      }))
                    }
                    disabled={!filters.category}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                  >
                    <option value="">All Sub-Categories</option>
                    {filters.category &&
                      subCategories[filters.category]?.map((subCat) => (
                        <option key={subCat} value={subCat}>
                          {subCat}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={filters.country}
                    onChange={(e) => handleCountrySelect(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Countries</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Locations
                  </label>
                  <div className="relative">
                    <div className="w-full min-h-[40px] px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
                      {filters.locations.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {filters.locations.map((location) => (
                            <span
                              key={location}
                              className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {location}
                              <button
                                type="button"
                                onClick={() => handleRemoveLocation(location)}
                                className="ml-1 hover:text-blue-600"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                      <select
                        onChange={(e) => {
                          if (
                            e.target.value &&
                            !filters.locations.includes(
                              `${e.target.value}, ${filters.country}`
                            )
                          ) {
                            handleLocationToggle(e.target.value);
                          }
                          e.target.value = "";
                        }}
                        disabled={!filters.country}
                        className="w-full border-0 focus:ring-0 disabled:bg-transparent"
                      >
                        <option value="">
                          {filters.country
                            ? "Select locations..."
                            : "Select country first"}
                        </option>
                        {filters.country &&
                          locationsByCountry[filters.country]
                            ?.filter(
                              (loc) =>
                                !filters.locations.includes(
                                  `${loc}, ${filters.country}`
                                )
                            )
                            .map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 flex space-x-3">
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Excel-Style Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Mobile: Simple List */}
        <div className="lg:hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900">
              RFQ Data ({rfqData.length} records)
            </h3>
          </div>
          <div className="divide-y divide-gray-100">
            {rfqData.map((rfq) => (
              <div key={rfq.id} className="p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">
                      RFQ Number:
                    </span>
                    <span className="text-gray-900">{rfq.rfqNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Title:</span>
                    <span className="text-gray-900 text-right">
                      {rfq.rfqTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Date:</span>
                    <span className="text-gray-900">
                      {new Date(rfq.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Seller:</span>
                    <span className="text-gray-900 text-right">
                      {rfq.sellerName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Value:</span>
                    <span className="text-gray-900 font-semibold">
                      {rfq.rfqValue}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-600">Quotes:</span>
                    <span className="text-gray-900">
                      {rfq.quotationsReceived}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Excel-Style Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                  RFQ Number
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                  RFQ Title
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                  Created Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                  Seller Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                  Buyer Location
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                  Category
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r border-gray-200">
                  RFQ Value
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Quotations Received
                </th>
              </tr>
            </thead>
            <tbody>
              {rfqData.map((rfq, index) => (
                <tr
                  key={rfq.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-25"
                  }`}
                >
                  <td className="py-3 px-4 border-r border-gray-200 font-medium text-blue-600">
                    {rfq.rfqNumber}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-200 text-gray-900">
                    {rfq.rfqTitle}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-200 text-gray-900">
                    {new Date(rfq.createdDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-200 text-gray-900">
                    {rfq.sellerName}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-200 text-gray-900">
                    {rfq.buyerLocation.city}, {rfq.buyerLocation.country}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-200 text-gray-900">
                    {rfq.category} → {rfq.subCategory}
                  </td>
                  <td className="py-3 px-4 border-r border-gray-200 font-semibold text-gray-900">
                    {rfq.rfqValue}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-900">
                    {rfq.quotationsReceived}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="hidden lg:block p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Total Records: {rfqData.length}</span>
            <span>Last Updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RFQSummaryReport;
