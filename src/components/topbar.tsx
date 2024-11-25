'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Loading } from '@/components/ui/loading'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useCurrentTime } from '@/hooks/use-current-time'
import { fDateTime } from '@/utils/format-time'
import { Clock } from 'lucide-react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const NoSSRNetwork = dynamic(() => import('@/components/network-status'), { ssr: false, loading: () => <Loading /> })

export function Topbar() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(Boolean)
  const time = useCurrentTime()

  return (
    <header className='flex h-16 items-center gap-4 border-b bg-background px-6'>
      <SidebarTrigger />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`
            return (
              <BreadcrumbItem key={href} className='capitalize'>
                {index === pathSegments.length - 1
                  ? (
                      <BreadcrumbPage>{segment}</BreadcrumbPage>
                    )
                  : (
                      <>
                        <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </>
                    )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className='fixed right-6'>
        <div className='mt-2 flex items-center space-x-4 sm:mt-0'>
          <Clock className='size-5' />
          <span className='hidden sm:inline'>{fDateTime(time)}</span>
          <NoSSRNetwork />
        </div>
      </div>
    </header>
  )
}
