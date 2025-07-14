"use client"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/FormField"
import { PasswordStrengthIndicator } from "@/components/PasswordStrengthIndicator"
import type { FormData, ValidationErrors } from "@/types"

interface Step1Props {
  formData: FormData
  validationErrors: ValidationErrors
  updateFormData: (field: string, value: string) => void
}

export const Step1 = ({ formData, validationErrors, updateFormData }: Step1Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-3">Welcome to Zealthy</h2>
        <p className="text-gray-600 text-lg">Let's get started with your account</p>
      </div>
      <div className="space-y-5">
        <FormField label="Email Address" htmlFor="email" error={validationErrors.email} required>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="Enter your email"
            className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
              validationErrors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={validationErrors.password} required>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            placeholder="Create a password"
            className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
              validationErrors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
          <PasswordStrengthIndicator password={formData.password} />
        </FormField>
      </div>
    </div>
  )
}
