"use client"

import { useState, useEffect } from "react"
import type { UserData, ApiError, TestResult } from "@/types"
import { API_ENDPOINTS } from "@/constants"

export const useUserData = () => {
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
      const response = await fetch(API_ENDPOINTS.TEST, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
      })

      if (response.ok) {
        const data = await response.json()
        setTestResult(data)
      } else {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch {
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

      const response = await fetch(API_ENDPOINTS.USERS, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-cache",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const responseText = await response.text()
      let data

      try {
        data = JSON.parse(responseText)
      } catch {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setError("Request timed out after 30 seconds")
        } else if (error.message?.includes("fetch")) {
          setError(`Network error: ${error.message}`)
        } else {
          setError(error.message)
        }
      } else {
        setError("Failed to load users")
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

  return {
    users,
    isLoading,
    isRefreshing,
    error,
    testResult,
    isTesting,
    refreshData,
    testAPI,
  }
}
