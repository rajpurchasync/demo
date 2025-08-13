import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Store,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowLeft,
  Building,
  Briefcase,
  Loader2,
  AlertCircle,
} from "lucide-react";
import AuthModal from "./Seller/AuthModal";
import CompanyInfoForm from "./Seller/CompanyInfoForm";
import RFQDashboard from "./Seller/RFQDashboard";
import OnlineStoreSetup from "./Seller/OnlineStoreSetup";
import StorePreview from "./Seller/StorePreview";
import SellerDashboard from "./SellerDashboard";

const SellerLogin = () => {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<AppState>("home");
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>("pending");
  const [userData, setUserData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);
  const [storeData, setStoreData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<
    "login" | "register" | "otp" | "forgot" | ""
  >("");
  const handleStartSelling = () => {
    setCurrentState("auth");
  };

  const handleAuthSuccess = (data: any) => {
    console.log("Authentication successful:", data);
    setUserData(data);
    if (data.type === "login") {
      // If user is logging in, go directly to dashboard
      setProfileStatus("approved"); // Set approved status for existing users
      setCurrentState("dashboard");
    } else if (data.type === "register") {
      // Registration submitted, stay in auth modal for OTP
      return;
    } else if (data.type === "otp-verified") {
      console.log("OTP verified:", data);
      // OTP verified, now go to company info
      setCurrentState("company-info");
    }
    renderCurrentState();
  };

  const handleCompanyInfoComplete = (data: any) => {
    setCompanyData(data);
    // After company info, show RFQ dashboard to check for available RFQs
    setCurrentState("rfq-dashboard");
  };

  const handleRFQChoice = (choice: "rfq" | "store") => {
    if (choice === "rfq") {
      // Handle RFQ flow - for now, just show message
      alert("RFQ flow will be implemented");
    } else {
      // Continue to store setup
      setCurrentState("store-setup");
    }
  };

  const handleStoreSetupComplete = (data: any) => {
    setStoreData(data);
    // Show store preview

    setCurrentState("store-preview");
  };

  const handleStoreSubmit = () => {
    // Profile submitted for review - go to dashboard with success message
    setProfileStatus("pending");
    setCurrentState("dashboard");
  };
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setErrors({ otp: "Please enter complete OTP" });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // After OTP verification, user should go to company info form
      handleAuthSuccess({ ...formData, type: "otp-verified" });
    }, 1500);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phone: "",
    country: "+1",
    position: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [selectedRole, setSelectedRole] = useState<
    "product" | "service" | null
  >(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const countries = [
    { code: "+1", name: "US", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+91", name: "IN", flag: "🇮🇳" },
    { code: "+86", name: "CN", flag: "🇨🇳" },
    { code: "+49", name: "DE", flag: "🇩🇪" },
    { code: "+33", name: "FR", flag: "🇫🇷" },
    { code: "+81", name: "JP", flag: "🇯🇵" },
    { code: "+61", name: "AU", flag: "🇦🇺" },
  ];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/seller-dashboard");
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // setShowRegistrationForm(false);

    setActiveTab("otp");
    console.log("Form submitted:", formData);
    // Simulate login and redirect to dashboard
    // navigate("/seller-dashboard");
  };

  const handleRegisterClick = () => {
    setShowRoleSelection(true);
  };

  const handleRoleSelect = (role: "product" | "service") => {
    setSelectedRole(role);
    setShowRoleSelection(false);
    setShowRegistrationForm(true);
  };

  const handleBackToLogin = () => {
    setShowRoleSelection(false);
    setShowRegistrationForm(false);
    setSelectedRole(null);
    setIsLogin(true);
  };
  const sellerStats = [
    {
      icon: Store,
      title: "100+ Suppliers",
      subtitle: "Already Growing",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: TrendingUp,
      title: "100+ Hotels",
      subtitle: "Active Buyers",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: Users,
      title: "200+ Restaurants",
      subtitle: "Sourcing Daily",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: DollarSign,
      title: "50+ Distributors",
      subtitle: "Expanding Reach",
      color: "from-orange-500 to-red-600",
    },
  ];
  const renderCurrentState = () => {
    console.log("Rendering current state:", currentState);
    switch (currentState) {
      case "auth":
        return (
          <AuthModal
            isOpen={true}
            onClose={() => setCurrentState("home")}
            onSuccess={handleAuthSuccess}
            initialTab="register"
          />
        );

      case "company-info":
        return <CompanyInfoForm onComplete={handleCompanyInfoComplete} />;

      case "rfq-dashboard":
        return <RFQDashboard onChoice={handleRFQChoice} />;

      case "store-setup":
        return (
          <OnlineStoreSetup
            onComplete={handleStoreSetupComplete}
            companyData={companyData}
          />
        );

      case "store-preview":
        return (
          <StorePreview
            companyData={companyData}
            storeData={storeData}
            onSubmit={handleStoreSubmit}
            onEdit={() => setCurrentState("store-setup")}
          />
        );

      case "dashboard":
        navigate("/seller-dashboard");
        return <></>;

      case "store-success":
        return (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Store Successfully Created!
              </h1>
              <p className="text-gray-600 mb-8">
                Your online store has been submitted for admin approval. You'll
                receive a notification once it's approved.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to={`/seller/${
                    companyData?.companyName
                      ?.toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "") || "preview"
                  }`}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  Preview Your Store
                </Link>
                <button
                  onClick={() => setCurrentState("dashboard")}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 flex pt-16 lg:pt-20">
            {/* Left Side - Seller Messaging */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-200/30 via-blue-200/20 to-indigo-200/30"></div>

              {/* Floating Elements */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-purple-300/20 rounded-full blur-xl animate-pulse"></div>
                <div
                  className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-300/30 to-blue-300/30 rounded-full blur-lg animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/15 to-purple-200/15 rounded-full blur-2xl animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
              </div>

              <div className="relative z-10 flex flex-col justify-center px-12 py-16">
                {/* Main Message */}
                <div className="mb-12">
                  <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    Grow Your Business with
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {" "}
                      Hospitality's
                    </span>
                    <br />
                    Leading Marketplace
                  </h1>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Join thousands of suppliers, distributors, and service
                    providers who are expanding their reach and increasing
                    revenue through our platform. Connect directly with hotels
                    and restaurants looking for your products and services.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 font-medium">
                        Build your professional storefront
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 font-medium">
                        Get matched with qualified buyers
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 font-medium">
                        Respond to RFQs instantly
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700 font-medium">
                        Track performance with analytics
                      </span>
                    </div>
                  </div>
                </div>

                {/* Success Metrics */}
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Join the Success
                    </h3>
                    <p className="text-gray-600">
                      Thousands of businesses are already growing with us
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold text-purple-600 mb-1">
                        100+
                      </div>
                      <div className="text-sm text-gray-600">
                        Active Suppliers
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-blue-600 mb-1">
                        50+
                      </div>
                      <div className="text-sm text-gray-600">
                        Hotel Partners
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-green-600 mb-1">
                        $50M+
                      </div>
                      <div className="text-sm text-gray-600">Transactions</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        95%
                      </div>
                      <div className="text-sm text-gray-600">
                        Satisfaction Rate
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-sm">💡</span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          Start selling in 24 hours
                        </div>
                        <div className="text-xs text-gray-600">
                          Quick setup, instant visibility to buyers
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex justify-center px-8 py-16">
              <div className="w-full max-w-md space-y-6">
                {/* Role Selection */}
                {showRoleSelection && (
                  <div className="text-center space-y-6">
                    <button
                      onClick={handleBackToLogin}
                      className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Choose Your Business Type
                      </h2>
                      <p className="text-gray-600">
                        Select the option that best describes your business
                      </p>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => handleRoleSelect("product")}
                        className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                            <Building className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-gray-900 mb-1">
                              Product Seller, Brand or Manufacturer
                            </h3>
                            <p className="text-sm text-gray-600">
                              Sell physical products, food & beverage,
                              equipment, supplies
                            </p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleRoleSelect("service")}
                        className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-200">
                            <Briefcase className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-gray-900 mb-1">
                              Service Provider, Consultancy or Agency
                            </h3>
                            <p className="text-sm text-gray-600">
                              Offer services, consulting, maintenance,
                              professional services
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                {showRegistrationForm && activeTab !== "otp" && (
                  <div className="space-y-6">
                    <button
                      onClick={handleBackToLogin}
                      className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>

                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Create Your Account
                      </h2>
                      <p className="text-gray-600">
                        {selectedRole === "product"
                          ? "Product Seller Registration"
                          : "Service Provider Registration"}
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="First name"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="surname"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Surname *
                          </label>
                          <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            placeholder="Last name"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@company.com"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number *
                        </label>
                        <div className="flex">
                          <div className="relative">
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="appearance-none bg-white border border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-8 pl-3 py-2.5 cursor-pointer"
                            >
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.flag} {country.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="123456789"
                            className="flex-1 px-3 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="position"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Position *
                        </label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={formData.position}
                          onChange={handleInputChange}
                          placeholder="e.g., Sales Manager, CEO, Business Owner"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create a strong password"
                            className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Re-enter Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your password"
                            className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="text-xs text-gray-600 leading-relaxed">
                        By signing up you agree to Purchasync{" "}
                        <a
                          href="#"
                          className="text-purple-600 hover:text-purple-700 underline"
                        >
                          Terms and Conditions
                        </a>{" "}
                        &{" "}
                        <a
                          href="#"
                          className="text-purple-600 hover:text-purple-700 underline"
                        >
                          Privacy Policy
                        </a>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                      >
                        Create Account
                      </button>
                    </form>
                  </div>
                )}
                {activeTab === "otp" && (
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ✓
                      </div>
                      <div className="w-12 h-0.5 bg-green-500"></div>
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        2
                      </div>
                      <div className="w-12 h-0.5 bg-gray-300"></div>
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs font-bold">
                        3
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      Verify Your Email
                    </h2>
                    <p className="text-gray-600 mb-6">
                      We've sent a 6-digit verification code to
                      <br />
                      <strong>{formData.email}</strong>
                    </p>

                    <form onSubmit={handleOtpSubmit} className="space-y-6">
                      <div className="flex justify-center space-x-2">
                        {otp.map((digit, index) => (
                          <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        ))}
                      </div>
                      {errors.otp && (
                        <p className="text-red-500 text-sm">{errors.otp}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          "Verify Email"
                        )}
                      </button>

                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        onClick={() => {
                          // Resend OTP logic
                          alert("OTP resent successfully");
                        }}
                      >
                        Didn't receive code? Resend
                      </button>
                    </form>
                  </div>
                )}
                {/* Login Form */}
                {!showRoleSelection && !showRegistrationForm && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Welcome!
                      </h2>
                      <p className="text-gray-600">
                        {isLogin
                          ? "Sign in to your seller account"
                          : "Create your seller account"}
                      </p>
                    </div>

                    <form onSubmit={handleSubmitLogin} className="space-y-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                          >
                            {showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {isLogin && (
                        <div className="flex items-center justify-between">
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              Remember me
                            </span>
                          </label>
                          <a
                            href="#"
                            className="text-sm text-purple-600 hover:text-purple-700 transition-colors duration-200"
                          >
                            Forgot password?
                          </a>
                        </div>
                      )}

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                      >
                        {isLogin ? "Sign In" : "Create Account"}
                      </button>
                    </form>

                    <div className="text-center">
                      <p className="text-gray-600">
                        {isLogin
                          ? "Don't have an account? "
                          : "Already have an account? "}
                        <button
                          onClick={() => setIsLogin(true)}
                          className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-200"
                        >
                          {isLogin ? "Register here" : "Sign in here"}
                        </button>
                      </p>
                    </div>

                    <div className="text-center">
                      <Link
                        to="/"
                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        ← Back to homepage
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-[100px]">
      {renderCurrentState()}
    </div>
  );
};

export default SellerLogin;
