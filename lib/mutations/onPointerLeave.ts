import { useMutation } from "@/liveblocks.config"

export const useOnPointerLeave = () => {
  return useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null })
  }, [])
}
