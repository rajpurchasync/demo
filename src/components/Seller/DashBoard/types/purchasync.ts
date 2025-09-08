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

export interface Customer {
  id: string;
  name: string;
  type: string; // e.g., "Vendor", "Manufacturer", "Service Provider"
  category: string;
  country: string;
  state: string;
  city: string;
  tags: string[];
  customerType: 'Hotels' | 'Restaurants' | 'Catering' | 'Other';
  isCredit: boolean;
  isNewProspect: boolean;
  contacts: CustomerContact[];
  documents: CustomerDocument[];
  quotations: CustomerQuotation[];
  samples: CustomerSample[];
}

export interface CustomerContact {
  id: string;
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface CustomerDocument {
  id: string;
  name: string;
  type: string;
  expiryDate?: string;
  attachmentUrl: string;
}

export interface CustomerQuotation {
  id: string;
  rfqId: string;
  title: string;
  status: 'pending' | 'received' | 'rejected';
  value?: number;
  submittedDate: string;
}

export interface CustomerSample {
  id: string;
  productName: string;
  status: 'requested' | 'shipped' | 'received' | 'feedback-pending';
  requestDate: string;
  deliveryDate?: string;
}

export interface RFQ {
  id: string;
  title: string;
  status: 'draft' | 'open' | 'pending' | 'closed';
  createdDate: string;
  dueDate: string;
  customersInvited: number;
  quotationsReceived: number;
  category: string;
  lineItems: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  customers: string[];
  quotes: {
    customerId: string;
    status: 'received' | 'pending';
    value?: number;
  }[];
}

export interface Sample {
  id: string;
  customerName: string;
  productName: string;
  status: 'requested' | 'shipped' | 'received' | 'pending-feedback';
  requestDate: string;
  expectedDate?: string;
  trackingNumber?: string;
}

export interface Contract {
  id: string;
  title: string;
  customerName: string;
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
    title: 'Customer Response',
    message: 'Customer ABC responded to RFQ #102.',
    type: 'rfq',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
    isRead: false
  },
  {
    id: '2',
    title: 'Customer Message',
    message: 'Customer XYZ messaged you for RFQ #101.',
    type: 'rfq',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isRead: false
  },
  {
    id: '3',
    title: 'RFQ Submitted',
    message: 'RFQ #103 has been successfully submitted to 3 customers.',
    type: 'rfq',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isRead: true
  },
  {
    id: '4',
    title: 'System Update',
    message: 'Your seller dashboard has been updated with new features.',
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

// Utility function to add new ToDo items
export function addMockToDo(todo: Omit<ToDo, 'id'>) {
  const newToDo: ToDo = {
    id: Date.now().toString(),
    ...todo
  };
  mockToDos.unshift(newToDo); // Add to beginning of array
  return newToDo;
}


export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'FreshCo Vegetables',
    type: 'Supplier',
    category: 'Produce',
    customerType: 'Restaurants',
    isCredit: true,
    isNewProspect: false,
    country: 'United Arab Emirates',
    state: 'Dubai',
    city: 'Dubai',
    tags: ['Sustainable', 'Local', 'Certified'],
    contacts: [
      { id: '1', name: 'Ahmed Hassan', position: 'Sales Manager', email: 'ahmed@freshco.ae', phone: '+971 50 123 4567' },
      { id: '2', name: 'Sara Al-Zahra', position: 'Account Manager', email: 'sara@freshco.ae', phone: '+971 50 234 5678' }
    ],
    documents: [
      { id: 'doc1', name: 'Trade License', type: 'License', expiryDate: '2025-12-31', attachmentUrl: '/docs/freshco_trade_license.pdf' },
      { id: 'doc2', name: 'Food Safety Certificate', type: 'Certificate', expiryDate: '2024-11-15', attachmentUrl: '/docs/freshco_food_safety.pdf' }
    ],
    quotations: [
      { id: 'q1', rfqId: 'RFQ-101', title: 'Weekly Vegetable Supply', status: 'received', value: 2500, submittedDate: '2024-01-25' },
      { id: 'q2', rfqId: 'RFQ-105', title: 'Organic Produce Order', status: 'pending', submittedDate: '2024-02-10' }
    ],
    samples: [
      { id: 's1', productName: 'Organic Tomatoes', status: 'received', requestDate: '2024-01-10', deliveryDate: '2024-01-15' },
      { id: 's2', productName: 'Fresh Lettuce', status: 'shipped', requestDate: '2024-01-20', deliveryDate: '2024-01-25' }
    ]
  },
  {
    id: '2',
    name: 'Gulf Meat Supplies',
    type: 'Supplier',
    category: 'Meat & Poultry',
    customerType: 'Hotels',
    isCredit: false,
    isNewProspect: false,
    country: 'United Arab Emirates',
    state: 'Abu Dhabi',
    city: 'Abu Dhabi',
    tags: ['Halal', 'Premium'],
    contacts: [
      { id: '1', name: 'Sara Al-Mansoori', position: 'Account Manager', email: 'sara@gulfmeat.ae', phone: '+971 50 234 5678' }
    ],
    documents: [
      { id: 'doc3', name: 'Halal Certificate', type: 'Certificate', expiryDate: '2025-06-30', attachmentUrl: '/docs/gulfmeat_halal.pdf' }
    ],
    quotations: [
      { id: 'q3', rfqId: 'RFQ-103', title: 'Premium Meat Selection', status: 'received', value: 15000, submittedDate: '2024-01-28' }
    ],
    samples: [
      { id: 's3', productName: 'Premium Beef', status: 'shipped', requestDate: '2024-01-12', deliveryDate: '2024-01-18' }
    ]
  },
  {
    id: '3',
    name: 'EquipMax',
    type: 'Supplier',
    category: 'Kitchen Equipment',
    customerType: 'Restaurants',
    isCredit: true,
    isNewProspect: false,
    country: 'United Arab Emirates',
    state: 'Dubai',
    city: 'Dubai',
    tags: ['Gulffood', 'Warranty', 'Installation'],
    contacts: [
      { id: '1', name: 'Mohammed Ali', position: 'Sales Executive', email: 'mohammed@equipmax.ae', phone: '+971 50 345 6789' }
    ],
    documents: [
      { id: 'doc4', name: 'Equipment Warranty', type: 'Warranty', expiryDate: '2025-12-31', attachmentUrl: '/docs/equipmax_warranty.pdf' }
    ],
    quotations: [
      { id: 'q4', rfqId: 'RFQ-102', title: 'Commercial Oven', status: 'received', value: 15000, submittedDate: '2024-01-20' }
    ],
    samples: [
      { id: 's4', productName: 'Oven Sample Model', status: 'requested', requestDate: '2024-01-15', deliveryDate: '2024-01-30' }
    ]
  },
  {
    id: '4',
    name: 'Spice Route Trading',
    type: 'Supplier',
    category: 'Spices & Seasonings',
    customerType: 'Catering',
    isCredit: false,
    isNewProspect: true,
    country: 'United Arab Emirates',
    state: 'Sharjah',
    city: 'Sharjah',
    tags: ['Organic', 'Import', 'Bulk'],
    contacts: [
      { id: '1', name: 'Priya Sharma', position: 'Procurement Specialist', email: 'priya@spiceroute.ae', phone: '+971 50 456 7890' }
    ],
    documents: [
      { id: 'doc5', name: 'Import License', type: 'License', expiryDate: '2024-12-31', attachmentUrl: '/docs/spiceroute_import.pdf' }
    ],
    quotations: [
      { id: 'q5', rfqId: 'RFQ-104', title: 'Spice Collection', status: 'pending', submittedDate: '2024-02-01' }
    ],
    samples: [
      { id: 's5', productName: 'Saffron', status: 'feedback-pending', requestDate: '2024-01-08', deliveryDate: '2024-01-14' }
    ]
  },
  {
    id: '5',
    name: 'CleanPro Services',
    type: 'Supplier',
    category: 'Cleaning Services',
    customerType: 'Hotels',
    isCredit: true,
    isNewProspect: false,
    country: 'United Arab Emirates',
    state: 'Dubai',
    city: 'Dubai',
    tags: ['Commercial', 'Eco-friendly'],
    contacts: [
      { id: '1', name: 'Omar Khan', position: 'Service Manager', email: 'omar@cleanpro.ae', phone: '+971 50 987 6543' }
    ],
    documents: [
      { id: 'doc6', name: 'Service Agreement', type: 'Agreement', expiryDate: '2025-03-31', attachmentUrl: '/docs/cleanpro_agreement.pdf' }
    ],
    quotations: [
      { id: 'q6', rfqId: 'RFQ-106', title: 'Office Cleaning Contract', status: 'pending', submittedDate: '2024-02-15' }
    ],
    samples: [
      { id: 's6', productName: 'Cleaning Kit Sample', status: 'received', requestDate: '2024-01-05', deliveryDate: '2024-01-10' }
    ]
  }
];

