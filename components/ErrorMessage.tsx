import { XCircle } from "lucide-react"

interface ErrorMessageProps {
  title?: string
  message: string
  className?: string
}

export const ErrorMessage = ({ title = "Error", message, className = "" }: ErrorMessageProps) => {
  return (
    <div className={`flex items-start space-x-3 p-4 bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
      <div className="text-left">
        <h3 className="font-medium text-red-800">{title}</h3>
        <p className="text-red-600 text-sm mt-1">{message}</p>
      </div>
    </div>
  )
}
