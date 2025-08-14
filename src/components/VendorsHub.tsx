import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Store,
  Bot,
  FileText,
  Megaphone,
  Users,
  TrendingUp,
  Eye,
  CheckCircle,
  Star,
  Zap,
  Globe,
  Award,
  Play,
  Sparkles,
  Clock,
  DollarSign,
  Target,
  BarChart3,
  MessageSquare,
  Package,
  Building,
  Briefcase,
  Heart,
  Home,
  Search,
  Bell,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VendorsHub = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeDemo, setActiveDemo] = useState("storefront");
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"buyers" | "sellers">("sellers");
  const [activeMenu, setActiveMenu] = useState("dashboard");
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
  const features = [
    {
      id: "storefront",
      icon: Store,
      title: "Branded Storefront",
      subtitle: "Your Professional Online Presence",
      description:
        "Create a stunning, branded storefront that showcases your products and builds trust with hospitality buyers.",
      benefits: [
        "Custom branding and design",
        "Product catalog management",
        "Customer testimonials",
        "SEO optimization",
      ],
      color: "from-blue-500 to-indigo-600",
      status: "available",
    },
    {
      id: "anita",
      icon: Bot,
      title: "Anita - AI Digital Employee",
      subtitle: "Your 24/7 Sales Assistant",
      description:
        "Let Anita handle customer inquiries, respond to RFQs, and generate quotations while you focus on growing your business.",
      benefits: [
        "Customer query handling",
        "Lead capture",
        "Automate responses",
        "Multi-language support",
      ],
      color: "from-purple-500 to-violet-600",
      status: "coming-soon",
    },
    {
      id: "quotation",
      icon: FileText,
      title: "Quotation Generator",
      subtitle: "Professional Quotes in Minutes",
      description:
        "Generate professional, branded quotations instantly with smart pricing suggestions and approval workflows.",
      benefits: [
        "Template customization",
        "RFQ to Quotation",
        "B2B compliance",
        "Discounts & benefits",
      ],
      color: "from-green-500 to-emerald-600",
      status: "available",
    },
    {
      id: "affiliate",
      icon: Megaphone,
      title: "Affiliate Marketing",
      subtitle: "Expand Your Reach",
      description:
        "Partner with industry influencers and expand your market reach through our affiliate marketing program.",
      benefits: [
        "Invite affiliates",
        "Affiliate setup",
        "Performance tracking",
        "Performance analytics",
      ],
      color: "from-orange-500 to-red-600",
      status: "coming-soon",
    },
  ];
  const router = useNavigate();
  const demoContent = {
    storefront: {
      title: "Branded Storefront Demo",
      description: "Your professional online presence",
      mockup: (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
              Your Storefront
            </h3>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
              <Store className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">
                Professional branded storefront coming soon
              </p>
            </div>
          </div>
        </div>
      ),
    },
    anita: {
      title: "Anita AI Assistant Demo",
      description: "Watch Anita handle customer inquiries automatically",
      mockup: (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                Anita AI Assistant
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm text-gray-600">
                  Online & Ready
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="bg-gray-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-gray-400">
              <div className="text-xs text-gray-600 mb-2 flex items-center space-x-1 sm:space-x-2">
                <MessageSquare className="w-3 h-3" />
                <span>Customer Inquiry</span>
              </div>
              <div className="text-xs sm:text-sm text-gray-800">
                "Need 500 units of premium coffee beans for our new hotel
                opening"
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-l-4 border-purple-500">
              <div className="text-xs text-purple-600 mb-2 flex items-center space-x-1 sm:space-x-2">
                <Bot className="w-3 h-3" />
                <span>Anita's Response</span>
                <div className="bg-green-100 text-green-600 px-1.5 sm:px-2 py-0.5 rounded-full text-xs font-medium">
                  Auto-Generated
                </div>
              </div>
              <div className="text-xs sm:text-sm text-gray-800">
                "Thank you for your inquiry! I'll prepare a customized quote for
                500 units of our premium arabica blend. Expected delivery: 2
                weeks. Quote sent to your email."
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg sm:rounded-xl border border-green-200">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-green-700 font-medium">Response Time:</span>
              <span className="text-green-600 font-bold">30 seconds</span>
            </div>
          </div>
        </div>
      ),
    },
    quotation: {
      title: "Smart Quotation Generator",
      description: "Generate professional quotes with one click",
      mockup: (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-lg mx-auto transform hover:scale-105 transition-all duration-500">
          {/* Quote Header with Enhanced Design */}
          <div className="border-b border-gray-200 pb-4 sm:pb-6 mb-4 sm:mb-6 bg-gradient-to-r from-blue-50 to-purple-50 -m-4 sm:-m-6 lg:-m-8 p-4 sm:p-6 lg:p-8 rounded-t-xl sm:rounded-t-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
              <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl">
                Quotation #QT-2024-001
              </h3>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 sm:space-x-2 animate-pulse self-start sm:self-auto">
                <Zap className="w-3 h-3" />
                <span>Auto-Generated</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-700 mb-2">
              <span className="font-semibold">From:</span> Emirates Food
              Solutions → <span className="font-semibold">To:</span> Marriott
              Hotel Dubai
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Generated: Dec 15, 2024</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center space-x-1">
                <Target className="w-3 h-3" />
                <span>Valid until: Jan 15, 2025</span>
              </div>
            </div>
          </div>

          {/* Quote Items with Enhanced Styling */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="flex justify-between items-start p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  Premium Arabica Coffee Beans
                </div>
                <div className="text-xs text-gray-600 mb-1 sm:mb-2">
                  SKU: CF-ARB-001 • Grade A Quality
                </div>
                <div className="text-xs text-gray-500">
                  500 units × $12.50 each
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                  $6,250.00
                </div>
                <div className="text-xs text-green-600">
                  15% bulk discount applied
                </div>
              </div>
            </div>

            <div className="flex justify-between items-start p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl border border-gray-200">
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-bold text-gray-900 mb-1">
                  Express Delivery & Handling
                </div>
                <div className="text-xs text-gray-600">
                  Dubai Metro Area • 2-day delivery
                </div>
              </div>
              <div className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                $250.00
              </div>
            </div>

            <div className="border-t-2 border-gray-300 pt-3 sm:pt-4 flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <span className="font-bold text-gray-900 text-base sm:text-lg">
                Total Amount
              </span>
              <span className="font-bold text-lg sm:text-xl lg:text-2xl text-gray-900">
                $6,500.00
              </span>
            </div>
          </div>

          {/* Terms with Better Design */}
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg sm:rounded-xl border border-gray-200">
            <div className="text-xs sm:text-sm font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Terms & Conditions</span>
            </div>
            <div className="text-xs text-gray-700 space-y-0.5 sm:space-y-1">
              <div>• Payment: 30 days net from delivery</div>
              <div>• Delivery: 14 business days from order confirmation</div>
              <div>• Warranty: 6 months quality guarantee</div>
              <div>• Returns: 7-day return policy for unopened items</div>
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Send Quote</span>
            </button>
            <button className="flex-1 border-2 border-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      ),
    },
    affiliate: {
      title: "Affiliate Marketing Program",
      description: "Expand your reach through strategic partnerships",
      mockup: (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 max-w-sm sm:max-w-md mx-auto transform hover:scale-105 transition-all duration-500">
          <div className="text-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
              <Megaphone className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg lg:text-xl">
              Partner Network
            </h3>
            <p className="text-xs sm:text-sm text-gray-600">
              Expand your reach through affiliates
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    HI
                  </span>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900">
                    Hotel Influencer
                  </span>
                  <div className="text-xs text-gray-600">50K+ followers</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm font-bold text-green-600">
                  15% Commission
                </div>
                <div className="text-xs text-gray-500">Per sale</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg sm:rounded-xl border border-purple-200">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    FB
                  </span>
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-gray-900">
                    F&B Consultant
                  </span>
                  <div className="text-xs text-gray-600">Industry expert</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs sm:text-sm font-bold text-green-600">
                  12% Commission
                </div>
                <div className="text-xs text-gray-500">Per referral</div>
              </div>
            </div>
          </div>

          <div className="p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg sm:rounded-xl border border-orange-200">
            <div className="text-center">
              <div className="text-base sm:text-lg font-bold text-orange-800 mb-1">
                Coming Q2 2025
              </div>
              <div className="text-xs sm:text-sm text-orange-700 mb-2 sm:mb-3">
                Join waitlist for early access
              </div>
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold">
                Join Waitlist
              </button>
            </div>
          </div>
        </div>
      ),
    },
  };

  return (
    <>
      {/* Mobile Sticky CTA */}
      {/* <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-semibold text-sm flex items-center justify-center space-x-2">
            <Store className="w-4 h-4" />
            <span>Start Selling</span>
          </button>
          <button className="border-2 border-blue-500 text-blue-600 py-3 px-4 rounded-full hover:bg-blue-50 transition-all duration-300 font-semibold text-sm flex items-center justify-center space-x-2">
            <Play className="w-4 h-4" />
            <span>Demo</span>
          </button>
        </div>
      </div> */}

      <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 lg:pt-28 relative overflow-hidden">
        {/* Enhanced Mouse follower effect */}
        <div
          className="fixed inset-0 pointer-events-none z-0 transition-all duration-300"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(147, 51, 234, 0.08), rgba(59, 130, 246, 0.04) 40%, transparent 70%)`,
          }}
        />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-100/15 to-purple-100/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-20 h-20 bg-gradient-to-br from-green-200/25 to-emerald-200/25 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        {/* Hero Section with Enhanced Design */}
        <section className="relative py-8 lg:py-20 overflow-hidden scroll-reveal !pb-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                Everything you need to succeed and
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent  mt-1 sm:mt-2">
                  {" "}
                  grow your business online
                </span>{" "}
                <br className="md:hidden block" /> in hospitality
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
                Build your store, get qualified leads, submit proposals directly
                to
                <br className="hidden md:block" /> hospitality buyers and grow
                your revenue.
              </p>

              {/* Enhanced CTA Buttons */}
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

              {/* Success Indicators */}
              {/* <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  <span className="font-medium">Start free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  <span className="font-medium">Go live instantly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                  <span className="font-medium">Submit Proposals</span>
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
                      {/* <div className="hidden md:flex w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg  items-center justify-center">
                        <span className="text-white font-bold text-sm">P</span>
                      </div> */}
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
        {/* Enhanced Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white scroll-reveal">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Vendor Tools & Features
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Everything You Need to
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Succeed as a Vendor
                </span>
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
                Comprehensive tools designed specifically for hospitality
                suppliers and service providers
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              {/* Enhanced Feature Tabs */}

              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`group cursor-pointer p-6 sm:p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 ${
                    activeDemo === feature.id
                      ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-xl"
                      : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent hover:shadow-lg"
                  }`}
                  onClick={() => setActiveDemo(feature.id)}
                >
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${feature.color} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}
                    >
                      <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                          {feature.title}
                        </h3>
                        {feature.status === "coming-soon" && (
                          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-purple-600 font-semibold mb-3 sm:mb-4 text-base sm:text-lg">
                        {feature.subtitle}
                      </p>
                      <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {feature.benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-start space-x-2 sm:space-x-3"
                          >
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-gray-700 font-medium">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Enhanced Demo Area */}
              {/* <div className="relative order-1 lg:order-2">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px] flex items-center justify-center shadow-2xl">
                  <div className="text-center w-full">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                      {
                        demoContent[activeDemo as keyof typeof demoContent]
                          .title
                      }
                    </h3>
                    <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                      {
                        demoContent[activeDemo as keyof typeof demoContent]
                          .description
                      }
                    </p>
                    {demoContent[activeDemo as keyof typeof demoContent].mockup}
                  </div>
                </div>

                
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full animate-bounce opacity-60"></div>
                <div
                  className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-4 h-4 sm:w-6 sm:h-6 bg-purple-500 rounded-full animate-bounce opacity-60"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div> */}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VendorsHub;
