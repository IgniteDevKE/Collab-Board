import { useHistory } from "@/liveblocks.config"
import { CanvasMode, CanvasState, Side, XYWH } from "@/types/canvas"
import { useCallback } from "react"

export const useOnResizeHandlePointerDown = (
  setCanvasState: (state: CanvasState) => void,
) => {
  const history = useHistory()
  return useCallback(
    (corner: Side, initialBounds: XYWH) => {
      history.pause()
      setCanvasState({
        mode: CanvasMode.Resizing,
        corner,
        initialBounds,
      })
    },
    [history, setCanvasState],
  )
}
