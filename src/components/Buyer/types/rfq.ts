export interface RFQ {
  id: string;
  rfqNumber: string;
  title: string;
  createdDate: string;
  deliveryDate: string;
  deadline: string;
  paymentTerms: string;
  category: 'Products' | 'Services';
  purchaseType: string;
  status: 'Ongoing' | 'Completed';
  attachments: RFQAttachment[];
  comments: string;
  items: RFQItem[];
  vendors: RFQVendor[];
}

export interface RFQAttachment {
  id: string;
  filename: string;
  type: 'pdf' | 'excel' | 'word' | 'image';
  size: string;
}

interface RFQItem {
  id: string;
  itemName: string;
  quantity: number;
  unitOfMeasure: string;
}

interface RFQVendor {
  id: string;
  vendorName: string;
  location: string;
  certificates: string[];
  quotationStatus: 'Invited' | 'Quote Received' | 'Rejected';
  email: string;
  submittedRFQ?: boolean;
  submissionDate?: string;
  totalAmount?: number;
}

export type RFQCategory = 'Products' | 'Services';
export type RFQStatus = 'Ongoing' | 'Completed';
export type SortOrder = 'newest' | 'oldest';