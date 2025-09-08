import { BookingData } from '../types/booking';

const HOURLY_RATE = 50;

const ADDONS = {
  ironing: 15, // per hour
};

const VAT_RATE = 0.05;

export function getSuggestedHours(bookingType: 'home' | 'office', propertyType: string): number {
  if (bookingType === 'home') {
    switch (propertyType) {
      case 'studio':
      case '1br':
        return 2;
      case '2br':
        return 3;
      case '3br':
        return 4;
      case '4br':
        return 5;
      case '5br':
        return 6;
      default:
        return 2;
    }
  } else {
    switch (propertyType) {
      case '0-50':
        return 1;
      case '50-100':
        return 2;
      case '100-150':
        return 3;
      case '150-200':
        return 4;
      case '200-250':
        return 5;
      default:
        return 2;
    }
  }
}

export function calculatePricing(booking: Partial<BookingData>) {
  let basePrice = 0;
  
  if (booking.bookingHours) {
    basePrice = HOURLY_RATE * booking.bookingHours;
  }
  
  let addOnsPrice = 0;
  if (booking.bookingType === 'home' && booking.addOns?.ironingHours) {
    addOnsPrice += ADDONS.ironing * booking.addOns.ironingHours;
  }
  
  const subtotal = basePrice + addOnsPrice;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  
  return {
    basePrice,
    addOnsPrice,
    subtotal,
    vat,
    total: Math.round(total),
  };
}