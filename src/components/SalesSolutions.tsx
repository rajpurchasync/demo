import React from "react";
import {
  ArrowRight,
  TrendingUp,
  Users,
  Target,
  Megaphone,
  BarChart3,
  Globe,
  Award,
  Zap,
  CheckCircle,
  DollarSign,
  Eye,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SalesSolutions = () => {
  const solutions = [
    {
      icon: TrendingUp,
      title: "Business Development",
      description:
        "Strategic growth solutions for hospitality suppliers and service providers",
      features: [
        "Market Expansion",
        "Partnership Development",
        "Revenue Growth",
        "Client Acquisition",
      ],
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Megaphone,
      title: "Marketing Solutions",
      description:
        "Comprehensive marketing strategies to boost your hospitality business",
      features: [
        "Digital Marketing",
        "Brand Development",
        "Content Strategy",
        "Lead Generation",
      ],
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Globe,
      title: "Exhibition Services",
      description:
        "Professional exhibition and trade show services for maximum exposure",
      features: [
        "Event Planning",
        "Booth Design",
        "Lead Management",
        "ROI Tracking",
      ],
      color: "from-orange-500 to-red-600",
    },
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: "Revenue Growth",
      description: "Average 40% increase in sales within 12 months",
    },
    {
      icon: Users,
      title: "Market Reach",
      description: "Connect with 500+ hospitality buyers globally",
    },
    {
      icon: Target,
      title: "Lead Quality",
      description: "85% higher conversion rates with qualified leads",
    },
    {
      icon: BarChart3,
      title: "Performance Tracking",
      description: "Real-time analytics and ROI measurement",
    },
  ];

  const services = [
    {
      title: "Digital Marketing",
      description: "Comprehensive online marketing strategies",
      icon: Megaphone,
      features: [
        "SEO Optimization",
        "Social Media Marketing",
        "Email Campaigns",
        "Content Marketing",
      ],
    },
    {
      title: "Lead Generation",
      description: "Qualified leads from hospitality buyers",
      icon: Target,
      features: [
        "Buyer Matching",
        "RFQ Notifications",
        "Direct Inquiries",
        "Warm Introductions",
      ],
    },
    {
      title: "Brand Development",
      description: "Build a strong hospitality brand presence",
      icon: Award,
      features: [
        "Brand Strategy",
        "Visual Identity",
        "Market Positioning",
        "Reputation Management",
      ],
    },
  ];
  const router = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-28">
      {/* Hero Section */}
      <section className="py-10 md:py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-emerald-200/15 to-teal-200/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center  mb-2 md:mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Business Development Solutions
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Looking to sell your
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                {" "}
                hospitality product or services
              </span>{" "}
              in the Middle East?
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect with us today and consult with our experts for tailored
              solutions to grow your business in hospitality and food service
            </p>

            <div className="flex   items-center justify-center md:justify-center gap-4">
              <button
                onClick={() => router("/book-demo")}
                className="grow md:grow-0 md:max-w-max max-w-[50%] w-[45%] group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl relative overflow-hidden text-sm sm:text-base font-semibold md:w-max sm:w-auto justify-center"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span>Book a demo</span>
                <div className="relative">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:opacity-0 transition-all duration-200" />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute top-0 left-0 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
                </div>
              </button>

              {/* <button
                onClick={() => router("/book-demo")}
                className="w-max group flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 text-sm sm:text-base font-medium"
              >
                <span>Go to marketplace</span>
              </button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center  mb-2 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Our Sales Support Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive sales and marketing strategies tailored for
              hospitality <br /> suppliers and service providers
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex flex-col items-center md:items-start bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${solution.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <solution.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {solution.title}
                </h3>
                <p className="text-gray-600 mb-6 text-center md:text-left">
                  {solution.description}
                </p>
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

      {/* Services Detail */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center  mb-2 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Detailed Services
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex flex-col items-center md:items-start bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 text-center md:text-left">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center  mb-2 md:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Why Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Channel Partners
              </h3>
              <p className="text-gray-600">
                Extensive network of trusted channel partners
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Local Expertise
              </h3>
              <p className="text-gray-600">
                Deep local market knowledge and connections
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Megaphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Affiliate Networks
              </h3>
              <p className="text-gray-600">
                Strategic affiliate partnerships for growth
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Buyers Community
              </h3>
              <p className="text-gray-600">
                Active community of hospitality buyers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Boost Your Sales?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let our sales experts help you reach more hospitality buyers and
            grow your revenue
          </p>
          <button
            onClick={() => router("/book-demo")}
            className="bg-white text-blue-500 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 font-semibold shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default SalesSolutions;
