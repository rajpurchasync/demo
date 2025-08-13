import React from "react";
import {
  Users,
  Target,
  Heart,
  Award,
  Globe,
  TrendingUp,
  Linkedin,
  Zap,
  Network,
  CheckCircle,
  Leaf,
  ArrowRight,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const widgets = [
    {
      icon: Users,
      title: "Industry Focused",
      description: "Exclusively designed for hospitality professionals",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Globe,
      title: "AI-Powered",
      description: "Smart matching and intelligent recommendations",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Award,
      title: "Community Driven",
      description: "Connect and collaborate with industry peers",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: TrendingUp,
      title: "Quality Assured",
      description: "Verified partners and secure transactions",
      color: "from-orange-500 to-red-600",
    },
  ];

  const values = [
    {
      icon: Zap,
      title: "Simplicity",
      description:
        "We make complex procurement processes simple and intuitive for everyone to use.",
    },
    {
      icon: Network,
      title: "Connected",
      description:
        "Building bridges between hospitality professionals, suppliers, and service providers worldwide.",
    },
    {
      icon: CheckCircle,
      title: "Efficient",
      description:
        "Streamlining operations to save time, reduce costs, and maximize productivity.",
    },
    {
      icon: Leaf,
      title: "Sustainable",
      description:
        "Promoting responsible business practices and sustainable growth in the hospitality industry.",
    },
  ];

  const leadership = [
    {
      name: "Rajkumar Dhakal",
      role: "Founder & CEO",
      bio: "Led procurement for Accor Middle East & africa with 20+ years in hospitality and food service procurement in the Middle East.",
      image:
        "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      bio: "Ex-Amazon engineer specializing in marketplace platforms and supply chain technology.",
      image:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    },
    {
      name: "Emily Johnson",
      role: "Chief Operating Officer",
      bio: "Previously led procurement at Hilton Hotels, expert in hospitality supply chain optimization.",
      image:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    },
    {
      name: "David Kim",
      role: "VP of Business Development",
      bio: "Former restaurant chain executive with deep expertise in food service procurement.",
      image:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
    },
  ];
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 py-16 pt-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Crect width='11' height='11'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              We're Redefining the Future of
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Hospitality Procurement
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8 px-4 sm:px-0">
              The era of manual, fragmented sales and procurement in hospitality
              is over. We're building intelligent, intuitive AI-powered
              solutions designed to handle the tedious, repetitive work. So your
              team can focus on what truly matters: building relationships and
              driving growth.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button
                onClick={() => router("/marketplace")}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2"
              >
                <span>Go to Marketplace</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <button
                onClick={() => router("/book-demo")}
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 font-semibold backdrop-blur-sm flex items-center space-x-2"
              >
                <span>Book a Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Section */}
          {/* <div className="text-center mb-16 lg:mb-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-sm sm:text-base text-gray-600">Verified Suppliers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-2">100+</div>
                <div className="text-sm sm:text-base text-gray-600">Htels & Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-500 mb-2">10k+</div>
                <div className="text-sm sm:text-base text-gray-600">Products Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-500 mb-2">20+</div>
                <div className="text-sm sm:text-base text-gray-600">RFQs Processed</div>
              </div>
            </div>
          </div> */}

          {/* Mission Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
            <div>
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Transforming Hospitality
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Procurement
                </span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Purchasync is the all-in-one platform where hospitality
                professionals, suppliers, service providers, and distributors
                come together. Exclusively designed for hotels and restaurants,
                we streamline procurement and drive growth with ease and
                transparency.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                We're transforming how the hospitality industry connects,
                collaborates, and conducts business.
              </p>
              <button
                onClick={() => router("/book-demo")}
                className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {widgets.map((widget, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${widget.color} rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <widget.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {widget.title}
                      </h3>
                      <p className="text-sm opacity-90 leading-relaxed">
                        {widget.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Do */}
          <div className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                What We Do
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Connecting the Hospitality
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Ecosystem
                </span>
              </h2>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
              <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
                We connect hospitality professionals with the products,
                services, and partners they need—both locally and globally.
                Whether you're buying, selling, or offering services, Purchasync
                simplifies the process, making it more efficient and
                straightforward.
              </p>
            </div>
          </div>

          {/* Who We Are */}
          <div className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                A Community-Driven
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Marketplace
                </span>
              </h2>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 lg:p-12">
              <p className="text-gray-700 text-lg leading-relaxed text-center max-w-4xl mx-auto">
                We're a community-driven marketplace dedicated to the
                hospitality and food service industry. Think of us as your
                central hub where buyers, sellers, and service providers
                collaborate seamlessly to achieve success.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Our Values
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What Drives Us
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Forward
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="text-center group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-200">
                    <value.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Team */}
          <div>
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                Leadership Team
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Meet the Visionaries Behind
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Purchasync
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((leader, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-purple-600 text-sm font-medium text-center mb-4">
                    {leader.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed text-center mb-4">
                    {leader.bio}
                  </p>
                  <div className="flex justify-center">
                    <a
                      href="#"
                      className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-indigo-100 transition-colors duration-200"
                    >
                      <Linkedin className="w-4 h-4 text-gray-600" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of hospitality professionals who are already
                streamlining their procurement processes with Purchasync.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => router("/login")}
                  className="group bg-white text-blue-600 px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center space-x-2"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => router("/book-demo")}
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300 font-semibold backdrop-blur-sm flex items-center space-x-2"
                >
                  {/* <Play className="w-5 h-5" /> */}
                  <span>Book a Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
