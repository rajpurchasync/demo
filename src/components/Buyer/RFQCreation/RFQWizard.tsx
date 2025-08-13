import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Send, AlertCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import RFQDetailsStep from './steps/RFQDetailsStep';
import DeliveryPaymentStep from './steps/DeliveryPaymentStep';
import ProviderSelectionStep from './steps/SellerSelectionStep';
import ReviewStep from './steps/ReviewStep';
import Toast from './Toast';

interface RFQWizardProps {
  initialData?: any;
  onBack: () => void;
}

const steps = [
  { id: 1, name: 'RFQ Details', key: 'details' },
  { id: 2, name: 'Delivery & Payment', key: 'delivery' },
  { id: 3, name: 'Provider Selection', key: 'providers' },
  { id: 4, name: 'Review', key: 'review' }
];

const RFQWizard: React.FC<RFQWizardProps> = ({ initialData, onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // RFQ Type
    rfqType: initialData?.rfqType || 'product',
    
    // RFQ Details
    category: '',
    title: '',
    serviceType: '',
    scopeOfWork: '',
    notesToProviders: '',
    includeItemsList: false,
    includedItems: [{ id: '1', name: '', quantity: '', unit: '' }],
    excludedItems: [{ id: '1', name: '', quantity: '', unit: '' }],
    purchaseType: '',
    recurringFrequency: '',
    items: [{ id: '1', name: '', quantity: '', unit: '' }],
    
    // Delivery & Payment
    deliveryLocation: '',
    serviceLocationToggle: 'on-site',
    deliveryDate: '',
    paymentTerms: '',
    paymentType: '',
    
    // Provider Selection
    certificates: [],
    documents: [],
    languageRequirements: [],
    languagePreferenceEnabled: false,
    selectedProviders: [],
    manualProviders: [],
    
    // Attachments
    attachments: [],
    
    // Project specific fields
    projectCompletionDate: '',
    paymentMethod: ''
  });
  
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const updateFormData = (stepData: any) => {
    setFormData(prev => ({ ...prev, ...stepData }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (formData.rfqType === 'service') {
          return formData.title && formData.serviceType && formData.scopeOfWork && (formData.serviceType !== 'recurring' || formData.recurringFrequency);
        } else if (formData.rfqType === 'project') {
          return formData.title && formData.scopeOfWork;
        } else {
          return formData.title && formData.purchaseType && formData.items.some((item: any) => item.name && item.quantity) && (formData.purchaseType !== 'recurring' || formData.recurringFrequency);
        }
      case 2:
        if (formData.rfqType === 'service') {
          const hasLocation = formData.serviceLocationToggle === 'remote' || formData.deliveryLocation;
          return hasLocation && formData.deliveryDate && formData.paymentTerms;
        } else if (formData.rfqType === 'project') {
          const hasAdvancePayment = formData.paymentTerms !== 'Advance payment' || formData.advancePaymentBreakdown;
          return formData.deliveryLocation && formData.deliveryDate && formData.projectCompletionDate && formData.paymentTerms && hasAdvancePayment && formData.paymentMethod;
        } else {
          return formData.deliveryLocation && formData.deliveryDate && formData.paymentTerms;
        }
      case 3:
        return true; // Provider selection is optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setToast({ message: 'Please fill in all required fields', type: 'error' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAsDraft = () => {
    // Simulate saving to local storage
    localStorage.setItem('rfq_draft', JSON.stringify({ ...formData, savedAt: new Date().toISOString() }));
    setToast({ message: 'RFQ saved as Draft', type: 'success' });
  };

  const handleSubmit = () => {
    // Simulate RFQ submission
    setToast({ message: 'RFQ submitted successfully!', type: 'success' });
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RFQDetailsStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={onBack}
          />
        );
      case 2:
        return (
          <DeliveryPaymentStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <ProviderSelectionStep
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <ReviewStep
            data={formData}
            onUpdate={updateFormData}
            onPrevious={handlePrevious}
            onSaveAsDraft={handleSaveAsDraft}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ProgressBar
        steps={steps}
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={setCurrentStep}
      />
      
      <div className="pt-20 pb-8 px-4">
        {renderCurrentStep()}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default RFQWizard;