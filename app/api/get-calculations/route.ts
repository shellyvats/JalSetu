import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email parameter required" }, { status: 400 })
    }

    const { data: calculations, error } = await supabase
      .from("calculations")
      .select("*")
      .eq("user_email", email)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching calculations:", error)
      return NextResponse.json({ error: "Failed to fetch calculations" }, { status: 500 })
    }

    return NextResponse.json({ calculations })
  } catch (error) {
    console.error("Error in get-calculations API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
