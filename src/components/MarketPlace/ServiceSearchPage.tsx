import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  ChevronDown,
  SlidersHorizontal,
  ArrowLeft,
  Clock,
  Users,
  Award,
  ChevronUp,
} from "lucide-react";

const ServiceSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    []
  );
  const [selectedProviderLocations, setSelectedProviderLocations] = useState<
    string[]
  >([]);
  const [selectedSustainability, setSelectedSustainability] = useState<
    string[]
  >([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Mock data
  const categories = [
    "HVAC Services",
    "Equipment Services",
    "Electrical Services",
    "Plumbing Services",
    "Cleaning Services",
  ];
  const subcategories = [
    "Maintenance & Repair",
    "Installation",
    "Emergency Services",
    "Consulting",
    "Training",
  ];
  const providerLocations = [
    "Dubai, UAE",
    "Abu Dhabi, UAE",
    "Sharjah, UAE",
    "Riyadh, Saudi Arabia",
    "Doha, Qatar",
  ];
  const sustainability = [
    "Eco-Friendly",
    "Green Certified",
    "Energy Efficient",
    "Sustainable Practices",
  ];
  const types = [
    "Emergency",
    "Scheduled",
    "Consultation",
    "Installation",
    "Maintenance",
  ];

  const mockServices = [
    {
      id: 1,
      providerId: "gulf-maintenance-services",
      name: "HVAC System Maintenance",
      category: "HVAC Services",
      description:
        "Complete heating, ventilation, and air conditioning maintenance",
      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      responseTime: "2-4 hours",
      availability: "24/7",
      certified: true,
      emergency: true,
      providedBy: {
        name: "Gulf Maintenance Services",
        location: "Dubai, UAE",
        logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
    },
    {
      id: 2,
      providerId: "gulf-maintenance-services",
      name: "Kitchen Equipment Repair",
      category: "Equipment Services",
      description: "Specialized repair for commercial kitchen equipment",
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      responseTime: "1-3 hours",
      availability: "Business Hours",
      certified: true,
      emergency: true,
      providedBy: {
        name: "Gulf Maintenance Services",
        location: "Dubai, UAE",
        logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
    },
    {
      id: 3,
      providerId: "green-clean-services",
      name: "Deep Cleaning Services",
      category: "Cleaning Services",
      description: "Professional deep cleaning for hotels and restaurants",
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      responseTime: "4-8 hours",
      availability: "24/7",
      certified: true,
      emergency: false,
      providedBy: {
        name: "Green Clean Services",
        location: "Abu Dhabi, UAE",
        logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
    },
    {
      id: 4,
      providerId: "tech-solutions-uae",
      name: "POS System Installation",
      category: "Technology Services",
      description: "Complete point-of-sale system installation",
      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      responseTime: "1-2 days",
      availability: "Business Hours",
      certified: true,
      emergency: false,
      providedBy: {
        name: "Tech Solutions UAE",
        location: "Dubai, UAE",
        logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      },
    },
  ];

  const toggleFilter = (filterName: string) => {
    setExpandedFilters((prev) =>
      prev.includes(filterName)
        ? prev.filter((name) => name !== filterName)
        : [...prev, filterName]
    );
  };

  const FilterGroup = ({
    title,
    items,
    selected,
    onChange,
    filterKey,
  }: {
    title: string;
    items: string[];
    selected: string[];
    onChange: (item: string) => void;
    filterKey: string;
  }) => {
    const isExpanded = expandedFilters.includes(filterKey);
    const displayItems = isExpanded ? items : items.slice(0, 5);
    const hasMore = items.length > 5;

    return (
      <div className="border-b border-gray-100 pb-3 mb-3 last:border-0">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="space-y-1">
          {displayItems.map((item) => (
            <label
              key={item}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={selected.includes(item)}
                onChange={() => onChange(item)}
                className="w-3 h-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-1"
              />
              <span className="text-xs text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                {item}
              </span>
            </label>
          ))}
        </div>
        {hasMore && (
          <button
            onClick={() => toggleFilter(filterKey)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 flex items-center space-x-1"
          >
            <span>{isExpanded ? "View Less" : "View More"}</span>
            {isExpanded ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </button>
        )}
      </div>
    );
  };

  const handleFilterChange = (
    item: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const ServiceCard = ({ service }: { service: any }) => (
    <Link
      to={`/provider/${service.providerId}`}
      className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group block"
    >
      <div className="relative overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-20 sm:h-24 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {service.emergency && (
          <div className="absolute top-1 right-1 bg-red-500 text-white px-1 py-0.5 rounded-full text-xs font-medium">
            Emergency
          </div>
        )}
      </div>

      <div className="p-2">
        <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1 truncate">
          {service.category}
        </p>

        <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
          {service.name}
        </h3>

        <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-tight">
          {service.description}
        </p>

        <div className="space-y-1 mb-2">
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500 truncate">
              Response: {service.responseTime}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500 truncate">
              {service.availability}
            </span>
          </div>
          {service.certified && (
            <div className="flex items-center space-x-1">
              <Award className="w-3 h-3 text-green-500" />
              <span className="text-xs text-green-600 truncate">Certified</span>
            </div>
          )}
        </div>

        {/* Provided By */}
        <div className="border-t border-gray-100 pt-2">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
            PROVIDED BY
          </p>
          <div className="flex items-center space-x-1">
            <img
              src={service.providedBy.logo}
              alt={service.providedBy.name}
              className="w-3 h-3 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-900 truncate">
                {service.providedBy.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {service.providedBy.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="text-xs">Back to Main</span>
            </Link>
            <h1 className="text-sm font-bold text-gray-900">Service Search</h1>
            <div className="w-16"></div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services..."
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
            />
          </div>
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center space-x-1 bg-white border border-gray-200 rounded-lg py-2 px-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="text-xs">Filters</span>
            </button>
          </div>

          {/* Left Sidebar - Filters */}
          <div
            className={`lg:col-span-1 ${
              showMobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="bg-white rounded-lg border border-gray-100 p-3 sticky top-20">
              <div className="flex items-center space-x-1 mb-3">
                <Filter className="w-3 h-3 text-blue-600" />
                <h2 className="text-xs font-bold text-gray-900">Filters</h2>
              </div>

              <div className="space-y-0">
                <FilterGroup
                  title="Category"
                  items={categories}
                  selected={selectedCategories}
                  onChange={(item) =>
                    handleFilterChange(item, setSelectedCategories)
                  }
                  filterKey="categories"
                />

                <FilterGroup
                  title="Sub Category"
                  items={subcategories}
                  selected={selectedSubcategories}
                  onChange={(item) =>
                    handleFilterChange(item, setSelectedSubcategories)
                  }
                  filterKey="subcategories"
                />

                <FilterGroup
                  title="Provider Location"
                  items={providerLocations}
                  selected={selectedProviderLocations}
                  onChange={(item) =>
                    handleFilterChange(item, setSelectedProviderLocations)
                  }
                  filterKey="providerLocations"
                />

                <FilterGroup
                  title="Sustainability"
                  items={sustainability}
                  selected={selectedSustainability}
                  onChange={(item) =>
                    handleFilterChange(item, setSelectedSustainability)
                  }
                  filterKey="sustainability"
                />

                <FilterGroup
                  title="Type"
                  items={types}
                  selected={selectedTypes}
                  onChange={(item) =>
                    handleFilterChange(item, setSelectedTypes)
                  }
                  filterKey="types"
                />
              </div>

              <button className="w-full mt-3 text-blue-600 hover:text-blue-700 text-xs font-medium">
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-3">
              <p className="text-xs text-gray-600">
                Showing{" "}
                <span className="font-medium">{mockServices.length}</span>{" "}
                services
                {searchQuery && (
                  <span>
                    {" "}
                    for "<span className="font-medium">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {mockServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs font-medium">
                Load More Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // function FilterGroup({ title, items, selected, onChange, filterKey }: {
  //   title: string;
  //   items: string[];
  //   selected: string[];
  //   onChange: (item: string) => void;
  //   filterKey: string;
  // }) {
  //   const isExpanded = expandedFilters.includes(filterKey);
  //   const displayItems = isExpanded ? items : items.slice(0, 5);
  //   const hasMore = items.length > 5;

  //   return (
  //     <div className="border-b border-gray-100 pb-3 mb-3 last:border-0">
  //       <h3 className="text-xs font-semibold text-gray-900 mb-2">{title}</h3>
  //       <div className="space-y-1">
  //         {displayItems.map((item) => (
  //           <label key={item} className="flex items-center space-x-2 cursor-pointer group">
  //             <input
  //               type="checkbox"
  //               checked={selected.includes(item)}
  //               onChange={() => onChange(item)}
  //               className="w-3 h-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-1"
  //             />
  //             <span className="text-xs text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
  //               {item}
  //             </span>
  //           </label>
  //         ))}
  //       </div>
  //       {hasMore && (
  //         <button
  //           onClick={() => toggleFilter(filterKey)}
  //           className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 flex items-center space-x-1"
  //         >
  //           <span>{isExpanded ? 'View Less' : 'View More'}</span>
  //           {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
  //         </button>
  //       )}
  //     </div>
  //   );
  // }

  // function handleFilterChange(
  //   item: string,
  //   setter: React.Dispatch<React.SetStateAction<string[]>>
  // ) {
  //   setter((prev) =>
  //     prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
  //   );
  // }
};

export default ServiceSearchPage;
