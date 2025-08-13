import React, { useState } from 'react';
import { Search, FileText, Users, CheckCircle, Store, Send, Eye, TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'sellers'>('sellers');

  const content = {
    sellers: {
      steps: [
        {
          icon: Store,
          title: 'Build Your Storefront',
          description: 'Create a professional online store, Highlight your strengths and showcase your products and services.',
          color: 'from-blue-500 to-indigo-600'
        },
        {
          icon: Send,
          title: 'Receive RFQ Matches',
          description: 'Get notified when buyers post RFQs that match your offerings. Our AI ensures you get most of the opportunities.',
          color: 'from-green-500 to-emerald-600'
        },
        {
          icon: Eye,
          title: 'Submit Proposals',
          description: 'Respond to RFQs by creating quotations quickly to stay ahead of the competitors including pricing and terms.',
          color: 'from-purple-500 to-violet-600'
        },
        {
          icon: TrendingUp,
          title: 'Grow Your Business',
          description: 'Win more contracts, expand your customer base, track your performance with advance analytics and insights.',
          color: 'from-orange-500 to-red-600'
        }
      ]
    }
  };

  const currentContent = content[activeTab];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            How It Works for Sellers
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
            Simple steps to start selling and grow your business
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {currentContent.steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < currentContent.steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 sm:top-16 left-full w-6 lg:w-8 h-0.5 bg-gray-300 transform translate-x-2 lg:translate-x-4 z-0"></div>
              )}
              
              <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 relative z-10">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${step.color} rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto`}>
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                
                <div className="text-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                    <span className="text-indigo-600 font-bold text-xs sm:text-sm lg:text-base">{index + 1}</span>
                  </div>
                  
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">{step.title}</h4>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none">
            <span className="font-semibold text-sm sm:text-base">Get Started Today</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;