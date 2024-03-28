import { Navbar } from "@/components/dashboard/navbar"
import { OrgSidebar } from "@/components/dashboard/org-sidebar"
import { Sidebar } from "@/components/dashboard/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardLayout
