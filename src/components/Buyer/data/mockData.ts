import { SellerOffer } from '../types';

export const mockSellers: SellerOffer[] = [
  {
    id: '1',
    sellerName: 'TechPro Solutions',
    status: 'full',
    totalAmount: 45000,
    vat: 9000,
    totalIncludingVat: 54000,
    additionalOffer: '5% rebate on next order',
    pdfUrl: '#',
    items: [
      { id: '1-1', itemName: 'Dell Laptop XPS 13', quantity: 10, unitPrice: 1200, totalPrice: 12000, sellerId: '1' },
      { id: '1-2', itemName: 'HP Monitor 24"', quantity: 15, unitPrice: 280, totalPrice: 4200, sellerId: '1' },
      { id: '1-3', itemName: 'Wireless Mouse', quantity: 25, unitPrice: 45, totalPrice: 1125, sellerId: '1' },
      { id: '1-4', itemName: 'Keyboard Mechanical', quantity: 20, unitPrice: 85, totalPrice: 1700, sellerId: '1' },
      { id: '1-5', itemName: 'Office Chair Ergonomic', quantity: 12, unitPrice: 320, totalPrice: 3840, sellerId: '1' },
    ]
  },
  {
    id: '2',
    sellerName: 'Global Electronics Inc',
    status: 'partial',
    totalAmount: 42500,
    vat: 8500,
    totalIncludingVat: 51000,
    additionalOffer: 'Free shipping + 2-year warranty',
    pdfUrl: '#',
    items: [
      { id: '2-1', itemName: 'Dell Laptop XPS 13', quantity: 10, unitPrice: 1150, totalPrice: 11500, sellerId: '2' },
      { id: '2-2', itemName: 'HP Monitor 24"', quantity: 15, unitPrice: 295, totalPrice: 4425, sellerId: '2' },
      { id: '2-3', itemName: 'Wireless Mouse', quantity: 25, unitPrice: 42, totalPrice: 1050, sellerId: '2' },
      { id: '2-5', itemName: 'Office Chair Ergonomic', quantity: 12, unitPrice: 310, totalPrice: 3720, sellerId: '2' },
    ]
  },
  {
    id: '3',
    sellerName: 'Premium Office Supply',
    status: 'full',
    totalAmount: 48200,
    vat: 9640,
    totalIncludingVat: 57840,
    additionalOffer: '10% trade discount for bulk orders',
    pdfUrl: '#',
    items: [
      { id: '3-1', itemName: 'Dell Laptop XPS 13', quantity: 10, unitPrice: 1280, totalPrice: 12800, sellerId: '3' },
      { id: '3-2', itemName: 'HP Monitor 24"', quantity: 15, unitPrice: 275, totalPrice: 4125, sellerId: '3' },
      { id: '3-3', itemName: 'Wireless Mouse', quantity: 25, unitPrice: 48, totalPrice: 1200, sellerId: '3' },
      { id: '3-4', itemName: 'Keyboard Mechanical', quantity: 20, unitPrice: 90, totalPrice: 1800, sellerId: '3' },
      { id: '3-5', itemName: 'Office Chair Ergonomic', quantity: 12, unitPrice: 335, totalPrice: 4020, sellerId: '3' },
    ]
  },
  {
    id: '4',
    sellerName: 'Budget Tech Solutions',
    status: 'full',
    totalAmount: 39800,
    vat: 7960,
    totalIncludingVat: 47760,
    additionalOffer: 'Extended payment terms - 90 days',
    pdfUrl: '#',
    items: [
      { id: '4-1', itemName: 'Dell Laptop XPS 13', quantity: 10, unitPrice: 1100, totalPrice: 11000, sellerId: '4' },
      { id: '4-2', itemName: 'HP Monitor 24"', quantity: 15, unitPrice: 260, totalPrice: 3900, sellerId: '4' },
      { id: '4-3', itemName: 'Wireless Mouse', quantity: 25, unitPrice: 38, totalPrice: 950, sellerId: '4' },
      { id: '4-4', itemName: 'Keyboard Mechanical', quantity: 20, unitPrice: 75, totalPrice: 1500, sellerId: '4' },
      { id: '4-5', itemName: 'Office Chair Ergonomic', quantity: 12, unitPrice: 295, totalPrice: 3540, sellerId: '4' },
    ]
  },
  {
    id: '5',
    sellerName: 'Enterprise Solutions Ltd',
    status: 'partial',
    totalAmount: 35600,
    vat: 7120,
    totalIncludingVat: 42720,
    additionalOffer: 'Volume discount available',
    pdfUrl: '#',
    items: [
      { id: '5-1', itemName: 'Dell Laptop XPS 13', quantity: 10, unitPrice: 1080, totalPrice: 10800, sellerId: '5' },
      { id: '5-2', itemName: 'HP Monitor 24"', quantity: 15, unitPrice: 270, totalPrice: 4050, sellerId: '5' },
      { id: '5-3', itemName: 'Wireless Mouse', quantity: 25, unitPrice: 40, totalPrice: 1000, sellerId: '5' },
    ]
  }
];

// Get all unique items across all sellers
export const getAllItems = (): string[] => {
  const itemNames = new Set<string>();
  mockSellers.forEach(seller => {
    seller.items.forEach(item => {
      itemNames.add(item.itemName);
    });
  });
  return Array.from(itemNames).sort();
};