import { Dialog, DialogContent } from "../ui/dialog"

interface IShortcutsPreviewProps {
  open?: boolean
  onClose?: () => void
}

const KeyboardShortcuts = () => {
  const shortcuts = [
    { key: "1", action: "Select" },
    { key: "2", action: "Text" },
    { key: "3", action: "Sticky note" },
    { key: "4", action: "Rectangle" },
    { key: "5", action: "Ellipse" },
    { key: "6", action: "Pen" },
    { key: "7", action: "Chat" },
    { key: "⌘+z", action: "undo" },
    { key: "⌘+y", action: "redo" },
    { key: "Backspace/Delete", action: "Delete Layers" },
    { key: "Escape", action: "Set Canvas Mode to None" },
    // Add more shortcuts here...
  ]

  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-lg">Keyboard Shortcuts</h2>
      <ul>
        {shortcuts.map((shortcut, index) => (
          <li key={index}>
            <strong>{shortcut.key}</strong>: {shortcut.action}
          </li>
        ))}
      </ul>
    </div>
  )
}

export const ShortcutsPreview = ({ open, onClose }: IShortcutsPreviewProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 bg-slate-500 border-none max-w-[425px]">
        <KeyboardShortcuts />
      </DialogContent>
    </Dialog>
  )
}
