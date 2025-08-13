import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Package, Hash, Scale, Edit3, Check, FileText, Star } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

interface ItemManagementModalProps {
  items: Item[];
  onClose: () => void;
  onSave: (items: Item[]) => void;
  isServiceList?: boolean;
}

interface Template {
  id: string;
  name: string;
  items: { name: string; unit: string }[];
  type: 'product' | 'service' | 'project';
}

// Mock templates data
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Office Supplies Basic',
    type: 'product',
    items: [
      { name: 'A4 Paper', unit: 'boxes' },
      { name: 'Pens (Blue)', unit: 'pieces' },
      { name: 'Staplers', unit: 'pieces' },
      { name: 'Paper Clips', unit: 'boxes' },
      { name: 'Folders', unit: 'pieces' }
    ]
  },
  {
    id: '2',
    name: 'Cleaning Services Package',
    type: 'service',
    items: [
      { name: 'Office Cleaning', unit: 'hours' },
      { name: 'Window Cleaning', unit: 'hours' },
      { name: 'Carpet Cleaning', unit: 'square meters' },
      { name: 'Restroom Sanitization', unit: 'hours' }
    ]
  },
  {
    id: '3',
    name: 'Construction Materials',
    type: 'project',
    items: [
      { name: 'Cement', unit: 'tons' },
      { name: 'Steel Rods', unit: 'kg' },
      { name: 'Bricks', unit: 'pieces' },
      { name: 'Sand', unit: 'cubic meters' },
      { name: 'Gravel', unit: 'cubic meters' }
    ]
  },
  {
    id: '4',
    name: 'IT Equipment Setup',
    type: 'service',
    items: [
      { name: 'Network Installation', unit: 'hours' },
      { name: 'Computer Setup', unit: 'pieces' },
      { name: 'Software Installation', unit: 'hours' },
      { name: 'Training Sessions', unit: 'hours' }
    ]
  }
];

const units = [
  'pieces', 'kg', 'liters', 'meters', 'boxes', 'pallets', 
  'hours', 'days', 'months', 'tons', 'grams', 'milliliters',
  'centimeters', 'inches', 'feet', 'yards', 'square meters',
  'cubic meters', 'dozen', 'sets', 'rolls', 'sheets'
];

