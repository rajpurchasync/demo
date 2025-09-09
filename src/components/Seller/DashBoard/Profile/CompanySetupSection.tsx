import React, { useState } from 'react';
import { Building, MapPin, Package } from 'lucide-react';
import { BusinessProfileSection } from './BusinessProfileSection';
import { LocationsSection } from './LocationsSection';
import { POSSection } from './POSSection';

export function CompanySetupSection() {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'Business Profile', icon: Building },
    { id: 'locations', label: 'Locations', icon: MapPin }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'business':
        return <BusinessProfileSection />;
      case 'locations':
        return <LocationsSection />;
      default:
        return <BusinessProfileSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-1 text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  );
}