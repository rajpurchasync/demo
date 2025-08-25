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
  Phone,
  Mail,
  MapPin,
  Building2,
} from "lucide-react";
import Swal from "sweetalert2";

const BookDemo = () => {
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
    interestedAs: "",
    company: "",
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
    console.log("Form submitted:", formData);
    // Simulate login and redirect to dashboard
    navigate("/");
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
    <div className="justify-center min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 flex pt-16 lg:pt-20">
      {/* Left Side - Buyer Messaging */}

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex justify-center px-8 py-10">
        <div className="w-full max-w-md space-y-6">
          {/* Registration Form */}
          <h1 className="text-center text-4xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="text-center  bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Book a Demo
            </span>
          </h1>
          <div className="space-y-6">
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
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  placeholder="e.g., Procurement Manager, F&B Manager, General Manager"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="e.g., Purchasync LLC"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Interested as *
                </label>
                <div className="relative">
                  <select
                    name="interestedAs"
                    value={formData.interestedAs}
                    onChange={handleInputChange}
                    // className="appearance-none bg-white border border-gray-300 border-r-0 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8 pl-3 py-2.5 cursor-pointer"
                    className={`${
                      formData.interestedAs === "" ? "text-gray-400" : ""
                    } w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white`}
                  >
                    <option value="" className="!text-gray-500">
                      Select
                    </option>
                    {["Buyer", "Seller", "Others"].map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  {/* <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
                </div>
              </div>

              <button
                type="submit"
                onClick={() => {
                  Swal.fire({
                    title: "Success!",
                    text: "Your message has been sent successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                  });
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 px-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemo;
