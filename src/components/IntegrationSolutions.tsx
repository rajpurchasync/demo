import React from "react";
import {
  ArrowRight,
  Zap,
  Globe,
  Shield,
  Settings,
  CheckCircle,
  Code,
  Database,
  Cloud,
  Smartphone,
  Monitor,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const IntegrationSolutions = () => {
  const integrations = [
    {
      icon: Globe,
      title: "E-commerce Integration",
      description:
        "Seamlessly connect your online store with hospitality buyers",
      features: [
        "API Integration",
        "Real-time Sync",
        "Order Management",
        "Inventory Updates",
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Database,
      title: "Procurement Systems",
      description: "Connect with major ERP systems for streamlined operations",
      features: [
        "SAP Integration",
        "Oracle Connectivity",
        "Data Synchronization",
        "Automated Workflows",
      ],
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Settings,
      title: "CRM Systems",
      description: "Automate repetitive tasks and improve efficiency",
      features: [
        "Process Automation",
        "Custom Workflows",
        "Task Management",
        "Notification Systems",
      ],
      color: "from-green-500 to-emerald-600",
    },
  ];

  const platforms = [
    {
      name: "Shopify",
      logo: "🛒",
      description: "E-commerce platform integration",
    },
    {
      name: "WooCommerce",
      logo: "🛍️",
      description: "WordPress e-commerce solution",
    },
    {
      name: "Magento",
      logo: "🏪",
      description: "Enterprise e-commerce platform",
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Faster Operations",
      description: "60% reduction in manual data entry",
    },
    {
      icon: Shield,
      title: "Data Security",
      description: "Enterprise-grade security protocols",
    },
    {
      icon: Cloud,
      title: "Cloud-Based",
      description: "Scalable cloud infrastructure",
    },
    {
      icon: Monitor,
      title: "Real-time Monitoring",
      description: "24/7 system monitoring and alerts",
    },
  ];
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/15 to-indigo-200/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Integration Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Seamless
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                System Integration
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect your existing systems with our platform for streamlined
              procurement and sales in hospitality and food service
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router("/book-demo")}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              {/* <button className="border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold">
                View Documentation
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Integration Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Integration Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Connect with your existing systems and streamline your hospitality
              operations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${integration.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <integration.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {integration.title}
                </h3>
                <p className="text-gray-600 mb-6">{integration.description}</p>
                <div className="space-y-3">
                  {integration.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Supported Platforms
            </h2>
            <p className="text-lg text-gray-600">
              We integrate with e-commerce platforms having robust APIs for
              seamless data exchange.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {platforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{platform.logo}</div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {platform.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Need integration with other platforms?
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold">
              Contact for Others
            </button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Integration Benefits
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Integrate?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our integration experts will help you connect your systems
            seamlessly
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            Contact Integration Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default IntegrationSolutions;