export const mockRFQs: RFQ[] = [
  {
    id: 'RFQ-101',
    title: 'Fresh Vegetables - Weekly Supply',
    status: 'pending',
    createdDate: '2024-01-20',
    dueDate: '2024-01-30',
    customersInvited: 3,
    quotationsReceived: 2,
    category: 'Produce',
    lineItems: [
      { name: 'Tomatoes', quantity: 50, unit: 'kg' },
      { name: 'Lettuce', quantity: 30, unit: 'kg' },
      { name: 'Carrots', quantity: 25, unit: 'kg' }
    ],
    customers: ['1', '2'],
    quotes: [
      { customerId: '1', status: 'received', value: 2500 },
      { customerId: '2', status: 'pending' }
    ]
  },
  {
    id: 'RFQ-102',
    title: 'Commercial Kitchen Equipment',
    status: 'open',
    createdDate: '2024-01-18',
    dueDate: '2024-01-28',
    customersInvited: 2,
    quotationsReceived: 1,
    category: 'Equipment',
    lineItems: [
      { name: 'Commercial Oven', quantity: 1, unit: 'pieces' },
      { name: 'Industrial Mixer', quantity: 1, unit: 'pieces' }
    ],
    customers: ['3'],
    quotes: [
      { customerId: '3', status: 'received', value: 15000 }
    ]
  },
  {
    id: 'RFQ-103',
    title: 'Premium Meat Selection',
    status: 'closed',
    createdDate: '2024-01-15',
    dueDate: '2024-01-25',
    customersInvited: 1,
    quotationsReceived: 1,
    category: 'Meat',
    lineItems: [
      { name: 'Premium Beef', quantity: 20, unit: 'kg' },
      { name: 'Lamb Chops', quantity: 15, unit: 'kg' }
    ],
    customers: ['2'],
    quotes: [
      { customerId: '2', status: 'received', value: 8500 }
    ]
  }
]