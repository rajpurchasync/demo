import React, { useState } from "react";
import { User, Mail, Phone, Edit, Eye, Plus, X } from "lucide-react";
import AddContactModal from "../Modals/AddContactModal";

interface Contact {
  id: string;
  name: string;
  email: string;
  title: string;
  phone?: string;
  department?: string;
  isPrimary: boolean;
}

interface ContactsTabProps {
  supplierId: string;
}

const ContactsTab: React.FC<ContactsTabProps> = ({ supplierId }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");

  // Mock contacts data
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "John Smith",
      email: "john.smith@company.com",
      title: "Sales Manager",
      phone: "+1 (555) 123-4567",
      department: "Sales",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      title: "Account Executive",
      phone: "+1 (555) 234-5678",
      department: "Sales",
      isPrimary: false,
    },
    {
      id: "3",
      name: "Mike Davis",
      email: "mike.davis@company.com",
      title: "Technical Lead",
      phone: "+1 (555) 345-6789",
      department: "Engineering",
      isPrimary: false,
    },
  ]);

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode("view");
    setShowContactModal(true);
  };

  const handleEditContact = (contact: Contact) => {
    setSelectedContact(contact);
    setModalMode("edit");
    setShowContactModal(true);
  };

  const handleAddContact = (newContact: Omit<Contact, 'id'>) => {
    setContacts(prev => [...prev, { ...newContact, id: Date.now().toString() }]);
    setShowContactModal(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Contacts</h3>
        <button 
          onClick={() => { setSelectedContact(null); setModalMode("edit"); setShowContactModal(true); }}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {contact.name.split(" ").map(n => n).join("")}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    {contact.isPrimary && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{contact.title}</p>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      <span>{contact.email}</span>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{contact.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleViewContact(contact)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="View Contact"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditContact(contact)}
                  className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Contact"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <AddContactModal 
          isOpen={showContactModal} 
          onClose={() => setShowContactModal(false)} 
          onSave={handleAddContact} 
          initialData={modalMode === "edit" ? selectedContact : undefined}
        />
      )}
    </div>
  );
};

export default ContactsTab;