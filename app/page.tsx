"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

interface FormData {
  email: string
  password: string
  aboutMe: string
  birthdate: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
}

interface AdminConfig {
  step2Components: string[]
  step3Components: string[]
}

interface ValidationErrors {
  email?: string
  password?: string
  aboutMe?: string
  birthdate?: string
  street?: string
  city?: string
  state?: string
  zip?: string
}

const initialFormData: FormData = {
  email: "",
  password: "",
  aboutMe: "",
  birthdate: "",
  address: {
    street: "",
    city: "",
    state: "",
    zip: "",
  },
}

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

function MedicalHeartIllustration() {
  return (
    <div className="absolute top-4 left-8 z-0 opacity-60">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
      >
        <path
          d="M50 75C50 75 25 55 25 35C25 25 35 15 50 25C65 15 75 25 75 35C75 55 50 75 50 75Z"
          stroke="#25BA7E"
          strokeWidth="2"
          fill="#25BA7E"
          opacity="0.1"
        />
        <path
          d="M50 75C50 75 25 55 25 35C25 25 35 15 50 25C65 15 75 25 75 35C75 55 50 75 50 75Z"
          stroke="#25BA7E"
          strokeWidth="2"
          fill="none"
        />
        <path d="M30 45L35 45L40 35L45 55L50 25L55 65L60 45L65 45L70 45" stroke="#25BA7E" strokeWidth="2" fill="none" />
        <rect x="47" y="30" width="6" height="2" fill="#25BA7E" opacity="0.3" />
        <rect x="49" y="28" width="2" height="6" fill="#25BA7E" opacity="0.3" />
      </svg>
    </div>
  )
}

function StethoscopeIllustration() {
  return (
    <div className="absolute bottom-16 left-8 z-0 opacity-60">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
      >
        <path
          d="M25 15C25 10.5817 28.5817 7 33 7H37C41.4183 7 45 10.5817 45 15V25C45 29.4183 41.4183 33 37 33H33C28.5817 33 25 29.4183 25 25V15Z"
          stroke="#25BA7E"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M55 15C55 10.5817 58.5817 7 63 7H67C71.4183 7 75 10.5817 75 15V25C75 29.4183 71.4183 33 67 33H63C58.5817 33 55 29.4183 55 25V15Z"
          stroke="#25BA7E"
          strokeWidth="2"
          fill="none"
        />
        <path d="M35 33V45C35 50 40 55 45 55H55C60 55 65 50 65 45V33" stroke="#25BA7E" strokeWidth="2" fill="none" />
        <path d="M50 55V70" stroke="#25BA7E" strokeWidth="2" fill="none" />
        <circle cx="50" cy="80" r="8" stroke="#25BA7E" strokeWidth="2" fill="none" />
        <circle cx="50" cy="80" r="4" fill="#25BA7E" opacity="0.3" />
      </svg>
    </div>
  )
}

function ThermometerIllustration() {
  return (
    <div className="absolute top-4 right-8 z-0 opacity-60">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
      >
        <rect x="45" y="15" width="10" height="60" stroke="#25BA7E" strokeWidth="2" fill="none" rx="5" />
        <line x1="55" y1="25" x2="60" y2="25" stroke="#25BA7E" strokeWidth="1" />
        <line x1="55" y1="35" x2="62" y2="35" stroke="#25BA7E" strokeWidth="1" />
        <line x1="55" y1="45" x2="60" y2="45" stroke="#25BA7E" strokeWidth="1" />
        <line x1="55" y1="55" x2="62" y2="55" stroke="#25BA7E" strokeWidth="1" />
        <line x1="55" y1="65" x2="60" y2="65" stroke="#25BA7E" strokeWidth="1" />
        <circle cx="50" cy="80" r="8" stroke="#25BA7E" strokeWidth="2" fill="#25BA7E" opacity="0.2" />
        <rect x="47" y="40" width="6" height="32" fill="#25BA7E" opacity="0.3" rx="3" />
      </svg>
    </div>
  )
}

