"use client"

import { useCallback, useMemo, useState } from "react"

import { useDisableScrollBounce } from "@/hooks/use-disable-scroll-bounce"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { colorToCss, connectionIdToColor } from "@/lib/utils"
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@/liveblocks.config"
import { Camera, CanvasMode, CanvasState, Color } from "@/types/canvas"
import {
  useContinueDrawing,
  useInsertLayer,
  useInsertPath,
  useOnLayerPointerDown,
  useOnPointerDown,
  useOnPointerLeave,
  useOnPointerMove,
  useOnPointerUp,
  useOnResizeHandlePointerDown,
  useResizeSelectedLayer,
  useStartDrawing,
  useStartMultiSelection,
  useTranslateSelectedLayers,
  useUnselectLayers,
  useUpdateSelectionNet,
} from "../../lib/mutations/index"
import { ShortcutsPreview } from "../dashboard/shortcuts-preview"
import { Path } from "./board-elements"
import { Broadcast } from "./broadcast/main"
import { CursorsPresence } from "./cursors-presence"
import { Info, Participants, Toolbar } from "./index"
import { LayerPreview } from "./layer-preview"
import { SelectionBox } from "./selection-box"
import { SelectionTools } from "./selection-tools"

interface ICanvasProps {
  workspaceId: string
}

export const Canvas = ({ workspaceId }: ICanvasProps) => {
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  })
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 })
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  })
  const layerIds = useStorage((root) => root.layersIds)
  const pencilDraft = useSelf((me) => me.presence.pencilDraft)

  useDisableScrollBounce()
  const history = useHistory()
  const canUndo = useCanUndo()
  const canRedo = useCanRedo()

  const insertLayer = useInsertLayer(lastUsedColor, setCanvasState)
  const translateSelectedLayers = useTranslateSelectedLayers(
    canvasState,
    setCanvasState,
  )
  const unselectLayers = useUnselectLayers()
  const updateSelectionNet = useUpdateSelectionNet(layerIds, setCanvasState)
  const continueDrawing = useContinueDrawing(canvasState)
  const insertPath = useInsertPath(lastUsedColor, setCanvasState)
  const startDrawing = useStartDrawing(lastUsedColor)
  const resizeSelectedLayer = useResizeSelectedLayer(canvasState)
  const startMultiSelection = useStartMultiSelection(setCanvasState)
  const onResizeHandlePointerDown = useOnResizeHandlePointerDown(setCanvasState)
  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])
  const onPointerMove = useOnPointerMove(
    camera,
    canvasState,
    startMultiSelection,
    updateSelectionNet,
    translateSelectedLayers,
    resizeSelectedLayer,
    continueDrawing,
  )
  const onPointerLeave = useOnPointerLeave()
  const onPointerDown = useOnPointerDown(
    camera,
    canvasState,
    setCanvasState,
    startDrawing,
  )
  const onPointerUp = useOnPointerUp(
    camera,
    canvasState,
    unselectLayers,
    setCanvasState,
    insertPath,
    insertLayer,
  )
  const onLayerPointerDown = useOnLayerPointerDown(
    canvasState,
    camera,
    setCanvasState,
  )
  const selections = useOthersMapped((other) => other.presence.selection)
  const layerIdsToColorSelection = useMemo(() => {
    const layersIdsToColorSelection: Record<string, string> = {}
    for (const user of selections) {
      const [connectionId, selection] = user
      for (const layerId of selection) {
        layersIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
      }
    }
    return layersIdsToColorSelection
  }, [selections])

  useKeyboardShortcuts(setCanvasState, setIsShortcutsOpen)

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      {isShortcutsOpen && (
        <ShortcutsPreview
          open={isShortcutsOpen}
          onClose={() => setIsShortcutsOpen(false)}
        />
      )}
      <Info workspaceId={workspaceId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <SelectionTools camera={camera} setLastUsedColor={setLastUsedColor} />
      <Broadcast />
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
        className="h-[100vh] w-[100vw]"
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === CanvasMode.SelectionNet &&
            canvasState.current != null && (
              <rect
                className="fill-blue-500/5 stroke-blue-500 stroke-1"
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
          {pencilDraft != null && pencilDraft.length > 0 && (
            <Path
              points={pencilDraft}
              fill={colorToCss(lastUsedColor)}
              x={0}
              y={0}
            />
          )}
        </g>
      </svg>
    </main>
  )
}
