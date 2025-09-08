import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  brand: string;
  image: string;
  quantity: number;
  sellerId: string;
  sellerName: string;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Pasta Paccheri Rigatti Giuseppe Cocco',
      brand: 'Paccheri Righati',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      quantity: 2,
      sellerId: 'emirates-food-solutions',
      sellerName: 'Emirates Food Solutions'
    },
    {
      id: 2,
      name: 'Premium Extra Virgin Olive Oil',
      brand: 'Mediterranean Gold',
      image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      quantity: 1,
      sellerId: 'emirates-food-solutions',
      sellerName: 'Emirates Food Solutions'
    },
    {
      id: 3,
      name: 'Professional Kitchen Scale',
      brand: 'TechScale Pro',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      quantity: 1,
      sellerId: 'gulf-tech-solutions',
      sellerName: 'Gulf Tech Solutions'
    }
  ]);

  // Group items by seller
  const groupedItems = cartItems.reduce((acc, item) => {
    if (!acc[item.sellerId]) {
      acc[item.sellerId] = {
        sellerName: item.sellerName,
        items: []
      };
    }
    acc[item.sellerId].items.push(item);
    return acc;
  }, {} as Record<string, { sellerName: string; items: CartItem[] }>);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:max-w-md sm:w-full h-full sm:h-auto sm:max-h-[80vh] sm:rounded-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-gray-900">Cart ({totalItems})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-3">
          {Object.keys(groupedItems).length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(groupedItems).map(([sellerId, group]) => (
                <div key={sellerId} className="border border-gray-200 rounded-lg p-3">
                  <h3 className="text-xs font-semibold text-gray-900 mb-2 border-b border-gray-100 pb-2">
                    {group.sellerName}
                  </h3>
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 truncate">{item.name}</h4>
                          <p className="text-xs text-gray-500 truncate">{item.brand}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-6 h-6 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-md"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-2 bg-blue-600 text-white py-1.5 rounded-md hover:bg-blue-700 transition-colors duration-200 text-xs font-medium">
                    Request Quote from {group.sellerName}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {Object.keys(groupedItems).length > 0 && (
          <div className="border-t border-gray-200 p-3">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-xs font-medium">
              Request All Quotes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;