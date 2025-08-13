import React from 'react';
import { ShoppingCart, Search, Briefcase, TrendingUp } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: ShoppingCart,
      title: 'E-commerce Solution',
      description: 'Complete online B2B sales requirement for hospitality suppliers and service providers.',
      features: ['Online Storefront', 'Promotions', 'Product Showcase']
    },
    {
      icon: Search,
      title: 'E-sourcing Tools',
      description: 'Advaance RFQ system, notifications, vendor management and instant comparisons.',
      features: ['Supplier Discovery', 'RFQ Management', 'Proposal Comparison']
    },
    {
      icon: Briefcase,
      title: 'Procurement Services',
      description: 'End-to-end procurement solutions including pre-opening, operational to strategic slurcing.',
      features: ['Sourcing Services', 'Digital Procurement', 'Pre-opening Procurement']
    },
    {
      icon: TrendingUp,
      title: 'Business Development',
      description: 'Growth-focused tools and strategies to expand your hospitality business reach and revenue.',
      features: ['Market Entry', 'Exhibition participation', 'Affiliate Marketing']
    }
  ];

  return (
    <section id="services" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            Our Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Comprehensive solutions designed to simplify procurement and sales in Hospitality industry 
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                <service.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-purple-600" />
              </div>
              
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">{service.title}</h3>
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-3 sm:mb-4 lg:mb-6 leading-relaxed">{service.description}</p>
              
              <div className="space-y-1 sm:space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-2">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-600 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;