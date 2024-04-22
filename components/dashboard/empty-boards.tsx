"use client"

import { useOrganization } from "@clerk/nextjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"

export const EmptyBoards = () => {
  const router = useRouter()
  const { organization } = useOrganization()
  const { mutate, pending } = useApiMutation(api.workspace.create)
  const onClick = () => {
    if (!organization) return
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Workspace successfully created")
        router.push(`/workspace/${id}`)
      })
      .catch(() => toast.error("Failed to create workspace"))
  }

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/empty-board.svg" height={200} width={200} alt="Empty" />
      <h2 className="text-2xl font-semibold mt-6">
        Create your first workspace!
      </h2>
      <p className="text-muted-foreground textg-sm mt-2">
        Start by creating a workspace for your organization
      </p>
      <div className="mt-6">
        <Button disabled={pending} onClick={onClick} size="lg">
          Create workspace
        </Button>
      </div>
    </div>
  )
}
