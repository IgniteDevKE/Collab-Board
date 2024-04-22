import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  workspaces: defineTable({
    title: v.string(),
    orgId: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    imageUrl: v.string(),
  })
    .index("by_org", ["orgId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["orgId"],
    }),
  userFavorites: defineTable({
    orgId: v.string(),
    userId: v.string(),
    workspaceId: v.id("workspaces"),
  })
    .index("by_board", ["workspaceId"])
    .index("by_user_org", ["userId", "orgId"])
    .index("by_user_workspace", ["userId", "workspaceId"])
    .index("by_user_workspace_org", ["userId", "workspaceId", "orgId"]),
})
