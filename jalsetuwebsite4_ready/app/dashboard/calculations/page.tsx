"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Calculation {
  id: string
  calculation_name: string | null
  roof_area: number
  annual_rainfall: number
  annual_harvest_potential: number
  cost_savings: number
  building_type: string | null
  roof_material: string | null
  created_at: string
}

export default function CalculationsPage() {
  const [calculations, setCalculations] = useState<Calculation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchCalculations()
  }, [])

  const fetchCalculations = async () => {
    try {
      const response = await fetch("/api/calculations")
      if (response.status === 401) {
        router.push("/auth/login")
        return
      }

      const data = await response.json()
      setCalculations(data.calculations || [])
    } catch (error) {
      setError("Failed to load calculations")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this calculation?")) {
      return
    }

    try {
      const response = await fetch(`/api/calculations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCalculations(calculations.filter((calc) => calc.id !== id))
      } else {
        setError("Failed to delete calculation")
      }
    } catch (error) {
      setError("Failed to delete calculation")
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading calculations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">My Calculations</h1>
            <p className="text-gray-600 mt-2">View and manage your rainwater harvesting calculations</p>
          </div>
          <div className="flex gap-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/calculator">New Calculation</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </div>

        {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-6">{error}</div>}

        {calculations.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">No calculations yet</h3>
              <p className="text-gray-600 mb-6">Start by creating your first rainwater harvesting calculation</p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/calculator">Create First Calculation</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calculations.map((calculation) => (
              <Card key={calculation.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{calculation.calculation_name || "Untitled Calculation"}</CardTitle>
                  <div className="flex gap-2">
                    {calculation.building_type && <Badge variant="secondary">{calculation.building_type}</Badge>}
                    {calculation.roof_material && <Badge variant="outline">{calculation.roof_material}</Badge>}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Roof Area:</span>
                      <span className="font-medium">{calculation.roof_area}m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Annual Rainfall:</span>
                      <span className="font-medium">{calculation.annual_rainfall}mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Harvest Potential:</span>
                      <span className="font-medium text-blue-600">
                        {calculation.annual_harvest_potential?.toFixed(0)} L/year
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Cost Savings:</span>
                      <span className="font-medium text-green-600">₹{calculation.cost_savings?.toFixed(0)}/year</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(calculation.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button asChild size="sm" className="flex-1">
                      <Link href={`/dashboard/calculations/${calculation.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(calculation.id)}>
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
