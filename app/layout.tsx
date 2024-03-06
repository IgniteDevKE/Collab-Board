import { Suspense } from "react"
import { Inter } from "next/font/google"

import { ConvexClientProvider } from "@/providers/convex-client-provider"
import { Toaster } from "@/components/ui/sonner"
import { Loading } from "@/components/auth/loading"
import { ModalProvider } from "@/providers/modal-provider"
import { cn } from "@/lib/utils"
import { constructMetadata } from "@/lib/meta"

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
