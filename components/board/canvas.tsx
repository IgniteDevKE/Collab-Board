"use client"

import { useCallback, useState } from "react"
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
} from "@/liveblocks.config"

import { Camera, CanvasMode, CanvasState } from "@/types/canvas"
import { Info, Participants, Toolbar } from "./index"
import { CursorsPresence } from "./cursors-presence"
import { pointerEventToCanvasPoint } from "@/lib/utils"

interface ICanvasProps {
  boardId: string
}

export const Canvas = ({ boardId }: ICanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })

  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()

      const current = pointerEventToCanvasPoint(e, camera)
      setMyPresence({ cursor: current })
    },
    []
  )

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])

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
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="h-[100vh] w-[100vw]"
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}
