import { useMutation } from "@/liveblocks.config"
import { CanvasMode, CanvasState, Point } from "@/types/canvas"
import { findIntersectingLayersWithRectangle } from "../utils"

export const useUpdateSelectionNet = (
  layerIds: readonly string[],
  setCanvasState: (state: CanvasState) => void,
) => {
  return useMutation(
    ({ storage, setMyPresence }, current: Point, origin: Point) => {
      const layers = storage.get("layers").toImmutable()
      setCanvasState({
        mode: CanvasMode.SelectionNet,
        origin,
        current,
      })

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current,
      )

      setMyPresence({ selection: ids })
    },
    [layerIds],
  )
}
