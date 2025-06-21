import { Repeat } from 'lucide-react'
import PlayPauseButton from './ui/PlayPauseButton'
import PlayProgressBar from './ui/PlayProgressBar'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Image from "next/image"




import { useAudioPlayer } from "@/context/AudioPlayerContext"





import type { Item } from "./List"

type Props = {
  item: Item
  removeItem: (id: number) => void
  forceDragging?: boolean
}

export function SortableRow({ item, removeItem, forceDragging = false }: Props) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({
    id: item.sequence,
  })

  const parentStyles = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    opacity: isDragging ? "0.4" : "1",
    lineHeight: "4",
  }

  const draggableStyles = {
    cursor: isDragging || forceDragging ? "grabbing" : "grab",
  }

  const { currentSrc, isPlaying, audioRef, isRepeating, setIsRepeating } = useAudioPlayer()


  
    const isThisPlaying = isPlaying && currentSrc === item.src

   



 const toggleRepeat = () => {
  setIsRepeating(!isRepeating)

}


  return (
   <article
  className="flex flex-col w-full gap-2 [&:not(:first-child)]:pt-2"
  ref={setNodeRef}
  style={parentStyles}
>
  <div className="bg-[rgba(1,32,51,0.85)] w-full rounded-md flex flex-col p-2 overflow-hidden">
    <div className="flex items-start gap-2">
      <div className="bg-ring w-12 h-full flex items-center justify-center">
        <p className="text-center text-secondary">{item.sequence}</p>
      </div>

      <div
        ref={setActivatorNodeRef}
        className="flex-grow"
        style={draggableStyles}
        {...attributes}
        {...listeners}
      >
        <h2 className="text-lg">{item.artist}</h2>
        <p className="text-sm text-muted-foreground mt-2">{item.title}</p>
      </div>

      {/* 🎵 Equilizer anim */}
    {/*   <div
        className={`transition-all duration-500 ease-in-out transform
          ${isThisPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
          ml-2 mt-1.5 pr-2 hidden sm:block`}
      >
        {isThisPlaying && (
          <Image
            src="/assets/equ.gif"
            alt="Now Playing"
            width={60}
            height={20}
          />
        )}
      </div> */}

     
      <div
        className={`transition-all duration-500 ease-in-out transform
          ${isThisPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
          mt-1.5`}
      >
        {isThisPlaying && (
          <PlayProgressBar audioRef={audioRef} className="h-4 w-[100px] sm:w-[200px] transition-all duration-300 ease-in-out" />
        )}
      </div>

      
      <div className="w-12 flex items-center justify-center mt-3">
        <PlayPauseButton src={item.src ?? ""} />
      </div>

      
      <div
        className={`transition-all duration-500 ease-in-out transform
          ${isThisPlaying ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}
          w-12 flex items-center justify-center mt-3`}
      >
      
            <button
            onClick={toggleRepeat}
            className={`
                w-10 h-10 rounded-full flex items-center justify-center transition 
                ${isRepeating ? "bg-red-600 shadow-lg shadow-red-400/60" : "bg-gray-700"}
            `}
            >
            <Repeat
                className={`
                h-5 w-5 text-white transition-transform duration-300 
                ${isRepeating ? "rotate-180" : ""}
                `}
            />
            </button>
      </div>
    </div>
  </div>
</article>

  )
}
