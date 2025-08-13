import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Users, Globe } from 'lucide-react';

interface HeroProps {
  onStartSelling: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartSelling }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-indigo-200/25 to-pink-200/25 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 md:mb-8 animate-fade-in">
            🚀 The Future of Hospitality Commerce
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 leading-tight px-2">
            Connect, Trade & Grow in the
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline"> Hospitality Industry</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed px-4">
            The all-in-one platform where hospitality suppliers and service providers showcase their offerings and connect with buyers worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 md:mb-16 px-4">
            <button 
              onClick={onStartSelling}
              className="group w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 font-semibold text-sm sm:text-base"
            >
              <span>Start Selling</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
            <a 
              href="/marketplace"
              className="group w-full sm:w-auto bg-white text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gray-200 hover:border-purple-300 hover:text-purple-600 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md flex items-center justify-center space-x-2 font-semibold text-sm sm:text-base"
            >
              <span>Explore Marketplace</span>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-200" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/50">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">500+</div>
              <div className="text-xs sm:text-sm text-gray-600">Verified Suppliers</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/50">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">$2M+</div>
              <div className="text-xs sm:text-sm text-gray-600">Transactions</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/50">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">25+</div>
              <div className="text-xs sm:text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;