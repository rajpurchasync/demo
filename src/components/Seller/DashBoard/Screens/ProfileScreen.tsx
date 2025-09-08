import React from 'react';
import { User, Building, MapPin, Settings, LogOut, ChevronRight, Package, Users, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { PersonalDetailsSection } from '../Profile/PersonalDetailsSection';
import { BusinessProfileSection } from '../Profile/BusinessProfileSection';
import { LocationsSection } from '../Profile/LocationsSection';
import { POSSection } from '../Profile/POSSection';
import { TargetCustomerSection } from '../Profile/TargetCustomerSection';
import { TeamManagementScreen as TeamManagementSection } from '../Screens/TeamManagementScreen';
import { SettingsSection } from '../Profile/SettingsSection';

export function ProfileScreen() {
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'personal',
      label: 'Personal Details',
      icon: User,
      description: 'Update your profile',
      component: PersonalDetailsSection
    },
    {
      id: 'business',
      label: 'Business Profile',
      icon: Building,
      description: 'Company information & settings',
      component: BusinessProfileSection
    },
    {
      id: 'locations',
      label: 'Locations',
      icon: MapPin,
      description: 'Manage office locations',
      component: LocationsSection
    },
    {
      id: 'pos',
      label: 'POS',
      icon: Package,
      description: 'Products & services catalog',
      component: POSSection
    },
    {
      id: 'target-customer',
      label: 'Target Customer',
      icon: Users,
      description: 'Define your target market',
      component: TargetCustomerSection
    },
    {
      id: 'team',
      label: 'Team',
      icon: UserPlus,
      description: 'Manage team members',
      component: TeamManagementSection
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'App preferences',
      component: SettingsSection
    }
  ];

  if (currentSection) {
    const selectedItem = menuItems.find(item => item.id === currentSection);
    const Component = selectedItem?.component;
    
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back Header */}
        <div className="bg-white border-b border-gray-100 px-3 py-2">
          <button
            onClick={() => setCurrentSection(null)}
            className="flex items-center text-xs text-purple-600 hover:text-purple-700"
          >
            <ChevronRight className="w-3 h-3 mr-1 rotate-180" />
            Back to Profile
          </button>
        </div>
        
        {Component && <Component />}
      </div>
    );
  }

  return (
    <div className="p-3 space-y-3">
      {/* User Info */}
      <div className="bg-white rounded-lg p-3 border border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <h2 className="text-xs font-semibold text-gray-900">Sarah Johnson</h2>
            <p className="text-xs text-gray-600">Procurement Manager</p>
            <p className="text-xs text-gray-500">Grand Hotel Dubai</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => item.component ? setCurrentSection(item.id) : console.log(`Navigate to ${item.id}`)}
              className="w-full bg-white border border-gray-100 rounded-lg p-2 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-gray-100 rounded">
                  <Icon className="w-3 h-3 text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-xs font-medium text-gray-900">{item.label}</h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-400" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={() => console.log('Logout')}
        className="w-full bg-white border border-red-100 rounded-lg p-2 flex items-center justify-center space-x-2 hover:bg-red-50 transition-colors text-red-600"
      >
        <LogOut className="w-3 h-3" />
        <span className="text-xs font-medium">Logout</span>
      </button>

      {/* App Info */}
      <div className="text-center text-gray-500 pt-1">
        <p className="text-xs">Purchasync v1.0.0</p>
        <p className="text-xs">© 2024 Purchasync. All rights reserved.</p>
      </div>
    </div>
  );
}