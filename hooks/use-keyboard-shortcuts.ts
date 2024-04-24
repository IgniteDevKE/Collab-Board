import { useEffect } from "react"

import { useHistory } from "@/liveblocks.config"
import { CanvasMode, CanvasState, LayerType } from "@/types/canvas"
import { useDeleteLayers } from "./use-delete-layers"

export const useKeyboardShortcuts = (
  setCanvasState: (state: CanvasState) => void,
  setIsShortcutsOpen: (isOpen: boolean) => void,
) => {
  const history = useHistory()
  const deleteLayers = useDeleteLayers()
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA" ||
        (e.target as HTMLElement).isContentEditable
      ) {
        return
      }

      switch (e.key) {
        case "Backspace":
        case "Delete": {
          deleteLayers()
          break
        }
        case "Escape":
        case "1": {
          setCanvasState({ mode: CanvasMode.None })
          break
        }
        case "2": {
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Text,
          })
          break
        }
        case "3": {
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Note,
          })
          break
        }
        case "4": {
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Rectangle,
          })
          break
        }
        case "5": {
          setCanvasState({
            mode: CanvasMode.Inserting,
            layerType: LayerType.Ellipse,
          })
          break
        }
        case "6": {
          setCanvasState({ mode: CanvasMode.Pencil })
          break
        }
        case "z": {
          if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey) {
              history.redo()
            } else {
              history.undo()
            }
            break
          }
        }
        case "y": {
          if (e.ctrlKey) {
            history.redo()
          }
          break
        }
        case " ": {
          setIsShortcutsOpen(true)
          break
        }
      }
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [deleteLayers, history, setCanvasState, setIsShortcutsOpen])
}
