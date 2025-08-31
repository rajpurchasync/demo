import React from 'react';
import { useState } from 'react';
import { Package, Menu, Bell } from 'lucide-react';
import { HamburgerMenu } from './HamburgerMenu';

export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <>
      <div className="sticky top-0 bg-white border-b border-gray-100 z-10 shadow-sm px-4 py-3 flex items-center justify-between">
        {/* Left - Hamburger Menu */}
        <button 
          onClick={() => setShowMenu(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        
        {/* Center - Logo */}
        <div className="flex items-center space-x-2">
          <Package className="w-6 h-6 text-indigo-600" />
          <h1 className="text-lg font-bold text-gray-800 tracking-tight">Purchasync</h1>
        </div>
        
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
      />
    </>
  );
}