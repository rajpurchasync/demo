import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sparkles, ChevronDown, ArrowRight } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const megaMenus = {
    product: {
      sections: [
        {
          title: 'Platform',
          items: [
            { label: '🏪 Marketplace', href: '/marketplace' },
            { label: '🛒 Become a Seller', href: '/become-a-seller' },
            { label: '🔍 Become a Buyer', href: '/become-a-buyer' }
          ]
        },
        {
          title: 'Products',
          items: [
            { label: '🔍 E-Sourcing', href: '/smart-sourcing-tools' },
            { label: '🛒 Vendors hub', href: '/vendors-hub' },
            { label: '🤖 AI Sales Agent (soon)', href: '/anita' }
          ]
        },
        {
          title: 'Integration',
          items: [
            { label: '🛒 E-commerce', href: '#' },
            { label: '🏢 ERP', href: '#' },
            { label: '📋 Procurement software', href: '#' }
          ]
        }
      ]
    },
    solutions: {
      sections: [
        {
          title: 'Procurement',
          items: [
            { label: '🏨 Sourcing', href: '/procurement-solutions' },
            { label: '📦 Bulk buying', href: '#' },
            { label: '🚀 Pre-opening', href: '#' }
          ]
        },
        {
          title: 'Sales',
          items: [
            { label: '📈 Business Development', href: '/sales-solutions' },
            { label: '📢 Marketing', href: '#' },
            { label: '🎪 Exhibitions', href: '#' }
          ]
        },
        {
          title: 'IT & Tech',
          items: [
            { label: '🛒 E-commerce', href: '/integration-solutions' }
          ]
        }
      ]
    },
    resources: {
      sections: [
        {
          title: 'Discovery',
          items: [
            { label: '📚 Learn', href: '/learn' },
            { label: '📝 Blogs', href: '#' },
            { label: '🎥 Demos (soon)', href: '#' }
          ]
        },
        {
          title: 'About',
          items: [
            { label: '🏢 About us', href: '/about-us' },
            { label: '📞 Contact us', href: '#' }
          ]
        }
      ]
    }
  };

  return (
    <>
      {/* Beta Notification Bar */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 text-center text-sm relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span>We are on beta.</span>
          <a href="#" className="underline hover:no-underline font-medium">
            Register here to learn more
          </a>
        </div>
      </div>
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-transparent' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-3 mt-4 sm:mt-8">
          <div className="flex items-center justify-between">
            {/* Left Bar - Logo and Navigation */}
            <div className="bg-white/95 backdrop-blur-md shadow-sm rounded-full px-3 sm:px-6 py-2 sm:py-3 flex items-center space-x-2 sm:space-x-8 flex-1 sm:flex-none">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                <span className="text-sm sm:text-base font-bold text-gray-900">Purchasync</span>
              </Link>
              
              {/* Desktop Navigation */}
              <nav className="hidden xl:flex items-center space-x-6">
                {/* Product Dropdown */}
                <a href="/marketplace" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium py-2">
                  Marketplace
                </a>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="xl:hidden p-1 sm:p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>

            {/* Right Bar - Login and Marketplace */}
            <div className="hidden lg:flex bg-white/95 backdrop-blur-md shadow-sm rounded-full px-4 lg:px-6 py-2 sm:py-3 items-center space-x-2 sm:space-x-4">
              <button className="text-gray-700 hover:text-gray-900 transition-colors duration-200 font-medium">
                Login
              </button>
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 lg:px-4 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-1 sm:space-x-2">
                <a href="/marketplace" className="flex items-center space-x-2">
                  <span className="font-medium text-xs sm:text-sm">Go to marketplace</span>
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
              <div className="px-3 sm:px-4 py-2">
                <a href="/marketplace" className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium">
                  Marketplace
                </a>
              </div>
              <div className="px-3 sm:px-4 py-2 border-t border-gray-200 mt-4 pt-4">
                <button className="block w-full text-left text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium mb-3">
                  Login
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium text-sm sm:text-base">
                  <a href="/marketplace">Go to marketplace</a>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mega Menu Overlay */}
    </>
  );
};

export default Header;