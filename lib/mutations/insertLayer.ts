import { nanoid } from "nanoid"

import { useMutation } from "@/liveblocks.config"
import {
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas"
import { LiveObject } from "@liveblocks/client"
import { MAX_LAYERS } from "../utils"

export const useInsertLayer = (
  lastUsedColor: Color,
  setCanvasState: (state: CanvasState) => void,
) => {
  return useMutation(
    (
      { storage, setMyPresence },
      LayerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers")
      if (liveLayers.size >= MAX_LAYERS) return

      const liveLayersIds = storage.get("layersIds")
      const layerId = nanoid()
      const layer = new LiveObject({
        type: LayerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      })

      liveLayersIds.push(layerId)
      liveLayers.set(layerId, layer)
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
      setCanvasState({ mode: CanvasMode.None } as CanvasState)
    },
    [lastUsedColor],
  )
}
