"use client"

import { useState, useEffect } from "react"
import type { AdminConfig } from "@/types"
import { DEFAULT_CONFIG, API_ENDPOINTS, VALIDATION_RULES } from "@/constants"

export const useAdminConfig = () => {
  const [config, setConfig] = useState<AdminConfig>(DEFAULT_CONFIG)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string>("")
  const [errors, setErrors] = useState<{ step2?: string; step3?: string }>({})

  useEffect(() => {
    loadConfig()
  }, [])

  useEffect(() => {
    validateConfig()
  }, [config])

  const loadConfig = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONFIG)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setConfig(data)
    } catch {
      setConfig(DEFAULT_CONFIG)
    } finally {
      setIsLoading(false)
    }
  }

  const validateConfig = () => {
    const newErrors: { step2?: string; step3?: string } = {}
    const { MIN_COMPONENTS, MAX_COMPONENTS } = VALIDATION_RULES.ADMIN

    if (config.step2Components.length < MIN_COMPONENTS) {
      newErrors.step2 = `At least ${MIN_COMPONENTS} component required in Step 2`
    }

    if (config.step3Components.length < MIN_COMPONENTS) {
      newErrors.step3 = `At least ${MIN_COMPONENTS} component required in Step 3`
    }

    if (config.step2Components.length > MAX_COMPONENTS) {
      newErrors.step2 = `Maximum ${MAX_COMPONENTS} components allowed in Step 2`
    }

    if (config.step3Components.length > MAX_COMPONENTS) {
      newErrors.step3 = `Maximum ${MAX_COMPONENTS} components allowed in Step 3`
    }

    setErrors(newErrors)
  }

  const isConfigValid = () => {
    const { MIN_COMPONENTS, MAX_COMPONENTS } = VALIDATION_RULES.ADMIN
    return (
      config.step2Components.length >= MIN_COMPONENTS &&
      config.step2Components.length <= MAX_COMPONENTS &&
      config.step3Components.length >= MIN_COMPONENTS &&
      config.step3Components.length <= MAX_COMPONENTS &&
      Object.keys(errors).length === 0
    )
  }

  const handleComponentToggle = (componentId: string, step: 2 | 3, checked: boolean) => {
    setConfig((prev) => {
      const newConfig = { ...prev }
      const stepKey = step === 2 ? "step2Components" : "step3Components"
      const otherStepKey = step === 2 ? "step3Components" : "step2Components"

      if (checked) {
        if (
          !newConfig[stepKey].includes(componentId) &&
          newConfig[stepKey].length < VALIDATION_RULES.ADMIN.MAX_COMPONENTS
        ) {
          newConfig[stepKey] = [...newConfig[stepKey], componentId]
          newConfig[otherStepKey] = newConfig[otherStepKey].filter((id) => id !== componentId)
        }
      } else {
        newConfig[stepKey] = newConfig[stepKey].filter((id) => id !== componentId)
      }

      return newConfig
    })

    setSaveMessage("")
  }

  const saveConfig = async () => {
    if (!isConfigValid()) return

    setIsSaving(true)
    try {
      const response = await fetch(API_ENDPOINTS.CONFIG, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setSaveMessage("Configuration saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch {
      setSaveMessage("Error saving configuration. Please try again.")
      setTimeout(() => setSaveMessage(""), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const isComponentInStep = (componentId: string, step: 2 | 3) => {
    const stepKey = step === 2 ? "step2Components" : "step3Components"
    return config[stepKey].includes(componentId)
  }

  const isComponentDisabled = (componentId: string, step: 2 | 3) => {
    const stepKey = step === 2 ? "step2Components" : "step3Components"
    const otherStepKey = step === 2 ? "step3Components" : "step2Components"
    const isInCurrentStep = config[stepKey].includes(componentId)
    const isInOtherStep = config[otherStepKey].includes(componentId)
    const currentStepFull = config[stepKey].length >= VALIDATION_RULES.ADMIN.MAX_COMPONENTS

    return (isInOtherStep && !isInCurrentStep) || (currentStepFull && !isInCurrentStep)
  }

  return {
    config,
    isLoading,
    isSaving,
    saveMessage,
    errors,
    isConfigValid,
    handleComponentToggle,
    saveConfig,
    isComponentInStep,
    isComponentDisabled,
  }
}
