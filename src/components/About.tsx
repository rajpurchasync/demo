import React from "react";
import { Users, Award, Globe, TrendingUp } from "lucide-react";
import BeforeAfter from "./BeforeAfter";

const About = () => {
  return (
    <section id="about" className="py-8 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-2">
            Trusted by Industry Leaders
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4"></p>
        </div>

        {/* Company Logos Carousel */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 overflow-hidden">
          <div className="flex animate-scroll space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12">
            {[...Array(2)].map((_, setIndex) => (
              <div
                key={setIndex}
                className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 min-w-max"
              >
                <div className="h-8 sm:h-12 md:h-16 lg:h-20 flex items-center justify-center">
                  <svg
                    className="h-6 sm:h-8 md:h-10 lg:h-12 opacity-60 hover:opacity-80 transition-opacity duration-200"
                    viewBox="0 0 120 40"
                    fill="none"
                  >
                    <rect
                      x="10"
                      y="10"
                      width="100"
                      height="20"
                      rx="4"
                      fill="#000000"
                    />
                    <text
                      x="60"
                      y="24"
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      MARRIOTT
                    </text>
                  </svg>
                </div>
                <div className="h-8 sm:h-12 md:h-16 lg:h-20 flex items-center justify-center">
                  <svg
                    className="h-6 sm:h-8 md:h-10 lg:h-12 opacity-60 hover:opacity-80 transition-opacity duration-200"
                    viewBox="0 0 100 40"
                    fill="none"
                  >
                    <circle cx="20" cy="20" r="15" fill="#000000" />
                    <text
                      x="50"
                      y="24"
                      className="text-xs sm:text-sm font-bold fill-black"
                    >
                      HILTON
                    </text>
                  </svg>
                </div>
                <div className="h-8 sm:h-12 md:h-16 lg:h-20 flex items-center justify-center">
                  <svg
                    className="h-6 sm:h-8 md:h-10 lg:h-12 opacity-60 hover:opacity-80 transition-opacity duration-200"
                    viewBox="0 0 80 40"
                    fill="none"
                  >
                    <path
                      d="M10 30 L20 10 L30 30 M35 10 L35 30 M40 10 L50 30 L60 10"
                      stroke="#000000"
                      strokeWidth="3"
                      fill="none"
                    />
                  </svg>
                </div>
                <div className="h-8 sm:h-12 md:h-16 lg:h-20 flex items-center justify-center">
                  <svg
                    className="h-6 sm:h-8 md:h-10 lg:h-12 opacity-60 hover:opacity-80 transition-opacity duration-200"
                    viewBox="0 0 60 40"
                    fill="none"
                  >
                    <rect
                      x="5"
                      y="15"
                      width="50"
                      height="10"
                      rx="5"
                      fill="#000000"
                    />
                    <text
                      x="30"
                      y="23"
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                    >
                      IHG
                    </text>
                  </svg>
                </div>
                <div className="h-8 sm:h-12 md:h-16 lg:h-20 flex items-center justify-center">
                  <svg
                    className="h-6 sm:h-8 md:h-10 lg:h-12 opacity-60 hover:opacity-80 transition-opacity duration-200"
                    viewBox="0 0 100 40"
                    fill="none"
                  >
                    <polygon points="20,10 30,30 10,30" fill="#000000" />
                    <text
                      x="60"
                      y="24"
                      className="text-xs sm:text-sm font-bold fill-black"
                    >
                      ACCOR
                    </text>
                  </svg>
                </div>
                <div className="h-8 sm:h-12 md:h-16 lg:h-20 flex items-center justify-center">
                  <svg
                    className="h-6 sm:h-8 md:h-10 lg:h-12 opacity-60 hover:opacity-80 transition-opacity duration-200"
                    viewBox="0 0 120 40"
                    fill="none"
                  >
                    <path
                      d="M10 30 Q20 10 30 30 Q40 10 50 30"
                      stroke="#000000"
                      strokeWidth="2"
                      fill="none"
                    />
                    <text
                      x="80"
                      y="24"
                      className="text-xs sm:text-sm font-bold fill-black"
                    >
                      WYNDHAM
                    </text>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Before and After Section */}
        <BeforeAfter />

        {/* Innovation Meets Excellence - Redesigned */}
        <div className="relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full blur-2xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-3 pt-5">
            {/* Section Header */}
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-purple-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                Innovation Meets Excellence
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                Cutting-Edge Technology for
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline">
                  {" "}
                  Modern Hospitality
                </span>
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                We've reimagined procurement and sales processes with AI-powered
                solutions that understand your business needs
              </p>
            </div>

            {/* Interactive Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered Matching",
                  description:
                    "Smart algorithms connect you with the perfect suppliers and buyers",
                  color: "from-blue-500 to-indigo-600",
                  delay: "0s",
                },
                {
                  icon: "⚡",
                  title: "Automated Workflows",
                  description:
                    "Streamline your processes with intelligent automation",
                  color: "from-purple-500 to-violet-600",
                  delay: "0.2s",
                },
                {
                  icon: "🎯",
                  title: "Intuitive Design",
                  description:
                    "User-friendly interface designed for hospitality professionals",
                  color: "from-green-500 to-emerald-600",
                  delay: "0.4s",
                },
                {
                  icon: "🔗",
                  title: "Seamless Integration",
                  description:
                    "Connect with your existing systems and workflows",
                  color: "from-orange-500 to-red-600",
                  delay: "0.6s",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 lg:hover:-translate-y-3 border border-gray-100 hover:border-purple-200 relative overflow-hidden"
                  style={{ animationDelay: feature.delay }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl lg:rounded-2xl"></div>

                  <div className="relative z-10 flex flex-col items-center md:items-start">
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br ${feature.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <span className="text-lg sm:text-xl lg:text-2xl">
                        {feature.icon}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-purple-600 transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-center md:text-left text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-transparent group-hover:border-purple-300 transition-all duration-300"></div>
                </div>
              ))}
            </div>

            {/* Interactive Dashboard Preview */}
            {/* <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-8 xl:p-12 relative overflow-hidden">
              
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Crect width='11' height='11'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: "60px 60px",
                  }}
                ></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
