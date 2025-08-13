import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Upload, X, FileText, Image, Package, Edit3, Plus, Hash, AlertCircle } from 'lucide-react';
import ItemManagementModal from '../ItemManagementModal';
import CustomDropdown from '../CustomDropdown';

interface RFQDetailsStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

interface RFQItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
}

const RFQDetailsStep: React.FC<RFQDetailsStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious
}) => {
  const [formData, setFormData] = useState({
    title: data.title || '',
    serviceType: data.serviceType || '',
    scopeOfWork: data.scopeOfWork || '',
    includeItemsList: data.includeItemsList || false,
    includedItems: data.includedItems || [{ id: '1', name: '', quantity: '', unit: '' }],
    excludedItems: data.excludedItems || [{ id: '1', name: '', quantity: '', unit: '' }],
    purchaseType: data.purchaseType || '',
    recurringFrequency: data.recurringFrequency || '',
    items: data.items || [{ id: '1', name: '', quantity: '', unit: '' }],
    attachments: data.attachments || [],
  });

  const [showItemModal, setShowItemModal] = useState(false);
  const [showIncludedModal, setShowIncludedModal] = useState(false);
  const [showExcludedModal, setShowExcludedModal] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItemsUpdate = (items: RFQItem[]) => {
    setFormData(prev => ({ ...prev, items }));
    setShowItemModal(false);
  };

  const handleIncludedItemsUpdate = (items: RFQItem[]) => {
    setFormData(prev => ({ ...prev, includedItems: items }));
    setShowIncludedModal(false);
  };

  const handleExcludedItemsUpdate = (items: RFQItem[]) => {
    setFormData(prev => ({ ...prev, excludedItems: items }));
    setShowExcludedModal(false);
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newAttachments = files.map(file => ({
      id: Date.now().toString() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      type: file.type.includes('image') ? 'image' : file.type.includes('pdf') ? 'pdf' : 'file',
      file: file
    }));

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments]
    }));
  };

  const removeAttachment = (attachmentId: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((att: any) => att.id !== attachmentId)
    }));
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-5 h-5 text-blue-500" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const isServicesRFQ = data.rfqType === 'service';
  const isProjectRFQ = data.rfqType === 'project';
  const isServiceBased = isServicesRFQ || isProjectRFQ;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {isServicesRFQ ? 'Service Request Details' : 'RFQ Details'}
          </h2>
          <p className="text-gray-600">
            {isServicesRFQ 
              ? 'Provide the basic information about your service request'
              : 'Provide the basic information about your request'
            }
          </p>
        </div>

        <div className="space-y-6">
          {isServicesRFQ ? (
            /* Service Type Selection for Services only */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Service Type *
              </label>
              <CustomDropdown
                options={[
                  { value: 'one-time', label: 'One time' },
                  { value: 'recurring', label: 'Recurring' },
                  { value: 'contractual', label: 'Contractual' }
                ]}
                value={formData.serviceType}
                onChange={(value) => handleInputChange('serviceType', value)}
                placeholder="Select service type"
                error={!formData.serviceType}
              />
            </div>
          ) : !isProjectRFQ ? (
            /* Purchase Type Selection */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Purchase Type *
              </label>
              <CustomDropdown
                options={[
                  { value: 'one-time', label: 'One-time Purchase' },
                  { value: 'recurring', label: 'Recurring' },
                  { value: 'contractual', label: 'Contractual' }
                ]}
                value={formData.purchaseType}
                onChange={(value) => handleInputChange('purchaseType', value)}
                placeholder="Select purchase type"
                error={!formData.purchaseType}
              />
            </div>
          ) : null}

          {/* Recurring Frequency for both Products and Services */}
          {((isServicesRFQ && formData.serviceType === 'recurring') || (!isServiceBased && formData.purchaseType === 'recurring')) && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Recurring Frequency *
              </label>
              <CustomDropdown
                options={[
                  { value: 'daily', label: 'Daily' },
                  { value: 'weekly', label: 'Weekly' },
                  { value: 'monthly', label: 'Monthly' },
                  { value: 'annually', label: 'Annually' }
                ]}
                value={formData.recurringFrequency}
                onChange={(value) => handleInputChange('recurringFrequency', value)}
                placeholder="Select frequency"
                error={!formData.recurringFrequency}
              />
            </div>
          )}

          {/* Category for Products, Title for Services */}
          {!isServiceBased ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <CustomDropdown
                options={[
                  { value: 'food', label: 'Food' },
                  { value: 'beverage', label: 'Beverage' },
                  { value: 'hygiene-consumable', label: 'Hygiene & Consumable' },
                  { value: 'ose', label: 'OS&E' },
                  { value: 'linens-uniforms', label: 'Linens & Uniforms' },
                  { value: 'equipment', label: 'Equipment' },
                  { value: 'it-electronics', label: 'IT & Electronics' }
                ]}
                value={formData.category || ''}
                onChange={(value) => handleInputChange('category', value)}
                placeholder="Select category"
                error={validationAttempted && !formData.category}
              />
              {validationAttempted && !formData.category && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Category is required</span>
                </div>
              )}
            </div>
          ) : !isProjectRFQ ? (
            /* Title for Services and Projects */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Service Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Website Development Services"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationAttempted && !formData.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {validationAttempted && !formData.title && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Service title is required</span>
                </div>
              )}
            </div>
          ) : (
            /* Project Title for Projects */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="e.g., Office Building Construction Project"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationAttempted && !formData.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {validationAttempted && !formData.title && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Project title is required</span>
                </div>
              )}
            </div>
          )}

          {/* Use Template - Only for Products */}

          {/* Title field only for Services and Projects */}

          {isServicesRFQ ? (
            /* Scope of Work for Services and Projects */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Scope of Work *
              </label>
              <textarea
                value={formData.scopeOfWork}
                onChange={(e) => handleInputChange('scopeOfWork', e.target.value)}
                placeholder="Describe the scope of work, deliverables, timeline, requirements, and any specific details about the service you need..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ) : isProjectRFQ ? (
            /* Project Scope & Requirements for Projects */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Project Scope & Requirements *
              </label>
              <textarea
                value={formData.scopeOfWork}
                onChange={(e) => handleInputChange('scopeOfWork', e.target.value)}
                placeholder="Describe the project scope, deliverables, timeline, requirements, budget considerations, and any specific details about the project..."
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ) : null}

          {isServicesRFQ ? (
            /* Items List Toggle for Services and Projects */
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Service List</span>
                  </div>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeItemsList}
                    onChange={(e) => handleInputChange('includeItemsList', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {formData.includeItemsList && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-blue-700">Service List</h4>
                    <button
                      type="button"
                      onClick={() => setShowIncludedModal(true)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Service</span>
                    </button>
                  </div>
                  {formData.includedItems.some((item: RFQItem) => item.name.trim()) ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      {formData.includedItems
                        .filter((item: RFQItem) => item.name.trim())
                        .map((item: RFQItem, index: number) => (
                          <div key={item.id} className="flex items-center justify-between py-1">
                            <span className="text-sm text-blue-800">
                              {index + 1}. {item.name} {item.quantity && `(${item.quantity} ${item.unit})`}
                            </span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No service specified</p>
                  )}
                </div>
              )}
            </div>
          ) : isProjectRFQ ? (
            /* Project BOQ for Projects */
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4" />
                    <span>Project BOQ</span>
                  </div>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.includeItemsList}
                    onChange={(e) => handleInputChange('includeItemsList', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              {formData.includeItemsList && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-blue-700">Project BOQ</h4>
                    <button
                      type="button"
                      onClick={() => setShowIncludedModal(true)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Item</span>
                    </button>
                  </div>
                  {formData.includedItems.some((item: RFQItem) => item.name.trim()) ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      {formData.includedItems
                        .filter((item: RFQItem) => item.name.trim())
                        .map((item: RFQItem, index: number) => (
                          <div key={item.id} className="flex items-center justify-between py-1">
                            <span className="text-sm text-blue-800">
                              {index + 1}. {item.name} {item.quantity && `(${item.quantity} ${item.unit})`}
                            </span>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No items specified</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Items List for Products */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Make List of Items</span>
                </div>
              </label>

              {/* Show Add Item button if no items with names exist */}
              {!formData.items.some((item: RFQItem) => item.name.trim()) ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                  <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No items added yet</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowItemModal(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add Item</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowItemModal(true)}
                      className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Use Template</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Excel-like Item List */
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Table Header */}
                  <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
                    <div className="grid grid-cols-12 gap-0">
                      <div className="col-span-1 p-3 text-center border-r border-gray-200">
                        <Hash className="w-4 h-4 text-gray-500 mx-auto" />
                      </div>
                      <div className="col-span-6 p-3 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-600" />
                          <span className="font-semibold text-gray-700">Item Name</span>
                        </div>
                      </div>
                      <div className="col-span-2 p-3 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Hash className="w-4 h-4 text-gray-600" />
                          <span className="font-semibold text-gray-700">Quantity</span>
                        </div>
                      </div>
                      <div className="col-span-2 p-3 border-r border-gray-200">
                        <div className="flex items-center space-x-2">
                          <Package className="w-4 h-4 text-gray-600" />
                          <span className="font-semibold text-gray-700">Unit</span>
                        </div>
                      </div>
                      <div className="col-span-1 p-3 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <span className="font-semibold text-gray-700">Action</span>
                          <button
                            onClick={() => {
                              handleItemsUpdate([{ id: '1', name: '', quantity: '', unit: '' }]);
                            }}
                            className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                            title="Clear all items"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="max-h-64 overflow-y-auto">
                    {formData.items
                      .filter((item: RFQItem) => item.name.trim())
                      .map((item: RFQItem, index: number) => (
                        <div
                          key={item.id}
                          className="grid grid-cols-12 gap-0 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
                        >
                          {/* Row Number */}
                          <div className="col-span-1 p-3 text-center bg-gray-50 border-r border-gray-200">
                            <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                          </div>

                          {/* Item Name */}
                          <div className="col-span-6 p-3 border-r border-gray-200">
                            <span className="text-sm font-medium text-gray-900">{item.name}</span>
                          </div>

                          {/* Quantity */}
                          <div className="col-span-2 p-3 border-r border-gray-200">
                            <span className="text-sm text-gray-700">{item.quantity}</span>
                          </div>

                          {/* Unit */}
                          <div className="col-span-2 p-3 border-r border-gray-200">
                            <span className="text-sm text-gray-700">{item.unit}</span>
                          </div>

                          {/* Actions */}
                          <div className="col-span-1 p-2 flex justify-center">
                            <button
                              onClick={() => {
                                const updatedItems = formData.items.filter((i: RFQItem) => i.id !== item.id);
                                handleItemsUpdate(updatedItems.length > 0 ? updatedItems : [{ id: '1', name: '', quantity: '', unit: '' }]);
                              }}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                              title="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* Add More Items Button */}
                  <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowItemModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add More Items</span>
                      </button>
                      <button
                        onClick={() => setShowItemModal(true)}
                        className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors font-medium"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Use Template</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notes to Providers - Services and Projects */}
          {(isServicesRFQ || isProjectRFQ) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {isProjectRFQ ? 'Project Notes & Requirements' : 'Notes to Providers, inclusion, exclusion'}
                </label>
                {formData.notesToProviders && (
                  <button
                    onClick={() => handleInputChange('notesToProviders', '')}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <textarea
                value={formData.notesToProviders || ''}
                onChange={(e) => handleInputChange('notesToProviders', e.target.value)}
                placeholder={isProjectRFQ 
                  ? "Any additional project requirements, constraints, inclusions, exclusions, or special instructions for project providers..."
                  : "Any additional notes, requirements, inclusions, exclusions, or instructions for service providers..."
                }
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          )}

          {/* Attachments */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                Attachments & Photos
              </label>
              {formData.attachments.length > 0 && (
                <button
                  onClick={() => handleInputChange('attachments', [])}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="space-y-3">
              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Click to upload files</p>
                  <p className="text-sm text-gray-500 mt-1">Images, PDFs, Documents</p>
                </label>
              </div>

              {/* Uploaded Files */}
              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((attachment: any) => (
                    <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getFileIcon(attachment.type)}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                          <p className="text-xs text-gray-500">{attachment.size}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttachment(attachment.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={onPrevious}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Item Management Modal */}
      {showItemModal && (
        <ItemManagementModal
          items={formData.items}
          onClose={() => setShowItemModal(false)}
          onSave={handleItemsUpdate}
          isServiceList={isServiceBased}
        />
      )}

      {/* Included Items Modal */}
      {showIncludedModal && (
        <ItemManagementModal
          items={formData.includedItems}
          onClose={() => setShowIncludedModal(false)}
          onSave={handleIncludedItemsUpdate}
          isServiceList={isServiceBased}
        />
      )}

      {/* Excluded Items Modal */}
      {showExcludedModal && (
        <ItemManagementModal
          items={formData.excludedItems}
          onClose={() => setShowExcludedModal(false)}
          onSave={handleExcludedItemsUpdate}
          isServiceList={isServiceBased}
        />
      )}
    </div>
  );
};

export default RFQDetailsStep;