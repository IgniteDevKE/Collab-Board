import { create } from "zustand"

const defaultValues = { id: "", title: "" }

interface IRenameModal {
  isOpen: boolean
  onOpen: (id: string, title: string) => void
  onClose: () => void
  initialValues: typeof defaultValues
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
  onClose: () => set({ isOpen: false, initialValues: defaultValues }),
  initialValues: defaultValues,
}))
