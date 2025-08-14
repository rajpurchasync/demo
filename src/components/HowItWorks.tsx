import React, { useState } from "react";
import {
  Search,
  FileText,
  Users,
  CheckCircle,
  Store,
  Send,
  Eye,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowItWorks = ({
  defaultPage,
}: {
  defaultPage?: "buyers" | "sellers";
}) => {
  const [activeTab, setActiveTab] = useState<"buyers" | "sellers">(
    defaultPage ? defaultPage : "buyers"
  );
  const router = useNavigate();
  const content = {
    buyers: {
      steps: [
        {
          icon: Search,
          title: "Discover Suppliers",
          description:
            "Browse verified suppliers and service providers. Use smart filters to find what you need.",
          color: "from-blue-500 to-indigo-600",
        },
        {
          icon: FileText,
          title: "Create RFQs",
          description:
            "Create RFQ and let our AI matches you with the most suitable vendors to invite for proposals.",
          color: "from-green-500 to-emerald-600",
        },
        {
          icon: Users,
          title: "Compare Proposals",
          description:
            "Receive and compare multiple proposals side-by-side. Evaluate pricing, terms, and supplier in a click.",
          color: "from-purple-500 to-violet-600",
        },
        {
          icon: CheckCircle,
          title: "Close Deals Faster",
          description:
            "Select the best proposal and complete your procurement process with built-in workflows in real-time updates.",
          color: "from-orange-500 to-red-600",
        },
      ],
    },
    sellers: {
      steps: [
        {
          icon: Store,
          title: "Build Your Storefront",
          description:
            "Create a professional online store, Highlight your strengths and showcase your products and services.",
          color: "from-blue-500 to-indigo-600",
        },
        {
          icon: Send,
          title: "Receive RFQ Matches",
          description:
            "Get notified when buyers post RFQs that match your offerings. Our AI ensures you get most of the opportunities.",
          color: "from-green-500 to-emerald-600",
        },
        {
          icon: Eye,
          title: "Submit Proposals",
          description:
            "Respond to RFQs by creating quotations quickly to stay ahead of the competitors including pricing and terms.",
          color: "from-purple-500 to-violet-600",
        },
        {
          icon: TrendingUp,
          title: "Grow Your Business",
          description:
            "Win more contracts, expand your customer base, track your performance with advance analytics and insights.",
          color: "from-orange-500 to-red-600",
        },
      ],
    },
  };

  const currentContent = content[activeTab];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            How It Works
          </h2>
          <p className="hidden md:block text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 md:mb-10 px-4">
            Simple steps to streamline procurement and sales processes
          </p>

          {!defaultPage && (
            <div className=" inline-flex items-center bg-white rounded-full p-1 shadow-lg w-[60%] max-w-sm sm:max-w-none sm:w-auto">
              <button
                onClick={() => setActiveTab("buyers")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === "buyers"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                For Buyers
              </button>
              <button
                onClick={() => setActiveTab("sellers")}
                className={`flex-1 sm:flex-none px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === "sellers"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                For Sellers
              </button>
            </div>
          )}
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 px-2">
            {currentContent?.title}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {currentContent.steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < currentContent.steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 sm:top-16 left-full w-6 lg:w-8 h-0.5 bg-gray-300 transform translate-x-2 lg:translate-x-4 z-0"></div>
              )}

              <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 relative z-10">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${step.color} rounded-lg sm:rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 mx-auto`}
                >
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
                </div>

                <div className="text-center">
                  <div className="hidden md:flex w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-indigo-100 rounded-full items-center justify-center mx-auto mb-2 sm:mb-3 lg:mb-4">
                    <span className="text-indigo-600 font-bold text-xs sm:text-sm lg:text-base">
                      {index + 1}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <button
            onClick={() => router("/become-a-seller")}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full  max-w-[60%] md:max-w-max "
          >
            <span className="font-semibold text-sm sm:text-base">
              Start Selling Now
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
