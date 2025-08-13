import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2, Plus, X, Upload, Camera, Square, RectangleHorizontal, Crop } from 'lucide-react';

interface OnlineStoreSetupProps {
  onComplete: (data: any) => void;
  companyData: any;
  onSaveDraft?: (data: any) => void;
}

const OnlineStoreSetup: React.FC<OnlineStoreSetupProps> = ({ onComplete, companyData, onSaveDraft }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // Step 1: Key Information
  const [keyInfo, setKeyInfo] = useState({
    about: '',
    expertise: '',
    numberOfEmployees: '',
    annualRevenue: '',
    companyTags: [] as string[]
  });
  const [newTag, setNewTag] = useState('');

  // Step 2: Documents
  const [documents, setDocuments] = useState({
    permits: [] as Array<{name: string, file?: File}>,
    certificates: [] as Array<{name: string, file?: File}>,
    inspections: [] as Array<{name: string, file?: File}>
  });

  // Step 3: Media
  const [media, setMedia] = useState({
    logo: null as File | null,
    logoShape: 'square' as 'square' | 'rectangular',
    logoCropped: null as File | null,
    banner: null as File | null,
    bannerCropped: null as File | null,
    otherImages: [] as File[]
  });
  
  const [showLogoCropper, setShowLogoCropper] = useState(false);
  const [showBannerCropper, setShowBannerCropper] = useState(false);
  const [tempLogoFile, setTempLogoFile] = useState<File | null>(null);
  const [tempBannerFile, setTempBannerFile] = useState<File | null>(null);
  const [logoCropArea, setLogoCropArea] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [bannerCropArea, setBannerCropArea] = useState({ x: 0, y: 0, width: 100, height: 20 });
  const [logoImageDimensions, setLogoImageDimensions] = useState({ width: 0, height: 0 });
  const [bannerImageDimensions, setBannerImageDimensions] = useState({ width: 0, height: 0 });
  const [logoImageRef, setLogoImageRef] = useState<HTMLImageElement | null>(null);

  // Step 4: Social Media
  const [socialMedia, setSocialMedia] = useState({
    website: '',
    linkedin: '',
    facebook: '',
    instagram: ''
  });

  // Step 5: Clients
  const [clients, setClients] = useState([
    { name: '', location: '', testimonial: '', image: null as File | null }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const employeeRanges = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '500+ employees'
  ];

  const revenueRanges = [
    'Under $100K',
    '$100K - $500K',
    '$500K - $1M',
    '$1M - $5M',
    '$5M - $10M',
    '$10M+'
  ];

  const steps = [
    { number: 1, title: 'Key Information', description: 'Company details and expertise' },
    { number: 2, title: 'Documents', description: 'Licenses, certificates, and permits' },
    { number: 3, title: 'Media', description: 'Logo, banner, and images' },
    { number: 4, title: 'Social Media', description: 'Website and social links' },
    { number: 5, title: 'Clients', description: 'Testimonials and references' }
  ];

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!keyInfo.about.trim() || keyInfo.about.length < 100) {
        newErrors.about = 'About section must be at least 100 characters';
      }
      if (!keyInfo.expertise.trim()) newErrors.expertise = 'Expertise is required';
      if (!keyInfo.numberOfEmployees) newErrors.numberOfEmployees = 'Number of employees is required';
      if (!keyInfo.annualRevenue) newErrors.annualRevenue = 'Annual revenue is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onComplete({
        keyInfo,
        documents,
        media,
        socialMedia,
        clients: clients.filter(client => client.name.trim() !== '')
      });
    }, 2000);
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft({
        currentStep,
        keyInfo,
        documents,
        media,
        socialMedia,
        clients: clients.filter(client => client.name.trim() !== '')
      });
    }
  };

  // Helper functions
  const addTag = () => {
    if (newTag.trim() && !keyInfo.companyTags.includes(newTag.trim())) {
      setKeyInfo({
        ...keyInfo,
        companyTags: [...keyInfo.companyTags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (index: number) => {
    setKeyInfo({
      ...keyInfo,
      companyTags: keyInfo.companyTags.filter((_, i) => i !== index)
    });
  };

  const addDocument = (type: 'permits' | 'certificates' | 'inspections', name: string) => {
    if (name.trim()) {
      setDocuments({
        ...documents,
        [type]: [...documents[type], { name: name.trim() }]
      });
    }
  };

  const removeDocument = (type: 'permits' | 'certificates' | 'inspections', index: number) => {
    setDocuments({
      ...documents,
      [type]: documents[type].filter((_, i) => i !== index)
    });
  };

  const handleFileUpload = (type: 'permits' | 'certificates' | 'inspections', index: number, file: File) => {
    const updatedDocs = [...documents[type]];
    updatedDocs[index] = { ...updatedDocs[index], file };
    setDocuments({
      ...documents,
      [type]: updatedDocs
    });
  };

  const addClient = () => {
    if (clients.length < 3) {
      setClients([...clients, { name: '', location: '', testimonial: '', image: null }]);
    }
  };

  const removeClient = (index: number) => {
    if (clients.length > 1) {
      setClients(clients.filter((_, i) => i !== index));
    }
  };

  const updateClient = (index: number, field: string, value: string | File) => {
    const updatedClients = clients.map((client, i) =>
      i === index ? { ...client, [field]: value } : client
    );
    setClients(updatedClients);
  };

  // Image cropping functions
  const handleLogoUpload = (file: File) => {
    setTempLogoFile(file);
    const img = new Image();
    img.onload = () => {
      setLogoImageDimensions({ width: img.width, height: img.height });
      setLogoImageRef(img);
      const aspectRatio = media.logoShape === 'square' ? 1 : 16/9;
      let { width, height } = img;
      
      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
      
      setLogoCropArea({
        x: (img.width - width) / 2,
        y: (img.height - height) / 2,
        width,
        height
      });
    };
    img.src = URL.createObjectURL(file);
    setShowLogoCropper(true);
  };

  const handleBannerUpload = (file: File) => {
    setTempBannerFile(file);
    const img = new Image();
    img.onload = () => {
      setBannerImageDimensions({ width: img.width, height: img.height });
      const aspectRatio = 5; // 5:1 ratio
      let { width, height } = img;
      
      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
      
      setBannerCropArea({
        x: (img.width - width) / 2,
        y: (img.height - height) / 2,
        width,
        height
      });
    };
    img.src = URL.createObjectURL(file);
    setShowBannerCropper(true);
  };

  const cropImageWithArea = (file: File, imageDimensions: { width: number, height: number }, cropArea: { x: number, y: number, width: number, height: number }): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
        
        // Draw cropped image
        const sourceX = cropArea.x;
        const sourceY = cropArea.y;
        const sourceWidth = cropArea.width;
        const sourceHeight = cropArea.height;
        
        ctx?.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, cropArea.width, cropArea.height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File([blob], file.name, { type: file.type });
            resolve(croppedFile);
          }
        }, file.type, 0.9);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleLogoCrop = async () => {
    if (tempLogoFile && logoImageDimensions.width > 0) {
      const croppedFile = await cropImageWithArea(tempLogoFile, logoImageDimensions, logoCropArea);
      
      setMedia({ 
        ...media, 
        logo: tempLogoFile,
        logoCropped: croppedFile 
      });
      setShowLogoCropper(false);
      setTempLogoFile(null);
      setLogoImageDimensions({ width: 0, height: 0 });
    }
  };

  const handleBannerCrop = async () => {
    if (tempBannerFile && bannerImageDimensions.width > 0) {
      const croppedFile = await cropImageWithArea(tempBannerFile, bannerImageDimensions, bannerCropArea);
      
      setMedia({ 
        ...media, 
        banner: tempBannerFile,
        bannerCropped: croppedFile 
      });
      setShowBannerCropper(false);
      setTempBannerFile(null);
      setBannerImageDimensions({ width: 0, height: 0 });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Company <span className="text-red-500">*</span>
              </label>
              <textarea
                value={keyInfo.about}
                onChange={(e) => setKeyInfo({ ...keyInfo, about: e.target.value })}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.about ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Tell us about your company, its history, mission, and what makes you unique... (minimum 100 characters)"
              />
              <div className="flex justify-between items-center mt-1">
                {errors.about && <p className="text-red-500 text-sm">{errors.about}</p>}
                <p className="text-sm text-gray-500 ml-auto">{keyInfo.about.length}/100 characters</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expertise / Specialties <span className="text-red-500">*</span>
              </label>
              <textarea
                value={keyInfo.expertise}
                onChange={(e) => setKeyInfo({ ...keyInfo, expertise: e.target.value })}
                rows={3}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.expertise ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your areas of expertise, specialties, and core competencies..."
              />
              {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees <span className="text-red-500">*</span>
                </label>
                <select
                  value={keyInfo.numberOfEmployees}
                  onChange={(e) => setKeyInfo({ ...keyInfo, numberOfEmployees: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.numberOfEmployees ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select range</option>
                  {employeeRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.numberOfEmployees && <p className="text-red-500 text-sm mt-1">{errors.numberOfEmployees}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue <span className="text-red-500">*</span>
                </label>
                <select
                  value={keyInfo.annualRevenue}
                  onChange={(e) => setKeyInfo({ ...keyInfo, annualRevenue: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.annualRevenue ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select range</option>
                  {revenueRanges.map((range) => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                {errors.annualRevenue && <p className="text-red-500 text-sm mt-1">{errors.annualRevenue}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Tags</label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add a tag (e.g., Sustainable, Premium, Local)"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {keyInfo.companyTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            {(['permits', 'certificates', 'inspections'] as const).map((type) => (
              <div key={type}>
                <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                  {type === 'permits' ? 'Permits (License, VAT)' : 
                   type === 'certificates' ? 'Certificates (HACCP, ISO)' : 
                   'Inspections'}
                </h3>
                
                <div className="space-y-3">
                  {documents[type].map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                        {doc.file && (
                          <p className="text-xs text-green-600 mt-1">✓ File uploaded: {doc.file.name}</p>
                        )}
                      </div>
                      
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files?.[0] && handleFileUpload(type, index, e.target.files[0])}
                        className="hidden"
                        id={`${type}-${index}`}
                      />
                      <label
                        htmlFor={`${type}-${index}`}
                        className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 cursor-pointer"
                      >
                        {doc.file ? 'Change' : 'Upload'}
                      </label>
                      
                      <button
                        type="button"
                        onClick={() => removeDocument(type, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => {
                      const name = prompt(`Enter ${type.slice(0, -1)} name:`);
                      if (name) addDocument(type, name);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Add {type.slice(0, -1)}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Logo Shape Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Logo Shape</label>
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setMedia({ ...media, logoShape: 'square', logo: null, logoCropped: null })}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    media.logoShape === 'square'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Square className="w-5 h-5" />
                  <span>Square (1:1)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMedia({ ...media, logoShape: 'rectangular', logo: null, logoCropped: null })}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
                    media.logoShape === 'rectangular'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <RectangleHorizontal className="w-5 h-5" />
                  <span>Rectangular (16:9)</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Company Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                {media.logoCropped ? (
                  <div className="space-y-3">
                    <img
                      src={URL.createObjectURL(media.logoCropped)}
                      alt="Logo preview"
                      className={`object-contain mx-auto ${
                        media.logoShape === 'square' ? 'w-24 h-24' : 'w-32 h-18'
                      }`}
                    />
                    <p className="text-sm text-green-600">✓ Logo cropped and ready</p>
                    <button
                      type="button"
                      onClick={() => setMedia({ ...media, logo: null, logoCropped: null })}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your company logo</p>
                    <p className="text-sm text-gray-500 mb-4">PNG, JPG (Max 5MB) - Will be cropped to {media.logoShape} format</p>
                  </>
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => e.target.files?.[0] && handleLogoUpload(e.target.files[0])}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer transition-colors duration-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {media.logoCropped ? 'Change Logo' : 'Upload Logo'}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Company Banner</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                {media.bannerCropped ? (
                  <div className="space-y-3">
                    <img
                      src={URL.createObjectURL(media.bannerCropped)}
                      alt="Banner preview"
                      className="w-full h-32 object-cover rounded-lg mx-auto"
                    />
                    <p className="text-sm text-green-600">✓ Banner cropped and ready (5:1 ratio)</p>
                    <button
                      type="button"
                      onClick={() => setMedia({ ...media, banner: null, bannerCropped: null })}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Upload your company banner</p>
                    <p className="text-sm text-gray-500 mb-4">PNG, JPG (Max 5MB) - Will be cropped to 5:1 ratio</p>
                  </>
                )}
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => e.target.files?.[0] && handleBannerUpload(e.target.files[0])}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 cursor-pointer transition-colors duration-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {media.bannerCropped ? 'Change Banner' : 'Upload Banner'}
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Other Images</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload additional company images</p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG (Max 5MB each)</p>
                <input
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => e.target.files && setMedia({ ...media, otherImages: [...media.otherImages, ...Array.from(e.target.files)] })}
                  className="hidden"
                  id="other-images-upload"
                />
                <label
                  htmlFor="other-images-upload"
                  className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer transition-colors duration-200"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Images
                </label>
              </div>
              
              {media.otherImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {media.otherImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Image ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setMedia({ ...media, otherImages: media.otherImages.filter((_, i) => i !== index) })}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(socialMedia).map(([platform, url]) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setSocialMedia({ ...socialMedia, [platform]: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={`https://${platform === 'website' ? 'www.yourcompany.com' : `${platform}.com/yourcompany`}`}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Client Testimonials (Optional)</h3>
              {clients.length < 3 && (
                <button
                  type="button"
                  onClick={addClient}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Client
                </button>
              )}
            </div>
            
            <div className="space-y-6">
              {clients.map((client, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-medium text-gray-700">Client {index + 1}</h4>
                    {clients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeClient(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      value={client.name}
                      onChange={(e) => updateClient(index, 'name', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Client name"
                    />
                    <input
                      type="text"
                      value={client.location}
                      onChange={(e) => updateClient(index, 'location', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Location"
                    />
                  </div>
                  
                  <textarea
                    value={client.testimonial}
                    onChange={(e) => updateClient(index, 'testimonial', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                    placeholder="Client testimonial..."
                  />
                  
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Client Image (Optional)</label>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => e.target.files?.[0] && updateClient(index, 'image', e.target.files[0])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {client.image && (
                      <p className="text-xs text-green-600 mt-1">✓ Image uploaded: {client.image.name}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Cropping Modals
  const LogoCropperModal = () => {
    if (!showLogoCropper || !tempLogoFile || !logoImageRef) return null;

    const maxCropWidth = media.logoShape === 'square' 
      ? Math.min(logoImageDimensions.width, logoImageDimensions.height)
      : logoImageDimensions.width;
    const maxCropHeight = media.logoShape === 'square' 
      ? Math.min(logoImageDimensions.width, logoImageDimensions.height)
      : logoImageDimensions.width / (16/9);
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Crop Logo</h3>
          
          <div className="mb-6 relative">
            <img
              src={URL.createObjectURL(tempLogoFile)}
              alt="Logo to crop"
              className="w-full max-h-64 object-contain border border-gray-300 rounded"
            />
            
            {/* Crop overlay */}
            <div 
              className="absolute border-2 border-blue-500 bg-blue-200 bg-opacity-30"
              style={{
                left: `${(logoCropArea.x / logoImageDimensions.width) * 100}%`,
                top: `${(logoCropArea.y / logoImageDimensions.height) * 100}%`,
                width: `${(logoCropArea.width / logoImageDimensions.width) * 100}%`,
                height: `${(logoCropArea.height / logoImageDimensions.height) * 100}%`,
              }}
            />
          </div>
          
          <div className="mb-6 relative">
            <div className="relative inline-block">
              <img
                src={URL.createObjectURL(tempLogoFile)}
                alt="Logo to crop"
                className="max-w-full max-h-96 object-contain"
              />
              <div
                className="absolute border-2 border-blue-500 bg-blue-500 bg-opacity-20"
                style={{
                  left: `${(logoCropArea.x / logoImageRef.width) * 100}%`,
                  top: `${(logoCropArea.y / logoImageRef.height) * 100}%`,
                  width: `${(logoCropArea.width / logoImageRef.width) * 100}%`,
                  height: `${(logoCropArea.height / logoImageRef.height) * 100}%`,
                }}
              >
                <div className="absolute inset-0 border border-white border-dashed"></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Blue area shows the crop selection. Will be cropped to {media.logoShape === 'square' ? '1:1 (Square)' : '16:9 (Rectangular)'} ratio
            </p>
          </div>
          
          <div className="mb-4 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Adjust Crop Position:</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600">X Position</label>
                <input
                  type="range"
                  min="0"
                  max={logoImageRef.width - logoCropArea.width}
                  value={logoCropArea.x}
                  onChange={(e) => setLogoCropArea({ ...logoCropArea, x: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600">Y Position</label>
                <input
                  type="range"
                  min="0"
                  max={logoImageRef.height - logoCropArea.height}
                  value={logoCropArea.y}
                  onChange={(e) => setLogoCropArea({ ...logoCropArea, y: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
          
          
          {/* Crop controls */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X Position</label>
              <input
                type="range"
                min="0"
                max={logoImageDimensions.width - logoCropArea.width}
                value={logoCropArea.x}
                onChange={(e) => setLogoCropArea({ ...logoCropArea, x: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Y Position</label>
              <input
                type="range"
                min="0"
                max={logoImageDimensions.height - logoCropArea.height}
                value={logoCropArea.y}
                onChange={(e) => setLogoCropArea({ ...logoCropArea, y: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <input
                type="range"
                min="50"
                max={maxCropWidth}
                value={logoCropArea.width}
                onChange={(e) => {
                  const newWidth = parseInt(e.target.value);
                  const newHeight = media.logoShape === 'square' ? newWidth : newWidth / (16/9);
                  setLogoCropArea({ 
                    ...logoCropArea, 
                    width: newWidth, 
                    height: newHeight,
                    x: Math.min(logoCropArea.x, logoImageDimensions.width - newWidth),
                    y: Math.min(logoCropArea.y, logoImageDimensions.height - newHeight)
                  });
                }}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowLogoCropper(false);
                setTempLogoFile(null);
                setLogoImageRef(null);
                setLogoImageDimensions({ width: 0, height: 0 });
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleLogoCrop}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center space-x-2"
            >
              <Crop className="w-4 h-4" />
              <span>Crop Logo</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const BannerCropperModal = () => {
    if (!showBannerCropper || !tempBannerFile) return null;

    const maxCropWidth = bannerImageDimensions.width;
    const maxCropHeight = bannerImageDimensions.width / 5; // 5:1 ratio
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Crop Banner</h3>
          
          <div className="mb-6 relative">
            <img
              src={URL.createObjectURL(tempBannerFile)}
              alt="Banner to crop"
              className="w-full max-h-64 object-contain border border-gray-300 rounded"
            />
            
            {/* Crop overlay */}
            <div 
              className="absolute border-2 border-purple-500 bg-purple-200 bg-opacity-30"
              style={{
                left: `${(bannerCropArea.x / bannerImageDimensions.width) * 100}%`,
                top: `${(bannerCropArea.y / bannerImageDimensions.height) * 100}%`,
                width: `${(bannerCropArea.width / bannerImageDimensions.width) * 100}%`,
                height: `${(bannerCropArea.height / bannerImageDimensions.height) * 100}%`,
              }}
            />
            
            <p className="text-sm text-gray-600 mt-2">
              Preview: Will be cropped to 5:1 ratio (1200x240px recommended)
            </p>
          </div>
          
          {/* Crop controls */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">X Position</label>
              <input
                type="range"
                min="0"
                max={bannerImageDimensions.width - bannerCropArea.width}
                value={bannerCropArea.x}
                onChange={(e) => setBannerCropArea({ ...bannerCropArea, x: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Y Position</label>
              <input
                type="range"
                min="0"
                max={bannerImageDimensions.height - bannerCropArea.height}
                value={bannerCropArea.y}
                onChange={(e) => setBannerCropArea({ ...bannerCropArea, y: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width</label>
              <input
                type="range"
                min="200"
                max={maxCropWidth}
                value={bannerCropArea.width}
                onChange={(e) => {
                  const newWidth = parseInt(e.target.value);
                  const newHeight = newWidth / 5; // Maintain 5:1 ratio
                  setBannerCropArea({ 
                    ...bannerCropArea, 
                    width: newWidth, 
                    height: newHeight,
                    x: Math.min(bannerCropArea.x, bannerImageDimensions.width - newWidth),
                    y: Math.min(bannerCropArea.y, bannerImageDimensions.height - newHeight)
                  });
                }}
                className="w-full"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowBannerCropper(false);
                setTempBannerFile(null);
                setBannerImageDimensions({ width: 0, height: 0 });
              }}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleBannerCrop}
              className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 flex items-center justify-center space-x-2"
            >
              <Crop className="w-4 h-4" />
              <span>Crop Banner</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Online Store</h1>
            <p className="text-gray-600">Step {currentStep} of 5: {steps[currentStep - 1].title}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step.number < currentStep 
                      ? 'bg-green-500 text-white' 
                      : step.number === currentStep 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number < currentStep ? <Check className="w-5 h-5" /> : step.number}
                  </div>
                  <div className="text-center mt-2">
                    <p className="text-xs font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                <span>Save as Draft</span>
              </button>
            </div>

            <div className="text-sm text-gray-600">
              Step {currentStep} of 5
            </div>

            <button
              type="button"
              onClick={handleNext}
              disabled={isLoading}
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{currentStep === 5 ? 'Complete Setup' : 'Next'}</span>
                  {currentStep === 5 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Cropping Modals */}
      <LogoCropperModal />
      <BannerCropperModal />
    </div>
  );
};

export default OnlineStoreSetup;