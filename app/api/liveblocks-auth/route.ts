import { auth, currentUser } from "@clerk/nextjs"
import { Liveblocks } from "@liveblocks/node"
import { ConvexHttpClient } from "convex/browser"

import { api } from "@/convex/_generated/api"
import { env } from "@/lib/env"

const STATUS_UNAUTHORIZED = 403
const STATUS_INTERNAL_SERVER_ERROR = 500

const convex = new ConvexHttpClient(env.NEXT_PUBLIC_CONVEX_URL)

const liveblocks = new Liveblocks({
  secret: env.LIVEBLOCKS_SECRET_KEY,
})

export async function POST(request: Request) {
  try {
    const authorization = await auth()
    const user = await currentUser()

    if (!authorization || !user) {
      return new Response("Unauthorized access", {
        status: STATUS_UNAUTHORIZED,
      })
    }

    const { room } = await request.json()
    const workspace = await convex.query(api.workspace.get, { id: room })

    if (workspace?.orgId !== authorization.orgId) {
      return new Response("Unauthorized access", {
        status: STATUS_UNAUTHORIZED,
      })
    }

    const userInfo = {
      name: user.firstName || "Teammate",
      picture: user.imageUrl,
    }

    const session = liveblocks.prepareSession(user.id, { userInfo })

    if (room) {
      session.allow(room, session.FULL_ACCESS)
    }

    const { status, body } = await session.authorize()
    return new Response(body, { status })
  } catch (error) {
    console.error(error)
    return new Response("Internal server error", {
      status: STATUS_INTERNAL_SERVER_ERROR,
    })
  }
}
