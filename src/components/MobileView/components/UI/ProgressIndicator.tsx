import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm',
                step < currentStep
                  ? 'bg-[#145434] text-white'
                  : step === currentStep
                  ? 'bg-[#145434] text-white'
                  : 'bg-gray-200 text-gray-500'
              )}
            >
              {step < currentStep ? <Check className="w-5 h-5" /> : step}
            </div>
            <div className={cn(
              'text-xs mt-2 text-center font-medium',
              step <= currentStep ? 'text-[#145434]' : 'text-gray-400'
            )}>
              {stepLabels[index]}
            </div>
          </div>
          {index < totalSteps - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-4',
                step < currentStep ? 'bg-[#145434]' : 'bg-gray-200'
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}