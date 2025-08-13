import React, { useState } from 'react';
import { ArrowLeft, Save, Send, Eye, Download, FileText, Image, FileSpreadsheet, Paperclip, Package, Hash, X, CheckCircle } from 'lucide-react';
import AttachmentPreviewModal from '../AttachmentPreviewModal';

interface ReviewStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onPrevious: () => void;
  onSaveAsDraft: () => void;
  onSubmit: () => void;
}

const mockAttachments = [
  { id: '1', name: 'Technical_Specifications.pdf', type: 'pdf', size: '2.4 MB' },
  { id: '2', name: 'Requirements_Sheet.xlsx', type: 'excel', size: '1.2 MB' }
];

const ReviewStep: React.FC<ReviewStepProps> = ({
  data,
  onPrevious,
  onSaveAsDraft,
  onSubmit
}) => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<any>(null);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePreviewAttachment = (attachment: any) => {
    setSelectedAttachment(attachment);
    setShowPreviewModal(true);
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-blue-500" />;
      default:
        return <Paperclip className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleSubmit = () => {
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      onSubmit();
    }, 2000);
  };

  const getProviderNames = () => {
    const dummyProviders = [
      { id: '1', name: 'Global Supply Co.' },
      { id: '2', name: 'Premium Materials Ltd.' },
      { id: '3', name: 'Tech Solutions Inc.' },
      { id: '4', name: 'Industrial Partners' }
    ];
    
    return data.selectedProviders?.map((providerId: string) => {
      const provider = dummyProviders.find(p => p.id === providerId);
      return provider ? provider.name : `Provider ${providerId}`;
    }) || [];
  };

  const isProjectRFQ = data.rfqType === 'project';
  const isServiceBased = data.rfqType === 'service' || data.rfqType === 'project';

  const sections = [
    {
      title: isProjectRFQ ? 'Project Details' : (data.rfqType === 'service' ? 'Service Details' : 'RFQ Details'),
      items: [
        { label: 'Title', value: data.title },
        ...(isServiceBased ? [
          { label: isProjectRFQ ? 'Project Type' : 'Service Type', value: data.serviceType === 'one-time' ? (isProjectRFQ ? 'One-time Project' : 'One-time Service') : data.serviceType === 'recurring' ? 'Recurring' : data.serviceType === 'contractual' ? 'Contractual' : data.serviceType },
          ...(data.serviceType === 'recurring' ? [{ label: 'Frequency', value: data.recurringFrequency?.charAt(0).toUpperCase() + data.recurringFrequency?.slice(1) }] : []),
          { label: isProjectRFQ ? 'Project Scope' : 'Scope of Work', value: data.scopeOfWork || 'Not specified' },
          { label: isProjectRFQ ? 'Project Notes' : 'Notes to Providers', value: data.notesToProviders || 'Not specified' },
        ] : [
          { label: 'Purchase Type', value: data.purchaseType === 'one-time' ? 'One-time Purchase' : data.purchaseType === 'recurring' ? 'Recurring' : data.purchaseType === 'contractual' ? 'Contractual' : data.purchaseType },
          ...(data.purchaseType === 'recurring' ? [{ label: 'Frequency', value: data.recurringFrequency?.charAt(0).toUpperCase() + data.recurringFrequency?.slice(1) }] : []),
        ]),
      ]
    },
    {
      title: 'Delivery & Payment',
      items: [
        ...(isServiceBased ? [
          { label: isProjectRFQ ? 'Project Location' : 'Service Location', value: data.serviceLocationToggle === 'remote' ? (isProjectRFQ ? 'Remote Management' : 'Remote') : data.deliveryLocation },
        ] : [
          { label: 'Delivery Location', value: data.deliveryLocation },
        ]),
        { label: isServiceBased ? (isProjectRFQ ? 'Project Date' : 'Service Date') : 'Required Date', value: new Date(data.deliveryDate).toLocaleDateString() },
        { label: 'Payment Terms', value: data.paymentTerms },
        ...(data.paymentTerms === 'Advance payment' ? [{ label: 'Payment Type', value: data.paymentType }] : []),
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your RFQ</h2>
          <p className="text-gray-600">Please review all details before submitting</p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">{item.label}</dt>
                    <dd className="text-sm text-gray-900">{item.value}</dd>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Items Required - Excel Format */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {isServiceBased ? (isProjectRFQ ? 'Project Components' : 'Services Required') : 'Items Required'}
            </h3>
            {data.items?.filter((item: any) => item.name.trim()).length > 0 ? (
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 border-b border-gray-200">
                  <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-1 p-3 text-center border-r border-gray-200">
                      <Hash className="w-4 h-4 text-gray-500 mx-auto" />
                    </div>
                    <div className="col-span-7 p-3 border-r border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-700">{isServiceBased ? (isProjectRFQ ? 'Component Name' : 'Service Name') : 'Item Name'}</span>
                      </div>
                    </div>
                    <div className="col-span-2 p-3 border-r border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Hash className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-700">Quantity</span>
                      </div>
                    </div>
                    <div className="col-span-2 p-3">
                      <div className="flex items-center space-x-2">
                        <Package className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-700">Unit</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List */}
                <div className="max-h-64 overflow-y-auto">
                  {data.items
                    ?.filter((item: any) => item.name.trim())
                    .map((item: any, index: number) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-0 border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
                      >
                        {/* Row Number */}
                        <div className="col-span-1 p-3 text-center bg-gray-50 border-r border-gray-200">
                          <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                        </div>

                        {/* Item Name */}
                        <div className="col-span-7 p-3 border-r border-gray-200">
                          <span className="text-sm font-medium text-gray-900">{item.name}</span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 p-3 border-r border-gray-200">
                          <span className="text-sm text-gray-700">{item.quantity}</span>
                        </div>

                        {/* Unit */}
                        <div className="col-span-2 p-3">
                          <span className="text-sm text-gray-700">{item.unit}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">{isServiceBased ? (isProjectRFQ ? 'No components specified' : 'No services specified') : 'No items specified'}</p>
            )}
          </div>

          {/* Provider Selection */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Provider Selection</h3>
            <div className="space-y-4">
              {/* Selected Providers */}
              {getProviderNames().length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Selected Providers</h4>
                  <div className="space-y-2">
                    {getProviderNames().map((providerName: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="text-sm font-medium text-blue-900">{providerName}</span>
                        <button
                          onClick={() => {
                            // Remove provider logic would go here
                          }}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                          title="Remove provider"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Manual Providers */}
              {data.manualProviders?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Manual Providers</h4>
                  <div className="space-y-2">
                    {data.manualProviders.map((provider: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <span className="text-sm font-medium text-amber-900">{provider.name}</span>
                        <button
                          onClick={() => {
                            // Remove provider logic would go here
                          }}
                          className="p-1 text-amber-600 hover:bg-amber-100 rounded-full transition-colors"
                          title="Remove provider"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Language Requirements */}
              {data.languageRequirements?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Language Requirements</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.languageRequirements.map((language: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Certificates */}
              {data.certificates?.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Certificates</h4>
                  <div className="space-y-2">
                    {data.certificates.map((cert: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">{cert.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            cert.mandatory 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {cert.mandatory ? 'Mandatory' : 'Preferred'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Attachments Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h3>
            {(data.attachments?.length > 0 || mockAttachments.length > 0) ? (
              <div className="grid gap-3 md:grid-cols-2">
                {[...(data.attachments || []), ...mockAttachments].map((attachment) => (
                  <div
                    key={attachment.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon(attachment.type)}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePreviewAttachment(attachment)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No attachments added</p>
            )}
          </div>

          {/* Save as Template */}
          <div className="bg-blue-50 rounded-xl p-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={saveAsTemplate}
                onChange={(e) => setSaveAsTemplate(e.target.checked)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
              />
              <div>
                <span className="font-semibold text-blue-900">Save as Template</span>
                <p className="text-sm text-blue-700 mt-1">
                  Save this RFQ structure as a reusable template for future use
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
          <button
            onClick={onPrevious}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onSaveAsDraft}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200"
            >
              <Save className="w-4 h-4" />
              <span>Save as Draft</span>
            </button>

            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Send className="w-4 h-4" />
              <span>Submit RFQ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
          <div className="relative bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
            <p className="text-gray-600">RFQ submitted successfully</p>
          </div>
        </div>
      )}

      {showPreviewModal && selectedAttachment && (
        <AttachmentPreviewModal
          attachment={selectedAttachment}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
};

export default ReviewStep;