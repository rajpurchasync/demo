import React, { useState } from "react";
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Eye,
  MessageSquare,
  CheckCircle,
  Building,
  Package,
  UserPlus,
  Target,
  User,
  Store,
} from "lucide-react";

interface HomeProps {
  profileStatus: "pending" | "approved" | "rejected";
  isOnlineStoreConfigComplete: boolean;
}

const Home: React.FC<HomeProps> = ({
  profileStatus,
  isOnlineStoreConfigComplete,
}) => {
  const [completedSteps, setCompletedSteps] = useState({
    businessInfo: false,
    products: false,
    customers: false,
  });

  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return "Good morning";
    if (currentHour < 18) return "Good afternoon";
    return "Good evening";
  };

  const kpiData = [
    {
      label: "Total Leads",
      value: "156",
      change: "+8%",
      icon: Target,
      color: "text-blue-600",
    },
    {
      label: "Total RFQ Value",
      value: "$89,450",
      change: "+15%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      label: "Total Profile Views",
      value: "1,234",
      change: "+23%",
      icon: Eye,
      color: "text-orange-600",
    },
    {
      label: "Active Customers",
      value: "89",
      change: "+12%",
      icon: Users,
      color: "text-purple-600",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "order",
      message: "New order from Hotel Paradise",
      time: "2 hours ago",
      priority: "high",
    },
    {
      id: 2,
      type: "inquiry",
      message: "Product inquiry for premium coffee beans",
      time: "4 hours ago",
      priority: "medium",
    },
    {
      id: 3,
      type: "review",
      message: "New 5-star review received",
      time: "6 hours ago",
      priority: "low",
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received from Restaurant ABC",
      time: "1 day ago",
      priority: "medium",
    },
  ];

  const onboardingSteps = [
    {
      key: "businessInfo",
      title: "My Profile",
      description: "Complete your profile",
      icon: User,
      completed: completedSteps.businessInfo,
    },
    {
      key: "products",
      title: "Company Info",
      description: "Complete company details",
      icon: Building,
      completed: completedSteps.products,
    },
    {
      key: "customers",
      title: "Point of Sale",
      description: "Configure POS settings",
      icon: Target,
      completed: completedSteps.customers,
    },
  ];

  const completionPercentage =
    25 +
    Math.round((Object.values(completedSteps).filter(Boolean).length / 3) * 75);

  const handleActivityClick = (activityId: number) => {
    console.log(`Opening task ${activityId}`);
    // Simulate opening task
  };

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey as keyof typeof prev],
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      {/* <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Home</h1>
        <p className="text-sm text-gray-600 mt-1">Your dashboard overview</p>
      </div> */}
      {/* <div className="flex items-center space-x-4">
        <button
          disabled={!isOnlineStoreConfigComplete}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            isOnlineStoreConfigComplete
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Preview Store</span>
        </button>
      </div> */}

      {/* Greeting */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
        <h1 className="text-lg sm:text-2xl font-bold mb-2">
          {getGreeting()}, John! 👋
        </h1>
        <p className="text-xs sm:text-sm text-purple-100">
          Welcome to your dashboard.
        </p>
      </div>

      {/* Sticky Profile Completion - Ultra Minimal */}
      {completionPercentage < 100 && (
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200 rounded-lg p-4 sm:p-6 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm sm:text-lg font-bold text-gray-900">
                  Complete Your Profile
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Get the most out of Purchasync
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                {completionPercentage}%
              </div>
              <div className="text-xs sm:text-xs text-gray-500 font-medium">
                Complete
              </div>
            </div>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mb-4">
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 rounded-full transition-all duration-700 ease-out relative shadow-sm"
                style={{ width: `${completionPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-30 animate-pulse rounded-full"></div>
                <div className="absolute right-0 top-0 h-full w-1 bg-white opacity-50 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {onboardingSteps.map((step) => (
              <button
                key={step.key}
                onClick={() => toggleStep(step.key)}
                className={`p-3 sm:p-4 rounded-xl border text-left transition-all duration-300 hover:scale-105 ${
                  step.completed
                    ? "bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-800 shadow-md"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 hover:border-purple-300 shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <step.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs font-semibold">{step.title}</span>
                  </div>
                  {step.completed && (
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  )}
                </div>
                <p className="hidden md:block  text-xs text-gray-500 mt-1 leading-tight">
                  {step.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Quick Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              Add Customer
            </span>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
            <Package className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              Add Product
            </span>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
            <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              View Analytics
            </span>
          </button>
          <button className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow text-center">
            <MessageSquare className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="text-xs sm:text-sm font-medium text-gray-900">
              Messages
            </span>
          </button>
        </div>
      </div>

      {/* Compact KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="bg-white p-3 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                <span className="text-xs font-medium text-gray-600 hidden sm:block">
                  {kpi.label}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className="text-sm sm:text-lg font-bold text-gray-900">
                {kpi.value}
              </div>
              <div className="text-xs font-medium text-gray-600 sm:hidden">
                {kpi.label}
              </div>
              <div
                className={`text-xs ${
                  kpi.change.startsWith("+") ? "text-green-600" : "text-red-600"
                }`}
              >
                {kpi.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity - Clickable Rows */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-xs sm:text-sm font-semibold text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              onClick={() => handleActivityClick(activity.id)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.priority === "high"
                        ? "bg-red-500"
                        : activity.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                  />
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
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

export default Home;
