import React from 'react';
import { User, Building, MapPin, Settings, LogOut, ChevronRight, Package, Users, UserPlus, Award } from 'lucide-react';
import { useState } from 'react';
import { PersonalDetailsSection } from '../Profile/PersonalDetailsSection';
import { CompanySetupSection } from '../Profile/CompanySetupSection';
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
      id: 'company-setup',
      label: 'Company Profile',
      icon: Building,
      description: 'Business profile & locations',
      component: CompanySetupSection
    },
    {
      id: 'products',
      label: 'Product / Category',
      icon: Package,
      description: 'Manage products and services',
      component: null // Will be created separately
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
      id: 'membership',
      label: 'Membership',
      icon: Award,
      description: 'Subscription & benefits',
      component: null
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
      <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-900">Sarah Johnson</h2>
            <p className="text-xs text-gray-600 font-medium">Procurement Manager</p>
            <p className="text-xs text-gray-500">Grand Hotel Dubai</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => item.component ? setCurrentSection(item.id) : console.log(`Navigate to ${item.id}`)}
              className="w-full flex items-center p-4 hover:bg-purple-50 rounded-xl transition-all duration-200 text-left group border border-gray-100 hover:border-purple-200 hover:shadow-sm"
            >
              <div className="flex items-center space-x-3 flex-1">
                <div className="p-3 rounded-xl bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-purple-700">{item.label}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <button
        onClick={() => console.log('Logout')}
        className="w-full bg-white border border-red-200 rounded-xl p-4 flex items-center justify-center space-x-2 hover:bg-red-50 transition-colors text-red-600 shadow-sm hover:shadow-md"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium">Logout</span>
      </button>

      {/* App Info */}
      <div className="text-center text-gray-400 pt-2">
        <p className="text-xs">Purchasync v1.0.0</p>
        <p className="text-xs">© 2024 Purchasync. All rights reserved.</p>
      </div>
    </div>
  );
}