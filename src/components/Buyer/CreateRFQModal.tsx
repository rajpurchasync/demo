import React from "react";
import { X, FileText, Package, Settings, FolderOpen } from "lucide-react";
import RFQCreationFlow from "./RFQCreation/RFQCreationFlow";

interface CreateRFQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRFQModal: React.FC<CreateRFQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOptionClick = (type: string) => {
    console.log(`Creating RFQ for: ${type}`);
    // Handle RFQ creation logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 relative">
        <RFQCreationFlow />
      </div>
    </div>
  );
};

export default CreateRFQModal;
