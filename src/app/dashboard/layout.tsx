import { SignedIn } from "@clerk/nextjs"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SignedIn>
      <SidebarProvider>{children}</SidebarProvider>
    </SignedIn>
  )
}
