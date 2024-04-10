"use client"

import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"

interface ConvexClientProviderProps {
  children: React.ReactNode
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string

const convex = new ConvexReactClient(convexUrl)

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      {
        <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
          {children}
        </ConvexProviderWithClerk>
      }
    </ClerkProvider>
  )
}
