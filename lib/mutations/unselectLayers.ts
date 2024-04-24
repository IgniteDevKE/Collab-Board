import { useMutation } from "@/liveblocks.config"

export const useUnselectLayers = () => {
  return useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0) {
      setMyPresence({ selection: [] }, { addToHistory: true })
    }
  }, [])
}
