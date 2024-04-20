import { OrganizationProfile } from "@clerk/nextjs"
import { Plus, Share2 } from "lucide-react"

import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

interface IUserInviteProps {
  inviteVariant: "share" | "invite"
}

export const UserInvite = ({ inviteVariant }: IUserInviteProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {inviteVariant === "share" ? (
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share workspace
          </Button>
        ) : (
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Invite members
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
        <OrganizationProfile />
      </DialogContent>
    </Dialog>
  )
}
