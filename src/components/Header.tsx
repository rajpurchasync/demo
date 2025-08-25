import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);
  const location = useLocation();
  const router = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const megaMenus = {
    buyers: {
      sections: [
        {
          items: [
            {
              label: "🔍 Smart Sourcing Platform",
              href: "/smart-sourcing-tools",
            },
            { label: "🏪 Marketplace", href: "/marketplace" },

            // { label: "📋 Procurement", href: "/procurement-solutions" },
          ],
        },
      ],
    },
    sellers: {
      sections: [
        {
          items: [
            { label: "🛒 Sales Platform", href: "/vendors-hub" },
            { label: "🏪 Marketplace", href: "/marketplace" },
            // { label: "🤖 AI Sales Agent", href: "/anita" },

            // { label: "📈 Business Development", href: "/sales-solutions" },
          ],
        },
      ],
    },
    // product: {
    //   sections: [
    //     {
    //       title: "For Buyers",
    //       items: [
    //         { label: "🏪 Marketplace", href: "/marketplace" },
    //         {
    //           label: "🔍 Purchasync SRM",
    //           href: "/smart-sourcing-tools",
    //         },
    //         // { label: "📋 Procurement", href: "/procurement-solutions" },
    //       ],
    //     },
    //     {
    //       title: "For Sellers",
    //       items: [
    //         { label: "🛒 Online Store", href: "/vendors-hub" },
    //         { label: "🤖 AI Sales Agent", href: "/anita" },
    //         // { label: "📈 Business Development", href: "/sales-solutions" },
    //       ],
    //     },
    //     {
    //       title: "Integration",
    //       items: [
    //         {
    //           label: "📋 Procurement",
    //           href: "/integration-solutions",
    //         },
    //         {
    //           label: "🏢 CRM, Sales & E-com",
    //           href: "/integration-solutions",
    //         },
    //         // { label: "🛒 E-commerce", href: "/integration-solutions" },
    //       ],
    //     },
    //   ],
    // },
    // solutions: {
    //   sections: [
    //     {
    //       title: "",
    //       items: [
    //         {
    //           label: "🏢 Procurement",

    //           href: "/procurement-solutions",
    //         },
    //         {
    //           label: "📈 Business Development",

    //           href: "/sales-solutions",
    //         },
    //         {
    //           label: "🔗 Integration",

    //           href: "/integration-solutions",
    //         },
    //       ],
    //     },
    //     // {
    //     //   title: "",
    //     //   items: [
    //     //     {
    //     //       label: "📈 Business Development",
    //     //       description:
    //     //         "Accelerate your business with targeted marketing campaigns",
    //     //       href: "/sales-solutions",
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   title: "",
    //     //   items: [
    //     //     {
    //     //       label: "🔗 Integration",
    //     //       description:
    //     //         "Seamlessly connect with existing tools and platforms",
    //     //       href: "/integration-solutions",
    //     //     },
    //     //   ],
    //     // },
    //     // {
    //     //   title: "",
    //     //   items: [
    //     //     {
    //     //       label: "💻 B2B Online Sales",
    //     //       description: "Grow you sales with complete B2B sales ecosystem",
    //     //       href: "/integration-solutions",
    //     //     },
    //     //   ],
    //     // },
    //   ],
    // },
    resources: {
      sections: [
        {
          // title: "Discovery",
          items: [
            // { label: "📚 User Guides (Soon)", href: "#" },
            { label: "📝 Blogs", href: "/learn" },
            { label: "🏢 About us", href: "/about-us" },
            { label: "📞 Contact us", href: "/contact-us" },
            // { label: "🎥 Demos (soon)", href: "#" },
          ],
        },
        // {
        //   title: "About",
        //   items: [
        //     { label: "🏢 About us", href: "/about-us" },
        //     { label: "📞 Contact us", href: "/contact-us" },
        //   ],
        // },
      ],
    },
  };

  return (
    <>
      {/* Beta Notification Bar */}
      <div className="z-[1000] bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 text-center text-sm relative ">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span>We are on beta.</span>
          <a
            href="/book-demo"
            style={{
              minHeight: "0px",
              maxHeight: "none",
            }}
            className="underline hover:no-underline font-medium "
          >
            Register here for interest
          </a>
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-transparent" : "bg-transparent"
        }`}
      >
        <div
          className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8 py-2 sm:py-3 md:mt-8 mt-[40px]"
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center justify-between">
            {/* Left Bar - Logo and Navigation */}
            <div className="bg-white/95 backdrop-blur-md shadow-sm rounded-full px-3 sm:px-6 py-0 sm:py-3 flex items-center space-x-2 sm:space-x-8 flex-none ">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                {/* <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" /> */}
                {/* <span className="text-sm sm:text-base font-bold text-gray-900">Purchasync</span> */}
                <img
                  src="/purchasync-logo-2.webp"
                  alt="purchasync"
                  className="h-[25px]  w-auto md:h-[30px]"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center space-x-6">
                {/* Product Dropdown */}
                <div
                  className="relative"
                  onClick={() => router("/smart-sourcing-tools")}
                  // onMouseEnter={() => handleMouseEnter("buyers")}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium py-2">
                    <span>For Buyers</span>
                    {/* <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "buyers" ? "rotate-180" : ""
                      }`}
                    /> */}
                  </button>
                </div>
                <div
                  className="relative"
                  // onMouseEnter={() => handleMouseEnter("sellers")}
                  onClick={() => router("/vendors-hub")}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium py-2">
                    <span>For Sellers</span>
                    {/* <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "sellers" ? "rotate-180" : ""
                      }`}
                    /> */}
                  </button>
                </div>
                {/* <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("product")}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium py-2">
                    <span>Product</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "product" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div> */}

                {/* Solutions Dropdown */}
                {/* <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("solutions")}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium py-2">
                    <span>Solutions</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "solutions" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div> */}

                {/* Resources Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter("resources")}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium py-2">
                    <span>Resources</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === "resources" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>
                <div className="px-3 sm:px-4 py-2">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium">
                    <span>Pricing</span>
                    <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                      (beta)
                    </span>
                  </button>
                </div>
              </nav>
            </div>

            {/* Right Bar - Login and Marketplace */}
            <div className="flex bg-white/95 backdrop-blur-md shadow-sm rounded-full px-4 lg:px-6 py-0 sm:py-3 items-center space-x-2 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button
                className="xl:hidden p-0 md:p-1 "
                style={{ minWidth: "0px" }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
              <button
                onClick={() => {
                  router("/login");
                }}
                className="hidden md:block text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                Login
              </button>
              <button className="hidden md:flex  group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 lg:px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl  items-center space-x-1 sm:space-x-2">
                <a href="/marketplace" className="flex items-center space-x-2">
                  <span className="font-medium text-xs sm:text-sm">
                    Go to marketplace
                  </span>
                </a>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg rounded-2xl mx-2 sm:mx-4 mt-2">
            <div className="py-3 sm:py-4 space-y-1">
              <div>
                <button
                  onClick={() =>
                    setActiveMobileDropdown(
                      activeMobileDropdown === "product" ? null : "product"
                    )
                  }
                  className="flex items-center justify-between w-full px-3 sm:px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
                >
                  <span>Product</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMobileDropdown === "product" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeMobileDropdown === "product" && (
                  <div className="mt-2 space-y-1 bg-gray-50 rounded-lg mx-3 sm:mx-4 p-2">
                    {megaMenus.product.sections.map((section, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 px-2">
                          {section.title}
                        </h4>
                        <div className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="block px-2 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() =>
                    setActiveMobileDropdown(
                      activeMobileDropdown === "solutions" ? null : "solutions"
                    )
                  }
                  className="flex items-center justify-between w-full px-3 sm:px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
                >
                  <span>Solutions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMobileDropdown === "solutions" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeMobileDropdown === "solutions" && (
                  <div className="mt-2 space-y-1 bg-gray-50 rounded-lg mx-3 sm:mx-4 p-2">
                    {megaMenus.solutions.sections.map((section, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        {/* <h4 className="text-sm font-semibold text-gray-900 mb-2 px-2">
                          {section.title}
                        </h4> */}
                        <div className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="block px-2 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() =>
                    setActiveMobileDropdown(
                      activeMobileDropdown === "resources" ? null : "resources"
                    )
                  }
                  className="flex items-center justify-between w-full px-3 sm:px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium"
                >
                  <span>Resources</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeMobileDropdown === "resources" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeMobileDropdown === "resources" && (
                  <div className="mt-2 space-y-1 bg-gray-50 rounded-lg mx-3 sm:mx-4 p-2">
                    {megaMenus.resources.sections.map((section, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2 px-2">
                          {section.title}
                        </h4>
                        <div className="space-y-1">
                          {section.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="block px-2 py-1 text-sm text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors duration-200"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="px-3 sm:px-4 py-2">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium">
                  <span>Pricing</span>
                  <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-xs font-medium">
                    (beta)
                  </span>
                </button>
              </div>

              <div className="px-3 sm:px-4 py-2 border-t border-gray-200 mt-4 pt-4">
                <button
                  className="block w-full text-left text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium mb-3"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </button>
                <button
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm sm:text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <a href="/marketplace">Go to marketplace</a>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setActiveMobileDropdown(null);
          }}
        />
      )}

      {/* Mega Menu Overlay */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40 bg-black/5"
          onMouseEnter={handleMouseLeave}
        />
      )}

      {/* Mega Menu Content */}
      {activeDropdown &&
        megaMenus[activeDropdown as keyof typeof megaMenus] && (
          <div
            className={`hidden xl:block fixed top-[105px] left-1/2 transform -translate-x-1/2 z-50 w-full ${
              activeDropdown === "solutions" ? "max-w-[700px]" : "max-w-max"
            } px-4`}
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-0 mt-1">
              <div
                className={`grid gap-0 ${
                  activeDropdown === "resources" ||
                  activeDropdown === "solutions"
                    ? "grid-cols-3"
                    : "grid-cols-3"
                } h-full`}
              >
                {megaMenus[
                  activeDropdown as keyof typeof megaMenus
                ].sections.map((section, index) => (
                  <div
                    key={index}
                    className="p-6 space-y-4 border-r border-gray-100 last:border-r-0"
                  >
                    {activeDropdown !== "solutions" && section.title && (
                      <h3 className="text-base font-bold text-gray-900 mb-4">
                        {section.title}
                      </h3>
                    )}
                    <div className="space-y-0">
                      {section.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href}
                          className={`${
                            activeDropdown !== "solutions" ? "py-3" : "py-0"
                          } block hover:bg-gray-50 px-3  rounded-lg transition-all duration-200 group`}
                        >
                          <div className="text-base font-medium text-gray-900 group-hover:text-indigo-600 mb-1">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-sm text-gray-600 leading-relaxed mt-4">
                              {item.description}
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default Header;
