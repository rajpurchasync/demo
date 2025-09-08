import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Target,
  Package,
  TrendingUp,
  Users,
  MessageSquare,
  Bot,
  Building,
  User,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  Plus,
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  CheckCircle,
  AlertCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  Upload,
  Download,
  BarChart3,
  PieChart,
  TrendingDown,
  ArrowUpRight,
  Zap,
  Shield,
  Award,
  Briefcase,
  ShoppingBag,
  Camera,
  Link,
  Percent,
  UserPlus,
  Send,
  Reply,
  Archive,
  Flag,
  MoreHorizontal,
  ExternalLink,
  Copy,
  Share2,
  Heart,
  MessageCircle,
  Bookmark,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Home,
  Store,
  CreditCard,
  Truck,
  Factory,
  Coffee,
  UtensilsCrossed,
  Building2,
  Palette,
  Volume2,
  VolumeX,
  ToggleLeft,
  ToggleRight,
  Smile,
  FileImage,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MapPin as Location,
  Banknote,
  Languages,
  Calendar as CalendarIcon,
  Users2,
  TrendingUp as Growth,
  AlignCenterVertical as Certificate,
  Image as ImageIcon,
  Tag,
  Layers,
  Grid,
  List,
  SortAsc,
  SortDesc,
  ChevronLeft,
} from "lucide-react";
import MainRFQ from "./Seller/Proposals/MainRFQ";
import Sidebar from "./Buyer/Sidebar";

