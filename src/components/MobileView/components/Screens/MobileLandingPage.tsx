import React, { useState, useRef } from 'react';
import { Package } from 'lucide-react';
import { Button } from '../UI/Button';
import { cn } from '../../utils/cn';

interface MobileLandingPageProps {
  onLogin: () => void;
}

export function MobileLandingPage({ onLogin }: MobileLandingPageProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const cards = [
    {
      title: 'For Buyers',
      description: 'One place for all your procurement and vendor management work.',
      details: 'Scan business card, create tasks, run RFQ, manage supplier and collaborate with team in one app. Modular to fit for all.',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'For Sellers & Service Providers',
      description: 'One powerful sales channel to grow your business.',
      details: 'A connected workspace with CRM tools and Marketplace to collaborate seamlessly with your customers.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches.clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches.clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50; // pixels

    if (swipeDistance > minSwipeDistance && currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else if (swipeDistance < -minSwipeDistance && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* Logo */}
      <div className="flex items-center justify-center w-full py-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-500 rounded flex items-center justify-center">
            <Package className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Purchasync</h1>
        </div>
      </div>

      {/* Sliding Cards */}
      <div
        className="relative w-full overflow-hidden flex-1 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentCardIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white rounded-lg flex flex-col items-center text-center">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full max-w-xs h-48 object-cover rounded-lg mb-6"
                />
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  {card.description}
                </p>
                <p className="text-sm text-gray-500 mb-8">
                  {card.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex space-x-2 mb-8">
        {cards.map((_, index) => (
          <span
            key={index}
            className={cn(
              'block w-2 h-2 rounded-full transition-colors duration-300',
              currentCardIndex === index ? 'bg-purple-600' : 'bg-gray-300'
            )}
          />
        ))}
      </div>

      {/* CTA Button */}
      <div className="w-full max-w-xs">
        <Button fullWidth size="lg" onClick={onLogin}>
          Sign Up for Free
        </Button>
      </div>
    </div>
  );
}