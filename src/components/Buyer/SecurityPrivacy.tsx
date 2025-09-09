import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Save,
  Shield,
  Check,
  X,
  Edit,
  Bell,
} from "lucide-react";

import PasswordResetForm from "./PasswordResetForm";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";

interface ProfileManagementProps {
  sidebarCollapsed: boolean;
}

const SecurityPrivacy: React.FC<ProfileManagementProps> = ({
  sidebarCollapsed,
}) => {
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordReset = () => {
    setIsPasswordFormOpen(false);
    showSuccess("Password updated successfully!");
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  const [editModes, setEditModes] = useState({
    profile: false,
    business: false,
    locations: false,
    security: false,
  });
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    notifications: true,
    emailNotifications: true,
  });

  const [securityEditData, setSecurityEditData] = useState({
    ...securitySettings,
  });

  return (
    <main
      className={`
     bg-white
    `}
    >
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <Check size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4 py-3  lg:py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
            </div> */}
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Security & Privacy
            </h1>
          </div>
        </div>
      </div>
      {/* <div className="mb-8 mt-12 lg:mt-0">
        <div className="flex items-center space-x-3 mb-2">
          <User className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">
            My Profile
          </h1>
        </div>
        <p className="text-gray-600">
          Manage your personal information and account settings
        </p>
      </div> */}
      <div className="px-4 grid grid-cols-1 lg:grid-cols-2 gap-4 mx-auto mt-6">
        <div className="space-y-4">
          <h3 className="font-medium">Update Password</h3>
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-3">
              {/* <div className="flex items-center space-x-2">
                <Lock size={16} className="text-green-600" />
                <span className="font-medium text-gray-900">Password</span>
              </div> */}
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                Secure
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Last updated 30 days ago
            </p>
            <button
              onClick={() => setIsPasswordFormOpen(true)}
              className="w-full flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <Lock size={16} className="mr-2" />
              Change Password
            </button>
          </div>

          {/* Security Tips */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-gray-900 mb-2">Security Tips</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use a strong, unique password</li>
              <li>• Enable two-factor authentication</li>
              <li>• Review login activity regularly</li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="font-medium">Notification Settings</h3>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive notifications in the app
                </p>
              </div>
            </div>
            <Switch
              checked={securityEditData.notifications}
              onCheckedChange={(checked) =>
                setSecurityEditData({
                  ...securityEditData,
                  notifications: checked,
                })
              }
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
            </div>
            <Switch
              checked={securityEditData.emailNotifications}
              onCheckedChange={(checked) =>
                setSecurityEditData({
                  ...securityEditData,
                  emailNotifications: checked,
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Password Reset Form */}
      <PasswordResetForm
        isOpen={isPasswordFormOpen}
        onClose={() => setIsPasswordFormOpen(false)}
        onSave={handlePasswordReset}
      />

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default SecurityPrivacy;
