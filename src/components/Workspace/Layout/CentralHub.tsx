import React from 'react';
import TaskHub from '../Tasks/TaskHub';
import SuppliersHub from '../Suppliers/SuppliersHub';
import RFQsHub from '../RFQs/RFQsHub';
import InboxHub from '../Inbox/InboxHub';
import CalendarHub from '../Calendar/CalendarHub';
import ApprovalsHub from '../Approvals/ApprovalsHub';
import SuppliersManagement from '../../DesktopDashboard/SuppliersManagement';
import InboxManagement from '../../DesktopDashboard/InboxManagement';
import QuotationManagement from '../../Buyer/QuotationManagement';
import TasksPage from '../../DesktopDashboard/TasksPage';
import RFQApprovals from '../../Buyer/RFQApprovals';
import ContractManagement from '../../Buyer/ContractManagement';
import MessagesInterface from '../../Buyer/MessagesInterface';
import ContractTemplates from '../../Buyer/ContractTemplates';
import RFQTemplates from '../../Buyer/RFQTemplates';
import TeamManagement from '../../Buyer/TeamManagement';
import SamplesManagement from '../../Buyer/SamplesManagement';
import { KYCTemplateView } from '../../KYCTemplateView';
import NotificationsInterface from '../../Buyer/NotificationsInterface';
import { ContactsScreen } from '../../MobileDashboard/Screens/ContactsScreen';
import ProfileManagement from '../../Buyer/ProfileManagement';
import MyBusiness from '../../Buyer/MyBusiness';
import MyLocations from '../../Buyer/MyLocations';
import Membership from '../../Buyer/Membership';
import IntegrationMain from '../../Integrations/IntegrationMain';
import SecurityPrivacy from '../../Buyer/SecurityPrivacy';
// import SecurityManagement from '../../Buyer/SecurityManagement';
// import IntegrationsManagement from '../../Buyer/IntegrationsManagement';
// import MembershipsManagement from '../../Buyer/MembershipsManagement';

interface CentralHubProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const CentralHub: React.FC<CentralHubProps> = ({ activeView, onViewChange }) => {
  const tabs = [
    { id: 'tasks', label: 'Tasks', count: 12 },
    { id: 'rfqs', label: 'RFQs', count: 8 },
    { id: 'inbox', label: 'Inbox' },
    { id: 'calendar', label: 'Calendar' },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'tasks':
        return <TasksPage />;
      case 'suppliers':
        return <SuppliersManagement />;
      case 'rfqs':
        return <QuotationManagement sidebarCollapsed={true} />;
      case 'inbox':
        return <InboxManagement />;
      case 'calendar':
        return <CalendarHub />;
      case 'approvals':
        return <RFQApprovals sidebarCollapsed={true} />;
      case 'contacts':
        return <ContactsScreen />;
      case 'contracts':
        return <ContractManagement sidebarCollapsed={true} />;
      case 'messages':
        return <MessagesInterface sidebarCollapsed={true} />;
      case 'quotations':
        return <QuotationManagement sidebarCollapsed={true} />;
      case 'rfq-templates':
        return <RFQTemplates sidebarCollapsed={true} />;
      case 'contract-templates':
        return <ContractTemplates sidebarCollapsed={true} />;
      case 'contract-list':
        return <ContractManagement sidebarCollapsed={true} />;
      case 'rfq-approvals':
        return <RFQApprovals sidebarCollapsed={true} />;
      case 'team':
        return <TeamManagement sidebarCollapsed={true} />;
      case 'samples':
        return <SamplesManagement sidebarCollapsed={true} />;
      case 'kyc-templates':
        return <KYCTemplateView />;
      case 'notifications':
        return <NotificationsInterface sidebarCollapsed={true} />;
      case 'profile':
        return <ProfileManagement sidebarCollapsed={true} />;
      case 'business':
        return <MyBusiness sidebarCollapsed={true} />;
      case 'locations':
        return <MyLocations sidebarCollapsed={true} />;
      case 'team':
        return <TeamManagement sidebarCollapsed={true} />;
      case 'security':
        return <SecurityPrivacy sidebarCollapsed={true} />;
      case 'integrations':
        return <IntegrationMain />;
      case 'memberships':
        return <Membership />;
      default:
        return <TasksPage />;
    }
  };

  return (
    <div className="flex-1 bg-white flex flex-col">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onViewChange(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeView === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default CentralHub;