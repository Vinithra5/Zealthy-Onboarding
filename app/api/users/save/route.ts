import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { default: clientPromise } = await import("@/lib/mongodb")

    const client = await clientPromise
    const db = client.db("zealthy-onboarding")
    const userData = await request.json()

    const result = await db.collection("users").updateOne(
      { email: userData.email },
      {
        $set: {
          ...userData,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
          isCompleted: false,
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true, id: result.upsertedId })
  } catch {
    return NextResponse.json({ error: "Failed to save user" }, { status: 500 })
  }
}
