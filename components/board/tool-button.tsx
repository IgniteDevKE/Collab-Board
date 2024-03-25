"use client"

import { LucideIcon } from "lucide-react"

import { Hint } from "../hint"
import { Button } from "../ui/button"

interface IToolButtonProps {
  label: string
  icon: LucideIcon
  onClick?: () => void
  isActive?: boolean
  isDisabled?: boolean
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: IToolButtonProps) => {
  return (
    <Hint label={label} side="top" sideOffset={10}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "boardActive" : "board"}
      >
        <Icon />
      </Button>
    </Hint>
  )
}
