import { User, Task, Supplier, ActivityLogEntry } from '@/types';

export const mockUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@purchasync.com' },
  { id: '2', name: 'Sara Smith', email: 'sara@purchasync.com' },
  { id: '3', name: 'Ali Rahman', email: 'ali@purchasync.com' },
  { id: '4', name: 'Emma Wilson', email: 'emma@purchasync.com' },
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'RFQ for Coffee Beans',
    description: 'Request for quotation for premium arabica coffee beans',
    type: 'RFQ',
    priority: 'High',
    assignee: mockUsers[0],
    assignees: [mockUsers[0], mockUsers[1]],
    dueDate: '2024-09-02',
    status: 'Open',
    subtasks: [
      {
        id: '1-1',
        title: 'Research suppliers',
        assignee: mockUsers[0],
        dueDate: '2024-08-30',
        completed: true,
        createdAt: '2024-08-25T10:00:00Z',
      },
      {
        id: '1-2',
        title: 'Send initial RFQ',
        assignee: mockUsers[1],
        dueDate: '2024-09-01',
        completed: false,
        createdAt: '2024-08-25T10:00:00Z',
      }
    ],
    attachments: ['rfq-coffee-specs.pdf'],
    createdAt: '2024-08-25T10:00:00Z',
    updatedAt: '2024-08-28T14:30:00Z',
  },
  {
    id: '2',
    title: 'Supplier Onboarding – Fresh Greens',
    description: 'Complete onboarding process for Fresh Greens supplier',
    type: 'Supplier Onboarding',
    priority: 'Medium',
    assignee: mockUsers[1],
    assignees: [mockUsers[1]],
    dueDate: '2024-09-05',
    status: 'In Progress',
    subtasks: [
      {
        id: '2-1',
        title: 'Verify certificates',
        assignee: mockUsers[1],
        dueDate: '2024-09-03',
        completed: false,
        createdAt: '2024-08-26T09:00:00Z',
      }
    ],
    attachments: ['supplier-docs.zip'],
    createdAt: '2024-08-26T09:00:00Z',
    updatedAt: '2024-08-27T16:45:00Z',
  },
  {
    id: '3',
    title: 'Sample Request – Organic Pasta',
    description: 'Request samples from organic pasta suppliers',
    type: 'Sample Request',
    priority: 'Low',
    assignee: mockUsers[2],
    assignees: [mockUsers[2]],
    dueDate: '2024-09-10',
    status: 'Open',
    subtasks: [],
    attachments: [],
    createdAt: '2024-08-27T11:00:00Z',
    updatedAt: '2024-08-27T11:00:00Z',
  },
  {
    id: '4',
    title: 'Service Agreement - IT Support',
    description: 'Annual IT support service contract with TechCorp',
    type: 'Contract',
    priority: 'High',
    assignee: mockUsers[0],
    assignees: [mockUsers[0]],
    dueDate: '2024-09-15',
    status: 'Open',
    subtasks: [],
    attachments: ['service-agreement-draft.pdf'],
    createdAt: '2024-08-28T14:00:00Z',
    updatedAt: '2024-08-28T14:00:00Z',
  },
  {
    id: '5',
    title: 'Master Supply Agreement - Global Foods',
    description: 'Long-term supply agreement for food products',
    type: 'Contract',
    priority: 'Medium',
    assignee: mockUsers[1],
    assignees: [mockUsers[1]],
    dueDate: '2024-09-20',
    status: 'In Progress',
    subtasks: [],
    attachments: ['msa-template.docx', 'pricing-schedule.xlsx'],
    createdAt: '2024-08-29T09:00:00Z',
    updatedAt: '2024-08-29T16:30:00Z',
  },
  {
    id: '6',
    title: 'Quality Audit - Manufacturing Partner',
    description: 'Quarterly quality audit for manufacturing partner compliance',
    type: 'Task',
    priority: 'High',
    assignee: mockUsers[2],
    assignees: [mockUsers[2], mockUsers[3]],
    dueDate: '2024-09-08',
    status: 'Open',
    subtasks: [],
    attachments: [],
    createdAt: '2024-08-30T10:00:00Z',
    updatedAt: '2024-08-30T10:00:00Z',
  },
  {
    id: '7',
    title: 'Vendor Performance Review',
    description: 'Monthly review of vendor performance metrics and KPIs',
    type: 'Task',
    priority: 'Medium',
    assignee: mockUsers[3],
    assignees: [mockUsers[3]],
    dueDate: '2024-09-12',
    status: 'In Progress',
    subtasks: [],
    attachments: [],
    createdAt: '2024-08-31T09:00:00Z',
    updatedAt: '2024-08-31T09:00:00Z',
  },
  {
    id: '8',
    title: 'Equipment Procurement - Manufacturing Line',
    description: 'Procure new manufacturing equipment for production line expansion',
    type: 'RFQ',
    priority: 'High',
    assignee: mockUsers[0],
    assignees: [mockUsers[0], mockUsers[2]],
    dueDate: '2024-09-18',
    status: 'Open',
    subtasks: [],
    attachments: [],
    createdAt: '2024-09-01T08:00:00Z',
    updatedAt: '2024-09-01T08:00:00Z',
  }
];

export const mockSuppliers: Supplier[] = [
  { id: '1', name: 'Global Coffee Co', email: 'contact@globalcoffee.com', category: 'Beverages', rating: 4.8, location: 'Colombia' },
  { id: '2', name: 'Fresh Greens Ltd', email: 'sales@freshgreens.com', category: 'Vegetables', rating: 4.6, location: 'California, USA' },
  { id: '3', name: 'Organic Pasta Masters', email: 'info@organicpasta.com', category: 'Food', rating: 4.7, location: 'Italy' },
  { id: '4', name: 'Premium Spices Inc', email: 'sales@premiumspices.com', category: 'Spices', rating: 4.5, location: 'India' },
];

export const mockActivityLog: ActivityLogEntry[] = [
  {
    id: '1',
    type: 'task_created',
    taskId: '1',
    user: mockUsers[0],
    description: 'Created task "RFQ for Coffee Beans"',
    timestamp: '2024-08-25T10:00:00Z',
  },
  {
    id: '2',
    type: 'assignee_changed',
    taskId: '1',
    user: mockUsers[0],
    description: 'Assigned to John Doe',
    timestamp: '2024-08-25T10:15:00Z',
  },
  {
    id: '3',
    type: 'due_date_changed',
    taskId: '1',
    user: mockUsers[0],
    description: 'Due date changed to September 2, 2024',
    timestamp: '2024-08-26T14:20:00Z',
  },
  {
    id: '4',
    type: 'attachment_added',
    taskId: '1',
    user: mockUsers[1],
    description: 'Added attachment: rfq-coffee-specs.pdf',
    timestamp: '2024-08-28T14:30:00Z',
  },
];

export const purchaseTypes = [
  'Raw Materials',
  'Finished Goods',
  'Services',
  'Equipment',
  'Packaging',
  'Consumables'
];

export const categories = [
  'Food & Beverages',
  'Electronics',
  'Textiles',
  'Chemicals',
  'Machinery',
  'Office Supplies',
  'Construction',
  'Healthcare'
];

export const paymentTerms = [
  'Net 30',
  'Net 60',
  'Net 90',
  'COD',
  '2/10 Net 30',
  'Upon Delivery',
  'Advance Payment'
];

export const contractCategories = [
  'Supply Agreement',
  'Service Contract',
  'NDA',
  'Purchase Order',
  'Master Agreement',
  'Quality Agreement'
];