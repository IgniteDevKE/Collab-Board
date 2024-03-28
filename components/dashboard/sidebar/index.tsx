import { List } from "./list"
import { NewButton } from "./new-button"

export const Sidebar = () => {
  return (
    <aside className="fixed z-[1] left-0 bg-gradient-to-b from-blue-900 to-blue-600 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white">
      <List />
      <NewButton />
    </aside>
  )
}
