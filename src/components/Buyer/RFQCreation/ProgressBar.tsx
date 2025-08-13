import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  key: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Mobile Progress */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {steps[currentStep - 1]?.name}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Desktop Progress */}
        <div className="hidden md:flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = currentStep === step.id;
            const isClickable = step.id <= currentStep || completedSteps.includes(step.id);

            return (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : isCurrent
                      ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                      : isClickable
                      ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </button>
                <span className={`ml-3 font-medium ${
                  isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`mx-4 h-px w-16 transition-all duration-500 ${
                    completedSteps.includes(step.id) ? 'bg-green-400' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;