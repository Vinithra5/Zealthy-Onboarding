"use client"

import type { FormData, ValidationErrors } from "@/types"
import { AboutMeComponent } from "../components/AboutMeComponent"
import { BirthdateComponent } from "../components/BirthdateComponent"
import { AddressComponent } from "../components/AddressComponent"

interface Step2Props {
  formData: FormData
  validationErrors: ValidationErrors
  updateFormData: (field: string, value: string) => void
  components: string[]
}

export const Step2 = ({ formData, validationErrors, updateFormData, components }: Step2Props) => {
  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case "aboutMe":
        return (
          <AboutMeComponent
            key="aboutMe"
            value={formData.aboutMe}
            error={validationErrors.aboutMe}
            onChange={(value) => updateFormData("aboutMe", value)}
          />
        )
      case "birthdate":
        return (
          <BirthdateComponent
            key="birthdate"
            value={formData.birthdate}
            error={validationErrors.birthdate}
            onChange={(value) => updateFormData("birthdate", value)}
          />
        )
      case "address":
        return (
          <AddressComponent
            key="address"
            address={formData.address}
            errors={{
              street: validationErrors.street,
              city: validationErrors.city,
              state: validationErrors.state,
              zip: validationErrors.zip,
            }}
            onChange={updateFormData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-light text-gray-900 mb-3">Tell Us More</h2>
        <p className="text-gray-600 text-lg">Help us personalize your experience</p>
      </div>
      <div className="space-y-6">{components.map((component) => renderComponent(component))}</div>
    </div>
  )
}
