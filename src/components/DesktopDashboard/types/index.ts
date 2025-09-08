export interface Message {
  id: string;
  type: 'email' | 'whatsapp';
  sender: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isArchived: boolean;
  priority: 'low' | 'medium' | 'high';
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo?: string;
  status: 'todo' | 'in-progress' | 'completed';
  sourceMessageId: string;
  createdAt: Date;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignedTo?: string;
}