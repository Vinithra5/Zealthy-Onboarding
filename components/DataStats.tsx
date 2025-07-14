import { Card, CardContent } from "@/components/ui/card"
import type { UserData } from "@/types"

interface DataStatsProps {
  users: UserData[]
}

export const DataStats = ({ users }: DataStatsProps) => {
  const totalUsers = users.length
  const completedUsers = users.filter((u) => u?.isCompleted).length
  const inProgressUsers = users.filter((u) => !u?.isCompleted).length

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="text-4xl font-light text-gray-900 mb-2">{totalUsers}</div>
          <p className="text-gray-600 font-medium">Total Users</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="text-4xl font-light text-sage-600 mb-2">{completedUsers}</div>
          <p className="text-gray-600 font-medium">Completed</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg border-0 bg-white">
        <CardContent className="p-8 text-center">
          <div className="text-4xl font-light text-orange-500 mb-2">{inProgressUsers}</div>
          <p className="text-gray-600 font-medium">In Progress</p>
        </CardContent>
      </Card>
    </div>
  )
}
