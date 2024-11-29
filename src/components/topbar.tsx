'use client'

import { Iconify } from '@/components/iconify'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useCurrentTime } from '@/hooks/use-current-time'
import { fDateTime } from '@/utils/format-time'
import { Clock } from 'lucide-react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

const NoSSRNetwork = dynamic(() => import('@/components/network-status'), { ssr: false, loading: () => <Iconify icon='line-md:loading-loop' /> })

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
            const isLast = index === pathSegments.length - 1
            return (
              <Fragment key={href}>
                <BreadcrumbItem key={href} className='capitalize'>
                  {isLast
                    ? (
                        <BreadcrumbPage>{segment}</BreadcrumbPage>
                      )
                    : (
                        <>
                          <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                        </>
                      )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </Fragment>
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
