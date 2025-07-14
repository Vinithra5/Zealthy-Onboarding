"use client"

import { useState, useEffect } from "react"
import type { FormData, AdminConfig, ValidationErrors } from "@/types"
import { INITIAL_FORM_DATA, DEFAULT_CONFIG, API_ENDPOINTS } from "@/constants"
import { validateFormStep } from "@/utils/validation"

export const useOnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [config, setConfig] = useState<AdminConfig>(DEFAULT_CONFIG)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    loadConfig()
  }, [])

  useEffect(() => {
    if (formData.email && currentStep === 1) {
      checkExistingUser()
    }
  }, [formData.email, config])

  const loadConfig = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONFIG)
      const data = await response.json()
      setConfig(data)
    } catch {
      setConfig(DEFAULT_CONFIG)
    } finally {
      setIsLoading(false)
    }
  }

  const checkExistingUser = async () => {
    if (!formData.email) return

    try {
      const response = await fetch(`${API_ENDPOINTS.USERS_CHECK}?email=${encodeURIComponent(formData.email)}`)
      if (response.ok) {
        const userData = await response.json()
        if (userData && userData.email) {
          setFormData(userData)
          determineCurrentStep(userData)
        }
      }
    } catch {
      // Silent fail
    }
  }

  const determineCurrentStep = (userData: FormData) => {
    const hasStep2Data = config.step2Components.some((comp) => {
      if (comp === "aboutMe") return userData.aboutMe
      if (comp === "birthdate") return userData.birthdate
      if (comp === "address") return userData.address.street
      return false
    })

    if (!hasStep2Data) {
      setCurrentStep(2)
    } else {
      const hasStep3Data = config.step3Components.some((comp) => {
        if (comp === "aboutMe") return userData.aboutMe
        if (comp === "birthdate") return userData.birthdate
        if (comp === "address") return userData.address.street
        return false
      })
      setCurrentStep(hasStep3Data ? 1 : 3)
    }
  }

  const validateCurrentStep = (): boolean => {
    const components = currentStep === 2 ? config.step2Components : config.step3Components
    const errors = validateFormStep(formData, currentStep, components)
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const updateFormData = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    setValidationErrors((prev) => ({
      ...prev,
      [field.includes(".") ? field.split(".")[1] : field]: undefined,
    }))
  }

  const nextStep = async () => {
    if (!validateCurrentStep()) return

    if (currentStep === 1) {
      await saveProgress()
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveProgress = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS_SAVE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch {
      // Silent fail
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    try {
      const response = await fetch(API_ENDPOINTS.USERS_COMPLETE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setShowSuccessModal(true)

      setTimeout(() => {
        window.location.href = "/"
      }, 5000)
    } catch {
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isCurrentStepValid = (): boolean => {
    const components = currentStep === 2 ? config.step2Components : config.step3Components
    const errors = validateFormStep(formData, currentStep, components)
    return Object.keys(errors).length === 0
  }

  return {
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
  }
}
