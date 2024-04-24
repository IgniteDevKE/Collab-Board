import { useMutation } from "@/liveblocks.config"
import { Color, Point } from "@/types/canvas"

export const useStartDrawing = (lastUsedColor: Color) => {
  return useMutation(
    ({ setMyPresence }, point: Point, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: lastUsedColor,
      })
    },
    [lastUsedColor],
  )
}
