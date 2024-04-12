"use client"

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "./ui/button"

const MobileNav = () => {
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
            <SignedOut>
              <li>
                <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                  Get Started
                </SignUpButton>
              </li>
              <li className="my-3 h-px w-full bg-gray-300" />
              <li>
                <SignInButton mode="modal" afterSignInUrl="/dashboard">
                  Sign in
                </SignInButton>
              </li>
              <li className="my-3 h-px w-full bg-gray-300" />
            </SignedOut>

            <SignedIn>
              <Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </Button>
            </SignedIn>
          </ul>
        </div>
      ) : null}
    </div>
  )
}

export default MobileNav
