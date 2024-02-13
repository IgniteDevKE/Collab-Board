import { v } from "convex/values"

import { mutation } from "./_generated/server"

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
    if (!identity) throw new Error("Unauthorized")
    const randomImage = images[Math.floor(Math.random() * images.length)]
    const board = await ctx.db.insert("boards", {
      orgId: args.orgId,
      title: args.title,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    })
    return board
  },
})

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }
    const userId = identity.subject
    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique()
    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id)
    }
    await ctx.db.delete(args.id)
  },
})

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    const title = args.title.trim()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    if (!title) {
      throw new Error("Title is required")
    }

    if (title.length > 60) {
      throw new Error("Title cannot exceed 60 characters")
    }

    const board = await ctx.db.patch(args.id, { title: args.title })

    return board
  },
})

export const favorite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const board = await ctx.db.get(args.id)

    if (!board) {
      throw new Error("Board not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique()

    if (existingFavorite) {
      throw new Error("Board already favorited")
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    })

    return board
  },
})

export const unfavorite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error("Unauthorized")
    }

    const board = await ctx.db.get(args.id)

    if (!board) {
      throw new Error("Board not found")
    }

    const userId = identity.subject

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique()

    if (!existingFavorite) {
      throw new Error("Favorited board not found")
    }

    await ctx.db.delete(existingFavorite._id)

    return board
  },
})
