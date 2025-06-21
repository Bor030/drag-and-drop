"use client"
import { useAudioPlayer } from "@/context/AudioPlayerContext"

type Props = {
  src: string
}

export default function PlayPauseButton({ src }: Props) {
  const { currentSrc, isPlaying, play, pause } = useAudioPlayer()

  const togglePlay = () => {
    if (isPlaying && currentSrc === src) {
      pause()
    } else {
      play(src)
    }
  }

  const isCurrent = currentSrc === src

  return (
 <div
  className={`playpause ${!isPlaying || !isCurrent ? "pause" : ""}`}
  onClick={togglePlay}
/>

  )
}







