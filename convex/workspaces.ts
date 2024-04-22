import { getAllOrThrow } from "convex-helpers/server/relationships"
import { v } from "convex/values"

import { query } from "./_generated/server"

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthorized")
    }

    if (args.favorites) {
      const favoritesBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId),
        )
        .order("desc")
        .collect()
      const ids = favoritesBoards.map((b) => b.workspaceId)
      const workspaces = await getAllOrThrow(ctx.db, ids)
      return workspaces.map((workspace) => ({ ...workspace, isFavorite: true }))
    }

    const title = args.search as string
    let workspaces = []
    if (title) {
      workspaces = await ctx.db
        .query("workspaces")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId),
        )
        .collect()
    } else {
      workspaces = await ctx.db
        .query("workspaces")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect()
    }

    const boardsWithFavoriteRelation = workspaces.map((workspace) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_workspace", (q) =>
          q.eq("userId", identity.subject).eq("workspaceId", workspace._id),
        )
        .unique()
        .then((favorite) => {
          return {
            ...workspace,
            isFavorite: !!favorite,
          }
        })
    })

    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation)

    return boardsWithFavoriteBoolean
  },
})
