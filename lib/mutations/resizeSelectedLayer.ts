import { useMutation } from "@/liveblocks.config"
import { CanvasMode, CanvasState, Point } from "@/types/canvas"
import { resizeBounds } from "../utils"

export const useResizeSelectedLayer = (canvasState: CanvasState) => {
  return useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) {
        return
      }

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      )

      const liveLayers = storage.get("layers")
      const layer = liveLayers.get(self.presence.selection[0])

      if (layer) {
        layer.update(bounds)
      }
    },
    [canvasState],
  )
}
