"use client"

import { useState, useEffect } from "react"
import { Save, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AdminConfig {
  step2Components: string[]
  step3Components: string[]
}

const availableComponents = [
  { id: "aboutMe", label: "About Me", description: "Textarea for personal description" },
  { id: "address", label: "Address", description: "Street, city, state, and ZIP fields" },
  { id: "birthdate", label: "Birthdate", description: "Date picker for date of birth" },
]

export default function AdminPage() {
  const [config, setConfig] = useState<AdminConfig>({
    step2Components: ["aboutMe"],
    step3Components: ["birthdate", "address"],
  })
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
      const response = await fetch("/api/config")
      const data = await response.json()
      setConfig(data)
    } catch (error) {
      console.error("Error loading config:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateConfig = () => {
    const newErrors: { step2?: string; step3?: string } = {}

    if (config.step2Components.length === 0) {
      newErrors.step2 = "At least 1 component required in Step 2"
    }

    if (config.step3Components.length === 0) {
      newErrors.step3 = "At least 1 component required in Step 3"
    }

    if (config.step2Components.length > 2) {
      newErrors.step2 = "Maximum 2 components allowed in Step 2"
    }

    if (config.step3Components.length > 2) {
      newErrors.step3 = "Maximum 2 components allowed in Step 3"
    }

    setErrors(newErrors)
  }

  const isConfigValid = () => {
    return (
      config.step2Components.length >= 1 &&
      config.step2Components.length <= 2 &&
      config.step3Components.length >= 1 &&
      config.step3Components.length <= 2 &&
      Object.keys(errors).length === 0
    )
  }

  const handleComponentToggle = (componentId: string, step: 2 | 3, checked: boolean) => {
    setConfig((prev) => {
      const newConfig = { ...prev }
      const stepKey = step === 2 ? "step2Components" : "step3Components"
      const otherStepKey = step === 2 ? "step3Components" : "step2Components"

      if (checked) {
        if (!newConfig[stepKey].includes(componentId) && newConfig[stepKey].length < 2) {
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
      await fetch("/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      })
      setSaveMessage("Configuration saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error saving config:", error)
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
    const currentStepFull = config[stepKey].length >= 2

    return (isInOtherStep && !isInCurrentStep) || (currentStepFull && !isInCurrentStep)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src="/zealthy-icon.png" alt="Zealthy Icon" className="h-7 w-7" />
            <h1 className="text-4xl font-light text-gray-900">Admin Configuration</h1>
          </div>
          <p className="text-gray-600 text-lg">Configure which components appear in each onboarding step</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-sage-50 border-b border-sage-100">
              <CardTitle className="flex items-center justify-between text-gray-900">
                <span>Step 2 Components</span>
                <span className="text-sm font-normal text-gray-500">
                  {config.step2Components.length}/2 components selected
                </span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Select which components should appear in Step 2
              </CardDescription>
              {errors.step2 && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.step2}</span>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {availableComponents.map((component) => {
                const isChecked = isComponentInStep(component.id, 2)
                const isDisabled = isComponentDisabled(component.id, 2)

                return (
                  <div
                    key={component.id}
                    className={`flex items-start space-x-4 p-4 border rounded-lg ${
                      isDisabled && !isChecked ? "bg-gray-50 border-gray-200" : "border-sage-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`step2-${component.id}`}
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={(e) => handleComponentToggle(component.id, 2, e.target.checked)}
                      className="h-5 w-5 text-sage-500 focus:ring-sage-400 border-sage-300 rounded mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`step2-${component.id}`}
                        className={`font-medium text-lg cursor-pointer ${
                          isDisabled && !isChecked ? "text-gray-400" : "text-gray-900"
                        }`}
                      >
                        {component.label}
                      </label>
                      <p className={`text-sm mt-1 ${isDisabled && !isChecked ? "text-gray-400" : "text-gray-600"}`}>
                        {component.description}
                      </p>
                      {isComponentInStep(component.id, 3) && !isChecked && (
                        <p className="text-xs text-orange-600 mt-1">Selected in Step 3</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white">
            <CardHeader className="bg-sage-50 border-b border-sage-100">
              <CardTitle className="flex items-center justify-between text-gray-900">
                <span>Step 3 Components</span>
                <span className="text-sm font-normal text-gray-500">
                  {config.step3Components.length}/2 components selected
                </span>
              </CardTitle>
              <CardDescription className="text-gray-600">
                Select which components should appear in Step 3
              </CardDescription>
              {errors.step3 && (
                <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>{errors.step3}</span>
                </div>
              )}
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {availableComponents.map((component) => {
                const isChecked = isComponentInStep(component.id, 3)
                const isDisabled = isComponentDisabled(component.id, 3)

                return (
                  <div
                    key={component.id}
                    className={`flex items-start space-x-4 p-4 border rounded-lg ${
                      isDisabled && !isChecked ? "bg-gray-50 border-gray-200" : "border-sage-100"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`step3-${component.id}`}
                      checked={isChecked}
                      disabled={isDisabled}
                      onChange={(e) => handleComponentToggle(component.id, 3, e.target.checked)}
                      className="h-5 w-5 text-sage-500 focus:ring-sage-400 border-sage-300 rounded mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={`step3-${component.id}`}
                        className={`font-medium text-lg cursor-pointer ${
                          isDisabled && !isChecked ? "text-gray-400" : "text-gray-900"
                        }`}
                      >
                        {component.label}
                      </label>
                      <p className={`text-sm mt-1 ${isDisabled && !isChecked ? "text-gray-400" : "text-gray-600"}`}>
                        {component.description}
                      </p>
                      {isComponentInStep(component.id, 2) && !isChecked && (
                        <p className="text-xs text-orange-600 mt-1">Selected in Step 2</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-8">
          <Button
            onClick={saveConfig}
            disabled={!isConfigValid() || isSaving}
            className={`px-12 py-4 text-lg rounded-lg font-medium ${
              isConfigValid()
                ? "bg-sage-500 hover:bg-sage-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Saving Configuration...
              </>
            ) : (
              <>
                <Save className="h-5 w-5 mr-3" />
                Save Configuration
              </>
            )}
          </Button>

          {saveMessage && (
            <div
              className={`flex items-center justify-center space-x-2 mt-4 p-3 rounded-lg ${
                saveMessage.includes("Error")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              {saveMessage.includes("Error") ? (
                <AlertCircle className="h-5 w-5" />
              ) : (
                <CheckCircle className="h-5 w-5" />
              )}
              <span>{saveMessage}</span>
            </div>
          )}

          {!isConfigValid() && (
            <div className="flex items-center justify-center space-x-2 mt-4 p-3 rounded-lg bg-orange-50 text-orange-700 border border-orange-200">
              <AlertCircle className="h-5 w-5" />
              <span>Please fix validation errors before saving</span>
            </div>
          )}
        </div>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-sage-50 border-b border-sage-100">
            <CardTitle className="text-gray-900">Configuration Rules</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-sage-500 mr-3 mt-1">•</span>
                <span>Each step must have at least one component</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage-500 mr-3 mt-1">•</span>
                <span>Each step can have a maximum of two components</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage-500 mr-3 mt-1">•</span>
                <span>Components cannot appear in both steps</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage-500 mr-3 mt-1">•</span>
                <span>Changes take effect immediately</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
