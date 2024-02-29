import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"

import { ConvexClientProvider } from "@/providers/convex-client-provider"
import { Toaster } from "@/components/ui/sonner"
import { Loading } from "@/components/auth/loading"
import { ModalProvider } from "@/providers/modal-provider"
import { cn } from "@/lib/utils"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Collab Board",
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
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModalProvider />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  )
}
