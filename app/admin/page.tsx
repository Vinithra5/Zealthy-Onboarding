"use client"
import { AdminConfigForm } from "@/components/AdminConfigForm"

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
  return <AdminConfigForm />
}
