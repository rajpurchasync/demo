import { RFQ } from '../types/rfq';

export const mockRFQs: RFQ[] = [
  {
    id: '1',
    rfqNumber: 'RFQ-2025-001',
    title: 'Office Equipment & Furniture Procurement',
    createdDate: '2025-01-15',
    deliveryDate: '2025-02-28',
    deadline: '2025-01-30',
    paymentTerms: 'Net 30',
    category: 'Products',
    purchaseType: 'Bulk Purchase',
    status: 'Ongoing',
    attachments: [
      { id: '1-1', filename: 'office-requirements.pdf', type: 'pdf', size: '2.4 MB' },
      { id: '1-2', filename: 'specifications.xlsx', type: 'excel', size: '1.2 MB' }
    ],
    comments: 'Looking for high-quality office furniture with modern design. Preference for eco-friendly materials.',
    items: [
      { id: '1-1', itemName: 'Executive Office Desk', quantity: 15, unitOfMeasure: 'PCS' },
      { id: '1-2', itemName: 'Ergonomic Office Chair', quantity: 25, unitOfMeasure: 'PCS' },
      { id: '1-3', itemName: 'Filing Cabinet 4-Drawer', quantity: 10, unitOfMeasure: 'PCS' },
      { id: '1-4', itemName: 'Conference Table', quantity: 3, unitOfMeasure: 'PCS' },
      { id: '1-5', itemName: 'Bookshelf Unit', quantity: 8, unitOfMeasure: 'PCS' }
    ],
    vendors: [
      {
        id: '1-1',
        vendorName: 'Premium Office Solutions',
        location: 'New York, NY',
        certificates: ['ISO 9001', 'Green Certified'],
        quotationStatus: 'Quote Received',
        email: 'sales@premiumoffice.com',
        submittedRFQ: true,
        submissionDate: '2025-01-20',
        totalAmount: 85000
      },
      {
        id: '1-2',
        vendorName: 'Modern Workspace Inc',
        location: 'Chicago, IL',
        certificates: ['ISO 14001', 'FSC Certified'],
        quotationStatus: 'Invited',
        email: 'quotes@modernworkspace.com'
      },
      {
        id: '1-3',
        vendorName: 'Corporate Furniture Direct',
        location: 'Los Angeles, CA',
        certificates: ['ISO 9001'],
        quotationStatus: 'Quote Received',
        email: 'rfq@corpfurniture.com',
        submittedRFQ: true,
        submissionDate: '2025-01-18',
        totalAmount: 78500
      }
    ]
  },
  {
    id: '2',
    rfqNumber: 'RFQ-2025-002',
    title: 'IT Infrastructure Consulting Services',
    createdDate: '2025-01-12',
    deliveryDate: '2025-03-15',
    deadline: '2025-01-25',
    paymentTerms: 'Net 45',
    category: 'Services',
    purchaseType: 'Professional Services',
    status: 'Ongoing',
    attachments: [
      { id: '2-1', filename: 'current-infrastructure.pdf', type: 'pdf', size: '5.1 MB' },
      { id: '2-2', filename: 'requirements-doc.docx', type: 'word', size: '890 KB' }
    ],
    comments: 'Need comprehensive IT infrastructure assessment and migration planning for cloud transformation.',
    items: [
      { id: '2-1', itemName: 'Infrastructure Assessment', quantity: 1, unitOfMeasure: 'Project' },
      { id: '2-2', itemName: 'Cloud Migration Planning', quantity: 1, unitOfMeasure: 'Project' },
      { id: '2-3', itemName: 'Security Audit', quantity: 1, unitOfMeasure: 'Project' },
      { id: '2-4', itemName: 'Staff Training', quantity: 40, unitOfMeasure: 'Hours' }
    ],
    vendors: [
      {
        id: '2-1',
        vendorName: 'TechConsult Pro',
        location: 'San Francisco, CA',
        certificates: ['ISO 27001', 'SOC 2'],
        quotationStatus: 'Invited',
        email: 'proposals@techconsultpro.com'
      },
      {
        id: '2-2',
        vendorName: 'Cloud Solutions Expert',
        location: 'Seattle, WA',
        certificates: ['AWS Partner', 'Microsoft Gold'],
        quotationStatus: 'Quote Received',
        email: 'rfp@cloudsolutionsexpert.com',
        submittedRFQ: true,
        submissionDate: '2025-01-16',
        totalAmount: 125000
      }
    ]
  },
  {
    id: '3',
    rfqNumber: 'RFQ-2024-045',
    title: 'Manufacturing Equipment Purchase',
    createdDate: '2024-12-20',
    deliveryDate: '2025-02-15',
    deadline: '2025-01-10',
    paymentTerms: 'Net 60',
    category: 'Products',
    purchaseType: 'Capital Equipment',
    status: 'Completed',
    attachments: [
      { id: '3-1', filename: 'equipment-specs.pdf', type: 'pdf', size: '3.2 MB' }
    ],
    comments: 'Industrial grade manufacturing equipment with 5-year warranty requirement.',
    items: [
      { id: '3-1', itemName: 'CNC Milling Machine', quantity: 2, unitOfMeasure: 'PCS' },
      { id: '3-2', itemName: 'Industrial Lathe', quantity: 1, unitOfMeasure: 'PCS' },
      { id: '3-3', itemName: 'Quality Control Station', quantity: 3, unitOfMeasure: 'PCS' }
    ],
    vendors: [
      {
        id: '3-1',
        vendorName: 'Industrial Machinery Corp',
        location: 'Detroit, MI',
        certificates: ['ISO 9001', 'CE Certified'],
        quotationStatus: 'Quote Received',
        email: 'sales@industrialmachinery.com'
      },
      {
        id: '3-2',
        vendorName: 'Precision Tools Ltd',
        location: 'Cleveland, OH',
        certificates: ['ISO 9001'],
        quotationStatus: 'Rejected',
        email: 'quotes@precisiontools.com'
      }
    ]
  },
  {
    id: '4',
    rfqNumber: 'RFQ-2025-003',
    title: 'Digital Marketing Campaign Services',
    createdDate: '2025-01-10',
    deliveryDate: '2025-04-30',
    deadline: '2025-01-28',
    paymentTerms: 'Net 30',
    category: 'Services',
    purchaseType: 'Marketing Services',
    status: 'Ongoing',
    attachments: [
      { id: '4-1', filename: 'brand-guidelines.pdf', type: 'pdf', size: '1.8 MB' },
      { id: '4-2', filename: 'target-audience.xlsx', type: 'excel', size: '650 KB' }
    ],
    comments: 'Looking for comprehensive digital marketing strategy including social media, SEO, and paid advertising.',
    items: [
      { id: '4-1', itemName: 'Social Media Management', quantity: 6, unitOfMeasure: 'Months' },
      { id: '4-2', itemName: 'SEO Optimization', quantity: 1, unitOfMeasure: 'Project' },
      { id: '4-3', itemName: 'Google Ads Campaign', quantity: 3, unitOfMeasure: 'Months' },
      { id: '4-4', itemName: 'Content Creation', quantity: 50, unitOfMeasure: 'Posts' }
    ],
    vendors: [
      {
        id: '4-1',
        vendorName: 'Digital Growth Agency',
        location: 'Austin, TX',
        certificates: ['Google Partner', 'Facebook Blueprint'],
        quotationStatus: 'Invited',
        email: 'hello@digitalgrowth.com'
      },
      {
        id: '4-2',
        vendorName: 'Creative Marketing Solutions',
        location: 'Miami, FL',
        certificates: ['HubSpot Certified'],
        quotationStatus: 'Quote Received',
        email: 'proposals@creativemarketingsolutions.com',
        submittedRFQ: true,
        submissionDate: '2025-01-14',
        totalAmount: 45000
      },
      {
        id: '4-3',
        vendorName: 'Performance Marketing Pro',
        location: 'Denver, CO',
        certificates: ['Google Ads Certified', 'Analytics Certified'],
        quotationStatus: 'Invited',
        email: 'rfq@performancemarketingpro.com'
      }
    ]
  },
  {
    id: '5',
    rfqNumber: 'RFQ-2024-042',
    title: 'Raw Materials Supply Contract',
    createdDate: '2024-12-15',
    deliveryDate: '2025-01-31',
    deadline: '2024-12-30',
    paymentTerms: 'Net 15',
    category: 'Products',
    purchaseType: 'Raw Materials',
    status: 'Completed',
    attachments: [
      { id: '5-1', filename: 'material-specifications.pdf', type: 'pdf', size: '2.1 MB' }
    ],
    comments: 'High-grade raw materials needed for Q1 production schedule. Quality certificates required.',
    items: [
      { id: '5-1', itemName: 'Steel Sheets 2mm', quantity: 500, unitOfMeasure: 'Sheets' },
      { id: '5-2', itemName: 'Aluminum Rods 10mm', quantity: 200, unitOfMeasure: 'Meters' },
      { id: '5-3', itemName: 'Copper Wire 5mm', quantity: 1000, unitOfMeasure: 'Meters' }
    ],
    vendors: [
      {
        id: '5-1',
        vendorName: 'MetalWorks Supply',
        location: 'Pittsburgh, PA',
        certificates: ['ISO 9001', 'ASTM Certified'],
        quotationStatus: 'Quote Received',
        submittedRFQ: true,
        submissionDate: '2024-12-22',
        totalAmount: 78500,
        email: 'orders@metalworkssupply.com'
      }
    ]
  }
];