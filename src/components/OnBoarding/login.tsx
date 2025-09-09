import React, { useState, useEffect } from "react";
import BuyerOnboarding from "./BuyerOnboarding";
import SellerOnboarding from "./SellerOnboarding";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  HelpCircle,
  ShoppingCart,
  Store,
  Wrench,
  Building2,
  Utensils,
  Hotel,
  Users,
  MapPin,
  Globe,
  Package,
  Shirt,
  Truck,
  Sofa,
  Coffee,
  ChefHat,
  Briefcase,
  Monitor,
  UserCheck,
  Laptop,
  Settings,
  HeadphonesIcon,
  Sparkles,
  Car,
  Phone,
  ChevronDown,
} from "lucide-react";
import LandingPage from "./LandingPage";
import { useNavigate } from "react-router-dom";

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  fullName: string;
  countryCode: string;
}

interface OnboardingData {
  role: "buyer" | "seller" | "service-provider" | "";
  industry: string;
  companyType: string | string[];
  companyName: string;
  country: string;
  state: string;
  city: string;
  mainCustomers: string[];
  categories: string[];
  teamEmails: string[];
  externalEmails: string[];
}

const MainLogin = ({ page = "login" }) => {
  const [currentView, setCurrentView] = useState<
    "landing" | "login" | "signup" | "otp" | "onboarding" | "dashboard"
  >(page);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newExternalEmail, setNewExternalEmail] = useState("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    fullName: "",
    countryCode: "+1",
  });

  // Separate state for each role to ensure independence
  const [buyerData, setBuyerData] = useState<OnboardingData>({
    role: "buyer",
    industry: "",
    showOtherIndustry: false,
    otherIndustry: "",
    companyType: "",
    showOtherCompanyType: false,
    otherCompanyType: "",
    companyName: "",
    showSuggestions: false,
    country: "",
    state: "",
    city: "",
    teamMembers: [] as string[],
    suppliers: [] as string[],
    newSupplierEmail: "",
  });

  const [sellerData, setSellerData] = useState<OnboardingData>({
    role: "seller",
    companyType: "",
    showOtherCompanyType: false,
    otherCompanyType: "",
    customers: [] as string[],
    companyName: "",
    showSuggestions: false,
    country: "",
    states: [] as string[],
    showStateDropdown: false,
    categories: [] as string[],
    teamMembers: [] as string[],
    newTeamEmail: "",
    customerEmails: [] as string[],
    newCustomerEmail: "",
  });

  const [serviceProviderData, setServiceProviderData] =
    useState<OnboardingData>({
      role: "service-provider",
      companyType: "",
      showOtherCompanyType: false,
      otherCompanyType: "",
      companyName: "",
      showSuggestions: false,
      country: "",
      services: [] as string[],
      teamMembers: [] as string[],
      newTeamEmail: "",
      clientEmails: [] as string[],
      newClientEmail: "",
    });

  const [currentOnboardingData, setCurrentOnboardingData] =
    useState<OnboardingData>(buyerData);

  // Country codes for mobile registration
  const countryCodes = [
    { code: "+1", country: "US/CA" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "IN" },
    { code: "+86", country: "CN" },
    { code: "+49", country: "DE" },
    { code: "+33", country: "FR" },
    { code: "+81", country: "JP" },
    { code: "+61", country: "AU" },
    { code: "+55", country: "BR" },
    { code: "+7", country: "RU" },
  ];

  // Password validation
  const validatePassword = (password: string) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);

    return {
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber,
    };
  };

  // Email validation
  const validateEmail = (email: string) => {
    return email.includes("@") && email.includes(".com");
  };

  // Mobile validation
  const validateMobile = (mobile: string) => {
    return mobile.length >= 8;
  };

  const passwordValidation = validatePassword(formData.password);
  const isEmailValid = validateEmail(formData.email);
  const isMobileValid = validateMobile(formData.mobile);
  const doPasswordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword !== "";

  const isSignupFormValid =
    formData.fullName.trim() !== "" &&
    isEmailValid &&
    passwordValidation.isValid &&
    doPasswordsMatch &&
    isMobileValid;

  // OTP Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSignup = () => {
    if (isSignupFormValid) {
      setCurrentView("otp");
      setOtpTimer(60);
    }
  };

  const handleOtpVerification = () => {
    setCurrentView("onboarding");
    setCurrentStep(0);
  };

  const handleRoleSelection = (
    role: "buyer" | "seller" | "service-provider"
  ) => {
    // Set the appropriate data based on role selection
    if (role === "buyer") {
      setCurrentOnboardingData(buyerData);
    } else if (role === "seller") {
      setCurrentOnboardingData(sellerData);
    }

    setCurrentOnboardingData((prev) => ({ ...prev, role }));
    setCurrentStep(1);
  };

  const updateCurrentData = (updates: Partial<OnboardingData>) => {
    const newData = { ...currentOnboardingData, ...updates };
    setCurrentOnboardingData(newData);

    // Update the appropriate role-specific data
    if (newData.role === "buyer") {
      setBuyerData(newData);
    } else if (newData.role === "seller") {
      setSellerData(newData);
    } else {
      setServiceProviderData(newData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    const maxSteps = getMaxSteps();
    if (currentStep < maxSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentView("dashboard");
    }
  };

  const getMaxSteps = () => {
    if (currentOnboardingData.role === "buyer") return 7;
    if (currentOnboardingData.role === "seller") return 8;
    if (currentOnboardingData.role === "service-provider") return 8;
    return 1;
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return currentOnboardingData.role !== "";
      case 1:
        if (currentOnboardingData.role === "buyer") {
          return currentOnboardingData.industry !== "";
        }
        return currentOnboardingData.companyType !== "";
      case 2:
        if (currentOnboardingData.role === "buyer") {
          return currentOnboardingData.companyType !== "";
        }
        return currentOnboardingData.mainCustomers.length > 0;
      case 3:
        return (
          currentOnboardingData.companyName
            .trim()
            .split(" ")
            .filter((word) => word.length > 0).length >= 2
        );
      case 4:
        if (currentOnboardingData.role === "buyer") {
          return (
            currentOnboardingData.country !== "" &&
            currentOnboardingData.state !== "" &&
            currentOnboardingData.city !== ""
          );
        }
        return (
          currentOnboardingData.country !== "" &&
          currentOnboardingData.state !== ""
        );
      case 5:
        if (currentOnboardingData.role === "buyer") {
          return true; // Team step is optional
        }
        return currentOnboardingData.categories.length > 0;
      case 6:
        return true; // Team/External steps are optional
      case 7:
        return true;
      default:
        return false;
    }
  };

  const addTeamEmail = () => {
    if (
      newEmail &&
      validateEmail(newEmail) &&
      !currentOnboardingData.teamEmails.includes(newEmail)
    ) {
      updateCurrentData({
        teamEmails: [...currentOnboardingData.teamEmails, newEmail],
      });
      setNewEmail("");
    }
  };

  const removeTeamEmail = (email: string) => {
    updateCurrentData({
      teamEmails: currentOnboardingData.teamEmails.filter((e) => e !== email),
    });
  };

  const addExternalEmail = () => {
    if (
      newExternalEmail &&
      validateEmail(newExternalEmail) &&
      !currentOnboardingData.externalEmails.includes(newExternalEmail)
    ) {
      updateCurrentData({
        externalEmails: [
          ...currentOnboardingData.externalEmails,
          newExternalEmail,
        ],
      });
      setNewExternalEmail("");
    }
  };
  const navigate = useNavigate();
  const removeExternalEmail = (email: string) => {
    updateCurrentData({
      externalEmails: currentOnboardingData.externalEmails.filter(
        (e) => e !== email
      ),
    });
  };

  const toggleMultiSelect = (
    value: string,
    field: "mainCustomers" | "categories"
  ) => {
    const currentValues = currentOnboardingData[field] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    updateCurrentData({ [field]: newValues });
  };

  const renderLogin = () => (
    <div className="clickup-bg pt-[75px]">
      {/* Header */}
      {/* <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <div>
            <h1 className="text-gray-800 text-xl font-bold">Purchasync</h1>
            <p className="text-gray-600 text-sm">
              The everything app for procurement.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-black text-sm font-medium">
            Don't have an account?
          </span>
          <button
            onClick={() => setCurrentView("signup")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Sign up
          </button>
        </div>
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back!
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center space-x-3 cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                R
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">Continue as Raj</div>
                <div className="text-sm text-gray-600">
                  rajdhakal31@gmail.com
                </div>
              </div>
              <div className="w-6 h-6 text-red-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center text-gray-500 text-sm">OR</div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-purple-600 hover:text-purple-700"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Enter password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/seller-dashboard-v2")}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Log In
            </button>

            <div className="text-center text-gray-600 text-sm">
              Don't have an account?
              <button
                onClick={() => setCurrentView("signup")}
                className="text-purple-600 hover:text-purple-700 font-medium ml-1"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-white/80 text-sm pb-6">
        <p>
          Don't have an account?{" "}
          <button
            onClick={() => setCurrentView("signup")}
            className="text-white hover:text-white/90 underline"
          >
            Sign up
          </button>
        </p>
        <p className="mt-4 text-xs">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>

      {/* Help Button */}
      {/* <button className="help-button">
        <HelpCircle className="w-4 h-4" />
        Help
      </button> */}

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Reset Password
            </h3>
            <p className="text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowForgotPassword(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle password reset logic here
                    setShowForgotPassword(false);
                    setResetEmail("");
                  }}
                  disabled={!validateEmail(resetEmail)}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Send Reset Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSignup = () => (
    <div className="clickup-bg">
      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-4">
          <span className="text-white/90">Already have an account?</span>
          <button
            onClick={() => navigate("/seller-dashboard")}
            className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-lg font-medium hover:bg-white/30 transition-all duration-200"
          >
            Log in
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Create your account
            </h2>
            <p className="text-gray-600">Get started with Purchasync today</p>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>

              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#F25022" d="M1 1h10v10H1z" />
                  <path fill="#00A4EF" d="M13 1h10v10H13z" />
                  <path fill="#7FBA00" d="M1 13h10v10H1z" />
                  <path fill="#FFB900" d="M13 13h10v10H13z" />
                </svg>
                Microsoft
              </button>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm mb-6">OR</div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="Enter your work email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  formData.email && !isEmailValid
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {formData.email && !isEmailValid && (
                <p className="text-red-500 text-sm mt-1">Email do not match</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="flex space-x-2">
                <div className="relative">
                  <select
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.countryCode}
                    onChange={(e) =>
                      setFormData({ ...formData, countryCode: e.target.value })
                    }
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code} {country.country}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                </div>
                <div className="relative flex-1">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    placeholder="Enter mobile number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                  />
                </div>
              </div>
              {formData.mobile && !isMobileValid && (
                <p className="text-red-500 text-sm mt-1">
                  Mobile number must be at least 8 characters
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Create password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasMinLength
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={
                          passwordValidation.hasMinLength
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        8+ chars
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasUpperCase
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={
                          passwordValidation.hasUpperCase
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        Uppercase
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasLowerCase
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={
                          passwordValidation.hasLowerCase
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        Lowercase
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          passwordValidation.hasNumber
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span
                        className={
                          passwordValidation.hasNumber
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        Number
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Confirm password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
            </div>
          </div>

          <button
            onClick={handleSignup}
            disabled={!isSignupFormValid}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Create Account
          </button>

          <div className="text-center text-gray-600 text-sm mt-4">
            Already have an account?
            <button
              onClick={() => navigate("/seller-dashboard")}
              className="text-purple-600 hover:text-purple-700 font-medium ml-1"
            >
              Log in
            </button>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className="help-button">
        <HelpCircle className="w-4 h-4" />
        Help
      </button>
    </div>
  );

  const renderOTP = () => (
    <div className="clickup-bg pt-[50px]">
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verify your email
            </h2>
            <p className="text-gray-600">
              We've sent a verification code to {formData.email}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center space-x-3">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  onChange={(e) => {
                    if (e.target.value && index < 5) {
                      const nextInput = e.target.parentElement?.children[
                        index + 1
                      ] as HTMLInputElement;
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Backspace" &&
                      !e.currentTarget.value &&
                      index > 0
                    ) {
                      const prevInput = e.target.parentElement?.children[
                        index - 1
                      ] as HTMLInputElement;
                      prevInput?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleOtpVerification}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
            >
              Verify Email
            </button>

            <div className="text-center">
              {otpTimer > 0 ? (
                <p className="text-gray-600">Resend code in {otpTimer}s</p>
              ) : (
                <button
                  onClick={() => {
                    setOtpTimer(60);
                    // Show resend confirmation
                  }}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Resend code
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOnboarding = () => (
    <div className="clickup-bg pt-[50px]">
      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[calc(100vh-100px)] overflow-y-auto">
          {currentStep === 0 && (
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                Choose your role
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
                <button
                  onClick={() => handleRoleSelection("buyer")}
                  className="flex flex-col items-center p-8 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                >
                  <ShoppingCart className="w-12 h-12 text-purple-600 mb-4" />
                  <span className="text-lg font-semibold text-gray-800">
                    Buyer
                  </span>
                </button>
                <button
                  onClick={() => handleRoleSelection("seller")}
                  className="flex flex-col items-center p-8 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                >
                  <Store className="w-12 h-12 text-purple-600 mb-4" />
                  <span className="text-lg font-semibold text-gray-800">
                    Seller
                  </span>
                </button>
              </div>
            </div>
          )}

          {currentStep > 0 && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Setup your profile
                </h2>
                <div className="text-sm text-gray-600">
                  Step {currentStep} of {getMaxSteps() - 1}
                </div>
              </div>

              {renderOnboardingStep()}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderOnboardingStep = () => {
    const role = currentOnboardingData.role;

    // Buyer flow
    if (role === "buyer") {
      return (
        <>
          <BuyerOnboarding
            onComplete={() => {}}
            handlePrev={() => setCurrentStep(0)}
          />
              
        </>
      );
    }

    // Seller flow
    if (role === "seller") {
      return (
        <>
          <SellerOnboarding onComplete={() => {}} />
              
        </>
      );
    }

    // Service Provider flow
    if (role === "service-provider") {
      switch (currentStep) {
        case 1:
          return (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">
                What type of services do you provide?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Consulting",
                  "IT Services",
                  "Marketing",
                  "Legal",
                  "Financial",
                  "HR Services",
                  "Other",
                ].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50"
                  >
                    <input
                      type="checkbox"
                      checked={
                        Array.isArray(currentOnboardingData.companyType)
                          ? currentOnboardingData.companyType.includes(type)
                          : currentOnboardingData.companyType === type
                      }
                      onChange={(e) => {
                        const currentTypes = Array.isArray(
                          currentOnboardingData.companyType
                        )
                          ? currentOnboardingData.companyType
                          : currentOnboardingData.companyType
                          ? [currentOnboardingData.companyType]
                          : [];

                        if (e.target.checked) {
                          updateCurrentData({
                            companyType: [...currentTypes, type],
                          });
                        } else {
                          updateCurrentData({
                            companyType: currentTypes.filter((t) => t !== type),
                          });
                        }
                      }}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="font-medium">{type}</span>
                  </label>
                ))}
              </div>
              {(Array.isArray(currentOnboardingData.companyType)
                ? currentOnboardingData.companyType.includes("Other")
                : currentOnboardingData.companyType === "Other") && (
                <input
                  type="text"
                  placeholder="Please specify..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onChange={(e) =>
                    updateCurrentData({ otherCompanyType: e.target.value })
                  }
                />
              )}
            </div>
          );
        // Add remaining service provider steps similar to other flows
        default:
          return <div>Step {currentStep} for service provider</div>;
      }
    }

    return <div>Invalid role</div>;
  };
  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Purchasync</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                Welcome, {formData.fullName}!
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome to Purchasync!
          </h2>
          <p className="text-gray-600 mb-8">
            Your procurement journey starts here.
          </p>
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Getting Started
            </h3>
            <p className="text-gray-600">
              Your account has been successfully created and verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen ">
      {/* {currentView === "landing" && (
        <LandingPage onGetStarted={() => setCurrentView("login")} />
      )} */}

      {currentView === "login" && renderLogin()}
      {currentView === "signup" && renderSignup()}
      {currentView === "otp" && renderOTP()}
      {currentView === "onboarding" && renderOnboarding()}
      {currentView === "dashboard" && renderDashboard()}
    </div>
  );
};

export default MainLogin;
