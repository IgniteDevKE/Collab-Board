import { memo } from "react"

import { useOther } from "@/liveblocks.config"
import { connectionIdToColor } from "@/lib/utils"

type Props = {
  color: string
  x: number
  y: number
  connectionId: number
  message?: string
}

export const Cursor = memo(({ color, x, y, message, connectionId }: Props) => {
  const info = useOther(connectionId, (user) => user?.info)
  const name = info?.name || "Teammate"
  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <svg
        className="relative"
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        stroke="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
          fill={connectionIdToColor(connectionId)}
        />
      </svg>

      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs text-white font-semibold"
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>

      {message && (
        <div
          className="absolute top-5 left-2 rounded-3xl px-4 py-2"
          style={{ backgroundColor: color, borderRadius: 20 }}
        >
          <p className="whitespace-nowrap text-sm leading-relaxed text-white">
            {message}
          </p>
        </div>
      )}
    </div>
  )
})
Cursor.displayName = "Cursor"
