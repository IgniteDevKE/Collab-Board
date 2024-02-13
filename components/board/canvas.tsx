"use client"

import { Info, Participants, Toolbar } from "./index"

interface ICanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: ICanvasProps) => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
