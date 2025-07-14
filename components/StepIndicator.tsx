import { Check } from "lucide-react"

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="mb-10 md:mb-2">
      <div className="flex items-center justify-center space-x-8">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                step < currentStep
                  ? "bg-sage-500 text-white"
                  : step === currentStep
                    ? "bg-sage-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step < currentStep ? <Check className="h-5 w-5" /> : step}
            </div>
            {step < totalSteps && (
              <div className={`w-16 h-0.5 ml-4 ${step < currentStep ? "bg-sage-500" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <span className="text-sm text-gray-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>
    </div>
  )
}
