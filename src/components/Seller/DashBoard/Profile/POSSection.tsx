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
    <div className="p-3 space-y-3">
      <h2 className="text-sm font-semibold text-gray-900 mb-3">Products & Services</h2>

      {/* Categories Section */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('categories')}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">Categories</span>
          </div>
          {expandedSections.includes('categories') ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.includes('categories') && (
          <div className="p-3 border-t border-gray-200 space-y-3">
            {availableCategories.map((category) => (
              <div key={category.id} className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.name)}
                    onChange={() => toggleCategory(category.name)}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </label>
                
                {selectedCategories.includes(category.name) && (
                  <div className="ml-6 space-y-1">
                    {category.subcategories.map((sub) => (
                      <label key={sub} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-xs text-gray-600">{sub}</span>
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
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('keywords')}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">Keywords</span>
          </div>
          {expandedSections.includes('keywords') ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.includes('keywords') && (
          <div className="p-3 border-t border-gray-200 space-y-3">
            <div className="flex space-x-2">
              <Input
                placeholder="Add keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                className="text-sm flex-1"
                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
              />
              <Button size="sm" onClick={addKeyword} className="text-xs">
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {keyword}
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1 hover:text-purple-600"
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
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('products')}
          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-900">Product / Service List</span>
            <span className="text-xs text-gray-500">({products.length} items)</span>
          </div>
          {expandedSections.includes('products') ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </button>
        
        {expandedSections.includes('products') && (
          <div className="p-3 border-t border-gray-200 space-y-3">
            {/* Upload Options */}
            <div className="grid grid-cols-2 gap-2">
              <label className="flex flex-col items-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-600">Upload Excel</span>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <label className="flex flex-col items-center p-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                <Upload className="w-5 h-5 text-gray-400 mb-1" />
                <span className="text-xs text-gray-600">Upload PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Product List */}
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="p-2 bg-gray-50 rounded border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <p className="text-xs text-gray-600">{product.category} → {product.subcategory}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {product.keywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-gray-200 text-gray-600"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <button className="p-1 text-red-500 hover:bg-red-50 rounded">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <Button size="sm" variant="ghost" fullWidth className="text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Add Product/Service
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}