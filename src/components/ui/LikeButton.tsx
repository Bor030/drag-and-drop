"use client"

import { useEffect, useState } from "react"
import { ThumbsUp } from "lucide-react"

export default function LikeButton() {
  const [likes, setLikes] = useState<number>(0)
  const [clicked, setClicked] = useState<boolean>(false)

  useEffect(() => {
   
  // Provera da li je korisnik već lajkovao

    const hasLiked = localStorage.getItem("hasLiked") === "true"
    setClicked(hasLiked) 


    fetch("/api/like")
      .then(res => res.json())
      .then(data => setLikes(data.count))
      .catch(err => console.error("Failed to fetch likes:", err))
  }, [])

  const handleClick = async () => {
    if (clicked) return

    setClicked(true)
    localStorage.setItem("hasLiked", "true")
    setLikes(prev => prev + 1) // Optimistički update

    try {
      const res = await fetch("/api/like", { method: "POST" })
      const data = await res.json()
      if (typeof data.count === "number") {
        setLikes(data.count) // fallback
      }
    } catch (err) {
      console.error("Failed to like:", err)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={clicked}
      className={`flex items-center gap-2 text-white px-4 py-2 rounded transition-transform duration-200 mb-4 ${
        clicked
          ? "bg-rose-700 scale-105 shadow-md shadow-rose-500/50"
          : "bg-gray-700 hover:bg-gray-600 hover:scale-105"
      }`}
    >
      <ThumbsUp size={20} />
       <span
          key={likes} 
          className="animate-bounce-like transition-transform text-white"
        >
          {likes}
       </span>


    </button>
  )
}


