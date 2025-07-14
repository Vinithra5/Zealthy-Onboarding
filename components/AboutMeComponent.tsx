"use client"

import { Textarea } from "@/components/ui/textarea"
import { FormField } from "@/components/FormField"

interface AboutMeComponentProps {
  value: string
  error?: string
  onChange: (value: string) => void
}

export const AboutMeComponent = ({ value, error, onChange }: AboutMeComponentProps) => {
  return (
    <FormField label="About Me" htmlFor="aboutMe" error={error} required>
      <Textarea
        id="aboutMe"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Tell us about yourself..."
        rows={4}
        className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
          error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
        }`}
      />
    </FormField>
  )
}
