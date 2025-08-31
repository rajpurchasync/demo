export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'rfq' | 'supplier' | 'sample' | 'contract';
  timestamp: string;
  isRead: boolean;
}

export interface ToDo {
  id: string;
  title: string;
  type: 'rfq' | 'sample' | 'contract' | 'task' | 'approval';
  status: 'ongoing' | 'completed' | 'pending';
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
  description?: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  tags: string[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  rating: number;
  isPreferred: boolean;
}

export interface RFQ {
  id: string;
  title: string;
  status: 'draft' | 'open' | 'pending' | 'closed';
  createdDate: string;
  dueDate: string;
  suppliersInvited: number;
  quotationsReceived: number;
  category: string;
  lineItems: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  suppliers: string[];
  quotes: {
    supplierId: string;
    status: 'received' | 'pending';
    value?: number;
  }[];
}

export interface Sample {
  id: string;
  supplierName: string;
  productName: string;
  status: 'requested' | 'shipped' | 'received' | 'pending-feedback';
  requestDate: string;
  expectedDate?: string;
  trackingNumber?: string;
}

export interface Contract {
  id: string;
  title: string;
  supplierName: string;
  status: 'draft' | 'under-review' | 'signed' | 'expired';
  value: number;
  startDate: string;
  endDate: string;
  type: 'template' | 'active';
}

// Mock Data
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Supplier Response',
    message: 'Supplier ABC responded to RFQ #102.',
    type: 'rfq',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    isRead: false
  },
  {
    id: '2',
    title: 'Supplier Message',
    message: 'Supplier XYZ messaged you for RFQ #101.',
    type: 'supplier',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false
  },
  {
    id: '3',
    title: 'RFQ Submitted',
    message: 'RFQ #103 has been successfully submitted to 3 suppliers.',
    type: 'rfq',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true
  },
  {
    id: '4',
    title: 'System Update',
    message: 'Your procurement dashboard has been updated with new features.',
    type: 'sample',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    isRead: true
  }
];

export const mockToDos: ToDo[] = [
  {
    id: '1',
    title: 'Review quotes for RFQ #101',
    type: 'rfq',
    status: 'ongoing',
    dueDate: '2024-01-30',
    priority: 'high',
    tags: ['urgent', 'meat-supplies'],
    description: 'Compare 3 quotes from Gulf Meat, FreshCo, and Local Butcher'
  },
  {
    id: '2',
    title: 'Approve sample request from FreshCo',
    type: 'sample',
    status: 'pending',
    dueDate: '2024-01-29',
    priority: 'medium',
    tags: ['vegetables', 'quality-check']
  },
  {
    id: '3',
    title: 'Finalize contract with EquipMax',
    type: 'contract',
    status: 'ongoing',
    dueDate: '2024-02-01',
    priority: 'high',
    tags: ['equipment', 'renewal']
  },
  {
    id: '4',
    title: 'Follow up with Gulf Meat',
    type: 'task',
    status: 'ongoing',
    dueDate: '2024-01-30',
    priority: 'medium',
    tags: ['follow-up']
  },
  {
    id: '5',
    title: 'Check delivery schedule with FreshCo',
    type: 'task',
    status: 'ongoing',
    dueDate: '2024-01-29',
    priority: 'low',
    tags: ['logistics']
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'FreshCo Vegetables',
    category: 'Produce',
    tags: ['Sustainable', 'Local', 'Certified'],
    contact: {
      name: 'Ahmed Hassan',
      email: 'ahmed@freshco.ae',
      phone: '+971 50 123 4567'
    },
    rating: 4.8,
    isPreferred: true
  },
  {
    id: '2',
    name: 'Gulf Meat Supplies',
    category: 'Meat & Poultry',
    tags: ['Halal', 'Premium', 'Preferred'],
    contact: {
      name: 'Sara Al-Mansoori',
      email: 'sara@gulfmeat.ae',
      phone: '+971 50 234 5678'
    },
    rating: 4.6,
    isPreferred: true
  },
  {
    id: '3',
    name: 'EquipMax',
    category: 'Kitchen Equipment',
    tags: ['Gulffood', 'Warranty', 'Installation'],
    contact: {
      name: 'Mohammed Ali',
      email: 'mohammed@equipmax.ae',
      phone: '+971 50 345 6789'
    },
    rating: 4.5,
    isPreferred: false
  },
  {
    id: '4',
    name: 'Spice Route Trading',
    category: 'Spices & Seasonings',
    tags: ['Organic', 'Import', 'Bulk'],
    contact: {
      name: 'Priya Sharma',
      email: 'priya@spiceroute.ae',
      phone: '+971 50 456 7890'
    },
    rating: 4.3,
    isPreferred: false
  }
];

