"use client"

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import MaxWidthWrapper from "./MaxWidthWrapper"
import MobileNav from "./mobile-nav"
import { Button } from "./ui/button"

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-transparent backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <span className="flex z-40 font-semibold">Collab Board</span>
          <MobileNav />

          <div className="hidden items-center space-x-4 sm:flex">
            {/* {isLoading && <Spinner />}
            {isAuthenticated && !isLoading && ( */}
            <SignedIn>
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            </SignedIn>

            {/* )}
            {!isAuthenticated && !isLoading && ( */}
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
              <SignedOut>
                <SignInButton mode="modal" afterSignInUrl="/dashboard">
                  <Button variant="ghost" size="sm">
                    Sign in
                  </Button>
                </SignInButton>

                <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                  <Button size="sm">
                    Get started <ArrowRight className="ml-1.5 h-5 w-5" />
                  </Button>
                </SignUpButton>
              </SignedOut>
            </>
            {/* )} */}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
