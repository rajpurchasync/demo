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
  Camera,
  Upload,
  UserPlus,
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
  role: 'buyer' | 'seller' | 'service-provider' | '';
  companyLegalName: string;
  companyType: string;
  industry: string;
  position: string;
  country: string;
  state: string;
  city: string;
  street: string;
}


interface BuyerOnboardingData extends OnboardingData {
  role: 'buyer';
  supplierName: string;
  supplierCategory: string;
  street: string;
  supplierLabel: string;
}

interface SellerOnboardingData extends OnboardingData {
  role: 'seller';
  companyName: string;
  customerCompanyType: string;
  customerLabel: string;
  customerTypeTag: string;
  customerCountry: string;
  customerState: string;
  customerCity: string;
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
  const [buyerData, setBuyerData] = useState<BuyerOnboardingData>({
    role: 'buyer',
    companyLegalName: '',
    companyType: '',
    industry: '',
    position: '',
    country: '',
    state: '',
    city: '',
    street: '',
    supplierName: '',
    supplierCategory: '',
    supplierLabel: ''
  });


  const [sellerData, setSellerData] = useState<SellerOnboardingData>({
    role: 'seller',
    companyLegalName: '',
    companyType: '',
    industry: '',
    position: '',
    country: '',
    state: '',
    city: '',
    street: '',
    companyName: '',
    customerCompanyType: '',
    customerLabel: '',
    customerTypeTag: '',
    customerCountry: '',
    customerState: '',
    customerCity: ''
  });

  const [currentOnboardingData, setCurrentOnboardingData] = useState<OnboardingData | BuyerOnboardingData | SellerOnboardingData>(buyerData);
  const [showAddEntityModal, setShowAddEntityModal] = useState(false);
  const [showAddEntityForm, setShowAddEntityForm] = useState(false);
  const [isScanMode, setIsScanMode] = useState(false);
  const [supplierFormData, setSupplierFormData] = useState({
    companyName: '',
    website: '',
    phone: '',
    person: '',
    position: '',
    mobile: '',
    email: ''
  });
  const handleCompleteOnboarding = () => {
    setCurrentView('dashboard');
  };
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

    // Industry options
    const industries = [
      'Hospitality',
      'Food Service',
      'Retail',
      'Manufacturing',
      'Healthcare',
      'Technology',
      'Education',
      'Government',
      'Other'
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
    let interval: any;
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

  const updateCurrentData = (updates: Partial<OnboardingData | BuyerOnboardingData | SellerOnboardingData>) => {
    const newData = { ...currentOnboardingData, ...updates };
    setCurrentOnboardingData(newData);
    
    // Update the appropriate role-specific data
    if (newData.role === 'buyer') {
      setBuyerData(newData as BuyerOnboardingData);
    } else if (newData.role === 'seller') {
      setSellerData(newData as SellerOnboardingData);
    }
  };


  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === 2) { // After welcome message, open the first modal
      setShowAddEntityModal(true);
    } else if (currentStep < getMaxSteps() - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const getMaxSteps = () => {
    // Steps are: 0 (Role), 1 (Organization), 2 (Welcome)
    // Modals handle the subsequent flow, so currentStep won't go beyond 2
    return 3; 
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0: return currentOnboardingData.role !== '';
      case 1: // Organization Setup
        return currentOnboardingData.companyLegalName.trim() !== '' && 
               currentOnboardingData.companyType.trim() !== '' &&
               currentOnboardingData.industry.trim() !== '' && // Added industry validation
               currentOnboardingData.position.trim() !== '' &&
               currentOnboardingData.country !== '' &&
               currentOnboardingData.state !== ''; // State is now mandatory
      case 2: return true; // Welcome message, always proceed to modal
      default: return false; // Should not happen with current step logic
    }
  };

  const addTeamEmail = () => {
    if (
      newEmail &&
      validateEmail(newEmail) 
      // !currentOnboardingData.teamEmails.includes(newEmail)
    ) {
      updateCurrentData({
        // teamEmails: [...currentOnboardingData.teamEmails, newEmail],
      });
      setNewEmail("");
    }
  };

  const removeTeamEmail = (email: string) => {
    updateCurrentData({
      // teamEmails: currentOnboardingData.teamEmails.filter((e) => e !== email),
    });
  };

