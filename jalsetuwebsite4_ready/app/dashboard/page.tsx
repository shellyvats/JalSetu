import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import ChatBox from "./ChatBox"

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: calculations } = await supabase
    .from("calculations")
    .select("*")
    .eq("user_id", data.user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 relative">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Welcome to Your JalSetu Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your rainwater harvesting calculations and reports</p>
          </div>
          <form action="/auth/signout" method="post">
            <Button variant="outline" type="submit">
              Sign Out
            </Button>
          </form>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">New Calculation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Start a new rainwater harvesting calculation</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href="/calculator">Start Calculator</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">My Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">View and manage your saved calculations</p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/dashboard/calculations">View All</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Update your profile and preferences</p>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/dashboard/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent calculations */}
        {calculations && calculations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Calculations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {calculations.map((calc) => (
                  <div key={calc.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{calc.calculation_name || "Untitled Calculation"}</h4>
                      <p className="text-sm text-gray-600">
                        {calc.roof_area}m² • {calc.annual_harvest_potential?.toFixed(0)} L/year
                      </p>
                    </div>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/dashboard/calculations/${calc.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Floating Chat Box */}
      <ChatBox userName={data.user.email || "User"} />
    </div>
  )
}

