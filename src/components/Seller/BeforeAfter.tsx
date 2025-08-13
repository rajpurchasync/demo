import React from 'react';

const BeforeAfter = () => {
  return (
    <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
      <div className="text-center mb-8 sm:mb-12">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Transforming Hospitality Commerce
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto px-4">
          See how our platform revolutionizes the way hotels and suppliers connect and do business
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
        {/* Before Section */}
        <div className="relative">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-red-100">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <span className="text-white font-bold text-sm sm:text-base">❌</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-red-700">Before Our Platform</h4>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {[
                'Manual RFQ processes taking weeks',
                'Limited supplier visibility',
                'Fragmented communication channels',
                'Time-consuming price comparisons',
                'Inefficient procurement workflows'
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-red-200 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-red-600 text-xs">✗</span>
                  </div>
                  <span className="text-sm sm:text-base text-red-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* After Section */}
        <div className="relative">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-green-100">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <span className="text-white font-bold text-sm sm:text-base">✅</span>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-green-700">With Our Platform</h4>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {[
                'Instant RFQ matching in minutes',
                'Access to verified global suppliers',
                'Unified communication dashboard',
                'AI-powered price optimization',
                'Streamlined automated workflows'
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-sm sm:text-base text-green-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Success Badge */}
          <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg sm:text-xl">🚀</span>
          </div>
        </div>
      </div>

      {/* Results Stats */}
      <div className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {[
          { value: '85%', label: 'Faster Procurement' },
          { value: '60%', label: 'Cost Reduction' },
          { value: '95%', label: 'Supplier Satisfaction' },
          { value: '24/7', label: 'Platform Availability' }
        ].map((stat, index) => (
          <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
              {stat.value}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeforeAfter;