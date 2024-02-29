import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"

import "./globals.css"
import { ConvexClientProvider } from "@/providers/convex-client-provider"
import { Toaster } from "@/components/ui/sonner"
import { ModalProvider } from "@/providers/modal-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Board-Project",
  description:
    "A collaborative whiteboard application that allows users to draw on a shared canvas in real time.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased grainy", inter.className)}>
        <ConvexClientProvider>
          <Toaster />
          <ModalProvider />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  )
}
