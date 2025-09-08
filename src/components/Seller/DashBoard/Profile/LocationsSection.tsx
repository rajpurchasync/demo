import React, { useState } from 'react';
import { Plus, MapPin, Edit3, Trash2, Check, X } from 'lucide-react';
import { Button } from '../UI/Button';

interface Location {
  id: string;
  name: string;
  country: string;
  state: string;
  city: string;
  street: string;
  details: string;
  isDefault: boolean;
}

export function LocationsSection() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Head Office',
      country: 'United Arab Emirates',
      state: 'Dubai',
      city: 'Dubai',
      street: 'Sheikh Zayed Road',
      details: 'Tower 1, Floor 15, Office 1501',
      isDefault: true
    },
    {
      id: '2',
      name: 'Branch Office',
      country: 'United Arab Emirates',
      state: 'Abu Dhabi',
      city: 'Abu Dhabi',
      street: 'Corniche Road',
      details: 'Marina Mall, Level 2',
      isDefault: false
    }
  ]);

  const [newLocation, setNewLocation] = useState({
    name: '',
    country: 'United Arab Emirates',
    state: 'Dubai',
    city: '',
    street: '',
    details: ''
  });

  const countries = [
    'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'
  ];

  const states = [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
  ];

  const handleInputChange = (field: string, value: string) => {
    setNewLocation(prev => ({ ...prev, [field]: value }));
  };

  const handleAddLocation = () => {
    const location: Location = {
      id: Date.now().toString(),
      ...newLocation,
      isDefault: false
    };
    setLocations(prev => [...prev, location]);
    setNewLocation({
      name: '',
      country: 'United Arab Emirates',
      state: 'Dubai',
      city: '',
      street: '',
      details: ''
    });
    setShowAddForm(false);
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(prev => prev.filter(loc => loc.id !== id));
  };

  const handleEditLocation = (id: string) => {
    setEditingId(id);
  };

  const handleSaveEdit = (id: string, updatedLocation: Partial<Location>) => {
    setLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, ...updatedLocation } : loc
    ));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="p-3 space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-900">Office Locations</h2>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add Branch
        </Button>
      </div>

      {/* Existing Locations */}
      <div className="space-y-2">
        {locations.map((location) => (
          <div key={location.id} className="p-2 border border-gray-200 rounded bg-white">
            {editingId === location.id ? (
              <EditLocationForm
                location={location}
                onSave={(updatedLocation) => handleSaveEdit(location.id, updatedLocation)}
                onCancel={handleCancelEdit}
                countries={countries}
                states={states}
              />
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-900">{location.name}</span>
                    {location.isDefault && (
                      <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-600 ml-5">
                    <p>{location.street}</p>
                    <p>{location.details}</p>
                    <p>{location.city}, {location.state}, {location.country}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handleEditLocation(location.id)}
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  {!location.isDefault && (
                    <button 
                      onClick={() => handleDeleteLocation(location.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Location Form */}
      {showAddForm && (
        <div className="p-3 border border-gray-200 rounded bg-gray-50">
          <h3 className="text-xs font-medium text-gray-900 mb-2">Add New Location</h3>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Location name (e.g., Branch Office)"
              value={newLocation.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />
            
            <div className="grid grid-cols-2 gap-2">
              <select
                value={newLocation.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
              <select
                value={newLocation.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
              >
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="City"
              value={newLocation.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />

            <input
              type="text"
              placeholder="Street address"
              value={newLocation.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />

            <input
              type="text"
              placeholder="Additional details (building, floor, etc.)"
              value={newLocation.details}
              onChange={(e) => handleInputChange('details', e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
            />

            <div className="flex space-x-2 pt-2">
              <Button size="sm" onClick={handleAddLocation} className="text-xs">
                Add Location
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
    </div>
  );
}

interface EditLocationFormProps {
  location: Location;
  onSave: (location: Partial<Location>) => void;
  onCancel: () => void;
  countries: string[];
  states: string[];
}

function EditLocationForm({ location, onSave, onCancel, countries, states }: EditLocationFormProps) {
  const [formData, setFormData] = useState({
    name: location.name,
    country: location.country,
    state: location.state,
    city: location.city,
    street: location.street,
    details: location.details
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
      />
      
      <div className="grid grid-cols-2 gap-2">
        <select
          value={formData.country}
          onChange={(e) => handleInputChange('country', e.target.value)}
          className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
        >
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select
          value={formData.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className="px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
        >
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={formData.city}
        onChange={(e) => handleInputChange('city', e.target.value)}
        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
        placeholder="City"
      />

      <input
        type="text"
        value={formData.street}
        onChange={(e) => handleInputChange('street', e.target.value)}
        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
        placeholder="Street address"
      />

      <input
        type="text"
        value={formData.details}
        onChange={(e) => handleInputChange('details', e.target.value)}
        className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-purple-500 focus:border-transparent"
        placeholder="Additional details"
      />

      <div className="flex space-x-2 pt-2">
        <Button size="sm" onClick={handleSave} className="text-xs">
          <Check className="w-3 h-3 mr-1" />
          Save
        </Button>
        <Button 
          size="sm" 
          variant="secondary" 
          onClick={onCancel}
          className="text-xs"
        >
          <X className="w-3 h-3 mr-1" />
          Cancel
        </Button>
      </div>
    </div>
  );
}