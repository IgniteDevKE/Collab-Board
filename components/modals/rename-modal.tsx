"use client"

import { FormEventHandler, useEffect, useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { useRenameModal } from "@/store/use-rename-modal"

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.workspace.update)

  const { isOpen, onClose, initialValues } = useRenameModal()

  const [title, setTitle] = useState(initialValues.title)

  useEffect(() => {
    setTitle(initialValues.title)
  }, [initialValues.title])

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    mutate({
      id: initialValues.id,
      title,
    })
      .then(() => {
        toast.success("Workspace renamed")
        onClose()
      })
      .catch(() => toast.error("Failed to rename workspace"))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit workspace title</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Enter a new title for this workspace
        </DialogDescription>
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            disabled={pending}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Workspace title"
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
