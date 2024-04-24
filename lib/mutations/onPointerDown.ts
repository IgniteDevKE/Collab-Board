import { useCallback } from "react"

import { pointerEventToCanvasPoint } from "@/lib/utils"
import { Camera, CanvasMode, CanvasState, Point } from "@/types/canvas"

export const useOnPointerDown = (
  camera: Camera,
  canvasState: CanvasState,
  setCanvasState: (state: CanvasState) => void,
  startDrawing: (point: Point, pressure: number) => void,
) => {
  return useCallback(
    (e: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(e, camera)
      if (canvasState.mode === CanvasMode.Inserting) {
        return
      }
      // Add case for drawing
      if (canvasState.mode === CanvasMode.Pencil) {
        startDrawing(point, e.pressure)
        return
      }
      setCanvasState({ origin: point, mode: CanvasMode.Pressing })
    },
    [camera, canvasState.mode, setCanvasState, startDrawing],
  )
}
