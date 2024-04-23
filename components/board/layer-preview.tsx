"use client"

import { memo } from "react"

import { colorToCss } from "@/lib/utils"
import { useStorage } from "@/liveblocks.config"
import { LayerType } from "@/types/canvas"
import { Ellipse, Note, Path, Rectangle, Text } from "./board-elements"
import { Eraser } from "./board-elements/eraser"

interface ILayerPreviewProps {
  id: string
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void
  selectionColor?: string
}

export const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: ILayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id))
    if (!layer) return null

    switch (layer.type) {
      case LayerType.Path:
        return (
          <Path
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            fill={layer.fill ? colorToCss(layer.fill) : "#000"}
            stroke={selectionColor}
          />
        )
      case LayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        )
      case LayerType.Eraser:
        return (
          <Eraser
            x={layer.x}
            y={layer.y}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
          />
        )
      default:
        return null
    }
  },
)

LayerPreview.displayName = "LayerPreview"
