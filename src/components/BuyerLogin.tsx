import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Search,
  FileText,
  TrendingDown,
  Users,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowLeft,
  Building,
  Hotel,
} from "lucide-react";

const BuyerLogin = () => {
  const navigate = useNavigate();
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
    "hotel" | "restaurant" | null
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Simulate login and redirect to dashboard
    navigate("/");
  };
  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Simulate login and redirect to dashboard
    navigate("/buyer-dashboard");
  };

  const handleRegisterClick = () => {
    setShowRoleSelection(true);
  };

  const handleRoleSelect = (role: "hotel" | "restaurant") => {
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

  const buyerStats = [
    {
      icon: Search,
      title: "200+ Suppliers",
      subtitle: "Verified Partners",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: FileText,
      title: "1000+ RFQs",
      subtitle: "Processed Monthly",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: TrendingDown,
      title: "30% Savings",
      subtitle: "Average Cost Reduction",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Users,
      title: "500+ Hotels",
      subtitle: "Trust Our Platform",
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex pt-16 lg:pt-20">
      {/* Left Side - Buyer Messaging */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/30 via-indigo-200/20 to-purple-200/30"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-indigo-300/20 rounded-full blur-xl animate-pulse"></div>
          <div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-indigo-300/30 to-purple-300/30 rounded-full blur-lg animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-blue-200/15 to-indigo-200/15 rounded-full blur-2xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-16">
          {/* Main Message */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Streamline Your Procurement with
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Smart Solutions
              </span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Join hundreds of hotels and restaurants who have transformed their
              procurement process. Connect with verified suppliers, create RFQs
              instantly, compare proposals, and achieve significant cost savings
              with our intelligent platform.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 font-medium">
                  Discover verified suppliers instantly
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 font-medium">
                  Create and manage RFQs effortlessly
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 font-medium">
                  Compare proposals side-by-side
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
                <span className="text-gray-700 font-medium">
                  Achieve 30% cost savings on average
                </span>
              </div>
            </div>
          </div>

          {/* Success Metrics */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Trusted by Industry Leaders
              </h3>
              <p className="text-gray-600">
                Hotels and restaurants saving time and money
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">
                  Hotels & Restaurants
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  200+
                </div>
                <div className="text-sm text-gray-600">Verified Suppliers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-1">
                  $10M+
                </div>
                <div className="text-sm text-gray-600">Cost Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  98%
                </div>
                <div className="text-sm text-gray-600">Satisfaction Rate</div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm">🚀</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    Start sourcing in minutes
                  </div>
                  <div className="text-xs text-gray-600">
                    Quick setup, immediate access to suppliers
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
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
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
                  onClick={() => handleRoleSelect("hotel")}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                      <Building className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        Hotel, Resort or Hospitality Group
                      </h3>
                      <p className="text-sm text-gray-600">
                        Procurement for hotels, resorts, and hospitality chains
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleRoleSelect("restaurant")}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-200">
                      <Hotel className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900 mb-1">
                        Restaurant, Cafe or Food Service
                      </h3>
                      <p className="text-sm text-gray-600">
                        Sourcing for restaurants, cafes, and food service
                        operations
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Registration Form */}
          {showRegistrationForm && (
            <div className="space-y-6">
              <button
                onClick={handleBackToLogin}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-600">
                  {selectedRole === "hotel"
                    ? "Hotel Buyer Registration"
                    : "Restaurant Buyer Registration"}
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
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                        className="appearance-none bg-white border border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 pl-3 py-2.5 cursor-pointer"
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
                      className="flex-1 px-3 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                    placeholder="e.g., Procurement Manager, F&B Manager, General Manager"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                      className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                      className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Terms and Conditions
                  </a>{" "}
                  &{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 underline"
                  >
                    Privacy Policy
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  Create Account
                </button>
              </form>
            </div>
          )}

          {/* Login Form */}
          {!showRoleSelection && !showRegistrationForm && (
            <div className="space-y-6">
              {/* Logo */}
              {/* <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <img
                    src="/logo.png"
                    alt="purchasync"
                    className="h-[30px] w-auto"
                  />
                  <span className="text-2xl font-bold text-gray-900">
                    Purchasync
                  </span>
                </div>
              </div> */}

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Welcome!
                </h2>
                <p className="text-gray-600">
                  {isLogin
                    ? "Sign in to your buyer account"
                    : "Create your buyer account"}
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
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                      className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
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
                        className="min-h-4 min-2-4  rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 px-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
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
                    onClick={
                      isLogin ? handleRegisterClick : () => setIsLogin(true)
                    }
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
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
};

export default BuyerLogin;
