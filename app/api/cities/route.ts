import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()

  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const country = searchParams.get("country")
  const state = searchParams.get("state")

  let query = supabase.from("city_rainfall_data").select("*").order("city_name")

  if (search) {
    query = query.ilike("city_name", `%${search}%`)
  }

  if (country) {
    query = query.eq("country", country)
  }

  if (state) {
    query = query.eq("state", state)
  }

  const { data: cities, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ cities })
}
