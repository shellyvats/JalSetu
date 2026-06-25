import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: calculations, error } = await supabase
    .from("calculations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ calculations })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    // Calculate annual harvest potential
    const annualHarvestPotential =
      body.roof_area * body.annual_rainfall * body.runoff_coefficient * body.gutter_efficiency * 0.001 // Convert to cubic meters

    // Calculate monthly harvest based on rainfall data
    const monthlyHarvest = body.monthly_rainfall
      ? Object.entries(body.monthly_rainfall).reduce(
          (acc, [month, rainfall]) => {
            acc[month] =
              body.roof_area * (rainfall as number) * body.runoff_coefficient * body.gutter_efficiency * 0.001
            return acc
          },
          {} as Record<string, number>,
        )
      : {}

    // Calculate cost savings (assuming water cost of ₹20 per 1000L)
    const costSavings = annualHarvestPotential * 20

    // Calculate environmental impact
    const environmentalImpact = {
      co2_saved: annualHarvestPotential * 0.5, // kg CO2 saved per cubic meter
      groundwater_recharged: annualHarvestPotential * 0.8, // 80% goes to groundwater recharge
    }

    const calculationData = {
      ...body,
      user_id: user.id,
      annual_harvest_potential: annualHarvestPotential,
      monthly_harvest: monthlyHarvest,
      cost_savings: costSavings,
      environmental_impact: environmentalImpact,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    const { data: calculation, error } = await supabase.from("calculations").insert(calculationData).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ calculation })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
