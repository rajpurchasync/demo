import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Save,
  Shield,
  Check,
  X,
  Edit,
} from "lucide-react";
import ProfileEditForm from "./ProfileEditForm";
import PasswordResetForm from "./PasswordResetForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+91", name: "India", flag: "🇮🇳" },
  { code: "+86", name: "China", flag: "🇨🇳" },
  { code: "+49", name: "Germany", flag: "🇩🇪" },
];
interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  countryCode: string;
  profilePicture?: string;
}

interface ProfileManagementProps {
  sidebarCollapsed: boolean;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({
  sidebarCollapsed,
}) => {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [editModes, setEditModes] = useState({
    profile: false,
    business: false,
    locations: false,
    security: false,
  });

  // Profile data
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@purchasync.com",
    phone: "+1234567890",
    countryCode: "+1",
    position: "Procurement Manager",
    image: null as File | null,
  });

  const [profileEditData, setProfileEditData] = useState({ ...profileData });

  const handleSaveProfile = (updatedData: ProfileData) => {
    setProfileData(updatedData);
    setIsEditFormOpen(false);
    showSuccess("Profile updated successfully!");
  };
  const toggleEditMode = (section: keyof typeof editModes) => {
    setEditModes((prev) => ({ ...prev, [section]: !prev[section] }));

    // Reset edit data when entering edit mode
    if (!editModes[section]) {
      setProfileEditData({ ...profileData });
    }
  };

  const handlePasswordReset = () => {
    setIsPasswordFormOpen(false);
    showSuccess("Password updated successfully!");
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = (section: keyof typeof editModes) => {
    setEditModes((prev) => ({ ...prev, [section]: false }));

    // Reset edit data to original values
    switch (section) {
      case "profile":
        setProfileEditData({ ...profileData });
        break;
    }
  };
  const handleSave = (section: keyof typeof editModes) => {
    switch (section) {
      case "profile":
        setProfileData({ ...profileEditData });
        break;
    }

    setEditModes((prev) => ({ ...prev, [section]: false }));
    setShowSuccessMessage(true);
    // toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully!`);
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileEditData({ ...profileEditData, image: e.target.files[0] });
      setShowSuccessMessage(true);
    }
  };

  return (
    <main
      className={`
      transition-all duration-300 ease-in-out
      ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-60"}
     pb-8 min-h-screen bg-white rounded-[12px] overflow-hidden
    `}
    >
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-slide-in">
          <Check size={20} />
          <span className="font-medium">{successMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-4 py-3  lg:py-2 border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            {/* <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-white rounded-sm"></div>
            </div> */}
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              My Profile
            </h1>
          </div>
        </div>
      </div>
      {/* <div className="mb-8 mt-12 lg:mt-0">
        <div className="flex items-center space-x-3 mb-2">
          <User className="text-blue-600" size={28} />
          <h1 className="text-2xl lg:text-3xl font-medium text-gray-900">
            My Profile
          </h1>
        </div>
        <p className="text-gray-600">
          Manage your personal information and account settings
        </p>
      </div> */}
      <div className="max-w-[700px] mx-auto mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Profile
              </CardTitle>
              {!editModes.profile ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleEditMode("profile")}
                  className="flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCancel("profile")}
                    className="flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSave("profile")}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {(
                    editModes.profile
                      ? profileEditData.image
                      : profileData.image
                  ) ? (
                    <img
                      src={URL.createObjectURL(
                        editModes.profile
                          ? profileEditData.image!
                          : profileData.image!
                      )}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                {editModes.profile && (
                  <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full cursor-pointer hover:bg-purple-700">
                    <Camera className="w-3 h-3" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <div>
                <h3 className="font-medium">Profile Picture</h3>
                <p className="text-sm text-gray-500">
                  {editModes.profile
                    ? "Click camera icon to upload"
                    : "Professional photo"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                {editModes.profile ? (
                  <Input
                    id="firstName"
                    value={profileEditData.firstName}
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        firstName: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    {profileData.firstName}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                {editModes.profile ? (
                  <Input
                    id="lastName"
                    value={profileEditData.lastName}
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        lastName: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    {profileData.lastName}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                {editModes.profile ? (
                  <Input
                    id="email"
                    type="email"
                    value={profileEditData.email}
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    {profileData.email}
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                {editModes.profile ? (
                  <Input
                    id="position"
                    value={profileEditData.position}
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        position: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="p-2 bg-gray-50 rounded border text-sm">
                    {profileData.position}
                  </div>
                )}
              </div>
            </div>

            <div>
              <Label>Phone Number</Label>
              {editModes.profile ? (
                <div className="flex gap-2">
                  <Select
                    value={profileEditData.countryCode}
                    onValueChange={(value) =>
                      setProfileEditData({
                        ...profileEditData,
                        countryCode: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    value={profileEditData.phone.replace(
                      profileEditData.countryCode,
                      ""
                    )}
                    onChange={(e) =>
                      setProfileEditData({
                        ...profileEditData,
                        phone: profileEditData.countryCode + e.target.value,
                      })
                    }
                    placeholder="Phone number"
                    className="flex-1"
                  />
                </div>
              ) : (
                <div className="p-2 bg-gray-50 rounded border text-sm">
                  {profileData.phone}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Profile Edit Form */}
      <ProfileEditForm
        isOpen={isEditFormOpen}
        onClose={() => setIsEditFormOpen(false)}
        onSave={handleSaveProfile}
        initialData={profileData}
      />

      {/* Password Reset Form */}
      <PasswordResetForm
        isOpen={isPasswordFormOpen}
        onClose={() => setIsPasswordFormOpen(false)}
        onSave={handlePasswordReset}
      />

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </main>
  );
};

export default ProfileManagement;
