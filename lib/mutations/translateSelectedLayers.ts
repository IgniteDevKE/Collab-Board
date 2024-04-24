import { useMutation } from "@/liveblocks.config"
import { CanvasMode, CanvasState, Point } from "@/types/canvas"

export const useTranslateSelectedLayers = (
  canvasState: CanvasState,
  setCanvasState: (state: CanvasState) => void,
) => {
  return useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Translating) {
        return
      }
      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      }
      const liveLayers = storage.get("layers")
      for (const layerId of self.presence.selection) {
        const layer = liveLayers.get(layerId)
        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          })
        }
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [canvasState],
  )
}
