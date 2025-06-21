import { List } from "@/components/List"
import type { Item } from "@/components/List"
import LikeButton from "@/components/ui/LikeButton"

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/tracks`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch tracks")
  }

  const data: Item[] = await res.json()

  return (
  <div className="min-h-screen bg-[url('../../public/bground.jpg')] bg-cover bg-center bg-no-repeat bg-fixed">

  <List data={data} />

 <div className="flex flex-col items-end w-full max-w-2xl mx-auto px-4 mt-4">
  <LikeButton />
</div>


  </div>

)
}
  

















