import { v } from "convex/values"

import { mutation, query } from "./_generated/server"

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
  "/placeholder/11.svg",
  "/placeholder/12.svg",
  "/placeholder/13.svg",
  "/placeholder/14.svg",
  "/placeholder/15.svg",
  "/placeholder/16.svg",
]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthorized Access")
    }
    const randomImage = images[Math.floor(Math.random() * images.length)]
    const workspace = await ctx.db.insert("workspaces", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    })
    return workspace
  },
})

export const remove = mutation({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }
    const userId = identity.subject
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_workspace", (q) =>
        q.eq("userId", userId).eq("workspaceId", args.id),
      )
      .unique()
    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id)
    }
    await ctx.db.delete(args.id)
  },
})

export const update = mutation({
  args: { id: v.id("workspaces"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error("Unauthorized")
    }

    const title = args.title.trim()

    if (!title) {
      throw new Error("Title is required")
    }

    if (title.length > 60) {
      throw new Error("Title cannot exceed 60 characters")
    }

    const workspace = await ctx.db.patch(args.id, { title: args.title })

    return workspace
  },
})

export const favorite = mutation({
  args: { id: v.id("workspaces"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const workspace = await ctx.db.get(args.id)

    if (!workspace) {
      throw new Error("Workspace not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_workspace", (q) =>
        q.eq("userId", userId).eq("workspaceId", workspace._id),
      )
      .unique()

    if (existingFavorite) {
      throw new Error("Workspace already favorited")
    }

    await ctx.db.insert("userFavorites", {
      userId,
      workspaceId: workspace._id,
      orgId: args.orgId,
    })

    return workspace
  },
})

export const unfavorite = mutation({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const workspace = await ctx.db.get(args.id)

    if (!workspace) {
      throw new Error("Workspace not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_workspace", (q) =>
        q.eq("userId", userId).eq("workspaceId", workspace._id),
      )
      .unique()

    if (!existingFavorite) {
      throw new Error("Favorited workspace not found")
    }

    await ctx.db.delete(existingFavorite._id)

    return workspace
  },
})

export const get = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const workspace = ctx.db.get(args.id)
    return workspace
  },
})
