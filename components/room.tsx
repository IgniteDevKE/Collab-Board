"use client"

import { ClientSideSuspense } from "@liveblocks/react"

import { RoomProvider } from "@/liveblocks.config"

interface IRoomProps {
  children: React.ReactNode
  roomId: string
  fallback: NonNullable<React.ReactNode> | null
}

export function Room({ children, roomId, fallback }: IRoomProps) {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  )
}
