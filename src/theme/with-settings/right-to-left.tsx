import type { ThemeDirection } from '../types'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

import { useEffect } from 'react'

// ----------------------------------------------------------------------

interface RTLProps {
  children: React.ReactNode,
  direction: ThemeDirection
}

const cacheRtl = createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: []
})

export function RTL({ children, direction }: RTLProps) {
  useEffect(() => {
    document.dir = direction
  }, [direction])

  if (direction === 'rtl') {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>
  }

  return <>{children}</>
}
