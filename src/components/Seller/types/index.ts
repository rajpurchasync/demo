export type RFQStatus = 'new' | 'accepted' | 'rejected' | 'submitted' | 'draft';
export type ProposalStatus = 'draft' | 'submitted' | 'recalled' | 'recall-pending';

export interface RFQItem {
  id: string;
  productName: string;
  quantity: number;
  uom: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
}

export interface RFQ {
  id: string;
  title: string;
  status: RFQStatus;
  createdDate: string;
  purchaseType: string;
  paymentTerms: string;
  deliveryDate: string;
  deadline: string;
  buyerComments: string;
  attachments: Attachment[];
  items: RFQItem[];
  rejectionComment?: string;
  customer?: {
    name: string;
    businessType: string;
    location: string;
    billingAddress?: string;
    shippingAddress?: string;
  };
}

export interface ProposalItem {
  id: string;
  rfqItemId: string;
  productName: string;
  brand: string;
  origin: string;
  packaging: string;
  quantity: number;
  unitPrice: number;
  discountType: 'fixed' | 'percentage';
  discountValue: number;
  vatPercentage: number;
  totalBeforeDiscount: number;
  totalAfterDiscount: number;
  totalIncludingVAT: number;
  sku?: string;
}

export interface Proposal {
  id: string;
  rfqId: string;
  status: ProposalStatus;
  currency: string;
  paymentTerms: string;
  shipmentMethod: string;
  shipmentCharge: number;
  includeShipment: boolean;
  items: ProposalItem[];
  subtotal: number;
  totalDiscounts: number;
  totalVAT: number;
  finalTotal: number;
  createdDate: string;
  submittedDate?: string;
  quotationValidityDate: string;
  termsAndConditions: string;
  additionalBenefits: string;
  quotationNumber?: string;
}