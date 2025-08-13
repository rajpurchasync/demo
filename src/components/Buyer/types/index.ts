export interface SellerOffer {
  id: string;
  sellerName: string;
  status: 'full' | 'partial';
  totalAmount: number;
  vat: number;
  totalIncludingVat: number;
  additionalOffer: string;
  pdfUrl: string;
  items: ProposalItem[];
}

export interface ProposalItem {
  id: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  sellerId: string;
}

export type ViewType = 'selection' | 'high-level' | 'detailed';