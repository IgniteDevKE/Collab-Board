import { Boxes } from "lucide-react"

import { InfoSkeleton, ParticipantsSkeleton, ToolbarSkeleton } from "./index"

export const CanvasLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Boxes className="h-20 w-20 animate-spin" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}
