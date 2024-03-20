import { InfoSkeleton, ParticipantsSkeleton, ToolbarSkeleton } from "./index"
import Image from "next/image"

export const CanvasLoading = () => {
  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Image src="/loader.svg" alt="" fill />
      <InfoSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
    </main>
  )
}
