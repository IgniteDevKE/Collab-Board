"use client"

import { useEffect, useState } from "react"

import { connectionIdToColor } from "@/lib/utils"
import { useMyPresence, useOthers } from "@/liveblocks.config"
import { CursorMode, CursorState } from "@/types/canvas"
import { Cursor } from "./cursor"

export const Broadcast = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence()
  const [state, setState] = useState<CursorState>({ mode: CursorMode.Hidden })

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "/") {
        setState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        })
      } else if (e.key === "Escape") {
        updateMyPresence({ message: "" })
        setState({ mode: CursorMode.Hidden })
      }
    }

    window.addEventListener("keyup", onKeyUp)

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "/") {
        e.preventDefault()
      }
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keyup", onKeyUp)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [updateMyPresence])

  return (
    <>
      <div
        className="relative"
        onPointerMove={(event) => {
          event.preventDefault()
          if (cursor == null) {
            updateMyPresence({
              cursor: {
                x: Math.round(event.clientX),
                y: Math.round(event.clientY),
              },
            })
          }
        }}
        onPointerLeave={() => {
          setState({
            mode: CursorMode.Hidden,
          })
          updateMyPresence({
            cursor: null,
          })
        }}
      >
        {cursor && (
          <div
            className="absolute top-0 left-0"
            style={{
              transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
            }}
          >
            {state.mode === CursorMode.Chat && (
              <>
                <div
                  className="absolute top-5 left-2 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white"
                  onKeyUp={(e) => e.stopPropagation()}
                  style={{
                    borderRadius: 20,
                  }}
                >
                  {state.previousMessage && <div>{state.previousMessage}</div>}
                  <input
                    className="w-60 border-none	bg-transparent text-white placeholder-blue-300 outline-none"
                    autoFocus={true}
                    onChange={(e) => {
                      updateMyPresence({ message: e.target.value })
                      setState({
                        mode: CursorMode.Chat,
                        previousMessage: null,
                        message: e.target.value,
                      })
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setState({
                          mode: CursorMode.Chat,
                          previousMessage: state.message,
                          message: "",
                        })
                      } else if (e.key === "Escape") {
                        setState({
                          mode: CursorMode.Hidden,
                        })
                      }
                    }}
                    placeholder={state.previousMessage ? "" : "Say something…"}
                    value={state.message}
                    maxLength={50}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {others.map(({ connectionId, presence }) => {
          if (presence == null || !presence.cursor) {
            return null
          }

          return (
            <Cursor
              key={connectionId}
              color={connectionIdToColor(connectionId)}
              x={presence.cursor.x}
              y={presence.cursor.y}
              connectionId={connectionId}
              message={presence.message}
            />
          )
        })}
      </div>
    </>
  )
}
