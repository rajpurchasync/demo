import React, { useState } from 'react';
import { 
  Bot, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle,
  Settings,
  Play,
  Pause,
  BarChart3,
  Zap,
  FileText,
  X,
  Plus
} from 'lucide-react';

const CSAI: React.FC = () => {
  const [customerServiceActive, setCustomerServiceActive] = useState(true);
  
  const [trainingData, setTrainingData] = useState({
    faqs: [{ question: '', answer: '' }],
    companyInfo: '',
    additionalInfo: ''
  });

  const aiStats = [
    { label: 'Conversations Handled', value: '1,234', change: '+18%', icon: MessageSquare },
    { label: 'Response Time', value: '2.3s', change: '-15%', icon: Clock },
    { label: 'Customer Satisfaction', value: '94%', change: '+5%', icon: Users },
    { label: 'Issues Resolved', value: '89%', change: '+12%', icon: CheckCircle }
  ];

  const addFAQ = () => {
    setTrainingData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFAQ = (index: number) => {
    setTrainingData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    setTrainingData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) => 
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  const handleSaveTrainingData = () => {
    console.log('Saving CS AI training data:', trainingData);
    alert('Training data saved successfully!');
  };

  const recentConversations = [
    {
      id: 1,
      customer: 'Hotel Paradise Resort',
      type: 'Customer Service',
      query: 'Question about bed linen delivery schedule',
      status: 'resolved',
      timestamp: '2 hours ago',
      aiConfidence: 95
    },
    {
      id: 2,
      customer: 'Restaurant ABC',
      type: 'Sales',
      query: 'Bulk pricing inquiry for coffee beans',
      status: 'in-progress',
      timestamp: '4 hours ago',
      aiConfidence: 87
    },
    {
      id: 3,
      customer: 'Cafe Central',
      type: 'Customer Service',
      query: 'Product quality concern',
      status: 'escalated',
      timestamp: '6 hours ago',
      aiConfidence: 72
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'escalated':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">CS AI</h1>
          <p className="text-sm text-gray-600 mt-1">AI-powered customer service and sales assistance</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
            <Settings className="w-4 h-4 inline mr-2" />
            Configure AI
          </button>
        </div>
      </div>

      {/* AI Status Cards */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Customer Service AI</h3>
                <p className="text-sm text-gray-600">Automated customer support</p>
              </div>
            </div>
            <button
              onClick={() => setCustomerServiceActive(!customerServiceActive)}
              className={`p-2 rounded-lg transition-colors ${
                customerServiceActive 
                  ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {customerServiceActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Status</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                customerServiceActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {customerServiceActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Conversations Today</span>
              <span className="font-semibold text-gray-900">47</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Avg Response Time</span>
              <span className="font-semibold text-gray-900">2.3s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {aiStats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-5 h-5 text-purple-600" />
              <span className={`text-xs font-medium ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent AI Conversations */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent AI Conversations</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {recentConversations.map((conversation) => (
            <div key={conversation.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{conversation.customer}</h4>
                      <p className="text-xs text-purple-600 font-medium">{conversation.type}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                      {conversation.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{conversation.query}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{conversation.timestamp}</span>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-3 h-3" />
                      <span className={`font-medium ${getConfidenceColor(conversation.aiConfidence)}`}>
                        {conversation.aiConfidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 sm:ml-4">
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors">
                    View Chat
                  </button>
                  {conversation.status === 'escalated' && (
                    <button className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-lg hover:bg-red-200 transition-colors">
                      Take Over
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Configuration */}
      <div className="space-y-6">
        {/* AI Training Data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Training Data</h3>
          
          <div className="space-y-6">
            {/* FAQ Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-gray-700">Frequently Asked Questions</h4>
                <button
                  onClick={addFAQ}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  + Add FAQ
                </button>
              </div>
              <div className="space-y-4">
                {trainingData.faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-medium text-gray-900">FAQ {index + 1}</h5>
                      {trainingData.faqs.length > 1 && (
                        <button
                          onClick={() => removeFAQ(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Question</label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                          placeholder="Enter frequently asked question"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Answer</label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                          rows={3}
                          placeholder="Enter the answer"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Company Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Information</label>
              <textarea
                value={trainingData.companyInfo}
                onChange={(e) => setTrainingData(prev => ({ ...prev, companyInfo: e.target.value }))}
                rows={6}
                placeholder="Enter detailed company information, policies, procedures, and other relevant details for AI training..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Additional Training Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Training Information</label>
              <textarea
                value={trainingData.additionalInfo}
                onChange={(e) => setTrainingData(prev => ({ ...prev, additionalInfo: e.target.value }))}
                rows={4}
                placeholder="Any additional information, guidelines, or context to help train the AI..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Upload Training Documents</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload documents for AI training</p>
                <p className="text-xs text-gray-500 mb-3">Supported formats: PDF, DOC, TXT</p>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Choose Files
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSaveTrainingData}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Save Training Data
            </button>
          </div>
        </div>
        
        {/* AI Configuration */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Configuration</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Response Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Auto-respond to common queries</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Escalate complex issues</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Send conversation summaries</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Performance Thresholds</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Minimum Confidence Level</label>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    defaultValue="75"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Max Response Time (seconds)</label>
                  <input
                    type="number"
                    defaultValue="5"
                    min="1"
                    max="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSAI;