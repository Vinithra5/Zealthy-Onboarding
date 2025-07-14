"use client"

import { useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useOnboardingForm } from "@/hooks/useOnboardingForm"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { MedicalIllustrationsBackground } from "@/components/MedicalIllustrations"
import { SuccessModal } from "@/components/SuccessModal"
import { StepIndicator } from "./StepIndicator"
import { Step1 } from "./Step1"
import { Step2 } from "./Step2"
import { Step3 } from "./Step3"

const TOTAL_STEPS = 3

export const OnboardingForm = () => {
  const {
    currentStep,
    formData,
    config,
    isLoading,
    isSubmitting,
    showSuccessModal,
    validationErrors,
    updateFormData,
    nextStep,
    prevStep,
    handleSubmit,
    isCurrentStepValid,
    setShowSuccessModal,
  } = useOnboardingForm()

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSuccessModal) {
        window.location.href = "/"
      }
    }

    if (showSuccessModal) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [showSuccessModal])

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 formData={formData} validationErrors={validationErrors} updateFormData={updateFormData} />
      case 2:
        return (
          <Step2
            formData={formData}
            validationErrors={validationErrors}
            updateFormData={updateFormData}
            components={config.step2Components}
          />
        )
      case 3:
        return (
          <Step3
            formData={formData}
            validationErrors={validationErrors}
            updateFormData={updateFormData}
            components={config.step3Components}
          />
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 flex items-center justify-center relative">
        <MedicalIllustrationsBackground />
        <div className="text-center relative z-10">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[93vh] bg-gradient-to-b from-white via-green-50 to-green-100 pt-24 md:pt-8 pb-4 px-6 relative">
      <MedicalIllustrationsBackground />

      <div className="max-w-2xl mx-auto relative z-10">
        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <Card className="shadow-lg border-0 bg-white">
          <CardContent className="px-10 py-5">
            {renderStep()}

            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              {currentStep === TOTAL_STEPS ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isCurrentStepValid()}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Submitting...
                    </>
                  ) : (
                    "Complete Onboarding"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!isCurrentStepValid()}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <SuccessModal isVisible={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
      </div>
    </div>
  )
}
