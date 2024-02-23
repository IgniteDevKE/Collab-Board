"use client"

import { memo } from "react"

import { LayerType, Side, XYWH } from "@/types/canvas"
import { useSelf, useStorage } from "@/liveblocks.config"
import { useSelectionBounds } from "@/hooks/use-selection-bounds"

interface ISelectionBoxProps {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void
}

const HANDLE_WIDTH = 8

export const SelectionBox = memo(
  ({ onResizeHandlePointerDown }: ISelectionBoxProps) => {
    const soleLayerId = useSelf((me) =>
      me.presence.selection.length === 1 ? me.presence.selection[0] : null
    )

    const isShowingHandles = useStorage(
      (root) =>
        soleLayerId && root.layers.get(soleLayerId)?.type !== LayerType.Path
    )

    const bounds = useSelectionBounds()
    if (!bounds) return null

    return (
      <>
        <rect
          className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
          style={{ transform: `translate(${bounds.x}px, ${bounds.y}px)` }}
          x={0}
          y={0}
          width={bounds.width}
          height={bounds.height}
        />
        {isShowingHandles && (
          <>
            {/* Top-Left */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Top + Side.Left, bounds)
              }}
            />

            {/* Center-Top */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px, 
                    ${bounds.y - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Top, bounds)
              }}
            />

            {/* Top-Right */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width - HANDLE_WIDTH / 2}px,
                    ${bounds.y - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Top + Side.Right, bounds)
              }}
            />

            {/* Center-Right */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                    ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Right, bounds)
              }}
            />

            {/* Bottom-Right */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nwse-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2 + bounds.width}px,
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Bottom + Side.Right, bounds)
              }}
            />

            {/* Center-Bottom */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ns-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}px,
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Bottom, bounds)
              }}
            />

            {/* Bottom-Left */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "nesw-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px,
                    ${bounds.y + bounds.height - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Bottom + Side.Left, bounds)
              }}
            />

            {/* Center-Left */}
            <rect
              className="fill-white stroke-1 stroke-blue-500"
              x={0}
              y={0}
              style={{
                cursor: "ew-resize",
                width: `${HANDLE_WIDTH}px`,
                height: `${HANDLE_WIDTH}px`,
                transform: `translate(
                    ${bounds.x - HANDLE_WIDTH / 2}px,
                    ${bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}px
                    )`,
              }}
              onPointerDown={(e) => {
                e.stopPropagation()
                onResizeHandlePointerDown(Side.Left, bounds)
              }}
            />
          </>
        )}
      </>
    )
  }
)

SelectionBox.displayName = "SelectionBox"
