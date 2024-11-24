import { SignedIn } from "@clerk/nextjs"
import MainLayout from "@/components/main-layout"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SignedIn>
      <SidebarProvider>
        <MainLayout>{children}</MainLayout>
      </SidebarProvider>
    </SignedIn>
  )
}
