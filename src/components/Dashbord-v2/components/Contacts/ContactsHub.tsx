import React, { useState } from 'react';
import { Plus, Search, Filter, User, MoreHorizontal, Check, Edit, Trash2, Tag, MessageSquare, X, Minus, Phone } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  position: string;
  email: string;
  company: string;
  phone?: string;
  countryCode?: string;
}

const ContactsHub = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [contactActionMenuId, setContactActionMenuId] = useState<number | null>(null);
  const [newContact, setNewContact] = useState({
    name: '',
    position: '',
    email: '',
    company: '',
    phone: '',
    countryCode: '+1'
  });

  const countryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+44', country: 'UK' },
    { code: '+91', country: 'IN' },
    { code: '+86', country: 'CN' },
    { code: '+49', country: 'DE' },
    { code: '+33', country: 'FR' },
    { code: '+81', country: 'JP' },
    { code: '+61', country: 'AU' }
  ];

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(contact => contact.id));
    }
  };

  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId) 
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleEditSelected = () => {
    console.log('Editing contacts:', selectedContacts);
  };

  const handleDeleteSelected = () => {
    setContacts(prev => prev.filter(contact => !selectedContacts.includes(contact.id)));
    setSelectedContacts([]);
  };

  const handleLabelSelected = () => {
    console.log('Labeling contacts:', selectedContacts);
  };

  const handleAddContact = () => {
    if (newContact.name && newContact.email) {
      const contact: Contact = {
        id: Date.now(),
        name: newContact.name,
        position: newContact.position,
        email: newContact.email,
        company: newContact.company,
        phone: newContact.phone,
        countryCode: newContact.countryCode
      };
      setContacts(prev => [...prev, contact]);
      setNewContact({ name: '', position: '', email: '', company: '', phone: '', countryCode: '+1' });
      setShowAddModal(false);
    }
  };

  if (contacts.length === 0 && !showAddModal) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your contact list</p>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300">
            <span>Import</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="border-b border-gray-200 p-4 md:p-6">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search contacts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
          <div className="text-center max-w-md bg-white rounded-lg p-8 shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900 mb-2">Nothing here yet! Let's change that.</h1>
            <p className="text-gray-500 mb-6 text-sm">Start by adding a new person or import data from a CSV file.</p>
            <div className="flex items-center justify-center space-x-3">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Add person
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm border border-gray-300">
                Import CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
          <p className="text-sm text-gray-600 mt-1">{contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} available</p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300">
          <span>Import</span>
        </button>
        <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-300">
          <span>Import</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="p-4 md:p-6">
        <div className="flex items-center space-x-2 md:space-x-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contacts..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={toggleSelectAll}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                        selectedContacts.length === contacts.length
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : selectedContacts.length > 0
                          ? 'bg-blue-100 border-blue-600 text-blue-600'
                          : 'border-gray-300 hover:border-blue-600'
                      }`}
                    >
                      {selectedContacts.length === contacts.length && <Check className="w-3 h-3" />}
                      {selectedContacts.length > 0 && selectedContacts.length < contacts.length && <Minus className="w-3 h-3" />}
                    </button>
                    <span>Name</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Position</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Company</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr 
                  key={contact.id} 
                  className="hover:bg-gray-50 border-b border-gray-100"
                  onMouseEnter={() => setHoveredContact(contact.id)}
                  onMouseLeave={() => setHoveredContact(null)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => toggleContactSelection(contact.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          selectedContacts.includes(contact.id)
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : (hoveredContact === contact.id || selectedContacts.length > 0)
                            ? 'border-gray-300 hover:border-blue-600'
                            : 'border-transparent'
                        }`}
                        style={{
                          opacity: (hoveredContact === contact.id || selectedContacts.includes(contact.id) || selectedContacts.length > 0) ? 1 : 0
                        }}
                      >
                        {selectedContacts.includes(contact.id) && <Check className="w-3 h-3" />}
                      </button>
                      <span className="text-sm font-medium text-gray-900">{contact.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{contact.position}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{contact.email}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">{contact.company}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-900">
                      {contact.phone ? `${contact.countryCode} ${contact.phone}` : '-'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setContactActionMenuId(contactActionMenuId === contact.id ? null : contact.id);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-gray-400" />
                        </button>
                        
                        {contactActionMenuId === contact.id && (
                          <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Message
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Request Quote
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Ask Meeting
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Send KYC
                            </button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
                              Edit
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Add Contact</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  type="text"
                  value={newContact.position}
                  onChange={(e) => setNewContact(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={newContact.company}
                  onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <div className="flex space-x-2">
                  <select
                    value={newContact.countryCode}
                    onChange={(e) => setNewContact(prev => ({ ...prev, countryCode: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.code} ({country.country})
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Phone number"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Contact
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Panel */}
      {selectedContacts.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-gray-800 text-white rounded-full px-6 py-3 shadow-lg flex items-center space-x-4">
            <span className="text-sm font-medium">
              {selectedContacts.length} record{selectedContacts.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLabelSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Add Label"
              >
                <Tag className="w-4 h-4" />
              </button>
              <button
                onClick={handleEditSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Edit Contacts"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteSelected}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
                title="Delete Contacts"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setSelectedContacts([])}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              title="Cancel Selection"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactsHub;