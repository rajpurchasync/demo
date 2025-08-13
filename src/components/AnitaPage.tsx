import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  FileText,
  MessageSquare,
  Sparkles,
  Send,
  Bot,
  Zap,
  Clock,
  CheckCircle,
  Users,
  TrendingUp,
  Package,
  Bell,
} from "lucide-react";

const AnitaPage = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger typing animation
          setTimeout(() => {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              setShowReply(true);
            }, 2000);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("anita-demo-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const floatingIcons = [
    {
      icon: Mail,
      position: { top: "20%", left: "15%" },
      delay: "0s",
      color: "text-blue-500",
    },
    {
      icon: MessageSquare,
      position: { top: "60%", left: "10%" },
      delay: "0.5s",
      color: "text-purple-500",
    },
    {
      icon: FileText,
      position: { top: "30%", right: "20%" },
      delay: "1s",
      color: "text-green-500",
    },
    {
      icon: Send,
      position: { top: "70%", right: "15%" },
      delay: "1.5s",
      color: "text-orange-500",
    },
    {
      icon: Bot,
      position: { top: "45%", left: "25%" },
      delay: "2s",
      color: "text-indigo-500",
    },
  ];

  const beforeTools = [
    {
      icon: "📊",
      name: "Excel",
      rotation: "-rotate-12",
      position: { top: "20%", left: "15%" },
    },
    {
      icon: "📄",
      name: "PDF",
      rotation: "rotate-45",
      position: { top: "40%", right: "20%" },
    },
    {
      icon: "📝",
      name: "Word",
      rotation: "-rotate-30",
      position: { top: "65%", left: "25%" },
    },
    {
      icon: "📧",
      name: "Email",
      rotation: "rotate-12",
      position: { top: "25%", right: "15%" },
    },
    {
      icon: "📞",
      name: "Phone",
      rotation: "-rotate-45",
      position: { top: "70%", right: "25%" },
    },
    {
      icon: "🔍",
      name: "Google",
      rotation: "rotate-30",
      position: { top: "50%", left: "10%" },
    },
    {
      icon: "💼",
      name: "LinkedIn",
      rotation: "-rotate-15",
      position: { top: "80%", left: "40%" },
    },
    {
      icon: "⚙️",
      name: "SAP",
      rotation: "rotate-60",
      position: { top: "15%", left: "45%" },
    },
  ];

  const orbitingFeatures = [
    { name: "Direct Message", angle: 0 },
    { name: "Vendor Profile", angle: 72 },
    { name: "Multi-Vendor RFQ", angle: 144 },
    { name: "Instant Comparisons", angle: 216 },
    { name: "Smart Matching", angle: 288 },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 pt-16 sm:pt-20 lg:pt-0 px-3 sm:px-0">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden -top-10 sm:-top-20">
          <div className="absolute inset-0 opacity-30">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 1000"
              preserveAspectRatio="none"
            >
              <path
                d="M0,300 Q250,200 500,300 T1000,300 L1000,0 L0,0 Z"
                fill="url(#wave1)"
                className="animate-pulse"
              />
              <path
                d="M0,500 Q250,400 500,500 T1000,500 L1000,0 L0,0 Z"
                fill="url(#wave2)"
                className="animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <defs>
                <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.1)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.1)" />
                </linearGradient>
                <linearGradient id="wave2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(147, 51, 234, 0.1)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 lg:py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                Meet Anita, the
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline">
                  {" "}
                  AI Sales Agent
                </span>
                <div className="inline-block mt-2 sm:mt-0 sm:ml-4 px-2 sm:px-3 py-1 bg-orange-100 text-orange-600 text-xs sm:text-sm font-medium rounded-full">
                  Coming Soon
                </div>
              </h1>

              <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed">
                <p>
                  Anita is an AI sales agent who automates your inbound and
                  outbound leads process.
                </p>
                <p>
                  She replies to emails, answers platform queries, and prepares
                  quotations for you. Working alongside you on Purchasync, Anita
                  responds to every customer query with precision and speed.
                </p>
              </div>

              <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2 w-full sm:w-auto justify-center">
                  <span className="text-sm sm:text-base">Hire Anita</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button className="border-2 border-purple-600 text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-purple-600 hover:text-white transition-all duration-300 font-semibold w-full sm:w-auto text-sm sm:text-base">
                  Try Anita
                </button>
              </div>
            </div>

            {/* Right Side - AI Avatar & Floating Elements */}
            <div className="relative h-64 sm:h-80 lg:h-96 xl:h-[500px] mt-8 lg:mt-0">
              {/* Background Anita Chatbot Image */}
              <div className="absolute inset-0 flex items-center justify-center z-5">
                <a
                  href="#anita-chatbot"
                  className="group relative block hover:scale-102 transition-all duration-300 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add your chatbot integration logic here
                    console.log("Opening Anita chatbot...");
                  }}
                >
                  <img
                    src="/Untitled design (1).png"
                    alt="Anita AI Sales Agent Chatbot"
                    className="w-48 h-auto sm:w-64 lg:w-80 xl:w-96 transition-all duration-300"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-blue-600 font-semibold text-sm sm:text-base">
                        Chat with Anita
                      </span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Floating Icons */}
              {floatingIcons.map((item, index) => (
                <div
                  key={index}
                  className={`absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-16 xl:h-16 bg-white rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 animate-bounce z-20`}
                  style={{
                    ...item.position,
                    animationDelay: item.delay,
                    animationDuration: "3s",
                  }}
                >
                  <item.icon
                    className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 ${item.color}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Hi, I'm Anita */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* AI Sales Agent Section */}
        <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Meet Anita's Sales Agent
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-purple-600 mb-6 sm:mb-8">
                Automated Sales & Lead Management
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Anita's Sales Agent handles all your inbound and outbound
                communications, from RFQ responses to follow-up reminders.
              </p>
            </div>

            {/* Communication Automation Visualization */}
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
              {/* Left Side - Communication Flow */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Communication Automation
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    Anita handles all types of business communications
                  </p>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  {/* RFQ Processing */}
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm sm:text-base font-semibold text-gray-900">
                        RFQ Processing
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Instant quotation generation & response
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-green-600 font-medium">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Auto</span>
                    </div>
                  </div>

                  {/* Sample Requests */}
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm sm:text-base font-semibold text-gray-900">
                        Sample Requests
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Coordinates sample delivery & tracking
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-blue-600 font-medium">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>24/7</span>
                    </div>
                  </div>

                  {/* Message Handling */}
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm sm:text-base font-semibold text-gray-900">
                        Message Handling
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Intelligent responses to all inquiries
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-purple-600 font-medium">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Smart</span>
                    </div>
                  </div>

                  {/* Follow-up Reminders */}
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm sm:text-base font-semibold text-gray-900">
                        Follow-up Reminders
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        Automated nurturing & follow-ups
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-xs sm:text-sm text-orange-600 font-medium">
                      <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Nurture</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Live Email Response */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Live Email Auto-Response
                    </div>
                    <div className="text-xs sm:text-sm text-green-500 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Anita responding...
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 max-h-80 overflow-y-auto">
                  {/* Incoming Email */}
                  <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">MH</span>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-gray-900">
                          procurement@marriott.com
                        </div>
                        <div className="text-xs text-gray-500">
                          2 minutes ago
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-800 bg-white p-2 sm:p-3 rounded border-l-4 border-blue-500">
                      <div className="font-medium mb-1">
                        Subject: Urgent - Coffee Bean Supply for Q1 2025
                      </div>
                      <div>
                        "Hi, we need to source 2,000kg of premium arabica coffee
                        beans for our Middle East properties. Can you provide
                        pricing, certifications, and delivery timeline? This is
                        urgent for our Q1 planning."
                      </div>
                    </div>
                  </div>

                  {/* Anita's Auto-Response */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 sm:p-4 border-l-4 border-purple-500">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-medium text-purple-700">
                          Anita AI Sales Agent
                        </div>
                        <div className="text-xs text-purple-600">
                          Auto-generated response
                        </div>
                      </div>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-800 bg-white p-2 sm:p-3 rounded">
                      <div className="font-medium mb-2">
                        Subject: RE: Coffee Bean Supply - Comprehensive Quote
                        Attached
                      </div>
                      <div className="space-y-2">
                        <p>"Dear Marriott Procurement Team,</p>
                        <p>
                          Thank you for your inquiry. I'm pleased to provide you
                          with a comprehensive quote for 2,000kg of premium
                          arabica coffee beans:
                        </p>
                        <div className="bg-gray-50 p-2 rounded text-xs">
                          <div>
                            • <strong>Product:</strong> Premium Single-Origin
                            Arabica
                          </div>
                          <div>
                            • <strong>Quantity:</strong> 2,000kg
                          </div>
                          <div>
                            • <strong>Price:</strong> $12.50/kg (Total: $25,000)
                          </div>
                          <div>
                            • <strong>Certifications:</strong> Organic, Fair
                            Trade, Rainforest Alliance
                          </div>
                          <div>
                            • <strong>Delivery:</strong> 14-21 days to UAE/Saudi
                            Arabia
                          </div>
                        </div>
                        <p>
                          I've attached our detailed catalog, certifications,
                          and terms. I can also arrange samples within 3 days.
                        </p>
                        <p>
                          Best regards,
                          <br />
                          Anita - Emirates Food Solutions
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Response Time Indicator */}
                  <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm text-green-600 bg-green-50 p-2 sm:p-3 rounded-lg">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">
                      Response generated in 45 seconds
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Diagram with Anita */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 xl:p-12">
              <div className="text-center mb-6 sm:mb-8">
                <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  Anita's Data Intelligence Network
                </h4>
                <p className="text-sm sm:text-base text-gray-600">
                  How Anita accesses and processes your business data
                </p>
              </div>

              <div className="relative">
                {/* Central Anita Hub */}
                <div className="flex justify-center mb-8 sm:mb-12">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl">
                      <img
                        src="/Untitled design (1).png"
                        alt="Anita Sales Agent"
                        className="w-18 h-18 sm:w-22 sm:h-22 lg:w-30 lg:h-30 object-contain rounded-full"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Data Sources Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {[
                    {
                      icon: "📊",
                      name: "Business info",
                      desc: "Company Details & Insights",
                      color: "bg-blue-100 text-blue-600",
                    },
                    {
                      icon: "📦",
                      name: "Catalogs",
                      desc: "Product catalogs & specifications",
                      color: "bg-green-100 text-green-600",
                    },
                    {
                      icon: "❓",
                      name: "FAQ",
                      desc: "Frequently Asked Questions",
                      color: "bg-purple-100 text-purple-600",
                    },
                    {
                      icon: "👥",
                      name: "Customer Care",
                      desc: "Hands-on support & assistance",
                      color: "bg-orange-100 text-orange-600",
                    },
                    {
                      icon: "📋",
                      name: "Lead Management",
                      desc: "Instant lead tracking & nurturing",
                      color: "bg-indigo-100 text-indigo-600",
                    },
                    {
                      icon: "📈",
                      name: "Brands Insights",
                      desc: "Case Studies & Success Stories",
                      color: "bg-pink-100 text-pink-600",
                    },
                    {
                      icon: "🏢",
                      name: "Operation",
                      desc: "Business Locations and Operations",
                      color: "bg-teal-100 text-teal-600",
                    },
                    {
                      icon: "📄",
                      name: "Templates",
                      desc: "Email & quotation templates",
                      color: "bg-yellow-100 text-yellow-600",
                    },
                  ].map((source, index) => (
                    <div
                      key={index}
                      className={`${source.color} ${
                        source.name === "FAQ" || source.name === "Operation"
                          ? "hidden md:block"
                          : ""
                      } rounded-lg p-3 sm:p-4 text-center hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-md`}
                    >
                      <div className="text-lg sm:text-xl lg:text-2xl mb-2">
                        {source.icon}
                      </div>
                      <div className="text-xs sm:text-sm font-bold mb-1">
                        {source.name}
                      </div>
                      <div className="text-xs text-gray-600">{source.desc}</div>
                    </div>
                  ))}
                </div>

                {/* Data Flow Visualization */}
                {/* <div className="bg-white rounded-lg p-4 sm:p-6 shadow-inner">
                  <div className="text-center mb-4">
                    <h5 className="text-sm sm:text-base font-semibold text-gray-900">
                      Real-time Data Processing
                    </h5>
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-600">Data Input</span>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 relative">
                        <div className="absolute top-0 left-0 w-2 h-0.5 bg-white animate-ping"></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">AI Processing</span>
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="h-0.5 bg-gradient-to-r from-purple-500 to-green-500 relative">
                        <div
                          className="absolute top-0 left-0 w-2 h-0.5 bg-white animate-ping"
                          style={{ animationDelay: "0.5s" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">Smart Response</span>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* New AI Customer Agent Section */}
        <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                Meet Anita's Customer Agent
              </h2>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-600 mb-6 sm:mb-8">
                Instant Answers from Your Knowledge Base
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Anita's Customer Agent connects to your backend data to provide
                instant, accurate answers to customer queries in your
                marketplace.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
              {/* Knowledge Base Visualization */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-6 sm:mb-8">
                  <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    Connected Knowledge Base
                  </h4>
                  <p className="text-sm sm:text-base text-gray-600">
                    Anita accesses your data in real-time
                  </p>
                </div>

                <div className="relative">
                  {/* Central Anita Hub */}
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <img
                        src="/Untitled design (1).png"
                        alt="Anita Customer Agent"
                        className="w-14 h-14 sm:w-18 sm:h-18 object-contain rounded-full"
                      />
                    </div>
                  </div>

                  {/* Data Sources */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {[
                      {
                        icon: "🏢",
                        name: "Company Info",
                        color: "bg-blue-100 text-blue-600",
                      },
                      {
                        icon: "📦",
                        name: "Product Catalog",
                        color: "bg-green-100 text-green-600",
                      },
                      {
                        icon: "❓",
                        name: "FAQ Database",
                        color: "bg-purple-100 text-purple-600",
                      },
                      {
                        icon: "📋",
                        name: "Documentation",
                        color: "bg-orange-100 text-orange-600",
                      },
                    ].map((source, index) => (
                      <div
                        key={index}
                        className={`${source.color} rounded-lg p-3 sm:p-4 text-center hover:scale-105 transition-transform duration-200`}
                      >
                        <div className="text-lg sm:text-xl mb-1 sm:mb-2">
                          {source.icon}
                        </div>
                        <div className="text-xs sm:text-sm font-medium">
                          {source.name}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Connection Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 300 200">
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="#3B82F6" />
                        </marker>
                      </defs>
                      {/* Animated connection lines */}
                      <path
                        d="M150,60 L100,120"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;10"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M150,60 L200,120"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;10"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M150,60 L100,160"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;10"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                      <path
                        d="M150,60 L200,160"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        markerEnd="url(#arrowhead)"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          values="0;10"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Live Chat Interface */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-200">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Live Customer Chat
                    </div>
                    <div className="text-xs sm:text-sm text-green-500 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                      Anita is online
                    </div>
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4 max-h-64 sm:max-h-80 overflow-y-auto">
                  {/* Customer Message */}
                  <div className="flex justify-end">
                    <div className="bg-gray-100 rounded-lg p-2 sm:p-3 max-w-xs">
                      <div className="text-xs sm:text-sm text-gray-800">
                        "Do you have organic coffee beans available? What's the
                        minimum order quantity?"
                      </div>
                    </div>
                  </div>

                  {/* Anita's Response */}
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-2 sm:p-3 max-w-xs">
                      <div className="flex items-center space-x-1 mb-1">
                        <Bot className="w-3 h-3" />
                        <span className="text-xs font-medium">Anita</span>
                      </div>
                      <div className="text-xs sm:text-sm">
                        "Yes! We have premium organic arabica beans. Minimum
                        order is 50kg. Current price: $15/kg with free shipping
                        on orders over $500. Would you like to see our full
                        organic catalog?"
                      </div>
                    </div>
                  </div>

                  {/* Follow-up */}
                  <div className="flex justify-end">
                    <div className="bg-gray-100 rounded-lg p-2 sm:p-3 max-w-xs">
                      <div className="text-xs sm:text-sm text-gray-800">
                        "Perfect! Can you send me the catalog and delivery
                        timeline to New York?"
                      </div>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <div className="flex justify-start">
                    <div className="bg-blue-50 rounded-lg p-2 sm:p-3 flex items-center space-x-2">
                      <Bot className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-blue-600">
                        Anita is typing...
                      </span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                        <div
                          className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                    <span>Powered by real-time data access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {[
                {
                  icon: Clock,
                  title: "Instant Answers",
                  desc: "No waiting time for customers",
                  color: "text-blue-600",
                },
                {
                  icon: CheckCircle,
                  title: "Always Accurate",
                  desc: "Real-time data ensures precision",
                  color: "text-green-600",
                },
                {
                  icon: Users,
                  title: "Multi-Language",
                  desc: "Supports global customers",
                  color: "text-purple-600",
                },
                {
                  icon: TrendingUp,
                  title: "24/7 Available",
                  desc: "Never miss a customer query",
                  color: "text-orange-600",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                >
                  <benefit.icon
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${benefit.color} mx-auto mb-3 sm:mb-4`}
                  />
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3 - Before vs After */}
        <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="text-center ">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 ">
                Transform Your Business Operations
              </h2>
            </div>
          </div>
        </section>

        {/* Section 3 - Before vs After */}
        <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-gray-100">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {/* Before Card */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 min-h-[300px] sm:min-h-[400px] relative overflow-hidden border-2 border-red-100">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    Before Anita
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    Manual sales and support processes
                  </p>
                </div>

                <div className="relative h-32 sm:h-48 lg:h-64">
                  {/* Chaotic scattered tools */}
                  {beforeTools.map((tool, index) => (
                    <div
                      key={index}
                      className={`absolute bg-white rounded-md sm:rounded-lg p-2 sm:p-3 shadow-lg transform ${tool.rotation} animate-pulse`}
                      style={{
                        ...tool.position,
                        animationDelay: `${index * 0.3}s`,
                        animationDuration: "3s",
                      }}
                    >
                      <div className="text-lg sm:text-xl lg:text-2xl mb-1">
                        {tool.icon}
                      </div>
                      <div className="text-xs font-medium text-gray-700">
                        {tool.name}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 text-center">
                  <p className="text-red-600 font-medium text-sm sm:text-base">
                    Slow responses. Missed opportunities. Overwhelmed staff.
                  </p>
                </div>
              </div>

              {/* After Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 min-h-[300px] sm:min-h-[400px] relative overflow-hidden border-2 border-emerald-200">
                <div className="text-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                    With Anita
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700">
                    AI handles sales and support automatically
                  </p>
                </div>

                <div className="relative h-32 sm:h-48 lg:h-64 flex items-center justify-center">
                  {/* Central Anita Hub */}
                  <div className="relative z-20 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    {/* Small Anita Image */}
                    <img
                      src="/Untitled design (1).png"
                      alt="Anita AI"
                      className="w-10 h-10 sm:w-14 sm:h-14 lg:w-18 lg:h-18 object-contain rounded-full"
                    />
                  </div>

                  {/* Orbiting Features */}
                  {[
                    { name: "Email Responses", angle: 0 },
                    { name: "Live Chat Support", angle: 72 },
                    { name: "Smart Quotations", angle: 144 },
                    { name: "Lead Qualification", angle: 216 },
                    { name: "24/7 Availability", angle: 288 },
                  ].map((feature, index) => {
                    const angle = index * 72 * (Math.PI / 180);
                    const radius =
                      window.innerWidth < 640
                        ? 80
                        : window.innerWidth < 1024
                        ? 70
                        : 100;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <div key={index} className="absolute">
                        <div
                          className="absolute bg-white rounded-full px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-110 transition-all duration-300 whitespace-nowrap"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {feature.name}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 text-center">
                  <p className="text-emerald-600 font-medium text-sm sm:text-base">
                    Automated. Intelligent. Always available.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-base sm:text-lg flex items-center space-x-2 sm:space-x-3 mx-auto">
                <span>Hire Anita Now</span>
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </section>

        {/* Mobile Sticky CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4 z-50 shadow-lg">
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold text-sm sm:text-base">
            Hire Anita Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnitaPage;
