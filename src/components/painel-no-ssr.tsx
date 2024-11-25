'use client'

import { Loading } from '@/components/ui/loading'
import dynamic from 'next/dynamic'

export const DynamicPainelWithNoSSR = dynamic(() => import('@/components/painel'), {
  ssr: false,
  loading: () => <Loading />,
})
