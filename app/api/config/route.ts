import { NextResponse } from "next/server"

export async function GET() {
  try {
    const { default: clientPromise } = await import("@/lib/mongodb")

    const client = await clientPromise
    const db = client.db("zealthy-onboarding")

    let config = await db.collection("config").findOne({ type: "step-config" })

    if (!config) {
      const defaultConfig = {
        type: "step-config",
        step2Components: ["aboutMe"],
        step3Components: ["birthdate", "address"],
        createdAt: new Date(),
      }

      await db.collection("config").insertOne(defaultConfig)
      config = defaultConfig
    }

    return NextResponse.json({
      step2Components: config.step2Components || ["aboutMe"],
      step3Components: config.step3Components || ["birthdate", "address"],
    })
  } catch {
    return NextResponse.json({
      step2Components: ["aboutMe"],
      step3Components: ["birthdate", "address"],
    })
  }
}

export async function POST(request: Request) {
  try {
    const { default: clientPromise } = await import("@/lib/mongodb")

    const client = await clientPromise
    const db = client.db("zealthy-onboarding")
    const { step2Components, step3Components } = await request.json()

    await db.collection("config").updateOne(
      { type: "step-config" },
      {
        $set: {
          step2Components,
          step3Components,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 })
  }
}