function SyringeIllustration() {
  return (
    <div className="absolute bottom-16 right-8 z-0 opacity-60">
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
      >
        <rect x="20" y="40" width="50" height="20" stroke="#25BA7E" strokeWidth="2" fill="none" rx="2" />
        <rect x="15" y="45" width="10" height="10" stroke="#25BA7E" strokeWidth="2" fill="none" rx="1" />
        <line x1="10" y1="50" x2="15" y2="50" stroke="#25BA7E" strokeWidth="2" />
        <line x1="70" y1="50" x2="85" y2="50" stroke="#25BA7E" strokeWidth="2" />
        <path d="M85 50L90 48V52Z" fill="#25BA7E" opacity="0.3" />
        <line x1="30" y1="40" x2="30" y2="35" stroke="#25BA7E" strokeWidth="1" />
        <line x1="40" y1="40" x2="40" y2="35" stroke="#25BA7E" strokeWidth="1" />
        <line x1="50" y1="40" x2="50" y2="35" stroke="#25BA7E" strokeWidth="1" />
        <line x1="60" y1="40" x2="60" y2="35" stroke="#25BA7E" strokeWidth="1" />
        <rect x="22" y="42" width="25" height="16" fill="#25BA7E" opacity="0.2" rx="1" />
      </svg>
    </div>
  )
}

function SuccessModal({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl p-12 mx-4 max-w-md w-full text-center animate-in zoom-in-95 duration-300">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-50 to-emerald-50 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-[#25BA7E]"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Onboarding Complete!</h2>

        <p className="text-gray-500 text-lg mb-8">You'll be redirected to the homepage shortly…</p>

        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-[#25BA7E] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  )
}

const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required"

  const minLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)

  if (!minLength) return "Password must be at least 8 characters long"
  if (!hasUppercase) return "Password must contain at least one uppercase letter"
  if (!hasLowercase) return "Password must contain at least one lowercase letter"
  if (!hasNumber) return "Password must contain at least one number"
  if (!hasSpecialChar) return "Password must contain at least one special character (!@#$%^&*)"

  return undefined
}

