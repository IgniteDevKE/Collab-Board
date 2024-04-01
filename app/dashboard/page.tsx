"use client"

import { useOrganization } from "@clerk/nextjs"
import { useSearchParams } from "next/navigation"

import { EmptyOrg } from "@/components/dashboard/empty-org"
import { BoardList } from "@/components/dashboard/board-list"

export default function DashboardPage() {
  const { organization } = useOrganization()
  const searchParams = useSearchParams()
  const search = searchParams.get("search") || undefined
  const favorites = searchParams.get("favorites") || undefined
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={{ search, favorites }} />
      )}
    </div>
  )
}
