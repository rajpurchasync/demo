import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Search,
  Users,
  FileText,
  CheckCircle,
  Star,
  Award,
  Globe,
  Package,
  Filter,
  Eye,
  TrendingUp,
  Clock,
  Shield,
  Zap,
  Home,
  Bell,
  BarChart3,
  Settings,
  DollarSign,
  Sparkles,
  Target,
  MousePointer,
  Play,
  Store,
  Bot,
  Megaphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SmartSourcingTools = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeRFQTab, setActiveRFQTab] = useState("product");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"buyers" | "sellers">("buyers");
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-reveal");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  const router = useNavigate();
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const rfqTabs = [
    { id: "product", label: "Product", icon: Package },
    { id: "service", label: "Service", icon: Users },
    { id: "project", label: "Project", icon: FileText },
  ];

  const vendorProfiles = [
    {
      name: "Emirates Food Solutions",
      category: "Food & Beverage",
      location: "Dubai, UAE",
      rating: 4.8,
      certifications: ["ISO 9001", "HACCP"],
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    },
    {
      name: "Gulf Equipment Co.",
      category: "Kitchen Equipment",
      location: "Abu Dhabi, UAE",
      rating: 4.9,
      certifications: ["CE", "Energy Star"],
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    },
    {
      name: "Green Clean Services",
      category: "Cleaning Services",
      location: "Sharjah, UAE",
      rating: 4.7,
      certifications: ["Green Seal", "ISO 14001"],
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    },
  ];

  const vendorTabs = [
    { id: "approved", label: "Approved Vendors", count: 24 },
    { id: "pending", label: "Pending Review", count: 3 },
    { id: "documents", label: "Documents", count: 12 },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px breakpoint
    };

    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 pt-16 sm:pt-20 px-3 sm:px-0">
        {/* Interactive Background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.1) 40%, transparent 70%)`,
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute top-20 sm:top-40 right-10 sm:right-20 w-12 sm:w-24 h-12 sm:h-24 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-16 sm:bottom-32 left-1/4 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        {/* Parallax Background */}
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

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg border border-blue-100">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Smart Procurement Tool</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              <span className="relative">
                Your complete
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline">
                  {" "}
                  Procurement Assistant{" "}
                </span>
                {/* Underline animation */}
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transform scale-x-0 animate-pulse"></div>
              </span>
              for hospitality and food service
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4 sm:px-0">
              <span className="font-semibold text-gray-900">
                Save upto 70% of your time
              </span>{" "}
              with AI-powered RFQ tool, smart vendor matching, and instant
              proposal comparisons.{" "}
              {isMobile
                ? ""
                : "Manage all your supplier details in one comprehensive system"}
              {/* <span className="text-blue-600 font-medium block sm:inline mt-1 sm:mt-0">
                {" "}
                Join 500+ hotels already saving millions.
              </span> */}
            </p>

            <div className="flex   items-center justify-center md:justify-center gap-4">
              <button
                onClick={() => router("/become-a-seller")}
                className="grow md:grow-0 md:max-w-max max-w-[50%] w-[45%] group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl relative overflow-hidden text-sm sm:text-base font-semibold md:w-max sm:w-auto justify-center"
              >
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span>Start Selling</span>
                <div className="relative">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:opacity-0 transition-all duration-200" />
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 absolute top-0 left-0 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-200" />
                </div>
              </button>

              <button
                onClick={() => router("/book-demo")}
                className="w-max group flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors duration-200 text-sm sm:text-base font-medium"
              >
                <span>Book a Demo</span>
              </button>
            </div>
            {/* Trust Indicators */}
            {/* <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                <span>Enterprise security</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                <span>Setup in 5 minutes</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 ">
        {/* Dashboard Section */}
        <div
          style={{
            transform: isMobile ? "scale(0.5)" : "none",
            transformOrigin: "top left",
            height: isMobile ? "300px" : "auto",
            paddingBottom: "20px",
          }}
          className=" w-[200%] md:w-full max-w-7xl  md:mx-auto px-6  "
        >
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 relative overflow-hidden">
            {/* Dashboard Layout */}
            <div className="flex h-[500px] md:h-[600px]">
              {/* Left Sidebar */}
              <div className="w-44 md:w-64 bg-white shadow-lg border-r border-gray-200">
                {/* Logo */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="hidden md:flex w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg  items-center justify-center">
                      <span className="text-white font-bold text-sm">P</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      Purchasync
                    </span>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="p-4 space-y-2">
                  <div className="flex flex-col space-y-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                      <Home className="w-5 h-5" />
                      <span className="font-medium animate-pulse text-base">
                        Dashboard
                      </span>
                    </button>
                    {activeTab === "sellers" ? (
                      <>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Bot className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base ">
                            AI Employee
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Store className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Store
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Package className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Products
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Users className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Leads
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <DollarSign className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Sales
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Megaphone className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Marketing
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <BarChart3 className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Analytics
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Home className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Dashboard
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Search className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Suppliers
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <FileText className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            RFQs
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Package className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Samples
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <BarChart3 className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Analytics
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Users className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Profile
                          </span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50">
                          <Settings className="w-5 h-5" />
                          <span className="font-medium hover:animate-bounce text-base">
                            Settings
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 bg-gray-50">
                {/* Top Bar */}
                <div className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
                  {/* Search Bar */}
                  <div className="px-6 py-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder={
                          activeTab === "sellers"
                            ? "Search products, orders, customers..."
                            : "Search suppliers, RFQs, proposals..."
                        }
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:animate-bounce">
                      <Bell className="w-5 h-5" />
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                    </button>

                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse hover:animate-bounce">
                        <span className="text-white font-semibold text-sm">
                          {activeTab === "sellers" ? "ES" : "A"}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {activeTab === "sellers" ? "John" : "Adrian"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {activeTab === "sellers" ? "Supplier" : "Buyer"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-2 md:p-6 bg-gray-50">
                  {/* Dynamic Content Based on Active Menu */}
                  {activeMenu === "dashboard" && (
                    <>
                      {/* Welcome Section */}
                      <div className="mb-8">
                        <h1 className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-2">
                          Welcome back, Emirates Food Solutions
                        </h1>
                        <p className="text-base text-gray-600 animate-pulse">
                          Here's what's happening with your business today
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-4 gap-2 md:gap-6 mb-2 md:mb-8">
                        {activeTab === "sellers" ? (
                          <>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  +12.5%
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                $24,580
                              </div>
                              <div className="text-sm text-gray-600">
                                {isMobile ? "RFQ Value" : "Total RFQ Value"}
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  +3 new
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                8
                              </div>
                              <div className="text-sm text-gray-600">
                                {isMobile ? "RFQs" : "RFQs Pending"}
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <Eye className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  +8.2%
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                1,247
                              </div>
                              <div className="text-sm text-gray-600">
                                Store Views
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 md:w-12 h-8 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <Eye className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  +5 {isMobile ? "" : "this week"}
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                156
                              </div>
                              <div className="text-sm text-gray-600">
                                {isMobile ? "Clicks" : " Catalogue Views"}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  +2 new
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                12
                              </div>
                              <div className="text-sm text-gray-600">
                                Active RFQs
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 md:w-12 md:h-12  bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <Users className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  +15 new
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                247
                              </div>
                              <div className="text-sm text-gray-600">
                                Suppliers
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <DollarSign className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  -8.5%
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                $156K
                              </div>
                              <div className="text-sm text-gray-600">
                                Cost Savings
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 md:p-5 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                              <div className="flex items-center justify-between mb-4">
                                <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 animate-pulse">
                                  <FileText className="w-4 h-4 md:w-6 md:h-6 text-white" />
                                </div>
                                <div className="text-sm font-medium text-green-600 animate-bounce">
                                  +3 {isMobile ? "" : "this week"}
                                </div>
                              </div>
                              <div className="text-xl md:text-2xl font-semibold md:font-bold text-gray-900 mb-1 animate-pulse">
                                34
                              </div>
                              <div className="text-sm text-gray-600">
                                Total RFQs
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Recent Activity */}
                      <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                          <h3 className="text-xl md:text-lg  md:font-semibold text-gray-900 mb-4">
                            Recent Activity
                          </h3>
                          <div className="space-y-4">
                            {activeTab === "sellers" ? (
                              <>
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      New RFQ response submitted
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      2 minutes ago
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Eye className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      Store viewed by Hilton Hotels
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      15 minutes ago
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Package className="w-4 h-4 text-purple-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      New product added to catalog
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      1 hour ago
                                    </p>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      RFQ approved by management
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      5 minutes ago
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      3 new proposals received
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      20 minutes ago
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Clock className="w-4 h-4 text-orange-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                      RFQ deadline approaching
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      2 hours ago
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {activeTab === "sellers"
                              ? "Top Performing Products"
                              : "Recent Suppliers"}
                          </h3>
                          <div className="space-y-4">
                            {activeTab === "sellers" ? (
                              <>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                      <Star className="w-4 h-4 text-yellow-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Premium Coffee Beans
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        156 views this week
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-sm font-semibold text-green-600">
                                    +24%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                                      <Award className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Organic Vegetables
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        89 views this week
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-sm font-semibold text-green-600">
                                    +18%
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                      <Package className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Kitchen Equipment
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        67 views this week
                                      </p>
                                    </div>
                                  </div>
                                  <span className="text-sm font-semibold text-green-600">
                                    +12%
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold text-xs">
                                      EF
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      Emirates Food Solutions
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Food & Beverage • 4.8★
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold text-xs">
                                      GS
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      Global Supplies Co.
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Equipment • 4.6★
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold text-xs">
                                      TC
                                    </span>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      Tech Clean Services
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      Cleaning • 4.7★
                                    </p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Section 1: Smart RFQ */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white scroll-reveal relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Crect width='11' height='11'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="relative z-10 flex flex-col items-center md:items-start">
              {/* Section Badge */}
              <div className="mx-auto md:mx-0 inline-flex items-center space-x-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>AI-Powered Matching</span>
              </div>

              <h2 className="text-center md:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Create RFQs in
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline">
                  {" "}
                  30 Seconds
                </span>
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Smart Templates
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Pre-built templates for common hospitality needs
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      AI Vendor Matching
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Get matched with the perfect suppliers automatically
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Side-by-Side Comparison
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Compare proposals instantly with smart analytics
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router("/rfq-creation")}
                className="w-max group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2 relative overflow-hidden w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="text-sm sm:text-base">
                  Create Your First RFQ
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 relative transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium shadow-lg animate-bounce">
                Most Popular
              </div>

              {/* RFQ Interface */}
              <div className="text-center max-w-xs sm:max-w-sm mx-auto">
                {/* Icon */}
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                  Smart RFQ Builder
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 lg:mb-8">
                  Choose your category and get started instantly
                </p>

                {/* RFQ Type Buttons */}
                <div className="space-y-2 sm:space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 shadow-lg transform hover:scale-105 group">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">
                      Products
                    </span>
                    <div className="ml-auto bg-white/20 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs">
                      Most Used
                    </div>
                  </button>

                  <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-105 group">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">
                      Services
                    </span>
                  </button>

                  <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center space-x-2 sm:space-x-3 transform hover:scale-105 group">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-semibold text-sm sm:text-base">
                      Projects
                    </span>
                  </button>
                </div>

                {/* Quick stats */}
                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="text-xs text-gray-500 text-center">
                    <span className="font-medium text-green-600">2,847</span>{" "}
                    RFQs created this month
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 2: Catalogue & Vendor Access */}
      <section className="py-8 sm:py-12 lg:py-20 bg-gradient-to-br from-gray-50 to-blue-50 scroll-reveal relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-10 sm:top-20 right-5 sm:right-10 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="absolute bottom-10 sm:bottom-20 left-5 sm:left-10 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="lg:order-2 relative z-10 flex flex-col items-center md:items-start">
              {/* Section Badge */}
              <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Global Network</span>
              </div>

              <h2 className="text-center md:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Access Verified Suppliers <br /> Worldwide
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <Search className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Smart Search & Filters
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Find exactly what you need with AI-powered search
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Instant Document Access
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      View certificates, catalogues, and compliance docs
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Direct Communication
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Message suppliers and collaborate in real-time
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {/* <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8 p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl border border-white/50">
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                    200+
                  </div>
                  <div className="text-xs text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
                    24/7
                  </div>
                  <div className="text-xs text-gray-600">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
                    99.9%
                  </div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
              </div> */}

              <button
                onClick={() => router("/marketplace")}
                className="w-max group bg-gradient-to-r from-purple-500 to-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:from-purple-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2 relative overflow-hidden w-full sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="text-sm sm:text-base">
                  Explore Marketplace
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            <div className="hidden md:block lg:order-1">
              <div className="grid gap-3 sm:gap-4">
                {vendorProfiles.map((vendor, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 cursor-pointer group"
                    onMouseEnter={() => setHoveredCard(index)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="relative">
                        <img
                          src={vendor.image}
                          alt={vendor.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md sm:rounded-lg group-hover:scale-110 transition-transform duration-300"
                        />
                        {hoveredCard === index && (
                          <div className="absolute inset-0 bg-blue-500/20 rounded-md sm:rounded-lg flex items-center justify-center">
                            <Eye className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1 sm:space-x-2 mb-1">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                            {vendor.name}
                          </h3>
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full flex items-center justify-center animate-pulse flex-shrink-0">
                            <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full font-medium flex-shrink-0">
                            Verified
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">
                          {vendor.category} • {vendor.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current animate-pulse" />
                              <span className="text-xs sm:text-sm font-medium text-gray-700">
                                {vendor.rating}
                              </span>
                            </div>
                            <div className="flex space-x-1 overflow-hidden">
                              {vendor.certifications.map((cert, certIndex) => (
                                <span
                                  key={certIndex}
                                  className="text-xs bg-green-100 text-green-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium whitespace-nowrap"
                                >
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>
                          <MousePointer className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-200 flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section 3: Vendor Management */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white scroll-reveal relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="relative z-10 flex flex-col items-center md:items-start -ml-4 md:ml-0">
              {/* Section Badge */}
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Vendor Management</span>
              </div>

              <h2 className="text-center md:text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                  Centralize
                </span>{" "}
                Your
                <br />
                Vendor Ecosystem
              </h2>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Automated Approvals
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Streamline vendor onboarding with smart workflows
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Document Management
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Store and track all vendor documents securely
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5 sm:mt-1 flex-shrink-0">
                    <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      Performance Analytics
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600">
                      Monitor supplier performance with real-time insights
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router("/become-a-buyer")}
                className="w-max group bg-gradient-to-r from-green-500 to-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:from-green-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2 relative overflow-hidden  sm:w-auto justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="text-sm sm:text-base">
                  Start Managing Vendors
                </span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>

            <div className="hidden md:block bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-gray-100">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  Vendor Management
                </h3>
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-600">Live Dashboard</span>
                </div>
              </div>

              {/* Vendor Management Tabs */}
              <div className="flex space-x-0.5 sm:space-x-1 mb-4 sm:mb-6 bg-gray-100 rounded-lg p-0.5 sm:p-1 relative overflow-x-auto">
                {vendorTabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-shrink-0 flex items-center justify-center space-x-1 sm:space-x-2 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                      tab.id === "approved"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg font-medium"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-medium">
                      {tab.label}
                    </span>
                    <span
                      className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full ${
                        tab.id === "approved"
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Vendor List */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-2 sm:p-3 border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-105 group">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200 truncate">
                        Emirates Food Solutions
                      </div>
                      <div className="text-xs text-gray-600 flex items-center space-x-1 sm:space-x-2">
                        <span className="flex items-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                          <span className="hidden sm:inline">
                            Documents: Complete
                          </span>
                          <span className="sm:hidden">Complete</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">
                          <Star className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current mr-1" />
                          <span>4.8</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between p-2 sm:p-3 border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-105 group">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200 truncate">
                        Gulf Equipment Co.
                      </div>
                      <div className="text-xs text-gray-600 flex items-center space-x-1 sm:space-x-2">
                        <span className="flex items-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                          <span className="hidden sm:inline">
                            Documents: Complete
                          </span>
                          <span className="sm:hidden">Complete</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">
                          <Star className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current mr-1" />
                          <span>4.6</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200 flex-shrink-0" />
                </div>

                <div className="flex items-center justify-between p-2 sm:p-3 border border-green-200 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg hover:shadow-md transition-all duration-200 transform hover:scale-105 group">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-200 truncate">
                        Green Clean Services
                      </div>
                      <div className="text-xs text-gray-600 flex items-center space-x-1 sm:space-x-2">
                        <span className="flex items-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                          <span className="hidden sm:inline">
                            Documents: Complete
                          </span>
                          <span className="sm:hidden">Complete</span>
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center">
                          <Star className="w-2 h-2 sm:w-3 sm:h-3 text-yellow-400 fill-current mr-1" />
                          <span>4.7</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-green-500 transition-colors duration-200 flex-shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SmartSourcingTools;
