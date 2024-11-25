"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export function DynamicBreadcrumbs({ children }: { children: React.ReactNode }) {
  const paths = usePathname()
  const pathNames = paths.split("/").filter((path) => path)

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          {pathNames.map((path, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={`/${path}`}>
                <BreadcrumbPage>{path}</BreadcrumbPage>
              </BreadcrumbLink>
              {index < pathNames.length - 1 && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </header>
      {children}
    </SidebarInset>
  )
}
