export type Color = {
  r: number
  g: number
  b: number
}

export type Camera = {
  x: number
  y: number
}

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Note,
  Eraser,
}

export type RectangleLayer = {
  type: LayerType.Rectangle
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type EllipseLayer = {
  type: LayerType.Ellipse
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type PathLayer = {
  type: LayerType.Path
  x: number
  y: number
  height: number
  width: number
  fill: Color
  points: number[][]
  value?: string
}

export type EraserLayer = {
  type: LayerType.Eraser
  x: number
  y: number
  height: number
  width: number
  fill: string
  points: number[][]
  value?: string
}

export type TextLayer = {
  type: LayerType.Text
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type NoteLayer = {
  type: LayerType.Note
  x: number
  y: number
  height: number
  width: number
  fill: Color
  value?: string
}

export type Point = {
  x: number
  y: number
}

export type XYWH = {
  x: number
  y: number
  width: number
  height: number
}

export type Reaction = {
  value: string
  timestamp: number
  point: { x: number; y: number }
}

export type ReactionEvent = {
  x: number
  y: number
  value: string
}

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None
    }
  | {
      mode: CanvasMode.SelectionNet
      origin: Point
      current?: Point
    }
  | {
      mode: CanvasMode.Translating
      current: Point
    }
  | {
      mode: CanvasMode.Inserting
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Text
        | LayerType.Note
    }
  | {
      mode: CanvasMode.Pencil
    }
  | {
      mode: CanvasMode.Erasing
      layerType: LayerType.Eraser
    }
  | {
      mode: CanvasMode.Pressing
      origin: Point
    }
  | {
      mode: CanvasMode.Resizing
      initialBounds: XYWH
      corner: Side
    }

export type CursorState =
  | {
      mode: CursorMode.Hidden
    }
  | {
      mode: CursorMode.Chat
      message: string
      previousMessage: string | null
    }
  | {
      mode: CursorMode.ReactionSelector
    }
  | {
      mode: CursorMode.Reaction
      reaction: string
      isPressed: boolean
    }

export enum CanvasMode {
  None,
  Pressing,
  SelectionNet,
  Translating,
  Inserting,
  Resizing,
  Pencil,
  Erasing,
}

export enum CursorMode {
  Hidden,
  Chat,
  ReactionSelector,
  Reaction,
}

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | EraserLayer
  | TextLayer
  | NoteLayer
