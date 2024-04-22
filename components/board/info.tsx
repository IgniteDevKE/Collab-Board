"use client"

import { useQuery } from "convex/react"
import { Menu } from "lucide-react"
import { Poppins } from "next/font/google"
import Link from "next/link"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import { useRenameModal } from "@/store/use-rename-modal"
import { Actions } from "../actions"
import { Hint } from "../hint"
import { Button } from "../ui/button"

interface IInfoProps {
  workspaceId: string
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
})

const TabSeparator = () => {
  return <div className="text-neutral-300 px-1.5">|</div>
}

export const Info = ({ workspaceId }: IInfoProps) => {
  const { onOpen } = useRenameModal()
  const data = useQuery(api.workspace.get, {
    id: workspaceId as Id<"workspaces">,
  })
  if (!data) return <InfoSkeleton />

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
      <Hint label="View workspaces" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/dashboard">
            <span
              className={cn(
                "font-semibold text-xl ml-2 text-black",
                font.className,
              )}
            >
              Collab Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          variant="board"
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions id={data._id} title={data.title} side="bottom" sideOffset={10}>
        <div>
          <Hint label="Main menu" side="bottom" sideOffset={10}>
            <Button size="icon" variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  )
}
