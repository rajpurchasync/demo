import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

const BeforeAfter = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById("before-after-section");
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const beforeTools = [
    {
      icon: "https://img.icons8.com/color/48/microsoft-excel-2019.png",
      name: "Excel",
      rotation: "rotate-12",
      position: { top: "8%", left: "5%" },
      delay: "0s",
      prominent: true,
    },
    {
      icon: "https://img.icons8.com/color/48/pdf.png",
      name: "PDF",
      rotation: "-rotate-30",
      position: { top: "12%", right: "8%" },
      delay: "0.3s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/microsoft-word-2019.png",
      name: "Word",
      rotation: "rotate-45",
      position: { top: "25%", left: "2%" },
      delay: "0.6s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/gmail.png",
      name: "Email",
      rotation: "rotate-15",
      position: { top: "15%", right: "25%" },
      delay: "0.9s",
      prominent: true,
    },
    {
      icon: "https://img.icons8.com/color/48/phone.png",
      name: "Phone",
      rotation: "-rotate-20",
      position: { top: "35%", left: "15%" },
      delay: "1.2s",
      prominent: true,
    },
    {
      icon: "https://img.icons8.com/color/48/google-logo.png",
      name: "Google",
      rotation: "rotate-10",
      position: { top: "28%", right: "12%" },
      delay: "1.5s",
      prominent: true,
    },
    {
      icon: "https://img.icons8.com/color/48/google-drive.png",
      name: "Google Drive",
      rotation: "-rotate-15",
      position: { top: "55%", left: "8%" },
      delay: "2.1s",
      prominent: true,
    },
    {
      icon: "https://img.icons8.com/color/48/microsoft-powerpoint-2019.png",
      name: "PowerPoint",
      rotation: "rotate-25",
      position: { top: "45%", right: "18%" },
      delay: "2.4s",
      prominent: true,
    },
    {
      icon: "https://img.icons8.com/color/48/linkedin.png",
      name: "LinkedIn",
      rotation: "-rotate-60",
      position: { top: "68%", left: "3%" },
      delay: "1.8s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/sap.png",
      name: "SAP",
      rotation: "rotate-75",
      position: { top: "62%", right: "5%" },
      delay: "3.0s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/microsoft-outlook-2019.png",
      name: "Outlook",
      rotation: "-rotate-15",
      position: { top: "78%", left: "12%" },
      delay: "3.3s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/whatsapp.png",
      name: "WhatsApp",
      rotation: "rotate-45",
      position: { top: "75%", right: "8%" },
      delay: "3.6s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/slack-new.png",
      name: "Slack",
      rotation: "-rotate-30",
      position: { top: "85%", left: "25%" },
      delay: "3.9s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/microsoft-teams.png",
      name: "Teams",
      rotation: "rotate-60",
      position: { top: "88%", right: "15%" },
      delay: "4.2s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/dropbox.png",
      name: "Dropbox",
      rotation: "-rotate-45",
      position: { top: "5%", left: "35%" },
      delay: "4.5s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/trello.png",
      name: "Trello",
      rotation: "rotate-30",
      position: { top: "18%", left: "55%" },
      delay: "4.8s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/notion.png",
      name: "Notion",
      rotation: "rotate-90",
      position: { top: "42%", left: "35%" },
      delay: "5.1s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/asana.png",
      name: "Asana",
      rotation: "-rotate-60",
      position: { top: "65%", left: "45%" },
      delay: "5.4s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/monday.png",
      name: "Monday",
      rotation: "rotate-45",
      position: { top: "32%", right: "35%" },
      delay: "5.7s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/hubspot.png",
      name: "HubSpot",
      rotation: "-rotate-30",
      position: { top: "52%", right: "32%" },
      delay: "6.0s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/salesforce.png",
      name: "Salesforce",
      rotation: "rotate-75",
      position: { top: "68%", right: "25%" },
      delay: "6.3s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/jira.png",
      name: "Jira",
      rotation: "-rotate-45",
      position: { top: "82%", left: "35%" },
      delay: "6.6s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/confluence.png",
      name: "Confluence",
      rotation: "rotate-60",
      position: { top: "38%", left: "65%" },
      delay: "6.9s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/sharepoint.png",
      name: "SharePoint",
      rotation: "-rotate-30",
      position: { top: "58%", left: "75%" },
      delay: "7.2s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/quickbooks.png",
      name: "QuickBooks",
      rotation: "rotate-30",
      position: { top: "22%", left: "78%" },
      delay: "7.5s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/oracle-logo.png",
      name: "Oracle",
      rotation: "-rotate-75",
      position: { top: "92%", right: "35%" },
      delay: "7.8s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/onenote.png",
      name: "OneNote",
      rotation: "rotate-90",
      position: { top: "8%", right: "55%" },
      delay: "8.1s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/evernote.png",
      name: "Evernote",
      rotation: "-rotate-15",
      position: { top: "78%", right: "55%" },
      delay: "8.4s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/microsoft-excel-2019.png",
      name: "Excel 2",
      rotation: "rotate-75",
      position: { top: "48%", left: "55%" },
      delay: "8.7s",
      prominent: true,
    },
    {
      icon: "https://img.icons8.com/color/48/zoom.png",
      name: "Zoom",
      rotation: "-rotate-45",
      position: { top: "72%", left: "65%" },
      delay: "9.0s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/onedrive.png",
      name: "OneDrive",
      rotation: "rotate-20",
      position: { top: "35%", right: "5%" },
      delay: "9.3s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/adobe-acrobat.png",
      name: "Acrobat",
      rotation: "-rotate-35",
      position: { top: "92%", left: "8%" },
      delay: "9.6s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/skype.png",
      name: "Skype",
      rotation: "rotate-55",
      position: { top: "15%", left: "75%" },
      delay: "9.9s",
      prominent: false,
    },
    {
      icon: "https://img.icons8.com/color/48/discord-logo.png",
      name: "Discord",
      rotation: "-rotate-25",
      position: { top: "88%", left: "55%" },
      delay: "10.2s",
      prominent: false,
    },
  ];

  const orbitingFeatures = [
    { name: "Direct Message", angle: 0, radius: 120 },
    { name: "Vendor Profile", angle: 72, radius: 120 },
    { name: "Online Bidding", angle: 144, radius: 120 },
    { name: "Instant Comparisons", angle: 216, radius: 120 },
    { name: "Smart Matching", angle: 288, radius: 120 },
  ];

  return (
    <section
      id="before-after-section"
      className="py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-purple-50 via-white to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="inline-block bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            The Future is Consolidated
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6 px-2">
            Everything for Hospitality Commerce, Consolidated Within{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              One Exceptional Platform
            </span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto px-4 sm:px-0">
            We're building the next paradigm of procurement – sleek, intuitive
            and easy to use.
          </p>
        </div>

        {/* Before and After Boxes */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12">
            {/* Before Purchasync */}
            <div className="relative space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Title and Description Centered Above Box */}
              <div className="text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-black mb-2">
                  Before Purchasync
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-black font-medium">
                  Fragmented, manual processes
                </p>
              </div>

              <div className="h-[320px] md:h-[350px] bg-gradient-to-br from-red-50 to-orange-50 rounded-xl sm:rounded-2xl lg:rounded-3xl  relative overflow-hidden border-2 border-red-100">
                {/* Chaotic Scattered Tools */}
                <div className="relative h-[320px] md:h-[350px] overflow-hidden">
                  {/* Tangled lines for chaos */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-20"
                    viewBox="0 0 400 300"
                  >
                    <path
                      d="M50,50 Q150,200 300,100 T350,250"
                      stroke="#ef4444"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    <path
                      d="M100,250 Q200,50 350,150 T50,200"
                      stroke="#f97316"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="3,7"
                    />
                    <path
                      d="M200,30 Q100,150 250,200 T150,280"
                      stroke="#dc2626"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray="8,4"
                    />
                  </svg>

                  {beforeTools.map((tool, index) => (
                    <div
                      key={index}
                      className={`absolute bg-white rounded-md sm:rounded-lg ${
                        tool.prominent
                          ? "p-1.5 sm:p-2 md:p-3 lg:p-4 shadow-2xl border-2 border-red-200"
                          : "p-1 sm:p-1.5 md:p-2 lg:p-3 shadow-lg"
                      } transform ${tool.rotation} ${
                        isVisible ? "animate-pulse" : "opacity-0"
                      }`}
                      style={{
                        left: tool.position.left,
                        top: tool.position.top,
                        right: tool.position.right,
                        animationDelay: tool.delay,
                        animationDuration: "3s",
                        animationIterationCount: "infinite",
                        zIndex: tool.prominent
                          ? 15
                          : Math.floor(Math.random() * 10),
                        transform: `${tool.rotation} ${
                          tool.prominent
                            ? "scale(0.6) sm:scale(0.8) lg:scale(1) xl:scale(1.2)"
                            : "scale(0.4) sm:scale(0.6) lg:scale(0.8) xl:scale(1)"
                        }`,
                      }}
                    >
                      <img
                        src={tool.icon}
                        alt={tool.name}
                        className={`${
                          tool.prominent
                            ? "w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8"
                            : "w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-6 lg:h-6"
                        } mb-0.5 sm:mb-1 mx-auto`}
                        onError={(e) => {
                          // Fallback to text if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = "none";
                          const fallback = document.createElement("div");
                          fallback.textContent = tool.name.charAt(0);
                          fallback.className = `${
                            tool.prominent
                              ? "text-sm sm:text-lg md:text-2xl"
                              : "text-xs sm:text-base md:text-xl"
                          } font-bold text-gray-600`;
                          target.parentNode?.appendChild(fallback);
                        }}
                      />
                      <div
                        className={`${
                          tool.prominent
                            ? "text-xs sm:text-sm font-bold text-red-700"
                            : "text-xs font-medium text-gray-700"
                        } text-center leading-tight`}
                      >
                        {tool.name}
                      </div>
                    </div>
                  ))}

                  {/* Additional chaos elements */}
                  <div className="absolute top-1/4 left-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-ping"></div>
                  <div
                    className="absolute top-3/4 right-1/4 w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-orange-400 rounded-full animate-bounce"
                    style={{ animationDelay: "1s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 left-1/4 w-1 h-1 bg-red-500 rounded-full animate-pulse"
                    style={{ animationDelay: "2s" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* After Purchasync */}
            <div className="relative space-y-3 sm:space-y-4 lg:space-y-6">
              {/* Title and Description Centered Above Box */}
              <div className="text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-black mb-2">
                  After Purchasync
                </h3>
                <p className="text-xs sm:text-sm lg:text-base text-black font-medium">
                  Centralized, intelligent workflows
                </p>
              </div>

              <div className="h-[320px] md:h-[350px] bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl sm:rounded-2xl lg:rounded-3xl p-0  relative overflow-hidden border-2 border-indigo-200">
                {/* Central Hub with Radiating Features */}
                <div className="relative h-[320px] md:h-[350px] flex items-center justify-center">
                  {/* Central Purchasync Hub with Pulsing Animation */}
                  <div className="relative z-20 w-12 h-12  md:w-16 md:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                    {/* <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" /> */}
                    <img
                      src="/logo-color.png"
                      alt="logo"
                      className="w-auto h-4 "
                    />
                    {/* Glowing ring effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 opacity-30 animate-ping"></div>
                  </div>

                  {/* Radiating Feature Tags with Hub-and-Spoke Pattern */}
                  {orbitingFeatures.map((feature, index) => {
                    const angle = index * 72 * (Math.PI / 180); // Convert to radians
                    const radius =
                      window.innerWidth < 640
                        ? 90
                        : window.innerWidth < 768
                        ? 60
                        : window.innerWidth < 1024
                        ? 80
                        : 120;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <div key={index} className="absolute">
                        {/* Connecting Line from Hub to Tag */}
                        <svg
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                          width={radius * 2}
                          height={radius * 2}
                          style={{ zIndex: 5 }}
                        >
                          <line
                            x1={radius}
                            y1={radius}
                            x2={radius + x}
                            y2={radius + y}
                            stroke="url(#gradient)"
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            className="animate-pulse"
                          />
                          <defs>
                            <linearGradient
                              id="gradient"
                              x1="0%"
                              y1="0%"
                              x2="100%"
                              y2="0%"
                            >
                              <stop
                                offset="0%"
                                stopColor="#3b82f6"
                                stopOpacity="0.8"
                              />
                              <stop
                                offset="100%"
                                stopColor="#8b5cf6"
                                stopOpacity="0.3"
                              />
                            </linearGradient>
                          </defs>
                        </svg>

                        {/* Feature Tag */}
                        <div
                          className="text-center md:text-[14px] text-[10px] absolute bg-white rounded-full px-2 py-0.5  md:px-3 md:py-1.5 lg:px-4 lg:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-110 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-300 cursor-pointer z-10"
                          style={{
                            left: `calc(50% + ${x}px)`,
                            top: `calc(50% + ${y}px)`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {feature.name}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Clean Supporting UI Elements */}
                <div className="absolute top-2 left-2  sm:left-3  md:left-4  lg:left-6 bg-white rounded-md sm:rounded-lg lg:rounded-xl p-1.5 sm:p-2 lg:p-3 shadow-lg opacity-90 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <div className="text-xs font-medium text-gray-700">
                    Supplier
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="text-xs text-gray-500">Verified</div>
                  </div>
                </div>

                <div className="absolute top-2 right-2 sm:top-12 sm:right-3 md:top-5 md:right-4 lg:right-6 bg-white rounded-md sm:rounded-lg lg:rounded-xl p-1.5 sm:p-2 lg:p-3 shadow-lg opacity-90 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <div className="text-xs font-medium text-gray-700">
                    Price Comparison
                  </div>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-1.5 h-0.5 sm:w-2 sm:h-0.5 lg:w-3 lg:h-1 bg-blue-400 rounded animate-pulse"></div>
                    <div
                      className="w-1 h-0.5 sm:w-1.5 sm:h-0.5 lg:w-2 lg:h-1 bg-purple-400 rounded animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-2 h-0.5 sm:w-3 sm:h-0.5 lg:w-4 lg:h-1 bg-purple-400 rounded animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>

                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 bg-white rounded-md sm:rounded-lg lg:rounded-xl p-1.5 sm:p-2 lg:p-3 shadow-lg opacity-90 border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-200">
                  <div className="text-xs font-medium text-gray-700">RFQ</div>
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <div className="text-xs text-gray-500">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        {/* Removed the CTA button as requested */}
      </div>
    </section>
  );
};

export default BeforeAfter;
