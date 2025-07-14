import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const { default: clientPromise } = await import("@/lib/mongodb")

    const client = await clientPromise
    const db = client.db("zealthy-onboarding")
    const user = await db.collection("users").findOne({ email })

    return NextResponse.json(user)
  } catch {
    return NextResponse.json({ error: "Failed to check user" }, { status: 500 })
  }
}
