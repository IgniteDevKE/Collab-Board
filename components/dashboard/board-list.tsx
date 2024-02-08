"use client"

import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { EmptyBoards } from "./empty-boards"
import { EmptyFavorites } from "./empty-favorites"
import { EmptySearch } from "./empty-search"

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId }) // TODO: Change to API
  if (data === undefined) return <div>Loading...</div>

  if (!data?.length && query.search) {
    return <EmptySearch />
  }
  if (!data?.length && query.favorites) {
    return <EmptyFavorites />
  }
  if (!data?.length) {
    return <EmptyBoards />
  }
  return <div>{JSON.stringify(data)}</div>
}
