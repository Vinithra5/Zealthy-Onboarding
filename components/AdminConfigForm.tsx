"use client"

import { Save, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { useAdminConfig } from "@/hooks/useAdminConfig"
import { ComponentSelector } from "./ComponentSelector"
import { AVAILABLE_COMPONENTS, VALIDATION_RULES } from "@/constants"

export const AdminConfigForm = () => {
  const {
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
  } = useAdminConfig()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">Loading...</p>
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
          <ComponentSelector
            title="Step 2 Components"
            description="Select which components should appear in Step 2"
            components={AVAILABLE_COMPONENTS}
            selectedComponents={config.step2Components}
            errors={errors.step2}
            onToggle={(componentId, checked) => handleComponentToggle(componentId, 2, checked)}
            isComponentInStep={(componentId) => isComponentInStep(componentId, 2)}
            isComponentDisabled={(componentId) => isComponentDisabled(componentId, 2)}
            maxComponents={VALIDATION_RULES.ADMIN.MAX_COMPONENTS}
          />

          <ComponentSelector
            title="Step 3 Components"
            description="Select which components should appear in Step 3"
            components={AVAILABLE_COMPONENTS}
            selectedComponents={config.step3Components}
            errors={errors.step3}
            onToggle={(componentId, checked) => handleComponentToggle(componentId, 3, checked)}
            isComponentInStep={(componentId) => isComponentInStep(componentId, 3)}
            isComponentDisabled={(componentId) => isComponentDisabled(componentId, 3)}
            maxComponents={VALIDATION_RULES.ADMIN.MAX_COMPONENTS}
          />
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
                <LoadingSpinner size="sm" className="mr-3" />
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
