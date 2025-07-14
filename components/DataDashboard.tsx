"use client"

import { Database, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ErrorMessage } from "@/components/ErrorMessage"
import { useUserData } from "@/hooks/useUserData"
import { DataStats } from "./DataStats"
import { UserDataTable } from "./UserDataTable"

export const DataDashboard = () => {
  const { users, isLoading, isRefreshing, error, refreshData, testAPI, isTesting } = useUserData()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600 mt-4">Running diagnostics...</p>
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
            <div className="mt-6 max-w-2xl mx-auto">
              <ErrorMessage title="Database Connection Error" message={error} />
              <div className="mt-3 space-x-2 flex justify-center">
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
          )}
        </div>

        <DataStats users={users} />

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
            {users.length === 0 && error ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Unable to load data due to connection error.</p>
              </div>
            ) : (
              <UserDataTable users={users} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
