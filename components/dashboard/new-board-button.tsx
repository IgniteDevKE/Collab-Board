"use client"

import Image from "next/image"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { Hint } from "../hint"

interface NewBoardButtonProps {
  orgId: string
  disabled?: boolean
}

export const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const router = useRouter()
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    if (pending || disabled) return

    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Workspace created")
        router.push(`/board/${id}`)
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
          (pending || disabled) && "opacity-50 cursor-not-allowed"
        )}
      />
    </Hint>
  )
}
