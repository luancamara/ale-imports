import { AppSidebar } from '@/components/sidebar'
import { Topbar } from '@/components/topbar'
import { SidebarInset } from '@/components/ui/sidebar'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen w-screen'>
      <AppSidebar />
      <SidebarInset className='flex flex-col'>
        <Topbar />
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </SidebarInset>
    </div>
  )
}
