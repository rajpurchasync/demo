import React from "react";
import { BookingData } from "../types/booking";
import { Input } from "../UI/Input";
import { Select } from "../UI/Select";
import { Toggle } from "../UI/Toggle";
import { TileGrid } from "../UI/TileGrid";
import { DateInput } from "../UI/DateInput";
import { WeekdaySelector } from "../UI/WeekdaySelector";

interface ScheduleLocationProps {
  data: Partial<BookingData>;
  onChange: (updates: Partial<BookingData>) => void;
}

export function ScheduleLocation({ data, onChange }: ScheduleLocationProps) {
  const uaeCities = [
    { value: "", label: "Select your city" },
    { value: "dubai", label: "Dubai" },
    { value: "abu-dhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
    { value: "ajman", label: "Ajman" },
    { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
    { value: "fujairah", label: "Fujairah" },
    { value: "umm-al-quwain", label: "Umm Al Quwain" },
  ];

  const countryCodes = [
    { value: "+971", label: "🇦🇪 +971" },
    { value: "+1", label: "🇺🇸 +1" },
    { value: "+44", label: "🇬🇧 +44" },
    { value: "+91", label: "🇮🇳 +91" },
    { value: "+92", label: "🇵🇰 +92" },
    { value: "+880", label: "🇧🇩 +880" },
    { value: "+63", label: "🇵🇭 +63" },
  ];
  const frequencyOptions = [
    { label: "Weekly", value: "weekly" },
    { label: "Bi-weekly", value: "bi-weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8; // 8 AM to 7 PM
    const time12 =
      hour > 12
        ? `${hour - 12}:00 PM`
        : hour === 12
        ? "12:00 PM"
        : `${hour}:00 AM`;
    return { label: time12, value: `${hour}:00` };
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Schedule</h2>
        <div className="space-y-4">
          <div>
            <DateInput
              label="Select Date"
              selected={data.date || ""}
              onChange={(date) => onChange({ date })}
            />
          </div>

          <Select
            label="Select Time"
            options={[{ value: "", label: "Choose time slot" }, ...timeSlots]}
            value={data.time || ""}
            onChange={(e) => onChange({ time: e.target.value })}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Repeat Service
        </h2>
        <Toggle
          option1={{ label: "One-time", value: "false" }}
          option2={{ label: "Recurring", value: "true" }}
          selected={data.repeatService ? "true" : "false"}
          onChange={(value) => onChange({ repeatService: value === "true" })}
        />

        {data.repeatService && (
          <div className="mt-4">
            <h3 className="text-md font-medium text-gray-900 mb-3">
              Frequency
            </h3>
            <TileGrid
              tiles={frequencyOptions}
              selected={data.frequency || ""}
              onChange={(value) => onChange({ frequency: value as any })}
              columns={3}
            />

            {data.frequency && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Preferred Weekdays
                </h4>
                <WeekdaySelector
                  selected={data.preferredWeekdays || []}
                  onChange={(weekdays) =>
                    onChange({ preferredWeekdays: weekdays })
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
        <div className="space-y-4">
          <Select
            label="City"
            options={uaeCities}
            value={data.city || ""}
            onChange={(e) => onChange({ city: e.target.value })}
          />

          <Input
            label="Street Address"
            placeholder="Enter your street address"
            value={data.address?.street || ""}
            onChange={(e) =>
              onChange({
                address: { ...data.address, street: e.target.value },
              })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Building"
              placeholder="Building name/number"
              value={data.address?.building || ""}
              onChange={(e) =>
                onChange({
                  address: { ...data.address, building: e.target.value },
                })
              }
            />
            <Input
              label="Flat/Unit"
              placeholder="Flat number"
              value={data.address?.flat || ""}
              onChange={(e) =>
                onChange({
                  address: { ...data.address, flat: e.target.value },
                })
              }
            />
          </div>

          <Input
            label="Parking Instructions (Optional)"
            placeholder="Any special parking instructions"
            value={data.address?.parkingInstructions || ""}
            onChange={(e) =>
              onChange({
                address: {
                  ...data.address,
                  parkingInstructions: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Contact Information
        </h2>
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={data.contact?.name || ""}
            onChange={(e) =>
              onChange({
                contact: { ...data.contact, name: e.target.value },
              })
            }
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex space-x-2">
              <Select
                options={countryCodes}
                value={data.contact?.countryCode || "+971"}
                onChange={(e) =>
                  onChange({
                    contact: { ...data.contact, countryCode: e.target.value },
                  })
                }
                className="w-32"
              />
              <Input
                placeholder="XX XXX XXXX"
                value={data.contact?.phone || ""}
                onChange={(e) =>
                  onChange({
                    contact: { ...data.contact, phone: e.target.value },
                  })
                }
                className="flex-1"
              />
            </div>
          </div>

          <Input
            type="email"
            label="Email Address"
            placeholder="your.email@example.com"
            value={data.contact?.email || ""}
            onChange={(e) =>
              onChange({
                contact: { ...data.contact, email: e.target.value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
