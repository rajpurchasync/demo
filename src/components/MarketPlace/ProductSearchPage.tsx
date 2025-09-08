import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronDown, Star, SlidersHorizontal, ArrowLeft, ChevronUp } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState<string[]>([]);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedSustainability, setSelectedSustainability] = useState<string[]>([]);
  const [selectedSellerTypes, setSelectedSellerTypes] = useState<string[]>([]);

  // Mock data
  const categories = ['Food & Beverage', 'Kitchen Equipment', 'Cleaning Supplies', 'Textiles', 'Technology'];
  const subcategories = ['Pasta & Grains', 'Oils & Condiments', 'Bakery Items', 'Beverages', 'Dairy Products'];
  const brands = ['Paccheri Righati', 'Mediterranean Gold', 'Baker\'s Choice', 'Arabian Roast', 'TechScale Pro'];
  const origins = ['Italy', 'Spain', 'France', 'Germany', 'Netherlands', 'Ethiopia', 'Turkey'];
  const certifications = ['Organic', 'Halal', 'ISO 22000', 'Fair Trade', 'BioSafe', 'HACCP'];
  const sustainability = ['Eco-Friendly', 'Recyclable Packaging', 'Carbon Neutral', 'Sustainable Sourcing'];
  const sellerTypes = ['Manufacturer', 'Distributor', 'Wholesaler', 'Retailer', 'Importer'];

  const mockProducts = [
    {
      id: 1,
      sellerId: 'emirates-food-solutions',
      name: 'Pasta Paccheri Rigatti Giuseppe Cocco',
      brand: 'Paccheri Righati',
      origin: 'Italy',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      organic: true,
      bioSafe: true,
      category: 'Food & Beverage',
      soldBy: {
        name: 'Emirates Food Solutions',
        location: 'Dubai, UAE',
        logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    },
    {
      id: 2,
      sellerId: 'emirates-food-solutions',
      name: 'Premium Extra Virgin Olive Oil',
      brand: 'Mediterranean Gold',
      origin: 'Spain',
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      organic: true,
      bioSafe: false,
      category: 'Food & Beverage',
      soldBy: {
        name: 'Emirates Food Solutions',
        location: 'Dubai, UAE',
        logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    },
    {
      id: 3,
      sellerId: 'gulf-tech-solutions',
      name: 'Professional Kitchen Scale',
      brand: 'TechScale Pro',
      origin: 'Germany',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      organic: false,
      bioSafe: false,
      category: 'Kitchen Equipment',
      soldBy: {
        name: 'Gulf Tech Solutions',
        location: 'Dubai, UAE',
        logo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    },
    {
      id: 4,
      sellerId: 'emirates-food-solutions',
      name: 'Artisan Sourdough Bread Mix',
      brand: 'Baker\'s Choice',
      origin: 'France',
      image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      organic: true,
      bioSafe: true,
      category: 'Food & Beverage',
      soldBy: {
        name: 'Emirates Food Solutions',
        location: 'Dubai, UAE',
        logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
      }
    }
  ];

  const toggleFilter = (filterName: string) => {
    setExpandedFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(name => name !== filterName)
        : [...prev, filterName]
    );
  };

  const FilterGroup = ({ title, items, selected, onChange, filterKey }: {
    title: string;
    items: string[];
    selected: string[];
    onChange: (item: string) => void;
    filterKey: string;
  }) => {
    const isExpanded = expandedFilters.includes(filterKey);
    const displayItems = isExpanded ? items : items.slice(0, 5);
    const hasMore = items.length > 5;

    return (
      <div className="border-b border-gray-100 pb-3 mb-3 last:border-0">
        <h3 className="text-xs font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="space-y-1">
          {displayItems.map((item) => (
            <label key={item} className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={selected.includes(item)}
                onChange={() => onChange(item)}
                className="w-3 h-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-1"
              />
              <span className="text-xs text-gray-700 group-hover:text-blue-600 transition-colors duration-200 truncate">
                {item}
              </span>
            </label>
          ))}
        </div>
        {hasMore && (
          <button
            onClick={() => toggleFilter(filterKey)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-2 flex items-center space-x-1"
          >
            <span>{isExpanded ? 'View Less' : 'View More'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>
    );
  };

  const handleFilterChange = (item: string, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="px-3 py-2">
          <div className="flex items-center justify-between mb-2">
            <Link
              to="/"
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="text-xs">Back to Main</span>
            </Link>
            <h1 className="text-sm font-bold text-gray-900">Product Search</h1>
            <div className="w-16"></div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
            />
          </div>
        </div>
      </div>

      <div className="px-3 py-3">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center space-x-1 bg-white border border-gray-200 rounded-lg py-2 px-3 hover:bg-gray-50 transition-colors duration-200"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span className="text-xs">Filters</span>
            </button>
          </div>

          {/* Left Sidebar - Filters */}
          <div className={`lg:col-span-1 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg border border-gray-100 p-3 sticky top-20">
              <div className="flex items-center space-x-1 mb-3">
                <Filter className="w-3 h-3 text-blue-600" />
                <h2 className="text-xs font-bold text-gray-900">Filters</h2>
              </div>
              
              <div className="space-y-0">
                <FilterGroup
                  title="Category"
                  items={categories}
                  selected={selectedCategories}
                  onChange={(item) => handleFilterChange(item, setSelectedCategories)}
                  filterKey="categories"
                />
                
                <FilterGroup
                  title="Sub Category"
                  items={subcategories}
                  selected={selectedSubcategories}
                  onChange={(item) => handleFilterChange(item, setSelectedSubcategories)}
                  filterKey="subcategories"
                />
                
                <FilterGroup
                  title="Brand"
                  items={brands}
                  selected={selectedBrands}
                  onChange={(item) => handleFilterChange(item, setSelectedBrands)}
                  filterKey="brands"
                />
                
                <FilterGroup
                  title="Origin"
                  items={origins}
                  selected={selectedOrigins}
                  onChange={(item) => handleFilterChange(item, setSelectedOrigins)}
                  filterKey="origins"
                />
                
                <FilterGroup
                  title="Certifications"
                  items={certifications}
                  selected={selectedCertifications}
                  onChange={(item) => handleFilterChange(item, setSelectedCertifications)}
                  filterKey="certifications"
                />
                
                <FilterGroup
                  title="Sustainability"
                  items={sustainability}
                  selected={selectedSustainability}
                  onChange={(item) => handleFilterChange(item, setSelectedSustainability)}
                  filterKey="sustainability"
                />
                
                <FilterGroup
                  title="Seller Type"
                  items={sellerTypes}
                  selected={selectedSellerTypes}
                  onChange={(item) => handleFilterChange(item, setSelectedSellerTypes)}
                  filterKey="sellerTypes"
                />
              </div>
              
              <button className="w-full mt-3 text-blue-600 hover:text-blue-700 text-xs font-medium">
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-3">
              <p className="text-xs text-gray-600">
                Showing <span className="font-medium">{mockProducts.length}</span> results
                {searchQuery && (
                  <span> for "<span className="font-medium">{searchQuery}</span>"</span>
                )}
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-xs font-medium">
                Load More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchPage;