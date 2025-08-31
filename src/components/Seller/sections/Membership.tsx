import React, { useState } from 'react';
import { 
  Crown, 
  Check, 
  X, 
  Star, 
  Zap, 
  Shield, 
  Users,
  Package,
  BarChart3,
  Headphones,
  Globe,
  CreditCard
} from 'lucide-react';

const Membership: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        'Basic product listing',
        'Up to 10 products',
        'Basic customer management',
        'Email support',
        'Standard templates'
      ],
      limitations: [
        'No online store customization',
        'No AI features',
        'Limited analytics',
        'No priority support'
      ],
      buttonText: 'Current Plan',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: { monthly: 49, yearly: 490 },
      description: 'Best for growing businesses',
      features: [
        'Everything in Free',
        'Unlimited products',
        'Advanced customer management',
        'CS AI assistant',
        'Custom online store',
        'Advanced analytics',
        'Priority email support',
        'Custom branding'
      ],
      limitations: [],
      buttonText: 'Upgrade to Professional',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: { monthly: 149, yearly: 1490 },
      description: 'For large-scale operations',
      features: [
        'Everything in Professional',
        'Multi-location support',
        'Advanced AI training',
        'White-label solutions',
        'Dedicated account manager',
        'Phone support',
        'Custom integrations',
        'Advanced security features'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const currentPlanData = plans.find(plan => plan.id === currentPlan);

  const handleUpgrade = (planId: string) => {
    console.log(`Upgrading to ${planId} plan`);
    // This would typically redirect to a payment page
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Membership</h1>
        <p className="text-gray-600 mt-1">Choose the plan that fits your business needs</p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Current Plan: {currentPlanData?.name}</h3>
              <p className="text-sm text-gray-600">{currentPlanData?.description}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">
              ${currentPlanData?.price[billingCycle as keyof typeof currentPlanData.price]}
              <span className="text-sm font-normal text-gray-500">
                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
            {currentPlan !== 'free' && (
              <p className="text-xs text-gray-500">Next billing: Feb 18, 2024</p>
            )}
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <span className={`text-sm ${billingCycle === 'monthly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm ${billingCycle === 'yearly' ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
          Yearly
        </span>
        {billingCycle === 'yearly' && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
            Save 17%
          </span>
        )}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-lg border-2 p-6 ${
              plan.popular 
                ? 'border-purple-500 shadow-lg' 
                : currentPlan === plan.id
                ? 'border-green-500'
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            
            {currentPlan === plan.id && (
              <div className="absolute -top-3 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Current
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price[billingCycle as keyof typeof plan.price]}
                </span>
                <span className="text-gray-500">
                  /{billingCycle === 'monthly' ? 'month' : 'year'}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Features included:</h4>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {plan.limitations.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Limitations:</h4>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              onClick={() => handleUpgrade(plan.id)}
              disabled={currentPlan === plan.id}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                currentPlan === plan.id
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : plan.popular
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {currentPlan === plan.id ? 'Current Plan' : plan.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Usage & Billing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Usage</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Products Listed</span>
                <span className="text-sm font-medium text-gray-900">24 / {currentPlan === 'free' ? '10' : '∞'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: currentPlan === 'free' ? '100%' : '24%' }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">AI Conversations</span>
                <span className="text-sm font-medium text-gray-900">1,234 / {currentPlan === 'free' ? '100' : '∞'}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: currentPlan === 'free' ? '100%' : '45%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Payment Method</span>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">•••• 4242</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Next Billing Date</span>
              <span className="text-sm text-gray-900">February 18, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Billing Address</span>
              <span className="text-sm text-gray-900">New York, NY</span>
            </div>
          </div>
          <div className="mt-4">
            <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Update Billing Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;