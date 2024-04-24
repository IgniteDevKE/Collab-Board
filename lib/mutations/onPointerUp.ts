import { useHistory, useMutation } from "@/liveblocks.config"
import {
  Camera,
  CanvasMode,
  CanvasState,
  LayerType,
  Point,
} from "@/types/canvas"
import { pointerEventToCanvasPoint } from "../utils"

export const useOnPointerUp = (
  camera: Camera,
  canvasState: CanvasState,
  unselectLayers: () => void,
  setCanvasState: (state: CanvasState) => void,
  insertPath: () => void,
  insertLayer: (
    LayerType:
      | LayerType.Ellipse
      | LayerType.Rectangle
      | LayerType.Text
      | LayerType.Note,
    position: Point,
  ) => void,
) => {
  const history = useHistory()
  return useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera)

      if (
        canvasState.mode === CanvasMode.None ||
        canvasState.mode === CanvasMode.Pressing
      ) {
        unselectLayers()
        setCanvasState({ mode: CanvasMode.None })
      } else if (canvasState.mode === CanvasMode.Pencil) {
        insertPath()
      } else if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point)
      } else {
        setCanvasState({
          mode: CanvasMode.None,
        })
      }
      history.resume()
    },
    [
      canvasState,
      camera,
      history,
      insertLayer,
      unselectLayers,
      insertPath,
      setCanvasState,
    ],
  )
}
