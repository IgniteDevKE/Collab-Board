"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import MaxWidthWrapper from "./MaxWidthWrapper"
import { Button, buttonVariants } from "./ui/button"
import MobileNav from "./mobile-nav"
import { useConvexAuth } from "convex/react"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Spinner } from "./ui/spinner"

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <span className="flex z-40 font-semibold">Collab Board</span>
          <MobileNav />

          <div className="hidden items-center space-x-4 sm:flex">
            {isLoading && <Spinner />}
            {!isAuthenticated && !isLoading && (
              <>
                {/* Pricing */}
                {/* <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link> */}
                <SignInButton mode="modal" afterSignInUrl="/main">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal" afterSignUpUrl="/main">
                  <Button size="sm">
                    Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Button>
                </SignUpButton>
              </>
            )}
            {isAuthenticated && !isLoading && (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/main">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
