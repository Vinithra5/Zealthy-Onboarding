import { NextResponse } from "next/server"

export async function GET() {
  try {
    const hasMongoUri = !!process.env.MONGODB_URI
    const mongoUriLength = process.env.MONGODB_URI?.length || 0

    return NextResponse.json({
      status: "API working",
      environment: process.env.NODE_ENV,
      hasMongoUri,
      mongoUriLength,
      timestamp: new Date().toISOString(),
    })
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Test API failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
