import { Hint } from "../hint"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface IUserAvatarProps {
  src?: string
  name?: string
  fallback?: string
  borderColor?: string
}

export const UserAvatar = ({
  src,
  name,
  fallback,
  borderColor,
}: IUserAvatarProps) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="text-xs font-semibold">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  )
}
