import React, { useState } from 'react';
import { Bell, Mail, MessageSquare, Calendar, Shield } from 'lucide-react';

export function SettingsSection() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    rfqUpdates: true,
    supplierMessages: true,
    taskReminders: true,
    weeklyReports: false,
    securityAlerts: true
  });

  const handleToggle = (setting: string) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const notificationSettings = [
    {
      id: 'pushNotifications',
      label: 'Push Notifications',
      description: 'Receive push notifications on your device',
      icon: Bell
    },
    {
      id: 'emailNotifications',
      label: 'Email Notifications',
      description: 'Receive notifications via email',
      icon: Mail
    },
    {
      id: 'smsNotifications',
      label: 'SMS Notifications',
      description: 'Receive notifications via SMS',
      icon: MessageSquare
    }
  ];

  const activitySettings = [
    {
      id: 'rfqUpdates',
      label: 'RFQ Updates',
      description: 'Notifications for RFQ responses and updates',
      icon: Calendar
    },
    {
      id: 'supplierMessages',
      label: 'Supplier Messages',
      description: 'Messages from suppliers and vendors',
      icon: MessageSquare
    },
    {
      id: 'taskReminders',
      label: 'Task Reminders',
      description: 'Reminders for due tasks and deadlines',
      icon: Calendar
    },
    {
      id: 'weeklyReports',
      label: 'Weekly Reports',
      description: 'Weekly summary of your procurement activities',
      icon: Mail
    },
    {
      id: 'securityAlerts',
      label: 'Security Alerts',
      description: 'Important security and account notifications',
      icon: Shield
    }
  ];

  return (
    <div className="p-3 space-y-4">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">Settings</h2>

      {/* General Notifications */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Notifications</h3>
        {notificationSettings.map((setting) => {
          const Icon = setting.icon;
          return (
            <div key={setting.id} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded">
              <div className="flex items-center space-x-2">
                <Icon className="w-3 h-3 text-gray-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900">{setting.label}</p>
                  <p className="text-xs text-gray-500">{setting.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[setting.id]}
                  onChange={() => handleToggle(setting.id)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          );
        })}
      </div>

      {/* Activity Notifications */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wide">Activity</h3>
        {activitySettings.map((setting) => {
          const Icon = setting.icon;
          return (
            <div key={setting.id} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded">
              <div className="flex items-center space-x-2">
                <Icon className="w-3 h-3 text-gray-500" />
                <div>
                  <p className="text-xs font-medium text-gray-900">{setting.label}</p>
                  <p className="text-xs text-gray-500">{setting.description}</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings[setting.id]}
                  onChange={() => handleToggle(setting.id)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <div className="pt-3 border-t border-gray-200">
        <button className="w-full px-3 py-2 bg-purple-600 text-white text-xs font-medium rounded hover:bg-purple-700 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}