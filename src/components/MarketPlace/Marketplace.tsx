import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  Bell,
  User,
  ChevronDown,
  Plus,
  ArrowRight,
  Users,
  FileText,
  TrendingUp,
  Leaf,
  Award,
  Globe,
  Package,
  Wrench,
  UserCheck,
  Building,
  ChevronRight,
  Sparkles,
  Settings,
  Menu,
  X,
} from "lucide-react";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("products");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const trendingTags = [
    { name: "Plant Based", icon: Leaf, color: "bg-green-500" },
    { name: "Healthy Food", icon: Heart, color: "bg-red-500" },
    { name: "Plastic Free", icon: Leaf, color: "bg-green-600" },
    { name: "Made in UAE", icon: Globe, color: "bg-blue-500" },
  ];

  const topCompanies = [
    {
      name: "Emirates Food Solutions",
      category: "Food & Beverage",
      rating: 4.8,
      reviews: 245,
      verified: true,
      image:
        "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    },
    {
      name: "Dubai Equipment Co.",
      category: "Furniture & Equipment",
      rating: 4.9,
      reviews: 189,
      verified: true,
      image:
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    },
    {
      name: "Gulf Tech Solutions",
      category: "Technology & IT",
      rating: 4.7,
      reviews: 156,
      verified: true,
      image:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    },
    {
      name: "Green Clean Services",
      category: "Professional Services",
      rating: 4.6,
      reviews: 203,
      verified: true,
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-3 py-2">
          {/* Top Row - Logo and Actions */}
          <div className="flex items-center justify-between mb-2">
            {/* Logo */}
            <a href="/">
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-gray-900">
                  Purchasync
                </span>
              </div>
            </a>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <button className="p-1.5 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-1.5 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {showMobileMenu ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                className="flex items-center space-x-1 px-2 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                {searchType === "products" ? (
                  <Package className="w-3 h-3 text-gray-600" />
                ) : (
                  <Settings className="w-3 h-3 text-gray-600" />
                )}
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {showSearchDropdown && (
                <div className="absolute top-full left-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      setSearchType("products");
                      setShowSearchDropdown(false);
                    }}
                    className={`w-full text-left px-2 py-2 text-xs hover:bg-gray-50 flex items-center space-x-1 ${
                      searchType === "products"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    <Package className="w-3 h-3" />
                    <span>Products</span>
                  </button>
                  <button
                    onClick={() => {
                      setSearchType("services");
                      setShowSearchDropdown(false);
                    }}
                    className={`w-full text-left px-2 py-2 text-xs hover:bg-gray-50 flex items-center space-x-1 ${
                      searchType === "services"
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    <Settings className="w-3 h-3" />
                    <span>Services</span>
                  </button>
                </div>
              )}
            </div>

            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  searchType === "products"
                    ? "Search products"
                    : "Search services"
                }
                className="w-full pl-7 pr-12 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-xs"
              />
              <Link
                to={searchType === "products" ? "/products" : "/services"}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-md hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center"
              >
                <Search className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {showMobileMenu && (
            <div className="mt-3 border-t border-gray-200 pt-3">
              <div className="space-y-2">
                <Link
                  to="/products"
                  className="block text-xs text-gray-600 hover:text-blue-600 py-1"
                >
                  Products
                </Link>
                <Link
                  to="/services"
                  className="block text-xs text-gray-600 hover:text-blue-600 py-1"
                >
                  Services
                </Link>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs font-medium flex items-center justify-center space-x-1">
                  <FileText className="w-3 h-3" />
                  <span>Create RFQ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Sustainable Solutions Banner */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 mb-3 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <h2 className="text-sm font-bold mb-1">
                  Sustainable Solutions
                </h2>
                <p className="text-green-100 mb-1 italic text-xs">
                  Environmental, Social & Ethical
                </p>
                <p className="text-xs text-green-100 mb-2">
                  Certificates | Filters | Tags
                </p>

                <div className="flex items-center space-x-1 mb-2">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <Leaf className="w-3 h-3" />
                  </div>
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <Award className="w-3 h-3" />
                  </div>
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <Globe className="w-3 h-3" />
                  </div>
                </div>

                <button className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg hover:bg-white/30 transition-all duration-200 font-medium text-xs">
                  Browse Now
                </button>
              </div>
            </div>

            {/* Top Companies */}
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <h2 className="text-sm font-bold text-gray-900 mb-3">
                Top Companies
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {topCompanies.map((company, index) => (
                  <Link
                    key={index}
                    to={`/seller/${company.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9-]/g, "")}`}
                    className="group border border-gray-100 rounded-lg p-2 hover:shadow-md transition-all duration-200 hover:border-blue-200 block"
                  >
                    <div className="flex items-center space-x-2">
                      <img
                        src={company.image}
                        alt={company.name}
                        className="w-8 h-8 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1 mb-0.5">
                          <h3 className="font-semibold text-xs text-gray-900 group-hover:text-blue-600 transition-colors duration-200 flex-1 truncate">
                            {company.name}
                          </h3>
                          {company.verified && (
                            <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-0.5 truncate">
                          {company.category}
                        </p>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-400 text-xs">★</span>
                          <span className="text-xs font-medium text-gray-700">
                            {company.rating}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({company.reviews})
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-200 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Trending */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-100 p-3">
              <div className="flex items-center space-x-1 mb-3">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <h2 className="text-sm font-bold text-gray-900">Trending</h2>
              </div>

              <div className="space-y-2">
                {trendingTags.map((tag, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div
                      className={`w-5 h-5 ${tag.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <tag.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-medium text-xs text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                      {tag.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