const getPasswordStrength = (password: string) => {
  if (!password) return { strength: 0, label: "" }

  let strength = 0
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  ]

  strength = checks.filter(Boolean).length

  if (strength < 3) return { strength, label: "Weak", color: "text-red-500" }
  if (strength < 5) return { strength, label: "Medium", color: "text-orange-500" }
  return { strength, label: "Strong", color: "text-green-500" }
}

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [config, setConfig] = useState<AdminConfig>({
    step2Components: [],
    step3Components: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

  useEffect(() => {
    loadConfig()
  }, [])

  useEffect(() => {
    if (formData.email && currentStep === 1) {
      checkExistingUser()
    }
  }, [formData.email])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showSuccessModal) {
        window.location.href = "/"
      }
    }

    if (showSuccessModal) {
      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [showSuccessModal])

  const loadConfig = async () => {
    try {
      const response = await fetch("/api/config")
      const data = await response.json()
      setConfig(data)
    } catch (error) {
      console.error("Error loading config:", error)
      setConfig({
        step2Components: ["aboutMe"],
        step3Components: ["birthdate", "address"],
      })
    } finally {
      setIsLoading(false)
    }
  }

  const checkExistingUser = async () => {
    if (!formData.email) return

    try {
      const response = await fetch(`/api/users/check?email=${encodeURIComponent(formData.email)}`)
      if (response.ok) {
        const userData = await response.json()
        if (userData) {
          setFormData(userData)
          const hasStep2Data = config.step2Components.some((comp) => {
            if (comp === "aboutMe") return userData.aboutMe
            if (comp === "birthdate") return userData.birthdate
            if (comp === "address") return userData.address.street
            return false
          })

          if (!hasStep2Data) {
            setCurrentStep(2)
          } else {
            const hasStep3Data = config.step3Components.some((comp) => {
              if (comp === "aboutMe") return userData.aboutMe
              if (comp === "birthdate") return userData.birthdate
              if (comp === "address") return userData.address.street
              return false
            })
            setCurrentStep(hasStep3Data ? 1 : 3)
          }
        }
      }
    } catch (error) {
      console.error("Error checking existing user:", error)
    }
  }

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required"
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return undefined
  }

  const validateCurrentStep = (): boolean => {
    const errors: ValidationErrors = {}
    let isValid = true

    if (currentStep === 1) {
      const emailError = validateEmail(formData.email)
      const passwordError = validatePassword(formData.password)

      if (emailError) {
        errors.email = emailError
        isValid = false
      }
      if (passwordError) {
        errors.password = passwordError
        isValid = false
      }
    } else {
      const components = currentStep === 2 ? config.step2Components : config.step3Components

      components.forEach((component) => {
        if (component === "aboutMe" && !formData.aboutMe.trim()) {
          errors.aboutMe = "About Me is required"
          isValid = false
        }
        if (component === "birthdate" && !formData.birthdate) {
          errors.birthdate = "Date of Birth is required"
          isValid = false
        }
        if (component === "address") {
          if (!formData.address.street.trim()) {
            errors.street = "Street Address is required"
            isValid = false
          }
          if (!formData.address.city.trim()) {
            errors.city = "City is required"
            isValid = false
          }
          if (!formData.address.state) {
            errors.state = "State is required"
            isValid = false
          }
          if (!formData.address.zip.trim()) {
            errors.zip = "ZIP Code is required"
            isValid = false
          }
        }
      })
    }

    setValidationErrors(errors)
    return isValid
  }

  const updateFormData = (field: string, value: any) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    setValidationErrors((prev) => ({
      ...prev,
      [field.includes(".") ? field.split(".")[1] : field]: undefined,
    }))
  }

  const nextStep = async () => {
    if (!validateCurrentStep()) return

    if (currentStep === 1) {
      await saveProgress()
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const saveProgress = async () => {
    try {
      await fetch("/api/users/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
    } catch (error) {
      console.error("Error saving progress:", error)
    }
  }

  const handleSubmit = async () => {
    if (!validateCurrentStep()) return

    setIsSubmitting(true)
    try {
      await fetch("/api/users/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      setShowSuccessModal(true)

      setTimeout(() => {
        window.location.href = "/"
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error submitting form. Please try again.")
      setIsSubmitting(false)
    }
  }

  const renderComponent = (componentName: string) => {
    switch (componentName) {
      case "aboutMe":
        return (
          <div key="aboutMe" className="space-y-3">
            <Label htmlFor="aboutMe" className="text-gray-700 font-medium">
              About Me
            </Label>
            <Textarea
              id="aboutMe"
              value={formData.aboutMe}
              onChange={(e) => updateFormData("aboutMe", e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
                validationErrors.aboutMe ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {validationErrors.aboutMe && <p className="text-red-500 text-sm">{validationErrors.aboutMe}</p>}
          </div>
        )

      case "birthdate":
        return (
          <div key="birthdate" className="space-y-3">
            <Label htmlFor="birthdate" className="text-gray-700 font-medium">
              Date of Birth
            </Label>
            <Input
              id="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(e) => updateFormData("birthdate", e.target.value)}
              className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
                validationErrors.birthdate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {validationErrors.birthdate && <p className="text-red-500 text-sm">{validationErrors.birthdate}</p>}
          </div>
        )

      case "address":
        return (
          <div key="address" className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Address Information</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="street" className="text-gray-700 font-medium">
                  Street Address
                </Label>
                <Input
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => updateFormData("address.street", e.target.value)}
                  placeholder="Enter your street address"
                  className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
                    validationErrors.street ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {validationErrors.street && <p className="text-red-500 text-sm">{validationErrors.street}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-3">
                  <Label htmlFor="city" className="text-gray-700 font-medium">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.address.city}
                    onChange={(e) => updateFormData("address.city", e.target.value)}
                    placeholder="City"
                    className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
                      validationErrors.city ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {validationErrors.city && <p className="text-red-500 text-sm">{validationErrors.city}</p>}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="state" className="text-gray-700 font-medium">
                    State
                  </Label>
                  <select
                    id="state"
                    value={formData.address.state}
                    onChange={(e) => updateFormData("address.state", e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 bg-white ${
                      validationErrors.state
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
                  {validationErrors.state && <p className="text-red-500 text-sm">{validationErrors.state}</p>}
                </div>
                <div className="space-y-3">
                  <Label htmlFor="zip" className="text-gray-700 font-medium">
                    ZIP Code
                  </Label>
                  <Input
                    id="zip"
                    value={formData.address.zip}
                    onChange={(e) => updateFormData("address.zip", e.target.value)}
                    placeholder="ZIP"
                    className={`border-sage-200 focus:border-sage-400 focus:ring-sage-400 ${
                      validationErrors.zip ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {validationErrors.zip && <p className="text-red-500 text-sm">{validationErrors.zip}</p>}
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-3">Welcome to Zealthy</h2>
              <p className="text-gray-600 text-lg">Let's get started with your account</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email Address
                </Label>
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
                {validationErrors.email && <p className="text-red-500 text-sm">{validationErrors.email}</p>}
              </div>
              <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
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
                {formData.password && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            getPasswordStrength(formData.password).strength < 3
                              ? "bg-red-500"
                              : getPasswordStrength(formData.password).strength < 5
                                ? "bg-orange-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${(getPasswordStrength(formData.password).strength / 5) * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium ${getPasswordStrength(formData.password).color}`}>
                        {getPasswordStrength(formData.password).label}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div
                        className={`flex items-center space-x-2 ${formData.password.length >= 8 ? "text-green-600" : "text-gray-400"}`}
                      >
                        <span>{formData.password.length >= 8 ? "✓" : "○"}</span>
                        <span>At least 8 characters</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-gray-400"}`}
                      >
                        <span>{/[A-Z]/.test(formData.password) ? "✓" : "○"}</span>
                        <span>One uppercase letter</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${/[a-z]/.test(formData.password) ? "text-green-600" : "text-gray-400"}`}
                      >
                        <span>{/[a-z]/.test(formData.password) ? "✓" : "○"}</span>
                        <span>One lowercase letter</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${/\d/.test(formData.password) ? "text-green-600" : "text-gray-400"}`}
                      >
                        <span>{/\d/.test(formData.password) ? "✓" : "○"}</span>
                        <span>One number</span>
                      </div>
                      <div
                        className={`flex items-center space-x-2 ${/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) ? "text-green-600" : "text-gray-400"}`}
                      >
                        <span>{/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.password) ? "✓" : "○"}</span>
                        <span>One special character (!@#$%^&*)</span>
                      </div>
                    </div>
                  </div>
                )}
                {validationErrors.password && <p className="text-red-500 text-sm">{validationErrors.password}</p>}
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-3">Tell Us More</h2>
              <p className="text-gray-600 text-lg">Help us personalize your experience</p>
            </div>
            <div className="space-y-6">{config.step2Components.map((component) => renderComponent(component))}</div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-light text-gray-900 mb-3">Final Details</h2>
              <p className="text-gray-600 text-lg">Just a few more details to complete your profile</p>
            </div>
            <div className="space-y-6">{config.step3Components.map((component) => renderComponent(component))}</div>
          </div>
        )

      default:
        return null
    }
  }

  const isCurrentStepValid = (): boolean => {
    if (currentStep === 1) {
      return !validateEmail(formData.email) && !validatePassword(formData.password)
    }

    const components = currentStep === 2 ? config.step2Components : config.step3Components
    return components.every((component) => {
      if (component === "aboutMe") return formData.aboutMe.trim()
      if (component === "birthdate") return formData.birthdate
      if (component === "address") {
        return (
          formData.address.street.trim() &&
          formData.address.city.trim() &&
          formData.address.state &&
          formData.address.zip.trim()
        )
      }
      return true
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-green-100 flex items-center justify-center relative">
        <MedicalHeartIllustration />
        <StethoscopeIllustration />
        <ThermometerIllustration />
        <SyringeIllustration />
        <div className="text-center relative z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[93vh] bg-gradient-to-b from-white via-green-50 to-green-100 pt-24 md:pt-8 pb-4 px-6 relative">
      <MedicalHeartIllustration />
      <StethoscopeIllustration />
      <ThermometerIllustration />
      <SyringeIllustration />

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="mb-10 md:mb-2">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step < currentStep
                      ? "bg-sage-500 text-white"
                      : step === currentStep
                        ? "bg-sage-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? <Check className="h-5 w-5" /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-0.5 ml-4 ${step < currentStep ? "bg-sage-500" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-gray-500">Step {currentStep} of 3</span>
          </div>
        </div>

        <Card className="shadow-lg border-0 bg-white">
          <CardContent className="px-10 py-5">
            {renderStep()}

            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              {currentStep === 3 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isCurrentStepValid()}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-lg font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    "Complete Onboarding"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!isCurrentStepValid()}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-lg font-medium flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <SuccessModal isVisible={showSuccessModal} />
      </div>
    </div>
  )
}
