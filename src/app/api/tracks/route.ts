import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("playlistDB")
    const tracks = await db.collection("tracks").find().sort({ sequence: 1 }).toArray()

    return NextResponse.json(tracks)
  } catch (error) {
    console.error("GET error:", error)
    return new NextResponse("Failed to fetch tracks", { status: 500 })
  }
}

