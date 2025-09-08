import React, { useState } from "react";
import {
  Plus,
  Edit3,
  Trash2,
  User,
  Mail,
  Phone,
  Briefcase,
  X,
} from "lucide-react";
import { Button } from "../UI/Button";
import { Input } from "../UI/Input";
import { CustomerContact } from "../types/purchasync";

interface CustomerContactsSectionProps {
  contacts: CustomerContact[];
  onUpdate: (contacts: CustomerContact[]) => void;
}

export function CustomerContactsSection({
  contacts,
  onUpdate,
}: CustomerContactsSectionProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newContact, setNewContact] = useState({
    name: "",
    position: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setNewContact((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      const contact: CustomerContact = {
        id: Date.now().toString(),
        ...newContact,
      };
      onUpdate([...contacts, contact]);
      setNewContact({ name: "", position: "", email: "", phone: "" });
      setShowAddForm(false);
    }
  };

  const handleDeleteContact = (id: string) => {
    onUpdate(contacts.filter((contact) => contact.id !== id));
  };

  const handleEditContact = (
    id: string,
    updatedContact: Partial<CustomerContact>
  ) => {
    onUpdate(
      contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-gray-900">Contacts</h3>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Contact
          </Button>
        </div>

        {/* Add Contact Form */}
        {showAddForm && (
          <div className="mb-4 p-3 border border-gray-200 rounded bg-gray-50">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Add New Contact
            </h4>
            <div className="space-y-3">
              <Input
                label="Name"
                placeholder="Contact name"
                value={newContact.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="text-sm"
              />
              <Input
                label="Position"
                placeholder="Job title"
                value={newContact.position}
                onChange={(e) => handleInputChange("position", e.target.value)}
                className="text-sm"
              />
              <Input
                label="Email"
                type="email"
                placeholder="email@company.com"
                value={newContact.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="text-sm"
              />
              <Input
                label="Phone"
                placeholder="+971 50 123 4567"
                value={newContact.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="text-sm"
              />
              <div className="flex space-x-2 pt-2">
                <Button
                  size="sm"
                  onClick={handleAddContact}
                  className="text-xs"
                >
                  Add Contact
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-3">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              isEditing={editingId === contact.id}
              onEdit={() => setEditingId(contact.id)}
              onSave={(updatedContact) =>
                handleEditContact(contact.id, updatedContact)
              }
              onCancel={() => setEditingId(null)}
              onDelete={() => handleDeleteContact(contact.id)}
            />
          ))}
          {contacts.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No contacts added yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

interface ContactCardProps {
  contact: CustomerContact;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (contact: Partial<CustomerContact>) => void;
  onCancel: () => void;
  onDelete: () => void;
}

function ContactCard({
  contact,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: ContactCardProps) {
  const [formData, setFormData] = useState({
    name: contact.name,
    position: contact.position,
    email: contact.email,
    phone: contact.phone,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  if (isEditing) {
    return (
      <div className="p-3 border border-gray-200 rounded bg-gray-50">
        <div className="space-y-3">
          <Input
            label="Name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="text-sm"
          />
          <Input
            label="Position"
            value={formData.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
            className="text-sm"
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="text-sm"
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="text-sm"
          />
          <div className="flex space-x-2 pt-2">
            <Button size="sm" onClick={handleSave} className="text-xs">
              Save
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={onCancel}
              className="text-xs"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 border border-gray-200 rounded bg-white">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-2">
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-2 text-gray-500" />
            <span className="font-medium">{contact.name}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
            <span>{contact.position}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Mail className="w-4 h-4 mr-2 text-gray-500" />
            <span>{contact.email}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 mr-2 text-gray-500" />
            <span>{contact.phone}</span>
          </div>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={onEdit}
            className="p-1 text-gray-500 hover:bg-gray-100 rounded"
          >
            <Edit3 className="w-3 h-3" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
