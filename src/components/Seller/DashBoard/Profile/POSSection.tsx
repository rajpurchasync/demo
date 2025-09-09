import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Upload, X, Package, Search, Tag } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  keywords: string[];
}

export function POSSection() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['categories']);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['Food & Beverage', 'Cleaning Supplies']);
  const [keywords, setKeywords] = useState<string[]>(['organic', 'halal', 'premium', 'local']);
  const [newKeyword, setNewKeyword] = useState('');
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Fresh Vegetables',
      category: 'Food & Beverage',
      subcategory: 'Produce',
      keywords: ['organic', 'local']
    },
    {
      id: '2',
      name: 'Premium Meat Selection',
      category: 'Food & Beverage',
      subcategory: 'Meat & Poultry',
      keywords: ['halal', 'premium']
    }
  ]);

  const availableCategories: Category[] = [
    {
      id: '1',
      name: 'Food & Beverage',
      subcategories: ['Produce', 'Meat & Poultry', 'Dairy', 'Beverages', 'Spices & Seasonings']
    },
    {
      id: '2',
      name: 'Kitchen Equipment',
      subcategories: ['Cooking Equipment', 'Refrigeration', 'Small Appliances', 'Utensils']
    },
    {
      id: '3',
      name: 'Cleaning Supplies',
      subcategories: ['Chemicals', 'Equipment', 'Disposables']
    },
    {
      id: '4',
      name: 'Furniture & Fixtures',
      subcategories: ['Dining Furniture', 'Kitchen Fixtures', 'Decor']
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleCategory = (categoryName: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords(prev => [...prev, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(prev => prev.filter(k => k !== keyword));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File uploaded:', file.name);
      // Handle file upload logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <h1 className="text-xl font-bold text-gray-900">Product / Category</h1>
        <p className="text-sm text-gray-600 mt-1">Manage your products and services</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Categories Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <button
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-t-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-gray-900">Categories</h3>
                <p className="text-xs text-gray-600">Select your business categories</p>
              </div>
            </div>
            {expandedSections.includes('categories') ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('categories') && (
            <div className="p-4 border-t border-gray-200 space-y-4">
              {availableCategories.map((category) => (
                <div key={category.id} className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => toggleCategory(category.name)}
                      className="text-purple-600 focus:ring-purple-500 rounded"
                    />
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </label>
                  
                  {selectedCategories.includes(category.name) && (
                    <div className="ml-8 space-y-2">
                      {category.subcategories.map((sub) => (
                        <label key={sub} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            className="text-purple-600 focus:ring-purple-500 rounded"
                          />
                          <span className="text-sm text-gray-700">{sub}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Keywords Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <button
            onClick={() => toggleSection('keywords')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-t-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-gray-900">Keywords</h3>
                <p className="text-xs text-gray-600">Add search keywords for your business</p>
              </div>
            </div>
            {expandedSections.includes('keywords') ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('keywords') && (
            <div className="p-4 border-t border-gray-200 space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Add keyword (e.g., organic, premium)"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="text-sm flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                />
                <Button 
                  size="sm" 
                  onClick={addKeyword}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-purple-100 text-purple-800 font-medium"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {keyword}
                    <button
                      onClick={() => removeKeyword(keyword)}
                      className="ml-2 hover:text-purple-600 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product List Section */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <button
            onClick={() => toggleSection('products')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors rounded-t-xl"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-semibold text-gray-900">Product / Service List</h3>
                <p className="text-xs text-gray-600">{products.length} items added</p>
              </div>
            </div>
            {expandedSections.includes('products') ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('products') && (
            <div className="p-4 border-t border-gray-200 space-y-4">
              {/* Upload Options */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col items-center p-4 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-colors">
                  <Upload className="w-6 h-6 text-purple-500 mb-2" />
                  <span className="text-sm font-medium text-purple-700">Upload Excel</span>
                  <span className="text-xs text-purple-600 mt-1">(.xlsx, .xls)</span>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                <label className="flex flex-col items-center p-4 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors">
                  <Upload className="w-6 h-6 text-blue-500 mb-2" />
                  <span className="text-sm font-medium text-blue-700">Upload PDF</span>
                  <span className="text-xs text-blue-600 mt-1">(.pdf)</span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Product List */}
              <div className="space-y-3">
                {products.map((product) => (
                  <div key={product.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">{product.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{product.category} → {product.subcategory}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {product.keywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-200 text-gray-700 font-medium"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                size="sm" 
                variant="ghost" 
                fullWidth 
                className="text-sm border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 hover:text-purple-700 py-3"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product/Service Manually
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}