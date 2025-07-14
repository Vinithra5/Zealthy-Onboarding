"use client"

import { Input } from "@/components/ui/input"
import { FormField } from "@/components/FormField"

interface BirthdateComponentProps {
  value: string
  error?: string
  onChange: (value: string) => void
}

export const BirthdateComponent = ({ value, error, onChange }: BirthdateComponentProps) => {
  return (
    <FormField label="Date of Birth" htmlFor="birthdate" error={error} required>
      <Input
        id="birthdate"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        }`}
      />
    </FormField>
  )
}
