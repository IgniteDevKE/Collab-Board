"use client"

import { useQuery } from "convex/react"

import { api } from "@/convex/_generated/api"
import { BoardCard } from "./board-card"
import { EmptyBoards } from "./empty-boards"
import { EmptyFavorites } from "./empty-favorites"
import { EmptySearch } from "./empty-search"
import { NewBoardButton } from "./new-board-button"

interface BoardListProps {
  orgId: string
  query: {
    search?: string
    favorites?: string
  }
}

export const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.workspaces.get, { orgId, ...query })
  if (data === undefined)
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite workspace" : "Your workspace"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    )

  if (!data?.length && query.search) {
    return <EmptySearch />
  }
  if (!data?.length && query.favorites) {
    return <EmptyFavorites />
  }
  if (!data?.length) {
    return <EmptyBoards />
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite workspace" : "Your workspace"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        {data?.map((workspace) => (
          <BoardCard
            key={workspace._id}
            id={workspace._id}
            title={workspace.title}
            imageUrl={workspace.imageUrl}
            authorId={workspace.authorId}
            authorName={workspace.authorName}
            createdAt={workspace._creationTime}
            orgId={workspace.orgId}
            isFavorite={workspace.isFavorite}
          />
        ))}
      </div>
      <div className="absolute bottom-2 right-2">
        <NewBoardButton orgId={orgId} />
      </div>
    </div>
  )
}
