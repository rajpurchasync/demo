import React, { useState } from 'react';
import { X, Plus, Trash2, ChevronDown, ChevronUp, Eye, Upload } from 'lucide-react';

interface FormField {
  id: string;
  type: 'short-text' | 'long-text' | 'yes-no' | 'other' | 'options' | 'numbers' | 'multi-select';
  question: string;
  required: boolean;
  options?: string[];
}

interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
  collapsed: boolean;
}

interface CreateTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (templateData: any) => void;
}

const CreateTemplateModal: React.FC<CreateTemplateModalProps> = ({ isOpen, onClose, onSave }) => {
  const [templateName, setTemplateName] = useState('');
  const [templateType, setTemplateType] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [sections, setSections] = useState<FormSection[]>([
    {
      id: '1',
      title: 'Basic Information',
      fields: [],
      collapsed: false
    }
  ]);

  const templateTypes = [
    { value: 'pr', label: 'Purchase Request (PR)' },
    { value: 'vendor-onboarding', label: 'Vendor Onboarding' },
    { value: 'kyc', label: 'Know Your Customer (KYC)' },
    { value: 'rfq', label: 'Request for Quotation (RFQ)' },
    { value: 'survey', label: 'Survey' }
  ];

  const fieldTypes = [
    { value: 'short-text', label: 'Short Text' },
    { value: 'long-text', label: 'Long Text' },
    { value: 'yes-no', label: 'Yes/No' },
    { value: 'other', label: 'Other' },
    { value: 'options', label: 'Options' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'multi-select', label: 'Multi Select' }
  ];

  // Dummy templates
  const dummyTemplates = {
    'rfq-simple': {
      name: 'Simple RFQ Template',
      type: 'rfq',
      sections: [
        {
          id: '1',
          title: 'Basic Requirements',
          collapsed: false,
          fields: [
            {
              id: '1',
              type: 'short-text',
              question: 'What product or service do you need?',
              required: true
            },
            {
              id: '2',
              type: 'numbers',
              question: 'What is your budget range?',
              required: true
            },
            {
              id: '3',
              type: 'options',
              question: 'When do you need this delivered?',
              required: true,
              options: ['Within 1 week', 'Within 2 weeks', 'Within 1 month', 'Flexible']
            }
          ]
        }
      ]
    },
    'rfq-detailed': {
      name: 'Detailed RFQ Template',
      type: 'rfq',
      sections: [
        {
          id: '1',
          title: 'Project Overview',
          collapsed: false,
          fields: [
            {
              id: '1',
              type: 'short-text',
              question: 'Project Title',
              required: true
            },
            {
              id: '2',
              type: 'long-text',
              question: 'Detailed project description and requirements',
              required: true
            },
            {
              id: '3',
              type: 'numbers',
              question: 'Estimated project budget (USD)',
              required: true
            }
          ]
        },
        {
          id: '2',
          title: 'Technical Specifications',
          collapsed: false,
          fields: [
            {
              id: '4',
              type: 'multi-select',
              question: 'Which technical standards must be met?',
              required: false,
              options: ['ISO 9001', 'ISO 14001', 'CE Marking', 'FDA Approved', 'Other']
            },
            {
              id: '5',
              type: 'yes-no',
              question: 'Do you require installation services?',
              required: false
            },
            {
              id: '6',
              type: 'options',
              question: 'Preferred delivery timeline',
              required: true,
              options: ['Rush (1-2 weeks)', 'Standard (3-4 weeks)', 'Extended (1-2 months)']
            }
          ]
        }
      ]
    },
    'food-contract': {
      name: 'Food Purchase Contract Template',
      type: 'contract',
      sections: [
        {
          id: '1',
          title: 'Product Information',
          collapsed: false,
          fields: [
            {
              id: '1',
              type: 'short-text',
              question: 'Product Name',
              required: true
            },
            {
              id: '2',
              type: 'multi-select',
              question: 'Food Safety Certifications Required',
              required: true,
              options: ['HACCP', 'FDA', 'USDA', 'Organic', 'Halal', 'Kosher']
            },
            {
              id: '3',
              type: 'numbers',
              question: 'Quantity (units)',
              required: true
            }
          ]
        },
        {
          id: '2',
          title: 'Quality & Compliance',
          collapsed: false,
          fields: [
            {
              id: '4',
              type: 'yes-no',
              question: 'Do you provide batch tracking?',
              required: true
            },
            {
              id: '5',
              type: 'options',
              question: 'Shelf life requirement',
              required: true,
              options: ['Less than 30 days', '30-90 days', '90-180 days', 'More than 180 days']
            },
            {
              id: '6',
              type: 'long-text',
              question: 'Special storage or handling requirements',
              required: false
            }
          ]
        }
      ]
    },
    pr: {
      name: 'Purchase Request Template',
      type: 'pr',
      sections: [
        {
          id: '1',
          title: 'Request Information',
          collapsed: false,
          fields: [
            {
              id: '1',
              type: 'short-text',
              question: 'What is the purpose of this purchase?',
              required: true
            },
            {
              id: '2',
              type: 'numbers',
              question: 'What is your estimated budget?',
              required: true
            },
            {
              id: '3',
              type: 'options',
              question: 'What is the urgency level?',
              required: true,
              options: ['Low', 'Medium', 'High', 'Critical']
            }
          ]
        },
        {
          id: '2',
          title: 'Item Details',
          collapsed: false,
          fields: [
            {
              id: '4',
              type: 'long-text',
              question: 'Describe the items you need to purchase',
              required: true
            },
            {
              id: '5',
              type: 'multi-select',
              question: 'Which departments will use these items?',
              required: false,
              options: ['IT', 'HR', 'Finance', 'Operations', 'Marketing', 'Sales']
            }
          ]
        }
      ]
    },
    'vendor-onboarding': {
      name: 'Comprehensive Vendor Onboarding Template',
      type: 'vendor-onboarding',
      sections: [
        {
          id: '1',
          title: 'Company Information',
          collapsed: false,
          fields: [
            {
              id: '1',
              type: 'short-text',
              question: 'What is your company name?',
              required: true
            },
            {
              id: '2',
              type: 'short-text',
              question: 'Business registration number',
              required: true
            },
            {
              id: '3',
              type: 'long-text',
              question: 'Describe your company\'s main business activities',
              required: true
            },
            {
              id: '4',
              type: 'numbers',
              question: 'Number of employees',
              required: false
            }
          ]
        },
        {
          id: '2',
          title: 'Capabilities & Certifications',
          collapsed: false,
          fields: [
            {
              id: '5',
              type: 'multi-select',
              question: 'Which industries do you serve?',
              required: true,
              options: ['Manufacturing', 'Healthcare', 'Technology', 'Finance', 'Retail', 'Food & Beverage']
            },
            {
              id: '6',
              type: 'yes-no',
              question: 'Do you have ISO 9001 certification?',
              required: false
            },
            {
              id: '7',
              type: 'options',
              question: 'Company size category',
              required: true,
              options: ['Startup (1-10 employees)', 'Small (11-50)', 'Medium (51-200)', 'Large (200+)']
            },
            {
              id: '8',
              type: 'long-text',
              question: 'List your key certifications and compliance standards',
              required: false
            }
          ]
        }
      ]
    }
  };

  if (!isOpen) return null;

  const loadDummyTemplate = (templateKey: 'rfq-simple' | 'rfq-detailed' | 'food-contract' | 'pr' | 'vendor-onboarding') => {
    const template = dummyTemplates[templateKey];
    setTemplateName(template.name);
    setTemplateType(template.type);
    setSections(template.sections as FormSection[]);
  };

  const addSection = () => {
    const newSection: FormSection = {
      id: Date.now().toString(),
      title: 'New Section',
      fields: [],
      collapsed: false
    };
    setSections([...sections, newSection]);
  };

  const removeSection = (sectionId: string) => {
    if (sections.length > 1) {
      setSections(sections.filter(section => section.id !== sectionId));
    }
  };

  const updateSection = (sectionId: string, updates: Partial<FormSection>) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, collapsed: !section.collapsed } : section
    ));
  };

  const addField = (sectionId: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: 'short-text',
      question: 'New Question',
      required: false,
      options: []
    };

    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, fields: [...section.fields, newField] }
        : section
    ));
  };

  const removeField = (sectionId: string, fieldId: string) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, fields: section.fields.filter(field => field.id !== fieldId) }
        : section
    ));
  };

  const updateField = (sectionId: string, fieldId: string, updates: Partial<FormField>) => {
    setSections(sections.map(section => 
      section.id === sectionId 
        ? {
            ...section,
            fields: section.fields.map(field => 
              field.id === fieldId ? { ...field, ...updates } : field
            )
          }
        : section
    ));
  };

  const addOption = (sectionId: string, fieldId: string) => {
    const field = sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId);
    if (field) {
      const newOptions = [...(field.options || []), 'New Option'];
      updateField(sectionId, fieldId, { options: newOptions });
    }
  };

  const updateOption = (sectionId: string, fieldId: string, optionIndex: number, value: string) => {
    const field = sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOptions = [...field.options];
      newOptions[optionIndex] = value;
      updateField(sectionId, fieldId, { options: newOptions });
    }
  };

  const removeOption = (sectionId: string, fieldId: string, optionIndex: number) => {
    const field = sections.find(s => s.id === sectionId)?.fields.find(f => f.id === fieldId);
    if (field && field.options) {
      const newOptions = field.options.filter((_, index) => index !== optionIndex);
      updateField(sectionId, fieldId, { options: newOptions });
    }
  };

  const handleSave = () => {
    if (templateName && templateType && sections.length > 0) {
      const templateData = {
        id: Date.now(),
        name: templateName,
        type: templateType,
        sections,
        createdAt: new Date().toISOString()
      };
      onSave(templateData);
      
      // Reset form
      setTemplateName('');
      setTemplateType('');
      setSections([{
        id: '1',
        title: 'Basic Information',
        fields: [],
        collapsed: false
      }]);
      
      onClose();
    }
  };

  const renderPreview = () => {
    return (
      <div className="space-y-6">
        <div className="text-center border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900">{templateName || 'Template Preview'}</h2>
          <p className="text-sm text-gray-600 mt-1 capitalize">{templateType.replace('-', ' ')} Template</p>
        </div>
        
        {sections.map((section) => (
          <div key={section.id} className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">
              {section.title}
            </h3>
            
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.question}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'short-text' && (
                    <input
                      type="text"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Text input field"
                    />
                  )}
                  
                  {field.type === 'long-text' && (
                    <textarea
                      disabled
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Long text area"
                    />
                  )}
                  
                  {field.type === 'numbers' && (
                    <input
                      type="number"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Number input"
                    />
                  )}
                  
                  {field.type === 'yes-no' && (
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input type="radio" disabled className="mr-2" />
                        Yes
                      </label>
                      <label className="flex items-center">
                        <input type="radio" disabled className="mr-2" />
                        No
                      </label>
                    </div>
                  )}
                  
                  {field.type === 'options' && (
                    <select disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                      <option>Select an option...</option>
                      {field.options?.map((option, index) => (
                        <option key={index}>{option}</option>
                      ))}
                    </select>
                  )}
                  
                  {field.type === 'multi-select' && (
                    <div className="space-y-2">
                      {field.options?.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input type="checkbox" disabled className="mr-2" />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                  
                  {field.type === 'other' && (
                    <input
                      type="text"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Other input field"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900">
              {showPreview ? 'Template Preview' : 'Create Template'}
            </h2>
            <div className="flex space-x-2">
              {!showPreview && (
                <>
                  <button
                    onClick={() => loadDummyTemplate('rfq-simple')}
                    className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium hover:bg-blue-200 transition-colors"
                  >
                    Simple RFQ
                  </button>
                  <button
                    onClick={() => loadDummyTemplate('rfq-detailed')}
                    className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium hover:bg-purple-200 transition-colors"
                  >
                    Detailed RFQ
                  </button>
                  <button
                    onClick={() => loadDummyTemplate('food-contract')}
                    className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium hover:bg-orange-200 transition-colors"
                  >
                    Food Contract
                  </button>
                  <button
                    onClick={() => loadDummyTemplate('pr')}
                    className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200 transition-colors"
                  >
                    PR Template
                  </button>
                  <button
                    onClick={() => loadDummyTemplate('vendor-onboarding')}
                    className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium hover:bg-yellow-200 transition-colors"
                  >
                    Vendor Onboarding
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => console.log('Upload template')}
              className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {!showPreview && (
          <>
            {/* Template Basic Info */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template Name *</label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter template name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Template Type *</label>
                  <select
                    value={templateType}
                    onChange={(e) => setTemplateType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select template type</option>
                    {templateTypes.map((type) => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {showPreview ? (
            renderPreview()
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Template Sections</h3>
                <button
                  onClick={addSection}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Section</span>
                </button>
              </div>

              {sections.map((section) => (
                <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* Section Header */}
                  <div className="bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <button
                          onClick={() => toggleSection(section.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {section.collapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                        </button>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                          className="text-lg font-semibold text-gray-900 bg-transparent border-none outline-none flex-1"
                          placeholder="Section title"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => addField(section.id)}
                          className="flex items-center space-x-1 bg-white hover:bg-gray-100 text-gray-700 px-3 py-1 rounded border text-sm font-medium transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add Field</span>
                        </button>
                        {sections.length > 1 && (
                          <button
                            onClick={() => removeSection(section.id)}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section Fields */}
                  {!section.collapsed && (
                    <div className="p-4 space-y-3">
                      {section.fields.map((field) => (
                        <div key={field.id} className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                            {/* Question */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Question *</label>
                              <input
                                type="text"
                                value={field.question}
                                onChange={(e) => updateField(section.id, field.id, { question: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter question"
                              />
                            </div>

                            {/* Field Type */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Field Type</label>
                              <select
                                value={field.type}
                                onChange={(e) => updateField(section.id, field.id, { type: e.target.value as any })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                              >
                                {fieldTypes.map((type) => (
                                  <option key={type.value} value={type.value}>{type.label}</option>
                                ))}
                              </select>
                            </div>

                            {/* Required & Actions */}
                            <div className="flex items-end justify-between">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Required</label>
                                <button
                                  onClick={() => updateField(section.id, field.id, { required: !field.required })}
                                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    field.required 
                                      ? 'bg-red-100 text-red-700 border border-red-200' 
                                      : 'bg-gray-100 text-gray-600 border border-gray-200'
                                  }`}
                                >
                                  {field.required ? 'Mandatory' : 'Optional'}
                                </button>
                              </div>
                              <button
                                onClick={() => removeField(section.id, field.id)}
                                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Options for dropdown/multi-select */}
                          {(field.type === 'options' || field.type === 'multi-select') && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                              <div className="space-y-2">
                                {field.options?.map((option, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <input
                                      type="text"
                                      value={option}
                                      onChange={(e) => updateOption(section.id, field.id, index, e.target.value)}
                                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                      placeholder={`Option ${index + 1}`}
                                    />
                                    <button
                                      onClick={() => removeOption(section.id, field.id, index)}
                                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                ))}
                                <button
                                  onClick={() => addOption(section.id, field.id)}
                                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add Option</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {section.fields.length === 0 && (
                        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                          <p className="text-sm font-medium">No fields added yet</p>
                          <button
                            onClick={() => addField(section.id)}
                            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Add your first field
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex items-center justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          {!showPreview && (
            <button
              onClick={handleSave}
              disabled={!templateName || !templateType}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Template
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTemplateModal;