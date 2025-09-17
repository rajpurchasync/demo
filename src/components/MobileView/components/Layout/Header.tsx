import React from 'react';
import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { HamburgerMenu } from './HamburgerMenu';

interface HeaderProps {
  currentScreen: string;
  isLoggedIn: boolean;
}

export function Header({ currentScreen, isLoggedIn }: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Home';
      case 'activity':
        return 'Activity';
      case 'suppliers':
        return 'Suppliers';
      case 'rfqs':
        return 'RFQs';
      case 'tasks':
        return 'Tasks';
      case 'contacts':
        return 'Contacts';
      case 'marketplace':
        return 'Marketplace';
      case 'profile':
        return 'Profile';
      default:
        return 'Home';
    }
  };

  if (!isLoggedIn) {
    return null; // Don't render header if not logged in (landing page)
  }

  return (
    <>
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10 shadow-sm px-4 py-2 flex items-center justify-between">
        {/* Left - Hamburger Menu */}
        <button 
          onClick={() => setShowMenu(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Center - Page Title */}
        <h1 className="text-base font-bold text-gray-800 tracking-tight">{getPageTitle()}</h1>
        
        {/* Right - Notifications */}
        <button 
          onClick={() => setShowNotifications(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>
      </div>
      
      {/* Hamburger Menu */}
      <HamburgerMenu 
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onNavigate={(screen) => {
          // This will be handled by App.tsx
          window.dispatchEvent(new CustomEvent('navigate', { detail: screen }));
        }}
        onLogout={() => window.dispatchEvent(new CustomEvent('logout'))} // Dispatch custom event for logout
      />
    </>
  );
}