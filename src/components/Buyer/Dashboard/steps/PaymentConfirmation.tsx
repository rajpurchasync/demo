import React from "react";
import { CreditCard, Smartphone, Shield, Banknote, Trash2 } from "lucide-react";
import { BookingData, PricingBreakdown } from "../types/booking";
import { Input } from "../UI/Input";
import { RadioGroup } from "../UI/RadioGroup";
import { CardInput } from "../UI/CardInput";

interface PaymentConfirmationProps {
  data: Partial<BookingData>;
  pricing: PricingBreakdown;
  onChange: (updates: Partial<BookingData>) => void;
}

export function PaymentConfirmation({
  data,
  pricing,
  onChange,
}: PaymentConfirmationProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeStr: string) => {
    if (!timeStr) return "";
    const [hour] = timeStr.split(":");
    const hour12 =
      parseInt(hour) > 12 ? `${parseInt(hour) - 12}:00 PM` : `${hour}:00 AM`;
    return hour12;
  };

  const savedCards = [
    {
      label: "Saved Card 1",
      value: "saved-card-1",
      description: "Visa **** 1234",
      type: "visa",
    },
    {
      label: "Saved Card 2",
      value: "saved-card-2",
      description: "Mastercard **** 5678",
      type: "mastercard",
    },
  ];

  const paymentMethods = [
    {
      label: "Saved Cards",
      value: "saved-cards",
      description: "Use your saved payment methods",
    },
    {
      label: "New Card",
      value: "new-card",
      description: "Add a new payment method",
    },
    {
      label: "Apple Pay",
      value: "apple-pay",
      description: "Pay securely with Touch ID",
    },
    {
      label: "Cash on Delivery",
      value: "cash",
      description: "Pay with cash when service is completed",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Booking Summary
        </h2>
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Service</span>
            <span className="font-medium">
              {data.bookingType === "home" ? "Home" : "Office"} Cleaning
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Property</span>
            <span className="font-medium">
              {data.apartmentType?.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Duration</span>
            <span className="font-medium">
              {data.bookingHours} hour{data.bookingHours !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Date & Time</span>
            <span className="font-medium">
              {formatDate(data.date || "")} at {formatTime(data.time || "")}
            </span>
          </div>

          {data.repeatService && (
            <div className="flex justify-between">
              <span className="text-gray-600">Frequency</span>
              <span className="font-medium capitalize">{data.frequency}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-gray-600">Location</span>
            <span className="font-medium">{data.city}</span>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">Total Amount</span>
              <span className="font-bold text-xl text-[#145434]">
                AED {pricing.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h2>
        <RadioGroup
          options={paymentMethods}
          selected={data.paymentMethod || "saved-cards"}
          onChange={(value) => onChange({ paymentMethod: value as any })}
          name="payment"
        />
      </div>

      {/* Saved Cards List */}
      {data.paymentMethod === "saved-cards" && (
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            Select Saved Card
          </h3>
          <div className="space-y-3">
            {savedCards.map((card) => (
              <div
                key={card.value}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer flex-1">
                    <input
                      type="radio"
                      name="savedCard"
                      value={card.value}
                      checked={data.savedCardId === card.value}
                      onChange={(e) =>
                        onChange({ savedCardId: e.target.value })
                      }
                      className="text-[#145434] focus:ring-[#145434]"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            {card.description}
                          </div>
                          <div className="text-sm text-gray-500">
                            Expires 12/25
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {card.type === "visa" && (
                            <div className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                              VISA
                            </div>
                          )}
                          {card.type === "mastercard" && (
                            <div className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">
                              MC
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to remove this card?")
                      ) {
                        alert("Card removed successfully");
                      }
                    }}
                    className="ml-3 p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {data.savedCardId && (
            <div className="mt-4">
              <Input
                label="CVC"
                placeholder="123"
                value={data.savedCardCvc || ""}
                onChange={(e) => onChange({ savedCardCvc: e.target.value })}
                className="max-w-32"
              />
            </div>
          )}
        </div>
      )}

      {/* New Card Details */}
      {data.paymentMethod === "new-card" && (
        <div>
          <h3 className="text-md font-semibold text-gray-900 mb-4">
            Card Details
          </h3>
          <div className="space-y-4">
            <CardInput
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={data.cardDetails?.number || ""}
              onChange={(value) =>
                onChange({
                  cardDetails: { ...data.cardDetails, number: value },
                })
              }
            />

            <Input
              label="Cardholder Name"
              placeholder="Name on card"
              value={data.cardDetails?.holderName || ""}
              onChange={(e) =>
                onChange({
                  cardDetails: {
                    ...data.cardDetails,
                    holderName: e.target.value,
                  },
                })
              }
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                placeholder="MM/YY"
                value={data.cardDetails?.expiry || ""}
                onChange={(e) =>
                  onChange({
                    cardDetails: {
                      ...data.cardDetails,
                      expiry: e.target.value,
                    },
                  })
                }
              />
              <Input
                label="CVC"
                placeholder="123"
                value={data.cardDetails?.cvc || ""}
                onChange={(e) =>
                  onChange({
                    cardDetails: { ...data.cardDetails, cvc: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <label className="flex items-start mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={data.saveCard || false}
              onChange={(e) => onChange({ saveCard: e.target.checked })}
              className="mt-1 text-[#145434] focus:ring-[#145434]"
            />
            <span className="ml-3 text-sm text-gray-600">
              Save this card securely for future bookings
            </span>
          </label>
        </div>
      )}

      {/* Mobile Payment Icons */}
      {data.paymentMethod === "apple-pay" && (
        <div className="flex justify-center p-6">
          <div className="flex items-center space-x-2">
            <Smartphone className="w-6 h-6 text-gray-600" />
            <span className="font-medium">Touch ID or Face ID to pay</span>
          </div>
        </div>
      )}

      {/* Cash Payment Info */}
      {data.paymentMethod === "cash" && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Banknote className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Cash on Delivery
              </h3>
              <p className="text-sm text-blue-700">
                You can pay with cash when our cleaning professional arrives at
                your location. Please have the exact amount ready: AED{" "}
                {pricing.total}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Billing Information */}
      {(data.paymentMethod === "new-card" ||
        data.paymentMethod === "saved-cards") && (
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Billing Information
          </h2>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter billing name"
              value={data.billingInfo?.name || ""}
              onChange={(e) =>
                onChange({
                  billingInfo: { ...data.billingInfo, name: e.target.value },
                })
              }
            />

            <Input
              type="email"
              label="Email Address"
              placeholder="billing@example.com"
              value={data.billingInfo?.email || ""}
              onChange={(e) =>
                onChange({
                  billingInfo: { ...data.billingInfo, email: e.target.value },
                })
              }
            />

            <Input
              label="Phone Number"
              placeholder="Phone number"
              value={data.billingInfo?.phone || ""}
              onChange={(e) =>
                onChange({
                  billingInfo: { ...data.billingInfo, phone: e.target.value },
                })
              }
            />

            <Input
              label="Billing Address"
              placeholder="Enter billing address"
              value={data.billingInfo?.address || ""}
              onChange={(e) =>
                onChange({
                  billingInfo: { ...data.billingInfo, address: e.target.value },
                })
              }
            />

            <Input
              label="City"
              placeholder="Enter city"
              value={data.billingInfo?.city || ""}
              onChange={(e) =>
                onChange({
                  billingInfo: { ...data.billingInfo, city: e.target.value },
                })
              }
            />
          </div>
        </div>
      )}

      {/* Cancellation Policy */}
      {data.paymentMethod !== "cash" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            Cancellation Policy
          </h3>
          <p className="text-sm text-gray-600">
            Free cancellation until 3 hours before your booking. 50%
            cancellation charge applies within 3 hours of your scheduled
            service.
          </p>
        </div>
      )}

      {/* Trust Badge */}
      {data.paymentMethod !== "cash" && (
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Shield className="w-5 h-5" />
          <span className="text-sm font-medium">Secure SSL Payment</span>
        </div>
      )}
    </div>
  );
}