interface SellerDashboardProps {
  profileStatus: "pending" | "approved" | "rejected";
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ profileStatus }) => {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState("7d");
  const [profileCompletion, setProfileCompletion] = useState(60);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const isNewSubmission =
      profileStatus === "pending" &&
      !localStorage.getItem("profile_submitted_before");
    const isFirstTime = !localStorage.getItem("dashboard_visited");

    if (isNewSubmission) {
      localStorage.setItem("profile_submitted_before", "true");
    }

    if (isFirstTime) {
      setIsFirstLogin(true);
      localStorage.setItem("dashboard_visited", "true");
    }
  }, [profileStatus]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
    {
      id: "opportunities",
      label: "Opportunities",
      icon: Target,
      badge: 8,
      subItems: [
        { id: "rfqs", label: "RFQs", badge: 5 },
        { id: "samples", label: "Samples", badge: 3 },
      ],
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      badge: null,
      subItems: [
        { id: "product-list", label: "Product List" },
        { id: "varieties", label: "Varieties Manager" },
        { id: "pricing", label: "Pricing Manager" },
      ],
    },
    {
      id: "marketing",
      label: "Marketing",
      icon: TrendingUp,
      badge: "New",
      subItems: [
        { id: "promotions", label: "Promotions & Deals" },
        { id: "affiliates", label: "Affiliates" },
      ],
    },
    { id: "customers", label: "Customers", icon: Users, badge: 3 },
    { id: "messages", label: "Messages", icon: MessageSquare, badge: 12 },
    {
      id: "ai-employees",
      label: "AI Employees",
      icon: Bot,
      badge: "Beta",
      subItems: [
        { id: "customer-service-ai", label: "Customer Service AI" },
        { id: "sales-ai", label: "Sales AI" },
      ],
    },
    {
      id: "business-info",
      label: "Business Info",
      icon: Building,
      badge: null,
      subItems: [
        { id: "core-info", label: "Core Info" },
        { id: "store-profile", label: "Store Profile" },
        { id: "locations", label: "Locations" },
        { id: "brands", label: "Brands" },
      ],
    },
    {
      id: "profile-settings",
      label: "Profile & Settings",
      icon: User,
      badge: null,
    },
  ];

  const kpiData = [
    {
      label: "Total RFQs",
      value: "47",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "bg-blue-500",
      link: "opportunities",
    },
    {
      label: "In-Process RFQs",
      value: "8",
      change: "+3 new",
      trend: "up",
      icon: Clock,
      color: "bg-orange-500",
      link: "opportunities",
    },
    {
      label: "RFQ Value",
      value: "$124K",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
      link: "opportunities",
    },
    {
      label: "New Leads",
      value: "23",
      change: "+5 today",
      trend: "up",
      icon: Target,
      color: "bg-purple-500",
      link: "customers",
    },
    {
      label: "Store Views",
      value: "1,247",
      change: "+8%",
      trend: "up",
      icon: Eye,
      color: "bg-indigo-500",
      link: "marketing",
    },
    {
      label: "Store Clicks",
      value: "342",
      change: "+15%",
      trend: "up",
      icon: ArrowUpRight,
      color: "bg-pink-500",
      link: "marketing",
    },
  ];

  const activityFeed = [
    {
      type: "rfq",
      title: "New RFQ from Hilton Dubai",
      description: "Kitchen equipment for new property - Click to respond",
      time: "2 hours ago",
      status: "new",
      priority: "high",
      icon: FileText,
      action: "Respond Now",
    },
    {
      type: "sample",
      title: "Sample request expiring in 2 days",
      description: "Four Seasons - Linen samples",
      time: "1 day ago",
      status: "urgent",
      priority: "high",
      icon: Package,
      action: "Send Sample",
    },
    {
      type: "customer",
      title: "New customer inquiry",
      description: "Marriott International - Bulk food supplies",
      time: "3 hours ago",
      status: "new",
      priority: "medium",
      icon: Users,
      action: "View Details",
    },
    {
      type: "order",
      title: "Order completed - $2,450",
      description: "Hilton Dubai - Cleaning supplies delivered",
      time: "5 hours ago",
      status: "completed",
      priority: "low",
      icon: CheckCircle,
      action: "View Order",
    },
  ];

  const getStatusColor = (status: string, priority: string = "medium") => {
    if (status === "urgent") return "border-l-red-500 bg-red-50";
    if (status === "new" && priority === "high")
      return "border-l-orange-500 bg-orange-50";
    if (status === "new") return "border-l-blue-500 bg-blue-50";
    if (status === "completed") return "border-l-green-500 bg-green-50";
    return "border-l-gray-300 bg-gray-50";
  };

  const ProfileCompletionBanner = () => {
    if (profileCompletion >= 100) return null;

    return (
      <div className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Profile {profileCompletion}% complete
              </h3>
              <p className="text-sm text-gray-600">
                Finish store setup to unlock Marketing features
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {profileCompletion}%
            </div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-4 text-sm">
            <span className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Company Info
            </span>
            <span className="flex items-center text-green-600">
              <CheckCircle className="w-4 h-4 mr-1" />
              Store Setup
            </span>
            <span className="flex items-center text-orange-600">
              <Clock className="w-4 h-4 mr-1" />
              Product Catalog
            </span>
          </div>
          <button
            onClick={() => setActiveMenu("business-info")}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Complete Setup →
          </button>
        </div>
      </div>
    );
  };

  const GettingStartedTiles = () => {
    if (!isFirstLogin) return null;

    const startingTasks = [
      {
        title: "Add Products",
        description: "Start showcasing your offerings",
        icon: Package,
        color: "bg-blue-500",
        action: () => setActiveMenu("products"),
      },
      {
        title: "Upload Certificates",
        description: "Build trust with buyers",
        icon: Certificate,
        color: "bg-green-500",
        action: () => setActiveMenu("business-info"),
      },
      {
        title: "Configure AI Assistant",
        description: "Automate customer responses",
        icon: Bot,
        color: "bg-purple-500",
        action: () => setActiveMenu("ai-employees"),
      },
      {
        title: "Complete Store Profile",
        description: "Boost your visibility",
        icon: Building,
        color: "bg-orange-500",
        action: () => setActiveMenu("business-info"),
      },
    ];

    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Getting Started
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {startingTasks.map((task, index) => (
            <button
              key={index}
              onClick={task.action}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div
                className={`w-12 h-12 ${task.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <task.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderOpportunities = () => {
    const currentSubMenu = activeSubMenu || "rfqs";

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Opportunities
            </h1>
            <p className="text-gray-600 mt-1">
              Manage RFQs and sample requests
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSubMenu("rfqs")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "rfqs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              RFQs (5)
            </button>
            <button
              onClick={() => setActiveSubMenu("samples")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "samples"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Samples (3)
            </button>
          </nav>
        </div>

        {currentSubMenu === "rfqs" && (
          <>
            <MainRFQ />
          </>
        )}

        {currentSubMenu === "samples" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Buyer Name
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Business
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Date Requested
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Product
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3].map((sample) => (
                    <tr key={sample} className="hover:bg-gray-50">
                      <td className="py-4 px-6 font-medium text-gray-900">
                        Sarah Johnson
                      </td>
                      <td className="py-4 px-6">
                        <div>
                          <div className="font-medium text-gray-900">
                            Four Seasons Hotel
                          </div>
                          <div className="text-sm text-gray-500">
                            Luxury Hotel
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">Dec 15, 2024</td>
                      <td className="py-4 px-6 text-gray-600">
                        Premium Linen Set
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">
                            Accept
                          </button>
                          <button className="px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm">
                            Reject
                          </button>
                          <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProducts = () => {
    const currentSubMenu = activeSubMenu || "product-list";

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Products
            </h1>
            <p className="text-gray-600 mt-1">Manage your product catalog</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload className="w-4 h-4" />
              <span>Bulk Upload</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSubMenu("product-list")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "product-list"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Product List
            </button>
            <button
              onClick={() => setActiveSubMenu("varieties")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "varieties"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Varieties Manager
            </button>
            <button
              onClick={() => setActiveSubMenu("pricing")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "pricing"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Pricing Manager
            </button>
          </nav>
        </div>

        {currentSubMenu === "product-list" && (
          <>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Categories</option>
                  <option>Food & Beverage</option>
                  <option>Kitchen Equipment</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${
                      viewMode === "list"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${
                      viewMode === "grid"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Product
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Category
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Subcategory
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        View on Marketplace
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3, 4].map((product) => (
                      <tr key={product} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <img
                              src="https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                              alt="Product"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                Premium Olive Oil
                              </div>
                              <div className="text-sm text-gray-500">
                                Extra Virgin, 500ml
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          Food & Beverage
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          Oils & Vinegars
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">View</span>
                          </button>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {currentSubMenu === "varieties" && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Varieties Manager
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Manage size, color, and range variations for your products
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Product
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Category
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      # Varieties
                    </th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[1, 2, 3].map((variety) => (
                    <tr key={variety} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src="https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                            alt="Product"
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="font-medium text-gray-900">
                              Premium Olive Oil
                            </div>
                            <div className="text-sm text-gray-500">
                              Base product
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">
                        Food & Beverage
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                          3 varieties
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                          <Edit className="w-4 h-4" />
                          <span>Edit Varieties</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentSubMenu === "pricing" && (
          <>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>All Locations</option>
                <option>Dubai, UAE</option>
                <option>Abu Dhabi, UAE</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>USD</option>
                <option>AED</option>
                <option>EUR</option>
              </select>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Pricing Manager
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Manage location-based pricing and currency settings
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Product
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Base Price
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Dubai Price
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Abu Dhabi Price
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3].map((pricing) => (
                      <tr key={pricing} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <img
                              src="https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
                              alt="Product"
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                Premium Olive Oil
                              </div>
                              <div className="text-sm text-gray-500">
                                500ml bottle
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">
                          $25.00
                        </td>
                        <td className="py-4 px-6 text-gray-600">AED 92.00</td>
                        <td className="py-4 px-6 text-gray-600">AED 95.00</td>
                        <td className="py-4 px-6">
                          <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                            <Edit className="w-4 h-4" />
                            <span>Edit Pricing</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderMarketing = () => {
    const currentSubMenu = activeSubMenu || "promotions";

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Marketing
            </h1>
            <p className="text-gray-600 mt-1">
              Manage promotions and affiliate programs
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSubMenu("promotions")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "promotions"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Promotions & Deals
            </button>
            <button
              onClick={() => setActiveSubMenu("affiliates")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "affiliates"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Affiliates
            </button>
          </nav>
        </div>

        {currentSubMenu === "promotions" && (
          <>
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Plus className="w-4 h-4" />
                <span>Create Promotion</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Promotion Name
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        From
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        To
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Discount
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2, 3].map((promo) => (
                      <tr key={promo} className="hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium text-gray-900">
                          Holiday Special
                        </td>
                        <td className="py-4 px-6 text-gray-600">
                          Dec 20, 2024
                        </td>
                        <td className="py-4 px-6 text-gray-600">Jan 5, 2025</td>
                        <td className="py-4 px-6 text-gray-600">15%</td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {currentSubMenu === "affiliates" && (
          <>
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Plus className="w-4 h-4" />
                <span>Create Affiliate</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Affiliate Name
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Commission
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Total Sales
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Status
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {[1, 2].map((affiliate) => (
                      <tr key={affiliate} className="hover:bg-gray-50">
                        <td className="py-4 px-6 font-medium text-gray-900">
                          Restaurant Supply Partners
                        </td>
                        <td className="py-4 px-6 text-gray-600">5%</td>
                        <td className="py-4 px-6 text-gray-600">$12,450</td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const renderCustomers = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Customers
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your customer relationships
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Calendar className="w-4 h-4" />
              <span>Date Range</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <UserPlus className="w-4 h-4" />
              <span>Add Customer</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Locations</option>
            <option>Dubai, UAE</option>
            <option>Abu Dhabi, UAE</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>All Types</option>
            <option>Hotels</option>
            <option>Restaurants</option>
            <option>Cafes</option>
          </select>
        </div>

        {/* Customer Segments */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-blue-500 text-blue-600 py-2 px-1 font-medium">
              Active (23)
            </button>
            <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 font-medium">
              Credit Customers (8)
            </button>
          </nav>
        </div>

        {/* Customer List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Customer Name
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Type
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Location
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Account Type
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Last Order
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Total Value
                  </th>
                  <th className="text-left py-3 px-6 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[1, 2, 3, 4, 5].map((customer) => (
                  <tr key={customer} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            MH
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Marriott Hotel Dubai
                          </div>
                          <div className="text-sm text-gray-500">
                            marriott.dubai@hotel.com
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Hotel</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">Dubai, UAE</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                        Premium
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">Dec 15, 2024</td>
                    <td className="py-4 px-6 font-medium text-gray-900">
                      $24,500
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderMessages = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Messages
            </h1>
            <p className="text-gray-600 mt-1">
              Buyer-seller communication inbox
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Archive className="w-4 h-4" />
              <span>Archive</span>
            </button>
          </div>
        </div>

        {/* Message Filters */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="border-b-2 border-blue-500 text-blue-600 py-2 px-1 font-medium">
              Unread (12)
            </button>
            <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 font-medium">
              Priority (3)
            </button>
            <button className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 py-2 px-1 font-medium">
              Linked to RFQ (5)
            </button>
          </nav>
        </div>

        {/* Messages List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="divide-y divide-gray-200">
            {[1, 2, 3, 4, 5].map((message) => (
              <div
                key={message}
                className="p-6 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">FS</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-medium text-gray-900">
                          Four Seasons Hotel
                        </h3>
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">
                          High Priority
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                          RFQ #1001
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>2 hours ago</span>
                      </div>
                    </div>
                    <p className="text-gray-900 font-medium mb-1">
                      Re: Kitchen Equipment Quote Request
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      Thank you for your detailed quote. We have a few questions
                      about the delivery timeline and installation services...
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                        <Reply className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        <Bot className="w-4 h-4" />
                        <span>AI Reply</span>
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600">
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderAIEmployees = () => {
    const currentSubMenu = activeSubMenu || "customer-service-ai";

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              AI Employees
            </h1>
            <p className="text-gray-600 mt-1">
              Configure your AI assistants for customer service and sales
            </p>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveSubMenu("customer-service-ai")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "customer-service-ai"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Customer Service AI
            </button>
            <button
              onClick={() => setActiveSubMenu("sales-ai")}
              className={`border-b-2 py-2 px-1 font-medium ${
                currentSubMenu === "sales-ai"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Sales AI
            </button>
          </nav>
        </div>

        {currentSubMenu === "customer-service-ai" && (
          <div className="space-y-6">
            {/* AI Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Customer Service AI
                    </h3>
                    <p className="text-sm text-gray-600">
                      Automated customer support assistant
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Status:</span>
                  <button className="flex items-center space-x-2">
                    <ToggleRight className="w-6 h-6 text-green-500" />
                    <span className="text-sm font-medium text-green-600">
                      Enabled
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">247</div>
                  <div className="text-sm text-gray-600">Messages Handled</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">94%</div>
                  <div className="text-sm text-gray-600">Resolution Rate</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">2.3s</div>
                  <div className="text-sm text-gray-600">Avg Response Time</div>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Avatar & Personality */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Avatar & Personality
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Avatar
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="w-8 h-8 text-white" />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload className="w-4 h-4" />
                        <span>Upload Avatar</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tone of Voice
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Professional & Friendly</option>
                      <option>Formal & Business-like</option>
                      <option>Casual & Approachable</option>
                      <option>Technical & Detailed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Knowledge Base */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Knowledge Base
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload business info, product lists, FAQs
                      </p>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Choose Files
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          Company Profile.pdf
                        </span>
                      </div>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          Product Catalog.xlsx
                        </span>
                      </div>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSubMenu === "sales-ai" && (
          <div className="space-y-6">
            {/* AI Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Sales AI
                    </h3>
                    <p className="text-sm text-gray-600">
                      Automated sales and lead management
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600">Status:</span>
                  <button className="flex items-center space-x-2">
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">
                      Disabled
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Templates & Signatures */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Templates & Signatures
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Templates
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>RFQ Response Template</option>
                      <option>Follow-up Template</option>
                      <option>Quote Template</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Signature
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Best regards,&#10;Emirates Food Solutions&#10;sales@emiratesfood.com&#10;+971 4 123 4567"
                    />
                  </div>
                </div>
              </div>

              {/* Response Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Response Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Response Time
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Within 1 hour</option>
                      <option>Within 2 hours</option>
                      <option>Within 4 hours</option>
                      <option>Within 24 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Follow-up Reminders
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Send reminder after 24 hours
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Send reminder after 3 days
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Send reminder after 1 week
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderBusinessInfo = () => {
    const currentSubMenu = activeSubMenu || "core-info";

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Business Info
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your company details and store profile
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Eye className="w-4 h-4" />
              <span>Preview Store</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <RefreshCw className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveSubMenu("core-info")}
              className={`border-b-2 py-2 px-1 font-medium whitespace-nowrap ${
                currentSubMenu === "core-info"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Core Info
            </button>
            <button
              onClick={() => setActiveSubMenu("store-profile")}
              className={`border-b-2 py-2 px-1 font-medium whitespace-nowrap ${
                currentSubMenu === "store-profile"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Store Profile
            </button>
            <button
              onClick={() => setActiveSubMenu("locations")}
              className={`border-b-2 py-2 px-1 font-medium whitespace-nowrap ${
                currentSubMenu === "locations"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Locations
            </button>
            <button
              onClick={() => setActiveSubMenu("brands")}
              className={`border-b-2 py-2 px-1 font-medium whitespace-nowrap ${
                currentSubMenu === "brands"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Brands
            </button>
          </nav>
        </div>

        {currentSubMenu === "core-info" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Company Information
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Emirates Food Solutions LLC"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Public Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Emirates Food Solutions"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>LLC</option>
                    <option>Corporation</option>
                    <option>Partnership</option>
                    <option>Sole Proprietorship</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Trade License Number
                  </label>
                  <input
                    type="text"
                    defaultValue="DED-123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tax & Legal
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT Registration
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="vat"
                        className="text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="vat"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    VAT Number
                  </label>
                  <input
                    type="text"
                    defaultValue="100123456789003"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Establishment Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2018-03-15"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSubMenu === "store-profile" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Store Profile
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      About Your Business
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell buyers about your company, expertise, and what makes you unique..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Areas of Expertise
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Food & Beverage, Kitchen Equipment, Hospitality Supplies"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Employees
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>1-10</option>
                        <option>11-50</option>
                        <option>51-200</option>
                        <option>200+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Annual Turnover
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>$100K - $500K</option>
                        <option>$500K - $1M</option>
                        <option>$1M - $5M</option>
                        <option>$5M+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Upload className="w-4 h-4" />
                        <span>Upload Logo</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Store Banner
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Upload store banner (1200x400px recommended)
                      </p>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Choose File
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Certificates & Gallery
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Certificates
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Certificate className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">
                          ISO 9001 Certificate
                        </span>
                      </div>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                      <Plus className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Add Certificate
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Gallery
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <button className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-gray-400">
                      <Plus className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Social Media & Testimonials
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Social Media Links
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Linkedin className="w-5 h-5 text-blue-600" />
                        <input
                          type="url"
                          placeholder="LinkedIn profile URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Instagram className="w-5 h-5 text-pink-600" />
                        <input
                          type="url"
                          placeholder="Instagram profile URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="flex items-center space-x-3">
                        <Facebook className="w-5 h-5 text-blue-600" />
                        <input
                          type="url"
                          placeholder="Facebook page URL"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Testimonials
                  </label>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-900">
                          Marriott International
                        </span>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        "Excellent service and quality products. Highly
                        recommended!"
                      </p>
                    </div>
                    <button className="w-full flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400">
                      <Plus className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Add Testimonial
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSubMenu === "locations" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Plus className="w-4 h-4" />
                <span>Add Location</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Head Office
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      rows={3}
                      defaultValue="Business Bay, Dubai, UAE"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        defaultValue="+971 4 123 4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="info@emiratesfood.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Delivery & Export
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Zones
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Dubai
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          defaultChecked
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Abu Dhabi
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          Sharjah
                        </span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        defaultChecked
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        Export Capabilities
                      </span>
                    </label>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                      Enable international shipping and export services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentSubMenu === "brands" && (
          <div className="space-y-6">
            <div className="flex justify-end">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <Plus className="w-4 h-4" />
                <span>Add Brand</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((brand) => (
                <div
                  key={brand}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Premium Choice
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    High-quality food products for hospitality industry
                  </p>
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderProfileSettings = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Profile & Settings
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your personal information and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue="Ahmed Al Mansouri"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="ahmed@emiratesfood.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  defaultValue="+971 50 123 4567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  defaultValue="Sales Manager"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Security Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Update Password
              </button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Notification Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-gray-600">
                    Receive notifications via email
                  </p>
                </div>
                <ToggleRight className="w-6 h-6 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">
                    SMS Notifications
                  </h4>
                  <p className="text-sm text-gray-600">
                    Receive urgent notifications via SMS
                  </p>
                </div>
                <ToggleLeft className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Silent Mode</h4>
                  <p className="text-sm text-gray-600">
                    Disable all non-critical notifications
                  </p>
                </div>
                <ToggleLeft className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4" />
                <span>Export Account Data</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="w-4 h-4" />
                <span>Reset Dashboard</span>
              </button>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                <Trash2 className="w-4 h-4" />
                <span>Delete Account</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome back, Emirates Food Solutions
                </h1>
                <p className="text-gray-600 mt-1">
                  Here's what's happening with your business today
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                </select>
                <button
                  onClick={() =>
                    window.open("/seller/emirates-food-solutions", "_blank")
                  }
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Store</span>
                </button>
              </div>
            </div>

            <ProfileCompletionBanner />
            <GettingStartedTiles />

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiData.map((kpi, index) => (
                <button
                  key={index}
                  onClick={() => setActiveMenu(kpi.link)}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 text-left group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${kpi.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <kpi.icon className="w-6 h-6 text-white" />
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{kpi.label}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {kpi.value}
                    </p>
                    <div className="flex items-center space-x-1">
                      <span
                        className={`text-sm font-medium ${
                          kpi.trend === "up" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {kpi.change}
                      </span>
                      <span className="text-sm text-gray-500">
                        vs last period
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Smart Activity Feed
                  </h2>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activityFeed.map((activity, index) => (
                    <div
                      key={index}
                      className={`border-l-4 pl-4 py-3 rounded-r-lg ${getStatusColor(
                        activity.status,
                        activity.priority
                      )}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              activity.status === "urgent"
                                ? "bg-red-500"
                                : activity.status === "new"
                                ? "bg-blue-500"
                                : "bg-green-500"
                            }`}
                          >
                            <activity.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                              {activity.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {activity.description}
                            </p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3 mr-1" />
                              {activity.time}
                            </div>
                          </div>
                        </div>
                        <button
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            activity.status === "urgent"
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : activity.status === "new"
                              ? "bg-blue-500 text-white hover:bg-blue-600"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          {activity.action}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "opportunities":
        return renderOpportunities();

      case "products":
        return renderProducts();

      case "marketing":
        return renderMarketing();

      case "customers":
        return renderCustomers();

      case "messages":
        return renderMessages();

      case "ai-employees":
        return renderAIEmployees();

      case "business-info":
        return renderBusinessInfo();

      case "profile-settings":
        return renderProfileSettings();

      default:
        return (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {menuItems.find((item) => item.id === activeMenu)?.label}
              </h2>
              <p className="text-gray-600">This section is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <Sidebar
        isCollapsed={isSidebarOpen}
        onToggleCollapse={toggleSidebar}
        isMobileMenuOpen={false}
        onToggleMobileMenu={() => {}}
        onNavigate={(item: any) => {
          setActiveMenu(item.id);
          setActiveSubMenu("");
          setIsSidebarOpen(false);
        }}
        type="buyer"
      />
      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <a href="/">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Purchasync
              </span>
            </div>
          </a>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActiveMenu(item.id);
                  setActiveSubMenu("");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                  activeMenu === item.id
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        typeof item.badge === "string"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.subItems && (
                    <ChevronRight
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeMenu === item.id ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>
              </button>

              {/* Sub Menu Items */}
              {item.subItems && activeMenu === item.id && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => {
                        setActiveSubMenu(subItem.id);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-sm transition-colors duration-200 ${
                        activeSubMenu === subItem.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{subItem.label}</span>
                      {subItem.badge && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                          {subItem.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">ES</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    Emirates Food Solutions
                  </p>
                  <p className="text-xs text-gray-500">Seller Account</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{renderContent()}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-30">
        <div className="flex justify-around">
          {["dashboard", "opportunities", "messages"].map((item) => {
            const menuItem = menuItems.find((m) => m.id === item);
            return (
              <button
                key={item}
                onClick={() => {
                  setActiveMenu(item);
                  setActiveSubMenu("");
                }}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg relative ${
                  activeMenu === item ? "text-blue-600" : "text-gray-600"
                }`}
              >
                <menuItem.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{menuItem.label}</span>
                {menuItem.badge && typeof menuItem.badge === "number" && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    {menuItem.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
