import { nanoid } from "nanoid"

import { useMutation } from "@/liveblocks.config"
import { CanvasMode, CanvasState, Color } from "@/types/canvas"
import { LiveObject } from "@liveblocks/client"
import { MAX_LAYERS, penPointsToPathLayer } from "../utils"

export const useInsertPath = (
  lastUsedColor: Color,
  setCanvasState: (state: CanvasState) => void,
) => {
  return useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers")
      const { pencilDraft } = self.presence

      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null })
        return
      }

      const id = nanoid()
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, lastUsedColor)),
      )

      const liveLayerIds = storage.get("layersIds")
      liveLayerIds.push(id)

      setMyPresence({ pencilDraft: null })
      setCanvasState({ mode: CanvasMode.Pencil })
    },
    [lastUsedColor],
  )
}
