import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Calendar, MapPin, CreditCard, Edit3, Plus, AlertCircle, DollarSign } from 'lucide-react';
import AddAddressModal from '../AddAddressModal';
import CustomDropdown from '../CustomDropdown';

interface DeliveryPaymentStepProps {
  data: any;
  onUpdate: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const paymentTerms = [
  'Advance payment',
  'Payment on delivery',
  'Letter of credit',
  'Bank guarantee'
];

const advancePaymentTypes = [
  '25% Advance, 75% on completion',
  '50% Advance, 50% on completion',
  '30% Advance, 70% on completion',
  '100% Advance payment'
];

const paymentMethods = [
  'Bank Transfer',
  'Credit Card',
  'Check',
  'Cash',
  'Online Payment',
  'Wire Transfer'
];

const dummyLocations = [
  '123 Business Park, New York, NY 10001',
  '456 Industrial Ave, Los Angeles, CA 90210',
  '789 Commerce St, Chicago, IL 60601',
  '321 Trade Center, Houston, TX 77001'
];

const DeliveryPaymentStep: React.FC<DeliveryPaymentStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious
}) => {
  const [formData, setFormData] = useState({
    deliveryLocation: data.deliveryLocation || '',
    serviceLocationToggle: data.serviceLocationToggle || 'on-site',
    deliveryDate: data.deliveryDate || '',
    paymentTerms: data.paymentTerms || '',
    advancePaymentBreakdown: data.advancePaymentBreakdown || '',
    paymentMethod: data.paymentMethod || '',
  });

  const [showLocationEdit, setShowLocationEdit] = useState(false);
  const [customLocation, setCustomLocation] = useState('');
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [validationAttempted, setValidationAttempted] = useState(false);

  const isServicesRFQ = data.rfqType === 'service';
  const isProjectRFQ = data.rfqType === 'project';
  const isServiceBased = isServicesRFQ || isProjectRFQ;

  // Auto-pick first dummy location if none selected and set last used location for services
  useEffect(() => {
    if (!formData.deliveryLocation) {
      if (isServiceBased) {
        // For services, use last used location (simulate from localStorage or default to first)
        const lastUsedLocation = localStorage.getItem('lastUsedServiceLocation') || dummyLocations[0];
        handleInputChange('deliveryLocation', lastUsedLocation);
      } else {
        handleInputChange('deliveryLocation', dummyLocations[0]);
      }
    }
  }, []);

  useEffect(() => {
    onUpdate(formData);
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateDate = (dateString: string) => {
    if (!dateString) return 'Delivery date is required';
    
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (selectedDate <= today) {
      return 'Delivery date must be in the future';
    }
    
    return '';
  };

  const handleDateChange = (value: string) => {
    const error = validateDate(value);
    setErrors(prev => ({ ...prev, deliveryDate: error }));
    handleInputChange('deliveryDate', value);
  };

  const handleLocationChange = (location: string) => {
    handleInputChange('deliveryLocation', location);
    setShowLocationEdit(false);
    // Save as last used location for services
    if (isServiceBased) {
      localStorage.setItem('lastUsedServiceLocation', location);
    }
  };

  const handleNewAddressSave = (address: string) => {
    handleInputChange('deliveryLocation', address);
    setShowAddressModal(false);
    // Save as last used location for services
    if (isServiceBased) {
      localStorage.setItem('lastUsedServiceLocation', address);
    }
  };

  const handleCustomLocationSave = () => {
    if (customLocation.trim()) {
      handleInputChange('deliveryLocation', customLocation.trim());
      setCustomLocation('');
      setShowLocationEdit(false);
      // Save as last used location for services
      if (isServiceBased) {
        localStorage.setItem('lastUsedServiceLocation', customLocation.trim());
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    // Location validation
    if (isServicesRFQ && formData.serviceLocationToggle === 'on-site' && !formData.deliveryLocation) {
      newErrors.deliveryLocation = 'Location is required for on-site services';
    } else if (isProjectRFQ && !formData.deliveryLocation) {
      newErrors.deliveryLocation = 'Project location is required';
    } else if (!isServiceBased && !isProjectRFQ && !formData.deliveryLocation) {
      newErrors.deliveryLocation = 'Delivery location is required';
    }
    
    // Date validation
    if (!formData.deliveryDate) {
      newErrors.deliveryDate = 'Date is required';
    } else {
      const dateError = validateDate(formData.deliveryDate);
      if (dateError) {
        newErrors.deliveryDate = dateError;
      }
    }
    
    // Project completion date validation for projects
    if (isProjectRFQ && !formData.projectCompletionDate) {
      newErrors.projectCompletionDate = 'Project completion date is required';
    }
    
    // Payment terms validation
    if (!formData.paymentTerms) {
      newErrors.paymentTerms = 'Payment terms are required';
    }
    
    // Advance payment breakdown validation for projects
    if (isProjectRFQ && formData.paymentTerms === 'Advance payment' && !formData.advancePaymentBreakdown) {
      newErrors.advancePaymentBreakdown = 'Advance terms type is required';
    }
    
    // Payment method validation for projects
    if (isProjectRFQ && !formData.paymentMethod) {
      newErrors.paymentMethod = 'Payment method is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    setValidationAttempted(true);
    if (validateForm()) {
      onNext();
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Delivery & Payment</h2>
          <p className="text-gray-600">Specify delivery requirements and payment terms</p>
        </div>

        <div className="space-y-6">
          {/* Service Location with Toggle - Services and Projects */}
          {isServicesRFQ ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Service Location *</span>
                </div>
              </label>
              
              {/* On-site / Remote Toggle */}
              <div className="flex items-center space-x-6 mb-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="serviceLocationToggle"
                    value="on-site"
                    checked={formData.serviceLocationToggle === 'on-site'}
                    onChange={(e) => handleInputChange('serviceLocationToggle', e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">On-site</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="serviceLocationToggle"
                    value="remote"
                    checked={formData.serviceLocationToggle === 'remote'}
                    onChange={(e) => handleInputChange('serviceLocationToggle', e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Remote</span>
                </label>
              </div>

              {/* Location Field - Only for On-site */}
              {formData.serviceLocationToggle === 'on-site' && (
                <div>
                  {!showLocationEdit ? (
                    <>
                      <div className={`flex items-center justify-between p-4 border rounded-xl bg-gray-50 ${
                        validationAttempted && errors.deliveryLocation ? 'border-red-500' : 'border-gray-300'
                      }`}>
                        <span className="text-gray-900">{formData.deliveryLocation}</span>
                        <button
                          type="button"
                          onClick={() => setShowLocationEdit(true)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Change</span>
                        </button>
                      </div>
                      {validationAttempted && errors.deliveryLocation && (
                        <div className="flex items-center space-x-2 mt-1">
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-500">{errors.deliveryLocation}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Select from saved locations:</p>
                        {dummyLocations.map((location, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleLocationChange(location)}
                            className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                      
                      <div className="border-t pt-3">
                        <p className="text-sm text-gray-600 mb-2">Or add new location:</p>
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => setShowAddressModal(true)}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add New Address</span>
                          </button>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={customLocation}
                              onChange={(e) => setCustomLocation(e.target.value)}
                              placeholder="Or type address manually"
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <button
                              type="button"
                              onClick={handleCustomLocationSave}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Save
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => setCustomLocation('')}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setShowLocationEdit(false)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : isProjectRFQ ? (
            /* Project Location for Projects */
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Project Location *</span>
                </div>
              </label>
              
              {!showLocationEdit ? (
                <>
                  <div className={`flex items-center justify-between p-4 border rounded-xl bg-gray-50 ${
                    validationAttempted && errors.deliveryLocation ? 'border-red-500' : 'border-gray-300'
                  }`}>
                    <span className="text-gray-900">{formData.deliveryLocation}</span>
                    <button
                      type="button"
                      onClick={() => setShowLocationEdit(true)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Change</span>
                    </button>
                  </div>
                  {validationAttempted && errors.deliveryLocation && (
                    <div className="flex items-center space-x-2 mt-1">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-500">{errors.deliveryLocation}</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Select from saved locations:</p>
                    {dummyLocations.map((location, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleLocationChange(location)}
                        className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        {location}
                      </button>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-sm text-gray-600 mb-2">Or add new location:</p>
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowAddressModal(true)}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Address</span>
                      </button>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={customLocation}
                          onChange={(e) => setCustomLocation(e.target.value)}
                          placeholder="Or type address manually"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          type="button"
                          onClick={handleCustomLocationSave}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Save
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setCustomLocation('')}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => setShowLocationEdit(false)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Delivery Location for Products */
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Delivery Location *</span>
              </div>
            </label>
            
            {!showLocationEdit ? (
              <>
                <div className={`flex items-center justify-between p-4 border rounded-xl bg-gray-50 ${
                  validationAttempted && errors.deliveryLocation ? 'border-red-500' : 'border-gray-300'
                }`}>
                  <span className="text-gray-900">{formData.deliveryLocation}</span>
                  <button
                    type="button"
                    onClick={() => setShowLocationEdit(true)}
                    className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Change</span>
                  </button>
                </div>
                {validationAttempted && errors.deliveryLocation && (
                  <div className="flex items-center space-x-2 mt-1">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-red-500">{errors.deliveryLocation}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">Select from saved locations:</p>
                  {dummyLocations.map((location, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleLocationChange(location)}
                      className="w-full text-left p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      {location}
                    </button>
                  ))}
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600 mb-2">Or add new location:</p>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setShowAddressModal(true)}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={customLocation}
                        onChange={(e) => setCustomLocation(e.target.value)}
                        placeholder="Or type address manually"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={handleCustomLocationSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => setCustomLocation('')}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => setShowLocationEdit(false)}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            )}
            </div>
          )}

          {/* Project Start Date for Projects */}
          {isProjectRFQ && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Project Start Date *</span>
                  </div>
                </label>
                {formData.deliveryDate && (
                  <button
                    onClick={() => handleInputChange('deliveryDate', '')}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                type="date"
                value={formData.deliveryDate}
                onChange={(e) => handleDateChange(e.target.value)}
                min={minDate}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationAttempted && errors.deliveryDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {validationAttempted && errors.deliveryDate && (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">{errors.deliveryDate}</span>
                </div>
              )}
            </div>
          )}

          {/* Project Completion Date for Projects */}
          {isProjectRFQ && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Project Completion (Estimation) *</span>
                  </div>
                </label>
                {formData.projectCompletionDate && (
                  <button
                    onClick={() => handleInputChange('projectCompletionDate', '')}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                type="date"
                value={formData.projectCompletionDate || ''}
                onChange={(e) => handleInputChange('projectCompletionDate', e.target.value)}
                min={formData.deliveryDate || minDate}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  validationAttempted && !formData.projectCompletionDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
                }`}
              />
              {validationAttempted && !formData.projectCompletionDate && (
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Project completion date is required</span>
                </div>
              )}
            </div>
          )}

          {/* Service/Delivery Date for Services and Products */}
          {!isProjectRFQ && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-semibold text-gray-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {isServicesRFQ 
                      ? (data.serviceType === 'one-time' 
                          ? 'Service Completion Date *'
                          : 'Service Start Date *')
                      : 'Required Delivery Date *'
                    }
                  </span>
                </div>
              </label>
              {formData.deliveryDate && (
                <button
                  onClick={() => handleInputChange('deliveryDate', '')}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear
                </button>
              )}
            </div>
            <input
              type="date"
              value={formData.deliveryDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={minDate}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                validationAttempted && errors.deliveryDate ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
            />
            {validationAttempted && errors.deliveryDate && (
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500">{errors.deliveryDate}</span>
              </div>
            )}
          </div>
          )}

          {/* Payment Terms */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Preferred Payment Terms *</span>
              </div>
            </label>
            <CustomDropdown
              options={paymentTerms.map(term => ({ value: term, label: term }))}
              value={formData.paymentTerms}
              onChange={(value) => handleInputChange('paymentTerms', value)}
              placeholder="Select preferred payment terms"
              error={validationAttempted && !formData.paymentTerms}
            />
            {validationAttempted && !formData.paymentTerms && (
              <div className="flex items-center space-x-1 mt-1">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-500">Preferred payment terms are required</span>
              </div>
            )}
          </div>

          {/* Advance Payment Type - Only for Projects when Advance payment is selected */}
          {isProjectRFQ && formData.paymentTerms === 'Advance payment' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Advance Terms Type *</span>
                </div>
              </label>
              <CustomDropdown
                options={advancePaymentTypes.map(type => ({ value: type, label: type }))}
                value={formData.advancePaymentBreakdown}
                onChange={(value) => handleInputChange('advancePaymentBreakdown', value)}
                placeholder="Select advance payment terms"
                error={validationAttempted && !formData.advancePaymentBreakdown}
              />
              {validationAttempted && !formData.advancePaymentBreakdown && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Advance terms type is required</span>
                </div>
              )}
            </div>
          )}

          {/* Payment Method - Only for Projects */}
          {isProjectRFQ && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Payment Method *</span>
                </div>
              </label>
              <CustomDropdown
                options={paymentMethods.map(method => ({ value: method, label: method }))}
                value={formData.paymentMethod}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                placeholder="Select payment method"
                error={validationAttempted && !formData.paymentMethod}
              />
              {validationAttempted && !formData.paymentMethod && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-500">Payment method is required</span>
                </div>
              )}
            </div>
          )}

          {/* Additional Notes - Products Only */}
          {!isServiceBased && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Delivery Instructions</h3>
              <textarea
                placeholder="Any special delivery instructions, loading dock requirements, contact person, etc."
                rows={3}
                className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white"
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={onPrevious}
            className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <AddAddressModal
          onClose={() => setShowAddressModal(false)}
          onSave={handleNewAddressSave}
        />
      )}
    </div>
  );
};

export default DeliveryPaymentStep;