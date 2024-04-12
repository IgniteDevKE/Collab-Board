import { Inter } from "next/font/google"
import { Suspense } from "react"

import { Toaster } from "@/components/ui/sonner"
import { constructMetadata } from "@/lib/meta"
import { cn } from "@/lib/utils"
import { ConvexClientProvider } from "@/providers/convex-client-provider"
import { ModalProvider } from "@/providers/modal-provider"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased grainy", inter.className)}>
        <ConvexClientProvider>
          <Suspense>
            <Toaster />
            <ModalProvider />
            {children}
          </Suspense>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