  const addExternalEmail = () => {
    if (
      newExternalEmail &&
      validateEmail(newExternalEmail)
      // !currentOnboardingData.externalEmails.includes(newExternalEmail)
    ) {
      updateCurrentData({
        // externalEmails: [
        //   ...currentOnboardingData.externalEmails,
        //   newExternalEmail,
        // ],
      });
      setNewExternalEmail("");
    }
  };
  const navigate = useNavigate();
  const removeExternalEmail = (email: string) => {
    updateCurrentData({
      // externalEmails: currentOnboardingData.externalEmails.filter(
      //   (e) => e !== email
      // ),
    });
  };

  const toggleMultiSelect = (
    value: string,
    field: "mainCustomers" | "categories"
  ) => {
    // const currentValues = currentOnboardingData[field] as string[];
    // const newValues = currentValues.includes(value)
    //   ? currentValues.filter((v) => v !== value)
    //   : [...currentValues, value];

    // updateCurrentData({ [field]: newValues });
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
              <div className="text-center mb-6 sm:mb-8">
                {currentStep === 1 && (
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Organization Setup
                  </h2>
                )}
                {currentStep === 2 && (
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Welcome to Purchasync!
                  </h2>
                )}
              </div>

              {renderOnboardingStep()}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceedToNext()}
                  className="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
                >
                  {currentStep === getMaxSteps() - 1 ? "Get Started" : "Next"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAddEntityModal = () => {
    const isBuyer = currentOnboardingData.role === 'buyer';
    
    // If showing the form (buyer only)
    if (showAddEntityForm && isBuyer) {
      return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              {isScanMode ? 'Scanned Business Card' : 'Add Supplier Manually'}
            </h3>
            
            {/* Card Image Capture Section - Only show in scan mode */}
            {isScanMode && (
              <div className="mb-6">
                <div className="w-full h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Business Card Image</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="space-y-6">
              {/* Company Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Company</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={supplierFormData.companyName}
                      onChange={(e) => setSupplierFormData(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={supplierFormData.website}
                      onChange={(e) => setSupplierFormData(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter website URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={supplierFormData.phone}
                      onChange={(e) => setSupplierFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              </div>
              
              {/* Contact Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Person</label>
                    <input
                      type="text"
                      value={supplierFormData.person}
                      onChange={(e) => setSupplierFormData(prev => ({ ...prev, person: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter contact person name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      type="text"
                      value={supplierFormData.position}
                      onChange={(e) => setSupplierFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter position/title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                    <input
                      type="tel"
                      value={supplierFormData.mobile}
                      onChange={(e) => setSupplierFormData(prev => ({ ...prev, mobile: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={supplierFormData.email}
                      onChange={(e) => setSupplierFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowAddEntityForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-base"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setShowAddEntityModal(false);
                  setShowAddEntityForm(false);
                  handleCompleteOnboarding();
                }}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      );
    }
    
    // Initial modal view
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
            {isBuyer ? 'Add your first Supplier' : 'Add your first Customer'}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
            {isBuyer ? 'Start building your supplier network.' : 'Begin connecting with your customers.'}
          </p>

          <div className="space-y-4">
            {isBuyer ? (
              <>
                <button 
                  onClick={() => {
                    setShowAddEntityForm(true);
                    setIsScanMode(true);
                    // Auto-fill demo data for scan mode
                    setSupplierFormData({
                      companyName: 'Fresh Foods Inc.',
                      website: 'www.freshfoods.com',
                      phone: '+1 (555) 123-4567',
                      person: 'John Smith',
                      position: 'Sales Manager',
                      mobile: '+1 (555) 987-6543',
                      email: 'john.smith@freshfoods.com'
                    });
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  <Camera className="w-5 h-5 text-gray-600" />
                  Scan Business Card
                </button>
                <button 
                  onClick={() => {
                    setShowAddEntityForm(true);
                    setIsScanMode(false);
                    // Clear form data for manual mode
                    setSupplierFormData({
                      companyName: '',
                      website: '',
                      phone: '',
                      person: '',
                      position: '',
                      mobile: '',
                      email: ''
                    });
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  <UserPlus className="w-5 h-5 text-gray-600" />
                  Add Manually
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    setShowAddEntityModal(false);
                    handleCompleteOnboarding();
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  <UserPlus className="w-5 h-5 text-gray-600" />
                  Add Manually
                </button>
                <button 
                  onClick={() => {
                    setShowAddEntityModal(false);
                    handleCompleteOnboarding();
                  }}
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-base font-medium"
                >
                  <Upload className="w-5 h-5 text-gray-600" />
                  Import
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };


  const renderOnboardingStep = () => {
    // Common Organization Setup Step
    if (currentStep === 1) {
      return (
        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentOnboardingData.companyLegalName}
                onChange={(e) => updateCurrentData({ companyLegalName: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Enter legal company name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentOnboardingData.companyType}
                onChange={(e) => updateCurrentData({ companyType: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="e.g., Restaurant, Hotel, Manufacturer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                value={currentOnboardingData.industry}
                onChange={(e) => updateCurrentData({ industry: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="">Select Industry</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position/Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={currentOnboardingData.position}
                onChange={(e) => updateCurrentData({ position: e.target.value })}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Your position in the company"
              />
            </div>
          </div>
          
          <div>
            <h4 className="text-base sm:text-lg font-medium text-gray-800 mb-3 sm:mb-4">Primary Location</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  value={currentOnboardingData.country}
                  onChange={(e) => updateCurrentData({ country: e.target.value, state: '', city: '' })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AU">Australia</option>
                  <option value="IN">India</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Region <span className="text-red-500">*</span>
                </label>
                <select
                  value={currentOnboardingData.state}
                  onChange={(e) => updateCurrentData({ state: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  disabled={!currentOnboardingData.country}
                >
                  <option value="">Select State/Region</option>
                  {currentOnboardingData.country === 'US' && (
                    <>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                    </>
                  )}
                  {currentOnboardingData.country === 'CA' && (
                    <>
                      <option value="ON">Ontario</option>
                      <option value="QC">Quebec</option>
                      <option value="BC">British Columbia</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  value={currentOnboardingData.city}
                  onChange={(e) => updateCurrentData({ city: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter city"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={currentOnboardingData.street}
                  onChange={(e) => updateCurrentData({ street: e.target.value })}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Enter street address"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // Welcome Step
    if (currentStep === 2) {
      return (
        <div className="text-center">
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8">
            {currentOnboardingData.role === 'buyer'
              ? 'Great! Your organization is set up. Streamline your procurement process and connect with verified suppliers.'
              : 'Great! Your organization is set up. Expand your reach and manage customer relationships efficiently.'
            }
          </p>
        </div>
      );
    }
    
    return null;
  };


  // const renderOnboardingStep = () => {
  //   const role = currentOnboardingData.role;

  //   // Buyer flow
  //   if (role === "buyer") {
  //     return (
  //       <>
  //         <BuyerOnboarding
  //           onComplete={() => {}}
  //           handlePrev={() => setCurrentStep(0)}
  //         />
  //             
  //       </>
  //     );
  //   }

  //   // Seller flow
  //   if (role === "seller") {
  //     return (
  //       <>
  //         <SellerOnboarding onComplete={() => {}} />
  //             
  //       </>
  //     );
  //   }

  //   // Service Provider flow
  //   if (role === "service-provider") {
  //     switch (currentStep) {
  //       case 1:
  //         return (
  //           <div className="space-y-6">
  //             <h3 className="text-xl font-semibold text-gray-800">
  //               What type of services do you provide?
  //             </h3>
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  //               {[
  //                 "Consulting",
  //                 "IT Services",
  //                 "Marketing",
  //                 "Legal",
  //                 "Financial",
  //                 "HR Services",
  //                 "Other",
  //               ].map((type) => (
  //                 <label
  //                   key={type}
  //                   className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:border-purple-300 hover:bg-purple-50"
  //                 >
  //                   <input
  //                     type="checkbox"
  //                     checked={
  //                       Array.isArray(currentOnboardingData.companyType)
  //                         ? currentOnboardingData.companyType.includes(type)
  //                         : currentOnboardingData.companyType === type
  //                     }
  //                     onChange={(e) => {
  //                       const currentTypes = Array.isArray(
  //                         currentOnboardingData.companyType
  //                       )
  //                         ? currentOnboardingData.companyType
  //                         : currentOnboardingData.companyType
  //                         ? [currentOnboardingData.companyType]
  //                         : [];

  //                       if (e.target.checked) {
  //                         updateCurrentData({
  //                           companyType: [...currentTypes, type],
  //                         });
  //                       } else {
  //                         updateCurrentData({
  //                           companyType: currentTypes.filter((t) => t !== type),
  //                         });
  //                       }
  //                     }}
  //                     className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
  //                   />
  //                   <span className="font-medium">{type}</span>
  //                 </label>
  //               ))}
  //             </div>
  //             {(Array.isArray(currentOnboardingData.companyType)
  //               ? currentOnboardingData.companyType.includes("Other")
  //               : currentOnboardingData.companyType === "Other") && (
  //               <input
  //                 type="text"
  //                 placeholder="Please specify..."
  //                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
  //                 onChange={(e) =>
  //                   updateCurrentData({ otherCompanyType: e.target.value })
  //                 }
  //               />
  //             )}
  //           </div>
  //         );
  //       // Add remaining service provider steps similar to other flows
  //       default:
  //         return <div>Step {currentStep} for service provider</div>;
  //     }
  //   }

  //   return <div>Invalid role</div>;
  // };
  const renderDashboard = () => {

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col">
        {/* Header */}
        {/* <div className="bg-white/80 shadow-md border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Purchasync</h1>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-700 font-medium text-base">
                  Welcome, <span className="text-purple-600">{formData.fullName || "User"}</span>!
                </span>
              </div>
            </div>
          </div>
        </div> */}

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-10 sm:p-14 flex flex-col items-center relative overflow-hidden">
              {/* Decorative Confetti */}
              <div className="absolute inset-0 pointer-events-none">
                <svg className="absolute top-0 left-0 w-32 h-32 opacity-30" viewBox="0 0 100 100">
                  <circle cx="20" cy="20" r="6" fill="#a78bfa" />
                  <circle cx="80" cy="30" r="4" fill="#f472b6" />
                  <circle cx="60" cy="80" r="5" fill="#38bdf8" />
                  <circle cx="90" cy="60" r="3" fill="#fbbf24" />
                </svg>
                <svg className="absolute bottom-0 right-0 w-32 h-32 opacity-30" viewBox="0 0 100 100">
                  <circle cx="80" cy="80" r="6" fill="#a78bfa" />
                  <circle cx="20" cy="70" r="4" fill="#f472b6" />
                  <circle cx="40" cy="20" r="5" fill="#38bdf8" />
                  <circle cx="10" cy="40" r="3" fill="#fbbf24" />
                </svg>
              </div>
              {/* Celebration Icon */}
              <div className="mb-6">
                <svg className="w-16 h-16 mx-auto animate-bounce" fill="none" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="24" fill="#a78bfa" opacity="0.15"/>
                  <path d="M24 10v18m0 0l-6-6m6 6l6-6" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="34" r="2.5" fill="#a78bfa"/>
                </svg>
              </div>
              <h2 className="text-4xl font-extrabold text-gray-800 mb-2 drop-shadow-sm">
                Welcome to Purchasync!
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Your procurement journey starts here. <br />
                <span className="text-purple-600 font-semibold">Let’s get productive!</span>
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-inner p-6 mb-8 w-full">
                <h3 className="text-2xl font-bold text-purple-700 mb-2 flex items-center gap-2">
                  <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24">
                    <path d="M12 2v20m10-10H2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Getting Started
                </h3>
                <p className="text-gray-700 text-base">
                  Your account has been <span className="font-semibold text-green-600">successfully created and verified</span>.
                  <br />
                  Explore your dashboard to manage suppliers, orders, and more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                {/* <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-200 text-lg"
                >
                  Go to Dashboard
                </button> */}
                <button
                  onClick={() => navigate("/seller-dashboard-v2")}
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-lg"
                >
                  Go to Seller Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen ">
      {/* {currentView === "landing" && (
        <LandingPage onGetStarted={() => setCurrentView("login")} />
      )} */}

      {currentView === "login" && renderLogin()}
      {currentView === "signup" && renderSignup()}
      {currentView === "otp" && renderOTP()}
      {currentView === "onboarding" && renderOnboarding()}
      {showAddEntityModal && renderAddEntityModal()}
      {currentView === "dashboard" && renderDashboard()}
    </div>
  );
};

export default MainLogin;
