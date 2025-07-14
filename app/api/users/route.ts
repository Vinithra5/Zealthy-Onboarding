import { NextResponse } from "next/server"

export async function GET() {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  }

  try {
    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        {
          error: "Database configuration error",
          message: "MONGODB_URI environment variable is missing",
          users: [],
        },
        { status: 500, headers },
      )
    }

    let clientPromise
    try {
      const mongoModule = await import("@/lib/mongodb")
      clientPromise = mongoModule.default
    } catch (importError: unknown) {
      return NextResponse.json(
        {
          error: "MongoDB module import failed",
          message: importError instanceof Error ? importError.message : "Failed to import MongoDB client",
          users: [],
        },
        { status: 500, headers },
      )
    }

    let client
    try {
      client = await Promise.race([
        clientPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timeout after 15 seconds")), 15000)),
      ])
    } catch (connectionError: unknown) {
      return NextResponse.json(
        {
          error: "Database connection failed",
          message: connectionError instanceof Error ? connectionError.message : "Failed to connect to MongoDB",
          users: [],
        },
        { status: 500, headers },
      )
    }

    let db
    try {
      db = client.db("zealthy-onboarding")
    } catch (dbError: unknown) {
      return NextResponse.json(
        {
          error: "Database access failed",
          message: dbError instanceof Error ? dbError.message : "Failed to access database",
          users: [],
        },
        { status: 500, headers },
      )
    }

    let users
    try {
      users = await Promise.race([
        db.collection("users").find({}).sort({ createdAt: -1 }).limit(50).toArray(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Query timeout after 10 seconds")), 10000)),
      ])
    } catch (queryError: unknown) {
      return NextResponse.json(
        {
          error: "Database query failed",
          message: queryError instanceof Error ? queryError.message : "Failed to query users",
          users: [],
        },
        { status: 500, headers },
      )
    }

    const safeUsers = Array.isArray(users) ? users : []

    return NextResponse.json(safeUsers, { headers })
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "An unexpected error occurred",
        users: [],
      },
      { status: 500, headers },
    )
  }
}
