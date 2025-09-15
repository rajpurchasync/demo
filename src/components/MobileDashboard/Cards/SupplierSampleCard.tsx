import React from "react";
import { Package, Calendar } from "lucide-react";
import { SupplierSample } from "../types/purchasync";
import { cn } from "../utils/cn";

interface SupplierSampleCardProps {
  sample: SupplierSample;
  onClick?: () => void;
}

export function SupplierSampleCard({
  sample,
  onClick,
}: SupplierSampleCardProps) {
  const getStatusColor = () => {
    switch (sample.status) {
      case "received":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "requested":
        return "bg-yellow-100 text-yellow-800";
      case "feedback-pending":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border rounded-lg p-3 cursor-pointer transition-all duration-200 hover:shadow-sm hover:border-gray-300",
        "border-gray-200"
      )}
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-2 flex-1">
            <Package className="w-4 h-4 text-gray-500 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm">
                {sample.productName}
              </h3>
            </div>
          </div>
          <span
            className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
              getStatusColor()
            )}
          >
            {sample.status.replace("-", " ")}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-3 h-3 mr-1" />
            <span className="font-medium">
              Requested {formatDate(sample.requestDate)}
            </span>
          </div>
          {sample.expectedDate && (
            <span className="text-gray-600">
              Expected {formatDate(sample.expectedDate)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
