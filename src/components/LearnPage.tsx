import React, { useState, useMemo } from 'react';
import { Search, BookOpen, Users, Store, Filter, Clock, ArrowRight, Star, TrendingUp, Target, Lightbulb, FileText, Award } from 'lucide-react';

const LearnPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'sellers' | 'buyers'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Article data structure
  const articles = [
    // Seller Articles
    {
      id: 1,
      title: 'Complete Guide to Setting Up Your Seller Profile',
      preview: 'Learn how to create a compelling seller profile that attracts hospitality buyers and builds trust in the marketplace.',
      category: 'sellers',
      tags: ['Profile Optimization', 'Getting Started', 'Best Practices'],
      readTime: '8 min read',
      featured: true,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Purchasync Team',
      publishDate: '2024-12-15'
    },
    {
      id: 2,
      title: 'How to Respond to RFQs and Win More Contracts',
      preview: 'Master the art of crafting winning RFQ responses that stand out from competitors and close more deals.',
      category: 'sellers',
      tags: ['RFQ Response', 'Sales Strategy', 'Competitive Advantage'],
      readTime: '12 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Sarah Johnson',
      publishDate: '2024-12-10'
    },
    {
      id: 3,
      title: 'Pricing Strategies for Hospitality Suppliers',
      preview: 'Discover effective pricing models and strategies that maximize profit while staying competitive in the hospitality market.',
      category: 'sellers',
      tags: ['Pricing Strategy', 'Revenue Optimization', 'Market Analysis'],
      readTime: '10 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Michael Chen',
      publishDate: '2024-12-08'
    },
    {
      id: 4,
      title: 'Building Long-term Relationships with Hotel Buyers',
      preview: 'Learn proven strategies to build lasting partnerships with hotels and restaurants that drive repeat business.',
      category: 'sellers',
      tags: ['Relationship Building', 'Customer Retention', 'Partnership'],
      readTime: '7 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Emma Rodriguez',
      publishDate: '2024-12-05'
    },
    {
      id: 5,
      title: 'Marketing Your Products on Purchasync Marketplace',
      preview: 'Effective marketing techniques to increase visibility, attract more buyers, and boost your sales on the platform.',
      category: 'sellers',
      tags: ['Marketing', 'Visibility', 'Sales Growth'],
      readTime: '9 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'David Kim',
      publishDate: '2024-12-03'
    },
    
    // Buyer Articles
    {
      id: 6,
      title: 'Complete Buyer\'s Guide to Hospitality Procurement',
      preview: 'Everything you need to know about modern procurement strategies, vendor management, and cost optimization.',
      category: 'buyers',
      tags: ['Procurement Strategy', 'Vendor Management', 'Cost Optimization'],
      readTime: '15 min read',
      featured: true,
      image: 'https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Purchasync Team',
      publishDate: '2024-12-12'
    },
    {
      id: 7,
      title: 'How to Create Effective RFQs That Get Results',
      preview: 'Learn to write clear, detailed RFQs that attract quality suppliers and generate competitive proposals.',
      category: 'buyers',
      tags: ['RFQ Creation', 'Supplier Selection', 'Best Practices'],
      readTime: '11 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Lisa Thompson',
      publishDate: '2024-12-09'
    },
    {
      id: 8,
      title: 'Vendor Evaluation and Selection Best Practices',
      preview: 'Comprehensive guide to evaluating suppliers, checking credentials, and making informed procurement decisions.',
      category: 'buyers',
      tags: ['Vendor Evaluation', 'Due Diligence', 'Risk Management'],
      readTime: '13 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'James Wilson',
      publishDate: '2024-12-07'
    },
    {
      id: 9,
      title: 'Negotiating Better Deals with Hospitality Suppliers',
      preview: 'Master negotiation techniques that help you secure better prices, terms, and service levels from suppliers.',
      category: 'buyers',
      tags: ['Negotiation', 'Cost Savings', 'Contract Management'],
      readTime: '10 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Rachel Green',
      publishDate: '2024-12-04'
    },
    {
      id: 10,
      title: 'Sustainable Procurement in the Hospitality Industry',
      preview: 'How to implement sustainable procurement practices that reduce environmental impact and support ESG goals.',
      category: 'buyers',
      tags: ['Sustainability', 'ESG', 'Green Procurement'],
      readTime: '12 min read',
      featured: false,
      image: 'https://images.pexels.com/photos/3184283/pexels-photo-3184283.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      author: 'Alex Martinez',
      publishDate: '2024-12-01'
    }
  ];

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const cats = ['all'];
    articles.forEach(article => {
      article.tags.forEach(tag => {
        if (!cats.includes(tag.toLowerCase())) {
          cats.push(tag.toLowerCase());
        }
      });
    });
    return cats;
  }, []);

  // Filter articles based on search and active tab
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by tab
    if (activeTab !== 'all') {
      filtered = filtered.filter(article => article.category === activeTab);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article =>
        article.tags.some(tag => tag.toLowerCase() === selectedCategory)
      );
    }

    return filtered;
  }, [searchQuery, activeTab, selectedCategory]);

  // Get featured article for current tab
  const featuredArticle = useMemo(() => {
    return articles.find(article => 
      article.featured && (activeTab === 'all' || article.category === activeTab)
    );
  }, [activeTab]);

  const handleReadMore = (articleId: number) => {
    // This would typically navigate to a detailed article page
    console.log('Navigate to article:', articleId);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 sm:pt-24 lg:pt-28">
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-6 sm:py-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-20 sm:w-40 h-20 sm:h-40 bg-gradient-to-br from-purple-200/15 to-blue-200/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Learn & Grow Your
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent block sm:inline"> Hospitality Business</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4 px-4 sm:px-0">
              Expert guides, tips, and strategies to help buyers and sellers succeed in the hospitality marketplace
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto px-4 sm:px-0">
              <div className="relative">
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, guides, and tips..."
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-lg text-sm sm:text-base lg:text-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Category Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-0.5 sm:space-x-1 bg-white rounded-full p-0.5 sm:p-1 shadow-lg mb-3 sm:mb-4 lg:mb-0 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>All Articles</span>
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                activeTab === 'sellers'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Store className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>For Sellers</span>
            </button>
            <button
              onClick={() => setActiveTab('buyers')}
              className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap ${
                activeTab === 'buyers'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>For Buyers</span>
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white flex-1 sm:flex-none"
            >
              <option value="all">All Categories</option>
              <option value="getting started">Getting Started</option>
              <option value="best practices">Best Practices</option>
              <option value="marketing">Marketing</option>
              <option value="procurement strategy">Procurement Strategy</option>
              <option value="vendor management">Vendor Management</option>
              <option value="cost optimization">Cost Optimization</option>
            </select>
          </div>
        </div>

        {/* Featured Guide Section */}
        {featuredArticle && (
          <div className="mb-8 sm:mb-12">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2" />
              Featured Guide
            </h2>
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10 grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {featuredArticle.tags.map((tag, index) => (
                      <span key={index} className="bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-3 sm:mb-4">{featuredArticle.title}</h3>
                  <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed">{featuredArticle.preview}</p>
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{featuredArticle.readTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm">{featuredArticle.author}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleReadMore(featuredArticle.id)}
                    className="group bg-white/20 backdrop-blur-sm text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-white/30 transition-all duration-300 font-semibold flex items-center space-x-2 text-sm sm:text-base"
                  >
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>
                <div className="hidden lg:block">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-48 sm:h-64 object-cover rounded-lg sm:rounded-xl opacity-90"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              {activeTab === 'all' ? 'All Articles' : 
               activeTab === 'sellers' ? 'For Sellers' : 'For Buyers'}
              <span className="text-gray-500 text-sm sm:text-base lg:text-lg ml-2">({filteredArticles.filter(a => !a.featured).length})</span>
            </h2>
          </div>

          {filteredArticles.filter(a => !a.featured).length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
              <p className="text-sm sm:text-base text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredArticles.filter(article => !article.featured).map((article) => (
                <div key={article.id} className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 sm:hover:-translate-y-2 overflow-hidden">
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        article.category === 'sellers' 
                          ? 'bg-purple-100 text-purple-600' 
                          : 'bg-blue-100 text-blue-600'
                      }`}>
                        {article.category === 'sellers' ? 'For Sellers' : 'For Buyers'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {article.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {article.preview}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 sm:space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <span className="hidden sm:inline">{article.author}</span>
                      </div>
                      
                      <button
                        onClick={() => handleReadMore(article.id)}
                        className="group/btn text-blue-600 hover:text-blue-700 font-medium text-xs sm:text-sm flex items-center space-x-1 transition-colors duration-200"
                      >
                        <span>Read More</span>
                        <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default LearnPage;