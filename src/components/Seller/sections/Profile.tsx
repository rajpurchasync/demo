import React, { useState } from 'react';
import { User, Building } from 'lucide-react';
import MyProfile from './MyProfile';
import BusinessInfo from './BusinessInfo';

const Profile: React.FC = () => {
  const [activeSubSection, setActiveSubSection] = useState('my-profile');

  const renderContent = () => {
    switch (activeSubSection) {
      case 'my-profile':
        return <MyProfile />;
      case 'company-info':
        return <BusinessInfo />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Sub Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveSubSection('my-profile')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeSubSection === 'my-profile'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" />
            My Profile
          </button>
          <button
            onClick={() => setActiveSubSection('company-info')}
            className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeSubSection === 'company-info'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Building className="w-4 h-4 inline mr-2" />
            Company Info
          </button>
        </nav>
      </div>

      {/* Content */}
      {renderContent()}
    </div>
  );
};

export default Profile;