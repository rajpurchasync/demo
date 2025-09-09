import React from "react";
import { BookingData } from "../types/booking";
import { Toggle } from "../UI/Toggle";
import { RadioGroup } from "../UI/RadioGroup";
import { Select } from "../UI/Select";
import { NumericStepper } from "../UI/NumericStepper";
import { PriceBreakdown } from "../PriceBreakdown";
import { calculatePricing, getSuggestedHours } from "../../utils/pricing";

interface ServiceDetailsProps {
  data: Partial<BookingData>;
  onChange: (updates: Partial<BookingData>) => void;
}

export function ServiceDetails({ data, onChange }: ServiceDetailsProps) {
  const pricing = calculatePricing(data);

  const homeTypes = [
    { value: "", label: "Select property size" },
    { value: "studio", label: "Studio (2 hours)" },
    { value: "1br", label: "1 Bedroom (2 hours)" },
    { value: "2br", label: "2 Bedroom (3 hours)" },
    { value: "3br", label: "3 Bedroom (4 hours)" },
    { value: "4br", label: "4 Bedroom (5 hours)" },
    { value: "5br", label: "5 Bedroom (6 hours)" },
  ];

  const officeTypes = [
    { value: "", label: "Select office size" },
    { value: "0-50", label: "0-50 sqm (1 hour)" },
    { value: "50-100", label: "50-100 sqm (2 hours)" },
    { value: "100-150", label: "100-150 sqm (3 hours)" },
    { value: "150-200", label: "150-200 sqm (4 hours)" },
    { value: "200-250", label: "200-250 sqm (5 hours)" },
  ];

  const materialOptions = [
    {
      label: "I need cleaning materials",
      value: "needed",
      description: "We bring all supplies (included in price)",
    },
    {
      label: "I have cleaning materials",
      value: "not-needed",
      description: "Use your own supplies",
    },
  ];

  const handlePropertyTypeChange = (value: string) => {
    if (!value) return;
    const suggestedHours = getSuggestedHours(data.bookingType || "home", value);

    if (data.bookingType === "home") {
      onChange({
        apartmentType: value as any,
        officeSize: undefined,
        bookingHours: suggestedHours,
        addOns: { ...data.addOns, ironingHours: 0 },
      });
    } else {
      onChange({
        officeSize: value as any,
        apartmentType: undefined,
        bookingHours: suggestedHours,
        addOns: { ...data.addOns, ironingHours: 0 },
      });
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Service Type
        </h2>
        <Toggle
          option1={{ label: "Home Cleaning", value: "home" }}
          option2={{ label: "Office Cleaning", value: "office" }}
          selected={data.bookingType || "home"}
          onChange={(value) => {
            onChange({
              bookingType: value as "home" | "office",
              apartmentType: undefined,
              officeSize: undefined,
              addOns: { ironingHours: 0 },
            });
          }}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Cleaning Materials
        </h2>
        <RadioGroup
          options={materialOptions}
          selected={data.cleaningMaterials || "needed"}
          onChange={(value) =>
            onChange({ cleaningMaterials: value as "needed" | "not-needed" })
          }
          name="materials"
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {data.bookingType === "home" ? "Property Size" : "Office Size"}
        </h2>
        <Select
          options={data.bookingType === "home" ? homeTypes : officeTypes}
          value={
            data.bookingType === "home"
              ? data.apartmentType || ""
              : data.officeSize || ""
          }
          onChange={(e) => handlePropertyTypeChange(e.target.value)}
        />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Duration</h2>
        <NumericStepper
          value={data.bookingHours || 2}
          onChange={(value) => onChange({ bookingHours: value })}
          min={1}
          max={12}
          label="Hours of cleaning"
        />
      </div>

      {data.bookingType === "home" && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add-ons</h2>
          <div className="p-4 border-2 border-gray-200 rounded-lg">
            <div className="font-medium text-gray-900 mb-3">
              Ironing Service (AED 15 per hour)
            </div>
            <NumericStepper
              value={data.addOns?.ironingHours || 0}
              onChange={(value) =>
                onChange({
                  addOns: { ...data.addOns, ironingHours: value },
                })
              }
              min={0}
              max={8}
              label="Hours of ironing"
            />
          </div>
        </div>
      )}

      <PriceBreakdown
        pricing={pricing}
        hours={data.bookingHours || 2}
        ironingHours={data.addOns?.ironingHours || 0}
      />
    </div>
  );
}
