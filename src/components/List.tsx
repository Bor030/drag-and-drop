"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { useAudioPlayer } from "@/context/AudioPlayerContext"
import Image from "next/image"

import {
    closestCenter, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor,
    useSensors
} from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { SortableRow } from './SortableRow'



const DndContextWithNoSSR = dynamic(
    () => import('@dnd-kit/core').then((mod) => mod.DndContext),
    { ssr: false }
)

export type Item = {
    id: number,
    artist: string,
    title: string,
    sequence: number,
    src: string,
    
}

type Props = {
    data: Item[]
}

export function List({ data }: Props) {
    const [items, setItems] = useState(data)
    const [activeItem, setActiveItem] = useState<Item | undefined>(undefined)

      const { setPlaylist } = useAudioPlayer()

useEffect(() => {
  setPlaylist(items)
}, [items])



    // for input methods detection
    const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

    const removeItem = (id: number) => {
        const updated = items.filter(item => item.id !== id).map((item, i) => ({ ...item, sequence: i + 1 }))

        setItems(updated)
    }

    // triggered when dragging starts
    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event
        setActiveItem(items?.find(item => item.sequence === active.id))
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over) return

        const activeItem = items.find(ex => ex.sequence === active.id)
        const overItem = items.find(ex => ex.sequence === over.id)

        if (!activeItem || !overItem) {
            return
        }

        const activeIndex = items.findIndex(ex => ex.sequence === active.id)
        const overIndex = items.findIndex(ex => ex.sequence === over.id)

        if (activeIndex !== overIndex) {
            setItems(prev => {
                const updated = arrayMove(prev, activeIndex, overIndex).map((ex, i) => ({ ...ex, sequence: i + 1 }))

                return updated
            })
        }
        setActiveItem(undefined)
    }

    const handleDragCancel = () => {
        setActiveItem(undefined)
    }

    return (


            <div className="w-full max-w-2xl mx-auto px-4">

            <div className="relative w-full flex flex-col items-center">
            <Image
                src="/hood2.png"
                alt="Workout visual"
                width={256}
                height={256}
                className="absolute mt-[22px] left-1/2 -translate-x-1/2  pointer-events-none z-0"
            /></div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-center drop-shadow-md animate-fade-in  mb-[-6px] mt-[180px]">
            My Workout Playlist
            </h1>

        <div className="flex flex-col gap-2 w-full max-w-2xl mx-auto bg-black bg-opacity-50 p-4 sm:p-6 rounded">

            {items?.length ? (
                <DndContextWithNoSSR
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    <SortableContext
                        items={items.map(item => item.sequence)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map(item => (
                            <SortableRow
                                key={item.id}
                                item={item}
                                removeItem={removeItem}
                            />
                        ))}
                    </SortableContext>

                    <DragOverlay adjustScale style={{ transformOrigin: "0 0 " }}>
                        {activeItem ? (
                            <SortableRow
                                item={activeItem}
                                removeItem={removeItem}
                                forceDragging={true}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContextWithNoSSR>
            ) : null}
        </div>
        </div>
    )
}