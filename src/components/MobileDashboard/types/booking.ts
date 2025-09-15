export interface BookingData {
  // Step 1: Service Details
  bookingType: 'home' | 'office';
  cleaningMaterials: 'needed' | 'not-needed';
  apartmentType: 'studio' | '1br' | '2br' | '3br' | '4br' | '5br';
  officeSize?: '0-50' | '50-100' | '100-150' | '150-200' | '200-250';
  bookingHours: number;
  addOns: {
    ironingHours: number;
  };
  
  // Step 2: Schedule & Location
  date: string;
  time: string;
  repeatService: boolean;
  frequency?: 'weekly' | 'bi-weekly' | 'monthly';
  preferredWeekdays?: string[];
  city: string;
  address: {
    street: string;
    building: string;
    flat: string;
    parkingInstructions: string;
  };
  contact: {
    name: string;
    phone: string;
    countryCode: string;
    email: string;
  };
  
  // Step 3: Payment
  paymentMethod: string; // 'saved-card-1', 'saved-card-2', 'new-card', 'apple-pay', 'cash'
  savedCardId?: string;
  savedCardCvc?: string;
  saveCard: boolean;
  cardDetails?: {
    number: string;
    holderName: string;
    expiry: string;
    cvc: string;
  };
  billingInfo?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
}

export interface PricingBreakdown {
  basePrice: number;
  addOnsPrice: number;
  subtotal: number;
  vat: number;
  total: number;
}