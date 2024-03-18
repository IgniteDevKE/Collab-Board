"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

import {
  useOthers,
  useMyPresence,
  useBroadcastEvent,
  useEventListener,
} from "@/liveblocks.config"
import {
  CursorMode,
  CursorState,
  Reaction,
  ReactionEvent,
} from "@/types/canvas"
import useInterval from "@/hooks/use-interval"
import FlyingReaction from "./flying-reaction"
import ReactionSelector from "./reaction-selector"
import Cursor from "./cursor"
import { connectionIdToColor } from "@/lib/utils"

export const Broadcast = () => {
  const others = useOthers()
  const [{ cursor }, updateMyPresence] = useMyPresence()
  const broadcast = useBroadcastEvent()
  const [state, setState] = useState<CursorState>({ mode: CursorMode.Hidden })
  const [reactions, setReactions] = useState<Reaction[]>([])

  const setReaction = useCallback((reaction: string) => {
    setState({ mode: CursorMode.Reaction, reaction, isPressed: false })
  }, [])

  // Remove reactions that are not visible anymore (every 1 sec)
  useInterval(() => {
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000)
    )
  }, 1000)

  useInterval(() => {
    if (state.mode === CursorMode.Reaction && state.isPressed && cursor) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: state.reaction,
            timestamp: Date.now(),
          },
        ])
      )
      broadcast({ x: cursor.x, y: cursor.y, value: state.reaction })
    }
  }, 100)

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
      } else if (e.key === "e") {
        setState({ mode: CursorMode.ReactionSelector })
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

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ])
    )
  })

  return (
    <>
      <div
        className="relative flex h-screen w-full touch-none items-center justify-center overflow-hidden"
        style={{
          cursor:
            state.mode === CursorMode.Chat
              ? "none"
              : "url(cursor.svg) 0 0, auto",
        }}
        onPointerMove={(event) => {
          event.preventDefault()
          if (cursor == null || state.mode !== CursorMode.ReactionSelector) {
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
        onPointerDown={(event) => {
          updateMyPresence({
            cursor: {
              x: Math.round(event.clientX),
              y: Math.round(event.clientY),
            },
          })
          setState((state) =>
            state.mode === CursorMode.Reaction
              ? { ...state, isPressed: true }
              : state
          )
        }}
        onPointerUp={() => {
          setState((state) =>
            state.mode === CursorMode.Reaction
              ? { ...state, isPressed: false }
              : state
          )
        }}
      >
        {reactions.map((reaction) => {
          return (
            <FlyingReaction
              key={reaction.timestamp.toString()}
              x={reaction.point.x}
              y={reaction.point.y}
              timestamp={reaction.timestamp}
              value={reaction.value}
            />
          )
        })}
        {cursor && (
          <div
            className="absolute top-0 left-0"
            style={{
              transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
            }}
          >
            {state.mode === CursorMode.Chat && (
              <>
                <Image src="cursor.svg" alt="" width={24} height={36} />

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
            {state.mode === CursorMode.ReactionSelector && (
              <ReactionSelector
                setReaction={(reaction) => {
                  setReaction(reaction)
                }}
              />
            )}
            {state.mode === CursorMode.Reaction && (
              <div className="pointer-events-none absolute top-3.5 left-1 select-none">
                {state.reaction}
              </div>
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
              message={presence.message}
            />
          )
        })}
      </div>
    </>
  )
}
