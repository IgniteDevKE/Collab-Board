"use client"

import { SignUpButton, SignInButton, UserButton } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "./ui/button"

const MobileNav = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()
  const [isOpen, setOpen] = useState<boolean>(false)

  const toggleOpen = () => setOpen((prev) => !prev)

  const pathname = usePathname()

  useEffect(() => {
    if (isOpen) toggleOpen()
    //eslint-disable-next-line
  }, [pathname])

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-zinc-700"
      />

      {isOpen ? (
        <div className="fixed animate-in slide-in-from-top-5 fade-in-20 inset-0 z-0 w-full">
          <ul className="absolute bg-white border-b border-zinc-200 shadow-xl grid w-full gap-3 px-10 pt-20 pb-8">
            <>
              {!isAuthenticated && !isLoading && (
                <>
                  <li>
                    <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                      Get Started
                    </SignUpButton>
                  </li>
                  <li className="my-3 h-px w-full bg-gray-300" />
                </>
              )}

              {!isAuthenticated && !isLoading && (
                <>
                  <li>
                    <SignInButton mode="modal" afterSignInUrl="/dashboard">
                      Sign in
                    </SignInButton>
                  </li>
                  <li className="my-3 h-px w-full bg-gray-300" />
                </>
              )}

              {isAuthenticated && !isLoading && (
                <>
                  <Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <UserButton afterSignOutUrl="/" />
                  </Button>
                </>
              )}
              {/* <li>
                  <Link
                    onClick={() => closeOnCurrent("/pricing")}
                    className="flex items-center w-full font-semibold"
                    href="/pricing"
                  >
                    Pricing
                  </Link>
                </li> */}
            </>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
