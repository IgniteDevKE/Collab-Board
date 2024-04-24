import { useMutation } from "@/liveblocks.config"
import { Camera, CanvasMode, CanvasState, Point } from "@/types/canvas"
import { pointerEventToCanvasPoint } from "../utils"

export const useOnPointerMove = (
  camera: Camera,
  canvasState: CanvasState,
  startMultiSelection: (current: Point, origin: Point) => void,
  updateSelectionNet: (current: Point, origin: Point) => void,
  translateSelectedLayers: (current: Point) => void,
  resizeSelectedLayer: (current: Point) => void,
  continueDrawing: (current: Point, e: React.PointerEvent) => void,
) => {
  return useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault()

      const current = pointerEventToCanvasPoint(e, camera)

      if (canvasState.mode === CanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin)
      } else if (canvasState.mode === CanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin)
      } else if (canvasState.mode === CanvasMode.Translating) {
        translateSelectedLayers(current)
      } else if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current)
      } else if (canvasState.mode === CanvasMode.Pencil) {
        continueDrawing(current, e)
      }

      setMyPresence({ cursor: current })
    },
    [
      camera,
      resizeSelectedLayer,
      canvasState,
      translateSelectedLayers,
      continueDrawing,
      updateSelectionNet,
      startMultiSelection,
    ],
  )
}
