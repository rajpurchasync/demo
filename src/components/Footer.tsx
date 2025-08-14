import React from "react";
import {
  Sparkles,
  Twitter,
  Github,
  Linkedin,
  Mail,
  Instagram,
  Facebook,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              {/* <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" /> */}

              <img
                src="/white-icon.png"
                alt="purchasync"
                className="h-[30px] w-auto"
              />
              <span className="text-xl sm:text-2xl font-bold">Purchasync</span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 max-w-md leading-relaxed text-sm sm:text-base">
              The all-in-one platform connecting hospitality professionals with
              suppliers and service providers worldwide.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {/* <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-indigo-600 transition-colors duration-200"
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a> */}
              {/* <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-200"
              >
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              </a> */}
              <a
                href="https://www.linkedin.com/company/purchasync"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.instagram.com/purchasync/"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61573178555911/"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a
                href="mailto:hello@purchasync.com"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              Services
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="/marketplace"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Marketplace
              </a>
              <a
                href="/become-a-bayer"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Become a Buyer
              </a>
              <a
                href="/become-a-seller"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Become a Seller
              </a>
              <a
                href="/book-demo"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Become a Partner
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">
              Company
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <a
                href="/about-us"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                About Us
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Pricing (soon)
              </a>
              <a
                href="/learn"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Learn
              </a>
              <a
                href="/contact-us"
                className="block text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-gray-400 mb-4 sm:mb-0 text-sm sm:text-base">
              © 2025 Purchasync. All rights reserved.
            </div>
            <div className="flex space-x-4 sm:space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-300 transition-colors duration-200 text-sm sm:text-base"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
