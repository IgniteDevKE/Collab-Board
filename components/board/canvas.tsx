"use client"

import { Info, Participants, Toolbar } from "./index"
import { useSelf } from "@/liveblocks.config"

interface ICanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: ICanvasProps) => {
  const info = useSelf((me) => me.info)
  console.log(info)
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
