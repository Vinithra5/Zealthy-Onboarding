import { MongoClient } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

const uri = process.env.MONGODB_URI

// Updated options - removed unsupported buffer options
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  // SSL/TLS configuration for MongoDB Atlas
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
  // Retry configuration
  retryWrites: true,
  retryReads: true,
  // Connection pool settings for serverless
  minPoolSize: 0,
  maxIdleTimeMS: 30000,
  waitQueueTimeoutMS: 5000,
  // Removed these unsupported options:
  // bufferMaxEntries: 0,
  // bufferCommands: false,
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Ensure this only runs on server-side
if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "development") {
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect().catch((err) => {
        console.error("MongoDB connection error:", err)
        throw err
      })
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    client = new MongoClient(uri, options)
    clientPromise = client.connect().catch((err) => {
      console.error("MongoDB connection error:", err)
      throw err
    })
  }
} else {
  // Fallback for client-side (should never be used)
  clientPromise = Promise.reject(new Error("MongoDB client should only be used server-side"))
}

export default clientPromise
