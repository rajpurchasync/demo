import React from 'react';
import { ArrowRight, Monitor, Smartphone, Wifi, Server, Shield, Code, Database, Cloud, Zap, CheckCircle, Settings, Globe } from 'lucide-react';

const ITTechSolutions = () => {
  const solutions = [
    {
      icon: Globe,
      title: 'Custom E-commerce & Website',
      description: 'Tailored e-commerce solutions and websites for hospitality businesses',
      features: ['Custom Design', 'E-commerce Integration', 'Mobile Responsive', 'SEO Optimized'],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Code,
      title: 'IT Services and Development',
      description: 'Comprehensive IT services and custom development solutions',
      features: ['System Integration', 'Custom Software', 'Technical Support', 'Maintenance'],
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Zap,
      title: 'Workflow Automation',
      description: 'Automate business processes and improve operational efficiency',
      features: ['Process Automation', 'Task Management', 'Integration APIs', 'Custom Workflows'],
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Bot,
      title: 'AI Agents',
      description: 'Intelligent AI agents to enhance customer service and operations',
      features: ['Chatbots', 'Virtual Assistants', 'Automated Responses', 'Smart Analytics'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Cloud,
      title: 'Hosting and Infrastructure Setup',
      description: 'Reliable hosting solutions and infrastructure management',
      features: ['Cloud Hosting', 'Server Setup', 'Domain Management', 'SSL Certificates'],
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Smartphone,
      title: 'App Development',
      description: 'Mobile and web application development for hospitality',
      features: ['iOS Apps', 'Android Apps', 'Web Apps', 'Cross-platform'],
      color: 'from-teal-500 to-cyan-600'
    }
  ];

  const technologies = [
    { name: 'Cloud Computing', icon: Cloud, description: 'Scalable cloud infrastructure' },
    { name: 'API Development', icon: Code, description: 'Custom API solutions' },
    { name: 'Database Management', icon: Database, description: 'Optimized data storage' },
    { name: 'Network Security', icon: Shield, description: 'Advanced security protocols' },
    { name: 'IoT Integration', icon: Wifi, description: 'Internet of Things connectivity' },
    { name: 'Automation', icon: Zap, description: 'Process automation tools' }
  ];

  const services = [
    {
      title: 'System Integration',
      description: 'Seamless integration of hospitality systems',
      features: ['PMS Integration', 'POS Systems', 'Booking Engines', 'Payment Gateways']
    },
    {
      title: 'Custom Development',
      description: 'Tailored software solutions for unique needs',
      features: ['Web Applications', 'Mobile Apps', 'Desktop Software', 'API Development']
    },
    {
      title: 'IT Consulting',
      description: 'Expert guidance for technology decisions',
      features: ['Technology Assessment', 'Digital Strategy', 'Implementation Planning', 'Training & Support']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-blue-200/15 to-cyan-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              IT & Technology Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Advanced
              <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent"> Technology Solutions</span>
              <br />for Hospitality
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Cutting-edge IT solutions designed to modernize and streamline hospitality operations
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-8 py-4 rounded-full hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2">
                <span>Explore Solutions</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button className="border-2 border-indigo-500 text-indigo-600 px-8 py-4 rounded-full hover:bg-indigo-50 transition-all duration-300 font-semibold">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Technology Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive IT solutions tailored for the hospitality industry
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{solution.title}</h3>
                <p className="text-gray-600 mb-6">{solution.description}</p>
                <div className="space-y-3">
                  {solution.features.map((feature, idx) => (
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

      {/* Technologies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Technologies We Use
            </h2>
            <p className="text-lg text-gray-600">
              Latest technologies and frameworks for robust hospitality solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <tech.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{tech.name}</h3>
                    <p className="text-sm text-gray-600">{tech.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Services
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Modernize Your Technology?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Let our technology experts help you implement cutting-edge solutions
          </p>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg">
            Contact Our Tech Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default ITTechSolutions;