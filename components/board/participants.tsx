"use client"

import { connectionIdToColor } from "@/lib/utils"
import { useOthers, useSelf } from "@/liveblocks.config"
import { UserInvite } from "../dashboard/user-invite"
import { UserAvatar } from "./user-avatar"

const MAX_SHOWN_USERS = 3

export const Participants = () => {
  const currentUser = useSelf()
  const users = useOthers()
  const hasMoreUsers = users.length > MAX_SHOWN_USERS

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex items-center gap-x-2">
        <UserInvite inviteVariant="share" />

        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
            borderColor={connectionIdToColor(currentUser.connectionId)}
          />
        )}

        {users.slice(0, MAX_SHOWN_USERS).map(({ connectionId, info }) => {
          return (
            <UserAvatar
              key={connectionId}
              src={info?.picture}
              name={info?.name}
              fallback={info?.name?.[0] || "T"}
            />
          )
        })}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  )
}

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
  )
}
