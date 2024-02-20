"use client"

import { useState } from "react"
import { useHistory, useCanUndo, useCanRedo } from "@/liveblocks.config"

import { CanvasMode, CanvasState } from "@/types/canvas"
import { Info, Participants, Toolbar } from "./index"

interface ICanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: ICanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  )
}
