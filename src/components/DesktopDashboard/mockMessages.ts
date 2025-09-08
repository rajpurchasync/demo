import { Message } from "./types";

export const mockMessages: Message[] = [
  {
    id: "1",
    type: "email",
    sender: "Sarah Johnson",
    senderEmail: "sarah.johnson@company.com",
    subject: "Urgent: Q1 Budget Review Meeting",
    content:
      "Hi team, we need to schedule our Q1 budget review meeting for next week. Please let me know your availability for Tuesday or Wednesday afternoon. We need to discuss the marketing spend allocation and the new product development budget. This is time-sensitive as the board meeting is on Friday.",
    timestamp: new Date(2025, 0, 20, 14, 30),
    isRead: false,
    isArchived: false,
    priority: "high",
    attachments: [
      {
        id: "att1",
        name: "Q1_Budget_Draft.pdf",
        size: 2048000,
        type: "application/pdf",
        url: "#",
      },
    ],
  },
  {
    id: "2",
    type: "whatsapp",
    sender: "Mike Chen",
    senderPhone: "+1 555 0123",
    content:
      "Hey! The client just called about the website redesign. They want to add a new section for testimonials and change the color scheme to something more modern. Can we schedule a call tomorrow to discuss the changes? They seem pretty excited about the project! 🚀",
    timestamp: new Date(2025, 0, 20, 11, 45),
    isRead: true,
    isArchived: false,
    priority: "medium",
  },
  {
    id: "3",
    type: "email",
    sender: "Alex Rivera",
    senderEmail: "alex.rivera@techcorp.com",
    subject: "Server Migration Completed",
    content:
      "The server migration has been completed successfully. All services are now running on the new infrastructure. Database performance has improved by 40% and we have better redundancy. Please update your development environment configurations to point to the new endpoints.",
    timestamp: new Date(2025, 0, 20, 9, 15),
    isRead: true,
    isArchived: false,
    priority: "low",
  },
  {
    id: "4",
    type: "whatsapp",
    sender: "Emma Davis",
    senderPhone: "+1 555 0456",
    content:
      "Can you help me with the user authentication flow? I'm getting some weird errors when users try to reset their passwords. The email is being sent but the reset link doesn't seem to work properly. This is blocking our launch timeline.",
    timestamp: new Date(2025, 0, 19, 16, 20),
    isRead: false,
    isArchived: false,
    priority: "high",
  },
  {
    id: "5",
    type: "email",
    sender: "James Wilson",
    senderEmail: "james.wilson@startup.io",
    subject: "Partnership Proposal",
    content:
      "We would like to explore a potential partnership between our companies. Our startup focuses on AI-powered analytics and we believe there could be great synergy with your platform. Would you be interested in a preliminary discussion? We have some exciting ideas to share.",
    timestamp: new Date(2025, 0, 19, 13, 10),
    isRead: true,
    isArchived: false,
    priority: "medium",
  },
  {
    id: "6",
    type: "whatsapp",
    sender: "Lisa Park",
    senderPhone: "+1 555 0789",
    content:
      "The demo went really well! The client loved the new features, especially the real-time collaboration part. They want to move forward with the premium plan. Should I send them the contract? Also, they mentioned they might want some custom integrations.",
    timestamp: new Date(2025, 0, 19, 10, 30),
    isRead: false,
    isArchived: false,
    priority: "medium",
  },
];
