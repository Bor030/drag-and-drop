import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("playlistDB")

    const doc = await db.collection("likes").findOne({ slug: "main-like-button" })

    return NextResponse.json({ count: doc?.count || 0 })
  } catch (error) {
    console.error("GET error:", error)
    return new NextResponse("Failed to fetch likes", { status: 500 })
  }
}

export async function POST() {
  try {
    const client = await clientPromise
    const db = client.db("playlistDB")

    const updated = await db.collection("likes").findOneAndUpdate(
      { slug: "main-like-button" },
      { $inc: { count: 1 } },
      {
        upsert: true,
        returnDocument: "after", // koristi ovo (MongoDB Node v4+)
      }
    )

    const count = updated?.value?.count

    // fallback ako updated.value ne postoji (dešava se kod prvog upserta)
    if (typeof count !== "number") {
      const fallbackDoc = await db.collection("likes").findOne({ slug: "main-like-button" })
      return NextResponse.json({ count: fallbackDoc?.count || 0 })
    }

    return NextResponse.json({ count })
  } catch (error) {
    console.error("POST error:", error)
    return new NextResponse("Failed to update like", { status: 500 })
  }
}


