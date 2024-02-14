import { Loader } from "lucide-react"

import { Info, Participants, Toolbar } from "./index"

export const CanvasLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 animate-ping" />
      <Info.Skeleton />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </main>
  )
}
