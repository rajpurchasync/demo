import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Star, Package, Truck, Shield, Clock, ChevronDown, ChevronUp, ShoppingCart, MessageSquare } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
  const { sellerId, productId } = useParams<{ sellerId: string; productId: string }>();
  const navigate = useNavigate();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [showAllSpecs, setShowAllSpecs] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Mock product data - in real app, this would come from API
  const productData = {
    id: productId,
    name: 'Pasta Paccheri Rigatti Giuseppe Cocco',
    brand: 'Paccheri Righati',
    origin: 'Italy',
    category: 'FOOD',
    images: [
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
    ],
    description: 'Premium Italian pasta made from durum wheat semolina. Perfect for traditional Italian dishes and professional kitchen use. Crafted using traditional methods passed down through generations.',
    organic: true,
    bioSafe: true,
    leadTime: '3-5 business days',
    packaging: 'Recyclable cardboard boxes with protective inner lining',
    warranty: 'Quality guarantee - 18 months shelf life',
    packSize: '500g per package, 20 packages per case',
    price: {
      unit: 'AED 12.50',
      case: 'AED 240.00',
      bulk: 'Contact for pricing'
    },
    variants: [
      { id: 1, name: 'Paccheri 500g', sku: 'PPC-500', stock: 'In Stock' },
      { id: 2, name: 'Paccheri 1kg', sku: 'PPC-1000', stock: 'In Stock' },
      { id: 3, name: 'Paccheri 5kg Bulk', sku: 'PPC-5000', stock: 'Limited Stock' }
    ],
    specifications: [
      { label: 'Ingredients', value: '100% Durum Wheat Semolina, Water' },
      { label: 'Protein Content', value: '13g per 100g' },
      { label: 'Cooking Time', value: '12-14 minutes' },
      { label: 'Storage', value: 'Store in cool, dry place' },
      { label: 'Allergens', value: 'Contains Gluten' },
      { label: 'Certification', value: 'Organic, Non-GMO, Halal' },
      { label: 'Country of Origin', value: 'Italy' },
      { label: 'Manufacturer', value: 'Giuseppe Cocco S.r.l.' }
    ],
    customerReviews: [
      {
        reviewerName: 'Chef Marco Rossi',
        title: 'Head Chef, Palazzo Hotel Dubai',
        rating: 5,
        comment: 'Exceptional quality pasta. Our guests love the authentic Italian taste and texture. Perfect for our fine dining restaurant.',
        date: '2 weeks ago'
      },
      {
        reviewerName: 'Sarah Al-Mahmoud',
        title: 'F&B Manager, Marriott Resort',
        rating: 5,
        comment: 'Consistent quality and reliable delivery. This pasta has become a staple in our Italian restaurant. Highly recommended.',
        date: '1 month ago'
      },
      {
        reviewerName: 'Antonio Silva',
        title: 'Executive Chef, Four Seasons',
        rating: 4,
        comment: 'Great pasta with authentic Italian flavor. The packaging is excellent for our storage needs.',
        date: '2 months ago'
      },
      {
        reviewerName: 'Fatima Hassan',
        title: 'Kitchen Manager, Hilton Dubai',
        rating: 5,
        comment: 'Perfect for our volume needs. The quality is consistent across all batches we\'ve received.',
        date: '3 months ago'
      }
    ],
    soldBy: {
      name: 'Emirates Food Solutions',
      location: 'Dubai, UAE',
      logo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      rating: 4.8,
      reviews: 245
    },
    relatedProducts: [
      {
        id: 2,
        name: 'Premium Olive Oil Collection',
        image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        price: 'AED 45.00'
      },
      {
        id: 3,
        name: 'Specialty Spices & Herbs',
        image: 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        price: 'AED 28.00'
      },
      {
        id: 4,
        name: 'Dairy & Cheese Selection',
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
        price: 'AED 65.00'
      }
    ]
  };

  const [selectedImage, setSelectedImage] = useState(0);

  const averageRating = productData.customerReviews.reduce((acc, review) => acc + review.rating, 0) / productData.customerReviews.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-3 h-3" />
              <span className="text-xs">Back</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200">
                <Heart className="w-3 h-3" />
              </button>
              <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors duration-200">
                <Share2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Product Images */}
          <div className="space-y-2">
            <div className="aspect-square bg-white rounded-xl overflow-hidden border border-gray-200">
              <img
                src={productData.images[selectedImage]}
                alt={productData.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-1 overflow-x-auto">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3 sm:space-y-4">
            {/* Category */}
            <p className="text-xs font-medium text-purple-600 uppercase tracking-wide">
              {productData.category}
            </p>

            {/* Product Name */}
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{productData.name}</h1>

            {/* Brand and Origin */}
            <div className="space-y-1">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Brand:</span> {productData.brand}
              </p>
              <p className="text-xs text-gray-600">
                <span className="font-medium">Origin:</span> {productData.origin}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {productData.organic && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Organic
                </span>
              )}
              {productData.bioSafe && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  BioSafe
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{productData.description}</p>

            {/* Key Details */}
            <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Lead Time</p>
                  <p className="text-xs font-medium text-gray-900 truncate">{productData.leadTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Package className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Pack Size</p>
                  <p className="text-xs font-medium text-gray-900 truncate">500g/case</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Truck className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Packaging</p>
                  <p className="text-xs font-medium text-gray-900 truncate">Eco-friendly</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-3 h-3 text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">Warranty</p>
                  <p className="text-xs font-medium text-gray-900 truncate">18 months</p>
                </div>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Available Variants</h3>
              <div className="space-y-1">
                {productData.variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(index)}
                    className={`w-full p-2 rounded-md border transition-all duration-200 text-left ${
                      selectedVariant === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-900 truncate">{variant.name}</p>
                        <p className="text-xs text-gray-600">SKU: {variant.sku}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-2">
              <div className="flex space-x-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-1 text-xs">
                  <MessageSquare className="w-3 h-3" />
                  <span>Quote</span>
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium flex items-center justify-center space-x-1 text-xs">
                  <MessageSquare className="w-3 h-3" />
                  <span>Sample</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
            {/* Specifications */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Specifications</h3>
                <button
                  onClick={() => setShowAllSpecs(!showAllSpecs)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <span>{showAllSpecs ? 'Show Less' : 'Show All'}</span>
                  {showAllSpecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              <div className="space-y-3">
                {productData.specifications
                  .slice(0, showAllSpecs ? productData.specifications.length : 4)
                  .map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-600">{spec.label}:</span>
                      <span className="text-sm font-medium text-gray-900 text-right">{spec.value}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Packaging & Delivery */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Packaging & Delivery</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Packaging</p>
                    <p className="text-sm text-gray-600">{productData.packaging}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lead Time</p>
                    <p className="text-sm text-gray-600">{productData.leadTime}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Warranty</p>
                    <p className="text-sm text-gray-600">{productData.warranty}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sold By */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sold By</h3>
              <Link
                to={`/seller/${sellerId}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={productData.soldBy.logo}
                    alt={productData.soldBy.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                      {productData.soldBy.name}
                    </h4>
                    <p className="text-sm text-gray-600">{productData.soldBy.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(productData.soldBy.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{productData.soldBy.rating}</span>
                  <span className="text-sm text-gray-500">({productData.soldBy.reviews} reviews)</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(averageRating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-900">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({productData.customerReviews.length} reviews)</span>
              </div>
            </div>
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
            >
              <span>{showAllReviews ? 'Show Less' : 'Show All'}</span>
              {showAllReviews ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-6">
            {productData.customerReviews
              .slice(0, showAllReviews ? productData.customerReviews.length : 2)
              .map((review, index) => (
                <div key={index} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-semibold text-sm">
                        {review.reviewerName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{review.title}</p>
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.relatedProducts.map((product) => (
              <Link
                key={product.id}
                to={`/seller/${sellerId}/product/${product.id}`}
                className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2">
                    {product.name}
                  </h4>
                  <p className="text-lg font-bold text-blue-600">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;