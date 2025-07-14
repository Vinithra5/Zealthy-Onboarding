"use client"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/FormField"
import { US_STATES } from "@/constants"

interface AddressComponentProps {
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  errors: {
    street?: string
    city?: string
    state?: string
    zip?: string
  }
  onChange: (field: string, value: string) => void
}

export const AddressComponent = ({ address, errors, onChange }: AddressComponentProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
      <div className="space-y-4">
        <FormField label="Street Address" htmlFor="street" error={errors.street} required>
          <Input
            id="street"
            value={address.street}
            onChange={(e) => onChange("address.street", e.target.value)}
            placeholder="Enter your street address"
            className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
              errors.street ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
            }`}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="City" htmlFor="city" error={errors.city} required>
            <Input
              id="city"
              value={address.city}
              onChange={(e) => onChange("address.city", e.target.value)}
              placeholder="City"
              className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
                errors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
          </FormField>

          <FormField label="State" htmlFor="state" error={errors.state} required>
            <select
              id="state"
              value={address.state}
              onChange={(e) => onChange("address.state", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white ${
                errors.state
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-sage-200 focus:border-sage-400 focus:ring-sage-400"
              }`}
            >
              <option value="">Select State</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="ZIP Code" htmlFor="zip" error={errors.zip} required>
            <Input
              id="zip"
              value={address.zip}
              onChange={(e) => onChange("address.zip", e.target.value)}
              placeholder="ZIP"
              className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
                errors.zip ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
          </FormField>
        </div>
      </div>
    </div>
  )
}
