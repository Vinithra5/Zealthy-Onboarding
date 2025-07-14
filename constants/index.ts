export const US_STATES = [
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
] as const

export const AVAILABLE_COMPONENTS = [
  { id: "aboutMe", label: "About Me", description: "Textarea for personal description" },
  { id: "address", label: "Address", description: "Street, city, state, and ZIP fields" },
  { id: "birthdate", label: "Birthdate", description: "Date picker for date of birth" },
] as const

export const INITIAL_FORM_DATA = {
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
} as const

export const DEFAULT_CONFIG = {
  step2Components: ["aboutMe"],
  step3Components: ["birthdate", "address"],
} as const

export const API_ENDPOINTS = {
  CONFIG: "/api/config",
  USERS: "/api/users",
  USERS_SAVE: "/api/users/save",
  USERS_COMPLETE: "/api/users/complete",
  USERS_CHECK: "/api/users/check",
  TEST: "/api/test",
} as const

export const VALIDATION_RULES = {
  PASSWORD: {
    MIN_LENGTH: 8,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL_CHAR: true,
  },
  ADMIN: {
    MIN_COMPONENTS: 1,
    MAX_COMPONENTS: 2,
  },
} as const
