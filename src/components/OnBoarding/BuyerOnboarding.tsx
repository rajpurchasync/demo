import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  X,
  Plus,
  Users,
  Building2,
} from "lucide-react";

interface BuyerOnboardingProps {
  onComplete: () => void;
  handlePrev: () => void;
}

interface BuyerOnboardingData {
  industry: string;
  otherIndustry: string;
  companyType: string[];
  otherCompanyType: string;
  companyName: string;
  companySuggestions: string[];
  showCompanySuggestions: boolean;
  country: string;
  state: string;
  city: string;
  title: string;
  teamInvites: string[];
  suppliers: string[];
}

const BuyerOnboarding: React.FC<BuyerOnboardingProps> = ({
  onComplete,
  handlePrev,
}) => {
  const [buyerOnboardingStep, setBuyerOnboardingStep] = useState(1);
  const [buyerOnboardingData, setBuyerOnboardingData] =
    useState<BuyerOnboardingData>({
      industry: "",
      otherIndustry: "",
      companyType: [],
      otherCompanyType: "",
      companyName: "",
      companySuggestions: [],
      showCompanySuggestions: false,
      country: "",
      state: "",
      city: "",
      title: "",
      teamInvites: [],
      suppliers: [],
    });

  const [newTeamEmail, setNewTeamEmail] = useState("");
  const [newSupplierEmail, setNewSupplierEmail] = useState("");

  const handleBuyerOnboardingStep = (direction: "next" | "prev") => {
    if (direction === "next" && buyerOnboardingStep < 8) {
      setBuyerOnboardingStep(buyerOnboardingStep + 1);
    } else if (direction === "prev" && buyerOnboardingStep >= 1) {
      if (buyerOnboardingStep === 1) {
        handlePrev();
      } else {
        setBuyerOnboardingStep(buyerOnboardingStep - 1);
      }
    } else if (direction === "next" && buyerOnboardingStep === 8) {
      onComplete();
    }
  };

  const handleBuyerDataChange = (
    field: keyof BuyerOnboardingData,
    value: any
  ) => {
    setBuyerOnboardingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateEmail = (email: string) => {
    return email.includes("@") && email.includes(".") && email.length > 5;
  };

  const searchCompanyName = (name: string) => {
    // Mock company search - in real app, this would be an API call
    const mockCompanies = [
      "Marriott International",
      "Hilton Hotels",
      "McDonald's Corporation",
      "Starbucks Coffee Company",
      "Subway Restaurants",
      "KFC Corporation",
      "Pizza Hut",
      "Domino's Pizza",
    ];

    if (name.length > 2) {
      const suggestions = mockCompanies.filter((company) =>
        company.toLowerCase().includes(name.toLowerCase())
      );
      handleBuyerDataChange("companySuggestions", suggestions);
      handleBuyerDataChange("showCompanySuggestions", suggestions.length > 0);
    } else {
      handleBuyerDataChange("showCompanySuggestions", false);
    }
  };

  const selectCompanyFromSuggestion = (company: string) => {
    handleBuyerDataChange("companyName", company);
    handleBuyerDataChange("showCompanySuggestions", false);
  };

  const handleBuyerIndustrySelection = (industry: string) => {
    handleBuyerDataChange("industry", industry);
    if (industry !== "Others") {
      handleBuyerDataChange("otherIndustry", "");
    }
    setTimeout(() => handleBuyerOnboardingStep("next"), 300);
  };

  const handleBuyerCompanyTypeSelection = (type: string) => {
    const currentTypes = buyerOnboardingData.companyType;
    let newTypes;

    if (currentTypes.includes(type)) {
      newTypes = currentTypes.filter((t) => t !== type);
    } else {
      newTypes = [...currentTypes, type];
    }

    handleBuyerDataChange("companyType", newTypes);

    if (type !== "Others") {
      handleBuyerDataChange("otherCompanyType", "");
    }
  };

  const addTeamEmail = () => {
    if (
      newTeamEmail.trim() &&
      validateEmail(newTeamEmail.trim()) &&
      !buyerOnboardingData.teamInvites.includes(newTeamEmail.trim())
    ) {
      handleBuyerDataChange("teamInvites", [
        ...buyerOnboardingData.teamInvites,
        newTeamEmail.trim(),
      ]);
      setNewTeamEmail("");
    }
  };

  const removeTeamEmail = (email: string) => {
    handleBuyerDataChange(
      "teamInvites",
      buyerOnboardingData.teamInvites.filter((e) => e !== email)
    );
  };

  const addSupplierEmail = () => {
    if (
      newSupplierEmail.trim() &&
      validateEmail(newSupplierEmail.trim()) &&
      !buyerOnboardingData.suppliers.includes(newSupplierEmail.trim())
    ) {
      handleBuyerDataChange("suppliers", [
        ...buyerOnboardingData.suppliers,
        newSupplierEmail.trim(),
      ]);
      setNewSupplierEmail("");
    }
  };

  const removeSupplierEmail = (email: string) => {
    handleBuyerDataChange(
      "suppliers",
      buyerOnboardingData.suppliers.filter((e) => e !== email)
    );
  };

  const handleBuyerTeamInviteToggle = (email: string) => {
    const currentInvites = buyerOnboardingData.teamInvites;
    if (currentInvites.includes(email)) {
      handleBuyerDataChange(
        "teamInvites",
        currentInvites.filter((e) => e !== email)
      );
    } else {
      handleBuyerDataChange("teamInvites", [...currentInvites, email]);
    }
  };

  const handleBuyerAddSupplier = (email: string) => {
    if (email.trim() && !buyerOnboardingData.suppliers.includes(email.trim())) {
      handleBuyerDataChange("suppliers", [
        ...buyerOnboardingData.suppliers,
        email.trim(),
      ]);
    }
  };

  const renderBuyerOnboarding = () => {
    const totalSteps = 8;
    const progressPercentage = (buyerOnboardingStep / totalSteps) * 100;

    return (
      <div className="bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleBuyerOnboardingStep("prev")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                // disabled={buyerOnboardingStep === 1}
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Buyer Setup
                </h1>
                <p className="text-sm text-gray-500">
                  Step {buyerOnboardingStep} of {totalSteps}
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(progressPercentage)}% complete
            </div>
          </div>
          <div className="max-w-4xl mx-auto mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="progress-bar h-1 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-6">
          <div className="max-w-2xl mx-auto">
            {buyerOnboardingStep === 1 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    What industry are you in?
                  </h2>
                  <p className="text-gray-600">
                    This helps us customize your experience
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {["Hospitality", "Foodservice", "Others"].map((industry) => (
                    <button
                      key={industry}
                      onClick={() => handleBuyerIndustrySelection(industry)}
                      className="w-full p-4 text-left border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 group-hover:text-purple-700">
                          {industry}
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500" />
                      </div>
                    </button>
                  ))}
                </div>

                {buyerOnboardingData.industry === "Others" && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Please specify your industry"
                      value={buyerOnboardingData.otherIndustry}
                      onChange={(e) =>
                        handleBuyerDataChange("otherIndustry", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      autoFocus
                    />
                    <div className="flex justify-end pt-3">
                      <button
                        onClick={() => handleBuyerOnboardingStep("next")}
                        disabled={!buyerOnboardingData.otherIndustry.trim()}
                        className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {buyerOnboardingStep === 2 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    What type of company are you?
                  </h2>
                  <p className="text-gray-600">Select your company type</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Hotel",
                    "Resort",
                    "Restaurant",
                    "Cafe",
                    "Bar",
                    "Catering",
                    "Cloud Kitchen",
                    "Reseller",
                    "Others",
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleBuyerCompanyTypeSelection(type)}
                      className={`p-3 border-2 rounded-lg transition-all duration-200 text-center ${
                        buyerOnboardingData.companyType.includes(type)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <span className="font-medium text-gray-900 text-sm">
                        {type}
                      </span>
                    </button>
                  ))}
                </div>

                {buyerOnboardingData.companyType.includes("Others") && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Please specify your company type"
                      value={buyerOnboardingData.otherCompanyType}
                      onChange={(e) =>
                        handleBuyerDataChange(
                          "otherCompanyType",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      autoFocus
                    />
                  </div>
                )}

                {/* <div className="flex justify-end pt-3">
                  <button
                    onClick={() => handleBuyerOnboardingStep('next')}
                    disabled={buyerOnboardingData.companyType.length === 0}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div> */}
              </div>
            )}

            {buyerOnboardingStep === 3 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    What's your company name?
                  </h2>
                  <p className="text-gray-600">Enter your full company name</p>
                </div>

                <div className="space-y-4 relative">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter your company name"
                      value={buyerOnboardingData.companyName}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleBuyerDataChange("companyName", value);
                        searchCompanyName(value);
                      }}
                      className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      autoFocus
                    />

                    {buyerOnboardingData.showCompanySuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {buyerOnboardingData.companySuggestions.map(
                          (company, index) => (
                            <button
                              key={index}
                              onClick={() =>
                                selectCompanyFromSuggestion(company)
                              }
                              className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                            >
                              {company}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className="flex justify-end pt-3">
                  <button
                    onClick={() => handleBuyerOnboardingStep("next")}
                    disabled={!buyerOnboardingData.companyName.trim()}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div> */}
              </div>
            )}

            {buyerOnboardingStep === 4 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Where is your company located?
                  </h2>
                  <p className="text-gray-600">
                    This helps us connect you with local suppliers
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={buyerOnboardingData.country}
                      onChange={(e) =>
                        handleBuyerDataChange("country", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                      State/Province
                    </label>
                    <select
                      value={buyerOnboardingData.state}
                      onChange={(e) =>
                        handleBuyerDataChange("state", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={!buyerOnboardingData.country}
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                      <option value="FL">Florida</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your city"
                      value={buyerOnboardingData.city}
                      onChange={(e) =>
                        handleBuyerDataChange("city", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {buyerOnboardingStep === 5 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    What is your title?
                  </h2>
                  <p className="text-gray-600">
                    Help us understand your role in the organization
                  </p>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="e.g., Procurement Manager, Operations Director, Owner"
                    value={buyerOnboardingData.title}
                    onChange={(e) =>
                      handleBuyerDataChange("title", e.target.value)
                    }
                    className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
              </div>
            )}

            {buyerOnboardingStep === 6 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Invite a team to join your workspace
                  </h2>
                  <p className="text-gray-600">
                    Optional - Add team members to collaborate
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter team member email"
                      value={newTeamEmail}
                      onChange={(e) => setNewTeamEmail(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addTeamEmail();
                        }
                      }}
                    />
                    <button
                      onClick={addTeamEmail}
                      disabled={!validateEmail(newTeamEmail)}
                      className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {buyerOnboardingData.teamInvites.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">
                        Team Members:
                      </h3>
                      {buyerOnboardingData.teamInvites.map((email, index) => (
                        <div key={index} className="email-item">
                          <span className="flex-1">{email}</span>
                          <button onClick={() => removeTeamEmail(email)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {buyerOnboardingStep === 7 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add a supplier
                  </h2>
                  <p className="text-gray-600">
                    Optional - Invite suppliers to collaborate with you
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter supplier email"
                      value={newSupplierEmail}
                      onChange={(e) => setNewSupplierEmail(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addSupplierEmail();
                        }
                      }}
                    />
                    <button
                      onClick={addSupplierEmail}
                      disabled={!validateEmail(newSupplierEmail)}
                      className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {buyerOnboardingData.suppliers.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">
                        Added Suppliers:
                      </h3>
                      {buyerOnboardingData.suppliers.map((supplier, index) => (
                        <div key={index} className="email-item">
                          <span className="flex-1">{supplier}</span>
                          <button onClick={() => removeSupplierEmail(supplier)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {buyerOnboardingStep === 8 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Setup Complete!
                  </h2>
                  <p className="text-gray-600">
                    Your buyer profile has been successfully created
                  </p>
                </div>

                <div className="flex justify-center pt-3">
                  <button
                    onClick={() => handleBuyerOnboardingStep("next")}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold"
                  >
                    Create RFQ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Single Navigation Bar at Bottom */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <button
              onClick={() => handleBuyerOnboardingStep("prev")}
              disabled={buyerOnboardingStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {buyerOnboardingStep < 8 && (
              <button
                onClick={() => handleBuyerOnboardingStep("next")}
                disabled={
                  (buyerOnboardingStep === 1 &&
                    buyerOnboardingData.industry === "") ||
                  (buyerOnboardingStep === 2 &&
                    buyerOnboardingData.companyType.length === 0) ||
                  (buyerOnboardingStep === 3 &&
                    !buyerOnboardingData.companyName.trim()) ||
                  (buyerOnboardingStep === 4 &&
                    (!buyerOnboardingData.country ||
                      !buyerOnboardingData.state ||
                      !buyerOnboardingData.city)) ||
                  (buyerOnboardingStep === 5 &&
                    !buyerOnboardingData.title.trim())
                }
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {buyerOnboardingStep === 7 ? "Complete Setup" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderBuyerOnboarding();
};

export default BuyerOnboarding;
