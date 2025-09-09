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

const Integrations: React.FC<MyBusinessProps> = ({ sidebarCollapsed }) => {
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
              Integrations
            </h1>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Integrations;
