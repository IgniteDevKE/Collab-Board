"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { cn } from "@/lib/utils"
import { Hint } from "../hint"

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter()
  const { mutate, pending } = useApiMutation(api.workspace.create)

  const onClick = () => {
    if (pending || disabled) return

    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Workspace created")
        router.push(`/workspace/${id}`)
      })
      .catch(() => toast.error("Failed to create workspace"))
  }

  return (
    <Hint label="New workspace" side="left">
      <Image
        src="/plus.svg"
        alt=""
        width={65}
        height={65}
        onClick={onClick}
        className={cn(
          "cursor-pointer hover:opacity-80",
          (pending || disabled) && "opacity-50 cursor-not-allowed",
        )}
      />
    </Hint>
  )
}
