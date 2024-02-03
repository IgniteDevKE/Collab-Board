import { UserButton } from "@clerk/nextjs"

export default function DashboardPage() {
  return (
    <div className=" flex flex-col gap-y-4">
      <div>Dashboard</div>
      <div>{/* <UserButton /> */}</div>
    </div>
  )
}
