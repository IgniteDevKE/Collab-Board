import { CanvasMode, CanvasState, Point } from "@/types/canvas"
import { useCallback } from "react"
import { SELECTION_NET_THRESHOLD } from "../utils"

export const useStartMultiSelection = (
  setCanvasState: (state: CanvasState) => void,
) => {
  return useCallback(
    (current: Point, origin: Point) => {
      if (
        Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) >
        SELECTION_NET_THRESHOLD
      ) {
        setCanvasState({
          mode: CanvasMode.SelectionNet,
          origin,
          current,
        } as CanvasState)
      }
    },
    [setCanvasState],
  )
}
