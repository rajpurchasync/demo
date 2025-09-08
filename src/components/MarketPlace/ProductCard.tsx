import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: number;
    sellerId: string;
    name: string;
    brand: string;
    origin: string;
    image: string;
    organic: boolean;
    bioSafe: boolean;
    soldBy: {
      name: string;
      location: string;
      logo: string;
    };
    category: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Demo cart functionality
    console.log('Added to cart:', product.name);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Demo wishlist functionality
    console.log('Added to wishlist:', product.name);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 group">
      <Link to={`/seller/${product.sellerId}/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-20 sm:h-24 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button 
            onClick={handleAddToCart}
            className="absolute top-1 left-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
          >
            <Plus className="w-3 h-3 text-gray-600 hover:text-green-600 transition-colors duration-200" />
          </button>
          <button 
            onClick={handleWishlist}
            className="absolute top-1 right-1 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors duration-200"
          >
            <Heart className="w-3 h-3 text-gray-600 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-2">
          <p className="text-xs font-medium text-purple-600 uppercase tracking-wide mb-1 truncate">
            {product.category}
          </p>
          
          <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>

          {/* Brand and Origin */}
          <div className="space-y-0.5 mb-2">
            <p className="text-xs text-gray-500 truncate">
              <span className="font-medium">Brand:</span> {product.brand}
            </p>
            <p className="text-xs text-gray-500 truncate">
              <span className="font-medium">Origin:</span> {product.origin}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2">
            {product.organic && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Organic
              </span>
            )}
            {product.bioSafe && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                BioSafe
              </span>
            )}
          </div>

          {/* Sold By */}
          <div className="border-t border-gray-100 pt-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
              SOLD BY
            </p>
            <div className="flex items-center space-x-1">
              <img
                src={product.soldBy.logo}
                alt={product.soldBy.name}
                className="w-3 h-3 rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-900 truncate">{product.soldBy.name}</p>
                <p className="text-xs text-gray-500 truncate">{product.soldBy.location}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;