import React, { useState } from 'react';
import { X, ExternalLink, Key, Settings, CheckCircle2 } from 'lucide-react';

interface IntegrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  integration: {
    name: string;
    icon: React.ReactNode;
    color: string;
  } | null;
}

const IntegrationModal: React.FC<IntegrationModalProps> = ({ isOpen, onClose, integration }) => {
  const [step, setStep] = useState<'connect' | 'configure' | 'success'>('connect');
  const [apiKey, setApiKey] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);

  if (!isOpen || !integration) return null;

  const handleConnect = () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setStep('configure');
    }, 2000);
  };

  const handleConfigure = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
      resetModal();
    }, 2000);
  };

  const resetModal = () => {
    setStep('connect');
    setApiKey('');
    setIsConnecting(false);
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  const getStepTitle = () => {
    switch (step) {
      case 'connect':
        return `Connect to ${integration.name}`;
      case 'configure':
        return 'Configure Integration';
      case 'success':
        return 'Integration Complete';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className={integration.color}>
              {integration.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{getStepTitle()}</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'connect' && (
            <div>
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4 ${integration.color}`}>
                  {integration.icon}
                </div>
                <p className="text-gray-600">
                  Connect your {integration.name} account to start importing data.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="Enter your API key"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <ExternalLink className="w-4 h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-blue-800 font-medium">Need help finding your API key?</p>
                      <p className="text-blue-600 mt-1">
                        Visit your {integration.name} settings to generate an API key.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnect}
                  disabled={!apiKey || isConnecting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isConnecting ? 'Connecting...' : 'Connect'}
                </button>
              </div>
            </div>
          )}

          {step === 'configure' && (
            <div>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Connected Successfully!</h3>
                <p className="text-gray-600">
                  Configure your import settings for {integration.name}.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Import Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>Manual</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Types
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Tasks & Projects</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Team Members</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="ml-2 text-sm text-gray-700">Comments & Notes</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setStep('connect')}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleConfigure}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Complete Setup
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Integration Complete!</h3>
              <p className="text-gray-500">
                {integration.name} has been successfully integrated and configured.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;