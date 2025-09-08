import React from 'react';
import { PricingBreakdown } from '../types/booking';

interface PriceBreakdownProps {
  pricing: PricingBreakdown;
  hours: number;
  ironingHours: number;
}

export function PriceBreakdown({ pricing, hours, ironingHours }: PriceBreakdownProps) {
  if (pricing.total === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-gray-900">Cost Breakdown</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Cleaning × {hours} hour{hours !== 1 ? 's' : ''}
          </span>
          <span className="font-medium">AED {pricing.basePrice}</span>
        </div>
        
        {ironingHours > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">
              Ironing × {ironingHours} hour{ironingHours !== 1 ? 's' : ''}
            </span>
            <span className="font-medium">AED {pricing.addOnsPrice}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">AED {pricing.subtotal}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">VAT (5%)</span>
          <span className="font-medium">AED {pricing.vat}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-lg text-gray-900">Total (incl. VAT)</span>
            <span className="font-bold text-xl text-[#145434]">AED {pricing.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}