export const mockRFQs: RFQ[] = [
  {
    id: 'RFQ-101',
    title: 'Fresh Vegetables - Weekly Supply',
    status: 'pending',
    createdDate: '2024-01-20',
    createdDate: '2024-01-20',
    dueDate: '2024-01-30',
    suppliersInvited: 3,
    quotationsReceived: 2,
    category: 'Produce',
    lineItems: [
      { name: 'Tomatoes', quantity: 50, unit: 'kg' },
      { name: 'Onions', quantity: 30, unit: 'kg' },
      { name: 'Lettuce', quantity: 20, unit: 'heads' }
    ],
    suppliers: ['1', '4'],
    quotes: [
      { supplierId: '1', status: 'received', value: 2500 },
      { supplierId: '4', status: 'pending' }
    ]
  },
  {
    id: 'RFQ-102',
    title: 'Kitchen Equipment Upgrade',
    status: 'open',
    createdDate: '2024-01-18',
    createdDate: '2024-01-18',
    dueDate: '2024-01-29',
    suppliersInvited: 2,
    quotationsReceived: 1,
    category: 'Equipment',
    lineItems: [
      { name: 'Commercial Oven', quantity: 1, unit: 'unit' },
      { name: 'Prep Tables', quantity: 3, unit: 'units' }
    ],
    suppliers: ['3'],
    quotes: [
      { supplierId: '3', status: 'received', value: 15000 }
    ]
  },
  {
    id: 'RFQ-103',
    title: 'Premium Meat Selection',
    status: 'draft',
    createdDate: '2024-01-22',
    createdDate: '2024-01-22',
    dueDate: '2024-02-05',
    suppliersInvited: 0,
    quotationsReceived: 0,
    category: 'Meat',
    lineItems: [
      { name: 'Beef Tenderloin', quantity: 10, unit: 'kg' },
      { name: 'Lamb Chops', quantity: 15, unit: 'kg' }
    ],
    suppliers: [],
    quotes: []
  }
];

export const mockSamples: Sample[] = [
  {
    id: '1',
    supplierName: 'FreshCo Vegetables',
    productName: 'Organic Tomatoes',
    status: 'received',
    requestDate: '2024-01-10',
    expectedDate: '2024-01-15',
    trackingNumber: 'FC123456'
  },
  {
    id: '2',
    supplierName: 'Gulf Meat Supplies',
    productName: 'Premium Beef',
    status: 'shipped',
    requestDate: '2024-01-12',
    expectedDate: '2024-01-18',
    trackingNumber: 'GM789012'
  },
  {
    id: '3',
    supplierName: 'Spice Route Trading',
    productName: 'Saffron',
    status: 'pending-feedback',
    requestDate: '2024-01-08',
    expectedDate: '2024-01-14'
  }
];

export const mockContracts: Contract[] = [
  {
    id: '1',
    title: 'Annual Vegetable Supply Agreement',
    supplierName: 'FreshCo Vegetables',
    status: 'signed',
    value: 150000,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    type: 'active'
  },
  {
    id: '2',
    title: 'Equipment Maintenance Contract',
    supplierName: 'EquipMax',
    status: 'under-review',
    value: 25000,
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    type: 'active'
  },
  {
    id: '3',
    title: 'Standard Supplier Agreement Template',
    supplierName: '',
    status: 'draft',
    value: 0,
    startDate: '',
    endDate: '',
    type: 'template'
  }
];