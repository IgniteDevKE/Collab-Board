import { useHistory, useMutation } from "@/liveblocks.config"
import { Camera, CanvasMode, CanvasState } from "@/types/canvas"
import { pointerEventToCanvasPoint } from "../utils"

export const useOnLayerPointerDown = (
  canvasState: CanvasState,
  camera: Camera,
  setCanvasState: (state: CanvasState) => void,
) => {
  const history = useHistory()
  return useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return
      }

      history.pause()
      e.stopPropagation()

      const point = pointerEventToCanvasPoint(e, camera)

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true })
      }
      setCanvasState({ mode: CanvasMode.Translating, current: point })
    },
    [setCanvasState, camera, history, canvasState.mode],
  )
}
