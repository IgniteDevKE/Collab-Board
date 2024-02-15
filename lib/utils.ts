import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const COLORS = [
  "#DC2626", // Red
  "#D97706", // Orange
  "#059669", // Green
  "#7C3AED", // Purple
  "#DB2777", // Pink
  "#1E3A8A", // Royal Blue
  "#FBBF24", // Amber
  "#10B981", // Teal
  "#6B7280", // Cool Gray
  "#EF4444", // Rose
]

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function connectionIdToColor(connectionId: number) {
  return COLORS[connectionId % COLORS.length]
}
