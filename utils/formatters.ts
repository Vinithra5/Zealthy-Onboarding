export const formatDate = (dateString: string): string => {
  try {
    return new Date(dateString).toLocaleDateString()
  } catch {
    return "Invalid date"
  }
}

export const formatAddress = (address?: {
  street: string
  city: string
  state: string
  zip: string
}): string => {
  if (!address || !address.street) return "Not provided"
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`
}
