import { getPasswordStrength } from "@/utils/validation"

interface PasswordStrengthIndicatorProps {
  password: string
}

const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
  <div className={`flex items-center space-x-2 ${met ? "text-green-600" : "text-gray-400"}`}>
    <span>{met ? "✓" : "○"}</span>
    <span>{text}</span>
  </div>
)

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  if (!password) return null

  const { strength, label, color } = getPasswordStrength(password)

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              strength < 3 ? "bg-red-500" : strength < 5 ? "bg-orange-500" : "bg-green-500"
            }`}
            style={{ width: `${(strength / 5) * 100}%` }}
          />
        </div>
        <span className={`text-sm font-medium ${color}`}>{label}</span>
      </div>
      <div className="text-xs text-gray-600 space-y-1">
        <PasswordRequirement met={password.length >= 8} text="At least 8 characters" />
        <PasswordRequirement met={/[A-Z]/.test(password)} text="One uppercase letter" />
        <PasswordRequirement met={/[a-z]/.test(password)} text="One lowercase letter" />
        <PasswordRequirement met={/\d/.test(password)} text="One number" />
        <PasswordRequirement
          met={/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)}
          text="One special character (!@#$%^&*)"
        />
      </div>
    </div>
  )
}
