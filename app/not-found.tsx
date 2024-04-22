import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image src="/not-found.svg" height={400} width={400} alt="Empty" />
      <div className="mt-6">
        <Link href="/dashboard">
          <Button size="lg">Return to dashboard</Button>
        </Link>
      </div>
    </div>
  )
}
