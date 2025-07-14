import type { FormData, ValidationErrors, PasswordStrength } from "@/types"
import { VALIDATION_RULES } from "@/constants"

export const validateEmail = (email: string): string | undefined => {
  if (!email.trim()) return "Email is required"
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return "Please enter a valid email address"
  return undefined
}

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required"

  const { MIN_LENGTH, REQUIRE_UPPERCASE, REQUIRE_LOWERCASE, REQUIRE_NUMBER, REQUIRE_SPECIAL_CHAR } =
    VALIDATION_RULES.PASSWORD

  const minLength = password.length >= MIN_LENGTH
  const hasUppercase = REQUIRE_UPPERCASE ? /[A-Z]/.test(password) : true
  const hasLowercase = REQUIRE_LOWERCASE ? /[a-z]/.test(password) : true
  const hasNumber = REQUIRE_NUMBER ? /\d/.test(password) : true
  const hasSpecialChar = REQUIRE_SPECIAL_CHAR ? /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password) : true

  if (!minLength) return `Password must be at least ${MIN_LENGTH} characters long`
  if (!hasUppercase) return "Password must contain at least one uppercase letter"
  if (!hasLowercase) return "Password must contain at least one lowercase letter"
  if (!hasNumber) return "Password must contain at least one number"
  if (!hasSpecialChar) return "Password must contain at least one special character (!@#$%^&*)"

  return undefined
}

export const getPasswordStrength = (password: string): PasswordStrength => {
  if (!password) return { strength: 0, label: "", color: "" }

  const checks = [
    password.length >= VALIDATION_RULES.PASSWORD.MIN_LENGTH,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  ]

  const strength = checks.filter(Boolean).length

  if (strength < 3) return { strength, label: "Weak", color: "text-red-500" }
  if (strength < 5) return { strength, label: "Medium", color: "text-orange-500" }
  return { strength, label: "Strong", color: "text-green-500" }
}

export const validateFormStep = (formData: FormData, step: number, stepComponents: string[]): ValidationErrors => {
  const errors: ValidationErrors = {}

  if (step === 1) {
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    if (emailError) errors.email = emailError
    if (passwordError) errors.password = passwordError
  } else {
    stepComponents.forEach((component) => {
      if (component === "aboutMe" && !formData.aboutMe.trim()) {
        errors.aboutMe = "About Me is required"
      }
      if (component === "birthdate" && !formData.birthdate) {
        errors.birthdate = "Date of Birth is required"
      }
      if (component === "address") {
        if (!formData.address.street.trim()) errors.street = "Street Address is required"
        if (!formData.address.city.trim()) errors.city = "City is required"
        if (!formData.address.state) errors.state = "State is required"
        if (!formData.address.zip.trim()) errors.zip = "ZIP Code is required"
      }
    })
  }

  return errors
}
