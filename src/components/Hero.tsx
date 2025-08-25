import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Search,
  FileText,
  TrendingDown,
  Store,
  Eye,
  Send,
  TrendingUp,
  ChevronDown,
  X,
  Users,
  DollarSign,
  Bell,
  Home,
  Bot,
  Package,
  Megaphone,
  Settings,
  BarChart3,
  MessageSquare,
  CheckCircle,
  Clock,
  Star,
  Award,
  Sparkles,
} from "lucide-react";
import { useNavigate, useNavigation } from "react-router-dom";

const Hero = () => {
  const [activeTab, setActiveTab] = useState<"buyers" | "sellers">("buyers");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [showExpandedForm, setShowExpandedForm] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [selectedRFQType, setSelectedRFQType] = useState<string | null>(null);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [signupType, setSignupType] = useState<"buyers" | "sellers">("buyers");
  const [showDashboardPreview, setShowDashboardPreview] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    surname: "",
    jobTitle: "",
    phone: "",
    country: "+1",
  });

  const countries = [
    { code: "+1", name: "US", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+91", name: "IN", flag: "🇮🇳" },
    { code: "+86", name: "CN", flag: "🇨🇳" },
    { code: "+49", name: "DE", flag: "🇩🇪" },
    { code: "+33", name: "FR", flag: "🇫🇷" },
    { code: "+81", name: "JP", flag: "🇯🇵" },
    { code: "+61", name: "AU", flag: "🇦🇺" },
  ];
  const router = useNavigate();
  const handleSignupClick = (type: "buyers" | "sellers") => {
    setSignupType(type);
    setShowDashboardPreview(true);
    if (type === "buyers") {
      router("/become-a-buyer");
    } else {
      router("/become-a-seller");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup form submitted:", { ...formData, type: signupType });
    // Handle form submission here
  };

  const content = {
    buyers: {
      title: "The smart",
      subtitle: "procurement workspace",
      highlight: "for hospitality and food service",
      description:
        "Make your procurement process 10x faster. Connect with top hospitality suppliers, request proposals, compare instantly and close deals faster - all with real time updates and communcation.",
      ctaText: "Sign up Now",
      features: [
        {
          icon: Search,
          title: "Supplier Discovery",
          description:
            "Connect with local and global suppliers and service providers",
        },
        {
          icon: FileText,
          title: "Streamlined Sourcing",
          description: "Create RFQ, get vendor match and invite for proposals",
        },
        {
          icon: TrendingDown,
          title: "Best Deals",
          description: "Compare Proposals and send for approvals",
        },
        {
          icon: Send,
          title: "Real-time updates",
          description: "Get instant notifications and updates on your requests",
        },
      ],
    },
    sellers: {
      title: "The powerful",
      subtitle: "sales channel",
      highlight: "for hospitality suppliers and providers",
      description:
        "Grow your sales online up to 30%. Build your online store,  get discovered by hospitality buyers, get matched on RFQs and respond to proposals request faster.",
      ctaText: "Start Selling!",
      features: [
        {
          icon: Store,
          title: "Branded Storefront",
          description: "Create your professional online presence",
        },
        {
          icon: Send,
          title: "Powerful Sales Channel",
          description: "Reach more customers and grow your business",
        },
        {
          icon: Eye,
          title: "Direct Access to Buyers",
          description: "Connect directly with hospitality professionals",
        },
        {
          icon: TrendingUp,
          title: "Business Growth Tools",
          description: "Analytics and tools to scale your business",
        },
      ],
    },
  };

  const currentContent = content[activeTab];
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
    <section
      id="home"
      className=" flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 pt-20 sm:pt-16 relative overflow-hidden"
    >
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating orbs that respond to mouse */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-xl animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full blur-lg animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      {/* Mouse follower effect - Fixed implementation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(147, 51, 234, 0.15), rgba(59, 130, 246, 0.08) 30%, transparent 60%)`,
        }}
      ></div>

      <div className="max-w-full md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-8 lg:py-20 md:!pb-5">
        <div
          className="text-center pt-0"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const section = e.currentTarget.closest("section");
            if (section) {
              section.style.setProperty("--mouse-x", `${x}px`);
              section.style.setProperty("--mouse-y", `${y}px`);
            }
          }}
        >
          {/* Tab Switcher - Integrated into Hero */}
          {/* <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center bg-white/95 backdrop-blur-md rounded-full p-1 shadow-xl border border-white/20 mx-4 sm:mx-0">
              <button
                onClick={() => setActiveTab("buyers")}
                className={`min-h-0 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === "buyers"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                For Buyers
              </button>
              <button
                onClick={() => setActiveTab("sellers")}
                className={`min-h-0 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeTab === "sellers"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-indigo-600"
                }`}
              >
                For Sellers
              </button>
            </div>
          </div> */}
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-100 backdrop-blur-sm text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg border border-blue-100">
            {/* <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> */}
            <span>Hospitality Collaboration Simplified</span>
          </div>
          <h1 className="text-[34px] md:text-[52px] font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
            The smart
            <br className="block md:hidden" />{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {" "}
              procurement hub
            </span>{" "}
            for hospitality and food service
          </h1>

          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 mb-6 sm:mb-8 lg:mb-10 px-4 sm:px-8 mx-auto leading-relaxed max-w-4xl">
            {/* {currentContent.description} */}
            Hotels, restaurants, suppliers, and service providers connect,
            collaborate, and grow together in one connected workspace and
            marketplace.
          </p>

          <div className="mb-8 sm:mb-12 lg:mb-16 flex flex-col gap-8 md:gap-5">
            {!showEmailInput && !showExpandedForm ? (
              <div className="flex   items-center justify-center md:justify-center gap-4">
                <button
                  onClick={() => handleSignupClick(activeTab)}
                  className="grow md:grow-0 md:max-w-max max-w-[50%] w-[45%] group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl relative overflow-hidden text-sm sm:text-base font-semibold md:w-max sm:w-auto justify-center"
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <span>{currentContent.ctaText}</span>
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
            ) : (
              <div className="flex flex-col items-center justify-center gap-4">
                {/* Simple Email Input */}
                {showEmailInput && !showExpandedForm && (
                  <div className="w-full max-w-md">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-white/30 p-2 flex flex-col sm:flex-row items-center gap-2">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        name="email"
                        placeholder="Enter Work Email"
                        className="flex-1 w-full sm:w-auto px-4 py-2 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 text-center sm:text-left"
                        required
                      />
                      <button
                        onClick={() => setShowExpandedForm(true)}
                        className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 sm:px-6 py-2 rounded-full hover:from-purple-500 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto text-sm sm:text-base"
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                )}

                {/* Expanded Form */}
                {showExpandedForm && (
                  <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-2xl border border-white/30 transition-all duration-500 ease-out">
                      <form onSubmit={handleSubmit} className="relative">
                        {/* Desktop/Tablet Layout */}
                        <div className="hidden lg:flex items-center p-3 gap-3">
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="your.email@company.com"
                            className="flex-1 px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                            required
                          />
                          <div className="w-px h-8 bg-gray-200"></div>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John"
                            className="flex-1 px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                            required
                          />
                          <div className="w-px h-8 bg-gray-200"></div>
                          <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            placeholder="Smith"
                            className="flex-1 px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                            required
                          />
                          <div className="w-px h-8 bg-gray-200"></div>
                          <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            placeholder="VP of Sales"
                            className="flex-1 px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                            required
                          />
                          <div className="w-px h-8 bg-gray-200"></div>
                          <div className="flex items-center">
                            <div className="relative">
                              <select
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="appearance-none bg-transparent border-0 focus:outline-none text-gray-700 pr-6 pl-2 py-3 cursor-pointer text-sm lg:text-base"
                              >
                                {countries.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.code}
                                  >
                                    {country.flag} {country.code}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="123456789"
                              className="w-24 px-2 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            Create Account
                          </button>
                        </div>

                        {/* Mobile Layout */}
                        <div className="lg:hidden p-3 sm:p-4 space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your.email@company.com"
                              className="flex-1 px-3 lg:px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 text-sm lg:text-base"
                              required
                            />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="John"
                              className="flex-1 px-3 lg:px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 text-sm lg:text-base"
                              required
                            />
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              name="surname"
                              value={formData.surname}
                              onChange={handleInputChange}
                              placeholder="Smith"
                              className="flex-1 px-3 lg:px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 text-sm lg:text-base"
                              required
                            />
                            <input
                              type="text"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleInputChange}
                              placeholder="VP of Sales"
                              className="flex-1 px-3 lg:px-4 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 text-sm lg:text-base"
                              required
                            />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex bg-gray-50 rounded-xl overflow-hidden flex-1">
                              <select
                                name="country"
                                value={formData.country}
                                onChange={handleInputChange}
                                className="appearance-none bg-transparent border-0 focus:outline-none text-gray-700 px-3 py-3 cursor-pointer"
                              >
                                {countries.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.code}
                                  >
                                    {country.flag} {country.code}
                                  </option>
                                ))}
                              </select>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="123456789"
                                className="flex-1 px-2 py-3 bg-transparent border-0 focus:outline-none text-gray-700 placeholder-gray-400 text-sm lg:text-base"
                                required
                              />
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg"
                          >
                            Create Account
                          </button>
                        </div>

                        {/* Close button */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowEmailInput(false);
                            setShowExpandedForm(false);
                          }}
                          className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Always show dashboard below */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
