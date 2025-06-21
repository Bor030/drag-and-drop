"use client"

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  ReactNode,
} from "react"
import type { Item } from "@/components/List"

type AudioPlayerContextType = {
  currentSrc: string | null
  isPlaying: boolean
  play: (src: string) => void
  pause: () => void
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
  setPlaylist: (list: Item[]) => void
  isRepeating: boolean
  setIsRepeating: (value: boolean) => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null)

export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext)
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider")
  return ctx
}

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [currentSrc, setCurrentSrc] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playlist, setPlaylist] = useState<Item[]>([])
  const [isRepeating, setIsRepeating] = useState(false)

  const currentSrcRef = useRef<string | null>(null)
  const playlistRef = useRef<Item[]>([])

  // Sync REF sa STATE
  useEffect(() => {
    currentSrcRef.current = currentSrc
  }, [currentSrc])

  useEffect(() => {
    playlistRef.current = playlist
  }, [playlist])

  const play = (src: string) => {
    const audio = audioRef.current
    if (!audio) return

    const isDifferent = !audio.src.includes(src)

    if (isDifferent || isRepeating) {
      audio.src = src
      audio.load()
    }

    setCurrentSrc(src)
    audio.play()
    setIsPlaying(true)
  }

  const pause = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setIsPlaying(false)
  }

  const playNext = () => {
    const current = currentSrcRef.current
    const list = playlistRef.current

    if (!current || list.length === 0) return

    const currentIndex = list.findIndex(item => item.src === current)
    const nextItem = list[currentIndex + 1]

    if (nextItem) {
      play(nextItem.src)
    } else {
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      const currentIndex = playlistRef.current.findIndex(
        item => item.src === currentSrcRef.current
      )

      if (isRepeating && currentSrcRef.current) {
        play(currentSrcRef.current)
      } else {
        const nextItem = playlistRef.current[currentIndex + 1]
        if (nextItem) {
          play(nextItem.src)
        } else {
          setIsPlaying(false)
        }
      }
    }

    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("ended", handleEnded)
    }
  }, [isRepeating])

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSrc,
        isPlaying,
        play,
        pause,
        audioRef,
        setPlaylist,
        isRepeating,
        setIsRepeating,
      }}
    >
      {children}
      <audio ref={audioRef} />
    </AudioPlayerContext.Provider>
  )
}





