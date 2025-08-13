import React from "react";
import { FileText, Store, ArrowRight, Clock, DollarSign } from "lucide-react";

interface RFQDashboardProps {
  onChoice: (choice: "rfq" | "store") => void;
}

const RFQDashboard: React.FC<RFQDashboardProps> = ({ onChoice }) => {
  // Mock single RFQ data - in real app, this would come from API
  const availableRFQ = {
    id: 1,
    title: "Kitchen Equipment for New Hotel",
    from: "Marriott International",
    location: "Dubai, UAE",
    deliveryDate: "March 15, 2025",
    category: "Kitchen Equipment & Commercial Appliances",
    paymentTerms: "30 days net payment",
    numberOfItems: "12 items",
    categories: ["hello"],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Purchasync!
          </h1>
          <p className="text-gray-600">
            Your company information has been saved. Now you can either respond
            to available RFQs or create your online store.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Available RFQs Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Available RFQs
                </h2>
                <p className="text-gray-600 text-sm">
                  Respond to buyer requests
                </p>
              </div>
            </div>

            {[availableRFQ].length > 0 ? (
              <div className="space-y-4 mb-6">
                {[availableRFQ].map((rfq) => (
                  <div
                    key={rfq.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {rfq.title}
                      </h3>
                      <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                        {rfq.deadline}
                      </span>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">{rfq.company}</span>
                        <span className="mx-2">•</span>
                        <span>{rfq.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <DollarSign className="w-4 h-4 mr-1" />
                        <span>{rfq.budget}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">
                      {rfq.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {rfq.categories.map((category, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 mb-6">
                <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No RFQs available at the moment</p>
                <p className="text-sm text-gray-500">
                  Check back later for new opportunities
                </p>
              </div>
            )}

            <button
              onClick={() => onChoice("rfq")}
              disabled={[availableRFQ].length === 0}
              className={`w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                [availableRFQ].length > 0
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <span>
                {[availableRFQ].length > 0
                  ? "View & Respond to RFQs"
                  : "No RFQs Available"}
              </span>
              {[availableRFQ].length > 0 && <ArrowRight className="w-5 h-5" />}
            </button>
          </div>

          {/* Create Online Store Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Create Online Store
                </h2>
                <p className="text-gray-600 text-sm">
                  Build your professional presence
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Key Information</h4>
                  <p className="text-sm text-gray-600">
                    Company description, expertise, and basic details
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Documents</h4>
                  <p className="text-sm text-gray-600">
                    Upload licenses, certificates, and permits
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Media</h4>
                  <p className="text-sm text-gray-600">
                    Logo, banner, and company images
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Social Media</h4>
                  <p className="text-sm text-gray-600">
                    Website and social media links
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-blue-600 font-bold text-sm">5</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Clients (Optional)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Client testimonials and references
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => onChoice("store")}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <span>Create Online Store</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            You can always access RFQs and manage your store from your dashboard
            later
          </p>
          <button
            onClick={() => onChoice("store")}
            className="mt-4 text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Or continue building your online store
          </button>
        </div>
      </div>
    </div>
  );
};

export default RFQDashboard;
