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

interface SellerOnboardingProps {
  onComplete: () => void;
}

interface SellerOnboardingData {
  companyType: string[];
  otherCompanyType: string;
  mainCustomers: string[];
  companyName: string;
  companySuggestions: string[];
  showCompanySuggestions: boolean;
  selectedCountry: string;
  states: string[];
  categories: string[];
  teamInvites: string[];
  customers: string[];
}

const SellerOnboarding: React.FC<SellerOnboardingProps> = ({ onComplete }) => {
  const [sellerOnboardingStep, setSellerOnboardingStep] = useState(1);
  const [sellerOnboardingData, setSellerOnboardingData] =
    useState<SellerOnboardingData>({
      companyType: [],
      otherCompanyType: "",
      mainCustomers: [],
      companyName: "",
      companySuggestions: [],
      showCompanySuggestions: false,
      selectedCountry: "",
      states: [],
      categories: [],
      teamInvites: [],
      customers: [],
    });

  const [newTeamEmail, setNewTeamEmail] = useState("");
  const [newCustomerEmail, setNewCustomerEmail] = useState("");

  const handleSellerOnboardingStep = (direction: "next" | "prev") => {
    if (direction === "next" && sellerOnboardingStep < 8) {
      setSellerOnboardingStep(sellerOnboardingStep + 1);
    } else if (direction === "prev" && sellerOnboardingStep > 1) {
      setSellerOnboardingStep(sellerOnboardingStep - 1);
    } else if (direction === "next" && sellerOnboardingStep === 8) {
      onComplete();
    }
  };

  const handleSellerDataChange = (
    field: keyof SellerOnboardingData,
    value: any
  ) => {
    setSellerOnboardingData((prev) => ({
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
      "Apple Inc.",
      "Microsoft Corporation",
      "Amazon.com Inc.",
      "Google LLC",
      "Meta Platforms Inc.",
      "Tesla Inc.",
      "Netflix Inc.",
      "Adobe Inc.",
    ];

    if (name.length > 2) {
      const suggestions = mockCompanies.filter((company) =>
        company.toLowerCase().includes(name.toLowerCase())
      );
      handleSellerDataChange("companySuggestions", suggestions);
      handleSellerDataChange("showCompanySuggestions", suggestions.length > 0);
    } else {
      handleSellerDataChange("showCompanySuggestions", false);
    }
  };

  const selectCompanyFromSuggestion = (company: string) => {
    handleSellerDataChange("companyName", company);
    handleSellerDataChange("showCompanySuggestions", false);
  };

  const handleSellerCompanyTypeSelection = (type: string) => {
    const currentTypes = sellerOnboardingData.companyType;
    let newTypes;

    if (currentTypes.includes(type)) {
      newTypes = currentTypes.filter((t) => t !== type);
    } else {
      newTypes = [...currentTypes, type];
    }

    handleSellerDataChange("companyType", newTypes);

    if (type !== "Others") {
      handleSellerDataChange("otherCompanyType", "");
    }
  };

  const handleSellerMainCustomersSelection = (customer: string) => {
    const currentCustomers = sellerOnboardingData.mainCustomers;
    let newCustomers;

    if (customer === "No Preference") {
      newCustomers = currentCustomers.includes("No Preference")
        ? []
        : ["No Preference"];
    } else {
      if (currentCustomers.includes(customer)) {
        newCustomers = currentCustomers.filter((c) => c !== customer);
      } else {
        newCustomers = [
          ...currentCustomers.filter((c) => c !== "No Preference"),
          customer,
        ];
      }
    }

    handleSellerDataChange("mainCustomers", newCustomers);
  };

  const addTeamEmail = () => {
    if (
      newTeamEmail.trim() &&
      validateEmail(newTeamEmail.trim()) &&
      !sellerOnboardingData.teamInvites.includes(newTeamEmail.trim())
    ) {
      handleSellerDataChange("teamInvites", [
        ...sellerOnboardingData.teamInvites,
        newTeamEmail.trim(),
      ]);
      setNewTeamEmail("");
    }
  };

  const removeTeamEmail = (email: string) => {
    handleSellerDataChange(
      "teamInvites",
      sellerOnboardingData.teamInvites.filter((e) => e !== email)
    );
  };

  const addCustomerEmail = () => {
    if (
      newCustomerEmail.trim() &&
      validateEmail(newCustomerEmail.trim()) &&
      !sellerOnboardingData.customers.includes(newCustomerEmail.trim())
    ) {
      handleSellerDataChange("customers", [
        ...sellerOnboardingData.customers,
        newCustomerEmail.trim(),
      ]);
      setNewCustomerEmail("");
    }
  };

  const removeCustomerEmail = (email: string) => {
    handleSellerDataChange(
      "customers",
      sellerOnboardingData.customers.filter((e) => e !== email)
    );
  };

  // Country to states mapping
  const countryStates: { [key: string]: string[] } = {
    US: [
      "California",
      "New York",
      "Texas",
      "Florida",
      "Illinois",
      "Pennsylvania",
      "Ohio",
      "Georgia",
    ],
    CA: [
      "Ontario",
      "Quebec",
      "British Columbia",
      "Alberta",
      "Manitoba",
      "Saskatchewan",
    ],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
    AU: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
    ],
    IN: [
      "Maharashtra",
      "Karnataka",
      "Tamil Nadu",
      "Gujarat",
      "Rajasthan",
      "Uttar Pradesh",
    ],
  };

  const getStatesForCountry = (country: string): string[] => {
    return countryStates[country] || [];
  };

  const renderSellerOnboarding = () => {
    const totalSteps = 8;
    const progressPercentage = (sellerOnboardingStep / totalSteps) * 100;

    return (
      <div className="bg-white flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleSellerOnboardingStep("prev")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={sellerOnboardingStep === 1}
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Seller Setup
                </h1>
                <p className="text-sm text-gray-500">
                  Step {sellerOnboardingStep} of {totalSteps}
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
            {sellerOnboardingStep === 1 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    What type of company are you?
                  </h2>
                  <p className="text-gray-600">Select all that apply</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Product Seller",
                    "Manufacturer",
                    "Exporter",
                    "Service Provider",
                    "Freelancer",
                    "Consultancy",
                    // "Management",
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleSellerCompanyTypeSelection(type)}
                      className={`p-3 border-2 rounded-lg transition-all duration-200 text-center ${
                        sellerOnboardingData.companyType.includes(type)
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

                {sellerOnboardingData.companyType.includes("Management") && (
                  <div className="mt-4">
                    <input
                      type="text"
                      placeholder="Please specify your company type"
                      value={sellerOnboardingData.otherCompanyType}
                      onChange={(e) =>
                        handleSellerDataChange(
                          "otherCompanyType",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
            )}

            {sellerOnboardingStep === 2 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Who are your main customers?
                  </h2>
                  <p className="text-gray-600">Select all that apply</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Hotels",
                    "Restaurants",
                    "Catering",
                    "Cafes",
                    "Catering Companies",
                    "Cloud Kitchen",
                    "No Preference",
                  ].map((customer) => (
                    <button
                      key={customer}
                      onClick={() =>
                        handleSellerMainCustomersSelection(customer)
                      }
                      className={`p-3 border-2 rounded-lg transition-all duration-200 text-center ${
                        sellerOnboardingData.mainCustomers.includes(customer)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <span className="font-medium text-gray-900 text-sm">
                        {customer}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sellerOnboardingStep === 3 && (
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
                      value={sellerOnboardingData.companyName}
                      onChange={(e) => {
                        const value = e.target.value;
                        handleSellerDataChange("companyName", value);
                        searchCompanyName(value);
                      }}
                      className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      autoFocus
                    />

                    {sellerOnboardingData.showCompanySuggestions && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {sellerOnboardingData.companySuggestions.map(
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
              </div>
            )}

            {sellerOnboardingStep === 4 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Service Location
                  </h2>
                  <p className="text-gray-600">
                    Where do you provide your services?
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Countries
                    </label>
                    <select
                      value={sellerOnboardingData.selectedCountry}
                      onChange={(e) => {
                        const country = e.target.value;
                        handleSellerDataChange("selectedCountry", country);
                        // Reset states when country changes
                        handleSellerDataChange("states", []);
                      }}
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

                  {sellerOnboardingData.selectedCountry && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        States (Multiple Selection)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {getStatesForCountry(
                          sellerOnboardingData.selectedCountry
                        ).map((state) => (
                          <button
                            key={state}
                            onClick={() => {
                              const currentStates = sellerOnboardingData.states;
                              const newStates = currentStates.includes(state)
                                ? currentStates.filter((s) => s !== state)
                                : [...currentStates, state];
                              handleSellerDataChange("states", newStates);
                            }}
                            className={`p-2 border-2 rounded-lg transition-all duration-200 text-center ${
                              sellerOnboardingData.states.includes(state)
                                ? "border-purple-500 bg-purple-50"
                                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                            }`}
                          >
                            <span className="text-xs font-medium text-gray-900">
                              {state}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {sellerOnboardingStep === 5 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Categories
                  </h2>
                  <p className="text-gray-600">
                    What categories do you specialize in?
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    "Food & Beverage",
                    "Packaging",
                    "Equipment",
                    "Furniture",
                    "Textiles",
                    "Technology",
                    "Hospitality Services",
                  ].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        const currentCategories =
                          sellerOnboardingData.categories;
                        const newCategories = currentCategories.includes(
                          category
                        )
                          ? currentCategories.filter((c) => c !== category)
                          : [...currentCategories, category];
                        handleSellerDataChange("categories", newCategories);
                      }}
                      className={`p-3 border-2 rounded-lg transition-all duration-200 text-center ${
                        sellerOnboardingData.categories.includes(category)
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                      }`}
                    >
                      <span className="font-medium text-gray-900 text-sm">
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {sellerOnboardingStep === 6 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add a Team
                  </h2>
                  <p className="text-gray-600">
                    Invite team members to collaborate
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
                      className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {sellerOnboardingData.teamInvites.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">
                        Team Members:
                      </h3>
                      {sellerOnboardingData.teamInvites.map((email, index) => (
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

            {sellerOnboardingStep === 8 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Setup Complete!
                  </h2>
                  <p className="text-gray-600">
                    Your seller profile has been successfully created
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-3">
                  <a href="/seller-dashboard-v2">
                    <button
                      onClick={() => handleSellerOnboardingStep("next")}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-semibold"
                    >
                      Go to Dashboard
                    </button>
                  </a>
                  <button
                    onClick={() => {
                      // Handle view invites logic here
                      console.log("View invites clicked");
                    }}
                    className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-200 font-semibold"
                  >
                    View my Invite
                  </button>
                </div>
              </div>
            )}
            {sellerOnboardingStep === 7 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Add Customers
                  </h2>
                  <p className="text-gray-600">
                    Optional - Invite customers to collaborate with you
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter customer email"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          addCustomerEmail();
                        }
                      }}
                    />
                    <button
                      onClick={addCustomerEmail}
                      disabled={!validateEmail(newCustomerEmail)}
                      className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  {sellerOnboardingData.customers.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">
                        Added Customers:
                      </h3>
                      {sellerOnboardingData.customers.map((customer, index) => (
                        <div key={index} className="email-item">
                          <span className="flex-1">{customer}</span>
                          <button onClick={() => removeCustomerEmail(customer)}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* <div className="flex justify-end pt-3">
                  <button
                    onClick={() => handleSellerOnboardingStep("next")}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Complete Setup
                  </button>
                </div> */}
              </div>
            )}
          </div>
        </div>

        {/* Single Navigation Bar at Bottom */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="max-w-2xl mx-auto flex justify-between items-center">
            <button
              onClick={() => handleSellerOnboardingStep("prev")}
              disabled={sellerOnboardingStep === 1}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {sellerOnboardingStep < 8 && (
              <button
                onClick={() => handleSellerOnboardingStep("next")}
                disabled={
                  (sellerOnboardingStep === 1 &&
                    sellerOnboardingData.companyType.length === 0) ||
                  (sellerOnboardingStep === 2 &&
                    sellerOnboardingData.mainCustomers.length === 0) ||
                  (sellerOnboardingStep === 3 &&
                    !sellerOnboardingData.companyName.trim()) ||
                  (sellerOnboardingStep === 4 &&
                    !sellerOnboardingData.selectedCountry) ||
                  (sellerOnboardingStep === 5 &&
                    sellerOnboardingData.categories.length === 0)
                }
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {sellerOnboardingStep === 7 ? "Complete Setup" : "Next"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderSellerOnboarding();
};

export default SellerOnboarding;
