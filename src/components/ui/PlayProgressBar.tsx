"use client"
import { useEffect, useState, MutableRefObject } from "react"

type Props = {
  audioRef: MutableRefObject<HTMLAudioElement | null>,
  className?: string
  
}

export default function PlayProgressBar({ audioRef, className = "" }: Props) {
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration || 0)
      setProgress((audio.currentTime / audio.duration) * 100 || 0)
    }

    audio.addEventListener("timeupdate", updateProgress)
    audio.addEventListener("loadedmetadata", updateProgress)

    return () => {
      audio.removeEventListener("timeupdate", updateProgress)
      audio.removeEventListener("loadedmetadata", updateProgress)
    }
  }, [audioRef])

  const format = (n: number) => {
    const m = Math.floor(n / 60)
    const s = Math.floor(n % 60)
    return `${m}:${s < 10 ? "0" + s : s}`
  }

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percent = clickX / rect.width
    audio.currentTime = percent * audio.duration
  }

  return (
    <div className={` ${className}`}>

      <div className="flex justify-between text-xs text-white/60 px-1 pb-1 font-mono">
        <span>{format(currentTime)}</span>
        <span>{format(duration)}</span>
      </div>
      <div
        className="w-full h-full bg-gray-700 rounded-full overflow-hidden cursor-pointer"
        onClick={seek}
      >
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300 shadow-md transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}


