"use client"

import { useState, useEffect } from "react"
import { Database, RefreshCw, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UserData {
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

interface ApiError {
  error: string
  message?: string
  users: UserData[]
}

interface TestResult {
  status: string
  environment: string
  hasMongoUri: boolean
  mongoUriLength: number
  timestamp: string
}

export default function DataPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isTesting, setIsTesting] = useState(false)

  useEffect(() => {
    runDiagnostics()
  }, [])

  const runDiagnostics = async () => {
    await testAPI()
    await loadUsers()
  }

  const testAPI = async () => {
    setIsTesting(true)
    try {
      const response = await fetch("/api/test", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      })

      if (response.ok) {
        const data = await response.json()
        setTestResult(data)
      } else {
        setTestResult({
          status: "API test failed",
          environment: "unknown",
          hasMongoUri: false,
          mongoUriLength: 0,
          timestamp: new Date().toISOString(),
        })
      }
    } catch (error) {
      setTestResult({
        status: "API test error",
        environment: "unknown",
        hasMongoUri: false,
        mongoUriLength: 0,
        timestamp: new Date().toISOString(),
      })
    } finally {
      setIsTesting(false)
    }
  }

  const loadUsers = async () => {
    try {
      setError(null)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000)

      const response = await fetch("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      const responseText = await response.text()

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${responseText}`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}`)
      }

      if (Array.isArray(data)) {
        setUsers(data)
      } else if (data && typeof data === "object") {
        const apiError = data as ApiError

        if (Array.isArray(apiError.users)) {
          setUsers(apiError.users)
        } else {
          setUsers([])
        }

        if (apiError.error) {
          setError(`${apiError.error}: ${apiError.message || "Unknown error"}`)
        }
      } else {
        setUsers([])
        setError("Invalid response format from server")
      }
    } catch (error) {
      if (error.name === "AbortError") {
        setError("Request timed out after 30 seconds")
      } else if (error.message?.includes("fetch")) {
        setError(`Network error: ${error.message}`)
      } else {
        setError(error instanceof Error ? error.message : "Failed to load users")
      }

      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    setIsRefreshing(true)
    await loadUsers()
    setIsRefreshing(false)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return "Invalid date"
    }
  }

  const formatAddress = (address?: {
    street: string
    city: string
    state: string
    zip: string
  }) => {
    if (!address || !address.street) return "Not provided"
    return `${address.street}, ${address.city}, ${address.state} ${address.zip}`
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Running diagnostics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Database className="h-8 w-8 text-sage-500" />
            <h1 className="text-4xl font-light text-gray-900">User Data</h1>
          </div>
          <p className="text-gray-600 text-lg">View submitted onboarding data from MongoDB</p>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-medium text-red-800">Database Connection Error</h3>
                  <p className="text-red-600 text-sm mt-1">{error}</p>

                  <div className="mt-3 space-x-2">
                    <Button
                      onClick={refreshData}
                      disabled={isRefreshing}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isRefreshing ? "Retrying..." : "Retry Connection"}
                    </Button>
                    <Button
                      onClick={testAPI}
                      disabled={isTesting}
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-700 bg-transparent"
                    >
                      {isTesting ? "Testing..." : "Test API"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">{users.length}</div>
              <p className="text-gray-600 font-medium">Total Users</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-light text-sage-600 mb-2">{users.filter((u) => u?.isCompleted).length}</div>
              <p className="text-gray-600 font-medium">Completed</p>
            </CardContent>
          </Card>
          <Card className="shadow-lg border-0 bg-white">
            <CardContent className="p-8 text-center">
              <div className="text-4xl font-light text-orange-500 mb-2">
                {users.filter((u) => !u?.isCompleted).length}
              </div>
              <p className="text-gray-600 font-medium">In Progress</p>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-lg border-0 bg-white">
          <CardHeader className="bg-sage-50 border-b border-sage-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900">Submitted Data ({users.length} records)</CardTitle>
                <CardDescription className="text-gray-600">
                  All user submissions from the onboarding flow
                </CardDescription>
              </div>
              <Button
                onClick={refreshData}
                disabled={isRefreshing}
                variant="outline"
                className="border-sage-200 text-sage-700 hover:bg-sage-50 bg-transparent"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {users.length === 0 && !error ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No data available. Complete the onboarding flow to see entries here.
                </p>
              </div>
            ) : users.length === 0 && error ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Unable to load data due to connection error.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-6 font-medium text-gray-900">Email</th>
                      <th className="text-left p-6 font-medium text-gray-900">About Me</th>
                      <th className="text-left p-6 font-medium text-gray-900">Birthdate</th>
                      <th className="text-left p-6 font-medium text-gray-900">Address</th>
                      <th className="text-left p-6 font-medium text-gray-900">Status</th>
                      <th className="text-left p-6 font-medium text-gray-900">Created</th>
                      <th className="text-left p-6 font-medium text-gray-900">Completed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user?._id || index}
                        className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="p-6">
                          <div className="font-medium text-gray-900">{user?.email || "N/A"}</div>
                        </td>
                        <td className="p-6 text-gray-600 max-w-xs">
                          <div className="truncate">{user?.aboutMe || "Not provided"}</div>
                        </td>
                        <td className="p-6 text-gray-600">
                          {user?.birthdate ? formatDate(user.birthdate) : "Not provided"}
                        </td>
                        <td className="p-6 text-gray-600 max-w-xs">
                          <div className="truncate">{formatAddress(user?.address)}</div>
                        </td>
                        <td className="p-6">
                          <span
                            className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${
                              user?.isCompleted ? "bg-sage-100 text-sage-800" : "bg-orange-100 text-orange-800"
                            }`}
                          >
                            {user?.isCompleted ? "Completed" : "In Progress"}
                          </span>
                        </td>
                        <td className="p-6 text-gray-600">{user?.createdAt ? formatDate(user.createdAt) : "N/A"}</td>
                        <td className="p-6 text-gray-600">{user?.completedAt ? formatDate(user.completedAt) : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
