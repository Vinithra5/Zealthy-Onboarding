export interface FormData {
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

export interface AdminConfig {
  step2Components: string[]
  step3Components: string[]
}

export interface ValidationErrors {
  email?: string
  password?: string
  aboutMe?: string
  birthdate?: string
  street?: string
  city?: string
  state?: string
  zip?: string
}

export interface UserData {
  _id: string
  email: string
  aboutMe?: string
  birthdate?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
  }
  createdAt: string
  completedAt?: string
  isCompleted: boolean
}

export interface ApiError {
  error: string
  message?: string
  users: UserData[]
}

export interface TestResult {
  status: string
  environment: string
  hasMongoUri: boolean
  mongoUriLength: number
  timestamp: string
}

export interface ComponentConfig {
  id: string
  label: string
  description: string
}

export interface PasswordStrength {
  strength: number
  label: string
  color: string
}
