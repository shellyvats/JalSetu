import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    const body = await request.json()
    const { formData, results, userData } = body

    const { data: calculation, error: calcError } = await supabase
      .from("calculations")
      .insert({
        user_name: userData.name,
        user_email: userData.email,
        user_phone: userData.phone,
        roof_area: Number.parseFloat(formData.roofArea),
        roof_material: formData.roofMaterial,
        building_type: formData.buildingType,
        location: formData.location,
        gps_coordinates: formData.gpsCoords,
        harvestable_water: results.harvestableWater,
        tank_size: results.tankSize,
        system_cost: results.systemCost,
        annual_savings: results.costSavings,
        roi_years: results.roi,
        carbon_offset: results.carbonOffset,
        water_security_level: results.waterSecurity,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (calcError) {
      console.error("Error saving calculation:", calcError)
      return NextResponse.json({ error: "Failed to save calculation" }, { status: 500 })
    }

    return NextResponse.json({ success: true, calculationId: calculation.id })
  } catch (error) {
    console.error("Error in save-calculation API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
