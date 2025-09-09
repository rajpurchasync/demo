import React, { useState } from "react";
import {
  Building,
  MapPin,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  ChevronDown,
} from "lucide-react";
import CompanyDetailsForm from "./CompanyDetailsForm";
import LocationForm from "./LocationForm";

interface Location {
  id: string;
  type: "Office" | "Operation";
  businessUnit: string;
  country: string;
  state: string;
  city: string;
  streetAddress: string;
  address2?: string;
}

interface CompanyDetails {
  companyName: string;
  publicName: string;
  businessType: string;
  hotelType?: string[];
  partOfHotelGroup?: boolean;
  hotelGroup?: string;
  hotelBrand?: string[];
  restaurantType?: string[];
  partOfRestaurantChain?: boolean;
  chainGroup?: string;
  businessUnits?: number;
}

interface MyBusinessProps {
  sidebarCollapsed: boolean;
  // activeView: string;
}

const MyBusiness: React.FC<MyBusinessProps> = ({ sidebarCollapsed }) => {
  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);
  const [isLocationFormOpen, setIsLocationFormOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [countryFilter, setCountryFilter] = useState("");

  const [locations, setLocations] = useState<Location[]>([
    {
      id: "1",
      type: "Office",
      businessUnit: "Headquarters",
      country: "United States",
      state: "California",
      city: "San Francisco",
      streetAddress: "123 Business St",
      address2: "Suite 100",
    },
    {
      id: "2",
      type: "Operation",
      businessUnit: "East Coast Operations",
      country: "United States",
      state: "New York",
      city: "New York",
      streetAddress: "456 Operations Ave",
    },
  ]);

  // Get unique countries for filter
  const uniqueCountries = Array.from(
    new Set(locations.map((loc) => loc.country))
  ).sort();

  // Filter locations by country
  const filteredLocations = countryFilter
    ? locations.filter((loc) => loc.country === countryFilter)
    : locations;

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: "TechCorp Industries Inc.",
    publicName: "TechCorp",
    businessType: "Hotel",
    hotelType: ["4 Star", "Boutique Hotel"],
    partOfHotelGroup: true,
    hotelGroup: "Luxury Hotels International",
    hotelBrand: ["TechCorp Hotels", "Premium Stay"],
  });

  const handleSaveCompany = (details: CompanyDetails) => {
    setCompanyDetails(details);
    setIsCompanyFormOpen(false);
  };

  const handleSaveLocation = (location: Omit<Location, "id">) => {
    if (editingLocation) {
      setLocations((prev) =>
        prev.map((loc) =>
          loc.id === editingLocation.id
            ? { ...location, id: editingLocation.id }
            : loc
        )
      );
      setEditingLocation(null);
    } else {
      const newLocation: Location = {
        ...location,
        id: Date.now().toString(),
      };
      setLocations((prev) => [...prev, newLocation]);
    }
    setIsLocationFormOpen(false);
  };

  const handleEditLocation = (location: Location) => {
    setEditingLocation(location);
    setIsLocationFormOpen(true);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  const handleAddLocation = () => {
    setEditingLocation(null);
    setIsLocationFormOpen(true);
  };

  return (
    <main className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 py-3  lg:py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
            </div> */}
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              My Business
            </h1>
          </div>
        </div>
      </div>

      {/* Company Details Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm m-3">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Company Details</h2>
          <button
            onClick={() => setIsCompanyFormOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit size={16} className="mr-2" />
            <span className="font-medium">Edit Details</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Company Name
            </label>
            <p className="text-gray-900 font-medium">
              {companyDetails.companyName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Public Name
            </label>
            <p className="text-gray-900 font-medium">
              {companyDetails.publicName}
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Business Type
            </label>
            <p className="text-gray-900 font-medium">
              {companyDetails.businessType}
            </p>
          </div>

          {/* Conditional Display */}
          {companyDetails.businessType === "Hotel" && (
            <>
              {companyDetails.hotelType && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Hotel Type
                  </label>
                  <p className="text-gray-900 font-medium">
                    {companyDetails.hotelType.join(", ")}
                  </p>
                </div>
              )}
              {companyDetails.partOfHotelGroup && companyDetails.hotelGroup && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Hotel Group
                  </label>
                  <p className="text-gray-900 font-medium">
                    {companyDetails.hotelGroup}
                  </p>
                </div>
              )}
              {companyDetails.hotelBrand && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Hotel Brand
                  </label>
                  <p className="text-gray-900 font-medium">
                    {companyDetails.hotelBrand.join(", ")}
                  </p>
                </div>
              )}
            </>
          )}

          {companyDetails.businessType === "Restaurant" && (
            <>
              {companyDetails.restaurantType && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Restaurant Type
                  </label>
                  <p className="text-gray-900 font-medium">
                    {companyDetails.restaurantType.join(", ")}
                  </p>
                </div>
              )}
              {companyDetails.partOfRestaurantChain &&
                companyDetails.chainGroup && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Chain Group
                    </label>
                    <p className="text-gray-900 font-medium">
                      {companyDetails.chainGroup}
                    </p>
                  </div>
                )}
              {companyDetails.businessUnits && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Business Units
                  </label>
                  <p className="text-gray-900 font-medium">
                    {companyDetails.businessUnits}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Floating Add Button (Mobile) */}
      <button
        onClick={handleAddLocation}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center z-40"
      >
        <Plus size={24} />
      </button>

      {/* Company Details Form */}
      <CompanyDetailsForm
        isOpen={isCompanyFormOpen}
        onClose={() => setIsCompanyFormOpen(false)}
        onSave={handleSaveCompany}
        initialData={companyDetails}
      />
    </main>
  );
};

export default MyBusiness;
