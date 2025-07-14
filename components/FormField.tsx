import type React from "react"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  htmlFor: string
  error?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export const FormField = ({ label, htmlFor, error, required = false, children, className = "" }: FormFieldProps) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <Label htmlFor={htmlFor} className="text-gray-700 font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}
