"use client"

import { useOrganization } from "@clerk/nextjs"

import { EmptyOrg } from "@/components/dashboard/empty-org"
import { BoardList } from "@/components/dashboard/board-list"

interface DashboardPageProps {
  searchParams: {
    search?: string
    favorites?: string
  }
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { organization } = useOrganization()
  return (
    <div className="flex-1 h-[calc(100%-80px)] p-6">
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  )
}
