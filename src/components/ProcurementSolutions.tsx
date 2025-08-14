import React from "react";
import {
  ArrowRight,
  Search,
  FileText,
  Users,
  CheckCircle,
  TrendingDown,
  DollarSign,
  Clock,
  Shield,
  Target,
  Zap,
  BarChart3,
  Globe,
  Award,
  Package,
  Building,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProcurementSolutions = () => {
  const solutions = [
    {
      icon: Search,
      title: "Strategic Sourcing",
      description:
        "Comprehensive sourcing strategies for hotels and restaurants",
      features: [
        "Supplier Discovery",
        "Market Analysis",
        "Cost Optimization",
        "Risk Assessment",
      ],
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Package,
      title: "Bulk Purchasing",
      description: "Group buying power to reduce costs and improve efficiency",
      features: [
        "Volume Discounts",
        "Consolidated Orders",
        "Inventory Management",
        "Quality Control",
      ],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Building,
      title: "Pre-Opening Procurement",
      description:
        "Complete procurement solutions for new hotel and restaurant openings",
      features: [
        "FF&E Procurement",
        "Kitchen Equipment",
        "Technology Setup",
        "Timeline Management",
      ],
      color: "from-purple-500 to-violet-600",
    },
  ];
  const router = useNavigate();

  const benefits = [
    {
      icon: DollarSign,
      title: "Cost Savings",
      description: "Average 25% reduction in procurement costs",
    },
    {
      icon: Clock,
      title: "Time Efficiency",
      description: "70% faster procurement cycles",
    },
    {
      icon: Shield,
      title: "Risk Mitigation",
      description: "Comprehensive supplier vetting and compliance",
    },
    {
      icon: Target,
      title: "Quality Assurance",
      description: "Rigorous quality control processes",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-28">
      {/* Hero Section */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Procurement Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Procurement Services for
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Hotels and Restaurants
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Comprehensive procurement solutions designed specifically for
              hotels, restaurants, and hospitality businesses
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => router("/become-a-buyer")}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => router("/book-demo")}
                className="border-2 border-blue-500 text-blue-600 px-8 py-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold"
              >
                Schedule Consultation
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
              Our Procurement Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tailored procurement strategies for every aspect of your
              hospitality business
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {solution.title}
                </h3>
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

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our Procurement Solutions?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Global and Local Vendor Networks
              </h3>
              <p className="text-gray-600">
                Access to extensive supplier networks worldwide and locally
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Industry Expertise
              </h3>
              <p className="text-gray-600">
                Deep understanding of hospitality procurement needs
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Technology
              </h3>
              <p className="text-gray-600">
                Advanced procurement technology and automation
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Data Intelligence
              </h3>
              <p className="text-gray-600">
                Smart insights and analytics for better decisions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Procurement?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our experts help you optimize your procurement processes and
            reduce costs
          </p>
          <button
            onClick={() => router("/contact-us")}
            className="bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg"
          >
            Contact Our Team
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProcurementSolutions;