const ItemManagementModal: React.FC<ItemManagementModalProps> = ({
  items,
  onClose,
  onSave,
  isServiceList = false
}) => {
  const [itemList, setItemList] = useState<Item[]>(items);
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showTemplateItems, setShowTemplateItems] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templateItems, setTemplateItems] = useState<Item[]>([]);

  useEffect(() => {
    if (itemList.length === 0) {
      setItemList([{ id: Date.now().toString(), name: '', quantity: '', unit: '' }]);
    }
  }, []);

  const addNewItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      name: '',
      quantity: '',
      unit: ''
    };
    setItemList(prev => [...prev, newItem]);
  };

  const removeItem = (itemId: string) => {
    if (itemList.length > 1) {
      setItemList(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const startEditing = (itemId: string, field: string, currentValue: string) => {
    setEditingCell({ id: itemId, field });
    setEditValue(currentValue);
  };

  const saveEdit = () => {
    if (editingCell) {
      setItemList(prev => prev.map(item => 
        item.id === editingCell.id 
          ? { ...item, [editingCell.field]: editValue }
          : item
      ));
      setEditingCell(null);
      setEditValue('');
    }
  };

  const updateItemField = (itemId: string, field: keyof Item, value: string) => {
    setItemList(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, [field]: value }
        : item
    ));
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue('');
  };

  const handleSave = () => {
    const validItems = itemList.filter(item => 
      item.name.trim() || item.quantity.trim() || item.unit.trim()
    );
    
    if (validItems.length === 0) {
      validItems.push({ id: '1', name: '', quantity: '', unit: '' });
    }
    
    onSave(validItems);
  };

  const getTemplateType = (): 'product' | 'service' | 'project' => {
    if (isServiceList) {
      // This is a bit tricky - we need to determine if it's service or project
      // For now, we'll assume service, but this could be passed as a prop
      return 'service';
    }
    return 'product';
  };

  const getRelevantTemplates = () => {
    const templateType = getTemplateType();
    return mockTemplates.filter(template => template.type === templateType);
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    const templateItemsWithQuantity = template.items.map((item, index) => ({
      id: (Date.now() + index).toString(),
      name: item.name,
      quantity: '',
      unit: item.unit
    }));
    setTemplateItems(templateItemsWithQuantity);
    setShowTemplateModal(false);
    setShowTemplateItems(true);
  };

  const updateTemplateItemQuantity = (itemId: string, quantity: string) => {
    setTemplateItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const handleTemplateSubmit = () => {
    const validTemplateItems = templateItems.filter(item => item.quantity.trim());
    if (validTemplateItems.length > 0) {
      setItemList(prev => [...prev, ...validTemplateItems]);
    }
    setShowTemplateItems(false);
    setSelectedTemplate(null);
    setTemplateItems([]);
  };

  const renderCell = (item: Item, field: keyof Item, placeholder: string) => {
    const isEditing = editingCell?.id === item.id && editingCell?.field === field;
    const value = item[field];

    if (isEditing) {
      if (field === 'unit') {
        return (
          <div className="relative w-full">
            <select
              value={editValue}
              onChange={(e) => {
                const newValue = e.target.value;
                setEditValue(newValue);
                updateItemField(item.id, 'unit', newValue);
                setEditingCell(null);
                setEditValue('');
              }}
              onBlur={() => {
                setEditingCell(null);
                setEditValue('');
              }}
              className="w-full px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
              autoFocus
            >
              <option value="">Select unit</option>
              {units.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
        );
      } else {
        return (
          <div className="relative">
            <input
              type={field === 'quantity' ? 'number' : 'text'}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveEdit();
                if (e.key === 'Escape') cancelEdit();
              }}
              className="w-full px-2 py-1 text-sm border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder={placeholder}
              autoFocus
            />
          </div>
        );
      }
    }

    return (
      <div
        onClick={() => startEditing(item.id, field, value)}
        className="w-full px-2 py-2 text-sm cursor-pointer hover:bg-blue-50 rounded transition-colors min-h-[36px] flex items-center"
      >
        {value || (
          <span className="text-gray-400 italic">{placeholder}</span>
        )}
      </div>
    );
  };

  const getModalTitle = () => {
    if (isServiceList) {
      return 'Manage Service/Component List';
    }
    return 'Manage Items';
  };

  const getModalDescription = () => {
    if (isServiceList) {
      return 'Add and organize your required services or project components';
    }
    return 'Add and organize your required items';
  };

  const getItemLabel = () => {
    if (isServiceList) {
      return 'Service/Component Name';
    }
    return 'Item Name';
  };

  const getAddButtonText = () => {
    if (isServiceList) {
      return 'Add New Service/Component';
    }
    return 'Add New Item';
  };

  const getSaveButtonText = () => {
    if (isServiceList) {
      return 'Save Services/Components';
    }
    return 'Save Items';
  };

  const getCountText = () => {
    const count = itemList.length;
    if (isServiceList) {
      return `${count} service/component${count !== 1 ? 's' : ''} in list`;
    }
    return `${count} item${count !== 1 ? 's' : ''} in list`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-teal-50">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <Package className="w-6 h-6 text-blue-600" />
                <span>{getModalTitle()}</span>
              </h2>
              <p className="text-gray-600 mt-1">{getModalDescription()}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
              title="Close"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden md:block bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-0">
              <div className="col-span-1 p-3 text-center">
                <Hash className="w-4 h-4 text-gray-500 mx-auto" />
              </div>
              <div className="col-span-6 p-3 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-700">{getItemLabel()}</span>
                </div>
              </div>
              <div className="col-span-2 p-3 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-700">Quantity</span>
                </div>
              </div>
              <div className="col-span-2 p-3 border-l border-gray-200">
                <div className="flex items-center space-x-2">
                  <Scale className="w-4 h-4 text-gray-600" />
                  <span className="font-semibold text-gray-700">Unit</span>
                </div>
              </div>
              <div className="col-span-1 p-3 border-l border-gray-200 text-center">
                <span className="font-semibold text-gray-700">Action</span>
              </div>
            </div>
          </div>

          {/* Items List - Desktop */}
          <div className="hidden md:block max-h-96 overflow-y-auto">
            {itemList.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-0 border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Row Number */}
                <div className="col-span-1 p-3 text-center bg-gray-50 border-r border-gray-200">
                  <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                </div>

                {/* Item Name */}
                <div className="col-span-6 border-r border-gray-200">
                  {renderCell(item, 'name', 'Enter item name...')}
                </div>

                {/* Quantity */}
                <div className="col-span-2 border-r border-gray-200">
                  {renderCell(item, 'quantity', '0')}
                </div>

                {/* Unit */}
                <div className="col-span-2 border-r border-gray-200">
                  {renderCell(item, 'unit', 'Select unit')}
                </div>

                {/* Actions */}
                <div className="col-span-1 p-2 flex justify-center">
                  {itemList.length > 1 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Items List - Mobile */}
          <div className="md:hidden max-h-96 overflow-y-auto">
            {itemList.map((item, index) => (
              <div
                key={item.id}
                className="border-b border-gray-100 p-4 space-y-3"
              >
                {/* Item Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <span className="font-medium text-gray-700">Item {index + 1}</span>
                  </div>
                  {itemList.length > 1 && (
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Item Fields */}
                <div className="space-y-3">
                  {/* Item Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center space-x-1">
                        <Package className="w-3 h-3" />
                        <span>{getItemLabel()}</span>
                      </div>
                    </label>
                    <div className="border border-gray-300 rounded-lg">
                      {renderCell(item, 'name', 'Enter item name...')}
                    </div>
                  </div>

                  {/* Quantity and Unit Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center space-x-1">
                          <Hash className="w-3 h-3" />
                          <span>Quantity</span>
                        </div>
                      </label>
                      <div className="border border-gray-300 rounded-lg">
                        {renderCell(item, 'quantity', '0')}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        <div className="flex items-center space-x-1">
                          <Scale className="w-3 h-3" />
                          <span>Unit</span>
                        </div>
                      </label>
                      <div className="border border-gray-300 rounded-lg">
                        {renderCell(item, 'unit', 'Select unit')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Add New Item Button */}
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <button
                onClick={addNewItem}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>{getAddButtonText()}</span>
              </button>
              <button
                onClick={() => setShowTemplateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
              >
                <FileText className="w-4 h-4" />
                <span>Use Template</span>
              </button>
            </div>
          </div>

          {/* Instructions */}

          {/* Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between p-6 bg-gray-50 space-y-3 sm:space-y-0">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{getCountText()}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200"
              >
                <Check className="w-4 h-4" />
                <span>{getSaveButtonText()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowTemplateModal(false)} />
            
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span>Select Template</span>
                </h3>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Templates List */}
              <div className="p-6">
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {getRelevantTemplates().map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {template.items.length} items included
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {template.items.slice(0, 3).map((item, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                              >
                                {item.name}
                              </span>
                            ))}
                            {template.items.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                                +{template.items.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        <Star className="w-5 h-5 text-purple-500 flex-shrink-0 ml-2" />
                      </div>
                    </button>
                  ))}
                </div>
                
                {getRelevantTemplates().length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No templates available for this type</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Items Modal */}
      {showTemplateItems && selectedTemplate && (
        <div className="fixed inset-0 z-60 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setShowTemplateItems(false)} />
            
            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span>{selectedTemplate.name}</span>
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">Add quantities for each item</p>
                </div>
                <button
                  onClick={() => setShowTemplateItems(false)}
                  className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Template Items */}
              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {templateItems.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.name}</h4>
                        <p className="text-sm text-gray-600">Unit: {item.unit}</p>
                      </div>
                      <div className="w-24">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateTemplateItemQuantity(item.id, e.target.value)}
                          placeholder="Qty"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowTemplateItems(false)}
                  className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTemplateSubmit}
                  className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200"
                >
                  <Check className="w-4 h-4" />
                  <span>Add Items</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemManagementModal;