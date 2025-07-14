import type { UserData } from "@/types"
import { formatDate, formatAddress } from "@/utils/formatters"

interface UserDataTableProps {
  users: UserData[]
}

export const UserDataTable = ({ users }: UserDataTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 text-lg">No data available. Complete the onboarding flow to see entries here.</p>
      </div>
    )
  }

  return (
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
              <td className="p-6 text-gray-600">{user?.birthdate ? formatDate(user.birthdate) : "Not provided"}</td>
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
  )
}
