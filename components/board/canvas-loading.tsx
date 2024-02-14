import { Loader } from "lucide-react"

import { InfoSkeleton, ParticipantsSkeleton, ToolbarSkeleton } from "./index"

export const CanvasLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="h-6 w-6 animate-ping" />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}
