"use client"

import { AlertCircle } from "lucide-react"
import type { ComponentConfig } from "@/types"

interface ComponentSelectorProps {
  title: string
  description: string
  components: ComponentConfig[]
  selectedComponents: string[]
  errors?: string
  onToggle: (componentId: string, checked: boolean) => void
  isComponentInStep: (componentId: string) => boolean
  isComponentDisabled: (componentId: string) => boolean
  maxComponents: number
}

export const ComponentSelector = ({
  title,
  description,
  components,
  selectedComponents,
  errors,
  onToggle,
  isComponentInStep,
  isComponentDisabled,
  maxComponents,
}: ComponentSelectorProps) => {
  return (
    <div className="shadow-lg border-0 bg-white rounded-lg">
      <div className="bg-sage-50 border-b border-sage-100 p-6 rounded-t-lg">
        <div className="flex items-center justify-between text-gray-900 mb-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <span className="text-sm font-normal text-gray-500">
            {selectedComponents.length}/{maxComponents} components selected
          </span>
        </div>
        <p className="text-gray-600">{description}</p>
        {errors && (
          <div className="flex items-center space-x-2 text-red-600 text-sm mt-2">
            <AlertCircle className="h-4 w-4" />
            <span>{errors}</span>
          </div>
        )}
      </div>
      <div className="p-6 space-y-4">
        {components.map((component) => {
          const isChecked = isComponentInStep(component.id)
          const isDisabled = isComponentDisabled(component.id)

          return (
            <div
              key={component.id}
              className={`flex items-start space-x-4 p-4 border rounded-lg ${
                isDisabled && !isChecked ? "bg-gray-50 border-gray-200" : "border-sage-100"
              }`}
            >
              <input
                type="checkbox"
                id={`${title.toLowerCase().replace(/\s+/g, "-")}-${component.id}`}
                checked={isChecked}
                disabled={isDisabled}
                onChange={(e) => onToggle(component.id, e.target.checked)}
                className="h-5 w-5 text-sage-500 focus:ring-sage-400 border-sage-300 rounded mt-1"
              />
              <div className="flex-1">
                <label
                  htmlFor={`${title.toLowerCase().replace(/\s+/g, "-")}-${component.id}`}
                  className={`font-medium text-lg cursor-pointer ${
                    isDisabled && !isChecked ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {component.label}
                </label>
                <p className={`text-sm mt-1 ${isDisabled && !isChecked ? "text-gray-400" : "text-gray-600"}`}>
                  {component.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
